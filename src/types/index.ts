export type Difficulty = 'easy' | 'medium' | 'hard'
export type BloomTaxonomy = 'recall' | 'application' | 'analysis'
export type PaperType = 'A' | 'B'

export interface Question {
  id: string
  stem: string
  options: string[]
  correct_index: number
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

export const DOMAINS_PAPER_A = [
  'psychopharmacology',
  'neurobiology',
  'psychopathology',
  'classification',
  'psychometrics',
  'research_methodology',
  'genetics',
  'epidemiology',
] as const

export const DOMAINS_PAPER_B = [
  'affective_disorders',
  'psychotic_disorders',
  'anxiety_disorders',
  'personality_disorders',
  'legislation_mha',
  'legislation_mca',
  'psychotherapy',
  'child_adolescent',
  'forensic_psychiatry',
  'learning_disability',
  'old_age_psychiatry',
  'substance_misuse',
  'liaison_psychiatry',
  'perinatal_psychiatry',
] as const
