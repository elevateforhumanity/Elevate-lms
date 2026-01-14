# Supabase Configuration Update Guide

## Project Information
- **Project ID:** `cuxzzpsyufcewtmicszk`
- **Dashboard URL:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk

---

## Step-by-Step Update Instructions

### 1. Update Site URL

**Navigate to:**
```
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/url-configuration
```

**Update:**
- **Site URL:** Change to `https://www.elevateforhumanity.org`
- Click **Save**

---

### 2. Update Redirect URLs

**Same page as above** (Authentication → URL Configuration)

**Add to Redirect URLs:**
```
https://www.elevateforhumanity.org/**
```

**Keep temporarily (for transition period):**
```
https://elevateforhumanity.org/**
```

Click **Save**

---

### 3. Update Email Templates

**Navigate to:**
```
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/templates
```

**Check and update these templates:**

#### Confirm Signup
- Look for any `elevateforhumanity.org` URLs
- Replace with `www.elevateforhumanity.org`

#### Invite User
- Look for any `elevateforhumanity.org` URLs
- Replace with `www.elevateforhumanity.org`

#### Magic Link
- Look for any `elevateforhumanity.org` URLs
- Replace with `www.elevateforhumanity.org`

#### Reset Password
- Look for any `elevateforhumanity.org` URLs
- Replace with `www.elevateforhumanity.org`

#### Change Email Address
- Look for any `elevateforhumanity.org` URLs
- Replace with `www.elevateforhumanity.org`

**Save each template after updating**

---

### 4. Update CORS Settings

**Navigate to:**
```
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
```

**Scroll to:** "CORS Configuration" or "Allowed Origins"

**Add:**
```
https://www.elevateforhumanity.org
```

**Keep temporarily:**
```
https://elevateforhumanity.org
```

Click **Save**

---

### 5. Verify Environment Variables (Optional)

**Navigate to:**
```
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
```

**Confirm these values are correct:**
- Project URL: Should be `https://cuxzzpsyufcewtmicszk.supabase.co`
- Anon/Public Key: Copy if needed for local development
- Service Role Key: Copy if needed (keep secret!)

---

## Testing After Updates

### Test Authentication Flow

1. **Sign Up Test:**
   ```
   Visit: https://www.elevateforhumanity.org/signup
   Create test account
   Check email for confirmation link
   Verify link uses .institute domain
   ```

2. **Sign In Test:**
   ```
   Visit: https://www.elevateforhumanity.org/signin
   Sign in with test account
   Verify successful authentication
   ```

3. **Password Reset Test:**
   ```
   Visit: https://www.elevateforhumanity.org/forgot-password
   Request password reset
   Check email for reset link
   Verify link uses .institute domain
   ```

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Visit: https://www.elevateforhumanity.org
4. Look for any CORS errors or authentication errors
5. Should see no errors related to Supabase

### Test API Requests

```bash
# Test from command line
curl -X GET 'https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## Rollback Plan (If Issues Occur)

If you encounter problems after updating:

1. **Revert Site URL:**
   - Change back to `https://elevateforhumanity.org`

2. **Keep Both Domains in Redirect URLs:**
   - Ensure both .org and .institute are listed

3. **Check Email Templates:**
   - Verify no syntax errors were introduced

4. **Clear Browser Cache:**
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear cookies for the site

---

## Transition Period Best Practices

### Keep Both Domains Active (30-90 days)

**Why:**
- Users may have bookmarked .org URLs
- Email links may still reference .org
- OAuth callbacks may be cached

**What to Keep:**
- Both domains in Redirect URLs
- Both domains in CORS settings
- Domain redirect from .org to .institute (already configured)

### After Transition Period

**Remove .org references:**
1. Remove `https://elevateforhumanity.org/**` from Redirect URLs
2. Remove `https://elevateforhumanity.org` from CORS settings
3. Keep domain redirect active indefinitely

---

## Common Issues and Solutions

### Issue: "Invalid redirect URL" error
**Solution:** Ensure `https://www.elevateforhumanity.org/**` is in Redirect URLs with the `/**` wildcard

### Issue: CORS errors in browser console
**Solution:** Add `https://www.elevateforhumanity.org` to allowed origins in API settings

### Issue: Email links still use .org domain
**Solution:** Update email templates and save each one individually

### Issue: OAuth providers not working
**Solution:** Update OAuth callback URLs in provider settings (Google, GitHub, etc.)

---

## Verification Checklist

After completing all updates, verify:

- [ ] Site URL updated to .institute
- [ ] Redirect URLs include .institute
- [ ] All email templates updated
- [ ] CORS settings include .institute
- [ ] Test signup works
- [ ] Test signin works
- [ ] Test password reset works
- [ ] No CORS errors in console
- [ ] API requests succeed

---

## Support

If you encounter issues:

1. Check Supabase logs:
   ```
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/explorer
   ```

2. Review authentication logs:
   ```
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users
   ```

3. Consult Supabase documentation:
   - https://supabase.com/docs/guides/auth
   - https://supabase.com/docs/guides/auth/redirect-urls

---

## Quick Links

- **Dashboard:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **Auth Settings:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/url-configuration
- **Email Templates:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/templates
- **API Settings:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
- **Logs:** https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs/explorer
