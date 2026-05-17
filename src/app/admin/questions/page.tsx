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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6 }}>
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
        <Link href="/admin/questions/new" className="btn btn-primary btn-sm">+ New</Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, borderRadius: 10 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>No questions found.</p>
          <Link href="/admin/questions/new" className="btn btn-primary" style={{ marginTop: 12 }}>Create the first one</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtered.map(q => (
            <Link
              key={q.id}
              href={`/admin/questions/${q.id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)',
                textDecoration: 'none', transition: 'border-color 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              <button
                onClick={e => { e.preventDefault(); toggle(q.id, q.is_active) }}
                style={{
                  width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
                  background: q.is_active ? 'var(--success)' : 'var(--text-tertiary)',
                }}
                title={q.is_active ? 'Deactivate' : 'Activate'}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {trunc(q.stem, 90)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span className="badge badge-gray" style={{ fontSize: 10 }}>{getDomainDisplayName(q.domain)}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Paper {q.paper}</span>
                  {q.difficulty && <><span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>•</span><span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{q.difficulty}</span></>}
                </div>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)', flexShrink: 0 }}>{formatDate(q.created_at)}</span>
              <span style={{ fontSize: 16, color: 'var(--text-tertiary)' }}>→</span>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
