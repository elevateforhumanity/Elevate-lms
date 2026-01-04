# Row Level Security (RLS) Policies Documentation

## Overview

All tables in the database have Row Level Security (RLS) enabled. This document describes the access control policies for each table.

## Migration Files

- `001_initial_schema.sql` - Initial schema with profiles table
- `002_lms_schema.sql` - LMS tables with initial RLS policies
- `003_lms_seed_data.sql` - Sample data
- `004_add_missing_rls_policies.sql` - **NEW** - Comprehensive RLS policies

## Complete Policy Matrix

### 1. Profiles Table

| Operation | Policy                       | Access Rule                            |
| --------- | ---------------------------- | -------------------------------------- |
| SELECT    | Public profiles viewable     | Everyone can view all profiles         |
| INSERT    | Users can insert own profile | User can only create their own profile |
| UPDATE    | Users can update own profile | User can only update their own profile |
| DELETE    | Users can delete own profile | User can only delete their own profile |

### 2. Courses Table

| Operation | Policy                 | Access Rule                                               |
| --------- | ---------------------- | --------------------------------------------------------- |
| SELECT    | Courses viewable       | Published courses: everyone; Unpublished: instructor only |
| INSERT    | Instructors can insert | Only course instructor can create                         |
| UPDATE    | Instructors can update | Only course instructor can update                         |
| DELETE    | Instructors can delete | Only course instructor can delete                         |

### 3. Modules Table

| Operation | Policy                 | Access Rule                                                  |
| --------- | ---------------------- | ------------------------------------------------------------ |
| SELECT    | Modules viewable       | Published courses: everyone; Enrolled students + instructors |
| INSERT    | Instructors can insert | Only course instructor can create modules                    |
| UPDATE    | Instructors can update | Only course instructor can update modules                    |
| DELETE    | Instructors can delete | Only course instructor can delete modules                    |

**Access Logic:**

- Public: Can view modules for published courses
- Instructors: Can view/edit all modules for their courses
- Students: Can view modules for courses they're enrolled in

### 4. Enrollments Table

| Operation | Policy                     | Access Rule                           |
| --------- | -------------------------- | ------------------------------------- |
| SELECT    | Users view own enrollments | User can only see their enrollments   |
| INSERT    | Users can enroll           | User can enroll themselves in courses |
| UPDATE    | Users can update           | User can update their own enrollments |
| DELETE    | Users can delete           | User can unenroll from courses        |

### 5. Module Progress Table

| Operation | Policy                    | Access Rule                                            |
| --------- | ------------------------- | ------------------------------------------------------ |
| SELECT    | Users view own progress   | User can only see their own progress                   |
| INSERT    | Users can insert progress | User can create progress records for their enrollments |
| UPDATE    | Users can update progress | User can update their own progress                     |

### 6. Assignments Table

| Operation | Policy                   | Access Rule                                   |
| --------- | ------------------------ | --------------------------------------------- |
| SELECT    | Students and instructors | Enrolled students + course instructors        |
| INSERT    | Instructors can insert   | Only course instructor can create assignments |
| UPDATE    | Instructors can update   | Only course instructor can update assignments |
| DELETE    | Instructors can delete   | Only course instructor can delete assignments |

**Access Logic:**

- Students: Can view assignments for courses they're enrolled in
- Instructors: Full CRUD access for their course assignments

### 7. Submissions Table

| Operation           | Policy                              | Access Rule                                              |
| ------------------- | ----------------------------------- | -------------------------------------------------------- |
| SELECT (Student)    | Users view own submissions          | User can see their own submissions                       |
| SELECT (Instructor) | Instructors view course submissions | Instructors can see all submissions for their courses    |
| INSERT              | Users can submit                    | User can submit assignments                              |
| UPDATE (Student)    | Users can update own                | User can update their submissions (resubmit)             |
| UPDATE (Instructor) | Instructors can grade               | Instructors can update submissions (add grades/feedback) |

**Note:** Submissions have dual UPDATE policies to allow both student resubmissions and instructor grading.

### 8. Certificates Table

| Operation | Policy            | Access Rule                                      |
| --------- | ----------------- | ------------------------------------------------ |
| SELECT    | Publicly viewable | Anyone can view certificates (for verification)  |
| INSERT    | System can insert | Only for completed courses (enforced by trigger) |

**Note:** Certificates are primarily created by database triggers when a course is completed.

## Security Considerations

### Authentication Required

All policies use `auth.uid()` which requires users to be authenticated. Unauthenticated users will have no access except:

- Viewing published courses
- Viewing public profiles
- Viewing certificates (for verification)

### Instructor Verification

Instructor permissions are verified by checking:

```sql
courses.instructor_id = auth.uid()
```

This ensures only the course creator can manage course content.

### Student Enrollment Verification

Student access to course materials is verified by checking:

```sql
EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE enrollments.course_id = [course_id]
    AND enrollments.user_id = auth.uid()
)
```

### Cascading Deletes

The schema uses `ON DELETE CASCADE` for foreign keys, so:

- Deleting a course deletes all modules, enrollments, and related data
- Deleting a user deletes their profile, enrollments, and submissions
- Deleting a module deletes its assignments and progress records

## Testing RLS Policies

### Test as Student

```sql
-- Set session to student user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "student-user-id"}';

-- Should see only enrolled courses
SELECT * FROM courses;

-- Should see only own enrollments
SELECT * FROM enrollments;
```

### Test as Instructor

```sql
-- Set session to instructor user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "instructor-user-id"}';

-- Should see own courses (published and unpublished)
SELECT * FROM courses WHERE instructor_id = 'instructor-user-id';

-- Should be able to create modules
INSERT INTO modules (course_id, title, ...) VALUES (...);
```

### Test as Anonymous

```sql
-- Reset to anonymous
RESET role;

-- Should see only published courses
SELECT * FROM courses WHERE published = true;

-- Should NOT see any enrollments
SELECT * FROM enrollments; -- Returns empty
```

## Migration Instructions

To apply the new RLS policies to your Supabase project:

### Option 1: Using Supabase CLI

```bash
# Make sure you're in the project directory
cd /workspaces/fix2

# Apply the migration
supabase db push
```

### Option 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/004_add_missing_rls_policies.sql`
4. Paste and run the SQL

### Option 3: Manual Application

If you have direct database access:

```bash
psql "postgresql://[connection-string]" < supabase/migrations/004_add_missing_rls_policies.sql
```

## Verification

After applying the migration, verify policies are in place:

```sql
-- Check all policies for a table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'modules';

-- Count policies per table
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;
```

Expected policy counts:

- profiles: 4 policies
- courses: 4 policies
- modules: 4 policies
- enrollments: 4 policies
- module_progress: 3 policies
- certificates: 2 policies
- assignments: 4 policies
- submissions: 5 policies

## Troubleshooting

### "Permission Denied" Errors

If users get permission denied errors:

1. Verify RLS is enabled: `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;`
2. Check policies exist: `SELECT * FROM pg_policies WHERE tablename = '[table_name]';`
3. Verify user authentication: Ensure `auth.uid()` returns the correct user ID
4. Check enrollment status: For student access, verify enrollment record exists

### Policy Not Working

If a policy doesn't work as expected:

1. Check the policy definition in `pg_policies`
2. Test the policy condition manually
3. Verify foreign key relationships are correct
4. Check for conflicting policies

### Performance Issues

If RLS policies cause slow queries:

1. Ensure indexes exist on foreign keys (already created in migrations)
2. Consider materialized views for complex policy checks
3. Monitor query plans with `EXPLAIN ANALYZE`

## Future Enhancements

Potential policy improvements:

1. **Admin Role**: Add policies for admin users who can manage all content
2. **Teaching Assistants**: Add policies for TAs who can help grade but not modify courses
3. **Course Co-Instructors**: Allow multiple instructors per course
4. **Private Courses**: Add policies for invitation-only courses
5. **Draft Submissions**: Allow students to save draft submissions before final submission
6. **Peer Review**: Add policies for students to review each other's work

## References

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
