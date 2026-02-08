# Developer Directive: Multi-Program Enforcement

**Status:** Implementation Complete  
**Date:** 2026-02-08  
**Author:** Enforcement System  

---

## Executive Summary

This system enforces program-specific rules across Barber, Cosmetology, Nails, Esthetics, CNA, and HVAC programs. **No drift allowed.**

---

## Program Types

| Program Type | Programs | Hours | Placements | Timeclock | Completion |
|--------------|----------|-------|------------|-----------|------------|
| `internal_apprenticeship` | Barber | ✅ | ✅ | ✅ | Hours + Docs |
| `internal_clock_program` | Cosmo, Nails, Esthetics, CNA | ✅ | ❌ | ✅ | Hours + Docs |
| `external_lms_wrapped` | HVAC | ❌ | ❌ | ❌ | Credential Verification |

---

## Non-Negotiable Rules

### 1. HVAC Cannot Log Hours

**Enforced at:**
- Database: `trg_prevent_external_lms_hours` trigger
- API: `assertEnrollmentPermission()` returns `ACTION_NOT_ALLOWED`
- UI: Hours links hidden when `programType === 'external_lms_wrapped'`

**If you try to bypass:** DB trigger will throw exception.

### 2. HVAC Cannot Have Placements

**Enforced at:**
- Database: `trg_prevent_external_lms_placements` trigger
- API: Same enforcement check

### 3. CNA Requires Extra Documents

**Required before clinical:**
- `background_check`
- `tb_test`
- `clinical_clearance`

**Enforced at:**
- API: `checkRequiredDocuments()` in `lib/enrollment/program-requirements.ts`
- Denial codes: `CNA_BACKGROUND_CHECK_REQUIRED`, `CNA_TB_TEST_REQUIRED`

### 4. All Routes Must Use Enforcement

**CI will fail if:**
- A route in `MUST_ENFORCE_PATH_SUBSTRINGS` doesn't call enforcement
- Run: `npm run enforcement:scan`

---

## File Locations

| Purpose | File |
|---------|------|
| Program config | `/config/program-requirements.json` |
| DB migration | `/supabase/migrations/20260208_multi_program_enforcement.sql` |
| Enforcement engine | `/lib/enrollment/assert-permission.ts` |
| Program type helpers | `/lib/enrollment/program-requirements.ts` |
| CI scan | `/scripts/enforcement-scan.mjs` |
| Tests | `/tests/e2e/multi-program-enforcement.spec.ts` |

---

## How to Add a New Program

1. **Add to config:**
   ```json
   // config/program-requirements.json
   "new-program-slug": {
     "program_type": "internal_clock_program",
     "hours_required": 500,
     "requires_documents": ["government_id"]
   }
   ```

2. **Set program_type in DB:**
   ```sql
   UPDATE programs SET program_type = 'internal_clock_program' WHERE slug = 'new-program-slug';
   ```

3. **Done.** Enforcement automatically applies.

---

## How to Check Enforcement

```typescript
import { checkEnrollmentPermission, EnrollmentAction } from '@/lib/enrollment';

const result = await checkEnrollmentPermission(
  userId,
  EnrollmentAction.CLOCK_IN,
  { programSlug: 'hvac-technician' }
);

if (!result.allowed) {
  // result.reason === 'ACTION_NOT_ALLOWED'
  // result.message === 'Hours logging is not available for this program type.'
}
```

---

## Audit Trail

Every permission check logs:
- `user_id`
- `action`
- `program_type`
- `reason_code`
- `timestamp` (ISO)

Table: `enrollment_state_audit`

---

## Testing Checklist

Before deploying, verify:

- [ ] HVAC student cannot clock in (403 + ACTION_NOT_ALLOWED)
- [ ] CNA student without TB test cannot start clinical
- [ ] Barber student fully compliant can clock in
- [ ] HVAC dashboard shows no hours links
- [ ] CI enforcement scan passes

---

## What NOT to Do

❌ Do not add `if (programSlug === 'hvac')` checks in routes  
❌ Do not bypass enforcement with direct DB inserts  
❌ Do not remove enforcement wrapper from protected routes  
❌ Do not hardcode program-specific logic outside config  

---

## Contact

If enforcement blocks something that should be allowed, check:
1. Is `program_type` set correctly in `programs` table?
2. Is the program override in `config/program-requirements.json`?
3. Are all required documents submitted?

Do NOT disable enforcement. Fix the data.
