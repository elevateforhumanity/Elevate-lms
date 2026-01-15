"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, ChevronDown, ChevronRight } from 'lucide-react';

export interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<
    string | null
  >(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpandedSection(null);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    {
      name: 'Programs',
      href: '/programs',
      dropdown: [
        { name: 'Healthcare', href: '/programs/healthcare' },
        { name: 'Skilled Trades', href: '/programs/skilled-trades' },
        { name: 'Beauty & Wellness', href: '/programs/beauty-wellness' },
        { name: 'Business & Finance', href: '/programs/business-finance' },
        { name: 'Technology', href: '/programs/technology' },
        { name: 'All Programs', href: '/programs' },
      ],
    },
    {
      name: 'How It Works',
      href: '/how-it-works',
      dropdown: [
        { name: 'Application Process', href: '/how-it-works#application' },
        { name: 'Funding Options', href: '/how-it-works#funding' },
        { name: 'Partner Training', href: '/how-it-works#partners' },
        { name: 'Job Placement', href: '/how-it-works#placement' },
      ],
    },
    {
      name: 'For Employers',
      href: '/employers',
      dropdown: [
        { name: 'Hire Graduates', href: '/hire-graduates' },
        { name: 'Host Apprentices', href: '/employers/apprenticeships' },
        { name: 'OJT/WEX Programs', href: '/employers/ojt-wex' },
        { name: 'Employer Portal', href: '/employer/dashboard' },
      ],
    },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Career Center', href: '/career-center' },
        { name: 'Financial Aid', href: '/financial-aid' },
      ],
    },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Our Mission', href: '/about' },
        { name: 'Leadership Team', href: '/about/team' },
        { name: 'Partners', href: '/partners' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Elevate for Humanity Home" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-black block leading-tight">
                  Elevate for Humanity
                </span>
                <span className="text-xs text-black font-medium">
                  Technical Career Institute
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with Dropdowns */}
          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.name && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="p-2 text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* User Menu - Desktop */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                aria-expanded={isUserMenuOpen}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-20">
                    <Link
                      href="/student/dashboard"
                      className="block px-4 py-2.5 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Student Portal
                    </Link>
                    <Link
                      href="/employer/dashboard"
                      className="block px-4 py-2.5 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Employer Portal
                    </Link>
                    <div className="border-t border-slate-200 my-2" />
                    <Link
                      href="/login"
                      className="block px-4 py-2.5 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Apply Button - Desktop */}
            <Link
              href="/apply"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 hover:shadow-lg transition-all"
            >
              Apply Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-10 w-10" />
              ) : (
                <Menu className="h-10 w-10" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* Overlay */}
            <button
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            />

            {/* Drawer Panel */}
            <div className="absolute right-0 top-0 h-screen w-[85vw] max-w-sm bg-white shadow-2xl overflow-y-auto">
              {/* Drawer Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <span className="text-lg font-bold text-black">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-black hover:text-black hover:bg-slate-100 rounded-lg transition-all"
                  aria-label="Close menu"
                >
                  <X className="h-10 w-10" />
                </button>
              </div>

              {/* Drawer Content */}
              <nav role="navigation" aria-label="Main navigation" className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpandedSection(
                              mobileExpandedSection === item.name
                                ? null
                                : item.name
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-black hover:bg-orange-50 rounded-lg transition-all"
                        >
                          {item.name}
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${
                              mobileExpandedSection === item.name
                                ? 'rotate-90'
                                : ''
                            }`}
                          />
                        </button>

                        {/* Expanded Dropdown */}
                        {mobileExpandedSection === item.name && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange-200 pl-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2.5 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
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
                        className="block px-4 py-3 text-base font-semibold text-black hover:bg-orange-50 rounded-lg transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="border-t border-slate-200 my-4" />

                <Link
                  href="/student/dashboard"
                  className="block px-4 py-3 text-base font-semibold text-black hover:bg-orange-50 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Student Portal
                </Link>
                <Link
                  href="/employer/dashboard"
                  className="block px-4 py-3 text-base font-semibold text-black hover:bg-orange-50 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Employer Portal
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-base font-semibold text-black hover:bg-orange-50 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>

                <div className="pt-4">
                  <Link
                    href="/apply"
                    className="block px-6 py-4 text-lg font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all text-center shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Apply Now
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm font-semibold text-black mb-2">
                    Need Help?
                  </p>
                  <a
                    href="tel:3173143757"
                    className="block text-sm text-orange-600 font-medium hover:text-orange-700"
                  >
                    Call: (317) 314-3757
                  </a>
                  <p className="text-xs text-black mt-2">
                    Monday-Friday, 9am-5pm EST
                  </p>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
