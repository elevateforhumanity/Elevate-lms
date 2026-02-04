import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Licenses | Elevate for Humanity',
  description: 'Purchase software licenses for the Elevate LMS platform. Enterprise, education, and nonprofit licensing options available.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/licenses' },
};

// Redirect /licenses to canonical /store/licenses
// Primary redirect handled by Netlify edge, this catches local dev
export default function LicensesRedirect() {
  redirect('/store/licenses');
}
