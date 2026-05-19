'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'

interface DomainStat {
  domain: string
  questionCount: number
  correctCount: number
  totalCount: number
  avgScore: number
}

interface QuestionStat {
  id: string
  stem: string
  domain: string
  paper: string
  attempts: number
  correctCount: number
  successRate: number
}

interface PaperStat {
  paper: string
  questions: number
  attempts: number
  correct: number
  accuracy: number
}

interface TrendPoint {
  label: string
  total: number
  correct: number
  rate: number
}

export default function AnalyticsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [domainStats, setDomainStats] = useState<DomainStat[]>([])
  const [hardestQuestions, setHardestQuestions] = useState<QuestionStat[]>([])
  const [mostAttempted, setMostAttempted] = useState<QuestionStat[]>([])
  const [paperStats, setPaperStats] = useState<PaperStat[]>([])
  const [trendData, setTrendData] = useState<TrendPoint[]>([])
  const [overallAccuracy, setOverallAccuracy] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  useEffect(() => {
    const load = async () => {
      // Load all questions
      const { data: questions } = await supabase
        .from('questions')
        .select('id, stem, domain, paper, is_active')

      // Load all progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('question_id, correct, answered_at')

      if (!questions || !progress) { setLoading(false); return }

      const qMap = new Map(questions.map((q: any) => [q.id, q]))
      setTotalQuestions(questions.length)
      setTotalAttempts(progress.length)

      // Overall accuracy
      const totalCorrect = progress.filter((p: any) => p.correct).length
      setOverallAccuracy(progress.length > 0 ? Math.round((totalCorrect / progress.length) * 100) : 0)

      // Per-domain stats
      const domainMap = new Map<string, { qCount: number; correct: number; total: number }>()
      questions.forEach((q: any) => {
        const existing = domainMap.get(q.domain) || { qCount: 0, correct: 0, total: 0 }
        existing.qCount++
        domainMap.set(q.domain, existing)
      })
      progress.forEach((p: any) => {
        const q = qMap.get(p.question_id)
        if (!q) return
        const existing = domainMap.get(q.domain) || { qCount: 0, correct: 0, total: 0 }
        existing.total++
        if (p.correct) existing.correct++
        domainMap.set(q.domain, existing)
      })

      const domainArr: DomainStat[] = Array.from(domainMap.entries())
        .map(([domain, s]) => ({
          domain,
          questionCount: s.qCount,
          correctCount: s.correct,
          totalCount: s.total,
          avgScore: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
        }))
        .sort((a, b) => b.questionCount - a.questionCount)
      setDomainStats(domainArr)

      // Per-question stats
      const qStatsMap = new Map<string, { attempts: number; correct: number }>()
      progress.forEach((p: any) => {
        const existing = qStatsMap.get(p.question_id) || { attempts: 0, correct: 0 }
        existing.attempts++
        if (p.correct) existing.correct++
        qStatsMap.set(p.question_id, existing)
      })

      const qStatsArr: QuestionStat[] = Array.from(qStatsMap.entries())
        .map(([qid, s]) => {
          const q = qMap.get(qid) as any
          return {
            id: qid,
            stem: q?.stem || 'Unknown',
            domain: q?.domain || 'Unknown',
            paper: q?.paper || '?',
            attempts: s.attempts,
            correctCount: s.correct,
            successRate: Math.round((s.correct / s.attempts) * 100),
          }
        })

      // Hardest: at least 3 attempts, lowest success rate
      setHardestQuestions(
        qStatsArr
          .filter(q => q.attempts >= 3)
          .sort((a, b) => a.successRate - b.successRate)
          .slice(0, 8)
      )

      // Most attempted
      setMostAttempted(
        qStatsArr.sort((a, b) => b.attempts - a.attempts).slice(0, 8)
      )

      // Paper A vs B
      const paperMap = new Map<string, { questions: number; attempts: number; correct: number }>()
      questions.forEach((q: any) => {
        const key = q.paper || 'Unknown'
        const existing = paperMap.get(key) || { questions: 0, attempts: 0, correct: 0 }
        existing.questions++
        paperMap.set(key, existing)
      })
      progress.forEach((p: any) => {
        const q = qMap.get(p.question_id) as any
        if (!q) return
        const key = q.paper || 'Unknown'
        const existing = paperMap.get(key) || { questions: 0, attempts: 0, correct: 0 }
        existing.attempts++
        if (p.correct) existing.correct++
        paperMap.set(key, existing)
      })
      setPaperStats(
        Array.from(paperMap.entries()).map(([paper, s]) => ({
          paper,
          questions: s.questions,
          attempts: s.attempts,
          correct: s.correct,
          accuracy: s.attempts > 0 ? Math.round((s.correct / s.attempts) * 100) : 0,
        }))
      )

      // Trend data — group by month
      const monthMap = new Map<string, { total: number; correct: number }>()
      progress.forEach((p: any) => {
        const d = new Date(p.answered_at)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        const existing = monthMap.get(key) || { total: 0, correct: 0 }
        existing.total++
        if (p.correct) existing.correct++
        monthMap.set(key, existing)
      })
      const trendArr: TrendPoint[] = Array.from(monthMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-12)
        .map(([label, s]) => ({
          label,
          total: s.total,
          correct: s.correct,
          rate: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
        }))
      setTrendData(trendArr)

      setLoading(false)
    }
    load()
  }, [supabase])

  const maxQuestionCount = Math.max(...domainStats.map(d => d.questionCount), 1)
  const maxAttempts = Math.max(...mostAttempted.map(q => q.attempts), 1)

  const domainColors = [
    '#00d4aa', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6',
    '#8b5cf6', '#14b8a6', '#ef4444', '#f97316', '#06b6d4',
    '#a855f7', '#eab308', '#22d3ee', '#fb923c', '#e879f9',
  ]

  const cardStyle: React.CSSProperties = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16, padding: 24,
  }

  const sectionTitle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400,
    color: 'var(--text-primary)', marginBottom: 16,
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    color: 'var(--text-tertiary)', marginBottom: 8,
  }

  return (
    <AdminLayout title="Analytics" subtitle="Platform insights & performance data">
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 200, borderRadius: 16 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Top Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { label: 'Total Questions', value: totalQuestions, color: 'var(--accent-teal)' },
              { label: 'Total Attempts', value: totalAttempts.toLocaleString(), color: '#6366f1' },
              { label: 'Overall Accuracy', value: `${overallAccuracy}%`, color: overallAccuracy >= 60 ? 'var(--success)' : 'var(--warning)' },
              { label: 'Domains', value: domainStats.length, color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{
                ...cardStyle, padding: '18px 20px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={labelStyle}>{s.label}</span>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400,
                  color: s.color,
                }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Per-Domain Question Count Bar Chart */}
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Questions by Domain</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {domainStats.map((d, i) => (
                <div key={d.domain} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 150, flexShrink: 0,
                    fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
                    color: 'var(--text-secondary)', textAlign: 'right',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {d.domain}
                  </div>
                  <div style={{ flex: 1, height: 24, background: 'var(--surface-base)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      height: '100%', borderRadius: 6,
                      width: `${(d.questionCount / maxQuestionCount) * 100}%`,
                      background: `linear-gradient(90deg, ${domainColors[i % domainColors.length]}cc, ${domainColors[i % domainColors.length]})`,
                      transition: 'width 0.6s ease-out',
                      minWidth: d.questionCount > 0 ? 28 : 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
                    }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                        {d.questionCount}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: 48, textAlign: 'right', fontFamily: 'var(--font-sans)',
                    fontSize: 12, fontWeight: 600, color: d.avgScore >= 60 ? 'var(--success)' : 'var(--warning)',
                  }}>
                    {d.avgScore}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-column: Domain Avg Score + Paper Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Per-Domain Average Score */}
            <div style={cardStyle}>
              <h3 style={sectionTitle}>Domain Accuracy</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {domainStats.filter(d => d.totalCount > 0).map((d, i) => (
                  <div key={d.domain} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: 3, flexShrink: 0,
                      background: domainColors[i % domainColors.length],
                    }} />
                    <div style={{
                      flex: 1, fontFamily: 'var(--font-sans)', fontSize: 12,
                      color: 'var(--text-secondary)', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {d.domain}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                      color: d.avgScore >= 70 ? 'var(--success)' : d.avgScore >= 50 ? 'var(--warning)' : 'var(--error)',
                      minWidth: 40, textAlign: 'right',
                    }}>
                      {d.avgScore}%
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 11,
                      color: 'var(--text-tertiary)', minWidth: 50, textAlign: 'right',
                    }}>
                      {d.totalCount} ans
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper A vs B Comparison */}
            <div style={cardStyle}>
              <h3 style={sectionTitle}>Paper A vs Paper B</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {paperStats.map(p => (
                  <div key={p.paper} style={{
                    background: 'var(--surface-base)', borderRadius: 12, padding: 16,
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        Paper {p.paper}
                      </span>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: 6,
                        fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                        background: p.accuracy >= 60 ? 'rgba(0,212,170,0.12)' : 'rgba(245,158,11,0.12)',
                        color: p.accuracy >= 60 ? 'var(--success)' : 'var(--warning)',
                      }}>
                        {p.accuracy}% accuracy
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      {[
                        { label: 'Questions', value: p.questions },
                        { label: 'Attempts', value: p.attempts.toLocaleString() },
                        { label: 'Correct', value: p.correct.toLocaleString() },
                      ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--text-primary)' }}>{s.value}</div>
                          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Accuracy bar */}
                    <div style={{ marginTop: 12, height: 6, background: 'var(--surface-card)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3, width: `${p.accuracy}%`,
                        background: p.accuracy >= 60 ? 'var(--success)' : 'var(--warning)',
                        transition: 'width 0.6s ease-out',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accuracy Trend */}
          {trendData.length > 0 && (
            <div style={cardStyle}>
              <h3 style={sectionTitle}>Accuracy Trend (Monthly)</h3>
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 4,
                height: 140, paddingTop: 10,
              }}>
                {trendData.map((t, i) => (
                  <div key={t.label} style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'flex-end', height: '100%',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                      color: t.rate >= 60 ? 'var(--success)' : 'var(--warning)',
                      marginBottom: 4,
                    }}>
                      {t.rate}%
                    </div>
                    <div style={{
                      width: '100%', maxWidth: 40, borderRadius: '6px 6px 0 0',
                      height: `${Math.max(t.rate, 4)}%`,
                      background: `linear-gradient(180deg, ${t.rate >= 60 ? 'var(--success)' : 'var(--warning)'}, ${t.rate >= 60 ? 'rgba(0,212,170,0.3)' : 'rgba(245,158,11,0.3)'})`,
                      transition: 'height 0.6s ease-out',
                    }} />
                    <div style={{
                      fontFamily: 'var(--font-sans)', fontSize: 9,
                      color: 'var(--text-tertiary)', marginTop: 6,
                      whiteSpace: 'nowrap',
                    }}>
                      {t.label.slice(5)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two-column: Hardest Questions + Most Attempted */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Hardest Questions */}
            <div style={cardStyle}>
              <h3 style={sectionTitle}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Hardest Questions
                </span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {hardestQuestions.map((q, i) => (
                  <div key={q.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                    borderRadius: 8, background: 'var(--surface-base)',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                      background: 'rgba(239,68,68,0.12)', color: 'var(--error)',
                    }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-sans)', fontSize: 12,
                        color: 'var(--text-primary)', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {q.stem.slice(0, 60)}{q.stem.length > 60 ? '…' : ''}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-sans)', fontSize: 10,
                        color: 'var(--text-tertiary)', marginTop: 2,
                      }}>
                        {q.domain} · Paper {q.paper} · {q.attempts} attempts
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                      color: 'var(--error)', flexShrink: 0,
                    }}>
                      {q.successRate}%
                    </span>
                  </div>
                ))}
                {hardestQuestions.length === 0 && (
                  <div style={{ padding: 16, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
                    Not enough data yet
                  </div>
                )}
              </div>
            </div>

            {/* Most Attempted */}
            <div style={cardStyle}>
              <h3 style={sectionTitle}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                  </svg>
                  Most Attempted Questions
                </span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {mostAttempted.map((q, i) => (
                  <div key={q.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                    borderRadius: 8, background: 'var(--surface-base)',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                      background: 'rgba(0,212,170,0.12)', color: 'var(--accent-teal)',
                    }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-sans)', fontSize: 12,
                        color: 'var(--text-primary)', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {q.stem.slice(0, 60)}{q.stem.length > 60 ? '…' : ''}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-sans)', fontSize: 10,
                        color: 'var(--text-tertiary)', marginTop: 2,
                      }}>
                        {q.domain} · Paper {q.paper} · {q.successRate}% accuracy
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 50, height: 6, background: 'var(--surface-card)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 3,
                          width: `${(q.attempts / maxAttempts) * 100}%`,
                          background: 'var(--accent-teal)',
                        }} />
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
                        color: 'var(--text-primary)', minWidth: 30, textAlign: 'right',
                      }}>
                        {q.attempts}
                      </span>
                    </div>
                  </div>
                ))}
                {mostAttempted.length === 0 && (
                  <div style={{ padding: 16, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
                    No attempts recorded yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .skeleton {
          background: linear-gradient(90deg, var(--surface-card) 25%, rgba(255,255,255,0.04) 50%, var(--surface-card) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AdminLayout>
  )
}
