import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Master Dashboard | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function MasterDashboardPage() {
  redirect('/admin/dashboard');
}
