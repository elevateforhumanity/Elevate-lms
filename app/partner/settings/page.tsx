import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PartnerSettingsForm from './PartnerSettingsForm';

export default function PartnerSettingsPage() {
  const [saved, setSaved] = useState(false);
  // Settings loaded from user profile/organization
  const [settings, setSettings] = useState({
    orgName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    emailNotifications: true,
    weeklyDigest: true,
    outcomeAlerts: true,
    referralConfirmations: true,
  });

export const dynamic = 'force-dynamic';

export default async function PartnerSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/partner/settings');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !['delegate', 'program_holder', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/');
  }

  // Get partner's program holder record if exists
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  // Get delegate record if exists
  const { data: delegate } = await supabase
    .from('delegates')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/partner" className="hover:text-orange-600">Partner Portal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Settings</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Settings</h1>
        <p className="text-gray-600 mb-8">Manage your organization profile and preferences</p>

        <PartnerSettingsForm 
          profile={profile}
          programHolder={programHolder}
          delegate={delegate}
        />
      </div>
    </div>
  );
}
