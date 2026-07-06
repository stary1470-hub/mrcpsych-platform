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
  const [hasAccess, setHasAccess] = useState(false)
  const [accessChecked, setAccessChecked] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch('/api/stripe/status')
        const data = await res.json()
        setHasAccess(data.hasAccess)
      } catch {
        setHasAccess(false)
      }
      setAccessChecked(true)
    }
    checkAccess()
  }, [])

  useEffect(() => {
    if (!hasAccess) return
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
  }, [supabase, hasAccess])

  const filtered = filter === 'all' ? entries : entries.filter(e => filter === 'correct' ? e.correct : !e.correct)

  const filterButtons = [
    { key: 'all' as const, label: 'All' },
    { key: 'wrong' as const, label: 'Wrong' },
    { key: 'correct' as const, label: 'Correct' },
  ]

  return (
    <AppLayout title="Review" subtitle="Your answer history">
      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {filterButtons.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
          >
            {f.label}
            {f.key === 'all' && entries.length > 0 && (
              <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>({entries.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Subscription banner */}
      {accessChecked && !hasAccess && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(20, 184, 166, 0.06))',
          border: '1px solid rgba(236, 72, 153, 0.15)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              Subscribe to unlock full access
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
              Get unlimited questions, adaptive learning, and performance analytics.
            </div>
          </div>
          <a href="/pricing" className="btn btn-primary" style={{
            background: '#ec4899', fontSize: 13, padding: '10px 20px', whiteSpace: 'nowrap',
          }}>
            View Plans
          </a>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px' }} className="animate-fade-in">
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: 'var(--accent-teal-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>
            {entries.length === 0 ? 'No questions attempted yet.' : 'No entries match this filter.'}
          </p>
          <Link href="/quiz" className="btn btn-primary">Start practicing</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="animate-stagger">
          {filtered.map(entry => (
            <div key={entry.id} className="card" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: entry.correct ? 'var(--success-subtle)' : 'var(--error-subtle)',
                  flexShrink: 0, marginTop: 2,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={entry.correct ? 'var(--success)' : 'var(--error)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {entry.correct ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5,
                    color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    {entry.question.stem}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>{getDomainDisplayName(entry.question.domain)}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>You chose {getOptionLabel(entry.selected_index)}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>·</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(entry.answered_at)}</span>
                  </div>
                </div>
                <Link href={`/quiz/${entry.question_id}`} className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
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
