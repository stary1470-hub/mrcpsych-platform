'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'

interface ActivityRow {
  id: string
  user_id: string
  question_id: string
  correct: boolean
  answered_at: string
  time_taken_seconds: number | null
  question_stem?: string
  question_domain?: string
}

export default function MessagesPage() {
  const supabase = createClient()
  const [activities, setActivities] = useState<ActivityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteFromDate, setDeleteFromDate] = useState('')
  const [deleteToDate, setDeleteToDate] = useState('')
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('id, user_id, question_id, correct, answered_at, time_taken_seconds')
        .order('answered_at', { ascending: false })
        .limit(200)

      if (progress && progress.length > 0) {
        const qIds = [...new Set(progress.map((p: any) => p.question_id))]
        const { data: questions } = await supabase
          .from('questions')
          .select('id, stem, domain')
          .in('id', qIds)

        const qMap = new Map((questions || []).map((q: any) => [q.id, q]))
        const merged = (progress as any[]).map(p => ({
          ...p,
          question_stem: qMap.get(p.question_id)?.stem || 'Unknown question',
          question_domain: qMap.get(p.question_id)?.domain || 'Unknown',
        }))
        setActivities(merged)
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  const handleDeleteAll = async () => {
    if (deleteConfirmText !== 'DELETE') return
    setDeleting(true)

    let query = supabase.from('user_progress').delete()
    if (deleteFromDate) query = query.gte('answered_at', deleteFromDate)
    if (deleteToDate) query = query.lte('answered_at', deleteToDate + 'T23:59:59')

    const { error } = await query
    if (!error) {
      setActivities(prev =>
        deleteFromDate || deleteToDate
          ? prev.filter(a => {
              const d = a.answered_at
              if (deleteFromDate && d < deleteFromDate) return true
              if (deleteToDate && d > deleteToDate + 'T23:59:59') return true
              return false
            })
          : []
      )
    }
    setDeleting(false)
    setShowDeleteModal(false)
    setDeleteConfirmText('')
    setDeleteFromDate('')
    setDeleteToDate('')
  }

  const fmtTime = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  const trunc = (t: string, m: number) => t.length > m ? t.slice(0, m) + '…' : t

  const domainColors: Record<string, string> = {
    'Psychopharmacology': '#00d4aa',
    'Organic Psychiatry': '#6366f1',
    'Schizophrenia': '#f59e0b',
    'Mood Disorders': '#ec4899',
    'Anxiety Disorders': '#3b82f6',
    'Personality Disorders': '#8b5cf6',
    'Child Psychiatry': '#14b8a6',
    'Forensic Psychiatry': '#ef4444',
    'Old Age Psychiatry': '#f97316',
    'Liaison Psychiatry': '#06b6d4',
    'Psychotherapy': '#a855f7',
    'Substance Misuse': '#eab308',
  }

  return (
    <AdminLayout
      title="Messages"
      subtitle={`${activities.length} recent activities`}
      actions={
        <button
          onClick={() => setShowDeleteModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: 'var(--error)', color: '#fff',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          Delete All Messages
        </button>
      }
    >
      {/* Activity List */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 100px 80px 160px',
          gap: 12, padding: '14px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['Activity', 'Domain', 'Time', 'Result', 'Date'].map(h => (
            <div key={h} style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--text-tertiary)',
            }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </div>
        ) : activities.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
            No activity found
          </div>
        ) : (
          activities.map((a, i) => (
            <div key={a.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 100px 80px 160px',
              gap: 12, padding: '12px 20px',
              borderBottom: i < activities.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              transition: 'background 0.1s',
              background: 'transparent',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--text-primary)', lineHeight: 1.4,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {trunc(a.question_stem || '', 80)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  display: 'inline-block', padding: '3px 8px', borderRadius: 6,
                  fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-sans)',
                  background: (domainColors[a.question_domain || ''] || 'var(--accent-teal)') + '18',
                  color: domainColors[a.question_domain || ''] || 'var(--accent-teal)',
                }}>
                  {trunc(a.question_domain || '', 18)}
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
              }}>
                {a.time_taken_seconds ? `${Math.round(a.time_taken_seconds)}s` : '—'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 10px', borderRadius: 6,
                  fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)',
                  background: a.correct ? 'rgba(0,212,170,0.12)' : 'rgba(239,68,68,0.12)',
                  color: a.correct ? 'var(--success)' : 'var(--error)',
                }}>
                  {a.correct ? '✓ Correct' : '✗ Wrong'}
                </span>
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: 12,
                color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center',
              }}>
                {fmtTime(a.answered_at)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        }}
          onClick={e => { if (e.target === e.currentTarget) { setShowDeleteModal(false); setDeleteConfirmText('') } }}
        >
          <div style={{
            width: '100%', maxWidth: 460, margin: '0 16px',
            background: 'var(--surface-card)',
            border: '1px solid var(--error)',
            borderRadius: 20, padding: 0,
            boxShadow: '0 24px 80px rgba(239,68,68,0.15), 0 0 0 1px rgba(239,68,68,0.1)',
            animation: 'fadeInUp 0.2s ease-out',
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 24px 0',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(239,68,68,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400,
                  color: 'var(--text-primary)', margin: 0,
                }}>
                  Delete All Messages
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12,
                  color: 'var(--text-tertiary)', margin: 0, marginTop: 2,
                }}>
                  This action cannot be undone
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px' }}>
              <div style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 12, padding: 14, marginBottom: 20,
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13,
                  color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6,
                }}>
                  This will <strong style={{ color: 'var(--error)' }}>permanently delete all messages</strong> and user activity logs matching the specified date range. This cannot be reversed.
                </p>
              </div>

              {/* Date Range Filters */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-sans)',
                    fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
                  }}>From Date</label>
                  <input
                    type="date"
                    value={deleteFromDate}
                    onChange={e => setDeleteFromDate(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 10,
                      background: 'var(--surface-base)', color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-sans)', fontSize: 13,
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-sans)',
                    fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
                  }}>To Date</label>
                  <input
                    type="date"
                    value={deleteToDate}
                    onChange={e => setDeleteToDate(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 10,
                      background: 'var(--surface-base)', color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-sans)', fontSize: 13,
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Confirmation Input */}
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: 'block', fontFamily: 'var(--font-sans)',
                  fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
                }}>
                  Type <span style={{ color: 'var(--error)', fontFamily: 'monospace' }}>DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={e => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 10,
                    background: 'var(--surface-base)',
                    color: deleteConfirmText && deleteConfirmText !== 'DELETE' ? 'var(--error)' : 'var(--text-primary)',
                    border: `1px solid ${deleteConfirmText && deleteConfirmText !== 'DELETE' ? 'var(--error)' : 'var(--border-subtle)'}`,
                    fontFamily: 'monospace', fontSize: 14, fontWeight: 600,
                    letterSpacing: '0.1em',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setShowDeleteModal(false); setDeleteConfirmText('') }}
                  style={{
                    padding: '10px 20px', borderRadius: 10,
                    background: 'transparent', color: 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAll}
                  disabled={deleteConfirmText !== 'DELETE' || deleting}
                  style={{
                    padding: '10px 20px', borderRadius: 10,
                    background: deleteConfirmText === 'DELETE' ? 'var(--error)' : 'rgba(239,68,68,0.3)',
                    color: '#fff', border: 'none',
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    cursor: deleteConfirmText === 'DELETE' ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s',
                    opacity: deleting ? 0.7 : 1,
                  }}
                >
                  {deleting ? 'Deleting…' : 'Delete All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </AdminLayout>
  )
}
