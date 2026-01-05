# SEO Meta Tags Audit Report

**Date:** 2026-01-05 17:27 UTC  
**Total Pages:** 782  
**Status:** ⚠️ Incomplete

---

## Executive Summary

### Coverage Statistics

| Metric | Count | Percentage | Status |
|--------|-------|------------|--------|
| **Total Pages** | 782 | 100% | - |
| **With Canonical URLs** | 563 | 72% | ⚠️ Needs improvement |
| **With Meta Description** | 590 | 75% | ⚠️ Needs improvement |
| **With OpenGraph Tags** | 12 | 1.5% | ❌ Critical |
| **Missing Canonical** | 219 | 28% | ⚠️ Action needed |

### Overall Grade: C-

**Issues:**
- ❌ 219 pages missing canonical URLs (28%)
- ❌ 192 pages missing meta descriptions (25%)
- ❌ 770 pages missing OpenGraph tags (98.5%)
- ⚠️ Twitter Card tags likely missing on most pages

---

## Detailed Analysis

### 1. Canonical URLs

**Status:** 72% coverage (563/782 pages)

**Missing Canonical URLs (219 pages):**

**Staff Portal Pages:**
- /staff-portal
- /staff-portal/campaigns
- /staff-portal/customer-service
- /staff-portal/students
- /staff-portal/courses
- /staff-portal/qa-checklist
- /staff-portal/dashboard
- /staff-portal/processes
- /staff-portal/training

**Onboarding Pages:**
- /onboarding
- /onboarding/start
- /onboarding/partner
- /onboarding/handbook
- /onboarding/learner
- /onboarding/mou
- /onboarding/employer
- /onboarding/employer/orientation
- /onboarding/payroll-setup
- /onboarding/school
- /onboarding/school/orientation
- /onboarding/staff
- /onboarding/staff/orientation

**Utility Pages:**
- /calendar
- /sheets
- /calculator/revenue-share
- /downloads
- /cache-diagnostic
- /partner
- /partner/attendance
- /student-handbook
- /booking
- /enroll
- /enroll/success
- /jri
- /next-steps
- /verify-email
- /license

**Shop Pages:**
- /shop/onboarding
- /shop/onboarding/documents
- /shop/reports
- /shop/reports/new

**Nonprofit Pages:**
- /nonprofit/donations
- /nonprofit/workshops
- /nonprofit/sign-up

**Impact:**
- Duplicate content issues
- Confused search engines
- Split page authority
- Lower rankings

**Recommendation:** Add canonical URLs to all 219 pages

---

### 2. Meta Descriptions

**Status:** 75% coverage (590/782 pages)

**Missing:** 192 pages (25%)

**Impact:**
- Search engines generate own snippets
- Less control over search appearance
- Lower click-through rates
- Inconsistent messaging

**Recommendation:** Add unique meta descriptions to all pages

---

### 3. OpenGraph Tags

**Status:** 1.5% coverage (12/782 pages)

**Missing:** 770 pages (98.5%)

**Impact:**
- Poor social media sharing
- No preview images on Facebook/LinkedIn
- Generic sharing appearance
- Lost social traffic

**Required OpenGraph Tags:**
```typescript
openGraph: {
  title: 'Page Title',
  description: 'Page description',
  url: 'https://www.elevateforhumanity.org/page-url',
  siteName: 'Elevate for Humanity',
  images: [{
    url: '/images/og-image.jpg',
    width: 1200,
    height: 630,
  }],
  type: 'website',
}
```

**Recommendation:** Add OpenGraph tags to all public pages

---

### 4. Twitter Card Tags

**Status:** Not audited (likely similar to OpenGraph)

**Required Twitter Tags:**
```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Page Title',
  description: 'Page description',
  images: ['/images/twitter-card.jpg'],
}
```

**Recommendation:** Add Twitter Card tags to all public pages

---

## Priority Pages Missing SEO

### High Priority (Public Pages)

These pages are likely indexed and need SEO tags:

1. **/booking** - Booking page
2. **/enroll** - Enrollment page
3. **/enroll/success** - Success page
4. **/jri** - JRI program page
5. **/next-steps** - Next steps page
6. **/verify-email** - Email verification
7. **/license** - License page
8. **/nonprofit/donations** - Donations page
9. **/nonprofit/workshops** - Workshops page
10. **/nonprofit/sign-up** - Sign up page

### Medium Priority (Internal Tools)

These may not need full SEO but should have canonical:

1. **/staff-portal** - Staff portal
2. **/onboarding** - Onboarding flows
3. **/calculator/revenue-share** - Calculator
4. **/partner** - Partner pages
5. **/shop** - Shop pages

### Low Priority (Utility Pages)

These likely don't need SEO:

1. **/cache-diagnostic** - Diagnostic tool
2. **/calendar** - Calendar
3. **/sheets** - Sheets
4. **/downloads** - Downloads

---

## Recommendations by Priority

### Immediate (High Priority)

**Add to all 219 pages missing canonical:**

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/page-url',
  },
};
```

**Estimated Time:** 2-3 hours  
**Impact:** High - Prevents duplicate content issues

### Short-term (1 week)

**Add meta descriptions to 192 pages:**

```typescript
export const metadata: Metadata = {
  description: 'Unique, compelling description (150-160 characters)',
};
```

**Estimated Time:** 4-6 hours  
**Impact:** High - Improves click-through rates

### Medium-term (2 weeks)

**Add OpenGraph tags to all public pages:**

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://www.elevateforhumanity.org/page-url',
    siteName: 'Elevate for Humanity',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
};
```

**Estimated Time:** 8-10 hours  
**Impact:** Medium - Improves social sharing

### Long-term (1 month)

**Add Twitter Card tags to all public pages:**

```typescript
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['/images/twitter-card.jpg'],
  },
};
```

**Estimated Time:** 4-6 hours  
**Impact:** Medium - Improves Twitter sharing

---

## Automated Solution

### Create SEO Template

**File:** `lib/seo/metadata.ts`

```typescript
export function generateMetadata(params: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const url = `${baseUrl}${params.path}`;
  const image = params.image || '/images/og-default.jpg';

  return {
    title: params.title,
    description: params.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: params.title,
      description: params.description,
      url: url,
      siteName: 'Elevate for Humanity',
      images: [{
        url: image,
        width: 1200,
        height: 630,
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [image],
    },
  };
}
```

**Usage:**

```typescript
export const metadata = generateMetadata({
  title: 'Page Title | Elevate for Humanity',
  description: 'Page description here',
  path: '/page-url',
  image: '/images/page-og.jpg', // optional
});
```

---

## Sample Pages to Fix

### Example 1: /booking/page.tsx

**Current:**
```typescript
export default function BookingPage() {
  return <div>Booking content</div>;
}
```

**Fixed:**
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment | Elevate for Humanity',
  description: 'Schedule your appointment for career training, program enrollment, or consultation with Elevate for Humanity.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/booking',
  },
  openGraph: {
    title: 'Book an Appointment | Elevate for Humanity',
    description: 'Schedule your appointment for career training, program enrollment, or consultation.',
    url: 'https://www.elevateforhumanity.org/booking',
    siteName: 'Elevate for Humanity',
    images: [{
      url: '/images/og-booking.jpg',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
};

export default function BookingPage() {
  return <div>Booking content</div>;
}
```

### Example 2: /enroll/page.tsx

**Current:**
```typescript
export default function EnrollPage() {
  return <div>Enrollment form</div>;
}
```

**Fixed:**
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enroll Now | Elevate for Humanity',
  description: 'Start your career training journey. Enroll in free workforce development programs with WIOA funding in Indianapolis.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/enroll',
  },
  openGraph: {
    title: 'Enroll Now | Elevate for Humanity',
    description: 'Start your career training journey with free workforce development programs.',
    url: 'https://www.elevateforhumanity.org/enroll',
    siteName: 'Elevate for Humanity',
    images: [{
      url: '/images/og-enroll.jpg',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
};

export default function EnrollPage() {
  return <div>Enrollment form</div>;
}
```

---

## Verification Commands

### Check Canonical URLs

```bash
# Count pages with canonical
find app -name "page.tsx" | xargs grep -l "canonical" | wc -l

# List pages without canonical
find app -name "page.tsx" | xargs grep -L "canonical"
```

### Check Meta Descriptions

```bash
# Count pages with description
find app -name "page.tsx" | xargs grep -l "description:" | wc -l

# List pages without description
find app -name "page.tsx" | xargs grep -L "description:"
```

### Check OpenGraph Tags

```bash
# Count pages with OpenGraph
find app -name "page.tsx" | xargs grep -l "openGraph" | wc -l

# List pages without OpenGraph
find app -name "page.tsx" | xargs grep -L "openGraph"
```

---

## Action Plan

### Week 1: Critical Fixes

- [ ] Add canonical URLs to all 219 missing pages
- [ ] Add meta descriptions to high-priority public pages (10 pages)
- [ ] Create SEO metadata helper function

### Week 2: Public Pages

- [ ] Add meta descriptions to remaining public pages
- [ ] Add OpenGraph tags to top 20 public pages
- [ ] Create default OG images

### Week 3: Internal Pages

- [ ] Add canonical URLs verification
- [ ] Add meta descriptions to internal tools
- [ ] Add OpenGraph tags to remaining public pages

### Week 4: Polish

- [ ] Add Twitter Card tags to all public pages
- [ ] Verify all SEO tags in production
- [ ] Submit updated sitemap to Google

---

## Summary

### Current State

| Component | Status | Coverage |
|-----------|--------|----------|
| Canonical URLs | ⚠️ Incomplete | 72% (563/782) |
| Meta Descriptions | ⚠️ Incomplete | 75% (590/782) |
| OpenGraph Tags | ❌ Critical | 1.5% (12/782) |
| Twitter Cards | ❌ Unknown | ~1.5% (estimated) |

### Target State

| Component | Target | Timeline |
|-----------|--------|----------|
| Canonical URLs | 100% | 1 week |
| Meta Descriptions | 100% | 2 weeks |
| OpenGraph Tags | 100% (public) | 3 weeks |
| Twitter Cards | 100% (public) | 4 weeks |

### Estimated Effort

**Total Time:** 18-25 hours  
**Priority:** High  
**Impact:** Significant SEO improvement

---

**Audit Performed:** 2026-01-05 17:27 UTC  
**Performed By:** Ona  
**Next Review:** After fixes implemented
