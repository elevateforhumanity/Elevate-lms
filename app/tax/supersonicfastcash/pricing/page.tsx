import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Pricing - SupersonicFastCash | Elevate for Humanity',
  description:
    'Transparent pricing for tax preparation services. No hidden fees. See all costs upfront.',
};

export default function PricingPage() {
  // Redirect to main page which has complete pricing
  redirect('/supersonic-fast-cash');
}
