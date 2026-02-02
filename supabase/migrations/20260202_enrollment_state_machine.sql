-- PR1: Enrollment State Machine Foundation
-- Adds enrollment state fields, indexes, transition helpers, and next action resolver

-- ============================================
-- 1. Add enrollment state fields
-- ============================================
ALTER TABLE program_enrollments 
  ADD COLUMN IF NOT EXISTS enrollment_state TEXT NOT NULL DEFAULT 'applied';

ALTER TABLE program_enrollments 
  ADD COLUMN IF NOT EXISTS enrollment_confirmed_at TIMESTAMPTZ;

ALTER TABLE program_enrollments 
  ADD COLUMN IF NOT EXISTS orientation_completed_at TIMESTAMPTZ;

ALTER TABLE program_enrollments 
  ADD COLUMN IF NOT EXISTS documents_completed_at TIMESTAMPTZ;

ALTER TABLE program_enrollments 
  ADD COLUMN IF NOT EXISTS next_required_action TEXT;

-- ============================================
-- 2. Add indexes
-- ============================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_program_enrollments_user_program 
  ON program_enrollments(user_id, program_id);

CREATE INDEX IF NOT EXISTS idx_program_enrollments_state 
  ON program_enrollments(enrollment_state);

-- ============================================
-- 3. State transition helper
-- ============================================
CREATE OR REPLACE FUNCTION advance_enrollment_state(
  p_enrollment_id UUID,
  p_target_state TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_state TEXT;
  v_allowed_transitions JSONB := '{
    "applied": ["approved"],
    "approved": ["confirmed"],
    "confirmed": ["orientation_complete"],
    "orientation_complete": ["documents_complete"],
    "documents_complete": ["active"]
  }'::jsonb;
  v_allowed_targets JSONB;
BEGIN
  -- Get current state
  SELECT enrollment_state INTO v_current_state
  FROM program_enrollments
  WHERE id = p_enrollment_id;

  IF v_current_state IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Enrollment not found');
  END IF;

  -- Check if transition is allowed
  v_allowed_targets := v_allowed_transitions->v_current_state;
  
  IF v_allowed_targets IS NULL OR NOT v_allowed_targets ? p_target_state THEN
    RETURN jsonb_build_object(
      'success', false, 
      'error', format('Transition from %s to %s not allowed', v_current_state, p_target_state),
      'current_state', v_current_state
    );
  END IF;

  -- Perform transition with timestamp updates
  UPDATE program_enrollments
  SET 
    enrollment_state = p_target_state,
    enrollment_confirmed_at = CASE WHEN p_target_state = 'confirmed' THEN NOW() ELSE enrollment_confirmed_at END,
    orientation_completed_at = CASE WHEN p_target_state = 'orientation_complete' THEN NOW() ELSE orientation_completed_at END,
    documents_completed_at = CASE WHEN p_target_state = 'documents_complete' THEN NOW() ELSE documents_completed_at END
  WHERE id = p_enrollment_id;

  -- Update next required action cache
  PERFORM update_next_required_action(p_enrollment_id);

  RETURN jsonb_build_object(
    'success', true,
    'previous_state', v_current_state,
    'new_state', p_target_state
  );
END;
$$;

-- ============================================
-- 4. Next required action resolver
-- ============================================
CREATE OR REPLACE FUNCTION get_next_required_action(p_enrollment_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_state TEXT;
BEGIN
  SELECT enrollment_state INTO v_state
  FROM program_enrollments
  WHERE id = p_enrollment_id;

  -- Priority order: orientation -> documents -> start_course -> await_placement
  RETURN CASE v_state
    WHEN 'applied' THEN 'AWAIT_APPROVAL'
    WHEN 'approved' THEN 'COMPLETE_PAYMENT'
    WHEN 'confirmed' THEN 'ORIENTATION'
    WHEN 'orientation_complete' THEN 'DOCUMENTS'
    WHEN 'documents_complete' THEN 'START_COURSE_1'
    WHEN 'active' THEN 'CONTINUE_LEARNING'
    ELSE 'UNKNOWN'
  END;
END;
$$;

-- ============================================
-- 5. Update next action cache helper
-- ============================================
CREATE OR REPLACE FUNCTION update_next_required_action(p_enrollment_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE program_enrollments
  SET next_required_action = get_next_required_action(p_enrollment_id)
  WHERE id = p_enrollment_id;
END;
$$;

-- ============================================
-- 6. Auto-approve self-pay helper
-- ============================================
CREATE OR REPLACE FUNCTION auto_approve_self_pay(p_enrollment_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_funding TEXT;
BEGIN
  SELECT funding_source INTO v_funding
  FROM program_enrollments
  WHERE id = p_enrollment_id;

  IF v_funding = 'SELF_PAY' OR v_funding = 'self_pay' THEN
    RETURN advance_enrollment_state(p_enrollment_id, 'approved');
  END IF;

  RETURN jsonb_build_object('success', false, 'error', 'Not self-pay enrollment');
END;
$$;

-- ============================================
-- 7. Grant permissions
-- ============================================
GRANT EXECUTE ON FUNCTION advance_enrollment_state TO service_role;
GRANT EXECUTE ON FUNCTION get_next_required_action TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION update_next_required_action TO service_role;
GRANT EXECUTE ON FUNCTION auto_approve_self_pay TO service_role;

-- ============================================
-- 8. Update existing enrollments to have state
-- ============================================
UPDATE program_enrollments
SET enrollment_state = CASE 
  WHEN status = 'active' OR status = 'ACTIVE' THEN 'active'
  WHEN status = 'completed' OR status = 'COMPLETED' THEN 'active'
  WHEN status = 'pending' OR status = 'PENDING' THEN 'applied'
  ELSE 'applied'
END
WHERE enrollment_state = 'applied' OR enrollment_state IS NULL;
