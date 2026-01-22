# Worker Scripts - Automated Task Execution

This directory contains worker scripts that automate various deployment and cleanup tasks.

---

## Available Scripts

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

### `cleanup-cloudflare-elevateforhumanity.sh`
**Cloudflare cleanup script**

**What it does:**
- Cleans up Cloudflare resources
- Removes old configurations

**Usage:**
```bash
./scripts/workers/cleanup-cloudflare-elevateforhumanity.sh
```

---

### `remove-elevateforhumanity-from-cloudflare.mjs`
**Node.js Cloudflare removal script**

**What it does:**
- Programmatically removes resources from Cloudflare
- Uses Cloudflare API

**Usage:**
```bash
node scripts/workers/remove-elevateforhumanity-from-cloudflare.mjs
```

---

## Deployment

This project deploys to **Netlify**. See `netlify.toml` for configuration.

### Deploy to Netlify:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## Security Notes

### Environment Variables
- **Never commit** `.env.local` to git
- Contains sensitive credentials
- Use `.env.example` for templates
- Backup securely

---

## Output Files

### Created by Scripts:
- `.env.local` - Local environment variables
- `.env.cloudflare` - Cloudflare-specific vars

### Logs:
- `.implementation-logs/` - Implementation logs
- `.elevate-logs/` - Autopilot logs

---

## Need Help?

1. **Check Documentation:** Review docs in `/docs` directory
2. **Search Issues:** https://github.com/elevateforhumanity/Elevate-lms/issues
3. **Contact Support:** support@elevateforhumanity.org
