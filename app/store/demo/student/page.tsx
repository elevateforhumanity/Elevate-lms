import { Metadata } from 'next';
import Link from 'next/link';
import { Users, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Demo | Elevate LMS Platform',
  description: 'Explore the student experience in the Elevate LMS platform.',
};

const DEMO_SECTIONS = [
  { title: 'Student Dashboard', description: 'View enrolled courses, progress, and upcoming deadlines.', demoUrl: '/lms/dashboard' },
  { title: 'Course Catalog', description: 'Browse available courses and training programs.', demoUrl: '/courses' },
  { title: 'Lesson Player', description: 'Experience the course content delivery interface.', demoUrl: '/lms/courses' },
  { title: 'Progress Tracking', description: 'See completion status, grades, and achievements.', demoUrl: '/lms/progress' },
  { title: 'Certificates', description: 'View and download earned certificates and credentials.', demoUrl: '/lms/certificates' },
];

export default function StudentDemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/store/demo" className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Demo Center
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Student Demo</h1>
              <p className="text-green-200">Explore the student experience</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {DEMO_SECTIONS.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h2>
                <p className="text-slate-600">{section.description}</p>
              </div>
              <Link href={section.demoUrl} target="_blank" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
                Open <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-800 text-sm"><strong>Note:</strong> This demo uses sample data. Some features require authentication. Full access available after platform setup.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white border-t text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to set up your platform?</h2>
        <Link href="/store/licenses/managed" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
          Start License Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
