'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        // Check if admin
        const { data } = await supabase
          .from('admins')
          .select('user_id')
          .eq('user_id', user.id)
          .single()
        setIsAdmin(!!data)
      }
    }
    checkUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      pathname.startsWith(path)
        ? 'text-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`

  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-lg tracking-tight">
            Psych<span style={{ color: 'var(--accent-blue)' }}>Star</span>
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link href="/quiz" className={linkClass('/quiz')}>
              Practice
            </Link>
            <Link href="/review" className={linkClass('/review')}>
              Review
            </Link>
            {isAdmin && (
              <Link href="/admin" className={linkClass('/admin')}>
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{email}</span>
          <button
            onClick={handleSignOut}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex border-t border-gray-100">
        {[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/quiz', label: 'Practice' },
          { href: '/review', label: 'Review' },
          ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-1 text-center py-2 text-xs font-medium ${
              pathname.startsWith(link.href)
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
