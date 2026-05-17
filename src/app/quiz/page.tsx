'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'
import type { Question } from '@/types'

interface DomainOption {
  domain: string
  count: number
  attempted: number
  percentage: number | null
}

export default function QuizMenuPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [domains, setDomains] = useState<DomainOption[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'domain' | 'random' | 'weakest'>('domain')

  const preSelectedDomain = searchParams.get('domain')

  useEffect(() => {
    const loadDomains = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get all active questions, group by domain
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('domain')
        .eq('is_active', true)

      const countMap = new Map<string, number>()
      if (allQuestions) {
        for (const row of allQuestions) {
          const d = row.domain
          countMap.set(d, (countMap.get(d) || 0) + 1)
        }
      }

      // Get user's performance by domain
      const { data: userStats } = await supabase
        .rpc('get_user_domain_stats', { p_user_id: user.id })

      const statsMap = new Map<string, { attempted: number; percentage: number }>()
      if (userStats) {
        for (const s of userStats as any[]) {
          statsMap.set(s.domain, {
            attempted: Number(s.total_attempted),
            percentage: Number(s.percentage),
          })
        }
      }

      const domainList: DomainOption[] = Array.from(countMap.entries())
        .map(([domain, count]) => ({
          domain,
          count,
          attempted: statsMap.get(domain)?.attempted || 0,
          percentage: statsMap.get(domain)?.percentage || null,
        }))
        .sort((a, b) => {
          // Sort by weakest first (lowest percentage)
          const aPct = a.percentage ?? 100
          const bPct = b.percentage ?? 100
          return aPct - bPct
        })

      setDomains(domainList)
      setLoading(false)
    }

    loadDomains()
  }, [supabase])

  const startQuiz = async (domain?: string) => {
    let query = supabase
      .from('questions')
      .select('id')
      .eq('is_active', true)

    if (domain) {
      query = query.eq('domain', domain)
    }

    const { data: questions } = await query.limit(50)

    if (questions && questions.length > 0) {
      router.push(`/quiz/${questions[0].id}?domain=${domain || 'all'}`)
    } else {
      alert('No questions available for this domain yet.')
    }
  }

  const startWeakestQuiz = async () => {
    if (domains.length > 0) {
      const weakest = domains[0] // already sorted weakest first
      startQuiz(weakest.domain)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Practice</h1>

        {/* Quick start options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => startQuiz()}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left"
          >
            <p className="font-semibold text-sm">🎲 Random Quiz</p>
            <p className="text-xs text-gray-500 mt-1">Questions from all domains</p>
          </button>
          <button
            onClick={startWeakestQuiz}
            disabled={domains.length === 0}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="font-semibold text-sm">🎯 Weakest Domain</p>
            <p className="text-xs text-gray-500 mt-1">Focus on your lowest-scoring area</p>
          </button>
          <button
            onClick={() => setMode(mode === 'domain' ? 'random' : 'domain')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left"
          >
            <p className="font-semibold text-sm">📂 Pick a Domain</p>
            <p className="text-xs text-gray-500 mt-1">Choose what to practice below</p>
          </button>
        </div>

        {/* Domain list */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-sm">Domains</h2>
          </div>
          {loading ? (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-12 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {domains.map(d => (
                <button
                  key={d.domain}
                  onClick={() => startQuiz(d.domain)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDomainColor(d.domain)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {getDomainDisplayName(d.domain)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {d.count} questions
                      {d.attempted > 0 && ` • ${d.attempted} attempted`}
                    </p>
                  </div>
                  {d.percentage !== null && (
                    <span className={`text-xs font-mono shrink-0 ${
                      d.percentage >= 70 ? 'text-green-600' : d.percentage >= 50 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {d.percentage}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
