# Complete Activation Plan

**Date:** January 8, 2026  
**Goal:** Activate partner courses and test all portals safely

---

## Prerequisites Check

Before starting, verify:
- [ ] Supabase project exists
- [ ] Have Supabase credentials (URL + keys)
- [ ] Can access Supabase Dashboard
- [ ] Database is backed up (recommended)

---

## Step 1: Check Existing Database Tables

**Purpose:** Verify what tables already exist to avoid duplicates

### Option A: Via Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor**
4. Look for these tables:
   - `partner_lms_providers`
   - `partner_courses_catalog`
   - `partner_lms_enrollments`
   - `partner_certificates`

**If tables exist:**
- ✅ Skip schema migration (Step 2)
- ⚠️  Check if they have data
- 🔄 Go directly to Step 3 (load courses)

**If tables don't exist:**
- ✅ Proceed with Step 2 (create schema)

### Option B: Via SQL Editor

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `check-database-tables.sql`
3. Run the query
4. Review results

---

## Step 2: Create Partner Tables (If Needed)

**Skip this step if tables already exist!**

### Via Supabase Dashboard

1. Go to SQL Editor
2. Copy contents of `supabase/migrations/20260108_activate_partner_courses.sql`
3. Click "Run"
4. Wait for completion
5. Verify in Table Editor

**Expected Result:**
- ✅ 4 new tables created
- ✅ 7 partner providers inserted
- ✅ RLS policies enabled
- ✅ Helper functions created

**If errors occur:**
- Check if tables already exist
- Review error message
- May need to modify migration

---

## Step 3: Load Partner Courses

**This step loads 80+ sample courses**

### Check First: Do courses already exist?

```sql
-- Run in SQL Editor
SELECT COUNT(*) FROM partner_courses_catalog;
```

**If count > 0:**
- ⚠️  Courses already loaded
- ❌ Skip this step to avoid duplicates
- ✅ Go to Step 4

**If count = 0:**
- ✅ Proceed with loading courses

### Load Courses

1. Go to SQL Editor
2. Copy contents of `supabase/migrations/20260108_load_partner_courses.sql`
3. Click "Run"
4. Wait for completion (may take 1-2 minutes)
5. Check output for course counts

**Expected Result:**
```
Certiport courses: 30
HSI courses: 10
CareerSafe courses: 5
NRF courses: 5
Milady courses: 5
JRI courses: 5
NDS courses: 4
Total courses: 80+
```

---

## Step 4: Verify Partner Course Activation

### Check Tables

```sql
-- Run in SQL Editor

-- 1. Check providers
SELECT provider_name, provider_type, active 
FROM partner_lms_providers 
ORDER BY provider_name;

-- Expected: 7 rows

-- 2. Check courses
SELECT 
  pp.provider_name,
  COUNT(*) as course_count
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
WHERE pc.is_active = true
GROUP BY pp.provider_name
ORDER BY course_count DESC;

-- Expected: 7 providers with course counts

-- 3. Check views
SELECT * FROM v_active_partner_courses LIMIT 5;

-- Expected: 5 courses with provider info
```

### Verification Checklist

- [ ] `partner_lms_providers` has 7 rows
- [ ] `partner_courses_catalog` has 80+ rows
- [ ] All providers are active
- [ ] All courses are active
- [ ] Views work correctly
- [ ] Helper functions work

---

## Step 5: Configure Supabase for Local Testing

**Purpose:** Enable authentication for portal testing

### Option A: Pull from Vercel (Easiest)

```bash
# Install Vercel CLI if needed
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local
```

### Option B: Manual Configuration

1. Go to Supabase Dashboard → Settings → API
2. Copy these values:
   - **Project URL** (e.g., `https://xxx.supabase.co`)
   - **anon public** key
   - **service_role** key

3. Create `.env.local`:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Restart dev server:
```bash
npm run dev
```

### Verify Configuration

1. Open browser console
2. Visit http://localhost:3000
3. Check for:
   - ✅ No "Missing NEXT_PUBLIC_SUPABASE_URL" warnings
   - ✅ Clean page load
   - ✅ No Supabase errors

---

## Step 6: Create Test Users

**Purpose:** Test each portal with appropriate user roles

### Via Supabase Dashboard (Recommended)

1. Go to Authentication → Users
2. Click "Add User"
3. Create these users:

#### Admin User
- Email: `admin@test.com`
- Password: `TestAdmin123!`
- Confirm email: ✅ Yes

#### Student User
- Email: `student@test.com`
- Password: `TestStudent123!`
- Confirm email: ✅ Yes

#### Employer User
- Email: `employer@test.com`
- Password: `TestEmployer123!`
- Confirm email: ✅ Yes

#### Instructor User
- Email: `instructor@test.com`
- Password: `TestInstructor123!`
- Confirm email: ✅ Yes

#### Creator User
- Email: `creator@test.com`
- Password: `TestCreator123!`
- Confirm email: ✅ Yes

#### Staff User
- Email: `staff@test.com`
- Password: `TestStaff123!`
- Confirm email: ✅ Yes

#### Program Holder User
- Email: `program-holder@test.com`
- Password: `TestProgramHolder123!`
- Confirm email: ✅ Yes

### Set User Roles

After creating users, set their roles:

1. Go to Table Editor → `profiles`
2. Find each user by email
3. Set the `role` column:
   - admin@test.com → `admin`
   - student@test.com → `student`
   - employer@test.com → `employer`
   - instructor@test.com → `instructor`
   - creator@test.com → `creator`
   - staff@test.com → `staff`
   - program-holder@test.com → `program_holder`

**Or via SQL:**
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@test.com';
UPDATE profiles SET role = 'student' WHERE email = 'student@test.com';
UPDATE profiles SET role = 'employer' WHERE email = 'employer@test.com';
UPDATE profiles SET role = 'instructor' WHERE email = 'instructor@test.com';
UPDATE profiles SET role = 'creator' WHERE email = 'creator@test.com';
UPDATE profiles SET role = 'staff' WHERE email = 'staff@test.com';
UPDATE profiles SET role = 'program_holder' WHERE email = 'program-holder@test.com';
```

---

## Step 7: Test All Portals

### Test Admin Portal

1. Go to http://localhost:3000/login
2. Login with `admin@test.com`
3. Should redirect to `/admin`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can view students
   - [ ] Can view programs
   - [ ] Can view enrollments
   - [ ] Navigation works

### Test Student Portal

1. Logout
2. Login with `student@test.com`
3. Should redirect to `/lms/dashboard`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can view courses
   - [ ] Can access orientation
   - [ ] Can view progress
   - [ ] Navigation works

### Test Employer Portal

1. Logout
2. Login with `employer@test.com`
3. Should redirect to `/employer/dashboard`
4. Verify:
   - [ ] Dashboard loads (not 500 error)
   - [ ] Can view verification page
   - [ ] Can access postings
   - [ ] Navigation works

### Test Instructor Portal

1. Logout
2. Login with `instructor@test.com`
3. Should redirect to `/instructor/dashboard`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can view courses
   - [ ] Navigation works

### Test Creator Portal

1. Logout
2. Login with `creator@test.com`
3. Should redirect to `/creator/dashboard`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can access course creation
   - [ ] Can view analytics
   - [ ] Navigation works

### Test Staff Portal

1. Logout
2. Login with `staff@test.com`
3. Should redirect to `/staff-portal/dashboard`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can view students
   - [ ] Navigation works

### Test Program Holder Portal

1. Logout
2. Login with `program-holder@test.com`
3. Should redirect to `/program-holder/dashboard`
4. Verify:
   - [ ] Dashboard loads
   - [ ] Can view programs
   - [ ] Navigation works

---

## Step 8: Test Partner Course Integration

### View Partner Courses

1. Login as admin
2. Go to SQL Editor or create a test page
3. Query courses:

```sql
SELECT * FROM v_active_partner_courses 
ORDER BY provider_name, course_name 
LIMIT 20;
```

### Test Enrollment (Optional)

Create a test enrollment:

```sql
-- Get IDs first
SELECT id, provider_name FROM partner_lms_providers LIMIT 1;
SELECT id, course_name FROM partner_courses_catalog LIMIT 1;
SELECT id, email FROM profiles WHERE role = 'student' LIMIT 1;

-- Create enrollment
INSERT INTO partner_lms_enrollments (
  provider_id,
  student_id,
  course_id,
  status,
  external_enrollment_id
) VALUES (
  'provider-id-here',
  'student-id-here',
  'course-id-here',
  'active',
  'TEST-ENROLLMENT-001'
);

-- Verify
SELECT * FROM get_student_partner_enrollments('student-id-here');
```

---

## Troubleshooting

### Issue: Tables already exist

**Solution:**
- Skip Step 2 (schema creation)
- Go directly to Step 3 (load courses)
- Or check if courses already loaded

### Issue: Duplicate courses

**Solution:**
```sql
-- Check existing courses
SELECT COUNT(*) FROM partner_courses_catalog;

-- If > 0, don't run load migration again
-- Or delete existing courses first:
DELETE FROM partner_courses_catalog;
```

### Issue: "Missing NEXT_PUBLIC_SUPABASE_URL"

**Solution:**
- Verify `.env.local` exists
- Check env vars are set correctly
- Restart dev server
- Clear browser cache

### Issue: Portal shows 500 error

**Solution:**
- Check browser console for errors
- Verify Supabase connection
- Check user role is set correctly
- Verify tables exist

### Issue: Cannot login

**Solution:**
- Verify user exists in Supabase
- Check email is confirmed
- Verify password is correct
- Check Supabase logs

---

## Success Criteria

### Partner Courses
- [ ] 7 providers in database
- [ ] 80+ courses in database
- [ ] All courses are active
- [ ] Views return data
- [ ] Helper functions work

### Portal Testing
- [ ] All 7 portals accessible
- [ ] Authentication works for all roles
- [ ] No 500 errors
- [ ] Navigation works
- [ ] Role-based access enforced

---

## Summary Checklist

**Database Setup:**
- [ ] Checked existing tables
- [ ] Created partner tables (if needed)
- [ ] Loaded partner courses
- [ ] Verified data in Supabase

**Local Configuration:**
- [ ] Configured .env.local
- [ ] Restarted dev server
- [ ] Verified no Supabase warnings

**User Setup:**
- [ ] Created 7 test users
- [ ] Set roles for all users
- [ ] Verified users in Supabase

**Portal Testing:**
- [ ] Tested admin portal
- [ ] Tested student portal
- [ ] Tested employer portal
- [ ] Tested instructor portal
- [ ] Tested creator portal
- [ ] Tested staff portal
- [ ] Tested program holder portal

**Integration Testing:**
- [ ] Viewed partner courses
- [ ] Tested enrollment flow (optional)
- [ ] Verified data integrity

---

## Next Steps After Completion

1. **Document any issues found**
2. **Create production deployment plan**
3. **Set up monitoring**
4. **Train staff on portal usage**
5. **Plan partner API integrations**

---

**Ready to start? Begin with Step 1!**
