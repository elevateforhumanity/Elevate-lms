import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal Attendance',
  description: 'Internal page for Program-Holder Portal Attendance',
  path: '/program-holder/portal/attendance',
});

import { redirect } from 'next/navigation';

// ACTIVE: Attendance tracking is Implemented
// Redirect to dashboard
export default function PortalAttendanceRedirect() {
  redirect('/program-holder/dashboard');
}
