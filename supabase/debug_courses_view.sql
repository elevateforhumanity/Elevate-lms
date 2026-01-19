-- ============================================================================
-- DEBUG: Investigate courses table/view structure
-- Run this in Supabase SQL Editor to understand your schema
-- ============================================================================

-- 1. Check if courses is a table or view
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_name = 'courses' AND table_schema = 'public';

-- 2. If it's a view, get the view definition
SELECT 
  viewname,
  definition 
FROM pg_views 
WHERE viewname = 'courses' AND schemaname = 'public';

-- 3. List all tables that might be the underlying courses table
SELECT table_name, table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (
  table_name LIKE '%course%' 
  OR table_name LIKE '%training%'
)
ORDER BY table_name;

-- 4. Check columns in courses (whether table or view)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'courses' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Check if program_courses has any data
SELECT COUNT(*) as program_courses_count FROM program_courses;

-- 6. Check if partner_enrollments exists
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables 
  WHERE table_name = 'partner_enrollments' AND table_schema = 'public'
) as partner_enrollments_exists;

-- 7. Check if complete_enrollment_payment function exists
SELECT EXISTS (
  SELECT 1 FROM pg_proc 
  WHERE proname = 'complete_enrollment_payment'
) as complete_enrollment_payment_exists;

-- 8. List all enrollment-related tables
SELECT table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%enroll%'
ORDER BY table_name;
