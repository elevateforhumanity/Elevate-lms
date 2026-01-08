# Dual Program Model - Funded vs Paid

## Overview

Your platform has **TWO distinct program types:**

### 1. Regular Programs (Workforce Board Funded)
- **Examples:** CNA, Building Tech, Barber (your core programs)
- **Student pays:** $0 (FREE to student)
- **Workforce board pays:** Full cost
- **You coordinate:** Funding, enrollment, compliance
- **Partners deliver:** Training

### 2. Partner Programs (Student Paid)
- **Examples:** Milady courses, Certiport certifications, online courses
- **Student pays:** Full retail price via Stripe
- **Workforce board:** Not involved
- **You collect:** Payment and keep margin
- **Partners deliver:** Training via their platform

---

## Program Type 1: Regular Programs (Funded)

### Flow
```
Student (FREE) → Apply for Funding → Workforce Board Approves → Enroll → Partner Delivers
```

### Examples
- **CNA Certification** - WIOA funded
- **Building Tech** - WRG funded
- **Barber License** - EmployIndy funded

### Revenue Model
- Workforce board pays: $1,500
- Partner cost: $1,000
- Your fee: $500

### Student Experience
1. Apply for program
2. Submit eligibility docs
3. Get approved by workforce board
4. Enroll for FREE
5. Complete training
6. Get job placement help

### Your Role
- Coordinate funding applications
- Manage workforce board relationships
- Track WIOA compliance
- Report outcomes
- Invoice workforce boards
- Pay partners

---

## Program Type 2: Partner Programs (Paid)

### Flow
```
Student → Browse Catalog → Pay You (Stripe) → Get Access Link → Partner Delivers
```

### Examples
- **Milady Cosmetology Courses** - $299
- **Certiport Microsoft Office** - $149
- **CompTIA A+ Prep** - $399
- **QuickBooks Certification** - $199

### Revenue Model
- Student pays: $299
- Partner cost: $199
- Your profit: $100

### Student Experience
1. Browse partner course catalog
2. Click "Enroll Now"
3. Pay via Stripe (card, Afterpay, Klarna, ACH)
4. Receive access link immediately
5. Complete course on partner's platform
6. Earn certification

### Your Role
- List partner courses in catalog
- Process payments via Stripe
- Provide access links
- Track completions
- Pay partners
- Issue certificates

---

## Side-by-Side Comparison

| Feature | Regular Programs | Partner Programs |
|---------|-----------------|------------------|
| **Who Pays** | Workforce Board | Student |
| **Cost to Student** | $0 (FREE) | $149-$999 |
| **Payment Method** | Invoice to board | Stripe checkout |
| **Funding Source** | WIOA/WRG/JRI | Self-pay |
| **Application** | Required | Not required |
| **Eligibility Docs** | Required | Not required |
| **Case Manager** | Yes | No |
| **WIOA Compliance** | Yes | No |
| **Attendance Tracking** | Required | Optional |
| **Job Placement** | Required | Optional |
| **Your Revenue** | $500-$1,000 | $50-$300 |
| **Volume** | Lower (50-200/year) | Higher (500-2,000/year) |

---

## Database Structure

### Regular Programs
```sql
-- Programs table
{
  id: uuid,
  name: 'CNA Certification',
  slug: 'cna-certification',
  cost: 0,  -- FREE to student
  wioa_eligible: true,
  etpl_eligible: true,
  delivery_mode: 'partner_link'
}

-- Enrollment with funding
{
  user_id: uuid,
  program_id: uuid,
  enrollment_method: 'workforce',
  funding_source: 'WIOA',
  funding_program_id: uuid,
  case_manager_name: 'Jane Smith',
  payment_id: null  -- No Stripe payment
}
```

### Partner Programs
```sql
-- Partner courses table
{
  id: uuid,
  provider_id: uuid,
  course_name: 'Milady Cosmetology Fundamentals',
  course_code: 'MILADY-COSM-101',
  course_url: 'https://milady.com/courses/cosm-101',
  wholesale_cost: 199.00,  -- What you pay partner
  retail_price: 299.00,    -- What student pays you
  requires_payment: true   -- Student must pay
}

-- Enrollment with payment
{
  user_id: uuid,
  course_id: uuid,
  enrollment_method: 'purchase',
  funding_source: 'Paid',
  payment_id: 'pi_xxx',  -- Stripe payment intent
  funding_program_id: null
}
```

---

## Catalog Display

### Homepage Sections

**Section 1: Core Training Programs (FREE)**
```
🎓 Workforce Development Programs
Get trained for FREE with workforce board funding

[CNA Certification] - FREE with WIOA
[Building Tech] - FREE with WRG  
[Barber License] - FREE with EmployIndy

→ Apply Now (leads to funding application)
```

**Section 2: Professional Certifications (Paid)**
```
📚 Professional Development Courses
Affordable certifications to advance your career

[Microsoft Office Specialist] - $149
[QuickBooks Certified User] - $199
[CompTIA A+ Prep] - $399

→ Enroll Now (leads to Stripe checkout)
```

---

## Student Journey

### Journey 1: Funded Program Student

**Step 1: Discovery**
- Sees "FREE CNA Training" on homepage
- Clicks "Apply Now"

**Step 2: Application**
- Fills out funding application
- Uploads eligibility docs (income, veteran status, etc.)
- Submits to workforce board

**Step 3: Approval**
- Case manager reviews
- Approves funding
- Student notified via email

**Step 4: Enrollment**
- Student enrolls (no payment)
- Gets partner access link
- Starts training

**Step 5: Completion**
- Completes training
- Earns certification
- Gets job placement help

### Journey 2: Paid Program Student

**Step 1: Discovery**
- Sees "Microsoft Office Certification - $149"
- Clicks "Enroll Now"

**Step 2: Checkout**
- Stripe checkout page
- Pays $149 (card, Afterpay, Klarna, ACH)
- Payment processed

**Step 3: Access**
- Immediately receives access link
- Email with course details
- Starts course right away

**Step 4: Completion**
- Completes course on partner site
- Earns certification
- Downloads certificate

---

## Revenue Streams

### Stream 1: Workforce Board Contracts
- **Volume:** 50-200 students/year
- **Revenue per student:** $500-$1,000
- **Annual revenue:** $25,000-$200,000
- **Margin:** 30-40%

### Stream 2: Partner Course Sales
- **Volume:** 500-2,000 students/year
- **Revenue per student:** $50-$300
- **Annual revenue:** $25,000-$600,000
- **Margin:** 20-40%

### Combined Model
- **Total students:** 550-2,200/year
- **Total revenue:** $50,000-$800,000
- **Diversified income:** Not dependent on one source

---

## Marketing Strategy

### For Funded Programs
**Target:** Unemployed, underemployed, low-income
**Message:** "Get trained for FREE"
**Channels:**
- WorkOne offices
- Community centers
- Social services
- Job fairs

### For Partner Programs
**Target:** Working professionals, career changers
**Message:** "Affordable certifications, instant access"
**Channels:**
- Google Ads
- Facebook/Instagram
- LinkedIn
- SEO

---

## Platform Configuration

### Courses Table Fields
```sql
ALTER TABLE courses ADD COLUMN IF NOT EXISTS
  delivery_mode TEXT DEFAULT 'internal',  -- 'internal' or 'partner_link'
  partner_url TEXT,                       -- Link to partner course
  requires_payment BOOLEAN DEFAULT false, -- TRUE for paid, FALSE for funded
  wholesale_cost DECIMAL(10,2),          -- What you pay partner
  retail_price DECIMAL(10,2),            -- What student/board pays
  funding_eligible BOOLEAN DEFAULT false, -- Can use workforce funding
  wioa_eligible BOOLEAN DEFAULT false,    -- WIOA approved
  etpl_eligible BOOLEAN DEFAULT false;    -- On ETPL list
```

### Enrollment Logic
```javascript
if (course.requires_payment && !hasFunding) {
  // Paid course - redirect to Stripe checkout
  redirectToCheckout(course.retail_price);
} else if (course.funding_eligible && hasFunding) {
  // Funded course - enroll with funding source
  enrollWithFunding(fundingProgramId);
} else {
  // Error - course requires payment or funding
  showError('This course requires payment or workforce funding');
}
```

---

## Admin Dashboard Views

### View 1: Funded Programs Dashboard
- Active funding applications
- Pending approvals
- Enrolled students by funding source
- Attendance tracking
- Completion rates
- Workforce board invoices

### View 2: Partner Programs Dashboard
- Course catalog
- Sales by course
- Revenue by partner
- Stripe transactions
- Completion rates
- Partner payments due

### View 3: Combined Analytics
- Total students (funded + paid)
- Total revenue (boards + students)
- Revenue by source
- Profit margins
- Growth trends

---

## Setup Checklist

### Funded Programs Setup
- [ ] Add funding programs (WIOA, WRG, etc.)
- [ ] Configure eligibility requirements
- [ ] Set up case manager workflow
- [ ] Create funding application form
- [ ] Configure WIOA compliance tracking
- [ ] Set up workforce board reporting

### Partner Programs Setup
- [ ] Add partner providers
- [ ] Add partner courses with pricing
- [ ] Configure Stripe checkout
- [ ] Enable BNPL options (Afterpay, Klarna)
- [ ] Set up access link delivery
- [ ] Create completion tracking

### Both
- [ ] Add partners who deliver training
- [ ] Set wholesale costs
- [ ] Configure partner payment schedule
- [ ] Set up progress reporting
- [ ] Create certificate templates

---

## Example Catalog

### Core Programs (Funded)
```
🏥 Healthcare
├─ CNA Certification - FREE with WIOA
├─ Medical Assistant - FREE with WRG
└─ Phlebotomy Tech - FREE with EmployIndy

🔧 Skilled Trades
├─ HVAC Technician - FREE with WIOA
├─ Electrical Apprentice - FREE with WRG
└─ Plumbing Basics - FREE with DOL

💇 Beauty & Barber
├─ Barber License - FREE with WIOA
├─ Cosmetology - FREE with WRG
└─ Nail Tech - FREE with EmployIndy
```

### Partner Programs (Paid)
```
💼 Business & Office
├─ Microsoft Office Specialist - $149
├─ QuickBooks Certified User - $199
└─ Google Workspace Essentials - $99

💻 IT & Technology
├─ CompTIA A+ Prep - $399
├─ Network+ Certification - $449
└─ Security+ Training - $499

🎨 Creative & Design
├─ Adobe Photoshop Certified - $249
├─ Graphic Design Fundamentals - $299
└─ Video Editing Pro - $349
```

---

## Key Differences Summary

### Funded Programs
- **Target:** Unemployed/underemployed
- **Barrier:** Application process
- **Benefit:** FREE to student
- **Volume:** Lower
- **Margin:** Higher per student
- **Compliance:** High (WIOA)

### Partner Programs
- **Target:** Working professionals
- **Barrier:** Price
- **Benefit:** Instant access
- **Volume:** Higher
- **Margin:** Lower per student
- **Compliance:** Low (just sales)

---

## What's Next

Your platform supports both models. You need to:

1. **Decide which to launch first:**
   - Funded programs = Higher setup, higher margin
   - Partner programs = Lower setup, faster revenue

2. **Set up the chosen model:**
   - Add programs/courses
   - Configure pricing
   - Set up payment/funding flow

3. **Test the flow:**
   - Funded: Application → Approval → Enrollment
   - Paid: Browse → Checkout → Access

Which model do you want to set up first?
