import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StudentProfileForm from './StudentProfileForm';

export const metadata: Metadata = {
  title: 'Profile | Student Portal | Elevate For Humanity',
  description: 'Manage your student profile.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StudentProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/portal/student/profile');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch student details
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch enrollment stats
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id, status, program:programs(name)')
    .eq('student_id', user.id);

  const { data: certificates } = await supabase
    .from('certificates')
    .select('id')
    .eq('student_id', user.id)
    .eq('status', 'issued');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
            <Breadcrumbs items={[{ label: "Portal", href: "/portal" }, { label: "Student", href: "/portal/student/dashboard" }, { label: "Profile" }]} />
<div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/portal/student/dashboard" className="hover:text-orange-600">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Profile</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-8">Manage your personal information</p>

        <StudentProfileForm 
          profile={profile}
          student={student}
          stats={{
            enrollments: enrollments?.length || 0,
            active: enrollments?.filter(e => e.status === 'active').length || 0,
            completed: enrollments?.filter(e => e.status === 'completed').length || 0,
            certificates: certificates?.length || 0,
          }}
        />
      </div>
    </div>
  );
}
