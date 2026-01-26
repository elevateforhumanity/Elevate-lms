// Server Component - NO 'use client'
// Footer that renders on the server

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  programs: [
    { name: 'Healthcare', href: '/programs/healthcare' },
    { name: 'Skilled Trades', href: '/programs/skilled-trades' },
    { name: 'Technology', href: '/programs/technology' },
    { name: 'Apprenticeships', href: '/apprenticeships' },
  ],
  resources: [
    { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
    { name: 'Career Services', href: '/career-services' },
    { name: 'Student Handbook', href: '/student-handbook' },
    { name: 'FAQ', href: '/faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partners', href: '/partners' },
  ],
};

export default function ServerFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Elevate"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">Elevate</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Free career training for Indiana residents through WIOA funding.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
