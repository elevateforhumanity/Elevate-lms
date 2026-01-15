import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Elevate for Humanity | Workforce Training School | Indianapolis',
  description:
    'Elevate for Humanity coordinates career training through credentialed partners. Founded by Elizabeth Greene in 2020. 85% job placement rate. 1,000+ students trained.',
  keywords: 'workforce training school Indianapolis, career training programs, WIOA training provider, job training Indianapolis, vocational school Indiana, Elizabeth Greene',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about',
  },
  openGraph: {
    title: 'About Elevate for Humanity',
    description: 'Workforce training school in Indianapolis. 85% job placement rate. 1,000+ students trained.',
    url: 'https://www.elevateforhumanity.org/about',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'About Elevate for Humanity' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Elevate for Humanity',
    description: 'Workforce training school in Indianapolis. 85% job placement rate.',
    images: ['/og-default.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <Image
            src="/og-default.jpg"
            alt="About Elevate for Humanity"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-full">
              Founded 2020
            </span>
            <span className="px-3 py-2 bg-brand-blue-600 text-white text-sm font-medium rounded-full">
              1,000+ Students Trained
            </span>
            <span className="px-3 py-2 bg-brand-orange-600 text-white text-sm font-medium rounded-full">
              85% Job Placement
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl text-black">
            We coordinate access to career training, funding, and employment
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-black leading-relaxed">
            Elevate for Humanity is a workforce coordination hub that connects individuals to training programs delivered by credentialed partner institutions. We help students access WIOA, WRG, JRI, and apprenticeship funding, then support them through training to employment.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              View Our Programs
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-black hover:bg-gray-50 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-blue-200 text-center">
              <Image src="/images/icons/trending-up.png" alt="Job Placement" width={48} height={48} className="mx-auto mb-3" loading="lazy" />
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-sm text-black font-medium">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-green-200 text-center">
              <Image src="/images/icons/users.png" alt="Students" width={48} height={48} className="mx-auto mb-3" loading="lazy" />
              <div className="text-4xl font-bold text-green-600 mb-2">1,000+</div>
              <div className="text-sm text-black font-medium">Students Trained</div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center">
              <Image src="/images/icons/check-circle.png" alt="Programs" width={48} height={48} className="mx-auto mb-3" loading="lazy" />
              <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-sm text-black font-medium">Career Programs</div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-orange-200 text-center">
              <Image src="/images/icons/clock.png" alt="Since 2020" width={48} height={48} className="mx-auto mb-3" loading="lazy" />
              <div className="text-4xl font-bold text-orange-600 mb-2">2020</div>
              <div className="text-sm text-black font-medium">Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">What We Do</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <Image src="/images/icons/book.png" alt="Training Coordination" width={64} height={64} className="mb-4" loading="lazy" />
              <h3 className="text-xl font-bold text-black mb-3">Training Coordination</h3>
              <p className="text-black">
                We coordinate career training programs delivered by credentialed partner institutions including licensed schools, state-approved providers, and DOL-registered apprenticeship sponsors.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <Image src="/images/icons/dollar.png" alt="Funding Access" width={64} height={64} className="mb-4" loading="lazy" />
              <h3 className="text-xl font-bold text-black mb-3">Funding Access</h3>
              <p className="text-black">
                We help students access WIOA, WRG, JRI, and apprenticeship funding. Some programs are free with funding, others require self-pay. Your advisor explains all costs upfront.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <Image src="/images/icons/trending-up.png" alt="Career Support" width={64} height={64} className="mb-4" loading="lazy" />
              <h3 className="text-xl font-bold text-black mb-3">Career Support</h3>
              <p className="text-black">
                We provide job search support, employer connections, and career coaching. Certifications come from state boards, industry bodies, and accredited institutions—not from us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Leadership</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden border-4 border-gray-200">
              <Image
                src="/images/team/elizabeth-greene.jpg"
                alt="Elizabeth Greene - Founder & CEO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-black mb-2">Elizabeth Greene</h3>
              <p className="text-xl text-orange-600 font-semibold mb-6">Founder & CEO</p>
              
              <p className="text-black mb-4 leading-relaxed">
                Elizabeth founded <strong>2EXCLUSIVE LLC-S</strong> (operating as Elevate for Humanity) to address disconnected workforce systems that prevent motivated individuals from accessing training, funding, and employment pathways.
              </p>

              <p className="text-black mb-4 leading-relaxed">
                Under her leadership, Elevate for Humanity has grown into a workforce coordination hub serving 1,000+ individuals across Indiana with an 85% job placement rate.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                <p className="text-black font-semibold italic">
                  "Elevate for Humanity exists to ensure opportunity is not theoretical — it's accessible, supported, and measurable."
                </p>
                <p className="text-sm text-black mt-2">— Elizabeth Greene</p>
              </div>

              <Link
                href="/founder"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Read Full Bio <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Our Organizations</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-4">Elevate for Humanity</h3>
              <p className="text-sm text-black mb-4">2EXCLUSIVE LLC-S</p>
              <p className="text-black mb-4">
                Workforce coordination hub connecting individuals to training, funding, and employment pathways.
              </p>
              <div className="space-y-2 text-sm text-black">
                <p><strong>SAM.gov UEI:</strong> VX2GK5S8SZH8</p>
                <p><strong>CAGE Code:</strong> 0QH19</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-4">RISE Foundation</h3>
              <p className="text-sm text-black mb-4">SELFISH INC</p>
              <p className="text-black mb-4">
                501(c)(3) tax-exempt nonprofit providing philanthropic support for workforce development initiatives.
              </p>
              <div className="space-y-2 text-sm text-black">
                <p><strong>EIN:</strong> 99-3483511</p>
                <p><strong>IRS Determination:</strong> July 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
          <p className="text-lg text-black leading-relaxed">
            We connect individuals to career training, remove barriers to success, and create pathways to sustainable employment. 
            Through partnerships with workforce boards, training providers, and employers, we're building a more inclusive economy where everyone has access to opportunity.
          </p>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">How We're Different</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/icons/check-circle.png" alt="What We Are" width={48} height={48} loading="lazy" />
                <h3 className="text-xl font-bold text-black">What We Are</h3>
              </div>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Workforce coordination hub</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Advisor-led enrollment process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Partner with credentialed institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Help access government funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Transparent about costs and requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">✗</span>
                <h3 className="text-xl font-bold text-black">What We're Not</h3>
              </div>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Not a school (we coordinate with schools)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Not a certifier (credentials come from state boards)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Not instant enrollment (advisor review required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Not all programs are free (some require self-pay)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Not a guarantee of employment (we support job search)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Links */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Learn More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/founder" className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/team/elizabeth-greene.jpg"
                  alt="Our Founder"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                  Our Founder
                </h3>
                <p className="text-black mb-4">Meet Elizabeth Greene and learn about her vision for workforce development</p>
                <span className="text-blue-600 font-semibold">Read More →</span>
              </div>
            </Link>

            <Link href="/how-it-works" className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/efh/hero/hero-support.jpg"
                  alt="How It Works"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                  How It Works
                </h3>
                <p className="text-black mb-4">Understand our process from application to employment</p>
                <span className="text-blue-600 font-semibold">Learn More →</span>
              </div>
            </Link>

            <Link href="/success-stories" className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/stories/success-banner.jpg"
                  alt="Success Stories"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                  Success Stories
                </h3>
                <p className="text-black mb-4">Read real stories from graduates who transformed their careers</p>
                <span className="text-blue-600 font-semibold">Read Stories →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Talk to an advisor about your career goals and funding options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-900 transition-colors border-2 border-white"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
