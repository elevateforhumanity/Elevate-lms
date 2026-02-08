# Auditor-Proof Stress Test Suite Spec

> **This document defines the 14 failure scenarios the system MUST handle correctly.**
> Each scenario includes setup, action, expected response, and expected DB state.
> Devs must pass ALL scenarios before shipping.

---

## Policy Decisions (Locked)

| Policy | Decision | Rationale |
|--------|----------|-----------|
| Payment grace period | **7 days** | Time to fix issues without blocking training |
| Clock-out during payment hold | **Yes** | Don't trap mid-shift; finish current, block new |
| Shop deactivation mid-shift | **Allow clock_out only** | Same logic - don't trap, but block future |
| GPS requirement | **Optional for manual code** | Required only if shop has geofence configured |

---

## Scenario 1: Payment Failure Mid-Program

### Setup
```sql
-- Active apprentice with open shift
INSERT INTO apprentices (user_id, status) VALUES ('user-1', 'active');
INSERT INTO student_enrollments (student_id, status, enrollment_state) 
  VALUES ('user-1', 'active', 'active_in_good_standing');
INSERT INTO barber_subscriptions (user_id, status, past_due_since) 
  VALUES ('user-1', 'past_due', NOW() - INTERVAL '8 days');
INSERT INTO progress_entries (apprentice_id, clock_in, clock_out) 
  VALUES ('apprentice-1', NOW() - INTERVAL '2 hours', NULL); -- Open shift
```

### Action: Clock Out (allowed)
```
POST /api/timeclock/action
{ "action": "clock_out", "apprentice_id": "apprentice-1", ... }
```

### Expected Response
```json
{ "success": true, "hours_logged": 2.0 }
```

### Action: Clock In (blocked)
```
POST /api/timeclock/action
{ "action": "clock_in", "apprentice_id": "apprentice-1", ... }
```

### Expected Response
```json
{
  "error": "Payment is 8 days past due. Please update your payment method.",
  "code": "PAYMENT_PAST_DUE",
  "state": "payment_hold"
}
```
**Status: 403**

### Expected DB State
- `progress_entries`: Previous shift closed with valid hours
- `enrollment_state_audit`: Denial logged with `PAYMENT_PAST_DUE`
- No new `progress_entries` created

---

## Scenario 2: Clock In Before Start Date

### Setup
```sql
INSERT INTO student_enrollments (student_id, status, enrollment_state, program_start_date) 
  VALUES ('user-2', 'active', 'active_enrolled', NOW() + INTERVAL '3 days');
INSERT INTO apprentices (user_id, status, start_date) 
  VALUES ('user-2', 'active', NOW() + INTERVAL '3 days');
```

### Action
```
POST /api/timeclock/action
{ "action": "clock_in", "apprentice_id": "apprentice-2", ... }
```

### Expected Response
```json
{
  "error": "Training has not started yet. Your start date is 2024-01-18.",
  "code": "START_DATE_NOT_REACHED",
  "state": "active_enrolled"
}
```
**Status: 403**

### Expected DB State
- No `progress_entries` created
- `enrollment_state_audit`: Denial logged

---

## Scenario 3: Orientation Skipped via Direct URL

### Setup
```sql
INSERT INTO student_enrollments (student_id, status, enrollment_state, orientation_completed_at) 
  VALUES ('user-3', 'enrolled', 'enrolled_pending_orientation', NULL);
```

### Action
```
POST /api/enrollment/upload-document
{ "document_type": "government_id", "file_url": "..." }
```

### Expected Response
```json
{
  "error": "Please complete orientation first.",
  "code": "ORIENTATION_REQUIRED",
  "state": "enrolled_pending_orientation"
}
```
**Status: 403**

### Expected DB State
- No `enrollment_documents` created
- `enrollment_state_audit`: Denial logged

---

## Scenario 4: Documents Submitted Without Required ID

### Setup
```sql
INSERT INTO student_enrollments (student_id, status, enrollment_state, orientation_completed_at) 
  VALUES ('user-4', 'orientation_complete', 'orientation_complete', NOW());
-- Optional doc uploaded, but NOT government_id
INSERT INTO enrollment_documents (enrollment_id, document_type, status) 
  VALUES ('enrollment-4', 'high_school_diploma', 'approved');
```

### Action
```
POST /api/enrollment/submit-documents
{ "program": "barber-apprenticeship" }
```

### Expected Response
```json
{
  "error": "Required documents missing",
  "code": "REQUIRED_DOCUMENT_MISSING",
  "missing": ["government_id"]
}
```
**Status: 400**

### Expected DB State
- `documents_submitted_at` remains NULL
- `enrollment_state` remains `orientation_complete`
- No status change

---

## Scenario 5: Partner Shop Unapproved

### Setup
```sql
INSERT INTO student_enrollments (student_id, status, enrollment_state) 
  VALUES ('user-5', 'active', 'active_in_good_standing');
INSERT INTO partners (id, status, name) 
  VALUES ('partner-5', 'pending', 'Unapproved Barbershop');
```

### Action
```
POST /api/timeclock/action
{ "action": "clock_in", "partner_id": "partner-5", ... }
```

### Expected Response
```json
{
  "error": "Training site \"Unapproved Barbershop\" is not approved.",
  "code": "PARTNER_NOT_APPROVED",
  "state": "active_in_good_standing"
}
```
**Status: 403**

### Expected DB State
- No `progress_entries` created
- `enrollment_state_audit`: Denial logged with partner info

---

## Scenario 6: Shop Deactivated Mid-Shift

### Setup
```sql
-- Apprentice clocked in at approved shop
INSERT INTO progress_entries (apprentice_id, partner_id, clock_in, clock_out) 
  VALUES ('apprentice-6', 'partner-6', NOW() - INTERVAL '4 hours', NULL);
-- Shop gets deactivated
UPDATE partners SET status = 'inactive' WHERE id = 'partner-6';
```

### Action: Clock Out (allowed)
```
POST /api/timeclock/action
{ "action": "clock_out", "apprentice_id": "apprentice-6", "partner_id": "partner-6" }
```

### Expected Response
```json
{ "success": true, "hours_logged": 4.0, "warning": "Shop status changed - contact coordinator" }
```

### Action: Clock In (blocked)
```
POST /api/timeclock/action
{ "action": "clock_in", "apprentice_id": "apprentice-6", "partner_id": "partner-6" }
```

### Expected Response
```json
{
  "error": "Training site is not currently approved.",
  "code": "PARTNER_NOT_APPROVED"
}
```
**Status: 403**

---

## Scenario 7: Duplicate Stripe Webhook

### Setup
```sql
-- First webhook already processed
INSERT INTO stripe_webhook_events (stripe_event_id, status, processed_at) 
  VALUES ('evt_123', 'processed', NOW());
INSERT INTO student_enrollments (student_id, stripe_checkout_session_id) 
  VALUES ('user-7', 'cs_123');
```

### Action
```
POST /api/webhooks/stripe
{ "id": "evt_123", "type": "checkout.session.completed", ... }
```

### Expected Response
```json
{ "received": true, "status": "already_processed" }
```
**Status: 200**

### Expected DB State
- No duplicate `student_enrollments`
- No duplicate `apprentices`
- `stripe_webhook_events` unchanged (or updated_at bumped)

---

## Scenario 8: Partial Provisioning Failure

### Setup
```sql
-- Payment logged but apprentice creation failed
INSERT INTO payment_logs (user_id, stripe_session_id, status) 
  VALUES ('user-8', 'cs_456', 'completed');
INSERT INTO student_enrollments (student_id, status) 
  VALUES ('user-8', 'enrolled');
-- NO apprentices record exists
```

### Action: User tries to access timeclock
```
GET /api/timeclock/context
```

### Expected Response
```json
{
  "error": "Account setup in progress. Please wait or contact support.",
  "code": "PROVISIONING_INCOMPLETE",
  "retry_available": true
}
```
**Status: 503**

### Recovery Action
```
POST /api/admin/reconcile-enrollment
{ "user_id": "user-8" }
```

### Expected Result
- `apprentices` record created
- `enrollment_state_audit`: Logged reconciliation

---

## Scenario 9: Milady Provisioning Stalled

### Setup
```sql
INSERT INTO milady_provisioning_queue (student_id, status, created_at) 
  VALUES ('user-9', 'pending', NOW() - INTERVAL '72 hours');
INSERT INTO student_enrollments (student_id, milady_enrolled) 
  VALUES ('user-9', false);
```

### Expected System Behavior
- Cron job `/api/cron/milady-provisioning-alerts` fires
- Email sent to `elevate4humanityedu@gmail.com`
- `admin_alerts` record created with `severity: warning`

### User Experience
- Dashboard shows "Milady access pending (3 days)"
- Courses section shows "Setting up your Milady account..."
- No false `milady_enrolled = true`

---

## Scenario 10: Timeclock State Machine Violations

### Setup
```sql
INSERT INTO progress_entries (apprentice_id, clock_in, clock_out, lunch_start, lunch_end) 
  VALUES ('apprentice-10', NOW() - INTERVAL '2 hours', NULL, NULL, NULL);
```

### Action: Double Clock In
```
POST /api/timeclock/action
{ "action": "clock_in", "apprentice_id": "apprentice-10" }
```

### Expected Response
```json
{
  "error": "Already clocked in. Please clock out first.",
  "code": "INVALID_STATE_TRANSITION"
}
```
**Status: 400**

### Action: End Lunch Without Starting
```
POST /api/timeclock/action
{ "action": "end_lunch", "apprentice_id": "apprentice-10" }
```

### Expected Response
```json
{
  "error": "Not currently on lunch break.",
  "code": "INVALID_STATE_TRANSITION"
}
```
**Status: 400**

### Action: Clock Out Without Being Clocked In
```sql
-- Reset: no open session
DELETE FROM progress_entries WHERE apprentice_id = 'apprentice-10';
```
```
POST /api/timeclock/action
{ "action": "clock_out", "apprentice_id": "apprentice-10" }
```

### Expected Response
```json
{
  "error": "Not currently clocked in.",
  "code": "NO_OPEN_SESSION"
}
```
**Status: 400**

---

## Scenario 11: QR/Code Check-in Validation

### Setup
```sql
INSERT INTO shop_checkin_codes (shop_id, code, expires_at) 
  VALUES ('shop-11', 'ABC123', NOW() - INTERVAL '1 hour'); -- Expired
```

### Action: Use Expired Code
```
POST /api/checkin
{ "code": "ABC123" }
```

### Expected Response
```json
{
  "error": "Invalid or expired check-in code",
  "code": "CODE_EXPIRED"
}
```
**Status: 400**

### Action: Use Wrong Shop's Code
```sql
-- User assigned to shop-11, but code is for shop-99
INSERT INTO shop_checkin_codes (shop_id, code, expires_at) 
  VALUES ('shop-99', 'XYZ789', NOW() + INTERVAL '1 hour');
```
```
POST /api/checkin
{ "code": "XYZ789" }
```

### Expected Response
- If policy allows any approved shop: Success
- If policy requires assigned shop: 403 `WRONG_SHOP`

---

## Scenario 12: Refund/Chargeback After Enrollment

### Setup
```sql
INSERT INTO student_enrollments (student_id, status, enrollment_state) 
  VALUES ('user-12', 'active', 'active_in_good_standing');
INSERT INTO progress_entries (apprentice_id, hours_logged) 
  VALUES ('apprentice-12', 40); -- 40 hours already logged
```

### Action: Stripe Refund Webhook
```
POST /api/webhooks/stripe
{ "type": "charge.refunded", "data": { "object": { "customer": "cus_12" } } }
```

### Expected System Behavior
- `enrollment_state` → `payment_hold`
- `enrollment_cases` created with type `financial_dispute`
- Timeclock blocked immediately
- Staff notified
- **Hours NOT deleted** - only status changes

### Expected DB State
```sql
-- Hours preserved
SELECT * FROM progress_entries WHERE apprentice_id = 'apprentice-12';
-- Returns 40 hours, unchanged

-- Status changed
SELECT enrollment_state FROM student_enrollments WHERE student_id = 'user-12';
-- Returns 'payment_hold'
```

---

## Scenario 13: Double Enrollment Attempt

### Setup
```sql
INSERT INTO student_enrollments (student_id, program_slug, status) 
  VALUES ('user-13', 'barber-apprenticeship', 'active');
```

### Action: Try to Create New Enrollment
```
POST /api/barber/checkout
{ "email": "user13@example.com", ... }
```

### Expected Response
```json
{
  "error": "You already have an active enrollment",
  "code": "ENROLLMENT_EXISTS",
  "redirect": "/apprentice"
}
```
**Status: 409**

### Expected DB State
- No new `student_enrollments`
- No Stripe checkout session created

---

## Scenario 14: Staff Override

### Setup
```sql
-- User on payment hold
INSERT INTO student_enrollments (student_id, enrollment_state) 
  VALUES ('user-14', 'payment_hold');
INSERT INTO barber_subscriptions (user_id, past_due_since) 
  VALUES ('user-14', NOW() - INTERVAL '10 days');
```

### Action: Admin Creates Override
```
POST /api/admin/enrollment-override
{
  "user_id": "user-14",
  "action": "CLOCK_IN",
  "expires_at": "2024-01-20T23:59:59Z",
  "reason": "Payment arrangement made - allow training this week"
}
```

### Expected Response
```json
{
  "success": true,
  "override_id": "override-14",
  "expires_at": "2024-01-20T23:59:59Z"
}
```

### Action: User Clocks In (with override)
```
POST /api/timeclock/action
{ "action": "clock_in", "apprentice_id": "apprentice-14" }
```

### Expected Response
```json
{
  "success": true,
  "override_applied": true,
  "override_expires": "2024-01-20T23:59:59Z"
}
```

### Override Limitations
- **CAN override:** Payment hold
- **CANNOT override:** Start date, shop approval (compliance-critical)

### Expected DB State
```sql
-- Override logged
SELECT * FROM enrollment_overrides WHERE user_id = 'user-14';
-- Returns: action='CLOCK_IN', expires_at, reason, created_by

-- Audit logged
SELECT * FROM enrollment_state_audit WHERE user_id = 'user-14' AND details->>'override_applied' = 'true';
```

---

## Test Execution Checklist

| # | Scenario | API | Expected Status | Reason Code | Pass/Fail |
|---|----------|-----|-----------------|-------------|-----------|
| 1a | Payment hold - clock out | POST /api/timeclock/action | 200 | - | |
| 1b | Payment hold - clock in | POST /api/timeclock/action | 403 | PAYMENT_PAST_DUE | |
| 2 | Before start date | POST /api/timeclock/action | 403 | START_DATE_NOT_REACHED | |
| 3 | Skip orientation | POST /api/enrollment/upload-document | 403 | ORIENTATION_REQUIRED | |
| 4 | Missing required doc | POST /api/enrollment/submit-documents | 400 | REQUIRED_DOCUMENT_MISSING | |
| 5 | Unapproved shop | POST /api/timeclock/action | 403 | PARTNER_NOT_APPROVED | |
| 6a | Shop deactivated - clock out | POST /api/timeclock/action | 200 | - | |
| 6b | Shop deactivated - clock in | POST /api/timeclock/action | 403 | PARTNER_NOT_APPROVED | |
| 7 | Duplicate webhook | POST /api/webhooks/stripe | 200 | already_processed | |
| 8 | Partial provisioning | GET /api/timeclock/context | 503 | PROVISIONING_INCOMPLETE | |
| 9 | Milady stalled | Cron job | Email sent | - | |
| 10a | Double clock in | POST /api/timeclock/action | 400 | INVALID_STATE_TRANSITION | |
| 10b | End lunch without start | POST /api/timeclock/action | 400 | INVALID_STATE_TRANSITION | |
| 11 | Expired code | POST /api/checkin | 400 | CODE_EXPIRED | |
| 12 | Refund webhook | POST /api/webhooks/stripe | 200 | payment_hold set | |
| 13 | Double enrollment | POST /api/barber/checkout | 409 | ENROLLMENT_EXISTS | |
| 14 | Staff override | POST /api/timeclock/action | 200 | override_applied | |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-02-07 | System | Initial stress test spec |
