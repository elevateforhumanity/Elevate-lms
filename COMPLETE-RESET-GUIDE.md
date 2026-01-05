# Complete Reset Guide - Clean Slate

## Goal

1. Delete ALL Vercel projects
2. Create ONE new project from scratch
3. Connect domain properly: elevateforhumanity.org → www.elevateforhumanity.org
4. Remove ALL old URLs from Google Search Console
5. Fresh start with clean configuration

---

## PHASE 1: Delete Everything in Vercel (10 minutes)

### Step 1: List All Projects

1. Go to https://vercel.com/dashboard
2. Write down EVERY project you see
3. Note which ones have "elevate" in the name

### Step 2: Delete Each Project

**For EACH project:**

1. Click on project name
2. Go to **Settings** (bottom left)
3. Scroll to **Advanced** section
4. Scroll to bottom
5. Find **Delete Project**
6. Click **Delete Project**
7. Type the project name to confirm
8. Click **Delete**

**Delete ALL projects related to elevateforhumanity.org**

### Step 3: Verify All Deleted

1. Go back to dashboard
2. Confirm: NO projects with "elevate" in name
3. Clean slate ✅

---

## PHASE 2: Create New Project (5 minutes)

### Step 1: Import from GitHub

1. On Vercel dashboard, click **Add New** → **Project**
2. Find your GitHub repository: `elevateforhumanity/Elevate-lms`
3. Click **Import**

### Step 2: Configure Project

**Project Settings:**
- **Project Name:** `elevate-lms` (or whatever you prefer)
- **Framework Preset:** Next.js (should auto-detect)
- **Root Directory:** `./` (leave as default)
- **Build Command:** Leave default
- **Output Directory:** Leave default

**Environment Variables:**
- Add any required env vars (Supabase, etc.)
- Copy from your `.env.local` if needed

### Step 3: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for first deployment
3. Should see "Congratulations" when done

---

## PHASE 3: Connect Domain Properly (10 minutes)

### Step 1: Add WWW Domain First

1. In your new project, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `www.elevateforhumanity.org`
4. Click **Add**

**Vercel will check DNS:**
- If DNS is correct: ✅ Domain added
- If DNS needs update: Follow Vercel's instructions

### Step 2: Add Apex Domain (Redirect)

1. Click **Add Domain** again
2. Enter: `elevateforhumanity.org` (no www)
3. Click **Add**
4. Vercel will ask: "Redirect to www?"
5. Select: **Yes, redirect to www.elevateforhumanity.org**
6. Click **Add**

### Step 3: Verify Configuration

You should now see:
- ✅ `www.elevateforhumanity.org` → Production
- ✅ `elevateforhumanity.org` → Redirect to www
- ✅ `elevate-lms.vercel.app` → Automatic preview URL

---

## PHASE 4: Configure DNS (If Needed)

**Only do this if Vercel says DNS is incorrect**

### For Apex Domain (elevateforhumanity.org):

**Option A: A Record (Recommended)**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `Auto` or `3600`

**Option B: CNAME (Alternative)**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`
- TTL: `Auto` or `3600`

### For WWW Subdomain (www.elevateforhumanity.org):

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `Auto` or `3600`

**Where to do this:**
- Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
- Find DNS settings
- Update records as above
- Wait 5-10 minutes for propagation

---

## PHASE 5: Clean Up Google Search Console (15 minutes)

### Step 1: Remove Old Properties (If Any)

1. Go to https://search.google.com/search-console
2. Click property dropdown (top left)
3. If you see multiple properties for elevateforhumanity.org:
   - Click **Settings** (gear icon)
   - Scroll to bottom
   - Click **Remove property**
   - Confirm removal
4. Keep only: `www.elevateforhumanity.org`

### Step 2: Remove Old URLs

1. In GSC, go to **Removals** (left sidebar)
2. Click **New Request**
3. Select **Temporarily remove URL**
4. Enter old Vercel preview URLs:
   - `https://elevate-lms-git-main-selfish2.vercel.app`
   - Any other `.vercel.app` URLs you see
5. Click **Next** → **Submit Request**

### Step 3: Submit Clean Sitemap

1. Go to **Sitemaps** (left sidebar)
2. Remove any old sitemaps
3. Add new sitemap: `https://www.elevateforhumanity.org/sitemap.xml`
4. Click **Submit**

### Step 4: Request Reindexing

1. Go to **URL Inspection** (top)
2. Enter: `https://www.elevateforhumanity.org/`
3. Click **Test Live URL**
4. Wait for test to complete
5. Click **Request Indexing**
6. Repeat for key pages:
   - `/about`
   - `/programs`
   - `/apply`
   - `/founder`

---

## PHASE 6: Verify Everything (5 minutes)

### Test 1: Main Domain

```bash
curl -sI https://www.elevateforhumanity.org/ | grep "HTTP"
```

**Expected:** `HTTP/2 200`

### Test 2: Apex Redirect

```bash
curl -sI https://elevateforhumanity.org/ | grep -E "HTTP|location"
```

**Expected:**
```
HTTP/2 308
location: https://www.elevateforhumanity.org/
```

### Test 3: Canonical Tag

```bash
curl -s https://www.elevateforhumanity.org/ | grep -o '<link[^>]*canonical[^>]*>'
```

**Expected:**
```html
<link rel="canonical" href="https://www.elevateforhumanity.org"/>
```

### Test 4: No Duplicate Canonical

```bash
curl -s https://www.elevateforhumanity.org/ | grep -o '<link[^>]*canonical[^>]*>' | wc -l
```

**Expected:** `1` (only one canonical tag)

---

## PHASE 7: Final Configuration (5 minutes)

### In Vercel Project Settings:

1. **Git Settings:**
   - Production Branch: `main` ✅
   - Auto-deploy: Enabled ✅

2. **Build & Development:**
   - Framework: Next.js ✅
   - Node Version: 20.x ✅

3. **Environment Variables:**
   - Add all required vars ✅

4. **Domains:**
   - www.elevateforhumanity.org → Production ✅
   - elevateforhumanity.org → Redirect ✅

---

## Complete Checklist

### Vercel:
- [ ] All old projects deleted
- [ ] New project created from GitHub
- [ ] www.elevateforhumanity.org connected
- [ ] elevateforhumanity.org redirects to www
- [ ] Latest deployment successful
- [ ] Environment variables configured

### DNS:
- [ ] A record for apex → 76.76.21.21
- [ ] CNAME for www → cname.vercel-dns.com
- [ ] DNS propagated (wait 5-10 minutes)

### Google Search Console:
- [ ] Only ONE property (www.elevateforhumanity.org)
- [ ] Old preview URLs removed
- [ ] Clean sitemap submitted
- [ ] Key pages reindexed

### Verification:
- [ ] www domain returns 200
- [ ] Apex redirects to www (308)
- [ ] Only 1 canonical tag per page
- [ ] No preview URLs visible
- [ ] Latest code deployed

---

## Timeline

**Total time:** 45-60 minutes

- Phase 1 (Delete): 10 minutes
- Phase 2 (Create): 5 minutes
- Phase 3 (Domain): 10 minutes
- Phase 4 (DNS): 5 minutes (if needed)
- Phase 5 (GSC): 15 minutes
- Phase 6 (Verify): 5 minutes
- Phase 7 (Config): 5 minutes

---

## What This Achieves

✅ **Clean slate** - No old projects or configurations  
✅ **Single source of truth** - One project, one domain  
✅ **Proper redirect** - Apex → www  
✅ **Clean Google index** - No preview URLs  
✅ **Fresh deployment** - Latest code  
✅ **Correct canonicals** - No duplicates  

---

## After Reset

**Immediate (0-1 hour):**
- New deployment live
- Domain working
- Redirects working

**Short-term (1-24 hours):**
- DNS fully propagated
- CDN cache cleared
- All users see new version

**Medium-term (1-7 days):**
- Google recrawls site
- Old URLs removed from search
- GSC updates with new data

**Long-term (2-4 weeks):**
- "Duplicate canonical" issues resolved
- Indexing improves
- Better search visibility

---

## Need Help?

If you get stuck at any step:

1. **Take a screenshot** of the error
2. **Note which phase** you're on
3. **Tell me what happened**
4. I'll help you fix it

---

## Ready to Start?

**Before you begin:**

1. Make sure you have:
   - [ ] Vercel account access
   - [ ] GitHub repository access
   - [ ] Domain registrar access (for DNS)
   - [ ] Google Search Console access
   - [ ] 45-60 minutes of uninterrupted time

2. **Backup check:**
   - [ ] Latest code is committed to GitHub
   - [ ] Environment variables documented
   - [ ] No pending changes

3. **Start with Phase 1** and work through each phase in order.

---

## Important Notes

⚠️ **During the reset:**
- Your site will be down for 5-10 minutes
- Plan for low-traffic time
- Have env vars ready to re-enter

⚠️ **DNS propagation:**
- Can take 5 minutes to 24 hours
- Usually 5-10 minutes
- Be patient

⚠️ **Google recrawl:**
- Takes 1-7 days
- Request reindexing to speed up
- Monitor GSC for progress

---

**Let's do this! Start with Phase 1 and let me know when you're ready for the next phase.**
