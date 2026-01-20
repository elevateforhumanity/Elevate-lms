import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ScheduleForm from './ScheduleForm';

export const metadata: Metadata = {
  title: 'Schedule Appointment | Student Support | Elevate For Humanity',
  description: 'Schedule an appointment with a student advisor.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/student-support/schedule');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone')
    .eq('id', user.id)
    .single();

  // Fetch available advisors
  const { data: advisors } = await supabase
    .from('profiles')
    .select('id, full_name, role, avatar_url')
    .in('role', ['staff', 'instructor', 'admin'])
    .limit(10);

  // Fetch existing appointments for the user
  const { data: existingAppointments } = await supabase
    .from('appointments')
    .select('id, appointment_date, appointment_time, status, advisor:profiles!appointments_advisor_id_fkey(full_name)')
    .eq('student_id', user.id)
    .gte('appointment_date', new Date().toISOString().split('T')[0])
    .order('appointment_date', { ascending: true })
    .limit(5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/student-support" className="hover:text-orange-600">Student Support</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Schedule Appointment</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule an Appointment</h1>
        <p className="text-gray-600 mb-8">Book a meeting with an advisor or counselor</p>

        <ScheduleForm 
          userId={user.id}
          userProfile={profile}
          advisors={advisors || []}
          existingAppointments={existingAppointments || []}
        />
      </div>
    </div>
  );
}
