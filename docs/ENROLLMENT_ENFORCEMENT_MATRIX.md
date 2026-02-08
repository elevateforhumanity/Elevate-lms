# Enrollment Enforcement Matrix

> **This document is the authoritative source for enrollment state enforcement.**
> Every API, page, and background job MUST respect this matrix or refuse to run.

## Core Principle

No page, API, webhook, or background job decides eligibility on its own.
They all ask one authority: **Is this user allowed to do this action right now?**

If the answer is no → **hard stop, logged, traceable**.

---

## Enrollment States

| State | Description | Created By |
|-------|-------------|------------|
| `application_submitted` | Application received, awaiting payment | POST /api/applications |
| `payment_pending` | Stripe checkout created, payment in progress | Stripe checkout session |
| `enrolled_pending_orientation` | Payment complete, orientation required | Stripe webhook (checkout.session.completed) |
| `orientation_complete` | Orientation done, documents required | POST /api/enrollment/complete-orientation |
| `documents_pending` | Implicit state after orientation | (derived) |
| `active_enrolled` | All onboarding complete, active enrollment | POST /api/enrollment/submit-documents |
| `active_in_good_standing` | Active + payment current + shop approved | (derived) |
| `payment_hold` | Payment past due > 7 days | (derived from subscription) |
| `suspended` | Compliance issue or admin action | Admin action |
| `completed` | 2000 hours + coursework complete | System verification |

---

## Enforcement Matrix

### Legend
- ✅ = Allowed
- ❌ = Forbidden (403)
- ⚠️ = Conditional (see notes)

| Action | application_submitted | payment_pending | enrolled_pending_orientation | orientation_complete | documents_pending | active_enrolled | active_in_good_standing | payment_hold | suspended | completed |
|--------|----------------------|-----------------|------------------------------|---------------------|-------------------|-----------------|------------------------|--------------|-----------|-----------|
| View application status | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Stripe checkout | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Enrollment success page | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Access orientation | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Complete orientation | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upload documents | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Submit documents | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Access apprentice dashboard | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ | ✅ |
| Access courses | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ | ✅ |
| Access Milady | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ | ✅ |
| Clock in | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| Clock out | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| PWA check-in | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| Log hours | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ | ❌ | ❌ | ❌ |
| View progress | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update payment | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| State board prep | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ | ✅ |
| Generate completion packet | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Download transcript | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

### Conditional Rules (⚠️)

**Clock in / PWA check-in / Log hours in `active_enrolled`:**
- ✅ ONLY IF: `program_start_date <= today`
- ✅ ONLY IF: `payment_current = true` (past_due <= 7 days)
- ✅ ONLY IF: `partner_shop.status = 'approved'`
- ❌ Otherwise: 403 with specific reason

**Dashboard/Courses in `payment_hold`:**
- ✅ Read-only access allowed
- ❌ No new enrollments or actions

---

## Denial Reason Codes

| Code | HTTP | Message | When |
|------|------|---------|------|
| `NO_ENROLLMENT` | 403 | No enrollment found | User has no enrollment record |
| `PAYMENT_REQUIRED` | 403 | Payment required to continue | State is application_submitted |
| `PAYMENT_PENDING` | 403 | Payment is being processed | State is payment_pending |
| `ORIENTATION_REQUIRED` | 403 | Please complete orientation first | State is enrolled_pending_orientation |
| `DOCUMENTS_REQUIRED` | 403 | Please upload required documents | State is orientation_complete or documents_pending |
| `START_DATE_NOT_REACHED` | 403 | Training has not started yet | program_start_date > today |
| `PAYMENT_PAST_DUE` | 403 | Payment is past due | past_due_days > 7 |
| `PARTNER_NOT_APPROVED` | 403 | Training site not approved | partner.status != 'approved' |
| `ENROLLMENT_SUSPENDED` | 403 | Enrollment is suspended | State is suspended |
| `PROGRAM_COMPLETED` | 403 | Program is complete | State is completed (for certain actions) |
| `STATE_ENFORCEMENT_ERROR` | 403 | Action not allowed in current state | Generic state violation |

---

## Timeclock Enforcement (Critical)

Timeclock is a **legal recorder**, not a feature.

Before EVERY clock action, system MUST assert:

```
1. enrollment_state IN ('active_enrolled', 'active_in_good_standing')
2. payment_current = true (past_due_since <= 7 days OR NULL)
3. program_start_date <= NOW()
4. partner_shop.status = 'approved'
5. apprentice.status != 'suspended'
```

If ANY condition fails:
- Clock action is **rejected**
- Reason is **displayed to user**
- Event is **logged for audit**

---

## State Transitions

### Allowed Transitions

```
application_submitted → payment_pending
payment_pending → enrolled_pending_orientation
payment_pending → application_submitted (abandoned checkout)
enrolled_pending_orientation → orientation_complete
orientation_complete → documents_pending
orientation_complete → active_enrolled (if docs already submitted)
documents_pending → active_enrolled
active_enrolled → active_in_good_standing (derived)
active_enrolled → payment_hold (derived)
active_enrolled → suspended (admin action)
active_enrolled → completed (2000 hours + coursework)
active_in_good_standing → payment_hold (derived)
active_in_good_standing → suspended (admin action)
active_in_good_standing → completed
payment_hold → active_enrolled (payment updated)
payment_hold → suspended (admin action)
suspended → active_enrolled (admin action)
```

### Forbidden Transitions

- **NEVER** skip orientation
- **NEVER** skip documents
- **NEVER** go from payment_pending directly to active
- **NEVER** allow Stripe to advance past enrolled_pending_orientation

---

## Stripe Webhook Rules

### Stripe CAN:
- Create enrollment record (enrolled_pending_orientation)
- Update payment state
- Create apprentice record
- Provision Milady access

### Stripe CANNOT:
- Complete orientation
- Submit documents
- Activate timeclock
- Bypass any onboarding step

**This prevents "money accidentally unlocking compliance."**

---

## Stuck State Monitoring

Alert staff when records are stuck:

| State | Threshold | Alert |
|-------|-----------|-------|
| `enrolled_pending_orientation` | > 7 days | "Student hasn't started orientation" |
| `orientation_complete` / `documents_pending` | > 5 days | "Student hasn't uploaded documents" |
| `milady_provisioning_queue` | > 48 hours | "Milady access not provisioned" |
| `payment_hold` | > 14 days | "Payment severely past due" |

---

## API Enforcement Pattern

Every protected route MUST use this pattern:

```typescript
import { enforceEnrollmentState } from '@/lib/enrollment/enforcement';

export async function POST(request: NextRequest) {
  const { user } = await getUser();
  
  // ENFORCEMENT CHECK - REQUIRED
  const enforcement = await enforceEnrollmentState(user.id, 'clock_in', {
    partnerId: body.partner_id,
  });
  
  if (!enforcement.allowed) {
    return NextResponse.json(enforcement.error, { status: 403 });
  }
  
  // ... proceed with action
}
```

**There is no route-level logic deciding eligibility. That's how systems rot.**

---

## Audit Trail

Every enforcement check logs:

```json
{
  "user_id": "uuid",
  "event_type": "enforcement_check | enforcement_failure | state_transition",
  "current_state": "active_enrolled",
  "attempted_action": "clock_in",
  "result": "allowed | denied",
  "reason_code": "PAYMENT_PAST_DUE",
  "timestamp": "2024-01-15T10:30:00Z",
  "metadata": {
    "partner_id": "uuid",
    "days_past_due": 12
  }
}
```

---

## Implementation Checklist

- [x] State machine defined (`lib/enrollment/state-machine.ts`)
- [x] Enforcement function created (`lib/enrollment/enforcement.ts`)
- [x] Action enum defined (`lib/enrollment/actions.ts`)
- [x] Permission assertion (`lib/enrollment/assert-permission.ts`)
- [x] Middleware wrapper (`lib/enrollment/middleware.ts`)
- [x] Stripe webhook sets `enrollment_state = 'enrolled_pending_orientation'`
- [x] Orientation API uses enforcement, sets `enrollment_state = 'orientation_complete'`
- [x] Documents API uses enforcement, sets `enrollment_state = 'active_enrolled'`
- [x] Timeclock action API uses enforcement
- [x] Checkin API uses enforcement
- [x] Hours API uses enforcement wrapper
- [x] Stuck state monitoring cron job
- [x] Milady provisioning alerts cron job

## Code Review Policy

**NO PROTECTED ROUTE SHIPS WITHOUT THE ENFORCEMENT WRAPPER.**

### Required Pattern for New Routes

```typescript
import { 
  withEnrollmentEnforcement, 
  EnrollmentAction 
} from '@/lib/enrollment';

export const POST = withEnrollmentEnforcement(
  EnrollmentAction.YOUR_ACTION,
  async (request, { user, permission, supabase }) => {
    // Your handler code here
    // permission.data contains enrollment, apprentice, etc.
  }
);
```

### For Server Components/Actions

```typescript
import { 
  checkEnrollmentPermission, 
  EnrollmentAction 
} from '@/lib/enrollment';

const permission = await checkEnrollmentPermission(
  userId, 
  EnrollmentAction.VIEW_DASHBOARD
);

if (!permission.allowed) {
  redirect('/access-denied');
}
```

### Code Review Checklist

Before approving any PR that touches `/apprentice/*` or `/api/apprenticeship/*`:

1. [ ] Does it import from `@/lib/enrollment`?
2. [ ] Does it use `withEnrollmentEnforcement` or `checkEnrollmentPermission`?
3. [ ] Is the action from `EnrollmentAction` enum (not a string)?
4. [ ] Does it handle the permission denial properly?
5. [ ] Is the action appropriate for the route's purpose?

**If any answer is NO, the PR is rejected.**

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-02-07 | System | Initial enforcement matrix |
