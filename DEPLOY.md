# Deploy Elevate LMS

Choose your deployment method:

## Option 1: One-Click Deploy (Free Template)

Deploy your own instance in minutes:

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/elevateforhumanity/Elevate-lms&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,NEXTAUTH_SECRET,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/elevateforhumanity/Elevate-lms/blob/main/docs/DEPLOYMENT-OPTIONS.md&project-name=elevate-lms&repository-name=elevate-lms)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/elevateforhumanity/Elevate-lms)

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/elevate-lms?referralCode=elevate)

---

## Option 2: Licensed Deployment (Self-Hosted)

For organizations wanting full control:

1. **Purchase a license** at [elevateforhumanity.org/store](https://www.elevateforhumanity.org/store)
2. **Get private repo access** after purchase
3. **Deploy to your infrastructure**
4. **Receive setup support**

### License Tiers

| Tier | Price | Includes |
|------|-------|----------|
| Starter | $99/mo | 100 students, 1 admin, email support |
| Professional | $299/mo | 500 students, 5 admins, priority support |
| Enterprise | $35,000+ | Unlimited, dedicated support, customization |

---

## Option 3: Managed White-Label (We Host)

Let us handle everything:

- **Your branding** on our infrastructure
- **Custom subdomain** (yourorg.elevatelms.com) or your domain
- **Zero DevOps** - we manage updates, security, scaling
- **SLA guaranteed** uptime

[Request White-Label Demo →](https://www.elevateforhumanity.org/store/request-license)

---

## Environment Variables Required

```bash
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Stripe (Payments)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Optional
NEXT_PUBLIC_GA_MEASUREMENT_ID=
RESEND_API_KEY=
```

## Quick Start After Deploy

1. Set up Supabase project at [supabase.com](https://supabase.com)
2. Run database migrations (see `/supabase/migrations`)
3. Configure Stripe webhooks pointing to `/api/webhooks/stripe`
4. Add your branding in `/public` and update `next.config.js`

## Support

- **Documentation**: [/docs](./docs)
- **Issues**: [GitHub Issues](https://github.com/elevateforhumanity/Elevate-lms/issues)
- **Email**: support@elevateforhumanity.org
