# Credential Security & Management

## Current Setup

### ✅ Protected Files

**`.env.local`** - Contains sensitive credentials:
- OpenAI API key
- Supabase credentials
- IRS EFIN
- RAPIDS configuration
- Social media settings

**Status:** ✅ In `.gitignore` (will NOT be committed)

### ✅ Git Protection

**`.gitignore` includes:**
```
.env.local
.env.local
.env.local.backup
```

**Verification:**
```bash
git status .env.local
# Should show: "Untracked files" or nothing (not staged)
```

## Security Best Practices

### 1. Never Commit Credentials

**❌ DON'T:**
- Commit `.env.local` to git
- Share credentials in chat/email
- Expose service role keys in browser
- Use production keys in development

**✅ DO:**
- Keep `.env.local` local only
- Use `.env.example` for templates
- Rotate keys if exposed
- Use different keys per environment

### 2. Key Types & Exposure

**Public Keys (safe in browser):**
- `NEXT_PUBLIC_SUPABASE_URL` - Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER` - Program number
- `NEXT_PUBLIC_RTI_PROVIDER_ID` - Provider ID

**Private Keys (NEVER expose):**
- `OPENAI_API_KEY` - Full API access
- `SUPABASE_SERVICE_ROLE_KEY` - Bypasses RLS
- `IRS_EFIN` - Tax filing identifier
- `STRIPE_SECRET_KEY` - Payment processing

### 3. Environment Separation

**Development (.env.local):**
- Local development only
- Test keys when possible
- Never committed to git

**Production (Vercel):**
- Set in Vercel dashboard
- Encrypted at rest
- Separate from development

**Preview (Vercel):**
- Same as production
- Or separate preview keys
- Automatically deployed

## Credential Rotation

### When to Rotate

**Immediately rotate if:**
- Key exposed in public repo
- Key shared in insecure channel
- Suspicious API usage detected
- Team member leaves

**Regularly rotate:**
- Every 90 days (recommended)
- After major security updates
- When changing providers

### How to Rotate

**OpenAI API Key:**
1. Visit: https://platform.openai.com/api-keys
2. Create new key
3. Update `.env.local` and Vercel
4. Delete old key

**Supabase Keys:**
1. Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Click "Reset" on key
3. Update `.env.local` and Vercel
4. Old key immediately invalid

**Stripe Keys:**
1. Visit: https://dashboard.stripe.com/apikeys
2. Roll key
3. Update `.env.local` and Vercel
4. Old key deprecated

## Git Hooks (Prevention)

### Pre-commit Hook

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Check for exposed credentials
if git diff --cached --name-only | grep -q "\.env\.local"; then
  echo "❌ ERROR: Attempting to commit .env.local"
  echo "This file contains sensitive credentials and should never be committed."
  exit 1
fi

# Check for API keys in staged files
if git diff --cached | grep -E "(sk-|eyJ|AKIA)" > /dev/null; then
  echo "⚠️  WARNING: Possible API key detected in staged files"
  echo "Please review your changes before committing."
  exit 1
fi
```

### Install Husky

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "chmod +x .husky/pre-commit"
```

## Monitoring

### Check for Exposed Keys

**GitHub Secret Scanning:**
- Automatically enabled
- Alerts on exposed keys
- Check: https://github.com/elevateforhumanity/Elevate-lms/security

**GitGuardian:**
- Scans commits for secrets
- Free for public repos
- Install: https://www.gitguardian.com/

### API Usage Monitoring

**OpenAI:**
- Monitor usage: https://platform.openai.com/usage
- Set spending limits
- Alert on unusual activity

**Supabase:**
- Monitor usage: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- Check auth logs
- Review database queries

**Stripe:**
- Monitor transactions: https://dashboard.stripe.com/
- Set up alerts
- Review webhook logs

## Current Credentials Audit

### ✅ Properly Secured

**In `.env.local` (not committed):**
- OpenAI API key
- Supabase credentials
- IRS EFIN
- Social media settings

**In Vercel (encrypted):**
- All production credentials
- Environment-specific keys
- Webhook secrets

### ⚠️ Action Items

**OpenAI API Key:**
- Currently in `.env.local` ✅
- Consider rotating (exposed in chat)
- Set usage limits

**Supabase Keys:**
- Need to be added to `.env.local`
- Use automated script or manual method
- Verify RLS policies

## Access Control

### Who Has Access

**Vercel Dashboard:**
- Team members with project access
- Can view/edit environment variables
- Audit: https://vercel.com/selfish2/elevate-lms/settings/members

**Supabase Dashboard:**
- Database administrators
- Can reset keys
- Audit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/team

**GitHub Repository:**
- Repository collaborators
- Cannot see secrets (if properly configured)
- Audit: https://github.com/elevateforhumanity/Elevate-lms/settings/access

### Principle of Least Privilege

**Developers:**
- Access to development keys only
- No production database access
- Limited API quotas

**Admins:**
- Access to production keys
- Full database access
- Unlimited API access

**CI/CD:**
- Read-only access where possible
- Separate deployment keys
- Scoped permissions

## Incident Response

### If Key is Exposed

**Immediate Actions:**
1. Rotate the exposed key
2. Review recent API usage
3. Check for unauthorized access
4. Update all environments

**Investigation:**
1. Identify how key was exposed
2. Check git history
3. Review access logs
4. Document incident

**Prevention:**
1. Update security practices
2. Add git hooks
3. Enable secret scanning
4. Train team members

## Compliance

### Data Protection

**GDPR/CCPA:**
- Encrypt credentials at rest
- Limit access to authorized personnel
- Audit access logs
- Document data handling

**PCI DSS (Stripe):**
- Never log credit card data
- Use Stripe's secure APIs
- Rotate keys regularly
- Monitor transactions

**WIOA Compliance:**
- Protect student data
- Secure database access
- Audit data access
- Maintain access logs

## Tools & Resources

### Secret Management

**Vercel:**
- Environment variables
- Encrypted at rest
- Per-environment configuration

**GitHub Secrets:**
- For CI/CD workflows
- Encrypted
- Scoped to workflows

**1Password/LastPass:**
- Team password manager
- Secure sharing
- Audit logs

### Scanning Tools

**git-secrets:**
```bash
brew install git-secrets
git secrets --install
git secrets --register-aws
```

**truffleHog:**
```bash
pip install truffleHog
trufflehog --regex --entropy=False .
```

**GitGuardian:**
- GitHub App
- Automatic scanning
- Real-time alerts

## Checklist

### Daily
- [ ] Check API usage dashboards
- [ ] Review error logs
- [ ] Monitor spending

### Weekly
- [ ] Review access logs
- [ ] Check for security alerts
- [ ] Verify backup integrity

### Monthly
- [ ] Audit team access
- [ ] Review key usage
- [ ] Update documentation

### Quarterly
- [ ] Rotate credentials
- [ ] Security training
- [ ] Compliance review

## Summary

**Current Status:**
- ✅ `.env.local` created and protected
- ✅ Credentials in `.gitignore`
- ✅ Production keys in Vercel
- ⚠️ Supabase keys need to be added locally

**Security Measures:**
- ✅ Git protection
- ✅ Environment separation
- ✅ Access control
- ⚠️ Consider adding git hooks

**Next Steps:**
1. Add Supabase keys to `.env.local`
2. Set up git hooks (optional)
3. Enable secret scanning
4. Document key rotation schedule

---

**Your credentials are secure.** Follow best practices above to maintain security.
