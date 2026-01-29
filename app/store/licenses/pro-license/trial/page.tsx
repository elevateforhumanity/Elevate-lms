import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pro License Trial | Elevate For Humanity',
  description: 'Start your free trial of the Pro License.',
};

export default function ProLicenseTrialPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Store", href: "/store" }, { label: "Trial" }]} />
      </div>
<div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-4">Pro License Trial</h1>
          <p className="text-gray-600 mb-8">
            Experience the full power of our Pro License with a 14-day free trial.
            No credit card required.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What's Included:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Full access to all Pro features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Unlimited courses and students
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Advanced analytics and reporting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Priority support
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/apply"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link
              href="/store/licenses/pro-license"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
