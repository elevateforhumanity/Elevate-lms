import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StudentSettingsForm from './StudentSettingsForm';

export const metadata: Metadata = {
  title: 'Settings | Student Portal | Elevate For Humanity',
  description: 'Manage your account settings.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StudentSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/portal/student/settings');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch notification preferences if they exist
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/portal/student/dashboard" className="hover:text-orange-600">Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Settings</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-8">Manage your preferences and security</p>

        <StudentSettingsForm 
          profile={profile}
          preferences={preferences}
          userEmail={user.email || ''}
        />
      </div>
    </div>
  );
}
