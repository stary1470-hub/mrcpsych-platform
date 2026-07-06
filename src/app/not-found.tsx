export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      padding: 24,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'var(--accent-teal-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text-primary)',
          marginBottom: 8, fontWeight: 400,
        }}>
          Page not found
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)',
          marginBottom: 32, lineHeight: 1.6,
        }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="btn btn-primary btn-lg"
          style={{ fontSize: 14, padding: '12px 28px', textDecoration: 'none' }}
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
