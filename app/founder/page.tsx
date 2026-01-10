import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Eye, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/founder',
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
            <div className="relative h-[500px] rounded-lg overflow-hidden border-4 border-gray-200">
              <Image
                src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                alt="Elizabeth Greene - Founder & CEO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
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

      {/* Organizations & Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Organizations & Credentials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Elevate for Humanity</h3>
              <p className="text-sm text-gray-600 mb-4">2EXCLUSIVE LLC-S</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>SAM.gov UEI:</strong> VX2GK5S8SZH8</p>
                <p><strong>CAGE Code:</strong> 0QH19</p>
                <p><strong>Status:</strong> Active federal registration</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">RISE Foundation</h3>
              <p className="text-sm text-gray-600 mb-4">SELFISH INC</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>EIN:</strong> 99-3483511</p>
                <p><strong>Status:</strong> 501(c)(3) tax-exempt</p>
                <p><strong>IRS Determination:</strong> July 2024</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Curvature Body Sculpting</h3>
              <p className="text-sm text-gray-600 mb-4">Curvature Body Sculpting LLC</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Certiport CATC:</strong> Authorized Testing Center</p>
                <p><strong>Certifications:</strong> Microsoft Office Specialist, IC3, Adobe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Leadership Principles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ethical Operations
              </h3>
              <p className="text-sm text-gray-600">
                Transparent, honest, and compliant with all regulations
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Results-Driven
              </h3>
              <p className="text-sm text-gray-600">
                85% job placement rate through measurable outcomes
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Full Transparency
              </h3>
              <p className="text-sm text-gray-600">
                Clear communication about costs, requirements, and expectations
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Community Impact
              </h3>
              <p className="text-sm text-gray-600">
                Long-term investment in people and neighborhoods
              </p>
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
