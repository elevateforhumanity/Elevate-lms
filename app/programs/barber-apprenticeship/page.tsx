import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, Calendar, FileText, ChevronDown } from 'lucide-react';
import { OptimizedVideo } from '@/components/OptimizedVideo';
import { BARBER_PROGRAM, formatCurrency, formatHours, getWeeklyPaymentExamples } from '@/lib/programs/catalog';
import { BarberPageTour } from './BarberPageTour';
import { TransferHoursCalculator } from './TransferHoursCalculator';
import BarberChatAssistant from './BarberChatAssistant';

export const metadata: Metadata = {
  title: 'USDOL Registered Barber Apprenticeship | Elevate for Humanity | Indiana',
  description: 'DOL-registered barber apprenticeship. 2,000 hours paid training. $4,980 total. Weekly payments start after enrollment. Transfer existing hours.',
  keywords: 'barber apprenticeship Indiana, USDOL registered apprenticeship, barber training Indianapolis, RAPIDS registered',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

const program = BARBER_PROGRAM;
const pricing = program.pricing;
const weeklyExamples = getWeeklyPaymentExamples(pricing);

export default function BarberApprenticeshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BarberPageTour />
      <BarberChatAssistant />
      
      {/* SECTION A: HERO WITH VIDEO */}
      <section data-tour="barber-hero" className="relative w-full -mt-[72px] min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/video-7b329d1f-3f92-4ec5-acdf-9d2d7ff6de5f.mp4?Expires=2083752835&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=PwinNDJ~aDGbHoMI8-Hfr28QIj7s~0mwzn92P-muIHO0bW86~4gW6MzRyslLtk~TOzdfX8aTYA9OeGF-sbBPwCBUw8gTpXO6QvhwpJsFW5DiLHnEP6q6vCTvQ-jEpwV20izIuWVSpY-txGY7bDGHhkSq6-wP26b0J-lstFIMwxRHQjJ9rKmX9i4pzNruZJEQ2ILvO-LdWivm98j5TMLm09HgYzesifHFPPzUzNH7NlYwwvIO2-NtXWEuixrQFdJ2Zt4ocgdmqP9auvaeYr9hbS~F6k6CBybWLlnGoLggGkluqp1vFzt-eIslYgFKl8m4Du4UFJawNl3KmcyA9uTWtA__"
            poster="/images/programs-hq/barber-hero.jpg"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
              Apprenticeship
            </span>
            <span className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
              Paid Training
            </span>
            <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
              {formatHours(program.hours_total)} Hours
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
            {program.name}
            <span className="block text-2xl md:text-3xl font-bold text-purple-300 mt-2">({formatHours(program.hours_total)} Hours)</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mb-4 drop-shadow-lg">
            Earn while you learn. Structured pathway toward {program.credential} through a USDOL Registered Apprenticeship framework.
          </p>
          
          <p className="text-sm text-white/70 max-w-2xl mb-8">
            {program.administrator_statement}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Link
              href="/enroll/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Enrollment & Pay →
            </Link>
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white hover:bg-purple-700 transition-all shadow-xl"
            >
              Inquiry / Check Eligibility
            </Link>
            <Link
              href="/partner/onboarding"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all shadow-xl"
            >
              Partner Shop Sign-Up
            </Link>
          </div>
          
          {/* App Download Links */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pwa/barber"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Apprentice App
            </Link>
            <Link
              href="/pwa/shop-owner"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Shop Owner App
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION B: AT-A-GLANCE CARDS */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{formatHours(program.hours_total)}</div>
              <div className="text-sm text-slate-600">Total Hours</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{formatCurrency(pricing.full_price)}</div>
              <div className="text-sm text-slate-600">Program Cost</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{formatCurrency(pricing.setup_fee_amount)}</div>
              <div className="text-sm text-slate-600">Setup Fee (35%)</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
              <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">Weekly</div>
              <div className="text-sm text-slate-600">Billed {pricing.billing_day}s</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: PROGRAM OVERVIEW */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Program Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-3">Who It's For</h3>
              <p className="text-slate-600">
                Adults seeking a career in barbering. Career changers, re-entry participants, and anyone ready to earn while learning a skilled trade.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-3">What You'll Do</h3>
              <p className="text-slate-600">
                Complete {formatHours(program.ojt_hours)} hours of on-the-job training at a partner barbershop plus {program.related_instruction_hours} hours of related instruction (Milady theory curriculum).
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-3">Credential/Outcome</h3>
              <p className="text-slate-600">
                {program.credential_full}. Career earnings: {program.career_outcome_range}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: HOW THE APPRENTICESHIP WORKS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How the Apprenticeship Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">On-the-Job Training</h3>
                <p className="text-slate-600">
                  {formatHours(program.ojt_hours)} hours of hands-on training at an approved partner barbershop. Learn fades, tapers, razor work, and client service under supervision.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Related Instruction</h3>
                <p className="text-slate-600">
                  {program.related_instruction_hours} hours of Milady theory curriculum covering sanitation, anatomy, chemistry, and business practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Supervision & Mentorship</h3>
                <p className="text-slate-600">
                  Work under licensed barbers who guide your development. Elevate handles compliance, RAPIDS reporting, and hour verification.
                </p>
              </div>
            </div>
            <div data-tour="barber-transfer" className="flex gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Transfer Hours</h3>
                <p className="text-slate-600">
                  Already have documented barber training hours? Transfer them in. Weekly payments may change based on remaining hours—setup fee stays {formatCurrency(pricing.setup_fee_amount)}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: PRICING & PAYMENT PLAN */}
      <section id="pricing" data-tour="barber-pricing" className="py-16 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Pricing & Payment Plan</h2>
            <p className="text-slate-300 text-lg">Transparent pricing with flexible weekly payments</p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center border-4 border-purple-500">
              <div className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">Full Program Price</div>
              <div className="text-5xl font-black text-slate-900">{formatCurrency(pricing.full_price)}</div>
              <div className="text-slate-500 mt-2 text-sm">(non-negotiable)</div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-center text-white">
              <div className="text-sm font-bold text-purple-200 uppercase tracking-wide mb-2">Enrollment Setup Fee (35%)</div>
              <div className="text-5xl font-black">{formatCurrency(pricing.setup_fee_amount)}</div>
              <div className="text-purple-200 mt-2 text-sm">Due at enrollment</div>
              <div className="mt-4 pt-4 border-t border-purple-400/30">
                <p className="text-purple-100 text-xs">
                  Covers onboarding, registration, employer coordination, and program setup.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">Weekly Payments</div>
              <div className="text-4xl font-black text-slate-900">From $40<span className="text-2xl">/week</span></div>
              <div className="text-slate-500 mt-2 text-sm">(estimate)</div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-slate-600 text-xs">
                  Final weekly amount depends on your remaining hours and schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="bg-slate-800 rounded-xl p-4 text-center mb-8">
            <p className="text-slate-300 text-sm">
              <span className="text-white font-semibold">Setup fee</span> is due at enrollment. 
              <span className="text-white font-semibold"> Weekly payments</span> are billed every 
              <span className="text-green-400 font-bold"> {pricing.billing_day}</span>, starting the {pricing.first_charge_rule}.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Transferred hours may change weekly payments, but setup fee remains <span className="text-purple-400 font-bold">{formatCurrency(pricing.setup_fee_amount)}</span>.
            </p>
          </div>

          {/* Weekly Payment Examples */}
          <div className="bg-white rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Estimated Weekly Payments</h3>
            <p className="text-slate-500 text-sm text-center mb-6">Based on remaining balance of {formatCurrency(pricing.remaining_balance)} (no transferred hours)</p>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {weeklyExamples.map((example) => (
                <div key={example.hoursPerWeek} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-slate-500 mb-1">{example.hoursPerWeek} hrs/week</div>
                  <div className="text-2xl font-black text-slate-900">{example.weekly}</div>
                  <div className="text-xs text-slate-400">~{example.weeks} weeks</div>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Hours Calculator */}
          <TransferHoursCalculator />
        </div>
      </section>

      {/* SECTION F: ENROLLMENT STEPS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How to Enroll</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Check Eligibility', desc: 'Complete a brief application to verify you meet program requirements.' },
              { step: 2, title: 'Pay Setup Fee', desc: `Pay the ${formatCurrency(pricing.setup_fee_amount)} enrollment setup fee to secure your spot.` },
              { step: 3, title: 'Match with Shop', desc: 'Get matched with an approved partner barbershop in your area.' },
              { step: 4, title: 'Begin Training', desc: 'Start your apprenticeship and begin earning while you learn.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enroll/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white hover:bg-green-700 transition-all"
            >
              Start Enrollment & Pay →
            </Link>
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white hover:bg-purple-700 transition-all"
            >
              Inquiry / Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION G: PARTNER SHOP SECTION */}
      <section data-tour="barber-partner" className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full mb-4">
              For Barbershop Owners
            </span>
            <h2 className="text-3xl font-bold mb-4">Host an Apprentice at Your Shop</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Indiana barbershops can become worksite partners and help train the next generation of licensed barbers.
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Partner Shop Requirements</h3>
            <ul className="space-y-3">
              {[
                'Valid Indiana barber shop/establishment license',
                'At least one licensed barber on staff to supervise',
                'Signed Partner MOU with Elevate for Humanity',
                'IRS W-9 on file',
                'Proof of liability insurance (COI)',
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/partner/onboarding"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-bold text-white transition-all"
            >
              Partner Shop Sign-Up
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION H: FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'When do weekly payments start?',
                a: `Weekly payments begin on the ${pricing.first_charge_rule}. The setup fee (${formatCurrency(pricing.setup_fee_amount)}) is due at enrollment.`,
              },
              {
                q: 'Can I transfer hours from previous training?',
                a: 'Yes. If you have documented barber training hours, they can be transferred. This may reduce your weekly payment amount, but the setup fee remains the same.',
              },
              {
                q: 'What does the setup fee cover?',
                a: 'The setup fee covers onboarding, USDOL registration support, employer coordination, compliance tracking, and program administration.',
              },
              {
                q: 'Who supervises me during training?',
                a: 'You work under licensed barbers at your assigned partner shop. Elevate handles compliance, RAPIDS reporting, and hour verification.',
              },
              {
                q: `Does the ${formatCurrency(pricing.full_price)} change if I transfer hours?`,
                a: 'No. The program fee is a flat rate. Transferred hours reduce time-in-program, not the scope of services or fee.',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-bold text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-between">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 py-4 border-t border-slate-200 text-slate-700">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-purple-600">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 text-lg mb-8">
            Enroll in the USDOL Registered Barber Apprenticeship program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enroll/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white hover:bg-green-600 transition-all"
            >
              Start Enrollment & Pay →
            </Link>
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-purple-600 hover:bg-purple-50 transition-all"
            >
              Inquiry / Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
