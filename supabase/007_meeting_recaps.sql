-- =========================
-- MEETING RECAPS
-- =========================
create table if not exists public.meeting_recaps (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  created_by uuid references auth.users(id),
  attendee_email text,
  title text not null,
  meeting_date timestamptz,
  source text default 'manual', -- manual | zoom | teams | meet | upload
  transcript text,
  summary text,
  key_points jsonb default '[]'::jsonb,
  decisions jsonb default '[]'::jsonb,
  follow_up_email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_meeting_recaps_org on public.meeting_recaps(organization_id);
create index if not exists idx_meeting_recaps_created_at on public.meeting_recaps(created_at);

-- =========================
-- ACTION ITEMS (CHECKLIST)
-- =========================
create table if not exists public.meeting_action_items (
  id uuid primary key default gen_random_uuid(),
  recap_id uuid not null references public.meeting_recaps(id) on delete cascade,
  label text not null,
  due_date date,
  completed_at timestamptz,
  completed_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create index if not exists idx_action_items_recap on public.meeting_action_items(recap_id);

-- =========================
-- WORKONE / INDIANA CAREER CONNECT CHECKLIST
-- =========================
create table if not exists public.workone_checklist (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  step_key text not null,
  step_label text not null,
  status text not null default 'todo', -- todo | in_progress | done
  notes text,
  due_date date,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (user_id, step_key)
);

create index if not exists idx_workone_checklist_user on public.workone_checklist(user_id);

-- RLS Policies for meeting_recaps
alter table public.meeting_recaps enable row level security;

drop policy if exists "Users can view recaps in their org" on public.meeting_recaps;
create policy "Users can view recaps in their org"
on public.meeting_recaps for select
using (
  exists (
    select 1 from public.organization_users ou
    where ou.organization_id = meeting_recaps.organization_id
      and ou.user_id = auth.uid()
  )
);

drop policy if exists "Users can create recaps in their org" on public.meeting_recaps;
create policy "Users can create recaps in their org"
on public.meeting_recaps for insert
with check (
  exists (
    select 1 from public.organization_users ou
    where ou.organization_id = meeting_recaps.organization_id
      and ou.user_id = auth.uid()
  )
);

-- RLS Policies for meeting_action_items
alter table public.meeting_action_items enable row level security;

drop policy if exists "Users can view action items in their org" on public.meeting_action_items;
create policy "Users can view action items in their org"
on public.meeting_action_items for select
using (
  exists (
    select 1 from public.meeting_recaps mr
    join public.organization_users ou on ou.organization_id = mr.organization_id
    where mr.id = meeting_action_items.recap_id
      and ou.user_id = auth.uid()
  )
);

drop policy if exists "Users can update action items in their org" on public.meeting_action_items;
create policy "Users can update action items in their org"
on public.meeting_action_items for update
using (
  exists (
    select 1 from public.meeting_recaps mr
    join public.organization_users ou on ou.organization_id = mr.organization_id
    where mr.id = meeting_action_items.recap_id
      and ou.user_id = auth.uid()
  )
);

-- RLS Policies for workone_checklist
alter table public.workone_checklist enable row level security;

drop policy if exists "Users can view their own checklist" on public.workone_checklist;
create policy "Users can view their own checklist"
on public.workone_checklist for select
using (auth.uid() = user_id);

drop policy if exists "Users can update their own checklist" on public.workone_checklist;
create policy "Users can update their own checklist"
on public.workone_checklist for all
using (auth.uid() = user_id);

drop policy if exists "Org admins can manage checklists" on public.workone_checklist;
create policy "Org admins can manage checklists"
on public.workone_checklist for all
using (
  exists (
    select 1 from public.organization_users ou
    where ou.organization_id = workone_checklist.organization_id
      and ou.user_id = auth.uid()
      and ou.role in ('org_admin', 'super_admin', 'staff')
  )
);

comment on table public.meeting_recaps is 'AI-generated meeting recaps with summary, key points, decisions, and action items';
comment on table public.meeting_action_items is 'Action items extracted from meeting recaps with completion tracking';
comment on table public.workone_checklist is 'WorkOne/ICC appointment progress tracking for students';
