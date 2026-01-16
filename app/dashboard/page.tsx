import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login?redirect=/dashboard');
    }

    // Get user profile to determine role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // Redirect based on role
    const role = profile?.role || 'student';
    
    switch (role) {
      case 'admin':
        redirect('/admin/dashboard');
      case 'staff':
        redirect('/staff-portal/dashboard');
      case 'instructor':
        redirect('/instructor/dashboard');
      case 'program_holder':
        redirect('/program-holder/dashboard');
      case 'employer':
        redirect('/employer/dashboard');
      default:
        redirect('/student/dashboard');
    }
  } catch {
    redirect('/login?redirect=/dashboard');
  }
}
