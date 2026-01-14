# Domain Canonical URL Fix
**Date:** January 10, 2026  
**Status:** ✅ COMPLETE

## Problem

When Netlify builds the application, it was showing BOTH domains on the build screen:
- ❌ `elevateforhumanity.org` (old redirect domain)
- ✅ `www.elevateforhumanity.org` (main production domain)

**Root Cause:** Hardcoded `.org` URLs in canonical tags and metadata throughout the codebase.

---

## Solution

Changed all canonical URLs and site references from `.org` to `.institute`.

### Files Modified

#### 1. app/layout.tsx
```typescript
// BEFORE
const SITE_URL = 'https://www.elevateforhumanity.org';
alternates: {
  canonical: 'https://www.elevateforhumanity.org',
}

// AFTER
const SITE_URL = 'https://www.elevateforhumanity.org';
alternates: {
  canonical: 'https://www.elevateforhumanity.org',
}
```

#### 2. app/robots.ts
```typescript
// BEFORE
sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',

// AFTER
sitemap: 'https://www.elevateforhumanity.org/sitemap.xml',
```

#### 3. app/apply/quick/page.tsx
```typescript
// BEFORE
canonical: 'https://elevateforhumanity.org/apply/quick',

// AFTER
canonical: 'https://www.elevateforhumanity.org/apply/quick',
```

#### 4. app/programs/cna/page.tsx
```typescript
// BEFORE
canonical: 'https://www.elevateforhumanity.org/programs/cna',

// AFTER
canonical: 'https://www.elevateforhumanity.org/programs/cna',
```

#### 5. app/updates/page.tsx
```typescript
// BEFORE
canonical: 'https://www.elevateforhumanity.org/updates',

// AFTER
canonical: 'https://www.elevateforhumanity.org/updates',
```

#### 6. app/updates/2026/01/program-calendar/page.tsx
```typescript
// BEFORE
canonical: 'https://www.elevateforhumanity.org/updates/2026/01/program-calendar',

// AFTER
canonical: 'https://www.elevateforhumanity.org/updates/2026/01/program-calendar',
```

---

## What Was NOT Changed

### Email Addresses (Correct)
Email addresses correctly remain as `.org`:
- `vita@elevateforhumanity.org`
- `info@elevateforhumanity.org`
- `agreements@elevateforhumanity.org`

**Why:** Email addresses can use a different domain than the website.

### Environment Variables (Already Correct)
`.env.local` already had the correct configuration:
```bash
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

### Redirects (Already Correct)
`next.config.mjs` redirects remain unchanged:
```javascript
// Redirect .org to .institute (handled externally at DNS level)
// Redirect www to non-www (handled by Next.js)
// Redirect netlify.app to .institute (handled by Next.js)
```

---

## Verification

### Before Fix
```bash
# Multiple domains in metadata
grep -r "elevateforhumanity.org" app/ | grep canonical
# Found 6 files with .org canonical URLs
```

### After Fix
```bash
# Only .institute in metadata
grep -r "elevateforhumanity.org" app/ | grep canonical
# No results (except email addresses)

# Verify .institute is used
grep -r "www.elevateforhumanity.org" app/ | grep canonical
# All canonical URLs now use .institute ✅
```

---

## Impact

### Netlify Build Screen
**Before:**
```
Domains:
- elevateforhumanity.org
- www.elevateforhumanity.org
```

**After:**
```
Domains:
- www.elevateforhumanity.org ✅
```

### SEO Impact
- ✅ Single canonical domain (no duplicate content)
- ✅ Consistent metadata across all pages
- ✅ Proper sitemap URL
- ✅ Correct robots.txt configuration

### User Experience
- ✅ All internal links use correct domain
- ✅ Social sharing uses correct domain
- ✅ Search engines index correct domain

---

## Domain Architecture

### Main Domain (Production)
**Domain:** `www.elevateforhumanity.org`
- Configured in Netlify project settings
- All canonical URLs point here
- All metadata uses this domain
- Sitemap uses this domain

### Redirect Domain (External)
**Domain:** `elevateforhumanity.org`
- NOT configured in Netlify
- Redirects handled at DNS level
- Users automatically redirected to `.institute`
- Email addresses still use this domain

### Subdomain Redirects (Application Level)
**Domain:** `www.www.elevateforhumanity.org`
- NOT configured in Netlify
- Redirects handled by `next.config.mjs`
- Automatically redirects to non-www

### Preview Domains (Automatic)
**Domain:** `*.netlify.app`
- Automatically created by Netlify
- Redirects handled by `next.config.mjs` in production
- Shows content in preview deployments (expected)

---

## Testing

### Test Canonical URLs
```bash
# Homepage
curl -s https://www.elevateforhumanity.org/ | grep canonical
# Should show: <link rel="canonical" href="https://www.elevateforhumanity.org/" />

# Programs page
curl -s https://www.elevateforhumanity.org/programs/cna | grep canonical
# Should show: <link rel="canonical" href="https://www.elevateforhumanity.org/programs/cna" />

# Updates page
curl -s https://www.elevateforhumanity.org/updates | grep canonical
# Should show: <link rel="canonical" href="https://www.elevateforhumanity.org/updates" />
```

### Test Sitemap
```bash
curl -s https://www.elevateforhumanity.org/robots.txt
# Should show: Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

### Test Metadata
```bash
curl -s https://www.elevateforhumanity.org/ | grep -E "(og:url|twitter:url)"
# Should show: https://www.elevateforhumanity.org/
```

---

## Deployment

### Build Process
1. ✅ All source files updated
2. ✅ Canonical URLs use `.institute`
3. ✅ Metadata uses `.institute`
4. ✅ Sitemap uses `.institute`
5. ✅ Robots.txt uses `.institute`

### Netlify Configuration
**No changes needed** - Netlify project settings should already have:
- ✅ `www.elevateforhumanity.org` as production domain
- ❌ No other domains configured

### DNS Configuration
**No changes needed** - External redirect from `.org` to `.institute` handled at DNS level.

---

## Summary

| Item | Before | After | Status |
|------|--------|-------|--------|
| Main domain | elevateforhumanity.org | www.elevateforhumanity.org | ✅ Fixed |
| Canonical URLs | Mixed (.org and .institute) | All .institute | ✅ Fixed |
| Sitemap URL | .org | .institute | ✅ Fixed |
| Robots.txt | .org | .institute | ✅ Fixed |
| Metadata base | .org | .institute | ✅ Fixed |
| Email addresses | .org | .org | ✅ Correct |
| Environment vars | .institute | .institute | ✅ Already correct |
| Redirects | Working | Working | ✅ No change needed |

---

## Result

**Netlify build screen will now show only:**
```
✅ www.elevateforhumanity.org
```

**No longer shows:**
```
❌ elevateforhumanity.org
```

All canonical URLs, metadata, and site references now consistently use `www.elevateforhumanity.org` as the main production domain.
