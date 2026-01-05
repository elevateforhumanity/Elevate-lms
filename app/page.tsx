import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { currentHomeHero, enableAudioNarration } from '@/config/hero-videos';

// Enable static generation with immediate revalidation
export const dynamic = 'force-static';
export const revalidate = 0; // Always fresh
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce and Education Hub',
  description:
    'A workforce and education hub that connects systems, not just programs. Coordinating learners, schools, training providers, employers, and government funding into structured pathways.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
  openGraph: {
    title: 'Elevate for Humanity | Workforce and Education Hub',
    description:
      'Coordinating learners, schools, training providers, employers, and government funding into one structured pathway — from eligibility and enrollment to credentials and workforce outcomes.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    images: [
      {
        url: '/images/homepage/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elevate for Humanity - Workforce and Education Hub',
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

      {/* WHY THE HUB EXISTS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Workforce and Education Hub That Connects Systems
          </h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="mb-4">
              Workforce and education systems are fragmented. Learners struggle to understand what opportunities they qualify for. Schools face increasing pressure to meet career-connected learning and graduation requirements. Training providers navigate complex funding rules. Employers need prepared talent. Government programs require compliance, documentation, and measurable outcomes.
            </p>
            <p>
              Elevate for Humanity coordinates these systems into a single, navigable hub — so opportunity is accessible, funded, and accountable.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM AREAS */}
      <section className="w-full py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Program Areas
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Training programs aligned with industry demand and government funding requirements.
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
      {/* HOW THE HUB WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            How the Hub Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Intake and Eligibility
              </h3>
              <p className="text-gray-700 text-sm">
                Learners complete a single intake form. The system determines eligibility for WIOA, SNAP E&T, WRG, and other funding sources.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Coordination and Enrollment
              </h3>
              <p className="text-gray-700 text-sm">
                Schools, training providers, and employers access a shared dashboard to coordinate enrollment, schedules, and support services.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tracking and Compliance
              </h3>
              <p className="text-gray-700 text-sm">
                Attendance, progress, and outcomes are tracked in real time. Documentation meets federal and state compliance requirements.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Credentials and Outcomes
              </h3>
              <p className="text-gray-700 text-sm">
                Learners earn verifiable credentials. Employers access a talent pipeline. Government funders receive outcome reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Who We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Students */}
            <Link href="/apply" className="group">
              <div className="bg-white border-2 border-gray-200 hover:border-brand-blue-600 rounded-2xl p-8 transition-all hover:shadow-xl">
                <div className="w-full h-48 relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-1.jpg"
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
                    src="/images/artlist/hero-training-3.jpg"
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
                    src="/images/artlist/hero-training-4.jpg"
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
                    src="/images/artlist/hero-training-5.jpg"
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
          <h3 className="text-center text-gray-900 text-2xl font-bold mb-3">
            Built for Compliance. Designed for Access.
          </h3>
          <p className="text-center text-gray-700 text-lg">
            Aligned with state and federal workforce systems, including WIOA,
            WRG, DOL, and registered apprenticeship pathways.
          </p>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What We Provide
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/artlist/hero-training-6.jpg"
                  alt="Funded workforce training programs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Funded Training Programs
              </h3>
              <ul className="text-gray-700 text-left space-y-2">
                <li>• Healthcare (CNA, Medical Assistant, Home Health Aide)</li>
                <li>• Skilled Trades (HVAC, Building Maintenance, Construction)</li>
                <li>• Transportation (CDL, Logistics)</li>
                <li>• Registered Apprenticeships (Barber, others)</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/artlist/hero-training-7.jpg"
                  alt="Licensable workforce platform"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Licensable Platform
              </h3>
              <ul className="text-gray-700 text-left space-y-2">
                <li>• Intake and eligibility screening</li>
                <li>• Enrollment and case management</li>
                <li>• Attendance and progress tracking</li>
                <li>• Compliance documentation and reporting</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-full h-48 relative mx-auto mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/images/artlist/hero-training-8.jpg"
                  alt="Wraparound student support services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Support Services
              </h3>
              <ul className="text-gray-700 text-left space-y-2">
                <li>• Career advising and job placement</li>
                <li>• Wraparound support coordination</li>
                <li>• Credential verification</li>
                <li>• Employer engagement and hiring pipelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-20 bg-gradient-to-br from-brand-blue-700 to-brand-purple-700 text-white">
        <div className="mx-auto w-full max-w-4xl text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-10">
            Start Where You Belong
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
