'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import { getDomainDisplayName, getDomainColor } from '@/lib/utils'
import Link from 'next/link'

interface DomainStat {
  domain: string
  total_attempted: number
  total_correct: number
  percentage: number
}

export default function DashboardPage() {
  const supabase = createClient()
  const [stats, setStats] = useState<DomainStat[]>([])
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get total available questions
      const { count } = await supabase
        .from('questions')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true)

      setTotalQuestions(count || 0)

      // Get domain stats
      const { data: domainStats, error } = await supabase
        .rpc('get_user_domain_stats', { p_user_id: user.id })
      
      if (domainStats) {
        setStats(domainStats as DomainStat[])
        setTotalAttempted(domainStats.reduce((s: number, d: DomainStat) => s + Number(d.total_attempted), 0))
        setTotalCorrect(domainStats.reduce((s: number, d: DomainStat) => s + Number(d.total_correct), 0))
      }

      setLoading(false)
    }

    loadData()
  }, [supabase])

  const overallPercentage = totalAttempted > 0
    ? Math.round((totalCorrect / totalAttempted) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome + Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Overall Score</p>
            <p className="text-3xl font-bold mt-1">
              {loading ? <span className="skeleton inline-block w-16 h-8 rounded" /> : `${overallPercentage}%`}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {totalAttempted} of {totalQuestions} questions attempted
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Correct</p>
            <p className="text-3xl font-bold mt-1 text-green-600">{totalCorrect}</p>
            <p className="text-xs text-gray-400 mt-1">Across all domains</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Domains</p>
            <p className="text-3xl font-bold mt-1">{stats.length}</p>
            <p className="text-xs text-gray-400 mt-1">{totalQuestions} questions in bank</p>
          </div>
        </div>

        {/* Domain Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold">Domain Performance</h2>
            <Link
              href="/quiz"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Start practice →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-12 rounded-lg" />
              ))}
            </div>
          ) : stats.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">No questions attempted yet.</p>
              <Link
                href="/quiz"
                className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
              >
                Start your first practice session →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.map(s => (
                <Link
                  key={s.domain}
                  href={`/quiz?domain=${s.domain}`}
                  className="block"
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDomainColor(s.domain)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {getDomainDisplayName(s.domain)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{ width: `${s.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-mono shrink-0">
                          {s.total_correct}/{s.total_attempted}
                        </span>
                        <span className={`text-xs font-mono shrink-0 ${
                          s.percentage >= 70 ? 'text-green-600' : s.percentage >= 50 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {s.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
