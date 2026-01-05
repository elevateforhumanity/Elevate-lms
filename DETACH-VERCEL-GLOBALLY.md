# Detach Vercel Globally - Complete Guide

## Current Configuration

**Project ID:** `prj_seueFKbZmDqBeYU5bX38zeJvS635`  
**Project Name:** `elevate-lms`  
**Org ID:** `team_WQBvQqmFZ4Xiiek5ScbG7eph`  
**Repository:** `github.com/elevateforhumanity/Elevate-lms`

---

## Option 1: Detach via Vercel Dashboard (RECOMMENDED)

### Step 1: Remove All Domains

1. Go to https://vercel.com/dashboard
2. Find project: `elevate-lms`
3. Click on it
4. Go to **Settings** → **Domains**
5. For EACH domain listed:
   - Click **⋯** (three dots)
   - Click **Remove**
   - Confirm

**Remove these:**
- `www.elevateforhumanity.org`
- `elevateforhumanity.org`
- Any other custom domains

**Leave these:**
- `*.vercel.app` URLs (automatic, can't remove)

### Step 2: Disconnect GitHub Integration

1. Still in project settings
2. Go to **Git** section
3. Click **Disconnect** next to GitHub
4. Confirm disconnection

### Step 3: Delete the Project

1. Still in settings
2. Scroll to **Advanced** section
3. Scroll to bottom
4. Find **Delete Project**
5. Click **Delete Project**
6. Type project name: `elevate-lms`
7. Click **Delete**

---

## Option 2: Detach via CLI (ALTERNATIVE)

### Step 1: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 2: List All Projects

```bash
vercel projects ls
```

This shows all projects in your account.

### Step 3: Remove Domains from Project

```bash
# Remove www domain
vercel domains rm www.elevateforhumanity.org --yes

# Remove apex domain
vercel domains rm elevateforhumanity.org --yes
```

### Step 4: Delete the Project

```bash
vercel remove elevate-lms --yes
```

Or with project ID:

```bash
vercel remove prj_seueFKbZmDqBeYU5bX38zeJvS635 --yes
```

---

## Option 3: Complete Nuclear Option (FULL RESET)

### Step 1: Remove Local Vercel Configuration

```bash
# Remove Vercel directory
rm -rf .vercel/

# Remove Vercel config file (optional - you might want to keep this)
# rm vercel.json
```

### Step 2: Unlink from Vercel

```bash
vercel unlink
```

### Step 3: Delete Project via Dashboard

Follow Option 1, Step 3 above.

---

## After Detaching - Clean Slate Setup

### Step 1: Verify Everything is Detached

```bash
# Check local config
ls -la .vercel/
# Should show: No such file or directory

# Check vercel projects
vercel projects ls
# Should NOT show: elevate-lms
```

### Step 2: Remove from GitHub Integration

1. Go to https://github.com/elevateforhumanity/Elevate-lms/settings/installations
2. Find **Vercel** integration
3. Click **Configure**
4. Either:
   - Remove this repository from Vercel access
   - Or completely uninstall Vercel integration

### Step 3: Clean Up DNS (Important!)

**In your DNS provider (GoDaddy, Cloudflare, etc.):**

1. Find DNS settings for `elevateforhumanity.org`
2. Remove or update these records:
   - A record pointing to `76.76.21.21` (Vercel)
   - CNAME for `www` pointing to `cname.vercel-dns.com`

**Don't delete them yet if you want to reconnect later!**

---

## Re-attach Fresh (After Detaching)

### Step 1: Create New Vercel Project

```bash
# In your project directory
vercel
```

Follow prompts:
- Link to existing project? **No**
- What's your project's name? `elevate-lms` (or new name)
- In which directory is your code located? `./`
- Want to override settings? **No**

### Step 2: Add Domains

```bash
# Add www domain
vercel domains add www.elevateforhumanity.org

# Add apex domain (with redirect)
vercel domains add elevateforhumanity.org
# When prompted: Redirect to www? Yes
```

### Step 3: Deploy

```bash
vercel --prod
```

---

## Global Detach Checklist

### In Vercel:
- [ ] All domains removed from project
- [ ] GitHub integration disconnected
- [ ] Project deleted
- [ ] No projects show in dashboard

### In GitHub:
- [ ] Vercel integration removed from repo
- [ ] Or Vercel completely uninstalled

### Locally:
- [ ] `.vercel/` directory removed
- [ ] Project unlinked

### In DNS:
- [ ] Vercel DNS records removed (optional)
- [ ] Or ready to update for new project

### In Google Search Console:
- [ ] Old Vercel URLs removed
- [ ] Ready for new domain setup

---

## Verification Commands

### Check Local Status:
```bash
# Should show: No such file or directory
ls .vercel/

# Should show: Not linked
vercel whoami
```

### Check Domain Status:
```bash
# Should NOT resolve to Vercel
curl -sI https://www.elevateforhumanity.org/ | grep "server"
# Should NOT show: server: Vercel
```

### Check GitHub:
```bash
# Check if Vercel is still integrated
gh api repos/elevateforhumanity/Elevate-lms/hooks
# Should NOT show Vercel webhook
```

---

## What Happens After Detaching

**Immediate:**
- ✅ Domains no longer point to Vercel
- ✅ Project no longer auto-deploys
- ✅ Vercel URLs (*.vercel.app) become inactive
- ⚠️ Your site will be DOWN until you reconnect

**Within 1 hour:**
- ✅ DNS propagates
- ✅ CDN cache clears
- ✅ All Vercel infrastructure released

**Within 24 hours:**
- ✅ Google stops crawling old Vercel URLs
- ✅ DNS fully propagated worldwide

---

## Important Warnings

⚠️ **Your site will go down** when you detach domains  
⚠️ **Have a plan to reconnect** before detaching  
⚠️ **Backup environment variables** before deleting project  
⚠️ **Document DNS settings** before changing them  
⚠️ **Plan for downtime** during the transition  

---

## Recommended Approach

### Best Practice: Detach and Reconnect Same Day

**Morning (30 minutes):**
1. Backup env vars
2. Document DNS settings
3. Detach everything (Option 1)

**Afternoon (30 minutes):**
4. Create new project
5. Add domains
6. Deploy fresh

**Total downtime:** 1-2 hours

### Alternative: Parallel Setup

1. Create NEW Vercel project first
2. Deploy to temporary domain
3. Test everything works
4. Switch DNS to new project
5. Delete old project

**Total downtime:** 5-10 minutes (DNS switch only)

---

## Need Help?

**Before you detach, answer these:**

1. Do you want to reconnect immediately?
2. Do you have env vars backed up?
3. Do you have DNS settings documented?
4. Can you afford 1-2 hours downtime?

**If yes to all:** Proceed with Option 1  
**If no to any:** Let's plan the transition first

---

## Quick Commands Summary

```bash
# Option 1: Via Dashboard (Recommended)
# Go to vercel.com/dashboard → Settings → Delete Project

# Option 2: Via CLI
vercel login
vercel domains rm www.elevateforhumanity.org --yes
vercel domains rm elevateforhumanity.org --yes
vercel remove elevate-lms --yes

# Option 3: Nuclear
rm -rf .vercel/
vercel unlink
# Then delete via dashboard

# Verify detached
ls .vercel/  # Should not exist
vercel projects ls  # Should not show elevate-lms
```

---

## Ready to Detach?

**Choose your option:**
- **Option 1:** Dashboard (easiest, most visual)
- **Option 2:** CLI (fastest, for power users)
- **Option 3:** Nuclear (complete reset)

**Then follow the steps above.**

Let me know which option you want to use and I'll guide you through it step by step!
