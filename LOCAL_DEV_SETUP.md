# Local Development Setup

**Purpose:** Set up environment variables for local development  
**Status:** Script created, ready to use

---

## Quick Setup

### Option 1: Using the Setup Script (Recommended)

```bash
./setup-local-env.sh
```

The script will prompt you for:
1. Supabase URL
2. Supabase Anon Key
3. Supabase Service Role Key (optional)

### Option 2: Manual Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy the values

3. Edit `.env.local` and add:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NODE_ENV=development
   ```

---

## Where to Get Credentials

### Supabase Dashboard
1. **URL:** https://supabase.com/dashboard
2. **Navigate:** Your Project → Settings → API
3. **Copy:**
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Netlify Dashboard (Alternative)
1. **URL:** https://netlify.com/dashboard
2. **Navigate:** Your Project → Settings → Environment Variables
3. **Copy:** All SUPABASE variables

---

## Testing Local Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Portal Pages
Visit these URLs and verify they load:
- http://localhost:3000/
- http://localhost:3000/instructor/courses
- http://localhost:3000/creator/analytics
- http://localhost:3000/employer/postings

### 3. Check for Errors
Open browser console (F12) and check for:
- ✅ No Supabase connection errors
- ✅ Pages load without 500 errors
- ✅ Login prompts display correctly

---

## Common Issues

### Issue: "Missing NEXT_PUBLIC_SUPABASE_URL"
**Solution:** Add Supabase URL to .env.local

### Issue: "Invalid API key"
**Solution:** Check you copied the anon key, not service role key

### Issue: Pages still show 500 errors
**Solution:** 
1. Restart dev server: `npm run dev`
2. Clear browser cache
3. Check .env.local has correct values

### Issue: Can't connect to Supabase
**Solution:**
1. Verify URL is correct (should start with https://)
2. Check API key is valid
3. Ensure Supabase project is active

---

## Environment Variables Needed

### Required (Minimum)
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Recommended (Full Local Dev)
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Optional (Additional Features)
```bash
# Stripe (for payments)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# OpenAI (for AI features)
OPENAI_API_KEY=

# Email (for testing)
RESEND_API_KEY=
```

---

## Production vs Development

### Development (.env.local)
- Uses localhost URLs
- Can use test/development Supabase project
- Safe to experiment

### Production (Netlify)
- Uses production URLs
- Uses production Supabase project
- Environment variables set in Netlify dashboard

---

## Security Notes

### ✅ Safe to Commit
- `.env.example` (template with no values)
- `setup-local-env.sh` (setup script)

### ❌ NEVER Commit
- `.env.local` (contains secrets)
- `.env` (contains secrets)
- Any file with actual API keys

### Already Protected
- `.env.local` is in `.gitignore`
- Git will not track it
- Safe to add real credentials

---

## Verification Checklist

After setup, verify:
- [ ] .env.local exists
- [ ] Contains NEXT_PUBLIC_SUPABASE_URL
- [ ] Contains NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Dev server starts without errors
- [ ] Portal pages load locally
- [ ] No console errors about missing env vars

---

## Next Steps After Setup

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Populate database:**
   See `DATABASE_SETUP_GUIDE.md`

3. **Configure SMTP:**
   See `SMTP_SETUP_GUIDE.md`

4. **Start developing:**
   All portal pages should work locally now

---

## Support

### If setup script doesn't work:
- Use manual setup (Option 2)
- Check you have bash installed
- Try running with: `bash setup-local-env.sh`

### If still having issues:
1. Check Supabase project is active
2. Verify API keys are correct
3. Restart dev server
4. Clear browser cache

### Documentation:
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs/basic-features/environment-variables

---

**Created:** January 8, 2026  
**Status:** Ready to use  
**Script:** `setup-local-env.sh`
