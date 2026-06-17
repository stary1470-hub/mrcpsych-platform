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

      <p>PsychStar\u2019s Paper B bank covers child and adolescent psychiatry with questions that reflect real exam difficulty and style. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'depression-and-bipolar-mrcpsych-paper-b',
    title: 'Depression and Bipolar Disorder for MRCPsych Paper B: Clinical Presentations and Management',
    metaTitle: 'Depression and Bipolar for MRCPsych Paper B | NICE Guidelines & Management',
    metaDescription: 'Clinical guide to depression and bipolar disorder for MRCPsych Paper B. Classification, NICE treatment algorithms, STAR*D and BALANCE trial data, and exam question patterns.',
    date: '2026-06-12',
    readTime: '15 min read',
    category: 'Paper B',
    tags: ['depression', 'bipolar disorder', 'mood disorders', 'antidepressants', 'mood stabilisers', 'Paper B'],
    featured: false,
    content: `
      <p>Depression and bipolar disorder together account for the largest proportion of general adult psychiatry questions in Paper B. The two conditions are often examined together because the differential diagnosis between unipolar depression and bipolar depression is a recurring question pattern. This guide covers the classification, NICE-recommended management, key trial evidence, and the specific question formats used in the examination.</p>

      <h2>Depressive Disorders: ICD-11 Classification</h2>

      <p>ICD-11 divides depressive disorders into single episode depressive disorder and recurrent depressive disorder. Both are further classified by severity: mild, moderate, and severe with or without psychotic symptoms. The key distinction from ICD-10 is that the symptom list is simplified and the duration requirement remains at least 2 weeks.</p>

      <p><strong>Core symptoms (at least 2 required):</strong> Depressed mood, loss of interest or pleasure (anhedonia), reduced energy or fatigue.</p>

      <p><strong>Additional symptoms:</strong> Reduced concentration and attention, reduced self-esteem and self-confidence, ideas of guilt and unworthiness, bleak and pessimistic views of the future, ideas or acts of self-harm or suicide, disturbed sleep (any pattern), diminished appetite or overeating. Mild = 2 core + 2-3 additional. Moderate = 2 core + 4-5 additional with functional impairment. Severe = all 3 core + 5+ additional, marked functional impairment, with or without psychotic symptoms.</p>

      <p><strong>Exam pattern:</strong> Questions often give a vignette with specific symptom count and ask for the severity grade. The key is matching the number of symptoms to the severity category, not just clinical intuition.</p>

      <h2>NICE Depression Treatment Algorithm</h2>

      <p>NICE uses the stepped care model for depression (CG90, updated 2022). The examination tests your knowledge of which intervention at which severity level.</p>

      <p><strong>Step 1 (All severities):</strong> Assessment, psychoeducation, sleep hygiene, active monitoring. No active intervention required for subthreshold or mild symptoms that are not persisting.</p>

      <p><strong>Step 2 (Persistent subthreshold or mild depression):</strong> Low-intensity psychosocial interventions (guided self-help based on CBT principles, computerised CBT, structured group physical activity) OR medication if preferred. For mild depression, NICE recommends low-intensity CBT before medication. This is a frequently tested point: the exam expects you to offer low-intensity intervention first for mild depression, not an antidepressant.</p>

      <p><strong>Step 3 (Moderate to severe depression):</strong> High-intensity psychological intervention (CBT or IPT) combined with an antidepressant (SSRI first-line). The combination of medication and psychological therapy is superior to either alone for moderate-severe depression.</p>

      <p><strong>Step 4 (Treatment-resistant, life-threatening):</strong> Multi-disciplinary review, augmentation strategies, ECT if rapid response needed. ECT is indicated for severe depression with psychotic features or catatonia, or where a rapid response is required (high suicide risk, food/fluid refusal).</p>

      <h2>Antidepressant Selection</h2>

      <p><strong>First-line:</strong> An SSRI (sertraline is NICE first-choice due to favourable side-effect profile and safety in overdose). Fluoxetine has the longest half-life (4-6 days) and lowest discontinuation syndrome risk. Citalopram has the most drug interaction data but QTc prolongation at high doses restricts it.</p>

      <p><strong>Switching strategies:</strong> If no response after 3-4 weeks at therapeutic dose, optimise dose first. If no response after 6-8 weeks, switch to a different SSRI or an alternative class (SNRI, mirtazapine). There is no evidence from STAR*D that any switch strategy is superior. Evidence-based augmentation options: lithium augmentation (best evidence), aripiprazole augmentation (licensed in the USA for TRD), quetiapine augmentation, or combining mirtazapine with an SSRI/SNRI.</p>

      <h2>STAR*D Trial Data (Essential for the Exam)</h2>

      <p>The Sequenced Treatment Alternatives to Relieve Depression (STAR*D) trial is the most commonly referenced antidepressant trial in Paper B. Key findings you must know:</p>
      <ul>
        <li>Level 1 (citalopram): 36.8% remission (QIDS-SR16 less than or equal to 5)</li>
        <li>Cumulative remission after 4 steps: approximately 67%</li>
        <li>No significant difference between switching to another antidepressant and augmenting at any level</li>
        <li>No significant difference between switching within-class (another SSRI) and across-class (SNRI, bupropion)</li>
        <li>When patients who could not tolerate or did not respond to citalopram were switched to sertraline, bupropion, or venlafaxine, remission rates were similar (~17-21%)</li>
      </ul>

      <h2>Bipolar Disorder: ICD-11 Classification</h2>

      <p>Bipolar type I: At least one manic episode (most patients also have depressive episodes). Mania requires elevated mood OR irritability, plus increased activity or energy, lasting at least 1 week (or any duration if hospitalisation required). Additional symptoms: grandiosity, decreased need for sleep, pressured speech, flight of ideas, distractibility, increased goal-directed activity, excessive involvement in risky activities.</p>

      <p>Bipolar type II: At least one hypomanic episode and one depressive episode. Hypomania lasts at least 4 days, does NOT cause marked functional impairment, does NOT require hospitalisation, and has NO psychotic features. The distinction from mania is the functional impact threshold, not just the symptom count.</p>

      <p>Cyclothymic disorder: Chronic fluctuating mood disturbance with numerous hypomanic and depressive periods that do not meet full criteria for either, present for at least 2 years.</p>

      <p><strong>Exam pattern:</strong> A vignette describing elevated mood with increased energy and reduced sleep for 5 days with some functional impairment but no psychosis or hospitalisation. Answer: hypomania (not mania, not anxiety).</p>

      <h2>Bipolar Management: NICE Algorithm</h2>

      <p><strong>Acute mania:</strong> First-line: haloperidol, olanzapine, quetiapine, or risperidone. If inadequate response after 2 weeks, switch to an alternative first-line or add lithium. If still no response, add valproate (but not in women of childbearing potential). Avoid antidepressants in acute mania.</p>

      <p><strong>Bipolar depression:</strong> First-line: quetiapine (the only drug licensed for bipolar depression in the UK) or olanzapine plus fluoxetine (Symbyax in the USA). Fluoxetine alone is NOT recommended as the switch to mania risk is significant. Lithium and lamotrigine have evidence for bipolar depression prevention but are not first-line for acute treatment.</p>

      <p><strong>First trimester bipolar:</strong> A recall question: a woman in first trimester with mixed affective state. Olanzapine or quetiapine are safer than valproate or lithium. Valproate is absolutely contraindicated in pregnancy. Lithium carries Ebstein\u2019s anomaly risk in first trimester (but this is lower risk than valproate teratogenicity).</p>

      <p><strong>Maintenance:</strong> First-line: lithium (most evidence for preventing both manic and depressive relapse). Alternative: valproate (but not in women of childbearing potential), olanzapine, quetiapine. The BALANCE trial (2010) showed that lithium plus valproate was more effective than valproate alone, and lithium alone was comparable to combination therapy. This is an exam-favourite finding.</p>

      <h2>High-Yield Recall Patterns for Mood Disorders</h2>

      <ul>
        <li><strong>Olanzapine discontinued, relapses with depression:</strong> Do NOT restart olanzapine. Start lamotrigine (if mood stabiliser needed) or quetiapine (option depending on answer set). Fluoxetine alone is rarely correct in bipolar depression.</li>
        <li><strong>Mixed affective state + first trimester:</strong> Olanzapine or quetiapine. Valproate contraindicated.</li>
        <li><strong>Valproate + abdominal pain + vomiting + elevated amylase:</strong> Pancreatitis. Stop valproate.</li>
        <li><strong>Lithium + thirst + polyuria + fine tremor:</strong> Lithium-induced nephrogenic diabetes insipidus.</li>
        <li><strong>Lamotrigine + target lesions + blistering:</strong> Stevens-Johnson syndrome. Stop lamotrigine.</li>
        <li><strong>STAR*D meaning:</strong> No single strategy (switch vs augment) is superior. ~67% cumulative remission by step 4.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers depression and bipolar disorder with questions aligned to NICE guidelines and trial evidence. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'schizophrenia-and-psychosis-mrcpsych-paper-b',
    title: 'Schizophrenia and Psychosis for MRCPsych Paper B: Diagnosis, Treatment, and Trial Evidence',
    metaTitle: 'Schizophrenia and Psychosis for MRCPsych Paper B | NICE & CATIE/CUtLASS',
    metaDescription: 'Schizophrenia and psychosis for MRCPsych Paper B. ICD-11 diagnostic criteria, antipsychotic selection, CATIE/CUtLASS trial data, clozapine protocol, and exam question patterns.',
    date: '2026-06-12',
    readTime: '14 min read',
    category: 'Paper B',
    tags: ['schizophrenia', 'psychosis', 'antipsychotics', 'clozapine', 'CATIE', 'CUtLASS', 'Paper B'],
    featured: false,
    content: `
      <p>Schizophrenia and psychotic disorders are a core component of general adult psychiatry in Paper B. The questions range from diagnostic classification using ICD-11 to antipsychotic selection guided by trial evidence. Clozapine is disproportionately represented in recall questions, reflecting its clinical importance and the detailed monitoring protocols associated with its use.</p>

      <h2>ICD-11 Diagnostic Criteria for Schizophrenia</h2>

      <p>ICD-11 simplified the diagnosis of schizophrenia compared to ICD-10. The core requirement is at least 1 of the following symptoms present for most of the time over a period of at least 1 month:</p>
      <ul>
        <li>Persistent delusions</li>
        <li>Persistent hallucinations (auditory, visual, or other modalities)</li>
        <li>Disorganised thinking (formal thought disorder)</li>
        <li>Experiences of influence, passivity, or control (delusions of control)</li>
        <li>Negative symptoms (blunted affect, alogia, avolition, anhedonia, asociality)</li>
      </ul>

      <p>ICD-11 removed the subtypes (paranoid, hebephrenic, catatonic, undifferentiated, residual) that existed in ICD-10. The diagnosis now focuses on the symptom dimensions. This is a change that exam questions test: a candidate is asked which ICD-10 subtype is no longer recognised in ICD-11.</p>

      <p><strong>Schizophrenia vs autism spectrum:</strong> This is a recurring question. Features that favour schizophrenia over autism: near normal early development, mood-incongruent psychotic symptoms, later age of onset. Features that favour autism: impaired social communication from early childhood, restricted repetitive behaviours that precede psychotic symptoms.</p>

      <h2>Antipsychotic Management: First-Episode Psychosis</h2>

      <p>NICE guidance (CG178) recommends oral antipsychotic medication as first-line for first-episode psychosis. The choice should be made jointly with the patient, considering side-effect profile. First-line options include olanzapine, risperidone, aripiprazole, quetiapine, and amisulpride. Haloperidol is not recommended first-line due to higher EPS risk.</p>

      <p>Key principles for first-episode treatment: start at low dose, titrate slowly, continue for 1-2 years after first episode before considering withdrawal. Relapse risk within 1 year of stopping medication is approximately 75% compared to 25% in those who continue maintenance treatment.</p>

      <p><strong>First episode psychosis + cardiac problem:</strong> Aripiprazole (lowest QTc prolongation, least metabolic impact).</p>

      <h2>Trial Evidence: CATIE and CUtLASS</h2>

      <p>The two major trials comparing antipsychotics appear regularly in Paper B.</p>

      <p><strong>CATIE (2005):</strong> 1,493 patients with schizophrenia, randomised to olanzapine, risperidone, quetiapine, ziprasidone, or perphenazine. Olanzapine had the lowest discontinuation rate but the greatest weight gain and metabolic effects. Perphenazine was comparable to atypicals for efficacy. No significant difference in cognitive improvement between the drugs.</p>

      <p><strong>CUtLASS (2006):</strong> 227 patients with schizophrenia, randomised to FGAs (sulpiride, haloperidol, trifluoperazine) or SGAs. No significant advantage for SGAs over FGAs in quality of life, symptoms, or cost. First-generation antipsychotics are not inferior for efficacy.</p>

      <p><strong>Exam takeaway:</strong> Antipsychotic choice should be guided by individual patient factors and side-effect profiles, not by assuming atypical = more effective.</p>

      <h2>Clozapine: Detailed Knowledge Required</h2>

      <p>Clozapine is the most heavily tested single drug in Paper B. Indications: treatment-resistant schizophrenia (failure of at least 2 antipsychotics at adequate dose for 6-8 weeks, at least one atypical). Monitoring: FBC weekly for 18 weeks, fortnightly to 52 weeks, then monthly. WCC <3.0 or neutrophils <1.5 = stop immediately, daily FBC until recovery. Rechallenge not recommended after neutropenia.</p>

      <p><strong>Side effects tested in recalls:</strong></p>
      <ul>
        <li><strong>Myocarditis:</strong> First 2 months. Tachycardia, chest pain, fever, elevated troponin. Saddle-type ST elevations on ECG. Stop clozapine, cardiology review. Do NOT rechallenge.</li>
        <li><strong>Cardiomyopathy:</strong> Late complication (>6 months). Reduced ejection fraction on echocardiogram.</li>
        <li><strong>Constipation:</strong> Up to 60%. Can be fatal (bowel obstruction/perforation). Aggressive laxatives.</li>
        <li><strong>Sialorrhoea:</strong> Worse at night. Hyoscine or amitriptyline.</li>
        <li><strong>Tachycardia:</strong> 20-30 bpm above baseline. Beta-blocker after excluding myocarditis.</li>
        <li><strong>Seizures:</strong> Dose-dependent, risk rises above 600mg/day. Dose reduction or valproate augmentation.</li>
        <li><strong>Weight gain and metabolic syndrome:</strong> Most significant metabolic side-effect profile of any antipsychotic.</li>
      </ul>

      <p><strong>Clozapine + persistent symptoms at 3 months:</strong> Check compliance FIRST. Clozapine takes longer to reach full effect and non-adherence is common. If compliance confirmed and therapeutic levels achieved, augment with aripiprazole or amisulpride.</p>

      <p><strong>Clozapine + ECT:</strong> Clozapine lowers seizure threshold, which can be useful in TRS where ECT is being considered.</p>

      <h2>High-Yield Recall Patterns for Psychosis</h2>

      <ul>
        <li><strong>First-episode psychosis + cardiac problem:</strong> Aripiprazole</li>
        <li><strong>Clozapine + tachycardia + high troponin:</strong> Myocarditis. Stop clozapine.</li>
        <li><strong>Clozapine + persistent hallucinations at 3 months:</strong> Check compliance first.</li>
        <li><strong>Tardive dyskinesia on flupentixol depot for 20 years:</strong> Lower the depot dose first.</li>
        <li><strong>Which favours schizophrenia over autism:</strong> Near normal early development, mood-incongruent symptoms, catatonia.</li>
        <li><strong>Amisulpride low vs high dose:</strong> Below 400mg presynaptic (negative symptom benefit), above 400mg postsynaptic (antipsychotic effect).</li>
        <li><strong>CATIE key finding:</strong> Olanzapine lowest discontinuation, worst metabolic.</li>
        <li><strong>CUtLASS key finding:</strong> No superiority of atypicals over typicals for quality of life.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers schizophrenia and psychosis with questions calibrated to real exam style. Try 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'substance-misuse-mrcpsych-paper-b',
    title: 'Substance Misuse for MRCPsych Paper B: Alcohol, Opioids, and Illicit Drugs',
    metaTitle: 'Substance Misuse for MRCPsych Paper B | Alcohol, Opioids, Stimulants',
    metaDescription: 'Substance misuse for MRCPsych Paper B. Alcohol withdrawal management, opioid dependence treatment, cannabis and stimulant effects, and recall-confirmed exam question patterns.',
    date: '2026-06-12',
    readTime: '12 min read',
    category: 'Paper B',
    tags: ['substance misuse', 'alcohol', 'opioids', 'cannabis', 'ketamine', 'addiction', 'Paper B'],
    featured: false,
    content: `
      <p>Substance misuse accounts for approximately 8% of Paper B marks. The questions are highly predictable because the presentations, withdrawal syndromes, and management protocols are standardised across clinical practice. Recall documents confirm that the same patterns reappear across sittings: alcohol withdrawal management in liver failure, opioid overdose treatment, and distinguishing between substances based on their clinical presentation.</p>

      <h2>Alcohol</h2>

      <h3>Alcohol Withdrawal</h3>

      <p>Alcohol withdrawal typically begins 4-12 hours after the last drink. This is a specific figure that appears in recalls. Symptoms include tremor, sweating, anxiety, agitation, nausea, tachycardia, and hypertension. Without treatment, progression to alcohol withdrawal seizures (12-48 hours) and delirium tremens (48-96 hours). Delirium tremens: confusion, visual/tactile hallucinations, autonomic hyperactivity, 5-10% mortality if untreated.</p>

      <p><strong>Management of alcohol withdrawal:</strong> Reducing-dose benzodiazepine regimen. Chlordiazepoxide is the most commonly used. For acute liver failure: oxazepam (does not undergo hepatic oxidation — conjugated directly). A recall confirmed this: <em>\u201cAlcohol withdrawal, patient in acute liver failure \u2014 what to use?\u201d</em> Answer: oxazepam.</p>

      <p><strong>Thiamine:</strong> All patients with alcohol dependence should receive parenteral thiamine (Pabrinex) to prevent Wernicke\u2019s encephalopathy (confusion, ataxia, ophthalmoplegia with nystagmus as most common ocular sign). Korsakoff syndrome: anterograde amnesia and confabulation.</p>

      <p><strong>Alcohol + GABA-A/NMDA:</strong> Alcohol acts on BOTH GABA-A (agonist, enhanced inhibition) AND NMDA (antagonist, reduced excitation). Benzodiazepines affect GABA-A only. Ketamine affects NMDA only. Exam question: <em>\u201cWhich one acts on both GABA-A and NMDA?\u201d</em> Answer: alcohol.</p>

      <h3>Alcohol Dependence Treatment</h3>

      <p>Psychosocial interventions first-line. Pharmacological options: acamprosate (craving via glutamate modulation), naltrexone (opioid-mediated reward), disulfiram (aversive, second-line).</p>

      <h2>Opioids</h2>

      <p><strong>Opioid overdose:</strong> Pinpoint pupils, respiratory depression, reduced conscious level. Naloxone IM (short half-life of 20-60 minutes \u2014 monitor for re-emergence of overdose). Methadone overdose needs repeated naloxone or infusion due to its 24-36 hour half-life.</p>

      <p><strong>Opioid dependence:</strong> Methadone (full agonist, long half-life, once daily, supervised initially) or buprenorphine (partial agonist, lower overdose risk, ceiling effect).</p>

      <h2>Stimulants and Other Drugs</h2>

      <p><strong>Cocaine:</strong> Short-acting full agonist at dopamine/noradrenaline/serotonin transporters. Increased energy, euphoria, decreased sleep. Medical complications: MI, seizures, aortic dissection.</p>

      <p><strong>Cannabis:</strong> Laughing, giggling, relaxed, amotivational syndrome with chronic use. Synthetic cannabinoids (\u201cSpice\u201d) = full CB1 agonists (more potent, paranoia, hallucinations).</p>

      <p><strong>Ketamine:</strong> NMDA antagonist. Chronic use: ketamine cystitis (bladder atrophy, bleeding, renal failure).</p>

      <p><strong>Most likely to form physical dependence:</strong> Alprazolam (short half-life benzodiazepine produces severe withdrawal).</p>

      <h2>High-Yield Recall Patterns</h2>

      <ul>
        <li><strong>Alcohol withdrawal + acute liver failure:</strong> Oxazepam</li>
        <li><strong>Acts on both GABA-A and NMDA:</strong> Alcohol</li>
        <li><strong>Pinpoint pupils + respiratory depression:</strong> Opioid overdose = naloxone IM</li>
        <li><strong>Laughing, giggling, relaxed, usually smoked:</strong> Cannabis</li>
        <li><strong>Increased energy, decreased sleep, short-acting:</strong> Cocaine</li>
        <li><strong>Full agonist, paranoia, hallucinations:</strong> Synthetic cannabinoid</li>
        <li><strong>Chronic ketamine + bladder pain + haematuria:</strong> Ketamine cystitis</li>
        <li><strong>Jittery, overaroused newborn + maternal history:</strong> Opioid exposure</li>
        <li><strong>Most likely to form physical dependence:</strong> Alprazolam</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank includes dedicated substance misuse questions with recall-calibrated difficulty. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'human-development-mrcpsych-paper-a',
    title: 'Human Development for MRCPsych Paper A: Attachment, Piaget, Erikson, and Lifespan',
    metaTitle: 'Human Development for MRCPsych Paper A | Attachment, Piaget, Erikson',
    metaDescription: 'Human development for MRCPsych Paper A. Attachment theory (Bowlby, Ainsworth), cognitive development (Piaget), psychosocial stages (Erikson), and lifespan development for the exam.',
    date: '2026-06-12',
    readTime: '11 min read',
    category: 'Paper A',
    tags: ['human development', 'attachment theory', 'Piaget', 'Erikson', 'lifespan', 'Paper A'],
    featured: false,
    content: `
      <p>Human development accounts for approximately 10% of Paper A marks (roughly 15 of 150 questions). The content covers attachment theory, cognitive development, psychosocial development, moral development, and developmental psychopathology. Questions often present a clinical vignette and ask which developmental concept best explains the presentation.</p>

      <h2>Attachment Theory</h2>

      <p>Bowlby proposed that attachment is an innate biological system keeping the infant close to the caregiver for protection. The internal working model formed in infancy influences relationships throughout life. Bowlby\u2019s phases: pre-attachment (0-6 wks), attachment-in-the-making (6 wks to 6-8 mo), clear-cut attachment (6-8 mo to 18-24 mo), goal-corrected partnership (from 18-24 mo). The maternal deprivation hypothesis from Bowlby\u2019s 44 juvenile thieves study proposed that prolonged separation leads to affectionless psychopathy and cognitive delay.</p>

      <p><strong>Ainsworth\u2019s attachment styles (Strange Situation):</strong></p>
      <ul>
        <li><strong>Secure (60-65%):</strong> Explores freely, distressed at separation, easily soothed on reunion. Sensitive, responsive caregiving.</li>
        <li><strong>Insecure-avoidant (15-20%):</strong> Little distress, avoids caregiver on reunion. Rejecting/unresponsive caregiving.</li>
        <li><strong>Insecure-ambivalent (10-15%):</strong> Intense distress, difficult to soothe, seeks and resists contact. Inconsistent caregiving.</li>
        <li><strong>Disorganised (5-10%):</strong> Contradictory behaviours (freezing, stereotypies, approach-avoidance). Maltreatment or caregiver trauma. Strongest link to later psychopathology.</li>
      </ul>

      <h2>Cognitive Development: Piaget</h2>
      <ul>
        <li><strong>Sensorimotor (0-2):</strong> Object permanence at 8-12 months</li>
        <li><strong>Preoperational (2-7):</strong> Symbolic thinking, egocentrism, lack of conservation</li>
        <li><strong>Concrete operational (7-11):</strong> Logical thinking about concrete events, conservation achieved</li>
        <li><strong>Formal operational (11+):</strong> Abstract reasoning, hypothetical thinking (~1/3 of adults reach this)</li>
      </ul>

      <h2>Psychosocial Development: Erikson (8 Stages)</h2>
      <p>Trust vs Mistrust (Hope, 0-1), Autonomy vs Shame/Doubt (Will, 1-3), Initiative vs Guilt (Purpose, 3-6), Industry vs Inferiority (Competence, 6-12), Identity vs Role Confusion (Fidelity, 12-18), Intimacy vs Isolation (Love, 18-40), Generativity vs Stagnation (Care, 40-65), Ego Integrity vs Despair (Wisdom, 65+).</p>

      <h2>Moral Development: Kohlberg</h2>
      <p>Preconventional (obedience, self-interest), Conventional (interpersonal accord, social order), Postconventional (social contract, universal ethics). Based on responses to the Heinz dilemma.</p>

      <h2>Vygotsky</h2>
      <p>Emphasised social learning driving development (contrary to Piaget\u2019s maturation-first view). Zone of proximal development (ZPD) and scaffolding.</p>

      <h2>Key Recall Patterns</h2>
      <ul>
        <li><strong>Object permanence:</strong> Sensorimotor stage (Piaget, 0-2)</li>
        <li><strong>Identity vs role confusion:</strong> Adolescence (Erikson, 12-18)</li>
        <li><strong>Disorganised attachment + maltreatment:</strong> Strongest link to later psychopathology</li>
        <li><strong>Assimilation vs accommodation:</strong> Assimilation fits new info into existing schemas; accommodation modifies schemas</li>
        <li><strong>44 juvenile thieves study:</strong> Bowlby, maternal deprivation hypothesis</li>
      </ul>

      <p>PsychStar\u2019s Paper A question bank covers human development with questions calibrated to exam depth. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'personality-disorders-mrcpsych-paper-b',
    title: 'Personality Disorders for MRCPsych Paper B: Classification, Assessment, and Management',
    metaTitle: 'Personality Disorders for MRCPsych Paper B | ICD-11, BPD, ASPD',
    metaDescription: 'Personality disorders for MRCPsych Paper B. ICD-11 dimensional model, borderline and antisocial PD, defence mechanisms, NICE treatment guidelines, and exam question patterns.',
    date: '2026-06-12',
    readTime: '12 min read',
    category: 'Paper B',
    tags: ['personality disorders', 'BPD', 'ASPD', 'ICD-11', 'defence mechanisms', 'borderline', 'Paper B'],
    featured: false,
    content: `
      <p>Personality disorders are examined as part of general adult psychiatry in Paper B. The ICD-11 moved from the categorical approach of ICD-10 (10 distinct types) to a dimensional model, which is a recurring topic in recent examinations. Borderline personality disorder receives the most attention because of its clinical importance and specific evidence-based treatments. Defence mechanisms are a particular favourite in EMI-style questions.</p>

      <h2>ICD-11 Dimensional Model</h2>

      <p>ICD-11 replaced the 10 categorical types with a single personality disorder diagnosis graded by severity (mild, moderate, severe). Trait domain qualifiers: negative affectivity, detachment, dissociality, disinhibition, anankastia. The <strong>borderline pattern specifier</strong> was retained because of specific treatment implications (DBT).</p>

      <h2>Borderline Personality Disorder</h2>

      <p><strong>Defence mechanisms (exam-favourite):</strong> Splitting (all-good/all-bad), acting out (self-harm as the classic example), projective identification, idealisation and devaluation. ICD-11 specifically identifies acting out as a key feature. Splitting is the most commonly tested defence in BPD.</p>

      <p><strong>NICE management:</strong> DBT specifically for women with recurrent self-harm. MBT and TFP are also evidence-based. Medication should not be prescribed specifically for BPD core symptoms — treat comorbid conditions only.</p>

      <h2>Antisocial Personality Disorder</h2>

      <p>Pervasive disregard for rights of others, present from age 15 (diagnosis from 18). Forensic associations (recall-confirmed): ASPD + LD + substance abuse = most common with sexual offending and theft. Group-based CBT (thinking skills programmes) rather than individual therapy.</p>

      <h2>Other Key Distinctions</h2>
      <ul>
        <li><strong>Schizotypal vs schizoid:</strong> Schizotypal = anxiety + desire relationships but socially awkward. Schizoid = aloof, indifferent, prefers solitude.</li>
        <li><strong>Avoidant vs schizoid:</strong> Avoidant WANTS relationships but fears rejection. Schizoid has no desire.</li>
        <li><strong>OCPD vs OCD:</strong> OCPD = personality pattern, believes their way is right. OCD = recognises behaviours as excessive.</li>
      </ul>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>Most common defence in BPD (ICD-11):</strong> Splitting AND acting out</li>
        <li><strong>Persistent anxiety + social anxiety:</strong> Schizotypal PD (NOT schizoid)</li>
        <li><strong>Sexual reoffending strongest predictor:</strong> Sexual deviancy + antisocial PD</li>
        <li><strong>BPD + recurrent self-harm:</strong> DBT (NICE-recommended)</li>
        <li><strong>ASPD treatment:</strong> Group-based CBT / thinking skills programmes</li>
        <li><strong>ICD-11 change:</strong> Dimensional model. Borderline specifier retained for DBT implications.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers personality disorders with questions calibrated to real exam difficulty. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'history-and-philosophy-mrcpsych-paper-a',
    title: 'History and Philosophy of Psychiatry for MRCPsych Paper A: Key Figures, Movements, and Ideas',
    metaTitle: 'History and Philosophy of Psychiatry for MRCPsych Paper A | Key Figures & Schools',
    metaDescription: 'History and philosophy of psychiatry for MRCPsych Paper A. Kraepelin, Bleuler, Freud, Jaspers, Schneider, anti-psychiatry movement, phenomenology, and ethical principles for the exam.',
    date: '2026-06-12',
    readTime: '13 min read',
    category: 'Paper A',
    tags: ['history of psychiatry', 'philosophy', 'Kraepelin', 'Bleuler', 'Jaspers', 'anti-psychiatry', 'Paper A'],
    featured: false,
    content: `
      <p>History and philosophy of psychiatry accounts for approximately 8% of Paper A marks (roughly 12 of 150 questions). The content divides evenly between historical figures and their contributions, philosophical schools and their influence on psychiatric theory, and ethical principles. The questions are factual and reward precise knowledge rather than interpretation. A candidate who knows who said what and when can answer most of this section confidently.</p>

      <h2>Early History: The Birth of Modern Psychiatry</h2>

      <p><strong>Philippe Pinel (1745-1826):</strong> French physician credited with the first systematic classification of mental disorders. He is best known for striking the chains from patients at the Bic\u00eatre Hospital in Paris (1793) and later at the Salp\u00eatri\u00e8re (1795). This symbolises the moral treatment movement, which viewed mental illness as a disruption of the passions that could be treated through humane and compassionate engagement. Pinel published <em>Treatise on Insanity</em> (1801) and classified melancholia, mania, dementia, and idiotism as distinct categories. His student Jean-\u00c9tienne Esquirol (1772-1840) introduced the term hallucination, distinguishing it from illusion, and developed the concept of monomania (a partial insanity focused on a single subject).</p>

      <p><strong>William Tuke (1732-1822):</strong> English Quaker who founded the York Retreat (1796), a model of moral treatment emphasising rest, work, religious and social activities, and minimal restraint. The Tuke family ran the Retreat for generations and influenced the development of humane psychiatry in England.</p>

      <p><strong>Emil Kraepelin (1856-1926):</strong> German psychiatrist who created the first systematic classification of mental illness based on longitudinal course and outcome, not just cross-sectional symptomatology. He divided psychotic illnesses into dementia praecox (a deteriorating course, later renamed schizophrenia by Bleuler) and manic-depressive insanity (an episodic course with recovery between episodes). This dichotomy dominated psychiatric classification for a century and is the foundation of ICD and DSM. Kraepelin also contributed to the study of cross-cultural psychiatry (studying in Java) and psychopharmacology (investigating the effects of various substances on mental states).</p>

      <p><strong>Eugen Bleuler (1857-1939):</strong> Swiss psychiatrist who introduced the term \u201cschizophrenia\u201d (from Greek \u201csplit mind\u201d \u2014 referring to the splitting of psychic functions, not dissociative identity disorder). He argued that the fundamental symptoms (the four A\u2019s) were specific to schizophrenia: loose Associations, Autism (social withdrawal), Ambivalence, and Affective blunting. The accessory symptoms (hallucinations, delusions, catatonia) were not specific and could occur in other conditions. This distinction between fundamental and accessory symptoms is sometimes tested.</p>

      <p><strong>Karl Jaspers (1883-1969):</strong> German psychiatrist and philosopher whose work <em>General Psychopathology</em> (1913) established the methodological foundations for descriptive psychopathology. Jaspers introduced the crucial distinction between meaningful connections (that can be understood through empathy \u2014 <em>verstehen</em>) and causal explanations (that must be explained through scientific method \u2014 <em>erkl\u00e4ren</em>). He distinguished between true delusions (primary delusions \u2014 not psychologically understandable) and delusion-like ideas (secondary delusions \u2014 psychologically understandable). This distinction remains central to the assessment of psychotic symptoms.</p>

      <p><strong>Kurt Schneider (1887-1967):</strong> German psychiatrist who described first-rank symptoms of schizophrenia for the purpose of reliable diagnosis. These include: auditory hallucinations (voices commenting, voices discussing the patient, thought echo), thought disorder (thought insertion, thought withdrawal, thought broadcast), passivity phenomena (bodily passivity, made impulses, made volitions, made affects), and delusional perception. Schneider never intended these to be pathognomonic but emphasised their diagnostic weight. First-rank symptoms are no longer required for ICD-11 diagnosis but remain clinically useful.</p>

      <h2>The Psychoanalytic Tradition</h2>

      <p><strong>Sigmund Freud (1856-1939):</strong> Austrian neurologist who founded psychoanalysis. His structural model divided the psyche into id (unconscious, pleasure principle), ego (reality principle, mediates between id and superego), and superego (internalised moral standards). His topographical model divided consciousness into conscious, preconscious, and unconscious. Freud proposed psychosexual stages (oral, anal, phallic, latency, genital) and described defence mechanisms (repression, projection, rationalisation, reaction formation, sublimation, displacement, denial, intellectualisation). His therapeutic method (free association, dream analysis, interpretation of transference) dominated psychotherapy for much of the 20th century. Important collaborators and dissenters include Jung (analytic psychology, collective unconscious, archetypes), Adler (individual psychology, inferiority complex), and Klein (object relations, paranoid-schizoid and depressive positions).</p>

      <p><strong>Carl Jung (1875-1961):</strong> Broke with Freud in 1913. Proposed the collective unconscious (shared ancestral memories and archetypes), psychological types (introversion/extraversion, thinking/feeling, sensing/intuiting), and the process of individuation (integration of the conscious and unconscious). His word association test remains a standard neuropsychological tool.</p>

      <p><strong>Melanie Klein (1882-1960):</strong> Extended psychoanalysis to children through play therapy. Described the paranoid-schizoid position (first 6 months \u2014 splitting, projective identification) and depressive position (capacity for concern and guilt, recognition of whole objects). Her concepts of projective identification are frequently referenced in modern psychotherapy literature and examined in Paper B.</p>

      <p><strong>John Bowlby (1907-1990):</strong> Attachment theory. His work is tested in both Paper A (human development section) and Paper B. See the human development article for details.</p>

      <h2>Philosophical Schools in Psychiatry</h2>

      <p><strong>Phenomenology:</strong> The study of subjective experience as it is lived, bracketing (epoch\u00e9) assumptions about causation. Jaspers introduced phenomenology to psychiatry as a method for understanding the patient\u2019s inner world. This contrasts with positivism (the view that only objective, measurable phenomena are real). The phenomenological approach underpins descriptive psychopathology and the mental state examination.</p>

      <p><strong>Hermeneutics:</strong> The theory of interpretation, emphasising that understanding requires grasping the meaning of human action within its context. In psychiatry, this is relevant to psychotherapy (interpreting the meaning of symptoms) and to the qualitative research methods increasingly used in psychiatric research.</p>

      <p><strong>Positivism:</strong> The view that only empirical, observable phenomena can count as knowledge. This is the dominant epistemology in biological psychiatry and evidence-based medicine. The tension between positivism and hermeneutics in psychiatry is a philosophical question that appears in the exam: can mental illness be fully explained by neuroscience, or does it require interpretive understanding?</p>

      <p><strong>Mind-body problem:</strong> The philosophical question of how mental phenomena relate to physical processes. Positions include dualism (Descartes: mind and body are separate substances), materialism (mental states are identical to brain states), epiphenomenalism (mental states are caused by brain states but have no causal power themselves), functionalism (mental states are defined by their causal roles, not their physical substrate), and identity theory (mental types are identical to brain types). The development of psychopharmacology and neuroimaging has shifted psychiatry toward materialism, but the philosophical debate remains relevant to questions of free will, responsibility, and the nature of psychiatric disorder.</p>

      <h2>The Anti-Psychiatry Movement</h2>

      <p>The anti-psychiatry movement of the 1960s-70s challenged the medical model of mental illness. This is a recurring topic that the exam tests in factual terms.</p>

      <p><strong>Thomas Szasz (1920-2012):</strong> American psychiatrist who argued that mental illness is a myth (1961) \u2014 a metaphor for problems in living. He distinguished between brain disease (organic) and mental illness (behavioural deviance labelled as disease). Szasz was a libertarian who opposed involuntary psychiatric treatment and the insanity defence in criminal law. His position was that mental illness is a matter of social values, not medical facts.</p>

      <p><strong>R.D. Laing (1927-1989):</strong> Scottish psychiatrist associated with the anti-psychiatry movement (though he rejected the label). He argued that schizophrenia was a rational response to an insane social environment, particularly the double-bind hypothesis (Bateson 1956 \u2014 contradictory messages from caregivers that the child cannot resolve). His book <em>The Divided Self</em> (1960) attempted to make psychotic experience intelligible from the patient\u2019s perspective. He established therapeutic communities (like Kingsley Hall) where patients and staff lived together without traditional medical hierarchies.</p>

      <p><strong>Michel Foucault (1926-1984):</strong> French philosopher who wrote <em>Madness and Civilisation</em> (1961), arguing that the confinement of the mad was a form of social exclusion that occurred after the Enlightenment, not a scientific advance. The \u201cgreat confinement\u201d removed the mad from public life and replaced their medieval status (sometimes tolerated, housed in leper colonies) with institutionalisation. Foucault\u2019s work connects the history of psychiatry to broader questions of power and social control.</p>

      <p><strong>Erving Goffman (1922-1982):</strong> American sociologist who studied total institutions (asylums, prisons, monasteries). His book <em>Asylums</em> (1961) described the mortification of the self through institutional rituals (loss of personal belongings, uniforms, loss of privacy, subordination to authority). He introduced the concept of the moral career of the mental patient and the process by which institutionalisation itself creates disability (institutionalisation syndrome: apathy, dependence, loss of initiative).</p>

      <h2>The Development of Classification</h2>

      <p><strong>ICD (International Classification of Diseases):</strong> First published by WHO in 1948 (ICD-6). ICD-8 (1965) included a glossary of mental disorders. ICD-9 (1975) expanded the coverage. ICD-10 (1992) introduced operationalised diagnostic criteria for the first time, using an alphanumeric coding system (F00-F99 for mental and behavioural disorders). ICD-11 (2019, adopted 2022) introduced the dimensional model for personality disorders, removed schizophrenia subtypes, simplified depressive disorder criteria, and introduced new categories such as gaming disorder and complex PTSD.</p>

      <p><strong>DSM (Diagnostic and Statistical Manual of Mental Disorders):</strong> Published by the American Psychiatric Association. DSM-I (1952) reflected psychodynamic theory. DSM-II (1968) was similar. DSM-III (1980) was a paradigm shift \u2014 introduced explicit diagnostic criteria, multiaxial assessment, and a descriptive (atheoretical) approach aligned with the Feighner criteria and Research Diagnostic Criteria. This publication transformed psychiatric research and clinical practice. DSM-IV (1994) and DSM-IV-TR (2000) refined the criteria. DSM-5 (2013) removed the multiaxial system, reorganized some categories, and introduced dimensional measures for some disorders. DSM-5-TR (2022) updated the text with current evidence.</p>

      <p><strong>ICD vs DSM:</strong> ICD is the official classification system for the UK and most of the world. DSM is used primarily in the USA and for psychiatric research. They have converged considerably since DSM-III but retain differences. For MRCPsych, ICD-11 is the relevant classification. DSM criteria are sometimes used to supplement understanding but the exam questions reference ICD.</p>

      <h2>Ethics in Psychiatry</h2>

      <p>The four principles of medical ethics (Beauchamp and Childress): autonomy (respect the patient\u2019s right to self-determination), beneficence (act in the patient\u2019s best interest), non-maleficence (do no harm), and justice (fair distribution of resources). In psychiatry, these principles frequently conflict: withholding treatment against a patient\u2019s wishes under the MHA (autonomy vs beneficence/non-maleficence), allocating scarce resources like inpatient beds (justice vs beneficence).</p>

      <p>The <strong>Bournewood gap</strong> (1997): An autistic man who lacked capacity was informally admitted to hospital without using the MHA. The European Court of Human Rights found this violated Article 5 (right to liberty). This led to the introduction of Deprivation of Liberty Safeguards (DOLS) in the MCA 2005, and more recently the Liberty Protection Safeguards (LPS).</p>

      <h2>High-Yield Recall Patterns</h2>

      <ul>
        <li><strong>Struck chains from patients:</strong> Philippe Pinel (1793, Bic\u00eatre)</li>
        <li><strong>First systematic classification by course/outcome:</strong> Emil Kraepelin (dementia praecox vs manic-depressive)</li>
        <li><strong>Coined the term schizophrenia:</strong> Eugen Bleuler (four A\u2019s: Associations, Autism, Ambivalence, Affect)</li>
        <li><strong>First-rank symptoms of schizophrenia:</strong> Kurt Schneider</li>
        <li><strong>Verstehen vs erkl\u00e4ren (understanding vs explaining):</strong> Karl Jaspers (<em>General Psychopathology</em>, 1913)</li>
        <li><strong>True delusions vs delusion-like ideas:</strong> Jaspers \u2014 true delusions are not psychologically understandable</li>
        <li><strong>Mental illness is a myth:</strong> Thomas Szasz</li>
        <li><strong>Schizophrenia as a rational response to double-bind:</strong> R.D. Laing (<em>The Divided Self</em>)</li>
        <li><strong>Great confinement / social exclusion of madness:</strong> Michel Foucault (<em>Madness and Civilisation</em>)</li>
        <li><strong>Total institutions / mortification of self:</strong> Erving Goffman (<em>Asylums</em>)</li>
        <li><strong>Moral treatment / York Retreat:</strong> William Tuke (1796)</li>
        <li><strong>Psychoanalysis founder:</strong> Sigmund Freud (id/ego/superego, psychosexual stages, defence mechanisms)</li>
        <li><strong>Collective unconscious / archetypes:</strong> Carl Jung</li>
        <li><strong>Object relations / play therapy:</strong> Melanie Klein (paranoid-schizoid and depressive positions)</li>
        <li><strong>Four principles of medical ethics:</strong> Autonomy, beneficence, non-maleficence, justice</li>
        <li><strong>Bournewood gap:</strong> Led to DOLS/LPS</li>
      </ul>

      <p>PsychStar\u2019s Paper A question bank includes history and philosophy questions calibrated to real exam depth. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'old-age-psychiatry-mrcpsych-paper-b',
    title: 'Old Age Psychiatry for MRCPsych Paper B: Dementia, Delirium, and Late-Life Mental Health',
    metaTitle: 'Old Age Psychiatry for MRCPsych Paper B | Dementia, Delirium & Late-Life Care',
    metaDescription: 'Old age psychiatry for MRCPsych Paper B. Dementia subtypes (Alzheimer\u2019s, vascular, DLB, FTD), delirium diagnosis and management, depression in older adults, and service organisation.',
    date: '2026-06-12',
    readTime: '14 min read',
    category: 'Paper B',
    tags: ['old age psychiatry', 'dementia', 'Alzheimer\u2019s', 'delirium', 'BPSD', 'Paper B'],
    featured: false,
    content: `
      <p>Old age psychiatry accounts for approximately 10% of Paper B marks (roughly 15 of 150 questions). The content covers dementia subtypes and their management, delirium, depression in older adults, late-life psychosis, and service organisation for older people\u2019s mental health. The number of effective treatments is small, so the exam tests distinctions between dementia subtypes, appropriate pharmacological management, risk assessment, and the interface between mental health and social care.</p>

      <h2>Dementia: Classification and Diagnosis</h2>

      <p>Dementia is a clinical syndrome characterised by progressive cognitive decline that interferes with daily function, in a clear sensorium (unlike delirium), with onset in later life. The most common early-onset dementia is Alzheimer\u2019s disease, despite the common belief that frontotemporal dementia is more frequent in younger patients.</p>

      <h3>Alzheimer\u2019s Disease (~60% of dementias)</h3>

      <p>Core features: Insidious onset, gradual progression over years. Early and prominent impairment of episodic memory (hippocampal dysfunction) \u2014 the patient forgets recent events while remote memories are relatively preserved early on. As the disease progresses, language impairment (anomia, then aphasia), visuospatial deficits, and executive dysfunction emerge. Behavioural and psychological symptoms occur in 80-90% over the course of the illness: apathy (most common), agitation, aggression, depression, psychosis, sleep disturbance.</p>

      <p><strong>Pathology:</strong> Extracellular amyloid-beta plaques, intracellular neurofibrillary tangles (hyperphosphorylated tau protein), and neuronal loss. The earliest changes occur in the entorhinal cortex and hippocampus (Braak stages), then spread to temporal, parietal, and frontal cortex. ApoE4 is the strongest genetic risk factor (not causal). Early-onset familial Alzheimer\u2019s (<65 years) is associated with mutations in amyloid precursor protein (APP), presenilin 1 (PSEN1), and presenilin 2 (PSEN2) genes.</p>

      <p><strong>Investigations:</strong> CT/MRI shows hippocampal atrophy, particularly on coronal sections. CSF shows reduced amyloid-beta 42 and increased total tau and phospho-tau. FDG-PET shows temporoparietal hypometabolism.</p>

      <h3>Vascular Dementia (~15% of dementias)</h3>

      <p>Core features: Stepwise deterioration corresponding to cerebrovascular events. Cognitive deficits are variable depending on the location of the infarcts. Executive dysfunction (slow processing, poor concentration, impaired planning) is often more prominent than memory loss, in contrast to Alzheimer\u2019s. Focal neurological signs are common. Risk factors are those for cerebrovascular disease: hypertension, diabetes, smoking, atrial fibrillation, hypercholesterolaemia.</p>

      <p><strong>Subtypes:</strong> Multi-infarct dementia (multiple cortical infarcts), strategic infarct dementia (single infarct in a critical area like thalamus), small vessel disease (Binswanger\u2019s disease: widespread subcortical white matter changes, more gradual progression). A recall question described a patient with memory loss, hypertension, and MRI showing infarcts \u2014 answer: Binswanger\u2019s disease.</p>

      <p><strong>Imaging:</strong> CT/MRI shows evidence of infarcts, white matter hyperintensities (leukoaraiosis). The key distinction from Alzheimer\u2019s is relative preservation of hippocampal volume.</p>

      <h3>Dementia with Lewy Bodies (DLB, ~10% of dementias)</h3>

      <p>Core features: The clinical triad is fluctuating cognition (marked variation in attention and alertness over hours to days), recurrent well-formed visual hallucinations (detailed, vivid images of people or animals), and parkinsonism (rigidity, bradykinesia, postural instability \u2014 less prominent tremor than Parkinson\u2019s disease). REM sleep behaviour disorder (acting out dreams) is a supportive feature. Dysautonomia is common.</p>

      <p><strong>Diagnostic significance:</strong> DLB is the dementia most likely to present with psychiatric symptoms first (hallucinations, depression, behavioural disturbance). This is important when the exam presents a patient with visual hallucinations and cognitive fluctuations \u2014 the answer is DLB, not primary psychotic disorder.</p>

      <p><strong>Management:</strong> First-line for psychosis in DLB is rivastigmine (a cholinesterase inhibitor that may improve cognition and hallucinations). Antipsychotics are used with extreme caution and only when necessary, as patients with DLB are exquisitely sensitive to D2 blockade \u2014 up to 50% will develop severe neuroleptic sensitivity (parkinsonism, sedation, confusion, autonomic instability, can be fatal). If an antipsychotic is necessary, risperidone or olanzapine (low starting dose) is used, but quetiapine is often preferred for its lower D2 occupancy. This is a recurring question.</p>

      <h3>Frontotemporal Dementia (FTD, ~5% of dementias)</h3>

      <p>Core features: Earlier onset than Alzheimer\u2019s (typically 45-65 years). Two main presentations: behavioural variant (bvFTD \u2014 personality change, executive dysfunction, loss of empathy, disinhibition, apathy, stereotyped behaviours) and primary progressive aphasia (language variant \u2014 progressive loss of language function, classified as non-fluent/agrammatic, semantic, or logopenic). A recall question described Pick\u2019s disease (FTD with Pick bodies on histology) as presenting with no insight, cognitive decline, and primary motor dysphasia (non-fluent aphasia). Insight is notably impaired early in bvFTD.</p>

      <p><strong>Pathology:</strong> Tau protein inclusions (Pick bodies) or TDP-43 inclusions. Atrophy is most prominent in the frontal and anterior temporal lobes (on CT/MRI), with the characteristic \u201cknife-edge\u201d gyral atrophy. SPECT shows frontal and anterior temporal hypoperfusion, which helps distinguish FTD from Alzheimer\u2019s (which shows temporoparietal changes).</p>

      <p><strong>Management:</strong> No pharmacological treatments are approved for FTD. Cholinesterase inhibitors (donepezil, rivastigmine, galantamine) are NOT effective in FTD and may worsen behavioural symptoms. Management is non-pharmacological: behavioural interventions, environmental modification, carer support. SSRIs may help with disinhibition and repetitive behaviours.</p>

      <h2>Pharmacological Management of Dementia</h2>

      <p><strong>Cholinesterase inhibitors (donepezil, rivastigmine, galantamine):</strong> Licensed for mild to moderate Alzheimer\u2019s disease. NICE recommends them as options for managing Alzheimer\u2019s (reviewed at 3-6 month intervals). Donepezil (once daily) is most commonly used. Rivastigmine is the only one licensed for DLB and Parkinson\u2019s disease dementia. Galantamine is also a nicotinic receptor modulator. Side effects: nausea, vomiting, diarrhoea, bradycardia, and muscle cramps donepezil can cause bradycardia and hypotension (recall question: patient on donepezil 10mg, hypotensive, ankle oedema \u2014 ECG shows sinus bradycardia).</p>

      <p><strong>Memantine:</strong> NMDA receptor antagonist. Licensed for moderate to severe Alzheimer\u2019s disease (NICE recommends it as an option for managing Alzheimer\u2019s in people with moderate or severe disease). Can be used alone or in combination with a cholinesterase inhibitor. Side effects: constipation, headache, dizziness, hypertension.</p>

      <p><strong>BPSD management (Behavioural and Psychological Symptoms of Dementia):</strong> First-line is non-pharmacological (ABC approach: Antecedent, Behaviour, Consequence \u2014 identifying triggers and modifying the environment, carer training, structured activities). Medication is reserved for severe distress or risk to self/others. The first-line antipsychotic is risperidone (licensed for up to 6 weeks for persistent aggression in Alzheimer\u2019s). Haloperidol is used for severe agitation or psychosis but carries higher EPS risk. Antipsychotics increase stroke risk (all antipsychotics, approximately 2-fold) and mortality in dementia, and should be used at the lowest effective dose for the shortest possible time.</p>

      <h2>Delirium</h2>

      <p>Delirium is an acute, fluctuating disturbance in attention and awareness caused by an underlying medical condition. It is the most common acute neuropsychiatric syndrome in hospitalised older adults and is associated with increased length of stay, institutionalisation, and mortality. The detection and management of delirium is a mandatory competency and appears regularly in Paper B.</p>

      <p><strong>Clinical features (ICD-11 criteria):</strong> Disturbance in attention (reduced ability to direct, focus, sustain, and shift attention) and awareness (disorientation, reduced orientation to environment), developing over hours to days, fluctuating during the day. Additional features: cognitive disturbance (memory, language, orientation), perceptual disturbances (illusions, hallucinations \u2014 often visual or tactile), delusions (often persecutory, poorly formed), psychomotor disturbance (hyperactive: agitation, restlessness; hypoactive: lethargy, reduced movement; mixed), emotional disturbance (anxiety, fear, irritability, apathy).</p>

      <p><strong>Hyperactive vs hypoactive delirium:</strong> Hyperactive delirium is more likely to be recognised (agitation, wandering, shouting, hallucinations). Hypoactive delirium (withdrawn, quiet, lethargic, reduced speech) is more common but frequently missed. Both types are equally serious in prognosis. Between the two, hypoactive delirium has higher mortality but is less easily detected. A standard question asks about the hypoactive subtype being missed in clinical practice.</p>

      <p><strong>Causes (PINCH ME mnemonic):</strong> Pain, Infection (UTI, chest), Nutrition (dehydration, electrolyte imbalance), Constipation, Hypoxia, Medication (anticholinergics, sedatives, opioids, steroids), Environment (sensory impairment, sleep deprivation). Polypharmacy and anticholinergic burden are the most common reversible contributing factors.</p>

      <p><strong>Assessment:</strong> Confusion Assessment Method (CAM) is the validated screening tool: acute onset and fluctuating course, inattention, and either disorganised thinking or altered level of consciousness. Additional investigations: FBC, U&Es, glucose, calcium, LFTs, TFTs, B12/folate, infection screen (blood cultures, urine, chest X-ray), ECG, CT head if indicated.</p>

      <p><strong>Management:</strong> Identify and treat the underlying cause. Environmental measures: frequent orientation cues, familiar objects, clear communication, family presence, adequate lighting, sleep hygiene. Medication if the patient is distressed or at risk (do not medicate purely for staffing convenience). First-line for severe agitation: haloperidol 0.5-2mg (lower dose than in younger patients) OR lorazepam (particularly when cause is alcohol withdrawal or if antipsychotics are contraindicated). Second-line: olanzapine or risperidone.</p>

      <h2>Depression in Older Adults</h2>

      <p>Depression in older adults presents differently than in younger adults. Somatic symptoms (pain, fatigue, gastrointestinal disturbance) are more prominent. Psychomotor change (retardation or agitation) is more common. Cognitive impairment resembling dementia (depressive pseudodementia) can occur and may be difficult to distinguish from early dementia. The key distinction: in pseudodementia, cognitive deficits improve with treatment of depression. Neuropsychological testing may show inconsistent performance (variable across assessments, unlike Alzheimer\u2019s where deficits are consistent).</p>

      <p><strong>Suicide risk in older adults:</strong> Older adults (particularly older men) have the highest suicide rates of any demographic group. Risk factors: male sex, widowed/divorced, living alone, physical illness, functional decline, recent bereavement, access to means. Suicide attempts in older adults are more lethal (higher completion rate). This is a high-yield concern in old age psychiatry questions.</p>

      <p><strong>Treatment:</strong> SSRIs (sertraline first-line) are the pharmacological first choice at half the usual starting dose. Agomelatine is an alternative with favourable side-effect profile and no significant drug interactions. ECT is particularly effective and safe in older adults and is underutilised in this population. It should be considered early in severe depression with psychotic features, catatonia, or food/fluid refusal.</p>

      <h2>Service Organisation for Older Adults</h2>

      <p>Old age psychiatry services in the UK are community-oriented, with most patients managed at home or in care homes. The multidisciplinary team includes psychiatrists, community psychiatric nurses, occupational therapists, psychologists, social workers, and liaison with primary care. Memory clinics provide specialist assessment and diagnosis of dementia. Care home liaison services provide regular input to care homes to manage BPSD and reduce inappropriate antipsychotic prescribing.</p>

      <h2>High-Yield Recall Patterns</h2>

      <ul>
        <li><strong>Most common early-onset dementia:</strong> Alzheimer\u2019s disease (NOT FTD)</li>
        <li><strong>Alzheimer\u2019s CT finding:</strong> Hippocampal atrophy</li>
        <li><strong>Donepezil + bradycardia + hypotension:</strong> Sinus bradycardia (reduce or stop donepezil)</li>
        <li><strong>Visual hallucinations + Parkinson\u2019s:</strong> Rivastigmine first-line, or consider low-dose quetiapine</li>
        <li><strong>Visual hallucinations + fluctuating cognition + parkinsonism:</strong> DLB</li>
        <li><strong>DLB + antipsychotics:</strong> Extreme neuroleptic sensitivity (50% develop severe reactions). Quetiapine preferred if needed.</li>
        <li><strong>Stepwise deterioration + hypertension + infarcts on MRI:</strong> Vascular dementia / Binswanger\u2019s disease</li>
        <li><strong>Early onset + personality change + loss of insight + language impairment:</strong> FTD / Pick\u2019s disease</li>
        <li><strong>Pick\u2019s disease + language:</strong> Primary motor dysphasia (non-fluent aphasia)</li>
        <li><strong>Acute confusion + fluctuating + inattention + medical cause:</strong> Delirium. Use CAM to screen.</li>
        <li><strong>Hypoactive delirium:</strong> More common, higher mortality, more often missed than hyperactive</li>
        <li><strong>Best dementia scale for non-English speaker with low education:</strong> RUDAS (Rowland Universal Dementia Assessment Scale)</li>
        <li><strong>Becoming frail, query MCI vs dementia:</strong> Collateral history of functional impairment is key</li>
        <li><strong>Depressive pseudodementia vs Alzheimer\u2019s:</strong> Inconsistent cognitive performance, improves with antidepressant treatment</li>
        <li><strong>Highest suicide rate demographic:</strong> Older men (widowed, living alone, physical illness)</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers old age psychiatry with questions calibrated to real exam difficulty. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'psychological-models-behavioural-science-mrcpsych-paper-a',
    title: 'Psychological Models and Behavioural Science for MRCPsych Paper A',
    metaTitle: 'Psychological Models for MRCPsych Paper A | Learning Theory & Behavioural Science',
    metaDescription: 'Psychological models and behavioural science for MRCPsych Paper A. Classical and operant conditioning, social learning theory, cognitive models, defence mechanisms, and social psychology for the exam.',
    date: '2026-06-17',
    readTime: '14 min read',
    category: 'Paper A',
    tags: ['psychological models', 'behavioural science', 'learning theory', 'Pavlov', 'Bandura', 'social psychology', 'Paper A'],
    featured: false,
    content: `
      <p>Psychological models and behavioural science account for approximately 17% of Paper A marks (roughly 25 of 150 questions), making it the third-largest section after neurosciences and psychopharmacology. The content covers learning theories, cognitive and behavioural models of mental disorder, social psychology, and the psychological underpinnings of psychiatric treatment. This material is conceptually straightforward but requires precise knowledge of theorists, terminology, and experimental paradigms.</p>

      <h2>Learning Theories</h2>

      <h3>Classical (Pavlovian) Conditioning</h3>
      <p>Ivan Pavlov demonstrated that a neutral stimulus (bell) paired with an unconditioned stimulus (food) that elicits an unconditioned response (salivation) can come to elicit a conditioned response (salivation to bell alone). Key concepts: acquisition (initial learning), extinction (decline in conditioned response when CS presented without UCS), spontaneous recovery (reappearance after a pause), generalisation (similar stimuli elicit the response), discrimination (learning to respond only to the specific CS). Higher-order conditioning occurs when a new CS is paired with the established CS. Clinical relevance: development of phobias (Watson and Rayner\u2019s Little Albert), aversion therapy, and exposure-based treatments.</p>

      <h3>Operant (Instrumental) Conditioning</h3>
      <p>B.F. Skinner demonstrated that behaviour is shaped by its consequences. Reinforcement increases behaviour; punishment decreases it. Positive reinforcement adds a desirable stimulus (praise), negative reinforcement removes an aversive stimulus (stopping a loud noise). Positive punishment adds an aversive stimulus (scolding), negative punishment removes a desirable stimulus (loss of privileges). Schedules of reinforcement: continuous (every response reinforced, fastest acquisition but fastest extinction), fixed ratio (after every nth response, high response rate), variable ratio (after unpredictable number, most resistant to extinction, highest response rate), fixed interval (after a fixed time, scalloped response pattern), variable interval (after unpredictable time, moderate steady rate). Shaping involves reinforcing successive approximations to the target behaviour. Clinical relevance: token economies in inpatient settings, behavioural activation for depression, contingency management in substance misuse.</p>

      <h3>Social Learning Theory</h3>
      <p>Albert Bandura emphasised observational learning (learning by watching others). The Bobo doll experiment (1961) showed that children who observed an adult behaving aggressively toward a Bobo doll were more likely to imitate that behaviour. Key concepts: vicarious reinforcement (learning from observing others being reinforced or punished), self-efficacy (belief in one\u2019s ability to succeed), reciprocal determinism (behaviour, cognition, and environment influence each other). The four stages of observational learning: attention, retention, reproduction, motivation. Clinical relevance: modelling in CBT, social skills training, understanding the role of media violence.</p>

      <h3>Learned Helplessness</h3>
      <p>Martin Seligman\u2019s experiments with dogs showed that repeated exposure to inescapable shock led to passivity and failure to escape even when escape became possible (Seligman and Maier, 1967). This became the animal model of depression. Abramson, Seligman, and Teasdale (1978) reformulated this as attributional style: people who attribute negative events to internal, stable, and global causes are at higher risk for depression. Clinical relevance: cognitive model of depression, attributional retraining in CBT.</p>

      <h2>Cognitive Models of Mental Disorder</h2>

      <p><strong>Aaron Beck\u2019s cognitive model of depression:</strong> The cognitive triad (negative view of self, world, and future) arises from dysfunctional schemas (core beliefs) formed by early experience. These schemas are activated by life events that match them, leading to automatic negative thoughts. The cognitive specificity hypothesis states that each emotional disorder has a characteristic cognitive profile: depression = themes of loss and worthlessness; anxiety = themes of threat and danger; anger = themes of unfairness and violation. Beck\u2019s cognitive therapy aims to identify, challenge, and modify these distorted cognitions.</p>

      <p><strong>Albert Ellis\u2019s Rational Emotive Behaviour Therapy (REBT):</strong> The ABC model: Activating event \u2192 Belief (irrational) \u2192 Consequence (emotional/behavioural). The goal is to identify and dispute irrational beliefs (musturbation, awfulising, low frustration tolerance) and replace them with rational beliefs.</p>

      <p><strong>Locus of control (Rotter, 1966):</strong> The extent to which individuals believe they have control over events affecting them. Internal locus = outcomes depend on own actions; external locus = outcomes depend on luck, fate, or others. External locus of control is associated with higher rates of depression and anxiety.</p>

      <h2>Defence Mechanisms</h2>

      <p>Defence mechanisms are unconscious psychological strategies used to cope with anxiety and maintain self-esteem. The exam tests both the definition and clinical examples of each. Mature defences (adaptive): sublimation (channelling unacceptable impulses into socially valued activities), humour, altruism, suppression (conscious deferral). Neurotic defences: repression (unconscious forgetting\ufffd the foundation of all defences), rationalisation (logical explanation for irrational behaviour), intellectualisation (detached analytical thinking), displacement (redirecting impulse to safer target), reaction formation (adopting opposite attitude). Immature defences: projection (attributing own feelings to others), projective identification (projecting then inducing the feeling in others), splitting (all-good/all-bad), acting out (impulse expressed through action not words), denial, regression (reverting to earlier developmental stage), idealisation/devaluation. Freud\u2019s original list included repression as the primary defence, with others as variations. Anna Freud expanded the list in <em>The Ego and the Mechanisms of Defence</em> (1936).</p>

      <h2>Social Psychology</h2>

      <p><strong>Attribution theory (Heider, 1958; Kelley, 1967):</strong> How people explain the causes of behaviour. Internal/dispositional attributions (the person\u2019s character) vs external/situational attributions (the environment). The fundamental attribution error (overestimating dispositional factors, underestimating situational factors in others\u2019 behaviour) and the actor-observer effect (attributing own behaviour to situation, others\u2019 behaviour to disposition).</p>

      <p><strong>Cognitive dissonance theory (Festinger, 1957):</strong> When attitudes and behaviours are inconsistent, people experience psychological discomfort and are motivated to reduce it by changing attitudes, behaviours, or by rationalising. The classic experiment: participants paid $1 to lie about a boring task showed greater attitude change than those paid $20 (insufficient justification leads to stronger dissonance). Clinical relevance: motivational interviewing uses cognitive dissonance amplification to promote behaviour change.</p>

      <p><strong>Conformity and obedience:</strong> Asch\u2019s line judgement studies (1951) showed that 37% of participants conformed to an obviously incorrect group judgement (line length comparison) when alone against a unanimous majority. Milgram\u2019s obedience studies (1963) showed that 65% of participants administered what they believed to be dangerous electric shocks to a learner under the instruction of an authority figure. Factors that increase obedience: proximity of authority, legitimacy of setting, distance from victim, gradual escalation of demands.</p>

      <p><strong>Group processes:</strong> Zimbardo\u2019s Stanford Prison Experiment (1971) demonstrated how social roles shape behaviour (guards became abusive, prisoners became passive within days). Social loafing (Ringelmann effect: individuals exert less effort in groups than alone), group polarisation (group discussion leads to more extreme positions), groupthink (conformity in decision-making groups leading to flawed decisions, Janis, 1972).</p>

      <p><strong>Helping behaviour:</strong> Latane and Darley\u2019s bystander intervention model: the more people present, the less likely any individual is to help (bystander effect). Diffusion of responsibility, pluralistic ignorance (looking to others to define the situation, interpreting inaction as evidence that help is not needed). The Genovese murder (1964) in which 38 witnesses did not intervene or call police, was the impetus for this research.</p>

      <p><strong>Prejudice and stereotypes:</strong> The realistic conflict theory (Sherif\u2019s Robbers Cave experiment, 1954) showed that intergroup conflict arises from competition for scarce resources and can be reduced by superordinate goals that require cooperation. Social identity theory (Tajfel & Turner, 1979): people derive part of their identity from group membership and favour their own group (in-group bias) even in minimal group situations.</p>

      <h2>High-Yield Exam Patterns</h2>
      <ul>
        <li><strong>Bobo doll experiment:</strong> Bandura, observational learning / social learning theory</li>
        <li><strong>Learned helplessness:</strong> Seligman, inescapable shock, animal model of depression</li>
        <li><strong>Little Albert:</strong> Watson and Rayner, classical conditioning of phobia (11-month-old, white rat, loud noise)</li>
        <li><strong>Variable ratio schedule:</strong> Most resistant to extinction (slot machines)</li>
        <li><strong>Asch study:</strong> Conformity, line judgement, 37% conformed to incorrect majority</li>
        <li><strong>Milgram study:</strong> Obedience to authority, 65% delivered maximum shock, gradual escalation</li>
        <li><strong>Stanford Prison Experiment:</strong> Zimbardo, social roles and deindividuation</li>
        <li><strong>Bystander effect:</strong> Latane and Darley, diffusion of responsibility, more people = less help</li>
        <li><strong>Cognitive dissonance:</strong> Festinger, $1/$20 experiment, insufficient justification</li>
        <li><strong>Rotter locus of control:</strong> External = higher depression/anxiety</li>
        <li><strong>Fundamental attribution error:</strong> Overestimate disposition, underestimate situation for others</li>
        <li><strong>Sherif Robbers Cave:</strong> Superordinate goals reduce intergroup conflict</li>
        <li><strong>Tajfel minimal groups:</strong> In-group bias even without history of conflict</li>
        <li><strong>Defence mechanisms most examined:</strong> Splitting (BPD), projection, projective identification, acting out, sublimation</li>
      </ul>

      <p>PsychStar\u2019s Paper A question bank covers psychological models with questions calibrated to the SPMM depth expected in the exam. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'descriptive-psychopathology-mrcpsych',
    title: 'Descriptive Psychopathology for MRCPsych: Mood, Thought, Perception, and Cognition',
    metaTitle: 'Descriptive Psychopathology for MRCPsych | Mental State Examination Terms',
    metaDescription: 'Descriptive psychopathology for MRCPsych. Disorders of mood, thought form, thought content, perception, cognition, and insight \u2014 key terms and exam-relevant definitions from the SPMM syllabus.',
    date: '2026-06-17',
    readTime: '13 min read',
    category: 'Paper A',
    tags: ['psychopathology', 'mental state examination', 'thought disorder', 'hallucinations', 'delusions', 'Paper A'],
    featured: false,
    content: `
      <p>Descriptive psychopathology is the systematic description and classification of abnormal mental experiences as they are reported by the patient and observed by the clinician. It underpins the mental state examination and is tested in both Paper A (as foundational knowledge) and Paper B (as applied clinical skill). The SPMM syllabus section 5.22 covers this material in depth, and the exam rewards precise use of psychopathological terminology.</p>

      <h2>Disorders of Mood and Affect</h2>

      <p>Mood refers to a pervasive, sustained emotional state (the \u201cclimate\u201d of the mind). Affect refers to the moment-to-moment expression of emotion (the \u201cweather\u201d). Both have subjective (patient\u2019s report) and objective (clinician\u2019s observation) components. Key aspects of affect: valence (quality: happy, sad, anxious, perplexed), reactivity (responsiveness to environmental cues), range (restricted or constricted in depression), congruence (matching between expressed affect and reported emotion), stability (absence of emotional lability), and control (emotional incontinence in organic states).</p>

      <p><strong>Blunted affect:</strong> Reduced intensity of emotional expression. Bleuler proposed this as a fundamental (primary) symptom of schizophrenia. <strong>Flat affect:</strong> Near-absence of any emotional expression. <strong>Labile affect:</strong> Rapid, abrupt changes in emotion, seen in histrionic PD, BPD, and PTSD. <strong>Emotional incontinence:</strong> Extreme lability with no control, seen in organic states (pseudobulbar palsy, frontal lobe damage). <strong>Incongruent affect:</strong> Affect that does not match the expressed emotion or situation (e.g., laughing while describing distressing events, seen in hebephrenic schizophrenia and learning disability).</p>

      <p>Mixed affective states are common in bipolar disorder and are tested in the exam. A mixed state involves different combinations of mood, thought, and will components: manic stupor (high mood, low will, low thought), depressive mania (low mood, high will, high thought), and inhibited mania (high mood, low will, high thought).</p>

      <h2>Disorders of Perception</h2>

      <p><strong>Hallucinations:</strong> Perceptions without an external stimulus, occurring in any sensory modality. True hallucinations have the full quality of a genuine perception (vivid, real, located in objective space). <strong>Pseudohallucinations:</strong> Perceptions without external stimulus that are less vivid, occur in subjective inner space (inside the head), and are often recognised as not real by the patient. The distinction is debated but tested: pseudohallucinations are more commonly associated with non-psychotic conditions (personality disorder, PTSD).</p>

      <p><strong>Illusions:</strong> Misinterpretations of a real external stimulus (e.g., seeing a shadow as a person). Distinguish from hallucinations (no stimulus) and delusions (false belief, not perceptual).</p>

      <p><strong>Auditory hallucinations:</strong> Second-person (addressing the patient directly, \u201cyou are stupid\u201d) vs third-person (voices discussing the patient, \u201cshe deserves it\u201d). Schneider\u2019s first-rank symptoms: voices commenting, voices discussing, thought echo. Musical hallucinations occur in hearing impairment (Charles Bonnet syndrome, though Charles Bonnet syndrome classically involves visual hallucinations in the context of reduced eyesight).</p>

      <p><strong>Visual hallucinations:</strong> Formed (faces, people, animals) vs unformed (flashes, colours, patterns). Well-formed visual hallucinations with preserved insight suggest Charles Bonnet syndrome. Vivid, detailed, and accompanied by fluctuating cognition suggest DLB. Peduncular hallucinosis (Lhermitte syndrome) describes tiny figures (Lilliputian hallucinations) from midbrain lesions.</p>

      <p><strong>Functional hallucinations:</strong> A stimulus in one modality triggers a hallucination in the same modality (e.g., hearing voices triggered by the sound of running water). <strong>Reflex hallucinations:</strong> A stimulus in one modality triggers a hallucination in a different modality (e.g., seeing a face triggered by hearing a voice). These are rare but tested.</p>

      <p><strong>Extracampine hallucinations:</strong> Hallucinations occurring outside the sensory field (e.g., seeing someone who is behind the patient). <strong>Hypnagogic and hypnopompic:</strong> Hallucinations occurring while falling asleep (hypnagogic) or waking up (hypnopompic). These are normal experiences but also occur in narcolepsy.</p>

      <h2>Disorders of Thought</h2>

      <p><strong>Thought form (stream of thought):</strong> The rate and rhythm of thinking. Disorders include: pressure (racing thoughts, flight of ideas in mania), poverty (reduced quantity in depression or schizophrenia), retardation (slow thinking in depression), circumstantiality (unnecessary detail, but eventually reaches the goal), tangentiality (never reaches the goal, veers off), perseveration (persistent repetition of words or themes), thought blocking (sudden interruption of the train of thought, characteristic of schizophrenia), and derailment (loose associations, illogical connections, characteristic of schizophrenia).</p>

      <p><strong>Thought content:</strong> Overvalued ideas (reasonable but preoccupying beliefs held with less than delusional conviction, e.g., health anxiety), obsessions (recurrent, intrusive thoughts, images or impulses that the person recognises as their own and tries to resist), compulsions (repetitive behaviours performed in response to an obsession), delusions (fixed, false, culturally inappropriate beliefs held with complete conviction).</p>

      <p><strong>Delusions:</strong> Classified by content: persecutory (most common), grandiose, referential, erotomanic (De Clerambault syndrome: belief that someone, usually of higher status, is in love with the patient), nihilistic (Cotard syndrome: belief that one is dead or does not exist), somatic (hypochondriacal delusions, Ekbom syndrome: delusional parasitosis), jealousy (Othello syndrome: belief that partner is unfaithful). Schneider distinguished primary delusions (true delusions, not psychologically understandable, arising de novo) from secondary delusions (delusion-like ideas that are psychologically understandable given the patient\u2019s mood or life experience). Jaspers\u2019 criteria: true delusions are held with absolute certainty, are not amenable to reason, and are impossible in content.</p>

      <p><strong>Delusional perception:</strong> A Schneiderian first-rank symptom. A normal perception is suddenly invested with a new, delusional meaning (\u201cThe traffic light turned red, which means the Mafia are controlling my thoughts\u201d). This is distinct from a delusional idea (a belief that arises independently of a perception).</p>

      <h2>Disorders of Speech</h2>

      <p>Pressure of speech (rapid, abundant speech in mania), poverty of speech (reduced quantity in depression/schizophrenia), mutism (no speech, seen in catatonia, elective mutism), neologisms (new words created by the patient), word salad (incomprehensible jumble), clanging (speech driven by sound rather than meaning, e.g., rhyming), echolalia (pathological repetition of others\u2019 words), palilalia (repeating own words), and schizophasia (severe thought disorder). <strong>Dysphasias:</strong> Broca\u2019s (non-fluent, effortful, preserved comprehension), Wernicke\u2019s (fluent but meaningless, impaired comprehension), conduction (fluent, good comprehension, poor repetition), anomic (word-finding difficulty, fluent with circumlocution), transcortical motor (similar to Broca\u2019s but repetition preserved), transcortical sensory (similar to Wernicke\u2019s but repetition preserved), and global (all aspects severely impaired).</p>

      <h2>Disorders of Experience of Self</h2>

      <p>Depersonalisation (feeling detached from one\u2019s own mental processes or body), derealisation (feeling detached from one\u2019s surroundings, the world feels unreal), and passivity phenomena (Schneiderian first-rank: the experience that one\u2019s impulses, feelings, volitions, or bodily movements are controlled by an external force). <strong>Made impulses</strong> (actions imposed by external force), <strong>made volitions</strong> (acts of will replaced by external control), <strong>made affects</strong> (emotions imposed from outside), <strong>passivity of bodily function</strong> (bodily sensations imposed externally). These are pathognomonic for schizophrenia.</p>

      <h2>Memory Disorders</h2>

      <p>Amnesia (loss of memory): anterograde (difficulty forming new memories, hippocampal damage), retrograde (difficulty recalling past memories), transient global amnesia (temporary, affects both old and new memory, normal cognition otherwise). Paramnesias: delusional memory (false memory held with delusional conviction), confabulation (filling memory gaps with invented material, no intention to deceive, characteristic of Korsakoff syndrome), jamais vu (feeling of unfamiliarity with a familiar situation), deja vu (feeling of familiarity with a new situation).</p>

      <h2>Insight and Judgement</h2>

      <p>Insight is the patient\u2019s awareness and understanding of their mental condition. The standard grading: complete denial of illness (Grade 1), slight awareness of being different/blaming external factors (Grade 2), awareness but blames organic causes (Grade 3), intellectual insight (acknowledges illness but does not apply the knowledge to modify behaviour, Grade 4), true emotional insight (awareness that leads to change in behaviour and feelings, Grade 5).</p>

      <h2>High-Yield Exam Patterns</h2>
      <ul>
        <li><strong>First-rank symptoms of schizophrenia (Schneider):</strong> Voices commenting, voices discussing, thought echo, thought insertion/withdrawal/broadcast, passivity phenomena (made impulses, volitions, affects), delusional perception</li>
        <li><strong>Fundamental vs accessory symptoms (Bleuler):</strong> Four A\u2019s (loose Associations, Autism, Ambivalence, Affective blunting) = fundamental. Hallucinations, delusions, catatonia = accessory.</li>
        <li><strong>Verstehen vs erkl\u00e4ren (Jaspers):</strong> True delusions cannot be understood (erkl\u00e4ren, causal explanation only). Secondary delusions can be understood (verstehen, meaningful connections).</li>
        <li><strong>Cotard:</strong> Nihilistic delusion (dead, organs missing)</li>
        <li><strong>De Clerambault:</strong> Erotomania (someone of higher status loves the patient)</li>
        <li><strong>Othello syndrome:</strong> Delusional jealousy</li>
        <li><strong>Cappras syndrome:</strong> Delusion that familiar people have been replaced by imposters</li>
        <li><strong>Fregoli delusion:</strong> Strangers are familiar people in disguise</li>
        <li><strong>Charles Bonnet:</strong> Visual hallucinations with preserved insight, reduced eyesight</li>
        <li><strong>Lhermitte / peduncular hallucinosis:</strong> Lilliputian hallucinations, midbrain lesion</li>
        <li><strong>Ganser syndrome:</strong> Approximate answers (\u201c2+2=5\u201d), often in prisoners</li>
        <li><strong>Kluver-Bucy:</strong> Bilateral temporal damage, hypersexuality, hyperorality</li>
        <li><strong>Ekbom:</strong> Delusional parasitosis (also: restless legs)</li>
      </ul>

      <p>PsychStar\u2019s Paper A question bank covers descriptive psychopathology with questions calibrated to SPMM exam depth. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'rating-scales-and-eponyms-mrcpsych',
    title: 'Rating Scales, Eponyms, and Syndromes for MRCPsych: High-Yield Recall Guide',
    metaTitle: 'Rating Scales and Eponyms for MRCPsych | High-Yield Syndromes Guide',
    metaDescription: 'Rating scales and eponymous syndromes for MRCPsych Paper A and B. Hamilton, PANSS, MADRS, GAF, Y-BOCS, MMSE, and the key eponyms from Alzheimer to Wernicke for the exam.',
    date: '2026-06-17',
    readTime: '12 min read',
    category: 'Paper A',
    tags: ['rating scales', 'eponyms', 'syndromes', 'PANSS', 'MMSE', 'Hamilton', 'Paper A'],
    featured: false,
    content: `
      <p>Rating scales and eponymous syndromes appear consistently in both Paper A and Paper B. The exam tests knowledge of what each scale measures, the population it is validated for, and the number of items. Eponyms are tested by asking the candidate to identify the syndrome from a brief clinical description. This is one of the most pattern-recognition-heavy sections of the syllabus.</p>

      <h2>Rating Scales Used in Psychiatry</h2>

      <h3>Mood Disorders</h3>
      <p><strong>Hamilton Depression Rating Scale (HDRS / Ham-D):</strong> 17 items (the original version; 21-item and 24-item versions also exist). Clinician-rated. Covers depressed mood, guilt, suicide, insomnia, work/activities, retardation, agitation, anxiety (psychic and somatic), somatic symptoms (GI, general, genital), hypochondriasis, weight loss, and insight. Does NOT assess atypical symptoms (hypersomnia, hyperphagia) well. Scores: 0-7 normal, 8-13 mild, 14-18 moderate, 19-22 severe. A 50% reduction from baseline defines treatment response.</p>

      <p><strong>Montgomery-Asberg Depression Rating Scale (MADRS):</strong> 10 items, clinician-rated. More sensitive to change over time than the Hamilton, making it preferred for clinical trials. Items: apparent sadness, reported sadness, inner tension, reduced sleep, reduced appetite, concentration difficulties, lassitude, inability to feel, pessimistic thoughts, suicidal thoughts. Each item scored 0-6, total 0-60.</p>

      <p><strong>Beck Depression Inventory (BDI-II):</strong> 21 items, self-report. Corresponds to DSM criteria for major depression. Each item 0-3, total 0-63. 0-13 minimal, 14-19 mild, 20-28 moderate, 29-63 severe.</p>

      <p><strong>Patient Health Questionnaire (PHQ-9):</strong> 9 items, self-report. Widely used in primary care and IAPT services in the UK. Each item corresponds to DSM-5 diagnostic criteria. Total 0-27. A score of 10 or above has sensitivity and specificity of approximately 88% for major depression. The PHQ-2 is the two-item ultra-brief version (low mood and anhedonia) used as a screening tool.</p>

      <p><strong>Young Mania Rating Scale (YMRS):</strong> 11 items, clinician-rated. Used to assess severity of manic symptoms. Items include elevated mood, increased motor activity/energy, sexual interest, sleep, irritability, speech, language/thought disorder, content, disruptive/aggressive behaviour, appearance, and insight.</p>

      <h3>Psychotic Disorders</h3>
      <p><strong>PANSS (Positive and Negative Syndrome Scale):</strong> 30 items, clinician-rated. 7 positive items, 7 negative items, 16 general psychopathology items. Each item scored 1-7 (absent to extreme). The most widely used scale in schizophrenia clinical trials. The positive scale includes delusions, conceptual disorganisation, hallucinatory behaviour, excitement, grandiosity, suspiciousness/persecution, and hostility. The negative scale includes blunted affect, emotional withdrawal, poor rapport, passive/apathetic social withdrawal, difficulty in abstract thinking, lack of spontaneity/flow of conversation, and stereotyped thinking. The SAPS (Scale for Assessment of Positive Symptoms) and SANS (Scale for Assessment of Negative Symptoms) are an alternative with 30 and 25 items respectively.</p>

      <p><strong>BPRS (Brief Psychiatric Rating Scale):</strong> 18 items (original; expanded version has 24 items), clinician-rated. Shorter than PANSS, used for assessing change in clinical trials. Items rated 1-7. Covers psychotic symptoms, depression, anxiety, hostility, and activation.</p>

      <h3>Anxiety, OCD, PTSD</h3>
      <p><strong>Hamilton Anxiety Rating Scale (HAM-A):</strong> 14 items, clinician-rated. Covers both psychic anxiety (anxious mood, tension, fears, insomnia, intellectual, depressed mood, behaviour at interview) and somatic anxiety (somatic muscular, sensory, cardiovascular, respiratory, gastrointestinal, genitourinary, autonomic). Each item 0-4.</p>

      <p><strong>Yale-Brown Obsessive Compulsive Scale (Y-BOCS):</strong> 10 items, clinician-rated. 5 items for obsessions (time, interference, distress, resistance, control) and 5 identical items for compulsions. Total 0-40. Also includes a symptom checklist (not part of the severity score). A score of 0-7 is subclinical, 8-15 mild, 16-23 moderate, 24-31 severe, 32-40 extreme.</p>

      <p><strong>Impact of Events Scale (IES-R):</strong> 22 items, self-report. Measures subjective distress caused by traumatic events. Three subscales: intrusion, avoidance, and hyperarousal.</p>

      <h3>Dementia and Cognition</h3>
      <p><strong>Mini-Mental State Examination (MMSE):</strong> 30 items/points. Tests orientation (10), registration (3), attention and calculation (5), recall (3), language (8), and visuospatial function (1). Cut-off commonly used: 24/30 or below suggests dementia. Scores affected by age, education, and language. Copyright restrictions apply (can no longer be freely reproduced).</p>

      <p><strong>Montreal Cognitive Assessment (MoCA):</strong> 30 points. More sensitive than MMSE for mild cognitive impairment (MCI) and vascular dementia. Includes executive function (trail-making, clock drawing, verbal fluency), visuospatial, language, attention, abstraction, delayed recall, and orientation. Increasingly replacing MMSE in clinical practice. The Addenbrooke\u2019s Cognitive Exam (ACE-III) is another widely used alternative (100 points, includes MMSE items as subset). RUDAS (Rowland Universal Dementia Assessment Scale) is designed for culturally and linguistically diverse populations.</p>

      <p><strong>Clinical Dementia Rating (CDR):</strong> Global assessment of dementia severity (0 = no dementia, 0.5 = questionable, 1 = mild, 2 = moderate, 3 = severe) based on six domains: memory, orientation, judgement/problem-solving, community affairs, home/hobbies, personal care. Obtained from both patient and informant.</p>

      <h2>Eponymous Syndromes (High-Yield for EMI Questions)</h2>

      <p>The exam typically presents a brief clinical description and asks the candidate to identify the syndrome or eponym. The following are the most frequently tested:</p>

      <h3>Delusional Syndromes</h3>
      <ul>
        <li><strong>Capgras syndrome:</strong> Belief that familiar people have been replaced by identical-looking imposters. Most common in schizophrenia and dementia. Associated with right hemisphere lesions and face-processing deficits.</li>
        <li><strong>Fregoli syndrome:</strong> Belief that different strangers are in fact the same familiar person in disguise. Opposite of Capgras.</li>
        <li><strong>Cotard syndrome:</strong> Nihilistic delusions: belief that one is dead, does not exist, has lost organs, or has no blood. Most common in severe depression with psychosis. Can occur in schizophrenia.</li>
        <li><strong>De Clerambault syndrome (erotomania):</strong> Belief that someone, usually of higher social status, is in love with the patient. Most often in women; the target is often unobtainable. Can occur in schizophrenia, bipolar disorder.</li>
        <li><strong>Othello syndrome (morbid jealousy):</strong> Delusional belief of a partner\u2019s infidelity. Associated with alcohol misuse, organic brain syndromes, and schizophrenia. Can lead to domestic violence and homicide.</li>
        <li><strong>Ekbom syndrome (delusional parasitosis):</strong> Belief that the skin is infested with parasites. Associated with cocaine use and organic brain syndromes. Patients often present with skin lesions from picking or samples for the clinician to examine (matchbox sign).</li>
      </ul>

      <h3>Amnesic and Cognitive Syndromes</h3>
      <ul>
        <li><strong>Korsakoff syndrome:</strong> Anterograde amnesia with confabulation, caused by thiamine deficiency (usually alcohol-related). Pathology: mammillary body and dorsomedial thalamic atrophy.</li>
        <li><strong>Wernicke encephalopathy:</strong> Acute triad: confusion, ataxia, ophthalmoplegia (nystagmus). Also thiamine deficiency. Immediate parenteral thiamine (Pabrinex) prevents progression to Korsakoff.</li>
        <li><strong>Gerstmann syndrome:</strong> Dominant parietal lobe lesion (usually angular gyrus). Tetrad: finger agnosia, agraphia, right-left disorientation, acalculia.</li>
        <li><strong>Balint syndrome:</strong> Bilateral superior parieto-occipital lesions. Triad: simultanagnosia (cannot perceive the visual field as a whole), optic ataxia (misreaching), and oculomotor apraxia (difficulty shifting gaze).</li>
        <li><strong>Anton syndrome:</strong> Denial of blindness with confabulation; bilateral occipital cortex lesions. The patient acts as if they can see despite objective blindness.</li>
        <li><strong>Geschwind syndrome:</strong> Interictal behaviour in temporal lobe epilepsy: hyposexuality, hyperreligiosity, hypergraphia, and viscosity (difficulty ending conversations).</li>
      </ul>

      <h3>Neurological and Personality Syndromes</h3>
      <ul>
        <li><strong>Kl\u00fcver-Bucy syndrome:</strong> Bilateral temporal lobe (amygdala) damage. Hyperorality, hypersexuality, visual agnosia (psychic blindness), emotional blunting, bulimia, hypermetamorphosis (excessive exploration of environment).</li>
        <li><strong>Kleine-Levin syndrome:</strong> Recurrent episodes of hypersomnia, hyperphagia, and hypersexuality. Classically in adolescent males. Episodes last days to weeks, separated by months of normal functioning.</li>
        <li><strong>Ganser syndrome:</strong> Approximate answers to simple questions (\u201c2+2=5\u201d), often accompanied by disorientation, hallucinations, and conversion symptoms. Classically described in prisoners; debated relationship to factitious disorder or dissociative disorder.</li>
        <li><strong>M\u00fcnchausen syndrome:</strong> Factitious disorder with physical symptoms. The patient feigns or induces illness to assume the sick role. M\u00fcnchausen by proxy (fabricated or induced illness in a dependent). In the ICD-11, this is classified within the category of factitious disorder.</li>
        <li><strong>Briquet syndrome:</strong> An older term for somatisation disorder; multiple somatic complaints across organ systems as a manifestation of anxiety.</li>
        <li><strong>Da Costa syndrome:</strong> Older term for panic disorder; the experience of anxiety attacks accompanied by attempts to avoid them.</li>
        <li><strong>Heller syndrome:</strong> Childhood disintegrative disorder; loss of milestones after age 2 in multiple domains.</li>
      </ul>

      <h3>Movement and Catatonia Syndromes</h3>
      <ul>
        <li><strong>Kahlbaum syndrome:</strong> Catatonia; waxy posturing or purposeless excitement, treatable with benzodiazepines and ECT.</li>
        <li><strong>Bell mania:</strong> Disorganised hyperactivity (as opposed to waxy flexibility) in lethal catatonia; rare due to antipsychotics.</li>
        <li><strong>Gjessing syndrome:</strong> Periodic catatonia; fluctuating withdrawal or agitation.</li>
        <li><strong>Meige syndrome:</strong> Dystonic blepharospasm; often antipsychotic-induced (hypodopaminergic state).</li>
        <li><strong>Brueghel syndrome:</strong> Trigeminal dystonia affecting the mouth; sometimes provoked by antipsychotics.</li>
      </ul>

      <h2>High-Yield Fact Summary</h2>
      <ul>
        <li><strong>HAM-D vs MADRS:</strong> Both 17/10 items, clinician-rated for depression. MADRS more sensitive to change (favoured in trials).</li>
        <li><strong>PANSS:</strong> 30 items (7 positive, 7 negative, 16 general). Most common schizophrenia trial scale.</li>
        <li><strong>Y-BOCS:</strong> 10 items (5 obsessions, 5 compulsions). Score 0-40.</li>
        <li><strong>MMSE vs MoCA:</strong> MMSE 30 points, insensitive to MCI. MoCA 30 points, more sensitive to MCI and vascular dementia.</li>
        <li><strong>PHQ-9:</strong> 9 items, self-report, 0-27. Score >=10 = 88% sens/spec for major depression.</li>
        <li><strong>ACE-III:</strong> 100 points, includes MMSE items plus more executive and language testing.</li>
        <li><strong>RUDAS:</strong> Designed for culturally diverse populations; does not rely on reading/writing.</li>
        <li><strong>CDR:</strong> 0-3 dementia staging (0=none, 0.5=questionable, 1=mild, 2=moderate, 3=severe).</li>
      </ul>

      <p>PsychStar\u2019s question banks for both Paper A and Paper B include dedicated eponym and rating scale questions. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'oed-and-related-disorders-mrcpsych-paper-b',
    title: 'OCD and Related Disorders for MRCPsych Paper B: Diagnosis, Treatment, and Exam Patterns',
    metaTitle: 'OCD for MRCPsych Paper B | Y-BOCS, ERP, NICE Guidelines',
    metaDescription: 'OCD and related disorders for MRCPsych Paper B. ICD-11 diagnostic criteria, CBT with ERP, NICE stepped care model, Y-BOCS scoring, and recall-confirmed exam patterns.',
    date: '2026-06-17',
    readTime: '11 min read',
    category: 'Paper B',
    tags: ['OCD', 'obsessive-compulsive', 'exposure and response prevention', 'Y-BOCS', 'body dysmorphic', 'Paper B'],
    featured: false,
    content: `
      <p>OCD and related disorders appear in Paper B as part of the anxiety and obsessive-compulsive spectrum. The ICD-11 introduced a new grouping for obsessive-compulsive and related disorders, separating them from anxiety disorders. This change is examined. Body dysmorphic disorder, hoarding disorder, trichotillomania, and excoriation disorder are included in this grouping. NICE guidance CG31 (2005, updated 2024) provides the treatment algorithm.</p>

      <h2>ICD-11 Classification</h2>

      <p>ICD-11 created a separate chapter for obsessive-compulsive and related disorders, distinct from anxiety and fear-related disorders. This is an important change from ICD-10 (where OCD was classified under neurotic, stress-related, and somatoform disorders). Conditions included: OCD, body dysmorphic disorder (BDD), olfactory reference disorder, hypochondriasis (illness anxiety disorder), hoarding disorder, trichotillomania (hair-pulling disorder), and excoriation disorder (skin-picking).</p>

      <p><strong>OCD diagnostic criteria (ICD-11):</strong> Either obsessions, compulsions, or both. Obsessions are repetitive, intrusive thoughts, images, or impulses that are unwanted and cause anxiety. Compulsions are repetitive behaviours or mental acts that the person feels driven to perform in response to an obsession or according to rigid rules. The symptoms must be time-consuming (more than 1 hour per day), cause marked distress or functional impairment, and not be attributable to another medical condition. The person usually recognises the obsessions and compulsions as excessive or unreasonable (insight specifier: good/fair, poor, absent/delusional).</p>

      <p><strong>Body dysmorphic disorder:</strong> Preoccupation with perceived defects or flaws in physical appearance that are not observable or appear only slight to others. Repetitive behaviours (checking mirrors, comparing, camouflaging, seeking reassurance). A recall question confirmed: <em>\u201cBody dysmorphic disorder in adolescents\u201d</em> \u2014 increased risk of self-harm and suicide (NOT benign, NOT self-limiting).</p>

      <h2>NICE Treatment for OCD (CG31)</h2>

      <p><strong>Stepped care for OCD:</strong> Step 1: Recognition and assessment (use Y-BOCS). Step 2: Mild functional impairment \u2014 brief CBT (less than 10 therapist hours) incorporating ERP, either individual or group, or guided self-help. Step 3: Moderate to severe functional impairment \u2014 more intensive CBT (more than 10 therapist hours) incorporating ERP, or an SSRI (first-line: fluoxetine, fluvoxamine, sertraline, paroxetine, citalopram) plus ongoing CBT/ERP. Step 4: Severe, complex, or treatment-resistant OCD \u2014 combined SSRI + CBT/ERP, multidisciplinary review. Consider augmentation with clomipramine (the TCA with the best evidence in OCD), or antipsychotic augmentation (risperidone, aripiprazole).</p>

      <p><strong>Key treatment points for the exam:</strong> ERP is the essential psychological intervention (not just general CBT). The key principle: exposure to the trigger without performing the compulsion leads to habituation and extinction of the anxiety response. Response prevention is the critical component. The SSRI dose for OCD is generally higher than for depression and takes longer to work (8-12 weeks for response, compared to 4-6 weeks for depression). Clomipramine is highly effective but less well-tolerated due to anticholinergic side effects. NICE does NOT recommend clomipramine as first-line \u2014 SSRIs are preferred.</p>

      <p><strong>Treatment-resistant OCD:</strong> NICE recommends adding an antipsychotic (risperidone has the best evidence, aripiprazole is also used). For severe refractory OCD, consider intensive inpatient or residential treatment. A recall question tested: <em>\u201cWhat is approved by NICE for refractory OCD?\u201d</em> \u2014 Anterior cingulotomy or DBS (deep brain stimulation) were the options, with DBS having more current evidence. Anterior cingulotomy is a neurosurgical ablation procedure that is rarely performed in the UK.</p>

      <h2>Comorbidity (Recall-Confirmed)</h2>

      <p>A recall question tested: <em>\u201cMost common comorbidity in OCD in adults?\u201d</em> \u2014 Major depressive disorder (NOT OCPD, GAD, or social anxiety). Another question: <em>\u201cMost common comorbidity in OCD in children?\u201d</em> \u2014 Depression again, not GAD. Depression is the most common comorbid condition in OCD across all age groups. Approximately 30-50% of OCD patients have lifetime major depression.</p>

      <p><strong>OCD vs OCPD (anankastic personality disorder):</strong> OCD involves ego-dystonic obsessions and compulsions (the patient recognises them as unreasonable, experiences distress). OCPD is ego-syntonic (the patient believes their perfectionism and orderliness are appropriate). OCPD is a personality pattern, not an anxiety disorder. This distinction is frequently examined.</p>

      <h2>PANDAS</h2>

      <p>Paediatric Autoimmune Neuropsychiatric Disorders Associated with Streptococcal Infections (PANDAS): Sudden onset of OCD symptoms and/or tics following group A streptococcal infection in children. The mechanism is cross-reactive antibodies against basal ganglia. The exam may ask about this as a phenomenon, though its clinical significance is debated and it is not a formal ICD-11 diagnosis. Sydenham\u2019s chorea following rheumatic fever is a better-established post-streptococcal neuropsychiatric syndrome with OCD features.</p>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>ICD-11 change for OCD:</strong> Separate chapter from anxiety disorders, includes BDD, hoarding, trichotillomania, excoriation, hypochondriasis, olfactory reference disorder</li>
        <li><strong>First-line psychological treatment for OCD:</strong> CBT incorporating ERP (Exposure and Response Prevention)</li>
        <li><strong>First-line medication for OCD:</strong> SSRI at higher doses than depression (fluoxetine 40-60mg, sertraline 150-200mg, citalopram 40-60mg)</li>
        <li><strong>Augmentation for treatment-resistant OCD:</strong> Antipsychotic (risperidone first-line evidence)</li>
        <li><strong>BDD in adolescents:</strong> Increased suicide/self-harm risk, NOT benign</li>
        <li><strong>OCD most common comorbidity:</strong> Major depressive disorder (adults and children)</li>
        <li><strong>OCD vs OCPD:</strong> Ego-dystonic vs ego-syntonic. OCD has obsessions/compulsions, OCPD has perfectionism/orderliness.</li>
        <li><strong>Clomipramine:</strong> Effective but anticholinergic burden limits use. Third-line.</li>
        <li><strong>Y-BOCS:</strong> 10 items (5 obsessions + 5 compulsions), 0-40. Most common OCD severity scale.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers OCD and related disorders with questions aligned to real exam difficulty. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'eating-disorders-mrcpsych-paper-b',
    title: 'Eating Disorders for MRCPsych Paper B: Anorexia, Bulimia, and Binge-Eating Disorder',
    metaTitle: 'Eating Disorders for MRCPsych Paper B | Anorexia, Bulimia & NICE Guidelines',
    metaDescription: 'Eating disorders for MRCPsych Paper B. ICD-11 criteria for anorexia and bulimia nervosa, NICE stepped-care treatment, medical complications, and recall-confirmed exam patterns.',
    date: '2026-06-17',
    readTime: '11 min read',
    category: 'Paper B',
    tags: ['eating disorders', 'anorexia nervosa', 'bulimia nervosa', 'binge eating', 'refeeding syndrome', 'Paper B'],
    featured: false,
    content: `
      <p>Eating disorders appear in Paper B as part of general adult psychiatry and feeding and eating disorders under ICD-11. The conditions tested are anorexia nervosa (including its medical complications), bulimia nervosa, and binge-eating disorder. Recall questions confirm that specific electrolyte disturbances, refeeding risks, and treatment approaches for adolescents are recurring themes.</p>

      <h2>ICD-11 Diagnostic Criteria</h2>

      <p><strong>Anorexia nervosa:</strong> Significantly low body weight (BMI below 18.5 in adults, or below the 5th percentile in children/adolescents) that is less than minimal expected for the individual\u2019s age, sex, and developmental trajectory. The weight loss is caused by restricted energy intake relative to energy requirements. There is an intense fear of weight gain or persistent behaviour that prevents weight gain, and body image disturbance (weight or shape overvalued in self-evaluation, or persistent lack of recognition of the seriousness of the low weight). Anorexia may be restricting type (weight loss primarily through dieting/fasting) or binge-purge type (regular binge eating or purging behaviours). The ICD-11 removed the requirement for amenorrhea (which was in ICD-10). The BMI thresholds for severity: mild (BMI 17-18.5), moderate (16-17), severe (15-16), extreme (less than 15).</p>

      <p><strong>Bulimia nervosa:</strong> Recurrent episodes of binge eating (eating an abnormally large amount of food in a discrete period with a sense of loss of control) occurring at least once per week for at least 1 month. Recurrent compensatory behaviours to prevent weight gain (vomiting, laxatives, diuretics, fasting, excessive exercise). Self-evaluation is unduly influenced by weight and shape. In contrast to anorexia, weight is usually within the normal range or overweight.</p>

      <p><strong>Binge-eating disorder:</strong> Recurrent binge eating (as above) WITHOUT regular compensatory behaviours. Binge-eating episodes are associated with eating more rapidly than normal, eating until uncomfortably full, eating large amounts when not hungry, eating alone because of embarrassment, and feeling disgusted, depressed, or guilty afterwards. Distress about binge eating is required. Occurs at least once per week for 3 months.</p>

      <p><strong>Exam pattern — prevalence:</strong> A recall question tested comparisons of prevalence. The key facts: bulimia nervosa is more common than anorexia nervosa. Lifetime prevalence: anorexia ~0.5-1%, bulimia ~1-2%, binge-eating disorder ~2-3%. All eating disorders are increasing in prevalence across developed countries.</p>

      <h2>Medical Complications (High-Yield for Recall Questions)</h2>

      <p><strong>Anorexia nervosa:</strong> The most concerning electrolyte abnormality is hypokalaemia (especially in the binge-purge subtype). ECG findings in hypokalaemia: U waves, prolonged QT, T wave inversion, ST depression. A recall question: <em>\u201cAnorexic girl, abusing diuretics and laxatives, presents with lethargy and muscle cramps \u2014 likely ECG finding?\u201d</em> Answer: hypokalaemia-related ECG changes (U waves, long PR). Other complications: bradycardia, hypotension, osteoporosis, delayed gastric emptying, constipation, hypothermia, lanugo hair, salivary gland hypertrophy (from vomiting), dental erosion (perimolysis), Russell\u2019s sign (knuckle calluses from self-induced vomiting), refeeding syndrome (hypophosphataemia, hypokalaemia, hypomagnesaemia, fluid shifts, cardiac arrhythmia) when nutrition is reintroduced too aggressively.</p>

      <p><strong>Bulimia nervosa:</strong> Hypokalaemia from vomiting or laxative use is the most dangerous complication. Calluses on knuckles (Russell\u2019s sign), salivary gland hypertrophy (parotid enlargement), dental erosion, oesophageal tears (Mallory-Weiss syndrome), and aspiration pneumonitis. Unlike anorexia, the BMI is normal or elevated, so medical complications may be overlooked.</p>

      <p><strong>Refeeding syndrome:</strong> Occurs within 4 days of reintroducing nutrition after a period of starvation. The hallmark is hypophosphataemia (phosphate moves from serum into cells during refeeding). Other features: hypokalaemia, hypomagnesaemia, fluid overload, cardiac arrhythmia, delirium, seizures, and death. Prevention: start refeeding at low calorie levels (5-10 kcal/kg/day for the first 3-5 days), monitor phosphate, potassium, magnesium daily, and replace electrolytes aggressively. NICE guidance for inpatient refeeding. This is a high-yield exam topic.</p>

      <h2>NICE Treatment Guidelines (NG69)</h2>

      <p><strong>Anorexia nervosa:</strong> Psychological therapy is first-line. For adolescents, family therapy (specifically the Maudsley model, involving parents in refeeding) is the first-line psychological treatment. This is a high-yield distinction from bulimia, where individual CBT is first-line. For adults, CBT-ED (adapted for eating disorders), focal psychodynamic therapy, and cognitive analytic therapy have evidence. Weight restoration is the primary goal in the underweight patient. No medication is licensed for anorexia specifically. Olanzapine has some evidence for promoting weight gain and reducing anorexic cognitions but is not first-line. There is strong evidence that SSRIs are NOT effective in the underweight anorexic patient \u2014 they become effective only after weight restoration.</p>

      <p><strong>Bulimia nervosa:</strong> CBT-ED (16-20 sessions) is first-line. SSRI medication (fluoxetine 60mg is the only licensed dose for bulimia) is an alternative or adjunct. The high dose (60mg) is specific to bulimia and differs from the depression dose. SSRIs are more effective than placebo for reducing binge eating and purging, with an approximately 60% reduction in binge frequency. Combined treatment (CBT-ED + SSRI) is no more effective than CBT-ED alone for long-term outcomes.</p>

      <p><strong>Binge-eating disorder:</strong> CBT-ED is first-line. Self-help approaches (guided CBT-based self-help) can be effective for less severe cases. Lisdexamfetamine has evidence for reducing binge frequency and is licensed in some jurisdictions (USA) but not routinely in the UK.</p>

      <h2>Prognosis and Mortality</h2>

      <p>Anorexia nervosa has the highest mortality rate of any psychiatric disorder (standardised mortality ratio approximately 5-6). Death is from medical complications (starvation, electrolyte disturbance) or suicide. The crude mortality rate is about 5-10% over 10-20 years. Bulimia has a lower mortality rate (SMR approximately 2). Recovery rates: approximately 50% of anorexia patients recover completely, 30% improve partially, 20% have a chronic illness trajectory. For bulimia, recovery rates are higher (approximately 60-70% with treatment). Suicide risk is elevated in all eating disorders but highest in anorexia.</p>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>Most concerning electrolyte disturbance in anorexia:</strong> Potassium (hypokalaemia) \u2014 risk of cardiac arrhythmia. NOT bicarbonate, phosphate alone</li>
        <li><strong>ECG finding in laxative/diuretic abuse + anorexia:</strong> U waves, long PR, T inversion (hypokalaemia)</li>
        <li><strong>Adolescent anorexia first-line treatment:</strong> Family therapy (Maudsley model)</li>
        <li><strong>Bulimia first-line treatment:</strong> CBT-ED (16-20 sessions). SSRI fluoxetine 60mg is alternative.</li>
        <li><strong>Fluoxetine dose for bulimia:</strong> 60mg (not 20mg, not 40mg)</li>
        <li><strong>SSRIs in underweight anorexia:</strong> NOT effective until weight restored</li>
        <li><strong>Refeeding syndrome key marker:</strong> Hypophosphataemia — start refeeding at 5-10 kcal/kg/day</li>
        <li><strong>Russell\u2019s sign:</strong> Knuckle calluses from self-induced vomiting (bulimia, anorexia binge-purge type)</li>
        <li><strong>Salivary gland enlargement:</strong> Parotid hypertrophy from vomiting (bulimia)</li>
        <li><strong>Highest mortality psychiatric disorder:</strong> Anorexia nervosa (SMR 5-6)</li>
        <li><strong>Bulimia more common than anorexia:</strong> Yes. And all EDs increasing across developed countries.</li>
        <li><strong>Binge-eating disorder vs bulimia:</strong> BED has NO regular compensatory behaviours. This is the key distinction.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers eating disorders with questions calibrated to real exam difficulty. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'anxiety-disorders-trauma-mrcpsych-paper-b',
    title: 'Anxiety Disorders, Trauma, and Stressor-Related Disorders for MRCPsych Paper B',
    metaTitle: 'Anxiety Disorders for MRCPsych Paper B | GAD, Panic, PTSD, Phobias',
    metaDescription: 'Anxiety disorders, trauma and stressor-related disorders for MRCPsych Paper B. GAD, panic disorder, PTSD, phobias, ICD-11 criteria, NICE stepped care, and recall patterns.',
    date: '2026-06-17',
    readTime: '12 min read',
    category: 'Paper B',
    tags: ['anxiety disorders', 'PTSD', 'panic disorder', 'GAD', 'phobias', 'ICD-11', 'Paper B'],
    featured: false,
    content: `
      <p>Anxiety and fear-related disorders together with trauma and stressor-related disorders constitute a significant proportion of general adult psychiatry questions in Paper B. ICD-11 reorganised these conditions into two separate chapters: anxiety and fear-related disorders (GAD, panic disorder, agoraphobia, social anxiety disorder, specific phobia, separation anxiety disorder, selective mutism) and disorders specifically associated with stress (PTSD, complex PTSD, prolonged grief disorder, adjustment disorder, reactive attachment disorder, disinhibited social engagement disorder). This restructuring is examined.</p>

      <h2>Generalised Anxiety Disorder (GAD)</h2>

      <p><strong>ICD-11 criteria:</strong> Generalised anxiety disorder is characterised by marked symptoms of anxiety that are present most days over a period of at least 6 months. The core feature is generalised and persistent anxiety that is not restricted to any particular environmental circumstance (free-floating anxiety). Symptoms include motor tension (trembling, restlessness, headache), autonomic overactivity (palpitations, sweating, dry mouth, epigastric discomfort, dizziness), apprehensive expectation (worry about future events, excessive worry about everyday matters), and hypervigilance (difficulty concentrating, initial insomnia, irritability). The individual finds it difficult to control the worry.</p>

      <p><strong>NICE treatment (CG113):</strong> Step 1: Identification and assessment in primary care. Step 2: Low-intensity psychological intervention (guided self-help based on CBT principles, psychoeducation, monitoring). Step 3: High-intensity psychological intervention (CBT or applied relaxation, 12-15 sessions) OR an SSRI (sertraline first-line, then fluoxetine, citalopram, escitalopram or paroxetine). Step 4: If inadequate response, consider specialist review, alternative SSRI, or SNRI (venlafaxine, duloxetine), or pregabalin. Pregabalin has evidence for GAD but carries risk of dependence and is scheduled as a controlled drug under the Misuse of Drugs Act. Buspirone (5-HT1A partial agonist) is a non-sedating alternative but less effective.</p>

      <p><strong>GAD vs worry in healthy individuals:</strong> The key distinction is the pervasiveness, duration (6 months), and functional impairment. The worry in GAD is difficult to control and accompanied by somatic symptoms. Benzodiazepines are NOT recommended for long-term treatment of GAD beyond 2-4 weeks due to tolerance and dependence.</p>

      <h2>Panic Disorder and Agoraphobia</h2>

      <p><strong>ICD-11 criteria:</strong> Panic disorder is characterised by recurrent, unexpected panic attacks (discrete episodes of intense fear or discomfort accompanied by autonomic and cognitive symptoms) that are not restricted to specific situations or stimuli. The individual experiences persistent worry about future attacks and the implications of the attacks (e.g., fear of losing control, going mad, having a heart attack, dying). Agoraphobia involves fear and avoidance of situations from which escape might be difficult (crowds, public transport, open spaces, being outside the home alone). The two frequently co-occur but can be diagnosed independently in ICD-11.</p>

      <p><strong>Panic attack symptoms (any 4 of the following):</strong> Palpitations, sweating, trembling, shortness of breath, choking sensation, chest pain, nausea, dizziness, derealisation, fear of losing control, fear of dying, paraesthesias, chills or hot flushes. Panic attacks reach peak intensity within minutes and typically resolve within 20-30 minutes. They can be expected (cue-related, in response to a phobic stimulus) or unexpected (uncued, out of the blue).</p>

      <p><strong>NICE treatment (CG113):</strong> First-line psychological intervention: CBT for panic disorder (7-14 hours total). First-line medication: SSRI (sertraline, fluoxetine, or escitalopram). Avoid benzodiazepines beyond short-term crisis management (maximum 2-4 weeks). If no response to SSRI after 12 weeks, consider switching to another SSRI, SNRI (venlafaxine), or tricyclic (clomipramine). The combination of CBT + SSRI is more effective than either alone for moderate-severe panic disorder.</p>

      <h2>Social Anxiety Disorder (Social Phobia)</h2>

      <p><strong>ICD-11 criteria:</strong> Marked and disproportionate fear or anxiety about one or more social situations where the individual is exposed to possible scrutiny by others (e.g., conversations, meeting unfamiliar people, eating in public, performing). The individual fears that they will act in a way that will be negatively evaluated. The social situations are avoided or endured with intense fear. The symptoms persist for at least several months.</p>

      <p><strong>Treatment:</strong> First-line: individual CBT specifically for social anxiety (CBT-SA). Medication options: SSRI (escitalopram, sertraline, fluoxetine, paroxetine). SNRI (venlafaxine) is an alternative. The combination of CBT and SSRI is superior to either alone. Beta-blockers (propranolol) are sometimes used for performance anxiety (stage fright) but are not NICE-recommended for generalised social anxiety.</p>

      <p><strong>Key distinction — social anxiety vs schizotypal PD:</strong> A recall question tested this. Social anxiety involves fear of negative evaluation with desire for social connection. Schizotypal PD involves eccentric behaviour, magical thinking, perceptual distortions, and social anxiety that is more pervasive and accompanied by cognitive/perceptual oddities. Schizoid PD involves no desire for social connection.</p>

      <h2>Post-Traumatic Stress Disorder (PTSD)</h2>

      <p><strong>ICD-11 criteria:</strong> PTSD requires exposure to an event or situation of an extremely threatening or horrific nature (traumatic event). The core features are: 1) Re-experiencing the traumatic event in the present, involving vivid intrusive memories, flashbacks, or nightmares accompanied by strong emotions of fear or horror. 2) Deliberate avoidance of reminders of the trauma. 3) Persistent perceptions of heightened current threat (hypervigilance, exaggerated startle response). Symptoms must persist for at least several weeks and cause functional impairment. The ICD-11 simplified the PTSD criteria from ICD-10 (which had 6 clusters) to these 3 core clusters.</p>

      <p><strong>Complex PTSD (ICD-11 addition):</strong> In addition to the core PTSD symptoms, complex PTSD includes severe and pervasive disturbances in affect regulation (emotional dysregulation), negative self-concept (feelings of worthlessness, shame, guilt), and interpersonal difficulties (difficulty sustaining relationships, feeling distant from others). It is associated with prolonged, repeated, or multiple forms of traumatic exposure (childhood abuse, domestic violence, torture, genocide). This is a new ICD-11 category that may appear in the exam.</p>

      <p><strong>NICE treatment (NG116, updated 2024):</strong> First-line: trauma-focused psychological therapy. Options: trauma-focused CBT (TF-CBT), eye movement desensitisation and reprocessing (EMDR), or prolonged exposure therapy. These are recommended before medication. For adults, TF-CBT or EMDR (8-12 sessions). For children, TF-CBT. Medication: paroxetine or venlafaxine are recommended as second-line (when psychological therapy is declined or unavailable or not effective). Antipsychotics are NOT recommended for PTSD. Benzodiazepines should NOT be used. Early single-session debriefing (psychological debriefing) immediately after trauma is NOT recommended and may be harmful.</p>

      <p><strong>Risk factors for PTSD:</strong> Greater trauma severity, prior trauma history, prior psychiatric disorder, female sex, low social support, peritraumatic dissociation, and high emotional reactivity during the event.</p>

      <h2>Adjustment Disorder</h2>

      <p><strong>ICD-11 criteria:</strong> A maladaptive reaction to an identifiable psychosocial stressor (such as divorce, job loss, illness, or bereavement) that emerges within 1 month of the stressor. The reaction is characterised by preoccupation with the stressor and failure to adapt (symptoms of depression, anxiety, or behavioural disturbance). The condition typically resolves within 6 months if the stressor or its consequences are removed. The key distinction from major depression is the temporal relationship to the stressor and the absence of full depressive syndrome. Adjustment disorder can be acute (persists less than 3 months) or prolonged (persists 3-12 months).</p>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>GAD minimum duration:</strong> 6 months of symptoms present most days. Distinguishes it from adjustment disorder (1 month) and mixed anxiety-depression.</li>
        <li><strong>Panic attack physiological peak:</strong> Minutes. 20-30 minutes typical duration.</li>
        <li><strong>PTSD core symptom clusters (ICD-11):</strong> Re-experiencing, avoidance, hypervigilance (3 clusters, simplified from ICD-10 which had 6)</li>
        <li><strong>Complex PTSD added features:</strong> Affect dysregulation, negative self-concept, interpersonal difficulties — from prolonged/repeated trauma</li>
        <li><strong>First-line PTSD treatment:</strong> Trauma-focused CBT or EMDR (NOT medication)</li>
        <li><strong>Unhelpful PTSD intervention:</strong> Psychological debriefing (single session) — NOT recommended, may be harmful</li>
        <li><strong>Benzodiazepine role in anxiety:</strong> Maximum 2-4 weeks. Not for long-term treatment.</li>
        <li><strong>Pregabalin:</strong> Evidence for GAD but dependence risk. Controlled drug.</li>
        <li><strong>Beta-blockers:</strong> Propranolol for performance anxiety only (not generalised social anxiety)</li>
        <li><strong>Social anxiety vs schizotypal vs schizoid:</strong> Social anxiety = fear with desire for connection. Schizotypal = odd/eccentric + social anxiety. Schizoid = no desire for connection.</li>
        <li><strong>Prolonged grief disorder (ICD-11):</strong> Persistent and pervasive grief response lasting longer than 6 months, characterised by longing for the deceased, preoccupation with thoughts of the deceased, and intense emotional pain.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers anxiety disorders, PTSD, and trauma-related conditions with questions calibrated to real exam depth. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'sleep-disorders-mrcpsych-paper-b',
    title: 'Sleep Disorders for MRCPsych Paper B: Insomnia, Parasomnias, and Circadian Rhythm Disorders',
    metaTitle: 'Sleep Disorders for MRCPsych Paper B | Insomnia, Narcolepsy, Parasomnias',
    metaDescription: 'Sleep disorders for MRCPsych Paper B. Insomnia management, narcolepsy, sleep apnoea, parasomnias, restless legs, circadian rhythm disorders, and exam question patterns.',
    date: '2026-06-17',
    readTime: '10 min read',
    category: 'Paper B',
    tags: ['sleep disorders', 'insomnia', 'narcolepsy', 'sleep apnoea', 'parasomnias', 'restless legs', 'Paper B'],
    featured: false,
    content: `
      <p>Sleep disorders appear in Paper B as part of both general adult psychiatry and liaison psychiatry. Understanding the interface between psychiatric conditions and sleep disturbance is essential, as sleep complaints are common to almost every psychiatric disorder but also represent primary sleep disorders that require specific management. The ICSD-3 (International Classification of Sleep Disorders) is the specialist classification, though ICD-11 is the reference for the exam.</p>

      <h2>Insomnia Disorder</h2>

      <p><strong>ICD-11 criteria:</strong> Insomnia disorder is characterised by difficulty initiating or maintaining sleep, or early morning waking, that occurs at least several times per week for at least 3 months and is associated with significant daytime distress or functional impairment (fatigue, mood disturbance, cognitive impairment, reduced performance). The sleep disturbance must occur despite adequate opportunity for sleep. Primary insomnia is distinguished from insomnia secondary to another mental disorder (e.g., depression, anxiety) or to a medical condition (e.g., pain, hyperthyroidism) \u2014 though in practice, insomnia frequently co-occurs with these conditions and both should be treated.</p>

      <p><strong>NICE treatment (CG34):</strong> First-line is non-pharmacological: CBT for insomnia (CBT-I) — stimulus control, sleep restriction, cognitive restructuring, relaxation, sleep hygiene education. Sleep hygiene alone (regular sleep schedule, avoid caffeine/alcohol before bed, cool dark quiet room, avoid screens) is recommended as a first step but is insufficient for moderate-severe insomnia. Medication should be considered only when CBT-I is not available or has been ineffective. Z-drugs (zopiclone, zolpidem, zaleplon) and benzodiazepines are effective short-term but should be prescribed at the lowest dose for the shortest possible time (maximum 2-4 weeks) due to tolerance, dependence, and withdrawal risks. Melatonin (prolonged-release) is licensed for primary insomnia in patients aged 55 and over. Melatonin is also used for sleep-onset insomnia in children with ADHD or autism (off-label). Antidepressants with sedative properties (mitrazapine, trazodone, amitriptyline) are sometimes used for insomnia associated with depression but are not licensed for primary insomnia.</p>

      <p><strong>Exam key point:</strong> CBT-I is the first-line treatment. Z-drugs are second-line, short-term only. Antihistamines (promethazine, diphenhydramine) have minimal evidence and significant daytime sedation.</p>

      <h2>Sleep-Related Breathing Disorders</h2>

      <p><strong>Obstructive sleep apnoea (OSA):</strong> Collapse of the upper airway during sleep leading to repetitive apnoeas (cessation of breathing for >10 seconds) and hypopnoeas, with associated oxygen desaturations and arousals from sleep. Symptoms: loud snoring, witnessed apnoeas, gasping or choking at night, excessive daytime sleepiness, morning headaches, irritability, poor concentration, low libido. Risk factors: obesity (especially neck circumference >40cm), male sex, older age, smoking, alcohol before sleep, craniofacial abnormalities. The STOP-BANG questionnaire (Snoring, Tiredness, Observed apnoea, Pressure/BP, BMI>35, Age>50, Neck circumference>40, Gender=male) screens for OSA. Diagnosis is by overnight polysomnography (AHI — Apnoea-Hypopnoea Index). Treatment: CPAP (continuous positive airway pressure) is first-line. Alternative: mandibular advancement devices, weight loss, positional therapy. OSA is associated with hypertension, cardiovascular disease, stroke, type 2 diabetes, and depression.</p>

      <p><strong>Central sleep apnoea:</strong> Cessation of respiratory effort due to loss of brainstem drive (not airway obstruction). Associated with heart failure, opioid use, and stroke. Treatment: adaptive servo-ventilation (ASV) or treating the underlying cause.</p>

      <p><strong>Psychiatric relevance:</strong> OSA frequently presents with depressive symptoms, fatigue, and cognitive complaints that are misattributed to primary depression. Treatment of OSA with CPAP improves these symptoms. The exam may present a patient with treatment-resistant depression and risk factors for OSA \u2014 the correct answer is to screen for sleep apnoea.</p>

      <h2>Central Disorders of Hypersomnolence</h2>

      <p><strong>Narcolepsy (G\u00e9lineau syndrome):</strong> Tetrad of symptoms: 1) Excessive daytime sleepiness (the most disabling symptom, with irresistible sleep attacks). 2) Cataplexy (sudden bilateral loss of muscle tone triggered by strong emotions, especially laughter or surprise — the patient may have head drooping, jaw sagging, or fall to the ground, while remaining fully conscious throughout). 3) Sleep paralysis (inability to move or speak on waking or falling asleep). 4) Hypnagogic/hypnopompic hallucinations (vivid dreamlike experiences, often frightening, occurring at sleep onset or waking). Narcolepsy type 1 has cataplexy; type 2 does not. Pathophysiology: loss of hypocretin (orexin) neurons in the lateral hypothalamus, likely autoimmune-mediated. Associated with HLA-DQB1*0602. Onset typically in adolescence or young adulthood. Diagnosis by polysomnography and Multiple Sleep Latency Test (MSLT) showing mean sleep latency of less than 8 minutes and 2 or more sleep-onset REM periods. Treatment: modafinil (first-line for daytime sleepiness, a wakefulness-promoting agent with low abuse potential), methylphenidate, dexamfetamine. Cataplexy: sodium oxybate (gamma-hydroxybutyrate) or antidepressants (venlafaxine, clomipramine) that suppress REM sleep.</p>

      <p><strong>Kleine-Levin syndrome:</strong> Recurrent episodes of hypersomnia (sleeping 16-20 hours/day) lasting days to weeks, accompanied by hyperphagia, hypersexuality, and behavioural changes. Classically in adolescent males. Normal functioning between episodes. Ursodeoxycholic acid and lithium have some evidence for prophylaxis.</p>

      <p><strong>Idiopathic hypersomnia:</strong> Excessive daytime sleepiness without cataplexy and with long (often unrefreshing) naps. Distinguish from narcolepsy by the absence of REM-specific phenomena and the length of naps.</p>

      <h2>Circadian Rhythm Sleep-Wake Disorders</h2>

      <p>Disruption of the endogenous circadian pacemaker in the suprachiasmatic nucleus of the hypothalamus. Types: delayed sleep-wake phase (night owls \u2014 most common, common in adolescents), advanced sleep-wake phase (early birds, more common in older adults), irregular sleep-wake rhythm (disorganised, no clear circadian pattern, common in dementia), non-24-hour (free-running, common in blind individuals), shift work disorder, and jet lag disorder. Treatment: timed melatonin, bright light therapy (morning light for delayed phase, evening light for advanced phase), and strict sleep scheduling.</p>

      <h2>Parasomnias</h2>

      <p><strong>Non-REM parasomnias (disorders of arousal):</strong> Confusional arousals (awakening confused, disoriented), sleepwalking (ambulation during NREM sleep), and sleep terrors (screaming, autonomic arousal, no dream recall). These occur during NREM stage 3 (slow-wave sleep), usually in the first third of the night. The patient has no memory of the event and cannot be easily awakened. Common in children, typically resolves with age. Treatment: reassurance, sleep hygiene, safety measures. In severe cases: clonazepam or scheduled awakenings.</p>

      <p><strong>REM parasomnias:</strong> REM sleep behaviour disorder (RBD): loss of the normal muscle atonia during REM sleep, causing the patient to act out dreams (punching, kicking, shouting). Classically associated with synucleinopathies (Parkinson\u2019s disease, DLB, multiple system atrophy). Can precede the onset of Parkinson\u2019s disease by years or decades. Treatment: clonazepam (first-line) or melatonin. Nightmare disorder: recurrent, unpleasant, well-remembered dreams. Treatment: imagery rehearsal therapy (IRT), prazosin for PTSD-associated nightmares.</p>

      <p><strong>Sleep-related movement disorders:</strong> Restless legs syndrome (Willis-Ekbom disease): distressing urge to move the legs, worse at rest, partially relieved by movement, worse in the evening or at night. Associated with iron deficiency (check ferritin), renal failure, pregnancy, and dopaminergic medications. Treatment: dopamine agonists (pramipexole, ropinirole — first-line), gabapentin, clonazepam. Periodic limb movement disorder: repetitive, stereotyped limb movements (typically dorsiflexion of the toes and ankle) during sleep, often associated with restless legs, causing arousals and daytime sleepiness.</p>

      <h2>Bruxism</h2>

      <p>Clenching or grinding of teeth during sleep, associated with stress, anxiety, and certain substances (serotonergic antidepressants, caffeine, alcohol). Can cause tooth wear and jaw pain. Treatment: occlusal splints (mouth guards), stress reduction, avoiding triggers. Clonazepam or botulinum toxin in severe cases.</p>

      <h2>Sleep and Psychiatric Medication</h2>

      <p>The effect of psychiatric medications on sleep is tested: SSRIs suppress REM sleep (can worsen restless legs and cause teeth grinding), mitrazapine improves sleep continuity (H1 blockade), olanzapine and quetiapine are sedating (H1, 5-HT2C), bupropion is activating (can worsen insomnia), modafinil is wake-promoting, melatonin promotes sleep onset. Antipsychotics with significant H1 blockade (olanzapine, quetiapine, chlorpromazine) improve sleep continuity. Clozapine causes hypersalivation that can worsen sleep for the patient.</p>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>First-line insomnia treatment:</strong> CBT-I. Z-drugs second-line, short-term (max 2-4 weeks).</li>
        <li><strong>Narcolepsy tetrad:</strong> EDS, cataplexy (emotional trigger, preserved consciousness), sleep paralysis, hypnagogic hallucinations</li>
        <li><strong>Cataplexy triggered by:</strong> Strong emotions, especially laughter. Key distinguishing feature from seizure/psychogenic.</li>
        <li><strong>First-line for EDS in narcolepsy:</strong> Modafinil (wakefulness-promoting, low abuse potential)</li>
        <li><strong>First-line for cataplexy:</strong> Sodium oxybate, or antidepressants (venlafaxine, clomipramine) — REM suppressants</li>
        <li><strong>OSA screening tool:</strong> STOP-BANG — snoring, tiredness, observed apnoea, pressure, BMI>35, age>50, neck>40cm, male</li>
        <li><strong>OSA first-line treatment:</strong> CPAP. Weight loss and MAD are alternatives.</li>
        <li><strong>Restless legs first-line:</strong> Pramipexole or ropinirole (dopamine agonists). Check ferritin first.</li>
        <li><strong>REM sleep behaviour disorder:</strong> Acting out dreams, loss of muscle atonia. Associated with synucleinopathies (PD, DLB). Treat with clonazepam.</li>
        <li><strong>Sleep terrors vs nightmares:</strong> Terrors = NREM stage 3 (first third of night), no recall, screaming. Nightmares = REM (last third), well-remembered.</li>
        <li><strong>Kleine-Levin:</strong> Hypersomnia + hyperphagia + hypersexuality in adolescent males. Episodic.</li>
        <li><strong>Melatonin licensed for:</strong> Patients aged 55+ with primary insomnia (prolonged-release). Also used off-label for circadian phase disorders.</li>
        <li><strong>Prazosin for:</strong> PTSD-associated nightmares</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers sleep disorders with questions calibrated to real exam style. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'learning-disability-mrcpsych-paper-b',
    title: 'Learning Disability (Intellectual Disability) for MRCPsych Paper B',
    metaTitle: 'Learning Disability for MRCPsych Paper B | ICD-11, Behavioural Phenotypes',
    metaDescription: 'Learning disability / intellectual disability for MRCPsych Paper B. ICD-11 classification, behavioural phenotypes of genetic syndromes, mental health in LD, legal framework, and diagnostic overshadowing.',
    date: '2026-06-17',
    readTime: '11 min read',
    category: 'Paper B',
    tags: ['learning disability', 'intellectual disability', 'behavioural phenotypes', 'Down syndrome', 'diagnostic overshadowing', 'Paper B'],
    featured: false,
    content: `
      <p>Learning disability (intellectual disability) accounts for approximately 6% of Paper B marks. The questions cover the ICD-11 classification and severity grading, behavioural phenotypes of specific genetic syndromes, the assessment and management of mental health conditions in people with LD, diagnostic overshadowing, and the legal framework (MCA, safeguarding, and the interface with forensic services). Recall documents confirm that specific syndrome presentation questions (Down syndrome, Fragile X, Rett, cri du chat, neurofibromatosis) are recurring.</p>

      <h2>ICD-11 Definition and Classification</h2>

      <p>Intellectual disability (the ICD-11 term, though \u201clearning disability\u201d is the preferred UK clinical term) is defined by significant impairment of intellectual functioning (IQ approximately below 70) AND significant impairment of adaptive functioning (conceptual, social, and practical skills), with onset during the developmental period (before age 18). Severity is graded by adaptive functioning, not by IQ alone:</p>
      <ul>
        <li><strong>Mild (IQ 50-69, ~85% of LD):</strong> Can achieve academic skills up to approximately age 11-12. Able to live independently with support, hold employment, and maintain relationships. Often not diagnosed until school age.</li>
        <li><strong>Moderate (IQ 35-49, ~10%):</strong> Academic skills up to approximately age 8-9. Need more support with daily living, usually live in supported accommodation. Most have identifiable genetic cause.</li>
        <li><strong>Severe (IQ 20-34, ~4%):</strong> Limited language (single words, simple phrases), require support with all activities of daily living. High likelihood of comorbid physical disabilities, epilepsy, and sensory impairments.</li>
        <li><strong>Profound (IQ below 20, ~1%):</strong> Minimal language, complete dependence on others for all aspects of care. High rates of physical disability, epilepsy, and medical comorbidity. Life expectancy reduced.</li>
      </ul>

      <h2>Behavioural Phenotypes of Genetic Syndromes</h2>

      <p>These are the most frequently tested LD recall questions. The exam presents a brief clinical description and asks the candidate to identify the syndrome.</p>

      <ul>
        <li><strong>Down syndrome (trisomy 21):</strong> The most common genetic cause of LD. Typical physical features: upslanting palpebral fissures, epicanthic folds, flat nasal bridge, protruding tongue, single palmar crease, hypotonia. Behavioural phenotype: friendly, sociable disposition, relative strength in social skills and visual-spatial abilities compared to language. Associated with Alzheimer\u2019s disease (virtually all have Alzheimer pathology by age 40), congenital heart defects, hypothyroidism, leukaemia, atlantoaxial instability, and hearing/vision impairments. The gene for amyloid precursor protein (APP) is on chromosome 21, linking Down syndrome to early Alzheimer pathology.</li>
        <li><strong>Fragile X syndrome (Martin-Bell):</strong> The most common inherited cause of LD. Caused by trinucleotide (CGG) repeat expansion on the X chromosome (FMR1 gene). More common and more severe in males (who have only one X chromosome). Physical features: long face, prominent ears, large testicles (macro-orchidism, post-pubertal). Behavioural phenotype: social anxiety, gaze aversion, ADHD features, autistic traits (up to 30% meet criteria for autism), hand flapping, and perseverative speech. Females with Fragile X tend to have milder LD or normal IQ with anxiety and shyness.</li>
        <li><strong>Rett syndrome:</strong> Caused by MECP2 mutation on the X chromosome, almost exclusively in females (males are typically non-viable). Normal development for 6-18 months, then regression with loss of acquired skills (hand skills, language), acquired microcephaly, stereotypic hand-wringing/hand-washing movements, ataxia, breathing dysrhythmia (hyperventilation, breath-holding), and seizures. The regression and characteristic hand movements are pathognomonic. A recall question confirmed: <em>\u201cMECP2 gene \u2014 Rett syndrome.\u201d</em></li>
        <li><strong>Cri du chat syndrome (5p deletion):</strong> Deletion of short arm of chromosome 5. Physical features: severe LD, microcephaly, hypertelorism (wide-set eyes), and a distinctive high-pitched cat-like cry in infancy. Behavioural phenotype: hyperactivity, repetitive behaviours, self-injury. A recall question: <em>\u201cVery noisy kid, severe LD, hypertelorism\u201d</em> \u2014 Cri du chat.</li>
        <li><strong>Prader-Willi syndrome (paternal 15q11 deletion):</strong> Deletion of the paternal copy of chromosome 15q11-q13 (the maternal copy is imprinted, so this deletion removes the only active copy). In infancy: hypotonia, poor feeding, failure to thrive. In childhood: hyperphagia (insatiable appetite), obesity, compulsive food-seeking. Behavioural phenotype: temper outbursts, skin picking (self-injury), obsessive-compulsive traits, and high pain threshold. Distinctive physical features: almond-shaped eyes, narrow temples, small hands and feet, hypogonadism.</li>
        <li><strong>Angelman syndrome (maternal 15q11 deletion):</strong> The same genetic locus as Prader-Willi but the deletion is on the maternal chromosome. Normal development initially, then severe developmental delay, ataxia, seizures, and a characteristic happy demeanour with frequent laughter, hand-flapping, and excitability. \u201cHappy puppet\u201d was the older term (now considered pejorative).</li>
        <li><strong>Williams syndrome (7q11 deletion):</strong> Distinctive \u201celfin\u201d facies (small upturned nose, wide mouth, full lips, small chin), hypercalcaemia, and cardiovascular disease (supravalvular aortic stenosis). Behavioural phenotype: very sociable, verbally fluent (often articulate beyond their cognitive level), friendly, and musically talented. However, they have poor visuospatial skills, anxiety (especially social anxiety), and ADHD.</li>
        <li><strong>Tuberous sclerosis (TSC1/TSC2):</strong> Autosomal dominant. Physical features: facial angiofibromas (adenoma sebaceum), hypopigmented ash-leaf spots, shagreen patches (connective tissue naevi on the lumbar region), and periungual fibromas. CNS: cortical tubers (hamartomas in the brain), subependymal nodules, and subependymal giant cell astrocytomas (SEGA). Associated with epilepsy (often infantile spasms), autism, ADHD, and LD of variable severity.</li>
        <li><strong>Neurofibromatosis type 1 (NF1, 17q11):</strong> Autosomal dominant. Physical features: caf\u00e9-au-lait spots (>6, >5mm in children, >15mm in adults), axillary/inguinal freckling, neurofibromas, Lisch nodules (iris hamartomas), and optic pathway gliomas. Associated with LD (30-60%), ADHD, and social difficulties. A recall question confirmed: <em>\u201cShort, has freckles, Lisch nodules, LD\u201d</em> \u2014 Neurofibromatosis type 1.</li>
      </ul>

      <h2>Diagnostic Overshadowing</h2>

      <p><strong>Diagnostic overshadowing</strong> is the tendency to attribute new symptoms (e.g., agitation, low mood, auditory hallucinations) to the person\u2019s existing learning disability rather than recognising the possibility of a concurrent psychiatric disorder. This is a key concept tested in Paper B. It leads to underdiagnosis and undertreatment of mental health conditions in people with LD. People with LD have higher rates of psychiatric disorders than the general population (estimated 30-50% have a comorbid mental health condition, compared to 15-20% in the general population). The most common are: anxiety disorders, depression, schizophrenia (3-4 times higher), ADHD, and autism (which overlaps heavily with LD). Behavioural phenotypes and diagnostic overshadowing mean that mental illness in LD requires assessment by clinicians with specialist training. The <em>Diagnostic Manual \u2014 Intellectual Disability (DM-ID)</em> and the Royal College of Psychiatrists\u2019 DC-LD provide adapted diagnostic criteria.</p>

      <h2>Mental Health in LD: Assessment and Management</h2>

      <p>Assessment of mental health in people with LD requires: obtaining collateral history (carers, family, support staff), observation over time, use of validated adapted assessment tools (PAS-ADD, Mini PAS-ADD, ABC — Aberrant Behaviour Checklist), and exclusion of physical causes (pain from constipation, dental caries, gastro-oesophageal reflux, epilepsy). The same NICE treatment guidelines apply for most conditions, but with adaptations: lower starting doses, slower titration, more careful monitoring of side effects, and involving the person\u2019s support network in the treatment plan. Psychological interventions should be adapted to the person\u2019s developmental level. People with LD are more vulnerable to medication side effects (especially antipsychotic-induced EPS and metabolic syndrome).</p>

      <p>Atypical antipsychotics should NOT be used as chemical restraint for challenging behaviour without an appropriate psychiatric diagnosis. NICE (NG11) recommends a comprehensive behavioural assessment before prescribing and regular reviews with a plan to reduce or stop medication. This is a clinical governance priority.</p>

      <h2>Legal Framework for LD</h2>

      <p>The MCA 2005 is particularly relevant for people with LD, as many will lack capacity to make specific decisions. The functional test of capacity and best interests decision-making are the same as for other conditions, but the assessor must take into account the person\u2019s communication needs and provide all practical support to enable them to participate in decision-making. The MHA 1983 can be used for people with LD who meet the criteria for detention \u2014 the Mental Health Act Code of Practice specifies that the MHA is preferred to the MCA for decisions about compulsory treatment of mental disorder. The MCA is used for decisions about care and treatment of physical health problems where the person lacks capacity. The interface between the two (Bournewood gap) was discussed in the old age psychiatry article. Safeguarding is critical: people with LD are at higher risk of abuse (physical, sexual, financial, institutional). Any concern must be referred to adult safeguarding under the Care Act 2014.</p>

      <h2>High-Yield Recall Patterns</h2>
      <ul>
        <li><strong>Most common inherited cause of LD:</strong> Fragile X syndrome (triplet repeat on X chromosome)</li>
        <li><strong>Most common genetic cause of LD overall:</strong> Down syndrome (trisomy 21)</li>
        <li><strong>MECP2 mutation:</strong> Rett syndrome (females, regression at 6-18mo, hand-wringing, microcephaly)</li>
        <li><strong>5p deletion:</strong> Cri du chat (cat-like cry, severe LD, hypertelorism, hyperactivity)</li>
        <li><strong>7q11 deletion:</strong> Williams syndrome (elfin facies, friendly/fluent, supravalvular aortic stenosis, hypercalcaemia)</li>
        <li><strong>Paternal 15q11 deletion:</strong> Prader-Willi (hyperphagia, obesity, hypotonia, skin picking)</li>
        <li><strong>Maternal 15q11 deletion:</strong> Angelman (happy puppet, seizures, ataxia, frequent laughter)</li>
        <li><strong>NF1 triad:</strong> Short stature, caf\u00e9-au-lait spots, Lisch nodules, LD</li>
        <li><strong>Diagnostic overshadowing:</strong> Attributing new psychiatric symptoms to the LD rather than recognising a treatable mental illness</li>
        <li><strong>Down syndrome + Alzheimer\u2019s:</strong> Virtually all have Alzheimer pathology by age 40. APP gene on chromosome 21.</li>
        <li><strong>LD prevalence of psychiatric comorbidity:</strong> Approximately 30-50% (vs 15-20% general population)</li>
        <li><strong>Antipsychotics in LD:</strong> Do NOT use for challenging behaviour without psychiatric diagnosis. NICE NG11.</li>
        <li><strong>Sexual offending + LD:</strong> Antisocial PD + LD + substance abuse most commonly associated. Recall confirmed.</li>
        <li><strong>Fetal alcohol syndrome:</strong> Microcephaly, growth retardation, distinct facies (smooth philtrum, thin upper lip). Recall confirmed.</li>
      </ul>

      <p>PsychStar\u2019s Paper B question bank covers learning disability with recall-calibrated questions. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'classification-icd11-vs-icd10-mrcpsych',
    title: 'Classification in Psychiatry: ICD-11 vs ICD-10 Changes for MRCPsych',
    metaTitle: 'ICD-11 vs ICD-10 for MRCPsych | Key Changes & Exam Impact',
    metaDescription: 'ICD-11 vs ICD-10 classification changes for MRCPsych. Personality disorders dimensional model, schizophrenia subtypes removed, PTSD simplified, new diagnoses, and how the exam tests these changes.',
    date: '2026-06-17',
    readTime: '9 min read',
    category: 'Paper A',
    tags: ['classification', 'ICD-11', 'ICD-10', 'DSM-5', 'diagnosis', 'Paper A', 'Paper B'],
    featured: false,
    content: `
      <p>Classification in psychiatry accounts for approximately 17% of Paper A marks and underpins diagnostic questions in Paper B. The transition from ICD-10 to ICD-11 (adopted by WHO member states in 2022) is the most significant change to psychiatric classification in a generation and is a high-yield topic for the current exam sitting. The exam tests both knowledge of diagnostic criteria AND awareness of the structural changes between editions.</p>

      <h2>What Changed in ICD-11: A Summary</h2>

      <p>The ICD-11 classification of mental, behavioural, or neurodevelopmental disorders represents the first major revision since ICD-10 (1992). ICD-11 was adopted at the World Health Assembly in May 2019 and came into effect for WHO member states on 1 January 2022. The UK has transitioned to ICD-11 coding, and the MRCPsych now expects candidates to be familiar with ICD-11 criteria.</p>

      <p><strong>Key structural changes:</strong></p>
      <ul>
        <li>Reorganisation of diagnostic groupings (e.g., OCD and related disorders separated from anxiety disorders; gender identity disorders moved to a new chapter on conditions related to sexual health)</li>
        <li>Dimensional model for personality disorders (replacing categorical ICD-10 types)</li>
        <li>Simplification of criteria for several disorders (schizophrenia, depressive episode, PTSD)</li>
        <li>New diagnoses: complex PTSD, prolonged grief disorder, gaming disorder, body integrity dysphoria, olfactory reference disorder</li>
        <li>Removal of some ICD-10 diagnoses: schizophrenia subtypes, dysthymia (replaced by persistent mood disorders), hypochondriasis (replaced by health anxiety / illness anxiety disorder)</li>
        <li>Lifespan approach: childhood and adult diagnoses integrated in the same chapter structure</li>
        <li>Eliminated the ICD-10 requirement for social and occupational impairment in some diagnoses</li>
      </ul>

      <h2>Personality Disorders: The Biggest Change</h2>

      <p>The ICD-11 replaced the 10 categorical personality disorder types from ICD-10 with a single dimensional diagnosis of personality disorder, graded by severity (mild, moderate, or severe) based on the degree of impairment in self-functioning (identity, self-direction) and interpersonal functioning (empathy, intimacy). The candidate assigns one or more of five trait domain qualifiers: negative affectivity, detachment, dissociality, disinhibition, and anankastia. The borderline pattern specifier was retained because of its specific treatment implications (DBT, MBT). The exam tests this change directly: \u201cWhich ICD-10 personality disorder categories are no longer recognised in ICD-11?\u201d \u2014 all of them, replaced by the dimensional model with the borderline pattern specifier. Schizotypal disorder was moved out of the PD chapter and into the schizophrenia spectrum chapter (as schizotypal disorder, not schizotypal PD).</p>

      <h2>Schizophrenia and Psychotic Disorders</h2>

      <p>ICD-11 removed all schizophrenia subtypes (paranoid, hebephrenic, catatonic, undifferentiated, residual) that existed in ICD-10. The diagnosis of schizophrenia now requires at least 1 of the following symptoms present for most of the time over at least 1 month: persistent delusions, persistent hallucinations, disorganised thinking, experiences of influence/passivity/control, or negative symptoms. The catatonic presentation is now specified as a separate entity (catatonia associated with another mental disorder) rather than a subtype of schizophrenia. Schizoaffective disorder remains but with stricter criteria requiring that mood and psychotic symptoms occur together for most of the illness duration. This is a change from ICD-10 where the mood symptoms needed to meet criteria for a mood episode for a \u201csubstantial part\u201d of the total illness duration.</p>

      <h2>Depressive Disorders</h2>

      <p>ICD-11 simplified the criteria for depressive episode. The ICD-10 requirement of at least 2 of 3 typical symptoms (depressed mood, loss of interest, reduced energy) was retained. However, the number of additional symptoms was simplified: mild requires 2 core + 2-3 additional, moderate requires 2 core + 4-5 additional, severe requires all 3 core + 5+ additional. The symptom list was streamlined. Dysthymia (chronic low-grade depression in ICD-10) was replaced by persistent depressive disorders (chronic depression lasting at least 2 years, which may include dysthymic presentations). The ICD-10 concept of recurrent brief depressive disorder was retained. Mixed anxiety and depressive disorder (ICD-10 F41.2) was retained but reconceptualised.</p>

      <h2>Trauma and Stress-Related Disorders</h2>

      <p>PTSD was simplified to 3 core clusters (re-experiencing, avoidance, hypervigilance) from ICD-10\u2019s 6 clusters. This makes the diagnosis more specific and reduces overlap with other conditions. Complex PTSD was added (see the anxiety disorders article). Prolonged grief disorder was added (persistent grief lasting >6 months). Adjustment disorder criteria were tightened with a 1-month onset requirement and a 6-month maximum duration. Reactive attachment disorder and disinhibited social engagement disorder were retained for children.</p>

      <h2>Obsessive-Compulsive and Related Disorders</h2>

      <p>This new chapter separates OCD from anxiety disorders (ICD-10\u2019s grouping). The chapter includes: OCD, body dysmorphic disorder, olfactory reference disorder (preoccupation with perceived body odour, new to ICD-11), hypochondriasis (illness anxiety disorder), hoarding disorder, trichotillomania, and excoriation disorder. The insight specifier (good/fair, poor, absent/delusional) is used across all these conditions.</p>

      <h2>Feeding and Eating Disorders</h2>

      <p>ICD-11 retained anorexia, bulimia, and binge-eating disorder (which was not in ICD-10 but is now included). The amenorrhea requirement for anorexia was removed. ARFID (avoidant/restrictive food intake disorder) was added, capturing conditions like picky eating that result in nutritional deficiency without body image disturbance. Pica and rumination disorder were retained.</p>

      <h2>Neurodevelopmental Disorders</h2>

      <p>Autism spectrum disorder replaced the ICD-10 subtypes (childhood autism, Asperger syndrome, atypical autism, Rett syndrome, other childhood disintegrative disorder). Rett syndrome was moved to the developmental anomalies chapter. ADHD criteria were tightened: onset required before age 12 (ICD-10 required before age 7). Intellectual disability (the ICD-11 diagnostic term) replaced mental retardation. The severity is now graded primarily by adaptive functioning.</p>

      <h2>Other Notable Changes</h2>

      <ul>
        <li><strong>Gaming disorder:</strong> Added as a new diagnosis (pattern of gaming behaviour with impaired control, increasing priority, and continuation despite negative consequences for at least 12 months)</li>
        <li><strong>Body integrity dysphoria:</strong> The desire to have a specific physical disability (wanting amputation of a healthy limb, wanting to be blind or paralysed). Distinguished from Munchausen syndrome by the absence of secondary gain and the specific focus on body integrity.</li>
        <li><strong>Catatonia:</strong> Now classified as a separate diagnostic entity (catatonia associated with another mental disorder and catatonia induced by substances/medications), not as a subtype of schizophrenia. This reflects the fact that catatonia occurs across a wider range of conditions.</li>
        <li><strong>Gender incongruence:</strong> Removed from the mental disorders chapter and placed in a new chapter on conditions related to sexual health. This was a significant destigmatising change.</li>
        <li><strong>Bipolar type II</strong> and cyclothymia were retained. The criteria for the manic/hypomanic episode were standardised (mania = 1 week, hypomania = 4 days, with requirement for increased activity/energy in addition to mood change).</li>
      </ul>

      <h2>High-Yield Exam Patterns for ICD-11 Changes</h2>
      <ul>
        <li><strong>Schizophrenia subtypes removed:</strong> Paranoid, hebephrenic, catatonic, undifferentiated, residual all out of ICD-11</li>
        <li><strong>Personality disorders now dimensional:</strong> Severity (mild/moderate/severe) + trait specifiers. Borderline pattern specifier retained for treatment implications.</li>
        <li><strong>Catatonia now a separate entity:</strong> Not a subtype of schizophrenia. Can be associated with any mental disorder.</li>
        <li><strong>PTSD simplified to 3 clusters:</strong> Re-experiencing, avoidance, hypervigilance. Complex PTSD added.</li>
        <li><strong>OCD separated from anxiety disorders:</strong> Now its own chapter (OCRDs) including BDD, hoarding, trichotillomania.</li>
        <li><strong>ASD unified:</strong> Asperger, childhood autism, atypical autism all replaced by autism spectrum disorder.</li>
        <li><strong>ADHD onset age changed:</strong> From <7 (ICD-10) to <12 (ICD-11). Three presentations: inattentive, hyperactive-impulsive, combined.</li>
        <li><strong>Anorexia amenorrhea requirement:</strong> Removed in ICD-11</li>
        <li><strong>Binge-eating disorder:</strong> New to ICD-11</li>
        <li><strong>Gaming disorder:</strong> New diagnosis</li>
        <li><strong>Gender incongruence:</strong> Moved out of mental disorders chapter</li>
      </ul>

      <p>PsychStar\u2019s question banks for both Paper A and Paper B reflect ICD-11 diagnostic criteria and test knowledge of the changes from ICD-10. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
  {
    slug: 'dynamic-psychopathology-mrcpsych-freud-psychoanalysis',
    title: 'Dynamic Psychopathology for MRCPsych: Freud, Defence Mechanisms, and the Psychoanalytic Tradition',
    metaTitle: 'Dynamic Psychopathology for MRCPsych | Freud, Jung, Klein, Defence Mechanisms',
    metaDescription: 'Dynamic psychopathology for MRCPsych Paper A. Freud\u2019s structural and topographical models, Jung\u2019s analytical psychology, Klein\u2019s object relations, defence mechanisms, and the psychoanalytic tradition for the exam.',
    date: '2026-06-17',
    readTime: '10 min read',
    category: 'Paper A',
    tags: ['dynamic psychopathology', 'Freud', 'Jung', 'Klein', 'psychoanalysis', 'defence mechanisms', 'Paper A'],
    featured: false,
    content: `
      <p>Dynamic psychopathology covers psychoanalytic theory and its application to understanding mental disorders. This overlaps with both the psychological models section and descriptive psychopathology syllabus of Paper A. While psychoanalytic theory has declined in clinical dominance, its concepts remain embedded in psychiatric terminology and are regularly examined. The SPMM syllabus section 5.23 covers this material. Defence mechanisms, in particular, are a high-yield EMI topic.</p>

      <h2>Freud\u2019s Structural Model of the Mind</h2>

      <p>Sigmund Freud (1856-1939) proposed that the mind is divided into three structures that develop over childhood:</p>

      <p><strong>The id:</strong> Present at birth. Operates on the pleasure principle (seeks immediate gratification of instinctual drives). Unconscious. Contains the life instincts (Eros, libido) and the death instinct (Thanatos, the drive toward aggression and self-destruction). The id has no awareness of reality or morality \u2014 its only goal is tension reduction.</p>

      <p><strong>The ego:</strong> Develops during the first year of life as the infant learns to negotiate reality. Operates on the reality principle (delays gratification until an appropriate object or situation is available). The ego mediates between the id\u2019s demands, the superego\u2019s prohibitions, and external reality. Functions include perception, memory, judgement, and reality testing. The ego uses defence mechanisms to manage conflicts between the id and superego.</p>

      <p><strong>The superego:</strong> Develops around age 3-5 (phallic stage), through resolution of the Oedipus complex and internalisation of parental and societal values. Comprises the conscience (what is forbidden, guilt) and the ego-ideal (what is aspired to, pride). The superego is the internal representative of moral standards and ideals.</p>

      <p><strong>Topographical model:</strong> Freud also described the mind in terms of consciousness: the conscious mind (current awareness), the preconscious (accessible memories and knowledge), and the unconscious (inaccessible material, drives, repressed memories, the contents of the id and superego). The goal of psychoanalysis is to make the unconscious conscious.</p>

      <h2>Freud\u2019s Psychosexual Stages of Development</h2>

      <p>Freud proposed that psychological development proceeds through a fixed sequence of stages, each centred on a different erogenous zone. Fixation at any stage (due to excessive frustration or gratification) leads to characteristic adult personality traits.</p>

      <ul>
        <li><strong>Oral stage (0-18 months):</strong> Pleasure centres on the mouth (sucking, biting). Weaning is the central conflict. Oral fixation: dependent, gullible, passive personality, or sarcastic/aggressive (oral aggressive). Disorders linked: depression, eating disorders, dependence.</li>
        <li><strong>Anal stage (18-36 months):</strong> Pleasure centres on bowel and bladder control. Toilet training is the central conflict. Anal fixation: anal-retentive (orderly, stingy, obstinate) vs anal-expulsive (messy, disorganised, rebellious). Disorders linked: obsessive-compulsive traits.</li>
        <li><strong>Phallic stage (3-6 years):</strong> Pleasure centres on the genitals. The central conflict is the Oedipus complex (boys: desire for the mother, fear of castration by the father, identification with father resolves the conflict) or Electra complex (girls: penis envy, desire for father, identification with mother resolves the conflict). Phallic fixation: vanity, recklessness, pride. Disorders linked: hysteria, sexual dysfunction.</li>
        <li><strong>Latency stage (6-12 years):</strong> Sexual impulses are dormant. The child focuses on developing skills, social relationships, and intellectual pursuits. No new conflict.</li>
        <li><strong>Genital stage (12+ years):</strong> Mature sexual interests emerge. The goal is healthy adult relationships combining love and work. The earlier stages have been successfully integrated.</li>
      </ul>

      <h2>Defence Mechanisms</h2>

      <p>Defence mechanisms are unconscious mental processes that protect the individual from anxiety by distorting or denying reality. Anna Freud (Sigmund\u2019s daughter) systematised the list in <em>The Ego and the Mechanisms of Defence</em> (1936). The exam tests the definition and clinical recognition of each.</p>

      <p><strong>Mature defences (adaptive, higher-level):</strong> Sublimation (channelling unacceptable impulses into socially valued activities \u2014 e.g., aggression into competitive sport), humour (expressing feelings without discomfort), altruism (meeting needs through helping others), suppression (conscious, voluntary deferral of a feeling or impulse \u2014 the only conscious defence), anticipation (preparing for future discomfort), and asceticism (renouncing needs to rise above them).</p>

      <p><strong>Neurotic defences (intermediate):</strong> Repression (unconscious forgetting of unacceptable ideas or impulses \u2014 the most fundamental defence, from which others derive), displacement (redirecting an impulse to a safer target \u2014 e.g., angry at boss, takes it out on partner), intellectualisation (detached, analytical thinking about an emotionally charged issue, avoiding the feeling), rationalisation (constructing logical explanations for irrational behaviour), reaction formation (adopting attitudes and behaviours opposite to genuine impulses \u2014 e.g., being excessively kind to someone you dislike), isolation of affect (separating an idea from its associated emotion), undoing (ritualistic behaviour that symbolically reverses a previous action or thought).</p>

      <p><strong>Immature defences (primitive, lower-level):</strong> Projection (attributing one\u2019s own unacceptable feelings to others \u2014 e.g., \u201cI\u2019m not angry, he is angry with me\u201d), projective identification (projecting a feeling and unconsciously behaving in a way that induces that feeling in the other — closely associated with BPD), splitting (dividing objects into all-good or all-bad \u2014 the most characteristic defence in BPD), acting out (expressing unconscious impulses through action rather than words — self-harm is the classic example), denial (refusing to acknowledge a painful reality), regression (reverting to an earlier developmental stage), idealisation and devaluation (alternating between seeing the self or others as perfect and worthless), and schizoid fantasy (retreating into fantasy to avoid interpersonal conflict).</p>

      <h2>Jung\u2019s Analytical Psychology</h2>

      <p>Carl Jung (1875-1961) broke with Freud in 1913 over the primacy of sexuality (Jung argued for a broader understanding of libido as general psychic energy). His key concepts: the collective unconscious (a universal, inherited layer of the unconscious shared by all humans, containing archetypes), archetypes (universal symbols and patterns \u2014 the Persona, Shadow, Anima/Animus, Self), individuation (the lifelong process of integrating the conscious and unconscious aspects of the self), psychological types (introversion/extraversion, and four functions \u2014 thinking, feeling, sensing, intuiting), word association test (a method of revealing unconscious complexes by measuring response times to stimulus words). The self (the archetype of wholeness, the goal of individuation) is distinct from the ego (the centre of consciousness). Mandala symbolism represents the self and appears in dreams and art during the individuation process.</p>

      <h2>Klein\u2019s Object Relations Theory</h2>

      <p>Melanie Klein (1882-1960) extended psychoanalysis to children through play therapy (interpreting children\u2019s play as equivalent to free association). She proposed that the infant\u2019s inner world is populated by internal objects (mental representations of early relationships). Development proceeds through two positions (not stages, as they can be revisited throughout life):</p>

      <ul>
        <li><strong>Paranoid-schizoid position (first 6 months):</strong>The infant experiences anxiety about the survival of the self. Objects are split into all-good and all-bad (the good breast vs the bad breast). Splitting and projective identification are the primary defences. The infant projects destructive impulses onto the bad object, which then feels persecutory (hence \u201cparanoid\u201d). This is a normal developmental phase but can be the basis for later paranoid or borderline pathology if not resolved.</li>
        <li><strong>Depressive position (from around 6 months):</strong> The infant recognises that the good and bad objects are actually the same whole object (the mother, who is both gratifying and frustrating). This generates concern for the object and guilt for previous destructive fantasies (hence \u201cdepressive\u201d). The infant develops the capacity for reparation (making amends) and concern for others. Successful resolution leads to gratitude, creativity, and the ability to tolerate ambivalence. Failure leads to depressive pathology, guilt, and difficulty maintaining relationships.</li>
      </ul>

      <p><strong>Wilfred Bion</strong> extended Klein\u2019s work: the mother\u2019s capacity for reverie (holding and processing the infant\u2019s projected distress) and the container-contained model (the mother contains the infant\u2019s unbearable feelings and returns them in a metabolised, manageable form). <strong>Donald Winnicott</strong> contributed the concepts of the transitional object (a comfort object that bridges the infant\u2019s inner and outer reality \u2014 a teddy bear, blanket), the true self (spontaneous, authentic) vs the false self (compliant, defensive), and the good-enough mother (who meets the infant\u2019s needs sufficiently for healthy development without being perfect).</p>

      <h2>Other Psychoanalytic Concepts Tested in the Exam</h2>

      <p><strong>Transference:</strong> The patient unconsciously transfers feelings and attitudes from past relationships onto the therapist. The analysis of transference is a core component of psychoanalytic therapy. Positive transference: affectionate, idealising feelings. Negative transference: hostile, critical feelings. Erotic transference: sexualised feelings. The therapist uses their own emotional response (countertransference) as a source of information about the patient\u2019s internal world.</p>

      <p><strong>Resistance:</strong> Any behaviour or mental process that interferes with the progress of treatment, particularly the uncovering of unconscious material. Resistance is not opposition to therapy but a manifestation of the patient\u2019s defences. Examples: missing sessions, silence, intellectualisation, forgetting dreams, acting out.</p>

      <p><strong>The therapeutic alliance (working alliance):</strong> The collaborative, rational aspect of the therapeutic relationship, as distinct from the transference. A strong therapeutic alliance is the best predictor of therapeutic outcome across all psychotherapies.</p>

      <h2>High-Yield Exam Patterns</h2>
      <ul>
        <li><strong>Id/ego/superego and topographical model:</strong> Be able to identify which structure is operating in a given scenario</li>
        <li><strong>Oedipus complex resolution:</strong> Identification with the same-sex parent. Age 3-5 (phallic stage).</li>
        <li><strong>Most fundamental defence mechanism:</strong> Repression (from which others derive, per Freud)</li>
        <li><strong>Defence most characteristic of BPD:</strong> Splitting (all-good/all-bad) AND acting out (ICD-11 emphasis)</li>
        <li><strong>Sublimation:</strong> The most adaptive/mature defence (channelling into productive activity)</li>
        <li><strong>Projective identification:</strong> Klein. Projecting then inducing the feeling in the other. Associated with BPD.</li>
        <li><strong>Paranoid-schizoid vs depressive position (Klein):</strong> First 6 months = splitting/projection. From 6 months = concern, guilt, reparation.</li>
        <li><strong>Transitional object:</strong> Winnicott. First \u201cnot-me\u201d possession (teddy bear, blanket). Bridges inner and outer reality.</li>
        <li><strong>False self:</strong> Winnicott. Compliant, defensive adaptation to inadequate early care.</li>
        <li><strong>Collective unconscious:</strong> Jung. Archetypes (Persona, Shadow, Anima/Animus, Self).</li>
        <li><strong>Individuation:</strong> Jung. Integration of conscious and unconscious. The goal of analytical psychology.</li>
      </ul>

      <p>PsychStar\u2019s Paper A question bank covers dynamic psychopathology with questions calibrated to the SPMM syllabus. Start with 5 free questions at <a href="/try">psychstar.io/try</a>.</p>
    `
  },
]
