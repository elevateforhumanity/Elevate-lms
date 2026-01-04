// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

// Use Content values during build if env vars not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://Content.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'Content-key';

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
    },
  }
);
