-- =====================================================
-- STEP 1: CREATE PARTNER TABLES AND PROVIDERS
-- Copy this entire file and paste into Supabase SQL Editor
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS partner_lms_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_name TEXT NOT NULL,
  provider_type TEXT NOT NULL UNIQUE,
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
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_enrollments_student ON partner_lms_enrollments (student_id);
CREATE INDEX IF NOT EXISTS idx_partner_enrollments_status ON partner_lms_enrollments (status);

CREATE TABLE IF NOT EXISTS partner_certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID NOT NULL REFERENCES partner_lms_enrollments (id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partner_lms_providers (id) ON DELETE RESTRICT,
  certificate_number TEXT,
  certificate_url TEXT,
  issued_date TIMESTAMPTZ NOT NULL,
  expiration_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO partner_lms_providers (provider_name, provider_type, website_url, support_email, active)
VALUES
  ('Certiport', 'certiport', 'https://certiport.pearsonvue.com', 'support@certiport.com', true),
  ('Health & Safety Institute', 'hsi', 'https://www.hsi.com', 'support@hsi.com', true),
  ('Justice Reinvestment Initiative', 'jri', 'https://www.jri.org', 'support@jri.org', true),
  ('National Retail Federation', 'nrf', 'https://nrf.com', 'support@nrf.com', true),
  ('CareerSafe', 'careersafe', 'https://www.careersafeonline.com', 'support@careersafeonline.com', true),
  ('Milady', 'milady', 'https://www.milady.com', 'support@milady.com', true),
  ('National Driver Safety', 'nds', 'https://www.nds.com', 'support@nds.com', true)
ON CONFLICT (provider_type) DO UPDATE SET
  provider_name = EXCLUDED.provider_name,
  updated_at = NOW();

ALTER TABLE partner_lms_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_courses_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_lms_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active providers" ON partner_lms_providers FOR SELECT USING (active = true);
CREATE POLICY "Public can view active courses" ON partner_courses_catalog FOR SELECT USING (is_active = true);
CREATE POLICY "Students view own enrollments" ON partner_lms_enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students view own certificates" ON partner_certificates FOR SELECT USING (auth.uid() = student_id);
