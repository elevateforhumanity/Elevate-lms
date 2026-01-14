# Deploy to Netlify - Ready to Go!

**Site:** thunderous-axolotl-89d28d.netlify.app  
**Status:** Configured and ready to deploy

## 🚀 Step 1: Push Configuration (Do This Now)

```bash
git add netlify.toml next.config.mjs .env.example
git commit -m "Configure Netlify deployment with optimized settings"
git push origin main
```

This will trigger an automatic deployment on Netlify.

## ⚙️ Step 2: Add Environment Variables (Critical!)

Go to: [https://app.netlify.com/sites/thunderous-axolotl-89d28d/settings/env](https://app.netlify.com/sites/thunderous-axolotl-89d28d/settings/env)

### Copy from Vercel (Fastest Method)

1. Open Vercel Dashboard > Your Project > Settings > Environment Variables
2. For each variable below, copy the value from Vercel to Netlify

### Required Variables:

**Database & Auth:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
NEXTAUTH_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

**Payments:**
```
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
AFFIRM_PUBLIC_KEY
AFFIRM_PRIVATE_KEY
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY
```

**Services:**
```
OPENAI_API_KEY
RESEND_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

**Email:**
```
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM=noreply@www.elevateforhumanity.org
EMAIL_FROM=noreply@www.elevateforhumanity.org
```

**Config:**
```
NODE_ENV=production
AUTOPILOT_SECRET
```

### After Adding Variables:

Click **"Trigger deploy"** in Netlify Dashboard to rebuild with new environment variables.

## 🌐 Step 3: Configure Domain (Optional - Can Do Later)

Go to: [https://app.netlify.com/sites/thunderous-axolotl-89d28d/settings/domain](https://app.netlify.com/sites/thunderous-axolotl-89d28d/settings/domain)

1. Click "Add custom domain"
2. Enter: `www.elevateforhumanity.org`
3. Follow DNS instructions provided by Netlify

**Note:** DNS changes take 24-48 hours to propagate.

## 🔔 Step 4: Update Webhooks

### Stripe Webhook (Important!)

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Find your current webhook
3. Update URL to: `https://www.elevateforhumanity.org/api/webhooks/stripe`
   - Or temporarily: `https://thunderous-axolotl-89d28d.netlify.app/api/webhooks/stripe`
4. Copy the new webhook signing secret
5. Update `STRIPE_WEBHOOK_SECRET` in Netlify environment variables
6. Trigger a new deploy

### Supabase Auth URLs

1. Go to [Supabase Dashboard > Authentication > URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration)
2. Update Site URL: `https://www.elevateforhumanity.org`
3. Add Redirect URLs:
   - `https://www.elevateforhumanity.org/**`
   - `https://thunderous-axolotl-89d28d.netlify.app/**`

## ✅ Step 5: Monitor Deployment

Go to: [https://app.netlify.com/sites/thunderous-axolotl-89d28d/deploys](https://app.netlify.com/sites/thunderous-axolotl-89d28d/deploys)

**Watch for:**
- Build starts automatically after git push
- Build time: ~5-10 minutes
- Check logs for any errors

**Common Build Issues:**

❌ **"Module not found"**
- Solution: Clear build cache, redeploy

❌ **"Out of memory"**
- Solution: Already fixed in netlify.toml with NODE_OPTIONS

❌ **"Environment variable undefined"**
- Solution: Add missing variables, trigger deploy

## 🧪 Step 6: Test After Deployment

Visit: `https://thunderous-axolotl-89d28d.netlify.app`

**Test Checklist:**
- [ ] Homepage loads
- [ ] Login/signup works
- [ ] Course pages display
- [ ] API endpoints respond (check /api/health if you have one)
- [ ] Images load correctly
- [ ] Redirects work

**If something doesn't work:**
1. Check Netlify function logs
2. Check browser console for errors
3. Verify environment variables are set
4. Check Supabase connection

## 📊 What's Been Configured

✅ **Build Settings:**
- Command: `pnpm build`
- Publish: `.next`
- Node: 20.11.1
- Memory: 8GB

✅ **Redirects:**
- elevateforhumanity.org → www.elevateforhumanity.org
- www redirects to non-www

✅ **Security Headers:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- CSP configured

✅ **Caching:**
- Static assets: 1 year
- Images/videos: 1 year
- HTML: no-cache

✅ **Next.js Plugin:**
- @netlify/plugin-nextjs configured
- API routes automatically handled
- ISR and SSR supported

## 🎯 Quick Commands

**Check build status:**
```bash
# If you have Netlify CLI installed
netlify status
netlify open:site
```

**View logs:**
```bash
netlify logs
```

**Trigger manual deploy:**
```bash
netlify deploy --prod
```

## 🆘 Need Help?

**Build failing?**
- Check deploy logs in Netlify Dashboard
- Look for missing environment variables
- Verify pnpm is being used

**Site not loading?**
- Check if deploy completed successfully
- Verify DNS settings (if using custom domain)
- Check browser console for errors

**API routes failing?**
- Verify environment variables are set
- Check Netlify function logs
- Ensure @netlify/plugin-nextjs is active

## 📞 Support Links

- **Netlify Dashboard:** [app.netlify.com/sites/thunderous-axolotl-89d28d](https://app.netlify.com/sites/thunderous-axolotl-89d28d)
- **Deploy Logs:** [app.netlify.com/sites/thunderous-axolotl-89d28d/deploys](https://app.netlify.com/sites/thunderous-axolotl-89d28d/deploys)
- **Settings:** [app.netlify.com/sites/thunderous-axolotl-89d28d/settings](https://app.netlify.com/sites/thunderous-axolotl-89d28d/settings)
- **Netlify Docs:** [docs.netlify.com/frameworks/next-js](https://docs.netlify.com/frameworks/next-js)

---

## 🎉 You're Ready!

**Total time:** 15-30 minutes  
**Next step:** Run the git commands above to deploy!

**After successful deployment:**
1. Monitor for 24 hours
2. Update documentation
3. Clean up Vercel resources (after 1 week of stable operation)
