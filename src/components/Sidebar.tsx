'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/quiz', label: 'Practice', icon: '📝' },
  { href: '/review', label: 'Review', icon: '📖' },
]

const ADMIN_ITEMS = [
  { href: '/admin', label: 'Admin', icon: '⚙️' },
  { href: '/admin/questions', label: 'Questions', icon: '📋' },
  { href: '/admin/import', label: 'Import', icon: '📤' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        const { data } = await supabase
          .from('admins')
          .select('user_id')
          .eq('user_id', user.id)
          .single()
        setIsAdmin(!!data)
      }
    }
    check()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="sidebar-mobile-toggle"
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 50,
          width: 36,
          height: 36,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: 16,
        } as React.CSSProperties}
      >
        <span>{expanded ? '✕' : '☰'}</span>
      </button>

      {/* Overlay */}
      {expanded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${expanded ? 'mobile-expanded' : ''}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            Psych<span style={{ color: 'var(--accent-blue)', background: 'none', WebkitTextFillColor: 'var(--accent-blue)' }}>Star</span>
          </Link>
          <div className="sidebar-logo-sub">MRCPsych Exam Preparation</div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar-section-label">Administration</div>
              {ADMIN_ITEMS.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setExpanded(false)}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {email ? email[0].toUpperCase() : '?'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                {email ? email.split('@')[0] : 'User'}
              </div>
              <div className="sidebar-user-role">
                {isAdmin ? 'Admin' : 'Trainee'}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                fontSize: 12,
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              title="Sign out"
            >
              ⏻
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
