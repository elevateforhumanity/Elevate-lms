import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Eye, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/founder',
  },
  title: 'Founder & Leadership | Elevate For Humanity',
  description:
    'Founded with purpose. Built for impact. Learn about the leadership behind Elevate for Humanity.',
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Founder & Leadership"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Founded with purpose. Built for impact.
          </h1>
        </div>
      </section>

      {/* Founder Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Founder Photo */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                alt="Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Founder Statement */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Elizabeth Greene
              </h2>
              <p className="text-xl text-brand-orange-600 font-semibold mb-6">
                Founder & CEO
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Elizabeth Greene is the founder of{' '}
                <strong>2EXCLUSIVE LLC-S</strong>, operating as{' '}
                <strong>Elevate for Humanity</strong>. She established the
                organization to address disconnected workforce systems that
                prevent motivated individuals from accessing training, funding,
                and employment pathways.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Under her leadership, Elevate for Humanity has grown into a
                comprehensive workforce development ecosystem serving thousands
                of individuals across Indiana. The organization operates with
                active SAM.gov registration (UEI: VX2GK5S8SZH8, CAGE Code:
                0QH19), positioning it for federal contracts and grants.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Elizabeth also founded <strong>SELFISH INC</strong> (operating
                as <strong>RISE Foundation</strong>), a 501(c)(3) tax-exempt
                nonprofit organization (EIN: 99-3483511) that provides
                philanthropic support for workforce development initiatives. The
                foundation received its IRS determination letter in July 2024.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Additionally, she leads{' '}
                <strong>Curvature Body Sculpting LLC</strong>, which operates as
                a Certiport Authorized Testing Center (CATC), offering
                industry-recognized certification exams including Microsoft
                Office Specialist, IC3 Digital Literacy, and Adobe Certified
                Professional credentials.
              </p>

              <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 my-8">
                <p className="text-lg font-semibold text-gray-900">
                  "Elevate for Humanity exists to ensure opportunity is not
                  theoretical — it's accessible, supported, and measurable."
                </p>
                <p className="text-sm text-gray-600 mt-2">— Elizabeth Greene</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Leadership Focus
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Workforce development program design and delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Government contracting and compliance management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Strategic partnerships with employers and training providers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Community-centered systems design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Commitment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Leadership Commitment
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-brand-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ethical operations
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Compliance with workforce and funding standards
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Transparency with partners and participants
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-brand-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Long-term community investment
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn How Elevate Works
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Discover our approach to workforce development and community impact.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            About Elevate
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
