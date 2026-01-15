import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function LearnerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/learner/dashboard');
  }

  redirect('/learner/dashboard');
}
