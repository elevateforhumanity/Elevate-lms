import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { currentHomeHero, enableAudioNarration } from '@/config/hero-videos';

// Force dynamic rendering to prevent stale cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Free, Funded Workforce Training',
  description:
    'Career training programs aligned with WIOA, WRG, DOL, and employer-led apprenticeships, delivered through a compliant, scalable platform.',
  alternates: {
    canonical: 'https://elevateforhumanity.org',
  },
  openGraph: {
    title: 'Elevate for Humanity | Free, Funded Workforce Training',
    description:
      'Career training programs aligned with WIOA, WRG, DOL, and employer-led apprenticeships, delivered through a compliant, scalable platform.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    images: [
      {
        url: '/images/homepage/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Free Funded Workforce Training',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://elevateforhumanity.org',
    description:
      'Free, funded workforce training programs aligned with WIOA, WRG, DOL, and employer-led apprenticeships.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Banner - Video */}
      <VideoHeroBanner
        videoSrc={currentHomeHero}
        withAudio={enableAudioNarration}
        voiceoverSrc="/videos/voiceover.mp3"
      />

      {/* OUR OFFERINGS - Comprehensive Overview */}
      <section className="w-full py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Free, funded workforce training programs that lead to real careers and measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Healthcare Programs */}
            <Link href="/programs/healthcare" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-600">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/media/programs/cna-hd.jpg"
                    alt="Healthcare Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm mb-4">
                  CNA, Medical Assistant, Home Health Aide
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <span>View Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/skilled-trades" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-600">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/media/programs/hvac-highlight-3.jpg"
                    alt="Skilled Trades"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Skilled Trades</h3>
                <p className="text-gray-600 text-sm mb-4">
                  HVAC, Building Maintenance, Construction
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <span>View Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Barber Apprenticeship */}
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-600">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/media/programs/efh-barber-hero.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Barber</h3>
                <p className="text-gray-600 text-sm mb-4">
                  DOL-registered apprenticeship, earn while you learn
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <span>View Program</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* CDL Training */}
            <Link href="/programs/cdl-transportation" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-600">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src="/media/programs/cdl-hero.jpg"
                    alt="CDL Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">CDL Training</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Commercial Driver License, truck driving careers
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <span>View Program</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/programs">
              <button className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg">
                View All Programs
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Built for the entire workforce ecosystem. Choose your path.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Students */}
            <Link href="/apply" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-brand-blue-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/homepage/students.jpg"
                    alt="Students in training"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Students</h3>
                <p className="text-gray-700 mb-4">
                  Access free or funded training programs that lead to real
                  credentials and jobs.
                </p>
                <div className="flex items-center gap-2 text-brand-blue-600 font-bold">
                  <span>Apply for Free Training</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Employers */}
            <Link href="/employers" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-brand-orange-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/homepage/employers.jpg"
                    alt="Employers and workforce partners"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Employers
                </h3>
                <p className="text-gray-700 mb-4">
                  Build reliable talent pipelines through apprenticeships and
                  work-based learning.
                </p>
                <div className="flex items-center gap-2 text-brand-orange-600 font-bold">
                  <span>Partner With Us</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Schools & Nonprofits */}
            <Link href="/licensing" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-brand-purple-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/homepage/schools-nonprofits.jpg"
                    alt="Schools and nonprofit organizations"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Schools & Nonprofits
                </h3>
                <p className="text-gray-700 mb-4">
                  License proven workforce programs and technology to expand
                  your impact.
                </p>
                <div className="flex items-center gap-2 text-brand-purple-600 font-bold">
                  <span>Licensing & Partnerships</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Government Agencies */}
            <Link href="/about" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-brand-green-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/homepage/government-agencies.jpg"
                    alt="Government agencies and workforce boards"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Government Agencies
                </h3>
                <p className="text-gray-700 mb-4">
                  Deploy compliant, fundable training infrastructure at scale.
                </p>
                <div className="flex items-center gap-2 text-brand-green-600 font-bold">
                  <span>About / Credentials</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Funders & Philanthropy */}
            <Link href="/impact" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-pink-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/homepage/funders-philanthropy.jpg"
                    alt="Funders and philanthropic organizations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  Funders & Philanthropy
                </h3>
                <p className="text-gray-700 mb-4">
                  Support sustainable systems with measurable outcomes.
                </p>
                <div className="flex items-center gap-2 text-pink-600 font-bold">
                  <span>Impact</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="w-full py-12 bg-gray-50 border-y border-gray-200">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-center text-gray-700 text-lg">
            Aligned with state and federal workforce systems, including WIOA,
            WRG, DOL, and registered apprenticeship pathways.
          </p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/homepage/funded-programs-optimized.jpg"
                  alt="Funded workforce training programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Funded Workforce Training Programs
              </h3>
              <p className="text-gray-700">
                Industry-aligned programs designed to remove financial barriers
                for learners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/homepage/licensable-platform.jpg"
                  alt="Licensable workforce platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Licensable Workforce Platform
              </h3>
              <p className="text-gray-700">
                A ready-to-deploy system for schools, nonprofits, and agencies
                to run compliant training programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/homepage/wraparound-support-optimized.jpg"
                  alt="Wraparound student support services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Wraparound Student Support
              </h3>
              <p className="text-gray-700">
                Tools and services that help learners persist, complete, and
                transition into employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-20 bg-gradient-to-br from-brand-blue-700 to-brand-purple-700 text-white">
        <div className="mx-auto w-full max-w-4xl text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-10">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue-700 hover:bg-blue-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-lg"
            >
              Apply for Free Training
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/licensing"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              Licensing & Partnerships
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
