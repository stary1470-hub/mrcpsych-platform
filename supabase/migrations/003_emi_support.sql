-- ============================================================
-- MRCPsych Platform — EMI (Extended Matching Item) Support
-- Adds native EMI data model alongside existing SBA questions
-- ============================================================

-- 0. EXTENSIONS (idempotent)
create extension if not exists "uuid-ossp";

-- 1. ADD FORMAT COLUMN TO QUESTIONS
alter table questions add column if not exists format text not null default 'sba' check (format in ('sba', 'emi'));
alter table questions add column if not exists option_labels text[] default null;

-- Existing SBA questions remain unchanged (format = 'sba')
-- EMI questions will have format = 'emi' + option_labels for A–J legend

-- 2. EMI QUESTION ITEMS TABLE
-- Each EMI question has 3–6 items (sub-questions) that share the same option list
create table if not exists question_items (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid not null references questions(id) on delete cascade,
  item_number integer not null check (item_number >= 1),
  item_text text not null,
  correct_indices integer[] not null,  -- array of option indices — supports multi-correct
  marks integer not null default 1 check (marks >= 1),
  item_rationale text default null,
  created_at timestamp with time zone not null default now(),
  unique(question_id, item_number)
);

create index if not exists idx_question_items_question on question_items(question_id);

alter table question_items enable row level security;

-- Users can read items for active questions
create policy "Users can read question items"
  on question_items for select
  to authenticated
  using (
    exists (
      select 1 from questions q
      where q.id = question_items.question_id
      and (q.is_active = true or auth.uid() in (select user_id from admins))
    )
  );

-- Admins can insert/update/delete items
create policy "Admins can insert question items"
  on question_items for insert
  to authenticated
  with check (auth.uid() in (select user_id from admins));

create policy "Admins can update question items"
  on question_items for update
  to authenticated
  using (auth.uid() in (select user_id from admins))
  with check (auth.uid() in (select user_id from admins));

create policy "Admins can delete question items"
  on question_items for delete
  to authenticated
  using (auth.uid() in (select user_id from admins));

-- 3. ITEM PROGRESS TABLE (per-item answers for EMI questions)
-- Tracks each item answered within an EMI question
create table if not exists item_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_item_id uuid not null references question_items(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  selected_indices integer[] not null,  -- array of selected option indices
  correct boolean not null,
  time_taken_seconds integer default null,
  answered_at timestamp with time zone not null default now(),
  unique(user_id, question_item_id)
);

create index if not exists idx_item_progress_user on item_progress(user_id);
create index if not exists idx_item_progress_item on item_progress(question_item_id);
create index if not exists idx_item_progress_question on item_progress(question_id);

alter table item_progress enable row level security;

-- Users can only see their own item progress
create policy "Users can read own item progress"
  on item_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own item progress"
  on item_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Admins can view all item progress (for analytics)
create policy "Admins can read all item progress"
  on item_progress for select
  to authenticated
  using (
    auth.uid() = user_id or
    auth.uid() in (select user_id from admins)
  );

-- 4. UPDATE DOMAIN STATS FUNCTION — include EMI item answers
create or replace function get_user_domain_stats(p_user_id uuid)
returns table (
  domain text,
  total_attempted bigint,
  total_correct bigint,
  percentage numeric
)
language sql
security definer
as $$
  -- SBA questions from user_progress
  select
    q.domain,
    count(*)::bigint as total_attempted,
    sum(case when up.correct then 1 else 0 end)::bigint as total_correct,
    round(
      sum(case when up.correct then 1 else 0 end)::numeric /
      nullif(count(*), 0) * 100,
      1
    ) as percentage
  from user_progress up
  join questions q on q.id = up.question_id
  where up.user_id = p_user_id
  group by q.domain

  union all

  -- EMI items from item_progress
  select
    q.domain,
    count(*)::bigint as total_attempted,
    sum(case when ip.correct then 1 else 0 end)::bigint as total_correct,
    round(
      sum(case when ip.correct then 1 else 0 end)::numeric /
      nullif(count(*), 0) * 100,
      1
    ) as percentage
  from item_progress ip
  join questions q on q.id = ip.question_id
  where ip.user_id = p_user_id
  group by q.domain

  order by percentage asc;
$$;

-- 5. HELPER: Get aggregated stats for a single question (SBA + EMI combined)
create or replace function get_question_stats(p_question_id uuid)
returns table (
  total_attempts bigint,
  total_correct bigint
)
language sql
security definer
as $$
  select
    count(*)::bigint as total_attempts,
    sum(case when correct then 1 else 0 end)::bigint as total_correct
  from user_progress
  where question_id = p_question_id

  union all

  select
    count(*)::bigint as total_attempts,
    sum(case when correct then 1 else 0 end)::bigint as total_correct
  from item_progress
  where question_id = p_question_id;
$$;

-- 6. HELPER: Fetch EMI question with items (single query)
create or replace function get_emi_question(p_question_id uuid)
returns jsonb
language sql
security definer
as $$
  select jsonb_build_object(
    'question', row_to_json(q)::jsonb,
    'items', coalesce(
      (select jsonb_agg(
        jsonb_build_object(
          'id', qi.id,
          'item_number', qi.item_number,
          'item_text', qi.item_text,
          'correct_indices', qi.correct_indices,
          'marks', qi.marks,
          'item_rationale', qi.item_rationale
        )
        order by qi.item_number
      )
      from question_items qi
      where qi.question_id = q.id),
      '[]'::jsonb
    )
  )
  from questions q
  where q.id = p_question_id;
$$;
