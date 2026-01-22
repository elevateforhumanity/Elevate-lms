import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Enterprise Infrastructure Demo | Elevate for Humanity',
  description: 'See how workforce boards and regional systems govern programs without direct operational involvement.',
};

export default function EnterpriseDemoPage() {
  // Redirect to the live interactive employer demo
  redirect('/demo/employer');
}
