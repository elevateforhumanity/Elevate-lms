import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
import FERPATrainingForm from '@/components/compliance/FERPATrainingForm';

export const metadata: Metadata = {
  title: 'Complete FERPA Training | Elevate For Humanity',
  description: 'Complete your required FERPA training and certification',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/ferpa/training/complete',
  },
};

export default async function CompleteFERPATrainingPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/ferpa/training/complete');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect('/unauthorized');
  }

  // Check if user already has current training
  const { data: existingTraining } = await supabase
    .from('ferpa_training_records')
    .select('*')
    .eq('user_id', user.id)
    .gte('completed_at', new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString())
    .single();

  return (
    <FERPATrainingForm
      user={profile}
      existingTraining={existingTraining}
    />
  );
}
