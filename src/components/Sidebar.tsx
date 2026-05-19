'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
]

const PAPER_A_ITEMS = [
  {
    href: '/quiz?paper=A',
    label: 'Practice',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    href: '/quiz?paper=A&exam=true',
    label: 'Exam Mode',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const PAPER_B_ITEMS = [
  {
    href: '/quiz?paper=B',
    label: 'Practice',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    href: '/quiz?paper=B&exam=true',
    label: 'Exam Mode',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const GENERAL_ITEMS = [
  {
    href: '/review',
    label: 'Review',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    href: '/pricing',
    label: 'Pricing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
]

const ADMIN_ITEMS = [
  {
    href: '/admin',
    label: 'Admin Panel',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
      </svg>
    ),
  },
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
    if (href.includes('?paper=')) {
      const urlPaper = new URLSearchParams(href.split('?')[1]).get('paper')
      const urlBase = href.split('?')[0]
      return pathname === urlBase && typeof window !== 'undefined' && window.location.search.includes(`paper=${urlPaper}`)
    }
    if (href === '/pricing') return pathname === '/pricing'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="sidebar-mobile-toggle"
        aria-label={expanded ? 'Close menu' : 'Open menu'}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 50,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: 0,
          padding: 0,
        } as React.CSSProperties}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {expanded ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {expanded && (
        <div
          className="sidebar-overlay mobile-visible"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${expanded ? 'mobile-expanded' : ''}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            Psych<span className="sidebar-logo-accent">Star</span>
          </Link>
          <div className="sidebar-logo-sub">MRCPsych Exam Preparation</div>
        </div>

        <nav className="sidebar-nav">
          {/* Main nav */}
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

          {/* Paper A section */}
          <div className="sidebar-section-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-teal)', flexShrink: 0 }} />
            Paper A — Scientific Basis
          </div>
          {PAPER_A_ITEMS.map(item => (
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

          {/* Paper B section */}
          <div className="sidebar-section-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899', flexShrink: 0 }} />
            Paper B — Clinical Topics
          </div>
          {PAPER_B_ITEMS.map(item => (
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

          {/* General section */}
          <div className="sidebar-section-label">General</div>
          {GENERAL_ITEMS.map(item => (
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
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--error)'
                e.currentTarget.style.background = 'var(--error-subtle)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-tertiary)'
                e.currentTarget.style.background = 'none'
              }}
              title="Sign out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
