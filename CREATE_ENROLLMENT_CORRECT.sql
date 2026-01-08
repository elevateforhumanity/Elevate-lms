-- CORRECT ENROLLMENT INSERT
-- Based on actual schema: user_id, course_id (not program_id)

-- Step 1: Get a student user
SELECT id, email FROM auth.users LIMIT 5;

-- Step 2: Get a course (not program)
SELECT id, title FROM courses WHERE is_published = true LIMIT 5;

-- Step 3: Create enrollment with actual column names
INSERT INTO enrollments (
  user_id,
  course_id,
  status,
  progress,
  enrolled_at
)
SELECT 
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM courses WHERE is_published = true LIMIT 1),
  'active',
  0,
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM enrollments 
  WHERE user_id = (SELECT id FROM auth.users LIMIT 1)
);

-- Step 4: Verify it worked
SELECT 
  e.id,
  e.status,
  e.progress,
  u.email as student_email,
  c.title as course_title
FROM enrollments e
LEFT JOIN auth.users u ON u.id = e.user_id
LEFT JOIN courses c ON c.id = e.course_id
ORDER BY e.enrolled_at DESC
LIMIT 5;
