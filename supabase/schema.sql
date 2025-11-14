-- =====================================================
-- ELEVATE FOR HUMANITY LMS - COMPLETE DATABASE SCHEMA
-- Moodle/Docebo-ready with payments, compliance, operations
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================================================
-- 1. USER MANAGEMENT & ROLES
-- =====================================================

-- User roles enum
create type user_role as enum('admin','instructor','ta','learner','partner');

-- Program holders (barber schools, CNA programs, etc.)
create table public.program_holders(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references auth.users(id),
  status text default 'pending', -- 'pending' | 'approved' | 'inactive'
  payout_share numeric default 0.333, -- 1/3 by default
  mou_status text default 'not_sent', -- 'not_sent' | 'sent' | 'signed'
  mou_signed_at timestamptz,
  created_at timestamptz default now()
);

-- Program holder applications (signup details)
create table public.program_holder_applications(
  id uuid primary key default gen_random_uuid(),
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  contact_name text not null,
  contact_email text not null,
  phone text,
  site_address text,
  training_focus text,
  funding_sources text,
  created_at timestamptz default now()
);

-- User profiles (extends auth.users)
create table public.user_profiles(
  user_id uuid primary key references auth.users(id) on delete cascade,
  role user_role default 'learner',
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  bio text,
  avatar_url text,
  organization_id uuid,
  program_holder_id uuid references public.program_holders(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Organizations (multi-tenant support)
create table public.organizations(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  primary_color text default '#3b82f6',
  created_at timestamptz default now()
);

-- =====================================================
-- 2. COURSE STRUCTURE
-- =====================================================

-- Courses
create table public.courses(
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  description text,
  thumbnail_url text,
  price_cents int default 0,
  visibility text default 'public', -- public|private|unlisted
  duration_hours int default 0,
  difficulty text default 'beginner', -- beginner|intermediate|advanced
  category text,
  tags text[],
  instructor_id uuid references auth.users(id),
  organization_id uuid references public.organizations(id),
  program_holder_id uuid references public.program_holders(id),
  cert_valid_days int, -- how long certificate stays valid; null or 0 = no expiry
  cert_note text, -- display label for certificate validity rule
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz
);

-- Modules (course sections)
create table public.modules(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  position int not null,
  created_at timestamptz default now()
);

-- Lessons (individual learning units)
create table public.lessons(
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id) on delete cascade,
  title text not null,
  kind text not null, -- video|pdf|html|quiz|scorm|assignment|discussion
  content jsonb, -- urls, html, scorm manifest, video embed, etc
  position int not null,
  duration_seconds int default 0,
  is_required boolean default true,
  created_at timestamptz default now()
);

-- Learning paths (course sequences)
create table public.learning_paths(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  created_at timestamptz default now()
);

create table public.learning_path_courses(
  learning_path_id uuid references public.learning_paths(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  position int not null,
  is_required boolean default true,
  primary key(learning_path_id, course_id)
);

-- =====================================================
-- 3. ENROLLMENTS & PROGRESS
-- =====================================================

-- Enrollments
create table public.enrollments(
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  status text default 'active', -- active|completed|expired|refunded|suspended
  progress_percent numeric default 0,
  started_at timestamptz default now(),
  completed_at timestamptz,
  expires_at timestamptz,
  enrollment_method text, -- purchase|voucher|admin|free|workforce
  payment_id text, -- Stripe payment intent ID
  funding_source text, -- WRG|WIOA|JRI|DOL|EmployIndy|Paid|Partner
  funding_program_id uuid references public.funding_programs(id),
  partner_id uuid references public.organizations(id),
  case_manager_name text,
  case_manager_email text,
  workone_region text,
  primary key(user_id, course_id)
);

-- Enrollment events (for KPI tracking)
create table public.enrollment_events(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  funding_program_id uuid references public.funding_programs(id),
  kind text not null, -- ENROLLED|STARTED|COMPLETED|DROPPED|CERTIFIED
  created_at timestamptz default now()
);

-- Lesson progress
create table public.lesson_progress(
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  percent numeric default 0,
  last_position_seconds int default 0,
  completed boolean default false,
  time_spent_seconds int default 0,
  first_accessed_at timestamptz default now(),
  last_accessed_at timestamptz default now(),
  completed_at timestamptz,
  primary key(user_id, lesson_id)
);

-- Attendance tracking (for compliance)
create table public.attendance_logs(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  session_date date default current_date,
  time_spent_seconds int default 0,
  created_at timestamptz default now()
);

-- =====================================================
-- 4. ASSESSMENTS & GRADING
-- =====================================================

-- Question bank
create table public.questions(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  stem text not null,
  type text not null, -- mcq|tf|short|essay
  options jsonb, -- choices for mcq/tf
  correct_answer jsonb, -- correct key(s)
  points numeric default 1,
  explanation text,
  created_at timestamptz default now()
);

-- Quizzes/Exams
create table public.quizzes(
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  instructions text,
  time_limit_minutes int,
  passing_score numeric default 70,
  max_attempts int default 3,
  shuffle_questions boolean default false,
  show_correct_answers boolean default true,
  created_at timestamptz default now()
);

create table public.quiz_questions(
  quiz_id uuid references public.quizzes(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  position int not null,
  primary key(quiz_id, question_id)
);

-- Quiz attempts
create table public.quiz_attempts(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_id uuid references public.quizzes(id) on delete cascade,
  score numeric,
  max_score numeric,
  percent numeric,
  passed boolean,
  answers jsonb, -- user's answers
  started_at timestamptz default now(),
  submitted_at timestamptz,
  time_spent_seconds int
);

-- Assignments
create table public.assignments(
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  description text,
  instructions text,
  max_points numeric default 100,
  due_date timestamptz,
  allow_late_submission boolean default true,
  submission_type text default 'file', -- file|text|url
  created_at timestamptz default now()
);

-- Assignment submissions
create table public.assignment_submissions(
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text, -- text submission or file URL
  file_url text,
  submitted_at timestamptz default now(),
  grade numeric,
  feedback text,
  graded_at timestamptz,
  graded_by uuid references auth.users(id)
);

-- =====================================================
-- 5. CERTIFICATES
-- =====================================================

create table public.certificates(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  serial text unique not null,
  student_name text not null,
  course_name text not null,
  completion_date date not null,
  issue_date date default current_date,
  expiration_date date,
  credential_url text,
  pdf_url text,
  issued_at timestamptz default now(),
  expires_at timestamptz, -- when certificate expires (null = no expiry)
  revoked_at timestamptz, -- when certificate was revoked
  revoked_reason text -- reason for revocation
);

-- Index for certificate serial lookups
create unique index if not exists idx_cert_serial on public.certificates(serial);

-- =====================================================
-- 6. WORKFORCE FUNDING PROGRAMS
-- =====================================================

-- Funding programs (WRG, WIOA, JRI, EmployIndy, DOL)
create table public.funding_programs(
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  contact_email text,
  report_day int default 5, -- 1=Mon ... 7=Sun for weekly report
  created_at timestamptz default now()
);

-- Funding applications
create table public.funding_applications(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  program_id uuid references public.funding_programs(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  status text default 'submitted', -- submitted|pending_docs|approved|denied|waitlist
  case_manager_name text,
  case_manager_email text,
  referral_source text,
  household_income int,
  employment_status text,
  barriers text,
  notes text,
  submitted_at timestamptz default now(),
  decided_at timestamptz
);

-- Funding documents
create table public.funding_documents(
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.funding_applications(id) on delete cascade,
  kind text,
  file_url text not null,
  received_at timestamptz default now()
);

-- =====================================================
-- 7. PAYMENTS & MONETIZATION
-- =====================================================

-- Vouchers/enrollment codes
create table public.vouchers(
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  course_id uuid references public.courses(id),
  max_uses int default 1,
  uses_count int default 0,
  expires_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table public.voucher_redemptions(
  id uuid primary key default gen_random_uuid(),
  voucher_id uuid references public.vouchers(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  redeemed_at timestamptz default now()
);

-- Stripe payments
create table public.payments(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id),
  stripe_payment_intent_id text unique,
  stripe_customer_id text,
  amount_cents int not null,
  currency text default 'usd',
  status text, -- succeeded|pending|failed|refunded
  created_at timestamptz default now()
);

-- Coupons
create table public.coupons(
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text not null, -- percent|fixed
  discount_value numeric not null,
  max_uses int,
  uses_count int default 0,
  expires_at timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);

-- =====================================================
-- 7. COMMUNICATION
-- =====================================================

-- Messages
create table public.messages(
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references auth.users(id) on delete cascade,
  to_user_id uuid references auth.users(id) on delete cascade,
  subject text,
  body text not null,
  read boolean default false,
  parent_message_id uuid references public.messages(id),
  created_at timestamptz default now()
);

-- Announcements
create table public.announcements(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  author_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  published_at timestamptz default now()
);

-- Discussion forums
create table public.discussion_topics(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  author_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  pinned boolean default false,
  locked boolean default false,
  created_at timestamptz default now()
);

create table public.discussion_replies(
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.discussion_topics(id) on delete cascade,
  author_id uuid references auth.users(id) on delete cascade,
  content text not null,
  parent_reply_id uuid references public.discussion_replies(id),
  created_at timestamptz default now()
);

-- =====================================================
-- 8. NOTIFICATIONS
-- =====================================================

create table public.notifications(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null, -- assignment|grade|certificate|message|deadline|announcement
  title text not null,
  message text not null,
  course_id uuid references public.courses(id),
  link_url text,
  read boolean default false,
  priority text default 'medium', -- low|medium|high
  created_at timestamptz default now()
);

-- =====================================================
-- 9. CALENDAR & EVENTS
-- =====================================================

create table public.calendar_events(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  event_type text not null, -- assignment|quiz|live-session|deadline
  start_time timestamptz not null,
  end_time timestamptz,
  location text, -- Zoom link, room number, etc
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- =====================================================
-- 10. GAMIFICATION
-- =====================================================

create table public.achievements(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon_url text,
  points int default 0,
  criteria jsonb, -- rules for earning
  created_at timestamptz default now()
);

create table public.user_achievements(
  user_id uuid references auth.users(id) on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  earned_at timestamptz default now(),
  primary key(user_id, achievement_id)
);

create table public.user_points(
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_points int default 0,
  level int default 1,
  updated_at timestamptz default now()
);

-- =====================================================
-- 11. RESOURCES & FILES
-- =====================================================

create table public.course_resources(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  file_url text not null,
  file_type text, -- pdf|doc|video|zip
  file_size_bytes bigint,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- =====================================================
-- 12. LIVE SESSIONS
-- =====================================================

create table public.live_sessions(
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  instructor_id uuid references auth.users(id),
  start_time timestamptz not null,
  end_time timestamptz not null,
  meeting_url text, -- Zoom/Meet link
  recording_url text,
  max_participants int,
  created_at timestamptz default now()
);

create table public.live_session_attendance(
  session_id uuid references public.live_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  joined_at timestamptz,
  left_at timestamptz,
  duration_minutes int,
  primary key(session_id, user_id)
);

-- =====================================================
-- 13. ANALYTICS & REPORTING
-- =====================================================

create table public.activity_logs(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  action text not null, -- login|view_lesson|submit_quiz|etc
  resource_type text, -- course|lesson|quiz
  resource_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Login tracking for attendance and alerts
create table public.login_events(
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  source text not null, -- 'LMS_DASHBOARD' | 'PORTAL' | etc.
  at timestamptz default now()
);

create index idx_login_user_time on login_events(user_id, at desc);

-- =====================================================
-- 14. DELEGATES & PROGRAM HOLDERS
-- =====================================================

-- Delegate privileges for program holders
create table public.delegates(
  id uuid primary key default gen_random_uuid(),
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  can_view_reports boolean default true,
  can_view_learners boolean default true,
  can_edit_courses boolean default false,
  can_view_financials boolean default false,
  created_at timestamptz default now()
);

create index idx_delegates_ph on delegates(program_holder_id);
create index idx_delegates_user on delegates(user_id);

-- Program holder notes/progress log
create table public.program_holder_notes(
  id bigint generated by default as identity primary key,
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  note text,
  status text, -- 'On Track' | 'Behind' | 'Dropped' | etc.
  follow_up_date date, -- when to follow up with learner
  follow_up_done boolean default false, -- whether follow-up was completed
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create index idx_ph_notes_ph on program_holder_notes(program_holder_id);
create index idx_ph_notes_user on program_holder_notes(user_id, course_id);
create index idx_ph_notes_followup on program_holder_notes(follow_up_date, follow_up_done) where follow_up_date is not null;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

create index idx_enrollments_user on enrollments(user_id);
create index idx_enrollments_course on enrollments(course_id);
create index idx_lesson_progress_user on lesson_progress(user_id);
create index idx_messages_to_user on messages(to_user_id, read);
create index idx_notifications_user on notifications(user_id, read);
create index idx_quiz_attempts_user on quiz_attempts(user_id);
create index idx_activity_logs_user on activity_logs(user_id);
create index idx_courses_visibility on courses(visibility, published_at);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_user_profiles_updated_at before update on user_profiles
  for each row execute function update_updated_at_column();

create trigger update_courses_updated_at before update on courses
  for each row execute function update_updated_at_column();

-- Calculate enrollment progress
create or replace function calculate_enrollment_progress(p_user_id uuid, p_course_id uuid)
returns numeric as $$
declare
  total_lessons int;
  completed_lessons int;
begin
  select count(*) into total_lessons
  from lessons l
  join modules m on l.module_id = m.id
  where m.course_id = p_course_id and l.is_required = true;
  
  select count(*) into completed_lessons
  from lesson_progress lp
  join lessons l on lp.lesson_id = l.id
  join modules m on l.module_id = m.id
  where lp.user_id = p_user_id 
    and m.course_id = p_course_id 
    and lp.completed = true
    and l.is_required = true;
  
  if total_lessons = 0 then
    return 0;
  end if;
  
  return round((completed_lessons::numeric / total_lessons::numeric) * 100, 2);
end;
$$ language plpgsql;

-- Report for funding program
create or replace function report_for_program(pid uuid)
returns table(
  user_id uuid,
  course_id uuid,
  learner text,
  email text,
  course text,
  start_date date,
  minutes int,
  percent numeric,
  status text,
  certificate_id text
) language sql as $$
  select
    u.id as user_id,
    c.id as course_id,
    split_part(u.email,'@',1) as learner,
    u.email::text as email,
    c.title as course,
    date(e.started_at) as start_date,
    coalesce(sum(lp.last_position_seconds)/60,0)::int as minutes,
    round(coalesce(avg(lp.percent),0),1) as percent,
    e.status,
    max(ci.serial) as certificate_id
  from enrollments e
  join courses c on c.id=e.course_id
  join auth.users u on u.id=e.user_id
  left join lesson_progress lp on lp.user_id=e.user_id and lp.lesson_id in
    (select l.id from lessons l join modules m on m.id=l.module_id where m.course_id=e.course_id)
  left join certificates ci on ci.user_id=e.user_id and ci.course_id=e.course_id
  where e.funding_program_id = pid
  group by u.id, c.id, u.email, c.title, e.started_at, e.status;
$$;

-- Revocation log view
create or replace view cert_revocation_log as
select
  ci.serial,
  u.email as learner_email,
  c.title as course_title,
  ci.issued_at,
  ci.expires_at,
  ci.revoked_at,
  ci.revoked_reason
from certificates ci
join auth.users u on u.id = ci.user_id
join courses c on c.id = ci.course_id
where ci.revoked_at is not null
order by ci.revoked_at desc;
