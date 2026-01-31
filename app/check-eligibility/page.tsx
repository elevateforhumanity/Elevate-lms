import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, Phone, MapPin, GraduationCap, Briefcase, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Check Eligibility for Free Career Training | Elevate for Humanity',
  description: 'Find out if you qualify for FREE career training in barbering, healthcare, CDL, and skilled trades in Indianapolis. WIOA-funded programs for Indiana residents 18+.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/check-eligibility',
  },
  openGraph: {
    title: 'Check Eligibility - Free Career Training in Indianapolis',
    description: 'See if you qualify for free workforce training in barbering, CNA, CDL, and more. No cost to eligible Indiana residents.',
    url: 'https://www.elevateforhumanity.org/check-eligibility',
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
};

export default function CheckEligibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Check Eligibility" }]} />
      </div>

      {/* Hero with Image */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-hands-on-training.jpg"
            alt="Students in hands-on career training"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center py-20 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Could You Qualify for FREE Career Training?
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take 2 minutes to see if you may be eligible for no-cost training in barbering, healthcare, CDL trucking, skilled trades, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span>100% Free for Eligible Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
              <span>Industry Certifications</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Briefcase className="w-5 h-5 text-orange-400" />
              <span>Job Placement Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Available */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Training Programs You Could Access</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <div className="relative h-32">
                <Image src="/images/programs/barber-hero.jpg" alt="Barber training" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">Barber Apprenticeship</h3>
                <p className="text-sm text-gray-600 mt-1">1,500 hours • State License</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <div className="relative h-32">
                <Image src="/images/programs/cna-hero.jpg" alt="CNA training" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">CNA / Healthcare</h3>
                <p className="text-sm text-gray-600 mt-1">4-8 weeks • State Certification</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <div className="relative h-32">
                <Image src="/images/programs/cdl-hero.jpg" alt="CDL training" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">CDL Truck Driving</h3>
                <p className="text-sm text-gray-600 mt-1">3-4 weeks • CDL License</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <div className="relative h-32">
                <Image src="/images/hero/hero-skilled-trades.jpg" alt="Skilled trades" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">Skilled Trades</h3>
                <p className="text-sm text-gray-600 mt-1">HVAC, Electrical, Plumbing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-amber-900 mb-2">How Funding Works:</h2>
              <p className="text-amber-800">
                Our programs are funded through <strong>WIOA (Workforce Innovation and Opportunity Act)</strong>, Indiana&apos;s Workforce Ready Grant, and other state/federal workforce programs. This means training is <strong>completely free</strong> for those who qualify.
              </p>
              <p className="text-amber-800 mt-2">
                <strong>Important:</strong> Final eligibility is verified by WorkOne / Indiana Career Connect — not by Elevate for Humanity. The checklist below helps you understand if you&apos;re likely to qualify before you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* You May Qualify */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-7 h-7 text-green-600" />
              You&apos;re Likely Eligible If You:
            </h2>
            <ul className="space-y-4">
              {[
                { text: 'Are 18 years or older', detail: 'Some programs accept 16+ with parental consent' },
                { text: 'Live in Indiana', detail: 'Must be a current Indiana resident' },
                { text: 'Are legally authorized to work in the United States', detail: 'U.S. citizen, permanent resident, or valid work authorization' },
                { text: 'Are unemployed, underemployed, or seeking a career change', detail: 'Working part-time, low wages, or in an unstable job situation' },
                { text: 'Want training that leads to a real job', detail: 'Our programs connect directly to employers hiring now' },
                { text: 'Can commit to the training schedule', detail: 'Programs range from 3 weeks to 18 months depending on the career path' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">{item.text}</span>
                    <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Priority Groups */}
          <div className="mb-10 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Priority Consideration Given To:</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Veterans and military spouses',
                'Recipients of public assistance (SNAP, TANF, SSI)',
                'Individuals with disabilities',
                'Ex-offenders seeking reentry',
                'Single parents',
                'Youth aging out of foster care',
                'Long-term unemployed (6+ months)',
                'Low-income households',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* You May Not Qualify */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <XCircle className="w-7 h-7 text-red-500" />
              You May Not Be Eligible If You:
            </h2>
            <ul className="space-y-4">
              {[
                { text: 'Do not live in Indiana', detail: 'Funding is specific to Indiana residents' },
                { text: 'Are not authorized to work in the U.S.', detail: 'Work authorization documentation is required' },
                { text: 'Are already enrolled in another publicly funded training program', detail: 'Cannot receive duplicate funding' },
                { text: 'Are seeking training for hobby or personal enrichment only', detail: 'Programs are designed for employment outcomes' },
                { text: 'Have a felony that disqualifies you from licensure in your chosen field', detail: 'Some careers have background restrictions — we can help you find alternatives' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">{item.text}</span>
                    <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What Happens Next */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens After You Apply:</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Submit Your Application', text: 'Complete a short online application (takes about 10 minutes). Tell us about your background and which career interests you.' },
                { step: 2, title: 'Eligibility Verification', text: 'WorkOne / Indiana Career Connect will review your information and verify your eligibility for funding. You may need to provide documents like ID, proof of residence, and income verification.' },
                { step: 3, title: 'Career Counseling', text: 'Meet with a career advisor to discuss your goals, choose the right training program, and create your personalized career plan.' },
                { step: 4, title: 'Start Training', text: 'Begin your training program with full support — including supplies, certifications, and job placement assistance upon completion.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents You May Need */}
          <div className="mb-10 bg-gray-50 rounded-xl p-6 border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents You May Need:</h2>
            <div className="grid md:grid-cols-2 gap-3 text-gray-700">
              {[
                'Government-issued photo ID',
                'Social Security card',
                'Proof of Indiana residency',
                'Proof of income (pay stubs, tax return, or benefit letter)',
                'High school diploma or GED (if available)',
                'DD-214 (for veterans)',
                'Selective Service registration (males 18-25)',
                'Work authorization documents (if applicable)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">Don&apos;t have all documents? Apply anyway — we can help you obtain what you need.</p>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              If the criteria above describe your situation, you may be a good candidate for our programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Eligibility Review
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://www.in.gov/dwd/career-connect/find-a-workone-office/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                <MapPin className="w-5 h-5" />
                Find a WorkOne Location
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Questions about eligibility?</p>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
