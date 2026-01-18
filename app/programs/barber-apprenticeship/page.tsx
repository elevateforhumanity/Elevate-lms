import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Clock, Award, DollarSign, Users, ArrowRight, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate for Humanity',
  description: 'Become a licensed barber through a 2,000-hour paid apprenticeship. Train under licensed barbers, earn hours toward state licensure, and gain real experience.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/programs/barber.jpg"
            alt="Barber apprenticeship training"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-orange-400 font-medium mb-4">Skilled Trades Program</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Become a Licensed Barber Through a 2,000-Hour Paid Apprenticeship
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Train under licensed barbers, earn hours toward state licensure, and gain real 
              on-the-job experience without traditional tuition debt.
            </p>
            
            {/* Key Facts */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-5 h-5 text-orange-400 mb-2" />
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-semibold">2,000 Hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-5 h-5 text-orange-400 mb-2" />
                <p className="text-sm text-gray-400">Format</p>
                <p className="font-semibold">On-the-Job</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="w-5 h-5 text-orange-400 mb-2" />
                <p className="text-sm text-gray-400">Credential</p>
                <p className="font-semibold">State License</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <DollarSign className="w-5 h-5 text-orange-400 mb-2" />
                <p className="text-sm text-gray-400">Cost</p>
                <p className="font-semibold">Funded Options</p>
              </div>
            </div>

            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
            >
              Apply for the Barber Apprenticeship
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">This Program Is For</h2>
              </div>
              <ul className="space-y-4">
                {[
                  'Adults seeking a state barber license',
                  'Individuals who learn best through hands-on training',
                  'People interested in working in a licensed barbershop environment',
                  'Applicants ready for a long-term commitment (2,000 hours)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not For */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">This Program Is NOT For</h2>
              </div>
              <ul className="space-y-4">
                {[
                  'People looking for a short-term course',
                  'Anyone unwilling to work under supervision',
                  'Those who want fully online training',
                  'Hobbyists not pursuing licensure',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Gain */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What You Will Gain
            </h2>
            <p className="text-lg text-gray-600">
              By completing the apprenticeship, you gain real skills and credentials that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '2,000 Verified Hours',
                description: 'Accumulated and documented hours toward your state barber license eligibility.',
              },
              {
                title: 'Hair Cutting & Styling',
                description: 'Master clipper, shear, and razor techniques under professional supervision.',
              },
              {
                title: 'Sanitation & Safety',
                description: 'Learn proper sanitation procedures and safety protocols required by state regulations.',
              },
              {
                title: 'Client Service Skills',
                description: 'Develop consultation skills and build lasting client relationships.',
              },
              {
                title: 'Shop Operations',
                description: 'Understand how a barbershop runs, from scheduling to inventory management.',
              },
              {
                title: 'State Board Prep',
                description: 'Preparation to sit for the state barber licensing exam (written and practical).',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8 max-w-2xl mx-auto">
            Some apprentices may have opportunities for continued employment after completion, 
            depending on shop availability and performance.
          </p>
        </div>
      </section>

      {/* How the Apprenticeship Works */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How the Apprenticeship Works
            </h2>
            <p className="text-lg text-gray-400">
              A clear path from application to licensure eligibility.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Apply and Get Reviewed',
                  description: 'Submit your application. We review your eligibility and readiness for the program.',
                },
                {
                  step: '2',
                  title: 'Get Placed with a Licensed Barber',
                  description: 'If accepted, you are matched with a licensed barber employer who will supervise your training.',
                },
                {
                  step: '3',
                  title: 'Complete 2,000 Hours of Training',
                  description: 'Work in a real barbershop environment, learning hands-on under professional supervision.',
                },
                {
                  step: '4',
                  title: 'Hours Tracked and Verified',
                  description: 'Your training hours are documented and verified to meet state requirements.',
                },
                {
                  step: '5',
                  title: 'Pursue State Licensure',
                  description: 'Upon completion, you are eligible to sit for the state barber licensing exam.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-3">What a Typical Week Looks Like</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Training at a licensed barbershop during business hours</li>
                <li>• Supervised practice with real clients</li>
                <li>• Structured learning aligned with licensing requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Time Commitment */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
              Time Commitment & Schedule
            </h2>
            
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <p className="text-5xl font-bold text-orange-600 mb-2">2,000</p>
                <p className="text-xl text-gray-700">Total Apprenticeship Hours</p>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Schedule:</strong> Hours are completed over time while working in a 
                  barbershop setting. Weekly schedules vary by employer placement.
                </p>
                <p>
                  <strong>Duration:</strong> Most apprentices complete the program in 12-18 months, 
                  depending on weekly hours worked.
                </p>
                <p className="text-gray-600 italic">
                  This is a long-term training commitment, not a short course. Plan accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost & Funding */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
              Cost & Funding
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700 mb-6">
                This program may be available at low or no upfront cost through various funding sources.
              </p>

              <h3 className="font-semibold text-gray-900 mb-4">Funding may include:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Workforce or apprenticeship funding (when eligible)',
                  'Employer-supported training arrangements',
                  'Self-pay options, if applicable',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> Funding eligibility varies. Applying does not guarantee 
                  funding, but allows us to review your options and determine what you may qualify for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After You Apply */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
              What Happens After You Apply
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Application Review',
                  description: 'Your application is reviewed by our team for completeness and initial eligibility.',
                },
                {
                  step: '2',
                  title: 'Follow-Up Contact',
                  description: 'You may be contacted for additional information or documentation.',
                },
                {
                  step: '3',
                  title: 'Eligibility Evaluation',
                  description: 'We evaluate your eligibility for the program and available funding options.',
                },
                {
                  step: '4',
                  title: 'Decision & Next Steps',
                  description: 'You are notified of acceptance and provided with next steps for enrollment.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-gray-50 rounded-xl p-6">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <strong>Typical response time:</strong> Within 5-10 business days of application submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Disclosure */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 text-center max-w-3xl mx-auto">
            <strong>Important Disclosure:</strong> Licensing requirements are set by the state of Indiana. 
            Completion of apprenticeship hours supports eligibility but does not guarantee licensure. 
            Applicants must meet all state requirements, including passing written and practical examinations.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Path Toward Barber Licensure?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Applying does not obligate you. It allows us to review your eligibility and discuss next steps.
          </p>
          <Link
            href="/apply?program=barber-apprenticeship"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Apply for the Barber Apprenticeship
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
