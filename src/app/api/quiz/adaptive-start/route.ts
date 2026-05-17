import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { selectNextAdaptiveQuestion } from '@/lib/adaptive'

/**
 * GET /api/quiz/adaptive-start
 *
 * Starts an adaptive session by returning the first question.
 * Stateless — selects from the user's currently weakest un-attempted domain.
 */
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await selectNextAdaptiveQuestion(supabase, user.id)
  return NextResponse.json(result)
}
