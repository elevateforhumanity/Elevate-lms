import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Enroll Now',
  description: 'Start your career training journey. Enroll in free workforce development programs with WIOA funding in Indianapolis.',
  path: '/enroll',
});

import Link from 'next/link';
import ProgramHowItWorks from '@/components/program/ProgramHowItWorks';
import ProgramFAQ from '@/components/program/ProgramFAQ';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="⚡ 100% Free Training Available"
        headline="Enroll in"
        accentText="Free Career Training"
        subheadline="No Tuition. No Debt. Start Your New Career Today."
        description="Most students qualify for 100% free training through WIOA, WRG, or JRI funding. We handle all the paperwork and help you every step of the way."
        imageSrc="/images/efh/hero/hero-main.jpg"
        imageAlt="Enroll in Free Training"
        primaryCTA={{ text: "Apply for Free Training", href: "#enrollment" }}
        secondaryCTA={{ text: "Call 317-314-3757", href: "tel:317-314-3757" }}
        features={[
          "100% free training through WIOA, WRG, or JRI funding",
          "No tuition, no debt, no hidden costs",
          "We handle all paperwork and applications"
        ]}
        imageOnRight={true}
      />

      {/* Enrollment Form */}
      <section id="enrollment" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          {/* FREE Training Only */}
          <div className="bg-white rounded-2xl border-2 border-green-500 p-8 shadow-lg">
            <div className="text-3xl font-black text-green-700 mb-4 text-center">
              Apply for FREE Training
            </div>
            <p className="text-lg text-black mb-6 text-center">
              Most students qualify for 100% free training through:
            </p>
            <ul className="space-y-3 mb-8 text-black max-w-md mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">✓</span>
                <span>
                  <strong>WRG</strong> - Workforce Ready Grant
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">✓</span>
                <span>
                  <strong>WIOA</strong> - Workforce Innovation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">✓</span>
                <span>
                  <strong>JRI</strong> - Justice Reinvestment
                </span>
              </li>
            </ul>
            <p className="text-sm text-black mb-8 text-center">
              No tuition. No debt. We help you apply and handle all paperwork.
            </p>
            <Link
              href="/apply"
              className="block w-full text-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all text-lg"
            >
              Apply for Free Training
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-black mb-2">Questions?</p>
            <a
              href="tel:3173143757"
              className="text-2xl font-bold text-orange-600 hover:text-orange-700"
            >
              Call 317-314-3757
            </a>
          </div>

          {/* How It Works Section */}
          <div className="mt-12">
            <ProgramHowItWorks programName="Enrollment" />
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <ProgramFAQ />
          </div>
        </div>
      </section>
    </div>
  );
}
