/**
 * PsychStar — Adaptive Engine
 *
 * Core algorithm: Wilson score proficiency estimation + weak-domain-first selection.
 *
 * DESIGN:
 * - Uses Wilson Score Lower Bound (conservative estimate) to rank domains from weakest to strongest
 * - Domains with 0 attempts get highest priority (need diagnostic data)
 * - Within a domain, picks appropriate difficulty based on current performance
 * - Completely stateless — recalculates from user_progress on each request
 */

export interface DomainProficiency {
  domain: string
  total: number
  attempted: number
  correct: number
  wilson: number     // Wilson score lower bound (0-1), conservative ability estimate
  remaining: number
}

export interface AdaptiveSelection {
  question: any | null
  domain: string | null
  session_stats: {
    total_attempted: number
    total_correct: number
    domains_done: number
    domains_total: number
  }
  all_done: boolean
}

/**
 * Wilson score lower bound — conservative estimate of true ability.
 *
 * Handles small sample sizes better than raw percentage:
 * - 3/3 = 100% → wilson ≈ 0.38 (highly uncertain)
 * - 30/30 = 100% → wilson ≈ 0.88 (confident mastery)
 * - 15/30 = 50% → wilson ≈ 0.33 (low confidence in true ability)
 */
export function wilsonLowerBound(correct: number, total: number, z: number = 1.96): number {
  if (total === 0) return 0
  const p = correct / total
  const denominator = 1 + (z * z) / total
  const centre = p + (z * z) / (2 * total)
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * total)) / total)
  return Math.max(0, (centre - margin) / denominator)
}

/**
 * Rank domains from weakest → strongest using Wilson lower bound.
 *
 * Sorting rules:
 * 1. Unattempted domains first (we need diagnostic data)
 * 2. Then lowest wilson score first (weakest domain)
 * 3. Tiebreaker: more remaining questions first
 */
export function rankDomainsByWeakness(
  domainCounts: Map<string, number>,
  answeredByDomain: Map<string, { attempted: number; correct: number }>
): DomainProficiency[] {
  const domains = Array.from(domainCounts.keys())

  return domains
    .map(d => {
      const stats = answeredByDomain.get(d) || { attempted: 0, correct: 0 }
      const total = domainCounts.get(d) || 0
      return {
        domain: d,
        total,
        attempted: stats.attempted,
        correct: stats.correct,
        wilson: wilsonLowerBound(stats.correct, stats.attempted),
        remaining: total - stats.attempted,
      }
    })
    .sort((a, b) => {
      // Unattempted domains first (need data)
      if (a.attempted === 0 && b.attempted > 0) return -1
      if (b.attempted === 0 && a.attempted > 0) return 1
      // Both attempted: weakest first by wilson score
      if (a.wilson !== b.wilson) return a.wilson - b.wilson
      // Tiebreaker: more remaining first
      return b.remaining - a.remaining
    })
}

/**
 * Calculate session stats from the ranked domains.
 */
export function computeSessionStats(ranked: DomainProficiency[]): {
  total_attempted: number
  total_correct: number
  domains_done: number
  domains_total: number
} {
  return {
    total_attempted: ranked.reduce((s, d) => s + d.attempted, 0),
    total_correct: ranked.reduce((s, d) => s + d.correct, 0),
    domains_done: ranked.filter(d => d.attempted > 0).length,
    domains_total: ranked.length,
  }
}

/**
 * Pick a difficulty level appropriate for the user's current performance in a domain.
 *
 *   < 40%  → easy/medium (foundations need work)
 *   40-80% → medium (consolidation)
 *   > 80%  → medium/hard (stretch)
 */
export function pickDifficulty(pct: number): string[] {
  if (pct < 0.4) return ['easy', 'medium']
  if (pct > 0.8) return ['medium', 'hard']
  return ['easy', 'medium', 'hard']
}

/**
 * Select the next best question for the user based on adaptive ranking.
 *
 * Called statelessly — reads current user_progress each time.
 * Returns the question or all_done=true if no questions remain.
 */
export async function selectNextAdaptiveQuestion(
  supabase: any,
  userId: string,
  excludeQuestionId?: string
): Promise<AdaptiveSelection> {
  // 1. Get all active questions with domain + difficulty
  const { data: allQuestions } = await supabase
    .from('questions')
    .select('id, domain, difficulty')
    .eq('is_active', true)

  if (!allQuestions || allQuestions.length === 0) {
    return {
      question: null,
      domain: null,
      session_stats: { total_attempted: 0, total_correct: 0, domains_done: 0, domains_total: 0 },
      all_done: true,
    }
  }

  // 2. Count per-domain totals
  const domainCounts = new Map<string, number>()
  for (const q of allQuestions) {
    domainCounts.set(q.domain, (domainCounts.get(q.domain) || 0) + 1)
  }

  // 3. Get user's answer history with domain info
  const { data: answeredRaw } = await supabase
    .from('user_progress')
    .select('question_id, correct, questions!inner(domain)')
    .eq('user_id', userId)

  const answered = answeredRaw || []
  const answeredIds = new Set<string>(answered.map((a: any) => a.question_id))

  // 4. Aggregate stats per domain
  const domainStats = new Map<string, { attempted: number; correct: number }>()
  for (const domain of domainCounts.keys()) {
    domainStats.set(domain, { attempted: 0, correct: 0 })
  }
  for (const entry of answered) {
    const domain = (entry as any).questions?.domain
    if (domain && domainStats.has(domain)) {
      const s = domainStats.get(domain)!
      s.attempted++
      if (entry.correct) s.correct++
    }
  }

  // 5. Rank domains weakest-first
  const ranked = rankDomainsByWeakness(domainCounts, domainStats)
  const sessionStats = computeSessionStats(ranked)

  // 6. Find best candidate question
  for (const entry of ranked) {
    if (entry.remaining <= 0) continue

    let query = supabase
      .from('questions')
      .select('*')
      .eq('is_active', true)
      .eq('domain', entry.domain)

    // Exclude already answered questions
    const excludeIds: string[] = Array.from(answeredIds)
    if (excludeQuestionId && !excludeIds.includes(excludeQuestionId)) {
      excludeIds.push(excludeQuestionId)
    }
    if (excludeIds.length > 0) {
      query = query.not('id', 'in', `(${excludeIds.join(',')})`)
    }

    // Select difficulty based on performance
    if (entry.attempted > 0) {
      const pct = entry.correct / entry.attempted
      query = query.in('difficulty', pickDifficulty(pct))
    }

    // Get candidates
    const { data: candidates } = await query.limit(5)
    if (candidates && candidates.length > 0) {
      const shuffled = [...candidates].sort(() => Math.random() - 0.5)
      return {
        question: shuffled[0],
        domain: entry.domain,
        session_stats: sessionStats,
        all_done: false,
      }
    }

    // Fallback: any difficulty in this domain
    if (excludeIds.length > 0) {
      let fbQuery = supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .eq('domain', entry.domain)
        .not('id', 'in', `(${excludeIds.join(',')})`)

      const { data: fallback } = await fbQuery.limit(1)
      if (fallback && fallback.length > 0) {
        return {
          question: fallback[0],
          domain: entry.domain,
          session_stats: sessionStats,
          all_done: false,
        }
      }
    }
  }

  // 7. Everything answered
  return {
    question: null,
    domain: null,
    session_stats: sessionStats,
    all_done: true,
  }
}
