import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Young Adult Wellness | Selfish Inc.',
  description: 'Wellness programs specifically designed for young adults',
};

export default function YoungAdultWellnessPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/nonprofit" className="text-purple-600 hover:text-purple-700 mb-8 inline-block">
          ← Back to Selfish Inc.
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Young Adult Wellness</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Wellness programs designed specifically for young adults navigating life transitions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Programs Include</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
            <li>Life skills workshops</li>
            <li>Mental health support</li>
            <li>Career guidance</li>
            <li>Peer support groups</li>
            <li>Wellness coaching</li>
          </ul>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
            <Link href="/nonprofit/workshops" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              View Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
