'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getOptionLabel, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Entry {
  id: string; question_id: string; selected_index: number; correct: boolean; answered_at: string
  question: { stem: string; domain: string; correct_index: number; teaching_point: string | null }
}

export default function ReviewPage() {
  const supabase = createClient()
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_progress')
        .select(`id, question_id, selected_index, correct, answered_at, question:questions!inner(stem, domain, correct_index, teaching_point)`)
        .eq('user_id', user.id)
        .order('answered_at', { ascending: false })
        .limit(100)

      if (data) setEntries(data as unknown as Entry[])
      setLoading(false)
    }
    load()
  }, [supabase])

  const filtered = filter === 'all' ? entries : entries.filter(e => filter === 'correct' ? e.correct : !e.correct)

  return (
    <AppLayout title="Review" subtitle="Your answer history">
      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {(['all', 'wrong', 'correct'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && entries.length > 0 && (
              <span style={{ fontSize: 10, opacity: 0.7 }}>({entries.length})</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 72, borderRadius: 12 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12 }}>
            {entries.length === 0 ? 'No questions attempted yet.' : 'No entries match this filter.'}
          </p>
          <Link href="/quiz" className="btn btn-primary">Start practicing →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(entry => (
            <div key={entry.id} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: entry.correct ? 'var(--success-subtle)' : 'var(--error-subtle)',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <span style={{ fontSize: 12 }}>{entry.correct ? '✓' : '✗'}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry.question.stem}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>{getDomainDisplayName(entry.question.domain)}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>You chose {getOptionLabel(entry.selected_index)}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>•</span>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{formatDate(entry.answered_at)}</span>
                  </div>
                </div>
                <Link
                  href={`/quiz/${entry.question_id}`}
                  className="btn btn-ghost btn-sm"
                  style={{ flexShrink: 0, fontSize: 11 }}
                >
                  Retry
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
