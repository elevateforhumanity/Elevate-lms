import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Training | Staff Portal',
  description: 'Access training materials and professional development resources.',
};

export default async function TrainingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const trainingModules = [
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'New Staff Onboarding',
      description: 'Essential training for new team members',
      duration: '2 hours',
      href: '/staff-portal/training/onboarding',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Student Support Best Practices',
      description: 'How to effectively support student success',
      duration: '1.5 hours',
      href: '/staff-portal/training/student-support',
    },
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'WIOA Compliance Training',
      description: 'Understanding WIOA requirements and documentation',
      duration: '3 hours',
      href: '/staff-portal/training/wioa',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'Data Entry & Reporting',
      description: 'Accurate data management and report generation',
      duration: '1 hour',
      href: '/staff-portal/training/data-entry',
    },
    {
      image: '/images/artlist/hero-training-5.jpg',
      title: 'Customer Service Excellence',
      description: 'Delivering exceptional service to students and partners',
      duration: '2 hours',
      href: '/staff-portal/training/customer-service',
    },
    {
      image: '/images/artlist/hero-training-6.jpg',
      title: 'Platform Administration',
      description: 'Managing the LMS and portal features',
      duration: '2.5 hours',
      href: '/staff-portal/training/platform',
    },
  ];

  const resources = [
    {
      image: '/images/artlist/hero-training-7.jpg',
      title: 'Staff Handbook',
      description: 'Policies, procedures, and guidelines',
      href: '/staff-portal/handbook',
    },
    {
      image: '/images/artlist/hero-training-8.jpg',
      title: 'Process Documentation',
      description: 'Step-by-step workflow guides',
      href: '/staff-portal/processes',
    },
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'FAQ & Troubleshooting',
      description: 'Common questions and solutions',
      href: '/staff-portal/faq',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-3.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Staff Training</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional development and training resources for staff members
          </p>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Training Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {trainingModules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={module.image}
                    alt={module.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-indigo-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white">{module.title}</h3>
                    <p className="text-white/80 text-sm">{module.duration}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{module.description}</p>
                  <span className="inline-flex items-center gap-1 text-indigo-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                    Start Training <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Resources */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1">{resource.title}</h3>
                  <p className="text-slate-600 text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
