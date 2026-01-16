export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard Enhanced | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function DashboardEnhancedPage() {
  redirect('/admin/dashboard');
}
