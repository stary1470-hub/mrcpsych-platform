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
        className="fixed top-3 left-3 z-50 md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-surface-card border border-border-subtle"
      >
        <span className="text-sm">{expanded ? '✕' : '☰'}</span>
      </button>

      {/* Overlay */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${expanded ? '!block' : ''}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="sidebar-logo">
            MRCPsych<span className="text-accent-blue">Pro</span>
          </Link>
          <div className="sidebar-logo-sub">Adaptive Exam Preparation</div>
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
              className="text-xs text-text-tertiary hover:text-error transition-colors"
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
