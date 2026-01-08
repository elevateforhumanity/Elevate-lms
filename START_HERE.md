# START HERE - Complete Activation Guide

**Last Updated:** January 8, 2026  
**Status:** Ready to Activate

---

## What's Ready

✅ **Partner Course System**
- Database schema created
- 80+ sample courses ready
- 7 partner providers configured
- Safe activation scripts
- **✅ Syntax validated - error-free**

✅ **Portal Testing Framework**
- All portals have null safety
- Testing guides created
- User creation instructions
- Comprehensive checklists

---

## Quick Start (3 Options)

### Option 1: Guided Activation (Recommended)

```bash
./activate-safely.sh
```

This script will:
- Check your Supabase configuration
- Guide you through checking existing tables
- Tell you exactly what to do next
- Prevent duplicate tables/data

### Option 2: Manual Step-by-Step

Follow the complete guide:
```bash
open ACTIVATION_PLAN.md
```

This document has:
- 8 detailed steps
- Verification at each stage
- Troubleshooting tips
- Success criteria

### Option 3: Quick Activation (If you know what you're doing)

1. **Check database:**
   - Run `check-database-tables.sql` in Supabase SQL Editor

2. **If tables don't exist:**
   - Run `supabase/migrations/20260108_activate_partner_courses.sql`
   - Run `supabase/migrations/20260108_load_partner_courses.sql`

3. **If tables exist:**
   - Skip to portal testing

---

## Files You Need

### For Partner Courses

1. **check-database-tables.sql**
   - Run this FIRST to check what exists
   - Prevents duplicate tables

2. **supabase/migrations/20260108_activate_partner_courses.sql**
   - Creates partner tables
   - Only run if tables don't exist

3. **supabase/migrations/20260108_load_partner_courses.sql**
   - Loads 80+ courses
   - Only run if courses don't exist

### For Portal Testing

1. **TEST_PORTALS_COMPLETE_GUIDE.md**
   - How to configure Supabase locally
   - How to create test users
   - How to test each portal

2. **.env.local** (you need to create this)
   - Add Supabase credentials
   - See guide for instructions

---

## The Safe Process

### Step 1: Check What Exists

**Why:** Avoid duplicate tables and data

**How:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. SQL Editor → New Query
3. Copy contents of `check-database-tables.sql`
4. Run it
5. Review results

**What to look for:**
- Do `partner_lms_providers` and `partner_courses_catalog` exist?
- If yes: How many rows?
- If no: Safe to create

### Step 2: Create Tables (If Needed)

**Skip if tables exist!**

**How:**
1. SQL Editor → New Query
2. Copy `supabase/migrations/20260108_activate_partner_courses.sql`
3. Run it
4. Verify in Table Editor

**Expected:**
- 4 new tables
- 7 partner providers
- 0 courses (loaded in next step)

### Step 3: Load Courses (If Needed)

**Skip if courses already loaded!**

**How:**
1. SQL Editor → New Query
2. Copy `supabase/migrations/20260108_load_partner_courses.sql`
3. Run it (takes 1-2 minutes)
4. Check output

**Expected:**
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

### Step 4: Verify

**Check everything worked:**

```sql
-- Should return 7
SELECT COUNT(*) FROM partner_lms_providers;

-- Should return 80+
SELECT COUNT(*) FROM partner_courses_catalog;

-- Should show courses
SELECT * FROM v_active_partner_courses LIMIT 5;
```

### Step 5: Configure Local Environment

**For portal testing:**

1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add Supabase credentials (see TEST_PORTALS_COMPLETE_GUIDE.md)

3. Restart dev server:
   ```bash
   npm run dev
   ```

### Step 6: Create Test Users

**In Supabase Dashboard:**

1. Authentication → Users → Add User
2. Create 7 users (see ACTIVATION_PLAN.md Step 6)
3. Set roles in `profiles` table

### Step 7: Test Portals

**Login as each user:**
- admin@test.com → /admin
- student@test.com → /lms/dashboard
- employer@test.com → /employer/dashboard
- instructor@test.com → /instructor/dashboard
- creator@test.com → /creator/dashboard
- staff@test.com → /staff-portal/dashboard
- program-holder@test.com → /program-holder/dashboard

---

## Common Questions

### Q: Will this duplicate my existing data?

**A:** No! The migrations use `CREATE TABLE IF NOT EXISTS` and the activation script checks first.

### Q: What if I already have partner tables?

**A:** Skip Step 2 (schema creation). Just check if you need to load courses.

### Q: What if I already have courses loaded?

**A:** Skip Steps 2 and 3. Go straight to portal testing (Step 5).

### Q: Can I undo this?

**A:** Yes. You can drop the tables:
```sql
DROP TABLE IF EXISTS partner_certificates CASCADE;
DROP TABLE IF EXISTS partner_lms_enrollments CASCADE;
DROP TABLE IF EXISTS partner_courses_catalog CASCADE;
DROP TABLE IF EXISTS partner_lms_providers CASCADE;
```

### Q: How do I load all 1,200+ courses instead of just 80?

**A:** After loading the 80 samples, run:
```bash
# In Supabase SQL Editor
# Copy: supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql
# Run it
```

---

## Troubleshooting

### "Table already exists"

**Solution:** Skip the schema migration, go to loading courses

### "Duplicate key value"

**Solution:** Courses already loaded, skip to portal testing

### "Missing NEXT_PUBLIC_SUPABASE_URL"

**Solution:** Create .env.local with Supabase credentials

### "Cannot access portal"

**Solution:** 
1. Check .env.local exists
2. Restart dev server
3. Create test user with correct role

---

## Success Checklist

### Partner Courses
- [ ] Checked existing tables
- [ ] Created tables (if needed)
- [ ] Loaded courses (if needed)
- [ ] Verified 7 providers
- [ ] Verified 80+ courses
- [ ] Tested queries

### Portal Testing
- [ ] Configured .env.local
- [ ] Restarted dev server
- [ ] Created 7 test users
- [ ] Set user roles
- [ ] Tested all 7 portals
- [ ] Verified authentication

---

## What to Do Right Now

1. **Run the safe activation script:**
   ```bash
   ./activate-safely.sh
   ```

2. **Follow its instructions**

3. **If you get stuck:**
   - Check ACTIVATION_PLAN.md
   - Check TEST_PORTALS_COMPLETE_GUIDE.md
   - Review troubleshooting section

---

## Documentation Index

1. **START_HERE.md** ← You are here
2. **activate-safely.sh** - Guided activation script
3. **ACTIVATION_PLAN.md** - Detailed 8-step guide
4. **TEST_PORTALS_COMPLETE_GUIDE.md** - Portal testing guide
5. **check-database-tables.sql** - Check existing tables
6. **MIGRATION_VALIDATION.md** - ✅ Syntax verification report
7. **PARTNER_COURSES_ACTIVATED.md** - Technical documentation
8. **COMPLETION_REPORT.md** - What was completed

---

## Ready?

**Start with:**
```bash
./activate-safely.sh
```

**Or read the full plan:**
```bash
open ACTIVATION_PLAN.md
```

**Need help?** All instructions are in the documentation files above.

---

**Everything is ready - just follow the steps!** 🚀
