import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check admin
  const { data: admin } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const searchParams = request.nextUrl.searchParams
  const paper = searchParams.get('paper')
  const domain = searchParams.get('domain')
  const activeOnly = searchParams.get('active') !== 'false'

  let query = supabase.from('questions').select('*').order('created_at', { ascending: false })

  if (paper) query = query.eq('paper', paper)
  if (domain) query = query.eq('domain', domain)
  if (activeOnly) query = query.eq('is_active', true)

  const { data } = await query

  return NextResponse.json({ questions: data || [] })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: admin } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const adminClient = createAdminClient()

  const { data, error } = await adminClient
    .from('questions')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ question: data })
}
