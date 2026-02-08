# API Contract Verification

## 1. POST /api/inquiry
**Purpose:** Submit program inquiry
**Auth:** None required
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "program": "string",
  "message": "string (optional)"
}
```
**Response (200):**
```json
{
  "success": true,
  "inquiry_id": "uuid"
}
```
**DB Changes:** Creates row in `inquiries` table
**Failure:** 400 (validation), 500 (server error)

---

## 2. POST /api/applications
**Purpose:** Submit program application
**Auth:** None required (creates user if needed)
**Request:**
```json
{
  "program_slug": "barber-apprenticeship",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "date_of_birth": "YYYY-MM-DD",
  "address": { "street": "", "city": "", "state": "", "zip": "" },
  "education_level": "string",
  "employment_status": "string",
  "has_transportation": boolean,
  "felony_disclosure": boolean,
  "signature": "string"
}
```
**Response (200):**
```json
{
  "success": true,
  "application_id": "uuid",
  "redirect_url": "/programs/barber-apprenticeship/checkout"
}
```
**DB Changes:** 
- Creates `profiles` row (if new user)
- Creates `applications` row
**Failure:** 400 (validation), 409 (duplicate), 500 (server error)

---

## 3. POST /api/barber/checkout
**Purpose:** Create Stripe checkout session for enrollment
**Auth:** Required (user must be logged in)
**Request:**
```json
{
  "hours_per_week": 40,
  "transferred_hours_verified": 0,
  "enrollment_id": "uuid (optional)"
}
```
**Response (200):**
```json
{
  "sessionId": "cs_xxx",
  "url": "https://checkout.stripe.com/...",
  "calculation": {
    "setupFee": 1743,
    "weeklyPayment": 64.74,
    "weeksRemaining": 50,
    "firstBillingDate": "Friday, Feb 14"
  }
}
```
**DB Changes:** Creates `payment_sessions` row
**Failure:** 
- 401 (unauthorized)
- 409 (ENROLLMENT_EXISTS - already enrolled)
- 400 (invalid hours)
- 500 (Stripe error)

---

## 4. POST /api/webhooks/stripe
**Purpose:** Handle Stripe webhook events
**Auth:** Stripe signature verification
**Events Handled:**
- `checkout.session.completed` → Creates enrollment
- `invoice.paid` → Updates payment status
- `invoice.payment_failed` → Sets payment_hold
- `charge.refunded` → Sets payment_hold, creates case

**DB Changes (checkout.session.completed):**
- Creates/updates `student_enrollments`
- Creates `apprentices` record
- Creates `enrollments` record
- Creates `payment_logs` record
- Creates `stripe_webhook_events` record (idempotency)
- Sets `enrollment_state = 'enrolled_pending_orientation'`

**Idempotency:** Checks `stripe_webhook_events` table for duplicate event_id
**Failure:** 400 (invalid signature), 200 (always after signature verified)

---

## 5. POST /api/enrollment/complete-orientation
**Purpose:** Mark orientation as complete
**Auth:** Required
**Request:**
```json
{
  "program": "barber-apprenticeship"
}
```
**Response (200):**
```json
{
  "success": true,
  "program": "barber-apprenticeship"
}
```
**DB Changes:**
- Updates `enrollments.orientation_completed_at`
- Updates `student_enrollments.orientation_completed_at`
- Updates `enrollment_state = 'orientation_complete'`
- Creates `enrollment_state_audit` record

**Enforcement:** Must be in `enrolled_pending_orientation` state
**Failure:** 401 (unauthorized), 403 (wrong state)

---

## 6. POST /api/enrollment/upload-document
**Purpose:** Upload enrollment document
**Auth:** Required
**Request:** multipart/form-data
- `file`: File
- `documentType`: "government_id" | "high_school_diploma" | etc.
- `enrollmentId`: "uuid"

**Response (200):**
```json
{
  "success": true,
  "document": { "file_url": "..." },
  "path": "user_id/enrollment_id/type-timestamp.ext"
}
```
**DB Changes:**
- Uploads to `enrollment-documents` storage bucket
- Creates `documents` row

**Enforcement:** Must have completed orientation (ORIENTATION_REQUIRED if not)
**Failure:** 401 (unauthorized), 403 (ORIENTATION_REQUIRED), 400 (no file)

---

## 7. POST /api/enrollment/submit-documents
**Purpose:** Submit documents and activate enrollment
**Auth:** Required
**Request:**
```json
{
  "program": "barber-apprenticeship"
}
```
**Response (200):**
```json
{
  "success": true,
  "program": "barber-apprenticeship",
  "program_start_date": "2025-02-10T00:00:00.000Z",
  "message": "Your training begins on 2/10/2025"
}
```
**DB Changes:**
- Updates `enrollments.documents_submitted_at`
- Updates `student_enrollments.documents_submitted_at`
- Sets `enrollment_state = 'active_enrolled'`
- Sets `program_start_date` (next Monday)
- Updates `apprentices.start_date`
- Creates `enrollment_state_audit` record

**Enforcement:** 
- Must have completed orientation
- Must have uploaded required documents (government_id)
**Failure:** 
- 401 (unauthorized)
- 403 (orientation not complete)
- 400 (REQUIRED_DOCUMENT_MISSING)

---

## 8. GET /api/timeclock/context
**Purpose:** Get user's timeclock context (apprentice, sites, active shift)
**Auth:** Required
**Response (200):**
```json
{
  "apprenticeId": "uuid",
  "userId": "uuid",
  "userName": "string",
  "role": "apprentice",
  "shopId": "uuid",
  "shopName": "string",
  "defaultSiteId": "uuid",
  "allowedSites": [{ "id": "", "name": "", "lat": 0, "lng": 0, "radius_m": 100 }],
  "activeShift": { "entryId": "", "clockInAt": "", "siteId": "" } | null
}
```
**Enforcement:** 
- Returns PROVISIONING_INCOMPLETE (503) if enrollment exists but no apprentice record
**Failure:** 401 (unauthorized), 503 (provisioning incomplete)

---

## 9. POST /api/timeclock/action
**Purpose:** Clock in/out, start/end lunch
**Auth:** Required
**Request:**
```json
{
  "action": "clock_in" | "clock_out" | "lunch_start" | "lunch_end",
  "apprentice_id": "uuid",
  "partner_id": "uuid",
  "program_id": "uuid",
  "site_id": "uuid",
  "progress_entry_id": "uuid (for clock_out/lunch)",
  "lat": number,
  "lng": number,
  "accuracy_m": number
}
```
**Response (200 - clock_in):**
```json
{
  "success": true,
  "action": "clock_in",
  "progress_entry_id": "uuid",
  "clock_in_at": "ISO timestamp",
  "override_applied": boolean (if override used),
  "override_expires": "ISO timestamp (if override used)"
}
```
**DB Changes:**
- Creates/updates `progress_entries` row
- Updates `apprentices.total_hours` (on clock_out)

**Enforcement (assertEnrollmentPermissionWithOverride):**
- START_DATE_NOT_REACHED: Cannot clock in before program_start_date
- PAYMENT_PAST_DUE: Cannot clock in if payment > 7 days past due
- PARTNER_NOT_APPROVED: Cannot clock in at unapproved shop
- INVALID_STATE_TRANSITION: Cannot double clock-in
- NO_OPEN_SESSION: Cannot clock out without open session

**GPS Enforcement:**
- Required for all actions
- Must be within site geofence radius
- Accuracy must be <= 50m

**Failure:** 
- 400 (missing fields, invalid state transition)
- 401 (unauthorized)
- 402 (payment required)
- 403 (enforcement denial with reason code)

---

## 10. POST /api/checkin
**Purpose:** PWA check-in with QR/manual code
**Auth:** Required
**Request:**
```json
{
  "code": "ABC123"
}
```
**Response (200):**
```json
{
  "success": true,
  "sessionId": "uuid",
  "shopName": "string",
  "checkInTime": "ISO timestamp"
}
```
**DB Changes:**
- Creates `checkin_sessions` row

**Enforcement (checkEnrollmentPermission):**
- Must be in active enrollment state
- Code must be valid and not expired
- Cannot have existing open session

**Failure:**
- 400 (no code, invalid/expired code, already checked in)
- 401 (unauthorized)
- 403 (enrollment enforcement denial)

---

## 11. POST /api/admin/enrollment-override
**Purpose:** Create time-bounded override for enrollment enforcement
**Auth:** Required (admin/staff role)
**Request:**
```json
{
  "user_id": "uuid",
  "action": "CLOCK_IN" | "CLOCK_OUT" | etc.,
  "expires_at": "ISO timestamp",
  "reason": "string"
}
```
**Response (200):**
```json
{
  "success": true,
  "override_id": "uuid",
  "expires_at": "ISO timestamp"
}
```
**DB Changes:**
- Creates `enrollment_overrides` row

**Restrictions:**
- Max duration: 30 days
- Cannot override: START_DATE_NOT_REACHED, PARTNER_NOT_APPROVED, ORIENTATION_REQUIRED, DOCUMENTS_REQUIRED

**Failure:**
- 400 (invalid action, duration too long)
- 401 (unauthorized)
- 403 (not admin/staff)

---

## 12. Stripe Identity Verification

### POST /api/program-holder/create-verification
**Purpose:** Create Stripe Identity verification session
**Auth:** Required
**Response:**
```json
{
  "url": "https://verify.stripe.com/...",
  "session_id": "vs_xxx"
}
```
**DB Changes:** Creates verification record with `stripe_verification_session_id`

### POST /api/webhooks/stripe-identity
**Purpose:** Handle Stripe Identity webhook events
**Events:**
- `identity.verification_session.verified` → Updates verification status to approved
- `identity.verification_session.requires_input` → Updates status to pending
- `identity.verification_session.canceled` → Updates status to failed

---

## 13. Billing Portal

### GET /api/license/portal
**Purpose:** Create Stripe billing portal session for license management
**Auth:** Required
**Response:** Redirect to Stripe billing portal

### GET /api/store/customer-portal
**Purpose:** Create Stripe customer portal session
**Auth:** Required
**Response:** Redirect to Stripe customer portal

---

## Stripe Webhook Signature Verification

**Location:** `app/api/webhooks/stripe/route.ts` (lines 55-74)

**Implementation:**
1. Reads `stripe-signature` header
2. Calls `stripe.webhooks.constructEvent(body, signature, webhookSecret)`
3. Returns 400 if signature invalid
4. Only processes event after signature verified

**Security:**
- Uses `STRIPE_WEBHOOK_SECRET` environment variable
- Raw body preserved for signature verification
- Invalid signatures rejected before any processing
