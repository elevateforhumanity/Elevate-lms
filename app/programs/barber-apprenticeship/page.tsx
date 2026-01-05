import { OptimizedVideo } from '@/components/OptimizedVideo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { programs } from '@/app/data/programs';
import ReactMarkdown from 'react-markdown';
import {
  GraduationCap,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  Users,
  ExternalLink,
  FileText,
  Award,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Barber Apprenticeship Indiana | Earn While You Learn | DOL Registered | Indianapolis',
  description:
    'DOL-registered barber apprenticeship in Indianapolis. Earn $12-15/hour while training. Get matched to licensed barber shop, receive hands-on training, earn Indiana barber license. State Board approved. RAPIDS ID: 2025-IN-132301.',
  keywords:
    'barber apprenticeship Indiana, earn while you learn barber, DOL registered apprenticeship, Indiana barber license, barber training Indianapolis, paid barber training, State Board approved barber, barber school Indianapolis, apprenticeship barber program Indiana',
  alternates: {
    canonical: 'https://elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  const barberProgram = programs.find(
    (p) => p.slug === 'barber-apprenticeship'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Hero Content */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
              Free with funding
            </span>
            <span className="px-3 py-1 bg-brand-orange-600 text-white text-sm font-medium rounded-full">
              Earn While You Learn
            </span>
            <span className="px-3 py-1 bg-brand-blue-600 text-white text-sm font-medium rounded-full">
              DOL Registered
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl text-gray-900">
            Barber Apprenticeship: Earn while you learn
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-700 leading-relaxed">
            Get matched to a licensed barber shop, receive hands-on training,
            and earn your Indiana barber license through our DOL-registered
            apprenticeship program. Earn $12-15/hour while training.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>

          {/* Payment Options for Self-Pay */}
          <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-300 rounded-lg max-w-2xl">
            <div className="flex items-start gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="w-full">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Can't Get Funded? No Problem!
                </h3>
                <p className="text-slate-700 mb-4">
                  If you don't qualify for WIOA, WRG, or JRI funding, you can
                  still enroll with flexible payment options:
                </p>

                {/* Pricing */}
                <div className="bg-white rounded-lg p-4 mb-4 border-2 border-amber-200">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-slate-900">
                      $4,950
                    </span>
                    <span className="text-slate-600">total program cost</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    15-17 month apprenticeship • Earn while you learn
                  </p>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3">
                  {/* Stripe Payment */}
                  <Link
                    href="/checkout/barber-apprenticeship?method=stripe"
                    className="w-full flex items-center justify-between px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-bold">Pay with Stripe</div>
                        <div className="text-sm text-blue-100">
                          Secure one-time payment
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  {/* Affirm Payment */}
                  <Link
                    href="/checkout/barber-apprenticeship?method=affirm"
                    className="w-full flex items-center justify-between px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10.5 17.5h3v-11h-3v11zm-7 0h3v-7h-3v7zm14-11v11h3v-11h-3z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-bold">Pay with Affirm</div>
                        <div className="text-sm text-blue-100">
                          As low as $206/month • 0% APR available
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  {/* Afterpay Payment */}
                  <Link
                    href="/checkout/barber-apprenticeship?method=afterpay"
                    className="w-full flex items-center justify-between px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-bold">Pay with Afterpay</div>
                        <div className="text-sm text-teal-100">
                          4 interest-free payments of $1,237.50
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <p className="text-xs text-slate-600 mt-3 text-center">
                  <Lightbulb className="w-5 h-5 inline-block" /> Most students
                  qualify for 100% FREE training through WIOA funding.{' '}
                  <Link href="/funding" className="text-blue-600 underline">
                    Check eligibility
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Program Details from programs.ts */}
      {barberProgram && barberProgram.longDescription && (
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div
              className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-3xl prose-h2:mt-6 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-4 prose-h3:mb-3
              prose-h4:text-xl prose-h4:mt-3 prose-h4:mb-2
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-slate-700 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:text-sm prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-table:w-full prose-table:border-collapse
              prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:border prose-th:border-slate-300
              prose-td:p-3 prose-td:border prose-td:border-slate-300
            "
            >
              <ReactMarkdown>{barberProgram.longDescription}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* What is a Registered Apprenticeship */}
      <section className="py-20 md:py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            What is a Registered Apprenticeship?
          </h2>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <p className="text-lg text-gray-700 mb-4">
              A <strong>Registered Apprenticeship</strong> is a structured
              talent development strategy approved by the U.S. Department of
              Labor that combines:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">
                    On-the-Job Learning
                  </h3>
                  <p className="text-sm text-gray-600">
                    Paid work at a licensed barber shop
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">
                    Classroom Learning
                  </h3>
                  <p className="text-sm text-gray-600">
                    Related Technical Instruction (RTI)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Mentorship</h3>
                  <p className="text-sm text-gray-600">
                    Guidance from licensed barbers
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Upon completion of 1,500 hours, you receive a{' '}
              <strong>nationally-recognized credential</strong> that qualifies
              you to sit for the Indiana Barber Licensing Exam.
            </p>

            {/* Transfer Hours Explanation */}
            <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
              <h4 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                How Transfer Hours Work
              </h4>
              <p className="text-black mb-3">
                Already have barber school hours?{' '}
                <strong>You can transfer them!</strong> Here's how it works:
              </p>
              <ul className="space-y-2 text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Previous barber school hours count</strong> toward
                    your 1,500-hour requirement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Bring your transcript</strong> from your previous
                    barber school or program
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>We verify with the Indiana State Board</strong> to
                    confirm your hours
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Complete remaining hours</strong> through our
                    apprenticeship program
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Earn while you finish</strong> - get paid
                    $12-15/hour for your remaining hours
                  </span>
                </li>
              </ul>
              <p className="text-black mt-4 text-sm">
                <strong>Example:</strong> If you completed 800 hours at another
                school, you only need 700 more hours in our apprenticeship
                program to reach the 1,500-hour requirement.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Source:{' '}
              <a
                href="https://www.in.gov/dwd/owbla/registered-apprenticeship-basics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 hover:underline"
              >
                Indiana DWD - Registered Apprenticeship Basics{' '}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* At-a-Glance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">
            Program At-a-Glance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Duration</h3>
                <p className="text-gray-700">12-18 months</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <DollarSign className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Cost</h3>
                <p className="text-gray-700">Free with funding when eligible</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Format</h3>
                <p className="text-gray-700">In-person at licensed shop</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Outcome</h3>
                <p className="text-gray-700">Barber License + Job</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Program Is For */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Who This Program Is For
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Individuals interested in barbering as a career
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  No prior experience required
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Justice-impacted individuals welcome
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Must be able to work in-person at a barber shop
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Funding Options
          </h2>
          <p className="text-gray-700 mb-6">You may qualify for:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WIOA</h3>
              <p className="text-gray-700 text-sm">
                Workforce Innovation and Opportunity Act funding
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WRG</h3>
              <p className="text-gray-700 text-sm">Workforce Ready Grant</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">JRI</h3>
              <p className="text-gray-700 text-sm">
                Justice Reinvestment Initiative
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">
                Employer Sponsorship
              </h3>
              <p className="text-gray-700 text-sm">
                Some shops sponsor apprentices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Support Services
          </h2>
          <p className="text-gray-700 mb-6">We help coordinate:</p>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Case management</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Justice navigation for returning citizens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Transportation resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Childcare referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Outcomes</h2>
          <p className="text-gray-700 mb-6">Students typically move into:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Licensed Barber</h3>
              <p className="text-gray-700 text-sm">Full state license</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Shop Employment</h3>
              <p className="text-gray-700 text-sm">
                Job at training shop or other
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Shop Ownership</h3>
              <p className="text-gray-700 text-sm">Pathway to own business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earn While You Learn */}
      <section className="py-20 md:py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Earn While You Learn
          </h2>
          <div className="bg-white border-2 border-green-200 rounded-xl p-6 md:p-8">
            <p className="text-lg text-gray-700 mb-4">
              <strong>
                All registered apprenticeships include wage progression.
              </strong>{' '}
              You start earning from day one and receive raises as you gain
              skills.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Starting Wage</p>
                <p className="text-2xl font-bold text-black">$12-15/hr</p>
                <p className="text-xs text-gray-500">Months 1-6</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Mid-Program</p>
                <p className="text-2xl font-bold text-black">$15-18/hr</p>
                <p className="text-xs text-gray-500">Months 7-12</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Licensed Barber</p>
                <p className="text-2xl font-bold text-black">$25-40/hr+</p>
                <p className="text-xs text-gray-500">After licensure</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> Wages vary by shop. Many barbers earn
              additional income through tips and commission. Licensed barbers
              can earn $40,000-$60,000+ annually.
            </p>
          </div>
        </div>
      </section>

      {/* Official Resources */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Official Resources & Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Indiana Registered Apprenticeship Basics',
                org: 'Indiana DWD',
                url: 'https://www.in.gov/dwd/owbla/registered-apprenticeship-basics/',
              },
              {
                title: 'Barber Apprenticeship Program Listing',
                org: 'INTraining',
                url: 'https://intraining.dwd.in.gov/ProgramLocation?ProgramId=10002417',
              },
              {
                title: 'Apprenticeship Process Guide (PDF)',
                org: 'Indiana DWD',
                url: 'https://www.in.gov/dwd/owbla/files/DWD_OWBLA_Registered_Apprenticeship_Process_Guide.pdf',
              },
              {
                title: 'Career Seekers Guide',
                org: 'Apprenticeship.gov',
                url: 'https://www.apprenticeship.gov/career-seekers',
              },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-brand-orange-600 hover:bg-orange-50 transition group"
              >
                <FileText className="w-6 h-6 text-gray-600 group-hover:text-brand-orange-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-black group-hover:text-brand-orange-600 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.org}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-brand-orange-600" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Owners CTA */}
      <section className="py-20 md:py-24 bg-slate-800 text-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Barber Shop Owners
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Interested in hosting an apprentice? Learn about program holder
            requirements, benefits, and how to get started.
          </p>
          <Link
            href="/program-holders/barber-apprenticeship"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold text-lg rounded-lg transition"
          >
            Program Holder Guidelines
          </Link>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-brand-orange-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Apply</h3>
                <p className="text-slate-600 text-sm">
                  Submit your application online
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Meet with advisor</h3>
                <p className="text-slate-600 text-sm">
                  Discuss your goals and eligibility
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Confirm eligibility</h3>
                <p className="text-slate-600 text-sm">
                  We help with funding paperwork
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1">Enroll</h3>
                <p className="text-slate-600 text-sm">
                  Get matched to a shop and start training
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-brand-orange-600 hover:bg-brand-orange-600 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
