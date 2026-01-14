# Netlify Migration Guide

Migration from Vercel to Netlify for Elevate for Humanity LMS Platform.

## Why Netlify?

- More stable deployments
- Better build performance
- Simpler configuration
- Excellent Next.js support via `@netlify/plugin-nextjs`

## Prerequisites

1. Netlify account ([netlify.com](https://netlify.com))
2. Access to all environment variables from current deployment
3. Domain DNS access (for domain configuration)

## Step 1: Install Netlify CLI (Optional)

```bash
npm install -g netlify-cli
netlify login
```

## Step 2: Verify Netlify Site Connection

Since your repository is already connected to Netlify:

1. Go to [app.netlify.com](https://app.netlify.com)
2. Find your site in the dashboard
3. Verify build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)
4. If settings need updating, go to Site Settings > Build & Deploy > Build Settings

## Step 3: Configure Environment Variables

Go to Netlify Dashboard > Site Settings > Environment Variables

Add all variables from `.env.example`:

### Required Variables

```bash
# Database & Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=your_postgres_url
POSTGRES_PASSWORD=your_postgres_password

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# Payments
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
AFFIRM_PUBLIC_KEY=your_affirm_public
AFFIRM_PRIVATE_KEY=your_affirm_private
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=your_affirm_public

# AI Services
OPENAI_API_KEY=your_openai_key

# Email
RESEND_API_KEY=your_resend_key
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=noreply@www.elevateforhumanity.org
EMAIL_FROM=noreply@www.elevateforhumanity.org

# Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Configuration
NODE_ENV=production
AUTOPILOT_SECRET=your_autopilot_secret
```

### Optional Variables

```bash
# AI Avatar & Voice (Premium)
ELEVENLABS_API_KEY=your_elevenlabs_key
DID_API_KEY=your_did_key
SYNTHESIA_API_KEY=your_synthesia_key

# Stock Media
PEXELS_API_KEY=your_pexels_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
PIXABAY_API_KEY=your_pixabay_key

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_cf_account
CLOUDFLARE_API_TOKEN=your_cf_token
CLOUDFLARE_STREAM_API_TOKEN=your_cf_stream_token
NEXT_PUBLIC_SCORM_CDN_URL=https://scorm.www.elevateforhumanity.org

# Other
WORKOS_API_KEY=your_workos_key
```

## Step 4: Configure Domain

### Primary Domain Setup

1. Go to Netlify Dashboard > Domain Settings
2. Add custom domain: `www.elevateforhumanity.org`
3. Configure DNS:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

### Old Domain Redirects

The `netlify.toml` file already includes redirects from:
- `elevateforhumanity.org` → `www.elevateforhumanity.org`
- `www.elevateforhumanity.org` → `www.elevateforhumanity.org`
- `www.www.elevateforhumanity.org` → `www.elevateforhumanity.org`

## Step 5: Configure Webhooks

### Stripe Webhooks

Update Stripe webhook URL:
- Old: `https://your-vercel-domain.vercel.app/api/webhooks/stripe`
- New: `https://www.elevateforhumanity.org/api/webhooks/stripe`

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Update webhook endpoint URL
3. Update `STRIPE_WEBHOOK_SECRET` in Netlify environment variables

### Other Webhooks

Update any other webhook URLs:
- Payment processors (Affirm, etc.)
- Third-party integrations
- Monitoring services

## Step 6: Deploy

### First Deployment

1. Push changes to GitHub:
```bash
git add netlify.toml next.config.mjs .env.example NETLIFY_MIGRATION.md
git commit -m "Configure Netlify deployment"
git push origin main
```

2. Netlify will automatically detect the push and start building

### Monitor Build

1. Go to Netlify Dashboard > Deploys
2. Watch build logs for any errors
3. Build should complete in 5-10 minutes

## Step 7: Test Deployment

### Smoke Tests

1. Visit `https://www.elevateforhumanity.org`
2. Test key functionality:
   - Homepage loads
   - User authentication
   - Course enrollment
   - Payment processing
   - API endpoints

### Run Automated Tests

```bash
# If you have Playwright tests
npm run test:e2e
```

## Step 8: Update External Services

### Update URLs in:

1. **Supabase**:
   - Authentication > URL Configuration
   - Update redirect URLs

2. **Stripe**:
   - Webhook endpoints
   - Redirect URLs

3. **OAuth Providers**:
   - Google OAuth
   - GitHub OAuth
   - Update callback URLs

4. **DNS**:
   - Update A records
   - Update CNAME records

## Step 9: Monitor & Verify

### Check These After Migration:

- [ ] Homepage loads correctly
- [ ] User login/signup works
- [ ] Course pages load
- [ ] Payment processing works
- [ ] Email notifications send
- [ ] API endpoints respond
- [ ] Database connections work
- [ ] File uploads work
- [ ] Redirects work correctly
- [ ] SSL certificate is active

### Performance Monitoring

1. Check Netlify Analytics
2. Monitor error rates
3. Check build times
4. Verify CDN performance

## Step 10: Cleanup (After Successful Migration)

### After 1 Week of Stable Operation:

1. **Vercel**:
   - Archive or delete Vercel project
   - Cancel Vercel subscription if no longer needed

2. **Repository**:
   - Remove `vercel.json` (optional)
   - Update README with Netlify badge

3. **Documentation**:
   - Update deployment docs
   - Update CI/CD workflows

## Troubleshooting

### Build Fails

**Issue**: Build fails with memory error
**Solution**: Increase Node memory in `netlify.toml`:
```toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=8192"
```

**Issue**: Missing dependencies
**Solution**: Clear build cache in Netlify Dashboard > Site Settings > Build & Deploy > Clear cache

### Environment Variables

**Issue**: Environment variables not loading
**Solution**: 
1. Check variable names match exactly
2. Redeploy after adding variables
3. Check for typos in variable names

### Domain Issues

**Issue**: Domain not resolving
**Solution**:
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain registrar settings

### API Routes Failing

**Issue**: API routes return 404
**Solution**:
1. Ensure `@netlify/plugin-nextjs` is installed
2. Check `netlify.toml` configuration
3. Verify Next.js version compatibility

## Rollback Plan

If migration fails:

1. **Immediate**: Point DNS back to Vercel
2. **Update**: Revert webhook URLs
3. **Notify**: Update status page
4. **Debug**: Review Netlify build logs
5. **Retry**: Fix issues and redeploy

## Support

- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Next.js on Netlify**: [docs.netlify.com/frameworks/next-js](https://docs.netlify.com/frameworks/next-js)
- **Community**: [answers.netlify.com](https://answers.netlify.com)

## Key Differences: Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Build Command | Automatic | Configure in `netlify.toml` |
| Environment Variables | Dashboard | Dashboard |
| Redirects | `next.config.mjs` | `netlify.toml` + `next.config.mjs` |
| Edge Functions | Native | Via plugin |
| Build Cache | Automatic | Automatic |
| Deploy Previews | Yes | Yes |
| Custom Domains | Yes | Yes |

## Next Steps

1. Complete Steps 1-10 above
2. Monitor for 1 week
3. Cleanup old Vercel resources
4. Update documentation
5. Celebrate successful migration! 🎉

---

**Migration Date**: January 11, 2026  
**Migrated By**: Ona  
**Status**: Ready for deployment
