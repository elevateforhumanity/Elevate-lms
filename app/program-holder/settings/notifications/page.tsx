import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import NotificationPreferencesForm from './NotificationPreferencesForm';

export const metadata = {
  title: 'Notification Settings | Program Holder',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://elevateforhumanity.institute/program-holder/settings/notifications',
  },
};

export default async function ProgramHolderNotificationSettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/program-holder/settings/notifications');
  }

  // Get program holder record
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('id, organization_name')
    .eq('user_id', user.id)
    .single();

  if (!programHolder) {
    redirect('/unauthorized');
  }

  // Get or create notification preferences
  let { data: preferences } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('program_holder_id', programHolder.id)
    .single();

  // Create default preferences if they don't exist
  if (!preferences) {
    const { data: newPreferences } = await supabase
      .from('notification_preferences')
      .insert({
        program_holder_id: programHolder.id,
        email_enabled: true,
        sms_enabled: true,
        sms_consent: false,
        sms_opt_out: false,
      })
      .select()
      .single();

    preferences = newPreferences;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notification Settings
          </h1>
          <p className="text-gray-600">
            Manage how you receive notifications about student enrollments and
            updates.
          </p>
        </div>

        <NotificationPreferencesForm
          programHolderId={programHolder.id}
          initialPreferences={preferences || {}}
        />
      </div>
    </div>
  );
}
