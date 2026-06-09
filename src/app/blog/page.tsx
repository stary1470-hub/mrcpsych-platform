'use client'

import Link from 'next/link'
import { articles } from './articles'

export default function BlogIndex() {
  const featuredArticles = articles.filter(a => a.featured)
  const otherArticles = articles.filter(a => !a.featured)

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'var(--gradient-hero)' }} />
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </Link>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/pricing" className="btn btn-ghost" style={{ fontSize: 13 }}>Pricing</Link>
            <Link href="/signup" className="btn btn-primary" style={{ fontSize: 13 }}>Get Started</Link>
          </div>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.15)',
            borderRadius: 20, padding: '6px 16px', marginBottom: 16,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              PsychStar Blog
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 44px)',
            fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12,
          }}>
            Evidence-Based MRCPsych Preparation
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-tertiary)', maxWidth: 500, margin: '0 auto' }}>
            Written by an NHS consultant psychiatrist. Exam strategy, topic deep-dives, and insider knowledge for Paper A, Paper B, and CASC.
          </p>
        </div>

        {/* Featured Articles */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400,
            color: 'var(--text-primary)', marginBottom: 24,
          }}>
            Featured Articles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {featuredArticles.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: 24,
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-teal)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                      color: 'var(--accent-teal)', letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: 'rgba(20, 184, 166, 0.08)', borderRadius: 4, padding: '3px 8px',
                    }}>
                      {article.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>
                      {article.date} · {article.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400,
                    color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3,
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {article.metaDescription}
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {article.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-tertiary)',
                        background: 'rgba(255,255,255,0.03)', borderRadius: 4, padding: '2px 8px',
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400,
            color: 'var(--text-primary)', marginBottom: 20,
          }}>
            All Articles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {otherArticles.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)', padding: '16px 20px',
                  transition: 'all 0.15s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
                      color: 'var(--accent-teal)', letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {article.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-tertiary)' }}>
                      · {article.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400,
                    color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
                  }}>
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{
          textAlign: 'center', marginTop: 60, padding: '40px 24px',
          background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--text-primary)', marginBottom: 8 }}>
            Ready to Close Your Gaps?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 24 }}>
            Try 5 free questions from our adaptive question bank. No signup required.
          </p>
          <Link href="/try" className="btn btn-primary btn-lg" style={{ fontSize: 15, padding: '14px 32px' }}>
            Try 5 Free Questions
          </Link>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '60px 0 20px' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 18, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </Link>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
            © 2026 PsychStar. Adaptive MRCPsych exam preparation.
          </p>
        </footer>
      </div>
    </div>
  )
}
