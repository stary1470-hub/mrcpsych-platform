#!/usr/bin/env node
/**
 * PsychStar — Stripe Product & Price Setup Script
 * =================================================
 * Run: node scripts/setup-stripe-products.js
 *
 * Requires: STRIPE_SECRET_KEY env var (from .env.local or export)
 *
 * Creates 6 price configurations:
 *   Paper A   £29/month   £79/cycle  (3 months)
 *   Paper B   £29/month   £79/cycle  (3 months)
 *   Bundle    £49/month   £119/cycle (3 months)
 *
 * Outputs: Price IDs to copy into Vercel env vars
 */

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-04-22.dahlia',
  typescript: true,
})

const PRODUCTS = [
  {
    name: 'Paper A — MRCPsych',
    description: 'Full access to PsychStar Paper A question bank, adaptive engine, teaching cascades, and blind-spot mapping.',
    metadata: { paper: 'A' },
    prices: [
      { nickname: 'Monthly', unit_amount: 2900, interval: 'month', interval_count: 1 },
      { nickname: 'Exam Cycle (3 months)', unit_amount: 7900, interval: 'month', interval_count: 3 },
    ],
  },
  {
    name: 'Paper B — MRCPsych',
    description: 'Full access to PsychStar Paper B question bank, critical review practice, adaptive engine, and blind-spot mapping.',
    metadata: { paper: 'B' },
    prices: [
      { nickname: 'Monthly', unit_amount: 2900, interval: 'month', interval_count: 1 },
      { nickname: 'Exam Cycle (3 months)', unit_amount: 7900, interval: 'month', interval_count: 3 },
    ],
  },
  {
    name: 'Both Papers — MRCPsych Bundle',
    description: 'Complete access to Paper A + Paper B with cross-paper adaptive intelligence, unified blind-spot map, mock exams, and personalised remediation plan.',
    metadata: { paper: 'bundle' },
    prices: [
      { nickname: 'Monthly', unit_amount: 4900, interval: 'month', interval_count: 1 },
      { nickname: 'Exam Cycle (3 months)', unit_amount: 11900, interval: 'month', interval_count: 3 },
    ],
  },
]

async function setup() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  PSYCHSTAR — Stripe Product Setup')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const priceIds = {}

  for (const productData of PRODUCTS) {
    console.log(`Creating product: ${productData.name}`)

    const product = await stripe.products.create({
      name: productData.name,
      description: productData.description,
      metadata: { ...productData.metadata, app: 'psychstar' },
    })

    console.log(`  → Product ID: ${product.id}`)

    for (const priceData of productData.prices) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceData.unit_amount,
        currency: 'gbp',
        recurring: {
          interval: priceData.interval,
          interval_count: priceData.interval_count,
        },
        nickname: priceData.nickname,
      })

      const key = `${productData.metadata.paper === 'bundle' ? 'bundle' : `paper_${productData.metadata.paper.toLowerCase()}`}_${priceData.interval_count === 1 ? 'monthly' : 'cycle'}`
      priceIds[key] = price.id

      console.log(`  → ${priceData.nickname}: £${(priceData.unit_amount / 100)}/mo × ${priceData.interval_count}  →  ${price.id}`)
    }
    console.log('')
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  ENV VARS — Add these to Vercel:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  for (const [key, id] of Object.entries(priceIds)) {
    const envKey = `STRIPE_PRICE_${key.toUpperCase()}`
    console.log(`${envKey}=${id}`)
  }

  console.log('\nAlso ensure these are set:')
  console.log('  STRIPE_SECRET_KEY=sk_live_...')
  console.log('  STRIPE_WEBHOOK_SECRET=whsec_... (after registering webhook)')
  console.log('  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...')

  console.log('\n✅ Done.\n')
}

setup().catch(err => {
  console.error('Setup failed:', err.message)
  process.exit(1)
})
