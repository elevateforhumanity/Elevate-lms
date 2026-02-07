/**
 * STRICT Supabase Server Client
 * 
 * This client FAILS HARD when Supabase is not configured.
 * Use this for all production DB-backed routes.
 * 
 * For tests/mocks, use server.ts which has fallback behavior.
 */

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SupabaseConfigError';
  }
}

/**
 * Check if all required Supabase env vars are present
 */
export function getSupabaseConfig(): {
  url: string;
  anonKey: string;
  serviceRoleKey: string | null;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || null;

  if (!url) {
    throw new SupabaseConfigError('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  if (!anonKey) {
    throw new SupabaseConfigError('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  }

  return { url, anonKey, serviceRoleKey };
}

/**
 * STRICT server client - throws if Supabase is not configured
 * Use this for all DB-backed server routes
 */
export async function createStrictClient(): Promise<SupabaseClient<any>> {
  const { url, anonKey } = getSupabaseConfig();
  
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component - cookies are read-only
        }
      },
    },
  });
}

/**
 * STRICT admin client - throws if service role key is not configured
 * Use this for admin operations that bypass RLS
 */
export function createStrictAdminClient(): SupabaseClient<any> {
  const { url, serviceRoleKey } = getSupabaseConfig();

  if (!serviceRoleKey) {
    throw new SupabaseConfigError('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Verify database connectivity with a real query
 * Returns latency and query result
 */
export async function verifyDatabaseConnection(): Promise<{
  connected: boolean;
  latency_ms: number;
  query: string;
  result: any;
  error: string | null;
}> {
  const query = 'SELECT NOW() as server_time, current_database() as database';
  const startTime = Date.now();

  try {
    const { url, serviceRoleKey } = getSupabaseConfig();
    
    if (!serviceRoleKey) {
      return {
        connected: false,
        latency_ms: 0,
        query,
        result: null,
        error: 'SUPABASE_SERVICE_ROLE_KEY not configured',
      };
    }

    const client = createSupabaseClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Run actual SQL query
    const { data, error } = await client.rpc('exec_sql', { sql: query }).single();
    
    // If RPC doesn't exist, try a simple table query
    if (error?.message?.includes('function') || error?.message?.includes('does not exist')) {
      const { data: tableData, error: tableError } = await client
        .from('programs')
        .select('id')
        .limit(1);
      
      const latency = Date.now() - startTime;
      
      if (tableError) {
        return {
          connected: false,
          latency_ms: latency,
          query: 'SELECT id FROM programs LIMIT 1',
          result: null,
          error: tableError.message,
        };
      }

      return {
        connected: true,
        latency_ms: latency,
        query: 'SELECT id FROM programs LIMIT 1',
        result: { row_count: tableData?.length || 0 },
        error: null,
      };
    }

    const latency = Date.now() - startTime;

    if (error) {
      return {
        connected: false,
        latency_ms: latency,
        query,
        result: null,
        error: error.message,
      };
    }

    return {
      connected: true,
      latency_ms: latency,
      query,
      result: data,
      error: null,
    };
  } catch (err) {
    return {
      connected: false,
      latency_ms: Date.now() - startTime,
      query,
      result: null,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
