// @ts-nocheck
import { CredentialsOutcomes } from '@/components/programs/CredentialsOutcomes';
import { OptimizedVideo } from '@/components/OptimizedVideo';
import PageAvatar from '@/components/PageAvatar';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { HostShopRequirements } from '@/components/compliance/HostShopRequirements';
import { BARBER_PROGRAM } from '@/lib/program-constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'USDOL Registered Barber Apprenticeship | Elevate for Humanity | Indiana',
  description:
    'Fee-based barber training within a USDOL Registered Apprenticeship framework. Elevate for Humanity is the Sponsor of Record. Structured practical training with required related instruction.',
  keywords:
    'barber apprenticeship Indiana, USDOL registered apprenticeship, barber training Indianapolis, RAPIDS registered, sponsor of record',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default async function BarberApprenticeshipPage() {
  const supabase = await createClient();
  
  // Fetch barber apprenticeship program
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', 'barber-apprenticeship')
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Programs', href: '/programs' }, { label: 'Apprenticeships', href: '/apprenticeships' }, { label: 'Barber Apprenticeship' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/video-7b329d1f-3f92-4ec5-acdf-9d2d7ff6de5f.mp4?Expires=2083752835&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=PwinNDJ~aDGbHoMI8-Hfr28QIj7s~0mwzn92P-muIHO0bW86~4gW6MzRyslLtk~TOzdfX8aTYA9OeGF-sbBPwCBUw8gTpXO6QvhwpJsFW5DiLHnEP6q6vCTvQ-jEpwV20izIuWVSpY-txGY7bDGHhkSq6-wP26b0J-lstFIMwxRHQjJ9rKmX9i4pzNruZJEQ2ILvO-LdWivm98j5TMLm09HgYzesifHFPPzUzNH7NlYwwvIO2-NtXWEuixrQFdJ2Zt4ocgdmqP9auvaeYr9hbS~F6k6CBybWLlnGoLggGkluqp1vFzt-eIslYgFKl8m4Du4UFJawNl3KmcyA9uTWtA__"
            poster="/hero-images/barber-hero.jpg"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg">
              USDOL Registered
            </span>
            <span className="px-3 py-2 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
              Sponsor of Record
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl text-white drop-shadow-2xl">
            USDOL Registered Barber Apprenticeship
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white leading-relaxed drop-shadow-lg">
            Fee-based barber training delivered within a USDOL Registered Apprenticeship framework.
            Elevate for Humanity is the Sponsor of Record for this program, which combines structured practical training with required related instruction.
          </p>

          {/* Mobile Contact Buttons - Always visible on mobile */}
          <div className="mt-6 flex gap-3 sm:hidden">
            <a
              href="tel:317-314-3757"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 text-base font-bold text-white shadow-xl"
            >
              📞 Call Now
            </a>
            <a
              href="sms:317-314-3757"
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-base font-bold text-white shadow-xl"
            >
              💬 Text Us
            </a>
          </div>

          <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/forms/barber-apprenticeship-inquiry"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-gray-900 hover:bg-gray-100 transition-all shadow-xl"
            >
              General Inquiry
            </Link>
            <Link
              href="/enroll/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-8 py-4 text-lg font-bold text-white hover:bg-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Enroll in Student Portal
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all shadow-xl"
            >
              View Tuition & Fees
            </Link>
          </div>
        </div>
      </section>

      {/* Avatar Guide */}
      <PageAvatar videoSrc="/videos/avatars/barber-guide.mp4" title="Barber Apprenticeship Guide" />

      {/* Program Description */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Program Description</h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-lg text-black leading-relaxed">
              <strong>Fee-based barber training delivered within a USDOL Registered Apprenticeship framework.</strong>
            </p>
            <p className="text-black mt-4 leading-relaxed">
              Elevate for Humanity is the Sponsor of Record for this program, which combines structured practical training with required related instruction.
              Practical skills training is provided at approved partner training sites. Related instruction includes Milady theory curriculum.
            </p>
          </div>

          {/* What's Included */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              What the Program Fee Covers
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-green-900">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Structured training as USDOL Sponsor of Record</span>
              </li>
              <li className="flex items-start gap-3 text-green-900">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Related instruction (Milady theory curriculum)</span>
              </li>
              <li className="flex items-start gap-3 text-green-900">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Program administration and compliance tracking</span>
              </li>
              <li className="flex items-start gap-3 text-green-900">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Training site coordination and hour verification</span>
              </li>
              <li className="flex items-start gap-3 text-green-900">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Completion documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Program Cost & Payment</h2>
          
          <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-purple-600">{BARBER_PROGRAM.tuitionFormatted}</div>
              <div className="text-xl text-slate-600 mt-2">Program Tuition</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <p className="text-purple-900">
                This Barber Program is a fee-based USDOL Registered Apprenticeship training pathway. Tuition is paid by the student and is not funded by the State of Indiana.
              </p>
              <p className="text-purple-900 mt-3">
                Tuition covers structured training, related instruction, program administration, compliance tracking, and completion documentation delivered by Elevate for Humanity as the Sponsor of Record.
              </p>
              <p className="text-purple-800 mt-3 text-sm">
                Tuition does not include personal tools, uniforms, or state licensing and examination fees.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-black">Payment Options (after enrollment approval)</h3>
              
              <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 text-gray-700 rounded-lg">
                <div>
                  <div className="font-bold text-lg">Pay in Full</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
                <span className="text-2xl font-bold">{BARBER_PROGRAM.tuitionFormatted}</span>
              </div>

              <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 text-gray-700 rounded-lg">
                <div>
                  <div className="font-bold text-lg">4-Month Plan</div>
                  <div className="text-sm text-gray-500">4 payments of $1,245</div>
                </div>
                <span className="text-xl font-bold">$1,245/mo</span>
              </div>

              <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 text-gray-700 rounded-lg">
                <div>
                  <div className="font-bold text-lg">6-Month Plan</div>
                  <div className="text-sm text-gray-500">6 payments of $830</div>
                </div>
                <span className="text-xl font-bold">$830/mo</span>
              </div>

              <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 text-gray-700 rounded-lg">
                <div>
                  <div className="font-bold text-lg">12-Month Plan</div>
                  <div className="text-sm text-gray-500">12 payments of $415</div>
                </div>
                <span className="text-xl font-bold">$415/mo</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>How to Enroll:</strong> Submit an application and speak with an enrollment advisor. 
                  Payment is collected after your enrollment is approved and you've signed your enrollment agreement.
                </p>
              </div>

              <Link
                href="/forms/barber-apprenticeship-inquiry"
                className="w-full flex items-center justify-center px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all text-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Licensure & State Requirements */}
      <section className="bg-amber-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Licensure & State Requirements</h2>
          <p className="text-amber-900 leading-relaxed">
            This program operates within a USDOL Registered Apprenticeship framework. Completion supports eligibility to apply for barber licensure; however, licensure approval, examination requirements, and fees are governed by the Indiana Professional Licensing Agency and applicable state law. Completion of this program does not guarantee licensure.
          </p>
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

      {/* How Placement Works */}
      <section className="py-8 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border-2 border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-900 font-medium">
              Apprentices complete training hours inside an approved host barbershop. Host shops must be approved before apprentice placement.
            </p>
            <Link
              href="/programs/barber-apprenticeship/host-shops"
              className="inline-block mt-4 text-amber-700 font-medium hover:underline"
            >
              Learn about becoming a host shop →
            </Link>
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
                    Practical training at a licensed barber shop
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

      {/* Registration Details Accordion */}
      <section className="py-12 bg-slate-100">
        <div className="mx-auto max-w-4xl px-6">
          <details className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="px-6 py-4 cursor-pointer font-bold text-black hover:bg-slate-50 transition-colors">
              Registration Details (USDOL)
            </summary>
            <div className="px-6 py-4 border-t border-slate-200 text-slate-700 space-y-3">
              <p>
                Elevate for Humanity is the program brand operated by 2Exclusive LLC, the USDOL Registered Apprenticeship Sponsor of Record.
              </p>
              <p>
                Registration documentation (including sponsor details and program registration information) is available upon request for procurement, compliance, or partner onboarding purposes.
              </p>
              <p>
                This program is fee-based and not funded by the State of Indiana. Wages and employment terms, if applicable, are governed by host sites and applicable labor laws and are not administered through Elevate.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Credentials & Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <CredentialsOutcomes
            programName="Barber Apprenticeship"
            partnerCertifications={[
              'Indiana Barber License (issued by Indiana Professional Licensing Agency)',
              'USDOL Registered Apprenticeship Certificate of Completion',
            ]}
            employmentOutcomes={[
              'Licensed Barber',
              'Barbershop Owner/Operator',
              'Master Barber',
              'Barber Instructor',
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 text-lg mb-8">
            Enroll in the USDOL Registered Barber Apprenticeship program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/forms/barber-apprenticeship-inquiry"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all"
            >
              General Inquiry
            </Link>
            <Link
              href="/enroll/barber-apprenticeship"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-bold text-purple-600 hover:bg-purple-50 transition-all shadow-xl"
            >
              Enroll in Student Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
