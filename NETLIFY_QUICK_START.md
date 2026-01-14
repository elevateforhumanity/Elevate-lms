# Netlify Quick Start - Already Connected

Your repository is already connected to Netlify. Follow these steps to complete the migration.

## ✅ Quick Checklist

### 1. Verify Build Settings (2 minutes)

Go to Netlify Dashboard > Site Settings > Build & Deploy

**Build Settings:**
- Build command: `pnpm build`
- Publish directory: `.next`
- Base directory: (leave empty)

**Build Environment:**
- Node version: `20.11.1`
- Package manager: `pnpm`

### 2. Add Environment Variables (5 minutes)

Go to Netlify Dashboard > Site Settings > Environment Variables > Add a variable

**Critical Variables (Required):**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
OPENAI_API_KEY=
RESEND_API_KEY=
NODE_ENV=production
```

**Copy from Vercel:**
- Go to Vercel Dashboard > Project > Settings > Environment Variables
- Copy each value to Netlify

### 3. Push Configuration Files (1 minute)

```bash
git add netlify.toml next.config.mjs .env.example
git commit -m "Configure for Netlify deployment"
git push origin main
```

Netlify will automatically detect the push and start building.

### 4. Update Webhooks (3 minutes)

**Stripe Webhook:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Update endpoint URL to: `https://www.elevateforhumanity.org/api/webhooks/stripe`
3. Copy new webhook secret
4. Update `STRIPE_WEBHOOK_SECRET` in Netlify environment variables

**Other Webhooks:**
- Update any payment processor webhooks
- Update OAuth callback URLs

### 5. Configure Domain (5 minutes)

**If using custom domain:**

1. Netlify Dashboard > Domain Settings > Add custom domain
2. Add: `www.elevateforhumanity.org`
3. Configure DNS at your registrar:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site-name.netlify.app
```

**DNS propagation takes 24-48 hours**

### 6. Deploy & Test (10 minutes)

**Trigger Deployment:**
- Push to main branch (already done in step 3)
- Or click "Trigger deploy" in Netlify Dashboard

**Monitor Build:**
- Watch build logs in Netlify Dashboard > Deploys
- Build time: ~5-10 minutes

**Test After Deployment:**
- [ ] Homepage loads
- [ ] Login/signup works
- [ ] Course pages load
- [ ] Payment flow works
- [ ] API endpoints respond
- [ ] Redirects work

### 7. Update Supabase (2 minutes)

Go to Supabase Dashboard > Authentication > URL Configuration

Update redirect URLs:
- Old: `https://your-vercel-domain.vercel.app/**`
- New: `https://www.elevateforhumanity.org/**`

## 🚨 Common Issues

### Build Fails with Memory Error
**Solution:** Already configured in `netlify.toml` with `NODE_OPTIONS = "--max-old-space-size=8192"`

### Environment Variables Not Loading
**Solution:** 
1. Double-check variable names (case-sensitive)
2. Click "Trigger deploy" after adding variables
3. Check for typos

### API Routes Return 404
**Solution:** Ensure `@netlify/plugin-nextjs` is in `netlify.toml` (already added)

### Domain Not Resolving
**Solution:** Wait 24-48 hours for DNS propagation

## 📊 Monitor After Deployment

**First 24 Hours:**
- Check error rates in Netlify Analytics
- Monitor build times
- Verify all features work
- Check email notifications

**First Week:**
- Monitor performance
- Check user feedback
- Verify payment processing
- Review logs for errors

## 🎯 Next Steps After Successful Migration

1. **Week 1:** Monitor closely, fix any issues
2. **Week 2:** Optimize performance, review analytics
3. **Week 3:** Clean up Vercel resources
4. **Week 4:** Update all documentation

## 🆘 Need Help?

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Next.js on Netlify:** [docs.netlify.com/frameworks/next-js](https://docs.netlify.com/frameworks/next-js)
- **Support:** [support.netlify.com](https://support.netlify.com)

---

**Total Time:** ~30 minutes  
**Difficulty:** Easy  
**Status:** Ready to deploy ✅
