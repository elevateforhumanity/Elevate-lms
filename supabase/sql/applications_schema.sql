-- Elevate for Humanity: Applications table
-- Run this in the Supabase SQL editor ONE TIME.

create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,

  program_id text not null,
  preferred_start text,
  heard_about_us text,

  youth boolean default false,
  reentry boolean default false,

  interested_in_jri boolean default true,
  interested_in_wex boolean default false,
  interested_in_ojt boolean default false,

  needs_support jsonb default '[]'::jsonb,

  status text not null default 'submitted'
);

-- Simple RLS example (adjust later)
alter table public.applications enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'applications' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.applications
      for select using (true)
      with check (true);
  end if;
end
$$;
