'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B, type PaperType } from '@/types'
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
  const [totalQuestionsA, setTotalQuestionsA] = useState(0)
  const [totalQuestionsB, setTotalQuestionsB] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | PaperType>('all')
  const [subscription, setSubscription] = useState<any>(null)
  const [subLoading, setSubLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      // Check subscription
      try {
        const res = await fetch('/api/stripe/status')
        const data = await res.json()
        setSubscription(data)
      } catch {
        setSubscription(null)
      }
      setSubLoading(false)

      const [qA, qB, ds] = await Promise.all([
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true).eq('paper', 'A'),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true).eq('paper', 'B'),
        supabase.rpc('get_user_domain_stats', { p_user_id: user.id }),
      ])

      setTotalQuestionsA(qA.count || 0)
      setTotalQuestionsB(qB.count || 0)
      if (ds.data) setStats(ds.data as DomainStat[])
      setLoading(false)
    }
    load()
  }, [supabase])

  const domainsA = activeTab === 'B' ? [] : stats.filter(s => (DOMAINS_PAPER_A as readonly string[]).includes(s.domain))
  const domainsB = activeTab === 'A' ? [] : stats.filter(s => (DOMAINS_PAPER_B as readonly string[]).includes(s.domain))
  const visibleStats = activeTab === 'all' ? stats : activeTab === 'A' ? domainsA : domainsB

  const totalAttempted = visibleStats.reduce((s, d) => s + Number(d.total_attempted), 0)
  const totalCorrect = visibleStats.reduce((s, d) => s + Number(d.total_correct), 0)
  const overallPct = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0
  const totalQs = activeTab === 'A' ? totalQuestionsA : activeTab === 'B' ? totalQuestionsB : totalQuestionsA + totalQuestionsB

  const getScoreColor = (pct: number) => {
    if (pct >= 70) return 'var(--success)'
    if (pct >= 50) return 'var(--warning)'
    return 'var(--error)'
  }

  const tabs = [
    { id: 'all' as const, label: 'All Papers', color: 'var(--text-primary)' },
    { id: 'A' as const, label: 'Paper A', color: 'var(--accent-teal)', badge: totalQuestionsA },
    { id: 'B' as const, label: 'Paper B', color: '#ec4899', badge: totalQuestionsB },
  ]

  return (
    <AppLayout title="Dashboard" subtitle="Your performance overview">
      {/* Subscription banner */}
      {!subLoading && subscription && !subscription.hasAccess && (
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
      {/* Paper tabs */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 24,
        background: 'var(--surface-card)', borderRadius: 'var(--radius-md)',
        padding: 4, border: '1px solid var(--border-subtle)',
        width: 'fit-content',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? tab.color : 'transparent',
              color: activeTab === tab.id ? (tab.id === 'all' ? 'var(--surface-base)' : '#fff') : 'var(--text-tertiary)',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {tab.label}
            {tab.badge !== undefined && activeTab !== tab.id && (
              <span style={{
                fontSize: 10, fontWeight: 700, color: tab.color,
                background: `${tab.color}15`, padding: '1px 6px', borderRadius: 4,
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

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
            {totalAttempted} of {totalQs} answered
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
          <div className="stat-value">{visibleStats.length}</div>
          <div className="stat-label">Domains</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
            {totalQs} total questions
          </div>
        </div>
      </div>

      {/* Paper A Domain breakdown */}
      {(activeTab === 'all' || activeTab === 'A') && domainsA.length > 0 && (
        <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden', marginBottom: 24, animationDelay: '0.1s' }}>
          <div style={{
            padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-teal)' }} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400 }}>Paper A — Scientific &amp; Theoretical Basis</h2>
            </div>
            <Link href="/quiz?paper=A" className="btn btn-ghost btn-sm">
              Practice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div style={{ padding: '12px 24px 20px' }} className="animate-stagger">
            {domainsA.map(s => (
              <Link key={s.domain} href={`/quiz?domain=${s.domain}&paper=A`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 12px', borderRadius: 12,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-teal-subtle)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: getDomainColor(s.domain), flexShrink: 0, boxShadow: `0 0 8px ${getDomainColor(s.domain)}40` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {getDomainDisplayName(s.domain)}
                    </div>
                    <div className="progress-bar" style={{ marginTop: 8 }}>
                      <div className="progress-fill progress-fill-teal" style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>{s.total_correct}/{s.total_attempted}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: getScoreColor(s.percentage) }}>{s.percentage}%</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Paper B Domain breakdown */}
      {(activeTab === 'all' || activeTab === 'B') && domainsB.length > 0 && (
        <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden', marginBottom: 24, animationDelay: '0.2s' }}>
          <div style={{
            padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ec4899' }} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400 }}>Paper B — Critical Review &amp; Clinical Topics</h2>
            </div>
            <Link href="/quiz?paper=B" className="btn btn-ghost btn-sm">
              Practice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div style={{ padding: '12px 24px 20px' }} className="animate-stagger">
            {domainsB.map(s => (
              <Link key={s.domain} href={`/quiz?domain=${s.domain}&paper=B`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 12px', borderRadius: 12,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(236, 72, 153, 0.06)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: getDomainColor(s.domain), flexShrink: 0, boxShadow: `0 0 8px ${getDomainColor(s.domain)}40` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {getDomainDisplayName(s.domain)}
                    </div>
                    <div className="progress-bar" style={{ marginTop: 8 }}>
                      <div className="progress-fill" style={{ width: `${s.percentage}%`, background: 'linear-gradient(90deg, #ec4899, #d946ef)' }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>{s.total_correct}/{s.total_attempted}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: getScoreColor(s.percentage) }}>{s.percentage}%</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && visibleStats.length === 0 && (
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
            {activeTab === 'A'
              ? 'No Paper A questions attempted yet. Start with the basic sciences.'
              : activeTab === 'B'
                ? 'No Paper B questions attempted yet. Start with clinical sciences.'
                : 'No questions attempted yet. Start your preparation journey.'}
          </p>
          <Link href={activeTab === 'B' ? '/quiz?paper=B' : '/quiz?paper=A'} className="btn btn-primary">
            {activeTab === 'B' ? 'Start Paper B Practice' : 'Start Paper A Practice'}
          </Link>
        </div>
      )}
    </AppLayout>
  )
}
