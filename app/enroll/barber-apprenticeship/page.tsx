import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ENROLLMENT_PATH = '/lms/student/enroll/barber-apprenticeship';
const LOGIN_URL = `/login?next=${encodeURIComponent(ENROLLMENT_PATH)}`;

export default async function BarberEnrollEntryPage() {
  const supabase = await createClient();
  
  if (!supabase) {
    redirect(LOGIN_URL);
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(ENROLLMENT_PATH);
  }
  
  // Default: not logged in, go to login
  redirect(LOGIN_URL);
}
