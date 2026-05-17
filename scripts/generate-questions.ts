#!/usr/bin/env npx tsx
/**
 * MRCPsych Pro — Question Generation Pipeline
 *
 * Orchestrates: Generator (GPT-4o mini) → Reviewer (GPT-4o) → Validator
 * Outputs: JSON array ready for Admin → Import
 *
 * Usage:
 *   npx tsx scripts/generate-questions.ts --domain psychopharmacology --count 20
 *   npx tsx scripts/generate-questions.ts --domain legislation_mha --count 10 --paper B
 *   npx tsx scripts/generate-questions.ts --all --count 50   # spread across all domains
 */

import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'
import { Command } from 'commander'
import {
  generatorSystemPrompt,
  reviewerSystemPrompt,
  validatorSystemPrompt,
} from './prompts'
import {
  type GeneratedQuestion,
  type ReviewResult,
  type ValidationResult,
  type PipelineConfig,
  DEFAULT_CONFIG,
  DOMAIN_TOPICS,
  DOMAIN_TOPICS_PAPER_B,
} from './types'

// ── CLI Setup ──────────────────────────────────────────────

const program = new Command()
program
  .option('--domain <domain>', 'Target domain')
  .option('--all', 'Generate across all domains')
  .option('--count <number>', 'Questions to generate', '20')
  .option('--paper <A|B>', 'Paper A or B', 'A')
  .option('--batch-size <number>', 'Parallel generations per batch', '5')
  .option('--output <path>', 'Output file path')
  .option('--model-generator <model>', 'Model for generation', 'gpt-4o-mini')
  .option('--model-reviewer <model>', 'Model for review', 'gpt-4o')
  .parse(process.argv)

const opts = program.opts()

// ── OpenAI Client ──────────────────────────────────────────

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ── Difficulty Sampling ────────────────────────────────────

function pickDifficulty(config: PipelineConfig): 'easy' | 'medium' | 'hard' {
  const r = Math.random()
  if (r < config.difficulty_distribution.easy) return 'easy'
  if (r < config.difficulty_distribution.easy + config.difficulty_distribution.medium) return 'medium'
  return 'hard'
}

function pickBloom(config: PipelineConfig): 'recall' | 'application' | 'analysis' {
  const r = Math.random()
  if (r < config.bloom_distribution.recall) return 'recall'
  if (r < config.bloom_distribution.recall + config.bloom_distribution.application) return 'application'
  return 'analysis'
}

function pickTopic(domain: string, paper: 'A' | 'B'): string {
  const topics = paper === 'A'
    ? DOMAIN_TOPICS[domain]
    : DOMAIN_TOPICS_PAPER_B[domain] || DOMAIN_TOPICS[domain]

  if (!topics || topics.length === 0) return 'general_' + domain
  return topics[Math.floor(Math.random() * topics.length)]
}

// ── Generator Agent ─────────────────────────────────────────

async function generateQuestion(
  config: PipelineConfig,
  difficulty: string,
  bloom: string,
  topic: string,
  attempt: number = 1
): Promise<GeneratedQuestion | null> {
  const maxAttempts = 3

  const prompt = `Generate a single MRCPsych ${config.paper} exam question in the domain of "${config.domain}", specifically about "${topic}".

Difficulty: ${difficulty} (easy = straightforward recall, medium = clinical application, hard = complex integration or subtle distinction)
Bloom's taxonomy level: ${bloom} (recall = factual knowledge, application = clinical scenario requiring judgement, analysis = interpreting evidence or synthesising concepts)

Format your response as EXACTLY this JSON structure:
{
  "stem": "Question text here...",
  "options": [" Option A", " Option B", " Option C", " Option D", " Option E"],
  "correct_index": 0,
  "distractors_rationale": [
    "Why option A is correct (or wrong)...",
    "Why option B is wrong...",
    "Why option C is wrong...",
    "Why option D is wrong...",
    "Why option E is wrong..."
  ],
  "teaching_point": "A concise, high-yield teaching point for exam revision...",
  "tags": ["tag1", "tag2", "tag3"]
}

IMPORTANT RULES:
- Options must start with a space: " Option text"
- correct_index must be 0-4
- distractors_rationale must have exactly 5 entries
- The teaching point must cite a real source (guideline, textbook, or landmark trial)
- Never include markdown formatting in the JSON
- Output ONLY the JSON, nothing else`

  try {
    const response = await openai.chat.completions.create({
      model: config.model_generator,
      messages: [
        { role: 'system', content: generatorSystemPrompt(config.paper, config.domain) },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7 + (attempt * 0.1), // slightly higher temp on retry
      max_tokens: 1200,
    })

    const text = response.choices[0]?.message?.content?.trim()
    if (!text) throw new Error('Empty response from generator')

    // Parse JSON — handle possible markdown wrapping
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')

    const raw = JSON.parse(jsonMatch[0])

    // Validate shape
    if (!raw.stem || !raw.options || raw.correct_index === undefined) {
      throw new Error('Missing required fields')
    }

    const question: GeneratedQuestion = {
      stem: raw.stem,
      options: raw.options,
      correct_index: raw.correct_index,
      distractors_rationale: raw.distractors_rationale || [],
      teaching_point: raw.teaching_point || '',
      domain: config.domain,
      difficulty: difficulty as any,
      bloom_taxonomy: bloom as any,
      paper: config.paper,
      tags: raw.tags || [],
      source: raw.source || undefined,
    }

    return question
  } catch (err: any) {
    if (attempt < maxAttempts) {
      console.log(`  ⚠ Retry ${attempt}/${maxAttempts}: ${err.message}`)
      await delay(2000)
      return generateQuestion(config, difficulty, bloom, topic, attempt + 1)
    }
    console.error(`  ✗ Failed after ${maxAttempts} attempts: ${err.message}`)
    return null
  }
}

// ── Reviewer Agent ──────────────────────────────────────────

async function reviewQuestion(
  question: GeneratedQuestion,
  config: PipelineConfig
): Promise<ReviewResult> {
  try {
    const response = await openai.chat.completions.create({
      model: config.model_reviewer,
      messages: [
        { role: 'system', content: reviewerSystemPrompt() },
        {
          role: 'user',
          content: `Review this MRCPsych ${config.paper} question:\n\n${JSON.stringify(question, null, 2)}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const text = response.choices[0]?.message?.content?.trim()
    if (!text) throw new Error('Empty review response')

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in review response')

    return JSON.parse(jsonMatch[0])
  } catch (err: any) {
    return {
      score: 0,
      issues: [`Review failed: ${err.message}`],
      clinical_accuracy: 'major_error',
      passes: false,
    }
  }
}

// ── Validator Agent ─────────────────────────────────────────

async function validateQuestion(
  question: GeneratedQuestion
): Promise<ValidationResult> {
  const errors: string[] = []

  if (!question.stem || question.stem.length < 10) errors.push('Stem too short or missing')
  if (!Array.isArray(question.options) || question.options.length !== 5) errors.push('Must have exactly 5 options')
  if (question.options.some(o => !o.startsWith(' '))) errors.push('Options must start with a space')
  if (question.correct_index < 0 || question.correct_index > 4) errors.push('correct_index must be 0-4')
  if (!['easy', 'medium', 'hard'].includes(question.difficulty)) errors.push('Invalid difficulty')
  if (!['recall', 'application', 'analysis'].includes(question.bloom_taxonomy)) errors.push('Invalid bloom_taxonomy')
  if (!question.domain) errors.push('Domain required')

  // Quick LLM check for subtle issues
  if (errors.length === 0) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: validatorSystemPrompt() },
          { role: 'user', content: JSON.stringify(question, null, 2) },
        ],
        temperature: 0.1,
        max_tokens: 300,
      })
      const text = response.choices[0]?.message?.content?.trim()
      if (text) {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0])
          if (!result.valid) {
            errors.push(...(result.errors || []))
          }
        }
      }
    } catch {
      // LLM validator is optional — don't fail on it
    }
  }

  return { valid: errors.length === 0, errors }
}

// ── Orchestrator ────────────────────────────────────────────

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function main() {
  // Parse config
  const config: PipelineConfig = {
    ...DEFAULT_CONFIG,
    domain: opts.domain || DEFAULT_CONFIG.domain,
    count: parseInt(opts.count) || DEFAULT_CONFIG.count,
    paper: (opts.paper as 'A' | 'B') || DEFAULT_CONFIG.paper,
    batch_size: parseInt(opts.batchSize) || DEFAULT_CONFIG.batch_size,
    model_generator: opts.modelGenerator || DEFAULT_CONFIG.model_generator,
    model_reviewer: opts.modelReviewer || DEFAULT_CONFIG.model_reviewer,
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY environment variable is required')
    console.error('Set it with:  export OPENAI_API_KEY=sk-...  (Linux/Mac)')
    console.error('  or:          set OPENAI_API_KEY=sk-...  (Windows)')
    process.exit(1)
  }

  // Determine domains to process
  let domains: string[]
  if (opts.all) {
    domains = Object.keys(config.paper === 'A' ? DOMAIN_TOPICS : { ...DOMAIN_TOPICS, ...DOMAIN_TOPICS_PAPER_B })
    config.count = Math.max(1, Math.floor(parseInt(opts.count) / domains.length))
  } else {
    domains = [config.domain]
  }

  console.log('╔════════════════════════════════════════════╗')
  console.log('║   MRCPsych Pro — Question Generator        ║')
  console.log('╚════════════════════════════════════════════╝')
  console.log('')
  console.log(`  Paper:      ${config.paper}`)
  console.log(`  Domains:    ${domains.join(', ')}`)
  console.log(`  Target:     ${opts.all ? parseInt(opts.count) : config.count} questions`)
  console.log(`  Model Gen:  ${config.model_generator}`)
  console.log(`  Model Rev:  ${config.model_reviewer}`)
  console.log(`  Batch:      ${config.batch_size} parallel`)
  console.log('')

  const allQuestions: GeneratedQuestion[] = []
  let totalAttempts = 0
  let totalPassed = 0
  let totalFailed = 0

  for (const domain of domains) {
    config.domain = domain
    const domainTarget = config.count
    let generated = 0
    let attempts = 0

    console.log(`\n📂 Domain: ${domain}`)

    while (generated < domainTarget && attempts < domainTarget * 4) {
      const batchSize = Math.min(config.batch_size, domainTarget - generated)
      const batch: Promise<GeneratedQuestion | null>[] = []

      for (let i = 0; i < batchSize; i++) {
        const difficulty = pickDifficulty(config)
        const bloom = pickBloom(config)
        const topic = pickTopic(config.domain, config.paper)
        totalAttempts++
        attempts++
        batch.push(generateQuestion(config, difficulty, bloom, topic))
      }

      const results = await Promise.all(batch)

      for (const question of results) {
        if (!question) {
          totalFailed++
          continue
        }

        // REVIEW
        process.stdout.write(`  · Reviewing...`)
        const review = await reviewQuestion(question, config)

        if (!review.passes) {
          totalFailed++
          process.stdout.write(` ✗ (score ${review.score}/10 — ${review.issues[0] || 'failed review'})\n`)
          continue
        }

        // VALIDATE
        process.stdout.write(` validating...`)
        const validation = await validateQuestion(question)

        if (!validation.valid) {
          totalFailed++
          process.stdout.write(` ✗ (${validation.errors[0]})\n`)
          continue
        }

        // PASSED
        allQuestions.push(question)
        generated++
        totalPassed++
        process.stdout.write(` ✓ (#${generated}/${domainTarget})\n`)
      }
    }

    console.log(`  → ${generated}/${domainTarget} questions generated for ${domain}`)
  }

  // ── Output ────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════')
  console.log(`  Total generated:  ${allQuestions.length}`)
  console.log(`  Pass rate:        ${totalAttempts > 0 ? Math.round((totalPassed / totalAttempts) * 100) : 0}%`)
  console.log(`  Total attempts:   ${totalAttempts}`)
  console.log('')

  if (allQuestions.length === 0) {
    console.error('ERROR: No questions passed the pipeline. Check your API key and model access.')
    process.exit(1)
  }

  // Write output
  const outputPath = opts.output || path.join(process.cwd(), 'generated-questions.json')
  fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 2), 'utf-8')
  console.log(`📄 Output: ${outputPath}`)
  console.log(`📥 Import via Admin → Import in the web app`)
  console.log('')
}
main().catch(console.error)
