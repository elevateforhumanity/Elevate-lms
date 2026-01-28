import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Users, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Free Tax Preparation | Elevate For Humanity',
  description: 'Free tax preparation services through the Volunteer Income Tax Assistance (VITA) program.',
};

export default function VITAPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl font-bold">VITA Free Tax Preparation</h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-8">
            The Volunteer Income Tax Assistance (VITA) program offers free tax help to people who generally make $60,000 or less, persons with disabilities, and limited English-speaking taxpayers.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Who Qualifies</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Income under $60,000</li>
                <li>• Persons with disabilities</li>
                <li>• Limited English speakers</li>
                <li>• Elderly taxpayers</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <Calendar className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Tax Season</h3>
              <p className="text-sm text-gray-600">Services available January through April during tax filing season.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/vita/locations"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Find a Location
            </Link>
            <Link
              href="/vita/faq"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
