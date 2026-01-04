-- ============================================
-- PARTNER LINK COURSES SUPPORT
-- ============================================
-- Adds fields to support partner-delivered courses (Milady, Certiport, etc.)
-- while maintaining backward compatibility with internal courses
-- ============================================

-- Add partner link fields to existing courses table
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS delivery_mode TEXT DEFAULT 'internal',
ADD COLUMN IF NOT EXISTS partner_url TEXT,
ADD COLUMN IF NOT EXISTS launch_mode TEXT DEFAULT 'external',
ADD COLUMN IF NOT EXISTS allow_iframe BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

-- Add constraint for delivery_mode
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'courses_delivery_mode_check'
  ) THEN
    ALTER TABLE public.courses
    ADD CONSTRAINT courses_delivery_mode_check 
    CHECK (delivery_mode IN ('internal', 'partner_link'));
  END IF;
END $$;

-- Add constraint for launch_mode
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'courses_launch_mode_check'
  ) THEN
    ALTER TABLE public.courses
    ADD CONSTRAINT courses_launch_mode_check 
    CHECK (launch_mode IN ('external', 'iframe', 'internal'));
  END IF;
END $$;

-- Create index for published courses
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_delivery_mode ON public.courses(delivery_mode);

-- Create lms_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.lms_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  course_slug TEXT,
  status TEXT NOT NULL DEFAULT 'in_progress',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  evidence_url TEXT,
  progress_percent INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_lms_progress_user ON public.lms_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lms_progress_course ON public.lms_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_lms_progress_status ON public.lms_progress(status);

-- Enable RLS on lms_progress
ALTER TABLE public.lms_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lms_progress
DROP POLICY IF EXISTS "users_read_own_progress" ON public.lms_progress;
CREATE POLICY "users_read_own_progress"
ON public.lms_progress
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_insert_own_progress" ON public.lms_progress;
CREATE POLICY "users_insert_own_progress"
ON public.lms_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_update_own_progress" ON public.lms_progress;
CREATE POLICY "users_update_own_progress"
ON public.lms_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_lms_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_lms_progress_updated_at_trigger ON public.lms_progress;
CREATE TRIGGER update_lms_progress_updated_at_trigger
BEFORE UPDATE ON public.lms_progress
FOR EACH ROW
EXECUTE FUNCTION update_lms_progress_updated_at();

-- Verification
DO $$
BEGIN
  RAISE NOTICE '✅ Partner link course support added to courses table';
  RAISE NOTICE '✅ lms_progress table created for tracking';
END $$;
