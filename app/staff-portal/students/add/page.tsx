import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StudentAddForm from './StudentAddForm';

export const metadata: Metadata = {
  title: 'Add Student | Staff Portal | Elevate For Humanity',
  description: 'Enroll a new student in the system.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AddStudentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/staff-portal/students/add');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || !['staff', 'instructor', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/');
  }

  // Fetch active programs for enrollment
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug, funding_types, price_self_pay')
    .eq('is_active', true)
    .order('name');

  // Funding type options
  const fundingTypes = [
    { value: 'wrg', label: 'Workforce Ready Grant (WRG)' },
    { value: 'wioa', label: 'WIOA' },
    { value: 'jri', label: 'Justice Reinvestment Initiative (JRI)' },
    { value: 'employindy', label: 'EmployIndy' },
    { value: 'self_pay', label: 'Self Pay' },
    { value: 'employer_sponsored', label: 'Employer Sponsored' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/staff-portal" className="hover:text-orange-600">Staff Portal</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/staff-portal/students" className="hover:text-orange-600">Students</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Add Student</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enroll New Student</h1>
        <p className="text-gray-600 mb-8">Complete the form below to enroll a new student</p>

        <StudentAddForm 
          programs={programs || []} 
          fundingTypes={fundingTypes}
          staffId={user.id}
        />
      </div>
    </div>
  );
}
