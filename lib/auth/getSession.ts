// lib/auth/getSession.ts
// Helper to require authentication in server components
import { createServerSupabaseClient } from '@/lib/auth';

export async function requireAuth() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('UNAUTHENTICATED');
  }
  return session;
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
