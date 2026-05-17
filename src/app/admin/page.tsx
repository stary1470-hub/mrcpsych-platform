'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [stats, setStats] = useState({
    totalQuestions: 0, activeQuestions: 0, paperA: 0, paperB: 0,
    totalUsers: 0, totalAnswers: 0, domains: 0,
  })

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: a } = await supabase.from('admins').select('user_id').eq('user_id', user.id).single()
      if (!a) { router.push('/dashboard'); return }
      setIsAdmin(true)

      const [qC, aC, pA, pB, uC, prC, dC] = await Promise.all([
        supabase.from('questions').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'A'),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'B'),
        supabase.from('user_progress').select('user_id', { count: 'exact', head: true }),
        supabase.from('user_progress').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('domain'),
      ])

      const uniqueDomains = new Set((dC.data as any[])?.map((d: any) => d.domain) || [])
      setStats({
        totalQuestions: qC.count || 0, activeQuestions: aC.count || 0,
        paperA: pA.count || 0, paperB: pB.count || 0,
        totalUsers: uC.count || 0, totalAnswers: prC.count || 0,
        domains: uniqueDomains.size,
      })
    }
    check()
  }, [supabase, router])

  if (isAdmin === null) {
    return (
      <AppLayout title="Admin">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }} />)}
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Admin" subtitle="Platform overview">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Questions', value: stats.totalQuestions },
          { label: 'Active', value: stats.activeQuestions, color: 'var(--success)' },
          { label: 'Paper A', value: stats.paperA },
          { label: 'Paper B', value: stats.paperB },
          { label: 'Domains', value: stats.domains },
          { label: 'Users', value: stats.totalUsers },
          { label: 'Answers', value: stats.totalAnswers },
          { label: 'Inactive', value: stats.totalQuestions - stats.activeQuestions, color: 'var(--warning)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={s.color ? { color: s.color } : {}}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
        {[
          { href: '/admin/questions', icon: '📋', title: 'Manage Questions', desc: 'View, edit, activate/deactivate' },
          { href: '/admin/questions/new', icon: '✏️', title: 'Add Question', desc: 'Create a new question manually' },
          { href: '/admin/import', icon: '📤', title: 'Bulk Import', desc: 'Import from JSON or CSV' },
        ].map(item => (
          <Link key={item.href} href={item.href} className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{item.desc}</div>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
