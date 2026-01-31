import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ENROLLMENT_PATH = '/lms/student/enroll/barber-apprenticeship';
const LOGIN_URL = `/login?next=${encodeURIComponent(ENROLLMENT_PATH)}`;

export default async function BarberEnrollEntryPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      redirect(ENROLLMENT_PATH);
    }
  } catch (error) {
    // redirect() throws NEXT_REDIRECT, let it propagate
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }
    // Other errors: fall through to login redirect
  }
  
  // Default: not logged in or error, go to login
  redirect(LOGIN_URL);
}
