import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { GraduationCap, BookOpen, Award, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Portal | Elevate For Humanity',
  description: 'Access your courses, track progress, and manage your learning journey.',
};

const features = [
  { icon: BookOpen, title: 'Course Access', description: 'Access all your enrolled courses in one place' },
  { icon: Award, title: 'Certificates', description: 'Earn and download industry certifications' },
  { icon: GraduationCap, title: 'Progress Tracking', description: 'Monitor your learning progress' },
  { icon: Briefcase, title: 'Career Services', description: 'Get help with job placement' },
];

export default function StudentPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Platform' }, { label: 'Student Portal' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Portal</h1>
          <p className="text-xl text-blue-100 mb-8">Your gateway to free career training and certifications</p>
          <Link href="/lms/dashboard" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50">
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border flex items-start gap-4">
                <f.icon className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-8">Browse our free training programs and enroll today.</p>
          <Link href="/programs" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700">
            View Programs
          </Link>
        </div>
      </section>
    </div>
  );
}
