import { createClient } from '@/lib/supabase/server';

export type PartnerRole =
  | 'owner'
  | 'site_coordinator'
  | 'staff'
  | 'instructor'
  | 'manager'
  | 'supervisor'
  | 'admin';

export async function getSessionUser() {
  const supabase = await createClient();
  const { data, error }: any = await supabase.auth.getUser();
  if (error) return null;
  return data.user ?? null;
}

export async function getMyPartnerContext() {
  const supabase = await createClient();
  const user = await getSessionUser();
  if (!user) return null;

  // profile role (admin etc.)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .maybeSingle();

  // shops I belong to
  const { data: shops } = await supabase
    .from('shop_staff')
    .select('shop_id, role, shops:shops(id, name, active)')
    .eq('user_id', user.id);

  return {
    user,
    profileRole: (profile?.role ?? null) as string | null,
    shops: (shops ?? []).map((s: any) => ({
      shop_id: s.shop_id,
      staff_role: s.role as PartnerRole,
      shop: s.shops,
    })),
  };
}
