'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })

    if (error) { setError(error.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="auth-page" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="auth-card animate-scale-in" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: 'var(--accent-teal-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, marginBottom: 12 }}>Check your email</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            If an account exists for <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>, we&apos;ve sent a password reset link.
          </p>
          <a href="/login" style={{ display: 'inline-block', marginTop: 24, fontFamily: 'var(--font-sans)', color: 'var(--accent-teal)', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>
            Back to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="auth-card animate-scale-in" style={{ position: 'relative', zIndex: 1 }}>
        <div className="auth-header">
          <div className="auth-logo">PsychStar</div>
          <p className="auth-subtitle">Reset your password</p>
        </div>

        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Email address
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
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

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
          Remember your password?{' '}
          <a href="/login" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 600 }}>Sign in</a>
        </p>
      </div>
    </div>
  )
}
