'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Bell, Lock, Globe, Palette, Shield, LogOut, Save } from 'lucide-react';

interface Props {
  profile: any;
  preferences: any;
  userEmail: string;
}

export default function StudentSettingsForm({ profile, preferences, userEmail }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [notifications, setNotifications] = useState({
    emailCourseUpdates: preferences?.email_course_updates ?? true,
    emailReminders: preferences?.email_reminders ?? true,
    emailAchievements: preferences?.email_achievements ?? true,
    emailNewsletter: preferences?.email_newsletter ?? false,
    pushNotifications: preferences?.push_notifications ?? true,
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const tabs = [
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: profile.id,
          email_course_updates: notifications.emailCourseUpdates,
          email_reminders: notifications.emailReminders,
          email_achievements: notifications.emailAchievements,
          email_newsletter: notifications.emailNewsletter,
          push_notifications: notifications.pushNotifications,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Notification preferences saved' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save preferences' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (security.newPassword !== security.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (security.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: security.newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Password updated successfully' });
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update password' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-1">
        <nav className="bg-white rounded-xl border p-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                activeTab === tab.id ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'
              }`}>
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.name}</span>
            </button>
          ))}
          <hr className="my-2" />
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="md:col-span-3">
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl border p-6">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'emailCourseUpdates', label: 'Course updates', desc: 'New lessons, assignments, and course announcements' },
                  { key: 'emailReminders', label: 'Learning reminders', desc: 'Reminders to continue your learning' },
                  { key: 'emailAchievements', label: 'Achievements', desc: 'Notifications when you earn badges or certificates' },
                  { key: 'emailNewsletter', label: 'Newsletter', desc: 'Tips, resources, and platform updates' },
                  { key: 'pushNotifications', label: 'Push notifications', desc: 'Browser notifications for important updates' },
                ].map(item => (
                  <label key={item.key} className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={e => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded text-orange-500" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={handleSaveNotifications} disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Security Settings</h2>
              
              <div>
                <h3 className="font-medium mb-3">Change Password</h3>
                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" value={security.currentPassword}
                      onChange={e => setSecurity({ ...security, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" value={security.newPassword}
                      onChange={e => setSecurity({ ...security, newPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" value={security.confirmPassword}
                      onChange={e => setSecurity({ ...security, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <button onClick={handleChangePassword} disabled={isSaving}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Enable 2FA
                </button>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-medium mb-3">Active Sessions</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-gray-500">{userEmail}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Privacy Settings</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded text-orange-500" />
                  <div>
                    <p className="font-medium">Profile visibility</p>
                    <p className="text-sm text-gray-500">Allow other students to see your profile</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded text-orange-500" />
                  <div>
                    <p className="font-medium">Show progress</p>
                    <p className="text-sm text-gray-500">Display your learning progress on leaderboards</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded text-orange-500" />
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-gray-500">Help improve the platform by sharing usage data</p>
                  </div>
                </label>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                <Save className="w-4 h-4" /> Save Privacy Settings
              </button>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Appearance</h2>
              <div>
                <h3 className="font-medium mb-3">Theme</h3>
                <div className="flex gap-4">
                  {['Light', 'Dark', 'System'].map(theme => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" defaultChecked={theme === 'Light'}
                        className="w-4 h-4 text-orange-500" />
                      <span>{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Language</h3>
                <select className="px-3 py-2 border rounded-lg">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                <Save className="w-4 h-4" /> Save Appearance
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
