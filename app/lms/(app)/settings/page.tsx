export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/settings',
  },
  title: 'Settings | LMS | Elevate For Humanity',
  description: 'Manage your account settings and preferences.',
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/lms/settings');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <p className="text-gray-900">
                  {profile?.full_name || 'Not set'}
                </p>
              </div>
              <Link
                href="/lms/profile"
                className="inline-block text-brand-blue-600 hover:text-brand-blue-700 font-medium"
              >
                Edit Profile →
              </Link>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive updates about your courses
                  </p>
                </div>
                <button className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Enabled
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Reminders</p>
                  <p className="text-sm text-gray-600">
                    Get reminded about upcoming deadlines
                  </p>
                </div>
                <button className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Enabled
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-gray-600">
                    Control who can see your profile
                  </p>
                </div>
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Classmates Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Progress</p>
                  <p className="text-sm text-gray-600">
                    Display your learning progress on leaderboard
                  </p>
                </div>
                <button className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Enabled
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <Link
                href="/reset"
                className="block text-brand-blue-600 hover:text-brand-blue-700 font-medium"
              >
                Change Password
              </Link>
              <Link
                href="/help"
                className="block text-brand-blue-600 hover:text-brand-blue-700 font-medium"
              >
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
