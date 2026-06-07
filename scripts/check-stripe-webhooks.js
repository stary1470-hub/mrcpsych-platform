#!/usr/bin/env node
/**
 * List and optionally delete Stripe webhooks
 * Usage: node scripts/check-stripe-webhooks.js [delete-all]
 */
const https = require('https');
const key = process.env.STRIPE_SECRET_KEY;
if (!key) { console.error('Missing STRIPE_SECRET_KEY'); process.exit(1); }

const auth = Buffer.from(key + ':').toString('base64');

function apiRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.stripe.com',
      path,
      method,
      headers: { 'Authorization': 'Basic ' + auth }
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const list = await apiRequest('/v1/webhook_endpoints?limit=10');
  console.log('Found', list.data?.length || 0, 'webhook(s):');
  for (const wh of list.data || []) {
    console.log('  ID:', wh.id, '| URL:', wh.url, '| Live:', wh.livemode, '| Status:', wh.status);
    if (process.argv[2] === 'delete-all') {
      await apiRequest('/v1/webhook_endpoints/' + wh.id, 'DELETE');
      console.log('  → Deleted');
    }
  }
})();
