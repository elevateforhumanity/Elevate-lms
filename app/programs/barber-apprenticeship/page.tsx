// @ts-nocheck
import { OptimizedVideo } from '@/components/OptimizedVideo';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { HostShopRequirements } from '@/components/compliance/HostShopRequirements';

export const metadata: Metadata = {
  title:
    'Registered Barber Apprenticeship | DOL Sponsorship & Oversight | Indianapolis',
  description:
    'DOL Registered Barber Apprenticeship sponsorship, oversight, and related instruction (Milady Theory). Federal apprenticeship sponsorship, employer coordination, compliance reporting. This program does not grant barber licensure or clock hours toward state exams.',
  keywords:
    'barber apprenticeship Indiana, DOL registered apprenticeship, apprenticeship sponsorship, barber training Indianapolis, RAPIDS registered, apprenticeship oversight',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px] min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src="/videos/barber-hero-final.mp4"
            poster="/hero-images/barber-hero.jpg"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
              DOL Registered
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
              Apprenticeship Sponsorship
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl text-white drop-shadow-2xl">
            Registered Barber Apprenticeship
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white leading-relaxed drop-shadow-lg">
            Registered Barber Apprenticeship Sponsorship, Oversight & Related Instruction (Milady Theory). 
            This program provides federal apprenticeship sponsorship, employer coordination, compliance reporting, and related instruction.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/programs/barber-apprenticeship/apply"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all shadow-xl"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* REQUIRED DISCLAIMER - PROMINENT */}
      <section className="bg-amber-50 border-y-4 border-amber-400 py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h2>
              <p className="text-amber-900 font-medium">
                This program is not a barber school and does not issue state licensure hours. 
                Enrollment requires concurrent or subsequent participation in a licensed barber school for state licensure eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Description */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Program Description</h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-lg text-black leading-relaxed">
              <strong>Registered Barber Apprenticeship Sponsorship, Oversight & Related Instruction (Milady Theory).</strong>
            </p>
            <p className="text-black mt-4 leading-relaxed">
              This program provides federal apprenticeship sponsorship, employer coordination, compliance reporting, and related instruction. 
              Practical skills training and licensure-required instructional hours are provided by a licensed barber school. 
              This program does not grant barber licensure or clock hours toward state exams.
            </p>
          </div>

          {/* What's Included vs Not Included */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Included */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                What the Program Fee Covers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-green-900">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>DOL Registered Apprenticeship sponsorship</span>
                </li>
                <li className="flex items-start gap-3 text-green-900">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Compliance and RAPIDS reporting</span>
                </li>
                <li className="flex items-start gap-3 text-green-900">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Employer (barbershop) coordination and OJT verification</span>
                </li>
                <li className="flex items-start gap-3 text-green-900">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Program monitoring and completion documentation</span>
                </li>
                <li className="flex items-start gap-3 text-green-900">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Related Instruction: Milady theory curriculum</span>
                </li>
              </ul>
            </div>

            {/* Not Included */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                What the Program Fee Does NOT Cover
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Practical hands-on barber skills training</span>
                </li>
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>State licensure-required instructional hours</span>
                </li>
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Barber school enrollment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Program Fee</h2>
          
          <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-purple-600">$4,980</div>
              <div className="text-xl text-slate-600 mt-2">Flat Program Fee</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <p className="text-purple-900 text-center">
                <strong>The program fee applies regardless of transferred hours.</strong> Credit for prior learning may reduce the duration of participation but does not alter the program fee. The fee reflects apprenticeship sponsorship, compliance oversight, employer coordination, related instruction, and completion under the sponsor&apos;s registered apprenticeship program.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-black">Payment Options</h3>
              
              <Link
                href="/checkout/barber-apprenticeship?method=full"
                className="w-full flex items-center justify-between px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">Pay in Full</div>
                  <div className="text-sm text-purple-200">One-time payment of $4,980</div>
                </div>
                <span className="text-2xl font-bold">$4,980</span>
              </Link>

              <Link
                href="/checkout/barber-apprenticeship?method=plan&months=4"
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-purple-300 hover:border-purple-500 text-black font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">4-Month Plan</div>
                  <div className="text-sm text-slate-600">4 payments of $1,245</div>
                </div>
                <span className="text-xl font-bold text-purple-600">$1,245/mo</span>
              </Link>

              <Link
                href="/checkout/barber-apprenticeship?method=plan&months=6"
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-purple-300 hover:border-purple-500 text-black font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">6-Month Plan</div>
                  <div className="text-sm text-slate-600">6 payments of $830</div>
                </div>
                <span className="text-xl font-bold text-purple-600">$830/mo</span>
              </Link>

              <Link
                href="/checkout/barber-apprenticeship?method=plan&months=12"
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-purple-300 hover:border-purple-500 text-black font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">12-Month Plan</div>
                  <div className="text-sm text-slate-600">12 payments of $415</div>
                </div>
                <span className="text-xl font-bold text-purple-600">$415/mo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                Does the $4,980 change if I transfer in hours?
              </h3>
              <p className="text-slate-700">
                No. The program fee is a flat rate. Transferred hours reduce time-in-program, not the scope of services or fee.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                Does this program replace barber school?
              </h3>
              <p className="text-slate-700">
                No. Apprentices must complete licensure-required instructional hours through a licensed barber school.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                What does the $4,980 cover?
              </h3>
              <p className="text-slate-700">
                Federal apprenticeship sponsorship, compliance reporting, employer coordination, Milady theory instruction, and program completion documentation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                What is a Registered Apprenticeship?
              </h3>
              <p className="text-slate-700">
                A Registered Apprenticeship is a structured talent development strategy approved by the U.S. Department of Labor that combines on-the-job learning, classroom instruction (related technical instruction), and mentorship. Upon completion, participants receive a nationally-recognized credential.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                How do I get my barber license?
              </h3>
              <p className="text-slate-700">
                To obtain an Indiana barber license, you must complete the required instructional hours at a licensed barber school, complete the apprenticeship program, and pass the state licensing examination administered by the Indiana Professional Licensing Agency (IPLA).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Registered Apprenticeship */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            What is a Registered Apprenticeship?
          </h2>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <p className="text-lg text-black mb-4">
              A <strong>Registered Apprenticeship</strong> is a structured
              talent development strategy approved by the U.S. Department of
              Labor that combines:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">
                    On-the-Job Learning
                  </h3>
                  <p className="text-sm text-black">
                    Paid work at a licensed barber shop
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">
                    Related Instruction
                  </h3>
                  <p className="text-sm text-black">
                    Milady theory curriculum
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Mentorship</h3>
                  <p className="text-sm text-black">
                    Guidance from licensed barbers
                  </p>
                </div>
              </div>
            </div>
            <p className="text-black">
              Upon completion, you receive a <strong>nationally-recognized credential</strong> from the U.S. Department of Labor.
            </p>
          </div>
        </div>
      </section>

      {/* Host Shop Requirements Section */}
      <HostShopRequirements 
        programTrack="barber" 
        showApprovalProcess={true}
        showMultiRegion={true}
      />

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 text-lg mb-8">
            Apply now to begin your journey in the Registered Barber Apprenticeship program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs/barber-apprenticeship/apply"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-purple-600 hover:bg-purple-50 transition-all shadow-xl"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Final Disclaimer */}
      <section className="bg-slate-100 py-8">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm text-slate-600 text-center">
            <strong>Disclaimer:</strong> This program is not a barber school and does not issue state licensure hours. 
            Enrollment requires concurrent or subsequent participation in a licensed barber school for state licensure eligibility. 
            The program fee of $4,980 is a flat rate regardless of transferred hours.
          </p>
        </div>
      </section>
    </div>
  );
}
