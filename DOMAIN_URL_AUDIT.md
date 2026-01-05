# Domain and URL Audit Report

**Date:** 2026-01-05  
**Domain:** www.elevateforhumanity.org  
**Project:** Elevate LMS

---

## Executive Summary

### Production Domain Configuration

**Primary Domain:** `www.elevateforhumanity.org`  
**Apex Domain:** `elevateforhumanity.org` (redirects to www)  
**Vercel Subdomain:** `elevate-lms-selfish2.vercel.app`  
**Git Branch Subdomain:** `elevate-lms-git-main-selfish2.vercel.app`

**Total Domains Assigned:** 4

---

## URL Statistics

### Total Routes in Application

| Category | Count | Description |
|----------|-------|-------------|
| **Total Routes** | 782 | All page.tsx/page.js files in app directory |
| **Public Routes** | 442 | Publicly accessible pages |
| **Protected Routes** | 340 | Admin, LMS, portals, dashboards |
| **Dynamic Routes** | 65 | Routes with parameters [id], [slug], etc. |
| **Static Routes** | 717 | Fixed URL paths |

### Routes by Type

#### Protected/Private Routes (340)
- Admin Portal: ~200 routes
- LMS (Student Portal): ~80 routes
- Staff Portal: ~20 routes
- Program Holder Portal: ~15 routes
- Workforce Board: ~10 routes
- Employer Portal: ~15 routes

#### Public Routes (442)
- Marketing Pages: ~50 routes
- Program Pages: ~100 routes
- Career Services: ~30 routes
- Tax Services: ~40 routes
- Blog/Content: ~50 routes
- Application/Forms: ~30 routes
- Verification/Certificates: ~20 routes
- Utility/API: ~122 routes

---

## Sitemap Analysis

### URLs in Production Sitemap

**Total URLs in sitemap.xml:** 45

**Breakdown:**
- Homepage: 1
- About Pages: 2
- Program Pages: 10
- Career Services: 5
- Funding Pages: 4
- Video Pages: 8
- Legal/Policy: 3
- Other Public: 12

### Sitemap URLs

```
https://www.elevateforhumanity.org
https://www.elevateforhumanity.org/about
https://www.elevateforhumanity.org/about/team
https://www.elevateforhumanity.org/programs
https://www.elevateforhumanity.org/apprenticeships
https://www.elevateforhumanity.org/services
https://www.elevateforhumanity.org/credentials
https://www.elevateforhumanity.org/apply
https://www.elevateforhumanity.org/contact
https://www.elevateforhumanity.org/blog
https://www.elevateforhumanity.org/employer
https://www.elevateforhumanity.org/rise-foundation
https://www.elevateforhumanity.org/supersonic-fast-cash
https://www.elevateforhumanity.org/privacy-policy
https://www.elevateforhumanity.org/terms-of-service
https://www.elevateforhumanity.org/accessibility
https://www.elevateforhumanity.org/careers
https://www.elevateforhumanity.org/programs/cna
https://www.elevateforhumanity.org/programs/cdl-transportation
https://www.elevateforhumanity.org/programs/barber-apprenticeship
https://www.elevateforhumanity.org/programs/tax-preparation
https://www.elevateforhumanity.org/programs/direct-support-professional
https://www.elevateforhumanity.org/programs/drug-collector
https://www.elevateforhumanity.org/programs/healthcare
https://www.elevateforhumanity.org/programs/skilled-trades
https://www.elevateforhumanity.org/programs/technology
https://www.elevateforhumanity.org/programs/business
https://www.elevateforhumanity.org/career-services
https://www.elevateforhumanity.org/career-services/job-placement
https://www.elevateforhumanity.org/career-services/resume-building
https://www.elevateforhumanity.org/career-services/interview-prep
https://www.elevateforhumanity.org/career-services/career-counseling
https://www.elevateforhumanity.org/funding
https://www.elevateforhumanity.org/funding/wioa
https://www.elevateforhumanity.org/funding/wrg
https://www.elevateforhumanity.org/funding/jri
https://www.elevateforhumanity.org/videos
https://www.elevateforhumanity.org/videos/hero-home
https://www.elevateforhumanity.org/videos/cna-hero
https://www.elevateforhumanity.org/videos/barber-hero
https://www.elevateforhumanity.org/videos/cdl-hero
https://www.elevateforhumanity.org/videos/hvac-hero
https://www.elevateforhumanity.org/videos/programs-overview
https://www.elevateforhumanity.org/videos/training-providers
https://www.elevateforhumanity.org/videos/getting-started
```

---

## Domain Configuration Details

### 1. Primary Production Domain

**Domain:** `www.elevateforhumanity.org`

**Status:** ✅ Active  
**SSL:** ✅ Enabled  
**Redirect:** None (primary domain)  
**Indexing:** ✅ Allowed  
**Purpose:** Main production site

**DNS Configuration:**
- Type: CNAME
- Points to: Vercel edge network
- TTL: Auto

### 2. Apex Domain

**Domain:** `elevateforhumanity.org`

**Status:** ✅ Active  
**SSL:** ✅ Enabled  
**Redirect:** → `www.elevateforhumanity.org`  
**Indexing:** ⚠️ Should redirect before indexing  
**Purpose:** Redirect to www subdomain

**Current Behavior:**
```
http://elevateforhumanity.org
  → 308 to https://elevateforhumanity.org (HTTPS upgrade)
  → 301 to https://www.elevateforhumanity.org (www redirect)
```

**Issue:** Two-step redirect (should be one step)

**Recommended:**
```
http://elevateforhumanity.org
  → 308 to https://www.elevateforhumanity.org (direct)
```

### 3. Vercel Subdomain

**Domain:** `elevate-lms-selfish2.vercel.app`

**Status:** ✅ Active  
**SSL:** ✅ Enabled  
**Redirect:** None  
**Indexing:** ❌ Should be blocked (now fixed)  
**Purpose:** Vercel default subdomain

**Recommendation:** Block from indexing (implemented in fix/block-preview-indexing)

### 4. Git Branch Subdomain

**Domain:** `elevate-lms-git-main-selfish2.vercel.app`

**Status:** ✅ Active  
**SSL:** ✅ Enabled  
**Redirect:** None  
**Indexing:** ❌ Should be blocked (now fixed)  
**Purpose:** Main branch deployment URL

**Recommendation:** Block from indexing (implemented in fix/block-preview-indexing)

---

## Route Categories

### Public Marketing Routes (50)

**Core Pages:**
- `/` - Homepage
- `/about` - About page
- `/about/team` - Team page
- `/contact` - Contact page
- `/careers` - Careers page
- `/blog` - Blog listing
- `/services` - Services overview
- `/credentials` - Credentials page
- `/accreditation` - Accreditation info
- `/accessibility` - Accessibility statement

**Application Pages:**
- `/apply` - Main application
- `/apply/student` - Student application
- `/apply/employer` - Employer application
- `/apply/staff` - Staff application
- `/apply/program-holder` - Program holder application
- `/apply/success` - Application success
- `/apply/track` - Track application

**Legal Pages:**
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/academic-integrity` - Academic integrity

### Program Routes (100+)

**Main Program Pages:**
- `/programs` - Program catalog
- `/programs/cna` - CNA program
- `/programs/cdl-transportation` - CDL program
- `/programs/barber-apprenticeship` - Barber program
- `/programs/tax-preparation` - Tax prep program
- `/programs/direct-support-professional` - DSP program
- `/programs/drug-collector` - Drug collector program
- `/programs/healthcare` - Healthcare programs
- `/programs/skilled-trades` - Skilled trades
- `/programs/technology` - Technology programs
- `/programs/business` - Business programs

**Apprenticeships:**
- `/apprenticeships` - Apprenticeship overview
- `/apprenticeships/ipla-exam` - IPLA exam info

### Career Services Routes (30)

**Main Pages:**
- `/career-services` - Career services overview
- `/career-services/job-placement` - Job placement
- `/career-services/resume-building` - Resume help
- `/career-services/interview-prep` - Interview prep
- `/career-services/career-counseling` - Career counseling

### Funding Routes (40)

**Main Pages:**
- `/funding` - Funding overview
- `/funding/wioa` - WIOA funding
- `/funding/wrg` - WRG funding
- `/funding/jri` - JRI funding

**Tax Services:**
- `/tax` - Tax services overview
- `/tax/free-filing` - Free tax filing
- `/tax/vita` - VITA program
- `/tax/appointment` - Tax appointment

### Video Routes (8)

**Video Pages:**
- `/videos` - Video gallery
- `/videos/hero-home` - Homepage hero video
- `/videos/cna-hero` - CNA hero video
- `/videos/barber-hero` - Barber hero video
- `/videos/cdl-hero` - CDL hero video
- `/videos/hvac-hero` - HVAC hero video
- `/videos/programs-overview` - Programs overview
- `/videos/training-providers` - Training providers
- `/videos/getting-started` - Getting started

### Protected Routes (340)

#### Admin Portal (~200 routes)
- `/admin` - Admin dashboard
- `/admin/analytics` - Analytics
- `/admin/applicants` - Applicant management
- `/admin/courses` - Course management
- `/admin/employers` - Employer management
- `/admin/programs` - Program management
- `/admin/certificates` - Certificate management
- `/admin/compliance` - Compliance tools
- `/admin/crm` - CRM system
- `/admin/email-marketing` - Email campaigns
- And ~180 more admin routes...

#### LMS/Student Portal (~80 routes)
- `/lms` - Student dashboard
- `/lms/courses` - My courses
- `/lms/progress` - Progress tracking
- `/lms/certificates` - My certificates
- `/lms/profile` - Profile settings
- And ~75 more LMS routes...

#### Staff Portal (~20 routes)
- `/staff-portal` - Staff dashboard
- `/staff-portal/students` - Student management
- `/staff-portal/attendance` - Attendance tracking
- And ~17 more staff routes...

#### Program Holder Portal (~15 routes)
- `/program-holder` - Program holder dashboard
- `/program-holder/students` - Student roster
- `/program-holder/reports` - Reports
- And ~12 more program holder routes...

#### Employer Portal (~15 routes)
- `/employer` - Employer dashboard
- `/employer/applicants` - View applicants
- `/employer/jobs` - Job postings
- And ~12 more employer routes...

### Dynamic Routes (65)

**Blog Routes:**
- `/blog/[slug]` - Individual blog posts
- `/blog/author/[author]` - Author pages
- `/blog/category/[category]` - Category pages

**Certificate Routes:**
- `/certificates/[certificateId]` - View certificate
- `/certificates/verify/[certificateId]` - Verify certificate
- `/cert/verify/[certificateId]` - Verify certificate (alt)

**Course Routes:**
- `/courses/[courseId]` - Course detail
- `/courses/[courseId]/discussion` - Course discussion
- `/lms/courses/[courseId]` - LMS course view
- `/lms/courses/[courseId]/lessons/[lessonId]` - Lesson view

**Admin Dynamic Routes:**
- `/admin/applications/[id]` - Application detail
- `/admin/employers/[id]` - Employer detail
- `/admin/programs/[code]` - Program detail
- `/admin/learner/[id]` - Learner profile
- And ~50 more dynamic admin routes...

---

## Indexing Status

### Currently Indexed (Should Be)

**Production Domain:** `www.elevateforhumanity.org`
- ✅ 45 URLs in sitemap
- ✅ Public pages allowed
- ✅ Protected pages blocked via robots.txt

### Should NOT Be Indexed

**Vercel Subdomains:**
- ❌ `elevate-lms-selfish2.vercel.app` - Now blocked
- ❌ `elevate-lms-git-main-selfish2.vercel.app` - Now blocked
- ❌ Any preview deployment URLs - Now blocked

**Protected Routes:**
- ❌ `/admin/*` - Blocked via X-Robots-Tag
- ❌ `/lms/*` - Blocked via X-Robots-Tag
- ❌ `/staff-portal/*` - Blocked via X-Robots-Tag
- ❌ `/program-holder/*` - Blocked via X-Robots-Tag
- ❌ `/workforce-board/*` - Blocked via X-Robots-Tag

---

## Robots.txt Configuration

### Production robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /lms/admin/
Disallow: /staff-portal/
Disallow: /program-holder/dashboard/
Disallow: /employer/dashboard/
Disallow: /_not-found
Disallow: /_next/

Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

### Preview/Development robots.txt

```
User-agent: *
Disallow: /
```

---

## SEO Configuration

### Meta Robots Tags

**Production:**
```html
<meta name="robots" content="index, follow">
```

**Preview/Development:**
```html
<meta name="robots" content="noindex, nofollow">
```

### X-Robots-Tag Headers

**Production:**
```
X-Robots-Tag: noai, noimageai
```

**Preview/Development:**
```
X-Robots-Tag: noindex, nofollow, noarchive
```

**Protected Routes (All Environments):**
```
X-Robots-Tag: noindex, nofollow
```

---

## Recommendations

### 1. Sitemap Expansion

**Current:** 45 URLs in sitemap  
**Available:** 442 public routes  
**Gap:** 397 public URLs not in sitemap

**Recommendation:** Add more public URLs to sitemap:
- All program pages
- All career service pages
- All funding pages
- All tax service pages
- Blog posts (if any)
- Public course pages
- Certificate verification pages

**Estimated Sitemap Size:** 150-200 URLs

### 2. Domain Redirect Optimization

**Issue:** Two-step redirect from apex to www

**Current:**
```
elevateforhumanity.org → https://elevateforhumanity.org → https://www.elevateforhumanity.org
```

**Recommended:**
```
elevateforhumanity.org → https://www.elevateforhumanity.org (direct)
```

**Fix:** Configure in Vercel dashboard under Domains

### 3. Vercel Subdomain Blocking

**Status:** ✅ Fixed in branch `fix/block-preview-indexing`

**Implementation:**
- Environment detection in headers
- Middleware blocking
- Host-based rules in vercel.json

### 4. Dynamic Route Indexing

**Current:** Dynamic routes not in sitemap

**Recommendation:** Add dynamic routes to sitemap:
- Blog posts: `/blog/[slug]`
- Certificates: `/certificates/verify/[certificateId]`
- Public courses: `/courses/[courseId]`

**Method:** Generate sitemap dynamically from database

---

## URL Structure Analysis

### Clean URL Structure ✅

**Good Practices:**
- No trailing slashes
- Lowercase URLs
- Hyphen-separated words
- Logical hierarchy
- RESTful patterns

**Examples:**
```
/programs/cna
/career-services/job-placement
/funding/wioa
/videos/hero-home
```

### Route Organization ✅

**Well-Organized:**
- `/programs/*` - All program pages
- `/career-services/*` - All career pages
- `/funding/*` - All funding pages
- `/admin/*` - All admin pages
- `/lms/*` - All student pages

---

## Performance Considerations

### Route Count Impact

**Total Routes:** 782
- **Build Time:** ~2-3 minutes
- **Bundle Size:** Optimized with code splitting
- **Memory Usage:** 4GB during build

**Optimization:**
- ✅ Dynamic imports used
- ✅ Code splitting enabled
- ✅ Static generation where possible
- ✅ ISR for dynamic content

---

## Security Analysis

### Protected Route Security ✅

**Methods:**
1. Authentication middleware
2. X-Robots-Tag headers
3. robots.txt disallow
4. Server-side auth checks

**Protected Paths:**
- `/admin/*` - Admin only
- `/lms/*` - Students only
- `/staff-portal/*` - Staff only
- `/program-holder/*` - Program holders only
- `/employer/*` - Employers only

---

## Summary

### Domain Assignment

| Domain | Status | Purpose | Indexing |
|--------|--------|---------|----------|
| www.elevateforhumanity.org | ✅ Active | Production | ✅ Allowed |
| elevateforhumanity.org | ✅ Active | Redirect to www | ⚠️ Redirect |
| elevate-lms-selfish2.vercel.app | ✅ Active | Vercel subdomain | ❌ Blocked |
| elevate-lms-git-main-selfish2.vercel.app | ✅ Active | Git branch | ❌ Blocked |

**Total Domains:** 4

### URL Assignment

| Category | Count | Indexing |
|----------|-------|----------|
| Total Routes | 782 | - |
| Public Routes | 442 | Selective |
| Protected Routes | 340 | Blocked |
| In Sitemap | 45 | Allowed |
| Dynamic Routes | 65 | Selective |

**URLs in Production Sitemap:** 45  
**Potential Indexable URLs:** 442  
**Currently Indexed:** ~45 (estimated)

---

## Action Items

### Immediate
- ✅ Block preview deployments (completed)
- ⚠️ Fix apex domain redirect (Vercel dashboard)

### Short-term
- [ ] Expand sitemap to 150-200 URLs
- [ ] Add dynamic routes to sitemap
- [ ] Monitor Google Search Console

### Long-term
- [ ] Implement dynamic sitemap generation
- [ ] Add blog post indexing
- [ ] Monitor crawl budget usage

---

**Report Generated:** 2026-01-05  
**Next Review:** 2026-02-05  
**Audit Performed By:** Ona
