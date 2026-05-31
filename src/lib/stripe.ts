import Stripe from 'stripe'

// Price IDs — set these after creating products in Stripe Dashboard
// Prices:
//   Paper A:   £29/month   or £79/cycle
//   Paper B:   £29/month   or £79/cycle
//   Bundle:    £49/month   or £119/cycle
export const PRICE_IDS = {
  paper_a_monthly: process.env.STRIPE_PRICE_PAPER_A_MONTHLY || '',
  paper_a_cycle: process.env.STRIPE_PRICE_PAPER_A_CYCLE || '',
  paper_b_monthly: process.env.STRIPE_PRICE_PAPER_B_MONTHLY || '',
  paper_b_cycle: process.env.STRIPE_PRICE_PAPER_B_CYCLE || '',
  bundle_monthly: process.env.STRIPE_PRICE_BUNDLE_MONTHLY || '',
  bundle_cycle: process.env.STRIPE_PRICE_BUNDLE_CYCLE || '',
} as const

export type PlanId = keyof typeof PRICE_IDS

export function getPlanConfig(plan: PlanId) {
  const parts = plan.split('_')
  const product = parts[0] === 'bundle' ? 'bundle' : `paper_${parts[0].replace('paper', '')}`
  const period = parts[1]
  const label = plan.startsWith('bundle') ? 'Both Papers' : `Paper ${parts[0].replace('paper_', '').toUpperCase()}`
  const periodLabel = period === 'cycle' ? 'Exam Cycle (3 months)' : 'Monthly'
  return { product: parts[0], period, label, periodLabel }
}

// Lazy Stripe initialization - only instantiate when needed at runtime
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required')
    }
    _stripe = new Stripe(key, {
      apiVersion: '2026-04-22.dahlia' as any,
      typescript: true,
    })
  }
  return _stripe
}
