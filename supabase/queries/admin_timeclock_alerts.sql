-- Admin Timeclock Alert Queries
-- Read-only queries for admin visibility into timeclock status

-- ===========================================
-- 1. Active Shifts (currently clocked in)
-- ===========================================
CREATE OR REPLACE VIEW admin_active_shifts AS
SELECT 
  pe.id AS entry_id,
  pe.apprentice_id,
  p.full_name AS apprentice_name,
  p.email AS apprentice_email,
  pe.partner_id,
  par.name AS partner_name,
  pe.site_id,
  s.name AS site_name,
  pe.clock_in_at,
  EXTRACT(EPOCH FROM (now() - pe.clock_in_at)) / 3600.0 AS hours_elapsed,
  pe.lunch_start_at,
  pe.lunch_end_at,
  pe.outside_geofence_since,
  pe.last_known_lat,
  pe.last_known_lng,
  pe.last_location_at,
  CASE 
    WHEN pe.outside_geofence_since IS NOT NULL THEN 'offsite'
    WHEN pe.lunch_start_at IS NOT NULL AND pe.lunch_end_at IS NULL THEN 'on_lunch'
    ELSE 'working'
  END AS current_status
FROM progress_entries pe
JOIN profiles p ON p.id = pe.apprentice_id
LEFT JOIN partners par ON par.id = pe.partner_id
LEFT JOIN apprentice_sites s ON s.id = pe.site_id
WHERE pe.clock_in_at IS NOT NULL
  AND pe.clock_out_at IS NULL
ORDER BY pe.clock_in_at DESC;

-- ===========================================
-- 2. Auto Clock-Outs (recent)
-- ===========================================
CREATE OR REPLACE VIEW admin_auto_clockouts AS
SELECT 
  pe.id AS entry_id,
  pe.apprentice_id,
  p.full_name AS apprentice_name,
  p.email AS apprentice_email,
  pe.partner_id,
  par.name AS partner_name,
  pe.site_id,
  s.name AS site_name,
  pe.clock_in_at,
  pe.clock_out_at,
  pe.hours_worked,
  pe.auto_clock_out_reason,
  pe.last_known_lat,
  pe.last_known_lng
FROM progress_entries pe
JOIN profiles p ON p.id = pe.apprentice_id
LEFT JOIN partners par ON par.id = pe.partner_id
LEFT JOIN apprentice_sites s ON s.id = pe.site_id
WHERE pe.auto_clocked_out = true
ORDER BY pe.clock_out_at DESC
LIMIT 100;

-- ===========================================
-- 3. Lunch Violations (missed lunch after 6 hours)
-- ===========================================
CREATE OR REPLACE VIEW admin_lunch_violations AS
SELECT 
  pe.id AS entry_id,
  pe.apprentice_id,
  p.full_name AS apprentice_name,
  p.email AS apprentice_email,
  pe.partner_id,
  par.name AS partner_name,
  pe.clock_in_at,
  EXTRACT(EPOCH FROM (now() - pe.clock_in_at)) / 3600.0 AS hours_elapsed,
  'Lunch not taken after 6+ hours' AS violation_type
FROM progress_entries pe
JOIN profiles p ON p.id = pe.apprentice_id
LEFT JOIN partners par ON par.id = pe.partner_id
WHERE pe.clock_in_at IS NOT NULL
  AND pe.clock_out_at IS NULL
  AND now() - pe.clock_in_at > interval '6 hours'
  AND pe.lunch_start_at IS NULL
ORDER BY pe.clock_in_at ASC;

-- ===========================================
-- 4. Weekly Cap Warnings (approaching 40 hours)
-- ===========================================
CREATE OR REPLACE VIEW admin_weekly_cap_warnings AS
SELECT 
  pe.apprentice_id,
  p.full_name AS apprentice_name,
  p.email AS apprentice_email,
  pe.week_ending,
  SUM(pe.hours_worked) AS total_hours,
  40.0 AS max_hours,
  40.0 - SUM(pe.hours_worked) AS hours_remaining,
  CASE 
    WHEN SUM(pe.hours_worked) >= 40 THEN 'cap_reached'
    WHEN SUM(pe.hours_worked) >= 36 THEN 'warning'
    ELSE 'ok'
  END AS status
FROM progress_entries pe
JOIN profiles p ON p.id = pe.apprentice_id
WHERE pe.week_ending = date_trunc('week', now())::date + 4  -- Friday of current week
  AND pe.clock_out_at IS NOT NULL
GROUP BY pe.apprentice_id, p.full_name, p.email, pe.week_ending
HAVING SUM(pe.hours_worked) >= 36
ORDER BY SUM(pe.hours_worked) DESC;

-- ===========================================
-- 5. Location Exceptions (offsite for extended period)
-- ===========================================
CREATE OR REPLACE VIEW admin_location_exceptions AS
SELECT 
  pe.id AS entry_id,
  pe.apprentice_id,
  p.full_name AS apprentice_name,
  p.email AS apprentice_email,
  pe.partner_id,
  par.name AS partner_name,
  pe.site_id,
  s.name AS site_name,
  pe.clock_in_at,
  pe.outside_geofence_since,
  EXTRACT(EPOCH FROM (now() - pe.outside_geofence_since)) / 60.0 AS minutes_offsite,
  pe.last_known_lat,
  pe.last_known_lng,
  pe.last_location_at
FROM progress_entries pe
JOIN profiles p ON p.id = pe.apprentice_id
LEFT JOIN partners par ON par.id = pe.partner_id
LEFT JOIN apprentice_sites s ON s.id = pe.site_id
WHERE pe.clock_in_at IS NOT NULL
  AND pe.clock_out_at IS NULL
  AND pe.outside_geofence_since IS NOT NULL
ORDER BY pe.outside_geofence_since ASC;

-- ===========================================
-- 6. Daily Summary (for a specific date)
-- ===========================================
CREATE OR REPLACE FUNCTION get_daily_summary(p_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
  apprentice_id UUID,
  apprentice_name TEXT,
  partner_name TEXT,
  total_entries INTEGER,
  total_hours DECIMAL,
  auto_clockouts INTEGER,
  lunch_taken BOOLEAN
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pe.apprentice_id,
    p.full_name::TEXT AS apprentice_name,
    par.name::TEXT AS partner_name,
    COUNT(pe.id)::INTEGER AS total_entries,
    COALESCE(SUM(pe.hours_worked), 0)::DECIMAL AS total_hours,
    COUNT(CASE WHEN pe.auto_clocked_out THEN 1 END)::INTEGER AS auto_clockouts,
    BOOL_OR(pe.lunch_start_at IS NOT NULL) AS lunch_taken
  FROM progress_entries pe
  JOIN profiles p ON p.id = pe.apprentice_id
  LEFT JOIN partners par ON par.id = pe.partner_id
  WHERE pe.clock_in_at::DATE = p_date
  GROUP BY pe.apprentice_id, p.full_name, par.name
  ORDER BY p.full_name;
END;
$$;

-- ===========================================
-- 7. Weekly Summary (for a specific week ending)
-- ===========================================
CREATE OR REPLACE FUNCTION get_weekly_summary(p_week_ending DATE DEFAULT NULL)
RETURNS TABLE (
  apprentice_id UUID,
  apprentice_name TEXT,
  partner_name TEXT,
  week_ending DATE,
  total_entries INTEGER,
  total_hours DECIMAL,
  auto_clockouts INTEGER,
  days_worked INTEGER
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week_ending DATE;
BEGIN
  -- Default to current week's Friday
  IF p_week_ending IS NULL THEN
    v_week_ending := date_trunc('week', now())::date + 4;
  ELSE
    v_week_ending := p_week_ending;
  END IF;

  RETURN QUERY
  SELECT 
    pe.apprentice_id,
    p.full_name::TEXT AS apprentice_name,
    par.name::TEXT AS partner_name,
    pe.week_ending,
    COUNT(pe.id)::INTEGER AS total_entries,
    COALESCE(SUM(pe.hours_worked), 0)::DECIMAL AS total_hours,
    COUNT(CASE WHEN pe.auto_clocked_out THEN 1 END)::INTEGER AS auto_clockouts,
    COUNT(DISTINCT pe.clock_in_at::DATE)::INTEGER AS days_worked
  FROM progress_entries pe
  JOIN profiles p ON p.id = pe.apprentice_id
  LEFT JOIN partners par ON par.id = pe.partner_id
  WHERE pe.week_ending = v_week_ending
    AND pe.clock_out_at IS NOT NULL
  GROUP BY pe.apprentice_id, p.full_name, par.name, pe.week_ending
  ORDER BY p.full_name;
END;
$$;

-- ===========================================
-- Grant access to admin views
-- ===========================================
-- Note: Adjust roles as needed for your setup
GRANT SELECT ON admin_active_shifts TO authenticated;
GRANT SELECT ON admin_auto_clockouts TO authenticated;
GRANT SELECT ON admin_lunch_violations TO authenticated;
GRANT SELECT ON admin_weekly_cap_warnings TO authenticated;
GRANT SELECT ON admin_location_exceptions TO authenticated;
GRANT EXECUTE ON FUNCTION get_daily_summary TO authenticated;
GRANT EXECUTE ON FUNCTION get_weekly_summary TO authenticated;
