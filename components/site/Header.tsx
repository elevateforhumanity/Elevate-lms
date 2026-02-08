// Server Component - NO 'use client'
// This header renders on the server and is visible even with JS disabled

import Link from 'next/link';
import Image from 'next/image';
import HeaderMobileMenu from './HeaderMobileMenu.client';
import HeaderDesktopNav from './HeaderDesktopNav';

// Navigation structure
export const NAV_ITEMS = [
  { 
    name: 'Programs', 
    href: '/programs',
    subItems: [
      { name: 'All Programs', href: '/programs' },
      { name: 'Course Catalog', href: '/courses' },
      // WIOA Programs
      { name: '— WIOA Programs —', href: '/wioa-eligibility', isHeader: true },
      { name: 'CNA Training', href: '/programs/cna-certification' },
      { name: 'Medical Assistant', href: '/programs/medical-assistant' },
      { name: 'Phlebotomy', href: '/programs/phlebotomy-technician' },
      { name: 'HVAC Technician', href: '/programs/hvac-technician' },
      { name: 'CDL Training', href: '/programs/cdl-training' },
      { name: 'IT Support', href: '/programs/it-support' },
      // Apprenticeships
      { name: '— Apprenticeships —', href: '/apprenticeships', isHeader: true },
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { name: 'Cosmetology Apprenticeship', href: '/programs/cosmetology-apprenticeship' },
    ]
  },
  { 
    name: 'Services', 
    href: '/career-services',
    subItems: [
      { name: 'Career Services', href: '/career-services' },
      { name: 'Job Placement', href: '/career-services/placement' },
      { name: 'Resume Help', href: '/career-services/resume' },
      { name: 'Interview Prep', href: '/career-services/interview' },
      { name: 'Employer Connections', href: '/hire-graduates' },
    ]
  },
  { 
    name: 'Community', 
    href: '/community',
    subItems: [
      { name: 'Community Hub', href: '/hub' },
      { name: 'Member Directory', href: '/community/members' },
      { name: 'Events', href: '/events' },
      { name: 'Success Stories', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
    ]
  },
  { 
    name: 'Partners', 
    href: '/partners',
    subItems: [
      { name: 'Become a Partner', href: '/partners' },
      { name: 'Employer Partners', href: '/employers' },
      { name: 'Training Providers', href: '/training-providers' },
      { name: 'Partner Portal', href: '/partner-portal' },
    ]
  },
  { 
    name: 'Platform', 
    href: '/platform',
    subItems: [
      { name: 'Platform Overview', href: '/platform' },
      { name: 'Student Portal', href: '/lms' },
      { name: 'Partner Portal', href: '/platform/partner-portal' },
      { name: 'Employer Portal', href: '/platform/employer-portal' },
      { name: 'Workforce Boards', href: '/platform/workforce-boards' },
      { name: '— Licensing —', href: '/store/licenses', isHeader: true },
      { name: 'Workforce OS', href: '/store/licenses' },
      { name: 'Managed Platform', href: '/managed' },
      { name: 'Enterprise', href: '/enterprise' },
      { name: 'Pricing', href: '/pricing' },
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    subItems: [
      { name: 'Help Center', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'System Status', href: '/status' },
    ]
  },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-white z-[9999] shadow-md">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 sm:px-6">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Elevate"
            width={40}
            height={40}
            className="w-10 h-10"
            priority
          />
          <span className="font-bold text-lg text-slate-900 hidden sm:block">
            Elevate
          </span>
        </Link>

        {/* Desktop Navigation - Server rendered */}
        <HeaderDesktopNav items={NAV_ITEMS} />

        {/* CTA Buttons - Always visible */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-700 hover:text-slate-900 font-medium text-sm"
          >
            Sign In
          </Link>
          <Link
            href="/inquiry"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
          >
            Get Info
          </Link>
          <Link
            href="/programs"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            View Programs
          </Link>
        </div>

        {/* Mobile Menu Toggle - Client component for interactivity */}
        <HeaderMobileMenu items={NAV_ITEMS} />
      </div>
    </header>
  );
}
