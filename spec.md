# Static Data Audit Specification

## Problem Statement
Audit all pages on the website for static/hardcoded data that should be fetched from the database. Replace all static program, course, and content data with database-driven content.

## Scope
All files in the `app/` directory that contain hardcoded arrays for:
- Programs (`const programs = [`)
- Courses (`const courses = [`)
- Fallback data (`fallbackPrograms`, `fallbackCourses`)

## Files to Audit and Fix

### Programs (13 files)
1. `app/programs/page.tsx` - Main programs navigation
2. `app/page.tsx` - Homepage program highlights
3. `app/staff-portal/students/add/page.tsx`
4. `app/rise-foundation/programs/page.tsx`
5. `app/tuition-fees/page.tsx`
6. `app/apply/full/WIOAApplicationForm.tsx`
7. `app/program-holder/programs/page.tsx`
8. `app/program-holder/dashboard/page.tsx`
9. `app/for/students/page.tsx`
10. `app/employer-portal/programs/page.tsx`
11. `app/(marketing)/page-new.tsx`
12. `app/demo/admin/page.tsx`
13. `app/supersonic/page.tsx`

### Courses (6 files)
1. `app/community/marketplace/courses/page.tsx`
2. `app/student/courses/page.tsx`
3. `app/courses/nrf/page.tsx`
4. `app/creator/courses/page.tsx`
5. `app/creator/dashboard/page.tsx`
6. `app/drug-testing/training/page.tsx`

### Fallback Data to Remove (4 files)
1. `app/programs/healthcare/page.tsx`
2. `app/programs/skilled-trades/page.tsx`
3. `app/programs/technology/page.tsx`
4. `app/programs/business/page.tsx`

## Acceptance Criteria

The audit is **COMPLETE** when:

1. All 23 files have been updated to fetch from database
2. No `const programs = [` hardcoded arrays remain
3. No `const courses = [` hardcoded arrays remain
4. No `fallbackPrograms` or `fallbackCourses` remain
5. All pages display data from Supabase database
6. Loading states are shown while fetching
7. Error handling is in place if database fetch fails

## Implementation Approach

1. Create/verify API endpoints exist for programs and courses
2. Update each file to:
   - Add `'use client'` if not present
   - Add useState for data and loading state
   - Add useEffect to fetch from API
   - Remove hardcoded arrays
   - Add loading skeleton UI
   - Handle errors gracefully
3. Test each page loads data correctly

## Completion Criteria

The task is done when:
- `grep -rn "const programs = \[" app/` returns 0 results
- `grep -rn "const courses = \[" app/` returns 0 results  
- `grep -rn "fallbackPrograms" app/` returns 0 results
- All pages render data from database
