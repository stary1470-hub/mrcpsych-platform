// Pipeline types for the question generation system

export type PaperType = 'A' | 'B'
export type BloomTaxonomy = 'recall' | 'application' | 'analysis'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GeneratedQuestion {
  stem: string
  options: string[]
  correct_index: number
  distractors_rationale: string[]
  teaching_point: string
  domain: string
  subdomain?: string
  difficulty: 'easy' | 'medium' | 'hard'
  bloom_taxonomy: 'recall' | 'application' | 'analysis'
  paper: 'A' | 'B'
  tags: string[]
  source?: string
}

export interface ReviewResult {
  score: number // 0-10
  issues: string[]
  clinical_accuracy: 'correct' | 'minor_issue' | 'major_error'
  passes: boolean
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface PipelineConfig {
  domain: string
  count: number
  paper: 'A' | 'B'
  difficulty_distribution: {
    easy: number
    medium: number
    hard: number
  }
  bloom_distribution: {
    recall: number
    application: number
    analysis: number
  }
  batch_size: number // parallel generations per batch
  model_generator: string
  model_reviewer: string
}

export const DEFAULT_CONFIG: PipelineConfig = {
  domain: 'psychopharmacology',
  count: 20,
  paper: 'A',
  difficulty_distribution: { easy: 0.3, medium: 0.5, hard: 0.2 },
  bloom_distribution: { recall: 0.4, application: 0.4, analysis: 0.2 },
  batch_size: 5,
  model_generator: 'gpt-4o-mini',
  model_reviewer: 'gpt-4o',
}

export const DOMAIN_TOPICS: Record<string, string[]> = {
  psychopharmacology: [
    'antipsychotic_mechanisms', 'antidepressant_classes', 'mood_stabilisers',
    'anxiolytics', 'dopamine_pathways', 'serotonin_receptors',
    'anticholinergic_side_effects', 'metabolic_syndrome_antipsychotics',
    'clozapine_management', 'ECT_mechanism', 'lithium_monitoring',
    'MAOI_interactions', 'SSRI_side_effects', 'antiepileptic_mood_stabilisers',
    'psychopharmacology_pregnancy', 'NMDA_receptor_antagonists',
    'alpha_receptors', 'histamine_receptors', 'drug_interactions_psychiatry',
  ],
  neurobiology: [
    'neurotransmitter_synthesis', 'synaptic_transmission', 'brain_anatomy',
    'limbic_system', 'prefrontal_cortex', 'hippocampal_function',
    'basal_ganglia_circuits', 'HPA_axis', 'HPT_axis',
    'neuroplasticity', 'neurodevelopment', 'circadian_rhythms',
    'sleep_neurobiology', 'pain_pathways', 'autonomic_nervous_system',
    'neuroimaging_psychiatry', 'EEG_sleep_stages', 'neuroendocrine_function',
  ],
  psychopathology: [
    'delusions_types', 'hallucinations_classification', 'formal_thought_disorder',
    'first_rank_symptoms', 'negative_symptoms', 'catatonia',
    'insight_assessment', 'mood_congruence', 'flight_of_ideas',
    'thought_blocking', 'perseveration', 'delusional_misidentification',
    'Capgras', 'Cotard', 'Fregoli', 'depersonalisation', 'derealisation',
  ],
  classification: [
    'ICD_11_schizophrenia', 'ICD_11_mood_disorders', 'ICD_11_anxiety',
    'ICD_11_OCD', 'ICD_11_personality', 'ICD_11_PTSD',
    'DSM_5_TR_changes', 'differential_diagnosis', 'comorbidity',
    'classification_history', 'categorical_vs_dimensional',
  ],
  psychometrics: [
    'MMSE', 'MoCA', 'MADRS', 'HAM_D', 'HAM_A', 'PANSS', 'GAF',
    'reliability_types', 'validity_types', 'Cronbach_alpha',
    'sensitivity_specificity', 'PPV_NPV', 'ROC_curves',
    'likelihood_ratios', 'diagnostic_interviews', 'SCID',
  ],
  research_methodology: [
    'RCT_design', 'cohort_study', 'case_control', 'cross_sectional',
    'systematic_review', 'meta_analysis', 'NNT_NNH', 'blinding',
    'randomisation', 'confounding', 'bias_types', 'sample_size',
    'intention_to_treat', 'number_needed_to_treat', 'effect_size',
    'confidence_intervals', 'p_values', 'study_design_hierarchy',
  ],
  genetics: [
    'twin_studies', 'adoption_studies', 'molecular_genetics',
    'GWAS_findings', 'copy_number_variants', '22q11_deletion',
    'DISC1', 'COMT', 'BDNF', 'epigenetics', 'heritability_estimates',
    'linkage_studies', 'candidate_genes', 'polygenic_risk',
  ],
  epidemiology: [
    'incidence_prevalence', 'lifetime_risk', 'standardised_mortality',
    'risk_factors_schizophrenia', 'obstetric_complications',
    'urbanicity', 'migration_psychosis', 'season_of_birth',
    'cannabis_psychosis', 'family_studies', 'natural_history',
    'course_outcome_schizophrenia', 'treatment_gap',
  ],
}

export const DOMAIN_TOPICS_PAPER_B: Record<string, string[]> = {
  affective_disorders: [
    'major_depression_clinical', 'bipolar_acute_mania',
    'bipolar_maintenance', 'treatment_resistant_depression',
    'seasonal_affective', 'postnatal_depression',
    'rapid_cycling_bipolar', 'mixed_affective_episodes',
    'suicide_risk_assessment', 'ECT_indications',
  ],
  psychotic_disorders: [
    'schizophrenia_diagnosis', 'treatment_resistant_schizophrenia',
    'first_episode_psychosis', 'delusional_disorder',
    'schizoaffective_disorder', 'schizotypal_disorder',
    'acute_transient_psychosis', 'shared_psychotic_disorder',
    'psychosis_substance_induced', 'early_intervention_psychosis',
  ],
  anxiety_disorders: [
    'GAD_diagnosis_treatment', 'panic_disorder_agoraphobia',
    'social_anxiety', 'specific_phobia', 'OCD_spectrum',
    'PTSD_complex_PTSD', 'health_anxiety', 'body_dysmorphic',
    'CBT_anxiety', 'SSRI_anxiety_disorders',
  ],
  legislation_mha: [
    'section_2_MHA', 'section_3_MHA', 'section_5_2', 'section_5_4',
    'section_4_MHA', 'section_135_136', 'section_17_leave',
    'section_117_aftercare', 'nearest_relative', 'AMHP_role',
    'tribunal_hearings', 'CQC_roles', 'SOAD', 'MHA_recommendations',
    'consent_to_treatment', 'part_4_MHA', 'community_treatment_order',
  ],
  legislation_mca: [
    'capacity_principles', 'best_interest_decisions',
    'lasting_power_of_attorney', 'deprivation_of_liberty',
    'DoLS_authorisation', 'LPS_reforms', 'independent_mental_capacity_advocate',
    'advance_decisions', 'court_of_protection', 'deprivation_of_liberty_safeguards',
    'MHA_MCA_interface', 'restraint_capacity', 'cognitive_assessment_capacity',
  ],
  psychotherapy: [
    'CBT_theory_practice', 'psychodynamic_therapy', 'CBT_psychosis',
    'DBT_principles', 'IPT_depression', 'behavioural_activation',
    'exposure_therapy', 'therapeutic_alliance', 'transference_countertransference',
    'defence_mechanisms', 'CAT_therapy', 'MBCT', 'family_therapy_schizophrenia',
    'group_therapy', 'interpersonal_therapy',
  ],
  child_adolescent: [
    'ADHD_diagnosis_management', 'autism_spectrum', 'conduct_disorder',
    'childhood_depression', 'anxiety_disorders_children',
    'tourette_syndrome', 'attachment_disorders', 'school_refusal',
    'CAMHS_service', 'parenting_interventions', 'child_safeguarding',
    'Tier_mental_health_services', 'adolescent_self_harm',
  ],
  forensic_psychiatry: [
    'Mens_rea_actus_reus', 'fitness_to_plead', 'insanity_defence',
    'diminished_responsibility', 'sentencing_principles',
    'psychopathy_checklist', 'risk_assessment_tools', 'HCR_20',
    'secure_hospital_levels', 'treatability_test',
    'mental_health_review_tribunals',
  ],
  learning_disability: [
    'IQ_classification', 'challenging_behaviour', 'autism_LD_overlap',
    'Down_syndrome_mental_health', 'fragile_X_syndrome',
    'behavioural_phenotypes', 'communication_assessment',
    'capacity_LD', 'informed_consent_LD', 'mental_health_LD_assessment',
  ],
  substance_misuse: [
    'alcohol_dependence', 'opioid_substitution', 'detoxification',
    'relapse_prevention', 'dual_diagnosis', 'CBT_substance_misuse',
    'motivational_interviewing', 'alcohol_related_brain_damage',
    'Wernicke_Korsakoff', 'psychosis_substance_induced',
    'cocaine_management', 'benzodiazepine_dependence',
  ],
}
