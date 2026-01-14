# Admin Access - How It Actually Works

## The Issue

The `/admin/login` page redirects to `/login` - this is **by design**, not a bug.

## How To Access Admin Dashboard

### Step 1: Login via Regular Login Page
Go to: **https://www.elevateforhumanity.org/login**

(NOT `/admin/login`)

### Step 2: Make Sure You Have Admin Role

**Check your role in Supabase:**

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

2. Run this query:
```sql
-- Check your role
SELECT 
  u.email,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'YOUR_EMAIL_HERE';
```

3. If role is NOT `admin` or `super_admin`, update it:
```sql
-- Set yourself as admin
UPDATE profiles 
SET role = 'super_admin'
WHERE email = 'YOUR_EMAIL_HERE';
```

### Step 3: Access Admin Dashboard

After logging in with admin role:
- Go to: **https://www.elevateforhumanity.org/admin**
- Should work now!

---

## Quick Setup (First Time)

### 1. Create Your Admin Account

**Option A: Via Signup Page**
1. Go to: https://www.elevateforhumanity.org/signup
2. Create account with your email
3. Verify email
4. Continue to step 2

**Option B: Via Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
2. Click "Add user" → "Create new user"
3. Enter email and password
4. Click "Create user"
5. Continue to step 2

### 2. Set Admin Role

Run in Supabase SQL Editor:
```sql
-- Replace with your email
UPDATE profiles 
SET role = 'super_admin',
    full_name = 'Your Name'
WHERE email = 'your@email.com';

-- Verify
SELECT email, role, full_name 
FROM profiles 
WHERE email = 'your@email.com';
```

### 3. Login and Access

1. Go to: https://www.elevateforhumanity.org/login
2. Login with your credentials
3. Go to: https://www.elevateforhumanity.org/admin
4. ✅ Admin dashboard should load!

---

## Why This Design?

The system uses **one login page** for everyone:
- Students login at `/login` → go to `/lms/dashboard`
- Admins login at `/login` → go to `/admin`
- The system checks your role and routes you accordingly

**Benefits:**
- Single authentication flow
- Consistent user experience
- Easier to maintain

---

## Troubleshooting

### "Redirecting to /admin/login" loop

**Solution:** Don't use `/admin/login` - use `/login` instead

### "Unauthorized" after login

**Solution:** Your role is not admin. Run:
```sql
UPDATE profiles SET role = 'super_admin' WHERE email = 'your@email.com';
```

### "Profile not found"

**Solution:** Create profile:
```sql
INSERT INTO profiles (id, email, role, full_name)
SELECT id, email, 'super_admin', 'Your Name'
FROM auth.users 
WHERE email = 'your@email.com'
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
```

### Admin dashboard loads but is empty

**This is normal if:**
- No students enrolled yet
- No recent activity
- Fresh database

**Check data exists:**
```sql
SELECT 
  'Programs' as item, COUNT(*)::text as count FROM programs
UNION ALL
SELECT 'Courses', COUNT(*)::text FROM partner_lms_courses
UNION ALL
SELECT 'Students', COUNT(*)::text FROM profiles WHERE role = 'student'
UNION ALL
SELECT 'Enrollments', COUNT(*)::text FROM enrollments;
```

---

## Student Dashboard Issue

### Student sees empty/blank dashboard

**Cause:** Student has no enrollments

**Solution:** Create test enrollment:

```sql
-- Get student ID
SELECT id, email FROM profiles WHERE role = 'student' LIMIT 1;

-- Get program ID  
SELECT id, name FROM programs WHERE is_active = true LIMIT 1;

-- Create enrollment
INSERT INTO enrollments (
  student_id,
  program_id,
  status,
  enrollment_method,
  funding_source
) VALUES (
  '[student_id_from_above]',
  '[program_id_from_above]',
  'active',
  'workforce',
  'Test'
);
```

**Then student dashboard will show:**
- Enrolled program
- Course list
- Progress tracking

---

## Complete Test Flow

### 1. Create Admin (You)
```sql
-- Set your account as admin
UPDATE profiles 
SET role = 'super_admin', full_name = 'Admin User'
WHERE email = 'your@email.com';
```

### 2. Create Test Student
```sql
-- Create via signup page OR set existing user:
UPDATE profiles 
SET role = 'student', full_name = 'Test Student'
WHERE email = 'test@www.elevateforhumanity.org';
```

### 3. Create Test Enrollment
```sql
INSERT INTO enrollments (student_id, program_id, status, enrollment_method)
VALUES (
  (SELECT id FROM profiles WHERE email = 'test@www.elevateforhumanity.org'),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active',
  'workforce'
);
```

### 4. Test Both Dashboards

**Admin:**
1. Login: https://www.elevateforhumanity.org/login
2. Email: your@email.com
3. Go to: https://www.elevateforhumanity.org/admin
4. ✅ Should see admin dashboard with stats

**Student:**
1. Login: https://www.elevateforhumanity.org/login
2. Email: test@www.elevateforhumanity.org
3. Go to: https://www.elevateforhumanity.org/lms/dashboard
4. ✅ Should see enrolled program

---

## Key URLs

- **Login (for everyone):** https://www.elevateforhumanity.org/login
- **Admin Dashboard:** https://www.elevateforhumanity.org/admin
- **Student Dashboard:** https://www.elevateforhumanity.org/lms/dashboard
- **Programs Page:** https://www.elevateforhumanity.org/programs
- **Supabase Auth:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
- **Supabase SQL:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

---

## Summary

✅ **Use `/login` for everyone** (not `/admin/login`)
✅ **Set role to `super_admin`** in profiles table
✅ **Create enrollments** for students to see data
✅ **Access admin at `/admin`** after logging in

**The system works - just use the right login page!**
