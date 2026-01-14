# Supabase Redirect URLs Cleanup

## Current Status
You have 16 old Netlify preview deployment URLs that should be removed.

## What to Keep vs Delete

### ✅ KEEP (Add if not present)
```
https://www.elevateforhumanity.org/**
https://elevateforhumanity.org/**
```

### ❌ DELETE (All old preview URLs)
```
https://fix2-gpql-elevate-48e460c9.netlify.app/
https://fix2-gpql-elevate-48e460c9.netlify.app/**
https://fix2-*-gpql-elevate-48e460c9.netlify.app
https://fix2-*-gpql-elevate-48e460c9.netlify.app/**
https://fix2-elevate-48e460c9.netlify.app/
https://fix2-elevate-48e460c9.netlify.app/**
https://fix2-*-elevate-48e460c9.netlify.app
https://fix2-*-elevate-48e460c9.netlify.app/**
https://fix2-elevateforhumanity-elevate-48e460c9.netlify.app/
https://fix2-elevateforhumanity-elevate-48e460c9.netlify.app/**
https://fix2-*-elevateforhumanity-elevate-48e460c9.netlify.app
https://fix2-*-elevateforhumanity-elevate-48e460c9.netlify.app/**
https://fix2-lizzy6262.netlify.app/
https://fix2-lizzy6262.netlify.app/**
https://fix2-*-lizzy6262.netlify.app
https://fix2-*-lizzy6262.netlify.app/**
```

## Why Delete These?

1. **Old Preview Deployments:** These are temporary Netlify preview URLs from old branches
2. **Security Risk:** Leaving old URLs allows authentication from outdated deployments
3. **Clutter:** Makes configuration harder to manage
4. **Not Needed:** Your production site uses the .institute domain

## Step-by-Step Cleanup

### 1. Delete All Old URLs
- Click the trash icon next to each old Netlify URL
- Delete all 16 URLs listed above

### 2. Add Production URLs
After deleting, add these two URLs:

**Add:**
```
https://www.elevateforhumanity.org/**
```
Click "Add URL"

**Add:**
```
https://elevateforhumanity.org/**
```
Click "Add URL"

### 3. Save Changes
Click "Save changes" button

## Final Configuration Should Look Like

**Site URL:**
```
https://www.elevateforhumanity.org
```

**Redirect URLs (Total: 2):**
```
https://www.elevateforhumanity.org/**
https://elevateforhumanity.org/**
```

## Why Keep .org?

Keep `https://elevateforhumanity.org/**` temporarily (30-90 days) because:
- Users may have bookmarked .org URLs
- Email links may still reference .org
- The domain redirect will send them to .institute anyway
- Prevents authentication errors during transition

## When to Remove .org

After 30-90 days:
1. Remove `https://elevateforhumanity.org/**` from redirect URLs
2. Keep only `https://www.elevateforhumanity.org/**`
3. Domain redirect will still work for regular page visits

## Optional: Development URLs

If you need to test authentication in local development or preview deployments, you can add:

**For local development:**
```
http://localhost:3000/**
```

**For Netlify previews (if needed):**
```
https://*-elevate-lms.netlify.app/**
```

But these are optional and only needed if you're actively testing authentication in those environments.
