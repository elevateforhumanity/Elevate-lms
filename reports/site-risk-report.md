# Site Risk Report - Lie/Risk Detection

Generated: 2026-02-06
Updated: 2026-02-06

## FIXED ISSUES

### ✅ Barber $415/month claims - FIXED (commit 21ecdcc7)
### ✅ CNA WIOA/free claims - FIXED (commit 63f5deb1)

## CRITICAL: FALSE CLAIMS REQUIRING IMMEDIATE REMOVAL

### 1. BARBER MONTHLY PAYMENT PLANS - NON-EXISTENT

**Classification: NON-EXISTENT / COMPLIANCE RISK**

| File | Line | False Claim |
|------|------|-------------|
| `app/programs/barber-apprenticeship/page.tsx` | 97 | "Flexible payment plans starting at $415/month" |
| `app/programs/barber-apprenticeship/BarberChatAssistant.tsx` | 44 | "4-month plan: $1,245/month" |
| `app/programs/barber-apprenticeship/BarberChatAssistant.tsx` | 45 | "6-month plan: $830/month" |
| `app/programs/barber-apprenticeship/BarberChatAssistant.tsx` | 46 | "12-month plan: $415/month" |
| `lib/apprenticeship/handbook-content.ts` | 425 | "12-Month Plan: $415/month" |
| `lib/payment-config.ts` | 115-119 | Monthly payment plans array (unused by barber checkout) |

**Evidence of Non-Existence:**
- `app/api/barber/checkout/public/route.ts` charges **$4,980 full tuition** with BNPL options
- `lib/programs/pricing.ts` defines **weekly** payments, not monthly
- NO Stripe price IDs exist for $415, $830, or $1,245 monthly plans
- Checkout flow uses Affirm/Klarna/Afterpay which set their OWN payment terms

**Risk:** Consumer protection violation - advertising payment plans that don't exist

---

### 2. CNA WIOA ELIGIBILITY - ✅ FIXED

**Classification: FIXED**

CNA pages now correctly show $1,200 tuition instead of false "free/WIOA" claims.

---

### 3. TAX PREPARATION - NEEDS CLARIFICATION

**Classification: POTENTIAL FALSE ADVERTISING**

**Database Evidence:**
```sql
('tax-preparation', ... ARRAY['Self-Pay'], false, false, false,
 tuition: $1,500
```

**Website Claims:**
- "Free Tax Preparation Training"
- "Funded IRS-certified tax preparation training"
- "Our Training is 100% FREE"
- "$0 training costs"

**Question:** Is Tax Prep actually free, or does it cost $1,500?
If it costs $1,500, the page needs the same fix as CNA.

---

### 3. SALARY CLAIMS - UNVERIFIED MARKETING

**Classification: MARKETING ONLY**

| Program | Claim | Evidence |
|---------|-------|----------|
| HVAC | "$48K Average Starting Salary" | NO DATABASE |
| HVAC | Testimonials with $52K, $48K, $58K | NO DATABASE |
| CDL | "$50,000 - $80,000/year" | NO DATABASE |
| Welding | "$54K Average Starting Salary" | NO DATABASE |
| IT Support | "$45K Average Starting Salary" | NO DATABASE |
| Cybersecurity | "$65K Average Starting Salary" | NO DATABASE |

**Risk:** These are marketing claims with no data backing. May require disclaimer.

---

### 4. "FREE" TRAINING CLAIMS - CONDITIONAL

**Classification: PARTIALLY TRUE**

Multiple pages claim "free" or "$0" training. This is ONLY true if:
1. Student qualifies for WIOA
2. Program is WIOA-eligible in database

**Programs NOT WIOA eligible (cannot claim "free"):**
- CNA Certification
- Tax Preparation

---

## RISK SEVERITY MATRIX

| Issue | Severity | Legal Risk | Action |
|-------|----------|------------|--------|
| Barber $415/month claims | **CRITICAL** | Consumer protection | REMOVE IMMEDIATELY |
| CNA WIOA claims (if exist) | **HIGH** | False advertising | VERIFY & REMOVE |
| Salary claims without data | **MEDIUM** | Misleading | ADD DISCLAIMERS |
| "Free" without conditions | **MEDIUM** | Misleading | ADD "if eligible" |

---

## FILES REQUIRING IMMEDIATE EDIT

1. `app/programs/barber-apprenticeship/page.tsx:97` - Remove "$415/month"
2. `app/programs/barber-apprenticeship/BarberChatAssistant.tsx:44-46` - Remove monthly plans
3. `lib/apprenticeship/handbook-content.ts:425` - Remove "$415/month"
4. `lib/payment-config.ts:115-119` - Remove or mark as deprecated

---

## WHAT THE BARBER PAGE SHOULD SAY

**Current (FALSE):**
> "Flexible payment plans starting at $415/month"

**Correct (per repo):**
> "Pay $4,980 in full, or use Affirm/Klarna/Afterpay to split into payments (terms set by lender)"

OR

> "Setup fee: $1,743 at enrollment. Remaining $3,237 paid weekly."
