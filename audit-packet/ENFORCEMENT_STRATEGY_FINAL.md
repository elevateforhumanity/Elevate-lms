# Enforcement Strategy - Final

## Core Principle

**Payment = Triggers automation (Milady + email + onboarding)**
**Payment ≠ Compliance clearance (timeclock/hours)**

---

## What Gets Enforced (Hard Block)

Only **regulated instruments** get hard enforcement:

| Route | Action | Enforcement |
|-------|--------|-------------|
| `/api/timeclock/action` | CLOCK_IN, CLOCK_OUT | ✅ Hard block |
| `/api/checkin` | PWA_CHECKIN | ✅ Hard block |
| `/api/checkin/checkout` | CLOCK_OUT | ✅ Hard block |
| `/api/apprenticeship/hours` | LOG_HOURS | ✅ Hard block |

---

## What Does NOT Get Enforced (Onboarding Flows)

Onboarding routes should **flow freely** - don't block users from completing setup:

| Route | Enforcement |
|-------|-------------|
| `/api/enrollment/complete-orientation` | ❌ No enforcement |
| `/api/enrollment/upload-document` | ❌ No enforcement |
| `/api/enrollment/submit-documents` | ❌ No enforcement |

---

## Context Routes (Return Status, Don't Block)

Context routes return enforcement status so UI can show why user is blocked:

| Route | Behavior |
|-------|----------|
| `/api/timeclock/context` | Returns `enforcement: { canClockIn, reason, message }` |

---

## Stripe Webhook (UNCHANGED)

```
Payment → status='active' → Milady provisioning → email sent → portal access
```

**NO enforcement in webhook.** It just triggers automation.

---

## Timeclock Enforcement Gates

When user tries to clock in, enforcement checks:

1. **Enrollment exists** - Must have enrollment record
2. **State check** - Must be `active_enrolled` or `active_in_good_standing`
3. **Start date** - `program_start_date` must be reached
4. **Payment** - Must be current (7-day grace period)
5. **Partner** - Shop must be approved

If ANY check fails → 403 with reason code.

---

## What "active" Means

| Context | Meaning |
|---------|---------|
| Stripe webhook sets `status: 'active'` | Paid + onboarding started |
| Timeclock requires `active_enrolled` state | Paid + orientation + documents + ready to work |

These are **different**. Payment triggers automation, but doesn't grant timeclock access.

---

## Route Summary

| Route | What It Does | Enforcement |
|-------|--------------|-------------|
| `/api/webhooks/stripe` | Creates enrollment, triggers Milady/email | ❌ None |
| `/api/enrollment/complete-orientation` | Marks orientation done | ❌ None |
| `/api/enrollment/upload-document` | Uploads document | ❌ None |
| `/api/enrollment/submit-documents` | Submits documents | ❌ None |
| `/api/timeclock/context` | Returns context + eligibility | Returns status |
| `/api/timeclock/action` | Clock in/out | ✅ Hard block |
| `/api/checkin` | PWA check-in | ✅ Hard block |
| `/api/checkin/checkout` | PWA check-out + log hours | ✅ Hard block |
| `/api/apprenticeship/hours` | Log hours manually | ✅ Hard block |
