import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Level Agreement (SLA) | Elevate for Humanity',
  description: 'Platform availability targets, maintenance windows, and incident notification procedures.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/policies/sla',
  },
};

export default function SLAPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">Service Level Agreement (SLA)</h1>
            <p className="text-sm text-gray-600">Effective Date: January 24, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-black mt-0 mb-4">Platform Availability Target</h2>
              <p className="text-3xl font-bold text-blue-700 mb-2">99.5% Monthly Uptime</p>
              <p className="text-gray-700 mb-0">
                We target 99.5% availability for the Elevate for Humanity platform each calendar month.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Scheduled Maintenance</h2>
            <p className="text-black mb-6">
              Scheduled maintenance windows are communicated in advance when possible. We aim to perform 
              maintenance during low-usage periods to minimize impact on users.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Monitoring</h2>
            <p className="text-black mb-6">
              Automated error tracking and performance monitoring are enabled across the platform. 
              Our systems continuously monitor for issues and alert our team when problems are detected.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Incident Notification</h2>
            <p className="text-black mb-6">
              During incidents affecting platform availability, status updates are posted to our{' '}
              <Link href="/status" className="text-blue-600 hover:underline">status page</Link>.
              Users can check this page at any time for current system status.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Exclusions</h2>
            <p className="text-black mb-4">
              The availability target excludes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li>Scheduled maintenance windows</li>
              <li>Events outside our reasonable control (force majeure)</li>
              <li>Issues caused by third-party services or infrastructure</li>
              <li>User-side connectivity or device issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Service Credits</h2>
            <p className="text-black mb-4">
              If monthly platform availability falls below the uptime targets stated above, 
              customers may be eligible for a service credit applied to a future billing cycle.
            </p>
            
            <p className="text-black mb-4">Credits are calculated as follows:</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-black border-b">Monthly Availability</th>
                    <th className="px-4 py-3 text-left font-bold text-black border-b">Service Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border-b text-black">Below 99.5%</td>
                    <td className="px-4 py-3 border-b text-black">5% service credit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b text-black">Below 99.0%</td>
                    <td className="px-4 py-3 border-b text-black">10% service credit (maximum)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-black mt-6 mb-3">Credit Terms</h3>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li>Credits apply only to future invoices</li>
              <li>Credits are non-cumulative and capped at 10% per billing cycle</li>
              <li>Credits must be requested within 30 days of the affected period</li>
              <li>Credits do not apply to one-time fees or third-party services</li>
            </ul>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-black mb-2">Important Notice</h3>
              <p className="text-gray-700 mb-0">
                This SLA does not provide refunds or cash compensation. Service credits are the 
                sole remedy for availability issues. This SLA excludes events outside reasonable 
                control including but not limited to natural disasters, third-party service failures, 
                and scheduled maintenance windows.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Related Policies</h2>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li><Link href="/status" className="text-blue-600 hover:underline">Platform Status</Link></li>
              <li><Link href="/policies/incident-response" className="text-blue-600 hover:underline">Incident Response Policy</Link></li>
              <li><Link href="/policies/disaster-recovery" className="text-blue-600 hover:underline">Disaster Recovery Plan</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:underline">Contact Support</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
