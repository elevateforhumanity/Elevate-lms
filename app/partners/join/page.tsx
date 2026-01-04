import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import RoleSelectionCards from './RoleSelectionCards';


export default async function PartnersJoinPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/partners/join');
  }

  // Check if user already has a partner profile
  const { data: existingProfile } = await supabase
    .from('partner_profiles')
    .select('role, status')
    .eq('user_id', user.id)
    .single();

  if (existingProfile) {
    // Already has a role, redirect to onboarding or dashboard
    if (existingProfile.status === 'pending') {
      redirect('/partners/onboarding');
    } else {
      const dashboardMap: Record<string, string> = {
        PROGRAM_HOLDER: '/program-holder',
        WORKSITE_ONLY: '/worksite',
        SITE_COORDINATOR: '/coordinator',
      };
      redirect(dashboardMap[existingProfile.role] || '/dashboard');
    }
  }

  // Get role packages
  const { data: rolePackages } = await supabase
    .from('role_packages')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Become a Partner
          </h1>
          <p className="text-lg text-slate-600">
            Join our network and help students succeed. Choose the role that
            fits your capacity and expertise.
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <RoleSelectionCards
          rolePackages={rolePackages || []}
          userId={user.id}
        />
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            What Happens Next?
          </h3>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Choose your role and review the responsibilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>
                Complete the onboarding checklist (MOU, handbook, tax forms)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>E-sign all required documents</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Wait for admin approval (typically 1-2 business days)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">5.</span>
              <span>Access your dashboard and start working with students</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
