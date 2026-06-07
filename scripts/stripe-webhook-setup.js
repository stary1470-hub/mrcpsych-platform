#!/usr/bin/env node
// Stripe setup - key read from env var
const https = require('https');
const key = process.env.STRIPE_SECRET_KEY;
if (!key || key.length < 20) {
  console.error('ERROR: STRIPE_SECRET_KEY not set or too short');
  process.exit(1);
}

const auth = Buffer.from(key + ':').toString('base64');

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.stripe.com',
      path, method,
      headers: { 'Authorization': 'Basic ' + auth, 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  // Delete existing psychstar webhooks
  const list = await api('GET', '/v1/webhook_endpoints?limit=10');
  for (const wh of list.data || []) {
    if (wh.url.includes('psychstar.io')) {
      await api('DELETE', '/v1/webhook_endpoints/' + wh.id);
      console.log('Deleted old webhook:', wh.id);
    }
  }

  // Create fresh webhook
  const body = 'url=https://psychstar.io/api/stripe/webhook' +
    '&enabled_events[]=checkout.session.completed' +
    '&enabled_events[]=invoice.payment_succeeded' +
    '&enabled_events[]=customer.subscription.updated' +
    '&enabled_events[]=customer.subscription.deleted' +
    '&description=PsychStar+payment+webhook';

  const wh = await api('POST', '/v1/webhook_endpoints', body);
  if (wh.error) { console.error('Stripe API Error:', wh.error.message); process.exit(1); }
  
  console.log('WEBHOOK_CREATED');
  console.log('ID=' + wh.id);
  console.log('SECRET=' + wh.secret);
  console.log('LIVE=' + wh.livemode);
  console.log('URL=' + wh.url);
})();
