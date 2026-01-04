-- ============================================================================
-- UPDATE TO DOL/ETPL APPROVED PROGRAMS FOR INDIANA
-- Remove CNA, keep only DOL Registered Apprenticeships and ETPL programs
-- ============================================================================

-- Delete all existing programs
DELETE FROM programs;

-- ============================================================================
-- PROGRAM 1: BARBER APPRENTICESHIP (DOL Registered)
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
    'Master cutting, styling, shaving, and coloring',
    'Learn barbershop business management',
    'Prepare for Indiana State Barber License',
    'Earn wages while training',
    'Job placement assistance upon completion'
  ],
  'Start your DOL-registered barbering career. 100% funded.',
  '/course-covers/barber-apprenticeship/cover.svg'
);

-- ============================================================================
-- PROGRAM 2: HVAC TECHNICIAN (ETPL Approved)
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
  'ETPL Approved - EPA 608 Certification',
  'Comprehensive HVAC training leading to EPA 608 certification and career-ready skills. ETPL approved for Indiana Workforce Ready Grant funding.',
  'Skilled Trades',
  '640 hours',
  ARRAY['WRG', 'WIOA', 'ETPL', 'Pell Grant'],
  ARRAY[
    'ETPL Approved Training Program',
    'Complete 640-hour comprehensive HVAC training',
    'Master residential and commercial systems',
    'Installation, maintenance, and repair techniques',
    'Prepare for EPA 608 certification exam',
    'Hands-on training with industry equipment',
    'Job placement with HVAC contractors'
  ],
  'Start your HVAC career. WRG and ETPL approved.',
  '/course-covers/hvac-tech/cover.svg'
);

-- ============================================================================
-- PROGRAM 3: CDL TRUCK DRIVING (DOL & ETPL Approved)
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
  'DOL Approved - Class A CDL Training',
  'Professional truck driver training leading to Class A Commercial Driver License. DOL approved curriculum with ETPL listing for Indiana funding.',
  'Transportation',
  '160 hours',
  ARRAY['DOL Approved', 'WRG', 'WIOA', 'ETPL'],
  ARRAY[
    'DOL Approved CDL Training Program',
    'Complete 160-hour Class A CDL training',
    'Behind-the-wheel training with experienced instructors',
    'Pre-trip inspection and safety procedures',
    'Prepare for CDL written and skills exams',
    'Job placement with trucking companies',
    'Average starting salary: $50,000-$65,000'
  ],
  'Start your trucking career. DOL and ETPL approved.',
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
  funding
FROM programs
ORDER BY slug;

-- Should show:
-- barber        | Barber Apprenticeship | Beauty & Wellness | 2000 hours | {DOL Apprenticeship,WIOA,WRG,ETPL}
-- hvac-tech     | HVAC Technician       | Skilled Trades    | 640 hours  | {WRG,WIOA,ETPL,Pell Grant}
-- truck-driving | CDL Truck Driving     | Transportation    | 160 hours  | {DOL Approved,WRG,WIOA,ETPL}
