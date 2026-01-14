# Netlify Domain Configuration Guide
**Date:** January 10, 2026  
**Status:** Configuration Instructions

## Correct Domain Setup

### ✅ Main Domain (Configure in Netlify)
**Domain:** `www.elevateforhumanity.org`

**Where to configure:**
1. Go to Netlify Dashboard → Your Project → Settings → Domains
2. Add ONLY this domain: `www.elevateforhumanity.org`
3. Configure DNS as instructed by Netlify

**This is your canonical/production domain.**

---

### ❌ Redirect Domains (DO NOT Configure in Netlify)
**Domains:** 
- `elevateforhumanity.org` (old domain)
- `www.www.elevateforhumanity.org` (www subdomain)
- `*.netlify.app` (Netlify preview domains)

**Why NOT to add these:**
- These domains should redirect to the main domain
- Redirects are handled at the application level (next.config.mjs)
- Adding them to Netlify creates duplicate deployments
- Can cause SEO issues and confusion

**How redirects work:**
- Configured in `next.config.mjs` (lines 131-151)
- Handled by Next.js at runtime
- Returns HTTP 308 permanent redirect
- No Netlify domain configuration needed

---

## Current Configuration

### Application-Level Redirects (next.config.mjs)

```javascript
async redirects() {
  return [
    // Redirect any netlify.app host to canonical domain
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '.*\\.netlify\\.app',
        },
      ],
      destination: 'https://www.elevateforhumanity.org/:path*',
      permanent: true,
    },
    // WWW to non-WWW redirect (canonical domain)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.www.elevateforhumanity.org' }],
      destination: 'https://www.elevateforhumanity.org/:path*',
      permanent: true,
    },
    // ... other path-based redirects
  ];
}
```

**What this does:**
- Any request to `*.netlify.app` → redirects to `www.elevateforhumanity.org`
- Any request to `www.www.elevateforhumanity.org` → redirects to `www.elevateforhumanity.org`
- Preserves the path (e.g., `/about` stays `/about`)
- Uses HTTP 308 (permanent redirect with method preservation)

---

## Netlify Dashboard Configuration

### Step-by-Step Instructions

#### 1. Access Domain Settings
```
Netlify Dashboard → [Your Project] → Settings → Domains
```

#### 2. Verify Main Domain
**Should see:**
```
✅ www.elevateforhumanity.org (Production)
```

**Should NOT see:**
```
❌ elevateforhumanity.org
❌ www.www.elevateforhumanity.org
❌ [project-name].netlify.app (this is automatic, ignore it)
```

#### 3. Remove Incorrect Domains (If Present)
If you see `elevateforhumanity.org` or `www.www.elevateforhumanity.org`:

1. Click the domain
2. Click "Remove" or "Delete"
3. Confirm removal

**Why remove:**
- These should redirect, not serve content
- Duplicate domains cause SEO issues
- Application-level redirects handle this correctly

#### 4. DNS Configuration (For Main Domain Only)

**For www.elevateforhumanity.org:**

**Option A: Using Netlify Nameservers (Recommended)**
```
ns1.netlify-dns.com
ns2.netlify-dns.com
```

**Option B: Using A/CNAME Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.netlify-dns.com
```

---

## Old Domain Redirect (.org → .institute)

### External DNS Configuration Required

The `.org` domain redirect must be configured at your DNS provider (not in Netlify):

**Option 1: DNS-Level Redirect (Recommended)**
Many DNS providers offer redirect services:
- Cloudflare: Page Rules
- Namecheap: URL Redirect Record
- GoDaddy: Forwarding

**Configuration:**
```
Source: elevateforhumanity.org
Destination: https://www.elevateforhumanity.org
Type: 301 Permanent Redirect
Preserve Path: Yes
```

**Option 2: Separate Netlify Project (Alternative)**
If your DNS provider doesn't support redirects:

1. Create a NEW Netlify project (separate from main project)
2. Add `elevateforhumanity.org` domain to this project
3. Deploy a simple redirect app:

```javascript
// pages/_middleware.js
export function middleware(request) {
  const url = request.nextUrl.clone();
  url.hostname = 'www.elevateforhumanity.org';
  url.protocol = 'https';
  return Response.redirect(url, 308);
}
```

**Important:** This is a SEPARATE project, not the main one.

---

## Verification

### Test Main Domain
```bash
curl -I https://www.elevateforhumanity.org/
# Should return: HTTP/2 200
```

### Test WWW Redirect
```bash
curl -I https://www.www.elevateforhumanity.org/
# Should return: HTTP/2 308
# Location: https://www.elevateforhumanity.org/
```

### Test Netlify App Redirect
```bash
curl -I https://[your-project].netlify.app/
# Should return: HTTP/2 308
# Location: https://www.elevateforhumanity.org/
```

### Test Old Domain Redirect (.org)
```bash
curl -I https://elevateforhumanity.org/
# Should return: HTTP/2 301 or 308
# Location: https://www.elevateforhumanity.org/
```

---

## Common Issues

### Issue 1: "Both domains serve content"
**Problem:** Both `.org` and `.institute` show the same site  
**Cause:** Both domains configured in Netlify  
**Solution:** Remove `.org` from Netlify, configure redirect at DNS level

### Issue 2: "WWW subdomain not redirecting"
**Problem:** `www.www.elevateforhumanity.org` doesn't redirect  
**Cause:** WWW domain added to Netlify as separate domain  
**Solution:** Remove WWW from Netlify domains, let next.config.mjs handle it

### Issue 3: "Netlify.app domain shows site"
**Problem:** `[project].netlify.app` serves content instead of redirecting  
**Cause:** This is expected behavior for preview deployments  
**Solution:** 
- Production deployments: Redirect works (configured in next.config.mjs)
- Preview deployments: Shows content (this is intentional for testing)

### Issue 4: "Old domain (.org) not redirecting"
**Problem:** `.org` domain doesn't redirect to `.institute`  
**Cause:** DNS not configured for redirect  
**Solution:** Configure redirect at DNS provider (see "Old Domain Redirect" section)

---

## SEO Considerations

### Canonical URLs
All pages should specify the canonical domain:

```html
<link rel="canonical" href="https://www.elevateforhumanity.org/[path]" />
```

**Verification:**
```bash
curl -s https://www.elevateforhumanity.org/ | grep canonical
# Should show: <link rel="canonical" href="https://www.elevateforhumanity.org/" />
```

### Sitemap
Sitemap should use canonical domain:

```xml
<!-- public/sitemap.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.elevateforhumanity.org/</loc>
  </url>
  <!-- All URLs should use .institute domain -->
</urlset>
```

### Robots.txt
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

---

## Summary

### ✅ DO Configure in Netlify
- `www.elevateforhumanity.org` (main production domain)

### ❌ DON'T Configure in Netlify
- `elevateforhumanity.org` (redirect at DNS level)
- `www.www.elevateforhumanity.org` (handled by next.config.mjs)
- Any other redirect domains

### ✅ Redirects Handled By
- **Application:** next.config.mjs (www, netlify.app)
- **DNS Provider:** elevateforhumanity.org redirect
- **Automatic:** Netlify preview domains

### ✅ Current Status
- Main domain: `www.elevateforhumanity.org` ✅
- Application redirects: Configured in next.config.mjs ✅
- Old domain redirect: Requires DNS configuration ⚠️

---

## Action Items

### For Netlify Dashboard
1. ✅ Verify only `www.elevateforhumanity.org` is in Domains
2. ❌ Remove any other domains if present
3. ✅ Confirm DNS is pointing to Netlify

### For DNS Provider (elevateforhumanity.org)
1. ⚠️ Configure redirect from `.org` to `.institute`
2. ⚠️ Use 301 permanent redirect
3. ⚠️ Preserve path in redirect

### For Application
1. ✅ Redirects configured in next.config.mjs
2. ✅ Canonical URLs use `.institute` domain
3. ✅ Sitemap uses `.institute` domain

---

## Contact

If you need help configuring the old domain redirect:
1. Identify your DNS provider for `elevateforhumanity.org`
2. Check if they support URL forwarding/redirects
3. If not, consider using Cloudflare (free tier supports redirects)

**Note:** The main application is correctly configured. Only the external `.org` redirect needs DNS-level setup.
