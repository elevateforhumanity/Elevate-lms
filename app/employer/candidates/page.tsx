import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Candidates | Elevate for Humanity',
  description: 'View and manage candidates',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/employer/candidates',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Candidates</h1>
        <p className="text-lg text-slate-600 mb-8">
          View and manage candidates
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
