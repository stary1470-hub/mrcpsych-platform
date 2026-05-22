const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

export async function createCheckoutSession(plan: string, billingPeriod: string) {
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, billingPeriod }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create checkout session')
  }

  // Redirect to Stripe Checkout
  if (data.url) {
    window.location.href = data.url
  }

  return data
}

export async function getSubscriptionStatus() {
  const res = await fetch('/api/stripe/status')
  return res.json()
}

export function openCustomerPortal() {
  window.location.href = '/api/stripe/portal'
}

// Reference: prices defined in Stripe Dashboard
// Paper A:   £29/month   or £79/cycle
// Paper B:   £29/month   or £79/cycle
// Bundle:    £49/month   or £119/cycle
