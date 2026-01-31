-- Seed career_applications with test data for admin dashboard verification
-- DEV/STAGING ONLY - Uses @example.com emails to prevent prod pollution
-- These records are safe to have in prod (example.com is reserved per RFC 2606)
-- but will be ignored by real workflows

-- Guard: Only insert if no real applications exist (prevents duplicate seeding)
DO $$
BEGIN
  -- Skip if there are already applications with non-example.com emails
  IF EXISTS (
    SELECT 1 FROM career_applications 
    WHERE email NOT LIKE '%@example.com'
    LIMIT 1
  ) THEN
    RAISE NOTICE 'Skipping seed: real applications exist';
    RETURN;
  END IF;

  INSERT INTO career_applications (
  first_name, last_name, email, phone,
  application_state, status, last_transition_at, state_history,
  address, city, state, zip_code,
  high_school, graduation_year, gpa,
  employment_status, years_experience
) VALUES
  ('Maria', 'Garcia', 'maria.garcia@example.com', '555-0101',
   'submitted', 'pending_review', NOW() - INTERVAL '2 days',
   '[{"state":"started","timestamp":"2026-01-25T10:00:00Z","action":"created"},{"state":"eligibility_complete","timestamp":"2026-01-26T14:00:00Z","action":"advanced"},{"state":"documents_complete","timestamp":"2026-01-27T09:00:00Z","action":"advanced"},{"state":"review_ready","timestamp":"2026-01-27T16:00:00Z","action":"advanced"},{"state":"submitted","timestamp":"2026-01-28T11:00:00Z","action":"submitted"}]'::jsonb,
   '123 Main St', 'Houston', 'TX', '77001',
   'Westside High School', '2024', '3.5',
   'unemployed', '0'),
   
  ('James', 'Wilson', 'james.wilson@example.com', '555-0102',
   'review_ready', 'in_progress', NOW() - INTERVAL '1 day',
   '[{"state":"started","timestamp":"2026-01-27T08:00:00Z","action":"created"},{"state":"eligibility_complete","timestamp":"2026-01-28T10:00:00Z","action":"advanced"},{"state":"documents_complete","timestamp":"2026-01-29T11:00:00Z","action":"advanced"},{"state":"review_ready","timestamp":"2026-01-29T15:00:00Z","action":"advanced"}]'::jsonb,
   '456 Oak Ave', 'Dallas', 'TX', '75201',
   'Lincoln High School', '2023', '3.8',
   'part_time', '1'),
   
  ('Aisha', 'Johnson', 'aisha.johnson@example.com', '555-0103',
   'documents_complete', 'in_progress', NOW() - INTERVAL '3 hours',
   '[{"state":"started","timestamp":"2026-01-29T09:00:00Z","action":"created"},{"state":"eligibility_complete","timestamp":"2026-01-29T14:00:00Z","action":"advanced"},{"state":"documents_complete","timestamp":"2026-01-29T21:00:00Z","action":"advanced"}]'::jsonb,
   '789 Pine Rd', 'Austin', 'TX', '78701',
   'Austin High School', '2025', '3.2',
   'student', '0'),
   
  ('Carlos', 'Martinez', 'carlos.martinez@example.com', '555-0104',
   'eligibility_complete', 'in_progress', NOW() - INTERVAL '6 hours',
   '[{"state":"started","timestamp":"2026-01-29T18:00:00Z","action":"created"},{"state":"eligibility_complete","timestamp":"2026-01-29T22:00:00Z","action":"advanced"}]'::jsonb,
   '321 Elm St', 'San Antonio', 'TX', '78201',
   'Roosevelt High School', '2024', '3.0',
   'full_time', '2'),
   
  ('Emily', 'Chen', 'emily.chen@example.com', '555-0105',
   'started', 'draft', NOW(),
   '[{"state":"started","timestamp":"2026-01-30T00:00:00Z","action":"created"}]'::jsonb,
   NULL, NULL, NULL, NULL,
   NULL, NULL, NULL,
   NULL, NULL),
   
  ('David', 'Brown', 'david.brown@example.com', '555-0106',
   'rejected', 'closed', NOW() - INTERVAL '5 days',
   '[{"state":"started","timestamp":"2026-01-20T10:00:00Z","action":"created"},{"state":"eligibility_complete","timestamp":"2026-01-21T14:00:00Z","action":"advanced"},{"state":"documents_complete","timestamp":"2026-01-22T09:00:00Z","action":"advanced"},{"state":"review_ready","timestamp":"2026-01-23T16:00:00Z","action":"advanced"},{"state":"rejected","timestamp":"2026-01-25T11:00:00Z","action":"rejected","notes":"Incomplete documentation"}]'::jsonb,
   '654 Maple Dr', 'Fort Worth', 'TX', '76101',
   'Central High School', '2022', '2.8',
   'unemployed', '1')
  ON CONFLICT DO NOTHING;

END $$;
