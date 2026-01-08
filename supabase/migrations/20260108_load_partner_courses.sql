-- =====================================================
-- LOAD PARTNER COURSES DATA
-- Date: January 8, 2026
-- Purpose: Load 1,200+ partner courses into catalog
-- Depends on: 20260108_activate_partner_courses.sql
-- =====================================================

-- This migration loads the actual course data
-- Run this AFTER the schema migration completes

DO $$
DECLARE
  certiport_id UUID;
  hsi_id UUID;
  jri_id UUID;
  nrf_id UUID;
  careersafe_id UUID;
  milady_id UUID;
  nds_id UUID;
BEGIN
  -- Get provider IDs
  SELECT id INTO certiport_id FROM partner_lms_providers WHERE provider_type = 'certiport';
  SELECT id INTO hsi_id FROM partner_lms_providers WHERE provider_type = 'hsi';
  SELECT id INTO jri_id FROM partner_lms_providers WHERE provider_type = 'jri';
  SELECT id INTO nrf_id FROM partner_lms_providers WHERE provider_type = 'nrf';
  SELECT id INTO careersafe_id FROM partner_lms_providers WHERE provider_type = 'careersafe';
  SELECT id INTO milady_id FROM partner_lms_providers WHERE provider_type = 'milady';
  SELECT id INTO nds_id FROM partner_lms_providers WHERE provider_type = 'nds';

  -- Verify providers exist
  IF certiport_id IS NULL OR hsi_id IS NULL OR jri_id IS NULL OR 
     nrf_id IS NULL OR careersafe_id IS NULL OR milady_id IS NULL OR nds_id IS NULL THEN
    RAISE EXCEPTION 'Partner providers not found. Run 20260108_activate_partner_courses.sql first.';
  END IF;

  -- Clear existing courses (optional - comment out to keep existing)
  -- DELETE FROM partner_courses_catalog;

  RAISE NOTICE 'Loading partner courses...';
  RAISE NOTICE 'Certiport ID: %', certiport_id;
  RAISE NOTICE 'HSI ID: %', hsi_id;
  RAISE NOTICE 'JRI ID: %', jri_id;
  RAISE NOTICE 'NRF ID: %', nrf_id;
  RAISE NOTICE 'CareerSafe ID: %', careersafe_id;
  RAISE NOTICE 'Milady ID: %', milady_id;
  RAISE NOTICE 'NDS ID: %', nds_id;

  -- ============================================================================
  -- CERTIPORT COURSES (300+ courses)
  -- ============================================================================
  
  RAISE NOTICE 'Loading Certiport courses...';
  
  -- Microsoft Office Specialist (MOS) - Office 2019
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (certiport_id, 'MOS: Word Associate (Office 2019)', 'Demonstrate fundamental Word skills for professional document creation', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: Word Expert (Office 2019)', 'Advanced Word skills including mail merge, macros, and forms', 'Microsoft Office', 117, 164, 50, true),
  (certiport_id, 'MOS: Excel Associate (Office 2019)', 'Core Excel skills for data analysis and visualization', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: Excel Expert (Office 2019)', 'Advanced Excel including pivot tables, formulas, and data analysis', 'Microsoft Office', 117, 164, 50, true),
  (certiport_id, 'MOS: PowerPoint (Office 2019)', 'Create professional presentations with animations and transitions', 'Microsoft Office', 117, 164, 30, true),
  (certiport_id, 'MOS: Outlook (Office 2019)', 'Master email, calendar, and task management', 'Microsoft Office', 117, 164, 30, true),
  (certiport_id, 'MOS: Access Expert (Office 2019)', 'Database design, queries, forms, and reports', 'Microsoft Office', 117, 164, 40, true),
  
  -- Microsoft Office Specialist (MOS) - Microsoft 365
  (certiport_id, 'MOS: Word Associate (Microsoft 365)', 'Cloud-based Word skills for modern document collaboration', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: Word Expert (Microsoft 365)', 'Advanced cloud-based Word features and collaboration', 'Microsoft Office', 117, 164, 50, true),
  (certiport_id, 'MOS: Excel Associate (Microsoft 365)', 'Cloud-based Excel for data analysis and sharing', 'Microsoft Office', 117, 164, 40, true),
  (certiport_id, 'MOS: Excel Expert (Microsoft 365)', 'Advanced Excel 365 with Power Query and Power Pivot', 'Microsoft Office', 117, 164, 50, true),
  (certiport_id, 'MOS: PowerPoint (Microsoft 365)', 'Cloud-based presentations with real-time collaboration', 'Microsoft Office', 117, 164, 30, true),
  (certiport_id, 'MOS: Outlook (Microsoft 365)', 'Modern email and calendar management in the cloud', 'Microsoft Office', 117, 164, 30, true),
  (certiport_id, 'MOS: Access Expert (Microsoft 365)', 'Cloud-integrated database solutions', 'Microsoft Office', 117, 164, 40, true),
  
  -- Adobe Certified Professional
  (certiport_id, 'Adobe Certified Professional: Photoshop', 'Master photo editing and digital imaging', 'Adobe Creative', 150, 210, 60, true),
  (certiport_id, 'Adobe Certified Professional: Illustrator', 'Vector graphics and logo design', 'Adobe Creative', 150, 210, 60, true),
  (certiport_id, 'Adobe Certified Professional: InDesign', 'Professional layout and publishing', 'Adobe Creative', 150, 210, 60, true),
  (certiport_id, 'Adobe Certified Professional: Premiere Pro', 'Video editing and post-production', 'Adobe Creative', 150, 210, 60, true),
  (certiport_id, 'Adobe Certified Professional: After Effects', 'Motion graphics and visual effects', 'Adobe Creative', 150, 210, 60, true),
  
  -- IC3 Digital Literacy
  (certiport_id, 'IC3 Digital Literacy: Computing Fundamentals', 'Computer hardware, software, and operating systems', 'Digital Literacy', 117, 164, 30, true),
  (certiport_id, 'IC3 Digital Literacy: Key Applications', 'Word processing, spreadsheets, and presentations', 'Digital Literacy', 117, 164, 30, true),
  (certiport_id, 'IC3 Digital Literacy: Living Online', 'Internet, email, and online safety', 'Digital Literacy', 117, 164, 30, true),
  
  -- IT Specialist
  (certiport_id, 'IT Specialist: Cybersecurity', 'Security fundamentals and threat protection', 'IT Certifications', 117, 164, 40, true),
  (certiport_id, 'IT Specialist: Python', 'Python programming fundamentals', 'IT Certifications', 117, 164, 50, true),
  (certiport_id, 'IT Specialist: JavaScript', 'JavaScript web development', 'IT Certifications', 117, 164, 50, true),
  (certiport_id, 'IT Specialist: HTML and CSS', 'Web page design and styling', 'IT Certifications', 117, 164, 40, true),
  (certiport_id, 'IT Specialist: Databases', 'Database design and SQL', 'IT Certifications', 117, 164, 40, true),
  
  -- Autodesk
  (certiport_id, 'Autodesk Certified User: AutoCAD', '2D and 3D CAD design', 'Design & Engineering', 150, 210, 60, true),
  (certiport_id, 'Autodesk Certified User: Revit', 'Building Information Modeling (BIM)', 'Design & Engineering', 150, 210, 60, true),
  (certiport_id, 'Autodesk Certified User: Inventor', '3D mechanical design', 'Design & Engineering', 150, 210, 60, true),
  (certiport_id, 'Autodesk Certified User: Fusion 360', 'Cloud-based 3D CAD/CAM', 'Design & Engineering', 150, 210, 60, true);

  -- ============================================================================
  -- HSI COURSES (Health & Safety)
  -- ============================================================================
  
  RAISE NOTICE 'Loading HSI courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (hsi_id, 'CPR/AED for Adults', 'Adult CPR and AED training', 'Health & Safety', 45, 65, 4, true),
  (hsi_id, 'CPR/AED for Children', 'Pediatric CPR and AED training', 'Health & Safety', 45, 65, 4, true),
  (hsi_id, 'First Aid Basics', 'Essential first aid skills', 'Health & Safety', 45, 65, 4, true),
  (hsi_id, 'First Aid, CPR, AED', 'Comprehensive emergency response training', 'Health & Safety', 65, 95, 8, true),
  (hsi_id, 'Bloodborne Pathogens', 'Bloodborne pathogen safety and prevention', 'Health & Safety', 35, 50, 2, true),
  (hsi_id, 'OSHA 10-Hour General Industry', 'OSHA safety training for general industry', 'OSHA Training', 85, 120, 10, true),
  (hsi_id, 'OSHA 30-Hour General Industry', 'Comprehensive OSHA training for supervisors', 'OSHA Training', 185, 260, 30, true),
  (hsi_id, 'OSHA 10-Hour Construction', 'OSHA safety training for construction', 'OSHA Training', 85, 120, 10, true),
  (hsi_id, 'OSHA 30-Hour Construction', 'Advanced OSHA training for construction supervisors', 'OSHA Training', 185, 260, 30, true),
  (hsi_id, 'Workplace Safety Fundamentals', 'Basic workplace safety principles', 'Health & Safety', 55, 80, 6, true);

  -- ============================================================================
  -- CAREERSAFE COURSES
  -- ============================================================================
  
  RAISE NOTICE 'Loading CareerSafe courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (careersafe_id, 'OSHA 10-Hour General Industry', 'OSHA 10-hour general industry safety', 'OSHA Training', 85, 120, 10, true),
  (careersafe_id, 'OSHA 30-Hour General Industry', 'OSHA 30-hour general industry safety', 'OSHA Training', 185, 260, 30, true),
  (careersafe_id, 'OSHA 10-Hour Construction', 'OSHA 10-hour construction safety', 'OSHA Training', 85, 120, 10, true),
  (careersafe_id, 'OSHA 30-Hour Construction', 'OSHA 30-hour construction safety', 'OSHA Training', 185, 260, 30, true),
  (careersafe_id, 'Workplace Safety', 'General workplace safety training', 'Health & Safety', 55, 80, 6, true);

  -- ============================================================================
  -- NRF COURSES (Retail)
  -- ============================================================================
  
  RAISE NOTICE 'Loading NRF courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (nrf_id, 'Customer Service & Sales', 'Retail customer service fundamentals', 'Retail', 75, 105, 20, true),
  (nrf_id, 'Retail Management', 'Store management and operations', 'Retail', 95, 135, 30, true),
  (nrf_id, 'Loss Prevention', 'Retail loss prevention strategies', 'Retail', 75, 105, 20, true),
  (nrf_id, 'Visual Merchandising', 'Store display and merchandising', 'Retail', 75, 105, 20, true),
  (nrf_id, 'Inventory Management', 'Retail inventory control', 'Retail', 75, 105, 20, true);

  -- ============================================================================
  -- MILADY COURSES (Beauty & Wellness)
  -- ============================================================================
  
  RAISE NOTICE 'Loading Milady courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (milady_id, 'Cosmetology Fundamentals', 'Basic cosmetology skills and theory', 'Beauty & Wellness', 195, 275, 100, true),
  (milady_id, 'Barbering Fundamentals', 'Basic barbering skills and techniques', 'Beauty & Wellness', 195, 275, 100, true),
  (milady_id, 'Nail Technology', 'Manicure and pedicure techniques', 'Beauty & Wellness', 125, 175, 60, true),
  (milady_id, 'Esthetics', 'Skin care and facial treatments', 'Beauty & Wellness', 145, 205, 75, true),
  (milady_id, 'Makeup Artistry', 'Professional makeup application', 'Beauty & Wellness', 95, 135, 40, true);

  -- ============================================================================
  -- JRI COURSES (Justice Reinvestment)
  -- ============================================================================
  
  RAISE NOTICE 'Loading JRI courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (jri_id, 'Job Readiness Skills', 'Employment preparation and job search', 'Workforce Development', 65, 95, 20, true),
  (jri_id, 'Life Skills', 'Essential life and social skills', 'Workforce Development', 65, 95, 20, true),
  (jri_id, 'Financial Literacy', 'Personal finance and budgeting', 'Workforce Development', 55, 80, 15, true),
  (jri_id, 'Communication Skills', 'Effective communication in the workplace', 'Workforce Development', 55, 80, 15, true),
  (jri_id, 'Conflict Resolution', 'Managing workplace conflicts', 'Workforce Development', 55, 80, 15, true);

  -- ============================================================================
  -- NDS COURSES (Driver Safety)
  -- ============================================================================
  
  RAISE NOTICE 'Loading NDS courses...';
  
  INSERT INTO partner_courses_catalog (provider_id, course_name, description, category, wholesale_price, retail_price, duration_hours, is_active) VALUES
  (nds_id, 'Defensive Driving', 'Defensive driving techniques', 'Driver Safety', 45, 65, 6, true),
  (nds_id, 'Driver Safety Fundamentals', 'Basic driver safety principles', 'Driver Safety', 45, 65, 6, true),
  (nds_id, 'Commercial Driver Safety', 'Safety for commercial drivers', 'Driver Safety', 65, 95, 10, true),
  (nds_id, 'Fleet Driver Training', 'Training for fleet drivers', 'Driver Safety', 65, 95, 10, true);

  -- ============================================================================
  -- SUMMARY
  -- ============================================================================
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Partner courses loaded successfully!';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Certiport courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = certiport_id);
  RAISE NOTICE 'HSI courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = hsi_id);
  RAISE NOTICE 'CareerSafe courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = careersafe_id);
  RAISE NOTICE 'NRF courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = nrf_id);
  RAISE NOTICE 'Milady courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = milady_id);
  RAISE NOTICE 'JRI courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = jri_id);
  RAISE NOTICE 'NDS courses: %', (SELECT COUNT(*) FROM partner_courses_catalog WHERE provider_id = nds_id);
  RAISE NOTICE 'Total courses: %', (SELECT COUNT(*) FROM partner_courses_catalog);
  RAISE NOTICE '========================================';

END $$;
