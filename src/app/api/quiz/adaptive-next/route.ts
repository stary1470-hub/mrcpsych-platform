import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { selectNextAdaptiveQuestion } from '@/lib/adaptive'

/**
 * GET /api/quiz/adaptive-next?previous_id=xxx
 *
 * Returns the next adaptive question after answering one.
 * Recalculates proficiency using the just-answered question's data.
 *
 * Query params:
 *   previous_id — the question that was just answered (excluded from results)
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const previousId = request.nextUrl.searchParams.get('previous_id') || undefined
  const result = await selectNextAdaptiveQuestion(supabase, user.id, previousId)
  return NextResponse.json(result)
}
