-- SIMPLE ENROLLMENT FIX
-- Works regardless of column names

-- Step 1: See what users exist
SELECT id, email FROM auth.users LIMIT 5;

-- Step 2: See what courses exist (without filtering)
SELECT id, title FROM courses LIMIT 5;

-- Step 3: Create enrollment (replace the UUIDs with actual values from above)
INSERT INTO enrollments (
  user_id,
  course_id,
  status,
  progress,
  enrolled_at
) VALUES (
  'PASTE_USER_ID_HERE',
  'PASTE_COURSE_ID_HERE',
  'active',
  0,
  NOW()
);

-- Step 4: Verify
SELECT 
  e.*,
  u.email,
  c.title
FROM enrollments e
LEFT JOIN auth.users u ON u.id = e.user_id
LEFT JOIN courses c ON c.id = e.course_id
ORDER BY e.enrolled_at DESC
LIMIT 5;
