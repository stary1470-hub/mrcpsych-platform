'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'
import type { Question } from '@/types'

export default function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    stem: '',
    options: ['', '', '', '', ''],
    correct_index: 0,
    distractors_rationale: ['', '', '', '', ''],
    teaching_point: '',
    domain: '',
    subdomain: '',
    difficulty: '',
    bloom_taxonomy: '',
    paper: 'A',
    source: '',
    tags: '',
    is_active: true,
  })

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('id', id)
        .single()

      if (!data) {
        router.push('/admin/questions')
        return
      }

      const q = data as Question
      setForm({
        stem: q.stem,
        options: q.options.map(o => o.startsWith(' ') ? o.slice(1) : o),
        correct_index: q.correct_index,
        distractors_rationale: q.distractors_rationale || ['', '', '', '', ''],
        teaching_point: q.teaching_point || '',
        domain: q.domain,
        subdomain: q.subdomain || '',
        difficulty: q.difficulty || '',
        bloom_taxonomy: q.bloom_taxonomy || '',
        paper: q.paper,
        source: q.source || '',
        tags: q.tags?.join(', ') || '',
        is_active: q.is_active,
      })
      setLoading(false)
    }

    load()
  }, [supabase, id, router])

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...form.options]
    newOptions[index] = value
    setForm({ ...form, options: newOptions })
  }

  const handleRationaleChange = (index: number, value: string) => {
    const newRationale = [...form.distractors_rationale]
    newRationale[index] = value
    setForm({ ...form, distractors_rationale: newRationale })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    if (!form.stem.trim()) { setError('Stem is required'); setSaving(false); return }
    if (form.options.filter(o => o.trim()).length < 2) { setError('At least 2 options'); setSaving(false); return }
    if (!form.domain) { setError('Domain required'); setSaving(false); return }

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)

    const { error: updateError } = await supabase
      .from('questions')
      .update({
        stem: form.stem.trim(),
        options: form.options.map(o => ` ${o.trim()}`),
        correct_index: form.correct_index,
        distractors_rationale: form.distractors_rationale.map(r => r.trim()).filter(Boolean),
        teaching_point: form.teaching_point.trim() || null,
        domain: form.domain,
        subdomain: form.subdomain.trim() || null,
        difficulty: form.difficulty || null,
        bloom_taxonomy: form.bloom_taxonomy || null,
        paper: form.paper,
        source: form.source.trim() || null,
        tags: tags.length > 0 ? tags : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) { setError(updateError.message); setSaving(false); return }

    router.push('/admin/questions')
    router.refresh()
  }

  const handleToggleActive = async () => {
    await supabase
      .from('questions')
      .update({ is_active: !form.is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
    setForm({ ...form, is_active: !form.is_active })
  }

  const handleDelete = async () => {
    if (!confirm('Delete this question permanently?')) return
    await supabase.from('questions').delete().eq('id', id)
    router.push('/admin/questions')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="skeleton h-8 w-48 mb-6" />
          <div className="space-y-4">
            <div className="skeleton h-20 rounded" />
            <div className="skeleton h-12 rounded" />
            <div className="skeleton h-12 rounded" />
          </div>
        </main>
      </div>
    )
  }

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Question</h1>
          <div className="flex gap-2">
            <button
              onClick={handleToggleActive}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                form.is_active
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
              }`}
            >
              {form.is_active ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Question Stem *</label>
            <textarea
              value={form.stem}
              onChange={e => setForm({ ...form, stem: e.target.value })}
              className={inputClass + ' min-h-[80px]'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Options *</label>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400 w-5">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, correct_index: i })}
                    className={`px-2 py-1 text-xs rounded font-medium shrink-0 ${
                      form.correct_index === i
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {form.correct_index === i ? '✓ Correct' : 'Correct?'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Distractor Rationale</label>
            <div className="space-y-2">
              {form.options.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400 w-5 shrink-0">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    value={form.distractors_rationale[i] || ''}
                    onChange={e => handleRationaleChange(i, e.target.value)}
                    className={inputClass}
                    placeholder={i === form.correct_index ? 'Correct — leave blank' : 'Why wrong...'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teaching Point</label>
            <textarea
              value={form.teaching_point}
              onChange={e => setForm({ ...form, teaching_point: e.target.value })}
              className={inputClass + ' min-h-[60px]'}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Domain *</label>
              <select value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} className={inputClass} required>
                <option value="">Select...</option>
                <optgroup label="Paper A">
                  {DOMAINS_PAPER_A.map(d => (
                    <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </optgroup>
                <optgroup label="Paper B">
                  {DOMAINS_PAPER_B.map(d => (
                    <option key={d} value={d}>{d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Paper</label>
              <select value={form.paper} onChange={e => setForm({ ...form, paper: e.target.value })} className={inputClass}>
                <option value="A">Paper A</option>
                <option value="B">Paper B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className={inputClass}>
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bloom&apos;s Taxonomy</label>
              <select value={form.bloom_taxonomy} onChange={e => setForm({ ...form, bloom_taxonomy: e.target.value })} className={inputClass}>
                <option value="">Select...</option>
                <option value="recall">Recall</option>
                <option value="application">Application</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Source</label>
              <input type="text" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className={inputClass} />
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => router.push('/admin/questions')} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
