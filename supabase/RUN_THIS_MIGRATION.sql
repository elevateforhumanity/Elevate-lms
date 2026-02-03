-- ============================================
-- SOFT HOLDS MIGRATION - SAFE VERSION
-- Run this in Supabase SQL Editor
-- ============================================

-- First, check what enrollments actually is
DO $$
DECLARE
  obj_type TEXT;
BEGIN
  SELECT CASE 
    WHEN c.relkind = 'r' THEN 'TABLE'
    WHEN c.relkind = 'v' THEN 'VIEW'
    ELSE c.relkind::TEXT
  END INTO obj_type
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relname = 'enrollments' AND n.nspname = 'public';
  
  RAISE NOTICE 'enrollments is a: %', COALESCE(obj_type, 'NOT FOUND');
END $$;

-- ============================================
-- 1. PROGRAMS TABLE - Add availability fields
-- ============================================

DO $$ 
BEGIN
  -- Add columns one by one
  BEGIN
    ALTER TABLE public.programs ADD COLUMN availability_status TEXT DEFAULT 'open';
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN next_start_date DATE;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN enrollment_deadline DATE;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN seats_available INTEGER;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN total_seats INTEGER;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN funding_cycle TEXT;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN funding_confirmed BOOLEAN DEFAULT true;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN is_apprenticeship BOOLEAN DEFAULT false;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.programs ADD COLUMN requires_employer_match BOOLEAN DEFAULT false;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
END $$;

-- Index for programs
CREATE INDEX IF NOT EXISTS idx_programs_availability ON public.programs(availability_status);
CREATE INDEX IF NOT EXISTS idx_programs_is_apprenticeship ON public.programs(is_apprenticeship);

-- Mark apprenticeship programs
UPDATE public.programs 
SET is_apprenticeship = true, requires_employer_match = true
WHERE slug IN ('barber-apprenticeship', 'barber', 'cosmetology-apprenticeship', 'esthetician-apprenticeship', 'nail-technician-apprenticeship')
   OR name ILIKE '%apprenticeship%';

-- Set default availability
UPDATE public.programs 
SET availability_status = 'open'
WHERE is_active = true AND availability_status IS NULL;

-- ============================================
-- 2. APPLICATIONS TABLE - Add eligibility fields
-- ============================================

DO $$ 
BEGIN
  BEGIN
    ALTER TABLE public.applications ADD COLUMN program_slug TEXT;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN payment_received_at TIMESTAMPTZ;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN eligibility_status TEXT DEFAULT 'pending';
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN eligibility_verified_at TIMESTAMPTZ;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN advisor_assigned UUID;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN advisor_notes TEXT;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN next_step TEXT;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE public.applications ADD COLUMN next_step_due_date DATE;
  EXCEPTION WHEN duplicate_column THEN NULL;
  END;
END $$;

CREATE INDEX IF NOT EXISTS idx_applications_program_slug ON public.applications(program_slug);
CREATE INDEX IF NOT EXISTS idx_applications_eligibility ON public.applications(eligibility_status);

-- ============================================
-- 3. PAYMENT_LOGS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID,
  enrollment_id UUID,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  payment_option TEXT,
  amount INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_user ON public.payment_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_stripe ON public.payment_logs(stripe_session_id);

-- RLS for payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own payment logs" ON public.payment_logs;
CREATE POLICY "Users view own payment logs" ON public.payment_logs
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 4. STUDENT_ENROLLMENTS TABLE (if enrollments is a view)
-- This is the actual enrollment tracking table
-- ============================================

CREATE TABLE IF NOT EXISTS public.student_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id),
  program_slug TEXT,
  application_id UUID,
  
  -- Status tracking
  status TEXT DEFAULT 'applied',
  payment_status TEXT DEFAULT 'pending',
  payment_option TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  
  -- Stripe
  stripe_checkout_session_id TEXT,
  stripe_payment_intent_id TEXT,
  
  -- Approval tracking
  approved_at TIMESTAMPTZ,
  approved_by UUID,
  
  -- Pause tracking
  paused_at TIMESTAMPTZ,
  pause_reason TEXT,
  
  -- Agreement
  agreement_signed BOOLEAN DEFAULT false,
  agreement_signed_at TIMESTAMPTZ,
  
  -- Funding
  funding_source TEXT,
  
  -- Timestamps
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(student_id, program_id)
);

-- Add constraint for status
ALTER TABLE public.student_enrollments DROP CONSTRAINT IF EXISTS student_enrollments_status_check;
ALTER TABLE public.student_enrollments ADD CONSTRAINT student_enrollments_status_check 
  CHECK (status IN ('applied', 'enrolled_pending_approval', 'active', 'paused', 'completed', 'withdrawn', 'cancelled'));

-- Add constraint for payment_option
ALTER TABLE public.student_enrollments DROP CONSTRAINT IF EXISTS student_enrollments_payment_option_check;
ALTER TABLE public.student_enrollments ADD CONSTRAINT student_enrollments_payment_option_check 
  CHECK (payment_option IS NULL OR payment_option IN ('full', 'deposit', 'installment', 'funded', 'employer_paid'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_student_enrollments_student ON public.student_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_enrollments_status ON public.student_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_student_enrollments_program ON public.student_enrollments(program_slug);

-- RLS
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own enrollments" ON public.student_enrollments;
CREATE POLICY "Users view own enrollments" ON public.student_enrollments
  FOR SELECT USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users insert own enrollments" ON public.student_enrollments;
CREATE POLICY "Users insert own enrollments" ON public.student_enrollments
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- ============================================
-- 5. HELPER FUNCTION: Check enrollment access
-- ============================================

CREATE OR REPLACE FUNCTION public.check_enrollment_access(
  p_user_id UUID,
  p_program_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  can_access_portal BOOLEAN,
  can_track_hours BOOLEAN,
  can_access_milady BOOLEAN,
  enrollment_status TEXT,
  message TEXT
) AS $$
DECLARE
  v_enrollment RECORD;
BEGIN
  -- Check student_enrollments table
  SELECT e.status, e.agreement_signed
  INTO v_enrollment
  FROM public.student_enrollments e
  WHERE e.student_id = p_user_id
    AND (p_program_slug IS NULL OR e.program_slug = p_program_slug)
  ORDER BY e.created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 
      false, false, false, 
      NULL::TEXT, 
      'No enrollment found. Please apply first.'::TEXT;
    RETURN;
  END IF;

  CASE v_enrollment.status
    WHEN 'active' THEN
      RETURN QUERY SELECT 
        true, true, 
        COALESCE(v_enrollment.agreement_signed, false),
        v_enrollment.status,
        CASE WHEN v_enrollment.agreement_signed 
          THEN 'Full access granted.'
          ELSE 'Sign agreement to access training materials.'
        END;
    WHEN 'enrolled_pending_approval' THEN
      RETURN QUERY SELECT 
        false, false, false,
        v_enrollment.status,
        'Payment received. Waiting for approval and shop assignment.'::TEXT;
    WHEN 'applied' THEN
      RETURN QUERY SELECT 
        false, false, false,
        v_enrollment.status,
        'Application submitted. Complete payment to continue.'::TEXT;
    WHEN 'paused' THEN
      RETURN QUERY SELECT 
        false, false, false,
        v_enrollment.status,
        'Enrollment paused. Contact support to resolve.'::TEXT;
    ELSE
      RETURN QUERY SELECT 
        false, false, false,
        v_enrollment.status,
        'Enrollment not active.'::TEXT;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.check_enrollment_access TO authenticated;

-- ============================================
-- DONE - Migration complete
-- ============================================
SELECT 'Migration completed successfully' as result;
