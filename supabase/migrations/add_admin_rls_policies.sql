-- Admin RLS Policies for LMS Resources
-- Run this in Supabase SQL Editor

-- ============ COURSES ============
-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Admin/Instructor can do everything
CREATE POLICY "courses_admin_all" ON public.courses
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin', 'instructor')
  )
);

-- Students can read published courses
CREATE POLICY "courses_student_read" ON public.courses
FOR SELECT TO authenticated
USING (is_published = true);

-- ============ LESSONS ============
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Admin/Instructor can do everything
CREATE POLICY "lessons_admin_all" ON public.lessons
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin', 'instructor')
  )
);

-- Students can read lessons from published courses
CREATE POLICY "lessons_student_read" ON public.lessons
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = lessons.course_id
    AND courses.is_published = true
  )
);

-- ============ QUIZZES ============
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- Admin/Instructor can do everything
CREATE POLICY "quizzes_admin_all" ON public.quizzes
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin', 'instructor')
  )
);

-- Students can read quizzes from published courses
CREATE POLICY "quizzes_student_read" ON public.quizzes
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = quizzes.course_id
    AND courses.is_published = true
  )
);

-- ============ QUIZ QUESTIONS ============
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Admin/Instructor can do everything
CREATE POLICY "quiz_questions_admin_all" ON public.quiz_questions
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin', 'instructor')
  )
);

-- Students can read questions from quizzes in published courses
CREATE POLICY "quiz_questions_student_read" ON public.quiz_questions
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.quizzes
    JOIN public.courses ON courses.id = quizzes.course_id
    WHERE quizzes.id = quiz_questions.quiz_id
    AND courses.is_published = true
  )
);

-- ============ ENROLLMENTS ============
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "enrollments_admin_all" ON public.enrollments
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin')
  )
);

-- Students can read their own enrollments
CREATE POLICY "enrollments_student_own" ON public.enrollments
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- ============ PROFILES ============
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Admin can do everything
CREATE POLICY "profiles_admin_all" ON public.profiles
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
    AND p.role IN ('admin', 'super_admin')
  )
);

-- Users can read and update their own profile
CREATE POLICY "profiles_own_read" ON public.profiles
FOR SELECT TO authenticated
USING (id = auth.uid());

CREATE POLICY "profiles_own_update" ON public.profiles
FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- ============ LESSON PROGRESS ============
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Admin can read all progress
CREATE POLICY "lesson_progress_admin_read" ON public.lesson_progress
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'super_admin', 'instructor')
  )
);

-- Students can manage their own progress
CREATE POLICY "lesson_progress_own" ON public.lesson_progress
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
