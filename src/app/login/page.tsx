'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  useEffect(() => { document.title = 'Sign In | PsychStar' }, [])
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="auth-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="auth-card animate-scale-in" style={{ position: 'relative', zIndex: 1 }}>
        <div className="auth-header">
          <div className="auth-logo">PsychStar</div>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input" placeholder="••••••••" />
          </div>

          {error && (
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--error)',
              background: 'var(--error-subtle)', padding: '12px 16px', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(248, 113, 113, 0.15)',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -4 }}>
            <a href="/forgot-password" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
          No account?{' '}
          <a href="/signup" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 600 }}>Sign up</a>
        </p>
      </div>
    </div>
  )
}
