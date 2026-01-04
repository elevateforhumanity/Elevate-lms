import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programs: [
      { name: 'CNA Training', href: '/programs/cna' },
      { name: 'HVAC Technician', href: '/programs/hvac' },
      { name: 'Barber Apprenticeship', href: '/programs/barber' },
      { name: 'CDL Truck Driving', href: '/programs/truck-driving' },
      { name: 'All Programs', href: '/programs' },
      { name: 'Compare Programs', href: '/compare' },
    ],
    students: [
      { name: 'Apply Now', href: '/apply' },
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'Financial Aid', href: '/financial-aid' },
      { name: 'Student Portal', href: '/lms/dashboard' },
      { name: 'Career Services', href: '/career-services' },
      { name: 'Success Stories', href: '/success-stories' },
    ],
    resources: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Blog', href: '/blog' },
      { name: 'Resources Library', href: '/resources' },
      { name: 'Calendar', href: '/calendar' },
      { name: 'AI Tutor', href: '/ai-tutor' },
      { name: 'Contact Support', href: '/contact' },
    ],
    employers: [
      { name: 'Hire Our Graduates', href: '/employers' },
      { name: 'Post a Job', href: '/employer/post-job' },
      { name: 'Employer Dashboard', href: '/employer/dashboard' },
      { name: 'Workforce Partners', href: '/partners/workforce' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61571046346179' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/elevateforhumanity' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@elevateforhumanity' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Connected
              </h3>
              <p className="text-slate-200 font-medium">
                Get updates on new programs, success stories, and career opportunities.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form className="sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white Content-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  Content="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto px-6 py-3    text-white font-medium rounded-lg hover: hover: transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Students</h4>
            <ul className="space-y-3">
              {footerLinks.students.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-3">
              {footerLinks.employers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="lg:flex lg:items-center lg:justify-between">
            {/* Logo & Description */}
            <div className="lg:max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-10 w-10    rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <span className="text-lg font-bold text-white">
                    Elevate for Humanity
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Empowering Marion County and Indianapolis workforce through WIOA, WRG, and JRI-funded training programs.
                Building careers, strengthening communities.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                An Equal Opportunity Employer/Program. Auxiliary aids and services are available upon request to individuals with disabilities. This program is funded in whole or in part by the Workforce Innovation and Opportunity Act (WIOA).
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 lg:mt-0">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>

              <p className="text-sm text-slate-400 mt-2">
                <a href="tel:+13173143757" className="hover:text-white transition-colors">
                  (317) 314-3757
                </a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>
              © {currentYear} Elevate for Humanity. All rights reserved.
              {' | '}
              Funded by the Workforce Innovation and Opportunity Act (WIOA)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
