# Setup Supabase for Local Development
**Quick Guide - 5 Minutes**

---

## Why You Need This

**Current Status:**
- ⚠️ Console shows: "Missing NEXT_PUBLIC_SUPABASE_URL"
- ❌ Cannot test login/signup locally
- ❌ Cannot access student/admin portals locally
- ✅ Public pages work fine

**After Setup:**
- ✅ Full auth features work locally
- ✅ Can test all protected pages
- ✅ Can develop with real database

---

## Quick Setup (Recommended)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Pull Environment Variables

```bash
vercel env pull .env.local
```

This downloads all environment variables from Vercel, including Supabase credentials.

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 5: Verify

Open [https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev](https://3000--019b9705-2e8f-73ef-a6c4-63d62360007f.us-east-1-01.gitpod.dev)

Check console - should see:
- ✅ No Supabase warnings
- ✅ Clean page load

---

## Manual Setup (Alternative)

### Step 1: Get Supabase Credentials

**Visit:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api)

**Copy these values:**
1. **Project URL** (e.g., `https://cuxzzpsyufcewtmicszk.supabase.co`)
2. **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
3. **service_role** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Step 2: Create .env.local

```bash
cp .env.example .env.local
```

### Step 3: Add Credentials

Open `.env.local` and add:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace the `...` with actual keys from Supabase dashboard.**

### Step 4: Restart Dev Server

```bash
npm run dev
```

---

## Verification Checklist

### ✅ Environment Variables Set

```bash
# Check if variables are present
grep SUPABASE .env.local
```

**Expected output:**
```
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

### ✅ No Console Warnings

**Before setup:**
```
⚠️ [Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. 
   Auth features disabled.
```

**After setup:**
```
✅ (no Supabase warnings)
```

---

### ✅ Auth Pages Work

**Test login page:**
1. Navigate to `/login`
2. Page should load without errors
3. Form should be functional

**Test signup page:**
1. Navigate to `/signup`
2. Page should load without errors
3. Form should be functional

---

### ✅ Protected Routes Work

**Test student dashboard:**
1. Navigate to `/student/dashboard`
2. Should redirect to login (if not logged in)
3. Or show dashboard (if logged in)

---

## What Each Variable Does

### NEXT_PUBLIC_SUPABASE_URL

**Purpose:** Supabase project URL

**Used for:** Connecting to Supabase API

**Example:** `https://cuxzzpsyufcewtmicszk.supabase.co`

**Public:** Yes (safe to expose in browser)

---

### NEXT_PUBLIC_SUPABASE_ANON_KEY

**Purpose:** Public anonymous key

**Used for:** Client-side authentication

**Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Public:** Yes (safe to expose in browser)

**Note:** This key has limited permissions (RLS enforced)

---

### SUPABASE_SERVICE_ROLE_KEY

**Purpose:** Admin key with full database access

**Used for:** Server-side operations, bypassing RLS

**Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Public:** NO (never expose in browser)

**Note:** This key bypasses Row Level Security - keep secret!

---

## Troubleshooting

### Issue: "vercel: command not found"

**Solution:**
```bash
npm i -g vercel
```

---

### Issue: "vercel env pull" fails

**Possible causes:**
1. Not logged in to Vercel
2. No access to project

**Solution:**
```bash
# Login first
vercel login

# Link to project
vercel link

# Try again
vercel env pull .env.local
```

---

### Issue: Still seeing Supabase warnings

**Check:**
1. `.env.local` exists
2. Variables are set (not empty)
3. Dev server restarted

**Solution:**
```bash
# Verify file exists
ls -la .env.local

# Check variables
grep SUPABASE .env.local

# Restart server
npm run dev
```

---

### Issue: "Invalid API key"

**Cause:** Wrong key or expired key

**Solution:**
1. Get fresh keys from Supabase dashboard
2. Update `.env.local`
3. Restart dev server

---

### Issue: Auth still not working

**Check:**
1. Correct Supabase URL
2. Correct anon key
3. No typos in `.env.local`
4. Server restarted after changes

**Debug:**
```bash
# Check what Next.js sees
node -e "require('dotenv').config({ path: '.env.local' }); console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

---

## Security Best Practices

### ✅ DO

- Keep `.env.local` in `.gitignore`
- Never commit credentials to git
- Use different keys for dev/prod
- Rotate keys if exposed

### ❌ DON'T

- Commit `.env.local` to git
- Share service role key
- Expose service role key in browser
- Use production keys in development

---

## What's Already Configured

### ✅ Production (Vercel)

All Supabase variables are set in Vercel:
- Production environment
- Preview environment
- Development environment

**No action needed for production.**

---

### ✅ Code

Code already handles missing Supabase gracefully:
- Public pages work without Supabase
- Auth features disabled if not configured
- No crashes or errors

**No code changes needed.**

---

### ✅ Database

Database schema is already set up:
- All tables created
- Migrations applied
- RLS policies enabled

**No database setup needed.**

---

## After Setup

### Test Authentication

**Create a test user:**
1. Go to `/signup`
2. Enter email and password
3. Check email for verification link
4. Click link to verify

**Login:**
1. Go to `/login`
2. Enter credentials
3. Should redirect to dashboard

---

### Test Protected Routes

**Student Dashboard:**
- `/student/dashboard` - Student portal
- `/student/courses` - Course list
- `/student/progress` - Progress tracking

**Admin Portal:**
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/courses` - Course management

---

### Test Database Operations

**Create enrollment:**
1. Login as student
2. Browse courses
3. Enroll in course
4. Check database for enrollment record

**View data:**
1. Login as admin
2. View users
3. View enrollments
4. View applications

---

## Next Steps

### 1. Create Test Data

**Test users:**
- Student account
- Admin account
- Partner account

**Test courses:**
- Sample course
- With lessons
- With assessments

**Test enrollments:**
- Enroll test student
- Track progress
- Complete course

---

### 2. Test All Features

**Authentication:**
- Signup
- Login
- Logout
- Password reset

**Student Features:**
- Browse courses
- Enroll
- Track progress
- View certificates

**Admin Features:**
- Manage users
- Manage courses
- View reports
- Manage applications

---

### 3. Development Workflow

**Make changes:**
1. Edit code
2. Test locally with Supabase
3. Verify auth works
4. Push to git

**Deploy:**
1. Push to GitHub
2. Vercel auto-deploys
3. Uses production Supabase
4. Test on production

---

## Quick Reference

### Get Credentials

**From Vercel:**
```bash
vercel env pull .env.local
```

**From Supabase:**
[https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api)

---

### Check Setup

```bash
# Variables set?
grep SUPABASE .env.local

# Server running?
curl -s http://localhost:3000 | head -1

# Console clean?
# Open browser DevTools and check
```

---

### Restart Server

```bash
# Stop (Ctrl+C)
# Start
npm run dev
```

---

## Summary

**To enable Supabase locally:**

```bash
# Quick method (recommended)
vercel env pull .env.local
npm run dev

# Manual method
# 1. Get keys from Supabase dashboard
# 2. Add to .env.local
# 3. Restart server
```

**Verification:**
- ✅ No console warnings
- ✅ Login page works
- ✅ Protected routes work

**Time:** 5 minutes

**Difficulty:** Easy

---

**Need help?** See `SUPABASE_AUDIT.md` for detailed information.

**Ready to go!** Your local environment now has full Supabase access.
