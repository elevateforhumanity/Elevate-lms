-- =====================================================
-- APPRENTICESHIP HOURS COMPATIBILITY VIEW
-- =====================================================
-- Canonical table: progress_entries (20260124_partner_shop_system.sql)
-- This VIEW provides backward compatibility for 13 legacy API routes
-- that use different column names.
--
-- Column mapping:
--   Legacy (apprenticeship_hours)  →  Canonical (progress_entries)
--   student_id                     →  apprentice_id
--   date_worked / date             →  week_ending
--   hours                          →  hours_worked
--   category                       →  (stored in tasks_completed)
--   program_slug                   →  program_id
--   approved                       →  status = 'verified'
--   approved_by                    →  verified_by
--   approved_at                    →  verified_at
--   rejection_reason               →  notes (when status = 'disputed')
-- =====================================================

-- Drop existing objects for idempotency
DROP VIEW IF EXISTS apprenticeship_hours_summary;
DROP VIEW IF EXISTS apprenticeship_hours;
DROP FUNCTION IF EXISTS insert_apprenticeship_hours() CASCADE;
DROP FUNCTION IF EXISTS update_apprenticeship_hours() CASCADE;

-- Create compatibility view
CREATE VIEW apprenticeship_hours AS
SELECT 
  pe.id,
  pe.apprentice_id AS student_id,
  pe.partner_id AS shop_id,
  pe.partner_id,
  pe.week_ending AS date_worked,
  pe.week_ending AS date,
  pe.hours_worked AS hours,
  pe.hours_worked,
  pe.program_id AS program_slug,
  pe.program_id,
  -- Extract category from tasks_completed (format: "category:description")
  COALESCE(
    SPLIT_PART(pe.tasks_completed, ':', 1),
    'on-the-job'
  ) AS category,
  pe.tasks_completed AS description,
  pe.notes,
  
  -- Approval workflow
  (pe.status = 'verified') AS approved,
  pe.verified_by AS approved_by,
  pe.verified_at AS approved_at,
  CASE 
    WHEN pe.status = 'disputed' THEN pe.notes 
    ELSE NULL 
  END AS rejection_reason,
  pe.status,
  
  -- Metadata
  pe.submitted_by,
  pe.submitted_at,
  pe.created_at,
  pe.updated_at
FROM progress_entries pe;

-- INSERT trigger function
-- Handles legacy inserts and maps to progress_entries
CREATE OR REPLACE FUNCTION insert_apprenticeship_hours()
RETURNS TRIGGER AS $$
DECLARE
  inserted_row progress_entries%ROWTYPE;
  v_partner_id UUID;
  v_program_id VARCHAR(100);
  v_status VARCHAR(20);
  v_tasks TEXT;
BEGIN
  -- Determine program_id (legacy uses program_slug)
  v_program_id := UPPER(COALESCE(
    NEW.program_slug,
    NEW.program_id,
    'APPRENTICESHIP'
  ));
  
  -- Try to find partner_id from shop_id or use a default lookup
  v_partner_id := COALESCE(
    NEW.shop_id,
    NEW.partner_id,
    (SELECT id FROM partners LIMIT 1)  -- Fallback to first partner if none specified
  );
  
  -- Determine status based on approved flag and rejection_reason
  IF NEW.rejection_reason IS NOT NULL AND NEW.rejection_reason <> '' THEN
    v_status := 'disputed';
  ELSIF NEW.approved = true THEN
    v_status := 'verified';
  ELSE
    v_status := 'submitted';
  END IF;
  
  -- Store category in tasks_completed as "category:notes" format
  v_tasks := CASE 
    WHEN NEW.category IS NOT NULL THEN NEW.category || ':' || COALESCE(NEW.notes, NEW.description, '')
    ELSE COALESCE(NEW.description, NEW.notes, '')
  END;
  
  -- Insert into canonical table
  INSERT INTO progress_entries (
    apprentice_id,
    partner_id,
    program_id,
    week_ending,
    hours_worked,
    tasks_completed,
    notes,
    submitted_by,
    submitted_at,
    verified_by,
    verified_at,
    status,
    created_at,
    updated_at
  ) VALUES (
    NEW.student_id,
    v_partner_id,
    v_program_id,
    COALESCE(NEW.date_worked, NEW.date, CURRENT_DATE),
    COALESCE(NEW.hours, NEW.hours_worked, 0),
    v_tasks,
    CASE WHEN v_status = 'disputed' THEN NEW.rejection_reason ELSE NEW.notes END,
    COALESCE(NEW.submitted_by, NEW.student_id),
    COALESCE(NEW.submitted_at, NOW()),
    CASE WHEN v_status = 'verified' THEN COALESCE(NEW.approved_by, auth.uid()) ELSE NULL END,
    CASE WHEN v_status = 'verified' THEN COALESCE(NEW.approved_at, NOW()) ELSE NULL END,
    v_status,
    NOW(),
    NOW()
  )
  RETURNING * INTO inserted_row;
  
  -- Return the view-shaped row with the real generated values
  RETURN ROW(
    inserted_row.id,
    inserted_row.apprentice_id,  -- student_id
    inserted_row.partner_id,     -- shop_id
    inserted_row.partner_id,
    inserted_row.week_ending,    -- date_worked
    inserted_row.week_ending,    -- date
    inserted_row.hours_worked,   -- hours
    inserted_row.hours_worked,
    inserted_row.program_id,     -- program_slug
    inserted_row.program_id,
    COALESCE(SPLIT_PART(inserted_row.tasks_completed, ':', 1), 'on-the-job'),  -- category
    inserted_row.tasks_completed,  -- description
    inserted_row.notes,
    (inserted_row.status = 'verified'),  -- approved
    inserted_row.verified_by,    -- approved_by
    inserted_row.verified_at,    -- approved_at
    CASE WHEN inserted_row.status = 'disputed' THEN inserted_row.notes ELSE NULL END,  -- rejection_reason
    inserted_row.status,
    inserted_row.submitted_by,
    inserted_row.submitted_at,
    inserted_row.created_at,
    inserted_row.updated_at
  )::apprenticeship_hours;
END;
$$ LANGUAGE plpgsql;

-- UPDATE trigger function
-- Handles legacy updates including approval and rejection workflows
CREATE OR REPLACE FUNCTION update_apprenticeship_hours()
RETURNS TRIGGER AS $$
DECLARE
  v_status VARCHAR(20);
  v_tasks TEXT;
BEGIN
  -- Determine new status based on approved flag and rejection_reason
  IF NEW.rejection_reason IS NOT NULL AND NEW.rejection_reason <> '' THEN
    v_status := 'disputed';
  ELSIF NEW.approved = true THEN
    v_status := 'verified';
  ELSIF OLD.approved = true AND NEW.approved = false THEN
    -- Explicitly un-approving
    v_status := 'submitted';
  ELSE
    -- Keep existing status or default to submitted
    v_status := COALESCE(NEW.status, OLD.status, 'submitted');
  END IF;
  
  -- Update category in tasks_completed if provided
  v_tasks := CASE 
    WHEN NEW.category IS NOT NULL AND NEW.category IS DISTINCT FROM OLD.category THEN 
      NEW.category || ':' || COALESCE(NEW.notes, NEW.description, '')
    ELSE 
      COALESCE(NEW.description, OLD.description)
  END;
  
  UPDATE progress_entries SET
    hours_worked = COALESCE(NEW.hours, NEW.hours_worked, OLD.hours_worked),
    tasks_completed = v_tasks,
    notes = CASE 
      WHEN v_status = 'disputed' THEN COALESCE(NEW.rejection_reason, NEW.notes)
      ELSE COALESCE(NEW.notes, OLD.notes)
    END,
    status = v_status,
    verified_by = CASE 
      WHEN v_status = 'verified' THEN COALESCE(NEW.approved_by, auth.uid(), OLD.verified_by)
      ELSE NULL
    END,
    verified_at = CASE 
      WHEN v_status = 'verified' THEN COALESCE(NEW.approved_at, NOW())
      ELSE NULL
    END,
    updated_at = NOW()
  WHERE id = OLD.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create INSTEAD OF triggers
CREATE TRIGGER apprenticeship_hours_insert_trigger
  INSTEAD OF INSERT ON apprenticeship_hours
  FOR EACH ROW
  EXECUTE FUNCTION insert_apprenticeship_hours();

CREATE TRIGGER apprenticeship_hours_update_trigger
  INSTEAD OF UPDATE ON apprenticeship_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_apprenticeship_hours();

-- Summary view for reporting
CREATE VIEW apprenticeship_hours_summary AS
SELECT 
  apprentice_id AS student_id,
  program_id AS program_slug,
  DATE_TRUNC('week', week_ending) AS week_start,
  SUM(hours_worked) AS total_hours,
  SUM(CASE WHEN status = 'verified' THEN hours_worked ELSE 0 END) AS approved_hours,
  SUM(CASE WHEN status IN ('submitted', 'draft') THEN hours_worked ELSE 0 END) AS pending_hours,
  SUM(CASE WHEN status = 'disputed' THEN hours_worked ELSE 0 END) AS disputed_hours,
  COUNT(*) AS entry_count
FROM progress_entries
GROUP BY apprentice_id, program_id, DATE_TRUNC('week', week_ending);

-- =====================================================
-- NOTES:
-- 1. No SECURITY DEFINER - triggers run as invoker, respecting RLS
-- 2. partner_id fallback uses first partner if none specified
--    (legacy routes may not have partner context)
-- 3. Category stored in tasks_completed as "category:description"
-- 4. Rejection sets status='disputed' and stores reason in notes
-- 5. approved_by defaults to auth.uid() if not provided
-- 6. approved_at defaults to NOW() if not provided
-- =====================================================
