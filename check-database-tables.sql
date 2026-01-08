-- Check existing tables before running migrations
-- Run this in Supabase SQL Editor to verify what exists

-- 1. Check if partner tables exist
SELECT 
  table_name,
  CASE 
    WHEN table_name IN ('partner_lms_providers', 'partner_courses_catalog', 'partner_lms_enrollments', 'partner_certificates') 
    THEN '⚠️  EXISTS - Skip migration'
    ELSE '✅ OK to create'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'partner%'
ORDER BY table_name;

-- 2. Count existing partner courses (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_courses_catalog') THEN
    RAISE NOTICE 'partner_courses_catalog exists with % rows', (SELECT COUNT(*) FROM partner_courses_catalog);
  ELSE
    RAISE NOTICE 'partner_courses_catalog does not exist - safe to create';
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_lms_providers') THEN
    RAISE NOTICE 'partner_lms_providers exists with % rows', (SELECT COUNT(*) FROM partner_lms_providers);
  ELSE
    RAISE NOTICE 'partner_lms_providers does not exist - safe to create';
  END IF;
END $$;

-- 3. Check for any existing partner data
SELECT 
  'partner_lms_providers' as table_name,
  COUNT(*) as row_count
FROM partner_lms_providers
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_lms_providers')

UNION ALL

SELECT 
  'partner_courses_catalog' as table_name,
  COUNT(*) as row_count
FROM partner_courses_catalog
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_courses_catalog')

UNION ALL

SELECT 
  'partner_lms_enrollments' as table_name,
  COUNT(*) as row_count
FROM partner_lms_enrollments
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_lms_enrollments')

UNION ALL

SELECT 
  'partner_certificates' as table_name,
  COUNT(*) as row_count
FROM partner_certificates
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'partner_certificates');

-- 4. Summary
SELECT 
  '========================================' as message
UNION ALL
SELECT 'DATABASE CHECK COMPLETE'
UNION ALL
SELECT '========================================'
UNION ALL
SELECT 'Review results above before running migrations'
UNION ALL
SELECT 'If tables exist, use CREATE TABLE IF NOT EXISTS'
UNION ALL
SELECT 'If data exists, consider backing up first';
