# Complete Cache Purge Guide - Global Cache Clear

**Goal:** Clear ALL caches globally for fresh start with new domain  
**Domain:** www.elevateforhumanity.org  
**Status:** Independent from old domain (handled separately)

---

## 🗑️ Cache Layers to Clear

### 1. Netlify Edge Cache (CDN)
### 2. Browser Cache (Users)
### 3. DNS Cache (Global)
### 4. Google Cache (Search)
### 5. Cloudflare Cache (if using)
### 6. Next.js Build Cache

---

## 1️⃣ Netlify Edge Cache - CRITICAL

### Method A: Netlify Dashboard (Recommended)

1. **Go to:** https://netlify.com/dashboard
2. **Select:** Your project (Elevate-lms)
3. **Go to:** Settings → Data Cache
4. **Click:** "Purge Everything"
5. **Confirm:** Purge

**OR via Deployments:**
1. Go to: Deployments tab
2. Find: Latest production deployment
3. Click: Three dots (...)
4. Select: "Redeploy"
5. Check: "Use existing Build Cache" = OFF
6. Click: "Redeploy"

### Method B: Netlify CLI

```bash
# Install Netlify CLI if not installed
npm i -g netlify

# Login
netlify login

# Link project
netlify link

# Purge cache
netlify env pull
netlify --prod --force

# Or redeploy without cache
netlify --prod --no-cache
```

### Method C: API (Nuclear Option)

```bash
# Get your Netlify token from: https://netlify.com/account/tokens

# Purge all cache
curl -X DELETE \
  "https://api.netlify.com/v1/edge-config/YOUR_PROJECT_ID/cache" \
  -H "Authorization: Bearer YOUR_NETLIFY_TOKEN"

# Trigger revalidation
curl -X POST \
  "https://www.elevateforhumanity.org/api/revalidate?secret=YOUR_SECRET"
```

---

## 2️⃣ Browser Cache - User Side

### Force Cache Bust in Code

**Update `next.config.mjs`:**

```javascript
generateBuildId: async () => {
  // Force new build ID to bust all caches
  return `build-${Date.now()}-fresh-start`;
},
```

**Already configured!** ✅ (Line 5-7 in next.config.mjs)

### Cache Headers (Already Configured)

**In `next.config.mjs` headers:**
```javascript
{
  source: '/',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, s-maxage=0, must-revalidate',
    },
  ],
}
```

**Already configured!** ✅

### User Instructions (Post-Launch)

**For users experiencing issues:**

**Chrome/Edge:**
```
1. Press: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Select: "All time"
3. Check: "Cached images and files"
4. Click: "Clear data"

OR Hard Refresh:
- Windows: Ctrl+F5 or Ctrl+Shift+R
- Mac: Cmd+Shift+R
```

**Firefox:**
```
1. Press: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Select: "Everything"
3. Check: "Cache"
4. Click: "Clear Now"

OR Hard Refresh:
- Windows: Ctrl+F5 or Ctrl+Shift+R
- Mac: Cmd+Shift+R
```

**Safari:**
```
1. Safari → Preferences → Advanced
2. Check: "Show Develop menu"
3. Develop → Empty Caches
4. Or: Cmd+Option+E

Hard Refresh:
- Cmd+Shift+R
```

---

## 3️⃣ DNS Cache - Global Propagation

### Check DNS Propagation

**Online Tools:**
- https://dnschecker.org
- https://www.whatsmydns.net
- https://dnspropagation.net

**Enter:** `www.elevateforhumanity.org`

**Should show:**
- A record pointing to Netlify IP
- CNAME record (if using)
- Propagated globally (green checkmarks)

### Clear Local DNS Cache

**Windows:**
```cmd
ipconfig /flushdns
```

**Mac:**
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Linux:**
```bash
sudo systemd-resolve --flush-caches
# OR
sudo /etc/init.d/nscd restart
```

### Wait for Global Propagation

**Timeline:**
- Local ISP: 5-30 minutes
- Regional: 1-4 hours
- Global: 24-48 hours

**Force faster propagation:**
- Use low TTL (300 seconds = 5 minutes)
- Update DNS records early
- Use Cloudflare (faster propagation)

---

## 4️⃣ Google Cache - Search Results

### Remove Old URLs from Google

**Method A: Google Search Console**

1. **Go to:** https://search.google.com/search-console
2. **Select:** Old property (if exists)
3. **Go to:** Removals
4. **Click:** "New Request"
5. **Select:** "Remove all URLs with this prefix"
6. **Enter:** `https://www.elevateforhumanity.org/`
7. **Submit**

**Repeat for:**
- `https://elevateforhumanity.org/`
- `http://www.elevateforhumanity.org/`
- `http://elevateforhumanity.org/`

### Request Fresh Crawl

**For new domain:**

1. **Go to:** https://search.google.com/search-console
2. **Select:** New property (www.elevateforhumanity.org)
3. **Go to:** URL Inspection
4. **Enter:** `https://www.elevateforhumanity.org/`
5. **Click:** "Request Indexing"

**Repeat for priority pages:**
- `/programs`
- `/apply`
- `/about`
- `/contact`

### Force Google to Recrawl

**Submit fresh sitemap:**
```
https://www.elevateforhumanity.org/sitemap.xml
```

**In Google Search Console:**
1. Sitemaps → Add new sitemap
2. Enter: `sitemap.xml`
3. Submit

### Check Google Cache

**See what Google has cached:**
```
cache:www.elevateforhumanity.org
```

**If showing old content:**
- Wait 24-48 hours
- Request indexing again
- Check robots.txt not blocking

---

## 5️⃣ Cloudflare Cache (If Using)

### Purge Cloudflare Cache

**Method A: Dashboard**

1. **Go to:** https://dash.cloudflare.com
2. **Select:** Your domain
3. **Go to:** Caching → Configuration
4. **Click:** "Purge Everything"
5. **Confirm**

**Method B: API**

```bash
# Get your Cloudflare API token
# From: https://dash.cloudflare.com/profile/api-tokens

# Purge everything
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# Purge specific URLs
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "files": [
      "https://www.elevateforhumanity.org/",
      "https://www.elevateforhumanity.org/sitemap.xml",
      "https://www.elevateforhumanity.org/robots.txt"
    ]
  }'
```

### Development Mode (Bypass Cache)

**Enable for testing:**
1. Cloudflare Dashboard
2. Quick Actions → Development Mode
3. Toggle ON
4. Lasts 3 hours
5. Bypasses all caching

---

## 6️⃣ Next.js Build Cache

### Clear Local Build Cache

```bash
cd /workspaces/Elevate-lms

# Remove all cache directories
rm -rf .next
rm -rf node_modules/.cache
rm -rf .netlify
rm -rf out
rm -rf dist

# Clear pnpm cache
pnpm store prune

# Reinstall and rebuild
pnpm install
pnpm build
```

### Clear Netlify Build Cache

**Method A: Redeploy without cache**

```bash
netlify --prod --force --no-cache
```

**Method B: Dashboard**

1. Netlify Dashboard → Project
2. Settings → General
3. Scroll to: Build & Development Settings
4. Click: "Clear Build Cache"

---

## 🚀 Complete Cache Purge Checklist

### Pre-Deployment:
- [ ] Clear local `.next` directory
- [ ] Clear `node_modules/.cache`
- [ ] Fresh `pnpm install`
- [ ] Fresh `pnpm build`

### During Deployment:
- [ ] Deploy with `--force` flag
- [ ] Deploy with `--no-cache` flag
- [ ] Verify new build ID generated

### Post-Deployment:
- [ ] Purge Netlify edge cache
- [ ] Purge Cloudflare cache (if using)
- [ ] Submit new sitemap to Google
- [ ] Request indexing for key pages
- [ ] Check DNS propagation

### User-Facing:
- [ ] Add cache-busting to static assets
- [ ] Set proper cache headers
- [ ] Add version query params if needed
- [ ] Communicate to users about hard refresh

### Verification:
- [ ] Check `curl -I https://www.elevateforhumanity.org/`
- [ ] Verify `X-Netlify-Cache` header
- [ ] Check sitemap loads fresh
- [ ] Verify robots.txt loads fresh
- [ ] Test in incognito/private mode

---

## 🔍 Verification Commands

### Check Cache Status

```bash
# Check Netlify cache headers
curl -I https://www.elevateforhumanity.org/

# Look for:
# X-Netlify-Cache: MISS (good - not cached)
# X-Netlify-Cache: HIT (bad - still cached)
# Cache-Control: public, s-maxage=0, must-revalidate

# Check specific pages
curl -I https://www.elevateforhumanity.org/programs
curl -I https://www.elevateforhumanity.org/sitemap.xml
curl -I https://www.elevateforhumanity.org/robots.txt
```

### Check DNS

```bash
# Check A record
dig www.elevateforhumanity.org A

# Check CNAME
dig www.elevateforhumanity.org CNAME

# Check from different DNS servers
dig @8.8.8.8 www.elevateforhumanity.org
dig @1.1.1.1 www.elevateforhumanity.org
```

### Check Google Cache

```bash
# See what Google has cached
# In browser, search:
cache:www.elevateforhumanity.org

# Check indexing status
site:www.elevateforhumanity.org
```

---

## ⚡ Nuclear Option - Complete Reset

**If nothing else works:**

```bash
# 1. Delete everything locally
rm -rf .next node_modules .netlify out dist
rm -rf node_modules/.cache
rm -rf .pnpm-store

# 2. Fresh install
pnpm install --force

# 3. Fresh build
pnpm build

# 4. Deploy fresh
netlify --prod --force --no-cache

# 5. Purge Netlify cache via API
curl -X DELETE \
  "https://api.netlify.com/v1/deployments/DEPLOYMENT_ID/cache" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 6. Wait 5 minutes

# 7. Test
curl -I https://www.elevateforhumanity.org/
```

---

## 📊 Cache Monitoring

### Check Cache Hit Rate

**Netlify Analytics:**
1. Dashboard → Analytics
2. Check: Cache Hit Rate
3. Goal: Low hit rate initially (means fresh content)

**Headers to monitor:**
```
X-Netlify-Cache: MISS  ← Good (fresh)
X-Netlify-Cache: HIT   ← After cache warms up
X-Netlify-Cache: STALE ← Needs revalidation
```

### Set Up Monitoring

**Add to your monitoring:**
```javascript
// In your analytics
if (typeof window !== 'undefined') {
  const cacheStatus = performance.getEntriesByType('navigation')[0]?.transferSize;
  console.log('Cache status:', cacheStatus === 0 ? 'CACHED' : 'FRESH');
}
```

---

## 🎯 Expected Timeline

### Immediate (0-5 minutes):
- ✅ Netlify cache purged
- ✅ New build deployed
- ✅ Fresh content served

### Short-term (5-30 minutes):
- 🔄 DNS propagates locally
- 🔄 Browser caches expire
- 🔄 CDN caches refresh

### Medium-term (1-4 hours):
- 🔄 DNS propagates regionally
- 🔄 Google starts crawling
- 🔄 Search cache updates

### Long-term (24-48 hours):
- 🚀 DNS propagated globally
- 🚀 All caches cleared
- 🚀 Fresh content everywhere

---

## 🆘 Troubleshooting

### Still Seeing Old Content?

**Check:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Try incognito/private mode
3. Try different browser
4. Try different device
5. Check from different location (VPN)

**If still cached:**
```bash
# Check cache headers
curl -I https://www.elevateforhumanity.org/ | grep -i cache

# Should show:
# Cache-Control: public, s-maxage=0, must-revalidate
# X-Netlify-Cache: MISS
```

### DNS Not Propagating?

**Check:**
1. Verify DNS records in Netlify
2. Check TTL (should be low, like 300)
3. Wait 24-48 hours
4. Use https://dnschecker.org

### Google Showing Old Results?

**Solutions:**
1. Request removal in Search Console
2. Submit new sitemap
3. Request indexing for key pages
4. Wait 1-2 weeks for full refresh

---

## 📞 Support

**If caches won't clear:**
1. Contact Netlify support
2. Check Netlify status page
3. Verify deployment succeeded
4. Check error logs

**Netlify Support:**
- Dashboard → Help
- https://netlify.com/support

---

**Last Updated:** January 6, 2026  
**Status:** Ready for Global Cache Purge  
**Domain:** www.elevateforhumanity.org (independent)
