# Single Project Domain Setup

## Current Status ✅

**Domain:** elevateforhumanity.org and www.elevateforhumanity.org  
**Status:** Both domains are currently pointing to a single Vercel project  
**Verification Date:** January 5, 2026

### Verified Configuration

1. **Primary Domain:** www.elevateforhumanity.org
   - Serving content correctly
   - Returns HTTP 200
   - Server header: `Vercel`
   - X-Vercel-ID present in headers

2. **Apex Domain:** elevateforhumanity.org
   - Redirects to www.elevateforhumanity.org (HTTP 308)
   - Redirect configured in vercel.json

3. **GitHub Repository:** 
   - https://github.com/elevateforhumanity/Elevate-lms.git
   - Connected to Vercel via GitHub integration

## Problem: Multiple Projects Pointing to Same Domain

If you have multiple Vercel projects pointing to the same domain, you'll see:
- Inconsistent deployments
- Duplicate content in Google Search Console
- Preview URLs (*.vercel.app) competing with production
- Canonical tag conflicts

## How to Verify Only One Project Points to Domain

### Option 1: Check Vercel Dashboard (Requires Login)

1. **Log into Vercel:** https://vercel.com/dashboard
2. **Search for domain:** Use search bar to find "elevateforhumanity.org"
3. **Check all projects:** Look for any project with this domain attached
4. **Expected result:** Only ONE project should show this domain

### Option 2: Check DNS Records (No Login Required)

```bash
# Check what the domain resolves to
curl -sI https://www.elevateforhumanity.org | grep -i "x-vercel-id"

# Check if apex redirects properly
curl -sI https://elevateforhumanity.org | grep -i "location"
```

**What to look for:**
- `x-vercel-id` should be consistent across requests
- If you see different IDs, multiple projects are serving the domain

## How to Remove Domain from Old Projects

### Step 1: Identify All Projects

1. Log into Vercel dashboard
2. Go to each project's Settings → Domains
3. Look for "elevateforhumanity.org" or "www.elevateforhumanity.org"

### Step 2: Remove Domain from Old Projects

For each OLD project (not the current one):

1. **Navigate to:** Project Settings → Domains
2. **Find domain:** elevateforhumanity.org or www.elevateforhumanity.org
3. **Click:** Three dots (⋮) next to domain
4. **Select:** "Remove Domain"
5. **Confirm:** Click "Remove"

### Step 3: Verify Only One Project Has Domain

After removing from old projects:

1. **Check current project:** Settings → Domains
2. **Should see:**
   - www.elevateforhumanity.org (Primary)
   - elevateforhumanity.org (Redirects to www)
3. **Should NOT see:** Domain listed in any other project

## How to Prevent Multiple Projects

### Best Practice: One Repository = One Production Project

```
✅ CORRECT:
Repository: elevateforhumanity/Elevate-lms
  └── Vercel Project: "elevate-lms" (Production)
      └── Domain: www.elevateforhumanity.org

❌ WRONG:
Repository: elevateforhumanity/Elevate-lms
  ├── Vercel Project: "elevate-lms" (Production)
  │   └── Domain: www.elevateforhumanity.org
  └── Vercel Project: "elevate-lms-old" (Old)
      └── Domain: www.elevateforhumanity.org  ← CONFLICT!
```

### Vercel Configuration (vercel.json)

Your current configuration is correct:

```json
{
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "elevateforhumanity.org"
        }
      ],
      "destination": "https://www.elevateforhumanity.org/:path*",
      "permanent": true
    }
  ]
}
```

This ensures:
- Only `main` branch deploys to production
- Apex domain redirects to www
- No preview branches deploy to production domain

## Common Issues and Solutions

### Issue 1: Preview URLs Indexed by Google

**Problem:** Google indexed old preview URLs like `elevate-lms-abc123.vercel.app`

**Solution:**
1. These are separate from production domain
2. They don't affect production domain configuration
3. Remove from Google Search Console (see GOOGLE-COMPLETE-RESET.md)

### Issue 2: Old Vercel Account Has Domain

**Problem:** Can't access old Vercel account that has domain attached

**Solution:**
1. **DNS Method:** Change DNS records to point away from old project
2. **Support Method:** Contact Vercel support to release domain
3. **Wait Method:** Domain will auto-release after 30 days of DNS change

See `BYPASS-OLD-ACCOUNT-SETUP.md` for detailed steps.

### Issue 3: Multiple Deployments Competing

**Problem:** Every push triggers multiple deployments

**Solution:**
1. Check GitHub repository settings
2. Look for multiple Vercel integrations
3. Remove old integrations: GitHub Settings → Applications → Vercel
4. Keep only ONE Vercel integration

## Verification Checklist

Use this checklist to confirm single project setup:

- [ ] Only ONE Vercel project shows domain in dashboard
- [ ] `curl -sI https://www.elevateforhumanity.org` returns consistent x-vercel-id
- [ ] Apex domain redirects to www (HTTP 308)
- [ ] No other projects have domain attached
- [ ] GitHub has only ONE Vercel integration
- [ ] vercel.json has `deploymentEnabled: { main: true }`
- [ ] Preview branches don't deploy to production domain

## Next Steps

After ensuring single project setup:

1. **Clean Google Search Console:**
   - Remove all old sitemaps
   - Submit fresh sitemap: https://www.elevateforhumanity.org/sitemap.xml
   - Request reindexing for key pages
   - See: `GOOGLE-COMPLETE-RESET.md`

2. **Monitor for 48 hours:**
   - Check x-vercel-id remains consistent
   - Verify no duplicate deployments
   - Confirm Google starts indexing correctly

3. **Remove old preview URLs from Google:**
   - Use URL Removal Tool in GSC
   - Remove all *.vercel.app URLs
   - See: `REMOVE-ALL-SITEMAPS-NOW.md`

## Support Resources

- **Vercel Domains:** https://vercel.com/docs/concepts/projects/domains
- **DNS Configuration:** https://vercel.com/docs/concepts/projects/domains/dns
- **GitHub Integration:** https://vercel.com/docs/concepts/git/vercel-for-github

## Summary

**Current Status:** ✅ Domain appears to be pointing to single project  
**Action Required:** Verify in Vercel dashboard that no other projects have domain attached  
**Time Required:** 5 minutes to check dashboard and remove from old projects  
**Risk Level:** Low - removing domain from old projects is safe and reversible
