'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { EXAM_CONFIG_DEFAULT } from '@/types'

export default function AdminSettingsPage() {
  const [examMinutes, setExamMinutes] = useState(EXAM_CONFIG_DEFAULT.totalMinutes)
  const [emiWeight, setEmiWeight] = useState(EXAM_CONFIG_DEFAULT.emiWeight)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Save to localStorage for now (persist to DB later)
    localStorage.setItem('psychstar_exam_config', JSON.stringify({ totalMinutes: examMinutes, emiWeight }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout title="Settings" subtitle="Platform configuration">
      <div style={{ maxWidth: 700 }}>
        {/* Exam Configuration */}
        <div style={{
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 24,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            Exam Configuration
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Exam Time (minutes)
              </label>
              <input type="number" value={examMinutes} onChange={e => setExamMinutes(Number(e.target.value))} min={30} max={360}
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'var(--surface-input)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none',
                }}
              />
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
                MRCPsych standard: 180 minutes (3 hours)
              </p>
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                EMI Time Weight
              </label>
              <input type="number" value={emiWeight} onChange={e => setEmiWeight(Number(e.target.value))} min={1} max={3} step={0.1}
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'var(--surface-input)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none',
                }}
              />
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>
                Multiplier for Extended Matching Items (1.5 = 50% more time per EMI)
              </p>
            </div>
          </div>

          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={handleSave} className="btn btn-primary btn-sm">
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
            {saved && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--success)' }}>Configuration saved</span>}
          </div>
        </div>

        {/* Pricing */}
        <div style={{
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 24,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
            Pricing Plans
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { name: 'Paper A', monthly: 29, cycle: 79, color: 'var(--accent-teal)' },
              { name: 'Paper B', monthly: 29, cycle: 99, color: '#ec4899' },
              { name: 'Bundle', monthly: 39, cycle: 149, color: 'var(--success)' },
            ].map(plan => (
              <div key={plan.name} style={{
                background: 'var(--surface-base)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', padding: 20, textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: plan.color, marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--text-primary)' }}>£{plan.monthly}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>/month or £{plan.cycle}/cycle</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 16 }}>
            Stripe integration coming soon. Prices are displayed on the landing and pricing pages.
          </p>
        </div>

        {/* Data Export */}
        <div style={{
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 24,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Data Export
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => {
              const link = document.createElement('a')
              link.href = '/questions/psychstar-paperB-batch1.json'
              link.download = 'questions-sample.json'
              link.click()
            }}>
              Export Questions (JSON)
            </button>
            <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.5 }}>
              Export User Data (CSV) — Coming Soon
            </button>
            <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.5 }}>
              Full Backup — Coming Soon
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{
          background: 'var(--surface-card)', border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: 'var(--radius-lg)', padding: 28,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--error)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Danger Zone
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Irreversible actions. Proceed with extreme caution.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-sm" style={{ background: 'var(--error)', color: '#fff' }} disabled>
              Delete All User Progress — Coming Soon
            </button>
            <button className="btn btn-sm" style={{ background: 'var(--error)', color: '#fff' }} disabled>
              Reset Platform — Coming Soon
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
