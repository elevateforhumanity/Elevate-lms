'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// STUDENT-FIRST FOOTER - Primary sections for students, secondary for others
const footerSections = [
  {
    title: 'Programs',
    links: [
      { name: 'All Programs', href: '/programs' },
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'Business', href: '/programs/business' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { name: 'Check Eligibility', href: '/enroll' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Funding Options', href: '/funding' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'Our Mission', href: '/about' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Contact', href: '/contact' },
      { name: 'Locations', href: '/locations' },
    ],
  },
  {
    title: 'Account',
    links: [
      { name: 'Sign In', href: '/login' },
      { name: 'Student Dashboard', href: '/lms/dashboard' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  },
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
          
        </div>

        {/* Desktop Grid - responsive columns for all sections */}
        {/* Desktop Grid - always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block py-1 text-sm text-gray-300 hover:text-white transition-colors min-h-[24px]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
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
              <Link href="/privacy-policy" className="py-1 min-h-[24px] hover:text-white">Privacy</Link>
              <Link href="/terms-of-service" className="py-1 min-h-[24px] hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
