-- =============================================
-- MESSAGES AND ASSIGNMENTS TABLES
-- Migration: 001
-- Created: 2025-11-13
-- =============================================

-- =============================================
-- MESSAGES TABLE
-- =============================================

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  body text not null,
  read boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_messages_recipient on public.messages(recipient_id, created_at desc);
create index if not exists idx_messages_sender on public.messages(sender_id, created_at desc);
create index if not exists idx_messages_unread on public.messages(recipient_id, read) where read = false;

-- Enable RLS
alter table public.messages enable row level security;

-- Policies: Users can read their own messages
create policy "Users can read messages they sent"
  on public.messages
  for select
  using (auth.uid() = sender_id);

create policy "Users can read messages sent to them"
  on public.messages
  for select
  using (auth.uid() = recipient_id);

-- Policies: Users can send messages
create policy "Users can send messages"
  on public.messages
  for insert
  with check (auth.uid() = sender_id);

-- Policies: Users can update their received messages (mark as read)
create policy "Users can update received messages"
  on public.messages
  for update
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- =============================================
-- ASSIGNMENTS TABLE
-- =============================================

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  instructions text,
  due_date timestamptz,
  points_possible integer default 100,
  submission_type text check (submission_type in ('text', 'file', 'url', 'none')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists idx_assignments_course on public.assignments(course_id);
create index if not exists idx_assignments_due_date on public.assignments(due_date);

-- Enable RLS
alter table public.assignments enable row level security;

-- Policies: Public read for enrolled students
create policy "Enrolled students can view assignments"
  on public.assignments
  for select
  using (
    exists (
      select 1 from public.enrollments
      where enrollments.course_id = assignments.course_id
      and enrollments.user_id = auth.uid()
    )
  );

-- Policies: Admins and instructors can manage assignments
create policy "Admins can manage assignments"
  on public.assignments
  for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'instructor')
    )
  );

-- =============================================
-- ASSIGNMENT SUBMISSIONS TABLE
-- =============================================

create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  submission_text text,
  submission_url text,
  file_path text,
  submitted_at timestamptz default now(),
  graded_at timestamptz,
  score integer,
  feedback text,
  status text default 'submitted' check (status in ('draft', 'submitted', 'graded', 'returned')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(assignment_id, student_id)
);

-- Indexes
create index if not exists idx_submissions_assignment on public.assignment_submissions(assignment_id);
create index if not exists idx_submissions_student on public.assignment_submissions(student_id);
create index if not exists idx_submissions_status on public.assignment_submissions(status);

-- Enable RLS
alter table public.assignment_submissions enable row level security;

-- Policies: Students can view and manage their own submissions
create policy "Students can view own submissions"
  on public.assignment_submissions
  for select
  using (auth.uid() = student_id);

create policy "Students can create own submissions"
  on public.assignment_submissions
  for insert
  with check (auth.uid() = student_id);

create policy "Students can update own submissions"
  on public.assignment_submissions
  for update
  using (auth.uid() = student_id and status in ('draft', 'submitted'))
  with check (auth.uid() = student_id);

-- Policies: Instructors and admins can view and grade all submissions
create policy "Instructors can view all submissions"
  on public.assignment_submissions
  for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'instructor')
    )
  );

create policy "Instructors can grade submissions"
  on public.assignment_submissions
  for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'instructor')
    )
  );

-- =============================================
-- SEED SAMPLE DATA (Optional)
-- =============================================

-- Sample messages (commented out - uncomment to seed)
/*
insert into public.messages (sender_id, recipient_id, subject, body) values
  (
    (select id from auth.users where email = 'admin@elevateforhumanity.org' limit 1),
    (select id from auth.users where email = 'student@example.com' limit 1),
    'Welcome to Elevate for Humanity',
    'Welcome to your training program! We''re excited to have you here.'
  );
*/

-- Sample assignments (commented out - uncomment to seed)
/*
insert into public.assignments (course_id, title, description, due_date, points_possible, submission_type)
select 
  c.id,
  'Module 1 Quiz',
  'Complete the quiz covering safety protocols and basic procedures.',
  now() + interval '7 days',
  100,
  'text'
from public.courses c
where c.code = 'HLTH-101'
limit 1;
*/

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

do $$
begin
  raise notice '✅ Messages and Assignments tables created successfully!';
  raise notice '📧 Messages table: Supports inbox/outbox functionality';
  raise notice '📝 Assignments table: Supports course assignments with submissions';
  raise notice '🔒 Row Level Security enabled on all tables';
end $$;
