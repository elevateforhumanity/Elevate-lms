# Multi-Partner Course Access Solution

**Date:** January 4, 2026  
**Issue:** Programs have multiple partners - how do students know which one to use?  
**Status:** Solution designed, ready to implement

---

## The Problem

### Current Scenario:

**Example: CNA Training Program**
- Available through **3 partners:**
  - Certiport (online, self-paced)
  - Milady (hybrid, instructor-led)
  - Local Community College (in-person)

**Student enrolls in "CNA Training"**
- ❓ Which partner do they use?
- ❓ How do they know which link to click?
- ❓ What if they want to switch partners?

---

## Current Database Structure

### Tables:
```sql
partner_lms_providers (
  id UUID,
  provider_name TEXT,        -- "Certiport", "Milady", etc.
  provider_type TEXT,        -- 'certiport', 'milady', 'hsi'
  active BOOLEAN
)

partner_courses (
  id UUID,
  provider_id UUID,          -- Links to partner
  course_name TEXT,          -- "CNA Training"
  external_course_code TEXT, -- Partner's course ID
  active BOOLEAN
)

partner_lms_enrollments (
  id UUID,
  provider_id UUID,          -- Which partner
  student_id UUID,
  course_id UUID,
  external_enrollment_id TEXT,
  status TEXT
)
```

**Key Insight:** `partner_lms_enrollments` already tracks which partner!

---

## Solution: Partner Selection During Enrollment

### Flow:

```
Student Journey:
1. Browse "CNA Training" program
2. Click "Enroll"
3. **NEW: Choose delivery method**
   ○ Certiport (Online, self-paced) - $0
   ○ Milady (Hybrid, instructor-led) - $0
   ○ Local College (In-person) - $0
4. Complete payment
5. Enrollment created with selected partner
6. Dashboard shows: "CNA Training via Certiport"
7. Click "Launch Course" → Goes to Certiport
```

---

## Implementation

### Step 1: Program Page - Show Partner Options

**File:** `app/programs/[slug]/page.tsx`

```typescript
// Fetch program with available partners
const { data: program } = await supabase
  .from('programs')
  .select(`
    *,
    partner_courses (
      id,
      course_name,
      provider:partner_lms_providers (
        id,
        provider_name,
        provider_type
      )
    )
  `)
  .eq('slug', slug)
  .single();

// Display partner options
<div className="space-y-4">
  <h3>Choose Your Learning Format:</h3>
  
  {program.partner_courses.map(course => (
    <div key={course.id} className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold">
            {course.provider.provider_name}
          </h4>
          <p className="text-sm text-gray-600">
            {getDeliveryDescription(course.provider.provider_type)}
          </p>
        </div>
        <button 
          onClick={() => enrollWithPartner(course.id, course.provider.id)}
          className="btn-primary"
        >
          Enroll with {course.provider.provider_name}
        </button>
      </div>
    </div>
  ))}
</div>

function getDeliveryDescription(type: string) {
  const descriptions = {
    'certiport': 'Online, self-paced, 24/7 access',
    'milady': 'Hybrid, instructor-led, scheduled classes',
    'hsi': 'Online safety training, interactive',
    'careersafe': 'OSHA-compliant safety courses',
    'nrf': 'Retail fundamentals, online',
    'nds': 'Dental safety, online',
    'jri': 'Justice reinvestment, in-person'
  };
  return descriptions[type] || 'Professional training';
}
```

---

### Step 2: Enrollment API - Store Partner Selection

**File:** `app/api/enrollments/create/route.ts`

```typescript
export async function POST(request: Request) {
  const { programId, partnerCourseId, providerId } = await request.json();
  const user = await getCurrentUser();
  
  // Create enrollment with partner info
  const { data: enrollment } = await supabase
    .from('partner_lms_enrollments')
    .insert({
      student_id: user.id,
      course_id: partnerCourseId,
      provider_id: providerId,
      program_id: programId,
      status: 'active',
      external_enrollment_id: generateExternalId(),
      enrolled_at: new Date().toISOString()
    })
    .select()
    .single();
  
  // Send email with partner info
  await sendEnrollmentEmail({
    studentEmail: user.email,
    programName: 'CNA Training',
    partnerName: 'Certiport',
    accessUrl: `/lms/courses/${enrollment.id}/launch`
  });
  
  return NextResponse.json({ enrollment });
}
```

---

### Step 3: Dashboard - Show Partner Info

**File:** `app/lms/(app)/dashboard/page.tsx`

```typescript
// Fetch enrollments with partner info
const { data: enrollments } = await supabase
  .from('partner_lms_enrollments')
  .select(`
    *,
    course:partner_courses (
      course_name,
      provider:partner_lms_providers (
        provider_name,
        provider_type
      )
    )
  `)
  .eq('student_id', user.id)
  .eq('status', 'active');

// Display in dashboard
{enrollments.map(enrollment => (
  <div key={enrollment.id} className="card">
    <h3>{enrollment.course.course_name}</h3>
    <p className="text-sm text-gray-600">
      via {enrollment.course.provider.provider_name}
    </p>
    <div className="flex items-center gap-4 mt-4">
      <ProgressBar value={enrollment.progress_percentage} />
      <Link 
        href={`/lms/courses/${enrollment.id}/launch`}
        className="btn-primary"
      >
        Continue Learning
      </Link>
    </div>
  </div>
))}
```

---

### Step 4: Launch - Use Correct Partner

**File:** `app/lms/courses/[enrollmentId]/launch/page.tsx`

```typescript
export default async function LaunchCourse({ params }: { params: { enrollmentId: string } }) {
  const supabase = await createClient();
  
  // Get enrollment with partner info
  const { data: enrollment } = await supabase
    .from('partner_lms_enrollments')
    .select(`
      *,
      provider:partner_lms_providers (
        provider_type,
        api_config
      ),
      course:partner_courses (
        external_course_code
      )
    `)
    .eq('id', params.enrollmentId)
    .single();
  
  // Get partner client
  const partnerClient = getPartnerClient(enrollment.provider.provider_type);
  
  // Generate SSO launch URL
  const launchUrl = await partnerClient.getSsoLaunchUrl({
    accountExternalId: enrollment.external_account_id,
    externalEnrollmentId: enrollment.external_enrollment_id,
    courseCode: enrollment.course.external_course_code,
    returnTo: `${process.env.NEXT_PUBLIC_APP_URL}/lms/dashboard`
  });
  
  // Track launch
  await supabase
    .from('partner_lms_enrollments')
    .update({ 
      last_accessed_at: new Date().toISOString() 
    })
    .eq('id', params.enrollmentId);
  
  // Redirect to partner platform
  redirect(launchUrl);
}
```

---

## User Experience Examples

### Example 1: Single Partner Program

**Barber Apprenticeship (only via Milady)**

```
Program Page:
┌─────────────────────────────────────┐
│ Barber Apprenticeship               │
│                                     │
│ Delivered by: Milady                │
│ Format: Hybrid (online + in-person)│
│                                     │
│ [Enroll Now]                        │
└─────────────────────────────────────┘

No choice needed - automatically enrolls with Milady
```

---

### Example 2: Multi-Partner Program

**CNA Training (3 partners)**

```
Program Page:
┌─────────────────────────────────────┐
│ CNA Training                        │
│                                     │
│ Choose Your Learning Format:        │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Certiport                       │ │
│ │ Online, self-paced, 24/7 access│ │
│ │                    [Enroll] →  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Milady                          │ │
│ │ Hybrid, instructor-led classes │ │
│ │                    [Enroll] →  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Local Community College         │ │
│ │ In-person, hands-on training   │ │
│ │                    [Enroll] →  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

Student chooses their preferred format
```

---

### Example 3: Student Dashboard

```
My Courses:
┌─────────────────────────────────────┐
│ CNA Training                        │
│ via Certiport                       │
│ ████████░░░░░░░░░░ 45% Complete    │
│ [Continue Learning →]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HVAC Fundamentals                   │
│ via HSI Safety                      │
│ ████████████████░░░░ 80% Complete  │
│ [Continue Learning →]               │
└─────────────────────────────────────┘

Clear indication of which partner for each course
```

---

## Benefits

### For Students:
✅ Clear choice of learning format
✅ Know which platform they're using
✅ Can choose based on learning style
✅ No confusion about where to go

### For Platform:
✅ Tracks which partner per enrollment
✅ Can report completion by partner
✅ Can calculate revenue share per partner
✅ Can measure partner performance

### For Partners:
✅ Clear attribution of students
✅ Students know they're using their platform
✅ Proper tracking of completions
✅ Fair revenue distribution

---

## Implementation Timeline

### Phase 1: Basic Partner Selection (2-3 days)

**Day 1:**
- [ ] Add partner selection to program page
- [ ] Update enrollment API to store partner
- [ ] Test enrollment flow

**Day 2:**
- [ ] Update dashboard to show partner info
- [ ] Update launch page to use correct partner
- [ ] Test full flow

**Day 3:**
- [ ] Add partner descriptions/icons
- [ ] Polish UI
- [ ] Test with multiple partners

---

### Phase 2: Enhanced Features (1 week)

**Week 1:**
- [ ] Add partner comparison table
- [ ] Add partner reviews/ratings
- [ ] Add "Switch Partner" functionality
- [ ] Add partner-specific pricing
- [ ] Add partner availability calendar

---

## Edge Cases

### What if student wants to switch partners?

**Solution:**
```typescript
// Allow partner switch before course starts
if (enrollment.progress_percentage === 0) {
  // Create new enrollment with different partner
  // Cancel old enrollment
  // Refund if needed
}

// After course started - no switching
if (enrollment.progress_percentage > 0) {
  return "Cannot switch partners after starting course";
}
```

---

### What if partner becomes unavailable?

**Solution:**
```typescript
// Check partner status before launch
const { data: provider } = await supabase
  .from('partner_lms_providers')
  .select('active')
  .eq('id', providerId)
  .single();

if (!provider.active) {
  // Show message to student
  // Offer alternative partner
  // Contact support
}
```

---

### What if program has no partners?

**Solution:**
```typescript
// Self-hosted course
if (program.partner_courses.length === 0) {
  // Use internal LMS
  // Show course player
  // Track progress internally
}
```

---

## Database Queries

### Get programs with partner options:
```sql
SELECT 
  p.id,
  p.title,
  p.slug,
  json_agg(
    json_build_object(
      'course_id', pc.id,
      'partner_name', plp.provider_name,
      'partner_type', plp.provider_type,
      'delivery_format', pc.metadata->>'delivery_format'
    )
  ) as partner_options
FROM programs p
LEFT JOIN partner_courses pc ON pc.program_id = p.id
LEFT JOIN partner_lms_providers plp ON plp.id = pc.provider_id
WHERE p.slug = 'cna-training'
  AND plp.active = true
GROUP BY p.id;
```

### Get student enrollments with partners:
```sql
SELECT 
  ple.id,
  ple.status,
  ple.progress_percentage,
  pc.course_name,
  plp.provider_name,
  plp.provider_type
FROM partner_lms_enrollments ple
JOIN partner_courses pc ON pc.id = ple.course_id
JOIN partner_lms_providers plp ON plp.id = ple.provider_id
WHERE ple.student_id = $1
  AND ple.status = 'active'
ORDER BY ple.enrolled_at DESC;
```

---

## Recommendation

**Implement Phase 1 this week (2-3 days)**

This solves the critical UX issue:
- Students know which partner they're using
- Dashboard shows partner info clearly
- Launch goes to correct partner platform
- Tracking works properly

**Phase 2 can wait** until you have multiple partners per program actively being used.

---

## Bottom Line

**The infrastructure already exists.**

You just need to:
1. Show partner options on program page
2. Store partner selection during enrollment
3. Display partner info in dashboard
4. Use correct partner when launching

**2-3 days of work to complete.**

---

**Last Updated:** January 4, 2026  
**Status:** Ready to implement  
**Priority:** High (UX critical)
