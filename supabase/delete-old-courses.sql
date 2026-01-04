-- ============================================================================
-- DELETE OLD COURSES AND SHOW ONLY HOMEPAGE COURSES
-- ============================================================================

-- Delete the old courses that don't match homepage
DELETE FROM programs WHERE slug IN (
  'community-health-initiative',
  'digital-literacy-program',
  'service-test-1758163079834',
  'youth-leadership-development'
);

-- Verify only homepage courses remain
SELECT slug, title, track, hours 
FROM programs 
ORDER BY slug;

-- Should show:
-- barber    | Barber Apprenticeship | Beauty & Wellness | 2000 hours
-- cna       | CNA Certification     | Healthcare        | 120 hours
-- hvac-tech | HVAC Technician       | Skilled Trades    | 640 hours
