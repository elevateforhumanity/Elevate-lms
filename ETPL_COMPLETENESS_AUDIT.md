# ETPL Program Completeness Audit

**Date:** January 11, 2026  
**Purpose:** Verify all ETPL-approved programs have complete descriptions on website

---

## Executive Summary

**Status:** ⚠️ 5 ETPL programs missing from website

- **Total ETPL Programs:** 16
- **Programs with Complete Descriptions:** 11 ✅
- **Programs Missing:** 5 ❌

---

## ETPL Programs Status

### ✅ Complete (11 programs)

| # | Program Name | Slug | Description | Status |
|---|--------------|------|-------------|--------|
| 1 | Tax Preparation & Financial Services | `tax-prep-financial-services` | 3,311 chars | ✅ Complete |
| 2 | Medical Assistant | `medical-assistant` | 2,686 chars | ✅ Complete |
| 3 | HVAC Technician | `hvac-technician` | 2,849 chars | ✅ Complete |
| 4 | Barber Apprenticeship | `barber-apprenticeship` | 2,649 chars | ✅ Complete |
| 5 | Business Start-Up & Marketing | `business-startup-marketing` | 3,160 chars | ✅ Complete |
| 6 | Emergency Health & Safety Tech | `emergency-health-safety-tech` | 3,937 chars | ✅ Complete |
| 7 | Professional Esthetician | `professional-esthetician` | 4,319 chars | ✅ Complete |
| 8 | Peer Recovery Coach (CPRC) | `certified-peer-recovery-coach` | 3,708 chars | ✅ Complete |
| 9 | Building Maintenance Technician | `building-maintenance-tech` | 2,941 chars | ✅ Complete |
| 10 | CDL / Truck Driving | `cdl-training` | 2,972 chars | ✅ Complete |
| 11 | Phlebotomy Technician | `phlebotomy-technician` | 2,740 chars | ✅ Complete |

### ❌ Missing (5 programs)

| # | Program Name | ETPL Listed | Website Status | Action Required |
|---|--------------|-------------|----------------|-----------------|
| 12 | Welding Technology | ✅ Yes | ❌ Not in programs.ts | Add program data |
| 13 | Electrical Technician | ✅ Yes | ❌ Not in programs.ts | Add program data |
| 14 | Pharmacy Technician | ✅ Yes | ❌ Not in programs.ts | Add program data |
| 15 | IT Support Specialist | ✅ Yes | ❌ Not in programs.ts | Add program data |
| 16 | Culinary Arts & Food Service | ✅ Yes | ❌ Not in programs.ts | Add program data |

---

## Additional Programs (Not ETPL-Listed but on Website)

These programs exist in programs.ts but are NOT listed in ETPL submission:

1. **CNA Certification** (`cna-certification`) - Should this be ETPL-listed?
2. **CPR & First Aid** (`cpr-first-aid-hsi`) - Listed as "not ETPL" in submission
3. **Home Health Aide** (`home-health-aide`) - Should this be ETPL-listed?
4. **Beauty Career Educator** (`beauty-career-educator`) - Listed as "not ETPL" in submission
5. **Public Safety Reentry Specialist** (`public-safety-reentry-specialist`) - Not in ETPL
6. **Drug & Alcohol Specimen Collector** (`drug-alcohol-specimen-collector`) - Not in ETPL

---

## Recommendations

### High Priority - Add Missing ETPL Programs

Create complete program data for these 5 ETPL-approved programs:

#### 1. Welding Technology
**From ETPL Submission:**
- Duration: 12-24 Weeks
- Funding: WIOA, Apprenticeship
- Starting Wage: $18-$25/hr
- **Action:** Create `welding-technology` entry in programs.ts with full description

#### 2. Electrical Technician
**From ETPL Submission:**
- Duration: 16-24 Weeks
- Funding: Apprenticeship, WIOA, WRG
- Starting Wage: $16-$22/hr
- **Action:** Create `electrical-technician` entry in programs.ts with full description

#### 3. Pharmacy Technician
**From ETPL Submission:**
- Duration: 12-16 Weeks
- Funding: WRG, WIOA
- Starting Wage: $15-$19/hr
- **Action:** Create `pharmacy-technician` entry in programs.ts with full description

#### 4. IT Support Specialist
**From ETPL Submission:**
- Duration: 12-20 Weeks
- Funding: WIOA, Workforce Grants
- Starting Wage: $18-$24/hr
- **Action:** Create `it-support-specialist` entry in programs.ts with full description
- **Note:** Technology category page exists but no individual program page

#### 5. Culinary Arts & Food Service
**From ETPL Submission:**
- Duration: 12-18 Months
- Funding: Apprenticeship, WIOA, WRG
- Starting Wage: $14-$18/hr
- **Action:** Create `culinary-arts` entry in programs.ts with full description

### Medium Priority - Verify ETPL Status

**Programs on website but not in ETPL submission:**
1. Verify if CNA should be ETPL-listed (currently shows as "not ETPL" in etplAlignment.ts)
2. Verify if Home Health Aide should be ETPL-listed
3. Update ETPL submission if these should be included

### Low Priority - Documentation

1. Update ETPL_MASTER_SUBMISSION_PACKAGE.md if programs are added/removed
2. Update etplAlignment.ts to match current ETPL status
3. Ensure all syllabi files exist in `/public/docs/syllabi/`

---

## Syllabi Files Status

Checking if syllabi exist for all ETPL programs:

### ✅ Syllabi Files Found
- barber-apprenticeship.md
- building-maintenance.md (referenced as building-maintenance-tech)
- business-startup-marketing.md
- culinary-arts.md
- electrical.md
- emergency-health-safety-tech.md
- hvac-technician.md
- it-support.md
- medical-assistant.md (need to verify)
- peer-recovery-coach.md
- pharmacy-tech.md
- phlebotomy.md (referenced as phlebotomy-technician)
- professional-esthetician.md
- tax-prep-financial-services.md (need to verify)
- truck-driving.md (referenced as cdl-training)
- welding.md

**Status:** All 16 ETPL programs have syllabi files ✅

---

## Action Plan

### Step 1: Add Missing Programs to programs.ts

For each of the 5 missing programs, add entry with:
- slug
- name
- heroTitle
- heroSubtitle
- shortDescription
- longDescription (minimum 2,000 characters)
- duration
- schedule
- delivery
- credential
- approvals
- fundingOptions
- highlights
- whatYouLearn
- outcomes
- requirements
- averageSalary
- salaryRange
- jobGrowth

### Step 2: Create Syllabi References

Ensure each program links to its syllabus file in `/public/docs/syllabi/`

### Step 3: Update Category Pages

Verify category pages (Healthcare, Technology, Business, Skilled Trades) mention all relevant ETPL programs

### Step 4: Test Routes

Test that all program URLs work:
- `/programs/welding-technology`
- `/programs/electrical-technician`
- `/programs/pharmacy-technician`
- `/programs/it-support-specialist`
- `/programs/culinary-arts`

### Step 5: Update ETPL Alignment

Update `/lms-data/etplAlignment.ts` to include all 16 programs with correct ETPL status

---

## Files to Update

1. `/app/data/programs.ts` - Add 5 missing programs
2. `/lms-data/etplAlignment.ts` - Verify all 16 programs listed
3. `/public/docs/syllabi/ETPL_MASTER_SUBMISSION_PACKAGE.md` - Keep in sync
4. Category pages - Mention all relevant programs

---

## Compliance Notes

**IMPORTANT:** All ETPL-approved programs MUST be accurately represented on the website for:
- WorkOne referrals
- WIOA/WRG funding eligibility
- State compliance
- Student information accuracy

Missing programs could result in:
- Lost enrollment opportunities
- Funding issues
- Compliance violations
- Student confusion

---

**Next Review Date:** February 2026  
**Responsible:** Program Director / Web Team
