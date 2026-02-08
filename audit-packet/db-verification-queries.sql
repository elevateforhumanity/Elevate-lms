-- ============================================================================
-- DB VERIFICATION QUERIES FOR AUDIT
-- Run these in Supabase SQL Editor to verify enrollment system integrity
-- ============================================================================

-- 1. ENROLLMENT SPINE VERIFICATION
-- After webhook, these tables should all have matching records

-- Check student_enrollments
SELECT 
  'student_enrollments' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN enrollment_state IS NOT NULL THEN 1 END) as with_state,
  COUNT(CASE WHEN stripe_checkout_session_id IS NOT NULL THEN 1 END) as with_stripe
FROM student_enrollments
WHERE program_slug = 'barber-apprenticeship';

-- Check enrollments
SELECT 
  'enrollments' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN enrollment_state IS NOT NULL THEN 1 END) as with_state
FROM enrollments
WHERE program_slug = 'barber-apprenticeship';

-- Check apprentices
SELECT 
  'apprentices' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as with_user_id,
  COUNT(CASE WHEN start_date IS NOT NULL THEN 1 END) as with_start_date
FROM apprentices;

-- 2. STATE DISTRIBUTION
-- Shows current enrollment states
SELECT 
  enrollment_state,
  COUNT(*) as count
FROM student_enrollments
WHERE program_slug = 'barber-apprenticeship'
GROUP BY enrollment_state
ORDER BY count DESC;

-- 3. ORIENTATION COMPLETION CHECK
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN orientation_completed_at IS NOT NULL THEN 1 END) as orientation_complete,
  COUNT(CASE WHEN documents_submitted_at IS NOT NULL THEN 1 END) as documents_submitted
FROM student_enrollments
WHERE program_slug = 'barber-apprenticeship';

-- 4. PAYMENT STATUS CHECK
SELECT 
  bs.status as subscription_status,
  COUNT(*) as count
FROM barber_subscriptions bs
GROUP BY bs.status;

-- 5. WEBHOOK IDEMPOTENCY CHECK
-- Should show no duplicate event_ids
SELECT 
  stripe_event_id,
  COUNT(*) as occurrences
FROM stripe_webhook_events
GROUP BY stripe_event_id
HAVING COUNT(*) > 1;

-- 6. PROGRESS ENTRIES INTEGRITY
-- Check for orphaned or invalid entries
SELECT 
  COUNT(*) as total_entries,
  COUNT(CASE WHEN clock_in_at IS NOT NULL THEN 1 END) as with_clock_in,
  COUNT(CASE WHEN clock_out_at IS NOT NULL THEN 1 END) as with_clock_out,
  COUNT(CASE WHEN clock_out_at IS NULL AND clock_in_at < NOW() - INTERVAL '12 hours' THEN 1 END) as stale_open_sessions
FROM progress_entries;

-- 7. DOCUMENT VERIFICATION
SELECT 
  document_type,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved
FROM enrollment_documents
GROUP BY document_type;

-- 8. AUDIT TRAIL CHECK
SELECT 
  event_type,
  COUNT(*) as count
FROM enrollment_state_audit
GROUP BY event_type
ORDER BY count DESC
LIMIT 10;

-- 9. PARTNER/SHOP STATUS
SELECT 
  status,
  COUNT(*) as count
FROM partners
GROUP BY status;

-- 10. OVERRIDE AUDIT
SELECT 
  action,
  COUNT(*) as total,
  COUNT(CASE WHEN active = true AND expires_at > NOW() THEN 1 END) as currently_active
FROM enrollment_overrides
GROUP BY action;
