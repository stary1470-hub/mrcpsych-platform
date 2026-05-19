'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/AdminLayout'
import { formatDate } from '@/lib/utils'

interface ProgressRow {
  user_id: string
  question_id: string
  correct: boolean
  answered_at: string
}

interface UserProfile {
  email: string | null
}

interface UserStats {
  user_id: string
  email: string | null
  questions_attempted: number
  questions_correct: number
  accuracy: number
  last_active: string
}

export default function AdminUsersPage() {
  const router = useRouter()
  const supabase = createClient()
  const [users, setUsers] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: adminCheck } = await supabase.from('admins').select('user_id').eq('user_id', user.id).single()
      if (!adminCheck) { router.push('/dashboard'); return }

      // Fetch all user_progress rows (needed for client-side grouping)
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('user_id, question_id, correct, answered_at')
        .order('answered_at', { ascending: false })

      if (!progressData || progressData.length === 0) {
        setUsers([])
        setLoading(false)
        return
      }

      // Get unique user IDs
      const uniqueUserIds = [...new Set(progressData.map(r => r.user_id))]

      // Fetch profiles for emails (try - profiles might not exist or have different schema)
      let profileMap: Record<string, string | null> = {}
      try {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', uniqueUserIds)
        if (profilesData) {
          for (const p of profilesData) {
            profileMap[p.id] = (p as any).email ?? null
          }
        }
      } catch {
        // profiles table might not exist, that's ok
      }

      // Group by user_id
      const grouped: Record<string, ProgressRow[]> = {}
      for (const row of progressData as ProgressRow[]) {
        if (!grouped[row.user_id]) grouped[row.user_id] = []
        grouped[row.user_id].push(row)
      }

      // Build user stats
      const userStats: UserStats[] = Object.entries(grouped).map(([userId, rows]) => {
        const uniqueQuestions = new Set(rows.map(r => r.question_id))
        const correctCount = rows.filter(r => r.correct).length
        const total = rows.length
        return {
          user_id: userId,
          email: profileMap[userId] ?? null,
          questions_attempted: uniqueQuestions.size,
          questions_correct: correctCount,
          accuracy: total > 0 ? Math.round((correctCount / total) * 100) : 0,
          last_active: rows[0].answered_at, // already sorted desc
        }
      })

      // Sort by last_active descending
      userStats.sort((a, b) => new Date(b.last_active).getTime() - new Date(a.last_active).getTime())

      setUsers(userStats)
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const filtered = useMemo(() => {
    if (!search.trim()) return users
    const q = search.toLowerCase()
    return users.filter(u =>
      u.user_id.toLowerCase().includes(q) ||
      (u.email && u.email.toLowerCase().includes(q))
    )
  }, [users, search])

  // Summary stats
  const totalUsers = users.length
  const totalAttempts = users.reduce((s, u) => s + u.questions_attempted, 0)
  const avgAccuracy = users.length > 0
    ? Math.round(users.reduce((s, u) => s + u.accuracy, 0) / users.length)
    : 0

  const summaryCards = [
    { label: 'Total Users', value: totalUsers, color: 'var(--accent-teal)' },
    { label: 'Total Attempts', value: totalAttempts.toLocaleString(), color: '#8b5cf6' },
    { label: 'Avg Accuracy', value: `${avgAccuracy}%`, color: avgAccuracy >= 70 ? 'var(--success)' : avgAccuracy >= 50 ? 'var(--warning)' : 'var(--error)' },
  ]

  const truncId = (id: string) => id.length > 12 ? id.slice(0, 8) + '…' : id

  return (
    <AdminLayout title="Users" subtitle={`${users.length} total`}>
      {/* Summary cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 24,
      }}>
        {summaryCards.map(card => (
          <div key={card.label} style={{
            background: 'var(--surface-card)', borderRadius: 16, padding: '20px 18px',
            border: '1px solid var(--border-subtle)',
          }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600,
              color: card.color, lineHeight: 1.2,
            }}>
              {loading ? '—' : card.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)',
              marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div style={{
        marginBottom: 20, position: 'relative',
      }}>
        <div style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-tertiary)', pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by user ID or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 14px 12px 40px',
            background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 12, color: 'var(--text-primary)', fontSize: 14,
            fontFamily: 'var(--font-sans)', outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent-teal)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-subtle)')}
        />
      </div>

      {/* Results count */}
      {search && (
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)',
          marginBottom: 12,
        }}>
          Showing {filtered.length} of {users.length} users
        </div>
      )}

      {/* User list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px' }}>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
            {search ? 'No users match your search.' : 'No users have answered questions yet.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }} className="animate-stagger">
          {filtered.map(u => (
            <div
              key={u.user_id}
              style={{
                background: 'var(--surface-card)', borderRadius: 16,
                border: '1px solid var(--border-subtle)',
                padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            >
              {/* Avatar circle */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(139, 92, 246, 0.15))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                color: 'var(--accent-teal)',
              }}>
                {(u.email || u.user_id).charAt(0).toUpperCase()}
              </div>

              {/* User info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                  color: 'var(--text-primary)', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {u.email || truncId(u.user_id)}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono, var(--font-sans))', fontSize: 11,
                  color: 'var(--text-tertiary)', marginTop: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {u.user_id}
                </div>
              </div>

              {/* Stats pills */}
              <div style={{
                display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}>
                    {u.questions_attempted}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10,
                    color: 'var(--text-tertiary)', textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Questions
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                    color: 'var(--success)',
                  }}>
                    {u.questions_correct}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10,
                    color: 'var(--text-tertiary)', textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Correct
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                    color: u.accuracy >= 70 ? 'var(--success)' : u.accuracy >= 50 ? 'var(--warning)' : 'var(--error)',
                  }}>
                    {u.accuracy}%
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 10,
                    color: 'var(--text-tertiary)', textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Accuracy
                  </div>
                </div>
              </div>

              {/* Last active */}
              <div style={{
                flexShrink: 0, textAlign: 'right', minWidth: 80,
              }}>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12,
                  color: 'var(--text-tertiary)',
                }}>
                  {formatDate(u.last_active)}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: 10,
                  color: 'var(--text-tertiary)', opacity: 0.6,
                }}>
                  Last active
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
