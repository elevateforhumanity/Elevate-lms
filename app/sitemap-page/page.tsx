import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Site Map | Elevate For Humanity',
  description: 'Complete site map of Elevate for Humanity - find all pages for career training, programs, services, and resources.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/sitemap-page',
  },
};

const siteMapSections = [
  {
    title: 'Programs',
    links: [
      { name: 'All Programs', href: '/programs' },
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'Business', href: '/programs/business' },
      { name: 'CDL & Transportation', href: '/programs/cdl-transportation' },
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { name: 'Apprenticeships', href: '/apprenticeships' },
      { name: 'Courses', href: '/courses' },
      { name: 'Credentials', href: '/credentials' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { name: 'Apply Now', href: '/apply' },
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pathways', href: '/pathways' },
      { name: 'Funding Options', href: '/funding' },
      { name: 'Orientation', href: '/orientation' },
      { name: 'Onboarding', href: '/onboarding' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Career Services', href: '/career-services' },
      { name: 'Job Placement', href: '/career-services/job-placement' },
      { name: 'Resume Building', href: '/career-services/resume-building' },
      { name: 'Interview Prep', href: '/career-services/interview-prep' },
      { name: 'Career Counseling', href: '/career-services/career-counseling' },
      { name: 'Advising', href: '/advising' },
      { name: 'Mentorship', href: '/mentorship' },
      { name: 'AI Tutor', href: '/ai-tutor' },
      { name: 'Tax Services', href: '/supersonic-fast-cash' },
      { name: 'Free VITA Tax Prep', href: '/vita' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { name: 'Employers', href: '/employer' },
      { name: 'Hire Graduates', href: '/hire-graduates' },
      { name: 'Workforce Partners', href: '/workforce-partners' },
      { name: 'Training Providers', href: '/training-providers' },
      { name: 'Government Agencies', href: '/agencies' },
      { name: 'White Label', href: '/white-label' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Founder', href: '/founder' },
      { name: 'Impact', href: '/impact' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Locations', href: '/locations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Events', href: '/events' },
      { name: 'Help Center', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Student Handbook', href: '/student-handbook' },
    ],
  },
  {
    title: 'Portals',
    links: [
      { name: 'Student Portal', href: '/student-portal' },
      { name: 'Admin Dashboard', href: '/admin' },
      { name: 'Staff Portal', href: '/staff-portal' },
      { name: 'Employer Portal', href: '/employer' },
      { name: 'Partner Portal', href: '/partner' },
      { name: 'LMS', href: '/lms' },
      { name: 'Login', href: '/login' },
      { name: 'Sign Up', href: '/signup' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Federal Compliance', href: '/federal-compliance' },
      { name: 'Equal Opportunity', href: '/equal-opportunity' },
      { name: 'FERPA', href: '/ferpa' },
      { name: 'Grievance Procedure', href: '/grievance' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'DMCA', href: '/dmca' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
          <p className="text-lg text-slate-300">
            Find all pages and resources on Elevate for Humanity
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteMapSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-blue-600 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-black hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-black mb-4">
              Looking for something specific? Use our search or contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Search Site
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white border-2 border-slate-300 text-black rounded-lg font-semibold hover:border-slate-400 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
