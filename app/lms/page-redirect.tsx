import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';


export default async function LMSPage() {
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
