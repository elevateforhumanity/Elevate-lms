# Get Admin Access Right Now - Simple Steps

## The Problem

The `/admin` page redirects because you're not logged in with an admin account.

---

## Solution (5 Minutes)

### Step 1: Go to Supabase Auth
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/auth/users

### Step 2: Create Admin User

Click **"Add user"** (top right)

Select **"Create new user"**

Fill in:
- **Email:** your@email.com (use your real email)
- **Password:** (create a password you'll remember)
- **Auto Confirm User:** ✅ CHECK THIS BOX

Click **"Create user"**

### Step 3: Set Admin Role

Go to SQL Editor:
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

**Copy this entire block and paste it:**

```sql
-- Replace YOUR_EMAIL with the email you just created
INSERT INTO profiles (id, email, role, full_name)
SELECT 
  id,
  'YOUR_EMAIL@example.com' as email,
  'super_admin' as role,
  'Admin User' as full_name
FROM auth.users 
WHERE email = 'YOUR_EMAIL@example.com'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'super_admin',
  full_name = 'Admin User';

-- Check it worked
SELECT 
  u.email,
  p.role,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'YOUR_EMAIL@example.com';
```

**IMPORTANT:** Replace `YOUR_EMAIL@example.com` with your actual email (both places)

Click **"Run"**

You should see output showing your email with role = `super_admin`

### Step 4: Login

Go to: **https://elevateforhumanity.institute/login**

Enter:
- Email: (the email you created)
- Password: (the password you set)

Click **"Login"**

### Step 5: Access Admin

After logging in, go to:
**https://elevateforhumanity.institute/admin**

✅ **Should work now!**

---

## If It Still Doesn't Work

### Check 1: Are you logged in?

Open browser console (F12), go to Console tab, type:
```javascript
document.cookie
```

Should see cookies with "sb-" prefix. If not, you're not logged in.

### Check 2: Is your role correct?

Go back to Supabase SQL Editor and run:
```sql
SELECT 
  u.email,
  p.role
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'YOUR_EMAIL@example.com';
```

Should show `super_admin`. If it shows `null` or `student`, run the INSERT query again.

### Check 3: Clear browser cache

Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

Then try accessing `/admin` again.

---

## Alternative: Use Programs Page

If admin still doesn't work, you can manage programs here:
https://elevateforhumanity.institute/programs

This page shows all 53 programs and doesn't require admin access.

---

## Quick Troubleshooting

### "Unauthorized" error
**Fix:** Your role is not admin. Run the SQL query again to set role.

### "Redirecting to login" loop
**Fix:** You're not logged in. Go to `/login` first, then `/admin`.

### Page is blank/white
**Fix:** 
1. Check browser console (F12) for errors
2. Try incognito/private window
3. Clear cache and cookies

### "Profile not found"
**Fix:** The INSERT query didn't work. Try this simpler version:
```sql
UPDATE profiles 
SET role = 'super_admin' 
WHERE email = 'YOUR_EMAIL@example.com';
```

---

## Complete Fresh Start

If nothing works, start completely fresh:

### 1. Delete existing user (if any)
In Supabase Auth Users page, find your email and delete it.

### 2. Create new user
Follow Step 2 above.

### 3. Set role immediately
Run this right after creating user:
```sql
INSERT INTO profiles (id, email, role, full_name)
SELECT id, email, 'super_admin', 'Admin'
FROM auth.users 
WHERE email = 'YOUR_EMAIL@example.com';
```

### 4. Login and test
Go to `/login`, login, then go to `/admin`.

---

## What You Should See

After successful login and going to `/admin`, you should see:

- **Admin Dashboard** with stats
- **Navigation menu** with admin options
- **Metrics** showing:
  - Total students
  - Total enrollments
  - Active programs
  - Partner courses

If you see this, ✅ **SUCCESS!**

---

## Email Setup (After Admin Works)

Once you have admin access, set up email:

### 1. Configure Supabase SMTP

Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/auth

Scroll to "SMTP Settings"

Enable Custom SMTP:
```
Host: smtp.resend.com
Port: 587
User: resend
Password: re_gBrK59nn_CAeQ8tyU7pihrvj6Y3Q3T8kJ
Sender: noreply@elevateforhumanity.institute
Name: Elevate for Humanity
```

### 2. Test Email

In Supabase Auth Users page:
- Click "Invite User"
- Enter a test email
- Check if email is received

---

## Summary

1. ✅ Create user in Supabase Auth
2. ✅ Set role to 'super_admin' via SQL
3. ✅ Login at `/login`
4. ✅ Go to `/admin`
5. ✅ Should work!

**The key: Make sure role = 'super_admin' BEFORE logging in.**

---

## Need Help?

If still not working after following all steps:

1. Take screenshot of:
   - Supabase Auth Users page (showing your user)
   - SQL query result (showing your role)
   - Browser console errors (F12 → Console tab)

2. Check these:
   - Email is correct in both Supabase Auth and profiles table
   - Role is exactly 'super_admin' (not 'admin', not 'Super_Admin')
   - You're logged in (check cookies)
   - You're going to the right URL (elevateforhumanity.institute/admin)

---

**Start with Step 1 and work through each step. Don't skip any!** 🎯
