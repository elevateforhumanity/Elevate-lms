-- ============================================================
-- SEED: Test Enrollment Data
-- Creates one real enrollment for testing the student dashboard
-- Run this AFTER creating a test user via Supabase Auth
-- ============================================================

-- This migration creates sample data for testing.
-- It uses DO blocks to safely insert only if data doesn't exist.

DO $$
DECLARE
  v_program_id UUID;
  v_cohort_id UUID;
  v_test_user_id UUID;
BEGIN
  -- Get or create the barber program
  SELECT id INTO v_program_id 
  FROM public.programs 
  WHERE slug = 'barber-apprenticeship' 
  LIMIT 1;

  IF v_program_id IS NULL THEN
    INSERT INTO public.programs (
      slug, 
      title, 
      description, 
      code,
      duration_weeks,
      total_hours,
      tuition,
      funding_eligible,
      status,
      category
    ) VALUES (
      'barber-apprenticeship',
      'Barber Apprenticeship',
      'USDOL Registered Apprenticeship program for barber licensure. 2,000 hours of combined OJT and RTI.',
      'BARBER-APP',
      52,
      2000,
      4980.00,
      true,
      'active',
      'beauty'
    )
    RETURNING id INTO v_program_id;
  END IF;

  -- Get or create a cohort for the program
  SELECT id INTO v_cohort_id 
  FROM public.cohorts 
  WHERE program_id = v_program_id 
  AND status = 'active'
  LIMIT 1;

  IF v_cohort_id IS NULL THEN
    INSERT INTO public.cohorts (
      program_id,
      code,
      name,
      start_date,
      end_date,
      max_capacity,
      status,
      location
    ) VALUES (
      v_program_id,
      'BARBER-2026-01',
      'Barber Apprenticeship - January 2026',
      '2026-01-15',
      '2027-01-15',
      20,
      'active',
      'Indianapolis, IN'
    )
    RETURNING id INTO v_cohort_id;
  END IF;

  -- Note: To create a test enrollment, you need a real user ID from auth.users
  -- The enrollments table uses student_id (not user_id) and course_id
  -- program_id is added via ALTER TABLE in 001_barber_hvac_reference.sql
  --
  -- After creating a user via Supabase Auth UI or API, run:
  --
  -- INSERT INTO public.enrollments (student_id, program_id, cohort_id, status, progress)
  -- VALUES ('YOUR-USER-UUID-HERE', 'PROGRAM-UUID', 'COHORT-UUID', 'active', 0);

  RAISE NOTICE 'Seed data created. Program ID: %, Cohort ID: %', v_program_id, v_cohort_id;
END $$;

-- Create an announcement for testing
INSERT INTO public.announcements (title, content, is_active, created_at)
SELECT 
  'Welcome to the Spring 2026 Cohort!',
  'We are excited to welcome all new apprentices. Please complete your orientation within the first week.',
  true,
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM public.announcements WHERE title = 'Welcome to the Spring 2026 Cohort!'
);

-- Add a second announcement
INSERT INTO public.announcements (title, content, is_active, created_at)
SELECT 
  'State Board Exam Prep Sessions Available',
  'Sign up for our free state board exam prep sessions. Limited spots available.',
  true,
  NOW() - INTERVAL '2 days'
WHERE NOT EXISTS (
  SELECT 1 FROM public.announcements WHERE title = 'State Board Exam Prep Sessions Available'
);

COMMENT ON TABLE public.programs IS 'Training programs offered by Elevate';
COMMENT ON TABLE public.cohorts IS 'Groups of students enrolled in a program delivery';
COMMENT ON TABLE public.enrollments IS 'Student enrollments in programs/cohorts';
