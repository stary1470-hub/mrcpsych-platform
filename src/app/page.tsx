'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DOMAINS_PAPER_A_INFO, DOMAINS_PAPER_B_INFO } from '@/types'

const PRICING = {
  paperA: { monthly: 29, cycle: 79 },
  paperB: { monthly: 29, cycle: 99 },
  bundle: { monthly: 39, cycle: 149 },
}

export default function LandingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'var(--gradient-hero)',
      }} />
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 1000, height: 800,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Floating circles */}
      <div style={{
        position: 'fixed', top: '8%', right: '12%', width: 160, height: 160,
        border: '1px solid rgba(20, 184, 166, 0.06)', borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '15%', left: '6%', width: 100, height: 100,
        border: '1px solid rgba(20, 184, 166, 0.04)', borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '40%', right: '5%', width: 60, height: 60,
        border: '1px solid rgba(251, 191, 36, 0.05)', borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav bar */}
        <nav style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 40px', maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#pricing" className="btn btn-ghost" style={{ fontSize: 13 }}>Pricing</a>
            <a href="/signup" className="btn btn-primary" style={{ fontSize: 13 }}>Get Started</a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          textAlign: 'center', padding: '80px 24px 60px',
          maxWidth: 800, margin: '0 auto',
        }} className="animate-slide-up">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent-teal-subtle)', border: '1px solid rgba(20, 184, 166, 0.15)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 28,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--accent-teal)', letterSpacing: '0.04em' }}>
              Adaptive Exam Preparation
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 400, lineHeight: 1.15, marginBottom: 24,
            color: 'var(--text-primary)',
          }}>
            Stop memorising answers.<br />
            <span style={{ color: 'var(--accent-teal)' }}>Start closing gaps.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, color: 'var(--text-secondary)',
            lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px',
          }}>
            PsychStar adapts to your blind spots. Every wrong answer triggers a teaching cascade that rebuilds your knowledge architecture — not just your score.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/signup" className="btn btn-primary btn-lg" style={{ fontSize: 15, padding: '14px 32px' }}>
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#papers" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 32px' }}>
              Explore Papers
            </a>
          </div>
        </section>

        {/* Features strip */}
        <section style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          maxWidth: 900, margin: '0 auto', padding: '0 24px 80px',
        }} className="animate-stagger">
          {[
            { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>), title: 'Adaptive Engine', desc: 'Bayesian proficiency estimation targets your weakest domains' },
            { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>), title: 'Teaching Cascades', desc: 'Wrong answers trigger concept-level remediation' },
            { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>), title: 'Blind-Spot Map', desc: 'Visual domain breakdown reveals exactly where you need work' },
            { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>), title: 'Exam Simulation', desc: 'Timed exam mode with weighted question timing' },
          ].map(f => (
            <div key={f.title} style={{
              flex: '1 1 180px', maxWidth: 220, padding: 20,
              background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', textAlign: 'center',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </section>

        {/* ─── Paper Sections ─── */}
        <section id="papers" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="animate-slide-up">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>
              Choose Your Paper
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-tertiary)', maxWidth: 500, margin: '0 auto' }}>
              Each paper is a complete, self-contained exam preparation product with its own adaptive engine and domain map.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Paper A Card */}
            <div className="paper-card animate-slide-up" style={{
              background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)', padding: 32, position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow-teal)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Gradient accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gradient-teal)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: 'var(--accent-teal-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)' }}>Paper A</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--accent-teal)', fontWeight: 600, letterSpacing: '0.04em' }}>Scientific &amp; Theoretical Basis</div>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                The scientific foundations of psychiatry — behavioural science, human development, neurosciences, psychopharmacology, and classification. Two sections alone (Neurosciences + Psychopharmacology) account for 50% of marks. Build the clinical reasoning architecture that separates pass from fail.
              </p>

              {/* Domain list with weights */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {DOMAINS_PAPER_A_INFO.length} Sections · 150 Marks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {DOMAINS_PAPER_A_INFO.map(d => (
                    <div key={d.key} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: 'var(--font-sans)', fontSize: 12,
                      color: 'var(--text-secondary)', background: 'rgba(20, 184, 166, 0.06)',
                      border: '1px solid rgba(20, 184, 166, 0.1)',
                      padding: '6px 12px', borderRadius: 6,
                    }}>
                      <span style={{ fontWeight: 500 }}>{d.name}</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent-teal)', fontSize: 11 }}>{d.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div style={{
                background: 'rgba(20, 184, 166, 0.04)', border: '1px solid rgba(20, 184, 166, 0.08)',
                borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'var(--accent-teal)' }}>£{PRICING.paperA.monthly}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>/month</span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                  or £{PRICING.paperA.cycle} per exam cycle (3 months)
                </div>
              </div>

              <a href="/signup" className="btn btn-primary" style={{ width: '100%', fontSize: 14, padding: '12px 24px' }}>
                Start Paper A Preparation
              </a>
            </div>

            {/* Paper B Card */}
            <div className="paper-card animate-slide-up" style={{
              background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)', padding: 32, position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: '0.1s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ec4899'; e.currentTarget.style.boxShadow = '0 0 24px rgba(236, 72, 153, 0.15)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(135deg, #ec4899, #d946ef)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: 'rgba(236, 72, 153, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)' }}>Paper B</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#ec4899', fontWeight: 600, letterSpacing: '0.04em' }}>Critical Review &amp; Clinical Topics</div>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                Critical review skills and clinical psychiatry — including general adult, old age, child &amp; adolescent, substance misuse, forensic, learning disability, psychotherapy, and service organisation. Critical Review alone is worth 33.5% of marks (50/150).
              </p>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {DOMAINS_PAPER_B_INFO.length} Sections · 150 Marks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {DOMAINS_PAPER_B_INFO.map(d => (
                    <div key={d.key} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: 'var(--font-sans)', fontSize: 12,
                      color: 'var(--text-secondary)', background: 'rgba(236, 72, 153, 0.06)',
                      border: '1px solid rgba(236, 72, 153, 0.1)',
                      padding: '6px 12px', borderRadius: 6,
                    }}>
                      <span style={{ fontWeight: 500 }}>{d.name}</span>
                      <span style={{ fontWeight: 700, color: '#ec4899', fontSize: 11 }}>{d.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'rgba(236, 72, 153, 0.04)', border: '1px solid rgba(236, 72, 153, 0.08)',
                borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: '#ec4899' }}>£{PRICING.paperB.monthly}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>/month</span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
                  or £{PRICING.paperB.cycle} per exam cycle (3 months)
                </div>
              </div>

              <a href="/signup" className="btn btn-primary" style={{ width: '100%', fontSize: 14, padding: '12px 24px', background: '#ec4899', boxShadow: '0 2px 8px rgba(236, 72, 153, 0.25)' }}>
                Start Paper B Preparation
              </a>
            </div>
          </div>
        </section>

        {/* ─── Bundle Pricing ─── */}
        <section id="pricing" style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 80px' }}>
          <div className="animate-slide-up" style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.06), rgba(236, 72, 153, 0.06))',
            border: '1px solid rgba(20, 184, 166, 0.15)',
            borderRadius: 'var(--radius-xl)', padding: 40, textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-teal), #ec4899)' }} />

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: 20, padding: '6px 14px', marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--success)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Save £{PRICING.paperA.cycle + PRICING.paperB.cycle - PRICING.bundle.cycle} vs separate papers
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8 }}>
              Both Papers Bundle
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
              Full access to Paper A + Paper B with cross-paper adaptive intelligence. Your weaknesses in pharmacology inform your clinical scenario practice.
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 400, color: 'var(--accent-teal)' }}>£{PRICING.bundle.monthly}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-tertiary)' }}>/month</span>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>
              or £{PRICING.bundle.cycle} per exam cycle (3 months)
            </div>

            <a href="/signup" className="btn btn-primary btn-lg" style={{ fontSize: 15, padding: '14px 40px' }}>
              Get Both Papers
            </a>
          </div>
        </section>

        {/* ─── Login Card ─── */}
        <section style={{ maxWidth: 440, margin: '0 auto', padding: '0 24px 80px' }}>
          <div className="auth-card animate-slide-up" style={{ maxWidth: 440, margin: '0 auto' }}>
            <div className="auth-header">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)' }}>Welcome back</h2>
              <p className="auth-subtitle">Sign in to continue your preparation</p>
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
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--error)', background: 'var(--error-subtle)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(248, 113, 113, 0.15)' }}>
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
              <a href="/signup" style={{ color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 600 }}>Create one</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '40px 24px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, marginBottom: 8 }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} PsychStar. Adaptive MRCPsych exam preparation.
          </p>
        </footer>
      </div>
    </div>
  )
}
