import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const ENROLLMENT_PATH = '/lms/student/enroll/barber-apprenticeship';

export default async function BarberEnrollEntryPage() {
  const supabase = await createClient();
  
  if (!supabase) {
    // Fallback: send to login with return URL
    redirect(`/login?next=${encodeURIComponent(ENROLLMENT_PATH)}`);
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Logged in: go directly to enrollment
    redirect(ENROLLMENT_PATH);
  } else {
    // Not logged in: go to login with return URL
    redirect(`/login?next=${encodeURIComponent(ENROLLMENT_PATH)}`);
  }
}
