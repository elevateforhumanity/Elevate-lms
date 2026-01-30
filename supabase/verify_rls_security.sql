-- RLS Security Verification Queries
-- Run these to verify tenant isolation is working correctly

-- 1. List all tables with RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 2. List all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. Check for SECURITY DEFINER functions (potential privilege escalation)
SELECT proname, prosecdef, proowner::regrole
FROM pg_proc 
WHERE pronamespace = 'public'::regnamespace 
  AND prosecdef = true;

-- 4. Verify tenant_id protection trigger exists
SELECT tgname, tgrelid::regclass, tgfoid::regproc
FROM pg_trigger
WHERE tgname = 'protect_tenant_id';

-- 5. Test query: Attempt to see another tenant's data (should return empty)
-- Replace with actual tenant IDs to test
-- SELECT * FROM profiles WHERE tenant_id != (SELECT tenant_id FROM profiles WHERE id = auth.uid());

-- 6. Verify licenses policy uses get_current_tenant_id()
SELECT policyname, qual, with_check 
FROM pg_policies 
WHERE tablename = 'licenses';
