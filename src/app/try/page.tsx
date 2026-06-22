'use client'

import { useState } from 'react'

interface DemoQuestion {
  stem: string
  options: string[]
  correctIndex: number
  explanation: string
  distractorExplanations: string[]
  domain: string
  difficulty: string
  paper: string
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    stem: 'A 34-year-old woman presents with a 4-week history of low mood, anhedonia, poor concentration, reduced energy, and early morning wakening. She has no prior psychiatric history. PHQ-9 score is 16. She is medically well and takes no regular medications. According to NICE guidelines, what is the most appropriate first-line management?',
    options: [
      'Sertraline 50mg daily and watchful waiting',
      'High-intensity psychological therapy (CBT or IPT) alone',
      'Sertraline 50mg daily plus low-intensity psychosocial intervention',
      'Venlafaxine 75mg daily',
      'Referral to crisis team for urgent assessment',
    ],
    correctIndex: 2,
    explanation:
      'NICE stepped care for depression: For moderate depression (PHQ-9 10–19), offer an antidepressant (SSRI first-line — sertraline preferred) OR high-intensity psychological therapy (CBT/IPT). A low-intensity psychosocial intervention (guided self-help, exercise) should be offered alongside. Sertraline is first-line SSRI due to good tolerability and safety in overdose.',
    distractorExplanations: [
      'Watchful waiting is for subthreshold/mild depression (PHQ-9 < 10). A PHQ-9 of 16 indicates moderate depression requiring active treatment.',
      'High-intensity psychological therapy alone is appropriate when the patient declines medication, but NICE recommends offering combination treatment for moderate depression.',
      'CORRECT. NICE CG90 recommends for moderate depression: offer antidepressant medication OR high-intensity psychological intervention, combined with low-intensity psychosocial support.',
      'Venlafaxine is not first-line for moderate depression. NICE recommends SSRIs (sertraline, fluoxetine, citalopram) as first-line due to better tolerability.',
      'Crisis team referral is for acute risk (suicidality, self-harm, psychotic depression). There is no indication of acute risk in this presentation.',
    ],
    domain: 'General Adult',
    difficulty: 'Medium',
    paper: 'Paper B',
  },
  {
    stem: 'A 28-year-old man with a history of epilepsy (well-controlled on lamotrigine) presents with a 5-week history of low mood, anhedonia, poor sleep, and suicidal ideation without plan. PHQ-9 is 18. Which antidepressant is the safest first-line choice given his epilepsy?',
    options: [
      'Sertraline',
      'Mirtazapine',
      'Amitriptyline',
      'Venlafaxine',
      'Bupropion',
    ],
    correctIndex: 1,
    explanation:
      'Antidepressant choice in epilepsy: Mirtazapine (NaSSA) has the lowest seizure risk, making it the safest choice. SSRIs (sertraline, fluoxetine, citalopram) are generally safe but carry a small increased risk at high doses. TCAs are proconvulsant (amitriptyline highest risk). Bupropion is contraindicated in epilepsy.',
    distractorExplanations: [
      'Sertraline is generally safe in epilepsy but carries a slightly increased risk of seizures at higher doses. It is not the safest choice.',
      'CORRECT. Mirtazapine is the safest antidepressant in patients with epilepsy. It has the lowest seizure risk of all antidepressant classes.',
      'Tricyclic antidepressants, especially amitriptyline, are PROCONVULSANT. They lower the seizure threshold and should be avoided in epilepsy.',
      'Venlafaxine (SNRI) at higher doses (>150mg) is associated with increased seizure risk and is also more dangerous in overdose.',
      'Bupropion is absolutely contraindicated in epilepsy. It is a noradrenaline-dopamine reuptake inhibitor with known proconvulsant effects.',
    ],
    domain: 'General Adult',
    difficulty: 'Hard',
    paper: 'Paper B',
  },
  {
    stem: 'A 52-year-old man is referred with a 6-month history of low mood, poor concentration, reduced energy, and anhedonia. He has insulin-dependent type 2 diabetes with HbA1c of 78 mmol/mol. PHQ-9 is 17. He was previously tried on sertraline 100mg daily for 8 weeks with no improvement. What is the most appropriate next-step antidepressant?',
    options: [
      'Increase sertraline to 200mg daily',
      'Switch to fluoxetine 20mg daily',
      'Switch to mirtazapine 30mg daily',
      'Switch to venlafaxine 75mg daily',
      'Augment sertraline with aripiprazole 2mg daily',
    ],
    correctIndex: 2,
    explanation:
      'After first antidepressant failure, NICE recommends: (1) check adherence, (2) check diagnosis (is it bipolar depression?), (3) consider switching to a different class (e.g., SSRI → NaSSA/SNRI). Mirtazapine is preferred here because SSRIs can worsen glycaemic control in diabetes, while mirtazapine can improve appetite and sleep. It also has the lowest sexual dysfunction rate of all antidepressants.',
    distractorExplanations: [
      'Sertraline 100mg is already therapeutic. 8 weeks with no response warrants a switch, not a dose increase to the maximum.',
      'Switching to another SSRI (fluoxetine) after SSRI failure is called "class switching" — reasonable but less effective than switching class entirely.',
      'CORRECT. Mirtazapine is a good choice in depression comorbid with diabetes because it can improve appetite/weight in underweight patients and has no negative glycaemic effect.',
      'Venlafaxine is an option after SSRI failure but requires BP monitoring and is more dangerous in overdose. Mirtazapine is a better fit here.',
      'Augmentation is reserved for treatment-resistant depression after failure of two or more antidepressants. First step is to switch class.',
    ],
    domain: 'General Adult',
    difficulty: 'Hard',
    paper: 'Paper B',
  },
  {
    stem: 'According to the STAR*D trial, what is the cumulative remission rate after up to four sequential treatment steps for major depressive disorder?',
    options: [
      'Approximately 47%',
      'Approximately 67%',
      'Approximately 53%',
      'Approximately 37%',
      'Approximately 80%',
    ],
    correctIndex: 1,
    explanation:
      'STAR*D (Rush et al., 2006) is the landmark pragmatic trial of treatment-resistant depression. Step 1 (citalopram) remission = 36.8%; cumulative remission after 4 steps = ~67%. Approximately 1 in 3 patients remain depressed despite multiple adequate trials. Key MRCPsych take-home: no significant difference between switch and augment strategies at any level.',
    distractorExplanations: [
      '47% is the remission rate after Level 2 (switch/augment) only — not the cumulative rate across all 4 levels.',
      'CORRECT. The STAR*D trial found cumulative remission of approximately 67% after up to 4 sequential treatment steps.',
      '53% does not correspond to any specific STAR*D outcome.',
      '37% is the Level 1 (citalopram monotherapy) remission rate — not cumulative.',
      '80% overestimates. Even with aggressive treatment, approximately 33% of patients do not remit.',
    ],
    domain: 'General Adult',
    difficulty: 'Medium',
    paper: 'Paper B',
  },
  {
    stem: 'A 68-year-old man presents with low mood, poor appetite, and early morning wakening 4 weeks after an ischaemic stroke affecting his left MCA territory. He has a history of hypertension and a GI bleed 2 years ago requiring transfusion. Mental State Examination reveals depressive cognitions but no psychotic features. PHQ-9 is 15. Which antidepressant is the safest and most appropriate first-line choice?',
    options: [
      'Amitriptyline 50mg nocte',
      'Sertraline 50mg daily',
      'Nortriptyline 25mg nocte',
      'Citalopram 20mg daily',
      'Phenelzine 15mg TDS',
    ],
    correctIndex: 2,
    explanation:
      'Post-stroke depression affects ~30% of stroke survivors. Nortriptyline is preferred here because: (1) it has the best evidence in post-stroke depression, (2) fewer anticholinergic effects than amitriptyline, (3) safer than SSRIs in patients with GI bleeding history (SSRIs deplete platelet serotonin, increasing bleeding risk).',
    distractorExplanations: [
      'Amitriptyline has significant anticholinergic burden, sedation, and postural hypotension — risky in elderly post-stroke patients.',
      'SSRIs (including sertraline) are associated with increased GI bleeding risk due to platelet serotonin depletion. In a patient with prior GI bleed requiring transfusion, SSRIs should be used cautiously.',
      'CORRECT. Nortriptyline is a TCA with fewer side effects than amitriptyline and the best evidence base for post-stroke depression.',
      'Citalopram carries QTc prolongation risk (>40mg, >20mg in over-65s). Combined with post-stroke cardiac vulnerability, this is suboptimal.',
      'MAOIs (phenelzine) require dietary restrictions and carry risk of hypertensive crisis. Reserved for treatment-resistant cases only.',
    ],
    domain: 'General Adult',
    difficulty: 'Hard',
    paper: 'Paper B',
  },
  {
    stem: 'Which neurotransmitter receptor is the primary target of atypical antipsychotics such as clozapine and olanzapine, distinguishing them from typical antipsychotics?',
    options: [
      'D2 dopamine receptor antagonism',
      '5-HT2A serotonin receptor antagonism',
      'Alpha-1 adrenergic receptor antagonism',
      'Muscarinic M1 receptor antagonism',
      'Histamine H1 receptor antagonism',
    ],
    correctIndex: 1,
    explanation:
      'Atypical antipsychotics are characterised by higher affinity for 5-HT2A receptors relative to D2 receptors (higher 5-HT2A/D2 ratio). This serotonin-dopamine antagonism hypothesis explains their lower extrapyramidal side effect profile and efficacy in treatment-resistant schizophrenia. Clozapine has the highest 5-HT2A/D2 affinity ratio.',
    distractorExplanations: [
      'D2 antagonism is the primary mechanism of TYPICAL antipsychotics (e.g., haloperidol). Atypicals have lower D2 affinity.',
      'CORRECT. 5-HT2A antagonism is the defining feature of atypical antipsychotics, explaining their lower EPS profile.',
      'Alpha-1 antagonism causes postural hypotension — a side effect, not the therapeutic mechanism.',
      'M1 antagonism causes anticholinergic side effects (dry mouth, constipation) — not therapeutic.',
      'H1 antagonism causes sedation and weight gain — side effects, not therapeutic targets.',
    ],
    domain: 'Clinical Psychopharmacology',
    difficulty: 'Medium',
    paper: 'Paper A',
  },
  {
    stem: 'Under the Mental Health Act 1983 (as amended 2007), which section allows for compulsory admission for assessment for up to 28 days?',
    options: [
      'Section 2',
      'Section 3',
      'Section 4',
      'Section 5(2)',
      'Section 136',
    ],
    correctIndex: 0,
    explanation:
      'Section 2 MHA allows detention for assessment for up to 28 days. Requires application by AMHP or nearest relative, supported by TWO medical recommendations (one must be Section 12 approved). Cannot be renewed. Section 3 is for treatment (up to 6 months, renewable).',
    distractorExplanations: [
      'CORRECT. Section 2 = assessment, up to 28 days, 2 medical recommendations, non-renewable.',
      'Section 3 = treatment, up to 6 months initially, renewable (6 months → 6 months → 12 months). Requires 2 medical recommendations.',
      'Section 4 = emergency admission for assessment (up to 72 hours). Requires only ONE medical recommendation. Used when waiting for second doctor would cause delay.',
      'Section 5(2) = doctors holding power (up to 72 hours). Used by the responsible clinician to detain an informal patient already in hospital.',
      'Section 136 = police power to remove person from public place to place of safety (up to 24 hours). Not a hospital admission section.',
    ],
    domain: 'Legislation',
    difficulty: 'Easy',
    paper: 'Paper A',
  },
  {
    stem: 'A 7-year-old child presents with persistent difficulties in social communication, restricted repetitive behaviours, and intense preoccupation with trains. Symptoms have been present since early childhood and impair functioning at school. Which diagnosis is most likely?',
    options: [
      'Attention deficit hyperactivity disorder',
      'Autism spectrum disorder',
      'Social communication disorder',
      'Obsessive-compulsive disorder',
      'Schizoid personality disorder',
    ],
    correctIndex: 1,
    explanation:
      'Autism spectrum disorder (ASD) is characterised by: (1) persistent deficits in social communication/interaction across multiple contexts, AND (2) restricted, repetitive patterns of behaviour, interests, or activities. Symptoms must be present in early developmental period and cause clinically significant impairment. DSM-5 replaced Asperger\'s, childhood disintegrative disorder, and PDD-NOS with ASD.',
    distractorExplanations: [
      'ADHD involves inattention, hyperactivity, impulsivity — not the core social communication deficits and repetitive behaviours seen here.',
      'CORRECT. ASD = social communication deficits + restricted/repetitive behaviours + early onset + functional impairment.',
      'Social communication disorder involves social communication deficits WITHOUT the restricted/repetitive behaviours. This child has both.',
      'OCD involves obsessions and compulsions, not the pervasive social communication deficits and developmental onset seen in ASD.',
      'Schizoid personality disorder involves detachment from social relationships but not repetitive behaviours or early developmental onset. Personality disorders are not diagnosed in children.',
    ],
    domain: 'Child & Adolescent',
    difficulty: 'Medium',
    paper: 'Paper B',
  },
  {
    stem: 'Which psychological therapy has the strongest evidence base for treating bulimia nervosa according to NICE guidelines?',
    options: [
      'Psychodynamic psychotherapy',
      'Cognitive behavioural therapy (CBT-BN)',
      'Interpersonal psychotherapy',
      'Dialectical behaviour therapy',
      'Family therapy',
    ],
    correctIndex: 1,
    explanation:
      'NICE guidelines recommend CBT-BN (adapted CBT for bulimia) as first-line psychological treatment for bulimia nervosa. CBT-BN focuses on: (1) psychoeducation, (2) establishing regular eating patterns, (3) identifying triggers for binge/purge cycles, (4) challenging dietary rules, (5) addressing body image concerns. Remission rates ~30-50%.',
    distractorExplanations: [
      'Psychodynamic therapy has limited evidence for bulimia nervosa. Not recommended as first-line by NICE.',
      'CORRECT. CBT-BN is first-line for bulimia nervosa per NICE. Adapted protocol with specific focus on binge-purge cycle.',
      'IPT is second-line for bulimia (less effective than CBT-BN but an option if CBT declined or unavailable).',
      'DBT is used for borderline personality disorder and sometimes adapted for binge eating disorder, but not first-line for bulimia.',
      'Family therapy (e.g., Maudsley model) is first-line for adolescent anorexia nervosa, not bulimia.',
    ],
    domain: 'Psychotherapy',
    difficulty: 'Medium',
    paper: 'Paper B',
  },
  {
    stem: 'An 82-year-old woman with vascular dementia becomes increasingly agitated in the evenings, wandering and asking for her deceased husband. Her daughter is distressed. What is the most appropriate first-line management?',
    options: [
      'Prescribe haloperidol 0.5mg PRN',
      'Prescribe donepezil 5mg daily',
      'Non-pharmacological interventions and carer education',
      'Prescribe lorazepam 0.5mg PRN',
      'Refer for ECT assessment',
    ],
    correctIndex: 2,
    explanation:
      'NICE guidelines for dementia: first-line management of behavioural and psychological symptoms of dementia (BPSD) is ALWAYS non-pharmacological. This includes: identifying triggers (pain, infection, environment), structured activities, music therapy, carer education, simplifying environment. Antipsychotics (if absolutely necessary for severe distress/risk) should be low-dose, time-limited, and reviewed regularly. Donepezil is for cognitive symptoms, not BPSD.',
    distractorExplanations: [
      'Haloperidol (typical antipsychotic) is contraindicated in dementia due to increased stroke risk. If antipsychotic needed, use atypical (risperidone) at lowest dose for shortest time.',
      'Donepezil (AChE inhibitor) is for cognitive symptoms in mild-moderate Alzheimer\'s, not for acute agitation/BPSD.',
      'CORRECT. Non-pharmacological interventions are first-line for BPSD. Address triggers, provide structure, educate carers.',
      'Benzodiazepines increase fall risk, confusion, and paradoxical agitation in elderly with dementia. Avoid.',
      'ECT is reserved for severe treatment-resistant depression, not for dementia-related agitation.',
    ],
    domain: 'Old Age',
    difficulty: 'Easy',
    paper: 'Paper B',
  },
  {
    stem: 'The amygdala receives its primary sensory input via the lateral nucleus. Which structure does the central nucleus of the amygdala primarily project to, mediating the autonomic components of the fear response?',
    options: [
      'Prefrontal cortex',
      'Hippocampus',
      'Hypothalamus (via stria terminalis)',
      'Thalamus',
      'Basal ganglia',
    ],
    correctIndex: 2,
    explanation:
      'The amygdala fear circuit: sensory input → lateral amygdala → central amygdala → hypothalamus (via stria terminalis) and brainstem (via ventral amygdalofugal pathway). The central nucleus output to the hypothalamus activates the HPA axis and autonomic nervous system, producing the physiological fear response (tachycardia, sweating, cortisol release).',
    distractorExplanations: [
      'The prefrontal cortex receives projections FROM the amygdala (modulating emotional regulation) but is not the primary output target for autonomic fear responses.',
      'The hippocampus provides contextual memory input TO the amygdala but is not the primary output target for autonomic responses.',
      'CORRECT. Central amygdala → hypothalamus (via stria terminalis) mediates autonomic fear responses: HPA activation, sympathetic arousal.',
      'The thalamus provides sensory input TO the amygdala (low-road fear pathway) but is not the output target.',
      'The basal ganglia are involved in motor output, not the autonomic fear response.',
    ],
    domain: 'Neurosciences',
    difficulty: 'Hard',
    paper: 'Paper A',
  },
  {
    stem: 'In a randomised controlled trial, the relative risk (RR) of suicide attempt with Drug A vs. placebo is 0.67 (95% CI: 0.45–0.99). Which statement is correct?',
    options: [
      'Drug A increases suicide risk by 67%',
      'The result is not statistically significant',
      'Drug A reduces suicide risk by 33% and the result is statistically significant',
      'The confidence interval includes 1, so the result is inconclusive',
      'The number needed to treat cannot be calculated from this data',
    ],
    correctIndex: 2,
    explanation:
      'RR = 0.67 means the risk in the treatment group is 67% of the control group — a 33% relative risk reduction (1 − 0.67 = 0.33). The 95% CI is 0.45–0.99. Since the upper limit is 0.99 (just below 1.0), the result is statistically significant at p < 0.05. If the CI included 1.0, the result would not be significant.',
    distractorExplanations: [
      'RR < 1 means REDUCED risk, not increased. RR = 0.67 = 33% risk reduction.',
      'The 95% CI (0.45–0.99) does NOT include 1.0, so the result IS statistically significant (p < 0.05).',
      'CORRECT. RR 0.67 = 33% reduction. CI 0.45–0.99 excludes 1.0 → statistically significant.',
      'The CI is 0.45–0.99. The upper bound is 0.99, which is BELOW 1.0. The CI does NOT include 1.',
      'NNT can be calculated if you know the baseline risk (control event rate), which is not provided here — but this is not the BEST answer.',
    ],
    domain: 'Statistics & EBM',
    difficulty: 'Medium',
    paper: 'Paper A',
  },
  {
    stem: 'According to ICD-11, which of the following is a core feature of personality disorder?',
    options: [
      'Presence of hallucinations',
      'An enduring pattern of inner experience and behaviour that deviates from cultural expectations',
      'Onset before age 10 years',
      'Response to pharmacological treatment',
      'Presence of a single maladaptive trait',
    ],
    correctIndex: 1,
    explanation:
      'ICD-11 defines personality disorder as an enduring pattern of inner experience (in cognition, affectivity, interpersonal functioning) and behaviour that deviates markedly from the expectations of the individual\'s culture, is pervasive and inflexible, has onset in adolescence/early adulthood, is stable over time, and leads to distress or impairment. ICD-11 moved to a dimensional severity model (mild, moderate, severe) rather than categorical types.',
    distractorExplanations: [
      'Hallucinations are psychotic symptoms, not core features of personality disorder. They may occur in schizotypal PD but are not defining.',
      'CORRECT. Enduring pattern deviating from cultural expectations, pervasive, inflexible, onset in adolescence, stable over time, causes distress/impairment.',
      'Personality disorder typically has onset in adolescence or early adulthood, not before age 10. Early-onset pervasive patterns suggest neurodevelopmental conditions.',
      'Personality disorders are primarily treated with psychological therapies, not pharmacological treatment. Medication may target specific symptoms but is not the core treatment.',
      'ICD-11 requires a pervasive pattern across multiple domains (cognition, affect, interpersonal, impulse control), not a single trait.',
    ],
    domain: 'Classification',
    difficulty: 'Easy',
    paper: 'Paper A',
  },
]

const SIGNUP_GATE_AFTER = 3 // Show signup wall after this many questions

export default function TryPage() {
  const [selectedPaper, setSelectedPaper] = useState<'Paper A' | 'Paper B'>('Paper A')
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState<{ correct: number; total: number; answered: boolean[] }>({ correct: 0, total: 0, answered: [] })
  const [showSignupGate, setShowSignupGate] = useState(false)

  const filteredQuestions = DEMO_QUESTIONS.filter(q => q.paper === selectedPaper)
  const q = filteredQuestions[currentQ]
  const isCorrect = selected === q.correctIndex
  const hasAnswered = results.answered[currentQ]

  const handlePaperChange = (paper: 'Paper A' | 'Paper B') => {
    setSelectedPaper(paper)
    setCurrentQ(0)
    setSelected(null)
    setRevealed(false)
    setResults({ correct: 0, total: 0, answered: [] })
    setShowSignupGate(false)
  }

  const handleSelect = (index: number) => {
    if (revealed) return
    setSelected(index)
  }

  const handleReveal = () => {
    if (selected === null) return
    setRevealed(true)
    const newAnswered = [...results.answered]
    newAnswered[currentQ] = true
    setResults({
      correct: results.correct + (selected === q.correctIndex ? 1 : 0),
      total: results.total + 1,
      answered: newAnswered,
    })
  }

  const handleNext = () => {
    if (currentQ < filteredQuestions.length - 1) {
      // Show signup gate after SIGNUP_GATE_AFTER questions
      if (results.total === SIGNUP_GATE_AFTER && !showSignupGate) {
        setShowSignupGate(true)
        return
      }
      setCurrentQ(currentQ + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleContinueAfterGate = () => {
    setShowSignupGate(false)
    setCurrentQ(currentQ + 1)
    setSelected(null)
    setRevealed(false)
  }

  const handleReset = () => {
    setCurrentQ(0)
    setSelected(null)
    setRevealed(false)
    setResults({ correct: 0, total: 0, answered: [] })
  }

  const progressPercent = results.total > 0 ? Math.round((results.correct / (currentQ + (hasAnswered ? 1 : 0))) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'var(--gradient-hero)' }} />
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </a>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/pricing" className="btn btn-ghost" style={{ fontSize: 13 }}>Pricing</a>
            <a href="/signup" className="btn btn-primary" style={{ fontSize: 13 }}>Get Started</a>
          </div>
        </nav>

        {/* Free trial banner */}
        <div style={{
          background: 'rgba(52, 211, 153, 0.06)', border: '1px solid rgba(52, 211, 153, 0.12)',
          borderRadius: 'var(--radius-md)', padding: '12px 20px', marginBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>
              Free taster — no signup required
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
              · Try {results.total} of {filteredQuestions.length} questions
            </span>
          </div>
          {results.total > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                {results.correct}/{results.total} correct
              </span>
              <div style={{
                height: 6, width: 100, background: 'var(--surface-card)', borderRadius: 3,
                border: '1px solid var(--border-subtle)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${progressPercent}%`,
                  background: 'var(--gradient-teal)', borderRadius: 3,
                  transition: 'width 0.3s ease',
                }} />
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)' }}>
                {progressPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Paper Selector */}
        <div style={{
          display: 'flex', gap: 12, marginBottom: 28, justifyContent: 'center',
        }}>
          <button
            onClick={() => handlePaperChange('Paper A')}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-md)',
              border: selectedPaper === 'Paper A' ? '2px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
              background: selectedPaper === 'Paper A' ? 'rgba(20, 184, 166, 0.1)' : 'var(--surface-card)',
              color: selectedPaper === 'Paper A' ? 'var(--accent-teal)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Paper A — Scientific Basis
          </button>
          <button
            onClick={() => handlePaperChange('Paper B')}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-md)',
              border: selectedPaper === 'Paper B' ? '2px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
              background: selectedPaper === 'Paper B' ? 'rgba(20, 184, 166, 0.1)' : 'var(--surface-card)',
              color: selectedPaper === 'Paper B' ? 'var(--accent-teal)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Paper B — Clinical Topics
          </button>
        </div>

        {/* Signup Gate Modal */}
        {showSignupGate && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}>
            <div style={{
              background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)', padding: 'clamp(24px, 5vw, 40px)',
              maxWidth: 480, width: '100%', position: 'relative',
            }}>
              {/* Accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gradient-teal)' }} />

              {/* Close button */}
              <button
                onClick={() => setShowSignupGate(false)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--text-tertiary)', padding: 4,
                }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Score badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 20,
                background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)',
                marginBottom: 20,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>
                  You scored {results.correct}/{SIGNUP_GATE_AFTER}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 5vw, 24px)',
                color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.3,
              }}>
                Unlock your blind-spot analysis
              </h2>

              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)',
                lineHeight: 1.7, marginBottom: 24,
              }}>
                You've answered {SIGNUP_GATE_AFTER} questions. Create a free account to see which domains you're strongest in — and where you need work.
              </p>

              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {[
                  { icon: '🎯', text: 'Adaptive engine targets your weak areas' },
                  { icon: '📊', text: 'Blind-spot map across all MRCPsych domains' },
                  { icon: '📚', text: '4,600+ questions with teaching cascades' },
                ].map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{feature.icon}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)' }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href="/signup"
                  className="btn btn-primary btn-lg"
                  style={{ fontSize: 15, padding: '14px 28px', textAlign: 'center', textDecoration: 'none' }}
                >
                  Create Free Account
                </a>
                <button
                  onClick={handleContinueAfterGate}
                  style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)',
                    padding: '8px 0', textDecoration: 'underline',
                  }}
                >
                  Continue without signing up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question card */}
        <div style={{
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)', padding: 'clamp(20px, 4vw, 32px)', position: 'relative', overflow: 'hidden',
        }}>
          {/* Accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gradient-teal)' }} />

          {/* Question meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              background: 'rgba(20, 184, 166, 0.06)', borderRadius: 6,
              border: '1px solid rgba(20, 184, 166, 0.1)',
            }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)' }}>
                Question {currentQ + 1} of {filteredQuestions.length}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              background: 'rgba(236, 72, 153, 0.06)', borderRadius: 6,
              border: '1px solid rgba(236, 72, 153, 0.1)',
            }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, color: '#ec4899' }}>
                {q.paper}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              background: q.difficulty === 'Hard' ? 'rgba(248, 113, 113, 0.06)' : 'rgba(52, 211, 153, 0.06)',
              borderRadius: 6,
              border: `1px solid ${q.difficulty === 'Hard' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)'}`,
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                color: q.difficulty === 'Hard' ? 'var(--error)' : 'var(--success)',
              }}>
                {q.difficulty}
              </span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>
                {q.domain}
              </span>
            </div>
          </div>

          {/* Stem */}
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 4vw, 16px)', fontWeight: 500,
            color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 28,
          }}>
            {q.stem}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {q.options.map((option, i) => {
              const isSelectedOption = selected === i
              const isRevealedCorrect = revealed && i === q.correctIndex
              const isRevealedWrong = revealed && isSelectedOption && i !== q.correctIndex

              let bg = 'var(--surface-input)'
              let border = 'var(--border-subtle)'
              let textColor = 'var(--text-secondary)'

              if (isRevealedCorrect) {
                bg = 'rgba(52, 211, 153, 0.08)'
                border = 'var(--success)'
                textColor = 'var(--success)'
              } else if (isRevealedWrong) {
                bg = 'rgba(248, 113, 113, 0.08)'
                border = 'var(--error)'
                textColor = 'var(--error)'
              } else if (isSelectedOption) {
                bg = 'rgba(20, 184, 166, 0.06)'
                border = 'var(--accent-teal)'
                textColor = 'var(--accent-teal)'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    padding: '12px 14px', borderRadius: 'var(--radius-md)',
                    background: bg, border: `1px solid ${border}`,
                    cursor: revealed ? 'default' : 'pointer',
                    transition: 'all 0.15s ease', textAlign: 'left',
                    fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px, 3.6vw, 14px)', color: textColor,
                    opacity: revealed && !isRevealedCorrect && !isRevealedWrong ? 0.5 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!revealed) {
                      e.currentTarget.style.borderColor = 'var(--accent-teal)'
                      e.currentTarget.style.background = 'rgba(20, 184, 166, 0.04)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!revealed && !isSelectedOption) {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.background = 'var(--surface-input)'
                    }
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                    flexShrink: 0,
                    background: isRevealedCorrect ? 'rgba(52, 211, 153, 0.15)' :
                                isRevealedWrong ? 'rgba(248, 113, 113, 0.15)' :
                                isSelectedOption ? 'rgba(20, 184, 166, 0.12)' : 'rgba(255,255,255,0.04)',
                    color: isRevealedCorrect ? 'var(--success)' :
                           isRevealedWrong ? 'var(--error)' :
                           isSelectedOption ? 'var(--accent-teal)' : 'var(--text-tertiary)',
                  }}>
                    {isRevealedCorrect ? '✓' : isRevealedWrong ? '✗' : String.fromCharCode(65 + i)}
                  </div>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            {!revealed ? (
              <button
                onClick={handleReveal}
                disabled={selected === null}
                className="btn btn-primary btn-lg"
                style={{
                  fontSize: 14, padding: '12px 28px',
                  opacity: selected === null ? 0.4 : 1,
                  cursor: selected === null ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
                Reveal Answer
              </button>
            ) : (
              currentQ < filteredQuestions.length - 1 ? (
                <button onClick={handleNext} className="btn btn-primary btn-lg" style={{ fontSize: 14, padding: '12px 28px' }}>
                  Next Question
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleReset} className="btn btn-primary btn-lg" style={{ fontSize: 14, padding: '12px 28px' }}>
                  Start Again
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                  </svg>
                </button>
              )
            )}
            <a href="/signup" className="btn btn-ghost" style={{ fontSize: 14, padding: '12px 28px' }}>
              Full access →
            </a>
          </div>

          {/* Explanation (shown after reveal) */}
          {revealed && (
            <div style={{ marginTop: 28 }}>
              {/* Result banner */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 20px', borderRadius: 'var(--radius-md)',
                background: isCorrect ? 'rgba(52, 211, 153, 0.06)' : 'rgba(248, 113, 113, 0.06)',
                border: `1px solid ${isCorrect ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)'}`,
                marginBottom: 20,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={isCorrect ? 'var(--success)' : 'var(--error)'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isCorrect ? (
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  ) : (
                    <circle cx="12" cy="12" r="10" />
                  )}
                  <polyline points={isCorrect ? '22 4 12 14.01 9 11.01' : '15 9 9 15'} />
                  <line x1={isCorrect ? '' : '9'} y1={isCorrect ? '' : '9'} x2={isCorrect ? '' : '15'} y2={isCorrect ? '' : '15'} />
                </svg>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
                  color: isCorrect ? 'var(--success)' : 'var(--error)',
                }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                  · The correct answer is {String.fromCharCode(65 + q.correctIndex)}
                </span>
              </div>

              {/* Teaching point */}
              <div style={{
                background: 'rgba(20, 184, 166, 0.04)', border: '1px solid rgba(20, 184, 166, 0.08)',
                borderRadius: 'var(--radius-md)', padding: '18px 20px', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, color: 'var(--accent-teal)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Teaching Point
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {q.explanation}
                </p>
              </div>

              {/* Distractor explanations */}
              <details style={{ marginBottom: 12 }}>
                <summary style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                  color: 'var(--text-tertiary)', cursor: 'pointer', padding: '8px 0',
                  userSelect: 'none',
                }}>
                  Why each option is right or wrong
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  {q.distractorExplanations.map((exp, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 12, padding: '10px 14px',
                      background: i === q.correctIndex ? 'rgba(52, 211, 153, 0.04)' : 'transparent',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${i === q.correctIndex ? 'rgba(52, 211, 153, 0.1)' : 'transparent'}`,
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                        background: i === q.correctIndex ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255,255,255,0.03)',
                        color: i === q.correctIndex ? 'var(--success)' : 'var(--text-tertiary)',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div>
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                          color: i === q.correctIndex ? 'var(--success)' : 'var(--error)',
                          display: 'block', marginBottom: 2,
                        }}>
                          {i === q.correctIndex ? '✓ Correct' : '✗ Distractor'}
                        </span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                          {exp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {currentQ === filteredQuestions.length - 1 && revealed && (
          <div style={{
            textAlign: 'center', marginTop: 40,
            background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)', padding: 32,
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--text-primary)', marginBottom: 8 }}>
              You got {results.correct}/{filteredQuestions.length} correct
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
              The full PsychStar platform includes 4,600+ questions across both papers with adaptive engine, blind-spot mapping, and teaching cascades for every wrong answer.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <a href="/signup" className="btn btn-primary btn-lg" style={{ fontSize: 15, padding: '14px 32px' }}>
                Start Free Trial
              </a>
              <a href="/pricing" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 32px' }}>
                View Pricing
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '60px 0 20px' }}>
          <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            <a href="/blog" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', textDecoration: 'none' }}>Blog</a>
            <a href="/pricing" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', textDecoration: 'none' }}>Pricing</a>
            <a href="/try" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', textDecoration: 'none' }}>Try Free</a>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
            © {new Date().getFullYear()} PsychStar. Adaptive MRCPsych exam preparation.
          </p>
        </footer>
      </div>
    </div>
  )
}
