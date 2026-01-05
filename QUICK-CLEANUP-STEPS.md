# Quick Cleanup Steps - Do This Now

## Step 1: Check Vercel Projects (2 minutes)

1. Go to https://vercel.com/dashboard
2. Count how many projects you see
3. Look for projects with "elevate" in the name
4. Write down:
   - Project names
   - Which ones have your domain

---

## Step 2: Remove Domains from ALL Projects (5 minutes)

**For EACH project you found:**

1. Click on project name
2. Go to **Settings** → **Domains**
3. For each domain listed:
   - Click **⋯** (three dots)
   - Click **Remove**
   - Confirm

**Remove these from ALL projects:**
- `www.elevateforhumanity.org`
- `elevateforhumanity.org`

---

## Step 3: Wait 5 Minutes

Let DNS propagate and Vercel clear its cache.

---

## Step 4: Re-add Domains to ONE Project (3 minutes)

**Choose your MAIN project** (probably `elevate-lms` or `Elevate-lms`)

1. Go to Settings → Domains
2. Click **Add Domain**
3. Type: `www.elevateforhumanity.org`
4. Click **Add**
5. Wait for verification
6. Click **Add Domain** again
7. Type: `elevateforhumanity.org`
8. Click **Add**
9. Select: **Redirect to www.elevateforhumanity.org**

---

## Step 5: Redeploy (2 minutes)

1. Go to **Deployments** tab
2. Find latest deployment
3. Click **⋯** → **Redeploy**
4. Click **Redeploy** to confirm

---

## Step 6: Verify (1 minute)

Run this command:

```bash
curl -sI https://www.elevateforhumanity.org/ | grep "HTTP"
```

**Expected:** `HTTP/2 200`

---

## Total Time: 15-20 minutes

---

## What This Does

1. **Removes all domain connections** - Clean slate
2. **Waits for DNS** - Ensures no conflicts
3. **Re-adds domains properly** - One project only
4. **Redeploys** - Fresh deployment
5. **Verifies** - Confirms it's working

---

## After This

- No more preview URLs in production
- Clean domain configuration
- One project, one domain
- Ready for Google to recrawl

---

## Questions to Answer

Before you start, tell me:

1. **How many Vercel projects do you see?**
2. **What are their names?**
3. **Which one is the main project?**

This will help me guide you through the cleanup.
