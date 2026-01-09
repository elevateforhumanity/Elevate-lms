# CLOUDFLARE CACHE RULES - EXACT CONFIGURATION

## Step 4: Create Cache Rules (Do this NOW in Cloudflare Dashboard)

### Rule 1: BYPASS HTML (CRITICAL - prevents stale HTML)

**Go to:** Cloudflare Dashboard → Your Domain → Caching → Cache Rules → Create Rule

**Configuration:**
```
Rule Name: BYPASS HTML

When incoming requests match:
  Field: URI Path
  Operator: does not start with
  Value: /_next/static

AND

  Field: URI Path  
  Operator: does not start with
  Value: /_next/image

Then:
  Cache eligibility: Bypass cache
```

**Click:** Deploy

---

### Rule 2: CACHE NEXT STATIC (allows hashed assets to cache)

**Go to:** Cloudflare Dashboard → Your Domain → Caching → Cache Rules → Create Rule

**Configuration:**
```
Rule Name: CACHE NEXT STATIC

When incoming requests match:
  Field: URI Path
  Operator: starts with
  Value: /_next/static/

Then:
  Cache eligibility: Eligible for cache
  Edge Cache TTL: 1 month
  Browser Cache TTL: Respect origin
```

**Click:** Deploy

---

### Rule 3: NO CACHE SERVICE WORKER (prevents forever stale)

**Go to:** Cloudflare Dashboard → Your Domain → Caching → Cache Rules → Create Rule

**Configuration:**
```
Rule Name: NO CACHE SW

When incoming requests match:
  Field: URI Path
  Operator: equals
  Value: /sw.js

Then:
  Cache eligibility: Bypass cache
```

**Click:** Deploy

---

## Step 5: PURGE EVERYTHING (ONE TIME ONLY)

**Go to:** Cloudflare Dashboard → Your Domain → Caching → Configuration

**Click:** Purge Everything

**Confirm:** Yes, Purge Everything

⚠️ **This will clear ALL cached content. Do this ONCE after creating the rules above.**

---

## Step 6: VERIFY (Open in Incognito)

1. Wait 3 minutes for deployment to complete
2. Open: https://elevateforhumanity.institute/ in **Incognito/Private mode**
3. Open DevTools (F12) → Network tab
4. Refresh the page
5. Click on the HTML document (first request)
6. Check Response Headers:
   - Should see: `cache-control: no-store, max-age=0`
   - Should see: `cf-cache-status: DYNAMIC` or `BYPASS`
7. Click on a CSS file (e.g., `8ddda5b54d9ee18b.css`)
8. Check Response Headers:
   - Should see: `cache-control: public, max-age=31536000, immutable`
   - Should see: `cf-cache-status: HIT` (after first load)

---

## VERIFICATION CHECKLIST

- [ ] Rule 1 created: BYPASS HTML
- [ ] Rule 2 created: CACHE NEXT STATIC  
- [ ] Rule 3 created: NO CACHE SW
- [ ] Purged everything (one time)
- [ ] Waited 3 minutes
- [ ] Opened in incognito
- [ ] HTML shows `no-store, max-age=0`
- [ ] CSS shows `max-age=31536000, immutable`
- [ ] Site displays with proper colors (no black text)

---

## If you still see stale styles after this:

1. Clear your browser cache completely
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check if service worker is still registered:
   - DevTools → Application → Service Workers
   - If any are listed, click "Unregister"

---

## Alternative: Cloudflare API (if you have API token)

If you have a Cloudflare API token, I can create a script to do this automatically.
Paste your Cloudflare API token and Zone ID here, and I'll execute it.
