'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const footerSections = [
  {
    title: 'Programs',
    links: [
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'Business', href: '/programs/business' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'For Employers', href: '/employer' },
    ],
  },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/elevate-for-humanity' },
  { name: 'YouTube', href: 'https://www.youtube.com/@elevateforhumanity' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61571046346179' },
];

export default function SiteFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Mobile: Accordion | Desktop: Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Mobile Accordion */}
        <div className="sm:hidden space-y-0 divide-y divide-gray-800">
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

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-8">
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
