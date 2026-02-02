-- ============================================
-- ELEVATE LMS - PRODUCTION DATABASE SETUP
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  program TEXT,
  program_completed TEXT,
  current_job_title TEXT,
  current_employer TEXT,
  quote TEXT NOT NULL,
  image_url TEXT,
  salary_before INT,
  salary_after INT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audience TEXT NOT NULL DEFAULT 'all',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. STUDENT HOURS TABLE
CREATE TABLE IF NOT EXISTS student_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL,
  student_id UUID NOT NULL,
  hours NUMERIC NOT NULL,
  description TEXT,
  logged_date DATE NOT NULL,
  verified BOOLEAN DEFAULT false,
  verified_by UUID,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROGRAM OUTCOMES TABLE
CREATE TABLE IF NOT EXISTS program_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID,
  outcome TEXT NOT NULL,
  outcome_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PROGRAM REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS program_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID,
  requirement TEXT NOT NULL,
  requirement_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROGRAM TASKS TABLE
CREATE TABLE IF NOT EXISTS program_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID,
  title TEXT NOT NULL,
  instructions TEXT,
  due_days INT DEFAULT 7,
  task_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. STUDENT TASKS TABLE
CREATE TABLE IF NOT EXISTS student_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID,
  student_id UUID NOT NULL,
  enrollment_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. MARKETING PAGES TABLE
CREATE TABLE IF NOT EXISTS marketing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  hero_image TEXT,
  hero_image_alt TEXT,
  hero_variant TEXT DEFAULT 'split',
  hero_video_src TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MARKETING SECTIONS TABLE
CREATE TABLE IF NOT EXISTS marketing_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES marketing_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL DEFAULT 'text',
  heading TEXT NOT NULL,
  body TEXT NOT NULL,
  section_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published, audience) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_student_hours_student ON student_hours(student_id);
CREATE INDEX IF NOT EXISTS idx_student_hours_enrollment ON student_hours(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_student_tasks_student ON student_tasks(student_id);
CREATE INDEX IF NOT EXISTS idx_marketing_pages_slug ON marketing_pages(slug);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Testimonials: Public read, admin write
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin manage testimonials" ON testimonials;
CREATE POLICY "Admin manage testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Announcements: Public read published, admin write
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read announcements" ON announcements;
CREATE POLICY "Public read announcements" ON announcements
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin manage announcements" ON announcements;
CREATE POLICY "Admin manage announcements" ON announcements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- Student hours: Students see own, staff see all
ALTER TABLE student_hours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read own hours" ON student_hours;
CREATE POLICY "Students read own hours" ON student_hours
  FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students insert own hours" ON student_hours;
CREATE POLICY "Students insert own hours" ON student_hours
  FOR INSERT WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "Staff manage hours" ON student_hours;
CREATE POLICY "Staff manage hours" ON student_hours
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin', 'staff', 'instructor')
    )
  );

-- Student tasks: Students see own, staff see all
ALTER TABLE student_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students read own tasks" ON student_tasks;
CREATE POLICY "Students read own tasks" ON student_tasks
  FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students update own tasks" ON student_tasks;
CREATE POLICY "Students update own tasks" ON student_tasks
  FOR UPDATE USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Staff manage tasks" ON student_tasks;
CREATE POLICY "Staff manage tasks" ON student_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin', 'staff', 'instructor')
    )
  );

-- Program outcomes/requirements/tasks: Public read
ALTER TABLE program_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read program_outcomes" ON program_outcomes;
CREATE POLICY "Public read program_outcomes" ON program_outcomes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read program_requirements" ON program_requirements;
CREATE POLICY "Public read program_requirements" ON program_requirements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read program_tasks" ON program_tasks;
CREATE POLICY "Public read program_tasks" ON program_tasks FOR SELECT USING (true);

-- Marketing pages: Public read published
ALTER TABLE marketing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read marketing_pages" ON marketing_pages;
CREATE POLICY "Public read marketing_pages" ON marketing_pages
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read marketing_sections" ON marketing_sections;
CREATE POLICY "Public read marketing_sections" ON marketing_sections
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM marketing_pages WHERE id = page_id AND published = true)
  );

-- ============================================
-- DONE
-- ============================================
SELECT 'Migration complete!' AS status;
