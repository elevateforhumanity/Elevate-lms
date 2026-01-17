import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Video, BookOpen, Download, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources | Elevate for Humanity',
  description: 'Access career resources, study materials, and support documents for your training journey.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/resources',
  },
};

const resources = [
  {
    title: 'Student Handbook',
    description: 'Program policies, expectations, and guidelines.',
    icon: BookOpen,
    href: '/documents/student-handbook.pdf',
    type: 'PDF',
  },
  {
    title: 'WIOA Eligibility Guide',
    description: 'Learn about funding eligibility requirements.',
    icon: FileText,
    href: '/wioa-eligibility',
    type: 'Page',
  },
  {
    title: 'Career Services',
    description: 'Resume help, interview prep, and job placement.',
    icon: ExternalLink,
    href: '/career-services',
    type: 'Page',
  },
  {
    title: 'Program Catalog',
    description: 'Browse all available training programs.',
    icon: BookOpen,
    href: '/programs',
    type: 'Page',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
        <p className="text-lg text-gray-600 mb-12">
          Access helpful materials and guides for your training journey.
        </p>

        <div className="grid gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <resource.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                    {resource.type}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{resource.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            Contact our support team for assistance with any questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
