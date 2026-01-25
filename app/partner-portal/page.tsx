import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Handshake,
  Users,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  Building2,
  Target,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/partner-portal',
  },
  title: 'Partner Portal | Elevate For Humanity',
  description:
    'Access your partner dashboard to track referrals, manage apprentices, and collaborate with Elevate for Humanity.',
};

const features = [
  {
    icon: Users,
    title: 'Referral Management',
    description: 'Track referrals, monitor enrollment status, and see outcomes for individuals you refer to our programs.',
  },
  {
    icon: BarChart3,
    title: 'Impact Reports',
    description: 'Access detailed reports on program outcomes, completion rates, and employment success for your referrals.',
  },
  {
    icon: FileText,
    title: 'Resource Library',
    description: 'Download marketing materials, program guides, and partnership documentation.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Connect with program coordinators and get updates on partnership initiatives.',
  },
  {
    icon: Target,
    title: 'Program Matching',
    description: 'Find the right programs for your clients based on their goals and eligibility.',
  },
  {
    icon: TrendingUp,
    title: 'Partnership Analytics',
    description: 'View partnership metrics, engagement data, and collaboration opportunities.',
  },
];

const partnerTypes = [
  {
    title: 'Community Organizations',
    description: 'Nonprofits, faith-based organizations, and community groups serving individuals seeking career development.',
  },
  {
    title: 'Government Agencies',
    description: 'Workforce development boards, reentry programs, and social services agencies.',
  },
  {
    title: 'Educational Institutions',
    description: 'Schools, colleges, and training providers looking to expand career pathways for students.',
  },
  {
    title: 'Healthcare Partners',
    description: 'Hospitals, clinics, and healthcare systems seeking trained workforce candidates.',
  },
];

export default function PartnerPortalPage() {
  return (
    <div className="min-h-screen bg-white">
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
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Partnership Benefits
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Join our network of partners making a difference in workforce development.
              </p>
              <ul className="space-y-4">
                {[
                  'Track referral outcomes and employment success',
                  'Access co-branded marketing materials',
                  'Receive priority program placement for referrals',
                  'Participate in partner events and training',
                  'Contribute to community impact reporting',
                  'Connect with other partner organizations',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/programs/cpr-group-training-hd.jpg"
                alt="Partner collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Access Your Portal?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Sign in to manage referrals, view reports, and collaborate with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?redirect=/partner-portal/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 px-10 py-5 rounded-xl text-lg font-bold hover:bg-purple-50 transition"
            >
              Sign In to Portal
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-purple-500 transition border-2 border-purple-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
