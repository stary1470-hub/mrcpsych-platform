'use client'

import { useEffect, useState, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getOptionLabel, getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { Question } from '@/types'

interface AdaptiveSessionStats {
  total_attempted: number
  total_correct: number
  domains_done: number
  domains_total: number
}

export default function QuizQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const isAdaptive = searchParams.get('adaptive') === 'true'
  const domain = searchParams.get('domain')

  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const [adaptiveStats, setAdaptiveStats] = useState<AdaptiveSessionStats | null>(null)
  const [allDone, setAllDone] = useState(false)
  const [nextLoading, setNextLoading] = useState(false)

  useEffect(() => { loadQuestion() }, [id])

  const loadQuestion = async () => {
    setLoading(true); setSelectedIndex(null); setSubmitted(false); setNextLoading(false)

    if (isAdaptive && !domain) {
      const { data: q } = await supabase.from('questions').select('*').eq('id', id).single()
      if (!q) { router.push('/quiz'); return }
      setQuestion(q as Question)
      try {
        const res = await fetch('/api/quiz/adaptive-start')
        const data = await res.json()
        if (data.session_stats) setAdaptiveStats(data.session_stats)
      } catch {}
      setLoading(false)
      return
    }

    const { data: q } = await supabase.from('questions').select('*').eq('id', id).single()
    if (!q) { router.push('/quiz'); return }
    setQuestion(q as Question)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (selectedIndex === null || !question || submitted) return
    const correct = selectedIndex === question.correct_index
    setIsCorrect(correct)
    setSubmitted(true)
    setSessionStats(p => ({ correct: p.correct + (correct ? 1 : 0), total: p.total + 1 }))

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('user_progress').upsert(
        { user_id: user.id, question_id: question.id, selected_index: selectedIndex, correct },
        { onConflict: 'user_id, question_id' }
      )
    }
  }

  const handleNext = async () => {
    if (!isAdaptive) {
      let query = supabase.from('questions').select('id').eq('is_active', true).neq('id', id).order('id')
      if (domain && domain !== 'all') query = query.eq('domain', domain)
      const { data: nextQs } = await query.limit(1)
      if (nextQs && nextQs.length > 0) {
        router.push(`/quiz/${nextQs[0].id}?domain=${domain || 'all'}`)
      } else {
        router.push('/quiz')
      }
      return
    }

    setNextLoading(true)
    try {
      const res = await fetch(`/api/quiz/adaptive-next?previous_id=${id}`)
      const data = await res.json()
      if (data.all_done || !data.question) {
        setAllDone(true)
        setAdaptiveStats(data.session_stats || null)
        setNextLoading(false)
        return
      }
      if (data.session_stats) setAdaptiveStats(data.session_stats)
      router.push(`/quiz/${data.question.id}?adaptive=true`)
    } catch {
      router.push('/quiz')
    }
  }

  // Completion screen
  if (allDone && adaptiveStats) {
    const pct = adaptiveStats.total_attempted > 0
      ? Math.round((adaptiveStats.total_correct / adaptiveStats.total_attempted) * 100) : 0

    return (
      <AppLayout title="Session Complete" subtitle="You covered all available questions">
        <div style={{ maxWidth: 520, margin: '60px auto', textAlign: 'center' }} className="animate-slide-up">
          <div style={{
            width: 80, height: 80, borderRadius: 20, background: 'var(--success-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 12 }}>Session Complete</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32, lineHeight: 1.7 }}>
            You answered all available questions across {adaptiveStats.domains_done} domains.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--accent-teal)', fontSize: 28 }}>{pct}%</div><div className="stat-label">Score</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--success)', fontSize: 28 }}>{adaptiveStats.total_correct}/{adaptiveStats.total_attempted}</div><div className="stat-label">Correct</div></div>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: 28 }}>{adaptiveStats.domains_done}</div><div className="stat-label">Domains</div></div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary">View Dashboard</button>
            <button onClick={() => router.push('/quiz')} className="btn btn-secondary">Back to Quiz Menu</button>
          </div>
        </div>
      </AppLayout>
    )
  }

  // Loading
  if (loading) {
    return (
      <AppLayout title="Practice">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="skeleton" style={{ height: 28, width: 200, marginBottom: 20 }} />
          <div className="card" style={{ padding: 28 }}>
            <div className="skeleton" style={{ height: 80, marginBottom: 20 }} />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 52, marginBottom: 10 }} />
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!question) return null

  return (
    <AppLayout title="Practice" subtitle={isAdaptive ? 'Adaptive session' : 'Answer the question below'}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {isAdaptive && (
            <span className="badge badge-teal" style={{ fontWeight: 700 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Adaptive
            </span>
          )}
          {question.domain && (
            <span className="badge badge-teal" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: getDomainColor(question.domain), display: 'inline-block', boxShadow: `0 0 6px ${getDomainColor(question.domain)}60` }} />
              {getDomainDisplayName(question.domain)}
            </span>
          )}
          {question.difficulty && (
            <span className={`badge ${question.difficulty === 'easy' ? 'badge-green' : question.difficulty === 'medium' ? 'badge-amber' : 'badge-red'}`}>
              {question.difficulty}
            </span>
          )}
          {question.bloom_taxonomy && <span className="badge badge-gray">{question.bloom_taxonomy}</span>}
          <div style={{ flex: 1 }} />
          {isAdaptive && adaptiveStats && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="badge badge-gray">{adaptiveStats.domains_done}/{adaptiveStats.domains_total} domains</span>
              <span className="badge badge-gray">{sessionStats.total > 0 ? `${sessionStats.correct}/${sessionStats.total}` : `${adaptiveStats.total_correct}/${adaptiveStats.total_attempted}`}</span>
            </div>
          )}
          {!isAdaptive && sessionStats.total > 0 && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Session: {sessionStats.correct}/{sessionStats.total}
            </span>
          )}
        </div>

        {/* Question card */}
        <div className="card animate-fade-in" style={{ padding: '28px 28px 24px', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.7, fontWeight: 400, color: 'var(--text-primary)' }}>
            {question.stem}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="animate-stagger">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index
            let cls = 'quiz-option'
            if (submitted) {
              if (index === question.correct_index) cls += ' correct disabled'
              else if (isSelected && !isCorrect) cls += ' wrong disabled'
              else cls += ' disabled'
            } else if (isSelected) {
              cls += ' selected'
            }

            return (
              <button key={index} onClick={() => !submitted && setSelectedIndex(index)} disabled={submitted} className={cls}>
                <span className="quiz-option-label">{getOptionLabel(index)}</span>
                <span>{option.replace(/^ /, '')}</span>
              </button>
            )
          })}
        </div>

        {/* Submit / Next */}
        <div style={{ marginTop: 20 }}>
          {!submitted ? (
            <button onClick={handleSubmit} disabled={selectedIndex === null} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} disabled={nextLoading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {nextLoading ? 'Loading next...' : isAdaptive ? 'Next Adaptive Question' : 'Next Question'}
            </button>
          )}
        </div>

        {/* Feedback card */}
        {submitted && (
          <div className={`feedback-card ${isCorrect ? 'correct' : 'wrong'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className={isCorrect ? 'correct-burst' : ''} style={{
                width: 32, height: 32, borderRadius: '50%',
                background: isCorrect ? 'var(--success)' : 'var(--error)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--surface-base)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {isCorrect ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: isCorrect ? 'var(--success)' : 'var(--error)' }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>

            {!isCorrect && question.distractors_rationale?.[selectedIndex!] && (
              <div style={{ marginBottom: 16 }}>
                <div className="feedback-section-label">Why you chose wrong</div>
                <p className="feedback-text">{question.distractors_rationale[selectedIndex!]}</p>
              </div>
            )}

            {question.teaching_point && (
              <div>
                <div className="feedback-section-label">Teaching Point</div>
                <p className="feedback-text" style={{ lineHeight: 1.8 }}>{question.teaching_point}</p>
              </div>
            )}

            {question.source && (
              <p style={{ marginTop: 14, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                Source: {question.source}
              </p>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
