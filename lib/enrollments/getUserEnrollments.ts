/**
 * Unified enrollment resolver for dashboards
 * Queries all enrollment tables and returns normalized objects
 * Used by student-portal and other dashboards to render "Continue Learning" links
 */

import { createClient } from '@/lib/supabase/server';

export type NormalizedEnrollment = {
  source: 'enrollments' | 'student_enrollments' | 'partner_enrollments' | 'partner_lms_enrollments';
  enrollment_id: string;
  user_id: string;
  course_id: string | null;
  program_id: string | null;
  pathway_slug: string | null;
  status: string;
  progress: number;
  created_at: string;
  updated_at: string | null;
  // Metadata for display
  course_title?: string;
  program_title?: string;
};

export type EnrollmentQueryResult = {
  enrollments: NormalizedEnrollment[];
  error: string | null;
};

/**
 * Get all enrollments for a user across all enrollment tables
 * Returns normalized array sorted by most recent first
 */
export async function getUserEnrollments(userId: string): Promise<EnrollmentQueryResult> {
  const supabase = await createClient();
  
  if (!supabase) {
    return { enrollments: [], error: 'Database not configured' };
  }

  const results: NormalizedEnrollment[] = [];

  // Query enrollments table
  const { data: enrollments, error: e1 } = await supabase
    .from('enrollments')
    .select('id, user_id, course_id, program_id, status, progress, created_at, updated_at')
    .eq('user_id', userId);

  if (!e1 && enrollments) {
    for (const e of enrollments) {
      results.push({
        source: 'enrollments',
        enrollment_id: e.id,
        user_id: e.user_id,
        course_id: e.course_id,
        program_id: e.program_id,
        pathway_slug: null,
        status: e.status || 'active',
        progress: e.progress || 0,
        created_at: e.created_at,
        updated_at: e.updated_at,
      });
    }
  }

  // Query student_enrollments table
  const { data: studentEnrollments, error: e2 } = await supabase
    .from('student_enrollments')
    .select('id, student_id, course_id, program_id, status, progress, created_at, updated_at')
    .eq('student_id', userId);

  if (!e2 && studentEnrollments) {
    for (const e of studentEnrollments) {
      results.push({
        source: 'student_enrollments',
        enrollment_id: e.id,
        user_id: e.student_id,
        course_id: e.course_id,
        program_id: e.program_id,
        pathway_slug: null,
        status: e.status || 'active',
        progress: e.progress || 0,
        created_at: e.created_at,
        updated_at: e.updated_at,
      });
    }
  }

  // Query partner_enrollments table
  const { data: partnerEnrollments, error: e3 } = await supabase
    .from('partner_enrollments')
    .select('id, user_id, course_id, program_id, status, created_at, updated_at')
    .eq('user_id', userId);

  if (!e3 && partnerEnrollments) {
    for (const e of partnerEnrollments) {
      results.push({
        source: 'partner_enrollments',
        enrollment_id: e.id,
        user_id: e.user_id,
        course_id: e.course_id,
        program_id: e.program_id,
        pathway_slug: null,
        status: e.status || 'active',
        progress: 0,
        created_at: e.created_at,
        updated_at: e.updated_at,
      });
    }
  }

  // Query partner_lms_enrollments table
  const { data: partnerLmsEnrollments, error: e4 } = await supabase
    .from('partner_lms_enrollments')
    .select('id, user_id, course_id, program_id, status, progress, created_at, updated_at')
    .eq('user_id', userId);

  if (!e4 && partnerLmsEnrollments) {
    for (const e of partnerLmsEnrollments) {
      results.push({
        source: 'partner_lms_enrollments',
        enrollment_id: e.id,
        user_id: e.user_id,
        course_id: e.course_id,
        program_id: e.program_id,
        pathway_slug: null,
        status: e.status || 'active',
        progress: e.progress || 0,
        created_at: e.created_at,
        updated_at: e.updated_at,
      });
    }
  }

  // Sort by created_at descending (most recent first)
  results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return { enrollments: results, error: null };
}

/**
 * Build LMS handoff URL with proper context
 * Used by dashboards to create "Continue Learning" links
 */
export function buildLmsHandoffUrl(
  enrollment: NormalizedEnrollment,
  returnUrl: string = '/student-portal'
): string {
  const params = new URLSearchParams();
  params.set('enrollmentId', enrollment.enrollment_id);
  params.set('return', returnUrl);

  // If we have a course_id, link directly to the course
  if (enrollment.course_id) {
    return `/lms/courses/${enrollment.course_id}?${params.toString()}`;
  }

  // Otherwise, link to LMS dashboard with enrollment context
  return `/lms/dashboard?${params.toString()}`;
}

/**
 * Get active enrollments only (filters out completed/cancelled)
 */
export async function getActiveEnrollments(userId: string): Promise<EnrollmentQueryResult> {
  const result = await getUserEnrollments(userId);
  
  if (result.error) {
    return result;
  }

  const activeStatuses = ['active', 'enrolled', 'in_progress', 'pending'];
  const activeEnrollments = result.enrollments.filter(e => 
    activeStatuses.includes(e.status.toLowerCase())
  );

  return { enrollments: activeEnrollments, error: null };
}
