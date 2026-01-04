import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createClient(): SupabaseClient<any> | any {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client
    if (typeof window === 'undefined') {
      return {
        auth: {
          signInWithPassword: async () => ({
            data: null,
            error: new Error('Supabase not configured'),
          }),
          signOut: async () => ({ error: null }),
          getSession: async () => ({ data: { session: null }, error: null }),
          getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: () => ({ data: null, error: null }),
              then: (data: unknown) => resolve({ data: [], error: null }),
            }),
            then: (data: unknown) => resolve({ data: [], error: null }),
          }),
          insert: () => ({
            then: (data: unknown) => resolve({ data: null, error: null }),
          }),
          update: () => ({
            then: (data: unknown) => resolve({ data: null, error: null }),
          }),
          delete: () => ({
            then: (data: unknown) => resolve({ data: null, error: null }),
          }),
        }),
      } as unknown;
    }
    throw new Error(
      '[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
