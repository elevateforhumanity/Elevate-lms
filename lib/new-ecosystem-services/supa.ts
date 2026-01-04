import { createClient } from '@supabase/supabase-js';

// Next.js environment variables (no Vite)
const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://Content.supabase.co';
const supaAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'Content-key';

export const supa = createClient(supaUrl, supaAnon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// Helper for typed errors
export function must<T>(value: T | null, msg = 'Not found') {
  if (value === null) throw new Error(msg);
  return value;
}
