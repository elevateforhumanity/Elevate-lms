import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { Briefcase, Users, Search, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Portal | Elevate For Humanity',
  description: 'Connect with skilled, job-ready candidates from our training programs.',
};

const features = [
  { icon: Search, title: 'Talent Search', description: 'Find candidates with the skills you need' },
  { icon: Users, title: 'Candidate Profiles', description: 'View certifications, skills, and experience' },
  { icon: FileText, title: 'Job Postings', description: 'Post jobs directly to our talent pool' },
  { icon: Briefcase, title: 'Hiring Events', description: 'Host virtual and in-person hiring events' },
];

export default function EmployerPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Platform' }, { label: 'Employer Portal' }]} />
        </div>
      </div>

      <section className="bg-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Employer Portal</h1>
          <p className="text-xl text-orange-100 mb-8">Hire skilled, certified candidates ready to work</p>
          <Link href="/employer/login" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-50">
            Access Portal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border flex items-start gap-4">
                <f.icon className="w-10 h-10 text-orange-600 flex-shrink-0" />
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
          <h2 className="text-2xl font-bold mb-4">Start Hiring Today</h2>
          <p className="text-gray-600 mb-8">Create your free employer account and connect with qualified candidates.</p>
          <Link href="/employer/register" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}
