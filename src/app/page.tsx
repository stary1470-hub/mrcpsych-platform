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
    <div className="auth-page" style={{ flexDirection: 'column', gap: 0 }}>
      {/* Brand header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>
          <span className="text-gradient">MRCPsych</span>
          <span style={{ color: 'var(--text-primary)' }}>Pro</span>
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 14, marginTop: 8 }}>
          Adaptive exam preparation for the MRCPsych
        </p>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 600 }}>
        {[
          { icon: '🎯', title: 'Adaptive', desc: 'Questions target your weakest domains first' },
          { icon: '🧠', title: 'Teaching Cascades', desc: 'Every wrong answer teaches the concept' },
          { icon: '📊', title: 'Blind-Spot Map', desc: 'See exact performance by domain' },
        ].map(f => (
          <div
            key={f.title}
            style={{
              flex: '1 1 160px',
              padding: 16,
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Auth Card */}
      <div className="auth-card" style={{ maxWidth: 380 }}>
        <div className="auth-header">
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your preparation</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Email</label>
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
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 5 }}>Password</label>
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
            <div style={{ fontSize: 12, color: 'var(--error)', background: 'var(--error-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: 4 }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-tertiary)' }}>
          Don&apos;t have an account?{' '}
          <a href="/signup" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>
            Create one
          </a>
        </div>
      </div>
    </div>
  )
}
