# Current Enrollment Flow Documentation

## State Names (Canonical)

```typescript
type EnrollmentState = 
  | 'application_submitted'
  | 'payment_pending'
  | 'enrolled_pending_orientation'  // ← Stripe webhook sets this
  | 'orientation_complete'
  | 'documents_pending'
  | 'active_enrolled'
  | 'active_in_good_standing'
  | 'payment_hold'
  | 'suspended'
  | 'completed';
```

## Stripe Webhook Flow (checkout.session.completed)

**Location:** `app/api/webhooks/stripe/route.ts` lines 777-1130

### What Happens When Payment Succeeds:

1. **Create student_enrollments record** (line 872-886)
   - Sets `enrollment_state: 'enrolled_pending_orientation'`
   - Sets `status: 'enrolled'`
   - Records `stripe_checkout_session_id`
   - Records `transfer_hours`, `funding_source`, `amount_paid`

2. **Sync to enrollments table** (line 889-898)
   - Upserts to `enrollments` table for portal compatibility
   - Same `enrollment_state: 'enrolled_pending_orientation'`

3. **Log state transition** (line 903-918)
   - Creates `enrollment_state_audit` record
   - `from_state: 'payment_pending'`
   - `to_state: 'enrolled_pending_orientation'`
   - `reason: 'Stripe checkout.session.completed'`

4. **Create enrollment case** (line 921-940)
   - Creates case spine for workflow automation
   - Links enrollment to case
   - Transitions case to `pending_signatures`

5. **Create apprentices record** (line 960-990)
   - Creates record for timeclock context API
   - Sets `status: 'active'`
   - Links to `student_enrollment_id`

6. **Log payment** (line 994-1005)
   - Creates `payment_logs` record

7. **Send "Next Steps" email** (line 1008-1046)
   - Sends barber next steps email with dashboard link
   - Initializes `student_onboarding` record:
     - `payment_complete: true`
     - `milady_enrollment_complete: false`
     - `documents_uploaded: false`
     - `handbook_completed: false`
     - `mou_signed: false`

8. **Process Milady payment** (line 1068-1115)
   - Calls `processMiladyPayment()` with $295 portion
   - Records payment split in `stripe_balance_transactions`
   - Milady portion: -$295 (paid out)
   - Elevate portion: retained

9. **Create weekly subscription** (line 1118+)
   - Sets up automatic weekly billing

---

## Enforcement Layer (Does NOT Change This Flow)

The enforcement layer is SEPARATE from the webhook flow:

### What Enforcement Checks (at action time):

| Action | Checks |
|--------|--------|
| CLOCK_IN | state=active_enrolled+, orientation_done, docs_done, start_date_reached, payment_current, shop_approved |
| CLOCK_OUT | Same as CLOCK_IN (or allow if session open) |
| PWA_CHECKIN | Same as CLOCK_IN |
| LOG_HOURS | state=active_in_good_standing |
| COMPLETE_ORIENTATION | state=enrolled_pending_orientation |
| UPLOAD_DOCUMENT | orientation_completed |
| SUBMIT_DOCUMENTS | orientation_completed, required_docs_present |

### What Enforcement Does NOT Block:

- Stripe webhook processing ✅
- Milady provisioning ✅
- Email sending ✅
- Enrollment record creation ✅
- Apprentice record creation ✅
- Onboarding initialization ✅

---

## Key Insight

**Payment = Triggers automation (Milady + email + onboarding)**
**Payment ≠ Compliance clearance (timeclock/hours)**

The enforcement layer only kicks in when the student ATTEMPTS a regulated action (clock_in, log_hours, etc.). It does NOT interfere with the payment → provisioning flow.

---

## State Transition Summary

```
application_submitted
        ↓
  payment_pending
        ↓ (Stripe webhook)
enrolled_pending_orientation  ← Milady provisioned, email sent
        ↓ (complete-orientation API)
  orientation_complete
        ↓ (submit-documents API)
    active_enrolled
        ↓ (first successful timeclock)
active_in_good_standing
        ↓ (1500 hours complete)
      completed
```

---

## Files Involved

| File | Purpose |
|------|---------|
| `app/api/webhooks/stripe/route.ts` | Payment → enrollment creation |
| `lib/enrollment/state-machine.ts` | State definitions |
| `lib/enrollment/assert-permission.ts` | Enforcement checks |
| `lib/enrollment/middleware.ts` | Route wrapper |
| `app/api/enrollment/complete-orientation/route.ts` | State transition |
| `app/api/enrollment/submit-documents/route.ts` | State transition |
| `app/api/timeclock/action/route.ts` | Enforced action |
