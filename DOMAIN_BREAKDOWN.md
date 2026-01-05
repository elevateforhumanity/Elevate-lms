# Domain Breakdown - Line by Line

**Date:** 2026-01-05  
**Current Production Deployment:** `dpl_7MZBwQ3m8NpovSmgcHRvgbpD2e8z`

---

## Domains Attached to Project

### Domain 1: elevateforhumanity.org (Apex)

```json
{
  "name": "elevateforhumanity.org",
  "apexName": "elevateforhumanity.org",
  "projectId": "prj_seueFKbZmDqBeYU5bX38zeJvS635",
  "redirect": "www.elevateforhumanity.org",
  "redirectStatusCode": 308,
  "gitBranch": null,
  "customEnvironmentId": null,
  "updatedAt": 1767622423568,
  "createdAt": 1767552486625,
  "verified": true
}
```

**Analysis:**
- **Purpose:** Apex domain (no www)
- **Behavior:** Redirects to www.elevateforhumanity.org
- **Status Code:** 308 (Permanent Redirect)
- **Git Branch:** null (not tied to specific branch)
- **Environment:** null (production)
- **Verified:** ✅ Yes
- **Updated:** 2026-01-05 14:13:43 UTC (our fix!)

**What it does:**
- Catches traffic to `elevateforhumanity.org`
- Redirects to `www.elevateforhumanity.org`
- Single 308 redirect (optimized)

---

### Domain 2: www.elevateforhumanity.org (Primary)

```json
{
  "name": "www.elevateforhumanity.org",
  "apexName": "elevateforhumanity.org",
  "projectId": "prj_seueFKbZmDqBeYU5bX38zeJvS635",
  "redirect": null,
  "redirectStatusCode": null,
  "gitBranch": null,
  "customEnvironmentId": null,
  "updatedAt": 1767585394336,
  "createdAt": 1767552486432,
  "verified": true
}
```

**Analysis:**
- **Purpose:** Primary production domain
- **Behavior:** Serves production site (no redirect)
- **Status Code:** null (no redirect)
- **Git Branch:** null (not tied to specific branch)
- **Environment:** null (production)
- **Verified:** ✅ Yes
- **Updated:** 2026-01-05 05:29:54 UTC

**What it does:**
- Serves the actual production website
- Returns 200 OK
- Allows search engine indexing
- Primary domain for SEO

---

## Current Production Deployment

**Deployment ID:** `dpl_7MZBwQ3m8NpovSmgcHRvgbpD2e8z`

```
Commit: d49721e (our merge commit!)
Branch: main
State: READY
Type: LAMBDAS
Target: production
```

**Aliases (URLs pointing to this deployment):**
1. `www.elevateforhumanity.org` ← Primary production
2. `elevate-lms-selfish2.vercel.app` ← Vercel subdomain
3. `elevate-lms-git-main-selfish2.vercel.app` ← Git branch subdomain
4. `elevateforhumanity.org` ← Apex (redirects to #1)

**Deployment URL:**
- `elevate-ka8t552cg-selfish2.vercel.app` (unique deployment URL)

---

## Summary

### Total Domains: 2

1. **elevateforhumanity.org** (apex)
   - Redirects to www
   - 308 status code
   - Not tied to branch
   - Production environment

2. **www.elevateforhumanity.org** (primary)
   - Serves production site
   - No redirect
   - Not tied to branch
   - Production environment

### Total Aliases: 4

All pointing to deployment `dpl_7MZBwQ3m8NpovSmgcHRvgbpD2e8z`:

1. `www.elevateforhumanity.org` ← **Primary production**
2. `elevateforhumanity.org` ← Redirects to #1
3. `elevate-lms-selfish2.vercel.app` ← Vercel subdomain
4. `elevate-lms-git-main-selfish2.vercel.app` ← Git main branch

### Branch Assignments

**None!** ✅

- `elevateforhumanity.org` → `gitBranch: null`
- `www.elevateforhumanity.org` → `gitBranch: null`

Both domains are **NOT** tied to any specific branch. They serve whatever is deployed to production (main branch).

---

## What "Preview" Might Mean

If you're seeing "preview" somewhere, it could be:

### 1. Vercel Dashboard
- The deployment might show as "Preview" in the dashboard
- But it's actually assigned to production domains
- Check: Target should be "production"

### 2. Deployment URL
- The unique deployment URL contains a hash: `elevate-ka8t552cg-selfish2.vercel.app`
- This is normal - every deployment gets a unique URL
- The production domains point to this deployment

### 3. Git Branch Subdomain
- `elevate-lms-git-main-selfish2.vercel.app` might look like "preview"
- But it's actually the main branch subdomain
- It points to the same production deployment

### 4. Old Cached Content
- Your browser might be showing old content
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear browser cache

---

## Verification

### Check What's Live

```bash
# Check deployment ID in production
curl -s https://www.elevateforhumanity.org/ | grep -o "dpl_[a-zA-Z0-9]*" | head -1
# Result: dpl_7MZBwQ3m8NpovSmgcHRvgbpD2e8z ✅

# Check commit in deployment
# Result: d49721e (our merge commit!) ✅

# Check branch in deployment
# Result: main ✅

# Check target
# Result: production ✅
```

### All Checks Pass ✅

The production site is serving our latest deployment with all fixes.

---

## Where to Check

### Vercel Dashboard
1. Go to: https://vercel.com/selfish2/elevate-lms
2. Click "Deployments"
3. Look for deployment with commit `d49721e`
4. Should show "Production" badge
5. Should list all 4 aliases

### Production Site
1. Visit: https://www.elevateforhumanity.org
2. View page source (Ctrl+U)
3. Search for: `dpl_7MZBwQ3m8NpovSmgcHRvgbpD2e8z`
4. Should be present in HTML

### Domain Configuration
1. Go to: https://vercel.com/selfish2/elevate-lms/settings/domains
2. Should see:
   - `elevateforhumanity.org` → Redirects to www
   - `www.elevateforhumanity.org` → Production

---

## Conclusion

**Status:** ✅ **PRODUCTION IS LIVE**

- 2 domains configured
- 4 aliases pointing to production
- 0 domains tied to specific branches
- Latest deployment (d49721e) is serving production
- All fixes are live

If you're still seeing "preview" somewhere, please specify:
1. **Where** are you seeing it? (URL, page content, dashboard?)
2. **What exactly** does it say?
3. **Screenshot** if possible

This will help me identify the specific issue.
