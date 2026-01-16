export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Lms Dashboard | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function LMSDashboardPage() {
  redirect('/admin/dashboard');
}
