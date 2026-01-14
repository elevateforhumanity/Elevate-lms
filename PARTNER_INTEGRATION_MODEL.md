# Partner Integration Model

## Overview

**Your Business Model:**
- Elevate = Hub/Coordinator (you handle enrollment, payment, tracking)
- Partners = Course Delivery (they teach the actual courses)
- Revenue = You charge retail price, pay partners wholesale cost, keep margin

## How It Works

### 1. Partner Setup
Partners integrate via **link-based courses**:
- Partner provides course URL (their LMS/platform)
- You add partner to your database
- You set wholesale cost (what you pay them)
- You set retail price (what students pay you)
- Profit margin = retail - wholesale

### 2. Student Enrollment Flow
```
Student → Your Platform → Pays You (Stripe) → Enrolls → Partner Link → Partner Delivers Course
```

**Student Experience:**
1. Browse courses on www.elevateforhumanity.org
2. Click "Enroll" on partner course
3. Pay YOU via Stripe (with BNPL options: Afterpay, Klarna, ACH)
4. Get access link to partner's platform
5. Complete course on partner's site
6. Partner reports completion back to you

### 3. Payment Flow
```
Student pays $1,500 → Stripe → Your Account
You pay partner $1,000 (wholesale)
You keep $500 (profit margin)
```

## Database Structure

### Partner Tables (Already Built)

**partner_lms_providers**
- Partner organization info
- API credentials (if automated)
- Active status

**partner_lms_courses** (or partner_courses)
- Course details
- External course ID
- Wholesale cost (what you pay partner)
- Retail price (what student pays you)
- Partner URL/link

**partner_lms_enrollments**
- Student enrollment record
- Link to partner course
- Progress tracking
- Completion status

### Course Delivery Modes

Your `courses` table supports:
- `delivery_mode`: 'internal' or 'partner_link'
- `partner_url`: Link to partner's course
- `launch_mode`: 'external' (new tab), 'iframe' (embedded), 'internal'
- `allow_iframe`: Whether partner allows embedding

## What Students See

### On Your Platform:
- ✅ Course catalog
- ✅ Enrollment/payment
- ✅ Progress dashboard
- ✅ Completion certificates
- ✅ Job placement tracking
- ✅ Support/help

### On Partner Platform:
- ✅ Actual course content
- ✅ Videos/lessons
- ✅ Quizzes/assessments
- ✅ Instructor interaction
- ✅ Course materials

## What You Manage

### Enrollment & Payment
- Student signs up on your site
- Stripe checkout (card, BNPL, ACH)
- You collect full retail price
- You pay partner wholesale cost

### Tracking & Reporting
- Enrollment status
- Progress updates (from partner)
- Completion tracking
- Workforce board reporting
- WIOA compliance

### Student Support
- Enrollment questions
- Payment issues
- Progress tracking
- Job placement
- Funding coordination

## What Partners Manage

### Course Delivery
- Course content
- Instruction
- Assessments
- Grading
- Student support (course-specific)

### Progress Reporting
Partners report back to you:
- Enrollment confirmation
- Progress updates
- Completion status
- Certification earned

## Integration Methods

### Option 1: Manual Link (Simplest)
**Setup:**
1. Partner provides course URL
2. You add to database with pricing
3. Student pays you, gets link
4. Partner manually tracks completion
5. Partner reports completion to you

**Best for:** Small partners, low volume

### Option 2: API Integration (Automated)
**Setup:**
1. Partner provides API credentials
2. You auto-create enrollments via API
3. You auto-sync progress
4. You auto-track completion

**Best for:** Large partners, high volume, partners with APIs

### Option 3: SCORM/LTI (Advanced)
**Setup:**
1. Partner provides SCORM package or LTI credentials
2. You host/embed course content
3. You track everything automatically

**Best for:** Partners who provide SCORM content

## Current Implementation

Your system already has:
- ✅ Partner course tables
- ✅ Stripe checkout with BNPL
- ✅ Wholesale/retail pricing
- ✅ Link-based course delivery
- ✅ Progress tracking
- ✅ Enrollment management

## Setup Steps

### 1. Add Partner Provider
```sql
INSERT INTO partner_lms_providers (name, provider_type, is_active)
VALUES ('Milady Beauty School', 'external_lms', true);
```

### 2. Add Partner Course
```sql
INSERT INTO partner_courses (
  provider_id,
  course_name,
  course_code,
  course_url,
  wholesale_cost,
  retail_price,
  requires_payment,
  description
) VALUES (
  '[provider_id]',
  'Cosmetology Fundamentals',
  'COSM-101',
  'https://milady.com/courses/cosm-101',
  1000.00,  -- What you pay partner
  1500.00,  -- What student pays you
  true,
  'Complete cosmetology training'
);
```

### 3. Student Enrolls
- Student clicks "Enroll"
- Stripe checkout: $1,500
- System creates enrollment
- Student gets access link
- Partner delivers course

### 4. Track Progress
- Partner reports completion
- You update enrollment status
- You issue certificate
- You report to workforce board

## Revenue Model

### Example: CNA Program

**Retail Price:** $1,500 (what student pays you)
**Wholesale Cost:** $1,000 (what you pay partner)
**Your Margin:** $500 (33% profit)

**With 100 students:**
- Revenue: $150,000
- Partner cost: $100,000
- Your profit: $50,000

## Partner Types

### Training Providers
- Deliver actual instruction
- Have facilities/instructors
- Examples: Milady, Certiport, local training centers

### Content Providers
- Provide course materials
- You or partner delivers instruction
- Examples: SCORM content, video courses

### Certification Bodies
- Provide exams/certifications
- Partner with training providers
- Examples: State boards, industry certifications

## Student Dashboard Shows

### Enrolled Courses
```
📚 CNA Training
Provider: ABC Training Center
Status: In Progress (45%)
Next Class: Jan 15, 2026
[Launch Course] button → Opens partner link
```

### Progress Tracking
- Enrollment date
- Current progress %
- Expected completion date
- Attendance (if partner reports)
- Grades/assessments

### Completion
- Certificate issued
- Credential earned
- Job placement assistance
- Next steps

## Admin Dashboard Shows

### Partner Management
- List of partners
- Active courses per partner
- Revenue per partner
- Enrollment stats

### Financial Tracking
- Revenue collected
- Partner payments due
- Profit margins
- Payment status

### Enrollment Management
- Active enrollments
- Pending payments
- Completion rates
- Student progress

## Next Steps to Go Live

### 1. Add Your Partners (30 min)
- Create partner provider records
- Get course URLs from partners
- Set wholesale/retail pricing

### 2. Configure Stripe (if not done)
- Enable BNPL options
- Set up webhooks
- Test checkout flow

### 3. Test Enrollment Flow (1 hour)
- Create test partner course
- Enroll test student
- Verify payment flow
- Test access link delivery

### 4. Partner Onboarding (ongoing)
- Send partner integration guide
- Get course URLs
- Agree on pricing
- Set up reporting process

## Partner Agreement Template

**Key Terms:**
- Wholesale pricing
- Payment schedule (per enrollment, monthly, etc.)
- Progress reporting requirements
- Completion verification process
- Student support responsibilities
- Revenue share (if applicable)

## Technical Requirements

### For Partners:
- Course URL (accessible to enrolled students)
- Unique enrollment links (optional)
- Progress reporting method (manual or API)
- Completion notification process

### For You:
- Stripe account configured
- Partner records in database
- Course catalog updated
- Student enrollment system
- Progress tracking dashboard

## Support Model

### You Handle:
- Enrollment questions
- Payment issues
- Platform navigation
- Job placement
- Funding coordination

### Partner Handles:
- Course content questions
- Technical course issues
- Grading/assessments
- Instructor communication

## Reporting

### To Workforce Boards:
- Enrollment numbers
- Completion rates
- Job placement outcomes
- WIOA compliance data

### To Partners:
- Enrollment confirmations
- Payment schedules
- Student contact info
- Completion requests

### To Students:
- Enrollment confirmation
- Course access details
- Progress updates
- Completion certificates

## Quick Start Checklist

- [ ] Add first partner to database
- [ ] Add first partner course with pricing
- [ ] Test Stripe checkout flow
- [ ] Enroll test student
- [ ] Verify access link delivery
- [ ] Test progress tracking
- [ ] Test completion flow
- [ ] Issue test certificate

## Example Partners

### Healthcare Training
- **Partner:** Local nursing school
- **Course:** CNA Certification
- **Wholesale:** $800
- **Retail:** $1,200
- **Margin:** $400

### Skilled Trades
- **Partner:** Building trades academy
- **Course:** HVAC Fundamentals
- **Wholesale:** $1,500
- **Retail:** $2,000
- **Margin:** $500

### Beauty/Barber
- **Partner:** Milady/cosmetology school
- **Course:** Barber License Prep
- **Wholesale:** $1,000
- **Retail:** $1,500
- **Margin:** $500

## Revenue Projections

### Conservative (100 students/year)
- Average retail: $1,500
- Average wholesale: $1,000
- Revenue: $150,000
- Partner costs: $100,000
- **Profit: $50,000**

### Moderate (500 students/year)
- Revenue: $750,000
- Partner costs: $500,000
- **Profit: $250,000**

### Scale (1,000 students/year)
- Revenue: $1,500,000
- Partner costs: $1,000,000
- **Profit: $500,000**

## Key Success Factors

1. **Partner Quality** - Vet partners for quality delivery
2. **Pricing Strategy** - Balance affordability with margins
3. **Student Support** - Excellent enrollment/payment experience
4. **Progress Tracking** - Keep students and funders informed
5. **Job Placement** - Prove ROI with employment outcomes

---

**Your platform is ready for partner integration. Next step: Add your first partner and course.**
