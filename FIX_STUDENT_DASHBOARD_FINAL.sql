-- FIX STUDENT DASHBOARD - FINAL SOLUTION
-- The dashboard looks at 'enrollments' table, not 'partner_lms_enrollments'

-- Step 1: Check what columns enrollments table has
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- We know it has: id, user_id, course_id, status, progress, enrolled_at, completed_at

-- Step 2: Insert into the regular enrollments table
INSERT INTO enrollments 
(user_id, course_id, status, progress, enrolled_at) 
VALUES 
('52946462-d9ec-4717-a9dc-35e44135f08b', 'dcad942d-2872-4b50-8cf5-62345bad03ef', 'active', 0, NOW());

-- Step 3: Verify
SELECT 
  e.id,
  e.status,
  e.progress,
  u.email as student,
  c.course_name
FROM enrollments e
LEFT JOIN auth.users u ON u.id = e.user_id
LEFT JOIN partner_lms_courses c ON c.id = e.course_id
WHERE e.user_id = '52946462-d9ec-4717-a9dc-35e44135f08b';
