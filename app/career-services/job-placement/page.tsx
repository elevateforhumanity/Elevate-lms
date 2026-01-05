import Link from 'next/link';
import { Metadata } from 'next';
import { Briefcase, Building2, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Placement Services | Elevate for Humanity',
  description: 'Direct connections to employers actively hiring our graduates.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/career-services/job-placement',
  },
};

export default function JobPlacementPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-orange-600 to-brand-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Job Placement Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We connect you directly with employers who are actively hiring.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-brand-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">
              Direct Employer Connections
            </h3>
            <p className="text-gray-700">
              Access to our network of hiring partners
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-brand-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Job Matching</h3>
            <p className="text-gray-700">
              We match your skills to the right opportunities
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-brand-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Career Growth</h3>
            <p className="text-gray-700">
              Support for advancement and promotions
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Complete Your Training
                </h3>
                <p className="text-gray-700">
                  Finish your program and earn your certification
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Meet with Career Coach
                </h3>
                <p className="text-gray-700">
                  Review your goals and preferences
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Get Matched
                </h3>
                <p className="text-gray-700">
                  We connect you with hiring employers
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Start Your Career
                </h3>
                <p className="text-gray-700">
                  Begin working with ongoing support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">
            Ready to Start Your Career?
          </h2>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white text-brand-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
