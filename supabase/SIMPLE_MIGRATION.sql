-- Simple Course Migration
-- Just the essential data to activate courses

-- Clear any existing data (optional)
-- DELETE FROM programs;
-- DELETE FROM courses;

-- Insert 16 Programs
INSERT INTO programs (slug, title, tagline, summary, description, bullets, funding, duration_hours, status)
VALUES
('business-startup', 'Business Start-Up Program', 'Launch your business', 'Learn entrepreneurship and business planning', 'Complete business startup program', ARRAY['5-week program', 'LLC formation', 'Digital marketing'], ARRAY['WIOA', 'WRG'], 32, 'published'),
('hvac-tech', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'Comprehensive HVAC training', ARRAY['EPA 608', 'OSHA 10', 'Hands-on training'], ARRAY['WIOA', 'WRG'], 600, 'published'),
('medical-assistant', 'Medical Assistant', 'Healthcare career training', '720-hour medical assistant program', 'Clinical and administrative training', ARRAY['Clinical skills', 'Medical terminology', 'Externship'], ARRAY['WIOA', 'WRG'], 720, 'published'),
('barber-apprentice', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'State-registered barber training', ARRAY['DOL registered', 'Paid training', 'State license'], ARRAY['WIOA', 'Apprenticeship'], 1500, 'published'),
('dsp-training', 'Direct Support Professional', 'Support individuals with disabilities', '120-hour DSP certification', 'DSP training program', ARRAY['DSP cert', 'CPR/First Aid', 'Field placement'], ARRAY['WIOA', 'WRG'], 120, 'published'),
('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'Complete esthetician training', ARRAY['State license', 'Skincare', 'Facials'], ARRAY['WIOA', 'WRG'], 700, 'published'),
('tax-prep', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'Tax preparation training', ARRAY['IRS PTIN', 'Tax software', 'Client service'], ARRAY['WIOA', 'WRG'], 80, 'published'),
('reentry-specialist', 'Reentry Specialist', 'Support justice-involved', '160-hour reentry program', 'Reentry specialist training', ARRAY['Case management', 'Resources', 'Trauma care'], ARRAY['WIOA', 'JRI'], 160, 'published'),
('beauty-educator', 'Beauty Educator', 'Train beauty professionals', '240-hour educator program', 'Beauty educator training', ARRAY['Instructional design', 'Curriculum', 'Assessment'], ARRAY['WIOA', 'WRG'], 240, 'published'),
('peer-support', 'Peer Support Professional', 'Support in recovery', '80-hour peer support program', 'Peer support training', ARRAY['Recovery principles', 'Active listening', 'Resources'], ARRAY['WIOA', 'WRG'], 80, 'published'),
('recovery-coach', 'Recovery Coach', 'Guide recovery journey', '80-hour recovery coach program', 'Recovery coach training', ARRAY['Motivational interviewing', 'Recovery planning', 'Prevention'], ARRAY['WIOA', 'WRG'], 80, 'published'),
('cpr-cert', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'CPR and First Aid', ARRAY['AHA certified', 'CPR/AED', 'First Aid'], ARRAY['WIOA', 'WRG'], 8, 'published'),
('chw-cert', 'Community Healthcare Worker', 'Bridge healthcare gaps', '160-hour CHW program', 'Community health worker training', ARRAY['Health education', 'Navigation', 'Outreach'], ARRAY['WIOA', 'WRG'], 160, 'published'),
('health-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'Safety and emergency response', ARRAY['CPR/AED', 'First Aid', 'OSHA 10'], ARRAY['WIOA', 'WRG'], 40, 'published'),
('nrf-riseup', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'Retail industry training', ARRAY['Customer service', 'Retail ops', 'NRF cert'], ARRAY['WIOA', 'WRG'], 40, 'published'),
('jri-series', 'JRI Complete Series', 'Justice reinvestment', '120-hour JRI program', 'JRI training series', ARRAY['Life skills', 'Employment', 'Reentry'], ARRAY['WIOA', 'JRI'], 120, 'published')
ON CONFLICT (slug) DO NOTHING;

-- Insert 17 Courses (matching programs + 1 extra)
INSERT INTO courses (slug, title, subtitle, description, level, duration_hours, status, is_free)
VALUES
('business-startup', 'Business Start-Up Program', 'Launch your business', 'Learn entrepreneurship and business planning', 'beginner', 32, 'published', true),
('hvac-tech', 'HVAC Technician', 'Master HVAC systems', '600-hour HVAC training program', 'beginner', 600, 'published', true),
('medical-assistant', 'Medical Assistant', 'Healthcare career training', '720-hour medical assistant program', 'beginner', 720, 'published', true),
('barber-apprentice', 'Barber Apprenticeship', 'Earn while you learn', '1500-hour DOL apprenticeship', 'beginner', 1500, 'published', true),
('dsp-training', 'Direct Support Professional', 'Support individuals', '120-hour DSP certification', 'beginner', 120, 'published', true),
('esthetician', 'Professional Esthetician', 'Skincare specialist', '700-hour esthetician program', 'beginner', 700, 'published', true),
('tax-prep', 'Tax Preparation', 'Become a tax preparer', '80-hour tax prep program', 'beginner', 80, 'published', true),
('reentry-specialist', 'Reentry Specialist', 'Support justice-involved', '160-hour reentry program', 'beginner', 160, 'published', true),
('beauty-educator', 'Beauty Educator', 'Train professionals', '240-hour educator program', 'intermediate', 240, 'published', true),
('peer-support', 'Peer Support Professional', 'Support in recovery', '80-hour peer support program', 'beginner', 80, 'published', true),
('recovery-coach', 'Recovery Coach', 'Guide recovery', '80-hour recovery coach program', 'beginner', 80, 'published', true),
('cpr-cert', 'CPR Certification', 'Life-saving skills', '8-hour CPR training', 'beginner', 8, 'published', true),
('chw-cert', 'Community Healthcare Worker', 'Bridge healthcare', '160-hour CHW program', 'beginner', 160, 'published', true),
('health-safety', 'Emergency Health & Safety', 'Workplace safety', '40-hour safety program', 'beginner', 40, 'published', true),
('nrf-riseup', 'NRF Rise Up', 'Retail fundamentals', '40-hour retail program', 'beginner', 40, 'published', true),
('jri-series', 'JRI Complete Series', 'Justice reinvestment', '120-hour JRI program', 'beginner', 120, 'published', true),
('rise-up-extra', 'Rise Up Certificate', 'Additional certification', '40-hour certificate program', 'beginner', 40, 'published', true)
ON CONFLICT (slug) DO NOTHING;

-- Verify
SELECT 'Programs created:' as status, COUNT(*) as count FROM programs;
SELECT 'Courses created:' as status, COUNT(*) as count FROM courses;
