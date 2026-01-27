// Server Component - NO 'use client'
// Footer that renders on the server

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  programs: [
    // WIOA
    { name: 'WIOA Programs', href: '/wioa-eligibility' },
    { name: 'CNA Training', href: '/programs/cna-certification' },
    { name: 'HVAC Technician', href: '/programs/hvac-technician' },
    { name: 'CDL Training', href: '/programs/cdl-training' },
    // Apprenticeships
    { name: 'Apprenticeships', href: '/apprenticeships' },
    { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
    // Microclasses
    { name: 'Microclasses', href: '/microclasses' },
    { name: 'CPR & First Aid', href: '/programs/cpr-first-aid-hsi' },
  ],
  funding: [
    { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
    { name: 'JRI Programs', href: '/jri' },
    { name: 'Financial Aid', href: '/financial-aid' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Tuition & Costs', href: '/tuition' },
    { name: 'Scholarships', href: '/scholarships' },
  ],
  resources: [
    { name: 'Career Services', href: '/career-services' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Student Handbook', href: '/student-handbook' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Events', href: '/events' },
    { name: 'Support', href: '/support' },
  ],
  store: [
    { name: 'Store Home', href: '/store' },
    { name: 'Platform Licensing', href: '/store/licenses' },
    { name: 'AI Tools', href: '/store/apps' },
    { name: 'Courses', href: '/store/courses' },
    { name: 'Pricing', href: '/store/pricing' },
  ],
  partners: [
    { name: 'Become a Partner', href: '/partners' },
    { name: 'Employer Partners', href: '/employers' },
    { name: 'Training Providers', href: '/training-providers' },
    { name: 'Workforce Board', href: '/workforce-board' },
    { name: 'Partner Portal', href: '/partner-portal' },
  ],
  portals: [
    { name: 'Student Portal', href: '/student-portal' },
    { name: 'Employer Portal', href: '/employer-portal' },
    { name: 'Instructor Portal', href: '/instructor' },
    { name: 'Admin Portal', href: '/admin' },
    { name: 'Sign In', href: '/login' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Locations', href: '/locations' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Governance', href: '/governance' },
    { name: 'Site Map', href: '/site-map' },
  ],
};

export default function ServerFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Programs */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Funding */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Funding</h3>
            <ul className="space-y-2">
              {footerLinks.funding.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Store</h3>
            <ul className="space-y-2">
              {footerLinks.store.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Partners</h3>
            <ul className="space-y-2">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-slate-800 pt-8">
          {/* Portals */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Portals</h3>
            <ul className="space-y-2">
              {footerLinks.portals.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand & Contact */}
          <div>
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
            <p className="text-slate-400 text-sm mb-3">
              Free career training through WIOA funding.
            </p>
            <p className="text-slate-400 text-sm">
              <a href="tel:317-314-3757" className="hover:text-white">(317) 314-3757</a>
            </p>
            <p className="text-slate-400 text-sm">
              <a href="mailto:info@elevateforhumanity.org" className="hover:text-white">info@elevateforhumanity.org</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
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
            <Link href="/accessibility" className="text-slate-400 hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
