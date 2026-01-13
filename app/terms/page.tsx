import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

/**
 * Redirect /terms to /terms-of-service
 */
export default function TermsRedirect() {
  redirect('/terms-of-service');
}
