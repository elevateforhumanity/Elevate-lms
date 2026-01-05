# Disconnect Old Vercel Projects - Step-by-Step Guide

## Goal
Ensure only ONE Vercel project points to elevateforhumanity.org domain.

## Time Required
5-10 minutes

## Prerequisites
- Access to Vercel dashboard
- Know which project should be the ONLY production project

---

## Step 1: Identify Current Production Project

### 1.1 Check Current Deployment

```bash
# Run this command to see current deployment ID
curl -sI https://www.elevateforhumanity.org | grep x-vercel-id
```

**Example output:**
```
x-vercel-id: iad1::iad1::6b9dh-1767625699869-37bb8091ec14
```

**Note the deployment ID** - this tells you which project is currently serving the domain.

### 1.2 Identify Repository

Your production project should be connected to:
- **Repository:** https://github.com/elevateforhumanity/Elevate-lms
- **Branch:** main

---

## Step 2: Log Into Vercel Dashboard

### 2.1 Access Dashboard

1. Go to: https://vercel.com/dashboard
2. Log in with your account
3. You should see a list of all your projects

### 2.2 Identify All Projects

Look for projects with names like:
- `elevate-lms` (current)
- `elevate-lms-old` (old)
- `elevateforhumanity` (old)
- `Elevate-lms-v2` (old)
- Any other project that might have the domain

**Write down all project names** that could have the domain attached.

---

## Step 3: Check Each Project for Domain

For EACH project you identified:

### 3.1 Open Project Settings

1. Click on project name
2. Click "Settings" tab (top navigation)
3. Click "Domains" in left sidebar

### 3.2 Look for Your Domain

Check if you see:
- `elevateforhumanity.org`
- `www.elevateforhumanity.org`

### 3.3 Document Findings

Create a list like this:

```
✅ elevate-lms (KEEP - Current Production)
   - www.elevateforhumanity.org
   - elevateforhumanity.org

❌ elevate-lms-old (REMOVE)
   - www.elevateforhumanity.org  ← REMOVE THIS
   - elevateforhumanity.org      ← REMOVE THIS

❌ test-deployment (REMOVE)
   - www.elevateforhumanity.org  ← REMOVE THIS
```

---

## Step 4: Remove Domain from Old Projects

For EACH project marked with ❌ (not your current production):

### 4.1 Navigate to Domains

1. Click on the OLD project
2. Go to: Settings → Domains

### 4.2 Remove Each Domain

For `www.elevateforhumanity.org`:

1. Find the domain in the list
2. Click the **three dots (⋮)** on the right side
3. Click **"Remove Domain"**
4. Confirm by clicking **"Remove"** in the popup

Repeat for `elevateforhumanity.org` if present.

### 4.3 Verify Removal

After removing:
- Domain should disappear from the list
- You should see a success message
- Refresh the page to confirm it's gone

### 4.4 Repeat for All Old Projects

Go through EVERY old project and remove the domain.

---

## Step 5: Verify Only One Project Has Domain

### 5.1 Check Production Project

1. Go to your CURRENT production project (elevate-lms)
2. Navigate to: Settings → Domains
3. You should see:
   ```
   ✅ www.elevateforhumanity.org (Primary)
   ✅ elevateforhumanity.org (Redirects to www)
   ```

### 5.2 Check All Other Projects

1. Go through each old project again
2. Verify Settings → Domains shows NO elevateforhumanity.org domains
3. They should only show *.vercel.app preview URLs

### 5.3 Test Domain Resolution

```bash
# Run this multiple times and verify x-vercel-id is consistent
curl -sI https://www.elevateforhumanity.org | grep x-vercel-id
curl -sI https://www.elevateforhumanity.org | grep x-vercel-id
curl -sI https://www.elevateforhumanity.org | grep x-vercel-id
```

**Expected:** Same x-vercel-id every time  
**Problem:** Different IDs = multiple projects still serving domain

---

## Step 6: Clean Up Old Projects (Optional)

If old projects are no longer needed:

### 6.1 Delete Old Projects

For each old project:

1. Go to: Settings → General
2. Scroll to bottom: "Delete Project"
3. Type project name to confirm
4. Click "Delete"

**⚠️ Warning:** This is permanent. Only delete if you're sure.

### 6.2 Alternative: Archive Projects

If you want to keep them for reference:

1. Keep the projects but ensure domains are removed
2. Disable deployments: Settings → Git → Unlink repository
3. This prevents accidental deployments

---

## Step 7: Verify GitHub Integration

### 7.1 Check GitHub Settings

1. Go to: https://github.com/settings/installations
2. Find "Vercel" in the list
3. Click "Configure"

### 7.2 Verify Repository Access

1. Check that Elevate-lms repository is listed
2. Verify only ONE Vercel integration exists
3. If you see multiple Vercel integrations, remove old ones

### 7.3 Check Repository Settings

1. Go to: https://github.com/elevateforhumanity/Elevate-lms/settings/hooks
2. Look for Vercel webhooks
3. Should see only ONE active webhook
4. Remove any duplicate or old webhooks

---

## Step 8: Test Deployment

### 8.1 Trigger New Deployment

```bash
# Make a small change and push
git commit --allow-empty -m "Test single project deployment"
git push origin main
```

### 8.2 Monitor Deployment

1. Go to Vercel dashboard
2. Watch for new deployment
3. Should see deployment ONLY in production project
4. Should NOT see deployments in old projects

### 8.3 Verify Live Site

```bash
# Check that site is live and serving correctly
curl -sI https://www.elevateforhumanity.org | head -10
```

---

## Troubleshooting

### Issue: Can't Remove Domain

**Error:** "Domain is in use by another project"

**Solution:**
1. Check if domain is set as primary in another project
2. Remove it from that project first
3. Then remove from current project

### Issue: Domain Still Resolving to Old Project

**Problem:** After removal, domain still shows old content

**Solution:**
1. Wait 5-10 minutes for DNS propagation
2. Clear browser cache
3. Try incognito/private browsing mode
4. Check x-vercel-id to verify which project is serving

### Issue: Multiple Vercel Accounts

**Problem:** Domain is in a different Vercel account you can't access

**Solution:**
1. See `BYPASS-OLD-ACCOUNT-SETUP.md` for DNS-based solution
2. Contact Vercel support to release domain
3. Provide proof of domain ownership (DNS records)

### Issue: Domain Locked

**Problem:** "This domain is locked and cannot be removed"

**Solution:**
1. Check if domain transfer is in progress
2. Wait for transfer to complete
3. Contact Vercel support if locked for unknown reason

---

## Verification Checklist

After completing all steps:

- [ ] Only ONE Vercel project shows elevateforhumanity.org domain
- [ ] All old projects have domain removed
- [ ] `curl` commands show consistent x-vercel-id
- [ ] Test deployment only triggers in production project
- [ ] GitHub has only ONE Vercel integration
- [ ] No duplicate webhooks in repository settings
- [ ] Site loads correctly at www.elevateforhumanity.org
- [ ] Apex domain redirects to www (HTTP 308)

---

## What Happens After Removal

### Immediate Effects (0-5 minutes)
- Domain stops resolving to old project
- Old project shows "Domain not found" if accessed
- Production project takes over all traffic

### Short Term (1-24 hours)
- DNS caches clear globally
- All traffic consistently routes to production project
- Old preview URLs (*.vercel.app) still work but don't affect domain

### Long Term (1-7 days)
- Google Search Console updates
- Old indexed URLs start dropping from search results
- Canonical tags take effect
- Duplicate content issues resolve

---

## Next Steps After Disconnection

1. **Clean Google Search Console:**
   - Remove all old sitemaps
   - Submit fresh sitemap
   - See: `GOOGLE-COMPLETE-RESET.md`

2. **Monitor Deployments:**
   - Watch for 48 hours
   - Ensure only production project deploys
   - Check for any errors

3. **Update DNS (if needed):**
   - If domain was in old account
   - Point DNS to new project
   - See: `BYPASS-OLD-ACCOUNT-SETUP.md`

---

## Summary

**Goal:** Ensure only ONE Vercel project serves elevateforhumanity.org  
**Method:** Remove domain from all old projects via Vercel dashboard  
**Time:** 5-10 minutes  
**Risk:** Low - changes are reversible  
**Impact:** Eliminates duplicate deployments and GSC conflicts

**Current Status:** Domain appears to be on single project (verified via curl)  
**Action Required:** Log into Vercel dashboard to confirm and remove from any old projects
