'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface SubInfo {
  plan: string
  billingPeriod: string
  currentPeriodEnd: string
}

const PLAN_LABELS: Record<string, string> = {
  paper_a: 'Paper A',
  paper_b: 'Paper B',
  bundle: 'Both Papers (A + B)',
}

const PLAN_PRICES: Record<string, string> = {
  paper_a_monthly: '£29/mo',
  paper_a_cycle: '£79/3 months',
  paper_b_monthly: '£29/mo',
  paper_b_cycle: '£79/3 months',
  bundle_monthly: '£49/mo',
  bundle_cycle: '£119/3 months',
}

export default function ThankYouPage() {
  const supabase = createClient()
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [sub, setSub] = useState<SubInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Welcome to PsychStar'
  }, [])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Extract name from email prefix or user metadata
      const metaName = user.user_metadata?.full_name || user.user_metadata?.name
      const emailPrefix = user.email?.split('@')[0] || ''
      const name = metaName || emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1)
      setUserName(name)

      // Fetch subscription
      try {
        const res = await fetch('/api/stripe/status')
        const data = await res.json()
        if (data.subscription) {
          setSub(data.subscription)
        }
      } catch {
        // Subscription may not be activated yet via webhook — show without it
      }

      setLoading(false)
    }
    load()
  }, [supabase, router])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-base)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton" style={{ width: 64, height: 64, borderRadius: 16, margin: '0 auto 20px' }} />
          <div className="skeleton" style={{ width: 240, height: 24, margin: '0 auto 12px' }} />
          <div className="skeleton" style={{ width: 160, height: 16, margin: '0 auto' }} />
        </div>
      </div>
    )
  }

  const planLabel = sub ? PLAN_LABELS[sub.plan] || sub.plan : 'Your Plan'
  const priceLabel = sub ? PLAN_PRICES[`${sub.plan}_${sub.billingPeriod}`] || '' : ''
  const periodEnd = sub?.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--surface-base)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* Success icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(20, 184, 166, 0.05))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Welcome */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32, fontWeight: 400,
          textAlign: 'center', marginBottom: 8,
          color: 'var(--text-primary)',
          animation: 'fadeInUp 0.5s ease both',
          animationDelay: '0.1s',
        }}>
          Welcome to PsychStar{userName ? `, Dr ${userName}` : ''}
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 15, color: 'var(--text-tertiary)',
          textAlign: 'center', marginBottom: 36, lineHeight: 1.6,
          animation: 'fadeInUp 0.5s ease both',
          animationDelay: '0.15s',
        }}>
          Your subscription is active. You now have full access to every question, domain, and adaptive feature.
        </p>

        {/* Subscription confirmation card */}
        {sub && (
          <div style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 28px', marginBottom: 28,
            animation: 'fadeInUp 0.5s ease both',
            animationDelay: '0.2s',
          }}>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-tertiary)', marginBottom: 16,
            }}>
              Subscription Details
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)' }}>Plan</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {planLabel}
                </span>
              </div>
              {priceLabel && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)' }}>Price</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--accent-teal)' }}>
                    {priceLabel}
                  </span>
                </div>
              )}
              {periodEnd && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)' }}>
                    {sub.billingPeriod === 'cycle' ? 'Renews' : 'Next billing'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {periodEnd}
                  </span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)' }}>Status</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                  color: 'var(--success)',
                  background: 'var(--success-subtle)',
                  padding: '3px 10px', borderRadius: 20,
                }}>
                  Active
                </span>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid var(--border-subtle)', marginTop: 16, paddingTop: 14,
              display: 'flex', justifyContent: 'center',
            }}>
              <a href="/api/stripe/portal" style={{
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                color: 'var(--text-tertiary)', textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}>
                Manage billing &amp; receipts
              </a>
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <div style={{
          textAlign: 'center',
          animation: 'fadeInUp 0.5s ease both',
          animationDelay: '0.3s',
        }}>
          <Link href="/dashboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 36px', borderRadius: 'var(--radius-md)',
            background: 'var(--accent-teal)',
            color: '#fff',
            fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(20, 184, 166, 0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 184, 166, 0.3)' }}
          >
            Start Studying Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Secondary links */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20,
          animation: 'fadeInUp 0.5s ease both',
          animationDelay: '0.35s',
        }}>
          <Link href="/quiz" style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            color: 'var(--text-tertiary)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-teal)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            Jump to Quiz
          </Link>
          <Link href="/review" style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            color: 'var(--text-tertiary)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-teal)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
          >
            Review Answers
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
