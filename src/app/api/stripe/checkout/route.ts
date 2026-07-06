import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe, PRICE_IDS, type PlanId } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'You must be signed in to subscribe' }, { status: 401 })
    }

    const { plan, billingPeriod } = await request.json() as {
      plan: 'paper_a' | 'paper_b' | 'bundle'
      billingPeriod: 'monthly' | 'cycle'
    }

    // Map to price ID
    const priceKey = `${plan}_${billingPeriod}` as PlanId
    const priceId = PRICE_IDS[priceKey]
    
    if (!priceId) {
      return NextResponse.json({
        error: 'Price not configured. The admin needs to set up Stripe products first.'
      }, { status: 400 })
    }

    // Create or retrieve Stripe customer
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1)
      .single()

    let customerId: string | undefined = existingSub?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      })
      customerId = customer.id
    }

    // Determine success/cancel URLs
    const origin = request.headers.get('origin') || 'https://psychstar.io'

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        user_id: user.id,
        plan,
        billing_period: billingPeriod,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan,
          billing_period: billingPeriod,
        },
      },
    })

    return NextResponse.json({ url: session.url })
    
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
