'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export default function AdminLayout({ title, subtitle, actions, children }: AdminLayoutProps) {
  const router = useRouter()
  const supabase = createClient()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('admins').select('user_id').eq('user_id', user.id).single()
      if (!data) { router.push('/dashboard'); return }
      setReady(true)
    }
    check()
  }, [supabase, router])

  if (!ready) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--surface-base)' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-base)', position: 'relative', zIndex: 1 }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: 220, minHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{
          height: 64, background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400, color: 'var(--text-primary)' }}>{title}</h1>
            {subtitle && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>{subtitle}</span>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
