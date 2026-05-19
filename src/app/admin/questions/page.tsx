'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { getDomainDisplayName, getDomainColor, formatDate } from '@/lib/utils'
import { DOMAINS_PAPER_A_INFO, DOMAINS_PAPER_B_INFO } from '@/types'

interface QRow {
  id: string; stem: string; domain: string; subdomain: string | null
  difficulty: string | null; paper: string; is_active: boolean
  created_at: string; bloom_taxonomy: string | null; tags: string[] | null
  format: string | null
}

// ── Confirm Modal ────────────────────────────────
function ConfirmModal({ open, title, message, confirmLabel, danger, onConfirm, onClose, children }: {
  open: boolean; title: string; message: string; confirmLabel: string
  danger?: boolean; onConfirm: () => void; onClose: () => void; children?: React.ReactNode
}) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.15s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface-elevated)', borderRadius: 'var(--radius-lg)',
        border: `1px solid ${danger ? 'rgba(248,113,113,0.3)' : 'var(--border-subtle)'}`,
        padding: 28, maxWidth: 440, width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        animation: 'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: danger ? 'var(--error)' : 'var(--text-primary)', marginBottom: 12 }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{message}</p>
        {children}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
          <button onClick={onConfirm} className="btn btn-sm" style={{
            background: danger ? 'var(--error)' : 'var(--accent-teal)',
            color: danger ? '#fff' : 'var(--surface-base)',
            fontWeight: 600,
          }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default function QuestionsManagementPage() {
  const router = useRouter()
  const supabase = createClient()
  const [questions, setQuestions] = useState<QRow[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [paperFilter, setPaperFilter] = useState<'all' | 'A' | 'B'>('all')
  const [domainFilter, setDomainFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')

  // Bulk selection
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)

  // Modals
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] })
  const [bulkActionModal, setBulkActionModal] = useState<{ open: boolean; action: string }>({ open: false, action: '' })

  // Sort
  const [sortBy, setSortBy] = useState<'created_at' | 'domain' | 'difficulty' | 'paper'>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('questions')
        .select('id, stem, domain, subdomain, difficulty, paper, is_active, created_at, bloom_taxonomy, tags, format')
        .order('created_at', { ascending: false })
        .limit(5000)
      if (data) setQuestions(data as QRow[])
      setLoading(false)
    }
    load()
  }, [supabase])

  // Unique domains from data
  const domains = useMemo(() => {
    const d = new Set(questions.map(q => q.domain))
    return Array.from(d).sort()
  }, [questions])

  // Filter + sort
  const filtered = useMemo(() => {
    let result = questions
      .filter(q => filter === 'all' ? true : filter === 'active' ? q.is_active : !q.is_active)
      .filter(q => paperFilter === 'all' ? true : q.paper === paperFilter)
      .filter(q => domainFilter === 'all' ? true : q.domain === domainFilter)
      .filter(q => difficultyFilter === 'all' ? true : q.difficulty === difficultyFilter)
      .filter(q => {
        if (!search) return true
        const s = search.toLowerCase()
        return q.stem.toLowerCase().includes(s) || q.domain.toLowerCase().includes(s) || (q.subdomain || '').toLowerCase().includes(s)
      })

    result.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'created_at') cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      else if (sortBy === 'domain') cmp = a.domain.localeCompare(b.domain)
      else if (sortBy === 'difficulty') cmp = (a.difficulty || '').localeCompare(b.difficulty || '')
      else if (sortBy === 'paper') cmp = a.paper.localeCompare(b.paper)
      return sortDir === 'desc' ? -cmp : cmp
    })
    return result
  }, [questions, filter, paperFilter, domainFilter, difficultyFilter, search, sortBy, sortDir])

  // Bulk actions
  const toggleSelect = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
    setSelectAll(false)
  }

  const toggleSelectAll = () => {
    if (selectAll || selected.size === filtered.length) {
      setSelected(new Set())
      setSelectAll(false)
    } else {
      setSelected(new Set(filtered.map(q => q.id)))
      setSelectAll(true)
    }
  }

  const handleBulkAction = async (action: string) => {
    const ids = Array.from(selected)
    if (ids.length === 0) return

    try {
      const res = await fetch('/api/admin/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ids }),
      })
      const data = await res.json()

      if (!res.ok) {
        alert(`Error: ${data.error || 'Unknown error'}`)
        return
      }

      if (action === 'delete') {
        setQuestions(prev => prev.filter(q => !ids.includes(q.id)))
      } else if (action === 'activate') {
        setQuestions(prev => prev.map(q => ids.includes(q.id) ? { ...q, is_active: true } : q))
      } else if (action === 'deactivate') {
        setQuestions(prev => prev.map(q => ids.includes(q.id) ? { ...q, is_active: false } : q))
      }
    } catch (err: any) {
      alert(`Network error: ${err.message}`)
    }

    setSelected(new Set())
    setSelectAll(false)
    setBulkActionModal({ open: false, action: '' })
  }

  const handleDeleteSingle = async (id: string) => {
    try {
      const res = await fetch('/api/admin/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', ids: [id] }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(`Error: ${data.error || 'Unknown error'}`)
        return
      }
      setQuestions(prev => prev.filter(q => q.id !== id))
    } catch (err: any) {
      alert(`Network error: ${err.message}`)
    }
    setDeleteModal({ open: false, ids: [] })
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: current ? 'deactivate' : 'activate', ids: [id] }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(`Error: ${data.error || 'Unknown error'}`)
        return
      }
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, is_active: !current } : q))
    } catch (err: any) {
      alert(`Network error: ${err.message}`)
    }
  }

  const trunc = (t: string, m: number) => t.length > m ? t.slice(0, m) + '…' : t
  const selectedCount = selected.size

  return (
    <AdminLayout
      title="Questions"
      subtitle={`${filtered.length} of ${questions.length} questions`}
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => router.push('/admin/questions/new')} className="btn btn-primary btn-sm">
            + New Question
          </button>
        </div>
      }
    >
      {/* Bulk Action Bar */}
      {selectedCount > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
          background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: 'var(--radius-md)', marginBottom: 16,
          animation: 'fadeIn 0.15s ease',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--accent-teal)' }}>
            {selectedCount} selected
          </span>
          <div style={{ flex: 1 }} />
          <button onClick={() => setBulkActionModal({ open: true, action: 'activate' })} className="btn btn-sm btn-secondary" style={{ fontSize: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            Activate
          </button>
          <button onClick={() => setBulkActionModal({ open: true, action: 'deactivate' })} className="btn btn-sm btn-secondary" style={{ fontSize: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            Deactivate
          </button>
          <button onClick={() => setBulkActionModal({ open: true, action: 'delete' })} className="btn btn-sm" style={{ fontSize: 12, background: 'var(--error)', color: '#fff' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
            Delete
          </button>
          <button onClick={() => { setSelected(new Set()); setSelectAll(false) }} style={{
            background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 4,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      )}

      {/* Filters */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 360 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            style={{
              width: '100%', padding: '8px 12px 8px 36px',
              background: 'var(--surface-input)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'active', 'inactive'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 12, padding: '6px 12px' }}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 24, background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'A', 'B'] as const).map(f => (
            <button key={f} onClick={() => setPaperFilter(f)}
              className={`btn btn-sm ${paperFilter === f ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 12, padding: '6px 12px' }}>
              Paper {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 24, background: 'var(--border-subtle)' }} />

        {/* Domain filter */}
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} style={{
          padding: '6px 12px', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 12,
        }}>
          <option value="all">All Domains</option>
          {domains.map(d => <option key={d} value={d}>{getDomainDisplayName(d)}</option>)}
        </select>

        {/* Difficulty filter */}
        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} style={{
          padding: '6px 12px', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 12,
        }}>
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Questions Table */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[...Array(10)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 12 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 16 }}>No questions match your filters.</p>
        </div>
      ) : (
        <div>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '36px 1fr 130px 90px 80px 50px 80px 100px',
            gap: 10, padding: '8px 12px', alignItems: 'center',
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            color: 'var(--text-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            <div>
              <input type="checkbox" checked={selectAll || (selected.size === filtered.length && filtered.length > 0)}
                onChange={toggleSelectAll}
                style={{ accentColor: 'var(--accent-teal)', width: 16, height: 16, cursor: 'pointer' }}
              />
            </div>
            <div>Question</div>
            <div style={{ cursor: 'pointer' }} onClick={() => { setSortBy('domain'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>Domain {sortBy === 'domain' && (sortDir === 'asc' ? '↑' : '↓')}</div>
            <div style={{ cursor: 'pointer' }} onClick={() => { setSortBy('paper'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>Paper {sortBy === 'paper' && (sortDir === 'asc' ? '↑' : '↓')}</div>
            <div style={{ cursor: 'pointer' }} onClick={() => { setSortBy('difficulty'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>Diff {sortBy === 'difficulty' && (sortDir === 'asc' ? '↑' : '↓')}</div>
            <div>Fmt</div>
            <div>State</div>
            <div style={{ textAlign: 'right' }}>Actions</div>
          </div>

          {/* Table rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filtered.map(q => (
              <div key={q.id} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr 130px 90px 80px 50px 80px 100px',
                gap: 10, padding: '10px 12px', alignItems: 'center',
                background: selected.has(q.id) ? 'var(--accent-teal-subtle)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.15s',
                borderBottom: '1px solid rgba(255,255,255,0.02)',
              }}
                onMouseEnter={e => { if (!selected.has(q.id)) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { if (!selected.has(q.id)) e.currentTarget.style.background = 'transparent' }}
              >
                <div>
                  <input type="checkbox" checked={selected.has(q.id)} onChange={() => toggleSelect(q.id)}
                    style={{ accentColor: 'var(--accent-teal)', width: 16, height: 16, cursor: 'pointer' }}
                  />
                </div>

                {/* Stem */}
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                    color: 'var(--text-primary)', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {trunc(q.stem, 80)}
                  </div>
                  {q.tags && q.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                      {q.tags.slice(0, 3).map(t => (
                        <span key={t} style={{
                          fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600,
                          color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.04)',
                          padding: '1px 6px', borderRadius: 3,
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Domain */}
                <div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                    color: getDomainColor(q.domain),
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: getDomainColor(q.domain), flexShrink: 0 }} />
                    {getDomainDisplayName(q.domain)}
                  </span>
                </div>

                {/* Paper */}
                <div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
                    color: q.paper === 'A' ? 'var(--accent-teal)' : '#ec4899',
                    background: q.paper === 'A' ? 'var(--accent-teal-subtle)' : 'rgba(236,72,153,0.1)',
                    padding: '2px 8px', borderRadius: 4,
                  }}>Paper {q.paper}</span>
                </div>

                {/* Difficulty */}
                <div>
                  {q.difficulty && (
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                      color: q.difficulty === 'easy' ? 'var(--success)' : q.difficulty === 'medium' ? 'var(--warning)' : 'var(--error)',
                    }}>{q.difficulty}</span>
                  )}
                </div>

                {/* Format (EMI / SBA) */}
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                    color: (q as any).format === 'emi' ? 'var(--accent-teal)' : 'var(--text-tertiary)',
                    background: (q as any).format === 'emi' ? 'var(--accent-teal-subtle)' : 'rgba(255,255,255,0.04)',
                    padding: '1px 5px', borderRadius: 3,
                    letterSpacing: '0.04em',
                  }}>
                    {(q as any).format === 'emi' ? 'EMI' : 'SBA'}
                  </span>
                </div>

                {/* State */}
                <div>
                  <button onClick={() => toggleActive(q.id, q.is_active)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                    color: q.is_active ? 'var(--success)' : 'var(--text-tertiary)',
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: q.is_active ? 'var(--success)' : 'var(--text-tertiary)',
                      boxShadow: q.is_active ? '0 0 6px rgba(52,211,153,0.3)' : 'none',
                    }} />
                    {q.is_active ? 'Active' : 'Off'}
                  </button>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <button onClick={() => router.push(`/admin/questions/${q.id}`)} title="Edit" style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6,
                    color: 'var(--text-tertiary)', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-teal)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-teal-subtle)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; (e.currentTarget as HTMLElement).style.background = 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button onClick={() => setDeleteModal({ open: true, ids: [q.id] })} title="Delete" style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6,
                    color: 'var(--text-tertiary)', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--error)'; (e.currentTarget as HTMLElement).style.background = 'var(--error-subtle)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)'; (e.currentTarget as HTMLElement).style.background = 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Single Modal */}
      <ConfirmModal
        open={deleteModal.open}
        title="Delete Question"
        message="This will permanently delete this question and all associated user progress data. This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => { if (deleteModal.ids[0]) handleDeleteSingle(deleteModal.ids[0]) }}
        onClose={() => setDeleteModal({ open: false, ids: [] })}
      />

      {/* Bulk Action Modal */}
      <ConfirmModal
        open={bulkActionModal.open}
        title={bulkActionModal.action === 'delete' ? `Delete ${selectedCount} Questions` : `${bulkActionModal.action === 'activate' ? 'Activate' : 'Deactivate'} ${selectedCount} Questions`}
        message={
          bulkActionModal.action === 'delete'
            ? `You are about to permanently delete ${selectedCount} questions and all their user progress data. This cannot be undone.`
            : `You are about to ${bulkActionModal.action} ${selectedCount} questions.`
        }
        confirmLabel={bulkActionModal.action === 'delete' ? 'Delete All' : bulkActionModal.action === 'activate' ? 'Activate' : 'Deactivate'}
        danger={bulkActionModal.action === 'delete'}
        onConfirm={() => handleBulkAction(bulkActionModal.action)}
        onClose={() => setBulkActionModal({ open: false, action: '' })}
      />
    </AdminLayout>
  )
}
