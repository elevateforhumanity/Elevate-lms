// =====================================================
// AUTHENTICATION & AUTHORIZATION UTILITIES
// =====================================================

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { UserRole } from '@/types/database';

// =====================================================
// BUILD-TIME CLIENT (No cookies, for generateStaticParams)
// =====================================================

export function createBuildTimeSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// =====================================================
// SERVER-SIDE AUTH
// =====================================================

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user) return null;

  const supabase = await createServerSupabaseClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return {
    ...session.user,
    profile,
  };
}

export async function getUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser();
  return user?.profile?.role || null;
}

// =====================================================
// ROLE CHECKING
// =====================================================

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const session = await requireAuth();
  const role = await getUserRole();

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!role || !roles.includes(role)) {
    redirect('/unauthorized');
  }

  return { session, role };
}

export async function requireStudent() {
  return requireRole('student');
}

export async function requireAdmin() {
  return requireRole('admin');
}

export async function requireProgramHolder() {
  return requireRole('program_holder');
}

export async function requireDelegate() {
  return requireRole('delegate');
}

export async function requireAdminOrDelegate() {
  return requireRole(['admin', 'delegate']);
}

// =====================================================
// PERMISSION CHECKS
// =====================================================

export async function canAccessStudent(studentId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const role = user.profile?.role;

  // Admins can access all students
  if (role === 'admin') return true;

  // Students can only access their own data
  if (role === 'student') {
    return user.id === studentId;
  }

  // Delegates can access their assigned students
  if (role === 'delegate') {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', studentId)
      .eq('delegate_id', user.id)
      .single();
    
    return !!data;
  }

  // Program holders can access their enrolled students
  if (role === 'program_holder') {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', studentId)
      .eq('program_holder_id', user.profile.id)
      .single();
    
    return !!data;
  }

  return false;
}

export async function canAccessEnrollment(enrollmentId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const supabase = await createServerSupabaseClient();
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('student_id, delegate_id, program_holder_id')
    .eq('id', enrollmentId)
    .single();

  if (!enrollment) return false;

  const role = user.profile?.role;

  // Admins can access all enrollments
  if (role === 'admin') return true;

  // Students can access their own enrollments
  if (role === 'student' && enrollment.student_id === user.id) return true;

  // Delegates can access their assigned enrollments
  if (role === 'delegate' && enrollment.delegate_id === user.id) return true;

  // Program holders can access their enrollments
  if (role === 'program_holder' && enrollment.program_holder_id === user.profile.id) return true;

  return false;
}

// =====================================================
// SIGN OUT
// =====================================================

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/login');
}
