-- =========================
-- FIX APPLICATIONS TABLE
-- =========================

-- Drop existing table if it has wrong schema
drop table if exists application_checklist cascade;
drop table if exists applications cascade;

-- Create applications table with correct schema
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  city text not null,
  zip text not null,
  program_interest text not null,
  has_case_manager boolean not null,
  case_manager_agency text,
  support_notes text,
  contact_preference text not null,
  advisor_email text,
  status text default 'submitted',
  created_at timestamptz default now()
);

-- Create WorkOne / Funding Progress Checklist
create table if not exists application_checklist (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications(id) on delete cascade,
  created_icc_account boolean default false,
  scheduled_workone_appointment boolean default false,
  workone_appointment_date date,
  workone_location text,
  attended_workone_appointment boolean default false,
  funding_verified boolean default false,
  advisor_assigned boolean default false,
  enrollment_started boolean default false,
  enrollment_completed boolean default false,
  last_updated timestamptz default now()
);

-- Create indexes
create index if not exists idx_applications_email on applications(email);
create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_created_at on applications(created_at desc);
create index if not exists idx_application_checklist_app_id on application_checklist(application_id);

-- Enable RLS
alter table applications enable row level security;
alter table application_checklist enable row level security;

-- RLS Policies - Allow anonymous submissions
drop policy if exists "allow anon inserts" on applications;
create policy "allow anon inserts"
on applications
for insert
with check (true);

drop policy if exists "allow anon checklist insert" on application_checklist;
create policy "allow anon checklist insert"
on application_checklist
for insert
with check (true);

-- Allow admins to view all applications
drop policy if exists "admins can view applications" on applications;
create policy "admins can view applications"
on applications
for select
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

-- Allow admins to update applications
drop policy if exists "admins can update applications" on applications;
create policy "admins can update applications"
on applications
for update
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

-- Allow admins to view checklists
drop policy if exists "admins can view checklists" on application_checklist;
create policy "admins can view checklists"
on application_checklist
for select
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

-- Allow admins to update checklists
drop policy if exists "admins can update checklists" on application_checklist;
create policy "admins can update checklists"
on application_checklist
for update
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

comment on table applications is 'Student applications with WIOA/WRG/JRI/Apprenticeship intake data';
comment on table application_checklist is 'WorkOne appointment and funding progress tracking';
