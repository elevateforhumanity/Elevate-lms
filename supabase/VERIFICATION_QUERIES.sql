-- =============================================
-- Supabase Migration Verification Queries
-- Run these in Supabase SQL Editor after applying migrations
-- =============================================

-- 1. Check all tables exist
SELECT 
  'programs' as table_name,
  CASE WHEN to_regclass('programs') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status
UNION ALL
SELECT 'courses', CASE WHEN to_regclass('courses') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'lessons', CASE WHEN to_regclass('lessons') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'enrollments', CASE WHEN to_regclass('enrollments') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'lesson_progress', CASE WHEN to_regclass('lesson_progress') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'certificates', CASE WHEN to_regclass('certificates') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'instructor_certificates', CASE WHEN to_regclass('instructor_certificates') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'analytics_events', CASE WHEN to_regclass('analytics_events') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'page_views', CASE WHEN to_regclass('page_views') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'automation_workflows', CASE WHEN to_regclass('automation_workflows') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'automation_executions', CASE WHEN to_regclass('automation_executions') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'generated_content', CASE WHEN to_regclass('generated_content') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'scholarship_applications', CASE WHEN to_regclass('scholarship_applications') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'scholarship_reviews', CASE WHEN to_regclass('scholarship_reviews') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'stripe_accounts', CASE WHEN to_regclass('stripe_accounts') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END
UNION ALL
SELECT 'stripe_splits', CASE WHEN to_regclass('stripe_splits') IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END;

-- 2. Check RLS is enabled on all tables
SELECT 
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN '✅ ENABLED' ELSE '❌ DISABLED' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'programs', 'courses', 'lessons', 'enrollments', 'lesson_progress', 'certificates',
    'instructor_certificates', 'analytics_events', 'page_views',
    'automation_workflows', 'automation_executions', 'generated_content',
    'scholarship_applications', 'scholarship_reviews',
    'stripe_accounts', 'stripe_splits'
  )
ORDER BY tablename;

-- 3. Count RLS policies per table
SELECT 
  schemaname,
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- 4. List all RLS policies (detailed)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 5. Check indexes exist
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN (
    'programs', 'courses', 'lessons', 'enrollments', 'lesson_progress', 'certificates',
    'instructor_certificates', 'analytics_events', 'page_views',
    'automation_workflows', 'automation_executions', 'generated_content',
    'scholarship_applications', 'scholarship_reviews',
    'stripe_accounts', 'stripe_splits'
  )
ORDER BY tablename, indexname;

-- 6. Check foreign key constraints
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 7. Check triggers exist
SELECT 
  trigger_schema,
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- 8. Check functions exist
SELECT 
  routine_schema,
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE '%updated_at%'
ORDER BY routine_name;

-- 9. Quick health check (all-in-one)
DO $$
DECLARE
  missing_tables int := 0;
  missing_rls int := 0;
  missing_policies int := 0;
  table_name text;
  tables_to_check text[] := ARRAY[
    'programs', 'courses', 'lessons', 'enrollments', 'lesson_progress', 'certificates',
    'instructor_certificates', 'analytics_events', 'page_views',
    'automation_workflows', 'automation_executions', 'generated_content',
    'scholarship_applications', 'scholarship_reviews',
    'stripe_accounts', 'stripe_splits'
  ];
BEGIN
  -- Check tables exist
  FOREACH table_name IN ARRAY tables_to_check
  LOOP
    IF to_regclass(table_name) IS NULL THEN
      RAISE WARNING 'Missing table: %', table_name;
      missing_tables := missing_tables + 1;
    END IF;
  END LOOP;
  
  -- Check RLS enabled
  SELECT COUNT(*) INTO missing_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename = ANY(tables_to_check)
    AND NOT rowsecurity;
  
  -- Check policies exist
  SELECT COUNT(DISTINCT tablename) INTO missing_policies
  FROM pg_tables t
  WHERE t.schemaname = 'public'
    AND t.tablename = ANY(tables_to_check)
    AND NOT EXISTS (
      SELECT 1 FROM pg_policies p
      WHERE p.schemaname = t.schemaname
        AND p.tablename = t.tablename
    );
  
  -- Report
  RAISE NOTICE '===========================================';
  RAISE NOTICE 'SUPABASE MIGRATION HEALTH CHECK';
  RAISE NOTICE '===========================================';
  RAISE NOTICE '';
  
  IF missing_tables = 0 THEN
    RAISE NOTICE '✅ All 16 tables exist';
  ELSE
    RAISE WARNING '❌ Missing % tables', missing_tables;
  END IF;
  
  IF missing_rls = 0 THEN
    RAISE NOTICE '✅ RLS enabled on all tables';
  ELSE
    RAISE WARNING '❌ RLS disabled on % tables', missing_rls;
  END IF;
  
  IF missing_policies = 0 THEN
    RAISE NOTICE '✅ All tables have RLS policies';
  ELSE
    RAISE WARNING '❌ % tables missing RLS policies', missing_policies;
  END IF;
  
  RAISE NOTICE '';
  
  IF missing_tables = 0 AND missing_rls = 0 AND missing_policies = 0 THEN
    RAISE NOTICE '🎉 ALL CHECKS PASSED! Your LMS database is ready!';
  ELSE
    RAISE WARNING '⚠️  Some checks failed. Review warnings above.';
  END IF;
  
  RAISE NOTICE '===========================================';
END$$;

-- 10. Sample data test (optional - run after adding content)
-- Uncomment to test with sample data

/*
-- Insert test program
INSERT INTO programs (slug, title, track, blurb, hours, cover_url)
VALUES (
  'test-program',
  'Test Program',
  'Testing',
  'This is a test program',
  '1 hour',
  'https://via.placeholder.com/800x400'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert test course
INSERT INTO courses (program_id, code, title, summary, cover_url)
SELECT 
  id,
  'TEST101',
  'Test Course',
  'This is a test course',
  'https://via.placeholder.com/800x400'
FROM programs
WHERE slug = 'test-program'
ON CONFLICT DO NOTHING;

-- Insert test lesson
INSERT INTO lessons (course_id, idx, title, video_url, html)
SELECT 
  id,
  1,
  'Test Lesson',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  '<h2>Test Lesson</h2><p>This is a test lesson.</p>'
FROM courses
WHERE code = 'TEST101'
ON CONFLICT DO NOTHING;

-- Verify test data
SELECT 'Test data inserted successfully' as status;
SELECT * FROM programs WHERE slug = 'test-program';
SELECT * FROM courses WHERE code = 'TEST101';
SELECT * FROM lessons WHERE course_id IN (SELECT id FROM courses WHERE code = 'TEST101');
*/
