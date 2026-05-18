import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { question_id, selected_index, time_taken_seconds } = body

  if (!question_id || selected_index === undefined) {
    return NextResponse.json({ error: 'question_id and selected_index required' }, { status: 400 })
  }

  // Get the question to check correct answer
  const { data: question } = await supabase
    .from('questions')
    .select('correct_index')
    .eq('id', question_id)
    .single()

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }

  const correct = selected_index === question.correct_index

  const { error } = await supabase.from('user_progress').upsert({
    user_id: user.id,
    question_id,
    selected_index,
    correct,
    time_taken_seconds: typeof time_taken_seconds === 'number' ? time_taken_seconds : null,
  }, {
    onConflict: 'user_id, question_id',
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ correct, correct_index: question.correct_index })
}
