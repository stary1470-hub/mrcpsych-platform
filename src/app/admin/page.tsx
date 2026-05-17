'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [stats, setStats] = useState({
    totalQuestions: 0,
    activeQuestions: 0,
    paperA: 0,
    paperB: 0,
    totalUsers: 0,
    totalAnswers: 0,
    domains: 0,
  })

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: adminCheck } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .single()

      if (!adminCheck) {
        router.push('/dashboard')
        return
      }

      setIsAdmin(true)

      // Load stats
      const [qCount, activeCount, paperA, paperB, userCount, progCount, domainCount] = await Promise.all([
        supabase.from('questions').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'A'),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'B'),
        supabase.from('user_progress').select('user_id', { count: 'exact', head: true }),
        supabase.from('user_progress').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('domain'),
      ])

      const uniqueDomains = new Set((domainCount.data as any[])?.map((d: any) => d.domain) || [])

      setStats({
        totalQuestions: qCount.count || 0,
        activeQuestions: activeCount.count || 0,
        paperA: paperA.count || 0,
        paperB: paperB.count || 0,
        totalUsers: userCount.count || 0,
        totalAnswers: progCount.count || 0,
        domains: uniqueDomains.size,
      })
    }

    check()
  }, [supabase, router])

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="skeleton h-8 w-48 mb-6 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-xl" />
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Link
              href="/admin/questions"
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              All Questions
            </Link>
            <Link
              href="/admin/questions/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              + New Question
            </Link>
            <Link
              href="/admin/import"
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Import CSV
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Questions', value: stats.totalQuestions },
            { label: 'Active', value: stats.activeQuestions, color: 'text-green-600' },
            { label: 'Paper A', value: stats.paperA },
            { label: 'Paper B', value: stats.paperB },
            { label: 'Domains', value: stats.domains },
            { label: 'Users Attempting', value: stats.totalUsers },
            { label: 'Answers Recorded', value: stats.totalAnswers },
            { label: 'Inactive', value: stats.totalQuestions - stats.activeQuestions, color: 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color || ''}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/questions"
            className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <p className="font-semibold text-sm">📋 Manage Questions</p>
            <p className="text-xs text-gray-500 mt-1">View, edit, activate/deactivate questions</p>
          </Link>
          <Link
            href="/admin/questions/new"
            className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <p className="font-semibold text-sm">✏️ Add Question</p>
            <p className="text-xs text-gray-500 mt-1">Create a new question manually</p>
          </Link>
          <Link
            href="/admin/import"
            className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <p className="font-semibold text-sm">📤 Bulk Import</p>
            <p className="text-xs text-gray-500 mt-1">Import questions from CSV/JSON</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
