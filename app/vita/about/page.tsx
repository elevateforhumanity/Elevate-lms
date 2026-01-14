import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vita About | Elevate For Humanity',
  description: 'Elevate For Humanity - Vita About page',
  alternates: { canonical: 'https://www.elevateforhumanity.org/vita/about' },
};

import { Heart, Users, Award, TrendingUp } from 'lucide-react';

export default function VITAAboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative bg-green-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/vita/vita-hero.jpg" 
            alt="VITA Tax Preparation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About VITA</h1>
          <p className="text-xl md:text-2xl">Volunteer Income Tax Assistance Program</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">What is VITA?</h2>
          <p className="text-black text-lg mb-4">
            The Volunteer Income Tax Assistance (VITA) program offers free tax help to people who generally make $64,000 or less, persons with disabilities, the elderly, and limited English-speaking taxpayers who need assistance in preparing their own tax returns.
          </p>
          <p className="text-black text-lg">
            IRS-certified volunteers provide free basic income tax return preparation with electronic filing to qualified individuals. VITA has been helping taxpayers since 1971.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">2,045</div>
            <div className="text-black">Returns Filed (2025)</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">$5.8M</div>
            <div className="text-black">Refunds Processed</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">$408K</div>
            <div className="text-black">Saved in Fees</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-black mb-2">100%</div>
            <div className="text-black">Free Service</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-black text-lg mb-4">
            To provide free, high-quality tax preparation services to low-income individuals and families, ensuring they receive every credit and deduction they deserve.
          </p>
          <p className="text-black text-lg">
            We believe everyone deserves access to professional tax assistance, regardless of their ability to pay. Through VITA, we help families keep more of their hard-earned money and build financial stability.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6">How VITA Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Schedule Appointment</h3>
                <p className="text-black">Book a free appointment at a VITA site near you</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Bring Documents</h3>
                <p className="text-black">Bring your ID, Social Security cards, and income documents</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Meet with Volunteer</h3>
                <p className="text-black">IRS-certified volunteer prepares your return</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">E-File & Get Refund</h3>
                <p className="text-black">We e-file your return and you get your refund in 7-14 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-black mb-6">
            Schedule your free tax preparation appointment today
          </p>
          <a
            href="/vita/schedule"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Book Free Appointment
          </a>
        </div>
      </div>
    </div>
  );
}
