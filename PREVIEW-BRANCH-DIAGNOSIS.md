# Preview Branch Diagnosis - Google Indexing Issue

**Date:** 2026-01-05  
**Issue:** Google may be indexing preview branch instead of production

---

## Current Configuration

### Production Setup

**Production Branch:** `main`  
**Production Domains:**
- elevateforhumanity.org
- www.elevateforhumanity.org
- elevate-lms-selfish2.vercel.app (Vercel subdomain)
- elevate-lms-git-main-selfish2.vercel.app (Git branch subdomain)

**Status:** ✅ All pointing to main branch

### Preview Branches Found

1. `copilot/pull-code-with-no-errors`
2. `copilot/pull-lms-code-from-fix2`

**Status:** ⚠️ No active deployments found

---

## How to Identify Which URL Google is Indexing

### Method 1: Check Google Search Console

1. Go to: https://search.google.com/search-console
2. Select property: elevateforhumanity.org
3. Go to "Coverage" or "Pages" report
4. Look at indexed URLs
5. Check if any URLs contain:
   - `elevate-lms-git-[branch]`
   - Preview deployment hashes
   - Non-www or non-production domains

### Method 2: Google Search

Search: `site:elevateforhumanity.org`

Look for:
- Multiple versions of same page
- URLs with `.vercel.app` in results
- URLs with branch names in them

### Method 3: Check Indexed URL

Search: `site:elevate-lms-git-*.vercel.app`

If results appear, Google is indexing preview deployments.

---

## Common Causes

### 1. Preview Deployments Not Blocked

**Problem:** Vercel preview deployments are publicly accessible

**Preview URL patterns:**
```
elevate-[hash]-selfish2.vercel.app
elevate-lms-git-[branch]-selfish2.vercel.app
```

**Solution:** Add `X-Robots-Tag: noindex` to preview deployments

### 2. Old Preview URLs Still Indexed

**Problem:** Google indexed preview URLs before they were blocked

**Solution:** 
- Request removal in Google Search Console
- Wait for Google to recrawl and drop them

### 3. Canonical URLs Not Set

**Problem:** Preview deployments don't have canonical pointing to production

**Solution:** Ensure all pages have canonical URL to www.elevateforhumanity.org

### 4. Multiple Domains Indexed

**Problem:** Google indexing both www and non-www

**Solution:** 
- Set preferred domain in Search Console
- Ensure 301 redirect from non-www to www

---

## How to Fix

### Fix 1: Block Preview Deployments from Indexing

Add to `next.config.mjs`:

```javascript
async headers() {
  return [
    // Block preview deployments from search engines
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '(?!www\\.elevateforhumanity\\.org$).*',
        },
      ],
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow',
        },
      ],
    },
  ];
}
```

**This will:**
- Block all non-production domains from indexing
- Only allow www.elevateforhumanity.org to be indexed
- Prevent future preview deployments from being indexed

### Fix 2: Add Canonical URLs to All Pages

**Current status:** ✅ Already implemented

All pages have:
```typescript
alternates: {
  canonical: 'https://www.elevateforhumanity.org/[path]'
}
```

### Fix 3: Request Removal of Preview URLs

**In Google Search Console:**

1. Go to "Removals" section
2. Click "New Request"
3. Enter preview URL pattern:
   - `elevate-lms-git-*.vercel.app`
   - Individual preview URLs
4. Select "Remove all URLs with this prefix"
5. Submit request

**Timeline:** 24-48 hours for removal

### Fix 4: Set Preferred Domain

**In Google Search Console:**

1. Go to Settings
2. Set preferred domain: `www.elevateforhumanity.org`
3. Ensure non-www redirects to www (already configured)

---

## Verification Steps

### Step 1: Check Current Indexing

```bash
# Search for preview deployments
site:elevate-lms-git-*.vercel.app

# Search for non-www
site:elevateforhumanity.org -site:www.elevateforhumanity.org

# Check total indexed pages
site:www.elevateforhumanity.org
```

### Step 2: Check Headers on Preview

```bash
# Test preview deployment (if exists)
curl -I https://elevate-lms-git-main-selfish2.vercel.app/ | grep x-robots-tag

# Should show: X-Robots-Tag: noindex, nofollow
```

### Step 3: Check Production Headers

```bash
# Test production
curl -I https://www.elevateforhumanity.org/ | grep x-robots-tag

# Should show: X-Robots-Tag: noai, noimageai (NOT noindex)
```

---

## Current Status

### ✅ Correct Configuration

1. **Production branch:** main
2. **Production domains:** www.elevateforhumanity.org
3. **Canonical URLs:** All set to www subdomain
4. **Redirects:** Non-www → www configured

### ⚠️ Potential Issues

1. **Preview deployments:** May not be blocked from indexing
2. **Old preview URLs:** May still be in Google index
3. **Vercel subdomains:** May be indexed

### 🔍 Need to Check

1. **Google Search Console:** Which URLs are indexed?
2. **Preview deployments:** Are they accessible and indexed?
3. **Removal requests:** Have old URLs been removed?

---

## Recommended Actions

### Immediate (If Preview URLs are Indexed)

1. **Add noindex to preview deployments** (Fix 1 above)
2. **Request removal in Search Console** (Fix 3 above)
3. **Verify canonical URLs** (already done)

### Monitoring

1. **Weekly:** Check `site:elevateforhumanity.org` in Google
2. **Monthly:** Review indexed pages in Search Console
3. **After deployments:** Verify only production is indexed

---

## Prevention

### For Future Deployments

1. **Always use canonical URLs** ✅ Already doing
2. **Block preview deployments** ⚠️ Need to add
3. **Monitor Search Console** ⚠️ Need to set up alerts
4. **Use robots meta tag on preview** ⚠️ Need to add

### Vercel Settings

**In Vercel Dashboard:**

1. Go to Project Settings
2. Domains section
3. Ensure only production domains are listed
4. Remove any preview domains if listed

---

## Questions to Answer

1. **What URL does Google show in search results?**
   - www.elevateforhumanity.org ✅
   - elevateforhumanity.org (no www) ⚠️
   - elevate-lms-git-*.vercel.app ❌
   - elevate-*.vercel.app ❌

2. **How many pages does Google have indexed?**
   - Check: `site:www.elevateforhumanity.org`
   - Expected: ~45 pages (from sitemap)

3. **Are there duplicate pages indexed?**
   - Check: Search for specific page title
   - Should only show one result

4. **What does Search Console show?**
   - Coverage report
   - Indexed pages count
   - Excluded pages count

---

## Next Steps

**Please provide:**

1. Screenshot of Google Search Console "Pages" report
2. Result of: `site:www.elevateforhumanity.org` in Google
3. Result of: `site:elevate-lms-git-*.vercel.app` in Google
4. Any specific URLs Google is showing incorrectly

**Then I can:**
- Identify exact issue
- Apply specific fix
- Request removal of wrong URLs
- Verify fix is working

---

**Diagnosis performed by:** Ona  
**Status:** Awaiting user input to identify specific issue  
**Next:** Apply appropriate fix based on findings
