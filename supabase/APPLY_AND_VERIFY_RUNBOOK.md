# RLS Security Fix - Apply and Verify Runbook

## Migrations to Apply

1. `20260129_fix_rls_user_metadata_security.sql` - Fixes functions to use profiles table
2. `20260130_protect_tenant_id.sql` - Prevents users from modifying their tenant_id

---

## Apply (Local Supabase)

```bash
# Option 1: Fresh reset (safest)
supabase db reset

# Option 2: Incremental
supabase migration up
```

## Apply (Hosted Supabase)

```bash
# Via CLI
supabase link --project-ref <ref>
supabase db push

# Or paste SQL directly in Supabase SQL Editor
```

---

## Verification Queries

### 1. Confirm migrations applied

```sql
SELECT version, name 
FROM supabase_migrations.schema_migrations 
ORDER BY version DESC 
LIMIT 10;
```

Expected: See `20260129_fix_rls_user_metadata_security` and `20260130_protect_tenant_id`

---

### 2. Verify functions are profile-based (not user_metadata)

```sql
-- Check function definitions
SELECT 
  p.proname AS function_name,
  pg_get_functiondef(p.oid) AS definition
FROM pg_proc p 
JOIN pg_namespace n ON n.oid = p.pronamespace 
WHERE p.proname IN ('get_current_tenant_id', 'is_super_admin') 
  AND n.nspname = 'public';
```

Expected: 
- `get_current_tenant_id()` queries `profiles` table, NOT `auth.users` or `user_metadata`
- `is_super_admin()` queries `profiles` table

---

### 3. Verify RLS enabled on all protected tables

```sql
SELECT 
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('tenants', 'licenses', 'license_purchases', 'provisioning_events', 'license_violations', 'profiles')
ORDER BY c.relname;
```

Expected: All tables show `rls_enabled = true`

---

### 4. List all policies (verify no user_metadata references)

```sql
SELECT 
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('tenants', 'licenses', 'license_purchases', 'provisioning_events', 'license_violations', 'profiles')
ORDER BY tablename, policyname;
```

Expected:
- No `user_metadata` in any qual or with_check
- Policies use `get_current_tenant_id()` or `profiles.tenant_id`

---

### 5. Verify tenant_id protection trigger exists

```sql
SELECT 
  tgname AS trigger_name,
  tgrelid::regclass AS table_name,
  tgfoid::regproc AS function_name
FROM pg_trigger
WHERE tgname = 'protect_tenant_id';
```

Expected: Trigger `protect_tenant_id` on `profiles` table

---

### 6. Verify profiles UPDATE policy has WITH CHECK constraint

```sql
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles' AND cmd = 'UPDATE';
```

Expected: `with_check` contains constraint preventing tenant_id changes

---

## Attack Simulation Test

### Test 1: Attempt to modify own tenant_id (should fail)

```sql
-- As authenticated user, try to change tenant_id
UPDATE profiles 
SET tenant_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
WHERE id = auth.uid();
```

Expected: Error `tenant_id cannot be modified` (from trigger)

### Test 2: user_metadata manipulation (should have no effect)

1. In Supabase Auth dashboard, edit a user's `user_metadata.tenant_id` to a different tenant
2. As that user, run:

```sql
SELECT * FROM licenses;
```

Expected: Only sees licenses from their ORIGINAL tenant (from profiles table), not the manipulated tenant_id

---

## SECURITY DEFINER Review

The `get_current_tenant_id()` function uses SECURITY DEFINER. This is safe because:

1. It only reads from `profiles` using `auth.uid()` - users can only get their own tenant_id
2. It has `SET search_path = public` to prevent search_path attacks
3. It returns a single value, not a result set that could leak data

If you need to harden further, add:

```sql
ALTER FUNCTION get_current_tenant_id() SET row_security = on;
```

---

## Quick Sanity Check

Run this single query to verify the fix is in place:

```sql
SELECT 
  'get_current_tenant_id' AS check_item,
  CASE 
    WHEN pg_get_functiondef(p.oid) NOT LIKE '%user_metadata%' 
         AND pg_get_functiondef(p.oid) LIKE '%profiles%'
    THEN '✅ SECURE'
    ELSE '❌ VULNERABLE'
  END AS status
FROM pg_proc p 
JOIN pg_namespace n ON n.oid = p.pronamespace 
WHERE p.proname = 'get_current_tenant_id' AND n.nspname = 'public'

UNION ALL

SELECT 
  'profiles.tenant_id protection',
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'protect_tenant_id'
  ) THEN '✅ PROTECTED' ELSE '❌ UNPROTECTED' END

UNION ALL

SELECT 
  'RLS on licenses',
  CASE WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'licenses')
  THEN '✅ ENABLED' ELSE '❌ DISABLED' END;
```

Expected: All items show ✅
