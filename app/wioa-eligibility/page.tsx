import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, GraduationCap, Home } from 'lucide-react';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/wioa-eligibility',
  },
  title: 'WIOA Eligibility Requirements | Elevate For Humanity',
  description:
    'Check if you qualify for 100% free career training through WIOA funding. Learn about eligibility requirements and how to apply.',
};

export default function WIOAEligibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="⚡ Most People Qualify"
        headline="Check Your"
        accentText="WIOA Eligibility"
        subheadline="Find out if you qualify for 100% free career training"
        description="WIOA (Workforce Innovation and Opportunity Act) provides funding for job training programs. Most Indiana residents qualify if they're unemployed, underemployed, or seeking better employment."
        imageSrc="/images/heroes/hero-state-funding.jpg"
        imageAlt="WIOA Eligibility"
        primaryCTA={{ text: "Check Eligibility", href: "#form" }}
        secondaryCTA={{ text: "Apply Now", href: "/apply" }}
        features={[
          "100% free training for eligible Indiana residents",
          "No student debt - all costs covered by WIOA funding",
          "Most people qualify - we help with the application"
        ]}
        imageOnRight={true}
      />

      {/* Main Content */}
      <section id="eligibility" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-l-4 border-green-600 p-8 mb-12 rounded-r-xl shadow-sm">
            <h2 className="text-2xl font-black text-green-900 mb-2">
              Good News!
            </h2>
            <p className="text-lg text-black">
              Most people qualify for WIOA funding. If you're looking to start a
              new career or upgrade your skills, you likely qualify.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-black mb-8">
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
            <Link href="/wioa-eligibility/veterans" className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition border-2 border-transparent hover:border-orange-500">
              <p className="font-semibold text-slate-900">• Veterans →</p>
              <p className="text-sm text-slate-600 mt-1">Priority services for military veterans</p>
            </Link>
            <Link href="/wioa-eligibility/low-income" className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition border-2 border-transparent hover:border-orange-500">
              <p className="font-semibold text-slate-900">• Low-Income Individuals →</p>
              <p className="text-sm text-slate-600 mt-1">Income-based eligibility criteria</p>
            </Link>
            <Link href="/wioa-eligibility/public-assistance" className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition border-2 border-transparent hover:border-orange-500">
              <p className="font-semibold text-slate-900">• Public Assistance Recipients →</p>
              <p className="text-sm text-slate-600 mt-1">SNAP, TANF, and other programs</p>
            </Link>
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

          <div id="form" className="bg-white border-2 border-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Check Your Eligibility
            </h2>
            <p className="text-base md:text-lg mb-6 text-gray-700">
              Fill out this quick form and we'll help you determine if you qualify for WIOA funding
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <input type="text" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                <input type="email" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone *</label>
                <input type="tel" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Employment Status *</label>
                <select required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none">
                  <option value="">Select...</option>
                  <option>Unemployed</option>
                  <option>Underemployed</option>
                  <option>Employed - Seeking Better Job</option>
                  <option>Receiving Public Assistance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Indiana Resident? *</label>
                <select required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none">
                  <option value="">Select...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <button type="submit" className="w-full px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg">
                Check My Eligibility
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Or contact us directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
