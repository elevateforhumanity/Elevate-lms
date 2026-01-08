-- =====================================================
-- ACTIVATE PARTNER COURSES - 1,200+ Courses
-- Date: January 8, 2026
-- Purpose: Create partner tables and load all partner courses
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. Partner LMS Providers Table
-- =====================================================
CREATE TABLE IF NOT EXISTS partner_lms_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name TEXT NOT NULL,
  provider_type TEXT NOT NULL UNIQUE, -- 'hsi', 'certiport', 'careersafe', 'milady', 'jri', 'nrf', 'nds'
  website_url TEXT,
  support_email TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  api_config JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_lms_providers_type ON partner_lms_providers (provider_type);
CREATE INDEX IF NOT EXISTS idx_partner_lms_providers_active ON partner_lms_providers (active);

-- =====================================================
-- 2. Partner Courses Catalog Table
-- =====================================================
CREATE TABLE IF NOT EXISTS partner_courses_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES partner_lms_providers (id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  course_code TEXT,
  external_course_code TEXT,
  description TEXT,
  category TEXT,
  wholesale_price NUMERIC DEFAULT 0,
  retail_price NUMERIC DEFAULT 0,
  duration_hours NUMERIC,
  level TEXT,
  credential_type TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_courses_provider ON partner_courses_catalog (provider_id);
CREATE INDEX IF NOT EXISTS idx_partner_courses_active ON partner_courses_catalog (is_active);
CREATE INDEX IF NOT EXISTS idx_partner_courses_category ON partner_courses_catalog (category);
CREATE INDEX IF NOT EXISTS idx_partner_courses_code ON partner_courses_catalog (course_code);

-- =====================================================
-- 3. Partner LMS Enrollments Table
-- =====================================================
CREATE TABLE IF NOT EXISTS partner_lms_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES partner_lms_providers (id) ON DELETE RESTRICT,
  student_id UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES partner_courses_catalog (id) ON DELETE RESTRICT,
  program_id UUID NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  progress_percentage NUMERIC DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ NULL,
  external_enrollment_id TEXT,
  external_account_id TEXT,
  external_certificate_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_student ON partner_lms_enrollments (student_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_status ON partner_lms_enrollments (status);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_provider ON partner_lms_enrollments (provider_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_course ON partner_lms_enrollments (course_id);

-- =====================================================
-- 4. Partner Certificates Table
-- =====================================================
CREATE TABLE IF NOT EXISTS partner_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID NOT NULL REFERENCES partner_lms_enrollments (id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partner_lms_providers (id) ON DELETE RESTRICT,
  certificate_number TEXT,
  certificate_url TEXT,
  verification_url TEXT,
  issued_date TIMESTAMPTZ NOT NULL,
  expiration_date TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_certificates_student ON partner_certificates (student_id);
CREATE INDEX IF NOT EXISTS idx_partner_certificates_enrollment ON partner_certificates (enrollment_id);

-- =====================================================
-- 5. Insert Partner Providers
-- =====================================================
INSERT INTO partner_lms_providers (provider_name, provider_type, website_url, support_email, active)
VALUES
  ('Certiport', 'certiport', 'https://certiport.pearsonvue.com', 'support@certiport.com', true),
  ('Health & Safety Institute (HSI)', 'hsi', 'https://www.hsi.com', 'support@hsi.com', true),
  ('Justice Reinvestment Initiative (JRI)', 'jri', 'https://www.jri.org', 'support@jri.org', true),
  ('National Retail Federation (NRF)', 'nrf', 'https://nrf.com', 'support@nrf.com', true),
  ('CareerSafe', 'careersafe', 'https://www.careersafeonline.com', 'support@careersafeonline.com', true),
  ('Milady', 'milady', 'https://www.milady.com', 'support@milady.com', true),
  ('National Driver Safety (NDS)', 'nds', 'https://www.nds.com', 'support@nds.com', true)
ON CONFLICT (provider_type) DO UPDATE SET
  provider_name = EXCLUDED.provider_name,
  website_url = EXCLUDED.website_url,
  support_email = EXCLUDED.support_email,
  active = EXCLUDED.active,
  updated_at = NOW();

-- =====================================================
-- 6. Load Partner Courses (1,200+ courses)
-- =====================================================

-- This will be populated by running the full course catalog migration
-- The courses are loaded from: 20241129_full_partner_courses_1200plus.sql

-- For now, we'll create a placeholder to indicate the system is ready
-- The actual course data should be loaded separately to avoid migration timeout

COMMENT ON TABLE partner_courses_catalog IS 'Partner course catalog - load courses using: psql -f supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql';

-- =====================================================
-- 7. Enable RLS (Row Level Security)
-- =====================================================

ALTER TABLE partner_lms_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_courses_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_lms_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_certificates ENABLE ROW LEVEL SECURITY;

-- Public can view active providers and courses
CREATE POLICY "Public can view active providers"
  ON partner_lms_providers FOR SELECT
  USING (active = true);

CREATE POLICY "Public can view active courses"
  ON partner_courses_catalog FOR SELECT
  USING (is_active = true);

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments"
  ON partner_lms_enrollments FOR SELECT
  USING (auth.uid() = student_id);

-- Students can view their own certificates
CREATE POLICY "Students can view own certificates"
  ON partner_certificates FOR SELECT
  USING (auth.uid() = student_id);

-- Admins can manage everything
CREATE POLICY "Admins can manage providers"
  ON partner_lms_providers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage courses"
  ON partner_courses_catalog FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can manage enrollments"
  ON partner_lms_enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

CREATE POLICY "Admins can manage certificates"
  ON partner_certificates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin', 'staff')
    )
  );

-- =====================================================
-- 8. Create Helper Functions
-- =====================================================

-- Function to get partner course count by provider
CREATE OR REPLACE FUNCTION get_partner_course_count(p_provider_type TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM partner_courses_catalog pc
    JOIN partner_lms_providers pp ON pc.provider_id = pp.id
    WHERE pp.provider_type = p_provider_type
    AND pc.is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get student's partner enrollments
CREATE OR REPLACE FUNCTION get_student_partner_enrollments(p_student_id UUID)
RETURNS TABLE (
  enrollment_id UUID,
  provider_name TEXT,
  course_name TEXT,
  status TEXT,
  progress_percentage NUMERIC,
  enrolled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pe.id,
    pp.provider_name,
    pc.course_name,
    pe.status,
    pe.progress_percentage,
    pe.enrolled_at,
    pe.completed_at
  FROM partner_lms_enrollments pe
  JOIN partner_lms_providers pp ON pe.provider_id = pp.id
  JOIN partner_courses_catalog pc ON pe.course_id = pc.id
  WHERE pe.student_id = p_student_id
  ORDER BY pe.enrolled_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 9. Create Views
-- =====================================================

-- View for active partner courses with provider info
CREATE OR REPLACE VIEW v_active_partner_courses AS
SELECT
  pc.id,
  pc.course_name,
  pc.description,
  pc.category,
  pc.wholesale_price,
  pc.retail_price,
  pc.duration_hours,
  pc.level,
  pp.provider_name,
  pp.provider_type,
  pp.website_url
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
WHERE pc.is_active = true
AND pp.active = true;

-- View for partner enrollment statistics
CREATE OR REPLACE VIEW v_partner_enrollment_stats AS
SELECT
  pp.provider_name,
  pp.provider_type,
  COUNT(DISTINCT pe.student_id) as total_students,
  COUNT(pe.id) as total_enrollments,
  COUNT(CASE WHEN pe.status = 'completed' THEN 1 END) as completed_enrollments,
  COUNT(CASE WHEN pe.status = 'active' THEN 1 END) as active_enrollments,
  AVG(pe.progress_percentage) as avg_progress
FROM partner_lms_providers pp
LEFT JOIN partner_lms_enrollments pe ON pp.id = pe.provider_id
GROUP BY pp.id, pp.provider_name, pp.provider_type;

-- =====================================================
-- 10. Grant Permissions
-- =====================================================

GRANT SELECT ON v_active_partner_courses TO authenticated;
GRANT SELECT ON v_partner_enrollment_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_partner_course_count(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_student_partner_enrollments(UUID) TO authenticated;
