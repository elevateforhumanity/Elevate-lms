# CRITICAL FIXES REQUIRED - Action Plan

## Status: 3 Blocking Issues Remain (Confirmed by Netlify Logs Page 19)

---

## ISSUE 1: CSS Files Still 404 (HIGHEST PRIORITY)

### Problem
7 CSS files returning 404 with 7-8 second delays:
- `/styles/tiktok-animations.css`
- `/styles/rich-design-system.css`
- `/branding/brand.css`
- `/app/globals-modern-design.css`
- `/app/globals-mobile-pro.css`
- `/app/globals-mobile-complete.css`
- `/app/font-consistency.css`

### Root Cause
Files exist in `public/` but are still being requested and returning 404.

### Investigation Results
✅ Files exist in public/:
```bash
$ ls -la public/app/*.css public/styles/*.css public/branding/*.css
public/app/font-consistency.css (3967 bytes)
public/app/globals-mobile-complete.css (42 bytes - has content)
public/app/globals-mobile-pro.css (42 bytes - has content)
public/app/globals-modern-design.css (3095 bytes)
public/styles/rich-design-system.css (42 bytes - has content)
public/styles/tiktok-animations.css (42 bytes - has content)
public/branding/brand.css (42 bytes - has content)
```

✅ No explicit `<link>` tags found in `app/layout.tsx`

❌ **ISSUE**: Something is still requesting these files

### Possible Causes
1. **Browser cache** - Old HTML cached with link tags
2. **Service worker** - Old SW caching requests
3. **CDN cache** - Netlify edge cache not updated
4. **Hidden references** - CSS @import or dynamic injection

### SOLUTION 1: Add Netlify Redirects (Immediate Fix)

Create/update `public/_redirects`:
```
# Redirect old CSS paths to prevent 404s
/app/globals-modern-design.css /app/globals-modern-design.css 200
/app/globals-mobile-pro.css /app/globals-mobile-pro.css 200
/app/globals-mobile-complete.css /app/globals-mobile-complete.css 200
/app/font-consistency.css /app/font-consistency.css 200
/styles/rich-design-system.css /styles/rich-design-system.css 200
/styles/tiktok-animations.css /styles/tiktok-animations.css 200
/branding/brand.css /branding/brand.css 200
```

### SOLUTION 2: Verify Files Are Deployed

After next deploy, test each URL:
```bash
curl -I https://www.elevateforhumanity.org/app/globals-modern-design.css
curl -I https://www.elevateforhumanity.org/styles/rich-design-system.css
curl -I https://www.elevateforhumanity.org/branding/brand.css
```

Expected: `200 OK` with `Content-Type: text/css`

### SOLUTION 3: Clear All Caches

1. **Netlify**: Clear cache and redeploy
2. **Browser**: Hard refresh (Ctrl+Shift+R)
3. **Service Worker**: Unregister (already done via UnregisterSW component)

### ACCEPTANCE CRITERIA
- [ ] All 7 CSS URLs return 200 (not 404)
- [ ] Response time < 100ms (not 7-8 seconds)
- [ ] Zero CSS 404s in Netlify logs after 1 hour

---

## ISSUE 2: Hero Image Still 404 (HIGH PRIORITY)

### Problem
`/clear-pathways-hero.jpg` returning 404 via Next/Image

### Investigation Results
✅ File does NOT exist:
```bash
$ ls -la public/clear-path*
public/clear-path-main-image.jpg (exists)
```

✅ All code references updated to `clear-path-main-image.jpg`

❌ **ISSUE**: Old cached requests or missed reference

### SOLUTION 1: Add Redirect

Add to `next.config.mjs` redirects:
```javascript
{
  source: '/clear-pathways-hero.jpg',
  destination: '/clear-path-main-image.jpg',
  permanent: true
}
```

### SOLUTION 2: Search for Remaining References

```bash
# Search entire codebase
grep -r "clear-pathways-hero" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" .

# Search in data files
grep -r "clear-pathways-hero" --include="*.json" --include="*.md" .

# Search in public HTML files
grep -r "clear-pathways-hero" public/
```

### SOLUTION 3: Add Actual File (Fallback)

If redirect doesn't work, copy the file:
```bash
cp public/clear-path-main-image.jpg public/clear-pathways-hero.jpg
```

### ACCEPTANCE CRITERIA
- [ ] Zero 404s for `/clear-pathways-hero.jpg`
- [ ] Hero image loads on homepage
- [ ] No 504 timeouts on hero image

---

## ISSUE 3: Security Log Still Firing Every Second (CRITICAL)

### Problem
`/api/security/log` firing every ~1 second despite fixes

### Investigation Results
✅ Removed `setInterval` from:
- `components/SecurityMonitor.tsx` (line 77)
- `components/ScraperDetection.tsx` (line 110)

✅ Added cooldown (60s per event type)

❌ **ISSUE**: Still firing every second in production

### Root Cause Analysis

**Hypothesis 1**: Cooldown not working
- Cooldown uses `Map` which is module-scoped
- Should work, but may be reset on each request in serverless

**Hypothesis 2**: Multiple instances
- Component loaded multiple times
- React Strict Mode causing double-mount
- Multiple route changes triggering events

**Hypothesis 3**: Event spam
- Resize events firing rapidly
- Multiple event types firing simultaneously
- Each event type has separate cooldown

### SOLUTION 1: Add Route-Level Guard (REQUIRED)

**File**: `components/SecurityMonitor.tsx`

Add at top of file (module scope):
```typescript
// Track logged routes to prevent spam
const loggedRoutes = new Set<string>();

// Clear old entries every 5 minutes
setInterval(() => {
  if (loggedRoutes.size > 100) {
    loggedRoutes.clear();
  }
}, 300000);
```

Update `logSecurityEvent` function:
```typescript
function logSecurityEvent(eventType: string, data: unknown) {
  // Safety checks for SSR
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  // Create unique key for this route + event
  const routeKey = `${window.location.pathname}:${eventType}`;
  
  // Check if already logged
  if (loggedRoutes.has(routeKey)) {
    console.log('[Security] Already logged:', routeKey);
    return;
  }
  
  // Mark as logged
  loggedRoutes.add(routeKey);

  // ... rest of existing code
}
```

### SOLUTION 2: Debounce Resize Events

**File**: `components/SecurityMonitor.tsx`

Replace resize listener:
```typescript
// 4. Detect DevTools opening (debounced)
const detectDevTools = () => {
  let timeoutId: NodeJS.Timeout;
  let hasLogged = false;
  
  const check = () => {
    if (hasLogged) return;
    
    const threshold = 160;
    const widthThreshold =
      window.outerWidth - window.innerWidth > threshold;
    const heightThreshold =
      window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      hasLogged = true;
      logSecurityEvent('DEVTOOLS_OPENED', {
        outerWidth: window.outerWidth,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        innerHeight: window.innerHeight,
      });
    }
  };

  const debouncedCheck = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(check, 1000); // Wait 1s after resize stops
  };

  // Check on mount
  check();
  
  // Debounced resize listener
  window.addEventListener('resize', debouncedCheck);
  return () => {
    window.removeEventListener('resize', debouncedCheck);
    clearTimeout(timeoutId);
  };
};
```

### SOLUTION 3: Use sendBeacon (Non-blocking)

**File**: `components/SecurityMonitor.tsx`

Replace fetch with sendBeacon:
```typescript
function logSecurityEvent(eventType: string, data: unknown) {
  // ... existing guards and checks ...

  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    data,
  };

  // Use sendBeacon for non-blocking fire-and-forget
  if ('sendBeacon' in navigator) {
    const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
    navigator.sendBeacon('/api/security/log', blob);
  } else {
    // Fallback to fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    fetch('/api/security/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      signal: controller.signal,
      keepalive: true
    })
      .then(() => clearTimeout(timeoutId))
      .catch(() => clearTimeout(timeoutId));
  }

  // ... rest of code ...
}
```

### ACCEPTANCE CRITERIA
- [ ] `/api/security/log` appears max once per page view
- [ ] No calls every second
- [ ] All calls return 200 (no 500/499)
- [ ] Duration < 200ms
- [ ] Frequency: ~1 call per route change (not per second)

---

## VERIFICATION SCRIPT

After deploying fixes, run this to verify:

```bash
#!/bin/bash

echo "=== Verifying CSS Files ==="
for file in \
  "/app/globals-modern-design.css" \
  "/app/globals-mobile-pro.css" \
  "/app/globals-mobile-complete.css" \
  "/app/font-consistency.css" \
  "/styles/rich-design-system.css" \
  "/styles/tiktok-animations.css" \
  "/branding/brand.css"
do
  echo "Testing: $file"
  curl -I "https://www.elevateforhumanity.org$file" | head -1
done

echo ""
echo "=== Verifying Hero Image ==="
curl -I "https://www.elevateforhumanity.org/clear-pathways-hero.jpg" | head -1

echo ""
echo "=== Check Netlify Logs ==="
echo "1. Go to Netlify Observability"
echo "2. Filter for: /api/security/log"
echo "3. Verify: max 1 call per page view (not every second)"
echo "4. Verify: all return 200"
echo "5. Verify: duration < 200ms"
```

---

## DEPLOYMENT CHECKLIST

Before deploying:
- [ ] Add route-level guard to SecurityMonitor.tsx
- [ ] Add debouncing to resize events
- [ ] Add redirects to next.config.mjs
- [ ] Verify all CSS files have content (not empty)
- [ ] Test build locally
- [ ] Commit with clear message

After deploying:
- [ ] Run verification script
- [ ] Check Netlify logs for 1 hour
- [ ] Verify error rate < 5%
- [ ] Verify page load times < 2s
- [ ] Test on actual mobile device

---

## PRIORITY ORDER

1. **FIRST**: Add route-level guard to SecurityMonitor (stops the loop)
2. **SECOND**: Add redirects for hero image (stops 404s)
3. **THIRD**: Verify CSS files are accessible (may just be cache)

---

## EXPECTED RESULTS

### Before Fixes
- Error rate: ~11%
- `/api/security/log`: Every 1 second
- CSS 404s: 7 files, 7-8s each
- Hero 404: Yes
- Page load: 0.8s - 17s

### After Fixes
- Error rate: < 5%
- `/api/security/log`: Once per page view
- CSS 404s: 0
- Hero 404: 0
- Page load: < 2s consistently

---

## CONTACT

If issues persist after these fixes:
1. Check Netlify build logs for deployment errors
2. Verify files are in the deployed artifact
3. Clear Netlify cache and redeploy
4. Check browser console for client-side errors
5. Review Netlify function logs for server errors
