'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'
import type { Question } from '@/types'

export default function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    stem: '', options: ['', '', '', '', ''], correct_index: 0,
    distractors_rationale: ['', '', '', '', ''], teaching_point: '',
    domain: '', subdomain: '', difficulty: '', bloom_taxonomy: '', paper: 'A', source: '', tags: '', is_active: true,
  })

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('questions').select('*').eq('id', id).single()
      if (!data) { router.push('/admin/questions'); return }
      const q = data as Question
      setForm({
        stem: q.stem, options: q.options.map(o => o.startsWith(' ') ? o.slice(1) : o),
        correct_index: q.correct_index, distractors_rationale: q.distractors_rationale || ['', '', '', '', ''],
        teaching_point: q.teaching_point || '', domain: q.domain, subdomain: q.subdomain || '',
        difficulty: q.difficulty || '', bloom_taxonomy: q.bloom_taxonomy || '', paper: q.paper,
        source: q.source || '', tags: q.tags?.join(', ') || '', is_active: q.is_active,
      })
      setLoading(false)
    })()
  }, [supabase, id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null)
    if (!form.stem.trim()) { setError('Stem required'); setSaving(false); return }
    if (!form.domain) { setError('Domain required'); setSaving(false); return }

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const { error: e2 } = await supabase.from('questions').update({
      stem: form.stem.trim(), options: form.options.map(o => ` ${o.trim()}`),
      correct_index: form.correct_index,
      distractors_rationale: form.distractors_rationale.map(r => r.trim()).filter(Boolean),
      teaching_point: form.teaching_point.trim() || null, domain: form.domain,
      subdomain: form.subdomain.trim() || null, difficulty: form.difficulty || null,
      bloom_taxonomy: form.bloom_taxonomy || null, paper: form.paper,
      source: form.source.trim() || null, tags: tags.length > 0 ? tags : null,
      updated_at: new Date().toISOString(),
    }).eq('id', id)
    if (e2) { setError(e2.message); setSaving(false); return }
    router.push('/admin/questions'); router.refresh()
  }

  const toggleActive = async () => {
    await supabase.from('questions').update({ is_active: !form.is_active, updated_at: new Date().toISOString() }).eq('id', id)
    setForm({ ...form, is_active: !form.is_active })
  }

  const handleDelete = async () => {
    if (!confirm('Delete this question permanently?')) return
    await supabase.from('questions').delete().eq('id', id)
    router.push('/admin/questions'); router.refresh()
  }

  if (loading) return <AdminLayout title="Edit Question"><div className="skeleton" style={{ height: 400, borderRadius: 12 }} /></AdminLayout>

  const ic = 'input'

  return (
    <AdminLayout title="Edit Question" subtitle="Update question details">
      <div style={{ maxWidth: 720 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={toggleActive} className={`btn btn-sm ${form.is_active ? 'btn-secondary' : 'btn-primary'}`}>
            {form.is_active ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={handleDelete} className="btn btn-sm btn-danger">Delete</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Stem *</label>
            <textarea value={form.stem} onChange={e => setForm({ ...form, stem: e.target.value })} className={ic} style={{ minHeight: 80 }} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Options</label>
            {form.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                <input type="text" value={opt} onChange={e => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }) }} className={ic} />
                <button type="button" onClick={() => setForm({ ...form, correct_index: i })}
                  style={{ padding: '6px 10px', fontSize: 11, borderRadius: 'var(--radius-sm)', border: `1px solid ${form.correct_index === i ? 'rgba(34,197,94,0.3)' : 'var(--border-default)'}`, background: form.correct_index === i ? 'var(--success-subtle)' : 'transparent', color: form.correct_index === i ? 'var(--success)' : 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }}>
                  {form.correct_index === i ? '✓' : 'Correct?'}
                </button>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Distractor Rationale</label>
            {form.options.map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                <input type="text" value={form.distractors_rationale[i] || ''} onChange={e => { const r = [...form.distractors_rationale]; r[i] = e.target.value; setForm({ ...form, distractors_rationale: r }) }} className={ic} />
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Teaching Point</label>
            <textarea value={form.teaching_point} onChange={e => setForm({ ...form, teaching_point: e.target.value })} className={ic} style={{ minHeight: 60 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
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
                <option value="A">A</option><option value="B">B</option>
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
              <input type="text" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} className={ic} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Tags</label>
              <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className={ic} />
            </div>
          </div>

          {error && <div style={{ fontSize: 12, color: 'var(--error)', background: 'var(--error-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

          <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
            <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" onClick={() => router.push('/admin/questions')} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
