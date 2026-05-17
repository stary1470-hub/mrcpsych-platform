import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if admin
  const { data: admin } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  const isAdmin = !!admin

  // Get domain stats
  const { data: domainStats } = await supabase
    .rpc('get_user_domain_stats', { p_user_id: user.id })

  // Get unanswered/unseen questions count
  const { count: totalQuestions } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: answeredQuestions } = await supabase
    .from('user_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return NextResponse.json({
    total_questions: totalQuestions || 0,
    answered_questions: answeredQuestions || 0,
    domain_stats: domainStats || [],
    is_admin: isAdmin,
  })
}
