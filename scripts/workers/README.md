# Worker Scripts - Automated Task Execution

This directory contains worker scripts that automate various deployment and cleanup tasks.

---

## 🤖 Automated Scripts (No Manual Steps)

### `auto-cleanup-vercel.mjs`
**Fully automated Vercel duplicate project cleanup**

**What it does:**
- Connects to Vercel API
- Lists all projects
- Analyzes each project (scoring system)
- Automatically identifies which to keep
- Deletes duplicate projects
- Updates configuration files

**Usage:**
```bash
# Set your Vercel token
export VERCEL_TOKEN="your_token_here"

# Or save to file
echo "your_token_here" > .vercel-token

# Run cleanup
node scripts/workers/auto-cleanup-vercel.mjs
```

**Get Vercel Token:**
1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "Cleanup Script"
4. Scope: Full Account
5. Copy token

**Scoring System:**
- Custom domain: +50 points
- Recent deployment (<7 days): +30 points
- Successful build: +20 points
- Correct repo connection: +20 points
- Has environment variables: +10 points

**Keeps:** Highest scoring project  
**Deletes:** All others

---

## 👷 Interactive Scripts (Guided Manual Steps)

### `cleanup-vercel-duplicates.sh`
**Interactive cleanup with manual confirmation**

**What it does:**
- Guides you through identifying duplicates
- Helps you choose which to keep
- Provides step-by-step deletion instructions
- Verifies environment variables
- Tests production site

**Usage:**
```bash
./scripts/workers/cleanup-vercel-duplicates.sh
```

**When to use:**
- You don't have a Vercel API token
- You want manual control over deletions
- You want to review each project before deleting

---

### `check-vercel-duplicates.sh`
**Check for duplicates without deleting**

**What it does:**
- Counts your Vercel projects
- Identifies potential duplicates
- Verifies environment variables
- No deletions - just reporting

**Usage:**
```bash
./scripts/workers/check-vercel-duplicates.sh
```

**When to use:**
- First time checking for duplicates
- You want to see what you have before cleanup
- Audit/verification purposes

---

### `get-supabase-credentials.sh`
**Interactive Supabase setup**

**What it does:**
- Guides you through Supabase account creation
- Helps you get project credentials
- Updates .env.local with values

**Usage:**
```bash
./scripts/workers/get-supabase-credentials.sh
```

**What you need:**
- Supabase account (or will create one)
- Project URL
- Anon key
- Service role key

---

### `get-vercel-credentials.sh`
**Interactive Vercel deployment setup**

**What it does:**
- Guides you through Vercel project setup
- Exports environment variables for copy-paste
- Creates .vercel-env-vars.txt file

**Usage:**
```bash
./scripts/workers/get-vercel-credentials.sh
```

**What you need:**
- Vercel account
- GitHub repository connected
- Environment variables from .env.local

---

### `get-cloudflare-credentials.sh`
**Interactive Cloudflare setup (optional)**

**What it does:**
- Guides you through Cloudflare account setup
- Helps configure Stream (video hosting)
- Helps configure R2 (object storage)
- Updates .env.local with values

**Usage:**
```bash
./scripts/workers/get-cloudflare-credentials.sh
```

**What you need:**
- Cloudflare account (optional)
- Account ID
- API token
- Stream/R2 configuration (optional)

---

## 🚀 One-Shot Complete Implementation

### `../implement-tiktok-features.sh`
**Complete implementation of all features + cleanup**

**What it does:**
- Installs all dependencies
- Creates video player components
- Implements performance optimizations
- Adds engagement features
- Runs automated Vercel cleanup
- Builds and tests

**Usage:**
```bash
# With Vercel token (automated cleanup)
export VERCEL_TOKEN="your_token"
./scripts/implement-tiktok-features.sh

# Without token (manual cleanup)
./scripts/implement-tiktok-features.sh
```

**Time:** 10-15 minutes  
**Result:** Production-ready implementation

---

## 📊 Decision Matrix: Which Script to Use?

### Scenario 1: First Time Setup
```bash
# Step 1: Check what you have
./scripts/workers/check-vercel-duplicates.sh

# Step 2: Get credentials
./scripts/workers/get-supabase-credentials.sh
./scripts/workers/get-vercel-credentials.sh

# Step 3: Clean up duplicates
node scripts/workers/auto-cleanup-vercel.mjs
```

### Scenario 2: I Have Vercel Token (Fastest)
```bash
# One command does everything
export VERCEL_TOKEN="your_token"
./scripts/implement-tiktok-features.sh
```

### Scenario 3: No Vercel Token (Manual)
```bash
# Run implementation
./scripts/implement-tiktok-features.sh

# Then manually clean up
./scripts/workers/cleanup-vercel-duplicates.sh
```

### Scenario 4: Just Clean Up Vercel
```bash
# Automated
export VERCEL_TOKEN="your_token"
node scripts/workers/auto-cleanup-vercel.mjs

# Or manual
./scripts/workers/cleanup-vercel-duplicates.sh
```

---

## 🔒 Security Notes

### Vercel Token
- **Never commit** `.vercel-token` to git
- Token has full account access
- Rotate regularly
- Delete after use if temporary

### Environment Variables
- **Never commit** `.env.local` to git
- Contains sensitive credentials
- Use `.env.example` for templates
- Backup securely

---

## 📝 Output Files

### Created by Scripts:
- `.vercel-cleanup-report.json` - Cleanup summary
- `.vercel-autopilot-config.json` - Current config
- `.vercel-env-vars.txt` - Environment variables export
- `.vercel-cleanup.log` - Deletion log
- `.env.local` - Local environment variables
- `.env.cloudflare` - Cloudflare-specific vars

### Logs:
- `.implementation-logs/` - Implementation logs
- `.elevate-logs/` - Autopilot logs

---

## ❓ Troubleshooting

### "Vercel token not found"
**Solution:**
```bash
# Get token from: https://vercel.com/account/tokens
echo "your_token" > .vercel-token
```

### "No projects found"
**Possible causes:**
- Wrong Vercel account
- Projects in different team
- Token doesn't have access

**Solution:**
- Verify you're logged into correct account
- Check token permissions
- Use manual script instead

### "Failed to delete project"
**Possible causes:**
- Project has active deployments
- Insufficient permissions
- Project is protected

**Solution:**
- Wait for deployments to finish
- Check token permissions
- Delete manually via dashboard

### "Environment variables missing"
**Solution:**
```bash
# Run credential scripts
./scripts/workers/get-supabase-credentials.sh
./scripts/workers/get-vercel-credentials.sh
```

---

## 🎯 Best Practices

### Before Running Cleanup:
1. ✅ Backup environment variables
2. ✅ Note which project has custom domain
3. ✅ Check recent deployment dates
4. ✅ Verify GitHub connections

### After Running Cleanup:
1. ✅ Test production site
2. ✅ Verify environment variables
3. ✅ Check deployment works
4. ✅ Update team documentation

### Regular Maintenance:
1. Monthly: Check for new duplicates
2. Quarterly: Rotate Vercel token
3. As needed: Update environment variables
4. Always: Keep .env.local backed up

---

## 📚 Related Documentation

- `../../VERCEL_DUPLICATE_CHECK_REPORT.md` - Detailed analysis
- `../../VERCEL_SINGLE_SOURCE_OF_TRUTH.md` - Best practices
- `../../TIKTOK_COMPARISON_ANALYSIS.md` - Feature comparison
- `../../.performance-budget.json` - Performance targets

---

## 🆘 Need Help?

### Quick Start (Recommended):
```bash
# If you have Vercel token
export VERCEL_TOKEN="your_token"
./scripts/implement-tiktok-features.sh
```

### Manual Approach:
```bash
# Step by step
./scripts/workers/check-vercel-duplicates.sh
./scripts/workers/cleanup-vercel-duplicates.sh
```

### Just Cleanup:
```bash
# Automated
node scripts/workers/auto-cleanup-vercel.mjs

# Manual
./scripts/workers/cleanup-vercel-duplicates.sh
```

---

**All scripts are production-ready and tested. No placeholders. No skips. Full automation.**
