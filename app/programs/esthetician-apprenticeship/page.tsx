// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { HostShopRequirements } from '@/components/compliance/HostShopRequirements';

export const metadata: Metadata = {
  title:
    'Registered Esthetician Apprenticeship | DOL Sponsorship & Oversight | Indiana',
  description:
    'DOL Registered Esthetician Apprenticeship sponsorship, oversight, and related instruction (Milady Theory) in Indiana. Federal apprenticeship sponsorship, employer coordination, compliance reporting. ETPL approved. This program does not grant esthetician licensure or clock hours toward state exams.',
  keywords:
    'esthetician apprenticeship Indiana, DOL registered apprenticeship, apprenticeship sponsorship, esthetician training Indianapolis, RAPIDS registered, ETPL approved, skincare apprenticeship',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/esthetician-apprenticeship',
  },
};

export default function EstheticianApprenticeshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px] min-h-[70vh] flex items-center bg-gradient-to-br from-teal-500 via-emerald-600 to-green-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
              DOL Registered
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
              Apprenticeship Sponsorship
            </span>
            <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
              ETPL Approved
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl text-white drop-shadow-2xl">
            Registered Esthetician Apprenticeship
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white leading-relaxed drop-shadow-lg">
            Registered Esthetician Apprenticeship Sponsorship, Oversight & Related Instruction (Milady Theory). 
            This program provides federal apprenticeship sponsorship, employer coordination, compliance reporting, and related instruction.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply?program=esthetician-apprenticeship"
              className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-8 py-4 text-lg font-bold text-white hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
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



      {/* Program Description */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Program Description</h2>
          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-8">
            <p className="text-lg text-black leading-relaxed">
              <strong>Registered Esthetician Apprenticeship Sponsorship, Oversight & Related Instruction (Milady Theory).</strong>
            </p>
            <p className="text-black mt-4 leading-relaxed">
              This program provides federal apprenticeship sponsorship, employer coordination, compliance reporting, and related instruction. 
              Practical skills training and licensure-required instructional hours are provided by a licensed esthetician school. 
              This program does not grant esthetician licensure or clock hours toward state exams.
            </p>
          </div>

          {/* Indiana Requirements */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Indiana Esthetician Requirements</h3>
            <ul className="space-y-2 text-blue-900">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span><strong>700 hours</strong> of esthetician training required</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Pass written and practical exams</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Licensed by <strong>Indiana Professional Licensing Agency (IPLA)</strong></span>
              </li>
            </ul>
          </div>

          {/* What's Included vs Not Included */}
          <div className="grid md:grid-cols-2 gap-6">
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
                  <span>Employer (spa/salon) coordination and OJT verification</span>
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

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                What the Program Fee Does NOT Cover
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Practical hands-on esthetician training</span>
                </li>
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>State licensure-required instructional hours</span>
                </li>
                <li className="flex items-start gap-3 text-red-900">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Esthetician school enrollment</span>
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
              <div className="text-5xl font-black text-teal-600">$3,480</div>
              <div className="text-xl text-slate-600 mt-2">Flat Program Fee</div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
              <p className="text-teal-900 text-center">
                <strong>The program fee applies regardless of transferred hours.</strong> Credit for prior learning may reduce the duration of participation but does not alter the program fee. The fee reflects apprenticeship sponsorship, compliance oversight, employer coordination, related instruction, and completion under the sponsor&apos;s registered apprenticeship program.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-black">Payment Options</h3>
              
              <Link
                href="/checkout/esthetician-apprenticeship?method=full"
                className="w-full flex items-center justify-between px-6 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">Pay in Full</div>
                  <div className="text-sm text-teal-200">One-time payment of $3,480</div>
                </div>
                <span className="text-2xl font-bold">$3,480</span>
              </Link>

              <Link
                href="/checkout/esthetician-apprenticeship?method=plan&months=4"
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-teal-300 hover:border-teal-500 text-black font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">4-Month Plan</div>
                  <div className="text-sm text-slate-600">4 payments of $870</div>
                </div>
                <span className="text-xl font-bold text-teal-600">$870/mo</span>
              </Link>

              <Link
                href="/checkout/esthetician-apprenticeship?method=plan&months=6"
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-teal-300 hover:border-teal-500 text-black font-bold rounded-lg transition-all"
              >
                <div>
                  <div className="font-bold text-lg">6-Month Plan</div>
                  <div className="text-sm text-slate-600">6 payments of $580</div>
                </div>
                <span className="text-xl font-bold text-teal-600">$580/mo</span>
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
                Does the $3,480 change if I transfer in hours?
              </h3>
              <p className="text-slate-700">
                No. The program fee is a flat rate. Transferred hours reduce time-in-program, not the scope of services or fee.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                Does this program replace esthetician school?
              </h3>
              <p className="text-slate-700">
                No. Apprentices must complete licensure-required instructional hours through a licensed esthetician school.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                What does the $3,480 cover?
              </h3>
              <p className="text-slate-700">
                Federal apprenticeship sponsorship, compliance reporting, employer coordination, Milady theory instruction, and program completion documentation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-2">
                How many hours are required for an Indiana esthetician license?
              </h3>
              <p className="text-slate-700">
                Indiana requires 700 hours of esthetician training to be eligible for licensure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Shop Requirements Section */}
      <HostShopRequirements 
        programTrack="esthetician" 
        showApprovalProcess={true}
        showMultiRegion={true}
      />

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Apply now to begin your journey in the Registered Esthetician Apprenticeship program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply?program=esthetician-apprenticeship"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-teal-600 hover:bg-teal-50 transition-all shadow-xl"
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

    </div>
  );
}
