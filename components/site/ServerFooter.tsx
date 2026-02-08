// Server Component - NO 'use client'
// Government-grade footer - clean, senior, compliant

import Link from 'next/link';
import Image from 'next/image';

// GOVERNMENT-GRADE FOOTER STRUCTURE
// 4 columns: About, Programs, Compliance & Trust, Access
// Bottom bar: Legal links only
// Principle: If a first-time visitor or government reviewer wouldn't expect to see it, remove it

const footerLinks = {
  programs: [
    { name: 'All Programs', href: '/programs' },
    { name: 'Course Catalog', href: '/courses' },
    { name: 'Career Pathways', href: '/how-it-works' },
    { name: 'Apprenticeships', href: '/apprenticeships' },
    { name: 'Career Services', href: '/career-services' },
  ],
  community: [
    { name: 'Community Hub', href: '/hub' },
    { name: 'Events', href: '/events' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  partners: [
    { name: 'Become a Partner', href: '/partners' },
    { name: 'Employer Partners', href: '/employers' },
    { name: 'Training Providers', href: '/training-providers' },
    { name: 'Hire Graduates', href: '/hire-graduates' },
  ],
  platform: [
    { name: 'Platform Overview', href: '/platform' },
    { name: 'Workforce OS', href: '/store/licenses' },
    { name: 'Managed Platform', href: '/managed' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'System Status', href: '/status' },
  ],
  access: [
    { name: 'Student Portal', href: '/platform/student-portal' },
    { name: 'Partner Portal', href: '/platform/partner-portal' },
    { name: 'Employer Portal', href: '/platform/employer-portal' },
    { name: 'Sign In', href: '/login' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Governance', href: '/governance' },
  ],
};

export default function ServerFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 6-Column Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1: Programs */}
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

          {/* Column 2: Community */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Partners</h3>
            <ul className="space-y-3">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Access */}
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
