import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, GraduationCap, DollarSign, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/philanthropy',
  },
  title: 'Support Our Mission | Elevate For Humanity',
  description:
    'Resources and tools for your success.',
};

const impactStats = [
  { value: '500+', label: 'Lives Transformed' },
  { value: '85%', label: 'Job Placement Rate' },
  { value: '100%', label: 'Free for Eligible Students' },
  { value: '$0', label: 'Cost to Qualifying Students' },
];

const givingOptions = [
  {
    title: 'Sponsor a Student',
    amount: '$2,500',
    description: 'Cover the full cost of training and certification for one student.',
    impact: 'Provides complete career training, certification fees, and job placement support.',
  },
  {
    title: 'Equipment Fund',
    amount: '$500',
    description: 'Help purchase professional tools and equipment for training programs.',
    impact: 'Equips students with industry-standard tools they need to succeed.',
  },
  {
    title: 'Scholarship Fund',
    amount: '$1,000',
    description: 'Support students who need additional assistance with training costs.',
    impact: 'Removes financial barriers for students pursuing career training.',
  },
  {
    title: 'General Support',
    amount: 'Any Amount',
    description: 'Flexible funding to support our greatest needs.',
    impact: 'Helps expand programs, improve facilities, and serve more students.',
  },
];

const partnershipTypes = [
  {
    title: 'Corporate Partnerships',
    description: 'Partner with us to develop talent pipelines and support workforce development in your industry.',
    benefits: ['Tax-deductible contributions', 'Brand visibility', 'Access to trained candidates', 'Community impact'],
  },
  {
    title: 'Foundation Grants',
    description: 'We welcome grant funding to expand our programs and reach more underserved communities.',
    benefits: ['Measurable outcomes', 'Transparent reporting', 'Aligned missions', 'Scalable impact'],
  },
  {
    title: 'In-Kind Donations',
    description: 'Donate equipment, supplies, or professional services to support our training programs.',
    benefits: ['Direct program support', 'Tax benefits', 'Inventory management', 'Community connection'],
  },
];

export default function PhilanthropyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/success-new/success-8.jpg"
          alt="Supporting career development"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Support Our Mission
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Invest in Futures
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your support provides free career training, industry certifications, and 
              job placement for individuals seeking pathways out of poverty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                Make a Gift
              </Link>
              <Link
                href="#partnerships"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Philanthropy
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Your hub for training and career growth.
            and development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=donate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-800 text-white font-semibold rounded-lg hover:bg-rose-900 transition-colors"
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
                  Philanthropy
                </h2>
                <p className="text-black mb-6">
                  Your hub for training and career growth.
                  workforce training and career success.
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
                    <span>Industry-recognized training credentials</span>
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
                  src="/images/artlist/hero-training-5.jpg"
                  alt="Philanthropy"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Learn</h3>
                <p className="text-black">
                  Access quality training programs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Certify</h3>
                <p className="text-black">Earn industry certifications</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Work</h3>
                <p className="text-black">Get hired in your field</p>
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
