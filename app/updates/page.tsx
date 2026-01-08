import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Updates & Announcements',
  description: 'Latest news, program updates, and announcements from Elevate for Humanity',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/updates',
  },
};

export default function UpdatesIndex() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Updates & Announcements</h1>
      <p className="text-gray-700 mb-8">
        Stay informed about program launches, funding opportunities, and workforce development news.
      </p>
      <ul className="space-y-4">
        <li className="border-l-4 border-orange-600 pl-4 py-2">
          <time className="text-sm text-gray-600">January 2026</time>
          <Link 
            href="/updates/2026/01/program-calendar" 
            className="block text-lg font-semibold text-orange-600 hover:text-orange-700 underline"
          >
            2026 Program Calendar & Funding Pathways
          </Link>
          <p className="text-gray-700 mt-1">
            Upcoming cohorts for healthcare, skilled trades, and technology training programs.
          </p>
        </li>
      </ul>
    </main>
  );
}
