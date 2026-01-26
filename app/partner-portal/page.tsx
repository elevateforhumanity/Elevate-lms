import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

import Link from 'next/link';
import Image from 'next/image';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/partner-portal',
  },
  title: 'Partner Portal | Elevate For Humanity',
  description:
    'Access your partner dashboard to track referrals, manage apprentices, and collaborate with Elevate for Humanity.',
};

export default async function PartnerPortalPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  
  // Fetch partner portal info
  const { data: portalInfo } = await supabase
    .from('portal_features')
    .select('*')
    .eq('portal', 'partner');
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Avatar Guide */}
      <AvatarVideoOverlay 
        videoSrc="/videos/hero-employers-avatar.mp4"
        avatarName="Partner Guide"
        position="bottom-right"
        autoPlay={true}
        showOnLoad={true}
      />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-6.jpg"
          alt="Partner Portal"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Partner Portal
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100">
            Track referrals, manage apprentices, and access resources
            to grow your partnership with Elevate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Partner Portal
                </h2>
                <p className="text-black mb-6">
                  Your central hub for tracking apprentice progress, 
                  submitting hours, and accessing partnership resources.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>100% free training programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Industry-standard certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Career support and job placement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/artlist/hero-training-4.jpg"
                  alt="Partner Portal"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                <div className="relative h-32">
                  <Image src="/images/programs-hq/training-classroom.jpg" alt="Learn" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Learn</h3>
                  <p className="text-black">
                    Access quality training programs
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                <div className="relative h-32">
                  <Image src="/images/programs-hq/career-success.jpg" alt="Certify" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Certify</h3>
                  <p className="text-black">Earn industry certifications</p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                <div className="relative h-32">
                  <Image src="/images/team-hq/team-meeting.jpg" alt="Work" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Work</h3>
                  <p className="text-black">Get hired in your field</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
