-- =========================
-- PHASE 3: WORKFORCE PLATFORM COMPLETE
-- =========================

-- Case Manager Portal
create table if not exists case_managers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  agency text not null,
  email text not null unique,
  created_at timestamptz default now()
);

create table if not exists case_manager_assignments (
  application_id uuid references applications(id) on delete cascade,
  case_manager_id uuid references case_managers(id) on delete cascade,
  primary key (application_id, case_manager_id)
);

-- Employer Sponsor Intake (WEX / OJT Ready)
create table if not exists employer_sponsors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  program_supported text not null,
  wage_commitment numeric,
  created_at timestamptz default now()
);

-- Link employer to student
alter table applications
add column if not exists employer_sponsor_id uuid references employer_sponsors(id);

-- Document Uploads
create table if not exists uploaded_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications(id) on delete cascade,
  file_type text not null,
  file_url text not null,
  uploaded_by text,
  created_at timestamptz default now()
);

-- Enrollment Agreements + E-Signature
create table if not exists enrollment_agreements (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications(id) on delete cascade,
  signed boolean default false,
  signed_at timestamptz,
  signature_name text,
  ip_address text,
  agreement_text text,
  created_at timestamptz default now()
);

-- SMS Reminders Log
create table if not exists sms_reminders (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications(id) on delete cascade,
  reminder_type text not null,
  sent_at timestamptz default now(),
  status text default 'sent'
);

-- Create indexes
create index if not exists idx_case_managers_email on case_managers(email);
create index if not exists idx_case_manager_assignments_app on case_manager_assignments(application_id);
create index if not exists idx_employer_sponsors_email on employer_sponsors(email);
create index if not exists idx_uploaded_documents_app on uploaded_documents(application_id);
create index if not exists idx_enrollment_agreements_app on enrollment_agreements(application_id);
create index if not exists idx_sms_reminders_app on sms_reminders(application_id);

-- Enable RLS
alter table case_managers enable row level security;
alter table case_manager_assignments enable row level security;
alter table employer_sponsors enable row level security;
alter table uploaded_documents enable row level security;
alter table enrollment_agreements enable row level security;
alter table sms_reminders enable row level security;

-- RLS Policies for Case Managers
drop policy if exists "case managers can view their profile" on case_managers;
create policy "case managers can view their profile"
on case_managers
for select
using (email = auth.jwt()->>'email');

drop policy if exists "case managers can view assigned students" on case_manager_assignments;
create policy "case managers can view assigned students"
on case_manager_assignments
for select
using (
  exists (
    select 1 from case_managers
    where case_managers.id = case_manager_assignments.case_manager_id
    and case_managers.email = auth.jwt()->>'email'
  )
);

-- RLS Policies for Admins
drop policy if exists "admins can manage case managers" on case_managers;
create policy "admins can manage case managers"
on case_managers
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

drop policy if exists "admins can manage assignments" on case_manager_assignments;
create policy "admins can manage assignments"
on case_manager_assignments
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

drop policy if exists "admins can manage employers" on employer_sponsors;
create policy "admins can manage employers"
on employer_sponsors
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

drop policy if exists "admins can manage documents" on uploaded_documents;
create policy "admins can manage documents"
on uploaded_documents
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

drop policy if exists "admins can manage agreements" on enrollment_agreements;
create policy "admins can manage agreements"
on enrollment_agreements
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'super_admin', 'org_admin', 'staff')
  )
);

-- Function to auto-update application status
create or replace function update_application_status()
returns trigger as $$
begin
  -- Update status based on checklist progress
  if new.funding_verified = true then
    update applications
    set status = 'funding_verified'
    where id = new.application_id;
  elsif new.attended_workone_appointment = true then
    update applications
    set status = 'workone_attended'
    where id = new.application_id;
  elsif new.scheduled_workone_appointment = true then
    update applications
    set status = 'workone_scheduled'
    where id = new.application_id;
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Trigger for auto status updates
drop trigger if exists trigger_update_application_status on application_checklist;
create trigger trigger_update_application_status
after update on application_checklist
for each row
execute function update_application_status();

-- Function to update status when agreement signed
create or replace function update_status_on_enrollment()
returns trigger as $$
begin
  if new.signed = true then
    update applications
    set status = 'enrolled'
    where id = new.application_id;
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Trigger for enrollment status
drop trigger if exists trigger_update_status_on_enrollment on enrollment_agreements;
create trigger trigger_update_status_on_enrollment
after update on enrollment_agreements
for each row
execute function update_status_on_enrollment();

-- Comments
comment on table case_managers is 'Case managers from probation, WorkOne, housing agencies';
comment on table case_manager_assignments is 'Links case managers to their assigned students';
comment on table employer_sponsors is 'Employers providing WEX, OJT, or apprenticeship sponsorship';
comment on table uploaded_documents is 'Student and partner document uploads (ID, ICC proof, etc)';
comment on table enrollment_agreements is 'E-signature enrollment contracts with timestamp and IP';
comment on table sms_reminders is 'Log of SMS reminders sent to students';
