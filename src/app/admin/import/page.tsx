'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'

export default function ImportPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ success: number; errors: string[] } | null>(null)
  const [jsonInput, setJsonInput] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true); setResult(null)
    try {
      const text = await file.text()
      const questions = file.name.endsWith('.json')
        ? JSON.parse(text)
        : parseCSV(text)
      await importQuestions(Array.isArray(questions) ? questions : [questions])
    } catch (err: any) { setResult({ success: 0, errors: [err.message] }) }
    setImporting(false)
  }

  const handleJson = async () => {
    if (!jsonInput.trim()) return
    setImporting(true); setResult(null)
    try {
      const q = JSON.parse(jsonInput)
      await importQuestions(Array.isArray(q) ? q : [q])
    } catch (err: any) { setResult({ success: 0, errors: [err.message] }) }
    setImporting(false)
  }

  const importQuestions = async (questions: any[]) => {
    const errors: string[] = []; let success = 0
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      try {
        const row = {
          stem: q.stem || '', options: (q.options || []).map((o: string) => o.startsWith(' ') ? o : ` ${o}`),
          correct_index: q.correct_index ?? 0, distractors_rationale: q.distractors_rationale || null,
          teaching_point: q.teaching_point || null, domain: q.domain || '',
          subdomain: q.subdomain || null, difficulty: q.difficulty || null,
          bloom_taxonomy: q.bloom_taxonomy || null, paper: q.paper || 'A',
          tags: q.tags || null, source: q.source || null,
        }
        if (!row.stem) { errors.push(`Row ${i + 1}: Missing stem`); continue }
        if (!Array.isArray(row.options) || row.options.length < 2) { errors.push(`Row ${i + 1}: Need 2+ options`); continue }
        if (!row.domain) { errors.push(`Row ${i + 1}: Missing domain`); continue }
        const { error } = await supabase.from('questions').insert(row)
        if (error) { errors.push(`Row ${i + 1}: ${error.message}`); continue }
        success++
      } catch (err: any) { errors.push(`Row ${i + 1}: ${err.message}`) }
    }
    setResult({ success, errors })
  }

  return (
    <AdminLayout title="Import" subtitle="Bulk upload questions">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* File upload */}
        <div className="card">
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Upload File</h2>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>JSON (array of question objects) or CSV.</p>
          <input
            ref={fileRef}
            type="file"
            accept=".json,.csv"
            onChange={handleFile}
            disabled={importing}
            style={{
              width: '100%', fontSize: 12, color: 'var(--text-secondary)',
              '--file-button-bg': 'var(--accent-blue-subtle)',
              '--file-button-color': 'var(--accent-blue)',
            } as any}
            className="input"
          />
          <div style={{ marginTop: 8 }}>
            <a href="/template-questions.json" style={{ fontSize: 11, color: 'var(--accent-blue)', textDecoration: 'none' }}>
              Download JSON template →
            </a>
          </div>
        </div>

        {/* JSON paste */}
        <div className="card">
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Paste JSON</h2>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>Paste an array of question objects.</p>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            className="input"
            style={{ minHeight: 150, fontFamily: 'var(--font-mono)', fontSize: 11 }}
            placeholder='[{ "stem": "...", "options": ["...", "..."], "correct_index": 0, "domain": "..." }]'
          />
          <button
            onClick={handleJson}
            disabled={importing || !jsonInput.trim()}
            className="btn btn-primary btn-sm"
            style={{ marginTop: 8 }}
          >
            {importing ? 'Importing...' : 'Import from JSON'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="card" style={{ marginTop: 16, border: `1px solid ${
          result.errors.length === 0 ? 'rgba(34,197,94,0.2)' : result.success > 0 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'
        }`, background: result.errors.length === 0 ? 'var(--success-subtle)' : result.success > 0 ? 'var(--warning-subtle)' : 'var(--error-subtle)' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: result.errors.length === 0 ? 'var(--success)' : result.success > 0 ? 'var(--warning)' : 'var(--error)' }}>
            {result.success} question{result.success !== 1 ? 's' : ''} imported.
          </p>
          {result.errors.length > 0 && (
            <div style={{ marginTop: 8, maxHeight: 120, overflowY: 'auto', fontSize: 11, color: 'var(--error)' }}>
              {result.errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}
          {result.success > 0 && (
            <button onClick={() => router.push('/admin/questions')} className="btn btn-ghost btn-sm" style={{ marginTop: 8 }}>
              View all →
            </button>
          )}
        </div>
      )}
    </AdminLayout>
  )
}

function parseCSV(text: string): any[] {
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length < 2) throw new Error('CSV must have header + data rows')
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim())
    const obj: any = {}
    headers.forEach((h, i) => {
      const val = values[i] || ''
      if (h === 'options') obj[h] = val.split(';').map((o: string) => o.trim()).filter(Boolean)
      else if (['correct_index', 'correctindex', 'answer'].includes(h)) obj.correct_index = parseInt(val) || 0
      else obj[h] = val
    })
    return obj
  })
}
