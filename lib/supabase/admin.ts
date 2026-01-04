import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function createAdminClient(): SupabaseClient<any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
      hasUrl: !!url,
      hasKey: !!key,
      urlPrefix: url?.substring(0, 20),
    });
    throw new Error('Supabase admin credentials not configured');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
