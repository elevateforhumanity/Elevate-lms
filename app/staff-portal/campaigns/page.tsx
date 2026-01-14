import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import CampaignsClient from './CampaignsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Email Campaigns | Staff Portal',
  description: 'Send email campaigns to students',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal/campaigns',
  },
};

async function getTemplates() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/crm/templates`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.templates || [];
  } catch (error) {
    return [];
  }
}

async function getMyStudents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/staff/my-students`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.students || [];
  } catch (error) {
    return [];
  }
}

export default async function StaffCampaignsPage() {
  const [templates, students] = await Promise.all([
    getTemplates(),
    getMyStudents(),
  ]);

  return <CampaignsClient initialTemplates={templates} initialStudents={students} />;
}
