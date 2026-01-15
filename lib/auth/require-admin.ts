import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Require Admin Role (Server-Side)
 *
 * Use this in admin page components to ensure:
 * 1. User is authenticated
 * 2. User has admin or super_admin role
 * 3. Redirects to appropriate page if not authorized
 *
 * Returns the authenticated user and profile
 */
export async function requireAdmin() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login?next=/admin&error=auth_required');
  }

  // Check admin role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    redirect('/login?next=/admin&error=profile_not_found');
  }

  if (profile.role !== 'admin' && profile.role !== 'super_admin') {
    redirect('/unauthorized?reason=admin_required');
  }

  return { user, profile };
}

/**
 * Check if user is admin (without redirect)
 *
 * Use this when you need to conditionally show admin features
 * but don't want to block the entire page
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role === 'admin' || profile?.role === 'super_admin';
  } catch (error) {
    return false;
  }
}
