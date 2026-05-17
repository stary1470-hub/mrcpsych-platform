'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'

export default function ImportPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{
    success: number
    errors: string[]
  } | null>(null)
  const [jsonInput, setJsonInput] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setResult(null)

    try {
      const text = await file.text()
      let questions: any[]

      if (file.name.endsWith('.json')) {
        questions = JSON.parse(text)
        if (!Array.isArray(questions)) questions = [questions]
      } else if (file.name.endsWith('.csv')) {
        questions = parseCSV(text)
      } else {
        throw new Error('Unsupported file format. Use .json or .csv')
      }

      await importQuestions(questions)
    } catch (err: any) {
      setResult({ success: 0, errors: [err.message] })
    }

    setImporting(false)
  }

  const handleJsonImport = async () => {
    if (!jsonInput.trim()) return
    setImporting(true)
    setResult(null)

    try {
      const questions = JSON.parse(jsonInput)
      const arr = Array.isArray(questions) ? questions : [questions]
      await importQuestions(arr)
    } catch (err: any) {
      setResult({ success: 0, errors: [err.message] })
    }

    setImporting(false)
  }

  const importQuestions = async (questions: any[]) => {
    const errors: string[] = []
    let success = 0

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      try {
        // Normalize fields
        const row = {
          stem: q.stem || q.question || '',
          options: q.options || [],
          correct_index: q.correct_index ?? q.correctAnswer ?? q.answer ?? 0,
          distractors_rationale: q.distractors_rationale || q.rationale || null,
          teaching_point: q.teaching_point || q.explanation || null,
          domain: q.domain || '',
          subdomain: q.subdomain || null,
          difficulty: q.difficulty || null,
          bloom_taxonomy: q.bloom_taxonomy || q.bloom || null,
          paper: q.paper || 'A',
          tags: q.tags || null,
          source: q.source || null,
        }

        if (!row.stem) { errors.push(`Row ${i + 1}: Missing stem`); continue }
        if (!Array.isArray(row.options) || row.options.length < 2) { errors.push(`Row ${i + 1}: Need 2+ options`); continue }
        if (!row.domain) { errors.push(`Row ${i + 1}: Missing domain`); continue }

        // Clean options
        row.options = row.options.map((o: string) => o.startsWith(' ') ? o : ` ${o}`)

        const { error: insertError } = await supabase.from('questions').insert(row)
        if (insertError) { errors.push(`Row ${i + 1}: ${insertError.message}`); continue }

        success++
      } catch (err: any) {
        errors.push(`Row ${i + 1}: ${err.message}`)
      }
    }

    setResult({ success, errors })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Bulk Import Questions</h1>

        {/* File upload */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-sm mb-3">Upload File</h2>
          <p className="text-xs text-gray-500 mb-4">
            Upload a JSON or CSV file. JSON expects an array of question objects. CSV should have columns: stem, options (semicolon-separated), correct_index, domain, paper, teaching_point, etc.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            onChange={handleFileUpload}
            disabled={importing}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* JSON paste */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-sm mb-3">Or Paste JSON</h2>
          <p className="text-xs text-gray-500 mb-3">
            Paste an array of question objects directly.
          </p>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
            placeholder='[
  {
    "stem": "Which of the following...",
    "options": ["Option A", "Option B", "Option C", "Option D", "Option E"],
    "correct_index": 0,
    "domain": "psychopharmacology",
    "paper": "A",
    "teaching_point": "Key concept...",
    "difficulty": "medium"
  }
]'
          />
          <button
            onClick={handleJsonImport}
            disabled={importing || !jsonInput.trim()}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {importing ? 'Importing...' : 'Import from JSON'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className={`rounded-xl border p-5 ${
            result.errors.length === 0
              ? 'bg-green-50 border-green-200'
              : result.success > 0
              ? 'bg-amber-50 border-amber-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <p className="font-semibold text-sm">
              {result.success} question{result.success !== 1 ? 's' : ''} imported successfully.
            </p>
            {result.errors.length > 0 && (
              <div className="mt-2 max-h-40 overflow-y-auto">
                {result.errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600 mt-1">{err}</p>
                ))}
              </div>
            )}
            {result.success > 0 && (
              <button
                onClick={() => router.push('/admin/questions')}
                className="mt-3 text-sm text-blue-600 hover:underline font-medium"
              >
                View all questions →
              </button>
            )}
          </div>
        )}

        {/* Template link */}
        <div className="mt-4 text-center">
          <a
            href="/template-questions.json"
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Download JSON template
          </a>
        </div>
      </main>
    </div>
  )
}

function parseCSV(text: string): any[] {
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length < 2) throw new Error('CSV must have header + at least 1 row')

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  const rows = lines.slice(1)

  return rows.map((line, i) => {
    const values = line.split(',').map(v => v.trim())
    const obj: any = {}

    headers.forEach((h, idx) => {
      const val = values[idx] || ''

      if (h === 'options') {
        obj[h] = val.split(';').map((o: string) => o.trim()).filter(Boolean)
      } else if (h === 'tags') {
        obj[h] = val.split(';').map((t: string) => t.trim()).filter(Boolean)
      } else if (['correct_index', 'correctindex', 'answer'].includes(h)) {
        obj.correct_index = parseInt(val) || 0
      } else {
        obj[h] = val
      }
    })

    return obj
  })
}
