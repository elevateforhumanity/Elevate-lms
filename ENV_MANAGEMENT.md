# Environment Variable Management

## ⚠️ CRITICAL: Single Source of Truth

**ALL environment variables MUST be managed in Vercel only.**

## Rules

1. **DO NOT create `.env.local` files** - They override Vercel settings and cause inconsistencies
2. **DO NOT commit any `.env*` files** - They are in `.gitignore` for security
3. **ALL changes go through Vercel dashboard** - Settings → Environment Variables

## How to Update Environment Variables

### Production Changes
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: `elevate-lms`
3. Go to **Settings** → **Environment Variables**
4. Add/Update the variable
5. **MUST REDEPLOY** after changes:
   - Go to **Deployments** tab
   - Click **...** menu on latest deployment
   - Click **Redeploy**

### Local Development
- Use Vercel CLI to pull env vars: `vercel env pull .env.local`
- This creates a temporary local copy
- **Never commit this file**
- Re-pull if production env vars change

## Current Environment Variables

All variables are set in Vercel Production:
- Supabase (URL, anon key, service role key)
- Stripe (publishable key, secret key, webhook secret)
- Auth (NextAuth secret, session secret)
- Email (Resend API key)
- Redis (Upstash URL and token)
- GitHub OAuth
- LinkedIn OAuth
- OpenAI API key
- And 30+ more...

## Verification

To verify all env vars are set in Vercel:
```bash
vercel env ls production --token YOUR_TOKEN
```

## Why This Matters

**Problem:** Local `.env.local` files override Vercel settings
- Causes different behavior in dev vs production
- Makes debugging impossible
- Creates security risks if committed

**Solution:** Single source of truth in Vercel
- Consistent across all environments
- Secure (encrypted at rest)
- Auditable (change history)
- No risk of accidental commits
