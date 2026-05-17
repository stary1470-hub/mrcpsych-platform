'use client'

import Sidebar from './Sidebar'

interface AppLayoutProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
}

export default function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            {title && <h1 className="topbar-title">{title}</h1>}
            {subtitle && <span className="topbar-breadcrumb">{subtitle}</span>}
          </div>
          <div className="topbar-right" />
        </div>
        <div className="page-container">
          {children}
        </div>
      </div>
    </div>
  )
}
