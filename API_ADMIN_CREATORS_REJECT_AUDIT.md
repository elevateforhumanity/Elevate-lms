# API Endpoint Audit: /api/admin/creators/reject

**Date:** January 10, 2026  
**Endpoint:** `POST /api/admin/creators/reject`  
**Purpose:** Reject marketplace creator applications  
**Status:** ⚠️ **Needs Security Improvements**

---

## Executive Summary

This endpoint allows administrators to reject creator applications from the marketplace. While functional, it has several security and operational concerns that need to be addressed.

### Overall Risk Level: 🟡 **MEDIUM**

**Key Findings:**
- ✅ Authentication implemented
- ⚠️ Authorization check incomplete (only checks 'admin', not 'super_admin')
- ❌ **CRITICAL:** Deletes records instead of marking as rejected
- ❌ No audit logging
- ❌ No input validation
- ⚠️ Silent email failures
- ⚠️ No rate limiting
- ⚠️ Missing RLS bypass for admin operations

---

## Endpoint Details

### Location
**File:** `/app/api/admin/creators/reject/route.ts`

### Configuration
```typescript
export const maxDuration = 60; // 60 seconds timeout
```

### HTTP Method
`POST`

### Request Body
```typescript
{
  creatorId: string;  // UUID of creator to reject
  reason: string;     // Rejection reason
}
```

### Response
**Success (200):**
```json
{
  "success": true
}
```

**Error (401):**
```json
{
  "error": "Unauthorized"
}
```

**Error (403):**
```json
{
  "error": "Forbidden"
}
```

**Error (500):**
```json
{
  "err": "Error message"
}
```

---

## Security Analysis

### 1. Authentication ✅ **Implemented**

**Current Implementation:**
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Status:** ✅ Good
- Checks for authenticated user
- Returns 401 if not authenticated

### 2. Authorization ⚠️ **Incomplete**

**Current Implementation:**
```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile?.role !== 'admin') {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

**Issues:**
- ❌ Only checks for 'admin' role, excludes 'super_admin'
- ❌ No check for specific permissions (e.g., 'can_manage_creators')
- ⚠️ Doesn't handle null/undefined profile gracefully

**Recommendation:**
```typescript
if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

### 3. Input Validation ❌ **Missing**

**Current Implementation:**
```typescript
const { creatorId, reason } = await req.json();
// No validation!
```

**Issues:**
- ❌ No validation that creatorId is a valid UUID
- ❌ No validation that reason is provided
- ❌ No length limits on reason
- ❌ No sanitization of inputs
- ❌ Could cause SQL injection (though Supabase protects against this)

**Recommendation:**
```typescript
import { z } from 'zod';

const schema = z.object({
  creatorId: z.string().uuid('Invalid creator ID'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason too long'),
});

const body = await req.json();
const validation = schema.safeParse(body);

if (!validation.success) {
  return NextResponse.json(
    { error: 'Invalid input', details: validation.error.errors },
    { status: 400 }
  );
}

const { creatorId, reason } = validation.data;
```

### 4. Database Operations 🔴 **CRITICAL ISSUE**

**Current Implementation:**
```typescript
// Delete the creator application (or mark as rejected)
const { error } = await supabase
  .from('marketplace_creators')
  .delete()
  .eq('id', creatorId);
```

**CRITICAL ISSUES:**

#### Issue #1: Permanent Deletion
- ❌ **Deletes records permanently** - No way to recover or audit
- ❌ Violates data retention policies
- ❌ Loses historical data for analytics
- ❌ Can't track rejection patterns

**Recommendation:**
```typescript
// Update status instead of deleting
const { error } = await supabase
  .from('marketplace_creators')
  .update({
    status: 'rejected',
    rejection_reason: reason,
    rejected_at: new Date().toISOString(),
    rejected_by: user.id,
  })
  .eq('id', creatorId);
```

#### Issue #2: No Existence Check
- ❌ Doesn't verify creator exists before deletion
- ❌ Doesn't check if creator is already rejected/approved
- ❌ Could fail silently if creator doesn't exist

**Recommendation:**
```typescript
// Check if creator exists first
const { data: existingCreator, error: fetchError } = await supabase
  .from('marketplace_creators')
  .select('id, status, user_id')
  .eq('id', creatorId)
  .single();

if (fetchError || !existingCreator) {
  return NextResponse.json(
    { error: 'Creator not found' },
    { status: 404 }
  );
}

if (existingCreator.status === 'rejected') {
  return NextResponse.json(
    { error: 'Creator already rejected' },
    { status: 400 }
  );
}
```

#### Issue #3: RLS May Block Admin Operations
- ⚠️ RLS policy only allows users to manage their own records
- ⚠️ Admin may not be able to delete/update other users' records
- ⚠️ Should use service role client for admin operations

**Current RLS Policy:**
```sql
CREATE POLICY "creators_manage_own" ON marketplace_creators
  FOR ALL
  USING (user_id = auth.uid());
```

**Recommendation:**
```typescript
// Use admin client that bypasses RLS
import { createAdminClient } from '@/lib/supabase/server';

const adminSupabase = createAdminClient();
const { error } = await adminSupabase
  .from('marketplace_creators')
  .update({ status: 'rejected', ... })
  .eq('id', creatorId);
```

### 5. Audit Logging ❌ **Missing**

**Current Implementation:**
- ❌ No audit trail of who rejected what and when
- ❌ No logging of rejection reasons
- ❌ Can't track admin actions

**Recommendation:**
```typescript
// Log the rejection action
await supabase.from('audit_logs').insert({
  action: 'creator_rejected',
  actor_id: user.id,
  target_id: creatorId,
  metadata: {
    reason,
    creator_email: creatorProfile?.email,
    timestamp: new Date().toISOString(),
  },
});
```

### 6. Email Handling ⚠️ **Silent Failures**

**Current Implementation:**
```typescript
try {
  await sendCreatorRejectionEmail({
    email: creatorProfile.email,
    name: creatorProfile.full_name || 'Applicant',
    reason: reason || 'Application does not meet requirements',
  });
} catch (emailError) {
  // Silent failure - no logging or error handling
}
```

**Issues:**
- ⚠️ Email failures are silently ignored
- ⚠️ No logging of email send status
- ⚠️ Admin doesn't know if notification was sent
- ⚠️ User might not receive rejection notification

**Recommendation:**
```typescript
let emailSent = false;
try {
  const result = await sendCreatorRejectionEmail({
    email: creatorProfile.email,
    name: creatorProfile.full_name || 'Applicant',
    reason: reason || 'Application does not meet requirements',
  });
  emailSent = result.success;
  
  if (!result.success) {
    console.error('[Creator Rejection] Email failed:', result.error);
  }
} catch (emailError) {
  console.error('[Creator Rejection] Email error:', emailError);
}

// Return email status in response
return NextResponse.json({ 
  success: true, 
  emailSent,
  message: emailSent 
    ? 'Creator rejected and notified' 
    : 'Creator rejected but notification failed'
});
```

### 7. Error Handling ⚠️ **Inconsistent**

**Current Implementation:**
```typescript
} catch (err: unknown) {
  return NextResponse.json({ err: toErrorMessage(err) }, { status: 500 });
}
```

**Issues:**
- ⚠️ Returns `err` instead of `error` (inconsistent with other responses)
- ⚠️ Generic 500 error for all failures
- ⚠️ No specific error codes
- ⚠️ Doesn't differentiate between different error types

**Recommendation:**
```typescript
} catch (err: unknown) {
  console.error('[Creator Rejection] Error:', err);
  
  return NextResponse.json(
    { 
      error: 'Failed to reject creator',
      message: toErrorMessage(err),
      code: 'REJECTION_FAILED'
    },
    { status: 500 }
  );
}
```

### 8. Rate Limiting ❌ **Not Implemented**

**Current Implementation:**
- ❌ No rate limiting
- ❌ Admin could spam rejections
- ❌ Could be used for DoS attack

**Recommendation:**
```typescript
import { rateLimit } from '@/lib/rate-limit';

// At the start of the handler
const identifier = `admin-reject-${user.id}`;
const { success, remaining } = await rateLimit(identifier, {
  limit: 10,
  window: 60, // 10 rejections per minute
});

if (!success) {
  return NextResponse.json(
    { error: 'Rate limit exceeded', remaining },
    { status: 429 }
  );
}
```

---

## Database Schema Issues

### Missing Fields in marketplace_creators Table

**Current Schema:**
```sql
CREATE TABLE marketplace_creators (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  bio TEXT,
  payout_method TEXT,
  payout_email TEXT,
  revenue_split NUMERIC DEFAULT 0.7,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'suspended'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Missing Fields:**
- ❌ `rejection_reason` - Why was creator rejected?
- ❌ `rejected_at` - When was creator rejected?
- ❌ `rejected_by` - Who rejected the creator?
- ❌ `approved_at` - When was creator approved?
- ❌ `approved_by` - Who approved the creator?

**Recommended Migration:**
```sql
ALTER TABLE marketplace_creators
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejected_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

-- Add index for querying rejected creators
CREATE INDEX IF NOT EXISTS idx_marketplace_creators_status 
  ON marketplace_creators(status);

-- Add index for admin queries
CREATE INDEX IF NOT EXISTS idx_marketplace_creators_rejected_by 
  ON marketplace_creators(rejected_by);
```

---

## Email Template Review

### sendCreatorRejectionEmail

**Location:** `/lib/email/resend.ts`

**Current Template:**
```html
<h2>Hi ${params.name},</h2>
<p>Thank you for your interest in becoming a creator on our platform.</p>
<p>After careful review, we're unable to approve your application at this time.</p>
<p><strong>Reason:</strong> ${params.reason}</p>
<p>You're welcome to reapply in the future. If you have questions, please contact us.</p>
```

**Issues:**
- ⚠️ No specific contact information
- ⚠️ No guidance on how to improve application
- ⚠️ No timeline for reapplication
- ⚠️ Reason is displayed raw (could contain sensitive info)

**Recommendations:**
1. Add support email/phone
2. Provide actionable feedback
3. Specify reapplication timeline
4. Sanitize rejection reason

---

## Critical Issues Summary

### 🔴 Critical (Fix Immediately)

1. **Permanent Deletion of Records**
   - **Risk:** Data loss, no audit trail, compliance violations
   - **Fix:** Update status to 'rejected' instead of deleting
   - **Priority:** CRITICAL

2. **RLS May Block Admin Operations**
   - **Risk:** Endpoint may fail for admins
   - **Fix:** Use admin client that bypasses RLS
   - **Priority:** HIGH

### 🟡 High Priority (Fix This Week)

3. **No Input Validation**
   - **Risk:** Invalid data, potential injection attacks
   - **Fix:** Add Zod schema validation
   - **Priority:** HIGH

4. **No Audit Logging**
   - **Risk:** Can't track admin actions, compliance issues
   - **Fix:** Add audit log entries
   - **Priority:** HIGH

5. **Authorization Incomplete**
   - **Risk:** Super admins can't use endpoint
   - **Fix:** Check for both 'admin' and 'super_admin'
   - **Priority:** MEDIUM

### 🟢 Medium Priority (Fix This Month)

6. **Silent Email Failures**
   - **Risk:** Users not notified of rejection
   - **Fix:** Log email failures, return status
   - **Priority:** MEDIUM

7. **No Rate Limiting**
   - **Risk:** Potential abuse
   - **Fix:** Implement rate limiting
   - **Priority:** MEDIUM

8. **Missing Database Fields**
   - **Risk:** Can't track rejection history
   - **Fix:** Add migration for new fields
   - **Priority:** MEDIUM

---

## Recommended Implementation

### Complete Fixed Version

```typescript
// /app/api/admin/creators/reject/route.ts
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { sendCreatorRejectionEmail } from '@/lib/email/resend';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

// Input validation schema
const rejectCreatorSchema = z.object({
  creatorId: z.string().uuid('Invalid creator ID'),
  reason: z.string()
    .min(10, 'Rejection reason must be at least 10 characters')
    .max(500, 'Rejection reason must be less than 500 characters'),
});

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // 2. Rate limiting
    const identifier = `admin-reject-creator-${user.id}`;
    const { success: rateLimitOk, remaining } = await rateLimit(identifier, {
      limit: 10,
      window: 60, // 10 rejections per minute
    });

    if (!rateLimitOk) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          code: 'RATE_LIMIT_EXCEEDED',
          remaining 
        },
        { status: 429 }
      );
    }

    // 3. Authorization
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
      logger.warn('Unauthorized creator rejection attempt', {
        userId: user.id,
        role: profile?.role,
      });
      
      return NextResponse.json(
        { error: 'Forbidden', code: 'INSUFFICIENT_PERMISSIONS' },
        { status: 403 }
      );
    }

    // 4. Input validation
    const body = await req.json();
    const validation = rejectCreatorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          code: 'VALIDATION_ERROR',
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { creatorId, reason } = validation.data;

    // 5. Use admin client to bypass RLS
    const adminSupabase = createAdminClient();

    // 6. Check if creator exists and get details
    const { data: creator, error: fetchError } = await adminSupabase
      .from('marketplace_creators')
      .select('id, status, user_id, profiles(email, full_name)')
      .eq('id', creatorId)
      .single();

    if (fetchError || !creator) {
      logger.warn('Creator not found for rejection', { creatorId });
      return NextResponse.json(
        { error: 'Creator not found', code: 'CREATOR_NOT_FOUND' },
        { status: 404 }
      );
    }

    // 7. Check if already rejected
    if (creator.status === 'rejected') {
      return NextResponse.json(
        { error: 'Creator already rejected', code: 'ALREADY_REJECTED' },
        { status: 400 }
      );
    }

    // 8. Update status (don't delete!)
    const { error: updateError } = await adminSupabase
      .from('marketplace_creators')
      .update({
        status: 'rejected',
        rejection_reason: reason,
        rejected_at: new Date().toISOString(),
        rejected_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', creatorId);

    if (updateError) {
      logger.error('Failed to reject creator', updateError, { creatorId });
      throw updateError;
    }

    // 9. Send rejection email
    const creatorProfile = creator.profiles as any;
    let emailSent = false;
    
    if (creatorProfile?.email) {
      try {
        const result = await sendCreatorRejectionEmail({
          email: creatorProfile.email,
          name: creatorProfile.full_name || 'Applicant',
          reason,
        });
        
        emailSent = result.success;
        
        if (!result.success) {
          logger.error('Creator rejection email failed', undefined, {
            creatorId,
            email: creatorProfile.email,
            error: result.error,
          });
        }
      } catch (emailError) {
        logger.error('Creator rejection email error', emailError as Error, {
          creatorId,
          email: creatorProfile.email,
        });
      }
    }

    // 10. Audit log
    await adminSupabase.from('audit_logs').insert({
      action: 'creator_rejected',
      actor_id: user.id,
      target_id: creatorId,
      metadata: {
        reason,
        creator_email: creatorProfile?.email,
        email_sent: emailSent,
        timestamp: new Date().toISOString(),
      },
    });

    // 11. Success response
    logger.info('Creator rejected successfully', {
      creatorId,
      rejectedBy: user.id,
      emailSent,
    });

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent
        ? 'Creator rejected and notified via email'
        : 'Creator rejected but email notification failed',
    });

  } catch (err: unknown) {
    logger.error('Creator rejection failed', err as Error);
    
    return NextResponse.json(
      {
        error: 'Failed to reject creator',
        code: 'REJECTION_FAILED',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

---

## Testing Checklist

### Manual Testing

- [ ] Test with valid admin credentials
- [ ] Test with super_admin credentials
- [ ] Test with non-admin user (should fail)
- [ ] Test without authentication (should fail)
- [ ] Test with invalid creatorId (should fail)
- [ ] Test with missing reason (should fail)
- [ ] Test with very long reason (should fail)
- [ ] Test rejecting non-existent creator (should fail)
- [ ] Test rejecting already-rejected creator (should fail)
- [ ] Test that record is updated, not deleted
- [ ] Test that email is sent
- [ ] Test rate limiting (10+ requests in 1 minute)
- [ ] Verify audit log entry is created

### Automated Testing

```typescript
describe('POST /api/admin/creators/reject', () => {
  it('should reject creator with valid admin credentials', async () => {
    const response = await fetch('/api/admin/creators/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: 'valid-uuid',
        reason: 'Does not meet quality standards',
      }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('should return 401 without authentication', async () => {
    const response = await fetch('/api/admin/creators/reject', {
      method: 'POST',
      body: JSON.stringify({
        creatorId: 'valid-uuid',
        reason: 'Test reason',
      }),
    });
    
    expect(response.status).toBe(401);
  });

  it('should return 400 with invalid input', async () => {
    const response = await fetch('/api/admin/creators/reject', {
      method: 'POST',
      body: JSON.stringify({
        creatorId: 'invalid',
        reason: 'short',
      }),
    });
    
    expect(response.status).toBe(400);
  });
});
```

---

## Conclusion

The `/api/admin/creators/reject` endpoint has **critical security and operational issues** that must be addressed:

### Priority Actions

1. **CRITICAL:** Change from DELETE to UPDATE (status = 'rejected')
2. **HIGH:** Add input validation with Zod
3. **HIGH:** Use admin client to bypass RLS
4. **HIGH:** Add audit logging
5. **MEDIUM:** Fix authorization to include super_admin
6. **MEDIUM:** Add rate limiting
7. **MEDIUM:** Improve error handling and logging

### Success Metrics

- Zero data loss from rejections
- 100% audit trail coverage
- < 1% email delivery failures
- Zero unauthorized access attempts
- < 100ms average response time

---

**Report Generated:** January 10, 2026  
**Next Review:** After fixes are implemented  
**Severity:** 🟡 MEDIUM (becomes 🟢 LOW after fixes)
