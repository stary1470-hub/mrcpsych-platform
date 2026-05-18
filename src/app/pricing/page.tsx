'use client'

import { useState } from 'react'
import { DOMAINS_PAPER_A, DOMAINS_PAPER_B } from '@/types'
import { getDomainDisplayName } from '@/lib/utils'

const PLANS = [
  {
    id: 'paper-a',
    name: 'Paper A',
    subtitle: 'Basic Sciences',
    color: 'var(--accent-teal)',
    colorSubtle: 'rgba(20, 184, 166, 0.1)',
    colorBorder: 'rgba(20, 184, 166, 0.15)',
    gradient: 'var(--gradient-teal)',
    monthly: 29,
    cycle: 79,
    domains: DOMAINS_PAPER_A,
    features: [
      'Full Paper A question bank',
      'Adaptive proficiency engine',
      'Teaching cascades on wrong answers',
      'Domain-level blind-spot mapping',
      'Practice & exam simulation modes',
      'Performance analytics & trends',
    ],
  },
  {
    id: 'paper-b',
    name: 'Paper B',
    subtitle: 'Clinical Sciences',
    color: '#ec4899',
    colorSubtle: 'rgba(236, 72, 153, 0.1)',
    colorBorder: 'rgba(236, 72, 153, 0.15)',
    gradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
    monthly: 29,
    cycle: 99,
    domains: DOMAINS_PAPER_B,
    features: [
      'Full Paper B question bank',
      'Adaptive proficiency engine',
      'Teaching cascades on wrong answers',
      'Domain-level blind-spot mapping',
      'Practice & exam simulation modes',
      'Performance analytics & trends',
    ],
    popular: true,
  },
  {
    id: 'bundle',
    name: 'Both Papers',
    subtitle: 'Complete Package',
    color: 'var(--success)',
    colorSubtle: 'rgba(52, 211, 153, 0.1)',
    colorBorder: 'rgba(52, 211, 153, 0.15)',
    gradient: 'linear-gradient(90deg, var(--accent-teal), #ec4899)',
    monthly: 39,
    cycle: 149,
    domains: [...DOMAINS_PAPER_A, ...DOMAINS_PAPER_B],
    features: [
      'Everything in Paper A + Paper B',
      'Cross-paper adaptive intelligence',
      'Unified blind-spot map across both papers',
      'Priority content updates',
      'Mock exam simulations',
      'Personalised remediation plan',
    ],
    savings: 79 + 99 - 149,
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'cycle'>('cycle')

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'var(--gradient-hero)' }} />
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
          color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: 40,
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-teal)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to PsychStar
        </a>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }} className="animate-slide-up">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-tertiary)', maxWidth: 500, margin: '0 auto 32px' }}>
            Choose the paper you&apos;re sitting. Each is a complete, self-contained preparation product.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)',
            padding: 4, border: '1px solid var(--border-subtle)',
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                padding: '8px 20px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                background: billingCycle === 'monthly' ? 'var(--accent-teal)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--surface-base)' : 'var(--text-tertiary)',
                transition: 'all 0.2s',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('cycle')}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                padding: '8px 20px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                background: billingCycle === 'cycle' ? 'var(--accent-teal)' : 'transparent',
                color: billingCycle === 'cycle' ? 'var(--surface-base)' : 'var(--text-tertiary)',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              Per Cycle
              <span style={{
                position: 'absolute', top: -8, right: -8,
                fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700,
                color: 'var(--success)', background: 'rgba(52, 211, 153, 0.12)',
                padding: '2px 6px', borderRadius: 4, letterSpacing: '0.04em',
              }}>
                SAVE
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>
          {PLANS.map((plan, i) => (
            <div key={plan.id} className="animate-slide-up" style={{
              background: 'var(--surface-card)',
              border: `1px solid ${plan.popular ? plan.colorBorder : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-xl)', padding: 32, position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animationDelay: `${i * 0.1}s`,
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = plan.color; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 0 24px ${plan.colorSubtle}` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = plan.popular ? plan.colorBorder : 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: plan.gradient }} />

              {plan.savings && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                  color: 'var(--success)', background: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.2)',
                  padding: '4px 10px', borderRadius: 6, letterSpacing: '0.04em',
                }}>
                  SAVE £{plan.savings}
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {plan.name}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: plan.color, letterSpacing: '0.04em' }}>
                  {plan.subtitle}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 400, color: plan.color }}>
                    £{billingCycle === 'monthly' ? plan.monthly : plan.cycle}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
                    {billingCycle === 'monthly' ? '/month' : '/cycle'}
                  </span>
                </div>
                {billingCycle === 'cycle' && (
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
                    That&apos;s £{Math.round(plan.cycle / 3)}/month for 3 months
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 24, flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {plan.domains.length} Domains Covered
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
                  {plan.domains.map(d => (
                    <span key={d} style={{
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500,
                      color: 'var(--text-tertiary)', background: plan.colorSubtle,
                      padding: '3px 8px', borderRadius: 4,
                    }}>
                      {getDomainDisplayName(d)}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/signup" className="btn btn-primary" style={{
                width: '100%', fontSize: 14, padding: '12px 24px',
                background: plan.color,
                boxShadow: `0 2px 8px ${plan.colorSubtle}`,
              }}>
                Get {plan.name}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Can I switch papers after purchase?', a: 'Yes. Contact support and we\'ll transfer your subscription to the other paper at no extra cost within the first 14 days.' },
            { q: 'What happens when my cycle ends?', a: 'You can renew for another cycle, switch to monthly billing, or upgrade to the bundle. Your progress and analytics are saved permanently.' },
            { q: 'Is there a free trial?', a: 'Yes — sign up and access 20 free questions in each paper to experience the adaptive engine before committing.' },
            { q: 'How often is content updated?', a: 'Questions are reviewed and updated continuously. New questions are added weekly, aligned to the latest Royal College curriculum and NICE guidelines.' },
          ].map(({ q, a }) => (
            <div key={q} style={{
              padding: '20px 0', borderBottom: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{q}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '60px 0 20px' }}>
          <a href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 20, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </a>
        </footer>
      </div>
    </div>
  )
}
