import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Institutional Operator Demo | Elevate for Humanity',
  description: 'See how institutions operate multiple programs while maintaining clean, auditable records.',
};

export default function InstitutionalDemoPage() {
  // Redirect to the live interactive admin demo
  redirect('/demo/admin');
}
