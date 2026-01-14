# Database Verification Guide

Since migrations have already been run, let's verify what's actually in your database.

---

## Quick Verification via Supabase Dashboard

### 1. Check Partner Courses

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

**Run this query:**
```sql
-- Count partner courses
SELECT COUNT(*) as total_courses 
FROM partner_lms_courses;

-- Count by provider
SELECT 
  p.name as provider,
  p.provider_type,
  COUNT(c.id) as course_count,
  MIN(c.retail_price) as min_price,
  MAX(c.retail_price) as max_price
FROM partner_lms_providers p
LEFT JOIN partner_lms_courses c ON c.provider_id = p.id
GROUP BY p.id, p.name, p.provider_type
ORDER BY course_count DESC;
```

**Expected Results:**
- If migrations ran: 1,200+ courses
- If not: 0 courses

### 2. Check Programs

```sql
-- List all programs
SELECT 
  id,
  name,
  slug,
  cost,
  is_active,
  wioa_eligible
FROM programs
ORDER BY created_at DESC;
```

**Expected:**
- CNA Certification
- Building Tech
- Barber License
- Or empty if not set up yet

### 3. Check Enrollments

```sql
-- Count enrollments
SELECT 
  status,
  COUNT(*) as count
FROM enrollments
GROUP BY status;

-- Recent enrollments
SELECT 
  e.id,
  p.full_name as student,
  pr.name as program,
  e.status,
  e.enrolled_at
FROM enrollments e
LEFT JOIN profiles p ON p.id = e.student_id
LEFT JOIN programs pr ON pr.id = e.program_id
ORDER BY e.enrolled_at DESC
LIMIT 10;
```

### 4. Check Course Progress

```sql
-- Check if lms_progress table exists and has data
SELECT 
  COUNT(*) as total_progress_records,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
  COUNT(CASE WHEN evidence_url IS NOT NULL THEN 1 END) as with_credentials
FROM lms_progress;
```

### 5. Check Certificates

```sql
-- Count issued certificates
SELECT COUNT(*) as total_certificates
FROM certificates;

-- Recent certificates
SELECT 
  c.certificate_number,
  p.full_name as student,
  pr.name as program,
  c.issued_at
FROM certificates c
LEFT JOIN profiles p ON p.id = c.user_id
LEFT JOIN programs pr ON pr.id = c.program_id
ORDER BY c.issued_at DESC
LIMIT 10;
```

---

## What to Look For

### Scenario 1: Partner Courses Loaded ✅
```
partner_lms_courses: 1,200+
partner_lms_providers: 7
```
**Status:** Ready to create programs and enroll students

### Scenario 2: Tables Exist, No Data ⚠️
```
partner_lms_courses: 0
partner_lms_providers: 0
```
**Action:** Need to run partner course migrations

### Scenario 3: Tables Don't Exist ❌
```
Error: relation "partner_lms_courses" does not exist
```
**Action:** Need to run base schema migrations first

---

## If Partner Courses Are Missing

### Check Which Migrations Ran

```sql
-- Check migration tracking
SELECT * FROM schema_migrations 
ORDER BY version DESC 
LIMIT 20;

-- Or check if migration_tracking table exists
SELECT * FROM migration_tracking 
ORDER BY executed_at DESC 
LIMIT 20;
```

### Run Partner Course Migration

**Via Supabase Dashboard:**
1. Go to SQL Editor
2. Open file: `supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql`
3. Copy entire contents
4. Paste into SQL Editor
5. Click "Run"

**Expected Output:**
```
Certiport courses inserted: 300+
Milady courses inserted: 50+
HSI courses inserted: 100+
...
Total: 1,200+ courses
```

---

## Verify Student Flow

### 1. Check if Test Student Exists

```sql
SELECT 
  id,
  email,
  full_name,
  role
FROM profiles
WHERE email LIKE '%test%' OR email LIKE '%demo%'
LIMIT 5;
```

### 2. Check Test Enrollments

```sql
SELECT 
  e.*,
  p.email as student_email,
  pr.name as program_name
FROM enrollments e
JOIN profiles p ON p.id = e.student_id
JOIN programs pr ON pr.id = e.program_id
WHERE p.email LIKE '%test%'
ORDER BY e.created_at DESC;
```

### 3. Check Payment Records

```sql
-- If payment_logs table exists
SELECT 
  stripe_session_id,
  amount,
  status,
  created_at
FROM payment_logs
ORDER BY created_at DESC
LIMIT 10;
```

---

## Create Test Data (If Needed)

### 1. Create Test Program

```sql
INSERT INTO programs (
  name,
  slug,
  description,
  cost,
  duration_weeks,
  is_active,
  wioa_eligible
) VALUES (
  'Test Program - Microsoft Office',
  'test-microsoft-office',
  'Test program for Microsoft Office training',
  492.00,
  12,
  true,
  false
) RETURNING id;
```

### 2. Link Partner Courses to Program

```sql
-- First, get some course IDs
SELECT id, course_name, retail_price 
FROM partner_lms_courses 
WHERE course_name LIKE '%Excel%' 
LIMIT 3;

-- Then create links (if program_courses table exists)
INSERT INTO program_courses (program_id, course_id, sequence)
VALUES 
  ('[program_id_from_step_1]', '[excel_course_id]', 1),
  ('[program_id_from_step_1]', '[word_course_id]', 2),
  ('[program_id_from_step_1]', '[powerpoint_course_id]', 3);
```

### 3. Create Test Student

```sql
-- Check if test student exists
SELECT id, email FROM profiles WHERE email = 'test@www.elevateforhumanity.org';

-- If not, you'll need to create via signup page or admin panel
```

---

## Check Stripe Configuration

### Via Supabase Dashboard

```sql
-- Check if Stripe webhook events are being logged
SELECT 
  stripe_event_id,
  event_type,
  processed_at,
  error
FROM stripe_webhook_logs
ORDER BY processed_at DESC
LIMIT 10;
```

### Via Stripe Dashboard

1. Go to: https://dashboard.stripe.com/webhooks
2. Find webhook for: `https://www.elevateforhumanity.org/api/webhooks/stripe`
3. Check recent events
4. Verify events are being received

---

## Sample Queries for Admin Dashboard

### Enrollment Stats

```sql
-- Enrollments by status
SELECT 
  status,
  COUNT(*) as count,
  SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) as paid
FROM enrollments
GROUP BY status;

-- Revenue by program
SELECT 
  pr.name as program,
  COUNT(e.id) as enrollments,
  SUM(pr.cost) as total_revenue
FROM enrollments e
JOIN programs pr ON pr.id = e.program_id
WHERE e.payment_status = 'paid'
GROUP BY pr.id, pr.name
ORDER BY total_revenue DESC;
```

### Course Completion Stats

```sql
-- Completion rates
SELECT 
  pr.name as program,
  COUNT(DISTINCT e.student_id) as total_students,
  COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.student_id END) as completed_students,
  ROUND(
    COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.student_id END)::numeric / 
    NULLIF(COUNT(DISTINCT e.student_id), 0) * 100, 
    2
  ) as completion_rate
FROM enrollments e
JOIN programs pr ON pr.id = e.program_id
GROUP BY pr.id, pr.name;
```

### Credential Upload Status

```sql
-- Students with pending credential uploads
SELECT 
  p.full_name as student,
  c.title as course,
  lp.status,
  lp.progress_percent,
  CASE 
    WHEN lp.evidence_url IS NULL THEN 'Pending Upload'
    ELSE 'Uploaded'
  END as credential_status,
  lp.last_activity_at
FROM lms_progress lp
JOIN profiles p ON p.id = lp.user_id
JOIN courses c ON c.id = lp.course_id
WHERE lp.status = 'completed' AND lp.evidence_url IS NULL
ORDER BY lp.completed_at DESC;
```

---

## Next Steps Based on Results

### If Everything Looks Good ✅
- Partner courses: 1,200+
- Programs: 3-5 active
- Enrollments: Some test data
- Certificates: Working

**→ You're ready to launch!**

### If Partner Courses Missing ⚠️
- Run: `20241129_full_partner_courses_1200plus.sql`
- Verify: Should see 1,200+ courses

### If Programs Missing 📋
- Create your core programs (CNA, Barber, Building Tech)
- Link to partner courses
- Set pricing

### If No Test Data 🧪
- Create test student account
- Create test enrollment
- Test full flow
- Verify automation works

---

## Quick Status Check Script

Copy this into Supabase SQL Editor for a complete status report:

```sql
-- COMPLETE DATABASE STATUS CHECK
-- Run this to see everything at once

SELECT 'Partner Courses' as metric, COUNT(*)::text as value 
FROM partner_lms_courses
UNION ALL
SELECT 'Partner Providers', COUNT(*)::text 
FROM partner_lms_providers
UNION ALL
SELECT 'Programs', COUNT(*)::text 
FROM programs
UNION ALL
SELECT 'Active Programs', COUNT(*)::text 
FROM programs WHERE is_active = true
UNION ALL
SELECT 'Total Enrollments', COUNT(*)::text 
FROM enrollments
UNION ALL
SELECT 'Active Enrollments', COUNT(*)::text 
FROM enrollments WHERE status = 'active'
UNION ALL
SELECT 'Completed Enrollments', COUNT(*)::text 
FROM enrollments WHERE status = 'completed'
UNION ALL
SELECT 'Certificates Issued', COUNT(*)::text 
FROM certificates
UNION ALL
SELECT 'Students', COUNT(*)::text 
FROM profiles WHERE role = 'student'
UNION ALL
SELECT 'Course Progress Records', COUNT(*)::text 
FROM lms_progress
UNION ALL
SELECT 'Credentials Uploaded', COUNT(*)::text 
FROM lms_progress WHERE evidence_url IS NOT NULL;
```

**Expected Output:**
```
Partner Courses: 1200+
Partner Providers: 7
Programs: 3-10
Active Programs: 3-10
Total Enrollments: 0-100
Active Enrollments: 0-50
Completed Enrollments: 0-20
Certificates Issued: 0-20
Students: 0-100
Course Progress Records: 0-500
Credentials Uploaded: 0-200
```

---

## Troubleshooting

### "Table doesn't exist" errors
- Run base schema migrations first
- Check `supabase/PRODUCTION_SETUP.sql`

### "No courses found"
- Run partner course migrations
- Check `supabase/migrations/archive-legacy/`

### "No programs"
- Create programs manually
- Or import from seed data

### "Stripe webhook not working"
- Check webhook URL in Stripe dashboard
- Verify webhook secret in env vars
- Check webhook logs

---

**Run the status check query above and let me know what you see!**
