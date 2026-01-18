import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Award,
  DollarSign,
  Briefcase,
  CheckCircle,
  XCircle,
  ArrowRight,
  FileText,
  Users,
  Calendar,
  Shield,
} from 'lucide-react';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | 2,000-Hour Paid Training | Elevate for Humanity',
  description:
    'Become a licensed barber through a 2,000-hour paid apprenticeship. Train under licensed barbers, earn hours toward state licensure, and gain real experience without tuition debt.',
  keywords: [
    'barber apprenticeship',
    'barber license',
    'barber training',
    '2000 hour apprenticeship',
    'Indiana barber license',
    'paid barber training',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  return (
    <div className="bg-white">
      {/* ============================================ */}
      {/* 1. HERO SECTION - Clarity first, zero hype */}
      {/* ============================================ */}
      <section className="relative min-h-[500px] flex items-center">
        <Image
          src="/images/programs/barber.jpg"
          alt="Barber apprentice training"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <Link href="/programs" className="text-zinc-400 hover:text-white">
                Programs
              </Link>
              <span className="text-zinc-600 mx-2">/</span>
              <span className="text-white">Barber Apprenticeship</span>
            </nav>

            {/* Headline - one sentence, no buzzwords */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Become a Licensed Barber Through a 2,000-Hour Paid Apprenticeship
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Train under licensed barbers, earn hours toward state licensure,
              and gain real on-the-job experience without traditional tuition
              debt.
            </p>

            {/* Key facts row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-6 h-6 text-amber-400 mb-2" />
                <div className="text-white font-bold">2,000 Hours</div>
                <div className="text-zinc-400 text-sm">Apprenticeship</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Briefcase className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-white font-bold">On-the-Job</div>
                <div className="text-zinc-400 text-sm">Training Format</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="w-6 h-6 text-green-400 mb-2" />
                <div className="text-white font-bold">State License</div>
                <div className="text-zinc-400 text-sm">Eligibility</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <DollarSign className="w-6 h-6 text-emerald-400 mb-2" />
                <div className="text-white font-bold">Funded</div>
                <div className="text-zinc-400 text-sm">Options Available</div>
              </div>
            </div>

            {/* Primary CTA */}
            <Link
              href="/apply?program=barber-apprenticeship"
              className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-zinc-100 transition-colors"
            >
              Start Eligibility & Choose This Career Path
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. WHO THIS IS FOR / NOT FOR - Trust builder */}
      {/* ============================================ */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-12">
            Is This Program Right for You?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* This program IS for */}
            <div className="bg-white rounded-xl p-8 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  This program is for:
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Adults seeking a state barber license',
                  'Individuals who learn best through hands-on training',
                  'People interested in working in a licensed barbershop environment',
                  'Applicants ready for a long-term commitment (2,000 hours)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* This program is NOT for */}
            <div className="bg-white rounded-xl p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  This program is NOT for:
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'People looking for a short-term course',
                  'Anyone unwilling to work under supervision',
                  'Those who want fully online training',
                  'Hobbyists not pursuing licensure',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. WHAT YOU WILL GAIN - Outcomes, not curriculum */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            What You Will Gain
          </h2>
          <p className="text-lg text-zinc-600 mb-10">
            By completing the apprenticeship, you gain:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">
                    2,000 Verified Hours
                  </h3>
                  <p className="text-zinc-600">
                    Accumulated and documented hours toward state licensure
                    requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">
                    Hands-On Experience
                  </h3>
                  <ul className="text-zinc-600 space-y-1">
                    <li>• Hair cutting and styling</li>
                    <li>• Sanitation and safety procedures</li>
                    <li>• Client service and shop operations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">
                    Exam Preparation
                  </h3>
                  <p className="text-zinc-600">
                    Preparation to sit for the state barber licensing exam.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">Work History</h3>
                  <p className="text-zinc-600">
                    Documented work history with a licensed employer. Some
                    apprentices may have opportunities for continued employment
                    after completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. HOW THE APPRENTICESHIP WORKS - Plain language */}
      {/* ============================================ */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            How the Apprenticeship Works
          </h2>
          <p className="text-zinc-400 mb-10">
            This is a registered apprenticeship-style model:
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {[
              { step: 1, text: 'You apply and are reviewed for eligibility' },
              {
                step: 2,
                text: 'If accepted, you are placed with a licensed barber employer',
              },
              {
                step: 3,
                text: 'You complete 2,000 hours of supervised, on-the-job training',
              },
              { step: 4, text: 'Hours are tracked and verified' },
              {
                step: 5,
                text: 'Upon completion, you are eligible to pursue state licensure',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-zinc-900 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-sm text-zinc-300">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Typical week */}
          <div className="bg-zinc-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">
              What a typical week looks like:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Training at a licensed barbershop</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Supervised practice with real clients</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>
                  Structured learning aligned with licensing requirements
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. TIME COMMITMENT & SCHEDULE - No surprises */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">
                Time Commitment & Schedule
              </h2>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
                <div className="text-3xl font-bold text-zinc-900 mb-1">
                  2,000 Hours
                </div>
                <div className="text-zinc-600">Total apprenticeship requirement</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-zinc-400 mt-1" />
                  <p className="text-zinc-700">
                    Hours are completed over time while working in a barbershop
                    setting.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-zinc-400 mt-1" />
                  <p className="text-zinc-700">
                    Weekly schedules vary by employer placement.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-zinc-400 mt-1" />
                  <p className="text-zinc-700">
                    This is a long-term training commitment, not a short course.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-100 rounded-xl p-8">
              <h3 className="font-bold text-zinc-900 mb-4">
                Typical Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-zinc-200">
                  <span className="text-zinc-600">Full-time (40 hrs/week)</span>
                  <span className="font-bold text-zinc-900">~12 months</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-200">
                  <span className="text-zinc-600">Part-time (25 hrs/week)</span>
                  <span className="font-bold text-zinc-900">~18 months</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-600">Flexible schedule</span>
                  <span className="font-bold text-zinc-900">18-24 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. COST & FUNDING - Plain English only */}
      {/* ============================================ */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">
            Cost & Funding
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-zinc-200">
              <DollarSign className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Cost</h3>
              <p className="text-zinc-700">
                This program may be available at low or no upfront cost through
                funding sources.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-zinc-200">
              <Shield className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Funding may include:
              </h3>
              <ul className="space-y-2 text-zinc-700">
                <li>• Workforce or apprenticeship funding (when eligible)</li>
                <li>• Employer-supported training arrangements</li>
                <li>• Self-pay options, if applicable</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-zinc-800">
              <strong>Important:</strong> Funding eligibility varies. Applying
              does not guarantee funding, but allows us to review options with
              you.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. WHAT HAPPENS AFTER YOU APPLY - Anxiety reducer */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-10">
            What Happens After You Apply
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Application Review',
                desc: 'Your application is reviewed by our team.',
              },
              {
                step: 2,
                title: 'Contact',
                desc: 'You may be contacted for next steps or documentation.',
              },
              {
                step: 3,
                title: 'Eligibility Check',
                desc: 'Eligibility and placement options are evaluated.',
              },
              {
                step: 4,
                title: 'Decision',
                desc: 'You are notified of acceptance or next actions.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-zinc-600">
              <strong>Typical response timeframe:</strong> Within 5–10 business
              days
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. COMPLIANCE & DISCLOSURE - Keep it clean */}
      {/* ============================================ */}
      <section className="py-12 bg-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PathwayDisclosure variant="full" className="mb-6" />
          <p className="text-sm text-zinc-600 text-center">
            <strong>Licensing disclosure:</strong> Licensing requirements are
            set by the state. Completion of apprenticeship hours supports
            eligibility but does not guarantee licensure. Applicants must meet
            all state requirements.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* 9. FINAL CTA SECTION - One action only */}
      {/* ============================================ */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to start your path toward barber licensure?
          </h2>

          <Link
            href="/apply?program=barber-apprenticeship"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 px-10 py-5 rounded-lg font-bold text-lg hover:bg-zinc-100 transition-colors"
          >
            Start Eligibility & Choose This Career Path
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-6 text-zinc-400 text-sm max-w-xl mx-auto">
            This program is part of the Elevate for Humanity Career Pathway and begins after eligibility determination. 
            Enrollment is contingent upon eligibility, funding availability, and employer participation.
          </p>
        </div>
      </section>
    </div>
  );
}
