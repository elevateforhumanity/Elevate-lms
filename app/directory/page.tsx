import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Building2, Globe, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/directory',
  },
  title: 'Partner Directory | Elevate For Humanity',
  description:
    'Resources and tools for your success.',
};

interface Partner {
  id: string;
  name: string;
  partner_type: string;
  description: string | null;
  website_url: string | null;
  featured: boolean;
  display_order: number;
}

export default async function DirectoryPage() {
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

  const { data: partners, error } = await supabase
    .from('partners')
    .select('id, name, partner_type, description, website_url, featured, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error || !partners || partners.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Partner Directory</h1>
          <p className="text-gray-600 mb-6">Our partner directory is being updated.</p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact us about partnerships
          </Link>
        </div>
      </div>
    );
  }

  const partnerTypes = [...new Set(partners.map((p: Partner) => p.partner_type))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-8.jpg"
          alt="Directory"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Directory
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Access your dashboard and
            development.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700">{partners.length}</div>
              <div className="text-gray-600">Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">{partnerTypes.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">Indiana</div>
              <div className="text-gray-600">Service Area</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">Growing</div>
              <div className="text-gray-600">Network</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Partner Types */}
        {partnerTypes.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {partnerTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner: Partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                  {partner.partner_type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {partner.name}
              </h3>
              
              {partner.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {partner.description}
                </p>
              )}
              
              {partner.website_url && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 truncate"
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {partner.featured && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    Featured Partner
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Join our network of employers and organizations committed to workforce 
            development. Partner with us to access trained, certified candidates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/employers"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              For Employers
            </Link>
            <Link
              href="/contact?type=partner"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
            >
              Contact Us
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
                  Directory
                </h2>
                <p className="text-black mb-6">
                  Your hub for training and career growth.
                  and development.
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
                  src="/images/artlist/hero-training-5.jpg"
                  alt="Directory"
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
