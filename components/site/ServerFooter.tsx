// Server Component - NO 'use client'
// Government-grade footer - clean, senior, compliant

import Link from 'next/link';
import Image from 'next/image';

// GOVERNMENT-GRADE FOOTER STRUCTURE
// 4 columns: About, Programs, Compliance & Trust, Access
// Bottom bar: Legal links only
// Principle: If a first-time visitor or government reviewer wouldn't expect to see it, remove it

const footerLinks = {
  about: [
    { name: 'About Elevate', href: '/about' },
    { name: 'Our Mission', href: '/about' },
    { name: 'Indiana Outcomes', href: '/outcomes/indiana' },
    { name: 'Contact', href: '/contact' },
  ],
  licensing: [
    { name: 'Workforce OS', href: '/store/licenses' },
    { name: 'Managed Platform', href: '/managed' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'Pricing', href: '/pricing' },
  ],
  programs: [
    { name: 'Training Programs', href: '/programs' },
    { name: 'Career Pathways', href: '/how-it-works' },
    { name: 'Apprenticeships', href: '/programs/barber-apprenticeship' },
    { name: 'Employer Partnerships', href: '/employer' },
  ],
  compliance: [
    { name: 'Governance', href: '/governance' },
    { name: 'Data Privacy', href: '/governance/data' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Security', href: '/governance/security' },
    { name: 'Verify Credentials', href: '/verify' },
  ],
  access: [
    { name: 'Student Portal', href: '/login' },
    { name: 'Partner Portal', href: '/partner/login' },
    { name: 'Support', href: '/support' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Security', href: '/governance/security' },
  ],
};

export default function ServerFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 5-Column Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Licensing */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Licensing</h3>
            <ul className="space-y-3">
              {footerLinks.licensing.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Compliance & Trust */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Compliance</h3>
            <ul className="space-y-3">
              {footerLinks.compliance.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Access */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Access</h3>
            <ul className="space-y-3">
              {footerLinks.access.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal Links + Copyright */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Elevate"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-slate-400 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
