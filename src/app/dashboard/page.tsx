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

  return (
    <AppLayout title="Dashboard" subtitle="Your performance overview">
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <div className="stat-card">
          {loading ? (
            <div className="skeleton" style={{ height: 24, width: 60, marginBottom: 6 }} />
          ) : (
            <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{overallPct}%</div>
          )}
          <div className="stat-label">Overall Score</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {totalAttempted} of {totalQuestions} answered
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{totalCorrect}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-purple)' }}>{stats.length}</div>
          <div className="stat-label">Domains</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {totalQuestions} total questions
          </div>
        </div>
      </div>

      {/* Domain breakdown */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600 }}>Domain Performance</h2>
          <Link href="/quiz" className="btn btn-ghost btn-sm">Practice →</Link>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 44, marginBottom: 6, borderRadius: 8 }} />
            ))}
          </div>
        ) : stats.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12 }}>No questions attempted yet.</p>
            <Link href="/quiz" className="btn btn-primary">Start your first practice →</Link>
          </div>
        ) : (
          <div style={{ padding: '8px 20px 16px' }}>
            {stats.map(s => (
              <Link key={s.domain} href={`/quiz?domain=${s.domain}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 8px', borderRadius: 8,
                    transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-blue-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: getDomainColor(s.domain).replace('bg-', '').replace('blue', 'var(--accent-blue)').replace('green', 'var(--success)').replace('emerald', 'var(--success)').replace('red', 'var(--error)').replace('amber', 'var(--warning)').replace('purple', 'var(--accent-purple)'), flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {getDomainDisplayName(s.domain)}
                    </div>
                    <div className="progress-bar" style={{ marginTop: 4 }}>
                      <div
                        className="progress-fill progress-fill-blue"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {s.total_correct}/{s.total_attempted}
                    </div>
                    <div style={{
                      fontSize: 12, fontWeight: 600,
                      color: s.percentage >= 70 ? 'var(--success)' : s.percentage >= 50 ? 'var(--warning)' : 'var(--error)',
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
