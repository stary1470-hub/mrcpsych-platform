'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'

interface DomainOption {
  domain: string; count: number; attempted: number; percentage: number | null
}

export default function QuizMenuPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [domains, setDomains] = useState<DomainOption[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <AppLayout title="Practice" subtitle="Select a domain to start">
      {/* Quick start */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 24 }}>
        <button onClick={() => startQuiz()} className="card" style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🎲</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Random Quiz</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>All domains mixed</div>
        </button>
        <button
          onClick={() => { if (domains.length > 0) startQuiz(domains[0].domain) }}
          disabled={domains.length === 0}
          className="card"
          style={{ cursor: 'pointer', textAlign: 'left', opacity: domains.length === 0 ? 0.5 : 1, border: '1px solid var(--border-subtle)' }}
        >
          <div style={{ fontSize: 24, marginBottom: 6 }}>🎯</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Weakest Domain</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Focus on your lowest score</div>
        </button>
        <div className="card" style={{ border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>📂</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Pick a Domain</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Choose below</div>
        </div>
      </div>

      {/* Domain list */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: 13, fontWeight: 600 }}>Domains</h2>
        </div>

        {loading ? (
          <div style={{ padding: 16 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 44, marginBottom: 4, borderRadius: 8 }} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '4px 6px' }}>
            {domains.map(d => (
              <button
                key={d.domain}
                onClick={() => startQuiz(d.domain)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', border: 'none', borderRadius: 8,
                  background: 'transparent', cursor: 'pointer',
                  color: 'var(--text-primary)', fontSize: 13,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-blue-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: getDomainColor(d.domain),
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{getDomainDisplayName(d.domain)}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                    {d.count} questions{d.attempted > 0 ? ` • ${d.attempted} attempted` : ''}
                  </div>
                </div>
                {d.percentage !== null && (
                  <span style={{
                    fontSize: 12, fontWeight: 600,
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
