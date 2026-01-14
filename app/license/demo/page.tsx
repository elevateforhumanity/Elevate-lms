import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Settings, Building2, Calendar, ArrowRight, Video, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Platform Demo | Elevate LMS Licensing',
  description: 'Explore the Elevate LMS through guided demos. Learner experience, admin dashboard, and employer portal views available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license/demo',
  },
};

const demoTracks = [
  {
    id: 'learner',
    title: 'Learner Experience',
    icon: GraduationCap,
    color: 'blue',
    href: ROUTES.demoLearner,
    description: 'See how participants navigate programs, track progress, and access support.',
    agenda: [
      'Program dashboard and course navigation',
      'Progress tracking and completion',
      'Funding pathway information',
      'Support resources and mentorship',
    ],
  },
  {
    id: 'admin',
    title: 'Admin / Program Manager',
    icon: Settings,
    color: 'green',
    href: ROUTES.demoAdmin,
    description: 'Manage programs, track enrollments, and generate compliance reports.',
    agenda: [
      'Program management dashboard',
      'Enrollment pipeline tracking',
      'Reporting and data exports',
      'Compliance documentation',
    ],
  },
  {
    id: 'employer',
    title: 'Employer / Partner',
    icon: Building2,
    color: 'purple',
    href: ROUTES.demoEmployer,
    description: 'Connect with candidates, manage hiring pipelines, and access apprenticeship tools.',
    agenda: [
      'Candidate pipeline view',
      'Hiring incentive information',
      'Apprenticeship management',
      'Partner dashboard features',
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
  blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-100' },
  green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-100' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-100' },
};

export default function LicenseDemoPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore the Platform</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse demo pages on your own or schedule a live walkthrough with our team.
          </p>
        </div>
      </section>

      {/* Live Demo CTA */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Prefer a guided walkthrough?</h2>
                <p className="text-slate-300">We host live demos via Google Meet tailored to your use case.</p>
              </div>
            </div>
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition whitespace-nowrap"
            >
              <Calendar className="w-5 h-5" />
              Schedule Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Tracks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Self-Guided Demo Tracks</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {demoTracks.map((track) => {
              const colors = colorClasses[track.color];
              
              return (
                <div key={track.id} className="bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all overflow-hidden">
                  <div className={`${colors.light} p-6`}>
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <track.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{track.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-slate-600 mb-6">{track.description}</p>
                    
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">What you'll see:</h4>
                    <ul className="space-y-2 mb-6">
                      {track.agenda.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href={track.href}
                      className={`inline-flex items-center gap-2 ${colors.text} font-semibold hover:gap-3 transition-all`}
                    >
                      Explore Demo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What to Expect in a Live Demo</h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Discovery', desc: "We'll learn about your organization and training programs" },
              { num: '2', title: 'Platform Tour', desc: 'Walk through learner, admin, and employer experiences' },
              { num: '3', title: 'Next Steps', desc: 'Discuss licensing options and implementation timeline' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to see it live?</h2>
          <p className="text-orange-100 mb-8">Schedule a demo and we'll walk you through the platform together.</p>
          <Link
            href={ROUTES.schedule}
            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
