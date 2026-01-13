import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

/**
 * Redirect /privacy to /privacy-policy
 */
export default function PrivacyRedirect() {
  redirect('/privacy-policy');
}
