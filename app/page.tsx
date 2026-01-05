import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Enable static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

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
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/artlist/hero-training-1.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              A Workforce and Education Hub That Connects Systems, Not Just Programs
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Elevate for Humanity coordinates learners, schools, training providers, employers, and government funding into one structured pathway — from eligibility and enrollment to credentials and workforce outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition text-lg"
              >
                Explore the Hub
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#who-we-serve"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition text-lg"
              >
                Who We Serve
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THE HUB EXISTS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Why Elevate for Humanity Exists
          </h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="mb-6">
              Workforce and education systems are fragmented. Learners struggle to understand what opportunities they qualify for. Schools face increasing pressure to meet career-connected learning and graduation requirements. Training providers navigate complex funding rules. Employers need prepared talent. Government programs require compliance, documentation, and measurable outcomes.
            </p>
            <p>
              Elevate for Humanity exists to coordinate these systems into a single, navigable hub — so opportunity is accessible, funded, and accountable.
            </p>
          </div>
        </div>
      </section>

      {/* HOW THE HUB WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            How the Hub Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Intake and Eligibility
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Participants enter the hub through a guided intake process that identifies eligibility for training programs, credentials, and available funding sources.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Program and Funding Coordination
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The hub matches learners and partners to approved programs and applicable funding pathways, including state and federal workforce initiatives.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Training, Credentials, and Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Participants complete structured training while progress, participation, and outcomes are documented for compliance and reporting.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Workforce Outcomes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Credentials earned, completion data, and placement outcomes are tracked and shared with schools, partners, and funders as appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THE HUB SERVES */}
      <section id="who-we-serve" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            Who the Hub Serves
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Learners */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Learners
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Access funded training, credential pathways, and workforce opportunities you qualify for — with guidance and support throughout the process.
              </p>
            </div>

            {/* Schools */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Schools
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Meet career-connected learning and graduation requirements through verified external programs with documented outcomes.
              </p>
            </div>

            {/* Training Providers */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Training Providers
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Expand reach, connect to funding pathways, and deliver programs within a coordinated, compliance-aware system.
              </p>
            </div>

            {/* Employers */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Employers
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Build reliable talent pipelines aligned to real credentials, readiness, and workforce demand.
              </p>
            </div>

            {/* Government and Funders */}
            <div className="bg-gray-50 rounded-lg p-8 md:col-span-2 lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Government and Funders
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Support outcomes-driven programs with centralized coordination, documentation, and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM AREAS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Program and Pathway Areas
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The hub supports a range of workforce-aligned programs and pathways, including but not limited to:
          </p>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-600 mr-3">•</span>
              <span>STEM and systems-based learning</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-3">•</span>
              <span>Skilled trades and technical training</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-3">•</span>
              <span>Healthcare and allied health pathways</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-3">•</span>
              <span>Information technology and digital skills</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-3">•</span>
              <span>Apprenticeships and work-based learning</span>
            </li>
          </ul>
          <p className="text-gray-600 mt-8 leading-relaxed">
            Programs are delivered through approved partners and aligned with applicable funding and compliance standards.
          </p>
        </div>
      </section>

      {/* CREDIBILITY AND POSITIONING */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Built for Compliance. Designed for Access.
          </h2>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="mb-6">
              Elevate for Humanity operates as a coordination hub — not a standalone training provider. The platform works with accredited programs, workforce systems, and partner organizations to ensure alignment with funding requirements, reporting standards, and outcome expectations.
            </p>
            <p>
              The model is advisor-led, compliance-aware, and designed to scale responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL INVITATION */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Where You Belong
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Whether you are seeking opportunity, supporting students, delivering training, building a workforce pipeline, or funding outcomes, the hub is designed to meet you where you are.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition text-lg"
          >
            Enter the Hub
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
