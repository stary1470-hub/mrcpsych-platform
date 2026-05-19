export type Difficulty = 'easy' | 'medium' | 'hard'
export type BloomTaxonomy = 'recall' | 'application' | 'analysis'
export type PaperType = 'A' | 'B'
export type QuizMode = 'practice' | 'exam'
export type QuestionFormat = 'sba' | 'emi'

export interface QuestionItem {
  id: string
  question_id: string
  item_number: number
  item_text: string
  correct_indices: number[]  // array of option indices for multi-correct support
  marks: number
  item_rationale: string | null
}

export interface Question {
  id: string
  stem: string
  options: string[]
  correct_index: number  // for SBA; first item's correct_index for EMI (redundant but kept for backwards compat)
  distractors_rationale: string[] | null
  teaching_point: string | null
  domain: string
  subdomain: string | null
  difficulty: Difficulty | null
  bloom_taxonomy: BloomTaxonomy | null
  paper: PaperType
  tags: string[] | null
  source: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  // ── EMI fields ──
  format: QuestionFormat    // 'sba' or 'emi'
  option_labels: string[] | null  // e.g. ['A','B','C','D','E','F','G','H'] for EMI
  items: QuestionItem[] | null   // populated only for EMI questions
}

export interface QuestionInsert {
  stem: string
  options: string[]
  correct_index: number
  distractors_rationale?: string[]
  teaching_point?: string
  domain: string
  subdomain?: string
  difficulty?: Difficulty
  bloom_taxonomy?: BloomTaxonomy
  paper: PaperType
  tags?: string[]
  source?: string
  // ── EMI fields ──
  format?: QuestionFormat
  option_labels?: string[]
}

export interface UserProgress {
  id: string
  user_id: string
  question_id: string
  selected_index: number
  correct: boolean
  time_taken_seconds: number | null
  answered_at: string
}

export interface ItemProgress {
  id: string
  user_id: string
  question_item_id: string
  question_id: string
  selected_indices: number[]
  correct: boolean
  time_taken_seconds: number | null
  answered_at: string
}

export interface DomainStats {
  domain: string
  total_attempted: number
  total_correct: number
  percentage: number
}

export interface QuizSession {
  id: string
  domain: string | null
  questions: Question[]
  current_index: number
  answers: { question_id: string; selected_index: number; correct: boolean }[]
  started_at: string
}

// ── EMI-specific types ──────────────────────────────
export interface EmiItemAnswer {
  question_item_id: string
  selected_indices: number[]
  correct: boolean
  marks_awarded: number
  marks_total: number
}

export interface EmiAnswer {
  question_id: string
  items: EmiItemAnswer[]
}

/** Scoring modes for multi-correct EMI items */
export type EmiScoringMode = 'all_or_nothing' | 'partial_credit'

export const EMI_SCORING_MODE: EmiScoringMode = 'all_or_nothing'

/**
 * Score a single EMI item answer.
 * all_or_nothing: exact match only (arrays must be identical after sorting)
 * partial_credit: (correct_selected - incorrect_selected) / total_correct, min 0
 */
export function scoreEmiItem(
  selected: number[],
  correct: number[],
  mode: EmiScoringMode = EMI_SCORING_MODE,
): { correct: boolean; marks: number } {
  const sortedSelected = [...selected].sort((a, b) => a - b)
  const sortedCorrect = [...correct].sort((a, b) => a - b)

  if (mode === 'all_or_nothing') {
    const isCorrect =
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((v, i) => v === sortedCorrect[i])
    return { correct: isCorrect, marks: isCorrect ? 1 : 0 }
  }

  // Partial credit mode
  if (sortedCorrect.length === 0) return { correct: true, marks: 1 }
  const correctSet = new Set(sortedCorrect)
  const selectedSet = new Set(sortedSelected)

  let correctSelected = 0
  let incorrectSelected = 0
  for (const s of sortedSelected) {
    if (correctSet.has(s)) correctSelected++
    else incorrectSelected++
  }
  const missed = sortedCorrect.length - correctSelected
  const raw = (correctSelected - incorrectSelected) / sortedCorrect.length
  const marks = Math.max(0, raw)
  return { correct: marks >= 1, marks }
}

// ── Exam Mode Configuration ────────────────────────
export interface ExamConfig {
  totalMinutes: number      // Total exam time in minutes
  totalQuestions: number    // Expected number of questions
  emiWeight: number         // Time multiplier for EMI questions (1.5 = 50% more time)
}

// Default MRCPsych exam config: 3 hours, 200 questions, EMIs weighted 1.5x
export const EXAM_CONFIG_DEFAULT: ExamConfig = {
  totalMinutes: 180,
  totalQuestions: 200,
  emiWeight: 1.5,
}

// localStorage keys for state persistence across navigations
export const EXAM_STORAGE_KEY = 'psychstar_exam_state'
export const PRACTICE_STORAGE_KEY = 'psychstar_practice_state'

export interface PracticeState {
  questionIds: string[]  // Shuffled list of all question IDs for this session
  currentIndex: number   // Index into questionIds for the current question
  answeredIds: string[]  // Questions already answered this session
  startedAt: number      // epoch ms when practice started
  domain: string | null
  paper: string | null
}

export interface ExamState {
  startedAt: number       // epoch ms when exam started
  answeredIds: string[]   // question IDs answered so far
  answers: { questionId: string; selectedIndex: number; correct: boolean; timeTakenSeconds: number }[]
  totalQuestions: number  // total questions in this exam session
}

/**
 * Calculate per-question time allocation (in seconds).
 *
 * For a standard question: totalSeconds / totalQuestions
 * For an EMI (stem with multiple sub-questions): standard * emiWeight
 *
 * The remaining time is divided among remaining questions, so later questions
 * get slightly more time if earlier ones were answered quickly.
 */
export function calculateQuestionTime(
  totalSecondsRemaining: number,
  questionsRemaining: number,
  isEmi: boolean = false,
  emiWeight: number = EXAM_CONFIG_DEFAULT.emiWeight
): number {
  if (questionsRemaining <= 0) return 0
  const baseTime = totalSecondsRemaining / questionsRemaining
  return Math.floor(isEmi ? baseTime * emiWeight : baseTime)
}

/**
 * Detect if a question is an EMI.
 * Prefers explicit `format` field; falls back to heuristic for migrated data.
 */
export function isEmiQuestion(q: { format?: QuestionFormat; stem?: string }): boolean {
  if (q.format === 'emi') return true
  if (q.format === 'sba') return false
  // Heuristic fallback for legacy data without format field
  const stem = q.stem || ''
  if (stem.length > 250) return true
  const emiMarkers = [
    'For each patient',
    'For each scenario',
    'Select the most appropriate',
    'For each description',
    'Match each',
    'Which of the following applies to each',
  ]
  return emiMarkers.some(marker => stem.toLowerCase().includes(marker.toLowerCase()))
}

/**
 * Get option label from index (A, B, C, ...).
 * For EMI questions, uses the question's option_labels if available, else falls back to A–Z.
 */
export function getOptionLabel(index: number, optionLabels?: string[] | null): string {
  if (optionLabels && index < optionLabels.length) return optionLabels[index]
  return String.fromCharCode(65 + index) // A, B, C, D, E...
}

// ═══════════════════════════════════════════
// Official RCPSYCH Syllabus Domains
// Source: https://www.rcpsych.ac.uk/training/exams/preparing-for-exams
// ═══════════════════════════════════════════

export interface DomainInfo {
  key: string
  name: string
  weight: number  // percentage of exam marks
  marks: number   // approximate marks allocated
}

// Paper A — Scientific and Theoretical Basis of Psychiatry (150 marks, 150 Qs, 3 hours)
export const DOMAINS_PAPER_A_INFO: DomainInfo[] = [
  { key: 'behavioural_science', name: 'Behavioural Science & Sociocultural Psychiatry', weight: 16.67, marks: 25 },
  { key: 'human_development', name: 'Human Development', weight: 16.67, marks: 25 },
  { key: 'basic_neurosciences', name: 'Basic Neurosciences', weight: 25.00, marks: 38 },
  { key: 'psychopharmacology', name: 'Clinical Psychopharmacology', weight: 25.00, marks: 37 },
  { key: 'classification_assessment', name: 'Classification & Assessment', weight: 16.67, marks: 25 },
]

export const DOMAINS_PAPER_A = DOMAINS_PAPER_A_INFO.map(d => d.key) as string[]

// Paper B — Critical Review & Clinical Topics (150 marks, 150 Qs, 3 hours)
export const DOMAINS_PAPER_B_INFO: DomainInfo[] = [
  { key: 'critical_review', name: 'Critical Review', weight: 33.50, marks: 50 },
  { key: 'general_adult', name: 'General Adult Psychiatry', weight: 20.00, marks: 30 },
  { key: 'old_age', name: 'Old Age Psychiatry', weight: 9.00, marks: 14 },
  { key: 'child_adolescent', name: 'Child & Adolescent Psychiatry', weight: 9.00, marks: 14 },
  { key: 'substance_misuse', name: 'Substance Misuse', weight: 6.50, marks: 10 },
  { key: 'organisation_delivery', name: 'Organisation & Delivery of Psychiatry', weight: 5.50, marks: 8 },
  { key: 'psychotherapy', name: 'Psychotherapy', weight: 5.50, marks: 8 },
  { key: 'forensic', name: 'Forensic Psychiatry', weight: 5.50, marks: 8 },
  { key: 'learning_disability', name: 'Learning Disability Psychiatry', weight: 5.50, marks: 8 },
]

export const DOMAINS_PAPER_B = DOMAINS_PAPER_B_INFO.map(d => d.key) as string[]
