-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  level TEXT DEFAULT 'beginner',
  duration_hours INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);

-- Insert 17 courses
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours, status, is_free) VALUES
('hvac-technician', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'beginner', 600, 'published', true),
('barber-apprenticeship', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'beginner', 1500, 'published', true),
('medical-assistant', 'Medical Assistant', 'Healthcare career', '720-hour medical assistant program', 'beginner', 720, 'published', true),
('business-startup', 'Business Start-Up', 'Launch your business', 'Business entrepreneurship program', 'beginner', 32, 'published', true),
('dsp-training', 'Direct Support Professional', 'Support individuals', '120-hour DSP certification', 'beginner', 120, 'published', true),
('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'beginner', 700, 'published', true),
('tax-preparation', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'beginner', 80, 'published', true),
('reentry-specialist', 'Reentry Specialist', 'Support justice-involved', '160-hour reentry program', 'beginner', 160, 'published', true),
('beauty-educator', 'Beauty Educator', 'Train professionals', '240-hour educator program', 'intermediate', 240, 'published', true),
('peer-support', 'Peer Support Professional', 'Support in recovery', '80-hour peer support program', 'beginner', 80, 'published', true),
('recovery-coach', 'Recovery Coach', 'Guide recovery', '80-hour recovery coach program', 'beginner', 80, 'published', true),
('cpr-certification', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'beginner', 8, 'published', true),
('community-health-worker', 'Community Healthcare Worker', 'Bridge healthcare', '160-hour CHW program', 'beginner', 160, 'published', true),
('emergency-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'beginner', 40, 'published', true),
('nrf-rise-up', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'beginner', 40, 'published', true),
('jri-series', 'JRI Complete Series', 'Justice reinvestment', '120-hour JRI program', 'beginner', 120, 'published', true),
('rise-up-certificate', 'Rise Up Certificate', 'Additional certification', '40-hour certificate program', 'beginner', 40, 'published', true)
ON CONFLICT (slug) DO NOTHING;

-- Verify
SELECT 'Courses created:' as status, COUNT(*) as count FROM courses;
