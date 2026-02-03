-- ============================================
-- STEP 2: FIX DATA AND ADD CONSTRAINTS
-- Run this AFTER Step 1 completes
-- ============================================

-- Update any non-conforming status values
UPDATE public.student_enrollments 
SET status = 'applied' 
WHERE status IS NULL 
   OR status NOT IN ('applied', 'enrolled_pending_approval', 'active', 'paused', 'completed', 'withdrawn', 'cancelled');

-- Now add the status constraint
ALTER TABLE public.student_enrollments DROP CONSTRAINT IF EXISTS student_enrollments_status_check;
ALTER TABLE public.student_enrollments ADD CONSTRAINT student_enrollments_status_check 
  CHECK (status IN ('applied', 'enrolled_pending_approval', 'active', 'paused', 'completed', 'withdrawn', 'cancelled'));

-- Fix payment_option values
UPDATE public.student_enrollments 
SET payment_option = NULL 
WHERE payment_option IS NOT NULL 
  AND payment_option NOT IN ('full', 'deposit', 'installment', 'funded', 'employer_paid');

-- Now add payment_option constraint
ALTER TABLE public.student_enrollments DROP CONSTRAINT IF EXISTS student_enrollments_payment_option_check;
ALTER TABLE public.student_enrollments ADD CONSTRAINT student_enrollments_payment_option_check 
  CHECK (payment_option IS NULL OR payment_option IN ('full', 'deposit', 'installment', 'funded', 'employer_paid'));

SELECT 'Step 2 complete - constraints added' as result;
