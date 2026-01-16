export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Enrollment | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

// Redirect to enrollments (plural)
export default function EnrollmentPage() {
  redirect('/admin/enrollments');
}
