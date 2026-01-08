-- =====================================================
-- VERIFICATION QUERIES
-- Run these after Step 1 and Step 2 to verify everything worked
-- =====================================================

-- Check providers (should return 7)
SELECT COUNT(*) as provider_count FROM partner_lms_providers;

-- List all providers
SELECT 
  provider_name,
  provider_type,
  active
FROM partner_lms_providers
ORDER BY provider_name;

-- Check courses (should return 64+)
SELECT COUNT(*) as total_courses FROM partner_courses_catalog;

-- Count courses by provider
SELECT 
  pp.provider_name,
  COUNT(*) as course_count
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
WHERE pc.is_active = true
GROUP BY pp.provider_name
ORDER BY course_count DESC;

-- View sample courses
SELECT 
  pp.provider_name,
  pc.course_name,
  pc.category,
  pc.retail_price,
  pc.duration_hours
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
WHERE pc.is_active = true
ORDER BY pp.provider_name, pc.course_name
LIMIT 20;

-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'partner%'
ORDER BY table_name;

-- Check RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE 'partner%';
