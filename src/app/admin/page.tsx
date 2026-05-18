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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />)}
        </div>
      </AppLayout>
    )
  }

  const statItems = [
    { label: 'Questions', value: stats.totalQuestions },
    { label: 'Active', value: stats.activeQuestions, color: 'var(--success)' },
    { label: 'Paper A', value: stats.paperA },
    { label: 'Paper B', value: stats.paperB },
    { label: 'Domains', value: stats.domains },
    { label: 'Users', value: stats.totalUsers },
    { label: 'Answers', value: stats.totalAnswers },
    { label: 'Inactive', value: stats.totalQuestions - stats.activeQuestions, color: 'var(--warning)' },
  ]

  const actions = [
    { href: '/admin/questions', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>, title: 'Manage Questions', desc: 'View, edit, activate/deactivate' },
    { href: '/admin/questions/new', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>, title: 'Add Question', desc: 'Create a new question manually' },
    { href: '/admin/import', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>, title: 'Bulk Import', desc: 'Import from JSON or CSV' },
  ]

  return (
    <AppLayout title="Admin" subtitle="Platform overview">
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 32,
      }} className="animate-stagger">
        {statItems.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={s.color ? { color: s.color } : {}}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }} className="animate-stagger">
        {actions.map(item => (
          <Link key={item.href} href={item.href} className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ marginBottom: 12, color: 'var(--accent-teal)' }}>{item.icon}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{item.desc}</div>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}
