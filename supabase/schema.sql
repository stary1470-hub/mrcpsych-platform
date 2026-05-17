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

-- 5. HELPER: Get domain stats for a user
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
  order by percentage asc
$$;

-- 6. SEED ADMIN (run after you create your first user)
-- Replace YOUR_USER_UUID with the actual user ID from auth.users
-- insert into admins (user_id) values ('YOUR_USER_UUID');
