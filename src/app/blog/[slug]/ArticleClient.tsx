import Link from 'next/link'
import { Article } from '../articles'

interface Props {
  article: Article
}

export default function ArticleClient({ article }: Props) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'var(--gradient-hero)' }} />
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 22, textDecoration: 'none' }}>
            <span style={{ color: 'var(--accent-teal)' }}>Psych</span>
            <span style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Star</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/blog" className="btn btn-ghost" style={{ fontSize: 13 }}>
              ← Blog
            </Link>
            <Link href="/pricing" className="btn btn-ghost" style={{ fontSize: 13 }}>Pricing</Link>
            <Link href="/signup" className="btn btn-primary" style={{ fontSize: 13 }}>Get Started</Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 12, color: 'var(--text-tertiary)' }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
          <span>→</span>
          <Link href="/blog" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span style={{ color: 'var(--text-secondary)' }}>{article.category}</span>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
            color: 'var(--accent-teal)', letterSpacing: '0.06em', textTransform: 'uppercase',
            background: 'rgba(20, 184, 166, 0.08)', borderRadius: 4, padding: '4px 10px',
          }}>
            {article.category}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-tertiary)' }}>
            {article.date} · {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 36px)',
          fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 24,
        }}>
          {article.title}
        </h1>

        {/* Social proof */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40,
          padding: '12px 16px', background: 'rgba(20, 184, 166, 0.04)',
          border: '1px solid rgba(20, 184, 166, 0.08)', borderRadius: 'var(--radius-md)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, color: 'var(--surface-base)',
            flexShrink: 0,
          }}>
            PS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
              Written by PsychStar Clinical Team
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>
              NHS Consultant Psychiatrist · MRCPsych preparation expert
            </div>
          </div>
        </div>

        {/* Article content — rendered as server HTML for Googlebot */}
        <article style={{
          fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-primary)',
          lineHeight: 1.8, maxWidth: '100%',
        }} className="article-content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, marginTop: 40, flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: 24 }}>
          {article.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)',
              background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '4px 12px',
              border: '1px solid var(--border-subtle)',
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48, padding: '32px 24px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.06), rgba(20, 184, 166, 0.02))',
          border: '1px solid rgba(20, 184, 166, 0.12)', borderRadius: 'var(--radius-xl)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 8 }}>
            Put This Knowledge into Practice
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}>
            Test yourself on 4,600+ adaptive questions that target your blind spots. Try 5 questions free.
          </p>
          <Link href="/try" className="btn btn-primary btn-lg" style={{ fontSize: 15, padding: '14px 32px' }}>
            Try 5 Free Questions
          </Link>
          <div style={{ marginTop: 12 }}>
            <Link href="/pricing" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--accent-teal)', textDecoration: 'none' }}>
              View pricing →
            </Link>
          </div>
        </div>

        {/* Related articles */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>
            More Articles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/blog/best-mrcpsych-question-banks-2026" style={{ textDecoration: 'none' }}>
              <div className="blog-card-hover" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)' }}>
                  Best MRCPsych Question Banks in 2026: A Consultant&#8217;s Review
                </span>
              </div>
            </Link>
            <Link href="/blog/how-to-pass-mrcpsych-paper-a" style={{ textDecoration: 'none' }}>
              <div className="blog-card-hover" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)' }}>
                  How to Pass MRCPsych Paper A: The Complete Guide
                </span>
              </div>
            </Link>
            <Link href="/blog/mrcpsych-paper-a-vs-paper-b" style={{ textDecoration: 'none' }}>
              <div className="blog-card-hover" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)' }}>
                  MRCPsych Paper A vs Paper B: Key Differences
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '60px 0 20px', borderTop: '1px solid var(--border-subtle)', marginTop: 48 }}>
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
