export interface Article {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  content: string
}

export const articles: Article[] = [
  {
    slug: 'best-mrcpsych-question-banks-2026',
    title: 'Best MRCPsych Question Banks in 2026: A Consultant Psychiatrist\u2019s Review',
    metaTitle: 'Best MRCPsych Question Banks 2026 | Consultant Review | PsychStar',
    metaDescription: 'Honest comparison of MRCPsych question banks in 2026. SPMM, PassMedicine, MRCPsychMentor vs adaptive platforms. Written by an NHS consultant psychiatrist.',
    date: '2026-06-08',
    readTime: '12 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'question bank', 'revision', 'Paper A', 'Paper B'],
    featured: true,
    content: `
      <p>Every MRCPsych candidate faces the same question: <em>which question bank should I use?</em> The answer has been straightforward for years \u2014 SPMM dominated the market. But in 2026, the landscape has shifted. Adaptive platforms, teaching cascades, and AI-driven blind-spot analysis have changed what a question bank can do.</p>

      <p>As an NHS consultant psychiatrist who has taught trainees through three iterations of the MRCPsych curriculum, I have watched hundreds of candidates make the same mistake: they pick a question bank based on volume rather than intelligence. This article breaks down the options with the honest lens of someone who has seen what works in exam conditions.</p>

      <h2>What Makes a Great MRCPsych Question Bank?</h2>

      <p>Before comparing platforms, it is worth defining what a question bank should actually do. The MRCPsych is not a test of recall. Paper A tests scientific foundations (neurosciences, psychopharmacology, classification). Paper B tests critical review and clinical application. Both papers require you to apply knowledge under time pressure.</p>

      <p>A good question bank therefore needs four things:</p>

      <ul>
        <li><strong>Exam-fidelity questions:</strong> The style, difficulty, and weighting must mirror the real paper. Questions that are too easy or too obscure are worse than useless \u2014 they give false confidence.</li>
        <li><strong>Detailed explanations:</strong> Not just why the correct answer is right, but why each distractor is wrong. The teaching is in the distractors.</li>
        <li><strong>Adaptive targeting:</strong> A static bank cannot identify that you consistently confuse atypical antipsychotic side-effect profiles. An adaptive engine can.</li>
        <li><strong>Performance analytics:</strong> You need domain-level breakdowns, not just a percentage score. Which section is dragging you down? Neurosciences? Psychopharmacology? Psychotherapy modalities?</li>
      </ul>

      <h2>SPMM \u2014 The Incumbent (6,000+ Questions)</h2>

      <p>SPMM remains the most widely used question bank among UK trainees, and for good reason. It has volume, it has brand recognition, and it is affordable at roughly \u00a380\u2013150 per sitting. The questions are passable and the interface is functional.</p>

      <p>However, SPMM has not evolved significantly in the last five years. The explanations are often minimal: a single paragraph telling you why the answer is correct, but rarely explaining each distractor in detail. There is no adaptive engine, no blind-spot mapping, and no personalised remediation plan.</p>

      <p>Candidates who use SPMM exclusively tend to plateau. They score 65\u201370% across the board and cannot identify which domain is holding them back. The bank gives them volume but not insight.</p>

      <p><strong>Best for:</strong> Candidates on a tight budget who want question volume and are prepared to supplement with other resources.</p>

      <h2>MRCPsychMentor \u2014 The Notes Platform</h2>

      <p>MRCPsychMentor is better as a revision guide than as a question bank. The notes are structured, clinically sound, and useful for last-minute consolidation. But the question bank component is limited \u2014 fewer than 500 questions, with minimal analytics.</p>

      <p>Trainees typically use MRCPsychMentor alongside SPMM: one for notes, the other for questions. This works, but it is inefficient. You end up cross-referencing two systems rather than learning in one place.</p>

      <p><strong>Best for:</strong> Candidates who want a structured note set and are using a separate question bank for practice.</p>

      <h2>PassMedicine Psychiatry</h2>

      <p>PassMedicine has a strong foothold in UK medical school finals, but the psychiatry section is not deep enough for MRCPsych. The questions are oriented toward foundation-year knowledge, not the specialist depth required for Paper A neurosciences or Paper B critical review.</p>

      <p><strong>Best for:</strong> FY/CT1 level revision \u2014 not recommended as a primary MRCPsych resource.</p>

      <h2>PsychStar \u2014 The Adaptive Alternative</h2>

      <p>PsychStar is the newer entrant in this space and represents a fundamentally different philosophy. Rather than a static bank of questions, PsychStar uses a Bayesian adaptive engine that estimates your proficiency across every domain and selects questions specifically to probe your weakest areas.</p>

      <p>Key differences from traditional banks:</p>

      <ul>
        <li><strong>Teaching cascades:</strong> When you answer incorrectly, the platform does not just show you the correct answer. It triggers a multi-layer teaching cascade: concept explanation \u2192 source guideline \u2192 analogous question. You learn the underlying principle, not just the answer to one question.</li>
        <li><strong>Blind-spot mapping:</strong> Your performance is broken down by domain (neurosciences, psychopharmacology, classification, psychotherapy, etc.) and by cognitive level (recall vs application vs analysis). You can see \u2014 at a glance \u2014 exactly which areas are costing you marks.</li>
        <li><strong>NICE-grounded answers:</strong> Every explanation cites its source guideline or trial, so you can verify the evidence base yourself. This is particularly important for legal and ethical questions where the margin for error is zero.</li>
        <li><strong>Exam simulation mode:</strong> Timed, weighted, and structured to mirror the actual paper layout. You learn to manage time as well as knowledge.</li>
      </ul>

      <p>With over 4,600 questions across Paper A and Paper B, the volume is competitive with SPMM, but the adaptive layer means you spend less time on questions you already know and more time closing the gaps that would cost you marks.</p>

      <p><strong>Best for:</strong> Candidates who want personalised, intelligent preparation and are willing to invest in a premium adaptive platform.</p>

      <h2>Side-by-Side Comparison</h2>

      <table>
        <tr><th>Feature</th><th>SPMM</th><th>MRCPsychMentor</th><th>PsychStar</th></tr>
        <tr><td>Question count</td><td>~6,000</td><td>~500</td><td>4,600+</td></tr>
        <tr><td>Adaptive engine</td><td>No</td><td>No</td><td>Yes (Bayesian)</td></tr>
        <tr><td>Distractor explanations</td><td>Minimal</td><td>Limited</td><td>Full per-option</td></tr>
        <tr><td>Blind-spot mapping</td><td>No</td><td>No</td><td>Yes</td></tr>
        <tr><td>Teaching cascades</td><td>No</td><td>No</td><td>Yes</td></tr>
        <tr><td>NICE/NHS-grounded</td><td>Partial</td><td>Partial</td><td>Yes (cited)</td></tr>
        <tr><td>Paper A + B coverage</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
        <tr><td>Price (monthly)</td><td>~\u00a380\u2013150 flat</td><td>~\u00a320\u201350 flat</td><td>\u00a329 per paper</td></tr>
      </table>

      <h2>How to Choose</h2>

      <p>Your choice of question bank should match your stage of preparation:</p>

      <ul>
        <li><strong>Early preparation (6+ months out):</strong> A traditional bank for volume is reasonable, but supplement it with a tool that identifies your blind spots. The risk of waiting too long to assess your weaknesses is that you spend six months reinforcing what you already know.</li>
        <li><strong>Mid-preparation (3\u20136 months):</strong> This is where adaptive learning adds the most value. You have enough baseline knowledge for the engine to map your profile accurately. Targeted remediation at this stage can lift your score by 10\u201315%.</li>
        <li><strong>Final revision (0\u20133 months):</strong> Exam simulation and rapid fire on weak domains. A static bank cannot provide this level of specificity.</li>
      </ul>

      <h2>Final Verdict</h2>

      <p>SPMM remains the default choice for volume and price. But if you are serious about passing on your first attempt \u2014 and most trainees are, given the competition for training numbers \u2014 you need more than volume. You need intelligence. The platforms that combine exam-fidelity questions with adaptive targeting are the ones that will define the next generation of MRCPsych preparation.</p>

      <p>PsychStar offers a free 5-question trial at <a href="/try">psychstar.io/try</a> so you can judge the quality for yourself. No signup required.</p>
    `
  },
  {
    slug: 'how-to-pass-mrcpsych-paper-a',
    title: 'How to Pass MRCPsych Paper A: The Complete Guide (2026)',
    metaTitle: 'How to Pass MRCPsych Paper A | 2026 Guide | Consultant Tips',
    metaDescription: 'Complete guide to passing MRCPsych Paper A. Breakdown of sections, high-yield topics, study schedule, and proven strategies from an NHS consultant.',
    date: '2026-06-08',
    readTime: '15 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'Paper A', 'revision', 'neurosciences', 'psychopharmacology'],
    featured: true,
    content: `
      <p>MRCPsych Paper A is the scientific foundations paper. It covers behavioural science, human development, neurosciences, psychopharmacology, and classification. It is often described as the \u201cbasic sciences\u201d paper of psychiatry \u2014 but make no mistake: it requires depth, not breadth.</p>

      <p>In this guide, I will walk through the structure of Paper A, the high-yield domains, a proven study schedule, and the specific strategies that separate passing from failing.</p>

      <h2>Paper A Structure</h2>

      <p>Paper A consists of 150 multiple-choice questions (single best answer format) with a time limit of 3 hours. The mark distribution across domains is:</p>

      <ul>
        <li><strong>Neurosciences:</strong> ~40 marks (27%)</li>
        <li><strong>Psychopharmacology:</strong> ~33 marks (22%)</li>
        <li><strong>Classification & Assessment:</strong> ~25 marks (17%)</li>
        <li><strong>Psychological Models & Behavioural Science:</strong> ~25 marks (17%)</li>
        <li><strong>Human Development:</strong> ~15 marks (10%)</li>
        <li><strong>History & Philosophy:</strong> ~12 marks (8%)</li>
      </ul>

      <p>Two sections \u2014 neurosciences and psychopharmacology \u2014 account for nearly half the paper. This is not an accident. The examiners want to ensure that every psychiatrist, regardless of future subspecialty, has a solid grounding in the biological sciences underpinning mental health.</p>

      <h2>The High-Yield Topics</h2>

      <h3>Neurosciences (~40 marks)</h3>

      <p>This is the most feared section and the one that separates candidates. Key topics include:</p>

      <ul>
        <li><strong>Neuroanatomy:</strong> Limbic system, basal ganglia, prefrontal cortex, hippocampal formation. Know the blood supply (anterior vs posterior circulation) and the functional consequences of lesions in each area.</li>
        <li><strong>Neurophysiology:</strong> Synaptic transmission, neurotransmitter synthesis and degradation pathways (dopamine, serotonin, noradrenaline, GABA, glutamate, acetylcholine). The rate-limiting enzymes are a favourite question target.</li>
        <li><strong>Neurochemistry:</strong> Receptor subtypes, second messenger systems, and the dopamine hypothesis of schizophrenia (the updated version, not the simplistic 1970s model).</li>
        <li><strong>Neuroimaging:</strong> CT, MRI, fMRI, PET, SPECT \u2014 what each measures and when each is indicated. Functional imaging is increasingly common in recent papers.</li>
        <li><strong>Neuropsychology:</strong> Lobar syndromes, memory systems (declarative vs procedural, episodic vs semantic), executive function, and the neurological examination of mental state.</li>
      </ul>

      <h3>Psychopharmacology (~33 marks)</h3>

      <p>This section rewards clinical pharmacology knowledge. The examiners are less interested in esoteric receptor profiles and more interested in practical prescribing:</p>

      <ul>
        <li><strong>Antidepressants:</strong> Mechanism of action, side-effect profiles, and switching strategies. Know the STAR*D trial data (cumulative remission ~67% after four steps).</li>
        <li><strong>Antipsychotics:</strong> Typical vs atypical differences, receptor-binding profiles, metabolic side effects (clozapine monitoring requirements, olanzapine weight gain, aripiprazole as partial agonist).</li>
        <li><strong>Mood stabilisers:</strong> Lithium monitoring (renal, thyroid, calcium), valproate safety in women of childbearing potential, lamotrigine titration and Stevens-Johnson syndrome.</li>
        <li><strong>Anxiolytics:</strong> Benzodiazepine equivalence, dependence risk, and the place of pregabalin in GAD.</li>
        <li><strong>Drug interactions:</strong> CYP450 enzyme induction/inhibition is a recurring theme. Know the major CYP isoenzymes and their substrates.</li>
      </ul>

      <h3>Classification (~25 marks)</h3>

      <p>ICD-11 is now the standard, though ICD-10 still appears. Know the major diagnostic criteria for: depressive disorders, bipolar I and II, schizophrenia spectrum disorders, anxiety disorders, OCD, PTSD, and personality disorders (particularly borderline and antisocial).</p>

      <p>The examiners often test the boundary between diagnoses \u2014 for example, when does bereavement become a depressive episode? When does suspiciousness become delusional disorder?</p>

      <h2>A 12-Week Study Schedule</h2>

      <p>Below is a schedule that has worked for trainees I have supervised. It assumes 6\u20138 hours of study per week (which is realistic for a full-time clinical job).</p>

      <h3>Weeks 1\u20134: Foundation</h3>
      <ul>
        <li>Neurosciences (2 weeks): Read a core neuroanatomy text (or equivalent). Focus on pathways, not minutiae.</li>
        <li>Psychopharmacology (2 weeks): Mechanism-based learning. For each drug class, learn: mechanism \u2192 indications \u2192 side effects \u2192 interactions.</li>
      </ul>

      <h3>Weeks 5\u20138: Application</h3>
      <ul>
        <li>Classification + assessment (1 week): ICD-11 diagnostic criteria for the 12 most common conditions.</li>
        <li>Psychological models (1 week): Behavioural, cognitive, psychodynamic, and social models of mental disorder.</li>
        <li>Mixed question practice (2 weeks): 50 questions per day with teaching cascade review.</li>
      </ul>

      <h3>Weeks 9\u201312: Exam Simulation</h3>
      <ul>
        <li>Weekly timed mock exams (150 questions, 3 hours).</li>
        <li>Review every incorrect answer with the teaching cascade method.</li>
        <li>Blind-spot analysis: identify the bottom 3 domains and hammer them.</li>
      </ul>

      <h2>Common Mistakes</h2>

      <ul>
        <li><strong>The volume trap:</strong> Doing 1,000 questions without reviewing mistakes is worse than doing 200 with full review. The learning happens in the review, not the attempt.</li>
        <li><strong>The dopamine hit:</strong> Questions you find easy feel productive but teach you nothing. An adaptive platform forces you to confront your weaknesses.</li>
        <li><strong>Neglecting classification:</strong> Trainees assume they know ICD-11 criteria intuitively. They do not. Spend the time to memorise the core diagnostic requirements word-for-word.</li>
      </ul>

      <p>PsychStar\u2019s Paper A preparation package covers all sections with 2,300+ questions, an adaptive engine, and teaching cascades for every answer. You can try 5 questions free at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'mrcpsych-paper-a-vs-paper-b',
    title: 'MRCPsych Paper A vs Paper B: What\u2019s the Difference and How to Prepare for Both',
    metaTitle: 'MRCPsych Paper A vs Paper B | Differences & Preparation Strategy',
    metaDescription: 'Detailed breakdown of MRCPsych Paper A vs Paper B. Structure, content domains, question styles, and how to prepare for both papers simultaneously.',
    date: '2026-06-08',
    readTime: '10 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'Paper A', 'Paper B', 'revision strategy', 'exam format'],
    featured: true,
    content: `
      <p>One of the most common questions trainees ask is how to divide their time between Paper A and Paper B. The two papers test fundamentally different skill sets, yet they are often taken in the same sitting. Understanding the difference is the first step to an efficient study strategy.</p>

      <h2>The Core Difference</h2>

      <p><strong>Paper A</strong> tests <em>scientific foundations</em>. It asks: do you understand the basic sciences that underpin psychiatric practice? This includes neuroanatomy, psychopharmacology, psychological theories, and classification systems. The answers are largely factual \u2014 you either know them or you do not.</p>

      <p><strong>Paper B</strong> tests <em>clinical application and critical appraisal</em>. It asks: can you apply your knowledge to clinical scenarios and can you critically evaluate research evidence? This includes clinical psychiatry topics (general adult, old age, child, forensic, learning disability), psychotherapy, and critical review skills.</p>

      <h2>Structure Comparison</h2>

      <table>
        <tr><th>Element</th><th>Paper A</th><th>Paper B</th></tr>
        <tr><td>Questions</td><td>150 MCQ (SBA)</td><td>150 MCQ (SBA)</td></tr>
        <tr><td>Duration</td><td>3 hours</td><td>3 hours</td></tr>
        <tr><td>Marks</td><td>150</td><td>150</td></tr>
        <tr><td>Pass mark (approx.)</td><td>60\u201365%</td><td>60\u201365%</td></tr>
        <tr><td>Question style</td><td>Factual recall + application</td><td>Clinical scenarios + critical appraisal</td></tr>
        <tr><td>Key skill</td><td>Knowledge depth</td><td>Clinical reasoning + statistics</td></tr>
      </table>

      <h2>Paper A: Domain Breakdown</h2>

      <ul>
        <li><strong>Neurosciences (27%):</strong> Neuroanatomy, neurophysiology, neurochemistry, neuroimaging, neuropsychology. The most feared section and the one with the most factual density.</li>
        <li><strong>Psychopharmacology (22%):</strong> Mechanism of action, pharmacokinetics, side effects, interactions. Mechanism-based learning is essential here.</li>
        <li><strong>Classification & Assessment (17%):</strong> ICD-11 diagnostic criteria, clinical assessment, psychometric properties of assessment tools.</li>
        <li><strong>Psychological Models (17%):</strong> Behavioural, cognitive, psychodynamic, and social models. Know the key theorists and their contributions.</li>
        <li><strong>Human Development (10%):</strong> Attachment theory, Piaget, Erikson, lifespan development.</li>
        <li><strong>History & Philosophy (8%):</strong> Key figures in psychiatric history, ethical principles, and philosophical debates in psychiatry.</li>
      </ul>

      <h2>Paper B: Domain Breakdown</h2>

      <ul>
        <li><strong>Critical Review (33.5%):</strong> Statistics, epidemiology, research methodology, critical appraisal of RCTs, systematic reviews, and meta-analyses. This is the section that surprises most candidates \u2014 it is not just clinical psychiatry.</li>
        <li><strong>General Adult Psychiatry (20%):</strong> Depressive disorders, bipolar disorder, schizophrenia spectrum, anxiety disorders, OCD, PTSD, eating disorders, somatoform disorders.</li>
        <li><strong>Old Age Psychiatry (10%):</strong> Dementia, delirium, depression in older adults, late-life psychosis.</li>
        <li><strong>Child & Adolescent Psychiatry (8%):</strong> Neurodevelopmental disorders, conduct disorder, emotional disorders in children.</li>
        <li><strong>Substance Misuse (8%):</strong> Alcohol, opioids, stimulants, cannabis \u2014 withdrawal, intoxication, and long-term complications.</li>
        <li><strong>Forensic Psychiatry (6%):</strong> MHA 1983, fitness to plead, criminal responsibility, risk assessment.</li>
        <li><strong>Learning Disability (6%):</strong> Assessment, behavioural phenotypes, mental health in LD, legal framework.</li>
        <li><strong>Psychotherapy (5%):</strong> CBT, psychodynamic therapy, DBT, CAT, family therapy. Know the indications and evidence base.</li>
        <li><strong>Service Organisation (3.5%):</strong> Care pathways, NICE implementation, service models.</li>
      </ul>

      <h2>The Critical Review Factor</h2>

      <p>The critical review section deserves special attention. It accounts for 50 of the 150 marks \u2014 a third of the entire paper \u2014 yet many trainees underestimate its breadth. You need to understand:</p>

      <ul>
        <li>Statistical tests (t-test, chi-square, ANOVA, Mann-Whitney, correlation coefficients)</li>
        <li>Measures of effect (risk ratio, odds ratio, NNT, hazard ratio)</li>
        <li>Sensitivity, specificity, PPV, NPV, likelihood ratios</li>
        <li>Study designs (RCT, cohort, case-control, cross-sectional, qualitative)</li>
        <li>Bias types and how to identify them in published research</li>
        <li>Critical appraisal frameworks (CASP, SIGN, GRADE)</li>
      </ul>

      <p>This is an area where simple question volume is insufficient. You need to engage with the concepts actively \u2014 calculating NNT from a 2\u00d72 table, identifying the type of bias in a flawed study design, interpreting a forest plot from a meta-analysis.</p>

      <h2>Can You Prepare for Both Simultaneously?</h2>

      <p>Yes, but most trainees struggle because they study one domain at a time. A better approach is to interleave: 30 minutes of neuroscience in the morning, 30 minutes of critical review in the evening. This forces your brain to switch contexts, which improves long-term retention.</p>

      <p>PsychStar covers both papers with 4,600+ questions and a cross-paper adaptive engine. If you struggle with dopamine pathways in Pharmacology (Paper A), the engine may present you with a psychotic disorders question (Paper B) that tests the same pathway conceptually. This cross-domain linking is something no static bank can replicate.</p>

      <p>Try 5 free questions from both papers at <a href="/try">psychstar.io/try</a> to see the difference.</p>
    `
  },
  {
    slug: 'mrcpsych-pharmacology-high-yield-topics',
    title: 'MRCPsych Pharmacology: The High-Yield Topics for Paper A',
    metaTitle: 'MRCPsych Pharmacology High-Yield Topics | Paper A Guide',
    metaDescription: 'High-yield pharmacoloy topics for MRCPsych Paper A. Antidepressants, antipsychotics, mood stabilisers, mechanisms, side effects, and essential trial data.',
    date: '2026-06-08',
    readTime: '11 min read',
    category: 'Paper A',
    tags: ['pharmacology', 'Paper A', 'antidepressants', 'antipsychotics', 'MRCPsych'],
    featured: false,
    content: `
      <p>Psychopharmacology accounts for approximately 22% of Paper A marks \u2014 roughly 33 of 150 questions. This makes it the second-largest section after neurosciences. Unlike neurosciences, however, pharmacology is fundamentally logical. If you understand mechanisms, you can deduce side effects and interactions without memorising every fact in isolation.</p>

      <h2>Antidepressants: Mechanism-First Learning</h2>

      <p>There are eight classes of antidepressants, but the underlying mechanisms reduce to three core strategies: increase monoamine availability, modulate receptor sensitivity, or alter intracellular signalling.</p>

      <h3>SSRIs</h3>
      <p>Mechanism: Inhibit serotonin reuptake via SERT. First-line for moderate-severe depression due to favourable side-effect profile and safety in overdose. Key difference between SSRIs: fluoxetine has the longest half-life (4\u20136 days), paroxetine has the highest anticholinergic burden and worst withdrawal, sertraline has a favourable GI profile and some dopamine reuptake inhibition at higher doses.</p>

      <h3>SNRIs</h3>
      <p>Venlafaxine and duloxetine inhibit both serotonin and noradrenaline reuptake. Dose-dependent effect: at lower doses (venlafaxine <150mg), serotonergic effects dominate. At higher doses, noradrenergic effects emerge. Venlafaxine requires blood pressure monitoring. Duloxetine is licensed for diabetic neuropathic pain and stress incontinence as well as depression.</p>

      <h3>NaSSAs (Mirtazapine)</h3>
      <p>Mirtazapine blocks presynaptic \u03b12-adrenoceptors, increasing noradrenaline and serotonin release. It also blocks 5-HT2 and 5-HT3 receptors (reducing anxiety and GI side effects) and H1 receptors (causing sedation). It has the lowest seizure risk of any antidepressant and the lowest sexual dysfunction rate \u2014 making it first-line in patients with epilepsy or pre-existing sexual dysfunction.</p>

      <h3>TCAs</h3>
      <p>Amitriptyline, nortriptyline, clomipramine, imipramine, dosulepin. Block serotonin and/or noradrenaline reuptake, but also block histamine, acetylcholine, and \u03b11-adrenoceptors \u2014 hence the side-effect burden (sedation, dry mouth, constipation, postural hypotension, cardiac toxicity). Nortriptyline has the best evidence in post-stroke depression. Clomipramine is the TCA evidence-based for OCD.</p>

      <h3>MAOIs</h3>
      <p>Phenelzine, tranylcypromine, moclobemide (reversible MAO-A inhibitor). Irreversible MAOIs require dietary tyramine restriction to avoid hypertensive crisis. Exam classic: cheese reaction = tyramine + MAOI-A = hypertensive emergency. Moclobemide does not require dietary restriction.</p>

      <h3>Other Classes</h3>
      <p><strong>Agomelatine:</strong> MT1/MT2 agonist + 5-HT2C antagonist. No sexual dysfunction, no discontinuation syndrome. Liver function monitoring required.</p>
      <p><strong>Bupropion:</strong> NDRI. Contraindicated in epilepsy and eating disorders. Used for smoking cessation and as augmentation.</p>
      <p><strong>Vortioxetine:</strong> Multimodal serotonergic agent. May improve cognitive function in depression.</p>

      <h2>Antipsychotics: The Receptor Profile Method</h2>

      <p>The key insight for antipsychotic pharmacology is that every effect \u2014 therapeutic and adverse \u2014 can be predicted from the receptor-binding profile.</p>

      <table>
        <tr><th>Receptor</th><th>Blockade effect</th></tr>
        <tr><td>D2</td><td>Antipsychotic effect (mesolimbic) | Extrapyramidal side effects (nigrostriatal) | Prolactin elevation (tuberoinfundibular)</td></tr>
        <tr><td>5-HT2A</td><td>Reduced EPS (atypical advantage) | Weight gain</td></tr>
        <tr><td>H1</td><td>Sedation | Weight gain</td></tr>
        <tr><td>M1</td><td>Anticholinergic (dry mouth, blurred vision, constipation, cognitive dulling)</td></tr>
        <tr><td>\u03b11</td><td>Postural hypotension | Sedation</td></tr>
      </table>

      <h3>Key Antipsychotics to Know</h3>

      <p><strong>Clozapine:</strong> The gold standard for treatment-resistant schizophrenia. Unique mechanism: weak D2 blockade but strong D4, 5-HT2A, and adrenergic effects. Mandatory FBC monitoring due to 1% risk of agranulocytosis. Also causes sialorrhoea, tachycardia, constipation, and myocarditis (especially in the first 2 months).</p>

      <p><strong>Olanzapine:</strong> High affinity for histamine and 5-HT2C receptors = significant weight gain and metabolic syndrome. D2 occupancy drops below therapeutic threshold at 24 hours \u2014 hence once-daily dosing is sufficient for psychosis but twice-daily may improve control for some patients.</p>

      <p><strong>Risperidone:</strong> Active metabolite (9-hydroxyrisperidone). Prolactin elevation is dose-dependent and more prominent than with other atypicals. Paliperidone is the active metabolite itself, formulated as an extended-release preparation.</p>

      <p><strong>Aripiprazole:</strong> Partial D2 agonist. Unique profile: low EPS, low prolactin, low sedation, but can cause akathisia and nausea. Useful for patients with metabolic syndrome or hyperprolactinaemia from other antipsychotics.</p>

      <p><strong>Amisulpride:</strong> Selective D2/D3 antagonist. Low doses (<400mg) preferentially block presynaptic D2 receptors (disinhibiting dopamine release \u2014 potentially improving negative symptoms). High doses (>400mg) block postsynaptic D2 receptors (antipsychotic effect).</p>

      <h2>Mood Stabilisers</h2>

      <p><strong>Lithium:</strong> The most effective mood stabiliser for bipolar I disorder. Mechanism: inositol depletion and GSK-3\u03b2 inhibition. Narrow therapeutic index (0.6\u20131.0 mmol/L maintenance). Side effects: polyuria/polydipsia (nephrogenic diabetes insipidus), tremor, weight gain, hypothyroidism, hypercalcaemia. Monitoring: U&Es, TFTs, calcium (6-monthly), eGFR, lithium levels (every 3\u20136 months).</p>

      <p><strong>Valproate:</strong> Broad-spectrum anticonvulsant and mood stabiliser. Contraindicated in women of childbearing potential without a pregnancy prevention programme due to high teratogenicity. Side effects: weight gain, tremor, thrombocytopenia, hepatotoxicity, PCOS. Monitoring: LFTs, FBC, valproate levels.</p>

      <p><strong>Lamotrigine:</strong> Best evidence for bipolar depression prophylaxis. Slow titration to avoid Stevens-Johnson syndrome. No therapeutic level monitoring required. Particularly useful when the depressive phase dominates the bipolar course.</p>

      <p><strong>Carbamazepine:</strong> CYP3A4 inducer. Used in bipolar II and rapid cycling. Side effects: hyponatraemia, leucopenia, rash, ataxia. Monitoring: FBC, LFTs, U&Es, carbamazepine levels.</p>

      <h2>Essential Trial Data for Paper A</h2>

      <ul>
        <li><strong>STAR*D</strong> (2006): Cumulative remission ~67% across 4 treatment steps for major depression. Level 1 (citalopram) remission = 36.8%. No difference between switch and augment strategies.</li>
        <li><strong>CATIE</strong> (2005): Olanzapine had the lowest discontinuation rate but worst metabolic profile. Perphenazine (typical) was comparable to atypicals for efficacy. Olanzapine > risperidone > quetiapine > ziprasidone for time to discontinuation.</li>
        <li><strong>CUtLASS</strong> (2006): No significant advantage of atypicals over typicals (sulpiride, haloperidol) for quality of life in schizophrenia. First-generation antipsychotics are not inferior in many patients.</li>
        <li><strong>BALANCE</strong> (2010): Lithium + valproate combination was more effective than valproate alone for bipolar maintenance. Lithium alone was comparable to combination therapy.</li>
      </ul>

      <p>PsychStar\u2019s pharmacology questions are grounded in NICE guidelines and trial data, with full teaching cascades for every incorrect answer. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'mrcpsych-revision-3-month-schedule',
    title: 'MRCPsych Revision: A 3-Month Study Schedule That Works',
    metaTitle: 'MRCPsych Revision Schedule | 3-Month Study Plan | PsychStar',
    metaDescription: 'Proven 3-month MRCPsych study schedule. Week-by-week breakdown for Paper A and B. Includes daily tasks, resource recommendations, and exam simulation timing.',
    date: '2026-06-08',
    readTime: '9 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'revision schedule', 'study plan', 'Paper A', 'Paper B'],
    featured: false,
    content: `
      <p>A structured revision schedule is the difference between passing and scraping through. Most trainees fail because they run out of time, not because they lack knowledge. They spend too long on familiar topics and not long enough on their blind spots.</p>

      <p>This 3-month schedule is designed for a trainee working full-time in clinical psychiatry. It assumes 1\u20132 hours on weekdays and 4\u20136 hours on weekend days. Total study time: approximately 200 hours across 12 weeks.</p>

      <h2>Week 1: Diagnostic Baseline</h2>

      <p>Do not start with content. Start with assessment.</p>

      <ul>
        <li><strong>Day 1:</strong> Sit a timed 50-question diagnostic test (mix of Paper A and B domains). Do not prepare beforehand. Score it honestly.</li>
        <li><strong>Day 2:</strong> Analyse your results by domain. Identify your bottom 3 sections.</li>
        <li><strong>Day 3\u20135:</strong> For each bottom domain, read the relevant curriculum document. Understand what the exam expects.</li>
        <li><strong>Day 6\u20137:</strong> Rest or light reading of classification criteria.</li>
      </ul>

      <p>Target output: A written list of your 3 weakest domains, with specific sub-topics within each.</p>

      <h2>Weeks 2\u20135: Foundation (Paper A Heavy)</h2>

      <p>Paper A content is factual and requires deliberate memorisation. Paper B content in this phase is limited to clinical reading.</p>

      <h3>Week 2: Neurosciences \u2014 Neuroanatomy & Neurophysiology</h3>
      <ul>
        <li>Daily: 30 minutes of neuroanatomy (limbic system, basal ganglia, frontal lobe circuits, blood supply)</li>
        <li>Daily: 15 questions on neurosciences from an adaptive bank</li>
        <li>Weekly: One 45-minute block on neurophysiology (synaptic transmission, neurotransmitter pathways)</li>
      </ul>

      <h3>Week 3: Neurosciences \u2014 Neurochemistry & Neuropsychology</h3>
      <ul>
        <li>Daily: Receptor subtypes, second messenger systems, and neurotransmitter synthesis/degradation</li>
        <li>Daily: Lobar syndromes, memory systems, executive function</li>
        <li>Weekly: Timed 60-question mixed neurosciences block</li>
      </ul>

      <h3>Week 4: Psychopharmacology</h3>
      <ul>
        <li>Daily: One antidepressant class (mechanism \u2192 indications \u2192 side effects \u2192 interactions) + 10 related questions</li>
        <li>Daily: One antipsychotic (receptor profile \u2192 clinical effects \u2192 monitoring)</li>
        <li>Weekend: Mood stabilisers + anxiolytics in a single 3-hour block</li>
      </ul>

      <h3>Week 5: Classification & Psychological Models</h3>
      <ul>
        <li>ICD-11 criteria for depressive, bipolar, schizophrenia, anxiety, OCD, PTSD, personality disorders</li>
        <li>Psychological models: behavioural (Pavlov, Skinner, Bandura), cognitive (Beck, Ellis), psychodynamic (Freud, Klein, Winnicott, Bowlby), social (Brown, Harris, Zimbardo)</li>
        <li>Weekly: 100-question mixed Paper A mock</li>
      </ul>

      <h2>Weeks 6\u20138: Application (Paper B Heavy)</h2>

      <p>Now shift focus to clinical psychiatry and critical review.</p>

      <h3>Week 6: Critical Review \u2014 Statistics & Methodology</h3>
      <ul>
        <li>Daily: One statistical concept (types of data, distributions, hypothesis testing, t-test, chi-square, ANOVA, Mann-Whitney, correlation, regression)</li>
        <li>Daily: Calculate NNT, NNH, ARR, RRR, OR from a 2\u00d72 table. Practise until automatic.</li>
        <li>Weekly: 50 critical review questions + full review of incorrect answers</li>
      </ul>

      <h3>Week 7: Critical Review \u2014 Appraisal & Bias</h3>
      <ul>
        <li>Study designs (RCT, cohort, case-control, cross-sectional, qualitative, systematic review, meta-analysis)</li>
        <li>Bias types (selection, information, recall, publication, detection, attrition) with examples</li>
        <li>CASP checklists for each study type. Work through two published papers.</li>
        <li>Weekly: Interpret a forest plot, a funnel plot, and a ROC curve</li>
      </ul>

      <h3>Week 8: General Adult Psychiatry</h3>
      <ul>
        <li>Depressive disorders (all subtypes + treatment-resistant strategies)</li>
        <li>Bipolar disorder (acute mania, depression, maintenance \u2014 NICE algorithms)</li>
        <li>Schizophrenia spectrum (first-episode, relapse, treatment-resistant, clozapine protocols)</li>
        <li>Anxiety disorders, OCD, PTSD (stepped care models, first-line treatments by severity)</li>
        <li>Weekly: 100-question mixed Paper B mock</li>
      </ul>

      <h2>Weeks 9\u201312: Exam Simulation & Targeting</h2>

      <p>This phase is about exam-day conditioning and closing remaining gaps.</p>

      <h3>Week 9: Specialties (Old Age, Child, Forensic, LD, Substance)</h3>
      <ul>
        <li>One specialty per day. For each: epidemiology \u2192 assessment \u2192 management \u2192 legal framework.</li>
        <li>Pay special attention to MHA 1983 (sections 2, 3, 4, 5, 7, 17, 37, 41, 47\u201353, 58, 63) and the MCA 2005 (five principles, capacity test, best interests, DOLS, LPS).</li>
        <li>Weekly: Timed 150-question full Paper A or B</li>
      </ul>

      <h3>Week 10: Mixed Review + Weak Domain Targeting</h3>
      <ul>
        <li>Review your blind-spot map from all previous mocks</li>
        <li>Spend 80% of study time on the bottom 3 domains</li>
        <li>Spend 20% maintaining strengths (20 questions/day in strong domains)</li>
      </ul>

      <h3>Week 11: Full Exam Simulation</h3>
      <ul>
        <li>Paper A mock (150 Q, 3 hrs) \u2014 Day 1</li>
        <li>Paper B mock (150 Q, 3 hrs) \u2014 Day 2</li>
        <li>Review all errors with teaching cascade method \u2014 Days 3\u20134</li>
        <li>Light consolidation \u2014 Day 5</li>
        <li>Rest \u2014 Day 6\u20137</li>
      </ul>

      <h3>Week 12: Consolidation & Taper</h3>
      <ul>
        <li>High-yield rapid-fire: classification criteria, receptor profiles, critical appraisal formulas, key trials</li>
        <li>50\u2013100 questions per day, primarily in weak domains</li>
        <li>Light study 2 days before the exam. No new content.</li>
        <li>Sleep, hydration, logistics (location, ID, timings)</li>
      </ul>

      <h2>Resource Strategy</h2>

      <ul>
        <li><strong>Questions:</strong> PsychStar adaptive bank (4,600+ across both papers) for daily practice + mock exams</li>
        <li><strong>Notes:</strong> Your own summarised notes from each domain (can be supplemented by MRCPsychMentor or similar)</li>
        <li><strong>Critical review:</strong> Practise calculations until they become automatic. This is the easiest section to score highly in if you put in the work.</li>
        <li><strong>Guidelines:</strong> NICE guidelines for any clinical topic you are unsure about. Read the key recommendations, not the full document.</li>
      </ul>

      <p>PsychStar\u2019s adaptive engine builds your blind-spot map automatically \u2014 you never have to guess which domain to study next. Start at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'mha-and-mca-for-mrcpsych',
    title: 'MHA and MCA for MRCPsych: What You Actually Need to Know',
    metaTitle: 'MHA and MCA for MRCPsych | Legal Framework Guide',
    metaDescription: 'Essential MHA 1983 and MCA 2005 knowledge for MRCPsych Paper B. Sections, principles, capacity assessment, and exam question patterns explained by an NHS consultant.',
    date: '2026-06-08',
    readTime: '13 min read',
    category: 'Paper B',
    tags: ['MHA', 'MCA', 'mental health act', 'mental capacity act', 'forensic psychiatry', 'legal'],
    featured: false,
    content: `
      <p>The Mental Health Act 1983 and Mental Capacity Act 2005 appear consistently across MRCPsych Paper B, CASC, and clinical practice. The exam questions are often high-stakes because the legal framework is non-negotiable \u2014 getting an MHA section wrong is the difference between lawful detention and false imprisonment.</p>

      <p>This guide covers the essential legal knowledge for Paper B, structured the way the exam tests it.</p>

      <h2>MHA 1983 \u2014 The Core Sections</h2>

      <h3>Civil Detention</h3>

      <p><strong>Section 2:</strong> Admission for assessment. Duration: up to 28 days. Grounds: (a) the patient is suffering from a mental disorder of a nature or degree that warrants detention for assessment, AND (b) detention is necessary for the health or safety of the patient or the protection of others. Cannot be renewed \u2014 must be converted to S3 or the patient discharged.</p>

      <p><strong>Section 3:</strong> Admission for treatment. Duration: up to 6 months, renewable. Grounds: (a) the patient is suffering from a mental disorder of a nature or degree that makes treatment in hospital necessary, AND (b) appropriate medical treatment is available, AND (c) detention is necessary for health/safety or protection of others. Requires two doctors (S12-approved + one other) and an AMHP.</p>

      <p><strong>Section 4:</strong> Emergency admission. Duration: up to 72 hours. Grounds: urgent necessity where compliance with S2/S3 procedures would cause undesirable delay. One doctor (any), one AMHP (or nearest relative). Cannot be renewed \u2014 must be converted to S2 or S3.</p>

      <p><strong>Section 5(2):</strong> Doctor\u2019s holding power. Duration: up to 72 hours. Used when an informal inpatient decides to leave and is at risk. The responsible clinician or their nominated deputy can detain. Nominated deputy is usually the duty doctor \u2014 not any doctor.</p>

      <p><strong>Section 5(4):</strong> Nurse\u2019s holding power. Duration: up to 6 hours. Used when a doctor is not immediately available. The nurse must be of a prescribed class (RMN or RNLD).</p>

      <h3>Community Powers</h3>

      <p><strong>Community Treatment Order (CTO \u2014 S17A):</strong> Allows supervised treatment in the community for patients previously detained under S3. Conditions can include: residence, attending appointments, taking medication. Recall to hospital if conditions are breached. Renewable annually.</p>

      <p><strong>Section 17 Leave:</strong> The responsible clinician can grant leave of absence to a detained patient. Can be for any period but requires renewal if >7 consecutive days in the first month. Leave can be escorted or unescorted and can include conditions.</p>

      <h3>Forensic Sections</h3>

      <p><strong>Section 37:</strong> Hospital order (court). The court makes an order for detention in hospital following conviction for an imprisonable offence (excluding murder, where S41 is mandatory). Requires two doctors to confirm that detention is necessary.</p>

      <p><strong>Section 41:</strong> Restriction order. Imposed by the Crown Court alongside S37 (or S47) to protect the public from serious harm. Unrestricted or restricted (by time, conditions, or absolute). Discharge requires Secretary of State or Mental Health Tribunal approval.</p>

      <p><strong>Section 47/49:</strong> Transfer of prisoners to hospital for treatment. S47 is the transfer direction; S49 imposes restrictions equivalent to S41.</p>

      <p><strong>Section 48/49:</strong> Transfer of unsentenced/remand prisoners. S48 is the transfer direction for urgent cases.</p>

      <h3>Treatment Provisions</h3>

      <p><strong>Section 57:</strong> Neurosurgery for mental disorder. Requires consent + SOAD + independent panel. Very rarely used.</p>

      <p><strong>Section 58:</strong> Medication beyond 3 months. Requires either the patient\u2019s consent OR a SOAD (Second Opinion Appointed Doctor). This is the most commonly examined treatment section.</p>

      <p><strong>Section 58A:</strong> ECT. If the patient has capacity and consents: requires consent + SOAD confirmation. If the patient lacks capacity OR refuses: requires SOAD + the treatment must be immediately necessary to save life or prevent serious deterioration.</p>

      <p><strong>Section 63:</strong> Treatment not requiring consent. Covers treatments not covered by S57/58/58A (nursing care, rehabilitation, oral medication within the first 3 months).</p>

      <h2>MCA 2005 \u2014 The Five Principles</h2>

      <p>The MCA is organised around five statutory principles. The exam expects you to know them in order and understand their application:</p>

      <ol>
        <li><strong>Presumption of capacity:</strong> Every adult has the right to make their own decisions unless proven otherwise.</li>
        <li><strong>All practical steps:</strong> A person should be supported to make their own decision before concluding they lack capacity. This includes communication aids, interpreters, timing, and environment adjustments.</li>
        <li><strong>Unwise decisions:</strong> A person is not to be treated as lacking capacity merely because they make an unwise decision.</li>
        <li><strong>Best interests:</strong> Any act or decision made on behalf of a person who lacks capacity must be in their best interests.</li>
        <li><strong>Least restrictive intervention:</strong> Before acting, consider whether the purpose can be achieved in a way that is less restrictive of the person\u2019s rights and freedoms.</li>
      </ol>

      <h2>The Two-Stage Capacity Test</h2>

      <p><strong>Diagnostic test (Stage 1):</strong> Is there an impairment of, or disturbance in, the functioning of the mind or brain?</p>

      <p><strong>Functional test (Stage 2):</strong> Does the impairment mean the person cannot:</p>
      <ul>
        <li>Understand the relevant information, OR</li>
        <li>Retain that information, OR</li>
        <li>Use or weigh that information, OR</li>
        <li>Communicate their decision?</li>
      </ul>

      <p>The capacity assessment is decision-specific and time-specific. A person may have capacity to decide what to eat but not to decide about a complex treatment. A person who lacks capacity today may regain capacity tomorrow.</p>

      <h2>The MHA vs MCA Interface (Most Examined Area)</h2>

      <p>This is the most commonly tested legal question in Paper B. The key distinctions:</p>

      <table>
        <tr><th>Scenario</th><th>Use MHA</th><th>Use MCA</th></tr>
        <tr><td>Objecting to admission for mental disorder treatment</td><td>S2/S3</td><td>No \u2014 cannot deprive of liberty under MCA if objecting (unless DOLS/LPS process)</td></tr>
        <tr><td>Lacks capacity + non-objecting + requires care in a care home</td><td>No</td><td>DOLS/LPS authorisation</td></tr>
        <tr><td>Lacks capacity + non-objecting + requires hospital admission</td><td>No (if no objection)</td><td>S4B (urgent) then Court of Protection (standard)</td></tr>
        <tr><td>Has capacity + refusing treatment + meets MHA criteria</td><td>S2/S3</td><td>No \u2014 cannot treat under MCA if person has capacity</td></tr>
        <tr><td>Physical health treatment for a detained patient who lacks capacity</td><td>No (MHA covers mental disorder only)</td><td>MCA \u2014 best interests decision</td></tr>
      </table>

      <h2>Liberty Protection Safeguards (LPS)</h2>

      <p>LPS replaces DOLS from April 2025 (implementation now phased). Key changes:</p>
      <ul>
        <li>Applies to 16\u201317-year-olds as well as adults</li>
        <li>Three assessments: capacity, medical, and necessary and proportionate</li>
        <li>The responsible body (ICB or Local Authority) arranges the assessments, not the court</li>
        <li>Duration: up to 12 months (renewable), compared to DOLS 12 months (non-renewable for care homes)</li>
      </ul>

      <h2>Exam Question Patterns</h2>

      <p>Legal questions in Paper B tend to follow predictable patterns:</p>

      <ul>
        <li>\u201cA 45-year-old woman with schizophrenia refuses medication. She has insight. Her PHQ-9 is 9. What is the next step?\u201d \u2014 Answer: She has capacity and is not at imminent risk. You cannot force treatment. Offer alternatives, negotiate, and monitor.</li>
        <li>\u201cA 68-year-old man with dementia is refusing care in a care home. He cannot understand the risks. What legal framework?\u201d \u2014 Answer: MCA capacity assessment. If lacks capacity and is objecting, DOLS/LPS authorisation is needed for the deprivation of liberty.</li>
        <li>\u201cWhich MHA section allows ECT when the patient refuses?\u201d \u2014 Answer: S58A (requires SOAD + urgency).</li>
        <li>\u201cHow long can a nurse hold a patient under S5(4)?\u201d \u2014 Answer: 6 hours.</li>
      </ul>

      <p>PsychStar\u2019s Paper B bank includes dedicated legal questions with full teaching cascades covering MHA/MCA case law. Try 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: '5-common-mrcpsych-question-traps',
    title: '5 Common MRCPsych Question Traps \u2014 and How to Avoid Them',
    metaTitle: 'Common MRCPsych Question Traps | Exam Mistakes to Avoid',
    metaDescription: 'The 5 most common MRCPsych question traps that cost candidates marks. Learn to spot them and never fall for them again. Includes examples from real exam-style questions.',
    date: '2026-06-08',
    readTime: '8 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'exam technique', 'question traps', 'common mistakes', 'pass strategy'],
    featured: false,
    content: `
      <p>After teaching MRCPsych for several years, I have noticed a pattern: the same mistakes recur. Candidates know the content but fall for the same question structures. These are not knowledge gaps \u2014 they are reasoning errors. Identifying them is the fastest way to gain 5\u201310% on your score.</p>

      <h2>Trap 1: The \u201cAlways Do Something\u201d Bias</h2>

      <p>This is the most common error in the entire exam. A clinical scenario is presented, often dramatic or alarming, and candidates feel compelled to choose an active intervention. But MRCPsych questions frequently reward \u201cwatchful waiting\u201d or \u201cno immediate action\u201d as the correct answer.</p>

      <p><strong>Example:</strong> A 32-year-old woman with adjustment disorder presents with low mood after relationship breakdown. PHQ-9 is 12. She is tearful but has good social support, no suicidal ideation, and is functioning at work. What is the most appropriate management?</p>

      <p>The trap is to prescribe an antidepressant. The correct answer is watchful waiting and low-intensity psychosocial intervention (guided self-help, exercise, sleep hygiene). NICE stepped care reserves antidepressant medication for depression that persists after low-intensity interventions or for moderate-severe depression at presentation.</p>

      <p><strong>How to avoid it:</strong> Before choosing \u201cstart medication,\u201d ask yourself: does this patient meet the threshold for active treatment according to NICE? If PHQ-9 < 16 and no functional impairment, watchful waiting or low-intensity intervention is often correct.</p>

      <h2>Trap 2: Choosing the \u201cBest\u201d Drug Instead of the Guideline</h2>

      <p>Another pattern: the question describes a patient with a specific comorbidity, and candidates pick the most pharmacologically elegant answer rather than the guideline-recommended first-line.</p>

      <p><strong>Example:</strong> A patient with depression and epilepsy. Trainees often pick mirtazapine (lowest seizure risk, pharmacologically elegant). But if the question specifies mild depression and the patient prefers psychological therapy, the correct answer is CBT \u2014 regardless of the pharmacological elegance.</p>

      <p><strong>How to avoid it:</strong> Always check: is there a non-pharmacological option that NICE recommends as first-line? The MRCPsych tests your knowledge of guidelines, not your personal prescribing preferences.</p>

      <h2>Trap 3: The MHA \u201cUrgency\u201d Misdirection</h2>

      <p>Questions about the Mental Health Act often describe a patient in crisis and ask which section to use. The trap is jumping to Section 4 (emergency) when Section 2 would be appropriate, or Section 2 when Section 3 is needed.</p>

      <p><strong>Example:</strong> A 40-year-old man with paranoid schizophrenia is brought to ED by police. He is acutely psychotic, responding to internal stimuli, and refusing admission. He is well-known to services with multiple prior detentions. The question asks: which section is most appropriate?</p>

      <p>Trainees pick Section 4 (\u201che\u2019s in crisis, it\u2019s an emergency\u201d). But the correct answer is Section 2 or 3, because the urgency is manageable \u2014 there is time to follow the standard procedure. Section 4 is reserved for situations where compliance with Section 2/3 procedures would cause \u201cundesirable delay.\u201d</p>

      <p><strong>How to avoid it:</strong> Only choose Section 4 if the scenario explicitly states that time is too short for two doctors and an AMHP. Otherwise, Section 2 or 3 is the default.</p>

      <h2>Trap 4: The \u201cClinical Experience\u201d vs \u201cTrial Evidence\u201d Trap</h2>

      <p>Paper B in particular tests critical appraisal. A question may present a clinical scenario, an intervention, and then ask: \u201cWhat is the most appropriate next step in management?\u201d The distractors include clinically sensible options that are not supported by trial evidence.</p>

      <p><strong>Example:</strong> A patient with treatment-resistant depression has failed two antidepressants. Augmentation with aripiprazole vs switching to MAOI. Clinically, either could work. The question expects you to know the STAR*D evidence: no significant difference between switch and augment strategies at any level. Both are valid options.</p>

      <p><strong>How to avoid it:</strong> The MRCPsych rewards knowledge of specific trial data (STAR*D, CATIE, CUtLASS, BALANCE). If you know the data, you see the trap. If you rely on clinical experience alone, you fall for it.</p>

      <h2>Trap 5: The \u201cMost Likely\u201d vs \u201cMost Appropriate\u201d Confusion</h2>

      <p>Many candidates do not read the question stem carefully. Some questions ask \u201cWhich is the most likely diagnosis?\u201d Others ask \u201cWhat is the most appropriate management?\u201d These are different skills. Diagnosis questions test pattern recognition. Management questions test guideline knowledge.</p>

      <p><strong>Example that trips candidates up:</strong></p>

      <p>A 28-year-old woman presents with auditory hallucinations, persecutory delusions, and thought disorder for 6 weeks. She has no previous psychiatric history. Which is the most likely diagnosis?</p>

      <p>Trainees recognise schizophrenia and wonder about first-episode vs schizophrenia. But ICD-11 requires 1 month of symptoms for a schizophrenia diagnosis. At 6 weeks (1.5 months), this meets the duration threshold. The diagnosis is schizophrenia (F20). Some candidates overthink and say \u201cacute and transient psychotic disorder\u201d (which requires 1 month max).</p>

      <p><strong>How to avoid it:</strong> Read the question stem twice. First pass: identify the question type (diagnosis, management, investigation, mechanism). Second pass: identify the distractors and why they are wrong. The answer is usually the option that directly addresses the question type without adding unnecessary complexity.</p>

      <h2>How to Practise Avoiding Traps</h2>

      <ul>
        <li>When you get a question wrong, ask: was this a knowledge gap or a reasoning error?</li>
        <li>If it was a reasoning error, name the trap (e.g., \u201cAlways Do Something bias\u201d) and review the case pattern.</li>
        <li>Track your trap types. After 50 questions, you will see which one you are most vulnerable to.</li>
        <li>Use a question bank with full distractor explanations. Understanding why B is wrong is more valuable than knowing why A is right.</li>
      </ul>

      <p>PsychStar\u2019s teaching cascades call out exactly which reasoning error you made and how to spot it next time. Try 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'neuroscience-for-mrcpsych-paper-a',
    title: 'Neuroscience for MRCPsych Paper A: A Crash Guide',
    metaTitle: 'Neuroscience for MRCPsych Paper A | Essential Crash Guide',
    metaDescription: 'Crash guide to neuroscience for MRCPsych Paper A. Neuroanatomy, neurophysiology, neurochemistry, neuropsychology, and neuroimaging \u2014 what you actually need to know.',
    date: '2026-06-08',
    readTime: '14 min read',
    category: 'Paper A',
    tags: ['neuroscience', 'neuroanatomy', 'Paper A', 'neurophysiology', 'MRCPsych'],
    featured: false,
    content: `
      <p>Neurosciences is the largest single section in Paper A at approximately 27% (40 of 150 marks). It is also the section that candidates consistently perform worst on. This is partly because medical school neuroscience teaching is variable and partly because the MRCPsych demands a depth that goes beyond undergraduate level.</p>

      <p>This crash guide covers the essential neuroscience for Paper A, structured by question frequency.</p>

      <h2>Neuroanatomy: The Structures That Matter</h2>

      <h3>The Limbic System</h3>

      <p>The limbic system is the most examined neuroanatomical topic. Know its components and their functions:</p>

      <ul>
        <li><strong>Hippocampus:</strong> Memory consolidation (declarative/episodic), spatial navigation. Bilateral lesion = anterograde amnesia (Korsakoff syndrome, hippocampal sclerosis in temporal lobe epilepsy). Vulnerable to glucocorticoid excess and hypoxia.</li>
        <li><strong>Amygdala:</strong> Emotional processing (particularly fear and threat detection), emotional memory. Bilateral lesion = Kluver-Bucy syndrome (hyperorality, hypersexuality, emotional blunting, visual agnosia). Overactive in anxiety disorders and PTSD.</li>
        <li><strong>Cingulate gyrus:</strong> Anterior cingulate = conflict monitoring, error detection, emotional regulation. Posterior cingulate = visuospatial orientation, memory retrieval.</li>
        <li><strong>Hypothalamus:</strong> Autonomic control, endocrine regulation, circadian rhythms, appetite, thirst, temperature, emotional responses. Lesion = endocrine disturbance, autonomic dysregulation.</li>
        <li><strong>Thalamus:</strong> Sensory relay station. Mediodorsal nucleus = memory and emotion (lesion in Korsakoff syndrome). Anterior nucleus = part of Papez circuit.</li>
        <li><strong>Septal area:</strong> Pleasure and reward (intracranial self-stimulation in animal models).</li>
      </ul>

      <h3>The Basal Ganglia</h3>

      <p>Know the two main circuits:</p>

      <p><strong>Direct pathway:</strong> Cortex \u2192 Striatum \u2192 Globus pallidus interna (GPi)/Substantia nigra pars reticulata (SNr) \u2192 Thalamus \u2192 Cortex. Net effect: facilitates movement. Dopamine (D1 receptor) activates this pathway.</p>

      <p><strong>Indirect pathway:</strong> Cortex \u2192 Striatum \u2192 Globus pallidus externa (GPe) \u2192 Subthalamic nucleus (STN) \u2192 GPi/SNr \u2192 Thalamus \u2192 Cortex. Net effect: inhibits movement. Dopamine (D2 receptor) suppresses this pathway.</p>

      <p><strong>Clinical correlates:</strong> Parkinson\u2019s disease = dopamine depletion \u2192 increased indirect pathway activity \u2192 bradykinesia/rigidity. Huntington\u2019s disease = loss of indirect pathway (GPe/STN) \u2192 chorea. Antipsychotics (D2 blockade) \u2192 increased indirect pathway \u2192 EPS.</p>

      <h3>Prefrontal Cortex</h3>

      <p>Divided into three functional regions:</p>
      <ul>
        <li><strong>Dorsolateral PFC:</strong> Executive function (planning, working memory, cognitive flexibility). Dysfunction = dysexecutive syndrome.</li>
        <li><strong>Orbitofrontal PFC:</strong> Social cognition, impulse control, reward processing. Dysfunction = disinhibition, poor judgement, emotional lability.</li>
        <li><strong>Ventromedial PFC:</strong> Emotional regulation, decision-making, empathy. Dysfunction = affective dysregulation, impaired decision-making.</li>
      </ul>

      <h2>Neurochemistry: Neurotransmitter Systems</h2>

      <h3>Dopamine Pathways</h3>

      <p>Four major pathways, each with distinct functions and clinical relevance:</p>

      <ul>
        <li><strong>Mesolimbic:</strong> VTA \u2192 Nucleus accumbens. Reward, motivation, salience. Hyperactivity = positive symptoms of schizophrenia.</li>
        <li><strong>Mesocortical:</strong> VTA \u2192 Prefrontal cortex. Executive function, cognition. Hypoactivity = negative and cognitive symptoms of schizophrenia.</li>
        <li><strong>Nigrostriatal:</strong> Substantia nigra pars compacta \u2192 Striatum. Motor control. Degeneration = Parkinson\u2019s disease. Blockade = EPS (antipsychotics).</li>
        <li><strong>Tuberoinfundibular:</strong> Hypothalamus \u2192 Anterior pituitary. Prolactin inhibition. Blockade (antipsychotics) = hyperprolactinaemia.</li>
      </ul>

      <h3>Serotonin (5-HT) Pathways</h3>

      <p>Raphe nuclei \u2192 widespread cortical and subcortical projections. Multiple receptor subtypes (at least 14). Key ones for Paper A:</p>
      <ul>
        <li><strong>5-HT1A:</strong> Autoreceptor (somatodendritic). Agonist action (buspirone, partial SSRI effect) = anxiolytic.</li>
        <li><strong>5-HT2A:</strong> Postsynaptic. Blockade contributes to atypical antipsychotic effect. Agonism (LSD, psilocybin) = hallucinogenic.</li>
        <li><strong>5-HT3:</strong> Ion channel. Involved in nausea and vomiting (ondansetron blocks this).</li>
        <li><strong>5-HT7:</strong> Involved in circadian rhythm regulation and mood.</li>
      </ul>

      <h3>GABA and Glutamate</h3>

      <p><strong>GABA:</strong> The main inhibitory neurotransmitter. GABA-A receptor = ion channel (benzodiazepines, barbiturates, alcohol, z-drugs all potentiate GABA-A). GABA-B receptor = metabotropic (baclofen).</p>

      <p><strong>Glutamate:</strong> The main excitatory neurotransmitter. NMDA receptor (ketamine, phencyclidine, memantine) is the most exam-relevant. NMDA receptor hypofunction is a leading neurochemical hypothesis for schizophrenia (explains why PCP/ketamine produce schizophrenia-like symptoms).</p>

      <h2>Neuroimaging: Which Modality for Which Question</h2>

      <table>
        <tr><th>Modality</th><th>Measures</th><th>When to use</th></tr>
        <tr><td>CT</td><td>Structural (bone, blood, calcification, gross atrophy)</td><td>Emergency: acute intracranial pathology (bleed, mass, fracture)</td></tr>
        <tr><td>MRI</td><td>Structural (soft tissue, grey/white matter, hippocampal volume)</td><td>Research in schizophrenia (reduced grey matter), Alzheimer\u2019s (hippocampal atrophy), multiple sclerosis</td></tr>
        <tr><td>fMRI</td><td>Blood-oxygen-level-dependent (BOLD) signal \u2192 regional brain activity</td><td>Research: localising cognitive functions, functional connectivity in psychiatric disorders</td></tr>
        <tr><td>PET</td><td>Metabolic activity (glucose metabolism via FDG) or receptor density/occupancy</td><td>Research: D2 receptor occupancy by antipsychotics, amyloid imaging in Alzheimer\u2019s</td></tr>
        <tr><td>SPECT</td><td>Regional cerebral blood flow (rCBF) as proxy for activity</td><td>Clinical: distinguishing Alzheimer\u2019s from frontotemporal dementia (temporoparietal hypoperfusion in Alzheimer\u2019s, frontal in FTD)</td></tr>
        <tr><td>DTI</td><td>White matter tract integrity (diffusion of water molecules)</td><td>Research: white matter connectivity in schizophrenia, autism, TBI</td></tr>
        <tr><td>MRS</td><td>Metabolite concentrations (NAA, choline, creatine, glutamate)</td><td>Research: neurotransmitter levels in vivo</td></tr>
      </table>

      <h2>Neuropsychology: Lobar Syndromes and Cognitive Domains</h2>

      <p><strong>Frontal lobe syndrome:</strong> Three subtypes you must know:</p>
      <ul>
        <li><strong>Dorsolateral:</strong> Dysexecutive (poor planning, reduced cognitive flexibility, impaired working memory, perseveration)</li>
        <li><strong>Orbitofrontal:</strong> Disinhibited (impulsivity, inappropriate social behaviour, emotional lability, poor judgement)</li>
        <li><strong>Medial frontal:</strong> Apathetic (reduced initiation, abulia, mutism, urinary incontinence)</li>
      </ul>

      <p><strong>Temporal lobe:</strong> Dominant (left): language deficits (Wernicke\u2019s aphasia, sensory dysphasia), verbal memory impairment. Non-dominant (right): prosopagnosia (face recognition), visuospatial deficits, emotional recognition deficits. Hippocampal: anterograde amnesia. Amygdala: emotional processing deficits.</p>

      <p><strong>Parietal lobe:</strong> Dominant: Gerstmann syndrome (acalculia, agraphia, finger agnosia, left-right disorientation). Non-dominant: hemispatial neglect (left), constructional apraxia, anosognosia.</p>

      <p><strong>Occipital lobe:</strong> Cortical blindness, Anton syndrome (denial of blindness with confabulation), visual agnosia, prosopagnosia (fusiform gyrus).</p>

      <h2>High-Yield Facts for Quick Revision</h2>

      <ul>
        <li>Papez circuit: Hippocampus \u2192 Fornix \u2192 Mammillary bodies \u2192 Mammillothalamic tract \u2192 Anterior thalamus \u2192 Cingulate gyrus \u2192 Entorhinal cortex \u2192 Hippocampus</li>
        <li>Blood supply: Anterior cerebral artery = medial frontal/parietal. Middle cerebral artery = lateral hemisphere (most strokes). Posterior cerebral artery = occipital lobe, medial temporal.</li>
        <li>Circle of Willis: Anterior communicating, posterior communicating, anterior cerebral, internal carotid, posterior cerebral arteries. Complete circle in ~50% of people.</li>
        <li>Ventricular system: Lateral (I, II) \u2192 Foramen of Monro \u2192 Third ventricle \u2192 Aqueduct of Sylvius \u2192 Fourth ventricle \u2192 Foramina of Luschka/Magendie \u2192 Subarachnoid space.</li>
        <li>EEG rhythms: Alpha (8\u201312 Hz, relaxed/eyes closed), Beta (>12 Hz, alert/active), Theta (4\u20138 Hz, drowsy), Delta (<4 Hz, deep sleep). Epilepsy: spike-wave discharges (generalised), sharp waves (focal).</li>
      </ul>

      <p>PsychStar\u2019s Paper A bank covers all neuroscience topics with exam-style questions and full teaching cascades. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'how-mrcpsych-exam-is-scored',
    title: 'How the MRCPsych Exam is Scored: Understanding Pass Marks and Boundaries',
    metaTitle: 'MRCPsych Exam Scoring | Pass Marks, Boundaries & Mark Scheme',
    metaDescription: 'How MRCPsych exams are scored. Pass mark thresholds, standard setting, mark per question, and strategy for maximising your score. Essential knowledge for every candidate.',
    date: '2026-06-08',
    readTime: '7 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'scoring', 'pass mark', 'standard setting', 'exam strategy'],
    featured: false,
    content: `
      <p>Understanding how the MRCPsych is scored is a strategic advantage. If you know how the pass mark is set, you can make better decisions about time management, question prioritisation, and when to guess.</p>

      <h2>The MCQ Format: Single Best Answer</h2>

      <p>Both Paper A and Paper B use single best answer (SBA) format. Each question has five options, and exactly one is the best answer. There is no negative marking \u2014 you are not penalised for incorrect answers.</p>

      <p><strong>Critical implication:</strong> You should never leave a question unanswered. Even a blind guess has a 20% chance of being correct. An educated guess (where you eliminate 2\u20133 distractors) has a 33\u201350% chance. Guessing costs you nothing and gains you marks.</p>

      <h2>How the Pass Mark is Determined</h2>

      <p>The MRCPsych does not use a fixed pass mark. Instead, it uses a modified Angoff method (standard setting). A panel of expert psychiatrists reviews each question before the exam and estimates what proportion of \u201cborderline\u201d candidates would answer it correctly. These estimates are summed to produce the pass mark.</p>

      <p>This means:</p>
      <ul>
        <li>The pass mark varies slightly between sittings (typically 60\u201365% for Paper A, 60\u201365% for Paper B)</li>
        <li>The pass mark is set before you sit the exam (not a curve \u2014 you are not competing against other candidates)</li>
        <li>A difficult paper has a lower pass mark; an easy paper has a higher pass mark</li>
      </ul>

      <p><strong>Key takeaway:</strong> You are racing against the standard, not against other trainees. Focus on accuracy, not speed \u2014 but do not run out of time.</p>

      <h2>Mark Allocation</h2>

      <p>Each question in both papers carries exactly 1 mark. There are 150 questions per paper, total 150 marks. You need approximately 90\u201398 marks (60\u201365%) to pass.</p>

      <p>Time: 3 hours = 180 minutes. That is 1.2 minutes per question. This sounds tight, but most candidates finish with 15\u201330 minutes to spare. The real time pressure comes from:</p>
      <ul>
        <li>Questions with long clinical vignettes (common in Paper B)</li>
        <li>Critical review calculations (NNT, sensitivity, specificity \u2014 take 2\u20133 minutes each)</li>
        <li>MHA questions where you need to recall sections precisely</li>
      </ul>

      <h2>Strategy: Which Questions to Prioritise</h2>

      <p>Not all marks are equal in terms of time cost. Some questions can be answered in 30 seconds; others take 2 minutes. The strategic approach:</p>

      <ol>
        <li><strong>First pass (90 minutes):</strong> Answer all the questions you are confident about. If a question takes longer than 60 seconds, flag it and move on. Your goal is to secure the marks you know.</li>
        <li><strong>Second pass (60 minutes):</strong> Return to the flagged questions. Spend 1\u20132 minutes on each, using clinical reasoning and elimination.</li>
        <li><strong>Third pass (30 minutes):</strong> Select an answer for every remaining question. Even if you have to guess, pick one. Never leave a blank.</li>
      </ol>

      <h2>The 10-Question Review Rule</h2>

      <p>At the end of the exam, review your answers to the last 10 questions. These are the ones most affected by time pressure and fatigue. If you have time, read their stems again. Candidates often make more errors in the final minutes of the exam than at any other point.</p>

      <h2>How Your Score is Reported</h2>

      <p>Results are reported as a scaled score (mean 250, SD 40). The pass mark is typically around 240 (the exact value depends on the sitting). You receive:</p>
      <ul>
        <li><strong>Overall scaled score</strong> (pass/fail threshold)</li>
        <li><strong>Domain-level breakdown</strong> (your performance in each section)</li>
        <li><strong>Comparison cohort</strong> (how you performed relative to other candidates \u2014 informational only, not used for pass/fail)</li>
      </ul>

      <p>The domain-level breakdown is particularly useful if you need to retake. It tells you exactly which sections cost you marks. For example, if you scored 70% in neurosciences but 40% in psychopharmacology, your revision plan is clear.</p>

      <h2>Resit Implications</h2>

      <p>You can attempt each paper up to 3 times in a 12-month period. After 3 failed attempts, you must discuss your performance with the Training Programme Director and may need a period of additional training before reattempting.</p>

      <p>The statistics show:</p>
      <ul>
        <li>First-attempt pass rate for Paper A: ~65\u201375%</li>
        <li>First-attempt pass rate for Paper B: ~70\u201380%</li>
        <li>Repeat attempt pass rate: ~50\u201360% (lower, partly because of demoralisation and burnout)</li>
      </ul>

      <p>This is why investing in high-quality preparation before your first attempt is so important. The data consistently shows that candidates who use structured adaptive preparation outperform those who rely on volume alone.</p>

      <h2>Practical Implications for Your Study Strategy</h2>

      <ul>
        <li><strong>Target 75% in mocks:</strong> If you consistently score 70%+ in timed simulation, you are at the pass boundary. Aim for 75%+ to give yourself a safety margin for exam-day variability.</li>
        <li><strong>Focus on the bottom third:</strong> Most candidates have a \u201ctail\u201d of weak domains. Exam simulation tells you which ones. Spend 80% of your revision time on these, even though it feels less productive than reviewing what you already know.</li>
        <li><strong>Practise under timed conditions:</strong> Knowledge without time pressure is not exam-relevant. At least 30% of your practising should be timed.</li>
        <li><strong>Use adaptive testing:</strong> An adaptive question bank gives you a more accurate estimate of your true ability than a static bank, because it calibrates question difficulty to your performance level.</li>
      </ul>

      <p>PsychStar\u2019s exam simulation mode mirrors the real exam structure, timing, and difficulty weighting. You get a scaled score estimate, domain breakdown, and percentile ranking after every mock. Try 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'what-psychiatry-trainees-wish-they-knew-before-paper-a',
    title: 'What Psychiatry Trainees Wish They Knew Before MRCPsych Paper A',
    metaTitle: 'What Trainees Wish They Knew Before MRCPsych Paper A | Insider Tips',
    metaDescription: 'Honest advice from psychiatry trainees who passed MRCPsych Paper A. What they wish they had known about revision, exam technique, and avoiding burnout.',
    date: '2026-06-08',
    readTime: '8 min read',
    category: 'Exam Strategy',
    tags: ['MRCPsych', 'Paper A', 'trainee advice', 'revision tips', 'exam experience'],
    featured: false,
    content: `
      <p>Over the years, I have collected honest feedback from trainees after they sat Paper A. The consistent theme is: \u201cI wish I had known X before I started.\u201d This article is a compilation of the most common pieces of advice \u2014 the things that no textbook tells you but every trainee discovers through hard experience.</p>

      <h2>1. \u201cI Wish I Had Started Neurosciences First\u201d</h2>

      <p>Neurosciences is the largest section and the one that takes the longest to learn. It is not intuitive. You cannot infer neuroanatomy from clinical experience the way you can infer management of depression from your clinical work. It requires deliberate, structured memorisation.</p>

      <p>Trainees who started with pharmacology, then moved to clinical topics, and left neurosciences until last \u2014 consistently reported that they ran out of time. They ended up cramming the highest-weighting section in the final weeks.</p>

      <p><strong>Advice:</strong> Study neurosciences first, while your energy and motivation are highest. Leave the clinical topics (which feel natural because you see them at work) for later.</p>

      <h2>2. \u201cI Wish I Hadn\u2019t Bought Four Different Question Banks\u201d</h2>

      <p>There is a common belief that more question banks = more coverage. In practice, trainees who used 3\u20134 different banks ended up spending more time learning each platform\u2019s interface than actually answering questions. They also reported contradictory explanations (different banks gave different answers to similar questions).</p>

      <p>The most efficient strategy is one comprehensive bank with high-quality explanations \u2014 used thoroughly \u2014 supplemented by targeted reading of weak domains. Depth beats breadth for question banks.</p>

      <p><strong>Advice:</strong> Pick one primary question bank and exhaust it. Use other resources for notes and guidelines, not for questions.</p>

      <h2>3. \u201cI Wish I Had Done More Timed Mocks\u201d</h2>

      <p>This is the most frequently reported regret. Trainees who studied content for weeks without simulating exam conditions were surprised by the time pressure. Not because they ran out of time broadly \u2014 but because they spent too long on early questions and had to rush the final 30.</p>

      <p>Paper A has 150 questions in 180 minutes. That is 72 seconds per question. If you spend 2 minutes on a difficult neuroscience question, you have lost that time from the easier questions ahead.</p>

      <p><strong>Advice:</strong> From week 4 of your revision, do at least one timed 50-question block per week. From week 8, do full 150-question mocks. Condition yourself to the rhythm of the exam.</p>

      <h2>4. \u201cI Wish I Hadn\u2019t Ignored Classification\u201d</h2>

      <p>Classification (17% of marks) sounds like the easy section. Trainees assume they know ICD-11 criteria from clinical work. But exam classification questions test boundaries: what distinguishes moderate from severe depression? When does generalised anxiety disorder become panic disorder? What is the exact duration criterion for schizophrenia?</p>

      <p>Trainees who did not deliberately memorise classification criteria lost 5\u201310 marks in this section to \u201cclose but not precise\u201d answers.</p>

      <p><strong>Advice:</strong> Spend one full day memorising the diagnostic criteria for the 10\u201312 most commonly tested conditions. Write them out from memory. Check your accuracy. Repeat.</p>

      <h2>5. \u201cI Wish I Had Known About the Pharmacology Receptor Profiles\u201d</h2>

      <p>Pharmacology questions in Paper A are not asking \u201cwhich drug is best for depression\u201d (that\u2019s Paper B territory). They are asking: \u201cWhich receptor does drug X block?\u201d \u201cWhich drug causes QT prolongation?\u201d \u201cWhat is the mechanism of action of mirtazapine?\u201d</p>

      <p>Trainees who studied pharmacology by indication (what it is used for) rather than by mechanism (how it works) found the questions unrecognisable. They knew the drug but could not answer the question.</p>

      <p><strong>Advice:</strong> Organise pharmacology by mechanism. For each drug class, learn: receptor targets \u2192 downstream effects \u2192 therapeutic effects \u2192 side effects. This makes the side effects predictable rather than memorisable.</p>

      <h2>6. \u201cI Wish I Had Stopped Cramming Two Weeks Earlier\u201d</h2>

      <p>Burnout is real. Trainees who studied intensively up to the night before the exam reported that their memory was worse on exam day, not better. They were exhausted, anxious, and making careless errors.</p>

      <p>The brain consolidates memories during sleep. The final week should be about consolidation and confidence, not new content. If you do not know it by the final week, you are unlikely to learn it well enough to recall under exam pressure.</p>

      <p><strong>Advice:</strong> Taper your study in the final 10 days. No new content after day T-7. Light review only in the final 3 days. Sleep, hydration, and activity are more valuable than one more hour of cramming.</p>

      <h2>7. \u201cI Wish I Had Used an Adaptive Question Bank\u201d</h2>

      <p>This is a relatively new insight because adaptive banks for MRCPsych are a recent development. Trainees who used fixed question banks reported a common phenomenon: they were good at answering questions from the domains they studied most, and poor at everything else. But they did not know that until they sat the exam.</p>

      <p>An adaptive platform reveals your blind spots early, so you can address them while there is still time. It also prevents you from over-studying domains you are already strong in. The efficiency gain is not marginal \u2014 it is structural.</p>

      <p><strong>Advice:</strong> If you can access an adaptive MRCPsych platform, use it from the beginning, not just in the final weeks. The data it collects on your performance becomes more valuable the longer you use it.</p>

      <h2>8. \u201cI Wish I Had Believed I Could Pass First Time\u201d</h2>

      <p>This is the most emotional piece of feedback. Many trainees approach Paper A with the mindset that it is normal to fail first time. They tell themselves: \u201cMost people need two attempts anyway.\u201d This becomes a self-fulfilling prophecy.</p>

      <p>First-attempt pass rates for Paper A are 65\u201375% \u2014 the majority pass. The difference between those who pass and those who fail is not IQ. It is preparation structure. Candidates who use a systematic, adaptive approach with regular simulated testing pass at significantly higher rates than those who study by reading and hoping.</p>

      <p><strong>Advice:</strong> Approach Paper A as a pass-first attempt, not a reconnaissance mission. Structure your preparation, test yourself early and often, and trust the process.</p>

      <h2>Final Thought</h2>

      <p>Every trainee who passed Paper A will tell you: the exam is hard, but it is fair. It tests what the curriculum says it tests. The candidates who pass are not the ones who know everything \u2014 they are the ones who know their weaknesses and addressed them.</p>

      <p>PsychStar\u2019s adaptive engine is designed to identify and close those gaps. You can try it for free at <a href="/try">psychstar.io/try</a> and see your own blind-spot map form in real time.</p>
    `
  },
  {
    slug: 'how-to-prepare-for-mrcpsych-casc',
    title: 'How to Prepare for MRCPsych CASC: A Structured Approach',
    metaTitle: 'MRCPsych CASC Preparation Guide | Stations, Marking & Strategy',
    metaDescription: 'Practical guide to passing MRCPsych CASC. Station types, marking criteria, common pitfalls, and a 12-week preparation plan from an NHS consultant.',
    date: '2026-06-12',
    readTime: '14 min read',
    category: 'CASC',
    tags: ['CASC', 'MRCPsych', 'clinical exam', 'stations', 'communication skills'],
    featured: false,
    content: `
      <p>The Clinical Assessment of Skills and Competencies (CASC) is the final hurdle in the MRCPsych examination. Unlike Paper A and Paper B, which test knowledge and reasoning, CASC tests whether you can perform as a psychiatrist in real clinical scenarios. It is an OSCE-style examination with 16 stations, each lasting 10 minutes.</p>

      <p>CASC has the lowest pass rate of the three components. First-attempt pass rates are approximately 60\u201365%, and many candidates who passed Papers A and B on their first attempt find themselves retaking CASC. The reason is simple: CASC tests skills that cannot be learned from a question bank. They must be practised.</p>

      <h2>CASC Station Types</h2>

      <p>The 16 stations fall into four categories:</p>

      <ul>
        <li><strong>History taking (4\u20135 stations):</strong> Psychiatric history, risk assessment, collateral history, developmental history, mental state examination. The examiner is looking for structure, rapport, and elicitation of key clinical features.</li>
        <li><strong>Management (4\u20135 stations):</strong> Acute management (agitation, overdose, catatonia), medication initiation/monitoring, electroconvulsive therapy (ECT) consent, capacity assessment. These require you to think on your feet and demonstrate clinical reasoning aloud.</li>
        <li><strong>Communication (4\u20135 stations):</strong> Breaking bad news, dealing with relatives, explaining a diagnosis, negotiating treatment with a reluctant patient, handling a complaint. These are the stations that separate passing from distinction.</li>
        <li><strong>Consultation (2\u20133 stations):</strong> Liaison psychiatry referrals, GP referrals, multidisciplinary team consultations. These test your ability to formulate and communicate a management plan concisely.</li>
      </ul>

      <h2>Marking Criteria</h2>

      <p>Each station is marked by a single examiner using a global rating scale. The domains assessed are:</p>

      <ul>
        <li><strong>Interpersonal skills (30%):</strong> Rapport, empathy, listening, non-verbal communication. The examiner assesses whether the patient (actor) would trust you.</li>
        <li><strong>Information gathering (25%):</strong> Structure, coverage of relevant domains, appropriate use of open and closed questions. Failure to ask about suicide risk is an automatic fail in any history station.</li>
        <li><strong>Information giving (25%):</strong> Clarity, appropriate language level, checking understanding. You must avoid jargon unless you explain it.</li>
        <li><strong>Management (20%):</strong> Appropriate plan, safety netting, justification of decisions. The plan must be specific, not generic.</li>
      </ul>

      <p>Candidates must pass a minimum number of stations (typically 10\u201312 out of 16) and cannot fail both communication stations. A single catastrophic failure (e.g., missing suicide risk, being rude to a patient) can result in an overall fail regardless of other station scores.</p>

      <h2>12-Week CASC Preparation Plan</h2>

      <h3>Weeks 1\u20134: Concept Familiarisation</h3>
      <ul>
        <li>Learn the station format and marking criteria thoroughly. Knowing what the examiner wants is half the preparation.</li>
        <li>For each station type, write a structured template. For history stations: introduction \u2192 open question \u2192 history of presenting complaint \u2192 past psychiatric history \u2192 medication \u2192 social \u2192 forensic \u2192 risk \u2192 ICE (ideas, concerns, expectations) \u2192 summary \u2192 plan.</li>
        <li>Watch example CASC performances (available from the Royal College website and training schemes). Identify what the passing candidates do differently from the failing ones.</li>
      </ul>

      <h3>Weeks 5\u20138: Paired Practice</h3>
      <ul>
        <li>Find a CASC partner. This is essential. You cannot prepare for CASC alone because the interactive element is the core skill being tested.</li>
        <li>Practise 2\u20133 stations per session, 3 sessions per week. One partner plays the patient, the other the candidate. The third person (if available) times and observes.</li>
        <li>Record your sessions on your phone. Watch them back. You will notice things you miss in the moment \u2014 rushing, interrupting, using jargon, poor eye contact.</li>
      </ul>

      <h3>Weeks 9\u201312: High-Fidelity Simulation</h3>
      <ul>
        <li>Full mock CASC circuits (8\u201316 stations in one sitting). Your local training scheme usually runs these. Attend every one available.</li>
        <li>Focus on your weak station types. Most candidates struggle with communication stations because they prepare for clinical knowledge stations only.</li>
        <li>Practise the first 30 seconds of every station type. The first impression often determines the overall score. A confident, structured opening sets the tone.</li>
      </ul>

      <h2>Common Pitfalls</h2>

      <ul>
        <li><strong>Talking at the patient rather than with them.</strong> CASC is not a viva. You must demonstrate two-way communication. Pause, listen, respond.</li>
        <li><strong>Information dumps.</strong> When asked for a management plan, candidates often list every option they can think of. A focused, justified plan is better than a comprehensive but unfocused one.</li>
        <li><strong>Ignoring the actor\u2019s cues.</strong> The patient actor is trained to give specific cues. If they say \u201cI\u2019m worried about the side effects,\u201d address that concern directly. Candidates who ignore cues and continue with their pre-planned script score poorly.</li>
        <li><strong>Running out of time.</strong> Ten minutes passes quickly. Practise with a timer. If you spend 4 minutes on history, you have 6 minutes for the rest. Allocate your time consciously.</li>
      </ul>

      <h2>CASC for Text-Based Practice</h2>

      <p>PsychStar is developing a CASC preparation module with text-based simulated patient interactions. Each scenario presents a clinical situation, you choose your response, and the platform shows the consequences of your choice with examiner-style feedback. This allows you to practise clinical reasoning and communication strategy outside of paired role-play sessions. Try 5 free questions at <a href=\"/try\">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'critical-review-mrcpsych-paper-b',
    title: 'Critical Review for MRCPsych Paper B: Statistics, Study Design, and Appraisal',
    metaTitle: 'Critical Review for MRCPsych Paper B | Statistics Guide',
    metaDescription: 'Complete guide to critical review for MRCPsych Paper B. Statistical tests, study designs, bias, critical appraisal frameworks, and worked examples.',
    date: '2026-06-12',
    readTime: '15 min read',
    category: 'Paper B',
    tags: ['critical review', 'statistics', 'study design', 'Paper B', 'critical appraisal'],
    featured: false,
    content: `
      <p>Critical review accounts for 50 of the 150 marks in Paper B. It is the single largest section in the paper, yet it is the one candidates are least prepared for. Unlike clinical psychiatry, which you practise daily, critical appraisal is a discrete skill set that requires deliberate study.</p>

      <p>This guide covers the statistical knowledge, study design concepts, and appraisal frameworks you need, structured by how frequently each topic appears in the examination.</p>

      <h2>Statistical Tests: When to Use Which</h2>

      <p>The exam expects you to know which statistical test is appropriate for a given study design and data type. You are not expected to perform calculations (except for sensitivity, specificity, NNT) but you must interpret the output.</p>

      <table>
        <tr><th>Data type</th><th>Two groups (unpaired)</th><th>Two groups (paired)</th><th>Three+ groups</th><th>Association between variables</th></tr>
        <tr><td>Continuous (normally distributed)</td><td>Independent t-test</td><td>Paired t-test</td><td>ANOVA</td><td>Pearson correlation</td></tr>
        <tr><td>Continuous (skewed)</td><td>Mann-Whitney U</td><td>Wilcoxon signed-rank</td><td>Kruskal-Wallis</td><td>Spearman correlation</td></tr>
        <tr><td>Categorical</td><td>Chi-square</td><td>McNemar</td><td>Chi-square</td><td>Chi-square / Fisher exact</td></tr>
        <tr><td>Survival data</td><td colspan="4" style="text-align:center">Kaplan-Meier curves + log-rank test</td></tr>
      </table>

      <p>The most commonly examined distinction is between parametric tests (t-test, ANOVA, Pearson) and non-parametric tests (Mann-Whitney, Kruskal-Wallis, Spearman). The key question is: is the data normally distributed? If yes, use parametric. If no, use non-parametric.</p>

      <h2>Measures of Effect</h2>

      <p>These are the calculations most likely to appear. Practise them until they become automatic.</p>

      <h3>Number Needed to Treat (NNT)</h3>
      <p>NNT = 1 / Absolute Risk Reduction (ARR). ARR = Control Event Rate (CER) \u2013 Experimental Event Rate (EER).</p>
      <p><strong>Example:</strong> In a trial, 25% of patients on placebo relapsed vs 10% on the drug. CER = 0.25, EER = 0.10. ARR = 0.15. NNT = 1 / 0.15 = 6.7. Round up to 7. You need to treat 7 patients to prevent one relapse.</p>

      <h3>Number Needed to Harm (NNH)</h3>
      <p>NNH = 1 / Attributable Risk (AR). AR = EER (adverse) \u2013 CER (adverse).</p>
      <p><strong>Example:</strong> 5% on placebo had sedation vs 20% on the drug. AR = 0.15. NNH = 6.7. For every 7 patients treated, 1 will experience sedation.</p>

      <h3>Risk Ratio (Relative Risk)</h3>
      <p>RR = EER / CER. RR of 1 means no effect. RR < 1 means the treatment reduces risk. RR > 1 means the treatment increases risk. The exam often asks you to interpret whether the 95% confidence interval crosses 1 (not statistically significant).</p>

      <h3>Odds Ratio (OR)</h3>
      <p>Used in case-control studies. OR = (odds of exposure in cases) / (odds of exposure in controls). OR approximates RR when the outcome is rare (<10%). When the outcome is common, OR overestimates RR.</p>

      <h3>Sensitivity and Specificity</h3>
      <ul>
        <li><strong>Sensitivity:</strong> True positives / (True positives + False negatives). A sensitive test rules disease out (SnOUT). High sensitivity = few false negatives.</li>
        <li><strong>Specificity:</strong> True negatives / (True negatives + False positives). A specific test rules disease in (SpIN). High specificity = few false positives.</li>
        <li><strong>Positive Predictive Value (PPV):</strong> True positives / (True positives + False positives). Depends on prevalence.</li>
        <li><strong>Negative Predictive Value (NPV):</strong> True negatives / (True negatives + False negatives). Depends on prevalence.</li>
      </ul>

      <h2>Study Designs Ranked by Evidence Quality</h2>

      <table>
        <tr><th>Level</th><th>Design</th><th>Key features</th></tr>
        <tr><td>1a</td><td>Systematic review / Meta-analysis of RCTs</td><td>Pooled data, forest plot, heterogeneity (I\u00b2)</td></tr>
        <tr><td>1b</td><td>Individual RCT</td><td>Randomisation, blinding, intention-to-treat analysis</td></tr>
        <tr><td>2a</td><td>Cohort study</td><td>Exposed vs non-exposed, followed forward. Can calculate RR. Prone to confounding and attrition bias.</td></tr>
        <tr><td>2b</td><td>Case-control study</td><td>Cases vs controls, looks backward. Can calculate OR. Prone to recall and selection bias.</td></tr>
        <tr><td>3</td><td>Cross-sectional study</td><td>Single time point. Can measure prevalence but not incidence. Cannot establish causation.</td></tr>
        <tr><td>4</td><td>Case series / Case report</td><td>Descriptive only. No comparison group. Hypothesis-generating only.</td></tr>
      </table>

      <h2>Bias Types You Must Know</h2>

      <ul>
        <li><strong>Selection bias:</strong> Systematic differences between groups being compared. Example: healthier volunteers enrol in the treatment arm.</li>
        <li><strong>Information bias (misclassification):</strong> Errors in measuring exposure or outcome. Example: recall bias in case-control studies where cases remember exposures differently.</li>
        <li><strong>Publication bias:</strong> Studies with positive results are more likely to be published. Detected by funnel plot asymmetry.</li>
        <li><strong>Attrition bias:</strong> Differential dropout between groups. Intention-to-treat analysis mitigates this.</li>
        <li><strong>Detection bias:</strong> Systematic differences in how outcomes are assessed. Blinding prevents this.</li>
        <li><strong>Performance bias:</strong> Systematic differences in care provided apart from the intervention. Blinding prevents this.</li>
        <li><strong>Confounding:</strong> A third variable associated with both exposure and outcome. Example: age confounds the relationship between alcohol and dementia.</li>
      </ul>

      <h2>Critical Appraisal Frameworks</h2>

      <p>The exam may ask you to appraise a study using a structured framework. The most common are:</p>

      <ul>
        <li><strong>CASP (Critical Appraisal Skills Programme):</strong> Three broad questions: (1) Are the results valid? (2) What are the results? (3) Will they help locally? Each has 3\u20134 sub-questions specific to the study type.</li>
        <li><strong>SIGN (Scottish Intercollegiate Guidelines Network):</strong> Uses checklists with well-covered/adequately-addressed/poorly-reported/not-applicable ratings. Yields a study quality rating (++, +, or 0).</li>
        <li><strong>GRADE (Grading of Recommendations Assessment, Development and Evaluation):</strong> Rates the quality of evidence across studies for a given outcome. Starts high for RCTs, low for observational studies, then adjusts up or down based on specific criteria.</li>
      </ul>

      <h2>Worked Example: Forest Plot Interpretation</h2>

      <p>A forest plot from a meta-analysis shows individual study results as squares (point estimate) with horizontal lines (95% CI). The diamond at the bottom shows the pooled estimate. Key things to check:</p>
      <ul>
        <li>Does the diamond cross the line of no effect (1.0 for RR/OR, 0 for mean difference)? If yes, the overall result is not significant.</li>
        <li>What is the I\u00b2 statistic? <25% = low heterogeneity, 25\u201350% = moderate, 50\u201375% = substantial, >75% = considerable. High I\u00b2 means the studies may be too different to pool meaningfully.</li>
        <li>Is the funnel plot symmetrical? Asymmetry suggests publication bias or small-study effects.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank includes dedicated critical review questions with full teaching cascades covering statistics, study design, and bias identification. Start with 5 free questions at <a href=\"/try\">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'psychotherapy-for-mrcpsych',
    title: 'Psychotherapy for MRCPsych Paper B: Modalities, Evidence, and Exam Strategy',
    metaTitle: 'Psychotherapy for MRCPsych Paper B | Modalities & Evidence',
    metaDescription: 'Guide to psychotherapy for MRCPsych Paper B. CBT, psychodynamic therapy, DBT, CAT, family therapy. Indications, evidence base, and exam question patterns.',
    date: '2026-06-12',
    readTime: '12 min read',
    category: 'Paper B',
    tags: ['psychotherapy', 'CBT', 'psychodynamic', 'DBT', 'Paper B', 'MRCPsych'],
    featured: false,
    content: `
      <p>Psychotherapy accounts for approximately 5% of Paper B marks \u2014 roughly 7\u20138 questions. This is a small proportion, but the questions are predictable and high-yield. Most candidates lose marks here not because psychotherapy is difficult, but because they do not study it systematically.</p>

      <p>The MRCPsych curriculum requires knowledge of the major psychotherapeutic modalities, their theoretical underpinnings, the evidence base for each, and the indications for referral. This guide covers each modality in the depth required for Paper B.</p>

      <h2>Cognitive Behavioural Therapy (CBT)</h2>

      <p>CBT is the most examined modality in Paper B. It has the strongest evidence base and the widest range of indications.</p>

      <p><strong>Theoretical basis:</strong> The cognitive model proposes that emotional distress is maintained by dysfunctional patterns of thinking (automatic thoughts, intermediate beliefs, core beliefs) and behaviour (safety behaviours, avoidance). The goal of CBT is to identify, challenge, and modify these patterns.</p>

      <p><strong>Key figures:</strong> Aaron Beck (cognitive triad: negative view of self, world, and future). Albert Ellis (Rational Emotive Behaviour Therapy, ABC model: Activating event \u2192 Belief \u2192 Consequence).</p>

      <p><strong>Indications (NICE-recommended):</strong>
      <ul>
        <li>Depression (mild to moderate: low-intensity CBT; moderate to severe: high-intensity CBT combined with medication)</li>
        <li>Generalised anxiety disorder</li>
        <li>Panic disorder</li>
        <li>Social anxiety disorder</li>
        <li>OCD (CBT including Exposure and Response Prevention)</li>
        <li>PTSD (trauma-focused CBT)</li>
        <li>Bulimia nervosa (CBT-ED, specifically adapted for eating disorders)</li>
        <li>Health anxiety</li>
        <li>Psychosis (CBTp \u2014 CBT for psychosis, recommended for all patients with schizophrenia, though access is limited)</li>
      </ul>
      </p>

      <p><strong>Structure:</strong> Typically 12\u201320 sessions. Each session follows a structure: agenda setting \u2192 review of homework \u2192 session content \u2192 practise new skill \u2192 set homework \u2192 session summary and feedback. The collaborative empiricism between therapist and patient is a defining feature.</p>

      <p><strong>Third wave CBT:</strong> Includes Mindfulness-Based Cognitive Therapy (MBCT \u2014 for relapse prevention in recurrent depression), Acceptance and Commitment Therapy (ACT), and Dialectical Behaviour Therapy (DBT). The exam sometimes asks how third wave approaches differ from traditional CBT: greater emphasis on the relationship with thoughts (rather than changing content), and acceptance rather than control.</p>

      <h2>Psychodynamic Psychotherapy</h2>

      <p><strong>Theoretical basis:</strong> Unconscious mental processes influence conscious thoughts, feelings, and behaviour. Early attachment patterns shape relational templates that repeat in adult life (transference). Defence mechanisms protect the ego from anxiety.</p>

      <p><strong>Key figures:</strong> Freud (structural model: id, ego, superego; developmental stages; defence mechanisms). Klein (paranoid-schizoid and depressive positions, object relations). Winnicott (transitional objects, good-enough mothering). Bowlby (attachment theory).</p>

      <p><strong>Common defence mechanisms (exam favourites):</strong>
      <ul>
        <li><strong>Splitting:</strong> Dividing people into all-good or all-bad. Common in borderline personality disorder.</li>
        <li><strong>Projection:</strong> Attributing unacceptable feelings to others.</li>
        <li><strong>Projective identification:</strong> Projecting a feeling and then unconsciously inducing that feeling in the other person.</li>
        <li><strong>Denial:</strong> Refusing to acknowledge reality.</li>
        <li><strong>Displacement:</strong> Redirecting an impulse to a safer target.</li>
        <li><strong>Sublimation:</strong> Channeling unacceptable impulses into socially acceptable activities.</li>
        <li><strong>Intellectualisation:</strong> Using logic and reasoning to avoid emotional distress.</li>
      </ul>
      </p>

      <p><strong>Indications:</strong> The evidence base is strongest for borderline personality disorder (mentalisation-based therapy, transference-focused psychotherapy), depression (particularly where relational difficulties are central), and medically unexplained symptoms. Long-term psychodynamic psychotherapy (over 12 months) has evidence for complex or chronic conditions.</p>

      <h2>Dialectical Behaviour Therapy (DBT)</h2>

      <p>DBT was developed by Marsha Linehan specifically for borderline personality disorder. It combines CBT with acceptance-based strategies (from Zen) and dialectical philosophy (synthesis of opposites).</p>

      <p><strong>Core dialectic:</strong> Acceptance (validating the patient\u2019s experience) and change (helping the patient develop new skills). The therapist holds both simultaneously: \u201cYou are doing the best you can, and you need to try harder.\u201d</p>

      <p><strong>Four modules of skills training:</strong>
      <ul>
        <li>Mindfulness (observing, describing, participating, non-judgementally, one-mindfully, effectively)</li>
        <li>Distress tolerance (crisis survival strategies: TIPP, STOP, ACCEPTS, IMPROVE)</li>
        <li>Interpersonal effectiveness (DEAR MAN, GIVE, FAST)</li>
        <li>Emotion regulation (identifying emotions, reducing vulnerability, opposite action)</li>
      </ul>
      </p>

      <p><strong>DBT structure:</strong> Weekly individual therapy (1 hour), weekly group skills training (2 hours), telephone coaching (between sessions for crisis management), and therapist consultation team (weekly). This multimodal structure is a defining feature and often examined.</p>

      <h2>Cognitive Analytic Therapy (CAT)</h2>

      <p>Developed by Anthony Ryle. Integrates cognitive and psychodynamic approaches. Time-limited (usually 16\u201324 sessions).</p>

      <p><strong>Key concepts:</strong>
      <ul>
        <li><strong>Reciprocal roles:</strong> Patterns of relating learned in childhood that are replayed in adult relationships. For example, a patient who was criticised as a child may alternate between being critical of themselves and feeling criticised by others.</li>
        <li><strong>Target Problem Procedure (TPP):</strong> A written reformulation that maps the patient\u2019s unhelpful patterns and their origins. The patient and therapist agree on the TPP and work to recognise and revise these patterns.</li>
      </ul>
      </p>

      <p><strong>Indications:</strong> Depression, anxiety, eating disorders, personality disorders, and interpersonal difficulties. CAT is particularly useful where brief intervention is needed and the patient has a history of relational difficulties.</p>

      <h2>Family Therapy and Systemic Practice</h2>

      <p><strong>Theoretical basis:</strong> Problems are understood in the context of relationships and systems, not as individual pathology. Change in one part of the system affects the whole.</p>

      <p><strong>Key figures:</strong> Minuchin (structural family therapy, boundaries, enmeshment, disengagement). Haley (strategic family therapy, paradoxical interventions). Milan group (circular questioning, positive connotation).</p>

      <p><strong>Indications:</strong> Child and adolescent mental health, eating disorders (Maudsley model for anorexia), psychosis (family interventions reduce relapse rates), relationship difficulties, and where a systemic factor maintains the problem.</p>

      <h2>How the Exam Tests Psychotherapy</h2>

      <p>Paper B questions on psychotherapy follow predictable patterns:</p>

      <ul>
        <li><strong>Which therapy for this condition?</strong> For mild depression: CBT. For bulimia: CBT-ED. For BPD with self-harm: DBT. For childhood trauma: trauma-focused CBT or psychodynamic therapy depending on presentation.</li>
        <li><strong>Who developed this therapy?</strong> Beck = CBT, Linehan = DBT, Ryle = CAT, Freud/Klein = psychodynamic, Minuchin = structural family therapy.</li>
        <li><strong>Key theoretical concept:</strong> Be able to define and give an example of: transference, countertransference, defence mechanisms, the cognitive triad, reciprocal roles, the dialectic in DBT.</li>
        <li><strong>Evidence question:</strong> Which therapy has the strongest evidence for X? Typically CBT for most conditions, DBT for BPD, family therapy for first-episode psychosis.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank includes dedicated psychotherapy questions that test both factual knowledge and clinical application. Start with 5 free questions at <a href=\"/try\">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'mrcpsych-exam-day-guide',
    title: 'MRCPsych Exam Day: What to Expect and How to Prepare',
    metaTitle: 'MRCPsych Exam Day Guide | Logistics, Timing & Tips',
    metaDescription: 'Practical guide for MRCPsych exam day. What to bring, timing, anxiety management, pre-exam routine, and strategies for staying focused during the 3-hour paper.',
    date: '2026-06-12',
    readTime: '8 min read',
    category: 'Exam Strategy',
    tags: ['exam day', 'logistics', 'anxiety management', 'MRCPsych', 'exam preparation'],
    featured: false,
    content: `
      <p>You have done the preparation. You have answered thousands of questions, learned the receptor profiles, memorised the ICD-11 criteria, and practised critical appraisal calculations. The final variable is the day itself. How you manage the 24 hours before and during the exam directly affects your performance.</p>

      <p>This guide covers the practical logistics, medical considerations, and psychological strategies for MRCPsych exam day.</p>

      <h2>Before the Exam: The Week Preceding</h2>

      <h3>Day -7 to -4: Taper</h3>
      <p>Reduce your study volume by 50% each day. No new content. Focus on high-yield review: classification criteria, receptor profiles, critical appraisal formulas, and MHA sections. These are the domains where recall is most important and most vulnerable to anxiety.</p>

      <h3>Day -3 to -1: Consolidation Only</h3>
      <p>Maximum 2\u20133 hours of light review per day. Write out the key formulas from memory. Practise one or two NNT calculations. Read through MHA section summaries. Do not attempt any more difficult questions or new topics.</p>

      <p>Sleep is the most important preparation in this phase. Aim for 8 hours per night. If you cannot sleep, lie in a dark room with your eyes closed. Rest is not wasted time.</p>

      <h3>Day -1: Logistics Check</h3>
      <ul>
        <li>Confirm the exam venue and travel time. If you have not been there before, do a practice journey.</li>
        <li>Prepare your bag: photo ID (passport or driving licence), your exam confirmation email (printed or on your phone), water bottle (clear, no label), snacks (nuts, banana, chocolate \u2014 something that provides sustained energy), paracetamol (for headache), tissues.</li>
        <li>Check what is not allowed: mobile phone (must be switched off and stored), smart watch, notes, bags larger than a small rucksack, food that rustles loudly.</li>
        <li>Set two alarms. Tell someone to call you if they receive a concerned text.</li>
        <li>Eat a normal evening meal. Avoid alcohol. Avoid caffeine after 4pm if you are sensitive to it.</li>
      </ul>

      <h2>Exam Morning</h2>

      <h3>Wake-up (3 hours before the exam)</h3>
      <p>Wake up early enough to allow a calm, unrushed morning. Eat a protein-based breakfast (eggs, yoghurt, porridge). Avoid high-sugar cereals that cause a blood glucose spike and subsequent crash during the exam.</p>

      <p>Coffee or tea: one cup is fine. More than one may increase anxiety. If you do not normally drink caffeine, do not start on exam day.</p>

      <h3>Travel (arrive 45\u201360 minutes early)</h3>
      <p>Traffic, train delays, and parking are outside your control. Build in a buffer. Arriving early gives you time to find the room, use the toilet, settle yourself, and mentally rehearse. Arriving late causes cortisol elevation that takes 30\u201340 minutes to normalise.</p>

      <h2>In the Exam Room</h2>

      <h3>First 5 Minutes</h3>
      <p>You will be seated at a computer terminal (the MRCPsych is now computer-based at Pearson VUE centres). The interface has been tested and is reliable. A tutorial screen explains the controls before the timer starts. Use this time to adjust your chair, screen brightness, and mouse position.</p>

      <p>Write your key formulas on the laminated whiteboard provided (or on paper if offered). This is a standard strategy used by high-performing candidates. Write down:</p>
      <ul>
        <li>NNT = 1 / ARR</li>
        <li>RR = EER / CER</li>
        <li>SnOUT, SpIN</li>
        <li>MHA section durations (S2 = 28 days, S3 = 6 months, S4 = 72 hours, S5(2) = 72 hours, S5(4) = 6 hours)</li>
      </ul>

      <h2>During the Exam</h2>

      <h3>Time Management</h3>
      <p>150 questions in 180 minutes = 1 minute 12 seconds per question. Use the three-pass strategy:</p>
      <ol>
        <li><strong>First pass (90 minutes):</strong> Answer questions you are confident about. Flag anything uncertain or that will take longer than 60 seconds. Do not get stuck.</li>
        <li><strong>Second pass (60 minutes):</strong> Return to flagged questions. Use elimination. If you can get down to 2 options, you have a 50% chance.</li>
        <li><strong>Third pass (30 minutes):</strong> Answer every remaining question. There is no negative marking. A blind guess has a 20% chance. An educated guess is higher.</li>
      </ol>

      <h3>Managing Difficult Questions</h3>
      <p>Every candidate encounters questions they do not know. The difference between passing and failing is how you respond. If you cannot answer after 60 seconds, guess, flag, move on. The worst outcome is spending 4 minutes on one question, running out of time for 3 easier ones.</p>

      <h3>Common Mistakes Under Time Pressure</h3>
      <ul>
        <li><strong>Reading too quickly:</strong> Misreading \u201cwhich is NOT a side effect\u201d as \u201cwhich is a side effect.\u201d The exam uses negatives deliberately. Slow down on the stem.</li>
        <li><strong>Changing answers:</strong> Unless you have a clear reason, your first answer is usually correct. Studies consistently show that changing answers without good reason reduces your score.</li>
        <li><strong>Rushing the final 10 questions:</strong> Fatigue is highest in the last 30 minutes. Take 3 deep breaths before starting the final block. Re-read the stems carefully.</li>
      </ul>

      <h2>Medical Considerations</h2>

      <ul>
        <li><strong>Hydration:</strong> Take small sips of water during the exam. Do not drink a large amount before starting \u2014 you cannot leave the room mid-paper.</li>
        <li><strong>Bladder:</strong> Use the toilet immediately before entering the exam room. The 3-hour paper does not have scheduled breaks.</li>
        <li><strong>Medication:</strong> If you take medication for anxiety, ADHD, or any other condition, take it as prescribed. Do not change your regimen on exam day.</li>
        <li><strong>Symptoms:</strong> If you develop a headache, blurred vision, or significant anxiety during the exam, close your eyes for 30 seconds, breathe slowly, and re-engage. If symptoms are severe, alert the invigilator.</li>
      </ul>

      <h2>After the Exam</h2>

      <p>Do not debrief immediately. Your post-exam recall is unreliable and discussing answers with colleagues only increases anxiety. The results are typically available within 4\u20136 weeks for Paper A and B, and 2\u20133 weeks for CASC.</p>

      <p>If you have another paper the following day, return to your preparation location, eat a proper meal, and review the high-yield topics for the next paper. Do not attempt to reconstruct the paper you just sat.</p>

      <p>PsychStar\u2019s exam simulation mode allows you to practise the three-pass time management strategy under realistic conditions. Try 5 free questions at <a href=\"/try\">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'child-and-adolescent-psychiatry-mrcpsych',
    title: 'Child and Adolescent Psychiatry for MRCPsych: Essential Knowledge for Paper B',
    metaTitle: 'Child and Adolescent Psychiatry for MRCPsych Paper B | Guide',
    metaDescription: 'Child and adolescent psychiatry for MRCPsych Paper B. Neurodevelopmental disorders, attachment, safeguarding, ADHD, autism, and the legal framework for young people.',
    date: '2026-06-12',
    readTime: '13 min read',
    category: 'Paper B',
    tags: ['child psychiatry', 'adolescent', 'ADHD', 'autism', 'attachment', 'Paper B'],
    featured: false,
    content: `
      <p>Child and adolescent psychiatry accounts for approximately 8% of Paper B marks \u2014 roughly 12 of 150 questions. The topics tested are distinct from adult psychiatry and cover neurodevelopmental disorders, attachment theory, safeguarding, and the legal framework for minors.</p>

      <p>Most candidates find child psychiatry questions challenging because they assume that knowledge from adult practice transfers directly. It does not. The presentations, assessment frameworks, and management strategies are fundamentally different.</p>

      <h2>Neurodevelopmental Disorders</h2>

      <h3>Attention Deficit Hyperactivity Disorder (ADHD)</h3>

      <p><strong>Core features (ICD-11):</strong> Persistent pattern (at least 6 months) of inattention, hyperactivity, and impulsivity that is developmentally inappropriate, present across multiple settings, and causes functional impairment. Onset before age 12. Three presentations: predominantly inattentive, predominantly hyperactive-impulsive, and combined.</p>

      <p><strong>Prevalence:</strong> Approximately 5% of children worldwide. Male:female ratio of 2:1 in childhood (narrowing in adulthood to 1:1). Comorbid with oppositional defiant disorder (ODD), conduct disorder, anxiety, depression, and autism spectrum disorder.</p>

      <p><strong>Management (NICE guidance):</strong>
      <ul>
        <li>Under 5 years: Parent training programmes as first-line. Medication is not recommended.</li>
        <li>School-aged children (5\u201318 years): Methylphenidate as first-line pharmacological intervention. If ineffective or not tolerated, switch to lisdexamfetamine or dexamfetamine. Guanfacine and atomoxetine are second-line options.</li>
        <li>Environmental modifications: Behavioural interventions in the classroom, structured routines, organisational support, and psychoeducation for parents and teachers.</li>
      </ul>
      </p>

      <p><strong>Key drug comparisons for the exam:</strong> Methylphenidate blocks dopamine and noradrenaline reuptake. Lisdexamfetamine increases dopamine and noradrenaline release. Both are Schedule 2 controlled drugs. Atomoxetine is a selective noradrenaline reuptake inhibitor, not a controlled drug, but takes 4\u20138 weeks to reach full effect. Guanfacine is an alpha-2 agonist, also not controlled.</p>

      <h3>Autism Spectrum Disorder (ASD)</h3>

      <p><strong>Core features (ICD-11):</strong> Persistent deficits in social communication and social interaction (across multiple contexts) AND restricted, repetitive patterns of behaviour, interests, or activities. Symptoms must be present in the developmental period (though may not fully manifest until social demands exceed capacity). ICD-11 removed the subcategories (Asperger syndrome, childhood autism) and replaced them with a single spectrum diagnosis.</p>

      <p><strong>Prevalence:</strong> Approximately 1\u20132% of children. Male:female ratio of 4:1 (though this may reflect underdiagnosis in females, who tend to present with less obvious restricted interests and better surface social skills).</p>

      <p><strong>Red flags in early development:</strong> Reduced joint attention (not pointing to share interest), delayed speech or unusual language development (echolalia, pronoun reversal), lack of pretend play, unusual sensory responses (hypersensitivity to sounds/textures/foods), rigid routines, and repetitive movements (hand flapping, rocking).</p>

      <p><strong>Management:</strong> There is no pharmacological treatment for the core symptoms. Management focuses on behavioural and educational interventions (Early Intensive Behavioural Intervention, TEACCH, social skills training, speech and language therapy, occupational therapy for sensory integration). Medication is used only for comorbid conditions (irritability, aggression, anxiety, ADHD symptoms) and should be prescribed cautiously as children with ASD are more sensitive to side effects.</p>

      <h3>Intellectual Disability (Learning Disability)</h3>

      <p><strong>Definition:</strong> Significant impairment of intellectual functioning (IQ below 70) AND significant impairment of adaptive functioning, with onset during the developmental period. Severity: mild (IQ 50\u201369), moderate (IQ 35\u201349), severe (IQ 20\u201334), profound (IQ below 20).</p>

      <p><strong>Common causes (exam-favourite):</strong> Down syndrome (trisomy 21), Fragile X syndrome (triplet repeat on X chromosome, most common inherited cause), Fetal alcohol spectrum disorder, Rett syndrome (MECP2 mutation, almost exclusively in females), Angelman syndrome (maternal 15q11 deletion \u2014 happy puppet, seizures, ataxia), Prader-Willi syndrome (paternal 15q11 deletion \u2014 hyperphagia, obesity, hypotonia).</p>

      <p><strong>Behavioural phenotypes:</strong> Down syndrome = friendly disposition, relative strength in social skills. Fragile X = social anxiety, gaze aversion, ADHD features. Prader-Willi = food-seeking, skin picking, temper outbursts. Angelman = frequent laughter, happy demeanour, hand-flapping.</p>

      <h2>Attachment Theory</h2>

      <p>Attachment theory appears consistently in child psychiatry questions. The key concepts are John Bowlby\u2019s attachment theory and Mary Ainsworth\u2019s Strange Situation Procedure.</p>

      <p><strong>Bowlby\u2019s key ideas:</strong> Attachment is an innate biological system that keeps the infant close to the caregiver for protection. The internal working model (mental representation of the self in relation to others) formed in infancy influences relationships throughout life.</p>

      <p><strong>Ainsworth\u2019s attachment styles (Strange Situation):</strong>
      <ul>
        <li><strong>Secure attachment:</strong> Distressed when caregiver leaves, easily soothed on return, uses caregiver as secure base for exploration. Approximately 60\u201365% of children in low-risk samples.</li>
        <li><strong>Insecure-avoidant attachment:</strong> Little distress when caregiver leaves, avoids or ignores caregiver on return. Caregiver is typically rejecting or unresponsive. Approximately 15\u201320%.</li>
        <li><strong>Insecure-ambivalent (resistant) attachment:</strong> Intense distress when caregiver leaves, difficult to soothe on return, both seeks and resists contact. Caregiver is inconsistent. Approximately 10\u201315%.</li>
        <li><strong>Disorganised attachment:</strong> Contradictory behaviours (freezing, stereotypies, approaching then turning away). Often associated with maltreatment or caregiver unresolved trauma. Approximately 5\u201310% in low-risk samples, higher in high-risk groups.</li>
      </ul>
      </p>

      <p><strong>Clinical relevance:</strong> Insecure attachment patterns are risk factors for later psychopathology. Disorganised attachment is most strongly associated with subsequent mental health problems and is considered the attachment pattern of maltreated children.</p>

      <h2>Safeguarding and Child Protection</h2>

      <p>Safeguarding questions are mandatory content in Paper B. The key legal and procedural knowledge:</p>

      <ul>
        <li><strong>Types of maltreatment:</strong> Physical abuse, emotional abuse, sexual abuse, neglect, fabricated or induced illness (previously called Munchausen syndrome by proxy). The highest mortality is associated with neglect.</li>
        <li><strong>Children Act 1989:</strong> The welfare of the child is paramount. Section 17 (duty to provide services to children in need), Section 47 (duty to investigate if significant harm is suspected). Emergency Protection Order (EPO) lasts 8 days with a possible extension of 7 days. Care order lasts until the child turns 18.</li>
        <li><strong>Gillick competence and Fraser guidelines:</strong> A child under 16 can consent to treatment if they have sufficient understanding and intelligence to comprehend what is proposed. Fraser guidelines specifically apply to contraceptive advice. In Scotland, age of legal capacity is 12.</li>
        <li><strong>Mental Capacity Act 2005 and children:</strong> MCA does not apply to under-16s. For 16-17 year olds, MCA applies but is modified by the Children Act. If a 16-17 year old lacks capacity, the decision is made by someone with parental responsibility or the court, applying the best interests standard.</li>
        <li><strong>When to refer:</strong> Any concern about significant harm must be referred to the local authority children\u2019s social care. You do not need parental consent to make a safeguarding referral. If a child discloses abuse, you should listen, record verbatim, do not promise secrecy, explain what you will do, and refer.</li>
      </ul>

      <h2>Common Exam Question Patterns</h2>

      <ul>
        <li><strong>Differential diagnosis of developmental regression:</strong> Regressive autism (regression in language and social skills around 18\u201324 months), Rett syndrome (regression around 6\u201318 months in females with hand-wringing), Landau-Kleffner syndrome (acquired epileptic aphasia), and neurodegenerative disorders (rare).</li>
        <li><strong>ADHD vs ASD overlap:</strong> Both present with inattention and social difficulties. Key distinction: ADHD inattention is modulated by interest (can focus on preferred activities), ASD social deficits are more pervasive and accompanied by restricted interests and sensory differences.</li>
        <li><strong>Tourette syndrome:</strong> Multiple motor tics and at least one vocal tic, present for more than 1 year, onset before age 18. Comorbid with ADHD and OCD in most cases.</li>
        <li><strong>School refusal vs truancy:</strong> School refusal is driven by anxiety (child remains at home with parental knowledge). Truancy involves concealment from parents and antisocial behaviour. Management differs: school refusal requires anxiety-focused intervention; truancy requires behavioural and social support.</li>
      </ul>

      <p>PsychStar\u2019s Paper B bank covers child and adolescent psychiatry with questions that reflect real exam difficulty and style. Start with 5 free questions at <a href=\"/try\">psychstar.io/try</a>.</p>
    `
  },
]
