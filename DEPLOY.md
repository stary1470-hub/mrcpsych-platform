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
3. **Payments**: Add Stripe for subscription plans
4. **Email**: Set up Resend for transactional emails
5. **Paper B**: Expand question domains
6. **CASC**: Text-based branching scenarios
