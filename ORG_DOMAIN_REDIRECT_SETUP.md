# .org Domain Redirect Setup Guide
**Issue:** www.elevateforhumanity.org is cached and not redirecting  
**Date:** January 10, 2026  
**Status:** ⚠️ Requires DNS Configuration

---

## Current Status

### ✅ Application Configuration (Correct)
The application is **correctly configured** and does NOT reference `.org`:

**Environment Variables:**
```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

**Canonical URLs (app/layout.tsx):**
```typescript
const SITE_URL = 'https://www.elevateforhumanity.org';
```

**Sitemap (app/robots.ts):**
```typescript
sitemap: 'https://www.elevateforhumanity.org/sitemap.xml'
```

**Redirects (next.config.mjs):**
```javascript
// Only redirects for .institute domain
{
  source: '/:path*',
  has: [{ type: 'host', value: 'www.www.elevateforhumanity.org' }],
  destination: 'https://www.elevateforhumanity.org/:path*',
  permanent: true,
}
```

### ❌ Missing Configuration
**The `.org` domain is NOT configured in the application** - this is intentional.

The redirect from `.org` to `.institute` must be configured at the **DNS/domain registrar level**, not in the application.

---

## Why .org Doesn't Redirect

### Problem
`www.elevateforhumanity.org` is showing cached content instead of redirecting to `www.elevateforhumanity.org`

### Root Cause
The `.org` domain is not configured anywhere:
- ❌ Not in Vercel project domains
- ❌ Not in next.config.mjs redirects
- ❌ Not in application code
- ❌ Not in DNS records pointing to Vercel

**Result:** When users visit `.org`, they either see:
1. Cached old content (if DNS still points to old server)
2. DNS error (if DNS is not configured)
3. Nothing (if domain expired)

---

## Solution: Configure DNS Redirect

You need to configure the redirect at your **domain registrar** where `elevateforhumanity.org` is registered.

### Option 1: DNS-Level Redirect (Recommended)

#### If using Cloudflare:
1. Log into Cloudflare
2. Select `elevateforhumanity.org` domain
3. Go to **Rules** → **Page Rules**
4. Create new rule:
   ```
   URL: *elevateforhumanity.org/*
   Setting: Forwarding URL
   Status Code: 301 - Permanent Redirect
   Destination: https://www.elevateforhumanity.org/$1
   ```
5. Save and deploy

#### If using Namecheap:
1. Log into Namecheap
2. Go to Domain List → Manage `elevateforhumanity.org`
3. Go to **Advanced DNS**
4. Add **URL Redirect Record**:
   ```
   Type: URL Redirect
   Host: @
   Value: https://www.elevateforhumanity.org
   Redirect Type: Permanent (301)
   ```
5. Add another for www:
   ```
   Type: URL Redirect
   Host: www
   Value: https://www.elevateforhumanity.org
   Redirect Type: Permanent (301)
   ```

#### If using GoDaddy:
1. Log into GoDaddy
2. Go to My Products → Domains
3. Click on `elevateforhumanity.org`
4. Go to **Settings** → **Forwarding**
5. Set up forwarding:
   ```
   Forward to: https://www.elevateforhumanity.org
   Redirect type: Permanent (301)
   Forward settings: Forward only
   ```

---

### Option 2: Point to Vercel (Alternative)

If your DNS provider doesn't support redirects, you can point the `.org` domain to Vercel and let the application handle it.

#### Step 1: Add .org Domain to Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `elevateforhumanity.org`
6. Enter: `www.elevateforhumanity.org`

#### Step 2: Configure DNS Records
At your domain registrar, add these DNS records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

#### Step 3: Add Redirect to next.config.mjs
```javascript
// Add this to the redirects() function in next.config.mjs
{
  source: '/:path*',
  has: [
    {
      type: 'host',
      value: '(www\\.)?elevateforhumanity\\.org',
    },
  ],
  destination: 'https://www.elevateforhumanity.org/:path*',
  permanent: true,
},
```

**⚠️ Warning:** This approach adds the `.org` domain to your Vercel project, which may cause SEO issues. Option 1 is preferred.

---

## Clear Cache

After configuring the redirect, you need to clear caches:

### 1. DNS Cache (User's Computer)
```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
```

### 2. Browser Cache
- Chrome: Ctrl+Shift+Delete → Clear browsing data
- Firefox: Ctrl+Shift+Delete → Clear recent history
- Safari: Cmd+Option+E → Empty caches

### 3. CDN Cache (if using Cloudflare)
1. Go to Cloudflare Dashboard
2. Select domain
3. Go to **Caching** → **Configuration**
4. Click **Purge Everything**

### 4. Vercel Cache
If you added the domain to Vercel:
1. Go to Vercel Dashboard
2. Select project
3. Go to **Deployments**
4. Click **...** → **Redeploy**

---

## Verification

### Test the Redirect

#### Using curl:
```bash
# Test www.elevateforhumanity.org
curl -I https://www.elevateforhumanity.org/

# Should return:
HTTP/2 301
Location: https://www.elevateforhumanity.org/
```

#### Using browser:
1. Open incognito/private window
2. Go to: https://www.elevateforhumanity.org/
3. Should automatically redirect to: https://www.elevateforhumanity.org/
4. Check URL bar - should show `.institute`

#### Check DNS:
```bash
# Check if DNS points to Vercel
dig elevateforhumanity.org

# Should show:
# - A record: 76.76.21.21 (if using Option 2)
# - Or CNAME to your redirect service (if using Option 1)
```

---

## Current Application Configuration

### Files Checked ✅

**next.config.mjs:**
- ✅ No `.org` references
- ✅ Redirects configured for `.institute` only
- ✅ www → non-www redirect for `.institute`

**app/layout.tsx:**
- ✅ SITE_URL = `https://www.elevateforhumanity.org`
- ✅ Canonical URLs use `.institute`

**app/robots.ts:**
- ✅ Sitemap URL uses `.institute`

**.env.local:**
- ✅ NEXT_PUBLIC_SITE_URL = `https://www.elevateforhumanity.org`

**vercel.json:**
- ✅ No domain-specific configuration

### Email Addresses (Correct) ✅
Email addresses correctly use `.org`:
- `vita@elevateforhumanity.org`
- `info@elevateforhumanity.org`
- `agreements@elevateforhumanity.org`

**This is correct** - email domains can differ from website domains.

---

## Recommended Action Plan

### Immediate (Required)
1. ✅ Verify application configuration (already correct)
2. ⚠️ **Configure DNS redirect at domain registrar** (see Option 1 above)
3. ⚠️ Clear DNS and browser caches
4. ⚠️ Test redirect with curl and browser

### Short-term
1. Monitor redirect is working
2. Update any external links pointing to `.org`
3. Notify users of domain change (if not already done)

### Long-term
1. Consider letting `.org` domain expire (after redirect is stable)
2. Or keep `.org` for email addresses only
3. Monitor analytics for `.org` traffic (should be zero after redirect)

---

## Troubleshooting

### Issue: "Still seeing .org content"
**Cause:** Browser/DNS cache  
**Solution:** Clear all caches (see "Clear Cache" section)

### Issue: "DNS error when visiting .org"
**Cause:** DNS not configured  
**Solution:** Configure DNS redirect (see Option 1) or point to Vercel (see Option 2)

### Issue: "Redirect works but shows .org in URL"
**Cause:** Using 302 (temporary) instead of 301 (permanent)  
**Solution:** Change redirect to 301 permanent

### Issue: "Redirect works on desktop but not mobile"
**Cause:** Mobile browser cache  
**Solution:** Clear mobile browser cache or use incognito mode

---

## Summary

### What's Correct ✅
- Application configuration (no `.org` references)
- Environment variables (`.institute` only)
- Canonical URLs (`.institute` only)
- Redirects in next.config.mjs (`.institute` only)

### What's Missing ⚠️
- DNS-level redirect from `.org` to `.institute`
- This must be configured at your domain registrar
- Cannot be done in the application code

### Next Steps
1. Identify where `elevateforhumanity.org` is registered
2. Log into domain registrar
3. Configure redirect (Option 1 recommended)
4. Clear caches
5. Test redirect

---

## Contact Information

**Domain Registrar:** [Your registrar name]  
**DNS Provider:** [Your DNS provider]  
**Cloudflare Account:** [If applicable]

**Need Help?**
- Check your domain registrar's documentation for "URL forwarding" or "domain redirect"
- Contact your domain registrar's support
- Or use Option 2 to point DNS to Vercel

---

**Last Updated:** January 10, 2026  
**Status:** Application correctly configured, DNS redirect needed
