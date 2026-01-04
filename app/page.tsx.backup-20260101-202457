import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { currentHomeHero, enableAudioNarration } from '@/config/hero-videos';
import { Briefcase, Users, ArrowRight, Star, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Elevate for Humanity | Free Career Training & Apprenticeships Indiana',
  description:
    'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more. Get trained, get hired, get paid. No cost, no debt.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/images/logo.png',
    description:
      'Free career training and apprenticeships in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Admissions',
      email: 'elevate4humanityedu@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <VideoHeroBanner
        videoSrc={currentHomeHero}
        withAudio={enableAudioNarration}
      />

      {/* Featured Programs */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
              Explore Our Programs
            </h2>
            <p className="text-lg md:text-xl text-black max-w-2xl mx-auto leading-relaxed">
              ETPL-approved career training programs in healthcare, skilled
              trades, business, and beauty services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Healthcare */}
            <Link href="/programs" className="group">
              <div className="rich-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/programs/cna-hero.jpg"
                    alt="Healthcare Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-brand-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black group-hover:text-brand-purple-600 transition-colors mb-3">
                    Healthcare
                  </h3>
                  <p className="text-black mb-4">
                    CNA, Medical Assistant, Phlebotomy, and more
                  </p>
                  <div className="flex items-center gap-2 text-brand-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs" className="group">
              <div className="rich-card overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/programs/hvac-hero.jpg"
                    alt="Skilled Trades Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-brand-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black group-hover:text-brand-purple-600 transition-colors mb-3">
                    Skilled Trades
                  </h3>
                  <p className="text-black mb-4">
                    HVAC, Electrical, Plumbing, Welding, and more
                  </p>
                  <div className="flex items-center gap-2 text-brand-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Business */}
            <Link href="/programs" className="group">
              <div className="rich-card overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/pathways/business-hero.jpg"
                    alt="Business Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-brand-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black group-hover:text-brand-purple-600 transition-colors mb-3">
                    Business & Finance
                  </h3>
                  <p className="text-black mb-4">
                    Accounting, Office Administration, Customer Service
                  </p>
                  <div className="flex items-center gap-2 text-brand-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 100% Free Training - How We Fund It */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
              100% Free Training
            </h2>
            <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto">
              No tuition. No fees. No student debt. Your training is fully
              funded through federal and state workforce programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-3">WIOA</h3>
              <p className="text-black text-base leading-relaxed">
                Workforce Innovation and Opportunity Act - Federal funding for
                career training and job placement services
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-3">WRG</h3>
              <p className="text-black text-sm leading-relaxed">
                Workforce Ready Grant - Indiana state funding for short-term
                credential programs in high-demand fields
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-3">
                DOL Apprenticeships
              </h3>
              <p className="text-black text-sm leading-relaxed">
                U.S. Department of Labor Registered Apprenticeships - Earn while
                you learn with paid on-the-job training
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold text-black mb-3">JRI</h3>
              <p className="text-black text-sm leading-relaxed">
                Justice Reinvestment Initiative - Specialized programs for
                justice-involved individuals reentering the workforce
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Models */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
              Flexible Training Options
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Choose the learning format that fits your life and career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-brand-purple-100">
              <div className="w-16 h-16 bg-brand-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Hybrid Training
              </h3>
              <p className="text-black mb-4">
                Combine online learning with hands-on labs and in-person
                instruction. Study at your own pace while getting real-world
                practice.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple-600 mt-1">✓</span>
                  <span>Online coursework you can do anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple-600 mt-1">✓</span>
                  <span>Scheduled hands-on labs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple-600 mt-1">✓</span>
                  <span>In-person skills assessments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-brand-orange-100">
              <div className="w-16 h-16 bg-brand-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                DOL Apprenticeships
              </h3>
              <p className="text-black mb-4">
                Earn while you learn. Work in a real business from day one, get
                paid, and graduate with both certification and work experience.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange-600 mt-1">✓</span>
                  <span>Get paid while training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange-600 mt-1">✓</span>
                  <span>Work in real businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange-600 mt-1">✓</span>
                  <span>Graduate with experience + certification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-green-100">
              <div className="w-16 h-16 bg-brand-green-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Accelerated Programs
              </h3>
              <p className="text-black mb-4">
                Fast-track programs get you certified and job-ready in weeks,
                not years. Perfect for those who need to start earning quickly.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-start gap-2">
                  <span className="text-brand-green-600 mt-1">✓</span>
                  <span>4-12 week programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green-600 mt-1">✓</span>
                  <span>Industry-recognized credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green-600 mt-1">✓</span>
                  <span>Job placement assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Indianapolis Location */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                Training Center in Indianapolis
              </h2>
              <p className="text-xl text-black mb-6">
                Our state-of-the-art training facility is located in
                Indianapolis, Indiana, serving Marion County and surrounding
                areas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Hands-On Labs</h3>
                    <p className="text-black text-sm">
                      Fully equipped training labs for healthcare, HVAC, and
                      skilled trades
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-brand-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">
                      Career Services
                    </h3>
                    <p className="text-black text-sm">
                      Resume help, interview prep, and job placement support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-brand-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">
                      Wraparound Support
                    </h3>
                    <p className="text-black text-sm">
                      Case management, transportation assistance, and barrier
                      removal services
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
              <h3 className="text-2xl md:text-3xl font-black text-black mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-base md:text-lg text-black mb-8 leading-relaxed">
                Apply today and we'll help you navigate the funding process.
                Most students qualify for 100% free training.
              </p>
              <Link
                href="/apply"
                className="block w-full bg-brand-orange-600 hover:bg-brand-orange-700 text-white text-center px-8 py-5 rounded-xl text-lg md:text-xl font-bold transition-colors shadow-lg hover:shadow-xl"
              >
                Apply Now - It's Free
              </Link>
              <p className="text-sm md:text-base text-black text-center mt-6 font-medium">
                Questions? Call us at (317) 314-3757
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-bold text-black mb-6 leading-relaxed text-center">
              "This program changed my life. I went from unemployed to earning
              $45,000 a year as a CNA in just 6 weeks. The training was free and
              the support was incredible."
            </blockquote>
            <p className="text-base md:text-lg text-black text-center font-semibold">
              — Sarah Johnson, CNA Graduate
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 md:mb-6">
              More Than Just Training
            </h2>
            <p className="text-base md:text-lg text-black max-w-3xl mx-auto">
              We provide comprehensive support services to ensure your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Career Services */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                Career Services
              </h3>
              <p className="text-sm md:text-base text-black mb-6">
                Resume building, interview coaching, job placement assistance,
                and ongoing career support
              </p>
              <Link
                href="/career-services"
                className="text-brand-blue-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Support Bundle */}
            <div className="bg-white rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-brand-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                Support Bundle
              </h3>
              <p className="text-sm md:text-base text-black mb-6">
                Transportation, childcare, and barrier removal
              </p>
              <Link
                href="/support"
                className="text-brand-purple-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-blue-700 to-brand-purple-700">
        <div className="mx-auto w-full max-w-4xl text-center px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white mb-8 md:mb-10 max-w-2xl mx-auto">
            Join 5,000+ students who chose free career training with Elevate for
            Humanity
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-brand-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl text-lg md:text-xl font-black shadow-2xl hover:scale-105 transition-all"
          >
            <span>Apply Now - 100% Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-white mt-6 text-sm md:text-base">
            Takes 5 minutes • No commitment required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-gray-900 text-center">
        <p className="text-sm text-gray-300">
          © 2025 Elevate for Humanity. All rights reserved.
        </p>
      </footer>
    </>
  );
}
