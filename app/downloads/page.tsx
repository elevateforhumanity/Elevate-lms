import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Download,
  FileText,
  BookOpen,
  GraduationCap,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download Center | Elevate For Humanity',
  description:
    'Access handbooks, workbooks, forms, and resources for students and staff',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/downloads',
  },
};

export const dynamic = 'force-dynamic';

// Resources available for request - actual files will be provided upon enrollment or request
const defaultResources = {
  handbooks: [
    {
      title: 'Student Handbook 2025-2026',
      description: 'Complete guide to policies, procedures, and student rights. Available to enrolled students.',
      requiresEnrollment: true,
    },
    {
      title: 'Safety Handbook',
      description: 'Safety protocols and emergency procedures for all programs.',
      requiresEnrollment: true,
    },
    {
      title: 'FERPA Rights Guide',
      description: 'Student privacy rights and information access.',
      requiresEnrollment: false,
      externalUrl: 'https://studentprivacy.ed.gov/faq/what-ferpa',
    },
  ],
  workbooks: [
    {
      title: 'Barbering/Cosmetology Workbook',
      description: 'Practice exercises and skill assessments. Provided upon program enrollment.',
      requiresEnrollment: true,
    },
    {
      title: 'CNA Training Workbook',
      description: 'Clinical skills and patient care exercises. Provided upon program enrollment.',
      requiresEnrollment: true,
    },
    {
      title: 'HVAC Technician Workbook',
      description: 'Technical diagrams and troubleshooting guides. Provided upon program enrollment.',
      requiresEnrollment: true,
    },
    {
      title: 'Tax Preparation Workbook',
      description: 'Practice returns and case studies. Provided upon program enrollment.',
      requiresEnrollment: true,
    },
  ],
  forms: [
    {
      title: 'Enrollment Application',
      description: 'Start your application online.',
      externalUrl: '/apply',
      isLink: true,
    },
    {
      title: 'Contact Us',
      description: 'Request forms or ask questions.',
      externalUrl: '/contact',
      isLink: true,
    },
    {
      title: 'Grievance Form',
      description: 'Submit a formal grievance. Contact student services.',
      requiresEnrollment: true,
    },
    {
      title: 'Transcript Request',
      description: 'Request official transcripts. Available to current and former students.',
      requiresEnrollment: true,
    },
  ],
  guides: [
    {
      title: 'How It Works',
      description: 'Learn about our enrollment process and programs.',
      externalUrl: '/how-it-works',
      isLink: true,
    },
    {
      title: 'Funding & Financial Aid',
      description: 'Learn about WIOA funding and financial assistance.',
      externalUrl: '/funding',
      isLink: true,
    },
    {
      title: 'Career Services',
      description: 'Resume writing, interviews, and job placement assistance.',
      externalUrl: '/career-services',
      isLink: true,
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions about our programs.',
      externalUrl: '/faq',
      isLink: true,
    },
  ],
};

export default async function DownloadsPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get documents from database
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('is_public', true)
    .order('category', { ascending: true })
    .order('title', { ascending: true });

  // Group documents by category
  const handbooks = documents?.filter((d: any) => d.category === 'handbook') || [];
  const workbooks = documents?.filter((d: any) => d.category === 'workbook') || [];
  const forms = documents?.filter((d: any) => d.category === 'form') || [];
  const guides = documents?.filter((d: any) => d.category === 'guide') || [];

  // Use database data if available, otherwise use defaults
  const displayHandbooks = handbooks.length > 0 ? handbooks : defaultResources.handbooks;
  const displayWorkbooks = workbooks.length > 0 ? workbooks : defaultResources.workbooks;
  const displayForms = forms.length > 0 ? forms : defaultResources.forms;
  const displayGuides = guides.length > 0 ? guides : defaultResources.guides;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Download className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download Center
            </h1>
            <p className="text-base md:text-lg text-slate-200">
              Access handbooks, workbooks, forms, and resources for students and
              staff
            </p>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-4 bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-blue-800">
            <strong>Note:</strong> Some materials are available only to enrolled students. 
            <Link href="/apply" className="font-bold underline ml-1">Apply now</Link> to access all resources, 
            or call <a href="tel:+13173143757" className="font-bold underline">(317) 314-3757</a> for questions.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#handbooks"
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Handbooks</span>
            </a>
            <a
              href="#workbooks"
              className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              <span className="font-semibold">Workbooks</span>
            </a>
            <a
              href="#forms"
              className="flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileCheck className="w-5 h-5" />
              <span className="font-semibold">Forms</span>
            </a>
            <a
              href="#guides"
              className="flex items-center gap-2 px-6 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="font-semibold">Guides</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Handbooks */}
            <div id="handbooks">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold">Handbooks</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {displayHandbooks.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.description}
                        </p>
                        {item.requiresEnrollment && (
                          <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Available upon enrollment
                          </span>
                        )}
                      </div>
                      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    </div>
                    {item.url ? (
                      <a
                        href={item.url}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                    ) : item.externalUrl ? (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Resource</span>
                      </a>
                    ) : (
                      <Link
                        href="/apply"
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <span>Enroll to Access</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Workbooks */}
            <div id="workbooks">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Program Workbooks
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Program workbooks are provided to enrolled students as part of their training materials.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {displayWorkbooks.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.description}
                        </p>
                        <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Provided upon enrollment
                        </span>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-600 flex-shrink-0" />
                    </div>
                    <Link
                      href="/programs"
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <span>View Programs</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Forms & Quick Links */}
            <div id="forms">
              <div className="flex items-center gap-3 mb-8">
                <FileCheck className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Forms & Quick Links
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {displayForms.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <FileText className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                    {item.isLink && item.externalUrl ? (
                      <Link
                        href={item.externalUrl}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        <span>Go to Page</span>
                      </Link>
                    ) : item.requiresEnrollment ? (
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        <span>Contact Student Services</span>
                      </Link>
                    ) : (
                      <a
                        href="tel:+13173143757"
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        <span>Call to Request</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Guides & Resources */}
            <div id="guides">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Guides & Resources
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {displayGuides.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.description}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    </div>
                    {item.externalUrl ? (
                      <Link
                        href={item.externalUrl}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <span>Learn More</span>
                      </Link>
                    ) : (
                      <a
                        href="tel:+13173143757"
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <span>Call for Info</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our student services team is
                here to help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Contact Support
                </Link>
                <Link
                  href="/student-handbook"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold border-2 border-blue-600"
                >
                  View Student Handbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Notice */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
            <p>
              All documents are provided in PDF format. If you need documents in
              an alternative format for accessibility purposes, please contact{' '}
              <a
                href="mailto:accessibility@www.elevateforhumanity.org"
                className="text-blue-600 hover:underline"
              >
                accessibility@www.elevateforhumanity.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
