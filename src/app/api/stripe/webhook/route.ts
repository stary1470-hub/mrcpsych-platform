import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session: any = event.data.object
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan
      const billingPeriod = session.metadata?.billing_period

      if (!userId || !plan || !billingPeriod) {
        console.error('Missing metadata in session:', session.id)
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
      }

      const subscriptionId = session.subscription as string
      if (!subscriptionId) break

      // Get subscription details from Stripe
      const subscription: any = await stripe.subscriptions.retrieve(subscriptionId)

      // Upsert subscription record
      await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        stripe_price_id: subscription.items.data[0]?.price.id,
        plan,
        billing_period: billingPeriod,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      }, {
        onConflict: 'stripe_subscription_id',
        ignoreDuplicates: false,
      })

      break
    }

    case 'invoice.payment_succeeded': {
      const invoice: any = event.data.object
      const subscriptionId = invoice.subscription as string
      if (!subscriptionId) break

      const subscription: any = await stripe.subscriptions.retrieve(subscriptionId)
      
      await supabase.from('subscriptions').update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscriptionId)

      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription: any = event.data.object
      
      await supabase.from('subscriptions').update({
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', subscription.id)

      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
