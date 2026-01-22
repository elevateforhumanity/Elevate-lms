import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Play, CheckCircle2, FileText, UserCheck, GraduationCap, Award, ExternalLink, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Core Infrastructure Demo | Elevate for Humanity',
  description: 'See how one person operates intake, enrollment, learning, and credential issuance without staff.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/demo/core',
  },
};

const demoSteps = [
  {
    step: 1,
    title: 'Learner Application',
    description: 'Learner submits application through intake form. Eligibility screening runs automatically.',
    icon: FileText,
    detail: 'No manual review required. System checks funding eligibility (WIOA/WRG/JRI) and flags missing documents.',
  },
  {
    step: 2,
    title: 'Admin Dashboard',
    description: 'Application status changes automatically. Missing document flags appear without manual tracking.',
    icon: UserCheck,
    detail: 'Admin sees real-time status. No spreadsheets. No email chains. Every action logged.',
  },
  {
    step: 3,
    title: 'Enrollment Activation',
    description: 'System routes learner to funded or self-pay path based on eligibility determination.',
    icon: CheckCircle2,
    detail: 'Funding pathway logic is deterministic. No guesswork. Audit trail captures every decision.',
  },
  {
    step: 4,
    title: 'Learning Progress',
    description: 'Learner progresses through courses. Progress tracked automatically.',
    icon: GraduationCap,
    detail: 'Completion percentages, time-on-task, and milestones recorded without manual entry.',
  },
  {
    step: 5,
    title: 'Credential Issuance',
    description: 'Certificate generated automatically upon program completion.',
    icon: Award,
    detail: 'No manual certificate creation. Credential includes verification link and completion data.',
  },
  {
    step: 6,
    title: 'Public Verification',
    description: 'Employers and partners verify credentials via public verification link.',
    icon: ExternalLink,
    detail: 'Third parties confirm credential authenticity without contacting your organization.',
  },
];

export default function CoreDemoPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/store" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Licenses
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">CORE LICENSE</span>
            <span className="text-slate-400">$750/month</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            Run a Workforce Program Without Staff
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            This demo shows how a single operator runs intake, enrollment, learning, and credential issuance without staff. 
            Every status change you see is rule-based and logged.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              6–8 minutes
            </span>
            <span>•</span>
            <span>For solo operators, pilots, small institutions</span>
          </div>
        </div>
      </section>

      {/* Demo Video Placeholder */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-900/80" />
            <div className="relative text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-white font-semibold">Watch Core Infrastructure Demo</p>
              <p className="text-slate-400 text-sm mt-1">6–8 minutes</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            This demo reflects the live production system.
          </p>
        </div>
      </section>

      {/* Demo Flow */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-4">Demo Flow</h2>
          <p className="text-center text-gray-600 mb-12">What you'll see in this walkthrough</p>
          
          <div className="space-y-6">
            {demoSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-blue-600">STEP {step.step}</span>
                      <h3 className="font-bold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-2">{step.description}</p>
                    <p className="text-sm text-gray-500">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What This Replaces */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold mb-4">What This Replaces</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Everything you just saw replaces <strong>admissions intake</strong>, <strong>basic compliance tracking</strong>, 
            and <strong>certificate handling</strong>. No emails, no spreadsheets, no manual follow-ups.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Activate Core Infrastructure?</h2>
          <p className="text-blue-100 mb-8">
            $750/month • Up to 100 learners • Up to 3 programs • Cancel anytime
          </p>
          <Link
            href="/store/checkout?license=core"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Activate Core Infrastructure
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
