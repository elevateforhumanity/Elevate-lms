-- =====================================================
-- APPRENTICESHIP HOURS COMPATIBILITY VIEW
-- =====================================================
-- The canonical hours table is `progress_entries` (from 20260124_partner_shop_system.sql)
-- This creates a VIEW named `apprenticeship_hours` for backward compatibility
-- with 13 API routes that reference the old table name.
-- =====================================================

-- Drop the view if it exists (for idempotency)
DROP VIEW IF EXISTS apprenticeship_hours_summary;
DROP VIEW IF EXISTS apprenticeship_hours;

-- Create compatibility view mapping to progress_entries
CREATE VIEW apprenticeship_hours AS
SELECT 
  pe.id,
  pe.apprentice_id AS student_id,
  pe.partner_id AS shop_id,
  pe.partner_id,
  pe.week_ending AS date,
  pe.hours_worked,
  pe.tasks_completed AS description,
  'practical'::TEXT AS task_type,
  
  -- Approval workflow mapping
  CASE WHEN pe.status = 'verified' THEN true ELSE false END AS approved,
  pe.verified_by AS approved_by,
  pe.verified_at AS approved_at,
  CASE WHEN pe.status = 'disputed' THEN pe.notes ELSE NULL END AS rejection_reason,
  
  -- Metadata
  pe.created_at,
  pe.updated_at
FROM progress_entries pe;

-- Create a function to handle inserts to the view
CREATE OR REPLACE FUNCTION insert_apprenticeship_hours()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO progress_entries (
    apprentice_id,
    partner_id,
    program_id,
    week_ending,
    hours_worked,
    tasks_completed,
    notes,
    submitted_by,
    status
  ) VALUES (
    NEW.student_id,
    COALESCE(NEW.shop_id, NEW.partner_id),
    'apprenticeship', -- default program
    NEW.date,
    NEW.hours_worked,
    NEW.description,
    NEW.description,
    NEW.student_id,
    CASE WHEN NEW.approved THEN 'verified' ELSE 'submitted' END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for inserts
DROP TRIGGER IF EXISTS apprenticeship_hours_insert_trigger ON apprenticeship_hours;
CREATE TRIGGER apprenticeship_hours_insert_trigger
  INSTEAD OF INSERT ON apprenticeship_hours
  FOR EACH ROW
  EXECUTE FUNCTION insert_apprenticeship_hours();

-- Create a function to handle updates to the view
CREATE OR REPLACE FUNCTION update_apprenticeship_hours()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE progress_entries SET
    hours_worked = NEW.hours_worked,
    tasks_completed = NEW.description,
    status = CASE WHEN NEW.approved THEN 'verified' ELSE 'submitted' END,
    verified_by = CASE WHEN NEW.approved THEN NEW.approved_by ELSE NULL END,
    verified_at = CASE WHEN NEW.approved THEN NEW.approved_at ELSE NULL END,
    updated_at = NOW()
  WHERE id = OLD.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updates
DROP TRIGGER IF EXISTS apprenticeship_hours_update_trigger ON apprenticeship_hours;
CREATE TRIGGER apprenticeship_hours_update_trigger
  INSTEAD OF UPDATE ON apprenticeship_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_apprenticeship_hours();

-- Summary view for reporting (uses canonical table)
CREATE VIEW apprenticeship_hours_summary AS
SELECT 
  apprentice_id AS student_id,
  DATE_TRUNC('week', week_ending) AS week_start,
  SUM(hours_worked) AS total_hours,
  SUM(CASE WHEN status = 'verified' THEN hours_worked ELSE 0 END) AS approved_hours,
  SUM(CASE WHEN status IN ('submitted', 'draft') THEN hours_worked ELSE 0 END) AS pending_hours,
  COUNT(*) AS entry_count
FROM progress_entries
GROUP BY apprentice_id, DATE_TRUNC('week', week_ending);

-- =====================================================
-- NOTE: Do NOT create partners or shops tables here.
-- They already exist in 20260124_partner_shop_system.sql
-- =====================================================
