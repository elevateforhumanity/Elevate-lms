-- Elevate for Humanity: Student course access table
-- Run this in the Supabase SQL editor AFTER you've created applications + enrollments.

create extension if not exists "pgcrypto";

create table if not exists public.student_courses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  program_id text not null,
  course_slug text not null,

  enrollment_id uuid,
  source text default 'stripe-webhook',

  unique (email, program_id, course_slug)
);

alter table public.student_courses enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'student_courses' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.student_courses
      for select using (true)
      with check (true);
  end if;
end
$$;
