'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

interface Stats {
  totalQuestions: number
  activeQuestions: number
  paperA: number
  paperB: number
  domains: number
  totalUsers: number
  totalAnswers: number
  averageScore: number
}

interface DomainCount {
  domain: string
  count: number
}

interface RecentQuestion {
  id: string
  stem: string
  domain: string
  paper: string
  created_at: string
}

export default function AdminPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    totalQuestions: 0, activeQuestions: 0, paperA: 0, paperB: 0,
    domains: 0, totalUsers: 0, totalAnswers: 0, averageScore: 0,
  })
  const [domainCounts, setDomainCounts] = useState<DomainCount[]>([])
  const [recentQuestions, setRecentQuestions] = useState<RecentQuestion[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [qC, aC, pA, pB, dRows, uRows, prC] = await Promise.all([
        supabase.from('questions').select('id', { count: 'exact', head: true }),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'A'),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('paper', 'B'),
        supabase.from('questions').select('domain, is_active'),
        supabase.from('user_progress').select('user_id, correct'),
        supabase.from('user_progress').select('id', { count: 'exact', head: true }),
      ])

      // Domain counts
      const allDomains = (dRows.data as any[]) || []
      const domainMap = new Map<string, number>()
      allDomains.forEach((d: any) => {
        if (d.domain) domainMap.set(d.domain, (domainMap.get(d.domain) || 0) + 1)
      })
      const sorted = Array.from(domainMap.entries())
        .map(([domain, count]) => ({ domain, count }))
        .sort((a, b) => b.count - a.count)

      // Unique users & average score
      const progressRows = (uRows.data as any[]) || []
      const uniqueUsers = new Set(progressRows.map((r: any) => r.user_id))
      const correctCount = progressRows.filter((r: any) => r.correct === true).length
      const avg = progressRows.length > 0 ? Math.round((correctCount / progressRows.length) * 100) : 0

      // Recent questions
      const { data: recent } = await supabase
        .from('questions')
        .select('id, stem, domain, paper, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalQuestions: qC.count || 0,
        activeQuestions: aC.count || 0,
        paperA: pA.count || 0,
        paperB: pB.count || 0,
        domains: domainMap.size,
        totalUsers: uniqueUsers.size,
        totalAnswers: prC.count || 0,
        averageScore: avg,
      })
      setDomainCounts(sorted)
      setRecentQuestions((recent as any[]) || [])
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  const statItems = [
    { label: 'Total Questions', value: stats.totalQuestions, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, color: 'var(--accent-teal)' },
    { label: 'Active Questions', value: stats.activeQuestions, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, color: 'var(--success)' },
    { label: 'Paper A', value: stats.paperA, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>, color: 'var(--text-primary)' },
    { label: 'Paper B', value: stats.paperB, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="13" y2="11"/></svg>, color: 'var(--text-primary)' },
    { label: 'Unique Domains', value: stats.domains, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, color: 'var(--accent-teal)' },
    { label: 'Total Users', value: stats.totalUsers, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, color: 'var(--accent-teal)' },
    { label: 'Total Answers', value: stats.totalAnswers, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, color: 'var(--text-primary)' },
    { label: 'Average Score', value: `${stats.averageScore}%`, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>, color: 'var(--warning)' },
  ]

  const actions = [
    { href: '/admin/questions', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: 'Manage Questions', desc: 'View, edit, activate/deactivate questions' },
    { href: '/admin/questions/new', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>, title: 'Add Question', desc: 'Create a new question manually' },
    { href: '/admin/import', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, title: 'Bulk Import', desc: 'Import questions from JSON or CSV' },
    { href: '/admin/users', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, title: 'Manage Users', desc: 'View user progress and activity' },
    { href: '/admin/messages', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: 'Messages', desc: 'View admin messages and feedback' },
    { href: '/admin/analytics', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title: 'Analytics', desc: 'Detailed platform analytics and trends' },
    { href: '/admin/settings', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>, title: 'Settings', desc: 'Configure platform settings' },
  ]

  if (loading) {
    return (
      <AdminLayout title="Overview" subtitle="Platform dashboard">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              height: 120,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface-card)',
              opacity: 0.5,
              animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }`}</style>
      </AdminLayout>
    )
  }

  const maxDomainCount = domainCounts.length > 0 ? domainCounts[0].count : 1

  return (
    <AdminLayout title="Overview" subtitle="Platform dashboard">
      {/* Stagger animation keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stagger-item { animation: fadeSlideUp 0.5s ease-out both; }
      `}</style>

      {/* Stat Cards */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 16 }}>
          Key Metrics
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {statItems.map((s, i) => (
            <div
              key={s.label}
              className="stagger-item"
              style={{
                animationDelay: `${i * 60}ms`,
                background: 'var(--surface-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 16px',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {s.label}
                </span>
                {s.icon}
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 16 }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {actions.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="stagger-item"
              style={{
                animationDelay: `${(statItems.length + i) * 60}ms`,
                textDecoration: 'none',
                cursor: 'pointer',
                background: 'var(--surface-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-subtle)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.borderColor = 'var(--accent-teal)'
                el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'var(--border-subtle)'
                el.style.boxShadow = 'var(--shadow-card)'
              }}
            >
              <div style={{ color: 'var(--accent-teal)' }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                {item.title}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Section: Domain Breakdown + Recent Questions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Domain Breakdown */}
        <section
          className="stagger-item"
          style={{
            animationDelay: `${(statItems.length + actions.length) * 60}ms`,
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 20 }}>
            Questions by Domain
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {domainCounts.map((d, i) => (
              <div key={d.domain} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-secondary)',
                  minWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {d.domain}
                </span>
                <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(d.count / maxDomainCount) * 100}%`,
                    background: 'linear-gradient(90deg, var(--accent-teal), rgba(0, 210, 190, 0.5))',
                    borderRadius: 4,
                    transition: 'width 0.8s ease-out',
                  }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                  color: 'var(--accent-teal)', minWidth: 32, textAlign: 'right',
                }}>
                  {d.count}
                </span>
              </div>
            ))}
            {domainCounts.length === 0 && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
                No questions found.
              </p>
            )}
          </div>
        </section>

        {/* Recent Questions */}
        <section
          className="stagger-item"
          style={{
            animationDelay: `${(statItems.length + actions.length + 1) * 60}ms`,
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 20 }}>
            Recently Added Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentQuestions.map((q, i) => (
              <Link
                key={q.id}
                href={`/admin/questions?id=${q.id}`}
                style={{
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: i < recentQuestions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  maxWidth: 400,
                }}>
                  {q.stem}
                </span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                    color: 'var(--accent-teal)', textTransform: 'uppercase',
                    background: 'rgba(0, 210, 190, 0.1)', padding: '2px 8px', borderRadius: 4,
                  }}>
                    {q.domain}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
                    color: 'var(--text-tertiary)', textTransform: 'uppercase',
                  }}>
                    Paper {q.paper}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-tertiary)' }}>
                    {new Date(q.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
            {recentQuestions.length === 0 && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
                No questions added yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
