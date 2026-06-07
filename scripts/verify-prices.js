const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('/c/Users/stary/Desktop/mrcpsych-platform/.stripe_key', 'utf8').trim();
const auth = Buffer.from(key + ':').toString('base64');

function api(method, path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.stripe.com',
      path, method,
      headers: { 'Authorization': 'Basic ' + auth }
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  // Check the specific price IDs
  const testIds = [
    'price_1TdPP9GX3fKg1ApdOnd1k8c3',
    'price_1TdPPiGX3fKg1Apd3xK5EpNR', 
    'price_1TdPQ2GX3fKg1Apdhs5rGOFo',
    'price_1TdPQLGX3fKg1ApdBod603oe',
    'price_1TdPQrGX3fKg1ApdGthjvsMt',
    'price_1TdPRBGX3fKg1ApdH83UHsbb'
  ];
  
  for (const pid of testIds) {
    const result = await api('GET', '/v1/prices/' + pid);
    if (result.error) {
      console.log('❌ ' + pid + ' - ' + result.error.message);
    } else {
      console.log('✅ ' + pid + ' - £' + (result.unit_amount/100) + '/' + (result.recurring?.interval || 'one-time') + ' - product: ' + result.product);
    }
  }
  
  // List all prices in this account
  console.log('\n--- All prices in this account ---');
  const list = await api('GET', '/v1/prices?limit=20');
  for (const p of list.data || []) {
    console.log('  price: ' + p.id + ' | £' + (p.unit_amount/100) + '/' + (p.recurring?.interval_count || '1') + (p.recurring?.interval || '') + ' | product: ' + p.product + ' | active: ' + p.active);
  }
})();
