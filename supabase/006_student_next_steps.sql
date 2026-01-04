-- ============================================
-- EFH NEXT STEPS CHECKLIST (STUDENT PROGRESS)
-- ============================================

create table if not exists public.student_next_steps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  program_id uuid references public.programs(id) on delete set null,

  -- Step 1: Inquiry submitted
  inquiry_submitted boolean not null default false,
  inquiry_submitted_at timestamptz,

  -- Step 2: Indiana Career Connect account
  icc_account_created boolean not null default false,
  icc_username text,

  -- Step 3: WorkOne appointment scheduled
  workone_appointment_scheduled boolean not null default false,
  workone_appointment_date date,
  workone_appointment_time text,
  workone_location text,

  -- Step 4: Told advisor "I'm here for Elevate for Humanity"
  told_advisor_efh boolean not null default false,

  -- Step 5: Documents requested by advisor (optional upload)
  advisor_docs_uploaded boolean not null default false,
  advisor_docs_note text,

  -- Step 6: Funding determination
  funding_status text not null default 'pending',
  funding_type text,

  -- Step 7: EFH onboarding call completed
  efh_onboarding_call_completed boolean not null default false,
  efh_onboarding_call_date date,

  -- Step 8: Program start date confirmed
  program_start_confirmed boolean not null default false,
  program_start_date date,

  -- Internal notes
  staff_notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint student_next_steps_one_per_user unique(user_id),
  constraint funding_status_valid check (funding_status in ('pending','approved','denied')),
  constraint funding_type_valid check (
    funding_type is null or funding_type in ('WIOA','WRG','JRI','Apprenticeship','Other')
  )
);

create index if not exists idx_student_next_steps_org on public.student_next_steps(organization_id);
create index if not exists idx_student_next_steps_program on public.student_next_steps(program_id);
create index if not exists idx_student_next_steps_user on public.student_next_steps(user_id);

-- Updated_at trigger (reuses your existing update_updated_at_column() if present)
do $$
begin
  if exists (
    select 1 from pg_proc where proname = 'update_updated_at_column'
  ) then
    drop trigger if exists update_student_next_steps_updated_at on public.student_next_steps;
    create trigger update_student_next_steps_updated_at
    before update on public.student_next_steps
    for each row execute function update_updated_at_column();
  end if;
end $$;

alter table public.student_next_steps enable row level security;

-- Students can view/update their own checklist
drop policy if exists "student_can_read_own_next_steps" on public.student_next_steps;
create policy "student_can_read_own_next_steps"
on public.student_next_steps
for select
using (auth.uid() = user_id);

drop policy if exists "student_can_update_own_next_steps" on public.student_next_steps;
create policy "student_can_update_own_next_steps"
on public.student_next_steps
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Students can insert their own row (first time)
drop policy if exists "student_can_insertreate_own_next_steps" on public.student_next_steps;
drop policy if exists "student_can_create_own_next_steps" on public.student_next_steps;
create policy "student_can_create_own_next_steps"
on public.student_next_steps
for insert
with check (auth.uid() = user_id);

-- Org admins/staff can read/update for their org (if organization_users exists)
drop policy if exists "org_staff_can_manage_next_steps" on public.student_next_steps;
create policy "org_staff_can_manage_next_steps"
on public.student_next_steps
for all
using (
  exists (
    select 1 from public.organization_users ou
    where ou.user_id = auth.uid()
      and ou.organization_id = student_next_steps.organization_id
      and ou.role in ('org_admin','super_admin','staff','instructor')
  )
)
with check (
  exists (
    select 1 from public.organization_users ou
    where ou.user_id = auth.uid()
      and ou.organization_id = student_next_steps.organization_id
      and ou.role in ('org_admin','super_admin','staff','instructor')
  )
);

comment on table public.student_next_steps is 'EFH student progress checklist for WorkOne appointment + funding + onboarding';
