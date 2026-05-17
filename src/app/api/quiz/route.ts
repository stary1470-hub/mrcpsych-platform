import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const searchParams = request.nextUrl.searchParams
  const domain = searchParams.get('domain')
  const limit = Math.min(Number(searchParams.get('limit')) || 10, 50)

  let query = supabase
    .from('questions')
    .select('*')
    .eq('is_active', true)
    .order('id')

  if (domain) query = query.eq('domain', domain)

  // Exclude questions already answered by user
  const { data: answered } = await supabase
    .from('user_progress')
    .select('question_id')
    .eq('user_id', user.id)

  const answeredIds = new Set(answered?.map(a => a.question_id) || [])
  if (answeredIds.size > 0) {
    query = query.not('id', 'in', `(${Array.from(answeredIds).join(',')})`)
  }

  const { data: questions } = await query.limit(limit)

  return NextResponse.json({ questions: questions || [] })
}
