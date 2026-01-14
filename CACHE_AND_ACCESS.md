# Cache & Access Issues - Solutions

## The Real Issue

The `/admin/login` page **intentionally redirects** to `/login`. This is not a cache issue - it's how the code works.

---

## Solution: Use the Correct URL

### ❌ DON'T USE:
- `https://www.elevateforhumanity.org/admin/login`
- `https://www.elevateforhumanity.org/admin` (when not logged in)

### ✅ USE INSTEAD:
1. **Login here:** `https://www.elevateforhumanity.org/login`
2. **Then go to:** `https://www.elevateforhumanity.org/admin`

---

## Step-by-Step Access

### 1. Set Your Role to Admin

Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

Run:
```sql
-- Replace with your actual email
UPDATE profiles 
SET role = 'super_admin'
WHERE email = 'YOUR_EMAIL@example.com';

-- Verify it worked
SELECT email, role FROM profiles WHERE email = 'YOUR_EMAIL@example.com';
```

### 2. Login

Go to: **https://www.elevateforhumanity.org/login**

Enter your credentials and login.

### 3. Access Admin

After logging in, go to: **https://www.elevateforhumanity.org/admin**

Should work now!

---

## If You Want to Clear Cache Anyway

### Browser Cache (Your Side)

**Chrome/Edge:**
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or: DevTools (F12) → Network tab → Check "Disable cache"

**Firefox:**
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Safari:**
- Press `Cmd+Option+R`

### Vercel Cache (Server Side)

**Option 1: Redeploy**
```bash
# In your local terminal
git commit --allow-empty -m "Clear cache"
git push origin main
```

**Option 2: Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Find your project
3. Go to Deployments
4. Click "Redeploy" on latest deployment
5. Check "Use existing Build Cache" = OFF

**Option 3: Purge Specific Path**

Vercel doesn't have a direct cache purge, but you can:
1. Make a small change to the page
2. Commit and push
3. New deployment will have fresh cache

---

## Why The Redirect Happens

Look at the code in `app/admin/login/page.tsx`:

```typescript
export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');  // ← THIS LINE
  }
  // ...
}
```

**Translation:**
- If you're not logged in → redirect to `/login`
- If you ARE logged in → show admin page

**This is intentional design!**

---

## The Correct Flow

```
User → /admin → Not logged in? → /login → Login → /admin ✅
```

**NOT:**
```
User → /admin/login → /login → /admin/login → /login (loop) ❌
```

---

## Quick Test

### Test 1: Check if you're logged in
```bash
# Open browser console (F12) on www.elevateforhumanity.org
# Run:
document.cookie
# Should see session cookies if logged in
```

### Test 2: Check your role
Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

```sql
SELECT 
  u.email,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
ORDER BY u.created_at DESC
LIMIT 10;
```

### Test 3: Access admin
1. Login at: `/login`
2. Go to: `/admin`
3. Should work if role = 'admin' or 'super_admin'

---

## Common Mistakes

### Mistake 1: Going to /admin/login directly
**Fix:** Go to `/login` instead

### Mistake 2: Not having admin role
**Fix:** Run SQL to set role to 'super_admin'

### Mistake 3: Not logged in
**Fix:** Login first at `/login`

### Mistake 4: Expecting /admin/login to be a login form
**Reality:** It's a protected page that redirects to `/login`

---

## Alternative: Fix the Redirect (Code Change)

If you want `/admin/login` to show a login form instead of redirecting:

**Option A: Remove the page**
```bash
rm app/admin/login/page.tsx
```
Then `/admin/login` will 404, and users will naturally go to `/login`

**Option B: Make it redirect to /login with a message**
Edit `app/admin/login/page.tsx`:
```typescript
export default async function AdminLoginRedirect() {
  redirect('/login?message=Please login to access admin dashboard');
}
```

**Option C: Create actual admin login form**
Replace content of `app/admin/login/page.tsx` with a login form component.

---

## Summary

**The "issue" is not a bug or cache problem.**

The system is designed to:
1. Use ONE login page for everyone (`/login`)
2. Check user role after login
3. Route to appropriate dashboard

**To access admin:**
1. Set role to 'super_admin' in database
2. Login at `/login`
3. Go to `/admin`

**That's it!** ✅

---

## Quick Commands

```sql
-- Make yourself admin
UPDATE profiles SET role = 'super_admin' WHERE email = 'your@email.com';

-- Check all users and roles
SELECT u.email, p.role FROM auth.users u LEFT JOIN profiles p ON p.id = u.id;

-- Create test enrollment for student
INSERT INTO enrollments (student_id, program_id, status, enrollment_method)
VALUES (
  (SELECT id FROM profiles WHERE role = 'student' LIMIT 1),
  (SELECT id FROM programs WHERE is_active = true LIMIT 1),
  'active',
  'workforce'
);
```

---

**Bottom line: Use `/login` not `/admin/login`** 🎯
