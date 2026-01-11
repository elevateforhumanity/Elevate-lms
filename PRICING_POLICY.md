# Program Pricing Display Policy

**Date:** January 11, 2026  
**Policy:** Remove pricing from funded programs, show pricing only for non-funded programs

---

## Funded vs Non-Funded Programs

### ✅ Funded Programs (NO PRICING SHOWN)

These programs are 100% funded through WIOA, WRG, or other state/federal funding. Students pay $0.

**All 11 INTraining ETPL Programs:**

1. **Barber Apprenticeship** - WIOA/WRG funded ✅ Pricing removed
2. **Beauty and Career Educator Training** - WIOA/WRG funded
3. **Business Start-up & Marketing** - WIOA/WRG funded
4. **CPR, AED & First Aid** - WIOA/WRG funded
5. **Emergency Health & Safety Technician** - WIOA/WRG funded
6. **Home Health Aide Certification** - WIOA/WRG funded
7. **HVAC Technician** - WIOA/WRG funded (Workforce Ready Grant)
8. **Medical Assistant** - WIOA/WRG funded
9. **Professional Esthetician** - WIOA/WRG funded
10. **Public Safety Reentry Specialist** - WIOA/WRG funded
11. **Tax Preparation & Financial Service Career** - WIOA/WRG funded

**Display Policy:**
- Show "100% Free with Funding"
- Emphasize WIOA/WRG eligibility
- Link to funding eligibility page
- NO dollar amounts
- NO payment options (Stripe, Affirm, Afterpay)

### ❌ Non-Funded Programs (PRICING SHOWN)

These programs are NOT on ETPL and require self-pay or alternative funding.

**Currently Identified:**

1. **CNA Training** - NOT funded
   - Status: Not on INTraining ETPL list
   - etplAlignment.ts: `onETPL: false`
   - Funding: Employer-sponsored + philanthropy + payment plans
   - **Action:** Add pricing to CNA page

**Display Policy:**
- Show actual program cost
- Itemize costs (tuition, fees, books, supplies)
- Offer payment options (Stripe, Affirm, Afterpay)
- Mention alternative funding if available

---

## Implementation Status

### ✅ Completed

1. **Barber Apprenticeship Page**
   - Removed all pricing ($4,890)
   - Removed payment buttons (Stripe, Affirm, Afterpay)
   - Added "100% Free with Funding" section
   - Updated At-a-Glance: "100% Free" instead of "$4,890"
   - Emphasized earn-while-you-learn model

### ⚠️ Needs Update

**Category Pages (5 pages):**
- Healthcare - ✅ No pricing shown (only salary ranges)
- Technology - ✅ No pricing shown
- Business - ✅ No pricing shown
- Skilled Trades - ✅ No pricing shown
- CDL & Transportation - ✅ No pricing shown (only salary ranges)

**Individual Program Pages (10 remaining ETPL programs):**
Need to verify none show pricing:
- Beauty and Career Educator Training
- Business Start-up & Marketing
- CPR, AED & First Aid
- Emergency Health & Safety Technician
- Home Health Aide Certification
- HVAC Technician
- Medical Assistant
- Professional Esthetician
- Public Safety Reentry Specialist
- Tax Preparation & Financial Service Career

**CNA Page:**
- Currently shows "Varies" for cost
- **Action Required:** Add actual pricing since it's NOT funded
- Need to determine actual CNA program cost
- Add payment options

---

## Messaging Guidelines

### For Funded Programs

**Hero Section:**
```
✓ Free with funding
✓ WIOA/WRG eligible
✓ 100% funded for eligible students
```

**Cost Section:**
```
100% Free with Funding

This program is fully funded through WIOA and WRG for eligible students. 
You pay nothing for tuition, books, supplies, or tools.

What's Covered:
✓ All tuition and instructional costs
✓ Books and learning materials
✓ Supplies and tools
✓ Career placement assistance

[Check Your Eligibility Button]
```

**At-a-Glance:**
```
Cost: 100% Free
With WIOA/WRG funding
```

### For Non-Funded Programs (CNA)

**Hero Section:**
```
⚠️ Self-pay program
💰 Flexible payment options available
```

**Cost Section:**
```
Program Cost: $X,XXX

Breakdown:
• Tuition: $X,XXX
• Books: $XXX
• Supplies: $XXX
• Total: $X,XXX

Payment Options:
[Stripe Button] [Affirm Button] [Afterpay Button]

Alternative Funding:
• Employer sponsorship
• Scholarships
• Payment plans
```

---

## Verification Checklist

### Before Publishing Any Program Page:

- [ ] Check etplAlignment.ts for `onETPL` status
- [ ] Verify program is/isn't in INTraining ETPL list
- [ ] If funded: Remove ALL pricing
- [ ] If funded: Remove payment buttons
- [ ] If funded: Add "100% Free with Funding" section
- [ ] If NOT funded: Add complete pricing breakdown
- [ ] If NOT funded: Add payment options
- [ ] Update At-a-Glance section accordingly
- [ ] Test all links and buttons

---

## Data Sources

**Official ETPL Status:**
- INTraining Dashboard: https://intraining.dwd.in.gov/
- Provider: 2Exclusive LLC-S
- Location: Elevate for Humanity Training Center

**Internal Tracking:**
- `/lms-data/etplAlignment.ts` - Program funding status
- `/app/data/programs.ts` - Program details
- `/public/docs/syllabi/ETPL_MASTER_SUBMISSION_PACKAGE.md` - ETPL submission

---

## Contact for Questions

**Funding Eligibility:**
- Indiana DWD: 1-800-891-6499
- WorkOne Indianapolis: (317) 684-2400

**Program Information:**
- Elevate for Humanity: (317) 314-3757
- Email: elevate4humanityedu@gmail.com

---

**Policy Version:** 1.0  
**Last Updated:** January 11, 2026  
**Next Review:** Quarterly with ETPL updates
