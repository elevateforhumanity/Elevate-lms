-- =====================================================
-- MULTI-PROGRAM ENFORCEMENT
-- Barber + Cosmetology + Nails + Esthetics + CNA + HVAC
-- Hard constraints at DB level
-- =====================================================

-- PHASE 1.1: Add program_type to programs table
-- =====================================================

ALTER TABLE programs ADD COLUMN IF NOT EXISTS program_type TEXT;

-- Set defaults based on existing programs
UPDATE programs SET program_type = 'internal_apprenticeship' WHERE slug LIKE '%barber%' AND program_type IS NULL;
UPDATE programs SET program_type = 'internal_clock_program' WHERE slug LIKE '%cosmetology%' AND program_type IS NULL;
UPDATE programs SET program_type = 'internal_clock_program' WHERE slug LIKE '%nail%' AND program_type IS NULL;
UPDATE programs SET program_type = 'internal_clock_program' WHERE slug LIKE '%esthetician%' AND program_type IS NULL;
UPDATE programs SET program_type = 'internal_clock_program' WHERE slug LIKE '%cna%' AND program_type IS NULL;
UPDATE programs SET program_type = 'external_lms_wrapped' WHERE slug LIKE '%hvac%' AND program_type IS NULL;

-- Default remaining to internal_clock_program
UPDATE programs SET program_type = 'internal_clock_program' WHERE program_type IS NULL;

-- Now add NOT NULL and CHECK constraint
ALTER TABLE programs ALTER COLUMN program_type SET NOT NULL;
ALTER TABLE programs ADD CONSTRAINT chk_program_type 
  CHECK (program_type IN ('internal_apprenticeship', 'external_lms_wrapped', 'internal_clock_program'));

-- =====================================================
-- PHASE 1.2: Block attendance_hours for external_lms_wrapped
-- =====================================================

-- Function to check program_type before inserting hours
CREATE OR REPLACE FUNCTION check_hours_program_type()
RETURNS TRIGGER AS $$
DECLARE
  v_program_type TEXT;
BEGIN
  SELECT p.program_type INTO v_program_type
  FROM student_enrollments e
  JOIN programs p ON p.id = e.program_id
  WHERE e.id = NEW.enrollment_id;
  
  IF v_program_type = 'external_lms_wrapped' THEN
    RAISE EXCEPTION 'Hours logging not allowed for external LMS programs (program_type: %)', v_program_type;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop if exists and recreate
DROP TRIGGER IF EXISTS trg_prevent_external_lms_hours ON attendance_hours;
CREATE TRIGGER trg_prevent_external_lms_hours
  BEFORE INSERT ON attendance_hours
  FOR EACH ROW EXECUTE FUNCTION check_hours_program_type();

-- =====================================================
-- PHASE 1.3: Block apprentice_assignments for external_lms_wrapped
-- =====================================================

CREATE OR REPLACE FUNCTION check_placement_program_type()
RETURNS TRIGGER AS $$
DECLARE
  v_program_type TEXT;
BEGIN
  SELECT p.program_type INTO v_program_type
  FROM student_enrollments e
  JOIN programs p ON p.id = e.program_id
  WHERE e.id = NEW.enrollment_id;
  
  IF v_program_type = 'external_lms_wrapped' THEN
    RAISE EXCEPTION 'Placements not allowed for external LMS programs (program_type: %)', v_program_type;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_external_lms_placements ON apprentice_assignments;
CREATE TRIGGER trg_prevent_external_lms_placements
  BEFORE INSERT ON apprentice_assignments
  FOR EACH ROW EXECUTE FUNCTION check_placement_program_type();

-- =====================================================
-- PHASE 1.4: CNA document types
-- =====================================================

-- Ensure document_type can hold CNA-specific values
-- Add to documents table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'documents' AND column_name = 'document_type'
  ) THEN
    ALTER TABLE documents ADD COLUMN document_type TEXT;
  END IF;
END $$;

-- Create enum-like check for document types
-- (Using CHECK instead of ENUM for flexibility)
ALTER TABLE documents DROP CONSTRAINT IF EXISTS chk_document_type;
ALTER TABLE documents ADD CONSTRAINT chk_document_type
  CHECK (document_type IS NULL OR document_type IN (
    'government_id',
    'social_security_card',
    'birth_certificate',
    'high_school_diploma',
    'ged_certificate',
    'background_check',
    'tb_test',
    'clinical_clearance',
    'credential_certificate',
    'cosmetology_license',
    'barber_license',
    'proof_of_residency',
    'w4_form',
    'i9_form',
    'direct_deposit_form',
    'other'
  ));

-- =====================================================
-- INDEXES for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_programs_program_type ON programs(program_type);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);

-- =====================================================
-- COMMENTS for documentation
-- =====================================================

COMMENT ON COLUMN programs.program_type IS 'Program classification: internal_apprenticeship (Barber), internal_clock_program (Cosmo/Nails/Esthetics/CNA), external_lms_wrapped (HVAC)';
COMMENT ON TRIGGER trg_prevent_external_lms_hours ON attendance_hours IS 'Hard block: external_lms_wrapped programs cannot log hours';
COMMENT ON TRIGGER trg_prevent_external_lms_placements ON apprentice_assignments IS 'Hard block: external_lms_wrapped programs cannot have placements';
