import Link from 'next/link';
import { Metadata } from 'next';
import { Heart, DollarSign, FileText, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Tax Prep - Free Tax Preparation | Elevate for Humanity',
  description: 'Free IRS-certified tax preparation for qualifying individuals through the Volunteer Income Tax Assistance program',
};

export default function VITAPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[500px] w-full overflow-hidden">
        <img
          src="https://static.vecteezy.com/system/resources/previews/032/006/156/non_2x/business-people-shaking-hands-together-free-photo.jpg"
          alt="VITA Tax Preparation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              VITA Tax Preparation
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Free IRS-certified tax preparation for qualifying individuals
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Check Eligibility
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What is VITA?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Heart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Free Tax Help</h3>
              <p className="text-gray-700">
                The Volunteer Income Tax Assistance (VITA) program offers free tax help to people who generally make $64,000 or less, persons with disabilities, and limited English-speaking taxpayers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">IRS Certified</h3>
              <p className="text-gray-700">
                All VITA volunteers are IRS-certified and trained to help you prepare your taxes accurately and get the maximum refund you deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Who Qualifies?</h2>
          <div className="bg-blue-50 p-8 rounded-lg">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Individuals and families earning $64,000 or less per year</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Persons with disabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Limited English-speaking taxpayers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span>Seniors needing assistance with tax preparation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Schedule your free tax preparation appointment today
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Schedule Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
