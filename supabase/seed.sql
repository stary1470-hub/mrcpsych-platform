-- ============================================================
-- MRCPsych Pro — Seed Questions (Paper A)
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- PSYCHOPHARMACOLOGY
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following antipsychotics has the HIGHEST affinity for the D2 receptor?',
  '[" Haloperidol", " Clozapine", " Quetiapine", " Aripiprazole", " Olanzapine"]',
  0,
  '["Correct. Haloperidol is a high-potency D2 antagonist with Ki ~2.5nM.", "Clozapine has relatively low D2 affinity (Ki ~150nM) but high 5-HT2A affinity.", "Quetiapine has very low D2 affinity (Ki ~770nM) with rapid dissociation.", "Aripiprazole is a partial agonist at D2 — not simply an antagonist, but its binding affinity is moderate (Ki ~0.7nM).", "Olanzapine has moderate D2 affinity (Ki ~70nM) with broad receptor profile."]',
  'Antipsychotic potency correlates with D2 receptor affinity. Haloperidol (high potency) ≈ 1–5mg. Clozapine (low potency) ≈ 200–900mg. ALL antipsychotics (except aripiprazole) are D2 antagonists. Aripiprazole is a partial agonist.',
  'psychopharmacology', 'medium', 'recall', 'A', 'Stahl SM. Essential Psychopharmacology',
  ARRAY['antipsychotics', 'dopamine', 'D2_receptor', 'potency']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 34-year-old woman on fluoxetine 40mg daily for 8 weeks reports persistent low mood and anhedonia. She has no significant side effects. Which of the following is the most appropriate next step?',
  '[" Increase fluoxetine to 60mg daily", " Switch to venlafaxine", " Add mirtazapine 15mg nocte", " Augment with aripiprazole 2mg daily", " Refer for ECT"]',
  0,
  '["Correct. The maximum licensed dose of fluoxetine is 60mg (off-label up to 80mg). NICE recommends optimising the current SSRI dose before switching or augmenting.", "Switching is appropriate only after optimising dose and considering side effects. First-line step is dose optimisation.", "Mirtazapine augmentation (''California rocket fuel'') is used when switching or augmentation is indicated, not before optimising the first agent.", "Aripiprazole augmentation is second-line for treatment-resistant depression, not first step after suboptimal response.", "ECT is indicated for treatment-resistant depression, catatonia, or where rapid response is needed — not for partial response to one SSRI."]',
  'NICE CG90 (Depression) management: Step 1 — optimise dose of current antidepressant (check adherence, ensure adequate trial of ≥4–6 weeks at therapeutic dose). Step 2 — switch to alternative agent or augment. Fluoxetine max dose is 60mg (higher doses may be off-label).',
  'psychopharmacology', 'medium', 'application', 'A', 'NICE CG90',
  ARRAY['antidepressants', 'SSRI', 'fluoxetine', 'dose_optimisation', 'depression']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following best describes the mechanism of action of sodium valproate in mood stabilisation?',
  '[" Selective serotonin reuptake inhibition", " GABA transaminase inhibition and sodium channel blockade", " Dopamine D2 receptor blockade", " NMDA receptor antagonism", " Monoamine oxidase inhibition"]',
  1,
  '["SSRIs are antidepressants, not mood stabilisers — incorrect.", "Correct. Valproate enhances GABAergic transmission by inhibiting GABA transaminase and also blocks voltage-gated sodium channels, stabilising neuronal membranes.", "D2 blockade is the mechanism of antipsychotics, not valproate.", "NMDA antagonism is the mechanism of ketamine and some other agents, not valproate.", "MAO inhibition is the mechanism of MAOIs — unrelated to valproate."]',
  'Valproate has multiple proposed mechanisms: (1) GABA transaminase inhibition → increased GABA, (2) sodium channel blockade → membrane stabilisation, (3) histone deacetylase inhibition (gene expression). It is first-line for bipolar maintenance and acute mania, but avoided in women of childbearing potential due to teratogenicity.',
  'psychopharmacology', 'hard', 'recall', 'A', 'Taylor D. Maudsley Prescribing Guidelines',
  ARRAY['valproate', 'mood_stabiliser', 'GABA', 'sodium_channel', 'bipolar']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which anticholinesterase inhibitor is licensed for the treatment of mild-to-moderate Alzheimer''s disease and has the benefit of once-daily dosing?',
  '[" Donepezil", " Rivastigmine", " Galantamine", " Memantine", " All of the above"]',
  0,
  '["Correct. Donepezil is a reversible acetylcholinesterase inhibitor given once daily (5mg → 10mg). It is licensed for mild-to-moderate Alzheimer''s.", "Rivastigmine is licensed for mild-to-moderate Alzheimer''s AND Parkinson''s dementia, but requires twice-daily dosing (or patch).", "Galantamine is also twice-daily (or extended-release once-daily) and licensed for mild-to-moderate Alzheimer''s.", "Memantine is an NMDA receptor antagonist used for moderate-to-severe Alzheimer''s — different class entirely.", "Only donepezil offers the convenience of once-daily dosing among the acetylcholinesterase inhibitors (though oral formulations vary)."]',
  'First-line for mild-to-moderate Alzheimer''s: acetylcholinesterase inhibitors (donepezil, rivastigmine, galantamine). Donepezil is once-daily. Memantine is for moderate-to-severe disease (NMDA antagonist). NICE TA217 recommends these for Alzheimer''s with MMSE 10–20.',
  'psychopharmacology', 'medium', 'recall', 'A', 'NICE TA217',
  ARRAY['donepezil', 'Alzheimer', 'dementia', 'anticholinesterase', 'NICE']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 28-year-old man on clozapine 450mg daily for treatment-resistant schizophrenia presents with sialorrhoea affecting his quality of life. Which of the following is the most appropriate management?',
  '[" Reduce the clozapine dose", " Switch to olanzapine", " Add hyoscine hydrobromide PRN", " Add aripiprazole augmentation", " Discontinue clozapine immediately"]',
  2,
  '["Dose reduction may help but risks relapse — not first line for this side effect alone.", "Switching is drastic. Sialorrhoea is common (30–80% on clozapine) and often manageable.", "Correct. Hyoscine (scopolamine) is an antimuscarinic that reduces saliva production. Other options: amisulpride, ipratropium nasal spray, or pirenzepine (limited availability).", "Aripiprazole augmentation is used for treatment-resistant symptoms, not sialorrhoea.", "Abrupt clozapine discontinuation carries risk of rebound psychosis and cholinergic rebound — never stop abruptly."]',
  'Clozapine-induced sialorrhoea is common (30–80%). Mechanism: M4 muscarinic agonism (not antagonism) at salivary glands, plus α2 antagonism. Management: hyoscine (scopolamine), amisulpride (low dose), ipratropium sublingual spray, or pirenzepine. Never stop clozapine abruptly.',
  'psychopharmacology', 'hard', 'application', 'A', 'Maudsley Prescribing Guidelines',
  ARRAY['clozapine', 'sialorrhoea', 'side_effects', 'antipsychotics']
);

-- NEUROBIOLOGY
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following EEG patterns is most characteristic of stage N3 (slow-wave) sleep?',
  '[" Alpha waves (8–13 Hz)", " Beta waves (13–30 Hz)", " Theta waves (4–7 Hz)", " Delta waves (0.5–4 Hz)", " Sleep spindles and K-complexes"]',
  3,
  '["Alpha waves are characteristic of relaxed wakefulness (eyes closed) and REM sleep.", "Beta waves are associated with active wakefulness and concentration.", "Theta waves appear in stage N1 (drowsiness) and N2 sleep.", "Correct. Delta waves (0.5–4 Hz) are the hallmark of N3 sleep (deep sleep, slow-wave sleep, formerly stages 3 and 4).", "Sleep spindles and K-complexes define N2 sleep, not N3."]',
  'Sleep stages: N1 (theta, drowsiness), N2 (sleep spindles + K-complexes, ~45–55% of total sleep), N3 (delta waves, 0.5–4 Hz, deep sleep), REM (beta/alpha, rapid eye movements, atonia). N3 is most important for restorative sleep and memory consolidation.',
  'neurobiology', 'medium', 'recall', 'A', 'Gazzaniga MS. Cognitive Neuroscience',
  ARRAY['sleep', 'EEG', 'delta_waves', 'N3', 'slow_wave_sleep']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Damage to the hippocampal formation would most likely impair which type of memory?',
  '[" Procedural memory", " Semantic memory", " Episodic memory", " Working memory", " Classical conditioning"]',
  2,
  '["Procedural memory (how to do things) is primarily mediated by the basal ganglia and cerebellum — not hippocampus.", "Semantic memory (facts) is stored in temporal neocortex; acquisition may involve hippocampus but storage is neocortical.", "Correct. The hippocampus is critical for episodic memory (autobiographical events). Bilateral hippocampal damage causes anterograde amnesia (as in patient HM).", "Working memory is mediated by the prefrontal cortex and parietal lobes, not primarily hippocampus.", "Classical conditioning involves the cerebellum (for eyeblink conditioning) or amygdala (for fear conditioning)."]',
  'The hippocampus is essential for episodic memory encoding and consolidation. HM (bilateral medial temporal lobectomy) showed that the hippocampus is NOT the site of permanent storage (semantic and procedural memories remained intact) but is critical for transferring new episodic memories to long-term storage. Hippocampal damage → anterograde amnesia.',
  'neurobiology', 'medium', 'recall', 'A', 'Scoville WB, Milner B. J Neurol Neurosurg Psychiatry 1957',
  ARRAY['hippocampus', 'memory', 'episodic_memory', 'amnesia', 'HM']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which neurotransmitter is MOST directly implicated in the regulation of the hypothalamic-pituitary-thyroid (HPT) axis?',
  '[" Dopamine", " Serotonin", " Noradrenaline", " TRH (thyrotropin-releasing hormone)", " GABA"]',
  3,
  '["Dopamine inhibits prolactin release via tuberoinfundibular pathway — involved in HPA axis, not directly HPT.", "Serotonin influences HPA axis (CRH release) and feeding behaviour, not directly HPT.", "Noradrenaline is involved in arousal and HPA axis activation — not directly regulating HPT.", "Correct. TRH is synthesised in the paraventricular nucleus of the hypothalamus and released into the hypothalamo-hypophyseal portal system to stimulate TSH release from the anterior pituitary.", "GABA is the main inhibitory neurotransmitter — not directly regulating HPT axis."]',
  'Hypothalamic-pituitary-thyroid (HPT) axis: Hypothalamus → TRH → Anterior pituitary → TSH → Thyroid gland → T3/T4 → Negative feedback to both hypothalamus and pituitary. TRH is a tripeptide. Thyroid hormones cross the blood-brain barrier and affect mood, cognition, and energy — important in mood disorders (e.g., thyroid supplementation as augmentation in depression).',
  'neurobiology', 'hard', 'recall', 'A', 'Rang & Dale''s Pharmacology',
  ARRAY['HPT_axis', 'TRH', 'thyroid', 'hypothalamus', 'neuroendocrinology']
);

-- PSYCHOPATHOLOGY
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 45-year-old man reports that his wife has been replaced by an identical-looking impostor. He insists the real wife has been abducted and replaced by a double. Which symptom is MOST consistent with this presentation?',
  '[" Capgras delusion", " Fregoli delusion", " Cotard delusion", " Erotomania (de Clérambault syndrome)", " Intermetamorphosis"]',
  0,
  '["Correct. Capgras delusion is the belief that a familiar person has been replaced by an impostor or double. It is a delusional misidentification syndrome.", "Fregoli delusion: the belief that different people are actually the same person in disguise. The opposite of Capgras.", "Cotard delusion: the belief that one is dead, does not exist, or has lost organs/blood.", "Erotomania: false belief that someone, usually of higher status, is in love with the patient.", "Intermetamorphosis: the belief that people swap identities with each other."]',
  'Capgras delusion (delusion of doubles) is associated with schizophrenia, dementia (especially DLB), and neurological lesions affecting the right fusiform gyrus and prefrontal cortex. Proposed mechanism: disconnection between face recognition (fusiform gyrus) and emotional response (amygdala) — the face is recognised but feels ''wrong''.',
  'psychopathology', 'medium', 'application', 'A', 'Jaspers K. General Psychopathology',
  ARRAY['Capgras', 'delusional_misidentification', 'psychopathology', 'delusions']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 23-year-old woman describes hearing a voice commenting on her actions, saying "She''s pouring tea now" and "Now she''s sitting down." The voice is heard clearly as if spoken by another person, localised outside her head. Which is the most appropriate descriptive term?',
  '[" Pseudohallucination", " Second-person auditory hallucination", " Third-person auditory hallucination", " Thought echo (Gedankenlautwerden)", " Formication"]',
  2,
  '["Pseudohallucinations occur in internal subjective space (''inside the head''), not external space — this patient hears it externally.", "Second-person hallucinations speak directly TO the patient (''You are useless''). This is a running commentary in third person.", "Correct. Third-person auditory hallucinations (hearing voices talking about the patient in the third person) are a first-rank Schneiderian symptom of schizophrenia.", "Thought echo is hearing one''s own thoughts spoken aloud immediately after thinking them — different from hearing external voices commenting.", "Formication is the tactile hallucination of insects crawling on the skin — typically associated with substance withdrawal (cocaine, alcohol)."]',
  'Schneiderian first-rank symptoms: (1) Audible thoughts, (2) Voices arguing/discussing, (3) Voices commenting on actions, (4) Thought insertion/broadcast/withdrawal, (5) Made volition/affect/impulses, (6) Somatic passivity, (7) Delusional perception. Third-person running commentary is specifically a first-rank symptom.',
  'psychopathology', 'medium', 'application', 'A', 'Schneider K. Clinical Psychopathology',
  ARRAY['hallucinations', 'first_rank_symptoms', 'schizophrenia', 'Schneider']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following best describes the phenomenon of thought blocking?',
  '[" A delusion that thoughts are being removed from one''s mind", " A sudden interruption in the flow of speech without explanation", " The experience of having multiple thoughts racing simultaneously", " A pathological form of over-inclusive thinking", " Repeating the same word or phrase multiple times"]',
  1,
  '["This describes thought withdrawal, a first-rank symptom — different from thought blocking.", "Correct. Thought blocking is a sudden cessation of speech in the middle of a sentence, often with the patient unable to explain why. The patient may experience a ''blank mind''. It is characteristic of schizophrenia and distinguishes it from other thought disorders.", "Racing thoughts are typically seen in mania (flight of ideas), not thought blocking.", "Over-inclusive thinking is associated with schizophrenia but describes difficulty maintaining conceptual boundaries — not the same as blocking.", "Perseveration (repetition) is seen in organic brain disorders, not thought blocking."]',
  'Thought blocking is a form of formal thought disorder characteristic of schizophrenia. The patient stops mid-sentence and cannot resume. This differs from: (1) thought withdrawal (delusion that thoughts are removed by external force), (2) perseveration (organic repetition), (3) flight of ideas (mania). Thought blocking is associated with negative symptoms and poor prognosis in some conceptualisations.',
  'psychopathology', 'medium', 'recall', 'A', 'Jaspers K. General Psychopathology',
  ARRAY['thought_blocking', 'formal_thought_disorder', 'schizophrenia', 'psychopathology']
);

-- CLASSIFICATION
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'According to ICD-11, which of the following duration criteria applies for a diagnosis of schizophrenia?',
  '[" Symptoms present for at least 1 week", " Symptoms present for at least 2 weeks", " Symptoms present for at least 1 month", " Symptoms present for at least 6 months", " No minimum duration specified"]',
  2,
  '["One week is too short — that might suggest brief psychotic disorder.", "Two weeks was the duration for ICD-10 schizophrenia. ICD-11 has been updated.", "Correct. ICD-11 requires symptoms to be present for at least 1 month for a diagnosis of schizophrenia.", "Six months is the DSM-5-TR duration criterion for schizophrenia (including prodromal/residual phase). ICD-11 requires 1 month of characteristic symptoms.", "ICD-11 does specify a minimum duration of 1 month — there IS a duration criterion."]',
  'Key ICD-11 vs DSM-5-TR differences for schizophrenia: ICD-11 requires ≥1 month of symptoms (with no prodromal phase required). DSM-5-TR requires ≥6 months (including prodrome). ICD-11 also eliminated all subtypes (paranoid, hebephrenic, catatonic, etc.). Both require characteristic symptoms: delusions, hallucinations, disorganised thinking/behaviour, negative symptoms.',
  'classification', 'hard', 'recall', 'A', 'ICD-11 (WHO, 2022)',
  ARRAY['schizophrenia', 'ICD-11', 'diagnosis', 'duration', 'classification']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'In DSM-5-TR, which of the following is classified under obsessive-compulsive and related disorders?',
  '[" Trichotillomania", " Anorexia nervosa", " Illness anxiety disorder", " Somatic symptom disorder", " Dissociative identity disorder"]',
  0,
  '["Correct. Trichotillomania (hair-pulling disorder) is classified under obsessive-compulsive and related disorders in DSM-5-TR.", "Anorexia nervosa is classified under feeding and eating disorders — not OCD-related disorders.", "Illness anxiety disorder is classified under somatic symptom and related disorders.", "Somatic symptom disorder is under the same category — somatic, not OCD-related.", "Dissociative identity disorder is classified under dissociative disorders."]',
  'DSM-5-TR Obsessive-Compulsive and Related Disorders: OCD, body dysmorphic disorder, hoarding disorder, trichotillomania, excoriation (skin-picking) disorder, substance/medication-induced OCD, OCD due to another medical condition. Note that in ICD-11, OCD is also in a separate category from anxiety disorders.',
  'classification', 'medium', 'recall', 'A', 'DSM-5-TR (APA, 2022)',
  ARRAY['DSM-5', 'OCD', 'classification', 'trichotillomania']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 56-year-old man presents with a 4-week history of elevated mood, increased energy, reduced need for sleep, grandiosity, and pressured speech. He has no prior psychiatric history. According to ICD-11, what is the most likely diagnosis?',
  '[" Bipolar I disorder, current episode manic", " Bipolar II disorder", " Hypomania", " Schizoaffective disorder", " Acute and transient psychotic disorder"]',
  0,
  '["Correct. A single manic episode (≥2 weeks of elevated mood + increased activity/energy + characteristic symptoms) with no prior mood episodes qualifies for Bipolar I disorder in both ICD-11 and DSM-5-TR.", "Bipolar II requires at least one hypomanic episode AND at least one depressive episode — no manic episodes. This is clearly manic.", "Hypomania is less severe than mania — no impairment or psychosis. This case describes significant functional disturbance with grandiosity.", "Schizoaffective disorder requires psychotic symptoms occurring independently of mood episodes for ≥2 weeks. No evidence of psychosis outside the mood episode here.", "ATPD typically has an acute onset (<2 weeks) with psychotic symptoms and affective upheaval — not a clear manic syndrome lasting 4 weeks."]',
  'A single manic episode = Bipolar I disorder. Key distinction: Bipolar I requires ≥1 manic episode. Bipolar II requires ≥1 hypomanic + ≥1 depressive episode. Mania: ≥1 week (DSM-5-TR) or ≥2 weeks (ICD-11) of elevated mood + increased activity + ≥3 other symptoms (grandiosity, decreased sleep, pressured speech, flight of ideas, distractibility, increased goal-directed activity, risky behaviour).',
  'classification', 'medium', 'application', 'A', 'ICD-11',
  ARRAY['bipolar', 'mania', 'ICD-11', 'diagnosis', 'classification']
);

-- RESEARCH METHODOLOGY
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'In a randomised controlled trial, the number needed to treat (NNT) for an antipsychotic vs placebo is 4. This means:',
  '[" 4 patients in the treatment group showed improvement", " 4 times as many patients improved on drug vs placebo", " 1 patient would respond for every 4 treated with the drug compared to placebo", " The odds of response are 4:1 in favour of the drug", " 4 patients experienced side effects for every 1 that improved"]',
  2,
  '["Incorrect — NNT is about comparative risk/benefit, not simple count of responders.", "Incorrect — NNT is not a ratio of responders; it''s the inverse of absolute risk reduction.", "Correct. NNT = 1 / absolute risk reduction (ARR). If 50% respond on drug and 25% on placebo, ARR = 0.25, NNT = 4. You need to treat 4 patients for 1 additional responder compared to placebo.", "Incorrect — that describes the odds ratio, not NNT.", "This describes the number needed to harm (NNH), not NNT."]',
  'NNT = 1 / (experimental event rate − control event rate). NNT of 4 means you need to treat 4 people to get 1 additional positive outcome. NNT below 10 is generally considered good. Lower NNT = more effective. Number needed to harm (NNH) uses the same formula for adverse events.',
  'research_methodology', 'medium', 'recall', 'A', 'Greenhalgh T. How To Read A Paper',
  ARRAY['NNT', 'statistics', 'RCT', 'evidence_based_medicine']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which study design is most appropriate for investigating the incidence of a rare psychiatric side effect of a new medication?',
  '[" Randomised controlled trial", " Cohort study", " Case-control study", " Cross-sectional survey", " Case series"]',
  1,
  '["RCTs are typically underpowered for rare adverse events due to sample size constraints and short follow-up.", "Correct. Cohort studies follow a defined population exposed to the drug and compare to unexposed. They can capture rare events if the cohort is large enough and follow-up is adequate. Prospective cohort is ideal for incidence.", "Case-control studies are useful for rare OUTCOMES but are retrospective and selection/recall bias applies — used more for common exposures leading to rare outcomes.", "Cross-sectional surveys measure prevalence at a single point in time — not suitable for incidence (new cases over time).", "Case series (descriptive) can suggest a hypothesis but lacks a comparator group — no incidence calculation possible."]',
  'Study design hierarchy for different questions: (1) RCT — efficacy/effectiveness. (2) Cohort study — incidence, prognosis, aetiology. (3) Case-control — rare outcomes. (4) Cross-sectional — prevalence. (5) Qualitative — patient experience. For rare adverse events: large prospective cohort or national registry data.',
  'research_methodology', 'medium', 'application', 'A', 'Kirkwood BR. Medical Statistics',
  ARRAY['study_design', 'cohort', 'epidemiology', 'adverse_effects']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A diagnostic test for depression has a sensitivity of 85% and a specificity of 90%. Which of the following is correct?',
  '[" The test will correctly identify 90% of people without depression", " The test will miss 15% of people with depression", " The positive predictive value is 85%", " The likelihood ratio for a positive test is 0.85", " The false positive rate is 15%"]',
  1,
  '["This describes specificity (90%), which is correct for that property — but the question asks which statement is correct overall, and the sensitivity interpretation is the right answer.", "Correct. Sensitivity = true positive rate = 85%, so 15% of people with depression will be missed (false negatives).", "PPV depends on prevalence — cannot be calculated from sensitivity and specificity alone. At low prevalence, PPV can be much lower than 85%.", "LR+ = sensitivity/(1−specificity) = 0.85/0.10 = 8.5 — not 0.85.", "False positive rate = 1 − specificity = 10%, not 15%."]',
  'Sensitivity = TP/(TP+FN) — ability to detect true positives (high sensitivity = few false negatives). Specificity = TN/(TN+FP) — ability to detect true negatives (high specificity = few false positives). PPV depends on prevalence. In a population with 5% depression prevalence, a test with 85% sensitivity and 90% specificity yields PPV ≈ 31% — most positive results would be false positives.',
  'research_methodology', 'medium', 'application', 'A', 'Altman DG. Practical Statistics for Medical Research',
  ARRAY['sensitivity', 'specificity', 'PPV', 'diagnostic_test', 'statistics']
);

-- GENETICS
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'The concordance rate for bipolar I disorder in monozygotic twins is approximately:',
  '[" 10–15%", " 40–70%", " 80–95%", " 5–10%", " 100%"]',
  1,
  '["Incorrect — this is closer to the concordance for dizygotic twins or the population risk for first-degree relatives.", "Correct. Monozygotic twin concordance for bipolar I disorder is approximately 40–70%, demonstrating a strong genetic component but incomplete penetrance.", "This would suggest near-complete genetic determination — not supported by data.", "Too low — would suggest minimal genetic component.", "Bipolar disorder is not 100% genetically determined — environmental factors contribute."]',
  'Twin studies: Monozygotic (identical) vs Dizygotic (fraternal) twins. For bipolar disorder: MZ concordance ≈ 40–70%, DZ ≈ 5–10%. For schizophrenia: MZ ≈ 40–50%, DZ ≈ 10–15%. Higher MZ than DZ concordance indicates genetic contribution. Less than 100% MZ concordance indicates environmental contribution.',
  'genetics', 'medium', 'recall', 'A', 'McGuffin P et al. Br J Psychiatry 2003',
  ARRAY['genetics', 'bipolar', 'twin_study', 'concordance', 'heritability']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following chromosomal abnormalities is associated with the highest risk of developing schizophrenia?',
  '[" Klinefelter syndrome (XXY)", " Turner syndrome (XO)", " 22q11.2 deletion syndrome (velocardiofacial syndrome)", " Fragile X syndrome", " Down syndrome (trisomy 21)"]',
  2,
  '["Klinefelter syndrome has elevated risk for psychosis but not as high as 22q11.2 deletion.", "Turner syndrome is not strongly associated with schizophrenia.", "Correct. 22q11.2 deletion syndrome (velocardiofacial/DiGeorge syndrome) has a ~25–30% risk of developing schizophrenia — the highest known genetic risk factor.", "Fragile X is associated with intellectual disability and autism — not specifically schizophrenia.", "Down syndrome is associated with Alzheimer''s dementia, not schizophrenia."]',
  '22q11.2 deletion syndrome is the strongest known genetic risk factor for schizophrenia (30% develop it). Other high-risk genetic conditions: (1) Copy number variants (CNVs) at 1q21.1, 2p16.3, 15q13.3, (2) DISC1 gene (originally identified in a Scottish family), (3) NRXN1 (neurexin). Most schizophrenia risk is polygenic (many common variants of small effect).',
  'genetics', 'hard', 'recall', 'A', 'McClellan JM, King MC. Lancet 2010',
  ARRAY['22q11', 'velocardiofacial', 'schizophrenia', 'genetics', 'CNV']
);

-- EPIDEMIOLOGY
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'The lifetime prevalence of schizophrenia in the general population is approximately:',
  '[" 0.3–0.7%", " 2–3%", " 5–8%", " 10–15%", " <0.1%"]',
  0,
  '["Correct. The lifetime risk of schizophrenia is approximately 0.3–0.7% (roughly 1 in 200 to 1 in 140 people).", "This is too high — that range approximates the prevalence of bipolar disorder or major depressive disorder.", "This approximates the prevalence of anxiety disorders or personality disorders.", "This is the approximate lifetime risk of any mood disorder.", "Too low — this would make schizophrenia extremely rare."]',
  'Lifetime prevalence: Schizophrenia ≈ 0.3–0.7%, Bipolar I ≈ 1%, Major depressive disorder ≈ 10–15%, Generalised anxiety ≈ 3–5%, OCD ≈ 1–2%, Anorexia nervosa ≈ 0.5–1%. Schizophrenia has a consistent prevalence across cultures and countries (a key epidemiological finding).',
  'epidemiology', 'easy', 'recall', 'A', 'McGrath J et al. Psychol Med 2008',
  ARRAY['schizophrenia', 'prevalence', 'lifetime_risk', 'epidemiology']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following is the strongest established environmental risk factor for developing schizophrenia?',
  '[" Cannabis use in adolescence", " Obstetric complications", " Urban upbringing", " Migrant status", " Winter/spring birth"]',
  1,
  '["Cannabis use is a well-established risk factor (OR ~2.5–3 for heavy use) but is not the strongest.", "Correct. Obstetric complications (hypoxia, low birth weight, prematurity, pre-eclampsia) have the strongest effect size among environmental risk factors for schizophrenia. Meta-analyses show OR ~2.0–4.0 for various complications.", "Urban upbringing increases risk ~2-fold — significant but not the strongest.", "Migrant status (especially first-generation) increases risk ~2.5-fold — significant but not strongest.", "Winter/spring birth has the smallest effect size (~5–10% increased risk)."]',
  'Environmental risk factors for schizophrenia (strongest to weaker): (1) Obstetric complications (hypoxia), (2) Family history (genetic), (3) Migrant status/ethnic minority, (4) Urban upbringing, (5) Cannabis use (dose-dependent, especially adolescent use), (6) Winter/spring birth, (7) Advanced paternal age, (8) Maternal infection in pregnancy. The neurodevelopmental hypothesis integrates multiple risk factors acting on brain development.',
  'epidemiology', 'medium', 'recall', 'A', 'Matheson SL et al. Schizophr Res 2011',
  ARRAY['schizophrenia', 'risk_factors', 'obstetric_complications', 'environment', 'epidemiology']
);

-- PSYCHOMETRICS
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A depression rating scale has a Cronbach''s alpha of 0.92. This indicates:',
  '[" Good test-retest reliability", " High inter-rater reliability", " High internal consistency", " Good criterion validity", " High face validity"]',
  2,
  '["Test-retest reliability is assessed by administering the same test at two time points and correlating scores — Cronbach''s alpha does NOT measure this.", "Inter-rater reliability (agreement between raters) is measured by Cohen''s kappa or ICC — not Cronbach''s alpha.", "Correct. Cronbach''s alpha (0.7–0.95) measures internal consistency — how well items in a scale correlate with each other. α ≥ 0.9 indicates excellent internal consistency.", "Criterion validity is assessed by comparing the scale to a gold standard — requires sensitivity, specificity, ROC curves.", "Face validity is a subjective judgement of whether the scale appears to measure what it claims — no statistical test."]',
  'Types of reliability: (1) Test-retest (stability over time), (2) Inter-rater (agreement between raters), (3) Internal consistency (Cronbach''s α, how well items correlate). Cronbach''s α: 0.7–0.8 acceptable, 0.8–0.9 good, >0.9 excellent (>0.95 may suggest item redundancy).',
  'psychometrics', 'medium', 'recall', 'A', 'Streiner DL. J Pers Assess 2003',
  ARRAY['Cronbach_alpha', 'reliability', 'internal_consistency', 'psychometrics']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'The Mini-Mental State Examination (MMSE) is most useful for:',
  '[" Diagnosing the subtype of dementia", " Screening for cognitive impairment", " Differentiating dementia from delirium", " Predicting functional capacity in daily living", " Assessing frontal lobe function"]',
  1,
  '["The MMSE does not distinguish between dementia subtypes (Alzheimer''s, vascular, DLB, FTD). More detailed neuropsychology is needed.", "Correct. The MMSE is a screening tool for cognitive impairment with a score range of 0–30. Cut-off <24 suggests impairment. It has good sensitivity but limited specificity.", "The MMSE cannot reliably distinguish delirium from dementia — both produce low scores. The CAM (Confusion Assessment Method) is used for delirium diagnosis.", "The MMSE does not assess functional capacity — the DAFS (Direct Assessment of Functional Status) or IADL scales are used for that.", "The MMSE does NOT assess frontal lobe function specifically. It tests orientation, registration, attention, recall, language, and visuospatial ability. Frontal lobe tests: FAS, Stroop, Wisconsin Card Sort."]',
  'MMSE: 0–30. Cut-off <24 for cognitive impairment. Strengths: widely used, quick (5–10 min), well-validated. Limitations: Copyrighted (owned by Psychological Assessment Resources), education bias, ceiling effects in highly educated, floor effects in severe dementia, limited sensitivity for frontal/subcortical dementias, no assessment of executive function. Montreal Cognitive Assessment (MoCA) is increasingly preferred.',
  'psychometrics', 'easy', 'application', 'A', 'Folstein MF et al. J Psychiatr Res 1975',
  ARRAY['MMSE', 'cognitive_assessment', 'dementia', 'screening', 'psychometrics']
);

-- MORE PSYCHOPHARMACOLOGY (extras for volume)
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following describes the mechanism of action of mirtazapine?',
  '[" SSRI", " SNRI", " NaSSA (Noradrenergic and Specific Serotonergic Antidepressant)", " MAOI-A", " Tricyclic antidepressant"]',
  2,
  '["SSRIs block serotonin reuptake — mirtazapine is not an SSRI.", "SNRIs block both serotonin and noradrenaline reuptake — mirtazapine has a different mechanism.", "Correct. Mirtazapine is a NaSSA — it antagonises presynaptic α2-adrenergic receptors (increasing NA and 5-HT release) and blocks 5-HT2 and 5-HT3 receptors (reducing side effects like anxiety and nausea).", "MAOIs block monoamine oxidase — mirtazapine does not.", "TCAs block reuptake + have antihistaminergic/anticholinergic effects — different mechanism to mirtazapine."]',
  'Mirtazapine (NaSSA): α2 antagonism (presynaptic autoreceptor blockade → increases NA and 5-HT release) + 5-HT2/5-HT3 blockade (reduces anxiety, nausea, and sexual dysfunction). Sedative at low doses (15mg, histaminergic), activating at higher doses (30–45mg, noradrenergic).',
  'psychopharmacology', 'easy', 'recall', 'A', 'Taylor D. Maudsley Prescribing Guidelines',
  ARRAY['mirtazapine', 'NaSSA', 'antidepressants', 'mechanism']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following drugs requires regular FBC monitoring due to risk of agranulocytosis?',
  '[" Lithium", " Valproate", " Clozapine", " Olanzapine", " Lamotrigine"]',
  2,
  '["Lithium requires TFTs, U&Es, and eGFR monitoring — but does NOT cause agranulocytosis.", "Valproate requires LFTs and FBC (risk of thrombocytopenia) — but not agranulocytosis.", "Correct. Clozapine carries a 0.5–1% risk of agranulocytosis requiring mandatory FBC monitoring: weekly for 18 weeks, then fortnightly to 52 weeks, then monthly.", "Olanzapine does not cause agranulocytosis — it requires metabolic monitoring (weight, glucose, lipids).", "Lamotrigine does not cause agranulocytosis — it requires slow dose titration to avoid Stevens-Johnson syndrome."]',
  'Clozapine monitoring: (1) FBC — mandatory (agranulocytosis risk 0.5–1%), (2) Physical health — weight, BP, glucose, lipids (metabolic syndrome risk), (3) Cardiovascular — myocarditis/cardiomyopathy risk in first 2 months, (4) Bowel function — constipation can be fatal. Clozapine is the gold standard for treatment-resistant schizophrenia.',
  'psychopharmacology', 'easy', 'recall', 'A', 'Maudsley Prescribing Guidelines',
  ARRAY['clozapine', 'agranulocytosis', 'monitoring', 'FBC', 'antipsychotics']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'The CATIE trial (2005) compared various antipsychotics in patients with chronic schizophrenia. Which of the following was the primary finding?',
  '[" Clozapine was significantly more effective than all other antipsychotics", " Olanzapine had the lowest discontinuation rate", " All antipsychotics were equally effective", " Perphenazine was superior to atypical antipsychotics", " Quetiapine showed the best side-effect profile"]',
  1,
  '["Clozapine was only used in Phase 2 of the trial (for patients who failed Phase 1). In Phase 1, clozapine was not part of the main comparison.", "Correct. Olanzapine had the lowest rate of discontinuation for any cause (the primary outcome) — but had more metabolic side effects (weight gain, glucose/lipid elevations).", "This was not the finding — there were differences in tolerability and discontinuation rates.", "Perphenazine (a first-generation antipsychotic) was included in the trial and was comparable to atypicals — but not superior.", "Quetiapine showed a HIGH discontinuation rate in the trial — not the best profile."]',
  'CATIE (Clinical Antipsychotic Trials of Intervention Effectiveness): N=1,493. Primary outcome: time to all-cause discontinuation. Olanzapine had the lowest discontinuation rate but most metabolic side effects. Finding challenged the assumption that atypicals were uniformly superior to first-generation agents. Perphenazine (typical) performed comparably.',
  'psychopharmacology', 'hard', 'recall', 'A', 'Lieberman JA et al. NEJM 2005',
  ARRAY['CATIE', 'antipsychotics', 'schizophrenia', 'clinical_trial', 'efficacy']
);

-- ADDITIONAL QUESTIONS ACROSS DOMAINS
INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which brain structure is primarily responsible for the generation of the circadian rhythm?',
  '[" Pineal gland", " Suprachiasmatic nucleus (SCN)", " Raphe nuclei", " Locus coeruleus", " Ventral tegmental area"]',
  1,
  '["The pineal gland produces melatonin in response to darkness — it is an OUTPUT of the circadian system, not the generator.", "Correct. The suprachiasmatic nucleus (SCN) of the anterior hypothalamus is the body''s master circadian pacemaker. It receives direct input from the retinohypothalamic tract (light signals) and synchronises peripheral clocks.", "Raphe nuclei are the main source of serotonin in the brain — involved in mood, sleep, and appetite, not circadian rhythm generation.", "Locus coeruleus is the main noradrenergic nucleus — involved in arousal and stress response.", "VTA is the main dopaminergic nucleus for the mesolimbic/mesocortical pathways — reward and motivation."]',
  'Circadian rhythm: SCN (master clock) → pineal gland (melatonin). The SCN is entrained by light via the retinohypothalamic tract (melanopsin-containing retinal ganglion cells). Circadian disruption is implicated in mood disorders, sleep disorders, and dementia. Melatonin or agomelatine (MT1/MT2 agonist) can be used therapeutically.',
  'neurobiology', 'medium', 'recall', 'A', 'Czeisler CA. Sleep Med Rev 2014',
  ARRAY['circadian', 'SCN', 'suprachiasmatic', 'melatonin', 'sleep']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'In DSM-5-TR, the diagnostic criteria for generalised anxiety disorder (GAD) require symptoms to be present for at least:',
  '[" 1 month", " 3 months", " 6 months", " 12 months", " No minimum duration"]',
  2,
  '["1 month is the duration required for panic disorder and acute stress disorder — not GAD.", "3 months is the duration for persistent complex bereavement disorder — not GAD.", "Correct. DSM-5-TR requires excessive anxiety and worry (about a number of events/activities) occurring more days than not for ≥6 months, plus ≥3 of 6 associated symptoms (restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance).", "12 months is too strict — ICD-11 requires several months; DSM-5-TR requires 6 months.", "There is a minimum duration criterion of 6 months."]',
  'DSM-5-TR GAD: (1) Excessive anxiety/worry ≥6 months, (2) Difficulty controlling worry, (3) ≥3 of: restlessness, fatigue, concentration problems, irritability, muscle tension, sleep disturbance, (4) Clinically significant distress/impairment, (5) Not due to substance/medical condition. ICD-11 GAD requires symptoms for at least several months.',
  'classification', 'medium', 'recall', 'A', 'DSM-5-TR (APA, 2022)',
  ARRAY['GAD', 'anxiety', 'DSM-5', 'diagnosis', 'duration']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'A 22-year-old woman presents with episodes of palpitations, sweating, trembling, and a feeling of impending doom. These episodes peak within 10 minutes and occur spontaneously, sometimes waking her from sleep. Between episodes, she worries constantly about having another attack. Which is the most likely diagnosis?',
  '[" Generalised anxiety disorder", " Panic disorder", " Agoraphobia", " Social anxiety disorder", " Specific phobia"]',
  1,
  '["GAD involves persistent worry across multiple domains, NOT discrete panic attacks with a clear peak within minutes.", "Correct. Panic disorder is characterised by recurrent unexpected panic attacks (abrupt surges of intense fear peaking within minutes, with ≥4 of 13 symptoms) with persistent concern about additional attacks or their consequences, or significant maladaptive behaviour change.", "Agoraphobia is fear/avoidance of situations where escape might be difficult or help unavailable — often co-occurs with panic disorder but is not the primary diagnosis here.", "Social anxiety disorder involves fear of social scrutiny or performance situations — not spontaneous panic attacks unrelated to social triggers.", "Specific phobia involves fear of a specific object/situation — not spontaneous panic attacks unrelated to triggers."]',
  'Panic disorder: recurrent UNEXPECTED panic attacks + worry about future attacks +/or maladaptive behaviour change (e.g. avoidance). First-line treatment: CBT (cognitive behavioural therapy) or SSRI (particularly sertraline, fluoxetine, or citalopram). Differential: recognise that panic attacks can occur in many disorders — the key is whether they are expected or unexpected.',
  'psychopathology', 'medium', 'application', 'A', 'DSM-5-TR',
  ARRAY['panic_disorder', 'anxiety', 'panic_attack', 'diagnosis']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'Which of the following statistical tests is most appropriate for comparing categorical outcomes between two independent groups?',
  '[" Pearson''s correlation coefficient", " Independent t-test", " Mann-Whitney U test", " Chi-squared test", " Paired t-test"]',
  3,
  '["Pearson''s r measures linear correlation between two continuous variables — not for categorical outcomes.", "Independent t-test compares means of continuous variables between two groups — not categorical outcomes.", "Mann-Whitney U test compares distributions of ordinal/continuous non-parametric data between two groups.", "Correct. The Chi-squared (χ²) test is used for comparing proportions/categorical outcomes between two or more independent groups (e.g., % remitted on drug vs placebo).", "Paired t-test compares means within the same subjects before/after an intervention — not between groups."]',
  'Choosing statistical tests: (1) Two groups, continuous, parametric: independent t-test. (2) Two groups, continuous, non-parametric: Mann-Whitney U. (3) Categorical outcomes: Chi-squared. (4) Pre/post within same subjects: paired t-test (continuous) or McNemar''s test (categorical). (5) Correlation: Pearson (parametric, linear) or Spearman (non-parametric, monotonic).',
  'research_methodology', 'medium', 'application', 'A', 'Altman DG. Practical Statistics',
  ARRAY['chi_squared', 'statistics', 'categorical', 'hypothesis_testing']
);

INSERT INTO questions (stem, options, correct_index, distractors_rationale, teaching_point, domain, difficulty, bloom_taxonomy, paper, source, tags) VALUES
(
  'The negative symptoms of schizophrenia include all of the following EXCEPT:',
  '[" Anhedonia", " Avolition", " Alogia", " Hallucinations", " Affective flattening"]',
  3,
  '["Anhedonia (inability to experience pleasure) IS a negative symptom — it is part of the five A''s.", "Avolition (lack of motivation) IS a negative symptom.", "Alogia (poverty of speech) IS a negative symptom.", "Correct. Hallucinations are POSITIVE symptoms (excess of normal function) — they represent added experiences, not diminished function.", "Affective flattening (reduced emotional expression) IS a negative symptom."]',
  'The five A''s of negative symptoms in schizophrenia: (1) Alogia (poverty of speech), (2) Anhedonia (loss of pleasure), (3) Asociality (social withdrawal), (4) Avolition (lack of motivation), (5) Affective flattening (blunted emotional expression). Positive symptoms: hallucinations, delusions, disorganised speech/behaviour. Negative symptoms are harder to treat and more associated with poor functional outcomes.',
  'psychopathology', 'easy', 'recall', 'A', 'Andreasen NC. Arch Gen Psychiatry 1982',
  ARRAY['negative_symptoms', 'schizophrenia', 'five_As', 'psychopathology']
);

-- Confirm the data
select count(*) || ' seed questions inserted' as result from questions;
