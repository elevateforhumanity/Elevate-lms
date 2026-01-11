/**
 * Supabase Browser Client
 * For use in Client Components only
 */

import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createBrowserClient(): SupabaseClient<any> | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Auth features disabled. Add these to your .env.local file to enable authentication.'
    );
    return null;
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Legacy export for backwards compatibility
export const createClient = createBrowserClient;
