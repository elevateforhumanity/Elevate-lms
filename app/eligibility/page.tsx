import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eligibility | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/eligibility',
  },
};

import { redirect } from 'next/navigation';

export default function EligibilityPage() {
  redirect('/wioa-eligibility');
}
