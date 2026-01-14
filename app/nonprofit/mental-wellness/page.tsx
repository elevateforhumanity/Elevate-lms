import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mental Wellness | Selfish Inc.',
  description: 'Mental wellness programs and support services',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/nonprofit/mental-wellness',
  },
};

export default function MentalWellnessPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/nonprofit" className="text-purple-600 hover:text-purple-700 mb-8 inline-block">
          ← Back to Selfish Inc.
        </Link>

        <h1 className="text-4xl font-bold text-black mb-6">Mental Wellness</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-black mb-8">
            Holistic mental wellness programs for mind, body, and spirit.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Programs</h2>
          <ul className="list-disc pl-6 text-black space-y-2 mb-8">
            <li>Mindfulness and meditation</li>
            <li>Stress management workshops</li>
            <li>Mental health counseling</li>
            <li>Wellness coaching</li>
          </ul>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
            <Link href="/nonprofit/workshops" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              View Workshops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
