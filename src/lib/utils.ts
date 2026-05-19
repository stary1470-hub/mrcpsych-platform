export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function getOptionLabel(index: number, optionLabels?: string[] | null): string {
  if (optionLabels && index < optionLabels.length) return optionLabels[index]
  return String.fromCharCode(65 + index) // A, B, C, D, E...
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Get question format badge label
 */
export function getFormatLabel(format?: string): string {
  if (format === 'emi') return 'EMI'
  return 'SBA'
}

/**
 * Calculate total marks for a question (SBA = 1, EMI = sum of item marks)
 */
export function getQuestionTotalMarks(items?: { marks?: number }[] | null): number {
  if (!items || items.length === 0) return 1
  return items.reduce((sum, item) => sum + (item.marks || 1), 0)
}

export function getDomainColor(domain: string): string {
  const colors: Record<string, string> = {
    // Paper A
    behavioural_science: '#8b5cf6',
    human_development: '#22c55e',
    basic_neurosciences: '#4b7bec',
    psychopharmacology: '#f59e0b',
    classification_assessment: '#f43f5e',
    // Paper B
    critical_review: '#06b6d4',
    general_adult: '#ec4899',
    old_age: '#64748b',
    child_adolescent: '#a855f7',
    substance_misuse: '#d97706',
    organisation_delivery: '#14b8a6',
    psychotherapy: '#22c55e',
    forensic: '#78716c',
    learning_disability: '#84cc16',
    // Legacy mappings (for existing DB data)
    psychopathology: '#8b5cf6',
    neurobiology: '#4b7bec',
    classification: '#f43f5e',
    psychometrics: '#ef4444',
    research_methodology: '#06b6d4',
    genetics: '#6366f1',
    epidemiology: '#14b8a6',
    affective_disorders: '#ec4899',
    psychotic_disorders: '#f97316',
    anxiety_disorders: '#0ea5e9',
    personality_disorders: '#d946ef',
    legislation_mha: '#ef4444',
    legislation_mca: '#eab308',
    forensic_psychiatry: '#78716c',
    old_age_psychiatry: '#64748b',
    liaison_psychiatry: '#0d9488',
    perinatal_psychiatry: '#fb7185',
  }
  return colors[domain] || '#6b7280'
}

export function getDomainDisplayName(domain: string): string {
  const names: Record<string, string> = {
    // Paper A
    behavioural_science: 'Behavioural Science',
    human_development: 'Human Development',
    basic_neurosciences: 'Basic Neurosciences',
    psychopharmacology: 'Clinical Psychopharmacology',
    classification_assessment: 'Classification & Assessment',
    // Paper B
    critical_review: 'Critical Review',
    general_adult: 'General Adult Psychiatry',
    old_age: 'Old Age Psychiatry',
    child_adolescent: 'Child & Adolescent',
    substance_misuse: 'Substance Misuse',
    organisation_delivery: 'Organisation & Delivery',
    psychotherapy: 'Psychotherapy',
    forensic: 'Forensic Psychiatry',
    learning_disability: 'Learning Disability',
    // Legacy mappings
    psychopathology: 'Psychopathology',
    neurobiology: 'Neurobiology',
    classification: 'Classification',
    psychometrics: 'Psychometrics',
    research_methodology: 'Research Methodology',
    genetics: 'Genetics',
    epidemiology: 'Epidemiology',
    affective_disorders: 'Affective Disorders',
    psychotic_disorders: 'Psychotic Disorders',
    anxiety_disorders: 'Anxiety Disorders',
    personality_disorders: 'Personality Disorders',
    legislation_mha: 'MHA Legislation',
    legislation_mca: 'MCA Legislation',
    forensic_psychiatry: 'Forensic Psychiatry',
    old_age_psychiatry: 'Old Age Psychiatry',
    liaison_psychiatry: 'Liaison Psychiatry',
    perinatal_psychiatry: 'Perinatal Psychiatry',
  }
  return names[domain] || domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
