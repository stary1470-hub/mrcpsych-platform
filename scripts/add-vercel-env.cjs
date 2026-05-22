const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const eq = line.indexOf('=');
  if (eq === -1) return;
  const key = line.slice(0, eq).trim();
  let value = line.slice(eq + 1).trim();
  if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
  envVars[key] = value;
});

// Only add the Stripe-related vars
const stripeVars = [
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_PAPER_A_MONTHLY',
  'STRIPE_PRICE_PAPER_A_CYCLE',
  'STRIPE_PRICE_PAPER_B_MONTHLY',
  'STRIPE_PRICE_PAPER_B_CYCLE',
  'STRIPE_PRICE_BUNDLE_MONTHLY',
  'STRIPE_PRICE_BUNDLE_CYCLE',
];

function addEnv(name, value, env, sensitive) {
  const cmd = `npx vercel env add "${name}" "${env}"${sensitive ? '' : ' --no-sensitive'} --value "${value}" --yes`;
  try {
    const result = execSync(cmd, { cwd: __dirname + '/..', timeout: 30000, stdio: ['pipe', 'pipe', 'pipe'] });
    console.log(`  ✓ ${name} (${env})`);
    return true;
  } catch (e) {
    console.error(`  ✗ ${name} (${env}): ${e.stderr?.toString().trim() || e.message}`);
    return false;
  }
}

// Add all to production first
console.log('📦 Adding to Production...');
stripeVars.forEach(key => {
  const sensitive = !key.startsWith('NEXT_PUBLIC_');
  addEnv(key, envVars[key], 'production', sensitive);
});

// Then development (no git branch prompt)
console.log('\n📦 Adding to Development...');
stripeVars.forEach(key => {
  const sensitive = !key.startsWith('NEXT_PUBLIC_');
  addEnv(key, envVars[key], 'development', sensitive);
});

console.log('\nDone! Check Vercel dashboard for Preview env vars.');
