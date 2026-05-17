import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

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
  const questions = Array.isArray(body) ? body : body.questions

  if (!Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: 'Questions array required' }, { status: 400 })
  }

  const adminClient = createAdminClient()
  const results = { success: 0, errors: [] as string[] }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    try {
      const { error } = await adminClient.from('questions').insert({
        stem: q.stem,
        options: q.options,
        correct_index: q.correct_index,
        distractors_rationale: q.distractors_rationale || null,
        teaching_point: q.teaching_point || null,
        domain: q.domain,
        subdomain: q.subdomain || null,
        difficulty: q.difficulty || null,
        bloom_taxonomy: q.bloom_taxonomy || null,
        paper: q.paper || 'A',
        tags: q.tags || null,
        source: q.source || null,
      })

      if (error) {
        results.errors.push(`Question ${i + 1}: ${error.message}`)
      } else {
        results.success++
      }
    } catch (err: any) {
      results.errors.push(`Question ${i + 1}: ${err.message}`)
    }
  }

  return NextResponse.json(results)
}
