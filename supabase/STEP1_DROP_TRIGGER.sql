-- ============================================
-- STEP 1: DROP BROKEN TRIGGER FIRST
-- Run this ALONE before anything else
-- ============================================

-- Drop the broken function (CASCADE drops all triggers using it)
DROP FUNCTION IF EXISTS sync_enrollment_status() CASCADE;

-- Also try dropping triggers directly in case they exist
DROP TRIGGER IF EXISTS sync_enrollment_status_trigger ON public.student_enrollments;
DROP TRIGGER IF EXISTS sync_enrollment_status_trigger ON public.enrollments;
DROP TRIGGER IF EXISTS trg_sync_enrollment_status ON public.student_enrollments;
DROP TRIGGER IF EXISTS trg_sync_enrollment_status ON public.enrollments;

SELECT 'Step 1 complete - trigger dropped' as result;
