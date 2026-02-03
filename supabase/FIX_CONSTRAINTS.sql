-- ============================================
-- FIX CONSTRAINTS - Run after main migration
-- ============================================

-- First, see what status values exist
SELECT DISTINCT status, COUNT(*) 
FROM public.student_enrollments 
GROUP BY status;

-- Update any non-conforming status values to valid ones
UPDATE public.student_enrollments 
SET status = 'applied' 
WHERE status IS NULL OR status NOT IN ('applied', 'enrolled_pending_approval', 'active', 'paused', 'completed', 'withdrawn', 'cancelled');

-- Update legacy 'pending' to 'applied'
UPDATE public.student_enrollments 
SET status = 'applied' 
WHERE status = 'pending';

-- Update legacy 'enrolled' to 'active'
UPDATE public.student_enrollments 
SET status = 'active' 
WHERE status = 'enrolled';

-- Now add the constraint
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

SELECT 'Constraints fixed successfully' as result;
