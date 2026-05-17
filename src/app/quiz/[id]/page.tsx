'use client'

import { useEffect, useState, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { getOptionLabel, getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { Question } from '@/types'

export default function QuizQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const domain = searchParams.get('domain')

  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const [nextQuestionId, setNextQuestionId] = useState<string | null>(null)

  useEffect(() => {
    loadQuestion()
  }, [id])

  const loadQuestion = async () => {
    setLoading(true)
    setSelectedIndex(null)
    setSubmitted(false)
    setShowFeedback(false)

    const { data: q, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !q) {
      router.push('/quiz')
      return
    }

    setQuestion(q as Question)

    // Find next question
    let query = supabase
      .from('questions')
      .select('id')
      .eq('is_active', true)
      .neq('id', id)
      .order('id')

    if (domain && domain !== 'all') {
      query = query.eq('domain', domain)
    }

    const { data: nextQs } = await query.limit(1)
    setNextQuestionId(nextQs?.[0]?.id || null)
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (selectedIndex === null || !question || submitted) return

    const correct = selectedIndex === question.correct_index
    setIsCorrect(correct)
    setSubmitted(true)
    setShowFeedback(true)

    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }))

    // Record progress
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        question_id: question.id,
        selected_index: selectedIndex,
        correct,
      }, {
        onConflict: 'user_id, question_id',
        ignoreDuplicates: false,
      })
    }
  }

  const handleNext = () => {
    if (nextQuestionId) {
      router.push(`/quiz/${nextQuestionId}?domain=${domain || 'all'}`)
    } else {
      router.push('/quiz')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="skeleton h-8 w-48 mb-6 rounded" />
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="skeleton h-16 rounded" />
            <div className="skeleton h-12 rounded" />
            <div className="skeleton h-12 rounded" />
            <div className="skeleton h-12 rounded" />
            <div className="skeleton h-12 rounded" />
          </div>
        </main>
      </div>
    )
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {question.domain && (
              <>
                <div className={`w-2.5 h-2.5 rounded-full ${getDomainColor(question.domain)}`} />
                <span className="text-xs text-gray-500 font-medium">
                  {getDomainDisplayName(question.domain)}
                </span>
              </>
            )}
            {question.difficulty && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty}
              </span>
            )}
            {question.bloom_taxonomy && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {question.bloom_taxonomy}
              </span>
            )}
          </div>
          {sessionStats.total > 0 && (
            <span className="text-xs text-gray-500">
              Session: {sessionStats.correct}/{sessionStats.total} correct
            </span>
          )}
        </div>

        {/* Question stem */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-base leading-relaxed">{question.stem}</h2>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index
            let optionClass =
              'w-full text-left p-4 rounded-lg border transition-all duration-150 text-sm leading-relaxed'

            if (!submitted) {
              optionClass += isSelected
                ? ' border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                : ' border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer'
            } else {
              if (index === question.correct_index) {
                optionClass += ' border-green-500 bg-green-50'
              } else if (isSelected && !isCorrect) {
                optionClass += ' border-red-500 bg-red-50'
              } else {
                optionClass += ' border-gray-200 opacity-60'
              }
            }

            return (
              <button
                key={index}
                onClick={() => !submitted && setSelectedIndex(index)}
                disabled={submitted}
                className={optionClass}
              >
                <span className="font-medium text-gray-400 mr-2">
                  {getOptionLabel(index)}.
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {/* Submit / Next */}
        <div className="mt-6">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              {nextQuestionId ? 'Next Question →' : 'Back to Quiz Menu'}
            </button>
          )}
        </div>

        {/* Feedback card */}
        {showFeedback && (
          <div className={`mt-6 rounded-xl border p-5 ${
            isCorrect
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{isCorrect ? '✓' : '✗'}</span>
              <p className="font-semibold text-sm">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
            </div>

            {/* Distractor rationale */}
            {!isCorrect && question.distractors_rationale && question.distractors_rationale.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Why you got it wrong
                </p>
                <p className="text-sm" dangerouslySetInnerHTML={{
                  __html: question.distractors_rationale[selectedIndex!] || 'Review the teaching point below.'
                }} />
              </div>
            )}

            {/* Teaching point */}
            {question.teaching_point && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Teaching Point
                </p>
                <p className="text-sm leading-relaxed">{question.teaching_point}</p>
              </div>
            )}

            {/* Source reference */}
            {question.source && (
              <p className="mt-3 text-xs text-gray-400">
                Source: {question.source}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
