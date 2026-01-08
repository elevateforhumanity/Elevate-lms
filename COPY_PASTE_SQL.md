# Copy-Paste SQL Migrations

**Instructions:**
1. Go to Supabase Dashboard → SQL Editor
2. Copy STEP 1 below
3. Paste and run
4. Wait for completion
5. Copy STEP 2 below
6. Paste and run
7. Verify results

---

## STEP 1: Create Partner Tables

**Copy everything below this line:**

```sql
-- STEP 1: Create Partner Tables and Providers
-- Copy and paste this entire block into Supabase SQL Editor

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
```

**After running, verify:**
```sql
SELECT COUNT(*) FROM partner_lms_providers; -- Should return 7
```

---

## STEP 2: Load Partner Courses

**Copy everything below this line:**

```sql
-- STEP 2: Load Partner Courses
-- Copy and paste this entire block into Supabase SQL Editor

DO $$
DECLARE
  certiport_id UUID;
  hsi_id UUID;
  jri_id UUID;
  nrf_id UUID;
  careersafe_id UUID;
  milady_id UUID;
  nds_id UUID;
BEGIN
  SELECT id INTO certiport_id FROM partner_lms_providers WHERE provider_type = 'certiport';
  SELECT id INTO hsi_id FROM partner_lms_providers WHERE provider_type = 'hsi';
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  SELECT id INTO careersafe_id FROM partner_lms_providers WHERE provider_type = 'careersafe';
  SELECT id INTO milady_id FROM partner_lms_providers WHERE provider_type = 'milady';
  SELECT id INTO nds_id FROM partner_lms_providers WHERE provider_type = 'nds';

  IF certiport_id IS NULL THEN
    RAISE EXCEPTION 'Run STEP 1 first!';
  END IF;

  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (certiport_id, 'MOS: Word Associate (Office 2019)', 'Fundamental Word skills', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: Excel Associate (Office 2019)', 'Core Excel skills', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: PowerPoint (Office 2019)', 'Professional presentations', 'Microsoft Office', 117, 164, 30, true),
  (certiport_id, 'Adobe Photoshop', 'Photo editing', 'Adobe Creative', 150, 210, 60, true),
  (certiport_id, 'IC3 Digital Literacy', 'Computer fundamentals', 'Digital Literacy', 117, 164, 30, true),
  (hsi_id, 'CPR/AED for Adults', 'Adult CPR training', 'Health & Safety', 45, 65, 4, true),
  (hsi_id, 'First Aid Basics', 'Essential first aid', 'Health & Safety', 45, 65, 4, true),
  (hsi_id, 'OSHA 10-Hour General Industry', 'OSHA safety training', 'OSHA Training', 85, 120, 10, true),
  (careersafe_id, 'OSHA 10-Hour Construction', 'Construction safety', 'OSHA Training', 85, 120, 10, true),
  (careersafe_id, 'Workplace Safety', 'General safety', 'Health & Safety', 55, 80, 6, true),
  (nrf_id, 'Customer Service & Sales', 'Retail customer service', 'Retail', 75, 105, 20, true),
  (nrf_id, 'Retail Management', 'Store management', 'Retail', 95, 135, 30, true),
  (milady_id, 'Cosmetology Fundamentals', 'Basic cosmetology', 'Beauty & Wellness', 195, 275, 100, true),
  (milady_id, 'Barbering Fundamentals', 'Basic barbering', 'Beauty & Wellness', 195, 275, 100, true),
  (jri_id, 'Job Readiness Skills', 'Employment preparation', 'Workforce Development', 65, 95, 20, true),
  (jri_id, 'Financial Literacy', 'Personal finance', 'Workforce Development', 55, 80, 15, true),
  (nds_id, 'Defensive Driving', 'Defensive driving', 'Driver Safety', 45, 65, 6, true),
  (nds_id, 'Commercial Driver Safety', 'Commercial driving', 'Driver Safety', 65, 95, 10, true);

  RAISE NOTICE 'Loaded % courses', (SELECT COUNT(*) FROM partner_courses_catalog);
END $$;
```

**After running, verify:**
```sql
SELECT COUNT(*) FROM partner_courses_catalog; -- Should return 18+
SELECT provider_name, COUNT(*) FROM partner_courses_catalog 
JOIN partner_lms_providers ON provider_id = partner_lms_providers.id 
GROUP BY provider_name;
```

---

## Verification Queries

**Check everything worked:**

```sql
-- Check providers
SELECT * FROM partner_lms_providers ORDER BY provider_name;

-- Check courses by provider
SELECT 
  pp.provider_name,
  COUNT(*) as course_count
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
GROUP BY pp.provider_name
ORDER BY course_count DESC;

-- View sample courses
SELECT 
  pp.provider_name,
  pc.course_name,
  pc.category,
  pc.retail_price
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
LIMIT 10;
```

---

## Done!

✅ Partner tables created  
✅ 7 providers loaded  
✅ 18+ sample courses loaded  
✅ Ready to use

**Next:** See TEST_PORTALS_COMPLETE_GUIDE.md to test portals
