'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'

const ALL_DOMAINS = [
  { value: '', label: 'Select domain...', disabled: true },
  ...[...DOMAINS_PAPER_A, ...DOMAINS_PAPER_B].map(d => ({
    value: d,
    label: d.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  })),
]

export default function NewQuestionPage() {
  const router = useRouter()
  const supabase = createClient()
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
  })

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

    // Validate
    if (!form.stem.trim()) { setError('Question stem is required'); setSaving(false); return }
    if (form.options.filter(o => o.trim()).length < 2) { setError('At least 2 options required'); setSaving(false); return }
    if (!form.domain) { setError('Domain is required'); setSaving(false); return }

    const tags = form.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const { error: insertError } = await supabase.from('questions').insert({
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
    })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push('/admin/questions')
    router.refresh()
  }

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Add Question</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Stem */}
          <div>
            <label className="block text-sm font-medium mb-1">Question Stem *</label>
            <textarea
              value={form.stem}
              onChange={e => setForm({ ...form, stem: e.target.value })}
              className={inputClass + " min-h-[80px]"}
              placeholder="Which of the following best describes...?"
              required
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium mb-1">Options *</label>
            <p className="text-xs text-gray-400 mb-2">Option A is the correct one by default. Change below if needed.</p>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400 w-5">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                    className={inputClass}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, correct_index: i })}
                    className={`px-2 py-1 text-xs rounded font-medium shrink-0 ${
                      form.correct_index === i
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-500 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {form.correct_index === i ? '✓ Correct' : 'Correct?'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Distractors rationale */}
          <div>
            <label className="block text-sm font-medium mb-1">Distractor Rationale (why each wrong answer is wrong)</label>
            <div className="space-y-2">
              {form.options.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400 w-5 shrink-0">{String.fromCharCode(65 + i)}.</span>
                  <input
                    type="text"
                    value={form.distractors_rationale[i] || ''}
                    onChange={e => handleRationaleChange(i, e.target.value)}
                    className={inputClass}
                    placeholder={i === form.correct_index ? 'This is correct — leave blank' : 'Why this is wrong...'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Teaching point */}
          <div>
            <label className="block text-sm font-medium mb-1">Teaching Point</label>
            <textarea
              value={form.teaching_point}
              onChange={e => setForm({ ...form, teaching_point: e.target.value })}
              className={inputClass + " min-h-[60px]"}
              placeholder="Key concept the candidate should learn from this question..."
            />
          </div>

          {/* Metadata row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Domain *</label>
              <select
                value={form.domain}
                onChange={e => setForm({ ...form, domain: e.target.value })}
                className={inputClass}
                required
              >
                <option value="">Select domain...</option>
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
              <select
                value={form.paper}
                onChange={e => setForm({ ...form, paper: e.target.value })}
                className={inputClass}
              >
                <option value="A">Paper A</option>
                <option value="B">Paper B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={e => setForm({ ...form, difficulty: e.target.value })}
                className={inputClass}
              >
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
              <select
                value={form.bloom_taxonomy}
                onChange={e => setForm({ ...form, bloom_taxonomy: e.target.value })}
                className={inputClass}
              >
                <option value="">Select...</option>
                <option value="recall">Recall</option>
                <option value="application">Application</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Source (guideline reference)</label>
              <input
                type="text"
                value={form.source}
                onChange={e => setForm({ ...form, source: e.target.value })}
                className={inputClass}
                placeholder="e.g., NICE CG178 §1.3.2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className={inputClass}
              placeholder="e.g., dopamine, antipsychotics, side-effects"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : 'Save Question'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/questions')}
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
