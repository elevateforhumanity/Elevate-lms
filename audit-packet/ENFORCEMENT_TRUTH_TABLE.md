# Enforcement Truth Table

## Timeclock Actions (CLOCK_IN, CLOCK_OUT, PWA_CHECKIN, LOG_HOURS, etc.)

These actions go through the full gate check:

### Gate Checks for Timeclock Actions

| Gate | Check | Denial Code | Message |
|------|-------|-------------|---------|
| 1. Enrollment exists | `activeEnrollment` must exist | `NO_ENROLLMENT` | "No enrollment found. Please complete enrollment first." |
| 2. Not suspended | `currentState !== 'suspended'` | `ENROLLMENT_SUSPENDED` | "Enrollment is suspended. Please contact support." |
| 3. Not completed | `currentState !== 'completed'` | `ENROLLMENT_COMPLETED` | "Program is complete. This action is no longer available." |
| 4. Not payment hold | `currentState !== 'payment_hold'` | `PAYMENT_HOLD` | "Payment is X days past due. Please update your payment method." |
| 5. State is active | `currentState === 'active_enrolled' OR 'active_in_good_standing'` | Various | Depends on current state |
| 6. Start date reached | `program_start_date <= now` | `START_DATE_NOT_REACHED` | "Training starts on [date]. X days remaining." |
| 7. Payment current | `paymentPastDueDays <= 7` (grace period) | `PAYMENT_PAST_DUE` | "Payment is X days past due." |
| 8. Partner approved | `partner.status === 'approved'` | `PARTNER_NOT_APPROVED` | "Training site [name] is not approved." |

### State Requirements for Timeclock

To reach `active_enrolled` or `active_in_good_standing`, the student must have:
- ✅ Paid (Stripe webhook sets status)
- ✅ Completed orientation (`orientation_completed_at` is set)
- ✅ Submitted documents (`documents_submitted_at` is set)

This is enforced by the state machine - you can't be in `active_enrolled` without completing orientation and documents first.

---

## State Machine Flow

```
application_submitted
        ↓ (payment)
  payment_pending
        ↓ (Stripe webhook)
enrolled_pending_orientation  ← Can't timeclock here (ORIENTATION_REQUIRED)
        ↓ (complete orientation)
  orientation_complete        ← Can't timeclock here (DOCUMENTS_REQUIRED)
        ↓ (submit documents)
    active_enrolled           ← CAN timeclock (if other gates pass)
        ↓
active_in_good_standing       ← CAN timeclock (if other gates pass)
```

---

## All Denial Reason Codes

| Code | Message | When Triggered |
|------|---------|----------------|
| `NO_ENROLLMENT` | "No enrollment found. Please complete enrollment first." | No enrollment record exists |
| `PAYMENT_REQUIRED` | "Payment required to continue." | State is `application_submitted` |
| `PAYMENT_PENDING` | "Payment is being processed. Please wait." | State is `payment_pending` |
| `ORIENTATION_REQUIRED` | "Please complete orientation first." | State is `enrolled_pending_orientation` |
| `ORIENTATION_INCOMPLETE` | "Orientation not completed." | Orientation not done |
| `DOCUMENTS_REQUIRED` | "Please upload required documents." | State is `orientation_complete` or `documents_pending` |
| `DOCUMENTS_MISSING` | "Required documents not submitted." | Documents not submitted |
| `START_DATE_NOT_REACHED` | "Training has not started yet." | `program_start_date > now` |
| `PAYMENT_PAST_DUE` | "Payment is past due. Please update your payment method." | `paymentPastDueDays > 7` |
| `PAYMENT_HOLD` | "Account on payment hold." | State is `payment_hold` |
| `PARTNER_NOT_APPROVED` | "Training partner not approved." | Partner status !== 'approved' |
| `SHOP_NOT_APPROVED` | "Training site not approved." | Shop not approved |
| `ENROLLMENT_SUSPENDED` | "Enrollment is suspended. Please contact support." | State is `suspended` |
| `ENROLLMENT_COMPLETED` | "Program is complete. This action is no longer available." | State is `completed` |
| `ACTION_NOT_ALLOWED` | "This action is not allowed in your current state." | Generic denial |
| `STATE_VIOLATION` | "State violation. Action not permitted." | Unknown state |

---

## Timeclock Actions List

```typescript
const TIMECLOCK_ACTIONS = [
  EnrollmentAction.CLOCK_IN,
  EnrollmentAction.CLOCK_OUT,
  EnrollmentAction.START_LUNCH,
  EnrollmentAction.END_LUNCH,
  EnrollmentAction.PWA_CHECKIN,
  EnrollmentAction.PWA_CHECKOUT,
  EnrollmentAction.LOG_HOURS,
];
```

---

## Special Cases

### Clock Out During Payment Hold
**Policy:** Allow clock_out if session is open (don't trap mid-shift)
```typescript
if (action === CLOCK_OUT && currentState === 'payment_hold') {
  // Check for open session
  if (openSession) return allow(); // Let them finish
}
```

### Clock Out When Shop Deactivated
**Policy:** Allow clock_out if session is open at that shop
```typescript
if (action === CLOCK_OUT && !partnerApproved) {
  // Check for open session at this shop
  if (openSession) return allow({ warning: 'Shop status changed' });
}
```

---

## Where Reason Codes Appear in UI

The enforcement function returns:
```typescript
{
  allowed: false,
  reason: 'START_DATE_NOT_REACHED',
  message: 'Training starts on 2/15/2025. 5 days remaining.',
  state: 'active_enrolled',
  data: {
    startDate: { reached: false, date: '2025-02-15', daysUntil: 5 }
  }
}
```

Routes return this to the UI:
```typescript
return NextResponse.json({
  error: permission.message,
  code: permission.reason,
  state: permission.state,
}, { status: 403 });
```

The `/api/timeclock/context` route returns enforcement status without blocking:
```typescript
{
  enforcement: {
    canClockIn: false,
    reason: 'START_DATE_NOT_REACHED',
    message: 'Training starts on 2/15/2025. 5 days remaining.',
    state: 'active_enrolled'
  }
}
```
