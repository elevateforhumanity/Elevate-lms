// lib/auth/syncUserProfile.ts
// Sync SSO users into Supabase profiles table
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type SyncUserInput = {
  email: string;
  name: string;
  provider: string;
  providerAccountId: string;
  tenantId?: string;
};

export async function syncUserProfile(input: SyncUserInput) {
  const { email, name, provider, providerAccountId, tenantId } = input;

  if (!email) return;

  // Check if user exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    // Update existing user
    await supabase
      .from('profiles')
      .update({
        full_name: name,
        last_login_at: new Date().toISOString(),
        last_login_provider: provider,
        last_login_provider_account_id: providerAccountId,
        updated_at: new Date().toISOString()
      })
      .eq('email', email);
  } else {
    // Create new user
    await supabase.from('profiles').insert({
      email,
      full_name: name,
      tenant_id: tenantId || null,
      last_login_at: new Date().toISOString(),
      last_login_provider: provider,
      last_login_provider_account_id: providerAccountId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
}
