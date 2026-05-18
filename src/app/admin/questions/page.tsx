'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AppLayout from '@/components/AppLayout'
import { getDomainDisplayName, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface QRow { id: string; stem: string; domain: string; difficulty: string | null; paper: string; is_active: boolean; created_at: string }

export default function QuestionListPage() {
  const router = useRouter()
  const supabase = createClient()
  const [questions, setQuestions] = useState<QRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [paperFilter, setPaperFilter] = useState<'all' | 'A' | 'B'>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('questions').select('id, stem, domain, difficulty, paper, is_active, created_at').order('created_at', { ascending: false })
      if (data) setQuestions(data as QRow[])
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const toggle = async (id: string, current: boolean) => {
    await supabase.from('questions').update({ is_active: !current }).eq('id', id)
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, is_active: !current } : q))
  }

  const filtered = questions
    .filter(q => filter === 'all' ? true : filter === 'active' ? q.is_active : !q.is_active)
    .filter(q => paperFilter === 'all' ? true : q.paper === paperFilter)

  const trunc = (t: string, m: number) => t.length > m ? t.slice(0, m) + '…' : t

  return (
    <AppLayout title="Questions" subtitle={`${filtered.length} total`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'active', 'inactive'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <div style={{ width: 1, background: 'var(--border-subtle)', margin: '0 4px' }} />
          {(['all', 'A', 'B'] as const).map(f => (
            <button key={f} onClick={() => setPaperFilter(f)}
              className={`btn btn-sm ${paperFilter === f ? 'btn-primary' : 'btn-secondary'}`}>
              Paper {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <Link href="/admin/questions/new" className="btn btn-primary btn-sm">+ New Question</Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 12 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>No questions found.</p>
          <Link href="/admin/questions/new" className="btn btn-primary">Create the first one</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }} className="animate-stagger">
          {filtered.map(q => (
            <Link
              key={q.id}
              href={`/admin/questions/${q.id}`}
              className="card"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 18px', textDecoration: 'none',
              }}
            >
              <button
                onClick={e => { e.preventDefault(); toggle(q.id, q.is_active) }}
                style={{
                  width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
                  background: q.is_active ? 'var(--success)' : 'var(--text-tertiary)',
                  boxShadow: q.is_active ? '0 0 8px rgba(52, 211, 153, 0.3)' : 'none',
                }}
                title={q.is_active ? 'Deactivate' : 'Activate'}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                  {trunc(q.stem, 90)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span className="badge badge-gray" style={{ fontSize: 10 }}>{getDomainDisplayName(q.domain)}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>Paper {q.paper}</span>
                  {q.difficulty && <><span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>·</span><span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>{q.difficulty}</span></>}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 }}>{formatDate(q.created_at)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
