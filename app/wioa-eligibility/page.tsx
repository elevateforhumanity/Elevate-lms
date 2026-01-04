import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, GraduationCap, Home } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.org/wioa-eligibility',
  },
  title: 'WIOA Eligibility Requirements | Elevate For Humanity',
  description:
    'Check if you qualify for 100% free career training through WIOA funding. Learn about eligibility requirements and how to apply.',
};

export default function WIOAEligibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
        <Image
          src="/images/heroes/hero-state-funding.jpg"
          alt="WIOA Eligibility"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              WIOA Eligibility Requirements
            </h1>
            <p className="text-base md:text-lg sm:text-base md:text-lg text-white max-w-3xl">
              Find out if you qualify for 100% free career training
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-l-4 border-brand-green-600 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Good News!
            </h2>
            <p className="text-lg text-green-800">
              Most people qualify for WIOA funding. If you're looking to start a
              new career or upgrade your skills, you likely qualify.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Who Qualifies for WIOA?
          </h2>

          <div className="space-y-6 mb-12">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ✓ Adults (18+)
              </h3>
              <p className="text-slate-700">
                You must be 18 years or older and legally authorized to work in
                the United States.
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ✓ Indiana Residents
              </h3>
              <p className="text-slate-700">
                You must be a resident of Indiana. Proof of residency required
                (utility bill, lease agreement, etc.).
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ✓ Employment Status
              </h3>
              <p className="text-slate-700 mb-3">You qualify if you are:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Unemployed</li>
                <li>Underemployed (working part-time but want full-time)</li>
                <li>Low-income and seeking better employment</li>
                <li>Receiving public assistance (SNAP, TANF, etc.)</li>
                <li>Dislocated worker (laid off, plant closure, etc.)</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ✓ Education Level
              </h3>
              <p className="text-slate-700">
                High school diploma or GED preferred, but not always required.
                Some programs accept students working toward their GED.
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Priority Groups
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            WIOA gives priority to individuals who are:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">• Veterans</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">
                • Low-income individuals
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">
                • Public assistance recipients
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">
                • Individuals with disabilities
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">• Ex-offenders</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">
                • Homeless individuals
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            What You'll Need to Apply
          </h2>

          <div className="bg-blue-50 p-6 rounded-lg mb-12">
            <ul className="space-y-3 text-slate-800">
              <li className="flex items-start">
                <span className="text-2xl mr-3">📋</span>
                <span>
                  <strong>Social Security Card</strong> or proof of SSN
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">
                  <Home className="w-5 h-5 inline-block" />
                </span>
                <span>
                  <strong>Proof of Residency</strong> (utility bill, lease,
                  mortgage statement)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">
                  <GraduationCap className="w-5 h-5 inline-block" />
                </span>
                <span>
                  <strong>High School Diploma or GED</strong> (if applicable)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">
                  <DollarSign className="w-5 h-5 inline-block" />
                </span>
                <span>
                  <strong>Income Documentation</strong> (pay stubs, tax returns,
                  or proof of public assistance)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">🪪</span>
                <span>
                  <strong>Valid ID</strong> (driver's license or state ID)
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg mb-6">
              Visit Indiana Career Connect to check your eligibility and apply
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.indianacareerconnect.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-brand-orange-600 text-white font-bold rounded-full hover:bg-brand-orange-700 transition-all shadow-xl"
              >
                Check Eligibility Now
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl"
              >
                Contact Us for Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
