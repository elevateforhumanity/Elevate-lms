import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, AlertTriangle, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'QA Checklist | Staff Portal',
  description: 'Quality assurance checklists and compliance tools for staff.',
};

export default async function QAChecklistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const checklists = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Student Enrollment QA',
      description: 'Verify all enrollment documentation is complete and accurate',
      items: 12,
      status: 'active',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'WIOA Compliance',
      description: 'Ensure WIOA eligibility and documentation requirements are met',
      items: 18,
      status: 'active',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'Course Quality Review',
      description: 'Review course content, materials, and instructor performance',
      items: 15,
      status: 'active',
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Data Entry Audit',
      description: 'Verify accuracy of student records and progress tracking',
      items: 10,
      status: 'active',
    },
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'Partner Compliance',
      description: 'Review partner agreements and performance metrics',
      items: 8,
      status: 'active',
    },
    {
      image: '/hero-images/barber-beauty-cat-new.jpg',
      title: 'Outcome Verification',
      description: 'Confirm job placements and credential completions',
      items: 14,
      status: 'active',
    },
  ];

  const complianceAreas = [
    {
      image: '/hero-images/healthcare-category.jpg',
      title: 'DOL Requirements',
      description: 'Department of Labor compliance standards',
      href: '/staff-portal/qa-checklist/dol',
    },
    {
      image: '/hero-images/skilled-trades-category.jpg',
      title: 'State Regulations',
      description: 'Indiana workforce development requirements',
      href: '/staff-portal/qa-checklist/state',
    },
    {
      image: '/hero-images/technology-category.jpg',
      title: 'Accreditation Standards',
      description: 'Program accreditation and certification requirements',
      href: '/staff-portal/qa-checklist/accreditation',
    },
    {
      image: '/hero-images/business-category.jpg',
      title: 'Internal Policies',
      description: 'Elevate for Humanity operational standards',
      href: '/staff-portal/qa-checklist/internal',
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
          poster="/images/artlist/hero-training-5.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 to-green-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <FileCheck className="w-16 h-16 mx-auto mb-4 text-emerald-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">QA Checklist</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Quality assurance tools to maintain compliance and excellence
          </p>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Checklists</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {checklists.map((checklist) => (
              <div
                key={checklist.title}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={checklist.image}
                    alt={checklist.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </div>
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">
                    {checklist.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm mb-3">{checklist.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{checklist.items} items</span>
                    <button className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm hover:gap-2 transition-all">
                      Start Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Areas */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Compliance Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceAreas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 font-bold text-white">
                    {area.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{area.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="py-8 px-6 bg-amber-50 border-t border-amber-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Compliance Reminder</h3>
              <p className="text-amber-800 text-sm">
                All QA checklists should be completed within 48 hours of student enrollment or course completion. 
                Contact your supervisor if you need assistance with any compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
