# Nuclear Delete - Complete Vercel Removal

## ⚠️ WARNING: This Will Delete EVERYTHING

This will:
- ❌ Delete ALL Vercel projects
- ❌ Remove ALL domains
- ❌ Disconnect ALL integrations
- ❌ Remove ALL deployments
- ❌ Your site WILL GO DOWN

**Estimated downtime:** 1-2 hours minimum

---

## Backed Up Information

**Project Details:**
- Project ID: `prj_seueFKbZmDqBeYU5bX38zeJvS635`
- Team ID: `team_WQBvQqmFZ4Xiiek5ScbG7eph`
- Project Name: `elevate-lms`

**Environment Variables:**
```
DATABASE_URL="postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08$$$@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET="sMhipqoeyeakArundXdu"
NEXTAUTH_URL="https://www.elevateforhumanity.org"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-SWPG2HVYVH"
```

**Files Backed Up:**
- ✅ vercel.json → vercel.json.backup

---

## Method 1: Vercel Dashboard Mass Delete (RECOMMENDED)

### Step 1: Go to Team Settings

1. Go to https://vercel.com/teams/team_WQBvQqmFZ4Xiiek5ScbG7eph/settings
2. Or: Dashboard → Click team name (top left) → Settings

### Step 2: View All Projects

1. Go to https://vercel.com/dashboard
2. You should see ALL projects in your team

### Step 3: Delete Each Project

**For EVERY project you see:**

1. Click project name
2. Settings → Advanced → Delete Project
3. Type project name
4. Click Delete

**Repeat until NO projects remain**

### Step 4: Remove GitHub Integration

1. Go to https://vercel.com/dashboard/integrations
2. Find **GitHub**
3. Click **Manage**
4. Click **Remove Integration**
5. Confirm removal

### Step 5: Remove All Domains

1. Go to https://vercel.com/dashboard/domains
2. For each domain:
   - Click domain
   - Click **Remove**
   - Confirm

---

## Method 2: Vercel CLI Mass Delete

### Step 1: Login

```bash
vercel login
```

Follow the authentication prompts.

### Step 2: List All Projects

```bash
vercel projects ls
```

Copy all project names/IDs.

### Step 3: Delete All Projects

```bash
# Delete by name
vercel remove elevate-lms --yes

# Or delete by ID
vercel remove prj_seueFKbZmDqBeYU5bX38zeJvS635 --yes

# Repeat for ALL projects shown in step 2
```

### Step 4: Remove All Domains

```bash
# List all domains
vercel domains ls

# Remove each domain
vercel domains rm www.elevateforhumanity.org --yes
vercel domains rm elevateforhumanity.org --yes

# Repeat for ALL domains
```

### Step 5: Logout

```bash
vercel logout
```

---

## Method 3: Vercel API Mass Delete (NUCLEAR)

### Step 1: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name: `mass-delete`
4. Scope: Full Access
5. Click **Create**
6. Copy the token (save it temporarily)

### Step 2: List All Projects

```bash
# Replace YOUR_TOKEN with actual token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.vercel.com/v9/projects?teamId=team_WQBvQqmFZ4Xiiek5ScbG7eph"
```

This returns JSON with all projects.

### Step 3: Delete All Projects

```bash
# Delete specific project
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.vercel.com/v9/projects/prj_seueFKbZmDqBeYU5bX38zeJvS635?teamId=team_WQBvQqmFZ4Xiiek5ScbG7eph"

# Repeat for each project ID from step 2
```

### Step 4: Remove All Domains

```bash
# List domains
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.vercel.com/v5/domains?teamId=team_WQBvQqmFZ4Xiiek5ScbG7eph"

# Delete each domain
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.vercel.com/v5/domains/www.elevateforhumanity.org?teamId=team_WQBvQqmFZ4Xiiek5ScbG7eph"

curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.vercel.com/v5/domains/elevateforhumanity.org?teamId=team_WQBvQqmFZ4Xiiek5ScbG7eph"
```

### Step 5: Delete Token

1. Go back to https://vercel.com/account/tokens
2. Find the token you created
3. Click **Delete**

---

## Method 4: Complete Account Deletion (EXTREME NUCLEAR)

### ⚠️ THIS DELETES YOUR ENTIRE VERCEL ACCOUNT

1. Go to https://vercel.com/account
2. Scroll to bottom
3. Find **Delete Account**
4. Click **Delete Personal Account**
5. Type your username to confirm
6. Click **Delete**

**This removes:**
- ❌ ALL projects
- ❌ ALL domains
- ❌ ALL deployments
- ❌ ALL teams
- ❌ ALL integrations
- ❌ Your entire Vercel account

---

## Local Cleanup

### After deleting from Vercel:

```bash
# Remove Vercel directory
rm -rf .vercel/

# Remove Vercel cache
rm -rf .next/

# Remove node modules (optional, for clean reinstall)
rm -rf node_modules/

# Reinstall (if you removed node_modules)
pnpm install
```

---

## GitHub Cleanup

### Remove Vercel Integration

1. Go to https://github.com/settings/installations
2. Find **Vercel**
3. Click **Configure**
4. Scroll to bottom
5. Click **Uninstall**
6. Confirm

### Remove Vercel Webhook (if exists)

1. Go to https://github.com/elevateforhumanity/Elevate-lms/settings/hooks
2. Find Vercel webhook
3. Click **Delete**
4. Confirm

---

## DNS Cleanup

### Remove Vercel DNS Records

**In your DNS provider (GoDaddy, Cloudflare, etc.):**

1. Find DNS settings for `elevateforhumanity.org`
2. Delete these records:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

**⚠️ Your site will be completely down after this**

---

## Google Search Console Cleanup

### Remove All Vercel URLs

1. Go to https://search.google.com/search-console
2. Go to **Removals**
3. Click **New Request**
4. Enter each Vercel URL:
   - `https://elevate-lms.vercel.app`
   - `https://elevate-lms-git-main-selfish2.vercel.app`
   - Any other `.vercel.app` URLs
5. Click **Submit**

### Remove Old Sitemaps

1. Go to **Sitemaps**
2. Delete all existing sitemaps
3. Wait for new setup to submit fresh sitemap

---

## Verification - Everything Deleted

### Check Vercel:
```bash
vercel projects ls
# Should show: No projects found
```

### Check Local:
```bash
ls .vercel/
# Should show: No such file or directory
```

### Check Domain:
```bash
curl -sI https://www.elevateforhumanity.org/
# Should show: Connection refused or timeout
```

### Check GitHub:
```bash
gh api repos/elevateforhumanity/Elevate-lms/hooks
# Should NOT show Vercel webhook
```

---

## After Complete Deletion

**Your site is now:**
- ❌ Completely offline
- ❌ No Vercel projects
- ❌ No Vercel domains
- ❌ No Vercel deployments
- ❌ No Vercel integrations

**To bring it back online, you need to:**
1. Choose new hosting (Vercel again, or different)
2. Deploy fresh
3. Connect domain
4. Configure DNS
5. Update Google Search Console

---

## Recommended: Which Method to Use?

### Use Method 1 (Dashboard) if:
- ✅ You want visual confirmation
- ✅ You're not comfortable with CLI
- ✅ You want to be careful

### Use Method 2 (CLI) if:
- ✅ You're comfortable with terminal
- ✅ You want it done faster
- ✅ You have many projects to delete

### Use Method 3 (API) if:
- ✅ You have 10+ projects
- ✅ You want to script it
- ✅ You're technical

### Use Method 4 (Account Delete) if:
- ✅ You want to completely leave Vercel
- ✅ You're switching to different hosting
- ✅ You want absolute clean slate

---

## My Recommendation

**For your situation, I recommend Method 1 (Dashboard):**

1. It's visual and clear
2. You can see exactly what you're deleting
3. Less chance of mistakes
4. Can pause if needed

**Time:** 10-15 minutes  
**Risk:** Low (you control each step)  
**Downtime:** Starts immediately when you delete project

---

## Ready to Execute?

**Before you start:**

1. ✅ Environment variables backed up
2. ✅ vercel.json backed up
3. ✅ You understand site will go down
4. ✅ You have plan to bring it back up
5. ✅ You have 1-2 hours for full process

**Which method do you want to use?**
- Method 1: Dashboard (recommended)
- Method 2: CLI
- Method 3: API
- Method 4: Account deletion

**Tell me which one and I'll guide you through it step by step.**
