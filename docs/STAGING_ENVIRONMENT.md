# Staging Environment

This document describes the staging environment setup for Elevate-LMS.

## Overview

The staging environment mirrors production configuration and is used for:
- Pre-deployment testing
- Feature validation before release
- Integration testing with third-party services
- DR drill rehearsals

## Infrastructure

### Supabase Project

Create a separate Supabase project for staging:

1. Create project at https://supabase.com/dashboard
2. Name: `elevate-lms-staging`
3. Region: Match production region
4. Apply same database migrations as production

### Environment Variables

```env
# Staging Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://[staging-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[staging-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[staging-service-key]

# Environment identifier
NEXT_PUBLIC_ENV=staging
```

### Deployment

Staging deploys automatically on PR creation via Netlify deploy previews.

For dedicated staging branch:
1. Create `staging` branch from `main`
2. Configure Netlify to deploy `staging` branch to staging subdomain
3. Set staging environment variables in Netlify dashboard

## Data Management

- Staging uses anonymized copies of production data
- Never copy real user credentials to staging
- Reset staging data monthly or as needed

## Access

Staging environment access is limited to the development team. Do not share staging URLs publicly.

## Verification Checklist

Before promoting to production:
- [ ] All automated tests pass
- [ ] Manual smoke test completed
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Auth flows working
