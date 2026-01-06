import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FERPATrainingForm from '@/components/compliance/FERPATrainingForm';

export const metadata: Metadata = {
  title: 'Complete FERPA Training | Elevate For Humanity',
  description: 'Complete your required FERPA training and certification',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/ferpa/training/complete',
  },
};

export default async function CompleteFERPATrainingPage() {
  const supabase = await createClient();
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
