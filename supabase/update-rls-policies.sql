-- Update RLS Policies for Public Access
-- Run this in Supabase SQL Editor
-- Date: December 31, 2025

-- ============================================================================
-- PROGRAMS TABLE - Allow public read access to active programs
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active programs" ON programs;
DROP POLICY IF EXISTS "Public programs are viewable by everyone" ON programs;

-- Create new policy for public read access
CREATE POLICY "Anyone can view active programs" 
ON programs 
FOR SELECT 
USING (active = true);

-- ============================================================================
-- COURSES TABLE - Allow public read access to active courses
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
DROP POLICY IF EXISTS "Public courses are viewable by everyone" ON courses;

-- Create new policy for public read access
CREATE POLICY "Anyone can view active courses" 
ON courses 
FOR SELECT 
USING (active = true);

-- ============================================================================
-- ENROLLMENTS TABLE - Students can view their own enrollments
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Students can view own enrollments" ON enrollments;

-- Recreate policy
CREATE POLICY "Students can view own enrollments" 
ON enrollments 
FOR SELECT 
USING (auth.uid() = student_id);

-- ============================================================================
-- PROFILES TABLE - Users can view their own profile
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate policies
CREATE POLICY "Users can view own profile" 
ON profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- ============================================================================
-- APPLICATIONS TABLE - Allow public to create applications
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;

-- Create policy for public application creation
CREATE POLICY "Anyone can create applications" 
ON applications 
FOR INSERT 
WITH CHECK (true);

-- ============================================================================
-- CERTIFICATES TABLE - Allow public verification by certificate number
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can verify certificates" ON certificates;

-- Create policy for public certificate verification
CREATE POLICY "Anyone can verify certificates" 
ON certificates 
FOR SELECT 
USING (verified = true);

-- ============================================================================
-- VERIFY POLICIES
-- ============================================================================

-- Check programs policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'programs';

-- Check courses policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'courses';

-- ============================================================================
-- TEST QUERIES (Run these to verify policies work)
-- ============================================================================

-- Test 1: Query programs (should work)
SELECT id, name, slug, active FROM programs WHERE active = true LIMIT 5;

-- Test 2: Query courses (should work)
SELECT id, title, program_id, active FROM courses WHERE active = true LIMIT 5;

-- Test 3: Count programs
SELECT COUNT(*) as total_programs FROM programs WHERE active = true;

-- Test 4: Count courses
SELECT COUNT(*) as total_courses FROM courses WHERE active = true;

-- ============================================================================
-- NOTES
-- ============================================================================

-- These policies allow:
-- ✅ Public read access to active programs
-- ✅ Public read access to active courses
-- ✅ Public creation of applications
-- ✅ Public verification of certificates
-- ✅ Users can view/update their own profile
-- ✅ Students can view their own enrollments

-- These policies prevent:
-- ❌ Public access to inactive programs/courses
-- ❌ Public access to other users' profiles
-- ❌ Public access to other students' enrollments
-- ❌ Unauthorized modifications

-- Security is maintained while allowing necessary public access
