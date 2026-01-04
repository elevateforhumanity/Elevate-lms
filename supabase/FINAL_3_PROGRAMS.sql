-- ============================================================================
-- FINAL 3 PROGRAMS - DOL/ETPL APPROVED FOR ELEVATE FOR HUMANITY
-- Run this in Supabase SQL Editor to update programs
-- ============================================================================

-- Delete ALL existing programs
DELETE FROM programs;

-- ============================================================================
-- PROGRAM 1: BARBER APPRENTICESHIP
-- DOL Registered Apprenticeship
-- ============================================================================

INSERT INTO programs (
  slug,
  title,
  tagline,
  summary,
  track,
  hours,
  funding,
  bullets,
  cta,
  cover_url
) VALUES (
  'barber',
  'Barber Apprenticeship',
  'DOL Registered Apprenticeship - Indiana State Board Approved',
  'Master the art of barbering with comprehensive 2,000-hour DOL Registered Apprenticeship. Earn while you learn and prepare for Indiana State Barber License.',
  'Beauty & Wellness',
  '2000 hours',
  ARRAY['DOL Apprenticeship', 'WIOA', 'WRG', 'ETPL'],
  ARRAY[
    'DOL Registered Apprenticeship Program',
    'Complete 2,000-hour comprehensive training',
    'Master cutting, styling, shaving, and coloring techniques',
    'Learn barbershop business management and operations',
    'Prepare for Indiana State Barber License exam',
    'Earn wages while training in real barbershop',
    'Job placement assistance upon completion',
    'Average starting salary: $35K-$55K'
  ],
  'Start your DOL-registered barbering career. 100% funded through WIOA and WRG.',
  '/course-covers/barber-apprenticeship/cover.svg'
);

-- ============================================================================
-- PROGRAM 2: HVAC TECHNICIAN
-- ETPL Approved - EPA 608 Certification
-- ============================================================================

INSERT INTO programs (
  slug,
  title,
  tagline,
  summary,
  track,
  hours,
  funding,
  bullets,
  cta,
  cover_url
) VALUES (
  'hvac-tech',
  'HVAC Technician',
  'ETPL Approved - EPA 608 Certification Training',
  'Comprehensive HVAC training leading to EPA 608 certification and career-ready skills. ETPL approved for Indiana Workforce Ready Grant funding.',
  'Skilled Trades',
  '640 hours',
  ARRAY['WRG', 'WIOA', 'ETPL', 'Pell Grant'],
  ARRAY[
    'ETPL Approved Training Program',
    'Complete 640-hour comprehensive HVAC training',
    'Master residential and commercial HVAC systems',
    'Learn installation, maintenance, and repair techniques',
    'Prepare for EPA 608 certification exam',
    'Hands-on training with industry-standard equipment',
    'Job placement assistance with HVAC contractors',
    'Average starting salary: $45K-$65K'
  ],
  'Start your HVAC career. WRG and ETPL approved for 100% funding.',
  '/course-covers/hvac-tech/cover.svg'
);

-- ============================================================================
-- PROGRAM 3: CDL TRUCK DRIVING
-- DOL Approved - Class A Commercial Driver License
-- ============================================================================

INSERT INTO programs (
  slug,
  title,
  tagline,
  summary,
  track,
  hours,
  funding,
  bullets,
  cta,
  cover_url
) VALUES (
  'truck-driving',
  'CDL Truck Driving',
  'DOL Approved - Class A CDL Training Program',
  'Professional truck driver training leading to Class A Commercial Driver License. DOL approved curriculum with ETPL listing for Indiana funding.',
  'Transportation',
  '160 hours',
  ARRAY['DOL Approved', 'WRG', 'WIOA', 'ETPL'],
  ARRAY[
    'DOL Approved CDL Training Program',
    'Complete 160-hour Class A CDL training',
    'Behind-the-wheel training with experienced instructors',
    'Pre-trip inspection and safety procedures training',
    'Prepare for CDL written and skills exams',
    'Job placement assistance with trucking companies',
    'Average starting salary: $50K-$65K',
    'High demand - immediate job opportunities'
  ],
  'Start your trucking career. DOL and ETPL approved for 100% funding.',
  '/course-covers/truck-driving/cover.svg'
);

-- ============================================================================
-- VERIFY INSERTS
-- ============================================================================

SELECT 
  slug,
  title,
  track,
  hours,
  array_length(funding, 1) as funding_sources,
  array_length(bullets, 1) as bullet_points
FROM programs
ORDER BY slug;

-- Expected output:
-- barber        | Barber Apprenticeship | Beauty & Wellness | 2000 hours | 4 | 8
-- hvac-tech     | HVAC Technician       | Skilled Trades    | 640 hours  | 4 | 8
-- truck-driving | CDL Truck Driving     | Transportation    | 160 hours  | 4 | 8

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Successfully added 3 DOL/ETPL approved programs';
  RAISE NOTICE '   - Barber Apprenticeship (DOL Registered)';
  RAISE NOTICE '   - HVAC Technician (ETPL Approved)';
  RAISE NOTICE '   - CDL Truck Driving (DOL Approved)';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 Next steps:';
  RAISE NOTICE '   1. Verify programs show on /programs page';
  RAISE NOTICE '   2. Test program detail pages load';
  RAISE NOTICE '   3. Verify enrollment flow works';
END $$;
