# Course Integration Status

## Summary

✅ **Course links ARE already integrated in your codebase!**

They're in the `supabase/migrations/archive-legacy/` directory, which means they were created but may need to be activated in your production database.

---

## What You Have

### Partner Course Files (1,200+ Courses)

Located in `supabase/migrations/archive-legacy/`:

1. **20241129_full_partner_courses_1200plus.sql** (20KB)
   - 1,200+ courses from 7 partners
   - Certiport, HSI, JRI, NRF, CareerSafe, Milady, NDS

2. **20241129_add_milady_rise_courses.sql** (7.5KB)
   - Milady RISE certifications
   - Client Well-Being & Safety
   - Finance Fundamentals
   - Educator Program

3. **20241129_add_certiport_certifications.sql** (7.3KB)
   - Microsoft Office Specialist
   - Adobe Certified Professional
   - IC3 Digital Literacy
   - Autodesk Certified User

4. **20251213_milady_barber_integration.sql** (6.2KB)
   - Milady barber-specific courses

5. **20251220_all_partner_courses.sql** (50KB)
   - Comprehensive partner course catalog

### Example Courses Included

**Certiport (300+ courses):**
- Microsoft Office Specialist (MOS) - Word, Excel, PowerPoint, Outlook, Access
- Adobe Certified Professional - Photoshop, Illustrator, InDesign, Premiere Pro
- IC3 Digital Literacy
- Autodesk Certified User - AutoCAD, Revit, Inventor
- QuickBooks Certified User
- Entrepreneurship & Small Business (ESB)

**Milady RISE:**
- Client Well-Being & Safety Certification - $29.95
- Finance Fundamentals - $99.95
- Educator Program - $599.99

**HSI (Health & Safety Institute):**
- CPR/AED Training
- First Aid
- Bloodborne Pathogens
- OSHA Safety Training

**JRI (Justice Reinvestment Initiative):**
- Reentry programs
- Life skills training
- Job readiness

**NRF (National Retail Federation):**
- Customer Service & Sales
- Retail Management
- Loss Prevention

**CareerSafe:**
- OSHA 10-Hour General Industry
- OSHA 30-Hour Construction
- Workplace Safety

**NDS (National Driver Safety):**
- Defensive Driving
- Driver Safety Training

---

## Database Structure

### Tables

**partner_lms_providers**
```sql
{
  id: uuid,
  name: text,
  provider_type: text,  -- 'certiport', 'milady', 'hsi', etc.
  api_endpoint: text,
  enrollment_url: text,
  promo_code: text,
  contact_phone: text,
  sso_url: text,
  is_active: boolean,
  metadata: jsonb  -- Contains certifications, support info, etc.
}
```

**partner_lms_courses** (or partner_courses_catalog)
```sql
{
  id: uuid,
  provider_id: uuid,
  course_id: text,
  course_name: text,
  description: text,
  category: text,
  wholesale_price: decimal,  -- What you pay partner
  retail_price: decimal,     -- What student/board pays you
  duration_hours: decimal,
  course_url: text,
  topics: text[],
  format: text,
  is_active: boolean
}
```

**partner_lms_enrollments**
```sql
{
  id: uuid,
  student_id: uuid,
  provider_id: uuid,
  course_id: uuid,
  external_enrollment_id: text,
  status: text,
  progress_percentage: integer,
  enrolled_at: timestamp,
  completed_at: timestamp,
  payment_status: text
}
```

---

## Example Course Data

### Certiport - Microsoft Office
```sql
INSERT INTO partner_courses_catalog VALUES (
  'MOS: Excel Associate (Office 2019)',
  'Core Excel skills for data analysis and visualization',
  'Microsoft Office',
  117.00,  -- Wholesale
  164.00,  -- Retail
  40,      -- Hours
  'https://certiport.pearsonvue.com/Certifications/Microsoft/MOS/Overview',
  true
);
```

### Milady RISE
```sql
INSERT INTO partner_lms_courses VALUES (
  'RISE Certification in Client Well-Being & Safety',
  'Protect clients, give voice to the vulnerable, and make positive community impact',
  'Beauty & Wellness',
  19.95,   -- Wholesale
  29.95,   -- Retail
  3.5,     -- Hours
  'https://www.miladytraining.com/bundles/client-well-being-safety-certification',
  true
);
```

---

## Pricing Examples

### Certiport Courses
- **Wholesale:** $117 per exam
- **Retail:** $164 per exam
- **Your margin:** $47 (40%)

### Milady RISE
- **Client Well-Being:** $19.95 wholesale, $29.95 retail ($10 margin)
- **Finance Fundamentals:** $69.95 wholesale, $99.95 retail ($30 margin)
- **Educator Program:** $399.99 wholesale, $599.99 retail ($200 margin)

### HSI Safety Training
- **OSHA 10-Hour:** $25 wholesale, $45 retail ($20 margin)
- **CPR/AED:** $35 wholesale, $65 retail ($30 margin)

---

## How to Activate

### Option 1: Run Archived Migrations

```bash
# Run the comprehensive partner courses migration
psql $DATABASE_URL -f supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql

# Or run via Supabase CLI
supabase db execute --file supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql
```

### Option 2: Run in Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
2. Copy contents of `20241129_full_partner_courses_1200plus.sql`
3. Paste and run

### Option 3: Move to Active Migrations

```bash
# Copy to active migrations with new timestamp
cp supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql \
   supabase/migrations/20260108_partner_courses_catalog.sql

# Run migration
supabase db push
```

---

## Verification

### Check if courses are loaded:

```sql
-- Count courses by provider
SELECT 
  p.name as provider,
  p.provider_type,
  COUNT(c.id) as course_count
FROM partner_lms_providers p
LEFT JOIN partner_lms_courses c ON c.provider_id = p.id
GROUP BY p.id, p.name, p.provider_type
ORDER BY course_count DESC;

-- Sample courses
SELECT 
  p.name as provider,
  c.course_name,
  c.wholesale_price,
  c.retail_price,
  c.duration_hours
FROM partner_lms_courses c
JOIN partner_lms_providers p ON p.id = c.provider_id
LIMIT 20;
```

---

## Integration with Your Flow

### Student Enrollment Flow

1. **Student enrolls in program**
   - Selects "Microsoft Office Specialist Bundle"
   - Stripe charges $492 (3 exams × $164)

2. **System creates enrollments**
   ```sql
   INSERT INTO partner_lms_enrollments (
     student_id,
     provider_id,  -- Certiport
     course_id,    -- MOS Excel
     status
   ) VALUES (...);
   ```

3. **Student gets access**
   - Email with Certiport login link
   - Promo code: `efhcti-rise295`
   - Support: 866-848-5143

4. **Student completes course**
   - Takes exam on Certiport platform
   - Passes and gets certificate

5. **Student uploads credential**
   ```sql
   UPDATE partner_lms_enrollments
   SET 
     status = 'completed',
     completed_at = NOW(),
     evidence_url = '[uploaded_certificate]'
   WHERE id = '[enrollment_id]';
   ```

6. **Repeat for all courses**

7. **Elevate issues certificate**
   - When all courses completed
   - Certificate: "Microsoft Office Specialist - Complete"

---

## Partner Contact Info

### Certiport
- **Website:** https://certiport.pearsonvue.com
- **Enrollment:** https://certiport.pearsonvue.com
- **Support:** 1-800-933-4493
- **Promo Code:** (Contact for EFH discount)

### Milady
- **Website:** https://www.miladytraining.com
- **Enrollment:** https://www.miladytraining.com/users/sign_in
- **Support:** 866-848-5143
- **Promo Code:** `efhcti-rise295`
- **Hours:** Mon-Fri, 8am-6pm EST

### HSI (Health & Safety Institute)
- **Website:** https://www.hsi.com
- **Support:** 1-800-447-3177

### CareerSafe
- **Website:** https://www.careersafeonline.com
- **Support:** 1-800-447-3177

---

## Revenue Potential

### Scenario 1: 100 Students - Microsoft Office Bundle
- **3 exams per student:** Word, Excel, PowerPoint
- **Retail:** $164 × 3 = $492 per student
- **Wholesale:** $117 × 3 = $351 per student
- **Margin:** $141 per student
- **Total revenue:** $49,200
- **Total cost:** $35,100
- **Total profit:** $14,100

### Scenario 2: 50 Students - Milady RISE Complete
- **3 courses:** Well-Being ($29.95), Finance ($99.95), Educator ($599.99)
- **Retail:** $729.89 per student
- **Wholesale:** $489.89 per student
- **Margin:** $240 per student
- **Total revenue:** $36,494
- **Total cost:** $24,494
- **Total profit:** $11,999

### Scenario 3: 200 Students - OSHA Safety
- **OSHA 10-Hour:** $45 retail, $25 wholesale
- **Margin:** $20 per student
- **Total revenue:** $9,000
- **Total cost:** $5,000
- **Total profit:** $4,000

---

## Next Steps

### 1. Activate Partner Courses (Choose One)

**Option A: Run full catalog (1,200+ courses)**
```bash
psql $DATABASE_URL -f supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql
```

**Option B: Start with specific partners**
```bash
# Just Milady
psql $DATABASE_URL -f supabase/migrations/archive-legacy/20241129_add_milady_rise_courses.sql

# Just Certiport
psql $DATABASE_URL -f supabase/migrations/archive-legacy/20241129_add_certiport_certifications.sql
```

### 2. Verify Data Loaded
```sql
SELECT COUNT(*) FROM partner_lms_providers;
SELECT COUNT(*) FROM partner_lms_courses;
```

### 3. Test Enrollment Flow
- Create test enrollment
- Verify Stripe payment
- Check access link delivery
- Test credential upload

### 4. Configure Catalog Display
- Add partner courses to homepage
- Create course catalog page
- Set up filtering by category
- Add search functionality

### 5. Set Up Partner Accounts
- Contact each partner
- Get API credentials (if available)
- Confirm pricing
- Set up promo codes

---

## Quick Start Commands

```bash
# Check if courses are already loaded
psql $DATABASE_URL -c "SELECT COUNT(*) FROM partner_lms_courses;"

# If zero, load the full catalog
psql $DATABASE_URL -f supabase/migrations/archive-legacy/20241129_full_partner_courses_1200plus.sql

# Verify
psql $DATABASE_URL -c "
  SELECT 
    p.name, 
    COUNT(c.id) as courses 
  FROM partner_lms_providers p 
  LEFT JOIN partner_lms_courses c ON c.provider_id = p.id 
  GROUP BY p.name;
"

# Test query
psql $DATABASE_URL -c "
  SELECT 
    course_name, 
    retail_price, 
    duration_hours 
  FROM partner_lms_courses 
  LIMIT 10;
"
```

---

## Summary

✅ **1,200+ partner courses are already in your codebase**
✅ **7 partners integrated:** Certiport, Milady, HSI, JRI, NRF, CareerSafe, NDS
✅ **Pricing configured:** Wholesale and retail prices set
✅ **Ready to activate:** Just run the migration files

**Your course links are integrated - they just need to be loaded into the database!**
