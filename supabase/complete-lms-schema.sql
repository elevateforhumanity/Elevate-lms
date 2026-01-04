-- ============================================
-- COMPLETE LMS DATABASE SCHEMA
-- Elevate for Humanity Learning Management System
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (User Management)
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  
  -- Contact info
  phone TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  
  -- Preferences
  email_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================
-- 2. COURSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  
  -- Instructor
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  instructor_name TEXT,
  
  -- Content
  thumbnail_url TEXT,
  video_intro_url TEXT,
  syllabus_url TEXT,
  
  -- Pricing
  price DECIMAL(10, 2) DEFAULT 0,
  currency TEXT DEFAULT 'usd',
  is_free BOOLEAN DEFAULT false,
  
  -- Course details
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all')),
  duration_hours INTEGER,
  language TEXT DEFAULT 'en',
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  
  -- Stats
  enrollment_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published_at DESC);

-- RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (status = 'published');

CREATE POLICY "Instructors can manage own courses"
  ON courses FOR ALL
  USING (auth.uid() = instructor_id);

CREATE POLICY "Admins can manage all courses"
  ON courses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 3. MODULES TABLE (Course Sections)
-- ============================================

CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  UNIQUE(course_id, order_index)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_modules_course ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(course_id, order_index);

-- RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published modules"
  ON modules FOR SELECT
  USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id AND courses.status = 'published'
    )
  );

CREATE POLICY "Instructors can manage own modules"
  ON modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================
-- 4. LESSONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  
  -- Content
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'text', 'quiz', 'assignment', 'file', 'live')),
  content_url TEXT,
  content_text TEXT,
  duration_minutes INTEGER,
  
  -- Video specific
  video_provider TEXT CHECK (video_provider IN ('youtube', 'vimeo', 'cloudflare', 's3', 'custom')),
  video_id TEXT,
  
  -- File specific
  file_url TEXT,
  file_type TEXT,
  file_size_bytes BIGINT,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  is_preview BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  UNIQUE(module_id, order_index)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(module_id, order_index);

-- RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id AND courses.status = 'published'
    )
  );

CREATE POLICY "Instructors can manage own lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================
-- 5. ENROLLMENTS TABLE (from existing schema)
-- ============================================

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  program_id TEXT,
  program_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled', 'expired', 'failed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'free', 'failed', 'refunded', 'expired')),
  
  -- Stripe payment info
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount DECIMAL(10, 2) DEFAULT 0,
  currency TEXT DEFAULT 'usd',
  
  -- Customer info
  customer_email TEXT,
  customer_name TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  enrolled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Progress tracking
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_session ON enrollments(stripe_session_id);

-- RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 6. LESSON PROGRESS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- Progress
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  
  -- Video progress
  video_position_seconds INTEGER DEFAULT 0,
  video_watched_percentage INTEGER DEFAULT 0,
  
  -- Quiz/Assignment
  score DECIMAL(5, 2),
  attempts INTEGER DEFAULT 0,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  UNIQUE(user_id, lesson_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON lesson_progress(lesson_id);

-- RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON lesson_progress FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- 7. PAYMENT HISTORY TABLE (from existing schema)
-- ============================================

CREATE TABLE IF NOT EXISTS payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Payment details
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded', 'cancelled')),
  payment_method TEXT,
  
  -- Stripe info
  stripe_payment_intent TEXT UNIQUE,
  stripe_charge_id TEXT,
  stripe_refund_id TEXT,
  
  -- Transaction details
  description TEXT,
  receipt_url TEXT,
  failure_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payment_history_enrollment ON payment_history(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_user ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_status ON payment_history(status);

-- RLS
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment history"
  ON payment_history FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- 8. CERTIFICATES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Certificate details
  certificate_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  completion_date DATE NOT NULL,
  
  -- Files
  pdf_url TEXT,
  image_url TEXT,
  
  -- Verification
  verification_code TEXT UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  
  -- Timestamps
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  UNIQUE(user_id, course_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification ON certificates(verification_code);

-- RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can verify certificates"
  ON certificates FOR SELECT
  USING (true);

-- ============================================
-- 9. COURSE REVIEWS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  
  -- Review
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_verified_purchase BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, course_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_course ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON course_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON course_reviews(rating);

-- RLS
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published reviews"
  ON course_reviews FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can manage own reviews"
  ON course_reviews FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function: Update enrollment progress based on lesson completion
CREATE OR REPLACE FUNCTION update_enrollment_progress_from_lessons()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  new_progress INTEGER;
BEGIN
  -- Count total and completed lessons for this enrollment
  SELECT COUNT(*) INTO total_lessons
  FROM lessons l
  INNER JOIN enrollments e ON e.course_id = l.course_id
  WHERE e.id = NEW.enrollment_id AND l.is_published = true;
  
  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_progress lp
  WHERE lp.enrollment_id = NEW.enrollment_id AND lp.status = 'completed';
  
  -- Calculate progress percentage
  IF total_lessons > 0 THEN
    new_progress := (completed_lessons * 100) / total_lessons;
    
    -- Update enrollment
    UPDATE enrollments
    SET 
      progress_percentage = new_progress,
      last_accessed_at = NOW(),
      completed_at = CASE WHEN new_progress >= 100 THEN NOW() ELSE completed_at END,
      status = CASE WHEN new_progress >= 100 THEN 'completed' ELSE status END
    WHERE id = NEW.enrollment_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update enrollment when lesson is completed
CREATE TRIGGER lesson_progress_update_trigger
  AFTER INSERT OR UPDATE ON lesson_progress
  FOR EACH ROW
  WHEN (NEW.status = 'completed')
  EXECUTE FUNCTION update_enrollment_progress_from_lessons();

-- Function: Update course stats when review is added
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE courses
  SET 
    rating_average = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM course_reviews
      WHERE course_id = NEW.course_id AND is_published = true
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM course_reviews
      WHERE course_id = NEW.course_id AND is_published = true
    )
  WHERE id = NEW.course_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update course rating on review changes
CREATE TRIGGER course_review_trigger
  AFTER INSERT OR UPDATE OR DELETE ON course_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_course_rating();

-- Function: Auto-create payment history on enrollment payment
CREATE OR REPLACE FUNCTION create_payment_history()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'paid' AND NEW.amount > 0 THEN
    INSERT INTO payment_history (
      enrollment_id,
      user_id,
      amount,
      currency,
      status,
      stripe_payment_intent,
      description,
      created_at
    ) VALUES (
      NEW.id,
      NEW.user_id,
      NEW.amount,
      NEW.currency,
      'succeeded',
      NEW.stripe_payment_intent,
      'Enrollment payment for ' || COALESCE(NEW.program_name, 'course'),
      NEW.enrolled_at
    )
    ON CONFLICT (stripe_payment_intent) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Create payment history on enrollment
CREATE TRIGGER enrollment_payment_trigger
  AFTER UPDATE ON enrollments
  FOR EACH ROW
  WHEN (NEW.payment_status = 'paid' AND OLD.payment_status != 'paid')
  EXECUTE FUNCTION create_payment_history();

-- Function: Update course enrollment count
CREATE OR REPLACE FUNCTION update_course_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE courses
    SET enrollment_count = enrollment_count + 1
    WHERE id = NEW.course_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses
    SET enrollment_count = GREATEST(0, enrollment_count - 1)
    WHERE id = OLD.course_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update enrollment count
CREATE TRIGGER enrollment_count_trigger
  AFTER INSERT OR DELETE ON enrollments
  FOR EACH ROW
  WHEN (NEW.status = 'active' OR OLD.status = 'active')
  EXECUTE FUNCTION update_course_enrollment_count();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE profiles IS 'User profiles and account information';
COMMENT ON TABLE courses IS 'Course catalog and details';
COMMENT ON TABLE modules IS 'Course modules/sections';
COMMENT ON TABLE lessons IS 'Individual lessons within modules';
COMMENT ON TABLE enrollments IS 'Student enrollments in courses';
COMMENT ON TABLE lesson_progress IS 'Student progress through lessons';
COMMENT ON TABLE payment_history IS 'Payment transaction history';
COMMENT ON TABLE certificates IS 'Course completion certificates';
COMMENT ON TABLE course_reviews IS 'Student reviews and ratings';

-- ============================================
-- INITIAL DATA (Optional)
-- ============================================

-- Insert default admin profile (if needed)
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES ('your-admin-uuid', 'admin@elevateforhumanity.org', 'Admin User', 'admin')
-- ON CONFLICT (id) DO NOTHING;
