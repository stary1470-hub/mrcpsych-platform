import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ hasAccess: false, subscription: null })
  }

  // Get active subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .order('current_period_end', { ascending: false })
    .limit(1)
    .single()

  if (!sub) {
    return NextResponse.json({ hasAccess: false, subscription: null })
  }

  return NextResponse.json({
    hasAccess: true,
    subscription: {
      plan: sub.plan,
      billingPeriod: sub.billing_period,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  })
}
