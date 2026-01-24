'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const footerSections = [
  {
    title: 'Programs',
    links: [
      { name: 'All Programs', href: '/programs' },
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'Business', href: '/programs/business' },
      { name: 'Apprenticeships', href: '/apprenticeships' },
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { name: 'CNA Training', href: '/programs/cna' },
      { name: 'HVAC Training', href: '/programs/hvac' },
      { name: 'CDL Training', href: '/programs/cdl' },
      { name: 'JRI Programs', href: '/jri' },
      { name: 'Micro Classes', href: '/micro-classes' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Career Services', href: '/career-services' },
      { name: 'VITA Tax Prep', href: '/vita' },
      { name: 'Drug Testing', href: '/drug-testing' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Mentorship', href: '/mentorship' },
      { name: 'Training Providers', href: '/training-providers' },
      { name: 'Volunteer', href: '/volunteer' },
    ],
  },
  {
    title: 'Store',
    links: [
      { name: 'Store Home', href: '/store' },
      { name: 'Courses', href: '/courses' },
      { name: 'Shop', href: '/shop' },
      { name: 'Workbooks', href: '/workbooks' },
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { name: 'Apply Now', href: '/apply' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'Funding & Grants', href: '/funding' },
      { name: 'Financial Aid', href: '/financial-aid' },
      { name: 'Tuition & Fees', href: '/tuition-fees' },
      { name: 'Outcomes', href: '/outcomes' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'For Employers',
    links: [
      { name: 'Employer Overview', href: '/employer' },
      { name: 'Hire Graduates', href: '/hire-graduates' },
      { name: 'Partner With Us', href: '/partner-with-us' },
      { name: 'Partners', href: '/partners' },
      { name: 'OJT & Funding', href: '/ojt-and-funding' },
      { name: 'Workforce Board', href: '/workforce-board' },
      { name: 'Workforce Partners', href: '/workforce-partners' },
      { name: 'Government', href: '/government' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Team', href: '/team' },
      { name: 'Founder', href: '/founder' },
      { name: 'Careers', href: '/careers' },
      { name: 'Locations', href: '/locations' },
      { name: 'Donate', href: '/donate' },
      { name: 'Impact', href: '/impact' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Transparency', href: '/transparency' },
      { name: 'Accreditation', href: '/accreditation' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'News', href: '/news' },
      { name: 'Events', href: '/events' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Support', href: '/support' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Alumni', href: '/alumni' },
      { name: 'Forums', href: '/forums' },
    ],
  },
  {
    title: 'Portals',
    links: [
      { name: 'Student LMS', href: '/lms' },
      { name: 'Student Portal', href: '/student-portal' },
      { name: 'Employer Portal', href: '/employer-portal' },
      { name: 'Partner Portal', href: '/partner-portal' },
      { name: 'Staff Portal', href: '/staff-portal' },
      { name: 'Instructor Portal', href: '/instructor' },
    ],
  },
  {
    title: 'Governance',
    links: [
      { name: 'Governance Hub', href: '/governance' },
      { name: 'Security & Data Protection', href: '/governance/security' },
      { name: 'Compliance & Disclosures', href: '/governance/compliance' },
      { name: 'Authoritative Documents', href: '/governance/authoritative-docs' },
      { name: 'Operational Controls', href: '/governance/operational-controls' },
      { name: 'Governance Contact', href: '/governance/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Disclosures', href: '/disclosures' },
      { name: 'All Policies', href: '/policies' },
      { name: 'FERPA', href: '/ferpa' },
      { name: 'Equal Opportunity', href: '/equal-opportunity' },
      { name: 'Site Map', href: '/site-map' },
    ],
  },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/elevate-for-humanity' },
  { name: 'YouTube', href: 'https://www.youtube.com/@elevateforhumanity' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61571046346179' },
  { name: 'Instagram', href: 'https://www.instagram.com/elevateforhumanity' },
  { name: 'Google', href: 'https://g.page/r/elevateforhumanity' },
];

export default function SiteFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer style={{ backgroundColor: '#111827', color: 'white', display: 'block', padding: '40px 20px' }}>
      {/* Mobile: Accordion | Desktop: Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Mobile Accordion - hidden, using grid on all sizes */}
        <div className="hidden space-y-0 divide-y divide-gray-800">
          {footerSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-medium text-gray-300">{section.title}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    openSection === section.title ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openSection === section.title && (
                <div className="pb-4 space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-sm text-gray-400 hover:text-white py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Social Links - Mobile */}
          <div className="py-4">
            <p className="text-sm font-medium text-gray-300 mb-3">Connect</p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid - responsive columns for all sections */}
        {/* Desktop Grid - always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Social Links - Desktop */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
              Connect
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Compact */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Image
                src="/logo.png"
                alt="Elevate"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-xs text-gray-500">
                © {new Date().getFullYear()} Elevate for Humanity
              </span>
            </div>
            <div className="flex justify-center gap-4 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
