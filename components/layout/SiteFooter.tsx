'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  programs: [
    { name: 'Healthcare', href: '/programs/healthcare' },
    { name: 'Skilled Trades', href: '/programs/skilled-trades' },
    { name: 'Technology', href: '/programs/technology' },
    { name: 'Business', href: '/programs/business' },
  ],
  resources: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'For Employers', href: '/employer' },
  ],
  connect: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/elevate-for-humanity', external: true },
    { name: 'YouTube', href: 'https://www.youtube.com/@elevateforhumanity', external: true },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61571046346179', external: true },
  ],
  students: [
    { name: 'Sign In', href: '/login' },
    { name: 'Apply Now', href: '/apply' },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Programs */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
              Programs
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block min-h-[44px] py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block min-h-[44px] py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block min-h-[44px] py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block min-h-[44px] py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Students */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
              Students
            </h3>
            <ul className="space-y-3">
              {footerLinks.students.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-300 hover:text-white transition-colors inline-block min-h-[44px] py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-400">Elevate for Humanity</span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                Terms
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Elevate for Humanity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
