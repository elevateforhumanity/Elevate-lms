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
    href: '/programs/healthcare',
    subItems: [
      // Healthcare
      { name: '— Healthcare —', href: '/programs/healthcare', isHeader: true },
      { name: 'CNA Training', href: '/programs/cna-certification' },
      { name: 'Medical Assistant', href: '/programs/medical-assistant' },
      { name: 'Phlebotomy', href: '/programs/phlebotomy-technician' },
      // Skilled Trades
      { name: '— Skilled Trades —', href: '/programs/skilled-trades', isHeader: true },
      { name: 'HVAC Technician', href: '/programs/hvac-technician' },
      { name: 'CDL Training', href: '/programs/cdl-training' },
      { name: 'Electrical', href: '/programs/electrical' },
      { name: 'Welding', href: '/programs/welding' },
      // Technology
      { name: '— Technology —', href: '/programs/technology', isHeader: true },
      { name: 'IT Support', href: '/programs/it-support' },
      { name: 'Cybersecurity', href: '/programs/cybersecurity' },
      // Other
      { name: '— Other Programs —', href: '/programs/barber-apprenticeship', isHeader: true },
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { name: 'Tax Preparation', href: '/programs/tax-prep-financial-services' },
    ]
  },
  { 
    name: 'Funding', 
    href: '/funding',
    subItems: [
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'JRI Programs', href: '/jri' },
      { name: 'Financial Aid', href: '/financial-aid' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Tuition & Costs', href: '/tuition' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    subItems: [
      { name: 'Career Services', href: '/career-services' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Tax Services', href: '/supersonic-fast-cash' },
      { name: 'Job Placement', href: '/career-services' },
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
  { name: 'Store', href: '/store' },
  { 
    name: 'About', 
    href: '/about',
    subItems: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Success Stories', href: '/testimonials' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Blog', href: '/blog' },
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
            href="/enroll"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Menu Toggle - Client component for interactivity */}
        <HeaderMobileMenu items={NAV_ITEMS} />
      </div>
    </header>
  );
}
