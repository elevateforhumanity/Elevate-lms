import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Elevate for Humanity',
  robots: { index: false, follow: true },
};

export default function TermsRedirectPage() {
  redirect('/terms-of-service');
}
