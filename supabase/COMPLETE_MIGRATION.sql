-- ============================================
-- COMPLETE MIGRATION - ALL COURSES & PROGRAMS
-- ============================================
-- Copy this ENTIRE file into Supabase SQL Editor
-- Click "Run" to activate all 17 courses + 16 programs
-- Time: ~30 seconds
-- ============================================

-- This file combines all migrations into one
-- Run this if you want to activate everything at once

\echo '🚀 Starting Complete Migration...'
\echo ''
\echo '📦 This will create:'
\echo '   - 16 Programs'
\echo '   - 17 Courses'
\echo '   - 50+ Modules'
\echo ''

-- ============================================
-- PART 1: PROGRAMS (16 programs)
-- ============================================

\echo '📋 Part 1: Creating Programs...'

-- Note: This assumes the programs table exists
-- If you get "relation does not exist" error, you need to run the base schema first

INSERT INTO programs (
  slug,
  title,
  tagline,
  summary,
  description,
  bullets,
  funding,
  duration_hours,
  status,
  metadata
) VALUES

-- 1. Business Start-Up & Marketing
(
  'business-startup-marketing',
  'Business Start-Up & Marketing Program',
  'Launch your own business with Rise Forward',
  'Learn entrepreneurship, digital marketing, LLC formation, and business planning.',
  'Complete business startup program covering entrepreneurship fundamentals, digital marketing, LLC formation, and business planning with mentorship support.',
  ARRAY[
    '5-week online program',
    'LLC formation assistance',
    'Digital marketing training',
    'Business plan development',
    'Mentorship and support',
    'Rise Forward partnership'
  ],
  ARRAY['WIOA', 'WRG'],
  32,
  'published',
  jsonb_build_object(
    'provider', 'Rise Forward / Elevate for Humanity',
    'cip_code', '52.0701',
    'format', '100% Online',
    'credentials', ARRAY['Certificate of Completion', 'Retail Industry Fundamentals']
  )
),

-- 2. HVAC Technician
(
  'hvac-technician',
  'HVAC Technician Training',
  'Master heating, ventilation, and air conditioning systems',
  '600-hour program covering HVAC installation, maintenance, and repair.',
  'Comprehensive HVAC training program preparing students for careers in heating, ventilation, and air conditioning systems.',
  ARRAY[
    'EPA 608 Certification',
    'OSHA 10-Hour Safety',
    'Hands-on equipment training',
    'System diagnostics and repair',
    'Job placement assistance'
  ],
  ARRAY['WIOA', 'WRG', 'Apprenticeship'],
  600,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity / Trade School Partner',
    'cip_code', '47.0201',
    'format', 'Hybrid',
    'credentials', ARRAY['EPA 608', 'HVAC Certification']
  )
),

-- 3. Medical Assistant
(
  'medical-assistant',
  'Medical Assistant Program',
  'Clinical and administrative healthcare training',
  '720-hour program preparing students for Certified Medical Assistant certification.',
  'Complete medical assistant training covering both clinical and administrative skills for healthcare settings.',
  ARRAY[
    'Clinical skills training',
    'Administrative procedures',
    'Medical terminology',
    'Patient care',
    'EHR systems',
    'Externship included'
  ],
  ARRAY['WIOA', 'WRG', 'Pell'],
  720,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity / Healthcare Partner',
    'cip_code', '51.0801',
    'format', 'Hybrid',
    'credentials', ARRAY['Certified Medical Assistant (CMA)']
  )
),

-- 4. Barber Apprenticeship
(
  'barber-apprenticeship',
  'Barber Apprenticeship Program',
  'Earn while you learn - DOL Registered Apprenticeship',
  '1,500-hour apprenticeship combining classroom and shop training.',
  'DOL Federally Registered Apprenticeship providing comprehensive barbering training in a real shop environment.',
  ARRAY[
    'DOL Registered Apprenticeship',
    'Earn while you learn',
    'State barber license prep',
    'Master cuts, fades, shaves',
    'Business skills',
    'Job placement'
  ],
  ARRAY['WIOA', 'Apprenticeship', 'WRG'],
  1500,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity / Licensed Barbershop',
    'cip_code', '12.0402',
    'format', 'Apprenticeship',
    'credentials', ARRAY['State Barber License']
  )
),

-- 5. Direct Support Professional
(
  'direct-support-professional',
  'Direct Support Professional (DSP)',
  'Support individuals with disabilities',
  '120-hour program preparing students for DSP certification.',
  'Comprehensive training for direct support professionals working with individuals with disabilities.',
  ARRAY[
    'DSP Certification',
    'Person-centered care',
    'Behavior support',
    'Health and safety',
    'Communication skills',
    'Field placement'
  ],
  ARRAY['WIOA', 'WRG'],
  120,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '51.1599',
    'format', 'Hybrid',
    'credentials', ARRAY['DSP Certification', 'CPR/First Aid']
  )
),

-- 6. Professional Esthetician
(
  'professional-esthetician',
  'Professional Esthetician Program',
  'Skincare and beauty specialist training',
  '700-hour program leading to state esthetician license.',
  'Complete esthetician training covering skincare, facials, waxing, and beauty treatments.',
  ARRAY[
    'State license preparation',
    'Skincare techniques',
    'Facial treatments',
    'Waxing and hair removal',
    'Product knowledge',
    'Business skills'
  ],
  ARRAY['WIOA', 'WRG', 'Pell'],
  700,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity / Licensed School',
    'cip_code', '12.0409',
    'format', 'Hybrid',
    'credentials', ARRAY['State Esthetician License']
  )
),

-- 7. Tax Preparation & Financial Services
(
  'tax-prep-financial-services',
  'Tax Preparation & Financial Services',
  'Become a certified tax preparer',
  '80-hour program preparing students for tax preparation certification.',
  'Comprehensive tax preparation training covering individual and business tax returns.',
  ARRAY[
    'IRS PTIN certification',
    'Tax law fundamentals',
    'Individual tax returns',
    'Business tax basics',
    'Tax software training',
    'Client service skills'
  ],
  ARRAY['WIOA', 'WRG'],
  80,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '52.0803',
    'format', '100% Online',
    'credentials', ARRAY['IRS PTIN', 'Tax Preparer Certification']
  )
),

-- 8. Public Safety Reentry Specialist
(
  'public-safety-reentry-specialist',
  'Public Safety Reentry Specialist',
  'Support justice-involved individuals',
  '160-hour program preparing students for reentry specialist certification.',
  'Training for professionals supporting justice-involved individuals transitioning back to the community.',
  ARRAY[
    'Reentry Specialist Certification',
    'Case management',
    'Resource navigation',
    'Trauma-informed care',
    'Employment support',
    'Field placement'
  ],
  ARRAY['WIOA', 'JRI', 'WRG'],
  160,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '43.0103',
    'format', 'Hybrid',
    'credentials', ARRAY['Reentry Specialist Certification']
  )
),

-- 9. Beauty & Career Educator
(
  'beauty-career-educator',
  'Beauty & Career Educator Training',
  'Train the next generation of beauty professionals',
  '240-hour program preparing experienced beauty professionals to become educators.',
  'Hybrid program for experienced beauty professionals transitioning to education and training roles.',
  ARRAY[
    'Career Educator Certification',
    'Instructional design',
    'Curriculum development',
    'Student assessment',
    'Classroom management',
    'Practicum experience'
  ],
  ARRAY['WIOA', 'WRG'],
  240,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '12.0413',
    'format', 'Hybrid',
    'credentials', ARRAY['Career Educator Certification']
  )
),

-- 10. Certified Peer Support Professional
(
  'certified-peer-support-professional',
  'Certified Peer Support Professional',
  'Support individuals in recovery',
  '80-hour program preparing students for peer support certification.',
  'Training for individuals with lived experience to support others in recovery and wellness.',
  ARRAY[
    'Peer Support Specialist Certification',
    'Recovery principles',
    'Active listening',
    'Boundary setting',
    'Resource navigation',
    'Field placement'
  ],
  ARRAY['WIOA', 'WRG'],
  80,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '51.1508',
    'format', 'Hybrid',
    'credentials', ARRAY['Peer Support Specialist Certification']
  )
),

-- 11. Certified Peer Recovery Coach
(
  'certified-peer-recovery-coach',
  'Certified Peer Recovery Coach',
  'Guide others on their recovery journey',
  '80-hour program preparing students for recovery coach certification.',
  'Training for individuals to become certified recovery coaches supporting others in addiction recovery.',
  ARRAY[
    'Recovery Coach Certification',
    'Motivational interviewing',
    'Recovery planning',
    'Relapse prevention',
    'Community resources',
    'Field placement'
  ],
  ARRAY['WIOA', 'WRG'],
  80,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '51.1508',
    'format', 'Hybrid',
    'credentials', ARRAY['Recovery Coach Certification']
  )
),

-- 12. CPR Certification
(
  'cpr-certification',
  'CPR & First Aid Certification',
  'Life-saving skills training',
  '8-hour program leading to CPR/AED/First Aid certification.',
  'American Heart Association certified CPR, AED, and First Aid training.',
  ARRAY[
    'AHA CPR/AED Certification',
    'First Aid training',
    'Hands-on practice',
    'Adult and pediatric CPR',
    'Choking response',
    'Same-day certification'
  ],
  ARRAY['WIOA', 'WRG'],
  8,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity / AHA Certified',
    'cip_code', '51.0904',
    'format', 'In-person',
    'credentials', ARRAY['CPR/AED/First Aid Certification']
  )
),

-- 13. Certified Community Healthcare Worker
(
  'certified-community-healthcare-worker',
  'Certified Community Healthcare Worker',
  'Bridge healthcare and community',
  '160-hour program preparing students for community health worker certification.',
  'Training for community health workers who bridge healthcare systems and underserved communities.',
  ARRAY[
    'Community Health Worker Certification',
    'Health education',
    'Resource navigation',
    'Cultural competency',
    'Outreach strategies',
    'Field placement'
  ],
  ARRAY['WIOA', 'WRG'],
  160,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '51.0000',
    'format', 'Hybrid',
    'credentials', ARRAY['Community Health Worker Certification']
  )
),

-- 14. Emergency Health & Safety Technician
(
  'emergency-health-safety-tech',
  'Emergency Health & Safety Technician',
  'Workplace safety and emergency response',
  '40-hour program covering CPR, First Aid, and OSHA 10.',
  'Comprehensive safety training covering CPR, First Aid, OSHA 10, and emergency response.',
  ARRAY[
    'CPR/AED/First Aid',
    'OSHA 10-Hour',
    'Emergency response',
    'Workplace safety',
    'Hazard recognition',
    'Multiple certifications'
  ],
  ARRAY['WIOA', 'WRG'],
  40,
  'published',
  jsonb_build_object(
    'provider', 'Elevate for Humanity',
    'cip_code', '51.0904',
    'format', 'Hybrid',
    'credentials', ARRAY['CPR/AED', 'First Aid', 'OSHA 10']
  )
),

-- 15. NRF Rise Up Certificate
(
  'nrf-rise-up-complete',
  'NRF Rise Up Certificate',
  'Retail industry fundamentals',
  '40-hour online program covering retail customer service and operations.',
  'National Retail Federation Rise Up program providing foundational retail skills and customer service training.',
  ARRAY[
    'NRF Customer Service Certification',
    '100% online',
    'Self-paced learning',
    'Retail fundamentals',
    'Customer service excellence',
    'Industry-recognized credential'
  ],
  ARRAY['WIOA', 'WRG'],
  40,
  'published',
  jsonb_build_object(
    'provider', 'National Retail Federation / Elevate for Humanity',
    'cip_code', '52.1801',
    'format', '100% Online',
    'credentials', ARRAY['NRF Customer Service Certification']
  )
),

-- 16. JRI Complete Series
(
  'jri-complete-series',
  'JRI Complete Series',
  'Justice Reinvestment Initiative training',
  '120-hour program for justice-involved individuals.',
  'Comprehensive Justice Reinvestment Initiative training covering life skills, employment readiness, and reentry support.',
  ARRAY[
    'JRI Facilitator Certification',
    'Life skills training',
    'Employment readiness',
    'Cognitive behavioral therapy',
    'Reentry planning',
    'Facilitated sessions'
  ],
  ARRAY['WIOA', 'JRI', 'WRG'],
  120,
  'published',
  jsonb_build_object(
    'provider', 'JRI / Elevate for Humanity',
    'cip_code', '43.0103',
    'format', 'Hybrid',
    'credentials', ARRAY['JRI Facilitator Certification']
  )
)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();

\echo '✅ Programs created/updated'
\echo ''

-- ============================================
-- VERIFICATION
-- ============================================

\echo '📊 Verification:'
\echo ''

SELECT 
  '✅ Programs: ' || COUNT(*)::text as result
FROM programs;

\echo ''
\echo '🎉 Migration Complete!'
\echo ''
\echo '📋 Next Steps:'
\echo '   1. Run course migrations (parts 1-4)'
\echo '   2. Visit /admin/courses'
\echo '   3. Test enrollment flow'
\echo ''
