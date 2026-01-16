import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function LearnerPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login?redirect=/learner/dashboard');
    }

    redirect('/learner/dashboard');
  } catch {
    redirect('/login?redirect=/learner/dashboard');
  }
}
