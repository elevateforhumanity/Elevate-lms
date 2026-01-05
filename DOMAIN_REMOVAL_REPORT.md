# Domain Removal Report

**Date:** 2026-01-05  
**Action:** Globally unlinked domains from Vercel project  
**Status:** ✅ COMPLETE

---

## Domains Removed from Vercel

### 1. elevateforhumanity.org (Apex)
- **Status:** ✅ Removed
- **Previous Config:** Redirect to www (308)
- **Action:** Deleted from project

### 2. www.elevateforhumanity.org (Primary)
- **Status:** ✅ Removed
- **Previous Config:** Served production site
- **Action:** Deleted from project

---

## Current Vercel Project Status

**Project:** elevate-lms  
**Project ID:** prj_seueFKbZmDqBeYU5bX38zeJvS635

**Domains Configured:** 0 (all removed)

```json
{
  "domains": [],
  "pagination": {
    "count": 0
  }
}
```

**Vercel Subdomains (automatic):**
- `elevate-lms-selfish2.vercel.app` (still active)
- `elevate-lms-git-main-selfish2.vercel.app` (still active)

---

## Google Indexing Status

### Current Status
- **Site Indexed:** Yes (appears in Google search)
- **Sitemap Accessible:** No (404 - domain unlinked)
- **Indexed Pages:** Unknown (need Search Console access)

### What Google Currently Has

**Likely Indexed:**
- Homepage: elevateforhumanity.org or www.elevateforhumanity.org
- About page
- Programs pages
- Other public pages from sitemap

**Search Query:**
```
site:elevateforhumanity.org
```
Result: Site appears in Google search results

---

## DNS Status

### Current DNS Configuration

The domains `elevateforhumanity.org` and `www.elevateforhumanity.org` likely still have DNS records pointing to Vercel:

**Typical Vercel DNS:**
- **A Record:** Points to Vercel IP (76.76.21.21 or similar)
- **CNAME Record:** Points to cname.vercel-dns.com

**What Happens Now:**
- DNS still points to Vercel
- Vercel has no project configured for these domains
- Visitors will see Vercel's "Domain Not Found" page

---

## What You Need to Do

### 1. Update DNS Records

**Option A: Point to New Hosting**
If you have new hosting:
1. Go to your DNS provider (Namecheap, GoDaddy, Cloudflare, etc.)
2. Update A records to point to new server IP
3. Update CNAME records if needed
4. Wait for DNS propagation (24-48 hours)

**Option B: Remove DNS Records**
If you want to take the site offline:
1. Go to your DNS provider
2. Delete A records for @ and www
3. Delete CNAME records
4. Domain will be unreachable

**Option C: Point to Different Vercel Project**
If you want to use a different Vercel project:
1. Add domains to the new project
2. Vercel will automatically update DNS
3. No manual DNS changes needed

### 2. Remove from Google Search Console

**Steps:**
1. Go to: https://search.google.com/search-console
2. Select property: elevateforhumanity.org
3. Go to Settings
4. Click "Remove property"
5. Confirm removal

**Note:** This removes the property from Search Console but doesn't remove pages from Google search results.

### 3. Request URL Removal from Google

**To remove pages from Google search:**

1. Go to: https://search.google.com/search-console
2. Select property (before removing it)
3. Go to "Removals" section
4. Click "New Request"
5. Enter URL patterns:
   - `elevateforhumanity.org/*`
   - `www.elevateforhumanity.org/*`
6. Select "Remove all URLs with this prefix"
7. Submit request

**Timeline:** 24-48 hours for removal

### 4. Update Sitemap

**Current Status:** Sitemap returns 404 (domain unlinked)

**If you want to keep sitemap:**
- Add domains back to Vercel project, OR
- Host sitemap on new server

**If you want to remove sitemap:**
- No action needed (already inaccessible)

---

## Verification

### Check Domain Status

```bash
# Check if domain resolves
nslookup elevateforhumanity.org

# Check what's being served
curl -I https://www.elevateforhumanity.org/

# Check Google indexing
# Visit: https://www.google.com/search?q=site:elevateforhumanity.org
```

### Expected Results After DNS Update

**Before DNS propagation:**
- Domain may show Vercel "Domain Not Found" page
- Or may still show old cached content

**After DNS propagation:**
- Domain points to new hosting (if configured)
- Or domain is unreachable (if DNS removed)

---

## Rollback Instructions

### To Re-add Domains to Vercel

**1. Add www subdomain:**
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"www.elevateforhumanity.org"}' \
  "https://api.vercel.com/v10/projects/elevate-lms/domains"
```

**2. Add apex with redirect:**
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"elevateforhumanity.org","redirect":"www.elevateforhumanity.org","redirectStatusCode":308}' \
  "https://api.vercel.com/v10/projects/elevate-lms/domains"
```

**3. Wait for DNS propagation:** 5-10 minutes

---

## Impact Assessment

### Immediate Impact
- ✅ Domains removed from Vercel project
- ⚠️ Site may show "Domain Not Found" if DNS still points to Vercel
- ⚠️ Sitemap returns 404
- ⚠️ Google may still show old pages in search results

### Short-term Impact (24-48 hours)
- DNS changes propagate (if you update DNS)
- Google may start showing errors for indexed pages
- Search rankings may be affected

### Long-term Impact (1-4 weeks)
- Google removes pages from index (if removal requested)
- Search rankings lost (if not redirected to new site)
- Domain authority reset

---

## Recommendations

### If Moving to New Hosting
1. ✅ Set up new hosting first
2. ✅ Deploy site to new hosting
3. ✅ Test new hosting works
4. ✅ Update DNS to point to new hosting
5. ✅ Set up 301 redirects if URLs change
6. ✅ Submit new sitemap to Google

### If Taking Site Offline
1. ✅ Request removal from Google Search Console
2. ✅ Remove DNS records
3. ✅ Keep domain registration active (if you want to keep the domain)

### If This Was a Mistake
1. ✅ Re-add domains to Vercel (see rollback instructions)
2. ✅ Wait for DNS propagation
3. ✅ Verify site is accessible
4. ✅ Check Google Search Console for errors

---

## Next Steps

**Choose your path:**

### Path 1: Move to New Hosting
- [ ] Set up new hosting
- [ ] Deploy site
- [ ] Update DNS
- [ ] Test thoroughly
- [ ] Submit new sitemap

### Path 2: Take Site Offline
- [ ] Request Google removal
- [ ] Remove DNS records
- [ ] Keep domain registered

### Path 3: Rollback (Re-add to Vercel)
- [ ] Run rollback commands
- [ ] Wait for DNS propagation
- [ ] Verify site works
- [ ] Monitor Search Console

---

## Support Resources

**Vercel Documentation:**
- Domains: https://vercel.com/docs/concepts/projects/domains
- DNS: https://vercel.com/docs/concepts/projects/custom-domains

**Google Search Console:**
- URL Removal: https://support.google.com/webmasters/answer/9689846
- Property Removal: https://support.google.com/webmasters/answer/9689846

**DNS Providers:**
- Namecheap: https://www.namecheap.com/support/knowledgebase/
- GoDaddy: https://www.godaddy.com/help
- Cloudflare: https://developers.cloudflare.com/dns/

---

## Summary

**Completed:**
- ✅ Removed elevateforhumanity.org from Vercel
- ✅ Removed www.elevateforhumanity.org from Vercel
- ✅ Verified no domains configured on project
- ✅ Documented current status

**Your Action Required:**
1. **Update DNS** (point to new hosting or remove)
2. **Request Google removal** (if you want pages removed from search)
3. **Update Search Console** (remove property or update sitemap)

**Current Status:**
- Domains unlinked from Vercel ✅
- DNS likely still points to Vercel ⚠️
- Google still has pages indexed ⚠️
- Sitemap inaccessible ⚠️

---

**Report Generated:** 2026-01-05 17:01 UTC  
**Action Performed By:** Ona  
**Status:** Domains successfully removed from Vercel project
