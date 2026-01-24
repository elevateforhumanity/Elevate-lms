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
    'Access partnership resources, track referrals, collaborate on programs, and view impact reports. Your dedicated partner dashboard.',
  keywords: [
    'partner portal',
    'partnership dashboard',
    'referral tracking',
    'program collaboration',
    'impact reports',
  ],
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
      <section className="relative bg-gradient-to-br from-purple-700 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Handshake className="w-5 h-5" />
              <span className="text-sm font-semibold">Partner Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Partner Portal
              <br />
              <span className="text-purple-300">Collaborate & Impact</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Access your partnership dashboard to track referrals, view impact reports,
              and collaborate on workforce development programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login?redirect=/partner-portal/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition shadow-xl"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-500 transition border-2 border-purple-400"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Portal Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your partnership and track the impact of your referrals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white border-2 border-slate-100 rounded-xl p-6 hover:border-purple-200 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Who We Partner With
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We collaborate with organizations committed to workforce development and community impact.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-xl p-6 border border-slate-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{type.title}</h3>
                  <p className="text-slate-600 text-sm">{type.description}</p>
                </div>
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
