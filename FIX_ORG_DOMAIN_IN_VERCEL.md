# Fix .org Domain in Vercel - Set to Redirect
**Issue:** `elevateforhumanity.org` is set as Production domain in Vercel  
**Should be:** Set to Redirect to `elevateforhumanity.institute`  
**Date:** January 10, 2026  
**Priority:** 🔴 HIGH

---

## Problem

Currently in Vercel:
- ❌ `elevateforhumanity.org` is set as **Production** domain
- ❌ `www.elevateforhumanity.org` is set as **Production** domain (possibly)
- ✅ `elevateforhumanity.institute` is set as **Production** domain

**Result:** Both domains serve the same content, causing:
- SEO duplicate content issues
- Confusion about which is the main domain
- Cached content on `.org` domain

---

## Solution: Configure Redirect in Vercel

### Step 1: Access Vercel Domain Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **Elevate-lms** (or your project name)
3. Click **Settings** in the top navigation
4. Click **Domains** in the left sidebar

---

### Step 2: Identify Current Configuration

You should see something like:

```
✅ elevateforhumanity.institute (Production)
⚠️  elevateforhumanity.org (Production)  ← WRONG
⚠️  www.elevateforhumanity.org (Production)  ← WRONG
```

---

### Step 3: Change .org to Redirect

#### For `elevateforhumanity.org`:

1. Find `elevateforhumanity.org` in the domains list
2. Click the **⋯** (three dots) menu next to it
3. Click **Edit**
4. Change from **Production** to **Redirect to:**
5. Enter: `elevateforhumanity.institute`
6. Check **Permanent (301)** redirect
7. Click **Save**

#### For `www.elevateforhumanity.org`:

1. Find `www.elevateforhumanity.org` in the domains list
2. Click the **⋯** (three dots) menu next to it
3. Click **Edit**
4. Change from **Production** to **Redirect to:**
5. Enter: `elevateforhumanity.institute`
6. Check **Permanent (301)** redirect
7. Click **Save**

---

### Step 4: Verify Configuration

After changes, your domains should look like:

```
✅ elevateforhumanity.institute (Production)
✅ elevateforhumanity.org → elevateforhumanity.institute (Redirect)
✅ www.elevateforhumanity.org → elevateforhumanity.institute (Redirect)
✅ www.elevateforhumanity.institute → elevateforhumanity.institute (Redirect)
```

---

## Alternative: Remove .org Domain Entirely

If you don't want to manage the redirect in Vercel:

### Option A: Remove from Vercel

1. Go to **Settings** → **Domains**
2. Find `elevateforhumanity.org`
3. Click **⋯** → **Remove**
4. Confirm removal
5. Repeat for `www.elevateforhumanity.org`

Then configure redirect at DNS level (see `ORG_DOMAIN_REDIRECT_SETUP.md`)

### Option B: Keep in Vercel as Redirect (Recommended)

Keep the domain in Vercel but set to redirect (as described in Step 3 above).

**Benefits:**
- Vercel handles the redirect automatically
- 301 permanent redirect (good for SEO)
- No DNS configuration needed
- Redirect works immediately

---

## Verification

### Test the Redirect

#### Using curl:
```bash
# Test elevateforhumanity.org
curl -I https://elevateforhumanity.org/

# Should return:
HTTP/2 301
Location: https://elevateforhumanity.institute/

# Test www.elevateforhumanity.org
curl -I https://www.elevateforhumanity.org/

# Should return:
HTTP/2 301
Location: https://elevateforhumanity.institute/
```

#### Using browser:
1. Open **incognito/private window** (to avoid cache)
2. Go to: `https://elevateforhumanity.org/`
3. Should **automatically redirect** to: `https://elevateforhumanity.institute/`
4. Check URL bar - should show `.institute` not `.org`

#### Check Vercel Deployment:
1. Go to Vercel Dashboard → Your Project
2. Click **Deployments**
3. Click on latest deployment
4. Check **Domains** section
5. Should show:
   - `elevateforhumanity.institute` ✅
   - `elevateforhumanity.org` → Redirect ✅

---

## Clear Cache After Changes

### 1. Vercel Cache
Vercel automatically updates when you change domain settings.

### 2. Browser Cache
Users need to clear their browser cache:

```
Chrome: Ctrl+Shift+Delete
Firefox: Ctrl+Shift+Delete
Safari: Cmd+Option+E
```

Or use **incognito/private mode** for testing.

### 3. DNS Cache
May take up to 24 hours for DNS changes to propagate globally.

Force refresh:
```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
```

---

## Expected Behavior After Fix

### Before Fix:
```
User visits: elevateforhumanity.org
Result: Shows website content (WRONG - duplicate content)
URL bar: elevateforhumanity.org
```

### After Fix:
```
User visits: elevateforhumanity.org
Result: Automatically redirects (301)
URL bar: elevateforhumanity.institute (CORRECT)
```

---

## SEO Impact

### Current Issue:
- ❌ Duplicate content on two domains
- ❌ Split SEO authority between `.org` and `.institute`
- ❌ Confusing for search engines

### After Fix:
- ✅ Single canonical domain (`.institute`)
- ✅ 301 redirects preserve SEO value
- ✅ Search engines consolidate rankings to `.institute`
- ✅ No duplicate content penalty

---

## Screenshots Guide

### What You Should See in Vercel:

#### Before Fix:
```
Domains:
┌─────────────────────────────────────────────────────┐
│ elevateforhumanity.institute        [Production]    │
│ elevateforhumanity.org              [Production] ❌ │
│ www.elevateforhumanity.org          [Production] ❌ │
└─────────────────────────────────────────────────────┘
```

#### After Fix:
```
Domains:
┌──────────────────────────────────────────────────────────────┐
│ elevateforhumanity.institute        [Production] ✅          │
│ elevateforhumanity.org              → .institute [Redirect] ✅│
│ www.elevateforhumanity.org          → .institute [Redirect] ✅│
│ www.elevateforhumanity.institute    → .institute [Redirect] ✅│
└──────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Issue: "Can't find Edit option"
**Solution:** Click the **⋯** (three dots) menu next to the domain

### Issue: "Redirect option not available"
**Solution:** You may need to remove and re-add the domain with redirect option

### Issue: "Still showing .org content after change"
**Solution:** 
1. Clear browser cache
2. Use incognito mode
3. Wait 5-10 minutes for Vercel to propagate changes

### Issue: "Getting SSL certificate error"
**Solution:** 
1. Vercel needs to provision SSL for redirect domains
2. Wait 10-15 minutes
3. If persists, remove and re-add domain

---

## Step-by-Step Visual Guide

### 1. Navigate to Domains
```
Vercel Dashboard → [Your Project] → Settings → Domains
```

### 2. Find .org Domain
```
Look for: elevateforhumanity.org
Status: Production (this is wrong)
```

### 3. Click Three Dots Menu
```
elevateforhumanity.org [Production] [⋯]
                                     ↑
                                  Click here
```

### 4. Select Edit
```
Menu options:
- Edit ← Click this
- Remove
- View DNS Records
```

### 5. Change to Redirect
```
Domain Configuration:
○ Production
● Redirect to: [elevateforhumanity.institute]
☑ Permanent (301)
```

### 6. Save Changes
```
[Cancel] [Save] ← Click Save
```

---

## Verification Checklist

After making changes, verify:

- [ ] `elevateforhumanity.org` shows "Redirect" in Vercel
- [ ] `www.elevateforhumanity.org` shows "Redirect" in Vercel
- [ ] `elevateforhumanity.institute` shows "Production" in Vercel
- [ ] curl test returns 301 redirect
- [ ] Browser test redirects to `.institute`
- [ ] URL bar shows `.institute` after redirect
- [ ] No SSL certificate errors
- [ ] Redirect works on mobile devices

---

## Timeline

### Immediate (0-5 minutes):
- Vercel processes domain configuration change
- Redirect becomes active

### Short-term (5-60 minutes):
- SSL certificates provisioned
- CDN cache updates
- Most users see redirect

### Medium-term (1-24 hours):
- DNS cache clears globally
- All users see redirect
- Search engines detect redirect

### Long-term (1-4 weeks):
- Search engines consolidate rankings
- `.org` URLs removed from search results
- All traffic flows through `.institute`

---

## Summary

### Current Problem:
- `.org` domain set as **Production** in Vercel
- Serves duplicate content
- Causes SEO issues

### Solution:
- Change `.org` to **Redirect** in Vercel
- Redirect to `.institute`
- Use 301 permanent redirect

### Steps:
1. Go to Vercel → Settings → Domains
2. Edit `elevateforhumanity.org`
3. Change from Production to Redirect
4. Enter `elevateforhumanity.institute`
5. Check Permanent (301)
6. Save

### Result:
- ✅ Single production domain (`.institute`)
- ✅ Automatic redirect from `.org`
- ✅ No duplicate content
- ✅ Better SEO

---

**Action Required:** Change domain configuration in Vercel Dashboard  
**Time Required:** 5 minutes  
**Impact:** Immediate (redirect active within minutes)  
**Priority:** 🔴 HIGH - Fix ASAP to resolve caching and SEO issues
