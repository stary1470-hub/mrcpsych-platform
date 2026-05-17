export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index) // A, B, C, D, E
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getDomainColor(domain: string): string {
  const colors: Record<string, string> = {
    psychopharmacology: '#4b7bec',
    neurobiology: '#22c55e',
    psychopathology: '#8b5cf6',
    classification: '#f59e0b',
    psychometrics: '#f43f5e',
    research_methodology: '#06b6d4',
    genetics: '#6366f1',
    epidemiology: '#14b8a6',
    affective_disorders: '#ec4899',
    psychotic_disorders: '#f97316',
    anxiety_disorders: '#0ea5e9',
    personality_disorders: '#d946ef',
    legislation_mha: '#ef4444',
    legislation_mca: '#eab308',
    psychotherapy: '#22c55e',
    child_adolescent: '#a855f7',
    forensic_psychiatry: '#78716c',
    learning_disability: '#84cc16',
    old_age_psychiatry: '#64748b',
    substance_misuse: '#d97706',
    liaison_psychiatry: '#0d9488',
    perinatal_psychiatry: '#fb7185',
  }
  return colors[domain] || '#6b7280'
}

export function getDomainDisplayName(domain: string): string {
  const names: Record<string, string> = {
    psychopharmacology: 'Psychopharmacology',
    neurobiology: 'Neurobiology',
    psychopathology: 'Psychopathology',
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
    psychotherapy: 'Psychotherapy',
    child_adolescent: 'Child & Adolescent',
    forensic_psychiatry: 'Forensic Psychiatry',
    learning_disability: 'Learning Disability',
    old_age_psychiatry: 'Old Age Psychiatry',
    substance_misuse: 'Substance Misuse',
    liaison_psychiatry: 'Liaison Psychiatry',
    perinatal_psychiatry: 'Perinatal Psychiatry',
  }
  return names[domain] || domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
