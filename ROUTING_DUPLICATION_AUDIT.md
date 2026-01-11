# Routing & Content Duplication Audit

**Date:** January 11, 2026  
**Status:** ⚠️ Multiple routing conflicts and content duplications found

---

## Executive Summary

The site has **two routing systems** for programs:
1. **Static routes** - Individual page.tsx files in `/app/programs/[name]/`
2. **Dynamic routes** - Data-driven pages using `/app/programs/[slug]/page.tsx`

This creates routing conflicts, duplicate content, and SEO issues.

---

## Routing Conflicts

### 1. ❌ CNA - DUPLICATE CONTENT
- **Static:** `/programs/cna` → Custom page with VideoHero, ProgramNav
- **Dynamic:** `/programs/cna-certification` → ProgramTemplate with data
- **Issue:** Two different pages for the same program
- **SEO Impact:** Duplicate content penalty
- **User Impact:** Confusing - which page is correct?

### 2. ⚠️ Barber Apprenticeship - POTENTIAL CONFLICT
- **Static:** `/programs/barber-apprenticeship` → Custom detailed page
- **Dynamic:** `/programs/barber-apprenticeship` → Same slug in programs.ts
- **Issue:** Static takes precedence, dynamic never loads
- **Impact:** Wasted code in programs.ts

### 3. ⚠️ CDL - SIMILAR PROGRAMS
- **Static:** `/programs/cdl-transportation` → Category page
- **Dynamic:** `/programs/cdl-training` → Individual program
- **Issue:** Unclear if these are different programs or duplicates
- **Impact:** User confusion

### 4. ⚠️ Tax Preparation - SIMILAR PROGRAMS
- **Static:** `/programs/tax-preparation` → Specific page
- **Dynamic:** `/programs/tax-prep-financial-services` → Data-driven
- **Issue:** Unclear relationship
- **Impact:** Potential duplication

### 5. ⚠️ Drug Collector - SIMILAR PROGRAMS
- **Static:** `/programs/drug-collector` → Specific page
- **Dynamic:** `/programs/drug-alcohol-specimen-collector` → Data-driven
- **Issue:** Likely the same program with different URLs
- **Impact:** Duplicate content

---

## Content Duplication Issues

### 1. "Who This Program Is For" Sections

**Skilled Trades & CDL Pages - IDENTICAL TEXT:**
```
- Individuals seeking career change or advancement
- No prior experience required for most programs
- Justice-impacted individuals welcome
- Barriers support available
```

**Impact:** Not user-friendly, doesn't differentiate programs

**Fix Required:** Make each section program-specific

### 2. Funding Options - ACCEPTABLE
All pages list WIOA, WRG, JRI. This is correct since funding applies to all programs.

### 3. Support Services - LIKELY DUPLICATE
Need to verify if all pages have identical support services text.

---

## Recommendations

### High Priority (Fix Immediately)

1. **Resolve CNA Duplication**
   - **Option A:** Keep `/programs/cna`, remove `cna-certification` from programs.ts
   - **Option B:** Remove `/programs/cna` directory, redirect to `/programs/cna-certification`
   - **Recommended:** Option A (custom page is more detailed)

2. **Fix Barber Apprenticeship Conflict**
   - Remove `barber-apprenticeship` from programs.ts (static page already exists)

3. **Update "Who This Program Is For" Sections**
   - Skilled Trades: Add specific requirements (physical ability, tool usage)
   - CDL: Add age 21+, valid license, clean driving record
   - Technology: Add computer literacy requirements
   - Business: Add office environment preferences

### Medium Priority

4. **Clarify CDL Programs**
   - Determine if `/programs/cdl-transportation` and `/programs/cdl-training` are the same
   - If same: Remove one and redirect
   - If different: Clearly differentiate in content

5. **Clarify Tax Programs**
   - Same as CDL - determine if duplicate or different programs

6. **Clarify Drug Collector Programs**
   - Same as above

### Low Priority

7. Add canonical tags to prevent SEO issues
8. Implement 301 redirects for removed pages
9. Update internal links to point to correct URLs

---

## Routing Structure Recommendation

### Proposed Structure

**Category Pages (Overview of multiple programs):**
- `/programs/healthcare` - Overview of CNA, MA, Phlebotomy, HHA
- `/programs/technology` - Overview of IT, CompTIA, Google certs
- `/programs/business` - Overview of QuickBooks, Office, Admin
- `/programs/skilled-trades` - Overview of HVAC, Electrical, Plumbing
- `/programs/cdl-transportation` - Overview of CDL programs

**Individual Program Pages (Specific programs):**
- `/programs/cna` - Detailed CNA program
- `/programs/medical-assistant` - Detailed MA program
- `/programs/hvac-technician` - Detailed HVAC program
- `/programs/barber-apprenticeship` - Detailed Barber program
- etc.

**Special Pages:**
- `/programs/apprenticeships` - Overview of all apprenticeships
- `/programs/jri` - JRI-specific programs
- `/programs/federal-funded` - Federal funding programs

**Remove Dynamic Route:**
- Consider removing `/programs/[slug]` entirely
- Use static pages for all programs
- Simpler, more maintainable, better SEO

---

## Next Steps

1. Review this audit with team
2. Decide on routing strategy (static vs dynamic)
3. Create redirect plan for removed pages
4. Update internal links
5. Fix duplicate content in "Who This Is For" sections
6. Test all routes after changes
7. Update sitemap.xml

---

## Files to Review

- `/app/programs/[slug]/page.tsx` - Dynamic route handler
- `/app/data/programs.ts` - Program data
- `/app/programs/cna/page.tsx` - CNA static page
- `/app/programs/barber-apprenticeship/page.tsx` - Barber static page
- All category pages (healthcare, technology, business, skilled-trades, cdl-transportation)
