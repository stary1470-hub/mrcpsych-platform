'use client'

import { useEffect, useState, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getOptionLabel, getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { Question } from '@/types'

const domainColorCSS = (domain: string) => getDomainColor(domain)

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
  const [adaptiveDomain, setAdaptiveDomain] = useState<string | null>(null)
  const [adaptiveStats, setAdaptiveStats] = useState<AdaptiveSessionStats | null>(null)
  const [allDone, setAllDone] = useState(false)
  const [nextLoading, setNextLoading] = useState(false)

  useEffect(() => { loadQuestion() }, [id])

  const loadQuestion = async () => {
    setLoading(true); setSelectedIndex(null); setSubmitted(false); setNextLoading(false)

    // For adaptive mode, the server sends the domain targeting info
    if (isAdaptive && !domain) {
      // This was loaded via adaptive — the domain wasn't in URL
      const { data: q } = await supabase.from('questions').select('*').eq('id', id).single()
      if (!q) { router.push('/quiz'); return }
      setQuestion(q as Question)
      // Fetch adaptive session stats
      try {
        const res = await fetch('/api/quiz/adaptive-start')
        const data = await res.json()
        if (data.session_stats) setAdaptiveStats(data.session_stats)
      } catch {}
      setLoading(false)
      return
    }

    // Standard mode: load question and find next sequentially
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

    // Record answer
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
      // Standard mode: navigate to next question in sequence
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

    // Adaptive mode: fetch next question from server
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

      // Update adaptive session info
      if (data.domain) setAdaptiveDomain(data.domain)
      if (data.session_stats) setAdaptiveStats(data.session_stats)

      // Navigate to next question
      router.push(`/quiz/${data.question.id}?adaptive=true`)
    } catch {
      router.push('/quiz')
    }
  }

  // ── Completion screen ──────────────────────────────────────

  if (allDone && adaptiveStats) {
    const pct = adaptiveStats.total_attempted > 0
      ? Math.round((adaptiveStats.total_correct / adaptiveStats.total_attempted) * 100)
      : 0

    return (
      <AppLayout title="Adaptive Session Complete" subtitle="You covered all available questions">
        <div style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Session Complete</h2>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 24, lineHeight: 1.6 }}>
            You answered all available questions across {adaptiveStats.domains_done} domains.
            Your adaptive session is finished.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
            marginBottom: 24,
          }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--accent-blue)', fontSize: 24 }}>{pct}%</div>
              <div className="stat-label">Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--success)', fontSize: 24 }}>
                {adaptiveStats.total_correct}/{adaptiveStats.total_attempted}
              </div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--accent-purple)', fontSize: 24 }}>
                {adaptiveStats.domains_done}
              </div>
              <div className="stat-label">Domains</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary">
              View Dashboard
            </button>
            <button onClick={() => router.push('/quiz')} className="btn btn-secondary">
              Back to Quiz Menu
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ── Loading ────────────────────────────────────────────────

  if (loading) {
    return (
      <AppLayout title="Practice">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="skeleton" style={{ height: 24, width: 200, marginBottom: 16 }} />
          <div className="card" style={{ padding: 24 }}>
            <div className="skeleton" style={{ height: 80, marginBottom: 16 }} />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 48, marginBottom: 8 }} />
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!question) return null

  // ── Question display ───────────────────────────────────────

  return (
    <AppLayout title="Practice" subtitle={isAdaptive ? 'Adaptive session' : 'Answer the question below'}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {isAdaptive && (
            <span className="badge badge-blue" style={{ fontWeight: 600 }}>
              🧠 Adaptive
            </span>
          )}
          {question.domain && (
            <span className="badge badge-blue" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: domainColorCSS(question.domain), display: 'inline-block' }} />
              {getDomainDisplayName(question.domain)}
            </span>
          )}
          {question.difficulty && (
            <span className={`badge ${
              question.difficulty === 'easy' ? 'badge-green' :
              question.difficulty === 'medium' ? 'badge-amber' : 'badge-red'
            }`}>
              {question.difficulty}
            </span>
          )}
          {question.bloom_taxonomy && (
            <span className="badge badge-gray">{question.bloom_taxonomy}</span>
          )}
          <div style={{ flex: 1 }} />

          {/* Session stats */}
          {isAdaptive && adaptiveStats && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="badge badge-gray">
                {adaptiveStats.domains_done}/{adaptiveStats.domains_total} domains
              </span>
              <span className="badge badge-gray">
                {sessionStats.total > 0
                  ? `${sessionStats.correct}/${sessionStats.total}`
                  : `${adaptiveStats.total_correct}/${adaptiveStats.total_attempted}`}
              </span>
            </div>
          )}
          {!isAdaptive && sessionStats.total > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              Session: {sessionStats.correct}/{sessionStats.total}
            </span>
          )}
        </div>

        {/* Question card */}
        <div className="card" style={{ padding: '24px 24px 20px', marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, lineHeight: 1.6, fontWeight: 450, color: 'var(--text-primary)' }}>
            {question.stem}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index
            let className = 'quiz-option'

            if (submitted) {
              if (index === question.correct_index) className += ' correct disabled'
              else if (isSelected && !isCorrect) className += ' wrong disabled'
              else className += ' disabled'
            } else if (isSelected) {
              className += ' selected'
            }

            return (
              <button
                key={index}
                onClick={() => !submitted && setSelectedIndex(index)}
                disabled={submitted}
                className={className}
              >
                <span className="quiz-option-label">{getOptionLabel(index)}</span>
                <span>{option.replace(/^ /, '')}</span>
              </button>
            )
          })}
        </div>

        {/* Submit / Next */}
        <div style={{ marginTop: 16 }}>
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={nextLoading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {nextLoading
                ? 'Loading next...'
                : isAdaptive
                  ? 'Next Adaptive Question →'
                  : 'Next Question →'
              }
            </button>
          )}
        </div>

        {/* Feedback card */}
        {submitted && (
          <div className={`feedback-card ${isCorrect ? 'correct' : 'wrong'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{isCorrect ? '✅' : '❌'}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: isCorrect ? 'var(--success)' : 'var(--error)' }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>

            {!isCorrect && question.distractors_rationale?.[selectedIndex!] && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Why you chose wrong
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                  {question.distractors_rationale[selectedIndex!]}
                </p>
              </div>
            )}

            {question.teaching_point && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Teaching Point
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {question.teaching_point}
                </p>
              </div>
            )}

            {question.source && (
              <p style={{ marginTop: 10, fontSize: 11, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                Source: {question.source}
              </p>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
