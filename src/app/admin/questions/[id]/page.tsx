'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'
import type { Question, QuestionFormat, QuestionItem } from '@/types'

const OPTION_LABELS = (n: number) => Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i))

interface EmiItemEditForm {
  id?: string  // existing item id (null for new items)
  item_number: number
  item_text: string
  correct_indices: number[]
  marks: number
  item_rationale: string
}

export default function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<QuestionFormat>('sba')

  // SBA form
  const [sbaForm, setSbaForm] = useState({
    stem: '', options: ['', '', '', '', ''], correct_index: 0,
    distractors_rationale: ['', '', '', '', ''], teaching_point: '',
    domain: '', subdomain: '', difficulty: '', bloom_taxonomy: '', paper: 'A', source: '', tags: '', is_active: true,
  })

  // EMI form
  const [emiForm, setEmiForm] = useState({
    stem: '', optionCount: 10, options: Array(10).fill(''),
    teaching_point: '', domain: '', subdomain: '', difficulty: '',
    bloom_taxonomy: '', paper: 'B', source: '', tags: '', is_active: true,
    items: [] as EmiItemEditForm[],
  })

  useEffect(() => {
    (async () => {
      // Load question
      const { data: q } = await supabase.from('questions').select('*').eq('id', id).single()
      if (!q) { router.push('/admin/questions'); return }

      const question = q as Question
      const fmt = (question.format || 'sba') as QuestionFormat
      setFormat(fmt)

      if (fmt === 'sba') {
        setSbaForm({
          stem: question.stem,
          options: question.options.map(o => o.startsWith(' ') ? o.slice(1) : o),
          correct_index: question.correct_index,
          distractors_rationale: question.distractors_rationale || ['', '', '', '', ''],
          teaching_point: question.teaching_point || '',
          domain: question.domain,
          subdomain: question.subdomain || '',
          difficulty: question.difficulty || '',
          bloom_taxonomy: question.bloom_taxonomy || '',
          paper: question.paper,
          source: question.source || '',
          tags: question.tags?.join(', ') || '',
          is_active: question.is_active,
        })
      } else {
        // Load EMI items
        const { data: items } = await supabase
          .from('question_items')
          .select('*')
          .eq('question_id', id)
          .order('item_number')

        const oc = question.options.length
        setEmiForm({
          stem: question.stem,
          optionCount: oc,
          options: question.options.map(o => o.startsWith(' ') ? o.slice(1) : o),
          teaching_point: question.teaching_point || '',
          domain: question.domain,
          subdomain: question.subdomain || '',
          difficulty: question.difficulty || '',
          bloom_taxonomy: question.bloom_taxonomy || '',
          paper: question.paper,
          source: question.source || '',
          tags: question.tags?.join(', ') || '',
          is_active: question.is_active,
          items: (items || []).map((item: QuestionItem) => ({
            id: item.id,
            item_number: item.item_number,
            item_text: item.item_text,
            correct_indices: item.correct_indices,
            marks: item.marks,
            item_rationale: item.item_rationale || '',
          })),
        })
      }

      setLoading(false)
    })()
  }, [supabase, id, router])

  // ── EMI helpers ──
  const handleEmiOptionCount = (n: number) => {
    const clamped = Math.max(5, Math.min(15, n))
    const options = [...emiForm.options]
    if (clamped > options.length) {
      options.push(...Array(clamped - options.length).fill(''))
    } else {
      options.length = clamped
    }
    setEmiForm(prev => ({ ...prev, optionCount: clamped, options }))
  }

  const addEmiItem = () => {
    setEmiForm(prev => ({
      ...prev,
      items: [...prev.items, { item_number: prev.items.length + 1, item_text: '', correct_indices: [], marks: 1, item_rationale: '' }],
    }))
  }

  const removeEmiItem = (idx: number) => {
    setEmiForm(prev => {
      const items = prev.items.filter((_, i) => i !== idx).map((item, i) => ({ ...item, item_number: i + 1 }))
      return { ...prev, items }
    })
  }

  const updateEmiItem = (idx: number, field: keyof EmiItemEditForm, value: any) => {
    setEmiForm(prev => {
      const items = [...prev.items]
      items[idx] = { ...items[idx], [field]: value }
      return { ...prev, items }
    })
  }

  const toggleEmiCorrectIndex = (itemIdx: number, optionIdx: number) => {
    const item = emiForm.items[itemIdx]
    const current = item.correct_indices
    let updated: number[]
    if (current.includes(optionIdx)) {
      updated = current.filter(i => i !== optionIdx)
    } else {
      updated = [...current, optionIdx]
    }
    updateEmiItem(itemIdx, 'correct_indices', updated)
  }

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null)

    if (format === 'sba') {
      if (!sbaForm.stem.trim()) { setError('Stem required'); setSaving(false); return }
      if (!sbaForm.domain) { setError('Domain required'); setSaving(false); return }

      const tags = sbaForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      const { error: e2 } = await supabase.from('questions').update({
        stem: sbaForm.stem.trim(), options: sbaForm.options.map(o => ` ${o.trim()}`),
        correct_index: sbaForm.correct_index,
        distractors_rationale: sbaForm.distractors_rationale.map(r => r.trim()).filter(Boolean),
        teaching_point: sbaForm.teaching_point.trim() || null, domain: sbaForm.domain,
        subdomain: sbaForm.subdomain.trim() || null, difficulty: sbaForm.difficulty || null,
        bloom_taxonomy: sbaForm.bloom_taxonomy || null, paper: sbaForm.paper,
        source: sbaForm.source.trim() || null, tags: tags.length > 0 ? tags : null,
        updated_at: new Date().toISOString(),
      }).eq('id', id)
      if (e2) { setError(e2.message); setSaving(false); return }
      router.push('/admin/questions'); router.refresh()
    } else {
      if (!emiForm.stem.trim()) { setError('Stem required'); setSaving(false); return }
      if (emiForm.options.filter(o => o.trim()).length < 2) { setError('At least 2 options required'); setSaving(false); return }
      if (!emiForm.domain) { setError('Domain required'); setSaving(false); return }
      if (emiForm.items.length < 2) { setError('At least 2 items required'); setSaving(false); return }
      for (const item of emiForm.items) {
        if (!item.item_text.trim()) { setError(`Item ${item.item_number}: text required`); setSaving(false); return }
        if (item.correct_indices.length === 0) { setError(`Item ${item.item_number}: at least one correct answer`); setSaving(false); return }
      }

      const tags = emiForm.tags.split(',').map(t => t.trim()).filter(Boolean)

      // 1. Update question
      const { error: e2 } = await supabase.from('questions').update({
        stem: emiForm.stem.trim(),
        options: emiForm.options.map(o => ` ${o.trim()}`),
        correct_index: emiForm.items[0]?.correct_indices[0] ?? 0,
        teaching_point: emiForm.teaching_point.trim() || null,
        domain: emiForm.domain,
        subdomain: emiForm.subdomain.trim() || null,
        difficulty: emiForm.difficulty || null,
        bloom_taxonomy: emiForm.bloom_taxonomy || null,
        paper: emiForm.paper,
        source: emiForm.source.trim() || null,
        tags: tags.length > 0 ? tags : null,
        option_labels: OPTION_LABELS(emiForm.optionCount),
        updated_at: new Date().toISOString(),
      }).eq('id', id)
      if (e2) { setError(e2.message); setSaving(false); return }

      // 2. Delete removed items + insert/update items
      const existingIds = new Set(
        emiForm.items.filter(i => i.id).map(i => i.id as string)
      )

      // Delete items no longer in the form
      const { data: currentItems } = await supabase
        .from('question_items')
        .select('id')
        .eq('question_id', id)

      if (currentItems) {
        const toDelete = currentItems
          .map(ci => ci.id)
          .filter(cid => !existingIds.has(cid))
        if (toDelete.length > 0) {
          await supabase.from('question_items').delete().in('id', toDelete)
        }
      }

      // Upsert each item
      for (const item of emiForm.items) {
        const record = {
          question_id: id,
          item_number: item.item_number,
          item_text: item.item_text.trim(),
          correct_indices: item.correct_indices,
          marks: item.marks,
          item_rationale: item.item_rationale.trim() || null,
        }
        if (item.id) {
          await supabase.from('question_items').update(record).eq('id', item.id)
        } else {
          await supabase.from('question_items').insert(record)
        }
      }

      router.push('/admin/questions'); router.refresh()
    }
  }

  const toggleActive = async () => {
    const currentActive = format === 'sba' ? sbaForm.is_active : emiForm.is_active
    const newActive = !currentActive
    await supabase.from('questions').update({ is_active: newActive, updated_at: new Date().toISOString() }).eq('id', id)
    if (format === 'sba') setSbaForm({ ...sbaForm, is_active: newActive })
    else setEmiForm({ ...emiForm, is_active: newActive })
  }

  const handleDelete = async () => {
    if (!confirm('Delete this question permanently?')) return
    await supabase.from('questions').delete().eq('id', id)
    router.push('/admin/questions'); router.refresh()
  }

  if (loading) return <AdminLayout title="Edit Question"><div className="skeleton" style={{ height: 400, borderRadius: 12 }} /></AdminLayout>

  const ic = 'input'

  return (
    <AdminLayout title="Edit Question" subtitle={format === 'emi' ? 'Extended Matching Item' : 'Single Best Answer'}>
      <div style={{ maxWidth: 820 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={toggleActive} className={`btn btn-sm ${(format === 'sba' ? sbaForm.is_active : emiForm.is_active) ? 'btn-secondary' : 'btn-primary'}`}>
            {(format === 'sba' ? sbaForm.is_active : emiForm.is_active) ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={handleDelete} className="btn btn-sm" style={{ background: 'var(--error)', color: '#fff' }}>Delete</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Format Badge ── */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              padding: '4px 10px', borderRadius: 'var(--radius-sm)',
              background: format === 'emi' ? 'var(--accent-teal-subtle)' : 'rgba(255,255,255,0.06)',
              color: format === 'emi' ? 'var(--accent-teal)' : 'var(--text-tertiary)',
              letterSpacing: '0.04em',
            }}>
              {format === 'emi' ? 'EMI' : 'SBA'}
            </span>
            {format === 'emi' && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                {emiForm.items.length} items · {emiForm.optionCount} options
              </span>
            )}
          </div>

          {/* ── Stem ── */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Stem *</label>
            <textarea
              value={format === 'sba' ? sbaForm.stem : emiForm.stem}
              onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, stem: e.target.value }) : setEmiForm({ ...emiForm, stem: e.target.value })}
              className={ic} style={{ minHeight: 80 }} required
            />
          </div>

          {/* ── EMI: Option Count ── */}
          {format === 'emi' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Option Count (5–15)</label>
              <input type="number" min={5} max={15} value={emiForm.optionCount}
                onChange={e => handleEmiOptionCount(parseInt(e.target.value) || 10)}
                className={ic} style={{ width: 100 }} />
            </div>
          )}

          {/* ── Options ── */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Options *</label>
            {format === 'sba' ? (
              sbaForm.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                  <input type="text" value={opt} onChange={e => { const o = [...sbaForm.options]; o[i] = e.target.value; setSbaForm({ ...sbaForm, options: o }) }} className={ic} />
                  <button type="button" onClick={() => setSbaForm({ ...sbaForm, correct_index: i })}
                    style={{ padding: '6px 10px', fontSize: 11, borderRadius: 'var(--radius-sm)', border: `1px solid ${sbaForm.correct_index === i ? 'rgba(34,197,94,0.3)' : 'var(--border-default)'}`, background: sbaForm.correct_index === i ? 'var(--success-subtle)' : 'transparent', color: sbaForm.correct_index === i ? 'var(--success)' : 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }}>
                    {sbaForm.correct_index === i ? '✓ Correct' : 'Correct?'}
                  </button>
                </div>
              ))
            ) : (
              emiForm.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{OPTION_LABELS(emiForm.optionCount)[i]}</span>
                  <input type="text" value={opt} onChange={e => { const o = [...emiForm.options]; o[i] = e.target.value; setEmiForm({ ...emiForm, options: o }) }} className={ic} style={{ flex: 1 }} />
                </div>
              ))
            )}
          </div>

          {/* ── SBA: Distractor Rationale ── */}
          {format === 'sba' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Distractor Rationale</label>
              {sbaForm.options.map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{String.fromCharCode(65 + i)}</span>
                  <input type="text" value={sbaForm.distractors_rationale[i] || ''} onChange={e => { const r = [...sbaForm.distractors_rationale]; r[i] = e.target.value; setSbaForm({ ...sbaForm, distractors_rationale: r }) }} className={ic} />
                </div>
              ))}
            </div>
          )}

          {/* ── EMI: Items Editor ── */}
          {format === 'emi' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>Items *</label>
                <button type="button" onClick={addEmiItem} className="btn btn-sm btn-secondary" style={{ fontSize: 11 }}>+ Add Item</button>
              </div>
              {emiForm.items.map((item, idx) => (
                <div key={idx} style={{ padding: 14, marginBottom: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)', background: 'var(--accent-teal-subtle)', padding: '2px 8px', borderRadius: 4 }}>Item {item.item_number}</span>
                    <div style={{ flex: 1 }} />
                    {emiForm.items.length > 2 && (
                      <button type="button" onClick={() => removeEmiItem(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: 12, padding: 2 }}>Remove</button>
                    )}
                  </div>
                  <input type="text" value={item.item_text} onChange={e => updateEmiItem(idx, 'item_text', e.target.value)} className={ic} placeholder="Item question text" style={{ width: '100%', marginBottom: 8 }} />
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    {OPTION_LABELS(emiForm.optionCount).map((label, oi) => (
                      <button key={oi} type="button" onClick={() => toggleEmiCorrectIndex(idx, oi)}
                        style={{
                          padding: '3px 8px', fontSize: 11, fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${item.correct_indices.includes(oi) ? 'rgba(34,197,94,0.4)' : 'var(--border-default)'}`,
                          background: item.correct_indices.includes(oi) ? 'var(--success-subtle)' : 'transparent',
                          color: item.correct_indices.includes(oi) ? 'var(--success)' : 'var(--text-tertiary)',
                          cursor: 'pointer', fontWeight: item.correct_indices.includes(oi) ? 700 : 400,
                        }}>
                        {label} {item.correct_indices.includes(oi) ? '✓' : ''}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input type="number" min={1} max={10} value={item.marks} onChange={e => updateEmiItem(idx, 'marks', parseInt(e.target.value) || 1)} className={ic} style={{ width: 70 }} placeholder="Marks" />
                    <input type="text" value={item.item_rationale} onChange={e => updateEmiItem(idx, 'item_rationale', e.target.value)} className={ic} placeholder="Item rationale" style={{ flex: 1 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Teaching Point ── */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Teaching Point</label>
            <textarea
              value={format === 'sba' ? sbaForm.teaching_point : emiForm.teaching_point}
              onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, teaching_point: e.target.value }) : setEmiForm({ ...emiForm, teaching_point: e.target.value })}
              className={ic} style={{ minHeight: 60 }}
            />
          </div>

          {/* ── Metadata ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Domain *</label>
              <select value={format === 'sba' ? sbaForm.domain : emiForm.domain}
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, domain: val }) : setEmiForm({ ...emiForm, domain: val })
                }} className={ic} required>
                <option value="">Select...</option>
                <optgroup label="Paper A">{DOMAINS_PAPER_A.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}</optgroup>
                <optgroup label="Paper B">{DOMAINS_PAPER_B.map(d => <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}</optgroup>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Paper</label>
              <select value={format === 'sba' ? sbaForm.paper : emiForm.paper}
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, paper: val }) : setEmiForm({ ...emiForm, paper: val })
                }} className={ic}>
                <option value="A">Paper A</option><option value="B">Paper B</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Difficulty</label>
              <select value={format === 'sba' ? sbaForm.difficulty : emiForm.difficulty}
                onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, difficulty: e.target.value }) : setEmiForm({ ...emiForm, difficulty: e.target.value })} className={ic}>
                <option value="">Any</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Bloom&apos;s</label>
              <select value={format === 'sba' ? sbaForm.bloom_taxonomy : emiForm.bloom_taxonomy}
                onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, bloom_taxonomy: e.target.value }) : setEmiForm({ ...emiForm, bloom_taxonomy: e.target.value })} className={ic}>
                <option value="">Select...</option><option value="recall">Recall</option><option value="application">Application</option><option value="analysis">Analysis</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Source</label>
              <input type="text" value={format === 'sba' ? sbaForm.source : emiForm.source}
                onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, source: e.target.value }) : setEmiForm({ ...emiForm, source: e.target.value })} className={ic} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Tags</label>
              <input type="text" value={format === 'sba' ? sbaForm.tags : emiForm.tags}
                onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, tags: e.target.value }) : setEmiForm({ ...emiForm, tags: e.target.value })} className={ic} placeholder="comma, separated" />
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
