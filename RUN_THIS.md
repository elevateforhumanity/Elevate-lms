# 🚀 ACTIVATE PARTNER COURSES - SIMPLE INSTRUCTIONS

## You Have 3 SQL Files:

1. **FULL_SQL_STEP1.sql** - Creates tables and providers
2. **FULL_SQL_STEP2.sql** - Loads 64 courses
3. **FULL_SQL_VERIFY.sql** - Checks everything worked

---

## Step-by-Step Instructions

### 1. Go to Supabase Dashboard

Open: https://supabase.com/dashboard
- Select your project
- Click "SQL Editor" in the left menu

### 2. Run Step 1

1. Open file: **FULL_SQL_STEP1.sql**
2. Select ALL text (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)
4. Go back to Supabase SQL Editor
5. Paste (Ctrl+V or Cmd+V)
6. Click "Run" button
7. Wait for "Success" message

**Expected Result:**
- Creates 4 tables
- Inserts 7 providers
- Should see "Success" message

### 3. Run Step 2

1. Open file: **FULL_SQL_STEP2.sql**
2. Select ALL text (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)
4. Go back to Supabase SQL Editor
5. Click "New Query" (to clear previous)
6. Paste (Ctrl+V or Cmd+V)
7. Click "Run" button
8. Wait for completion (may take 30-60 seconds)

**Expected Result:**
- Loads 64 courses
- Shows progress messages
- Final message: "Total courses: 64"

### 4. Verify (Optional but Recommended)

1. Open file: **FULL_SQL_VERIFY.sql**
2. Copy any query you want to run
3. Paste in SQL Editor
4. Click "Run"

**Expected Results:**
- Provider count: 7
- Course count: 64
- 4 tables exist
- RLS enabled on all tables

---

## Quick Verification

After running Step 1 and Step 2, run this quick check:

```sql
SELECT COUNT(*) FROM partner_lms_providers;
-- Should return: 7

SELECT COUNT(*) FROM partner_courses_catalog;
-- Should return: 64
```

---

## ✅ Done!

You now have:
- ✅ 7 partner providers
- ✅ 64 courses loaded
- ✅ Partner course system activated

---

## What's Next?

### Test the Data

```sql
-- View all providers
SELECT * FROM partner_lms_providers;

-- View courses by provider
SELECT 
  pp.provider_name,
  COUNT(*) as courses
FROM partner_courses_catalog pc
JOIN partner_lms_providers pp ON pc.provider_id = pp.id
GROUP BY pp.provider_name;
```

### Test Portals

See: **TEST_PORTALS_COMPLETE_GUIDE.md**
- Configure .env.local
- Create test users
- Test authentication

---

## Troubleshooting

### "Table already exists"
- This is OK! The SQL uses `IF NOT EXISTS`
- It won't duplicate anything

### "Partner providers not found"
- Run Step 1 first
- Make sure it completed successfully

### "Relation does not exist"
- Step 1 didn't complete
- Re-run FULL_SQL_STEP1.sql

---

## Files Location

All files are in your project root:
- `/workspaces/Elevate-lms/FULL_SQL_STEP1.sql`
- `/workspaces/Elevate-lms/FULL_SQL_STEP2.sql`
- `/workspaces/Elevate-lms/FULL_SQL_VERIFY.sql`

---

**That's it! Just copy-paste and run!** 🎉
