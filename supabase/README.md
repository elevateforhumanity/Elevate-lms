# Elevate for Humanity - Database Schema

## Overview

Complete Supabase/PostgreSQL schema for WRG/WIOA/JRI workforce training platform.

## Quick Start

### 1. Apply Migration

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase Dashboard
# Copy contents of migrations/20241113_complete_schema.sql
# Paste into SQL Editor and run
```

### 2. Verify Tables

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

## Schema Structure

### Core User Tables

- **profiles** - Extends Supabase auth.users with role and profile data
- **students** - Student-specific data including WRG/WIOA eligibility
- **program_holders** - Training providers with MOU tracking
- **delegates** - Case managers who oversee student caseloads

### Program Structure

- **programs** - Training programs (Barber, CNA, HVAC, etc.)
- **courses** - Courses within programs
- **modules** - Modules within courses
- **lessons** - Individual lessons with video/content
- **lesson_resources** - PDFs, links, documents attached to lessons

### Enrollment & Progress

- **enrollments** - Student enrollments with funding type
- **lesson_progress** - Track which lessons students have completed
- **attendance_log** - Detailed attendance for WRG/WIOA compliance
- **contact_hours** - Weekly aggregated hours for reporting

### Assessments

- **quizzes** - Quiz definitions
- **quiz_questions** - Questions with correct answers
- **quiz_attempts** - Student quiz attempts with scores
- **grades** - Overall grades for quizzes/assignments

### Certificates

- **certificates** - Issued certificates with verification codes
  - Auto-generates certificate_number (CERT-2024-123456)
  - Auto-generates verification_code (12-char alphanumeric)

### Communications

- **messages** - User-to-user messaging
- **notifications** - In-app notifications

## Key Features

### 1. Role-Based Access (RLS Enabled)

```typescript
// Roles
type UserRole =
  | 'student'
  | 'admin'
  | 'program_holder'
  | 'delegate'
  | 'instructor';

// Students see their own data
// Delegates see their assigned caseload
// Admins see everything
```

### 2. Funding Type Tracking

```typescript
type FundingType =
  | 'wrg'
  | 'wioa'
  | 'jri'
  | 'employindy'
  | 'self_pay'
  | 'employer_sponsored';

// Stored in enrollments table
// Used for reporting and compliance
```

### 3. Attendance Tracking

```typescript
type AttendanceType =
  | 'login'
  | 'lesson_complete'
  | 'quiz_attempt'
  | 'live_session';

// Every student action logged
// Aggregated weekly in contact_hours table
// Exportable for WRG/WIOA audits
```

### 4. MOU Workflow

```typescript
type MouStatus =
  | 'not_sent'
  | 'pending'
  | 'sent'
  | 'signed_by_holder'
  | 'fully_executed';

// Two-step signing process
// Stores both signatures
// Generates final PDF
```

## Common Queries

### Get Student's Active Enrollments

```sql
SELECT
  e.*,
  p.name as program_name,
  p.total_hours,
  COUNT(lp.id) FILTER (WHERE lp.completed_at IS NOT NULL) as lessons_completed
FROM enrollments e
JOIN programs p ON e.program_id = p.id
LEFT JOIN lesson_progress lp ON lp.enrollment_id = e.id
WHERE e.student_id = 'student-uuid'
  AND e.status = 'active'
GROUP BY e.id, p.id;
```

### Get Delegate's Caseload

```sql
SELECT
  e.*,
  s.first_name || ' ' || s.last_name as student_name,
  p.name as program_name,
  ch.total_hours as hours_this_week
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN programs p ON e.program_id = p.id
LEFT JOIN contact_hours ch ON ch.enrollment_id = e.id
  AND ch.week_start_date = date_trunc('week', CURRENT_DATE)
WHERE e.delegate_id = 'delegate-uuid'
  AND e.status IN ('active', 'pending')
ORDER BY s.last_name;
```

### Get Program Holder's Students

```sql
SELECT
  e.*,
  s.first_name || ' ' || s.last_name as student_name,
  p.name as program_name,
  e.funding_type,
  CASE
    WHEN e.completed_at IS NOT NULL THEN 'Completed'
    WHEN e.started_at IS NOT NULL THEN 'In Progress'
    ELSE 'Not Started'
  END as progress_status
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN programs p ON e.program_id = p.id
WHERE e.program_holder_id = 'program-holder-uuid'
ORDER BY e.enrolled_at DESC;
```

### Weekly Attendance Report

```sql
SELECT
  s.first_name || ' ' || s.last_name as student_name,
  p.name as program_name,
  ch.week_start_date,
  ch.total_hours,
  ch.login_count,
  ch.lessons_completed
FROM contact_hours ch
JOIN enrollments e ON ch.enrollment_id = e.id
JOIN students s ON e.student_id = s.id
JOIN programs p ON e.program_id = p.id
WHERE ch.week_start_date >= CURRENT_DATE - INTERVAL '4 weeks'
ORDER BY ch.week_start_date DESC, s.last_name;
```

### Certificate Verification

```sql
SELECT
  c.*,
  s.first_name || ' ' || s.last_name as student_name,
  p.name as program_name,
  p.total_hours as program_hours
FROM certificates c
JOIN students s ON c.student_id = s.id
JOIN programs p ON c.program_id = p.id
WHERE c.verification_code = 'ABC123XYZ456'
  AND c.status = 'issued';
```

## Indexes

All critical queries are indexed:

- User lookups by email and role
- Enrollment lookups by student, program, delegate
- Attendance logs by student and date
- Certificate verification by code

## Security (RLS Policies)

- **Students**: Can only see their own data
- **Delegates**: Can see their assigned students
- **Program Holders**: Can see their enrolled students
- **Admins**: Can see everything
- **Public**: Can verify certificates (read-only)

## Triggers

- **updated_at**: Auto-updates on all tables with updated_at column
- **certificate_codes**: Auto-generates certificate_number and verification_code

## Next Steps

1. **Apply this migration** to your Supabase project
2. **Create API routes** in `/app/api/` to interact with these tables
3. **Update components** to fetch real data instead of mock data
4. **Implement auth** to protect routes by role
5. **Build reporting** for WRG/WIOA compliance

## TypeScript Types

All types are defined in `/types/database.ts` - import and use throughout your app:

```typescript
import type { Student, Enrollment, Certificate } from '@/types/database';
```

## Support

For questions about this schema, see:

- Supabase docs: https://supabase.com/docs
- PostgreSQL docs: https://www.postgresql.org/docs/
