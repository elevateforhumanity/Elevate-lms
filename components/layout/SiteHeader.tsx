'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// Main navigation with dropdowns for sub-pages
const NAV_ITEMS = [
  { 
    name: 'Programs', 
    href: '/programs',
    subItems: [
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'Business', href: '/programs/business' },
      { name: 'Apprenticeships', href: '/apprenticeships' },
      { name: 'JRI Programs', href: '/jri' },
      { name: 'Micro Classes', href: '/micro-classes' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    subItems: [
      { name: 'Career Services', href: '/career-services' },
      { name: 'Drug Testing', href: '/drug-testing' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Training Providers', href: '/training-providers' },
      { name: 'VITA Tax Prep', href: '/vita' },
      { name: 'Mentorship', href: '/mentorship' },
    ]
  },
  { 
    name: 'Store', 
    href: '/store',
    subItems: [
      { name: 'Shop All', href: '/shop' },
      { name: 'Courses', href: '/courses' },
      { name: 'Workbooks', href: '/workbooks' },
      { name: 'Marketplace', href: '/marketplace' },
    ]
  },
  { 
    name: 'How It Works', 
    href: '/how-it-works',
    subItems: [
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'Funding & Grants', href: '/funding' },
      { name: 'Tuition & Fees', href: '/tuition-fees' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Outcomes', href: '/outcomes' },
    ]
  },
  { 
    name: 'For Employers', 
    href: '/employer',
    subItems: [
      { name: 'Hire Graduates', href: '/hire-graduates' },
      { name: 'Partner With Us', href: '/partners' },
      { name: 'Workforce Solutions', href: '/solutions' },
      { name: 'OJT & Funding', href: '/ojt-and-funding' },
      { name: 'Workforce Board', href: '/workforce-board' },
    ]
  },
  { 
    name: 'LMS', 
    href: '/lms',
    subItems: [
      { name: 'Student Dashboard', href: '/lms/dashboard' },
      { name: 'My Courses', href: '/lms/courses' },
      { name: 'Certificates', href: '/certificates' },
      { name: 'Leaderboard', href: '/leaderboard' },
      { name: 'Community', href: '/community' },
    ]
  },
  { 
    name: 'Portals', 
    href: '/dashboard',
    subItems: [
      { name: 'Admin Dashboard', href: '/admin' },
      { name: 'Staff Portal', href: '/staff-portal' },
      { name: 'Partner Portal', href: '/partner-portal' },
      { name: 'Employer Portal', href: '/employer-portal' },
      { name: 'Student Portal', href: '/student-portal' },
      { name: 'Instructor Portal', href: '/instructor' },
    ]
  },
  { 
    name: 'About', 
    href: '/about',
    subItems: [
      { name: 'Our Team', href: '/team' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Locations', href: '/locations' },
      { name: 'Impact', href: '/impact' },
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    subItems: [
      { name: 'Blog', href: '/blog' },
      { name: 'News', href: '/news' },
      { name: 'Events', href: '/events' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Support', href: '/support' },
      { name: 'Downloads', href: '/downloads' },
    ]
  },
];

// Safe user hook that never throws
function useSafeUser() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  
  useEffect(() => {
    // Only fetch if we're in browser
    if (typeof window === 'undefined') return;
    
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);
  
  return user;
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const user = useSafeUser();

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[70px] bg-white z-[9999] shadow-md">
        <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="font-bold text-lg text-gray-900 hidden sm:inline">
              Elevate
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
              Programs
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
              How It Works
            </Link>
            <Link href="/wioa-eligibility" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
              WIOA Funding
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Sign In - desktop only */}
            <Link
              href={user ? "/lms/dashboard" : "/login"}
              className="hidden lg:inline-flex text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </Link>

            {/* Apply Now button */}
            <Link
              href="/apply"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </Link>

            {/* Menu button - visible on mobile/tablet, hidden on desktop */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <nav className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-[10000] overflow-y-auto shadow-xl">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 no-underline">
              <Image src="/logo.png" alt="Elevate" width={32} height={32} />
              <span className="font-bold text-gray-900">Elevate</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="p-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="mb-1">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-gray-900 rounded-lg cursor-pointer text-left border-none ${openDropdown === item.name ? 'bg-gray-100' : 'bg-transparent'}`}
                    >
                      {item.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-4 border-l-2 border-gray-200 mt-1">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-blue-600 no-underline hover:bg-gray-50"
                        >
                          View All {item.name}
                        </Link>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 no-underline hover:bg-gray-50 hover:text-blue-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-semibold text-gray-900 no-underline rounded-lg hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Bottom Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href={user ? "/lms/dashboard" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full p-3 text-center text-base font-medium text-gray-700 border border-gray-300 rounded-full no-underline mb-3 hover:bg-gray-50"
              >
                {user ? 'Dashboard' : 'Sign In'}
              </Link>
              <Link
                href="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full p-3 text-center text-base font-semibold text-white bg-blue-600 rounded-full no-underline hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
