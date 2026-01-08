# Quick Start Guide
**Get up and running in 5 minutes**

## Prerequisites
- Node.js 20+
- npm or pnpm
- Git

## Setup

### 1. Clone Repository
```bash
git clone https://github.com/elevateforhumanity/Elevate-lms.git
cd Elevate-lms
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env.local
```

Add required variables to `.env.local`:
```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI (for AI features)
OPENAI_API_KEY=sk-proj-...
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Key Features

✅ **Auth** - Login/signup with Supabase  
✅ **Payments** - Stripe integration  
✅ **Database** - PostgreSQL with RLS  
✅ **Responsive** - Mobile-first design  
✅ **Secure** - Webhook validation, rate limiting

## Documentation

- [Full README](README.md) - Complete documentation
- [Environment Setup](ENV_MANAGEMENT.md) - Detailed env config
- [Supabase Setup](SETUP_SUPABASE_LOCAL.md) - Database setup
- [Security](CREDENTIAL_SECURITY.md) - Security best practices

## Troubleshooting

**Supabase warnings?**
- Add Supabase keys to `.env.local`
- See [SETUP_SUPABASE_LOCAL.md](SETUP_SUPABASE_LOCAL.md)

**Build errors?**
- Run `npm install` again
- Check Node.js version (20+)

**Port in use?**
- Change port: `PORT=3001 npm run dev`

## Next Steps

1. Test auth at `/login`
2. Explore student dashboard at `/student/dashboard`
3. Check admin portal at `/admin`
4. Review [WHATS_NEXT.md](WHATS_NEXT.md) for roadmap

---

**Need help?** Check documentation or open an issue.
