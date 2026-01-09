import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import { redirect } from 'next/navigation';
import ProgramOrientationVideo from '@/components/student/ProgramOrientationVideo';
import { CheckCircle, Book, Users, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Program Orientation | Student Dashboard',
  description:
    'Complete your program orientation to get started with your training.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/lms/(app)/orientation',
  },
};

export default async function OrientationPage() {
  const { user, profile } = await requireRole([
    'student',
    'admin',
    'super_admin',
  ]);

  // If already completed, show completion message
  const isCompleted = profile.orientation_completed;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Program Orientation
          </h1>
          <p className="text-lg text-slate-600">
            {isCompleted
              ? 'You have completed your orientation. Review the video anytime.'
              : 'Watch this orientation video to get started with your training journey.'}
          </p>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">
                  Orientation Completed
                </h3>
                <p className="text-sm text-green-700">
                  You've completed your orientation. You can now proceed to
                  verify your eligibility and enroll in programs.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Orientation Video */}
            <ProgramOrientationVideo
              title="Welcome to Elevate for Humanity"
              description="Learn about our programs, what to expect, and how to succeed in your training journey."
              videoUrl="/videos/programs-overview-video-with-narration.mp4"
              onComplete={async () => {
                'use server';
                const supabase = await createClient();
                await supabase
                  .from('profiles')
                  .update({ orientation_completed: true })
                  .eq('id', user.id);
              }}
            />

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                What You'll Learn
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    How our 100% free training programs work
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Available programs in healthcare, skilled trades, and
                    business
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Funding options (WIOA, WRG, employer-sponsored)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Support services (childcare, transportation, tools)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    Job placement assistance and career services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    How to succeed in your training program
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Next Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Watch Orientation
                    </p>
                    <p className="text-sm text-slate-600">
                      Complete the video above
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-slate-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Verify Eligibility
                    </p>
                    <p className="text-sm text-slate-600">
                      Check if you qualify for free training
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-slate-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Choose Program</p>
                    <p className="text-sm text-slate-600">
                      Browse 20+ training programs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-slate-600">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Start Training</p>
                    <p className="text-sm text-slate-600">
                      Begin your career journey
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/programs"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  <Book className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">
                    Browse Programs
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">
                    How It Works
                  </span>
                </Link>
                <Link
                  href="/financial-aid"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">
                    Funding Options
                  </span>
                </Link>
                <Link
                  href="/career-services"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">
                    Career Services
                  </span>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Our team is here to support you every step of the way.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {isCompleted && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Ready for the Next Step?
                </h3>
                <p className="text-slate-600">
                  Verify your eligibility to unlock program enrollment.
                </p>
              </div>
              <Link
                href="/apply"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
              >
                Verify Eligibility →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
