'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'
import type { QuestionFormat } from '@/types'

const OPTION_LABELS = (n: number) => Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i))

interface EmiItemForm {
  item_number: number
  item_text: string
  correct_indices: number[]  // multi-select
  marks: number
  item_rationale: string
}

export default function NewQuestionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<QuestionFormat>('sba')

  // SBA form fields
  const [sbaForm, setSbaForm] = useState({
    stem: '', options: ['', '', '', '', ''], correct_index: 0,
    distractors_rationale: ['', '', '', '', ''], teaching_point: '',
    domain: '', subdomain: '', difficulty: '', bloom_taxonomy: '', paper: 'B', source: '', tags: '',
  })

  // EMI form fields
  const [emiForm, setEmiForm] = useState({
    stem: '', optionCount: 10, options: Array(10).fill(''),
    teaching_point: '', domain: '', subdomain: '', difficulty: '',
    bloom_taxonomy: '', paper: 'B', source: '', tags: '',
    items: [] as EmiItemForm[],
  })

  const initEmiItems = () => {
    setEmiForm(prev => ({
      ...prev,
      items: [
        { item_number: 1, item_text: '', correct_indices: [], marks: 1, item_rationale: '' },
        { item_number: 2, item_text: '', correct_indices: [], marks: 1, item_rationale: '' },
        { item_number: 3, item_text: '', correct_indices: [], marks: 1, item_rationale: '' },
      ],
    }))
  }

  // Initialize EMI items on first switch to EMI mode
  const handleFormatChange = (f: QuestionFormat) => {
    setFormat(f)
    setError(null)
    if (f === 'emi' && emiForm.items.length === 0) initEmiItems()
  }

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

  const updateEmiItem = (idx: number, field: keyof EmiItemForm, value: any) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null)

    if (format === 'sba') {
      // ── Validate SBA ──
      if (!sbaForm.stem.trim()) { setError('Stem required'); setSaving(false); return }
      if (sbaForm.options.filter(o => o.trim()).length < 2) { setError('At least 2 options required'); setSaving(false); return }
      if (!sbaForm.domain) { setError('Domain required'); setSaving(false); return }

      const tags = sbaForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      const { error: e2 } = await supabase.from('questions').insert({
        stem: sbaForm.stem.trim(), options: sbaForm.options.map(o => ` ${o.trim()}`),
        correct_index: sbaForm.correct_index,
        distractors_rationale: sbaForm.distractors_rationale.map(r => r.trim()).filter(Boolean),
        teaching_point: sbaForm.teaching_point.trim() || null, domain: sbaForm.domain,
        subdomain: sbaForm.subdomain.trim() || null, difficulty: sbaForm.difficulty || null,
        bloom_taxonomy: sbaForm.bloom_taxonomy || null, paper: sbaForm.paper,
        source: sbaForm.source.trim() || null, tags: tags.length > 0 ? tags : null,
      })
      if (e2) { setError(e2.message); setSaving(false); return }
      router.push('/admin/questions'); router.refresh()
    } else {
      // ── Validate EMI ──
      if (!emiForm.stem.trim()) { setError('Stem required'); setSaving(false); return }
      if (emiForm.options.filter(o => o.trim()).length < 2) { setError('At least 2 options required'); setSaving(false); return }
      if (!emiForm.domain) { setError('Domain required'); setSaving(false); return }
      if (emiForm.items.length < 2) { setError('At least 2 items required for EMI'); setSaving(false); return }
      for (const item of emiForm.items) {
        if (!item.item_text.trim()) { setError(`Item ${item.item_number}: text required`); setSaving(false); return }
        if (item.correct_indices.length === 0) { setError(`Item ${item.item_number}: at least one correct answer required`); setSaving(false); return }
      }

      const tags = emiForm.tags.split(',').map(t => t.trim()).filter(Boolean)

      // 1. Insert the question
      const { data: question, error: e2 } = await supabase.from('questions').insert({
        stem: emiForm.stem.trim(),
        options: emiForm.options.map(o => ` ${o.trim()}`),
        correct_index: emiForm.items[0]?.correct_indices[0] ?? 0, // placeholder
        teaching_point: emiForm.teaching_point.trim() || null,
        domain: emiForm.domain,
        subdomain: emiForm.subdomain.trim() || null,
        difficulty: emiForm.difficulty || null,
        bloom_taxonomy: emiForm.bloom_taxonomy || null,
        paper: emiForm.paper,
        source: emiForm.source.trim() || null,
        tags: tags.length > 0 ? tags : null,
      }).select('id').single()

      if (e2 || !question) { setError(e2?.message || 'Failed to create question'); setSaving(false); return }

      // 2. Insert items
      const itemRecords = emiForm.items.map(item => ({
        question_id: question.id,
        item_number: item.item_number,
        item_text: item.item_text.trim(),
        correct_indices: item.correct_indices,
        marks: item.marks,
        item_rationale: item.item_rationale.trim() || null,
      }))

      const { error: e3 } = await supabase.from('question_items').insert(itemRecords)
      if (e3) { setError(e3.message); setSaving(false); return }

      router.push('/admin/questions'); router.refresh()
    }
  }

  const ic = 'input'
  const labels = OPTION_LABELS(format === 'sba' ? sbaForm.options.length : emiForm.optionCount)

  return (
    <AdminLayout title="Add Question" subtitle={format === 'emi' ? 'Extended Matching Item' : 'Single Best Answer'}>
      <div style={{ maxWidth: 820 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Format Switcher ── */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => handleFormatChange('sba')}
              className={`btn btn-sm ${format === 'sba' ? 'btn-primary' : 'btn-secondary'}`}>
              SBA (Single Best Answer)
            </button>
            <button type="button" onClick={() => handleFormatChange('emi')}
              className={`btn btn-sm ${format === 'emi' ? 'btn-primary' : 'btn-secondary'}`}>
              EMI (Extended Matching Item)
            </button>
          </div>

          {/* ── Stem ── */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Stem *</label>
            <textarea
              value={format === 'sba' ? sbaForm.stem : emiForm.stem}
              onChange={e => format === 'sba' ? setSbaForm({ ...sbaForm, stem: e.target.value }) : setEmiForm({ ...emiForm, stem: e.target.value })}
              className={ic} style={{ minHeight: 80 }}
              placeholder={format === 'emi' ? 'Clinical scenario shared across all items...' : 'Which of the following best describes...?'}
              required
            />
          </div>

          {/* ── EMI: Option Count Control ── */}
          {format === 'emi' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>
                Option Count (5–15)
              </label>
              <input
                type="number" min={5} max={15}
                value={emiForm.optionCount}
                onChange={e => handleEmiOptionCount(parseInt(e.target.value) || 10)}
                className={ic} style={{ width: 100 }}
              />
            </div>
          )}

          {/* ── Options ── */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Options *</label>
            {format === 'sba' ? (
              sbaForm.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{labels[i]}</span>
                  <input type="text" value={opt} onChange={e => { const o = [...sbaForm.options]; o[i] = e.target.value; setSbaForm({ ...sbaForm, options: o }) }} className={ic} placeholder={`Option ${labels[i]}`} />
                  <button type="button" onClick={() => setSbaForm({ ...sbaForm, correct_index: i })}
                    style={{ padding: '6px 10px', fontSize: 11, borderRadius: 'var(--radius-sm)', border: `1px solid ${sbaForm.correct_index === i ? 'rgba(34,197,94,0.3)' : 'var(--border-default)'}`, background: sbaForm.correct_index === i ? 'var(--success-subtle)' : 'transparent', color: sbaForm.correct_index === i ? 'var(--success)' : 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }}>
                    {sbaForm.correct_index === i ? '✓ Correct' : 'Correct?'}
                  </button>
                </div>
              ))
            ) : (
              emiForm.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{labels[i]}</span>
                  <input type="text" value={opt} onChange={e => { const o = [...emiForm.options]; o[i] = e.target.value; setEmiForm({ ...emiForm, options: o }) }} className={ic} placeholder={`Option ${labels[i]}`} style={{ flex: 1 }} />
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
                  <span style={{ width: 20, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{labels[i]}</span>
                  <input type="text" value={sbaForm.distractors_rationale[i] || ''} onChange={e => { const r = [...sbaForm.distractors_rationale]; r[i] = e.target.value; setSbaForm({ ...sbaForm, distractors_rationale: r }) }} className={ic} placeholder={i === sbaForm.correct_index ? 'Correct answer' : 'Why this is wrong...'} />
                </div>
              ))}
            </div>
          )}

          {/* ── EMI: Items Editor ── */}
          {format === 'emi' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>Items *</label>
                <button type="button" onClick={addEmiItem} className="btn btn-sm btn-secondary" style={{ fontSize: 11 }}>
                  + Add Item
                </button>
              </div>

              {emiForm.items.map((item, idx) => (
                <div key={idx} style={{
                  padding: 14, marginBottom: 12,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-card)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                      color: 'var(--accent-teal)', background: 'var(--accent-teal-subtle)',
                      padding: '2px 8px', borderRadius: 4,
                    }}>
                      Item {item.item_number}
                    </span>
                    <div style={{ flex: 1 }} />
                    {emiForm.items.length > 2 && (
                      <button type="button" onClick={() => removeEmiItem(idx)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: 12, padding: 2 }}>
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <input
                      type="text" value={item.item_text}
                      onChange={e => updateEmiItem(idx, 'item_text', e.target.value)}
                      className={ic} placeholder="e.g. What is the most likely diagnosis?"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    {labels.map((label, oi) => (
                      <button key={oi} type="button"
                        onClick={() => toggleEmiCorrectIndex(idx, oi)}
                        style={{
                          padding: '4px 10px', fontSize: 12, fontFamily: 'var(--font-mono)',
                          borderRadius: 'var(--radius-sm)',
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
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" min={1} max={10}
                        value={item.marks}
                        onChange={e => updateEmiItem(idx, 'marks', parseInt(e.target.value) || 1)}
                        className={ic} style={{ width: 70 }}
                        placeholder="Marks"
                      />
                    </div>
                    <div style={{ flex: 3 }}>
                      <input
                        type="text" value={item.item_rationale}
                        onChange={e => updateEmiItem(idx, 'item_rationale', e.target.value)}
                        className={ic}
                        placeholder="Item rationale (explanation for this item's answer)"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SBA: Teaching Point ── */}
          {format === 'sba' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Teaching Point</label>
              <textarea value={sbaForm.teaching_point} onChange={e => setSbaForm({ ...sbaForm, teaching_point: e.target.value })} className={ic} style={{ minHeight: 60 }} placeholder="Key concept to learn..." />
            </div>
          )}

          {/* ── EMI: Teaching Point ── */}
          {format === 'emi' && (
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Teaching Point (overall)</label>
              <textarea value={emiForm.teaching_point} onChange={e => setEmiForm({ ...emiForm, teaching_point: e.target.value })} className={ic} style={{ minHeight: 60 }} placeholder="Key concepts to learn from this EMI scenario..." />
            </div>
          )}

          {/* ── Metadata Fields ── */}
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
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, difficulty: val }) : setEmiForm({ ...emiForm, difficulty: val })
                }} className={ic}>
                <option value="">Any</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Bloom&apos;s</label>
              <select value={format === 'sba' ? sbaForm.bloom_taxonomy : emiForm.bloom_taxonomy}
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, bloom_taxonomy: val }) : setEmiForm({ ...emiForm, bloom_taxonomy: val })
                }} className={ic}>
                <option value="">Select...</option><option value="recall">Recall</option><option value="application">Application</option><option value="analysis">Analysis</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Source</label>
              <input type="text" value={format === 'sba' ? sbaForm.source : emiForm.source}
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, source: val }) : setEmiForm({ ...emiForm, source: val })
                }} className={ic} placeholder="NICE CG178 §1.3" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Tags</label>
              <input type="text" value={format === 'sba' ? sbaForm.tags : emiForm.tags}
                onChange={e => {
                  const val = e.target.value
                  format === 'sba' ? setSbaForm({ ...sbaForm, tags: val }) : setEmiForm({ ...emiForm, tags: val })
                }} className={ic} placeholder="dopamine, antipsychotics" />
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
