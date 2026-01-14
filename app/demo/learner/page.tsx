import { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award,
  Calendar,
  ArrowRight,
  CheckCircle,
  Info,
  Users,
  DollarSign
} from 'lucide-react';
import { demoLearner, demoPrograms, fundingOptions } from '@/lib/demoData';
import { LICENSING_ROUTES } from '@/lib/licensing-constants';

export const metadata: Metadata = {
  title: 'Learner Demo | Elevate LMS',
  description: 'Experience the learner dashboard with sample program data, progress tracking, and funding pathway information.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/demo/learner',
  },
};

export default function LearnerDemoPage() {
  const learner = demoLearner;
  const program = learner.enrolledProgram;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Mode Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode (Sample Data) — This shows an example learner experience
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/demo" className="text-slate-600 hover:text-orange-600 transition">
                ← Back to Demo Hub
              </Link>
            </div>
            <Link
              href={LICENSING_ROUTES.schedule}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-4 h-4" />
              Schedule Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {learner.name}
            </h1>
            <p className="text-slate-600">
              Here's your learning dashboard
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Program Card */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8" />
                    <div>
                      <h2 className="text-xl font-bold">{program.name}</h2>
                      <p className="text-blue-100">{program.format}</p>
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm">{program.description}</p>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Clock className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Duration</p>
                      <p className="font-semibold text-slate-900">{program.duration}</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <BookOpen className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Modules</p>
                      <p className="font-semibold text-slate-900">{program.modules} total</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Award className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Certification</p>
                      <p className="font-semibold text-slate-900 text-xs">{program.certification}</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>Schedule:</strong> {program.schedule}
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Your Progress
                </h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Overall Completion</span>
                    <span className="font-semibold text-slate-900">{learner.progress.overallPercent}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                      style={{ width: `${learner.progress.overallPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600 mb-1">Modules Completed</p>
                    <p className="text-2xl font-bold text-green-700">
                      {learner.progress.modulesCompleted} / {learner.progress.totalModules}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 mb-1">Hours Logged</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {learner.progress.hoursCompleted} / {learner.progress.totalHours}
                    </p>
                  </div>
                </div>

                {program.nextLesson && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-600 mb-1">Next Lesson</p>
                    <p className="font-semibold text-orange-900">{program.nextLesson}</p>
                    <button className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
                      Continue Learning
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Pathway Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Funding Pathway
                </h3>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-600 mb-1">Your Status</p>
                  <p className="font-semibold text-green-900">{learner.funding.status}</p>
                  <p className="text-xs text-green-700 mt-1">{learner.funding.type}</p>
                </div>

                <p className="text-xs text-slate-500 mb-4">{learner.funding.note}</p>

                <h4 className="text-sm font-semibold text-slate-900 mb-2">Eligible Programs:</h4>
                <ul className="space-y-2">
                  {program.fundingEligible.map((fund, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {fund}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Support Resources
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-purple-900">Mentorship</p>
                    <p className="text-xs text-purple-700">{learner.support.mentor}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-slate-900">Career Services</p>
                    <p className="text-xs text-slate-600">{learner.support.careerServices}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    <strong>Next Milestone:</strong> {learner.support.nextMilestone}
                  </p>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Upcoming
                </h3>
                <div className="space-y-3">
                  {learner.upcomingEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{event.event}</p>
                        <p className="text-xs text-slate-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Footer */}
      <section className="bg-slate-900 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to see more?
          </h2>
          <p className="text-slate-300 mb-6">
            Schedule a live demo to explore the full learner experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={LICENSING_ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Live Demo
            </Link>
            <Link
              href="/demo/admin"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View Admin Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
