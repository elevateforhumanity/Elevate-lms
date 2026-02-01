# ELEVATE FOR HUMANITY — REBUILD EXECUTION PLAN

**Priority:** Lock Admin Core first, then Barber/HVAC end-to-end

---

## PHASE 1: ADMIN CORE (Week 1)

### 1.1 Programs CRUD

**Current State:** READ only (0 create, 0 update, 0 delete)

**Required:**
- [ ] Create `/api/admin/programs` route (POST, GET)
- [ ] Create `/api/admin/programs/[id]` route (GET, PATCH, DELETE)
- [ ] Create `lib/validators/program.ts` with Zod schemas
- [ ] Create `lib/db/programs.ts` with Supabase operations
- [ ] Update `/admin/programs/page.tsx` with ProgramManagementClient
- [ ] Add program create/edit modal
- [ ] Add soft delete (archive) functionality

**Schema:**
```typescript
ProgramCreateSchema = {
  code: string (unique, e.g., "BARBER-2024")
  title: string
  description: string
  duration_weeks: number
  total_hours: number
  funding_eligible: boolean
  status: "draft" | "active" | "archived"
  requirements: string[]
  eligibility_rules: object
}
```

### 1.2 Applications CRUD + Workflow

**Current State:** CREATE exists, no UPDATE/workflow

**Required:**
- [ ] Create `/api/admin/applications` route
- [ ] Create `/api/admin/applications/[id]` route
- [ ] Add application status workflow: submitted → under_review → approved/rejected → enrolled
- [ ] Create ApplicationManagementClient with status transitions
- [ ] Add application review UI with approve/reject actions
- [ ] Link approved applications to enrollments

**Schema:**
```typescript
ApplicationUpdateSchema = {
  status: "submitted" | "under_review" | "approved" | "rejected" | "enrolled"
  reviewer_id: uuid
  review_notes: string
  reviewed_at: timestamp
}
```

### 1.3 Audit Logging

**Current State:** Table exists, not used

**Required:**
- [ ] Create `lib/audit.ts` with logging functions
- [ ] Add audit logging to all admin CRUD operations
- [ ] Create `/admin/audit-logs/page.tsx` with real data
- [ ] Log: actor, action, resource, before_state, after_state, timestamp

**Implementation:**
```typescript
async function logAudit(params: {
  actor_id: string;
  action: 'create' | 'update' | 'delete' | 'status_change';
  resource_type: string;
  resource_id: string;
  before_state?: object;
  after_state?: object;
})
```

---

## PHASE 2: MISSING TABLES (Week 1-2)

### 2.1 Intakes Table (Marketing Lead Capture)

```sql
CREATE TABLE public.intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- 'website', 'referral', 'partner'
  program_interest TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  zip_code TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'converted', 'closed'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted_to_application_id UUID REFERENCES applications(id)
);
```

### 2.2 Cohorts Table

```sql
CREATE TABLE public.cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES programs(id),
  code TEXT NOT NULL, -- 'BARBER-2024-Q1'
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  max_capacity INTEGER DEFAULT 20,
  status TEXT DEFAULT 'planned', -- 'planned', 'active', 'completed', 'cancelled'
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 Attendance Hours Table

```sql
CREATE TABLE public.attendance_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id),
  cohort_id UUID REFERENCES cohorts(id),
  date DATE NOT NULL,
  hours_logged DECIMAL(4,2) NOT NULL,
  type TEXT DEFAULT 'classroom', -- 'classroom', 'lab', 'ojt', 'online'
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## PHASE 3: BARBER PROGRAM END-TO-END (Week 2)

### Flow: Marketing → Intake → Application → Enrollment → Hours → Completion

**Step 1: Marketing CTA**
- [ ] Homepage "Get Started" → `/programs/barber`
- [ ] Barber page "Apply Now" → intake form
- [ ] Intake form writes to `intakes` table

**Step 2: Intake to Application**
- [ ] Admin reviews intakes at `/admin/intakes`
- [ ] "Convert to Application" creates application record
- [ ] Applicant receives email with application link

**Step 3: Application Processing**
- [ ] Applicant completes full application
- [ ] Admin reviews at `/admin/applications`
- [ ] Approve → creates enrollment
- [ ] Reject → sends rejection email

**Step 4: Enrollment & Cohort Assignment**
- [ ] Admin assigns to cohort at `/admin/cohorts`
- [ ] Student sees enrollment at `/student/enrollments`
- [ ] Student uploads required documents

**Step 5: Attendance Tracking**
- [ ] Instructor logs hours at `/instructor/attendance`
- [ ] Student views hours at `/student/hours`
- [ ] Admin monitors at `/admin/attendance`

**Step 6: Completion**
- [ ] System checks: hours >= required, all docs uploaded
- [ ] Admin marks complete
- [ ] Certificate generated
- [ ] Student downloads at `/student/certifications`

---

## PHASE 4: HVAC PROGRAM (Week 3)

Same pattern as Barber, different:
- Program requirements
- Hour requirements
- Certification type
- Partner sites (if OJT)

---

## PHASE 5: CLEANUP (Week 3-4)

### Pages to REMOVE (no value, confusing)

```
/admin/autopilots
/admin/course-generator
/admin/course-studio-ai
/admin/course-studio-simple
/admin/dashboard-enhanced
/admin/dev-studio
/admin/live-chat
/admin/master-dashboard
/admin/media-studio
/admin/portal-map
/admin/test-* (all test pages)
/admin/video-generator
```

### Pages to FIX (have value, need DB)

```
/admin/audit-logs → Connect to audit_logs table
/admin/compliance-dashboard → Connect to compliance data
/admin/data-import → Implement CSV import
/admin/grants/new → Connect to grants table
/admin/intake → Connect to intakes table
/admin/notifications → Connect to notifications table
```

---

## ACCEPTANCE TESTS

### Admin Core
- [ ] Can create a new program
- [ ] Can edit program details
- [ ] Can archive (soft delete) a program
- [ ] Can view all applications
- [ ] Can approve an application → creates enrollment
- [ ] Can reject an application → sends notification
- [ ] All admin actions logged to audit_logs

### Barber Flow
- [ ] Visitor submits intake form → record in intakes
- [ ] Admin converts intake → application created
- [ ] Applicant completes application → status updated
- [ ] Admin approves → enrollment created
- [ ] Student assigned to cohort
- [ ] Instructor logs hours → visible to student
- [ ] Student completes → certificate generated

### Security
- [ ] Student cannot access admin routes
- [ ] Partner cannot see other partners' data
- [ ] Instructor cannot modify enrollments
- [ ] All RLS policies enforced

---

## TIMELINE

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Admin Core | Programs, Applications, Audit CRUD |
| 2 | Barber E2E | Full intake → completion flow |
| 3 | HVAC E2E | Same pattern, different config |
| 4 | Cleanup | Remove broken pages, fix remaining |

---

## DO NOT SHIP UNTIL

1. ✅ Programs have full CRUD
2. ✅ Applications have workflow
3. ✅ Audit logging active
4. ✅ Barber flow works end-to-end
5. ✅ No broken admin pages
6. ✅ All CTAs write to database
7. ✅ RLS verified for all roles
