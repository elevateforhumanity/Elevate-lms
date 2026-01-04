-- Elevate for Humanity: Enrollments table + payment_status on applications
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

-- 1) Add payment_status to applications (if not exists)
alter table if exists public.applications
  add column if not exists payment_status text not null default 'pending';

-- 2) Enrollments table
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  application_id uuid,
  program_id text not null,
  email text not null,

  stripe_checkout_session_id text,
  stripe_payment_link_id text,
  stripe_customer_id text,

  status text not null default 'active', -- active, cancelled, completed, etc.
  source text default 'stripe-payment-link'
);

alter table public.enrollments enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'enrollments' and policyname = 'Allow all for now'
  ) then
    create policy "Allow all for now"
      on public.enrollments
      for select using (true)
      with check (true);
  end if;
end
$$;
