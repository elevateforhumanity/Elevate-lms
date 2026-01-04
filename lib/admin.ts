import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Admin check: email contains "admin" or "elevate"
  const isAdmin =
    user.email?.includes('admin') ||
    user.email?.includes('elevate') ||
    user.email?.endsWith('@elevateforhumanity.org');

  if (!isAdmin) {
    throw new Error('Not authorized - admin access required');
  }

  return user;
}

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    return (
      user.email?.includes('admin') ||
      user.email?.includes('elevate') ||
      user.email?.endsWith('@elevateforhumanity.org') ||
      false
    );
  } catch {
    return false;
  }
}
