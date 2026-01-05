# Quick Reconnect Guide - Minimal Downtime

## Goal: Take Down → Reconnect in 15 Minutes

---

## PREPARATION (Do This BEFORE Taking Site Down)

### Step 1: Create New Vercel Account (5 minutes)

**If you don't have a new account yet:**

1. Go to https://vercel.com/signup
2. Use NEW email (different from old account)
3. Or use GitHub OAuth
4. Complete signup
5. Verify email

**Save these credentials somewhere safe!**

### Step 2: Have Environment Variables Ready

Copy these from `.env.local`:

```bash
DATABASE_URL="postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08$$$@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_SECRET="sMhipqoeyeakArundXdu"
NEXTAUTH_URL="https://www.elevateforhumanity.org"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-SWPG2HVYVH"
```

**Save these in a text file for quick copy-paste!**

### Step 3: Have DNS Provider Open

Open your DNS provider in another tab:
- GoDaddy: https://dcc.godaddy.com/manage/dns
- Cloudflare: https://dash.cloudflare.com
- Namecheap: https://ap.www.namecheap.com/domains/list

**Login and navigate to DNS settings for elevateforhumanity.org**

---

## EXECUTION (15 Minutes Total)

### STEP 1: Take Site Down (2 minutes)

**In DNS provider, DELETE these records:**

1. A record: `@` → `76.76.21.21`
2. CNAME: `www` → `cname.vercel-dns.com`

**Click Save/Update**

✅ **Site is now down** (old account disconnected)

---

### STEP 2: Deploy to New Account (5 minutes)

**In terminal:**

```bash
# Logout from old account
vercel logout

# Login to NEW account
vercel login
# Use your NEW credentials

# Deploy
vercel

# Answer prompts:
# Set up and deploy? Yes
# Which scope? [Your new account]
# Link to existing project? No
# Project name? elevate-lms
# Directory? ./
# Override settings? No

# This will deploy and give you a .vercel.app URL
```

**Wait for deployment to complete** (2-3 minutes)

---

### STEP 3: Add Environment Variables (3 minutes)

**Quick method - all at once:**

```bash
# Copy-paste each line
vercel env add DATABASE_URL production
# Paste: postgresql://postgres.cuxzzpsyufcewtmicszk:kingGreene08$$$@aws-0-us-east-1.pooler.supabase.com:6543/postgres

vercel env add NEXTAUTH_SECRET production
# Paste: sMhipqoeyeakArundXdu

vercel env add NEXTAUTH_URL production
# Paste: https://www.elevateforhumanity.org

vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
# Paste: G-SWPG2HVYVH
```

**Redeploy with env vars:**

```bash
vercel --prod
```

---

### STEP 4: Connect Domains (2 minutes)

```bash
# Add www domain
vercel domains add www.elevateforhumanity.org

# Add apex domain
vercel domains add elevateforhumanity.org
# When asked: Redirect to www? Yes
```

---

### STEP 5: Update DNS (2 minutes)

**In DNS provider, ADD these records:**

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `Auto`

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `Auto`

**Click Save/Update**

---

### STEP 6: Verify (1 minute)

Wait 2-3 minutes for DNS to propagate, then:

```bash
curl -sI https://www.elevateforhumanity.org/ | grep "HTTP"
# Expected: HTTP/2 200
```

✅ **Site is back online!**

---

## EVEN FASTER METHOD (10 Minutes)

### Do Steps 2-4 BEFORE Taking Site Down

1. Create new Vercel account ✅
2. Deploy to new account ✅
3. Add env vars ✅
4. Add domains in Vercel ✅
5. **THEN** update DNS (takes site down for 2-3 minutes only)

**This way, downtime is only 2-3 minutes!**

---

## FASTEST METHOD - Parallel Setup (5 Minutes Downtime)

### Phase 1: Prepare Everything (Do First)

```bash
# 1. Create new Vercel account (web)
# 2. Login to new account
vercel login

# 3. Deploy to new account
vercel

# 4. Add env vars
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production

# 5. Redeploy
vercel --prod

# 6. Add domains (will show "DNS not configured" - that's OK)
vercel domains add www.elevateforhumanity.org
vercel domains add elevateforhumanity.org
```

### Phase 2: Switch DNS (5 Minutes Downtime)

**In DNS provider:**

1. **DELETE old records** (site goes down)
2. **ADD new records** (same values)
3. **Save**
4. Wait 2-3 minutes
5. **Site comes back up on new account**

**Total downtime: 5 minutes**

---

## Troubleshooting

### "Domain already in use"

**Cause:** Old account still has domain

**Fix:** 
- Wait 10 minutes after removing DNS
- Old account will auto-release domain
- Then try adding again

### "DNS verification failed"

**Cause:** DNS not propagated yet

**Fix:**
- Wait 5 more minutes
- Try again
- Or click "Refresh" in Vercel dashboard

### "Site still shows old version"

**Cause:** CDN cache

**Fix:**
- Wait 5-10 minutes
- Clear browser cache
- Try incognito mode

### "Environment variables not working"

**Cause:** Forgot to redeploy after adding

**Fix:**
```bash
vercel --prod
```

---

## Post-Reconnect Checklist

After site is back up:

- [ ] Test homepage: https://www.elevateforhumanity.org/
- [ ] Test apex redirect: https://elevateforhumanity.org/
- [ ] Test key pages: /about, /programs, /apply
- [ ] Check canonical tags
- [ ] Verify new Vercel account in dashboard
- [ ] Update Google Search Console
- [ ] Request reindexing for key pages

---

## Timeline Comparison

### Method 1: Sequential (15 minutes downtime)
1. Take down (2 min)
2. Deploy (5 min) ⬅️ Site is down
3. Add env vars (3 min) ⬅️ Site is down
4. Connect domains (2 min) ⬅️ Site is down
5. Update DNS (2 min) ⬅️ Site is down
6. Verify (1 min)

**Downtime: 15 minutes**

### Method 2: Prepare First (5 minutes downtime)
1. Deploy (5 min) ⬅️ Site still up
2. Add env vars (3 min) ⬅️ Site still up
3. Connect domains (2 min) ⬅️ Site still up
4. Update DNS (2 min) ⬅️ Site goes down
5. Wait for propagation (3 min) ⬅️ Site is down
6. Verify (1 min) ⬅️ Site comes back up

**Downtime: 5 minutes**

### Method 3: Parallel (2 minutes downtime)
1. Everything prepared beforehand
2. DNS switch only (2 min) ⬅️ Site is down
3. Site comes back up

**Downtime: 2 minutes**

---

## Recommended Approach

**Use Method 2 (Prepare First):**

1. **NOW:** Create new account, deploy, add env vars, add domains
2. **WHEN READY:** Switch DNS (5 min downtime)
3. **DONE:** Site back up on new account

**This gives you:**
- ✅ Control over when downtime happens
- ✅ Minimal downtime (5 minutes)
- ✅ Everything tested before switch
- ✅ Easy rollback if needed

---

## Emergency Rollback

**If something goes wrong:**

1. **In DNS, change back to old values**
2. **Site comes back on old account**
3. **Fix issues**
4. **Try again**

**Old DNS values (if you need to rollback):**
- A: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

---

## Ready to Execute?

**Choose your method:**

1. **Sequential** (15 min downtime) - Simple, do everything in order
2. **Prepare First** (5 min downtime) - RECOMMENDED
3. **Parallel** (2 min downtime) - Advanced, everything ready first

**I recommend Method 2 (Prepare First)**

**Want me to walk you through it step by step?**
