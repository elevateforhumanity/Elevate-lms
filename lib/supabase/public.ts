/**
 * Public Supabase Client - NO COOKIES
 * 
 * Use this for public/marketing pages that should be statically generated.
 * This client uses the anon key and does NOT access cookies().
 * 
 * For authenticated routes, use server.ts which handles cookies.
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Mock query builder for when Supabase isn't configured
const mockQueryBuilder: any = {
  select: () => mockQueryBuilder,
  insert: () => mockQueryBuilder,
  update: () => mockQueryBuilder,
  delete: () => mockQueryBuilder,
  eq: () => mockQueryBuilder,
  neq: () => mockQueryBuilder,
  gt: () => mockQueryBuilder,
  gte: () => mockQueryBuilder,
  lt: () => mockQueryBuilder,
  lte: () => mockQueryBuilder,
  like: () => mockQueryBuilder,
  ilike: () => mockQueryBuilder,
  is: () => mockQueryBuilder,
  in: () => mockQueryBuilder,
  contains: () => mockQueryBuilder,
  containedBy: () => mockQueryBuilder,
  order: () => mockQueryBuilder,
  limit: () => mockQueryBuilder,
  range: () => mockQueryBuilder,
  single: () => Promise.resolve({ data: null, error: null }),
  maybeSingle: () => Promise.resolve({ data: null, error: null }),
  then: (resolve: any) => resolve({ data: [], error: null, count: 0 }),
};

const mockClient = {
  from: () => mockQueryBuilder,
} as unknown as SupabaseClient<any>;

/**
 * Create a public Supabase client for static/public pages
 * Does NOT use cookies - safe for SSG
 * Returns mock client if not configured (for build-time SSG)
 */
export function createPublicClient(): SupabaseClient<any> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return mockClient;
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
