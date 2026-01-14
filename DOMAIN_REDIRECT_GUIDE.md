# Domain Redirect Setup Guide
## elevateforhumanity.org → www.elevateforhumanity.org

**Date:** 2026-01-08  
**Canonical Domain:** www.elevateforhumanity.org  
**Redirect Domain:** elevateforhumanity.org

---

## CURRENT STATUS

### ✅ What's Configured

**Netlify Project Domains:**
```
1. www.elevateforhumanity.org (verified)
2. www.www.elevateforhumanity.org (verified)
```

**DNS Status:**
```
elevateforhumanity.org
  Nameservers: ns1.systemdns.com, hostmaster.systemdns.com
  A Records: None configured
  Status: Domain exists but not pointing anywhere
```

---

## GOAL

**Redirect all traffic from `.org` to `.institute` while preserving:**
- ✅ Full path (e.g., `/programs/cna`)
- ✅ Query strings (e.g., `?test=1`)
- ✅ SEO value (301/308 permanent redirect)
- ✅ Supabase auth flows

---

## STEP-BY-STEP IMPLEMENTATION

### Step 1: Add .org Domain to Netlify

**Platform:** Netlify  
**Method:** Netlify Dashboard (recommended) or CLI

#### Option A: Netlify Dashboard (Easiest)

1. **Go to Netlify Dashboard:**
   - URL: https://netlify.com/selfish2/elevate-lms/settings/domains

2. **Add Domain:**
   - Click "Add Domain"
   - Enter: `elevateforhumanity.org`
   - Click "Add"

3. **Configure as Redirect:**
   - After adding, click on `elevateforhumanity.org`
   - Select "Redirect to another domain"
   - Enter: `www.elevateforhumanity.org`
   - Select: "Permanent (308)" or "Permanent (301)"
   - Check: "Redirect with path" ✅
   - Save

4. **Add www subdomain:**
   - Click "Add Domain"
   - Enter: `www.elevateforhumanity.org`
   - Configure as redirect to: `www.elevateforhumanity.org`
   - Save

#### Option B: Netlify CLI

```bash
# Add domain
netlify domains add elevateforhumanity.org --token [TOKEN]

# Configure redirect (via API)
curl -X PATCH \
  "https://api.netlify.com/v9/projects/prj_DldrYpOpBvfo8w5XfCnchB7BSndk/domains/elevateforhumanity.org" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "redirect": "www.elevateforhumanity.org",
    "redirectStatusCode": 308
  }'

# Add www subdomain
netlify domains add www.elevateforhumanity.org --token [TOKEN]

# Configure www redirect
curl -X PATCH \
  "https://api.netlify.com/v9/projects/prj_DldrYpOpBvfo8w5XfCnchB7BSndk/domains/www.elevateforhumanity.org" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "redirect": "www.elevateforhumanity.org",
    "redirectStatusCode": 308
  }'
```

---

### Step 2: Update DNS Records

**Where:** Your DNS provider (systemdns.com)

Netlify will provide you with DNS records to add. Typically:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.netlify-dns.com
```

**Or use Netlify nameservers (recommended):**
```
ns1.netlify-dns.com
ns2.netlify-dns.com
```

---

### Step 3: Verify Redirect

**Test these URLs after DNS propagation (5-30 minutes):**

```bash
# Test 1: Root domain
curl -I https://elevateforhumanity.org/

# Expected:
# HTTP/2 308 Permanent Redirect
# location: https://www.elevateforhumanity.org/

# Test 2: Deep link with path
curl -I https://elevateforhumanity.org/programs/cna

# Expected:
# HTTP/2 308 Permanent Redirect
# location: https://www.elevateforhumanity.org/programs/cna

# Test 3: Path with query string
curl -I https://elevateforhumanity.org/programs/cna?test=1&foo=bar

# Expected:
# HTTP/2 308 Permanent Redirect
# location: https://www.elevateforhumanity.org/programs/cna?test=1&foo=bar

# Test 4: WWW subdomain
curl -I https://www.elevateforhumanity.org/

# Expected:
# HTTP/2 308 Permanent Redirect
# location: https://www.elevateforhumanity.org/
```

---

### Step 4: Update Supabase Auth Configuration

**Critical:** Supabase auth will break if redirect URLs aren't updated.

#### A. Update Site URL

1. **Go to Supabase Dashboard:**
   - Project: Your project
   - Settings → Authentication → URL Configuration

2. **Update Site URL:**
   ```
   Old: https://elevateforhumanity.org
   New: https://www.elevateforhumanity.org
   ```

#### B. Update Redirect URLs

**Add these to "Redirect URLs" (whitelist):**
```
https://www.elevateforhumanity.org/**
https://www.elevateforhumanity.org/auth/callback
https://www.elevateforhumanity.org/auth/confirm
https://www.elevateforhumanity.org/login
```

**Keep these temporarily (for transition):**
```
https://elevateforhumanity.org/**
https://elevateforhumanity.org/auth/callback
```

**Remove .org URLs after 30 days** (once all users have migrated)

#### C. Update Environment Variables

Check these files for hardcoded URLs:
```bash
# Search for .org references
grep -r "elevateforhumanity.org" .env* app/ components/ lib/

# Update to .institute
```

Common places:
- `.env.local`
- `.env.production`
- `app/layout.tsx` (metadata)
- `next.config.js` (redirects)
- Supabase client configuration

---

### Step 5: SEO Migration

#### A. Google Search Console

1. **Add new property:**
   - Go to: https://search.google.com/search-console
   - Add property: `www.elevateforhumanity.org`
   - Verify ownership

2. **Change of Address:**
   - In old property (`.org`), go to Settings
   - Click "Change of Address"
   - Select new property (`.institute`)
   - Submit

**Google's requirements:**
- ✅ 301/308 redirects in place
- ✅ New property verified
- ✅ Redirects preserve paths

#### B. Update Canonical Tags

Verify all pages have correct canonical:

```tsx
// app/page.tsx and other pages
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org', // ✅ Correct
  },
};
```

#### C. Update Sitemap

```tsx
// app/sitemap.ts
const baseUrl = 'https://www.elevateforhumanity.org'; // ✅ Correct
```

#### D. Update robots.txt

```tsx
// app/robots.ts
const baseUrl = 'https://www.elevateforhumanity.org'; // ✅ Correct
```

---

### Step 6: Update Social Media & External Links

**Update these platforms:**
- ✅ Facebook Page
- ✅ LinkedIn Company Page
- ✅ Instagram Bio
- ✅ YouTube Channel
- ✅ Google Business Profile
- ✅ Email signatures
- ✅ Marketing materials
- ✅ Partner websites

---

## TESTING CHECKLIST

### After DNS Propagation

- [ ] `https://elevateforhumanity.org/` → 308 → `.institute`
- [ ] `https://www.elevateforhumanity.org/` → 308 → `.institute`
- [ ] `https://elevateforhumanity.org/programs` → 308 → `.institute/programs`
- [ ] `https://elevateforhumanity.org/apply?ref=google` → 308 → `.institute/apply?ref=google`
- [ ] Supabase login works on `.institute`
- [ ] Supabase OAuth callback works
- [ ] No redirect loops
- [ ] SSL certificates valid on both domains
- [ ] Google Search Console verified
- [ ] Sitemap accessible at `.institute/sitemap.xml`
- [ ] Robots.txt correct at `.institute/robots.txt`

---

## COMMON ISSUES & SOLUTIONS

### Issue 1: Redirect Loop

**Symptom:** Browser shows "Too many redirects"

**Causes:**
- Conflicting redirects in multiple places
- WWW and apex redirecting to each other
- App-level redirect conflicts with platform redirect

**Solution:**
- Use ONLY platform-level redirect (Netlify Domains)
- Remove any app-level redirects for domain changes
- Ensure www → apex → canonical flow is clear

---

### Issue 2: Supabase Auth Fails

**Symptom:** "Invalid redirect URL" or "Unauthorized"

**Causes:**
- Redirect URLs not whitelisted in Supabase
- Site URL not updated
- Cookie domain mismatch

**Solution:**
- Add `.institute` to Supabase Redirect URLs
- Update Site URL to `.institute`
- Clear cookies and test in incognito

---

### Issue 3: Users Logged Out

**Symptom:** All users appear logged out after domain change

**Cause:** Cookies are domain-scoped

**Solution:**
- This is expected behavior
- Users will need to log in again
- Consider showing a banner: "We've moved to a new domain. Please log in again."

---

### Issue 4: SEO Drop

**Symptom:** Traffic drops after domain change

**Causes:**
- Redirects not permanent (using 302 instead of 301/308)
- Google hasn't processed Change of Address
- Canonical tags not updated

**Solution:**
- Verify 301/308 redirects (not 302)
- Submit Change of Address in Search Console
- Wait 2-4 weeks for Google to process
- Monitor Search Console for errors

---

## ROLLBACK PLAN

If something goes wrong:

### Quick Rollback (< 1 hour)

1. **Remove redirect in Netlify:**
   - Go to Domains settings
   - Click on `elevateforhumanity.org`
   - Change from "Redirect" to "Production"
   - Save

2. **Revert Supabase:**
   - Change Site URL back to `.org`
   - Keep both domains in Redirect URLs

3. **Revert environment variables:**
   ```bash
   git revert [commit-hash]
   git push
   ```

### Full Rollback (if needed)

1. Remove `.org` domain from Netlify
2. Keep `.institute` as production
3. Update DNS to point `.org` elsewhere
4. Revert all code changes

---

## TIMELINE

**Estimated Total Time:** 2-4 hours + DNS propagation

```
Step 1: Add domain to Netlify          → 5 minutes
Step 2: Update DNS records             → 5 minutes
        DNS propagation                → 5-30 minutes
Step 3: Verify redirects               → 10 minutes
Step 4: Update Supabase                → 15 minutes
Step 5: SEO migration                  → 30 minutes
Step 6: Update external links          → 1-2 hours
        Google processes change        → 2-4 weeks
```

---

## MONITORING

### Week 1: Watch for Issues

**Check daily:**
- Google Search Console errors
- Supabase auth error logs
- User login issues
- Traffic patterns in analytics

**Key metrics:**
- Redirect response time (<100ms)
- Auth success rate (>95%)
- Organic traffic (should stabilize after 2 weeks)

### Week 2-4: SEO Transition

**Monitor:**
- Google Search Console: Old property traffic declining
- Google Search Console: New property traffic increasing
- Indexed pages migrating from `.org` to `.institute`
- No 404 errors from old URLs

### After 30 Days: Cleanup

- [ ] Remove `.org` from Supabase Redirect URLs
- [ ] Remove temporary redirects in code
- [ ] Archive old Google Search Console property
- [ ] Update any remaining external links

---

## CURRENT CONFIGURATION

### Netlify Domains (Before Change)

```json
{
  "domains": [
    {
      "name": "www.elevateforhumanity.org",
      "verified": true,
      "redirect": null
    },
    {
      "name": "www.www.elevateforhumanity.org",
      "verified": true,
      "redirect": null
    }
  ]
}
```

### Target Configuration (After Change)

```json
{
  "domains": [
    {
      "name": "www.elevateforhumanity.org",
      "verified": true,
      "redirect": null
    },
    {
      "name": "www.www.elevateforhumanity.org",
      "verified": true,
      "redirect": null
    },
    {
      "name": "elevateforhumanity.org",
      "verified": true,
      "redirect": "www.elevateforhumanity.org",
      "redirectStatusCode": 308
    },
    {
      "name": "www.elevateforhumanity.org",
      "verified": true,
      "redirect": "www.elevateforhumanity.org",
      "redirectStatusCode": 308
    }
  ]
}
```

---

## NEXT STEPS

1. **Decide:** Do you want to proceed with this redirect?
2. **Verify:** Do you own `elevateforhumanity.org`?
3. **Access:** Do you have access to the DNS provider (systemdns.com)?
4. **Timing:** When do you want to implement this?

**If you're ready to proceed, I can:**
- Generate the exact Netlify CLI commands
- Provide the DNS records you need
- Create a Supabase configuration checklist
- Set up monitoring scripts

---

**Guide Created:** 2026-01-08  
**Status:** Ready to implement  
**Risk Level:** Low (reversible)  
**Estimated Downtime:** 0 (seamless transition)
