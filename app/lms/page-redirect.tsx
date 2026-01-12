import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';


export default async function LMSPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If logged in, redirect to LMS dashboard
  if (user) {
    redirect('/lms/dashboard');
  }

  // If not logged in, redirect to login with return URL
  redirect('/login?next=/lms/dashboard');
}
