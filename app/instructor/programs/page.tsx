import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Programs | Elevate for Humanity',
  description: 'Manage your teaching programs',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/instructor/programs',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-black mb-4">My Programs</h1>
        <p className="text-lg text-black mb-8">
          Manage your teaching programs
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
