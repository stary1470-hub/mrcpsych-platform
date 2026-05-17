'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { getDomainDisplayName, getOptionLabel, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface ReviewEntry {
  id: string
  question_id: string
  selected_index: number
  correct: boolean
  answered_at: string
  question: {
    stem: string
    domain: string
    correct_index: number
    teaching_point: string | null
  }
}

export default function ReviewPage() {
  const supabase = createClient()
  const [entries, setEntries] = useState<ReviewEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('user_progress')
        .select(`
          id,
          question_id,
          selected_index,
          correct,
          answered_at,
          question:questions!inner(stem, domain, correct_index, teaching_point)
        `)
        .eq('user_id', user.id)
        .order('answered_at', { ascending: false })
        .limit(100)

      if (data) {
        setEntries(data as unknown as ReviewEntry[])
      }
      setLoading(false)
    }

    load()
  }, [supabase])

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => filter === 'correct' ? e.correct : !e.correct)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Review History</h1>
          <div className="flex gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
            {(['all', 'wrong', 'correct'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f === 'all' ? 'All' : f === 'correct' ? 'Correct' : 'Wrong'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-20 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">
              {entries.length === 0
                ? 'No questions attempted yet.'
                : 'No entries match this filter.'}
            </p>
            <Link
              href="/quiz"
              className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
            >
              Start practicing →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(entry => (
              <div
                key={entry.id}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    entry.correct ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className="text-xs font-bold">
                      {entry.correct ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed line-clamp-2">
                      {entry.question.stem}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">
                        {getDomainDisplayName(entry.question.domain)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        You chose {getOptionLabel(entry.selected_index)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {formatDate(entry.answered_at)}
                      </span>
                    </div>
                    {!entry.correct && entry.question.teaching_point && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-1 italic">
                        {entry.question.teaching_point}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/quiz/${entry.question_id}`}
                    className="text-xs text-blue-600 hover:underline shrink-0 mt-1"
                  >
                    Retry
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
