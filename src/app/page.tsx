'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function HomePage() {
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
    <div className="auth-page" style={{ flexDirection: 'column', gap: 0, position: 'relative', overflow: 'hidden' }}>
      {/* Hero glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Floating decorative elements */}
      <div style={{
        position: 'absolute', top: '15%', right: '10%', width: 120, height: 120,
        border: '1px solid rgba(20, 184, 166, 0.08)', borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '8%', width: 80, height: 80,
        border: '1px solid rgba(20, 184, 166, 0.06)', borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse',
      }} />

      {/* Brand header */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }} className="animate-slide-up">
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, letterSpacing: '-0.02em',
          marginBottom: 12,
        }}>
          <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
          <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)', color: 'var(--text-tertiary)', fontSize: 16, fontWeight: 500,
          letterSpacing: '0.02em', maxWidth: 420, margin: '0 auto',
        }}>
          Adaptive exam preparation for the MRCPsych
        </p>
      </div>

      {/* Feature cards */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: 640, position: 'relative', zIndex: 1,
      }} className="animate-stagger">
        {[
          { icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          ), title: 'Adaptive', desc: 'Questions target your weakest domains first' },
          { icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          ), title: 'Teaching Cascades', desc: 'Every wrong answer teaches the concept' },
          { icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          ), title: 'Blind-Spot Map', desc: 'See exact performance by domain' },
        ].map(f => (
          <div
            key={f.title}
            style={{
              flex: '1 1 170px', padding: 20,
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)'
              e.currentTarget.style.boxShadow = 'var(--shadow-glow-teal)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Auth Card */}
      <div className="auth-card animate-slide-up" style={{ maxWidth: 400, animationDelay: '0.2s' }}>
        <div className="auth-header">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)' }}>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your preparation</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="input"
              placeholder="••••••••"
            />
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

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: 4, width: '100%' }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
          Don&apos;t have an account?{' '}
          <a href="/signup" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.15s' }}>
            Create one
          </a>
        </div>
      </div>
    </div>
  )
}
