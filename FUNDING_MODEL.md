# Workforce Board Funding Model

## Overview

**Students DON'T pay - Workforce Boards DO**

Your platform coordinates workforce development funding where:
- Students enroll for FREE (to them)
- Workforce boards/funding sources pay for training
- Partners deliver the courses
- You coordinate everything and bill the funding sources

## The Real Flow

```
Student (Free) → Your Platform → Workforce Board Pays → You Pay Partner → Partner Delivers
```

## Funding Sources

Your system supports multiple funding sources:
- **WIOA** (Workforce Innovation and Opportunity Act)
- **WRG** (Workforce Ready Grant)
- **JRI** (Justice Reinvestment Initiative)
- **DOL** (Department of Labor programs)
- **EmployIndy** (Local workforce board)
- **Partner-funded** (Employer pays)
- **Paid** (Self-pay, rare)

## How It Works

### 1. Student Applies
```
Student → Applies for program
        → Provides eligibility docs
        → Gets approved by workforce board
        → Enrolls for FREE
```

### 2. Funding Application
```sql
-- Student submits funding application
INSERT INTO funding_applications (
  user_id,
  program_id,
  course_id,
  status,
  case_manager_name,
  case_manager_email,
  referral_source,
  household_income,
  employment_status,
  barriers
) VALUES (...);
```

### 3. Enrollment with Funding
```sql
-- Once approved, student enrolls
INSERT INTO enrollments (
  user_id,
  course_id,
  enrollment_method,  -- 'voucher' or 'workforce'
  funding_source,     -- 'WIOA', 'WRG', etc.
  funding_program_id, -- Links to funding_programs table
  case_manager_name,
  case_manager_email,
  workone_region
) VALUES (...);
```

### 4. Partner Delivers Course
- Student gets access link to partner's platform
- Partner delivers training (FREE to student)
- Partner tracks attendance/progress
- Partner reports completion

### 5. You Bill Workforce Board
- Track student attendance (WIOA compliance)
- Track completion/outcomes
- Generate reports for workforce board
- Invoice workforce board for completed training
- Pay partner their wholesale cost
- Keep your coordination fee

## Revenue Model

### Example: CNA Program

**Workforce Board Pays:** $1,500 per student
**Partner Cost:** $1,000 per student
**Your Fee:** $500 per student (coordination/admin)

**With 100 WIOA students:**
- Workforce board pays: $150,000
- Partner costs: $100,000
- Your revenue: $50,000

## Database Structure

### funding_programs
Workforce boards and funding sources:
```sql
{
  id: uuid,
  code: 'WIOA-REGION-5',
  name: 'WIOA Region 5 - Indianapolis',
  contact_email: 'caseworker@workone.in.gov',
  report_day: 5  -- Weekly report day
}
```

### funding_applications
Student applications for funding:
```sql
{
  id: uuid,
  user_id: uuid,
  program_id: uuid,  -- Which funding program
  course_id: uuid,
  status: 'approved',  -- submitted|pending_docs|approved|denied|waitlist
  case_manager_name: 'Jane Smith',
  case_manager_email: 'jane@workone.gov',
  referral_source: 'WorkOne Indianapolis',
  household_income: 25000,
  employment_status: 'unemployed',
  barriers: 'Transportation, childcare'
}
```

### enrollments (with funding)
```sql
{
  user_id: uuid,
  course_id: uuid,
  enrollment_method: 'workforce',  -- Not 'purchase'
  funding_source: 'WIOA',
  funding_program_id: uuid,
  case_manager_name: 'Jane Smith',
  case_manager_email: 'jane@workone.gov',
  workone_region: 'Region 5'
}
```

### WIOA Compliance Tables

**participant_eligibility**
- Tracks WIOA eligibility criteria
- Veteran status
- Dislocated worker
- Low income
- Youth
- Disability

**attendance_records**
- Required for WIOA compliance
- Clock in/out times
- Total hours
- Excused absences

**employment_outcomes**
- Job placement tracking
- Wages earned
- 2nd quarter follow-up (4-6 months)
- 4th quarter follow-up (10-12 months)

## Student Experience

### 1. Application
- Student applies on your site
- Provides eligibility documents
- Submits to workforce board

### 2. Approval
- Case manager reviews application
- Approves funding
- Student notified

### 3. Enrollment
- Student enrolls (no payment required)
- Gets access to partner course
- Starts training

### 4. Training
- Attends partner's course
- Completes requirements
- Earns certification

### 5. Job Placement
- You help with job placement
- Track employment outcomes
- Report to workforce board

## Workforce Board Experience

### 1. Referrals
- Case managers refer students to you
- Provide funding approval
- Set enrollment limits

### 2. Tracking
- Receive weekly/monthly reports
- Track attendance
- Monitor completion rates

### 3. Outcomes
- Receive employment data
- Get WIOA compliance reports
- Verify ROI

### 4. Payment
- Receive invoices for completed training
- Pay based on completion/outcomes
- May use performance-based contracts

## Partner Experience

### 1. Enrollment Notification
- You notify partner of new student
- Provide student contact info
- Confirm funding source

### 2. Course Delivery
- Partner delivers training
- Tracks attendance
- Reports progress to you

### 3. Completion
- Partner reports completion
- Provides certification
- Confirms outcomes

### 4. Payment
- You pay partner wholesale cost
- Based on completion/milestones
- Monthly or per-student basis

## Your Platform's Role

### Coordination
- Match students with funding sources
- Route enrollments to partners
- Track all parties

### Compliance
- WIOA reporting
- Attendance tracking
- Outcome measurement
- Documentation management

### Billing
- Invoice workforce boards
- Pay partners
- Track revenue/costs

### Support
- Student support
- Case manager communication
- Partner coordination

## Payment Timing

### Option 1: Upfront
- Workforce board pays upon enrollment
- You pay partner upon enrollment
- Risk: Student doesn't complete

### Option 2: Milestone-Based
- Payment at 25%, 50%, 75%, 100% completion
- Reduces risk
- More admin overhead

### Option 3: Completion-Based
- Payment only upon completion
- Lowest risk for workforce board
- Highest risk for you/partner

### Option 4: Outcome-Based
- Payment upon job placement
- Highest accountability
- Requires strong job placement services

## Reporting Requirements

### Weekly Reports (to workforce boards)
- New enrollments
- Attendance summary
- Progress updates
- Issues/barriers

### Monthly Reports
- Completion rates
- Certification earned
- Job placements
- Outcome metrics

### Quarterly Reports (WIOA)
- 2nd quarter follow-up (employment)
- 4th quarter follow-up (retention)
- Wage data
- Credential attainment

## Compliance Tracking

### WIOA Requirements
- Eligibility documentation
- Attendance records (80% minimum)
- Progress tracking
- Completion verification
- Employment outcomes
- Wage verification
- Follow-up at 2nd and 4th quarters

### Your System Tracks
- ✅ Eligibility (participant_eligibility table)
- ✅ Attendance (attendance_records table)
- ✅ Progress (enrollments.progress_percentage)
- ✅ Completion (enrollments.completed_at)
- ✅ Employment (employment_outcomes table)
- ✅ Follow-ups (employment_tracking table)

## Setup Steps

### 1. Add Funding Programs
```sql
INSERT INTO funding_programs (code, name, contact_email, report_day)
VALUES 
  ('WIOA-R5', 'WIOA Region 5 Indianapolis', 'reports@workone.in.gov', 5),
  ('WRG-2026', 'Workforce Ready Grant 2026', 'wrg@dwd.in.gov', 1),
  ('EMPLOYINDY', 'EmployIndy', 'training@employindy.org', 3);
```

### 2. Add Partners
```sql
INSERT INTO partner_lms_providers (name, provider_type, is_active)
VALUES ('ABC Training Center', 'external_lms', true);
```

### 3. Add Partner Courses
```sql
INSERT INTO partner_courses (
  provider_id,
  course_name,
  course_code,
  course_url,
  wholesale_cost,
  retail_price,  -- What workforce board pays
  requires_payment,
  description
) VALUES (
  '[provider_id]',
  'CNA Certification',
  'CNA-101',
  'https://abctraining.com/cna',
  1000.00,  -- What you pay partner
  1500.00,  -- What workforce board pays you
  false,    -- Student doesn't pay
  'State-approved CNA training'
);
```

### 4. Student Applies
- Student fills out application
- Uploads eligibility docs
- Submits to case manager

### 5. Case Manager Approves
- Reviews application
- Approves funding
- Notifies student

### 6. Student Enrolls
- Enrollment created with funding_source
- No payment required
- Access link provided

### 7. Track & Report
- Monitor attendance
- Track progress
- Report to workforce board
- Invoice upon completion

## Revenue Scenarios

### Scenario 1: WIOA-Funded CNA Program
- **Students:** 50 per year
- **Workforce board pays:** $1,500 each = $75,000
- **Partner cost:** $1,000 each = $50,000
- **Your revenue:** $500 each = $25,000

### Scenario 2: Multiple Funding Sources
- **WIOA:** 30 students × $1,500 = $45,000
- **WRG:** 20 students × $1,200 = $24,000
- **EmployIndy:** 15 students × $1,800 = $27,000
- **Total revenue:** $96,000
- **Partner costs:** $65,000
- **Your profit:** $31,000

### Scenario 3: Outcome-Based Contracts
- **Base payment:** $1,000 per enrollment
- **Completion bonus:** $300 per completion
- **Job placement bonus:** $200 per placement
- **Total potential:** $1,500 per successful student

## Key Success Factors

### 1. Strong Workforce Board Relationships
- Regular communication
- Accurate reporting
- Quick response times
- Proven outcomes

### 2. Quality Partners
- High completion rates
- Good job placement
- Reliable reporting
- Student satisfaction

### 3. Compliance Excellence
- Accurate attendance tracking
- Complete documentation
- Timely reporting
- Audit-ready records

### 4. Job Placement Services
- Employer partnerships
- Resume/interview prep
- Job matching
- Follow-up support

## Admin Dashboard Needs

### Funding Management
- List of funding programs
- Active applications
- Approval workflow
- Funding allocation tracking

### Enrollment Management
- Enrollments by funding source
- Attendance tracking
- Progress monitoring
- Completion verification

### Reporting
- Weekly reports for workforce boards
- Monthly outcome reports
- WIOA compliance reports
- Financial reports

### Billing
- Invoice generation
- Payment tracking
- Partner payments
- Revenue/cost analysis

## Next Steps

### Immediate Setup
1. **Add funding programs** (WIOA, WRG, etc.)
2. **Add partners** with wholesale costs
3. **Configure courses** with workforce board pricing
4. **Set up reporting** workflows

### Test Flow
1. Create test funding application
2. Approve application
3. Enroll student (no payment)
4. Provide partner access
5. Track attendance
6. Generate report
7. Create invoice

### Go Live
1. Onboard workforce boards
2. Sign partner agreements
3. Launch student applications
4. Begin enrollments
5. Start reporting

---

**Your platform is built for workforce board funding. The infrastructure is ready - you just need to add funding programs and partners.**
