import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Get the user's Stripe customer ID
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1)
      .single()

    if (!sub?.stripe_customer_id) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    // Create a billing portal session
    const origin = request.headers.get('origin') || 'https://psychstar.io'
    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    })

    return NextResponse.redirect(session.url)
    
  } catch (error: any) {
    console.error('Portal error:', error)
    return NextResponse.redirect(new URL('/dashboard?portal_error=true', request.url))
  }
}
