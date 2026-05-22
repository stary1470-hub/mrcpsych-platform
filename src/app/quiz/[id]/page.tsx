'use client'

import { useEffect, useState, useRef, useCallback, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import EMIQuestion from '@/components/EMIQuestion'
import { getOptionLabel, getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { Question, EmiItemAnswer } from '@/types'
import {
  EXAM_CONFIG_DEFAULT, EXAM_STORAGE_KEY, PRACTICE_STORAGE_KEY,
  calculateQuestionTime, isEmiQuestion,
  type ExamState, type PracticeState,
} from '@/types'

interface AdaptiveSessionStats {
  total_attempted: number
  total_correct: number
  domains_done: number
  domains_total: number
}

// ── Timer display component ────────────────────────
function TimerDisplay({
  totalSeconds,
  onTimeUp,
  paused = false,
}: {
  totalSeconds: number
  onTimeUp: () => void
  paused?: boolean
}) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, onTimeUp])

  const hours = Math.floor(remaining / 3600)
  const mins = Math.floor((remaining % 3600) / 60)
  const secs = remaining % 60
  const pct = (remaining / totalSeconds) * 100
  const isLow = remaining < 300 // < 5 minutes
  const isCritical = remaining < 60 // < 1 minute

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px', borderRadius: 'var(--radius-md)',
      background: isCritical ? 'rgba(248, 113, 113, 0.08)' : isLow ? 'rgba(251, 191, 36, 0.06)' : 'var(--surface-card)',
      border: `1px solid ${isCritical ? 'rgba(248, 113, 113, 0.2)' : isLow ? 'rgba(251, 191, 36, 0.15)' : 'var(--border-subtle)'}`,
      transition: 'all 0.3s',
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={isCritical ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--text-tertiary)'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600,
          color: isCritical ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--text-primary)',
          letterSpacing: '0.05em',
        }}>
          {hours > 0 ? `${hours}:` : ''}{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </div>
      <div style={{
        width: 80, height: 4, borderRadius: 2,
        background: 'var(--surface-input)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: 2,
          background: isCritical ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--accent-teal)',
          transition: 'width 1s linear',
        }} />
      </div>
    </div>
  )
}

// ── Per-question timer component ───────────────────
function QuestionTimer({
  allocatedSeconds,
  onTimeUp,
}: {
  allocatedSeconds: number
  onTimeUp: () => void
}) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setElapsed(0)
    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1
        if (next >= allocatedSeconds) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          onTimeUp()
          return next
        }
        return next
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [allocatedSeconds, onTimeUp])

  const remaining = Math.max(0, allocatedSeconds - elapsed)
  const pct = (elapsed / allocatedSeconds) * 100
  const isLow = remaining < 10
  const isCritical = remaining < 5

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
        color: isCritical ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--text-tertiary)',
        minWidth: 32, textAlign: 'right',
      }}>
        {remaining}s
      </div>
      <div style={{
        flex: 1, height: 3, borderRadius: 2,
        background: 'var(--surface-input)', overflow: 'hidden', maxWidth: 120,
      }}>
        <div style={{
          height: '100%', width: `${Math.min(100, pct)}%`, borderRadius: 2,
          background: isCritical ? 'var(--error)' : isLow ? 'var(--warning)' : 'var(--accent-teal-dim)',
          transition: 'width 1s linear',
        }} />
      </div>
    </div>
  )
}

export default function QuizQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const isAdaptive = searchParams.get('adaptive') === 'true'
  const isExamMode = searchParams.get('exam') === 'true'
  const domain = searchParams.get('domain')
  const paper = searchParams.get('paper')

  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const [adaptiveStats, setAdaptiveStats] = useState<AdaptiveSessionStats | null>(null)
  const [allDone, setAllDone] = useState(false)
  const [nextLoading, setNextLoading] = useState(false)

  // EMI-specific state
  const [emiItems, setEmiItems] = useState<Question['items']>(null)
  const [emiAnswers, setEmiAnswers] = useState<EmiItemAnswer[] | null>(null)
  const [emiCompleted, setEmiCompleted] = useState(false)

  // Exam mode state
  const [examTimeRemaining, setExamTimeRemaining] = useState<number | null>(null)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [examAnsweredCount, setExamAnsweredCount] = useState(0)
  const [examTotalQuestions, setExamTotalQuestions] = useState(0)

  const questionTimeRef = useRef(0)

  // Initialize exam state from localStorage
  const getExamState = useCallback((): ExamState | null => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(EXAM_STORAGE_KEY)
      if (!stored) return null
      return JSON.parse(stored) as ExamState
    } catch { return null }
  }, [])

  const saveExamState = useCallback((state: ExamState) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(state))
  }, [])

  const clearExamState = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(EXAM_STORAGE_KEY)
  }, [])

  // ── Practice session state helpers ──────────────
  const getPracticeState = useCallback((): PracticeState | null => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(PRACTICE_STORAGE_KEY)
      if (!stored) return null
      return JSON.parse(stored) as PracticeState
    } catch { return null }
  }, [])

  const savePracticeState = useCallback((state: PracticeState) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(state))
  }, [])

  // Practice session stats for display
  const [practiceTotal, setPracticeTotal] = useState(0)
  const [practiceAnswered, setPracticeAnswered] = useState(0)

  // Calculate total exam time remaining (in seconds)
  const getExamTimeRemaining = useCallback((): number => {
    const state = getExamState()
    if (!state) return EXAM_CONFIG_DEFAULT.totalMinutes * 60
    const elapsed = Math.floor((Date.now() - state.startedAt) / 1000)
    return Math.max(0, (EXAM_CONFIG_DEFAULT.totalMinutes * 60) - elapsed)
  }, [getExamState])

  // Handle time up (auto-submit)
  const handleTimeUp = useCallback(() => {
    if (!submitted && selectedIndex !== null) {
      // Auto-submit current answer
      handleSubmit()
    } else if (!submitted) {
      // No answer selected — mark as unanswered and go to results
      setAllDone(true)
    }
  }, [submitted, selectedIndex])

  // Handle question-level time up (auto-advance)
  const handleQuestionTimeUp = useCallback(() => {
    if (!submitted) {
      // Auto-submit with whatever is selected (or skip if nothing selected)
      if (selectedIndex !== null) {
        handleSubmit()
      } else {
        // Skip this question
        handleNext()
      }
    }
  }, [submitted, selectedIndex])

  // Initialize exam timer on mount
  useEffect(() => {
    if (!isExamMode) return

    let state = getExamState()
    if (!state) {
      // First question — create exam state
      state = {
        startedAt: Date.now(),
        answeredIds: [],
        answers: [],
        totalQuestions: 0, // Will be set when we know how many questions exist
      }
      saveExamState(state)
    }

    // Calculate remaining time
    const elapsed = Math.floor((Date.now() - state.startedAt) / 1000)
    const remaining = Math.max(0, (EXAM_CONFIG_DEFAULT.totalMinutes * 60) - elapsed)
    setExamTimeRemaining(remaining)
    setExamAnsweredCount(state.answeredIds.length)
  }, [isExamMode, getExamState, saveExamState])

  useEffect(() => { loadQuestion() }, [id])

  const loadQuestion = async () => {
    setLoading(true); setSelectedIndex(null); setSubmitted(false); setNextLoading(false)
    setQuestionStartTime(Date.now())
    setEmiItems(null)
    setEmiAnswers(null)
    setEmiCompleted(false)

    if (isAdaptive && !domain) {
      const { data: q } = await supabase.from('questions').select('*').eq('id', id).single()
      if (!q) { router.push('/quiz'); return }
      setQuestion(q as Question)
      // Fetch EMI items if applicable
      if ((q as Question).format === 'emi') {
        const { data: items } = await supabase.from('question_items').select('*').eq('question_id', id).order('item_number')
        setEmiItems(items as Question['items'])
      }
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

    // Fetch EMI items if applicable
    if ((q as Question).format === 'emi') {
      const { data: items } = await supabase.from('question_items').select('*').eq('question_id', id).order('item_number')
      setEmiItems(items as Question['items'])
    }

    // In exam mode, update total questions if not set
    if (isExamMode) {
      const state = getExamState()
      if (state && state.totalQuestions === 0) {
        const { count } = await supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true)
        // If paper filter is set, count only that paper's questions
        const filteredCount = paper
          ? (await supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true).eq('paper', paper)).count
          : count
        state.totalQuestions = filteredCount || count || 200
        saveExamState(state)
        setExamTotalQuestions(state.totalQuestions)
      } else if (state) {
        setExamTotalQuestions(state.totalQuestions)
      }
    }

    // In practice mode, load practice session stats
    if (!isExamMode && !isAdaptive) {
      const practiceState = getPracticeState()
      if (practiceState) {
        setPracticeTotal(practiceState.questionIds.length)
        setPracticeAnswered(practiceState.answeredIds.length)
      }
    }

    setLoading(false)
  }

  const handleSubmit = async () => {
    if (selectedIndex === null || !question || submitted) return
    const correct = selectedIndex === question.correct_index
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000)
    setIsCorrect(correct)
    setSubmitted(true)
    setSessionStats(p => ({ correct: p.correct + (correct ? 1 : 0), total: p.total + 1 }))

    // Record answer
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('user_progress').upsert(
        { user_id: user.id, question_id: question.id, selected_index: selectedIndex, correct, time_taken_seconds: timeTaken },
        { onConflict: 'user_id, question_id' }
      )
    }

    // Update exam state
    if (isExamMode) {
      const state = getExamState()
      if (state) {
        if (!state.answeredIds.includes(question.id)) {
          state.answeredIds.push(question.id)
          state.answers.push({
            questionId: question.id,
            selectedIndex,
            correct,
            timeTakenSeconds: timeTaken,
          })
        }
        saveExamState(state)
        setExamAnsweredCount(state.answeredIds.length)
      }
    }

    // Update practice state
    if (!isExamMode && !isAdaptive) {
      const practiceState = getPracticeState()
      if (practiceState && !practiceState.answeredIds.includes(question.id)) {
        practiceState.answeredIds.push(question.id)
        savePracticeState(practiceState)
        setPracticeAnswered(practiceState.answeredIds.length)
      }
    }
  }

  // ── EMI completion handler ───────────────────────────
  const handleEmiComplete = async (answers: EmiItemAnswer[]) => {
    if (!question || emiCompleted) return
    setEmiAnswers(answers)
    setEmiCompleted(true)

    // Record all item answers
    const { data: { user } } = await supabase.auth.getUser()
    if (user && answers.length > 0) {
      const itemProgressRecords = answers.map(a => ({
        user_id: user.id,
        question_item_id: a.question_item_id,
        question_id: question.id,
        selected_indices: a.selected_indices,
        correct: a.correct,
        time_taken_seconds: Math.floor((Date.now() - questionStartTime) / 1000),
      }))
      await supabase.from('item_progress').upsert(
        itemProgressRecords,
        { onConflict: 'user_id, question_item_id', ignoreDuplicates: false }
      )
    }

    // Update session stats
    const correctCount = answers.filter(a => a.correct).length
    const totalItems = answers.length
    setSessionStats(p => ({ correct: p.correct + correctCount, total: p.total + totalItems }))

    // Update exam state (mark question as answered)
    if (isExamMode) {
      const state = getExamState()
      if (state) {
        if (!state.answeredIds.includes(question.id)) {
          state.answeredIds.push(question.id)
          state.answers.push({
            questionId: question.id,
            selectedIndex: 0, // Not meaningful for EMI
            correct: correctCount > 0,
            timeTakenSeconds: Math.floor((Date.now() - questionStartTime) / 1000),
          })
        }
        saveExamState(state)
        setExamAnsweredCount(state.answeredIds.length)
      }
    }

    // Update practice state
    if (!isExamMode && !isAdaptive) {
      const practiceState = getPracticeState()
      if (practiceState && !practiceState.answeredIds.includes(question.id)) {
        practiceState.answeredIds.push(question.id)
        savePracticeState(practiceState)
        setPracticeAnswered(practiceState.answeredIds.length)
      }
    }
  }

  const handleNext = async () => {
    if (!isAdaptive) {
      // ── Practice mode: use shuffled practice session from localStorage ──
      if (!isExamMode) {
        const practiceState = getPracticeState()
        if (practiceState) {
          // Advance to next question in the shuffled list
          const nextIndex = practiceState.currentIndex + 1
          if (nextIndex < practiceState.questionIds.length) {
            practiceState.currentIndex = nextIndex
            savePracticeState(practiceState)
            const nextId = practiceState.questionIds[nextIndex]
            const params = new URLSearchParams()
            params.set('domain', domain || 'all')
            if (paper) params.set('paper', paper)
            router.push(`/quiz/${nextId}?${params.toString()}`)
            return
          }
          // All questions exhausted — session complete
          setAllDone(true)
          return
        }
        // Fallback: no practice state (direct URL access) — use DB query
      }

      // ── Exam mode: use DB query excluding answered IDs ──
      let query = supabase.from('questions').select('id').eq('is_active', true).neq('id', id).order('id')
      if (domain && domain !== 'all') query = query.eq('domain', domain)
      if (paper) query = query.eq('paper', paper)

      if (isExamMode) {
        const state = getExamState()
        if (state && state.answeredIds.length > 0) {
          query = query.not('id', 'in', `(${state.answeredIds.join(',')})`)
        }
      }

      const { data: nextQs } = await query.limit(1)
      if (nextQs && nextQs.length > 0) {
        const params = new URLSearchParams()
        params.set('domain', domain || 'all')
        if (paper) params.set('paper', paper)
        if (isExamMode) params.set('exam', 'true')
        router.push(`/quiz/${nextQs[0].id}?${params.toString()}`)
      } else {
        setAllDone(true)
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

  // Calculate per-question time allocation
  const getQuestionAllocatedTime = useCallback((): number => {
    if (!isExamMode || examTimeRemaining === null) return 0
    const state = getExamState()
    if (!state) return 0
    const remaining = Math.max(0, state.totalQuestions - state.answeredIds.length)
    const questionsRemaining = Math.max(1, examTotalQuestions - examAnsweredCount)
    return calculateQuestionTime(examTimeRemaining, questionsRemaining, question ? isEmiQuestion(question) : false)
  }, [isExamMode, examTimeRemaining, examTotalQuestions, examAnsweredCount, question, getExamState])

  // ── Exam results screen ───────────────────────────
  if (allDone && isExamMode) {
    const state = getExamState()
    const totalAnswered = state?.answers.length || 0
    const totalCorrect = state?.answers.filter(a => a.correct).length || 0
    const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
    const totalTime = state ? Math.floor((Date.now() - state.startedAt) / 1000) : 0
    const timeMins = Math.floor(totalTime / 60)
    const timeSecs = totalTime % 60
    const avgTimePerQ = totalAnswered > 0 ? Math.round(totalTime / totalAnswered) : 0

    clearExamState()

    return (
      <AppLayout title="Exam Complete" subtitle="Your results">
        <div style={{ maxWidth: 560, margin: '40px auto', textAlign: 'center' }} className="animate-slide-up">
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: pct >= 60 ? 'var(--success-subtle)' : 'var(--error-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke={pct >= 60 ? 'var(--success)' : 'var(--error)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {pct >= 60
                ? <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
                : <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
              }
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>
            {pct >= 60 ? 'Well Done!' : 'Keep Practising'}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32, lineHeight: 1.7 }}>
            You answered {totalAnswered} questions in {timeMins}m {timeSecs}s.
            {pct >= 60 ? ' You\'re on track for exam day.' : ' Focus on your weak domains for next time.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: pct >= 60 ? 'var(--success)' : 'var(--error)', fontSize: 24 }}>{pct}%</div>
              <div className="stat-label">Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: 24 }}>{totalCorrect}/{totalAnswered}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: 24 }}>{timeMins}m</div>
              <div className="stat-label">Time Used</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: 24 }}>{avgTimePerQ}s</div>
              <div className="stat-label">Avg / Q</div>
            </div>
          </div>

          {/* Pass line indicator */}
          <div style={{
            padding: '16px 20px', borderRadius: 'var(--radius-md)',
            background: pct >= 60 ? 'var(--success-subtle)' : 'var(--error-subtle)',
            border: `1px solid ${pct >= 60 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
            marginBottom: 32, textAlign: 'left',
          }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Exam Threshold
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--surface-input)', overflow: 'hidden', position: 'relative' }}>
                <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, borderRadius: 4, background: pct >= 60 ? 'var(--gradient-success)' : 'var(--gradient-error)', transition: 'width 0.8s' }} />
                <div style={{ position: 'absolute', left: '60%', top: -2, bottom: -2, width: 2, background: 'var(--text-tertiary)', borderRadius: 1 }} />
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: pct >= 60 ? 'var(--success)' : 'var(--error)' }}>
                {pct}% / 60%
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
              {pct >= 60 ? 'Above pass threshold — strong performance' : 'Below pass threshold — review weak domains'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary">View Dashboard</button>
            <button onClick={() => router.push(paper ? `/quiz?paper=${paper}` : '/quiz')} className="btn btn-secondary">Back to Quiz Menu</button>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ── Adaptive completion screen ────────────────────
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

  // ── Practice completion screen ──────────────────
  if (allDone && !isExamMode && !isAdaptive) {
    const ps = getPracticeState()
    const totalAnswered = ps?.answeredIds.length || sessionStats.total
    const totalCorrect = sessionStats.correct
    const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
    const totalQs = ps?.questionIds.length || totalAnswered

    // Clear practice state
    if (typeof window !== 'undefined') localStorage.removeItem(PRACTICE_STORAGE_KEY)

    return (
      <AppLayout title="Practice Complete" subtitle={`You answered all ${totalQs} questions`}>
        <div style={{ maxWidth: 520, margin: '60px auto', textAlign: 'center' }} className="animate-slide-up">
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: pct >= 60 ? 'var(--success-subtle)' : 'var(--warning-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke={pct >= 60 ? 'var(--success)' : 'var(--warning)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>
            {pct >= 70 ? 'Excellent Work!' : pct >= 50 ? 'Good Progress!' : 'Keep Practising!'}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 32, lineHeight: 1.7 }}>
            You answered {totalAnswered} questions with a {pct}% accuracy.
            {pct >= 70 ? ' You\'re well prepared.' : ' Review your weak domains on the dashboard.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--accent-teal)', fontSize: 28 }}>{pct}%</div><div className="stat-label">Score</div></div>
            <div className="stat-card"><div className="stat-value" style={{ color: 'var(--success)', fontSize: 28 }}>{totalCorrect}/{totalAnswered}</div><div className="stat-label">Correct</div></div>
            <div className="stat-card"><div className="stat-value" style={{ fontSize: 28 }}>{totalQs}</div><div className="stat-label">Questions</div></div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary">View Dashboard</button>
            <button onClick={() => router.push(paper ? `/quiz?paper=${paper}` : '/quiz')} className="btn btn-secondary">Back to Quiz Menu</button>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ── Loading ────────────────────────────────────────
  if (loading) {
    return (
      <AppLayout title={isExamMode ? 'Exam' : 'Practice'}>
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

  const isEmi = isEmiQuestion(question)
  const allocatedTime = getQuestionAllocatedTime()

  return (
    <AppLayout
      title={isExamMode ? 'Exam Mode' : 'Practice'}
      subtitle={isAdaptive ? 'Adaptive session' : isExamMode ? `${EXAM_CONFIG_DEFAULT.totalMinutes} min · ${examTotalQuestions} questions` : 'Answer the question below'}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Exam timer (sticky at top) */}
        {isExamMode && examTimeRemaining !== null && (
          <div style={{ marginBottom: 16 }} className="animate-fade-in">
            <TimerDisplay
              totalSeconds={EXAM_CONFIG_DEFAULT.totalMinutes * 60}
              onTimeUp={handleTimeUp}
              paused={submitted}
            />
          </div>
        )}

        {/* Header meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
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
          {isExamMode && (
            <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.1)', color: 'var(--warning)', fontWeight: 700 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Exam
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
          {question.format === 'emi' && <span className="badge badge-gray">EMI</span>}
          {question.bloom_taxonomy && <span className="badge badge-gray">{question.bloom_taxonomy}</span>}
          {!isExamMode && !isAdaptive && practiceTotal > 0 && (
            <span className="badge" style={{ background: 'var(--accent-teal-subtle)', color: 'var(--accent-teal)', fontWeight: 600, marginLeft: 'auto' }}>
              {practiceAnswered + 1} of {practiceTotal}
            </span>
          )}
          <div style={{ flex: 1 }} />

          {/* Per-question timer (exam mode only) */}
          {isExamMode && !submitted && allocatedTime > 0 && (
            <QuestionTimer
              key={id}
              allocatedSeconds={allocatedTime}
              onTimeUp={handleQuestionTimeUp}
            />
          )}

          {/* Session stats */}
          {isAdaptive && adaptiveStats && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className="badge badge-gray">{adaptiveStats.domains_done}/{adaptiveStats.domains_total} domains</span>
              <span className="badge badge-gray">{sessionStats.total > 0 ? `${sessionStats.correct}/${sessionStats.total}` : `${adaptiveStats.total_correct}/${adaptiveStats.total_attempted}`}</span>
            </div>
          )}
          {!isAdaptive && !isExamMode && sessionStats.total > 0 && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Session: {sessionStats.correct}/{sessionStats.total}
            </span>
          )}
          {isExamMode && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {examAnsweredCount}/{examTotalQuestions} answered
            </span>
          )}
        </div>

        {/* Question card — shown once for all formats */}
        <div className="card animate-fade-in" style={{ padding: '28px 28px 24px', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.7, fontWeight: 400, color: 'var(--text-primary)' }}>
            {question.stem}
          </h2>
        </div>

        {/* EMI component */}
        {question.format === 'emi' ? (
          <div style={{ marginBottom: 16 }}>
            <EMIQuestion
              question={{ ...question, items: emiItems || [] }}
              isExamMode={isExamMode}
              onComplete={handleEmiComplete}
            />
            {/* Next button after EMI is submitted */}
            {emiCompleted && (
              <div style={{ marginTop: 20 }}>
                <button onClick={handleNext} disabled={nextLoading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  {nextLoading
                    ? 'Loading next...'
                    : isExamMode
                      ? (examAnsweredCount >= examTotalQuestions ? 'Finish Exam' : 'Next Question')
                      : isAdaptive
                        ? 'Next Adaptive Question'
                        : 'Next Question'
                  }
                </button>
              </div>
            )}
          </div>
        ) : (
        <><div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="animate-stagger">
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
              {isExamMode ? 'Submit & Next' : 'Submit Answer'}
            </button>
          ) : (
            <button onClick={handleNext} disabled={nextLoading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {nextLoading
                ? 'Loading next...'
                : isExamMode
                  ? (examAnsweredCount >= examTotalQuestions ? 'Finish Exam' : 'Next Question')
                  : isAdaptive
                    ? 'Next Adaptive Question'
                    : 'Next Question'
              }
            </button>
          )}
        </div>

        {/* Feedback card (practice mode only — exam mode shows brief feedback) */}
        {submitted && (
          <div className={`feedback-card ${isCorrect ? 'correct' : 'wrong'}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div className={isCorrect ? 'correct-burst' : ''} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isCorrect ? 'var(--success)' : 'var(--error)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--surface-base)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {isCorrect ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400, color: isCorrect ? 'var(--success)' : 'var(--error)' }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>

            {/* In exam mode, show condensed feedback; in practice mode, show full teaching cascade */}
            {!isExamMode && !isCorrect && question.distractors_rationale?.[selectedIndex!] && (
              <div style={{ marginBottom: 12 }}>
                <div className="feedback-section-label">Why you chose wrong</div>
                <p className="feedback-text">{question.distractors_rationale[selectedIndex!]}</p>
              </div>
            )}

            {!isExamMode && question.teaching_point && (
              <div>
                <div className="feedback-section-label">Teaching Point</div>
                <p className="feedback-text" style={{ lineHeight: 1.8 }}>{question.teaching_point}</p>
              </div>
            )}

            {isExamMode && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                Full explanations available after exam completion.
              </p>
            )}

            {question.source && !isExamMode && (
              <p style={{ marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                Source: {question.source}
              </p>
            )}
          </div>
        )}
        </>
      )}
      </div>
    </AppLayout>
  )
}
