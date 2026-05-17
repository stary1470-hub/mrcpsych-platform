'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      if (error) {
        setError(error.message)
        return
      }
      router.push('/dashboard')
    }
    handleAuthCallback()
  }, [supabase, router])

  if (error) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
          <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Authentication error</h1>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>{error}</p>
          <a href="/login" style={{ display: 'inline-block', marginTop: 20, color: 'var(--accent-blue)', fontSize: 13, textDecoration: 'none' }}>
            Back to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔄</div>
        <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Completing sign in...</h1>
      </div>
    </div>
  )
}
