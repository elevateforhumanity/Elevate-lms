-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- Secure access to all tables
-- =====================================================

-- =====================================================
-- USER PROFILES
-- =====================================================

alter table user_profiles enable row level security;

-- Users can view their own profile
create policy "Users can view own profile"
  on user_profiles for select
  using (auth.uid() = user_id);

-- Users can update their own profile
create policy "Users can update own profile"
  on user_profiles for update
  using (auth.uid() = user_id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on user_profiles for select
  using (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- =====================================================
-- COURSES
-- =====================================================

alter table courses enable row level security;

-- Anyone can view published public courses
create policy "Anyone can view published courses"
  on courses for select
  using (visibility = 'public' and published_at is not null);

-- Instructors can view their own courses
create policy "Instructors can view own courses"
  on courses for select
  using (instructor_id = auth.uid());

-- Admins can view all courses
create policy "Admins can view all courses"
  on courses for select
  using (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Instructors can create courses
create policy "Instructors can create courses"
  on courses for insert
  with check (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role in ('instructor', 'admin')
    )
  );

-- Instructors can update their own courses
create policy "Instructors can update own courses"
  on courses for update
  using (instructor_id = auth.uid());

-- =====================================================
-- MODULES & LESSONS
-- =====================================================

alter table modules enable row level security;

-- Anyone can view modules of published courses
create policy "Anyone can view published course modules"
  on modules for select
  using (
    exists (
      select 1 from courses
      where id = modules.course_id
        and visibility = 'public'
        and published_at is not null
    )
  );

alter table lessons enable row level security;

-- Anyone can view lessons of published courses
create policy "Anyone can view published course lessons"
  on lessons for select
  using (
    exists (
      select 1 from modules m
      join courses c on m.course_id = c.id
      where m.id = lessons.module_id
        and c.visibility = 'public'
        and c.published_at is not null
    )
  );

-- =====================================================
-- ENROLLMENTS
-- =====================================================

alter table enrollments enable row level security;

-- Users can view their own enrollments
create policy "Users can view own enrollments"
  on enrollments for select
  using (auth.uid() = user_id);

-- Users can enroll themselves
create policy "Users can enroll themselves"
  on enrollments for insert
  with check (auth.uid() = user_id);

-- Admins can view all enrollments
create policy "Admins can view all enrollments"
  on enrollments for select
  using (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- =====================================================
-- LESSON PROGRESS
-- =====================================================

alter table lesson_progress enable row level security;

-- Users can view their own progress
create policy "Users can view own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

-- Users can update their own progress
create policy "Users can upsert own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);

-- =====================================================
-- QUIZ ATTEMPTS
-- =====================================================

alter table quiz_attempts enable row level security;

-- Users can view their own attempts
create policy "Users can view own quiz attempts"
  on quiz_attempts for select
  using (auth.uid() = user_id);

-- Users can create their own attempts
create policy "Users can create own quiz attempts"
  on quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Instructors can view attempts for their courses
create policy "Instructors can view course quiz attempts"
  on quiz_attempts for select
  using (
    exists (
      select 1 from quizzes q
      join lessons l on q.lesson_id = l.id
      join modules m on l.module_id = m.id
      join courses c on m.course_id = c.id
      where q.id = quiz_attempts.quiz_id
        and c.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- ASSIGNMENTS & SUBMISSIONS
-- =====================================================

alter table assignment_submissions enable row level security;

-- Users can view their own submissions
create policy "Users can view own submissions"
  on assignment_submissions for select
  using (auth.uid() = user_id);

-- Users can create their own submissions
create policy "Users can create own submissions"
  on assignment_submissions for insert
  with check (auth.uid() = user_id);

-- Instructors can view submissions for their courses
create policy "Instructors can view course submissions"
  on assignment_submissions for select
  using (
    exists (
      select 1 from assignments a
      join lessons l on a.lesson_id = l.id
      join modules m on l.module_id = m.id
      join courses c on m.course_id = c.id
      where a.id = assignment_submissions.assignment_id
        and c.instructor_id = auth.uid()
    )
  );

-- Instructors can grade submissions
create policy "Instructors can grade submissions"
  on assignment_submissions for update
  using (
    exists (
      select 1 from assignments a
      join lessons l on a.lesson_id = l.id
      join modules m on l.module_id = m.id
      join courses c on m.course_id = c.id
      where a.id = assignment_submissions.assignment_id
        and c.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- CERTIFICATES
-- =====================================================

alter table certificates enable row level security;

-- Users can view their own certificates
create policy "Users can view own certificates"
  on certificates for select
  using (auth.uid() = user_id);

-- Anyone can verify certificates by serial
create policy "Anyone can verify certificates"
  on certificates for select
  using (true);

-- =====================================================
-- MESSAGES
-- =====================================================

alter table messages enable row level security;

-- Users can view messages sent to them
create policy "Users can view received messages"
  on messages for select
  using (auth.uid() = to_user_id);

-- Users can view messages they sent
create policy "Users can view sent messages"
  on messages for select
  using (auth.uid() = from_user_id);

-- Users can send messages
create policy "Users can send messages"
  on messages for insert
  with check (auth.uid() = from_user_id);

-- Users can mark their messages as read
create policy "Users can update received messages"
  on messages for update
  using (auth.uid() = to_user_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

alter table notifications enable row level security;

-- Users can view their own notifications
create policy "Users can view own notifications"
  on notifications for select
  using (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
create policy "Users can update own notifications"
  on notifications for update
  using (auth.uid() = user_id);

-- System can create notifications
create policy "System can create notifications"
  on notifications for insert
  with check (true);

-- =====================================================
-- DISCUSSION FORUMS
-- =====================================================

alter table discussion_topics enable row level security;

-- Enrolled users can view course discussions
create policy "Enrolled users can view discussions"
  on discussion_topics for select
  using (
    exists (
      select 1 from enrollments
      where user_id = auth.uid()
        and course_id = discussion_topics.course_id
        and status = 'active'
    )
  );

-- Enrolled users can create topics
create policy "Enrolled users can create topics"
  on discussion_topics for insert
  with check (
    exists (
      select 1 from enrollments
      where user_id = auth.uid()
        and course_id = discussion_topics.course_id
        and status = 'active'
    )
  );

alter table discussion_replies enable row level security;

-- Enrolled users can view replies
create policy "Enrolled users can view replies"
  on discussion_replies for select
  using (
    exists (
      select 1 from discussion_topics dt
      join enrollments e on e.course_id = dt.course_id
      where dt.id = discussion_replies.topic_id
        and e.user_id = auth.uid()
        and e.status = 'active'
    )
  );

-- Enrolled users can create replies
create policy "Enrolled users can create replies"
  on discussion_replies for insert
  with check (
    exists (
      select 1 from discussion_topics dt
      join enrollments e on e.course_id = dt.course_id
      where dt.id = discussion_replies.topic_id
        and e.user_id = auth.uid()
        and e.status = 'active'
    )
  );

-- =====================================================
-- PAYMENTS & VOUCHERS
-- =====================================================

alter table payments enable row level security;

-- Users can view their own payments
create policy "Users can view own payments"
  on payments for select
  using (auth.uid() = user_id);

-- Admins can view all payments
create policy "Admins can view all payments"
  on payments for select
  using (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

alter table vouchers enable row level security;

-- Anyone can view valid vouchers (to check codes)
create policy "Anyone can view valid vouchers"
  on vouchers for select
  using (expires_at > now() or expires_at is null);

-- Admins can manage vouchers
create policy "Admins can manage vouchers"
  on vouchers for all
  using (
    exists (
      select 1 from user_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- =====================================================
-- COURSE RESOURCES
-- =====================================================

alter table course_resources enable row level security;

-- Enrolled users can view course resources
create policy "Enrolled users can view resources"
  on course_resources for select
  using (
    exists (
      select 1 from enrollments
      where user_id = auth.uid()
        and course_id = course_resources.course_id
        and status = 'active'
    )
  );

-- =====================================================
-- LIVE SESSIONS
-- =====================================================

alter table live_sessions enable row level security;

-- Enrolled users can view course live sessions
create policy "Enrolled users can view live sessions"
  on live_sessions for select
  using (
    exists (
      select 1 from enrollments
      where user_id = auth.uid()
        and course_id = live_sessions.course_id
        and status = 'active'
    )
  );

-- =====================================================
-- CALENDAR EVENTS
-- =====================================================

alter table calendar_events enable row level security;

-- Enrolled users can view course events
create policy "Enrolled users can view events"
  on calendar_events for select
  using (
    exists (
      select 1 from enrollments
      where user_id = auth.uid()
        and course_id = calendar_events.course_id
        and status = 'active'
    )
  );

-- =====================================================
-- GAMIFICATION
-- =====================================================

alter table user_achievements enable row level security;

-- Users can view their own achievements
create policy "Users can view own achievements"
  on user_achievements for select
  using (auth.uid() = user_id);

-- Anyone can view achievements (for leaderboard)
create policy "Anyone can view achievements"
  on user_achievements for select
  using (true);

alter table user_points enable row level security;

-- Users can view their own points
create policy "Users can view own points"
  on user_points for select
  using (auth.uid() = user_id);

-- Anyone can view points (for leaderboard)
create policy "Anyone can view points"
  on user_points for select
  using (true);
