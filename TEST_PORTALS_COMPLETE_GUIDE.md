# Complete Portal Testing Guide

**Date:** January 8, 2026  
**Purpose:** Test all portals with real authentication

---

## Prerequisites

### 1. Supabase Configuration Required

You need these environment variables configured:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Get Supabase Credentials

**Option A: From Netlify (Recommended)**
```bash
# Login to Netlify
netlify login

# Link project
netlify link

# Pull environment variables
netlify env pull .env.local
```

**Option B: From Supabase Dashboard**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL
   - anon/public key
   - service_role key
5. Add to `.env.local`

**Option C: Use the helper script**
```bash
./get-supabase-keys.sh
```

---

## Step 1: Configure Supabase

### Create .env.local

```bash
cp .env.example .env.local
```

### Add Credentials

Edit `.env.local` and add your Supabase credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Restart Dev Server

```bash
npm run dev
```

### Verify Configuration

Open browser console and check for:
- ✅ No Supabase warnings
- ✅ Clean page load
- ❌ No "Missing NEXT_PUBLIC_SUPABASE_URL" errors

---

## Step 2: Create Test Users

### Method 1: Via Supabase Dashboard

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Create users for each role:

**Admin User:**
- Email: `admin@test.com`
- Password: `TestAdmin123!`
- Role: `admin` (set in profiles table)

**Student User:**
- Email: `student@test.com`
- Password: `TestStudent123!`
- Role: `student`

**Employer User:**
- Email: `employer@test.com`
- Password: `TestEmployer123!`
- Role: `employer`

**Instructor User:**
- Email: `instructor@test.com`
- Password: `TestInstructor123!`
- Role: `instructor`

**Creator User:**
- Email: `creator@test.com`
- Password: `TestCreator123!`
- Role: `creator`

**Staff User:**
- Email: `staff@test.com`
- Password: `TestStaff123!`
- Role: `staff`

**Program Holder User:**
- Email: `program-holder@test.com`
- Password: `TestProgramHolder123!`
- Role: `program_holder`

### Method 2: Via SQL

```sql
-- Create test users with proper roles
-- Run this in Supabase SQL Editor

-- Note: Users must sign up first, then update their role
-- Or use the Supabase Dashboard to create users directly

-- Update user roles after they sign up
UPDATE profiles SET role = 'admin' WHERE email = 'admin@test.com';
UPDATE profiles SET role = 'student' WHERE email = 'student@test.com';
UPDATE profiles SET role = 'employer' WHERE email = 'employer@test.com';
UPDATE profiles SET role = 'instructor' WHERE email = 'instructor@test.com';
UPDATE profiles SET role = 'creator' WHERE email = 'creator@test.com';
UPDATE profiles SET role = 'staff' WHERE email = 'staff@test.com';
UPDATE profiles SET role = 'program_holder' WHERE email = 'program-holder@test.com';
```

### Method 3: Via Signup Flow

1. Go to `/signup`
2. Create account
3. Manually update role in Supabase Dashboard

---

## Step 3: Test Each Portal

### 1. Admin Portal

**URL:** `/admin`

**Test User:** `admin@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard loads without errors
- [ ] Can view students list
- [ ] Can view programs list
- [ ] Can view enrollments
- [ ] Can access reports
- [ ] Navigation works
- [ ] Logout works

**Expected Behavior:**
- ✅ Full access to all admin features
- ✅ Can manage users, programs, enrollments
- ✅ Can view analytics and reports

### 2. Student Portal (LMS)

**URL:** `/lms/dashboard`

**Test User:** `student@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard shows enrollment status
- [ ] Can view courses
- [ ] Can access orientation
- [ ] Can view progress
- [ ] Can view certificates
- [ ] Can access placement services
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can see enrolled programs
- ✅ Can track progress
- ✅ Can access course materials
- ❌ Cannot access admin features

### 3. Employer Portal

**URL:** `/employer/dashboard`

**Test User:** `employer@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard loads
- [ ] Can view verification status
- [ ] Can access job postings
- [ ] Can view apprenticeship programs
- [ ] Can access reports
- [ ] Can view compliance info
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can post jobs
- ✅ Can view candidates
- ✅ Can manage apprenticeships
- ❌ Cannot access student data

### 4. Instructor Portal

**URL:** `/instructor/dashboard`

**Test User:** `instructor@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard shows assigned courses
- [ ] Can view students
- [ ] Can manage courses
- [ ] Can add new students
- [ ] Can track progress
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can manage assigned courses
- ✅ Can view student progress
- ✅ Can grade assignments
- ❌ Cannot access other instructors' courses

### 5. Creator Portal

**URL:** `/creator/dashboard`

**Test User:** `creator@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard shows creator stats
- [ ] Can create new courses
- [ ] Can access community
- [ ] Can view analytics
- [ ] Can manage products
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can create and sell courses
- ✅ Can view earnings
- ✅ Can engage with community
- ❌ Cannot access platform courses

### 6. Staff Portal

**URL:** `/staff-portal/dashboard`

**Test User:** `staff@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard shows staff metrics
- [ ] Can view students
- [ ] Can access customer service
- [ ] Can view processes
- [ ] Can access QA checklists
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can support students
- ✅ Can manage tickets
- ✅ Can follow processes
- ❌ Cannot modify system settings

### 7. Program Holder Portal

**URL:** `/program-holder/dashboard`

**Test User:** `program-holder@test.com`

**Test Checklist:**
- [ ] Login successful
- [ ] Dashboard shows program stats
- [ ] Can view students
- [ ] Can track attendance
- [ ] Can access documents
- [ ] Can view reports
- [ ] Navigation works

**Expected Behavior:**
- ✅ Can manage their programs
- ✅ Can track student progress
- ✅ Can submit reports
- ❌ Cannot access other programs

---

## Step 4: Test Authentication Flow

### Login Flow

1. Go to `/login`
2. Enter test credentials
3. Click "Sign In"
4. Should redirect to appropriate dashboard

**Expected:**
- ✅ Successful login
- ✅ Redirect to role-specific dashboard
- ✅ Session persists on refresh

### Logout Flow

1. Click user menu
2. Click "Logout"
3. Should redirect to homepage

**Expected:**
- ✅ Session cleared
- ✅ Redirect to public page
- ✅ Cannot access protected pages

### Role-Based Access

1. Login as student
2. Try to access `/admin`

**Expected:**
- ❌ Redirect to unauthorized page
- ❌ Or redirect to student dashboard

### Session Persistence

1. Login
2. Refresh page
3. Navigate to different pages

**Expected:**
- ✅ Stay logged in
- ✅ No re-authentication required
- ✅ Session persists across tabs

---

## Step 5: Test Portal Features

### Test Enrollment Flow

1. Login as admin
2. Create test enrollment
3. Login as student
4. Verify enrollment appears
5. Test progress tracking

### Test Course Access

1. Login as student
2. View enrolled courses
3. Access course materials
4. Track progress
5. Complete activities

### Test Job Posting

1. Login as employer
2. Create job posting
3. Verify posting appears
4. Test application flow

### Test Certificate Generation

1. Complete course as student
2. Verify certificate generated
3. Download certificate
4. Verify certificate data

---

## Step 6: Verify Null Safety

### Test Without Supabase

1. Remove Supabase env vars
2. Restart dev server
3. Visit portal pages

**Expected:**
- ✅ Shows "Configuration Required" message
- ✅ No 500 errors
- ✅ User-friendly error page
- ✅ Link to return home

### Test With Invalid Credentials

1. Add invalid Supabase URL
2. Restart dev server
3. Try to login

**Expected:**
- ✅ Shows connection error
- ✅ No crash
- ✅ Clear error message

---

## Troubleshooting

### Issue: "Missing NEXT_PUBLIC_SUPABASE_URL"

**Solution:**
1. Check `.env.local` exists
2. Verify env vars are set
3. Restart dev server
4. Clear browser cache

### Issue: Login fails with "Invalid credentials"

**Solution:**
1. Verify user exists in Supabase
2. Check email is confirmed
3. Try password reset
4. Check Supabase logs

### Issue: Redirect to unauthorized page

**Solution:**
1. Check user role in profiles table
2. Verify RLS policies
3. Check requireRole() function
4. Verify role matches portal

### Issue: Portal shows 500 error

**Solution:**
1. Check browser console
2. Check server logs
3. Verify Supabase connection
4. Check database tables exist

### Issue: Session doesn't persist

**Solution:**
1. Check cookies enabled
2. Clear browser cache
3. Check Supabase session settings
4. Verify JWT configuration

---

## Testing Checklist

### Configuration
- [ ] Supabase env vars configured
- [ ] .env.local file created
- [ ] Dev server restarted
- [ ] No console warnings

### Test Users
- [ ] Admin user created
- [ ] Student user created
- [ ] Employer user created
- [ ] Instructor user created
- [ ] Creator user created
- [ ] Staff user created
- [ ] Program holder user created

### Portal Access
- [ ] Admin portal accessible
- [ ] Student portal accessible
- [ ] Employer portal accessible
- [ ] Instructor portal accessible
- [ ] Creator portal accessible
- [ ] Staff portal accessible
- [ ] Program holder portal accessible

### Authentication
- [ ] Login works for all roles
- [ ] Logout works
- [ ] Session persists
- [ ] Role-based access enforced
- [ ] Unauthorized access blocked

### Features
- [ ] Enrollment flow works
- [ ] Course access works
- [ ] Progress tracking works
- [ ] Certificate generation works
- [ ] Job posting works

### Error Handling
- [ ] Null Supabase handled gracefully
- [ ] Invalid credentials show error
- [ ] Unauthorized access redirects
- [ ] 404 pages work
- [ ] Error boundaries catch errors

---

## Success Criteria

✅ **All portals accessible with authentication**
✅ **Role-based access working correctly**
✅ **No 500 errors on portal pages**
✅ **Session management working**
✅ **Null safety implemented**
✅ **User-friendly error messages**

---

## Next Steps After Testing

1. **Document any issues found**
2. **Create production test plan**
3. **Set up monitoring**
4. **Configure production Supabase**
5. **Create real user accounts**
6. **Train staff on portal usage**

---

## Quick Test Script

```bash
#!/bin/bash
# Quick portal test script

echo "Testing Portal Access..."

# Test public pages
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ | grep -q "200" && echo "✅ Homepage" || echo "❌ Homepage"

# Test portal pages (should redirect to login)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin | grep -q "307\|200" && echo "✅ Admin Portal" || echo "❌ Admin Portal"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/lms/dashboard | grep -q "307\|200" && echo "✅ Student Portal" || echo "❌ Student Portal"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/employer/dashboard | grep -q "307\|200\|500" && echo "⚠️  Employer Portal (needs Supabase)" || echo "❌ Employer Portal"

echo "Done!"
```

---

**Ready to test? Follow the steps above!**
