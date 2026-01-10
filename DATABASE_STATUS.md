# Database Status & Setup

**Last Updated:** January 10, 2026  
**Status:** ✅ Schema Complete | ⚠️ Data Empty

---

## Current State

### ✅ Schema (Complete)
- **51 migrations** applied
- All tables created
- Row Level Security (RLS) enabled
- Indexes and constraints configured
- Foreign keys established

### ⚠️ Data (Empty)
- **0 programs** in catalog
- **0 students** enrolled
- **0 courses** available
- **0 certificates** issued

**Seed files ready to populate.**

---

## Database Schema Overview

### Core Tables

**Users & Authentication:**
- `profiles` - User accounts (id, email, role, name)
- `students` - Student-specific data (DOB, address, funding)
- `program_holders` - Training providers
- `delegates` - Sub-office managers

**Learning Content:**
- `programs` - Training programs (27+ ready to seed)
- `courses` - Course catalog
- `modules` - Course modules
- `lessons` - Individual lessons
- `quizzes` - Assessments
- `resources` - Downloadable materials

**Enrollment & Progress:**
- `enrollments` - Student enrollments
- `lesson_progress` - Progress tracking
- `quiz_attempts` - Quiz submissions
- `certificates` - Certificate records
- `attendance_logs` - Attendance tracking

**Compliance & Reporting:**
- `wioa_participants` - WIOA data
- `outcome_tracking` - Employment outcomes
- `audit_logs` - System audit trail
- `compliance_reports` - Generated reports

**Payments & Billing:**
- `payment_history` - Payment transactions
- `invoices` - Invoice records
- `subscriptions` - Subscription management
- `refunds` - Refund records

**Multi-Tenant:**
- `tenants` - Organization records
- `licenses` - Feature licensing
- `tenant_settings` - Tenant configuration

---

## Seed Files Available

### 1. Master Seed (`supabase/seeds/000_master_seed.sql`)
**Size:** 335 lines  
**Contains:** 27 programs across all categories

**Programs Included:**
- **Healthcare (8):** CNA, Medical Assistant, Phlebotomy, Dental Assistant, Home Health Aide, Patient Care Tech, Medical Billing, Healthcare Admin
- **Skilled Trades (7):** HVAC, Electrical, Plumbing, Welding, Carpentry, Auto Mechanic, Heavy Equipment
- **Technology (5):** Web Development, Cybersecurity, Data Analytics, IT Support, Cloud Computing
- **Business (4):** Accounting, Project Management, Digital Marketing, Business Admin
- **Transportation (3):** CDL-A, CDL-B, Forklift Operator

### 2. Complete Programs Catalog (`supabase/seed/complete_programs_catalog.sql`)
**Size:** 21 KB  
**Contains:** 29 programs with full details

**Fields Populated:**
- Program name, slug, category
- Description (marketing copy)
- Duration, tuition, funding availability
- Skills taught, prerequisites
- Certifications earned
- Job titles, salary ranges
- Placement rates
- Images and featured status

### 3. Comprehensive Student Data (`supabase/seed/comprehensive_student_data.sql`)
**Size:** 18 KB  
**Contains:** Test student profiles and enrollments

**Test Data:**
- Sample student profiles
- Enrollment records
- Course progress
- Completion certificates
- Assessment scores

---

## How to Populate Database

### Option 1: Supabase Dashboard (Recommended)

**Steps:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Open new query
5. Copy contents of `supabase/seeds/000_master_seed.sql`
6. Click **Run**
7. Verify: `SELECT COUNT(*) FROM programs;` should return 27

**Time:** 2-3 minutes

### Option 2: Supabase CLI

**Prerequisites:**
```bash
npm install -g supabase
```

**Steps:**
```bash
# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run seed file
supabase db execute -f supabase/seeds/000_master_seed.sql

# Verify
supabase db execute "SELECT COUNT(*) FROM programs;"
```

**Time:** 5 minutes

### Option 3: Direct PostgreSQL Connection

**Prerequisites:**
- Database connection string from Supabase

**Steps:**
```bash
# Set connection string
export DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Run seed file
psql $DATABASE_URL -f supabase/seeds/000_master_seed.sql

# Verify
psql $DATABASE_URL -c "SELECT COUNT(*) FROM programs;"
```

**Time:** 3-5 minutes

### Option 4: Via Application Script

**Steps:**
```bash
# Run database seed script
pnpm db:seed

# Or manually
node scripts/auto-seed-database.mjs
```

**Time:** 2-3 minutes

---

## Verification Queries

After seeding, run these queries to verify:

```sql
-- Check programs count
SELECT COUNT(*) FROM programs;
-- Expected: 27-29

-- View programs by category
SELECT category, COUNT(*) 
FROM programs 
GROUP BY category 
ORDER BY category;

-- Check active programs
SELECT name, category, tuition, duration 
FROM programs 
WHERE is_active = true 
ORDER BY category, name;

-- Verify featured programs
SELECT name, category 
FROM programs 
WHERE is_featured = true;

-- Check program details
SELECT 
  name,
  slug,
  category,
  tuition,
  duration,
  certification,
  placement_rate
FROM programs
LIMIT 5;
```

---

## What Happens After Seeding

### Immediate Effects

1. **Programs Page Works** (`/programs`)
   - 27+ programs display
   - Filtering by category works
   - Search functionality active

2. **Individual Program Pages Work** (`/programs/[slug]`)
   - Program details display
   - Enrollment buttons active
   - Course information visible

3. **Application Flow Works** (`/apply`)
   - Students can select programs
   - Application forms functional
   - Program data populates dropdowns

4. **Admin Panel Works** (`/admin`)
   - Programs list displays
   - Edit/manage programs enabled
   - Analytics show program data

### Still Needed (Optional)

- **Test Students:** Add sample student data
- **Course Content:** Add lessons and modules
- **SMTP:** Configure email delivery
- **Images:** Upload program images

---

## Database Connection Info

### Get Connection String

**From Supabase Dashboard:**
1. Project Settings → Database
2. Copy "Connection string"
3. Replace `[YOUR-PASSWORD]` with actual password

**Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Environment Variables

**Required in `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## Safety & Best Practices

### Before Seeding Production

✅ **Do:**
- Backup database first
- Test in development environment
- Review seed file contents
- Verify schema matches seed file structure
- Run in transaction (if possible)

❌ **Don't:**
- Run on production without testing
- Seed without backup
- Modify seed files without understanding impact
- Run multiple times (creates duplicates)

### Rollback Plan

If seeding fails or creates issues:

```sql
-- Remove all programs
TRUNCATE programs CASCADE;

-- This will also clear:
-- - Related courses
-- - Related enrollments
-- - Related progress data
```

---

## Troubleshooting

### Error: "relation 'programs' does not exist"

**Cause:** Migrations not run  
**Fix:**
```bash
pnpm db:migrate
```

### Error: "duplicate key value violates unique constraint"

**Cause:** Programs already exist  
**Fix:** Either skip seeding or truncate first:
```sql
TRUNCATE programs CASCADE;
```

### Error: "permission denied for table programs"

**Cause:** RLS policies blocking insert  
**Fix:** Use service role key or disable RLS temporarily:
```sql
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;
-- Run seed
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
```

### Error: "column 'xyz' does not exist"

**Cause:** Schema mismatch between migrations and seed file  
**Fix:** Update seed file to match current schema or run missing migrations

---

## Next Steps After Seeding

### 1. Verify Data (2 minutes)
```bash
# Check programs
pnpm db:check

# Or manually
psql $DATABASE_URL -c "SELECT COUNT(*) FROM programs;"
```

### 2. Test Frontend (5 minutes)
- Visit `/programs`
- Click on a program
- Verify all data displays
- Test filtering and search

### 3. Test Application Flow (10 minutes)
- Go to `/apply`
- Select a program
- Fill out application
- Verify program data appears

### 4. Configure SMTP (30 minutes)
- See `SMTP_SETUP_GUIDE.md`
- Configure email provider
- Test email delivery

### 5. Add Course Content (Optional)
- Create courses for programs
- Add modules and lessons
- Upload video content

---

## Status Checklist

- [x] Schema migrations complete (51 migrations)
- [x] Seed files ready (3 files, 27+ programs)
- [ ] **Programs seeded** ← DO THIS NOW
- [ ] Test student data added (optional)
- [ ] SMTP configured (optional)
- [ ] Course content added (optional)

---

## Quick Start Command

**Fastest way to populate database:**

```bash
# 1. Get your database URL from Supabase dashboard
# 2. Run this command:
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" \
  -f supabase/seeds/000_master_seed.sql

# 3. Verify:
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" \
  -c "SELECT COUNT(*) FROM programs;"
```

**Expected output:** `27` or `29`

---

## Summary

**Database Schema:** ✅ Complete (51 migrations)  
**Database Data:** ⚠️ Empty (ready to seed)  
**Seed Files:** ✅ Ready (27+ programs)  
**Time to Populate:** 2-5 minutes  
**Difficulty:** Easy (copy-paste SQL)

**Action Required:** Run seed file to populate programs catalog.

---

**Last Updated:** January 10, 2026  
**Maintained By:** Elevate for Humanity Development Team
