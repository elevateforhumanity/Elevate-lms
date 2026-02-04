import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform Analytics | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/analytics',
  },
};

import { redirect } from 'next/navigation';

export default function AnalyticsPage() {
  redirect('/lms/analytics');
}
