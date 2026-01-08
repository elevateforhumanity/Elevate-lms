# What To Do Right Now

**Status:** Migrations have been run. Platform is configured. Ready for verification and launch.

---

## Step 1: Verify Database (5 minutes)

Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor

**Run this query:**
```sql
SELECT 'Partner Courses' as metric, COUNT(*)::text as value 
FROM partner_lms_courses
UNION ALL
SELECT 'Partner Providers', COUNT(*)::text 
FROM partner_lms_providers
UNION ALL
SELECT 'Programs', COUNT(*)::text 
FROM programs
UNION ALL
SELECT 'Enrollments', COUNT(*)::text 
FROM enrollments
UNION ALL
SELECT 'Certificates', COUNT(*)::text 
FROM certificates;
```

**What you should see:**
- Partner Courses: 1,200+ (or 0 if not loaded)
- Partner Providers: 7 (or 0)
- Programs: 3-10 (or 0 if not created)
- Enrollments: 0-100
- Certificates: 0-20

---

## Step 2: Based on Results

### If Partner Courses = 1,200+ ✅

**You're ready! Skip to Step 3.**

### If Partner Courses = 0 ⚠️

**Load partner courses:**

1. Open Supabase SQL Editor
2. Open file: `supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql`
3. Copy entire file contents
4. Paste into SQL Editor
5. Click "Run"
6. Wait 30-60 seconds
7. Re-run verification query

**Should now show 1,200+ courses**

---

## Step 3: Create Your First Program (15 minutes)

### Option A: Microsoft Office Bundle (Easiest)

**1. Create the program:**
```sql
INSERT INTO programs (
  name,
  slug,
  description,
  cost,
  duration_weeks,
  is_active,
  wioa_eligible,
  etpl_eligible
) VALUES (
  'Microsoft Office Specialist Bundle',
  'microsoft-office-bundle',
  'Master Word, Excel, and PowerPoint with industry-recognized certifications',
  492.00,
  12,
  true,
  false,
  false
) RETURNING id;
```

**Copy the returned ID** (you'll need it next)

**2. Get course IDs:**
```sql
SELECT id, course_name, retail_price 
FROM partner_lms_courses 
WHERE course_name LIKE '%MOS%' 
  AND course_name LIKE '%Excel%Associate%'
LIMIT 1;

SELECT id, course_name, retail_price 
FROM partner_lms_courses 
WHERE course_name LIKE '%MOS%' 
  AND course_name LIKE '%Word%Associate%'
LIMIT 1;

SELECT id, course_name, retail_price 
FROM partner_lms_courses 
WHERE course_name LIKE '%MOS%' 
  AND course_name LIKE '%PowerPoint%'
LIMIT 1;
```

**Copy these 3 course IDs**

**3. Link courses to program:**
```sql
-- Replace [program_id] with ID from step 1
-- Replace [course_ids] with IDs from step 2

INSERT INTO courses (
  title,
  slug,
  program_id,
  delivery_mode,
  partner_url,
  requires_credential,
  is_published
) VALUES 
(
  'Excel Associate Certification',
  'excel-associate',
  '[program_id]',
  'partner_link',
  'https://certiport.pearsonvue.com',
  true,
  true
),
(
  'Word Associate Certification',
  'word-associate',
  '[program_id]',
  'partner_link',
  'https://certiport.pearsonvue.com',
  true,
  true
),
(
  'PowerPoint Certification',
  'powerpoint',
  '[program_id]',
  'partner_link',
  'https://certiport.pearsonvue.com',
  true,
  true
);
```

### Option B: Milady Beauty Bundle

```sql
-- 1. Create program
INSERT INTO programs (
  name,
  slug,
  description,
  cost,
  duration_weeks,
  is_active
) VALUES (
  'Milady RISE Beauty Professional',
  'milady-rise-beauty',
  'Complete beauty professional training with Milady RISE certifications',
  129.85,
  8,
  true
) RETURNING id;

-- 2. Get Milady course IDs
SELECT id, course_name, retail_price 
FROM partner_lms_courses 
WHERE course_name LIKE '%RISE%'
ORDER BY retail_price;

-- 3. Link courses (use IDs from step 2)
INSERT INTO courses (
  title,
  slug,
  program_id,
  delivery_mode,
  partner_url,
  requires_credential,
  is_published
) VALUES 
(
  'Client Well-Being & Safety',
  'client-wellbeing',
  '[program_id]',
  'partner_link',
  'https://www.miladytraining.com/bundles/client-well-being-safety-certification',
  true,
  true
),
(
  'Finance Fundamentals',
  'finance-fundamentals',
  '[program_id]',
  'partner_link',
  'https://www.miladytraining.com/bundles/rise-certification-finance-fundamentals',
  true,
  true
);
```

---

## Step 4: Test Enrollment Flow (30 minutes)

### 1. Create Test Student

**Via signup page:**
- Go to: https://elevateforhumanity.institute/signup
- Create account: test@elevateforhumanity.institute
- Set password
- Verify email (check inbox)

**Or via SQL:**
```sql
-- Check if test user exists
SELECT id, email FROM auth.users WHERE email = 'test@elevateforhumanity.institute';
```

### 2. Create Test Enrollment

**Via admin dashboard:**
- Go to: https://elevateforhumanity.institute/admin
- Navigate to Enrollments
- Click "Create Enrollment"
- Select test student
- Select program
- Submit

**Or via SQL:**
```sql
-- Get student ID
SELECT id FROM profiles WHERE email = 'test@elevateforhumanity.institute';

-- Get program ID
SELECT id FROM programs WHERE slug = 'microsoft-office-bundle';

-- Create enrollment
INSERT INTO enrollments (
  student_id,
  program_id,
  status,
  enrollment_method,
  funding_source
) VALUES (
  '[student_id]',
  '[program_id]',
  'active',
  'workforce',
  'Test'
) RETURNING id;
```

### 3. Test Student Login

1. Go to: https://elevateforhumanity.institute/login
2. Login as: test@elevateforhumanity.institute
3. Should see dashboard with enrolled program
4. Should see list of courses
5. Click course → Should open partner link

### 4. Test Credential Upload

1. Complete a course on partner site (or simulate)
2. In student dashboard, click "Upload Credential"
3. Upload a test PDF/image
4. Verify it saves to `lms_progress.evidence_url`

**Check via SQL:**
```sql
SELECT 
  p.email,
  c.title as course,
  lp.status,
  lp.evidence_url,
  lp.completed_at
FROM lms_progress lp
JOIN profiles p ON p.id = lp.user_id
JOIN courses c ON c.id = lp.course_id
WHERE p.email = 'test@elevateforhumanity.institute';
```

---

## Step 5: Test Payment Flow (15 minutes)

### 1. Enable Stripe Test Mode

**Check Stripe dashboard:**
- Go to: https://dashboard.stripe.com
- Toggle to "Test mode" (top right)
- Get test API keys

### 2. Create Paid Enrollment

**Via enrollment form:**
- Student selects program
- Clicks "Enroll Now"
- Redirected to Stripe checkout
- Use test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

### 3. Verify Webhook

**Check Stripe dashboard:**
- Go to: Developers → Webhooks
- Find: `https://elevateforhumanity.institute/api/webhooks/stripe`
- Check recent events
- Should see: `checkout.session.completed`

**Check database:**
```sql
SELECT 
  id,
  status,
  payment_status,
  stripe_session_id,
  enrolled_at
FROM enrollments
ORDER BY created_at DESC
LIMIT 5;
```

---

## Step 6: Set Up Custom SMTP (Optional, 30 minutes)

**Why:** Built-in Supabase email has rate limits

**Recommended: Resend**

1. Sign up: https://resend.com
2. Get API key
3. Go to Supabase: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/auth
4. Scroll to "SMTP Settings"
5. Enable "Custom SMTP"
6. Fill in:
   ```
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [Your Resend API Key]
   Sender email: noreply@elevateforhumanity.institute
   Sender name: Elevate for Humanity
   ```
7. Save
8. Test by inviting a user

**See:** `SMTP_SETUP_GUIDE.md` for details

---

## Step 7: Launch Checklist

### Before Going Live

- [ ] Partner courses loaded (1,200+)
- [ ] At least 1 program created
- [ ] Test enrollment completed successfully
- [ ] Test payment processed
- [ ] Test credential upload works
- [ ] Stripe webhook receiving events
- [ ] Custom SMTP configured (recommended)
- [ ] Admin accounts created
- [ ] Support email configured

### Soft Launch (First 10 Students)

- [ ] Announce to small group
- [ ] Monitor enrollments closely
- [ ] Check for errors in real-time
- [ ] Gather feedback
- [ ] Fix any issues immediately

### Full Launch

- [ ] All systems tested and stable
- [ ] Support team ready
- [ ] Marketing materials ready
- [ ] Workforce board contracts signed
- [ ] Partner agreements confirmed

---

## Common Issues & Solutions

### Issue: "No courses showing in student dashboard"
**Solution:** 
- Check enrollment status is 'active'
- Verify courses are linked to program
- Check `is_published = true` on courses

### Issue: "Stripe webhook not working"
**Solution:**
- Verify webhook URL in Stripe dashboard
- Check webhook secret in environment variables
- Test webhook with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Issue: "Credential upload not saving"
**Solution:**
- Check Supabase Storage is configured
- Verify RLS policies on storage bucket
- Check file size limits

### Issue: "Certificate not generating"
**Solution:**
- Verify all courses completed
- Check all credentials uploaded
- Review certificate generation logic in code

---

## Quick Reference

### Important URLs

**Production Site:**
- Homepage: https://elevateforhumanity.institute
- Login: https://elevateforhumanity.institute/login
- Admin: https://elevateforhumanity.institute/admin

**Dashboards:**
- Supabase: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- Stripe: https://dashboard.stripe.com
- Vercel: https://vercel.com/dashboard

**Documentation:**
- READY_TO_LAUNCH.md - Complete launch guide
- AUTOMATED_ENROLLMENT_MODEL.md - How system works
- COURSE_INTEGRATION_STATUS.md - Partner courses
- VERIFY_DATABASE.md - Database checks

### Support Contacts

**Partners:**
- Certiport: 1-800-933-4493
- Milady: 866-848-5143

**Services:**
- Stripe Support: https://support.stripe.com
- Supabase Support: https://supabase.com/support
- Vercel Support: https://vercel.com/support

---

## Your Next Action

**Right now, do this:**

1. Open Supabase SQL Editor
2. Run the verification query from Step 1
3. Tell me the results
4. I'll guide you on next steps based on what you have

**The verification query again:**
```sql
SELECT 'Partner Courses' as metric, COUNT(*)::text as value 
FROM partner_lms_courses
UNION ALL
SELECT 'Partner Providers', COUNT(*)::text 
FROM partner_lms_providers
UNION ALL
SELECT 'Programs', COUNT(*)::text 
FROM programs
UNION ALL
SELECT 'Enrollments', COUNT(*)::text 
FROM enrollments
UNION ALL
SELECT 'Certificates', COUNT(*)::text 
FROM certificates;
```

**Once you run this, we'll know exactly what to do next!**
