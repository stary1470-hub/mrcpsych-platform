#!/usr/bin/env node
/**
 * Setup Stripe webhook for PsychStar
 * Usage: node scripts/setup-stripe-webhook.js
 * Requires: STRIPE_SECRET_KEY env var
 */
const https = require('https');
const key = process.env.STRIPE_SECRET_KEY;
if (!key) { console.error('Missing STRIPE_SECRET_KEY'); process.exit(1); }

const postData = 'url=https://psychstar.io/api/stripe/webhook' +
  '&enabled_events[]=checkout.session.completed' +
  '&enabled_events[]=invoice.payment_succeeded' +
  '&enabled_events[]=customer.subscription.updated' +
  '&enabled_events[]=customer.subscription.deleted' +
  '&description=PsychStar+payment+webhook';

const auth = Buffer.from(key + ':').toString('base64');

const req = https.request({
  hostname: 'api.stripe.com',
  path: '/v1/webhook_endpoints',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const j = JSON.parse(data);
    if (j.error) {
      console.error('Error:', j.error.message);
      process.exit(1);
    }
    console.log('✓ Webhook created');
    console.log('ID:', j.id);
    console.log('Secret:', j.secret);
    console.log('Live:', j.livemode);
  });
});
req.on('error', (e) => { console.error('Failed:', e.message); process.exit(1); });
req.write(postData);
req.end();
