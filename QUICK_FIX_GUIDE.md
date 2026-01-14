# Quick Fix Guide - Admin & Student Access

## Issue 1: Admin Dashboard Not Working

**Problem:** `/admin` redirects to `/admin/login` which redirects back (loop)

**Root Cause:** No admin user exists OR admin login page doesn't exist

### Solution A: Create Admin User via Supabase

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
2. Click "Add user" → "Create new user"
3. Email: `admin@www.elevateforhumanity.org`
4. Password: (set a secure password)
5. Click "Create user"

6. **Set admin role:**
   - Go to SQL Editor: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
   - Run:
   ```sql
   -- Get the user ID
   SELECT id, email FROM auth.users WHERE email = 'admin@www.elevateforhumanity.org';
   
   -- Create/update profile with admin role
   INSERT INTO profiles (id, email, role, full_name)
   VALUES (
     '[user_id_from_above]',
     'admin@www.elevateforhumanity.org',
     'super_admin',
     'Admin User'
   )
   ON CONFLICT (id) 
   DO UPDATE SET role = 'super_admin';
   ```

7. **Test:**
   - Go to: https://www.elevateforhumanity.org/login
   - Login with admin credentials
   - Go to: https://www.elevateforhumanity.org/admin
   - Should work now!

### Solution B: Use Regular Login

The admin dashboard requires authentication. Use the regular login:

1. Go to: https://www.elevateforhumanity.org/login
2. Login with your account
3. If you have admin role, you'll see admin features
4. If not, update your role in database (see Solution A step 6)

---

## Issue 2: Student Enrollment Shows Empty Dashboard

**Problem:** Student logs in but sees empty/blank dashboard

**Root Cause:** Student has no enrollments yet

### Solution: Create Test Enrollment

**Option 1: Via SQL (Fastest)**

```sql
-- 1. Get student user ID
SELECT id, email FROM auth.users WHERE email = 'test@www.elevateforhumanity.org';

-- 2. Get a program ID
SELECT id, name, cost FROM programs WHERE is_active = true LIMIT 5;

-- 3. Create enrollment
INSERT INTO enrollments (
  student_id,
  program_id,
  status,
  enrollment_method,
  funding_source,
  enrolled_at
) VALUES (
  '[student_id_from_step_1]',
  '[program_id_from_step_2]',
  'active',
  'workforce',
  'Test',
  NOW()
);

-- 4. Verify
SELECT 
  e.id,
  e.status,
  p.name as program_name
FROM enrollments e
JOIN programs p ON p.id = e.program_id
WHERE e.student_id = '[student_id]';
```

**Option 2: Via Admin Dashboard (Once Admin Works)**

1. Login as admin
2. Go to: `/admin/enrollments` or `/admin/students`
3. Find student
4. Click "Enroll in Program"
5. Select program
6. Submit

**Option 3: Via Enrollment Page**

1. Go to: https://www.elevateforhumanity.org/programs
2. Browse programs
3. Click "Enroll Now"
4. Complete enrollment form
5. Process payment (or skip if testing)

---

## Issue 3: Admin Login Page Missing

**Problem:** `/admin/login` redirects back to itself

**Check if page exists:**

```bash
ls app/admin/login/
```

**If missing, use regular login:**
- Go to: https://www.elevateforhumanity.org/login
- Login with admin credentials
- Navigate to: https://www.elevateforhumanity.org/admin

---

## Quick Test Flow

### 1. Create Admin User (5 min)

```sql
-- In Supabase SQL Editor
-- First, create user via Supabase Auth UI, then:

INSERT INTO profiles (id, email, role, full_name)
SELECT 
  id,
  email,
  'super_admin',
  'Admin User'
FROM auth.users 
WHERE email = 'admin@www.elevateforhumanity.org'
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
```

### 2. Create Test Student (5 min)

```sql
-- Create via signup page OR via SQL:
INSERT INTO profiles (id, email, role, full_name)
SELECT 
  id,
  email,
  'student',
  'Test Student'
FROM auth.users 
WHERE email = 'test@www.elevateforhumanity.org'
ON CONFLICT (id) DO UPDATE SET role = 'student';
```

### 3. Create Test Enrollment (2 min)

```sql
-- Get IDs
SELECT id FROM auth.users WHERE email = 'test@www.elevateforhumanity.org';
SELECT id, name FROM programs WHERE is_active = true LIMIT 1;

-- Create enrollment
INSERT INTO enrollments (student_id, program_id, status, enrollment_method)
VALUES ('[student_id]', '[program_id]', 'active', 'workforce');
```

### 4. Test Access

**Admin:**
- Login: https://www.elevateforhumanity.org/login
- Email: admin@www.elevateforhumanity.org
- Go to: https://www.elevateforhumanity.org/admin
- Should see admin dashboard

**Student:**
- Login: https://www.elevateforhumanity.org/login
- Email: test@www.elevateforhumanity.org
- Go to: https://www.elevateforhumanity.org/lms/dashboard
- Should see enrolled program

---

## Common Issues

### "Permission denied" when accessing admin

**Fix:**
```sql
UPDATE profiles 
SET role = 'super_admin' 
WHERE email = 'your@email.com';
```

### "No enrollments found" in student dashboard

**Fix:**
```sql
-- Create test enrollment
INSERT INTO enrollments (student_id, program_id, status)
SELECT 
  (SELECT id FROM profiles WHERE email = 'student@email.com'),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active';
```

### Admin dashboard shows but is empty

**This is normal if:**
- No students enrolled yet
- No programs created yet
- No activity in system

**Check data:**
```sql
SELECT 'Students' as metric, COUNT(*) as count FROM profiles WHERE role = 'student'
UNION ALL
SELECT 'Programs', COUNT(*) FROM programs WHERE is_active = true
UNION ALL
SELECT 'Enrollments', COUNT(*) FROM enrollments
UNION ALL
SELECT 'Courses', COUNT(*) FROM partner_lms_courses WHERE active = true;
```

---

## Alternative: Use Programs Page

Instead of admin dashboard, use the programs page:

1. Go to: https://www.elevateforhumanity.org/programs
2. Browse 53 available programs
3. Click any program to view details
4. Enroll students from there

---

## Quick Commands Reference

### Create Admin
```sql
INSERT INTO profiles (id, email, role, full_name)
SELECT id, email, 'super_admin', 'Admin'
FROM auth.users WHERE email = 'admin@www.elevateforhumanity.org'
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
```

### Create Student
```sql
INSERT INTO profiles (id, email, role, full_name)
SELECT id, email, 'student', 'Test Student'
FROM auth.users WHERE email = 'test@www.elevateforhumanity.org'
ON CONFLICT (id) DO UPDATE SET role = 'student';
```

### Create Enrollment
```sql
INSERT INTO enrollments (student_id, program_id, status, enrollment_method)
VALUES (
  (SELECT id FROM profiles WHERE email = 'test@www.elevateforhumanity.org'),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active',
  'workforce'
);
```

### Check User Role
```sql
SELECT 
  u.email,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email IN ('admin@www.elevateforhumanity.org', 'test@www.elevateforhumanity.org');
```

---

## Next Steps

1. **Create admin user** (Solution A above)
2. **Login as admin** via /login
3. **Access admin dashboard** at /admin
4. **Create test student enrollment** (Solution for Issue 2)
5. **Test student dashboard** at /lms/dashboard

---

## Support URLs

- **Supabase Auth:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
- **Supabase SQL:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
- **Login:** https://www.elevateforhumanity.org/login
- **Admin:** https://www.elevateforhumanity.org/admin
- **Student:** https://www.elevateforhumanity.org/lms/dashboard

---

**TL;DR:**
1. Create admin user in Supabase Auth
2. Set role to 'super_admin' in profiles table
3. Login via /login (not /admin/login)
4. Create test enrollment for students
5. Test both dashboards
