import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// POST /api/admin/questions/bulk — bulk operations on questions
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: admin } = await supabase.from('admins').select('user_id').eq('user_id', user.id).single()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { action, ids } = body as { action: string; ids: string[] }

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'ids array required' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  try {
    if (action === 'delete') {
      // Delete associated user_progress first (foreign key constraint)
      const { error: progressErr } = await adminClient
        .from('user_progress')
        .delete()
        .in('question_id', ids)

      if (progressErr) {
        return NextResponse.json({ error: `Failed to delete progress: ${progressErr.message}` }, { status: 500 })
      }

      // Then delete the questions
      const { error: deleteErr, count } = await adminClient
        .from('questions')
        .delete({ count: 'exact' })
        .in('id', ids)

      if (deleteErr) {
        return NextResponse.json({ error: `Failed to delete questions: ${deleteErr.message}` }, { status: 500 })
      }

      return NextResponse.json({ success: true, deleted: count || ids.length })
    }

    if (action === 'activate') {
      const { error, count } = await adminClient
        .from('questions')
        .update({ is_active: true }, { count: 'exact' })
        .in('id', ids)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, updated: count || ids.length })
    }

    if (action === 'deactivate') {
      const { error, count } = await adminClient
        .from('questions')
        .update({ is_active: false }, { count: 'exact' })
        .in('id', ids)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, updated: count || ids.length })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
