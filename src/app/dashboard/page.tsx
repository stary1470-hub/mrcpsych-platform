'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'
import Link from 'next/link'

interface DomainStat {
  domain: string
  total_attempted: number
  total_correct: number
  percentage: number
}

export default function DashboardPage() {
  const supabase = createClient()
  const [stats, setStats] = useState<DomainStat[]>([])
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { count } = await supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true)
      setTotalQuestions(count || 0)

      const { data: ds } = await supabase.rpc('get_user_domain_stats', { p_user_id: user.id })
      if (ds) {
        setStats(ds as DomainStat[])
        setTotalAttempted(ds.reduce((s: number, d: DomainStat) => s + Number(d.total_attempted), 0))
        setTotalCorrect(ds.reduce((s: number, d: DomainStat) => s + Number(d.total_correct), 0))
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  const overallPct = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0

  const getScoreColor = (pct: number) => {
    if (pct >= 70) return 'var(--success)'
    if (pct >= 50) return 'var(--warning)'
    return 'var(--error)'
  }

  return (
    <AppLayout title="Dashboard" subtitle="Your performance overview">
      {/* Stats row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, marginBottom: 32,
      }} className="animate-stagger">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: 'var(--accent-teal-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
          </div>
          {loading ? (
            <div className="skeleton" style={{ height: 36, width: 80, marginBottom: 8 }} />
          ) : (
            <div className="stat-value" style={{ color: 'var(--accent-teal)' }}>{overallPct}%</div>
          )}
          <div className="stat-label">Overall Score</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
            {totalAttempted} of {totalQuestions} answered
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: 'var(--success-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{totalCorrect}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: 'rgba(100, 116, 139, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.length}</div>
          <div className="stat-label">Domains</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
            {totalQuestions} total questions
          </div>
        </div>
      </div>

      {/* Domain breakdown */}
      <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden', animationDelay: '0.2s' }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400 }}>Domain Performance</h2>
          <Link href="/quiz" className="btn btn-ghost btn-sm">
            Practice
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: 24 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8, borderRadius: 12 }} />
            ))}
          </div>
        ) : stats.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--accent-teal-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20 }}>
              No questions attempted yet. Start your preparation journey.
            </p>
            <Link href="/quiz" className="btn btn-primary">Start your first practice</Link>
          </div>
        ) : (
          <div style={{ padding: '12px 24px 20px' }} className="animate-stagger">
            {stats.map((s, i) => (
              <Link key={s.domain} href={`/quiz?domain=${s.domain}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 12px', borderRadius: 12,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-teal-subtle)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: getDomainColor(s.domain), flexShrink: 0,
                    boxShadow: `0 0 8px ${getDomainColor(s.domain)}40`,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                      color: 'var(--text-primary)', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {getDomainDisplayName(s.domain)}
                    </div>
                    <div className="progress-bar" style={{ marginTop: 8 }}>
                      <div
                        className="progress-fill progress-fill-teal"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                      {s.total_correct}/{s.total_attempted}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400,
                      color: getScoreColor(s.percentage),
                    }}>
                      {s.percentage}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
