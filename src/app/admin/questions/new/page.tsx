'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'

export default function NewQuestionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    stem: '', options: ['', '', '', '', ''], correct_index: 0,
    distractors_rationale: ['', '', '', '', ''], teaching_point: '',
    domain: '', subdomain: '', difficulty: '', bloom_taxonomy: '', paper: 'A', source: '', tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null)
    if (!form.stem.trim()) { setError('Stem required'); setSaving(false); return }
    if (form.options.filter(o => o.trim()).length < 2) { setError('At least 2 options'); setSaving(false); return }
    if (!form.domain) { setError('Domain required'); setSaving(false); return }

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const { error: e2 } = await supabase.from('questions').insert({
      stem: form.stem.trim(), options: form.options.map(o => ` ${o.trim()}`),
      correct_index: form.correct_index,
      distractors_rationale: form.distractors_rationale.map(r => r.trim()).filter(Boolean),
      teaching_point: form.teaching_point.trim() || null, domain: form.domain,
      subdomain: form.subdomain.trim() || null, difficulty: form.difficulty || null,
      bloom_taxonomy: form.bloom_taxonomy || null, paper: form.paper,
      source: form.source.trim() || null, tags: tags.length > 0 ? tags : null,
    })
    if (e2) { setError(e2.message); setSaving(false); return }
    router.push('/admin/questions'); router.refresh()
  }

  const ic = 'input'

  return (
    <AdminLayout title="Add Question" subtitle="Create a new question">
      <div style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Stem *</label>
            <textarea value={form.stem} onChange={e => setForm({ ...form, stem: e.target.value })} className={ic} style={{ minHeight: 80 }} placeholder="Which of the following best describes...?" required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Options *</label>
            {form.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                <input type="text" value={opt} onChange={e => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }) }} className={ic} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                <button type="button" onClick={() => setForm({ ...form, correct_index: i })}
                  style={{ padding: '6px 10px', fontSize: 11, borderRadius: 'var(--radius-sm)', border: `1px solid ${form.correct_index === i ? 'rgba(34,197,94,0.3)' : 'var(--border-default)'}`, background: form.correct_index === i ? 'var(--success-subtle)' : 'transparent', color: form.correct_index === i ? 'var(--success)' : 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }}>
                  {form.correct_index === i ? '✓ Correct' : 'Correct?'}
                </button>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Distractor Rationale</label>
            {form.options.map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                <input type="text" value={form.distractors_rationale[i] || ''} onChange={e => { const r = [...form.distractors_rationale]; r[i] = e.target.value; setForm({ ...form, distractors_rationale: r }) }} className={ic} placeholder={i === form.correct_index ? 'Correct answer' : 'Why this is wrong...'} />
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Teaching Point</label>
            <textarea value={form.teaching_point} onChange={e => setForm({ ...form, teaching_point: e.target.value })} className={ic} style={{ minHeight: 60 }} placeholder="Key concept to learn..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Domain *</label>
              <select value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} className={ic} required>
                <option value="">Select...</option>
                <optgroup label="Paper A">{DOMAINS_PAPER_A.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}</optgroup>
                <optgroup label="Paper B">{DOMAINS_PAPER_B.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}</optgroup>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Paper</label>
              <select value={form.paper} onChange={e => setForm({ ...form, paper: e.target.value })} className={ic}>
                <option value="A">Paper A</option><option value="B">Paper B</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className={ic}>
                <option value="">Any</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Bloom&apos;s</label>
              <select value={form.bloom_taxonomy} onChange={e => setForm({ ...form, bloom_taxonomy: e.target.value })} className={ic}>
                <option value="">Select...</option><option value="recall">Recall</option><option value="application">Application</option><option value="analysis">Analysis</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Source</label>
              <input type="text" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} className={ic} placeholder="NICE CG178 §1.3" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Tags</label>
              <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className={ic} placeholder="dopamine, antipsychotics" />
            </div>
          </div>

          {error && <div style={{ fontSize: 12, color: 'var(--error)', background: 'var(--error-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

          <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
            <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Save Question'}</button>
            <button type="button" onClick={() => router.push('/admin/questions')} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
