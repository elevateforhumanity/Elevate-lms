-- Migration: Soft Holds Schema Updates
-- Adds fields needed for proper enrollment state tracking and program availability
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. ENROLLMENTS TABLE UPDATES
-- ============================================

-- Drop the old status constraint and add new one with more states
ALTER TABLE public.enrollments 
DROP CONSTRAINT IF EXISTS enrollments_status_check;

ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_status_check 
CHECK (status IN (
  'applied',                    -- Application submitted, no payment
  'enrolled_pending_approval',  -- Payment received, waiting for approval
  'active',                     -- Approved, full access granted
  'paused',                     -- Temporarily suspended (payment failed, compliance)
  'completed',                  -- Program finished
  'withdrawn',                  -- Student withdrew
  'cancelled',                  -- Admin cancelled
  'pending'                     -- Legacy: treat as 'applied'
));

-- Add new columns for enrollment tracking
ALTER TABLE public.enrollments 
ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES public.applications(id),
ADD COLUMN IF NOT EXISTS program_slug TEXT,
ADD COLUMN IF NOT EXISTS payment_option TEXT CHECK (payment_option IN ('full', 'deposit', 'installment', 'funded', 'employer_paid')),
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS paused_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS pause_reason TEXT,
ADD COLUMN IF NOT EXISTS agreement_signed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS agreement_signed_at TIMESTAMP WITH TIME ZONE;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_application_id ON public.enrollments(application_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program_slug ON public.enrollments(program_slug);

-- ============================================
-- 2. PROGRAMS TABLE UPDATES
-- ============================================

-- Add availability and funding cycle fields
ALTER TABLE public.programs
ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'open' 
  CHECK (availability_status IN ('open', 'waitlist', 'closed', 'funding_pending', 'coming_soon')),
ADD COLUMN IF NOT EXISTS next_start_date DATE,
ADD COLUMN IF NOT EXISTS enrollment_deadline DATE,
ADD COLUMN IF NOT EXISTS seats_available INTEGER,
ADD COLUMN IF NOT EXISTS total_seats INTEGER,
ADD COLUMN IF NOT EXISTS funding_cycle TEXT,
ADD COLUMN IF NOT EXISTS funding_confirmed BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_apprenticeship BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS requires_employer_match BOOLEAN DEFAULT false;

-- Index for availability queries
CREATE INDEX IF NOT EXISTS idx_programs_availability ON public.programs(availability_status);
CREATE INDEX IF NOT EXISTS idx_programs_is_apprenticeship ON public.programs(is_apprenticeship);

-- ============================================
-- 3. APPLICATIONS TABLE UPDATES
-- ============================================

-- Ensure applications table has needed fields
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS program_slug TEXT,
ADD COLUMN IF NOT EXISTS payment_received_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS eligibility_status TEXT DEFAULT 'pending'
  CHECK (eligibility_status IN ('pending', 'eligible', 'ineligible', 'review_needed')),
ADD COLUMN IF NOT EXISTS eligibility_verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS eligibility_verified_by UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS advisor_assigned UUID REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS advisor_notes TEXT,
ADD COLUMN IF NOT EXISTS next_step TEXT,
ADD COLUMN IF NOT EXISTS next_step_due_date DATE;

-- Index for application lookups
CREATE INDEX IF NOT EXISTS idx_applications_program_slug ON public.applications(program_slug);
CREATE INDEX IF NOT EXISTS idx_applications_eligibility_status ON public.applications(eligibility_status);

-- ============================================
-- 4. PAYMENT LOGS TABLE (NEW)
-- ============================================

CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id),
  enrollment_id UUID REFERENCES public.enrollments(id),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  payment_option TEXT,
  amount INTEGER, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'checkout_started', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_user ON public.payment_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_stripe_session ON public.payment_logs(stripe_session_id);

-- ============================================
-- 5. UPDATE EXISTING DATA
-- ============================================

-- Mark apprenticeship programs
UPDATE public.programs 
SET is_apprenticeship = true, requires_employer_match = true
WHERE slug IN ('barber-apprenticeship', 'barber', 'cosmetology-apprenticeship', 'esthetician-apprenticeship', 'nail-technician-apprenticeship')
  OR name ILIKE '%apprenticeship%';

-- Set default availability for active programs
UPDATE public.programs 
SET availability_status = 'open'
WHERE is_active = true AND availability_status IS NULL;

-- Migrate legacy 'pending' status to 'applied'
UPDATE public.enrollments 
SET status = 'applied' 
WHERE status = 'pending';

-- ============================================
-- 6. RLS POLICIES
-- ============================================

-- Payment logs: users can see their own
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payment logs" ON public.payment_logs;
CREATE POLICY "Users can view own payment logs" ON public.payment_logs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage payment logs" ON public.payment_logs;
CREATE POLICY "Service role can manage payment logs" ON public.payment_logs
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- 7. HELPER FUNCTION: Check enrollment access
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
  -- Get the most recent enrollment for this user/program
  SELECT e.status, e.agreement_signed
  INTO v_enrollment
  FROM public.enrollments e
  WHERE e.user_id = p_user_id
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

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.check_enrollment_access TO authenticated;

-- ============================================
-- DONE
-- ============================================
