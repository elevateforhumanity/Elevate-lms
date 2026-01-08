# Database Setup Guide

## Current Status

✅ **Schema:** All tables created via migrations  
⚠️ **Data:** No programs or test data populated  
📁 **Seed Files:** Available in `supabase/seed/`

---

## Quick Setup (Development)

### 1. Populate Programs Catalog

Run the complete programs seed file:

```bash
# Connect to your Supabase database
psql $DATABASE_URL -f supabase/seed/complete_programs_catalog.sql
```

This adds:
- 27+ training programs (CNA, HVAC, Barbering, CDL, etc.)
- Full program details (duration, tuition, skills, certifications)
- Job titles and salary ranges
- Placement rates

### 2. Add Test Student Data

```bash
psql $DATABASE_URL -f supabase/seed/comprehensive_student_data.sql
```

This creates:
- Test student profiles
- Sample enrollments
- Course progress data
- Completion records

---

## Production Setup

### Option 1: Via Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to SQL Editor
4. Copy contents of `supabase/seed/complete_programs_catalog.sql`
5. Execute the SQL
6. Repeat for `comprehensive_student_data.sql`

### Option 2: Via Supabase CLI

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run seed files
supabase db execute -f supabase/seed/complete_programs_catalog.sql
supabase db execute -f supabase/seed/comprehensive_student_data.sql
```

### Option 3: Via Environment Variable

```bash
# Set your database URL
export DATABASE_URL="postgresql://..."

# Run seed files
psql $DATABASE_URL -f supabase/seed/complete_programs_catalog.sql
psql $DATABASE_URL -f supabase/seed/comprehensive_student_data.sql
```

---

## What Gets Created

### Programs Table
- 27+ training programs across all categories
- Healthcare: CNA, Phlebotomy, Medical Assistant, etc.
- Technology: Web Development, Cybersecurity, Data Analytics
- Skilled Trades: HVAC, Electrical, Plumbing, Welding
- Business: Accounting, Project Management, Digital Marketing
- Transportation: CDL-A, CDL-B, Forklift Operator

### Student Data (Test)
- Sample student profiles
- Enrollment records
- Course progress tracking
- Completion certificates
- Assessment scores

---

## Verification

After running seed files, verify data:

```sql
-- Check programs count
SELECT COUNT(*) FROM programs;
-- Should return: 27+

-- Check active programs
SELECT name, category, tuition FROM programs WHERE is_active = true;

-- Check enrollments (if student data seeded)
SELECT COUNT(*) FROM enrollments;

-- Check profiles
SELECT COUNT(*) FROM profiles;
```

---

## Troubleshooting

### "Table does not exist"
Run migrations first:
```bash
npm run db:migrate
```

### "Permission denied"
Check RLS policies are set up correctly in migrations.

### "Duplicate key value"
Programs already exist. Either:
- Skip the seed file
- Uncomment `TRUNCATE programs CASCADE;` in seed file to clear first

---

## Next Steps

After populating database:

1. **Test Student Portal**
   - Log in as test student
   - View enrolled programs
   - Check course progress

2. **Test Admin Portal**
   - Access `/admin`
   - View programs list
   - Check enrollment data

3. **Test Program Pages**
   - Visit `/programs`
   - Click on individual programs
   - Verify all data displays correctly

---

## Custom SMTP Setup

For production email functionality, see `SMTP_SETUP_GUIDE.md` (if exists) or configure in Supabase:

1. Go to Authentication → Email Templates
2. Configure SMTP settings
3. Test email delivery

---

## Database Connection

Get your database URL from:
- Supabase Dashboard → Project Settings → Database
- Or from `.env.local` / Vercel environment variables

Format:
```
postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

---

## Safety Notes

⚠️ **Production Database:**
- Always backup before running seed files
- Test in development first
- Review seed file contents before executing
- Consider using transactions for rollback capability

✅ **Safe to Run:**
- Seed files use `INSERT` statements
- No destructive operations (unless TRUNCATE is uncommented)
- Can be run multiple times (will create duplicates unless you handle conflicts)

---

## Status

- [x] Schema migrations complete
- [ ] Programs catalog populated
- [ ] Test student data added
- [ ] SMTP configured
- [ ] Email templates customized

**Ready to populate database with seed files.**
