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
    psychopharmacology: 'bg-blue-500',
    neurobiology: 'bg-emerald-500',
    psychopathology: 'bg-violet-500',
    classification: 'bg-amber-500',
    psychometrics: 'bg-rose-500',
    research_methodology: 'bg-cyan-500',
    genetics: 'bg-indigo-500',
    epidemiology: 'bg-teal-500',
    affective_disorders: 'bg-pink-500',
    psychotic_disorders: 'bg-orange-500',
    anxiety_disorders: 'bg-sky-500',
    personality_disorders: 'bg-fuchsia-500',
    legislation_mha: 'bg-red-500',
    legislation_mca: 'bg-yellow-500',
    psychotherapy: 'bg-green-500',
    child_adolescent: 'bg-purple-500',
    forensic_psychiatry: 'bg-stone-500',
    learning_disability: 'bg-lime-500',
    old_age_psychiatry: 'bg-slate-500',
    substance_misuse: 'bg-amber-600',
    liaison_psychiatry: 'bg-teal-600',
    perinatal_psychiatry: 'bg-rose-400',
  }
  return colors[domain] || 'bg-gray-400'
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
