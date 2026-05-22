-- ============================================================
-- PsychStar — Stripe Subscriptions Schema
-- ============================================================

-- 1. SUBSCRIPTIONS TABLE (tracks Stripe subscription data)
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  plan text not null check (plan in ('paper_a', 'paper_b', 'bundle')),
  billing_period text not null check (billing_period in ('monthly', 'cycle')),
  status text not null default 'incomplete' check (status in ('incomplete', 'active', 'past_due', 'canceled', 'unpaid', 'trialing', 'incomplete_expired', 'paused')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for fast lookups
create index if not exists idx_subscriptions_user on subscriptions(user_id);
create index if not exists idx_subscriptions_stripe on subscriptions(stripe_subscription_id);
create unique index if not exists idx_subscriptions_stripe_sub on subscriptions(stripe_subscription_id) where stripe_subscription_id is not null;

-- Enable RLS
alter table subscriptions enable row level security;

-- Users can read their own subscriptions
create policy "Users can read own subscriptions"
  on subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- Only the server (via service_role) can insert/update/delete
create policy "Service role can manage subscriptions"
  on subscriptions for all
  to service_role
  using (true)
  with check (true);

-- 2. HELPER FUNCTION: Check if user has active subscription
create or replace function has_active_subscription(p_user_id uuid)
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from subscriptions
    where user_id = p_user_id
    and status = 'active'
    and current_period_end > now()
  );
$$;

-- 3. HELPER FUNCTION: Get user's plan access
create or replace function get_user_plan(p_user_id uuid)
returns table (
  plan text,
  billing_period text,
  status text,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean
)
language sql
security definer
as $$
  select plan, billing_period, status, current_period_end, cancel_at_period_end
  from subscriptions
  where user_id = p_user_id
  and status = 'active'
  and current_period_end > now()
  order by current_period_end desc
  limit 1;
$$;
