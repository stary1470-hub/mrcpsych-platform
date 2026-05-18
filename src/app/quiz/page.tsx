'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'

interface DomainOption {
  domain: string; count: number; attempted: number; percentage: number | null
}

export default function QuizMenuPage() {
  const router = useRouter()
  const supabase = createClient()
  const [domains, setDomains] = useState<DomainOption[]>([])
  const [loading, setLoading] = useState(true)
  const [adapting, setAdapting] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: allQuestions } = await supabase.from('questions').select('domain').eq('is_active', true)
      const countMap = new Map<string, number>()
      if (allQuestions) {
        for (const row of allQuestions) {
          countMap.set(row.domain, (countMap.get(row.domain) || 0) + 1)
        }
      }

      const { data: userStats } = await supabase.rpc('get_user_domain_stats', { p_user_id: user.id })
      const statsMap = new Map<string, { attempted: number; percentage: number }>()
      if (userStats) {
        for (const s of userStats as any[]) {
          statsMap.set(s.domain, { attempted: Number(s.total_attempted), percentage: Number(s.percentage) })
        }
      }

      const domainList: DomainOption[] = Array.from(countMap.entries())
        .map(([domain, count]) => ({ domain, count, attempted: statsMap.get(domain)?.attempted || 0, percentage: statsMap.get(domain)?.percentage || null }))
        .sort((a, b) => (a.percentage ?? 100) - (b.percentage ?? 100))

      setDomains(domainList)
      setLoading(false)
    }
    load()
  }, [supabase])

  const startQuiz = async (domain?: string) => {
    let query = supabase.from('questions').select('id').eq('is_active', true)
    if (domain) query = query.eq('domain', domain)
    const { data: questions } = await query.limit(50)
    if (questions && questions.length > 0) {
      router.push(`/quiz/${questions[0].id}?domain=${domain || 'all'}`)
    }
  }

  const startAdaptive = async () => {
    setAdapting(true)
    try {
      const res = await fetch('/api/quiz/adaptive-start')
      const data = await res.json()
      if (data.all_done || !data.question) {
        router.push('/dashboard')
        return
      }
      router.push(`/quiz/${data.question.id}?adaptive=true`)
    } catch {
      setAdapting(false)
    }
  }

  const quickActions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
      title: 'Adaptive Session',
      desc: 'AI targets your weakest domains first',
      accent: true,
      action: startAdaptive,
      loading: adapting,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      title: 'Random Quiz',
      desc: 'All domains mixed',
      accent: false,
      action: () => startQuiz(),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      title: 'Weakest Domain',
      desc: 'Focus on your lowest score',
      accent: false,
      action: () => { if (domains.length > 0) startQuiz(domains[0].domain) },
      disabled: domains.length === 0,
    },
  ]

  return (
    <AppLayout title="Practice" subtitle="Select a domain to start">
      {/* Quick start */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, marginBottom: 32,
      }} className="animate-stagger">
        {quickActions.map(a => (
          <button
            key={a.title}
            onClick={a.action}
            disabled={a.disabled || a.loading}
            className="card"
            style={{
              cursor: 'pointer', textAlign: 'left',
              border: a.accent ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
              background: a.accent ? 'var(--accent-teal-subtle)' : 'var(--surface-card)',
              opacity: (a.disabled || a.loading) ? 0.5 : 1,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              if (!a.disabled && !a.loading) {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = a.accent ? 'var(--shadow-glow-teal)' : 'var(--shadow-card)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ marginBottom: 12 }}>{a.icon}</div>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
              color: a.accent ? 'var(--accent-teal)' : 'var(--text-primary)', marginBottom: 4,
            }}>
              {a.loading ? 'Starting...' : a.title}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              {a.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Domain list */}
      <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden', animationDelay: '0.15s' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400 }}>Domains</h2>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8, borderRadius: 12 }} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '8px 12px' }} className="animate-stagger">
            {domains.map(d => (
              <button
                key={d.domain}
                onClick={() => startQuiz(d.domain)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', border: 'none', borderRadius: 12,
                  background: 'transparent', cursor: 'pointer',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 14,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  background: getDomainColor(d.domain), flexShrink: 0,
                  boxShadow: `0 0 8px ${getDomainColor(d.domain)}40`,
                }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>{getDomainDisplayName(d.domain)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    {d.count} questions{d.attempted > 0 ? ` · ${d.attempted} attempted` : ''}
                  </div>
                </div>
                {d.percentage !== null && (
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400,
                    color: d.percentage >= 70 ? 'var(--success)' : d.percentage >= 50 ? 'var(--warning)' : 'var(--error)',
                  }}>
                    {d.percentage}%
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
