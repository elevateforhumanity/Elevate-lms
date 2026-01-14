# Fresh Start Deployment Guide
**New Domain:** www.elevateforhumanity.org  
**Goal:** Clean slate - new sitemap, new crawl, new index

---

## ✅ What's Been Cleaned Up

### Code & Configuration:
- ✅ All TypeScript/React/Next.js files updated
- ✅ All configuration files (next.config.mjs, middleware.ts, netlify.json)
- ✅ All documentation updated
- ✅ All email templates updated
- ✅ Security vulnerability patched
- ✅ 60 historical audit files deleted
- ✅ 31 legacy HTML files deleted
- ✅ Build passes successfully

### Domain References:
- ✅ 0 references to `elevateforhumanity.org` in active code
- ✅ 0 references to `www.elevateforhumanity.org` in active code
- ✅ 0 references to `portal.elevateforhumanity.org` in active code
- ✅ All redirects configured (old → new domain)

### SEO Ready:
- ✅ `app/sitemap.ts` - Uses new domain only
- ✅ `app/robots.ts` - Uses new domain only
- ✅ `app/layout.tsx` - Metadata uses new domain
- ✅ All canonical URLs use new domain

---

## 🚀 Deployment Steps

### 1. Deploy to Production

```bash
# Merge PR to main
git checkout main
git merge fix/production-readiness-critical-issues
git push origin main

# Netlify will auto-deploy
```

**Verify deployment:**
- https://www.elevateforhumanity.org (should load)
- https://www.elevateforhumanity.org/sitemap.xml (should show new domain)
- https://www.elevateforhumanity.org/robots.txt (should show new domain)

---

## 🗺️ Fresh Sitemap Submission

### Step 1: Verify Sitemap is Live

```bash
curl https://www.elevateforhumanity.org/sitemap.xml
```

**Should show:**
- All URLs with `https://www.elevateforhumanity.org`
- No old domain references
- Current date in `lastModified`

### Step 2: Google Search Console Setup

#### Option A: Fresh Property (Recommended)

1. **Go to:** https://search.google.com/search-console
2. **Click:** "Add Property"
3. **Select:** "Domain" property type
4. **Enter:** `www.elevateforhumanity.org`
5. **Verify:** Via DNS TXT record

**DNS TXT Record:**
```
Type: TXT
Name: @
Value: google-site-verification=XXXXX (provided by Google)
TTL: 3600
```

6. **Wait:** 5-10 minutes for DNS propagation
7. **Click:** "Verify"

#### Option B: URL Prefix Property

1. **Go to:** https://search.google.com/search-console
2. **Click:** "Add Property"
3. **Select:** "URL prefix"
4. **Enter:** `https://www.elevateforhumanity.org`
5. **Verify:** Via HTML file upload or meta tag

**HTML File Method:**
- Download verification file
- Place in `public/` directory
- Deploy
- Click "Verify"

### Step 3: Submit Sitemap

1. **In Google Search Console:**
   - Select your property: `www.elevateforhumanity.org`
   - Go to: **Sitemaps** (left sidebar)
   - Click: **Add a new sitemap**
   - Enter: `sitemap.xml`
   - Click: **Submit**

2. **Verify submission:**
   - Status should show "Success"
   - URLs discovered should match your sitemap count

### Step 4: Request Indexing (Priority Pages)

**Index these pages first:**
1. Homepage: `/`
2. Programs: `/programs`
3. Apply: `/apply`
4. About: `/about`

**How to request:**
1. In Google Search Console
2. Use **URL Inspection** tool
3. Enter full URL: `https://www.elevateforhumanity.org/`
4. Click: **Request Indexing**
5. Repeat for priority pages

---

## 🔍 Bing Webmaster Tools

### Step 1: Add Site

1. **Go to:** https://www.bing.com/webmasters
2. **Click:** "Add a site"
3. **Enter:** `https://www.elevateforhumanity.org`
4. **Verify:** Via XML file or meta tag

### Step 2: Submit Sitemap

1. **Go to:** Sitemaps section
2. **Enter:** `https://www.elevateforhumanity.org/sitemap.xml`
3. **Click:** Submit

---

## 🚫 Old Domain Handling

### Keep Old Domain Redirects Active

**In next.config.mjs (already configured):**
```javascript
{
  source: '/:path*',
  has: [{ type: 'host', value: 'elevateforhumanity\\.org' }],
  destination: 'https://www.elevateforhumanity.org/:path*',
  permanent: true, // 308 redirect
}
```

**Why keep redirects:**
- Users with bookmarks
- Old emails with links
- Backlinks from other sites
- SEO link equity transfer

**How long to keep:**
- Minimum: 6 months
- Recommended: 12 months
- Ideal: Permanently (costs nothing)

### Google Search Console - Old Domain

**Option 1: Remove Old Property (Clean Slate)**
1. Go to old property settings
2. Click "Remove property"
3. Confirm removal

**Option 2: Keep for Monitoring (Recommended)**
1. Keep old property active
2. Monitor redirect traffic
3. See which pages had backlinks
4. Use data to prioritize new content

**Option 3: Set Up Change of Address**
1. In old property (elevateforhumanity.org)
2. Go to Settings → Change of address
3. Select new property (www.elevateforhumanity.org)
4. Submit

---

## 📊 Monitoring Post-Launch

### Week 1: Immediate Checks

**Daily:**
- [ ] Check sitemap submission status
- [ ] Monitor indexing progress
- [ ] Check for crawl errors
- [ ] Verify redirects working

**Tools:**
```bash
# Check sitemap
curl -I https://www.elevateforhumanity.org/sitemap.xml

# Check robots.txt
curl https://www.elevateforhumanity.org/robots.txt

# Check redirect
curl -I https://elevateforhumanity.org/
# Should show: HTTP/2 308, Location: https://www.elevateforhumanity.org/

# Check indexing
site:www.elevateforhumanity.org
```

### Week 2-4: Growth Tracking

**Weekly:**
- [ ] Check indexed pages count
- [ ] Monitor search impressions
- [ ] Check for 404 errors
- [ ] Review top queries

**Google Search Console Metrics:**
- Total indexed pages
- Coverage issues
- Mobile usability
- Core Web Vitals

### Month 2-3: Optimization

**Monthly:**
- [ ] Analyze top performing pages
- [ ] Identify pages not indexed
- [ ] Fix any crawl errors
- [ ] Update content based on queries

---

## 🎯 Expected Timeline

### Immediate (Day 1):
- ✅ Sitemap submitted
- ✅ Robots.txt live
- ✅ Redirects working

### Week 1:
- 🔄 Google starts crawling
- 🔄 First pages indexed
- 🔄 Sitemap processed

### Week 2-4:
- 📈 Majority of pages indexed
- 📈 Search impressions start
- 📈 Rankings begin

### Month 2-3:
- 🚀 Full indexing complete
- 🚀 Rankings stabilize
- 🚀 Traffic grows

---

## ✅ Pre-Launch Checklist

### Code & Build:
- [x] TypeScript compiles
- [x] Next.js builds successfully
- [x] No console errors
- [x] All tests pass

### Domain & DNS:
- [ ] New domain points to Netlify
- [ ] SSL certificate active
- [ ] Old domain redirects configured
- [ ] DNS propagated (check: https://dnschecker.org)

### SEO:
- [x] Sitemap uses new domain
- [x] Robots.txt uses new domain
- [x] Canonical URLs use new domain
- [x] Metadata uses new domain
- [ ] Google Search Console property created
- [ ] Sitemap submitted

### Content:
- [x] All documentation updated
- [x] Email templates updated
- [x] No old domain references in active code
- [x] Legacy files deleted

### Monitoring:
- [ ] Sentry configured
- [ ] Analytics configured
- [ ] Error tracking active
- [ ] Uptime monitoring active

---

## 🆘 Troubleshooting

### Sitemap Not Showing Up

**Check:**
```bash
curl https://www.elevateforhumanity.org/sitemap.xml
```

**If 404:**
- Verify deployment completed
- Check `app/sitemap.ts` exists
- Clear Netlify cache
- Redeploy

### Redirects Not Working

**Check:**
```bash
curl -I https://elevateforhumanity.org/
```

**Should show:**
```
HTTP/2 308
location: https://www.elevateforhumanity.org/
```

**If not:**
- Check `next.config.mjs` redirects
- Verify DNS points to Netlify
- Check Netlify domain settings

### Pages Not Indexing

**Possible causes:**
1. Robots.txt blocking
2. Noindex meta tag
3. Canonical pointing elsewhere
4. Server errors (500)
5. Too slow (Core Web Vitals)

**Check:**
```bash
# Check robots.txt
curl https://www.elevateforhumanity.org/robots.txt

# Check page headers
curl -I https://www.elevateforhumanity.org/programs

# Check for noindex
curl -s https://www.elevateforhumanity.org/programs | grep -i noindex
```

---

## 📞 Support

**If issues arise:**
1. Check Netlify deployment logs
2. Check Google Search Console errors
3. Check Sentry error logs
4. Review this guide

**Common issues:**
- DNS propagation (wait 24-48 hours)
- Cache (clear browser, CDN, Netlify)
- Redirects (check next.config.mjs)
- Indexing (be patient, takes 1-4 weeks)

---

## 🎉 Success Metrics

### Week 1:
- ✅ Sitemap submitted
- ✅ 10+ pages indexed
- ✅ No crawl errors

### Week 4:
- ✅ 50+ pages indexed
- ✅ Search impressions > 100
- ✅ No major issues

### Month 3:
- ✅ 100+ pages indexed
- ✅ Search impressions > 1,000
- ✅ Rankings for target keywords

---

**Last Updated:** January 6, 2026  
**Status:** Ready for Fresh Start Deployment  
**Branch:** fix/production-readiness-critical-issues
