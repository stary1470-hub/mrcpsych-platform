-- ============================================================
-- MRCPsych Platform — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ADMINS TABLE (who can manage questions)
create table if not exists admins (
  user_id uuid primary key references auth.users on delete cascade,
  created_at timestamp with time zone default now()
);

alter table admins enable row level security;

-- Only admins can read the admins table
create policy "Admins can read admin list"
  on admins for select
  to authenticated
  using (auth.uid() = user_id);

-- 3. QUESTIONS TABLE
create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  stem text not null,
  options jsonb not null,
  correct_index integer not null check (correct_index >= 0),
  distractors_rationale jsonb default null,
  teaching_point text default null,
  domain text not null,
  subdomain text default null,
  difficulty text default null check (difficulty in ('easy', 'medium', 'hard')),
  bloom_taxonomy text default null check (bloom_taxonomy in ('recall', 'application', 'analysis')),
  paper text not null check (paper in ('A', 'B')),
  tags text[] default null,
  source text default null,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- EMI support: format column
alter table questions add column if not exists format text not null default 'sba' check (format in ('sba', 'emi'));
alter table questions add column if not exists option_labels text[] default null;

-- EMI question items
create table if not exists question_items (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid not null references questions(id) on delete cascade,
  item_number integer not null check (item_number >= 1),
  item_text text not null,
  correct_indices integer[] not null,
  marks integer not null default 1 check (marks >= 1),
  item_rationale text default null,
  created_at timestamp with time zone not null default now(),
  unique(question_id, item_number)
);

create index if not exists idx_question_items_question on question_items(question_id);

-- EMI item progress
create table if not exists item_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_item_id uuid not null references question_items(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  selected_indices integer[] not null,
  correct boolean not null,
  time_taken_seconds integer default null,
  answered_at timestamp with time zone not null default now(),
  unique(user_id, question_item_id)
);

create index if not exists idx_item_progress_user on item_progress(user_id);
create index if not exists idx_item_progress_item on item_progress(question_item_id);
create index if not exists idx_item_progress_question on item_progress(question_id);

-- Indexes for performance
create index if not exists idx_questions_domain on questions(domain);
create index if not exists idx_questions_paper on questions(paper);
create index if not exists idx_questions_difficulty on questions(difficulty);
create index if not exists idx_questions_active on questions(is_active);

alter table questions enable row level security;

-- All authenticated users can read active questions
create policy "Users can read active questions"
  on questions for select
  to authenticated
  using (is_active = true);

-- Admins can read ALL questions (including inactive)
create policy "Admins can read all questions"
  on questions for select
  to authenticated
  using (
    is_active = true or
    auth.uid() in (select user_id from admins)
  );

-- Only admins can insert/update/delete
create policy "Admins can insert questions"
  on questions for insert
  to authenticated
  with check (auth.uid() in (select user_id from admins));

create policy "Admins can update questions"
  on questions for update
  to authenticated
  using (auth.uid() in (select user_id from admins))
  with check (auth.uid() in (select user_id from admins));

create policy "Admins can delete questions"
  on questions for delete
  to authenticated
  using (auth.uid() in (select user_id from admins));

-- 4. USER PROGRESS TABLE
create table if not exists user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  question_id uuid references questions not null,
  selected_index integer not null,
  correct boolean not null,
  time_taken_seconds integer default null,
  answered_at timestamp with time zone default now(),
  unique(user_id, question_id)
);

-- Index for fast per-user domain stats
create index if not exists idx_progress_user_id on user_progress(user_id);
create index if not exists idx_progress_question on user_progress(question_id);

alter table user_progress enable row level security;

-- Users can only see their own progress
create policy "Users can read own progress"
  on user_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Admins can view all progress (for analytics)
create policy "Admins can read all progress"
  on user_progress for select
  to authenticated
  using (
    auth.uid() = user_id or
    auth.uid() in (select user_id from admins)
  );

-- 5b. QUESTION ITEMS RLS
alter table question_items enable row level security;

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

-- 5c. ITEM PROGRESS RLS
alter table item_progress enable row level security;

create policy "Users can read own item progress"
  on item_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own item progress"
  on item_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Admins can read all item progress"
  on item_progress for select
  to authenticated
  using (
    auth.uid() = user_id or
    auth.uid() in (select user_id from admins)
  );

-- 6. HELPER: Get domain stats for a user (SBA + EMI)
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

-- 6. SEED ADMIN (run after you create your first user)
-- Replace YOUR_USER_UUID with the actual user ID from auth.users
-- insert into admins (user_id) values ('YOUR_USER_UUID');
