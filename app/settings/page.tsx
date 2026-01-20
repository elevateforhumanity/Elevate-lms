import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, User, Bell, Lock, CreditCard, Globe, Palette, Shield, LogOut } from 'lucide-react';
import SettingsForm from './SettingsForm';

export const metadata: Metadata = {
  title: 'Settings | Elevate For Humanity',
  description: 'Manage your account settings.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/settings');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch user preferences if they exist
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Settings</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        <SettingsForm 
          profile={profile}
          preferences={preferences}
          userEmail={user.email || ''}
        />
      </div>
    </div>
  );
}
