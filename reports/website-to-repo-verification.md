# Website-to-Repo Verification Report

Generated: 2026-02-06

## BARBER APPRENTICESHIP PAGE

### File: `app/programs/barber-apprenticeship/page.tsx`

| Line | Website Claim (Exact) | Repo/DB Evidence | Status |
|------|----------------------|------------------|--------|
| 97 | "Flexible payment plans starting at $415/month" | `lib/programs/pricing.ts` - NO monthly plans, only weekly payments. `app/api/barber/checkout/public/route.ts:98` - BNPL (Affirm/Klarna) handles payment plans, not $415/month | ❌ FALSE CLAIM |
| 62 | `tuition: program?.tuition \|\| 4980` | `lib/programs/pricing.ts:18` - `fullPrice: 4980` | ✅ MATCHES |
| 67 | `totalHours: 2000` | `lib/programs/pricing.ts:22` - `totalHoursRequired: 2000` | ✅ MATCHES |

### File: `app/programs/barber-apprenticeship/BarberChatAssistant.tsx`

| Line | Website Claim (Exact) | Repo/DB Evidence | Status |
|------|----------------------|------------------|--------|
| 44 | "4-month plan: $1,245/month" | NO EVIDENCE - Not in Stripe, not in checkout API | ❌ FALSE CLAIM |
| 45 | "6-month plan: $830/month" | NO EVIDENCE - Not in Stripe, not in checkout API | ❌ FALSE CLAIM |
| 46 | "12-month plan: $415/month" | NO EVIDENCE - Not in Stripe, not in checkout API | ❌ FALSE CLAIM |
| 31-32 | "Setup Fee (35%): $1,743" + "Remaining Balance: $3,237 - paid weekly" | `lib/programs/pricing.ts:20-21` | ✅ MATCHES |

### File: `lib/apprenticeship/handbook-content.ts`

| Line | Website Claim (Exact) | Repo/DB Evidence | Status |
|------|----------------------|------------------|--------|
| 425 | "12-Month Plan: $415/month" | NO EVIDENCE - Not in Stripe, not in checkout API | ❌ FALSE CLAIM |

---

## HVAC PROGRAM PAGE

### File: `app/programs/hvac/page.tsx`

| Line | Website Claim (Exact) | Repo/DB Evidence | Status |
|------|----------------------|------------------|--------|
| 184 | "$0 Tuition (WIOA)" | `supabase/migrations/20260201_training_programs_stripe.sql` - `wioa_eligible: true` for hvac-technician | ✅ CONDITIONAL (requires WIOA eligibility) |
| 31 | "If you qualify for WIOA...your tuition is 100% covered" | Database has `wioa_eligible: true` | ✅ CONDITIONAL |
| 135 | "$48K Average Starting Salary" | NO DATABASE EVIDENCE - Marketing claim only | ⚠️ UNVERIFIED |
| 111-128 | Testimonials with specific salaries ($52K, $48K, $58K) | NO DATABASE EVIDENCE - Marketing claim only | ⚠️ UNVERIFIED |

---

## CNA CERTIFICATION PAGE

### File: `app/programs/cna-certification/page.tsx` (if exists)

| Claim | Evidence | Status |
|-------|----------|--------|
| WIOA Funding | `supabase/migrations/20260201_training_programs_stripe.sql` - CNA has `ARRAY['Self-Pay'], false, false` - **NOT WIOA ELIGIBLE** | ❌ CHECK PAGE FOR FALSE WIOA CLAIMS |

---

## CDL TRAINING PAGE

### File: `app/programs/cdl-training/page.tsx`

| Line | Website Claim (Exact) | Repo/DB Evidence | Status |
|------|----------------------|------------------|--------|
| 19 | "Free CDL training through WIOA funding" | `supabase/migrations/20260201_training_programs_stripe.sql` - `wioa_eligible: true` | ✅ CONDITIONAL |
| 57 | "$50,000 - $80,000/year" | NO DATABASE EVIDENCE - Marketing claim | ⚠️ UNVERIFIED |

---

## PROGRAMS WITH FALSE WIOA CLAIMS (Database says NOT WIOA eligible)

Based on `supabase/migrations/20260201_training_programs_stripe.sql`:

| Program | Database wioa_eligible | Website Claims WIOA? |
|---------|----------------------|---------------------|
| CNA Certification | **false** | NEEDS VERIFICATION |
| Tax Preparation | **false** | NEEDS VERIFICATION |

---

## SUMMARY OF VERIFIED FALSE CLAIMS

1. **Barber $415/month payment plan** - 3 locations, NO implementation
2. **Barber $1,245/month plan** - NO implementation
3. **Barber $830/month plan** - NO implementation
4. **CNA WIOA eligibility** - Database says NOT WIOA eligible

## NEXT: Full page-by-page extraction required for remaining 1,539 pages
