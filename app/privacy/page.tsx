import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Elevate for Humanity',
  robots: { index: false, follow: true },
};

export default function PrivacyRedirectPage() {
  redirect('/privacy-policy');
}
