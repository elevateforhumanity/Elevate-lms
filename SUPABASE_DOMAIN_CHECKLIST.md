# Supabase Domain Migration Checklist

## Overview
After migrating from elevateforhumanity.org to elevateforhumanity.institute, verify Supabase configuration.

## Authentication Configuration

### 1. Site URL
- [ ] Update Site URL in Supabase Dashboard
  - Navigate to: Authentication → URL Configuration
  - Set Site URL to: `https://elevateforhumanity.institute`

### 2. Redirect URLs
- [ ] Add new domain to allowed redirect URLs
  - Navigate to: Authentication → URL Configuration → Redirect URLs
  - Add: `https://elevateforhumanity.institute/**`
  - Keep old domain temporarily for transition: `https://elevateforhumanity.org/**`

### 3. Email Templates
- [ ] Update email template links
  - Navigate to: Authentication → Email Templates
  - Check all templates (Confirmation, Reset Password, Magic Link, etc.)
  - Replace any hardcoded .org URLs with .institute

## CORS Configuration

### 4. Allowed Origins
- [ ] Update CORS settings
  - Navigate to: Settings → API
  - Add to allowed origins: `https://elevateforhumanity.institute`
  - Verify `https://elevateforhumanity.org` is present for transition period

## Environment Variables

### 5. Verify Environment Variables
- [ ] Check NEXT_PUBLIC_SUPABASE_URL is correct
- [ ] Check NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- [ ] Verify NEXTAUTH_URL points to new domain
- [ ] Verify NEXT_PUBLIC_SITE_URL points to new domain

## Testing

### 6. Authentication Flow
- [ ] Test sign up with new domain
- [ ] Test sign in with new domain
- [ ] Test password reset email links
- [ ] Test magic link authentication
- [ ] Test OAuth providers (if configured)

### 7. API Requests
- [ ] Test API calls from new domain
- [ ] Verify no CORS errors in browser console
- [ ] Test authenticated requests

## Cleanup (After Transition Period)

### 8. Remove Old Domain References
- [ ] Remove .org from redirect URLs (after 30-90 days)
- [ ] Remove .org from CORS origins (after 30-90 days)
- [ ] Archive old email templates if needed

## Quick Verification Commands

```bash
# Check current Supabase URL in code
grep -r "NEXT_PUBLIC_SUPABASE_URL" .env.local

# Check site URL configuration
grep -r "NEXT_PUBLIC_SITE_URL" .env.local

# Test authentication endpoint
curl -I https://elevateforhumanity.institute/api/auth/signin
```

## Notes

- Keep both domains active in Supabase during transition period
- Monitor authentication logs for any domain-related errors
- Update gradually to avoid breaking existing user sessions
