# Dev Checklist: Revert + Enforce

## TL;DR

**"Revert the business workflow to: paid = triggers Milady + enrollment email + onboarding. Add server-side enforcement so only compliance completion unlocks timeclock/hours."**

---

## Current State (CORRECT - DO NOT CHANGE)

The Stripe webhook (`app/api/webhooks/stripe/route.ts`) already does the right thing:

1. ✅ Payment triggers enrollment creation
2. ✅ Payment triggers Milady provisioning ($295 split)
3. ✅ Payment triggers "Next Steps" email
4. ✅ Payment triggers onboarding initialization
5. ✅ Payment sets state to `enrolled_pending_orientation`
6. ✅ Payment creates `apprentices` record

**DO NOT modify the webhook flow. It is correct.**

---

## Enforcement Layer (ALREADY ADDED)

The enforcement layer is SEPARATE and only checks at action time:

| Route | Enforcement | Status |
|-------|-------------|--------|
| `/api/timeclock/action` | `assertEnrollmentPermissionWithOverride()` | ✅ Done |
| `/api/timeclock/context` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/checkin` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/checkin/checkout` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/enrollment/complete-orientation` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/enrollment/upload-document` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/enrollment/submit-documents` | `checkEnrollmentPermission()` | ✅ Done |
| `/api/apprenticeship/hours` | `withEnrollmentEnforcement()` | ✅ Done |

---

## What Enforcement Blocks (at action time)

When a student tries to clock in, the system checks:

1. **State check**: Must be `active_enrolled` or `active_in_good_standing`
2. **Orientation check**: `orientation_completed_at` must exist
3. **Documents check**: `documents_submitted_at` must exist
4. **Start date check**: `program_start_date` must be reached
5. **Payment check**: Must be current (7-day grace period)
6. **Shop check**: Partner shop must be approved

If ANY check fails → 403 with reason code.

---

## What Enforcement Does NOT Block

- ✅ Stripe webhook processing
- ✅ Milady provisioning
- ✅ Email sending
- ✅ Enrollment record creation
- ✅ Apprentice record creation
- ✅ Onboarding initialization
- ✅ Viewing dashboard (read-only)
- ✅ Completing orientation
- ✅ Uploading documents

---

## Remaining Routes to Convert

Run `npm run enforcement:scan` to see which routes still need enforcement:

```bash
npm run enforcement:scan
```

Current status: 8 passing, 13 failing

### Priority Routes to Convert:

1. `/api/apprentice/onboarding/status` - Add `checkEnrollmentPermission()`
2. `/api/apprentice/hours-summary` - Add `checkEnrollmentPermission()`
3. `/api/checkin/status` - Add `checkEnrollmentPermission()`
4. `/api/timeclock/heartbeat` - Add `checkEnrollmentPermission()`

### Lower Priority (admin/internal):

- `/api/apprenticeship/hours/approve` - Admin route
- `/api/apprenticeship/hours/reject` - Admin route
- `/api/shop/checkin/qr` - Shop route

---

## How to Add Enforcement to a Route

```typescript
import { checkEnrollmentPermission, EnrollmentAction } from '@/lib/enrollment';

export async function POST(req: Request) {
  // 1. Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 2. CANONICAL ENFORCEMENT CHECK
  const permission = await checkEnrollmentPermission(user.id, EnrollmentAction.CLOCK_IN);
  if (!permission.allowed) {
    return NextResponse.json({
      error: permission.message,
      code: permission.reason,
      state: permission.state,
    }, { status: 403 });
  }

  // 3. Proceed with action (enforcement already passed)
  // ...
}
```

---

## CI Enforcement

The build will fail if protected routes don't use enforcement:

```json
{
  "scripts": {
    "enforcement:scan": "node scripts/enforcement-scan.mjs"
  }
}
```

Add to CI pipeline:
```bash
npm run enforcement:scan && npm run build
```

---

## Summary

| Component | Status | Action |
|-----------|--------|--------|
| Stripe webhook | ✅ Correct | DO NOT CHANGE |
| Milady provisioning | ✅ Correct | DO NOT CHANGE |
| Email sending | ✅ Correct | DO NOT CHANGE |
| Timeclock enforcement | ✅ Done | - |
| Checkin enforcement | ✅ Done | - |
| Hours enforcement | ✅ Done | - |
| Orientation enforcement | ✅ Done | - |
| Documents enforcement | ✅ Done | - |
| CI scan | ✅ Done | Add to pipeline |
| Remaining routes | ⚠️ 13 routes | Convert as needed |

**The system is working correctly. Payment triggers automation. Enforcement blocks regulated actions until compliance is complete.**
