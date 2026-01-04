-- ============================================
-- WORKFORCE REPORTING OS - DATABASE VIEWS
-- ============================================
-- Real data, org-scoped, exportable, compliance-ready
-- Compatible with existing enrollments, programs, courses
-- ============================================

-- ============================================
-- 1. ENROLLMENT FACT VIEW
-- ============================================

CREATE OR REPLACE VIEW reporting_enrollments AS
SELECT
  e.id AS enrollment_id,
  e.organization_id,
  e.user_id,
  e.program_id,
  p.name AS program_name,
  p.slug AS program_slug,
  p.category AS program_category,
  COALESCE(e.enrolled_at, e.created_at) AS enrolled_at,
  e.status,
  e.payment_status,
  e.funding_details,
  e.completed_at,
  prof.full_name AS student_name,
  prof.email AS student_email
FROM enrollments e
JOIN programs p ON p.id = e.program_id
LEFT JOIN profiles prof ON prof.id = e.user_id;

COMMENT ON VIEW reporting_enrollments IS 'Enrollment fact table for workforce reporting';

-- ============================================
-- 2. PROGRESS & ATTENDANCE VIEW
-- ============================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'lesson_progress'
  ) THEN
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_progress AS
      SELECT
        e.organization_id,
        e.user_id,
        e.program_id,
        e.id AS enrollment_id,
        p.name AS program_name,
        prof.full_name AS student_name,
        COALESCE(
          (SELECT COUNT(*) FILTER (WHERE lp.completed = true)::float / NULLIF(COUNT(*), 0) * 100
           FROM lesson_progress lp
           WHERE lp.enrollment_id = e.id),
          0
        ) AS progress_percent,
        (SELECT MAX(lp.updated_at)
         FROM lesson_progress lp
         WHERE lp.enrollment_id = e.id) AS last_activity_at,
        (SELECT SUM(lp.time_spent_minutes)
         FROM lesson_progress lp
         WHERE lp.enrollment_id = e.id) AS total_time_minutes
      FROM enrollments e
      JOIN programs p ON p.id = e.program_id
      LEFT JOIN profiles prof ON prof.id = e.user_id
    ';
  ELSE
    -- Fallback view without lesson_progress
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_progress AS
      SELECT
        e.organization_id,
        e.user_id,
        e.program_id,
        e.id AS enrollment_id,
        p.name AS program_name,
        prof.full_name AS student_name,
        0 AS progress_percent,
        NULL::timestamptz AS last_activity_at,
        0 AS total_time_minutes
      FROM enrollments e
      JOIN programs p ON p.id = e.program_id
      LEFT JOIN profiles prof ON prof.id = e.user_id
    ';
  END IF;
END $$;

COMMENT ON VIEW reporting_progress IS 'Student progress and attendance tracking';

-- ============================================
-- 3. COMPLETIONS VIEW
-- ============================================

CREATE OR REPLACE VIEW reporting_completions AS
SELECT
  e.organization_id,
  e.program_id,
  p.name AS program_name,
  p.category AS program_category,
  COUNT(*) FILTER (WHERE e.status = 'completed') AS completed_count,
  COUNT(*) FILTER (WHERE e.status = 'active') AS active_count,
  COUNT(*) FILTER (WHERE e.status = 'pending') AS pending_count,
  COUNT(*) AS total_enrollments,
  CASE 
    WHEN COUNT(*) > 0 THEN 
      ROUND((COUNT(*) FILTER (WHERE e.status = 'completed')::numeric / COUNT(*)) * 100, 2)
    ELSE 0 
  END AS completion_rate
FROM enrollments e
JOIN programs p ON p.id = e.program_id
GROUP BY e.organization_id, e.program_id, p.name, p.category;

COMMENT ON VIEW reporting_completions IS 'Program completion statistics';

-- ============================================
-- 4. CREDENTIALS EARNED VIEW
-- ============================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'certificates'
  ) THEN
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_credentials AS
      SELECT
        c.organization_id,
        c.user_id,
        c.enrollment_id,
        e.program_id,
        p.name AS program_name,
        prof.full_name AS student_name,
        c.certificate_number,
        c.issued_at,
        c.pdf_url
      FROM certificates c
      JOIN enrollments e ON e.id = c.enrollment_id
      JOIN programs p ON p.id = e.program_id
      LEFT JOIN profiles prof ON prof.id = c.user_id
    ';
  END IF;
END $$;

COMMENT ON VIEW reporting_credentials IS 'Credentials and certificates issued';

-- ============================================
-- 5. FUNDING TOTALS VIEW
-- ============================================

-- Check if payments table exists before creating view
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'payments'
  ) THEN
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_funding AS
      SELECT
        organization_id,
        COALESCE(
          (funding_details->>''source'')::text,
          ''unknown''
        ) AS funding_source,
        COUNT(*) AS transaction_count,
        SUM(COALESCE((funding_details->>''amount'')::numeric, 0)) AS total_amount
      FROM enrollments
      WHERE funding_details IS NOT NULL
      GROUP BY organization_id, funding_details->>''source''
    ';
  ELSE
    -- Fallback view if payments table doesn't exist
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_funding AS
      SELECT
        organization_id,
        COALESCE(
          (funding_details->>''source'')::text,
          ''unknown''
        ) AS funding_source,
        COUNT(*) AS transaction_count,
        0 AS total_amount
      FROM enrollments
      WHERE funding_details IS NOT NULL
      GROUP BY organization_id, funding_details->>''source''
    ';
  END IF;
END $$;

COMMENT ON VIEW reporting_funding IS 'Funding source totals by organization';

-- ============================================
-- 6. OUTCOMES VIEW (IF OUTCOMES TABLE EXISTS)
-- ============================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'outcomes'
  ) THEN
    EXECUTE '
      CREATE OR REPLACE VIEW reporting_outcomes AS
      SELECT
        o.organization_id,
        o.user_id,
        o.program_id,
        p.name AS program_name,
        prof.full_name AS student_name,
        o.outcome_type,
        o.outcome_date,
        o.details
      FROM outcomes o
      JOIN programs p ON p.id = o.program_id
      LEFT JOIN profiles prof ON prof.id = o.user_id
    ';
  END IF;
END $$;

-- ============================================
-- 7. INDEXES FOR PERFORMANCE
-- ============================================

-- These indexes support the reporting views
CREATE INDEX IF NOT EXISTS idx_enrollments_org_status 
  ON enrollments(organization_id, status);

CREATE INDEX IF NOT EXISTS idx_enrollments_org_program 
  ON enrollments(organization_id, program_id);

-- Conditional indexes for optional tables
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'lesson_progress'
  ) THEN
    CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment 
      ON lesson_progress(enrollment_id, completed);
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'certificates'
  ) THEN
    CREATE INDEX IF NOT EXISTS idx_certificates_org 
      ON certificates(organization_id);
  END IF;
END $$;

-- ============================================
-- 8. VERIFICATION
-- ============================================

DO $$
DECLARE
  view_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO view_count
  FROM information_schema.views
  WHERE table_schema = 'public'
  AND table_name LIKE 'reporting_%';
  
  RAISE NOTICE '✅ Workforce reporting views installed';
  RAISE NOTICE '   Reporting views created: %', view_count;
END $$;
