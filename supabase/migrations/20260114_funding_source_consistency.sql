-- Migration: Funding Source Consistency + Certificate Timestamp
-- Purpose: Standardize funding_source tracking across enrollment tables for grant/license compliance
-- Date: 2026-01-14

-- 1. Add funding_source to partner_lms_enrollments (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'partner_lms_enrollments' AND column_name = 'funding_source'
  ) THEN
    ALTER TABLE partner_lms_enrollments 
    ADD COLUMN funding_source TEXT DEFAULT 'self_pay';
    
    COMMENT ON COLUMN partner_lms_enrollments.funding_source IS 
      'Funding source: self_pay, wioa, wrg, jri, employer_sponsored, scholarship, sponsored, unknown';
  END IF;
END $$;

-- 2. Add funding_source to hsi_enrollment_queue (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'hsi_enrollment_queue' AND column_name = 'funding_source'
  ) THEN
    ALTER TABLE hsi_enrollment_queue 
    ADD COLUMN funding_source TEXT DEFAULT 'self_pay';
    
    COMMENT ON COLUMN hsi_enrollment_queue.funding_source IS 
      'Funding source: self_pay, wioa, wrg, jri, employer_sponsored, scholarship, sponsored, unknown';
  END IF;
END $$;

-- 3. Add certificate_issued_at to enrollments (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'certificate_issued_at'
  ) THEN
    ALTER TABLE enrollments 
    ADD COLUMN certificate_issued_at TIMESTAMPTZ;
    
    COMMENT ON COLUMN enrollments.certificate_issued_at IS 
      'Timestamp when EFH certificate was issued for this enrollment';
  END IF;
END $$;

-- 4. Create index for funding_source queries on partner_lms_enrollments
CREATE INDEX IF NOT EXISTS idx_partner_lms_enrollments_funding_source 
ON partner_lms_enrollments(funding_source);

-- 5. Create index for certificate_issued_at queries
CREATE INDEX IF NOT EXISTS idx_enrollments_certificate_issued_at 
ON enrollments(certificate_issued_at) 
WHERE certificate_issued_at IS NOT NULL;

-- 6. Backfill existing partner_lms_enrollments with self_pay where payment was made
UPDATE partner_lms_enrollments 
SET funding_source = 'self_pay' 
WHERE funding_source IS NULL 
  AND payment_status = 'paid' 
  AND payment_amount > 0;

-- 7. Backfill existing hsi_enrollment_queue with self_pay where payment was made
UPDATE hsi_enrollment_queue 
SET funding_source = 'self_pay' 
WHERE funding_source IS NULL 
  AND amount_paid > 0;

-- 8. Log migration completion
DO $$
BEGIN
  RAISE NOTICE 'Migration 20260114_funding_source_consistency completed successfully';
END $$;
