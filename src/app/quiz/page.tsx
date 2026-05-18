'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { PaperType } from '@/types'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B, PRACTICE_STORAGE_KEY, type PracticeState } from '@/types'

interface DomainOption {
  domain: string; count: number; attempted: number; percentage: number | null
}

export default function QuizMenuPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [domains, setDomains] = useState<DomainOption[]>([])
  const [loading, setLoading] = useState(true)
  const [adapting, setAdapting] = useState(false)
  const [activePaper, setActivePaper] = useState<'all' | PaperType>(
    (searchParams.get('paper') as PaperType) || 'all'
  )

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const paperFilter = activePaper === 'all' ? null : activePaper

      let q = supabase.from('questions').select('domain, paper').eq('is_active', true)
      if (paperFilter) q = q.eq('paper', paperFilter)
      const { data: allQuestions } = await q

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
  }, [supabase, activePaper])

  const startQuiz = async (domain?: string, examMode: boolean = false) => {
    const paperParam = activePaper !== 'all' ? activePaper : undefined
    let query = supabase.from('questions').select('id').eq('is_active', true)
    if (domain) query = query.eq('domain', domain)
    if (paperParam) query = query.eq('paper', paperParam)
    const { data: questions } = await query.limit(5000)
    if (questions && questions.length > 0) {
      // Shuffle the question IDs (Fisher-Yates)
      const ids = questions.map(q => q.id)
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]]
      }

      if (!examMode) {
        // Store shuffled practice session in localStorage
        const practiceState: PracticeState = {
          questionIds: ids,
          currentIndex: 0,
          answeredIds: [],
          startedAt: Date.now(),
          domain: domain || null,
          paper: paperParam || null,
        }
        localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(practiceState))
      }

      const params = new URLSearchParams()
      if (domain) params.set('domain', domain)
      if (activePaper !== 'all') params.set('paper', activePaper)
      if (examMode) params.set('exam', 'true')
      router.push(`/quiz/${ids[0]}?${params.toString()}`)
    }
  }

  const startAdaptive = async () => {
    setAdapting(true)
    try {
      const params = new URLSearchParams()
      if (activePaper !== 'all') params.set('paper', activePaper)
      const res = await fetch(`/api/quiz/adaptive-start?${params.toString()}`)
      const data = await res.json()
      if (data.all_done || !data.question) {
        router.push('/dashboard')
        return
      }
      const qParams = new URLSearchParams()
      qParams.set('adaptive', 'true')
      if (activePaper !== 'all') qParams.set('paper', activePaper)
      router.push(`/quiz/${data.question.id}?${qParams.toString()}`)
    } catch {
      setAdapting(false)
    }
  }

  const paperColor = activePaper === 'B' ? '#ec4899' : 'var(--accent-teal)'

  const quickActions = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={paperColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      mode: 'practice' as const,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      ),
      title: 'Practice Mode',
      desc: 'Untimed — learn at your own pace',
      accent: false,
      action: () => startQuiz(),
      mode: 'practice' as const,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Exam Mode',
      desc: activePaper === 'B' ? 'Timed — 3 hours for Paper B' : activePaper === 'A' ? 'Timed — 3 hours for Paper A' : 'Timed — 3 hours, weighted per question',
      accent: false,
      action: () => startQuiz(undefined, true),
      mode: 'exam' as const,
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
      mode: 'practice' as const,
    },
  ]

  return (
    <AppLayout title="Practice" subtitle={activePaper === 'A' ? 'Paper A — Basic Sciences' : activePaper === 'B' ? 'Paper B — Clinical Sciences' : 'All Papers'}>
      {/* Paper tabs */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 24,
        background: 'var(--surface-card)', borderRadius: 'var(--radius-md)',
        padding: 4, border: '1px solid var(--border-subtle)',
        width: 'fit-content',
      }}>
        {[
          { id: 'all' as const, label: 'All Papers' },
          { id: 'A' as const, label: 'Paper A', color: 'var(--accent-teal)' },
          { id: 'B' as const, label: 'Paper B', color: '#ec4899' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActivePaper(tab.id)
              const params = new URLSearchParams()
              if (tab.id !== 'all') params.set('paper', tab.id)
              router.replace(`/quiz${tab.id !== 'all' ? `?${params.toString()}` : ''}`)
            }}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
              background: activePaper === tab.id ? (tab.color || 'var(--text-primary)') : 'transparent',
              color: activePaper === tab.id
                ? (tab.id === 'all' ? 'var(--surface-base)' : '#fff')
                : 'var(--text-tertiary)',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mode cards */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
          Quick Start
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
        }} className="animate-stagger">
          {quickActions.map(a => (
            <button
              key={a.title}
              onClick={a.action}
              disabled={a.disabled || a.loading}
              className="card"
              style={{
                cursor: 'pointer', textAlign: 'left',
                border: a.accent
                  ? `1px solid ${paperColor}`
                  : a.mode === 'exam'
                    ? '1px solid rgba(251, 191, 36, 0.3)'
                    : '1px solid var(--border-subtle)',
                background: a.accent
                  ? (activePaper === 'B' ? 'rgba(236, 72, 153, 0.06)' : 'var(--accent-teal-subtle)')
                  : a.mode === 'exam'
                    ? 'rgba(251, 191, 36, 0.04)'
                    : 'var(--surface-card)',
                opacity: (a.disabled || a.loading) ? 0.5 : 1,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!a.disabled && !a.loading) {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = a.accent ? `0 0 24px ${activePaper === 'B' ? 'rgba(236, 72, 153, 0.15)' : 'var(--shadow-glow-teal)'}` : 'var(--shadow-card)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {a.mode === 'exam' && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700,
                  color: 'var(--warning)', letterSpacing: '0.06em',
                  textTransform: 'uppercase', background: 'rgba(251, 191, 36, 0.12)',
                  padding: '2px 6px', borderRadius: 4,
                }}>
                  Timed
                </div>
              )}
              <div style={{ marginBottom: 10 }}>{a.icon}</div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
                color: a.accent ? paperColor : a.mode === 'exam' ? 'var(--warning)' : 'var(--text-primary)', marginBottom: 4,
              }}>
                {a.loading ? 'Starting...' : a.title}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                {a.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Exam mode info */}
      <div className="card animate-slide-up" style={{
        padding: '16px 20px', marginBottom: 24,
        background: 'rgba(251, 191, 36, 0.03)',
        border: '1px solid rgba(251, 191, 36, 0.1)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Exam Mode</strong> simulates real MRCPsych timing: 180 minutes total, with per-question time weighted by type. EMIs (Extended Matching Items) get 1.5× time. Timer auto-submits when time expires.
        </div>
      </div>

      {/* Domain list */}
      <div className="card animate-slide-up" style={{ padding: 0, overflow: 'hidden', animationDelay: '0.15s' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400 }}>
            {activePaper === 'A' ? 'Paper A Domains' : activePaper === 'B' ? 'Paper B Domains' : 'All Domains'}
          </h2>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
            {domains.length} domains · {domains.reduce((s, d) => s + d.count, 0)} questions
          </span>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8, borderRadius: 12 }} />
            ))}
          </div>
        ) : domains.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>
              {activePaper === 'A'
                ? 'No Paper A questions available yet.'
                : activePaper === 'B'
                  ? 'No Paper B questions available yet.'
                  : 'No questions available yet.'}
            </p>
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
                  e.currentTarget.style.background = activePaper === 'B' ? 'rgba(236, 72, 153, 0.06)' : 'var(--accent-teal-subtle)'
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
