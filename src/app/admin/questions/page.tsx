'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { getDomainDisplayName, getDomainColor, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface QuestionRow {
  id: string
  stem: string
  domain: string
  difficulty: string | null
  paper: string
  is_active: boolean
  created_at: string
}

export default function QuestionListPage() {
  const router = useRouter()
  const supabase = createClient()
  const [questions, setQuestions] = useState<QuestionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [paperFilter, setPaperFilter] = useState<'all' | 'A' | 'B'>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase
        .from('questions')
        .select('id, stem, domain, difficulty, paper, is_active, created_at')
        .order('created_at', { ascending: false })

      if (data) {
        setQuestions(data as QuestionRow[])
      }
      setLoading(false)
    }

    load()
  }, [supabase, router])

  const toggleActive = async (id: string, current: boolean) => {
    await supabase
      .from('questions')
      .update({ is_active: !current })
      .eq('id', id)

    setQuestions(prev =>
      prev.map(q => q.id === id ? { ...q, is_active: !current } : q)
    )
  }

  const filtered = questions
    .filter(q => filter === 'all' ? true : filter === 'active' ? q.is_active : !q.is_active)
    .filter(q => paperFilter === 'all' ? true : q.paper === paperFilter)

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + '…' : text

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Questions</h1>
          <Link
            href="/admin/questions/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + New
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <div className="flex bg-white rounded-lg border border-gray-200 p-0.5">
            {(['all', 'active', 'inactive'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === f ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex bg-white rounded-lg border border-gray-200 p-0.5">
            {(['all', 'A', 'B'] as const).map(f => (
              <button
                key={f}
                onClick={() => setPaperFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  paperFilter === f ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Paper {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 self-center ml-2">
            {filtered.length} questions
          </span>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-14 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">No questions found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filtered.map(q => (
                <Link
                  key={q.id}
                  href={`/admin/questions/${q.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleActive(q.id, q.is_active)
                    }}
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      q.is_active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={q.is_active ? 'Deactivate' : 'Activate'}
                  />
                  <div className={`w-2 h-2 rounded-full shrink-0 ${getDomainColor(q.domain)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{truncate(q.stem, 80)}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{getDomainDisplayName(q.domain)}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">Paper {q.paper}</span>
                      {q.difficulty && (
                        <>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-400">{q.difficulty}</span>
                        </>
                      )}
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{formatDate(q.created_at)}</span>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
