-- Fix RLS policies for public access to marketing/informational tables
-- Everything behind login remains secure

-- ============================================================================
-- PUBLIC ACCESS (No authentication required)
-- ============================================================================

-- Programs table - Public read access for marketing pages
DROP POLICY IF EXISTS "Public can view programs" ON programs;
CREATE POLICY "Public can view programs"
  ON programs
  FOR SELECT
  USING (true);

-- Courses table - Public read access for course catalog
DROP POLICY IF EXISTS "Public can view courses" ON courses;
CREATE POLICY "Public can view courses"
  ON courses
  FOR SELECT
  USING (true);

-- Instructors table - Public read access for instructor profiles
DROP POLICY IF EXISTS "Public can view instructors" ON instructors;
CREATE POLICY "Public can view instructors"
  ON instructors
  FOR SELECT
  USING (true);

-- Testimonials - Public read access
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials"
  ON testimonials
  FOR SELECT
  WHERE published = true;

-- Blog posts - Public read access for published posts
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  WHERE status = 'published';

-- FAQs - Public read access
DROP POLICY IF EXISTS "Public can view FAQs" ON faqs;
CREATE POLICY "Public can view FAQs"
  ON faqs
  FOR SELECT
  WHERE published = true;

-- ============================================================================
-- AUTHENTICATED ACCESS (Login required)
-- ============================================================================

-- User profiles - Users can only see their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Enrollments - Users can only see their own enrollments
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own enrollments" ON enrollments;
CREATE POLICY "Users can create own enrollments"
  ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Progress tracking - Users can only see/update their own progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Certificates - Users can only see their own certificates
DROP POLICY IF EXISTS "Users can view own certificates" ON certificates;
CREATE POLICY "Users can view own certificates"
  ON certificates
  FOR SELECT
  USING (auth.uid() = user_id);

-- Applications - Users can only see/create their own applications
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
CREATE POLICY "Users can view own applications"
  ON applications
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own applications" ON applications;
CREATE POLICY "Users can create own applications"
  ON applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Payments - Users can only see their own payments
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Messages - Users can only see messages they sent or received
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
CREATE POLICY "Users can view own messages"
  ON messages
  FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- ============================================================================
-- ADMIN ACCESS (Admin role required)
-- ============================================================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins can do everything on all tables
-- Programs
DROP POLICY IF EXISTS "Admins can manage programs" ON programs;
CREATE POLICY "Admins can manage programs"
  ON programs
  FOR ALL
  USING (is_admin());

-- Courses
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;
CREATE POLICY "Admins can manage courses"
  ON courses
  FOR ALL
  USING (is_admin());

-- Users/Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (is_admin());

-- Enrollments
DROP POLICY IF EXISTS "Admins can manage enrollments" ON enrollments;
CREATE POLICY "Admins can manage enrollments"
  ON enrollments
  FOR ALL
  USING (is_admin());

-- Applications
DROP POLICY IF EXISTS "Admins can manage applications" ON applications;
CREATE POLICY "Admins can manage applications"
  ON applications
  FOR ALL
  USING (is_admin());

-- Payments
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments"
  ON payments
  FOR SELECT
  USING (is_admin());

-- Messages
DROP POLICY IF EXISTS "Admins can view all messages" ON messages;
CREATE POLICY "Admins can view all messages"
  ON messages
  FOR SELECT
  USING (is_admin());

-- ============================================================================
-- INSTRUCTOR ACCESS (Instructor role required)
-- ============================================================================

-- Helper function to check if user is instructor
CREATE OR REPLACE FUNCTION is_instructor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('instructor', 'admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Instructors can view their assigned courses
DROP POLICY IF EXISTS "Instructors can view assigned courses" ON courses;
CREATE POLICY "Instructors can view assigned courses"
  ON courses
  FOR SELECT
  USING (
    is_instructor() AND (
      instructor_id = auth.uid() OR
      is_admin()
    )
  );

-- Instructors can view enrollments for their courses
DROP POLICY IF EXISTS "Instructors can view course enrollments" ON enrollments;
CREATE POLICY "Instructors can view course enrollments"
  ON enrollments
  FOR SELECT
  USING (
    is_instructor() AND EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = enrollments.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- Instructors can update progress for their students
DROP POLICY IF EXISTS "Instructors can update student progress" ON user_progress;
CREATE POLICY "Instructors can update student progress"
  ON user_progress
  FOR UPDATE
  USING (
    is_instructor() AND EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = user_progress.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select on public tables to anon
GRANT SELECT ON programs TO anon;
GRANT SELECT ON courses TO anon;
GRANT SELECT ON instructors TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON faqs TO anon;

-- Grant appropriate permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT ON enrollments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON user_progress TO authenticated;
GRANT SELECT ON certificates TO authenticated;
GRANT SELECT, INSERT ON applications TO authenticated;
GRANT SELECT ON payments TO authenticated;
GRANT SELECT, INSERT ON messages TO authenticated;

COMMENT ON POLICY "Public can view programs" ON programs IS 
  'Allow anonymous users to view programs for marketing pages';

COMMENT ON POLICY "Users can view own profile" ON profiles IS 
  'Users can only access their own profile data';

COMMENT ON POLICY "Admins can manage programs" ON programs IS 
  'Admins have full access to manage all programs';
