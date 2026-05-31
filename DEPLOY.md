# MRCPsych Pro — Deployment Guide

## Prerequisites
- [Supabase](https://supabase.com) account (free tier is sufficient for MVP)
- [Vercel](https://vercel.com) account (free Hobby tier)
- [GitHub](https://github.com) account

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from **Project Settings → API**
3. Go to **SQL Editor** and run the entire contents of `supabase/schema.sql`
4. Go to **Authentication → Settings** and under "Redirect URLs", add:
   - `http://localhost:3000/auth/callback` (for local dev)
   - `https://your-app.vercel.app/auth/callback` (for production)

## Step 2: Configure Environment

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Your service_role key (Settings → API → service_role)

## Step 3: Run Locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see the landing page.

## Step 4: Make Yourself Admin

1. Sign up at http://localhost:3000/signup with your email
2. Check your email and confirm your account (Supabase sends a confirmation)
3. Go to **Supabase → SQL Editor** and run:

```sql
-- Replace YOUR_EMAIL with the email you signed up with
insert into admins (user_id)
select id from auth.users where email = 'YOUR_EMAIL';
```

Or find your user UUID from **Supabase → Authentication → Users** and run:

```sql
insert into admins (user_id) values ('your-uuid-here');
```

4. Refresh the app — the "Admin" link should now appear in the navigation bar

## Step 5: Add Questions

You have three options:

**A. Import the 3 sample questions:**
- Go to Admin → Import
- Upload the JSON file at `/public/template-questions.json`

**B. Create questions one by one:**
- Admin → + New Question
- Fill in stem, options, teaching point, domain, etc.

**C. Use the LLM pipeline (once built):**
- Your generator script will output JSON arrays that match the template format
- Import the output via Admin → Import

## Step 6: Deploy to Vercel

1. Push your code to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial MRCPsych Pro platform"
git remote add origin https://github.com/YOUR_USERNAME/mrcpsych-pro.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**
3. Import your GitHub repository
4. Add the three environment variables (same as `.env.local`)
5. Click **Deploy**

Your app will be live at `https://mrcpsych-pro.vercel.app` in ~2 minutes.

## Step 7: Update Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase Auth redirects:
- `https://your-app.vercel.app/auth/callback`

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Landing page / login
│   ├── middleware.ts        # Auth protection
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── auth/callback/      # Auth callback handler
│   ├── dashboard/          # Performance dashboard
│   ├── quiz/               # Practice: domain selection + questions
│   ├── review/             # Review past answers
│   ├── admin/              # Admin panel (questions CRUD, import)
│   └── api/                # API routes (quiz, progress, stats, questions)
├── components/
│   └── Navbar.tsx          # Navigation bar
├── lib/
│   ├── utils.ts            # Helpers (domain names, colors, formatting)
│   └── supabase/           # Client, server, admin Supabase clients
├── types/
│   └── index.ts            # TypeScript types + domain constants
supabase/
│   └── schema.sql          # Database schema (run in Supabase SQL Editor)
public/
│   └── template-questions.json  # 3 sample questions to seed the bank
```

## Next Steps After MVP

1. **Content pipeline**: Build the Generator → Reviewer → Validator LLM agent workflow
2. **Adaptive engine**: Replace the simple sequential quiz with Bayesian proficiency estimation
3. **Email**: Set up Resend for transactional emails
4. **Paper B**: Expand question domains
5. **CASC**: Text-based branching scenarios

---

# APPENDIX: Stripe Payments Go-Live

## Step 1 — Create Stripe Account & Products

1. Sign up at [stripe.com](https://stripe.com) (or log in)
2. Enable **Stripe in "live mode"** (top-left toggle in Dashboard)
3. Run the setup script to create all 6 products and prices:

```bash
# Install Stripe CLI (one-time)
npm install -g stripe

# Set your live secret key
export STRIPE_SECRET_KEY=sk_live_...

# Create products and prices
node scripts/setup-stripe-products.js
```

The script will output 6 price IDs like `STRIPE_PRICE_PAPER_A_MONTHLY=price_xxx`.

Alternatively, create them manually in the Stripe Dashboard:
- Products → Add Product (×3: Paper A, Paper B, Both Papers Bundle)
- For each product, add two prices: Monthly (£29/£29/£49) and Cycle (£79/£79/£119)

## Step 2 — Set Vercel Environment Variables

Go to **Vercel Dashboard → Project → Settings → Environment Variables** and add:

| Variable | Source |
|----------|--------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys (live) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys (live publishable) |
| `STRIPE_PRICE_PAPER_A_MONTHLY` | Output from setup script |
| `STRIPE_PRICE_PAPER_A_CYCLE` | Output from setup script |
| `STRIPE_PRICE_PAPER_B_MONTHLY` | Output from setup script |
| `STRIPE_PRICE_PAPER_B_CYCLE` | Output from setup script |
| `STRIPE_PRICE_BUNDLE_MONTHLY` | Output from setup script |
| `STRIPE_PRICE_BUNDLE_CYCLE` | Output from setup script |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → `service_role` key |

## Step 3 — Apply Supabase Migration

Run in **Supabase Dashboard → SQL Editor**:

```sql
-- Full contents of supabase/migrations/002_subscriptions.sql
```

This creates the `subscriptions` table with RLS policies and helper functions.

## Step 4 — Register Webhook in Stripe

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://psychstar.io/api/stripe/webhook`
3. Listen to events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**
5. Reveal and copy the **Signing secret** (`whsec_...`)
6. Add it to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

## Step 5 — Test the Flow

1. Visit `https://psychstar.io/pricing`
2. Click "Get Both Papers" → should redirect to Stripe Checkout
3. Use Stripe test card `4242 4242 4242 4242` with any future date and CVC
4. After payment → redirected to `/dashboard` with subscription active
5. Verify webhook by checking Stripe Dashboard → Developers → Webhooks → Recent events

## Architecture Overview

```
User clicks "Subscribe"
        │
        ▼
Pricing page → POST /api/stripe/checkout
        │
        ▼
Stripe Checkout (hosted page)
        │
        ├── Success → Redirect to /dashboard?session_id=...
        │               Dashboard calls /api/stripe/status → shows plan info
        │
        └── Webhook → /api/stripe/webhook (server-side, no user involved)
                        │
                        ├── checkout.session.completed → upsert subscription row
                        ├── invoice.payment_succeeded → update period dates
                        ├── customer.subscription.updated → sync status changes
                        └── customer.subscription.deleted → mark canceled
```
