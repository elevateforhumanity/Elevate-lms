# Vercel Domain Cleanup Guide

## Current Situation

**Main domain:** www.elevateforhumanity.org ✅ Working  
**Apex domain:** elevateforhumanity.org → Redirects to www ✅ Correct  
**Preview URL:** elevate-lms-git-main-selfish2.vercel.app (401 - protected)  
**Repository:** github.com/elevateforhumanity/Elevate-lms  
**Branch:** main  

---

## Issue You're Seeing

You mentioned seeing "preview" URLs. This could be:
1. Multiple Vercel projects pointing to the same domain
2. Old preview deployments still cached
3. Google indexing old preview URLs
4. DNS propagation issues

---

## Step-by-Step Cleanup Process

### Step 1: Check Vercel Projects

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Look for ALL projects that might be using your domain
3. Check for:
   - `elevate-lms`
   - `Elevate-lms`
   - Any other project with "elevate" in the name

**What to look for:**
- Multiple projects with the same domain
- Old projects still connected
- Preview deployments

---

### Step 2: Audit Domain Connections

For EACH project you find:

1. Click on the project
2. Go to **Settings** → **Domains**
3. Check what domains are connected:
   - `www.elevateforhumanity.org`
   - `elevateforhumanity.org`
   - `*.vercel.app` URLs

**Expected:** Only ONE project should have your custom domain

---

### Step 3: Remove Duplicate Domains

If you find multiple projects with your domain:

**For each OLD/duplicate project:**
1. Go to Settings → Domains
2. Click the **⋯** (three dots) next to each domain
3. Click **Remove**
4. Confirm removal

**Remove these from old projects:**
- `www.elevateforhumanity.org`
- `elevateforhumanity.org`

---

### Step 4: Clean Up Current Project

**In your MAIN project (elevate-lms):**

1. Go to Settings → Domains
2. You should see:
   - `www.elevateforhumanity.org` (Production)
   - `elevateforhumanity.org` (Redirect to www)
   - `elevate-lms-git-main-selfish2.vercel.app` (Preview)

3. **Remove ALL domains:**
   - Click **⋯** next to `www.elevateforhumanity.org` → Remove
   - Click **⋯** next to `elevateforhumanity.org` → Remove
   - Leave the `.vercel.app` URLs (these are automatic)

4. **Wait 5 minutes** for DNS to propagate

---

### Step 5: Re-add Domains (Clean Slate)

**After waiting 5 minutes:**

1. Still in Settings → Domains
2. Click **Add Domain**
3. Enter: `www.elevateforhumanity.org`
4. Click **Add**
5. Vercel will verify DNS
6. Once verified, click **Add Domain** again
7. Enter: `elevateforhumanity.org`
8. Click **Add**
9. Set it to **Redirect to www.elevateforhumanity.org**

---

### Step 6: Verify Configuration

**Check these settings:**

1. **Production Branch:**
   - Go to Settings → Git
   - Ensure "Production Branch" is set to `main`

2. **Domain Configuration:**
   - `www.elevateforhumanity.org` → Production
   - `elevateforhumanity.org` → Redirect to www

3. **Preview Deployments:**
   - Go to Settings → Git
   - Check "Ignored Build Step" is NOT enabled
   - Check preview deployments are enabled for `main` branch

---

### Step 7: Force New Deployment

After re-adding domains:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** (three dots)
4. Click **Redeploy**
5. Select **Use existing Build Cache** (faster)
6. Click **Redeploy**

---

### Step 8: Clear Google's Cache

**After Vercel is clean:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property: `www.elevateforhumanity.org`
3. Go to **Removals** (left sidebar)
4. Click **New Request**
5. Select **Temporarily remove URL**
6. Enter old preview URLs if you see them:
   - `elevate-lms-git-main-selfish2.vercel.app`
   - Any other `.vercel.app` URLs

7. Go to **URL Inspection**
8. Test your main URLs:
   - `https://www.elevateforhumanity.org/`
   - `https://www.elevateforhumanity.org/about`
9. Click **Request Indexing** for each

---

## Common Issues & Solutions

### Issue 1: "Domain is already in use"

**Cause:** Domain is connected to another project  
**Fix:**
1. Find the other project
2. Remove domain from that project first
3. Then add to correct project

### Issue 2: "DNS verification failed"

**Cause:** DNS records not pointing to Vercel  
**Fix:**
1. Check your DNS provider (Cloudflare, GoDaddy, etc.)
2. Ensure A record points to Vercel's IP: `76.76.21.21`
3. Ensure CNAME for www points to `cname.vercel-dns.com`
4. Wait 5-10 minutes for propagation

### Issue 3: "Still seeing preview URLs"

**Cause:** Google has cached old URLs  
**Fix:**
1. Request removal in GSC (see Step 8)
2. Wait 24-48 hours for Google to update
3. Request reindexing for main URLs

### Issue 4: "Multiple projects found"

**Cause:** You created multiple Vercel projects  
**Fix:**
1. Keep only ONE project
2. Delete other projects:
   - Go to Settings → Advanced
   - Scroll to bottom
   - Click **Delete Project**
3. Confirm deletion

---

## Verification Commands

After cleanup, run these to verify:

```bash
# Check main domain
curl -sI https://www.elevateforhumanity.org/ | grep -E "HTTP|x-vercel-id"

# Check apex redirect
curl -sI https://elevateforhumanity.org/ | grep -E "HTTP|location"

# Check canonical tag
curl -s https://www.elevateforhumanity.org/ | grep -o '<link[^>]*canonical[^>]*>'
```

**Expected results:**
1. Main domain: HTTP/2 200
2. Apex: HTTP/2 308 → location: https://www.elevateforhumanity.org/
3. Canonical: `<link rel="canonical" href="https://www.elevateforhumanity.org"/>`

---

## What to Check in Vercel Dashboard

### Projects Tab:
- [ ] Only ONE project for elevateforhumanity.org
- [ ] No duplicate projects
- [ ] No old/archived projects with your domain

### Domains (in your project):
- [ ] `www.elevateforhumanity.org` → Production
- [ ] `elevateforhumanity.org` → Redirect to www
- [ ] No other custom domains
- [ ] `.vercel.app` URLs are fine (automatic)

### Git Settings:
- [ ] Production Branch: `main`
- [ ] Connected to: `github.com/elevateforhumanity/Elevate-lms`
- [ ] Auto-deploy enabled

### Deployments:
- [ ] Latest deployment is from `main` branch
- [ ] Status: Ready
- [ ] Domains show `www.elevateforhumanity.org`

---

## Timeline

**Immediate (0-5 minutes):**
- Remove old domains
- Re-add domains

**Short-term (5-30 minutes):**
- DNS propagation
- Vercel verification
- New deployment

**Medium-term (1-24 hours):**
- CDN cache clears
- All users see new version

**Long-term (1-7 days):**
- Google recrawls
- Old preview URLs removed from search
- GSC updates

---

## Red Flags to Look For

### In Vercel Dashboard:

❌ **Multiple projects with same domain**
- Should be: ONE project only

❌ **Domain shows "Pending" or "Error"**
- Should be: "Ready" or "Active"

❌ **Multiple production branches**
- Should be: Only `main` branch

❌ **Old deployments still active**
- Should be: Latest deployment from `main`

### In Google Search Console:

❌ **Multiple properties for same domain**
- Should be: ONE property for www.elevateforhumanity.org

❌ **Preview URLs indexed**
- Should be: Only custom domain URLs

❌ **Duplicate canonicals**
- Should be: ONE canonical per page

---

## After Cleanup Checklist

- [ ] Only ONE Vercel project exists
- [ ] Only TWO domains connected (www + apex)
- [ ] Apex redirects to www
- [ ] Latest deployment is live
- [ ] Main domain returns 200
- [ ] Canonical tags are correct
- [ ] No preview URLs in production
- [ ] GSC shows correct URLs
- [ ] Requested reindexing for main pages

---

## Need Help?

If you're stuck:

1. **Check Vercel Dashboard:**
   - Projects → Count how many projects you have
   - Each project → Settings → Domains → List all domains

2. **Share this info:**
   - How many projects do you see?
   - What domains are connected to each?
   - Any error messages?

3. **I can help you:**
   - Identify which project to keep
   - Which domains to remove
   - How to clean up properly

---

## Current Status

Based on my check:
- ✅ Main domain working
- ✅ Apex redirecting correctly
- ✅ Latest code deployed
- ⚠️ Need to verify: Only one project in Vercel
- ⚠️ Need to verify: No duplicate domains

**Next step:** Go to Vercel Dashboard and count how many projects you have with "elevate" in the name.
