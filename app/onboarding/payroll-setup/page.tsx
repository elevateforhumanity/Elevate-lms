import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import PayrollSetupForm from './PayrollSetupForm';


export default async function PayrollSetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/onboarding/payroll-setup');
  }

  // Get user's profile to determine role
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.role) {
    redirect('/onboarding/start');
  }

  // Get payout rate config for role
  const { data: rateConfigs } = await supabase
    .from('payout_rate_configs')
    .select('*')
    .eq('role', profile.role)
    .eq('is_active', true);

  // Check if payroll profile already exists
  const { data: existingProfile } = await supabase
    .from('payroll_profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('role', profile.role)
    .single();

  return (
    <PayrollSetupForm
      user={user}
      profile={profile}
      rateConfigs={rateConfigs || []}
      existingProfile={existingProfile}
    />
  );
}
