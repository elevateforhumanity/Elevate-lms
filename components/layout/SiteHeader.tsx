'use client';

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Search,
} from 'lucide-react';
import { getNavigation } from '@/config/navigation-clean';

// Get dashboard URL based on user role
function getDashboardUrl(user: { role?: string } | null) {
  if (!user || !user.role) return '/student/dashboard';

  switch (user.role) {
    case 'admin':
    case 'super_admin':
      return '/admin';
    case 'program_holder':
      return '/program-holder/dashboard';
    case 'partner':
      return '/partner';
    case 'employer':
      return '/employer/dashboard';
    case 'workforce_board':
      return '/workforce-board';
    case 'student':
    default:
      return '/student/dashboard';
  }
}
import { createClient } from '@/lib/supabase/client';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >(null);
  const [user, setUser] = useState<any>(null);
  const [navigation, setNavigation] = useState(getNavigation(null));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get user and update navigation
  useEffect(() => {
    const supabase = createClient();
    
    // If Supabase is not configured, skip auth
    if (!supabase) {
      setNavigation(getNavigation(null));
      return;
    }

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setNavigation(getNavigation(user));
      } catch (error) {
        setNavigation(getNavigation(null));
      }
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setNavigation(getNavigation(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  // Debug: Check if navigation is loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, [navigation, user]);

  // Fix mobile nav overlay blocking clicks
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (mobileMenuOpen) {
          document.body.style.overflow = 'hidden';
          document.body.classList.add('mobile-menu-open');
        } else {
          document.body.style.overflow = '';
          document.body.classList.remove('mobile-menu-open');
        }
      }
    } catch (error: unknown) {}

    // Cleanup on unmount
    return () => {
      try {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
          document.body.classList.remove('mobile-menu-open');
        }
      } catch (error: unknown) {
        // Ignore cleanup errors
      }
    };
  }, [mobileMenuOpen]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100000] focus:bg-orange-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Skip to main content
      </a>
      
      <div className="w-full h-full bg-white border-b border-gray-200 shadow-sm site-header">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4 relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group cursor-pointer"
            aria-label="Go to homepage"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden bg-white">
              <Image
                src="/logo-small.png"
                alt="Elevate for Humanity"
                width={48}
                height={48}
                priority
                className="h-full w-full object-contain transition-opacity hover:opacity-80"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden md:flex items-center justify-center flex-1 gap-4 lg:gap-6"
          >
            {navigation && navigation.length > 0 ? (
              navigation.map((section) => (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(section.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {section.items && section.items.length > 0 ? (
                    <>
                      <button
                        type="button"
                        className="font-bold text-gray-900 hover:text-orange-600 transition flex items-center gap-1 py-2 text-base uppercase tracking-wide"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {section.label}
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                      </button>
                      {openDropdown === section.label && (
                        <div className="absolute left-0 top-full mt-2 w-72 bg-white border-2 border-gray-100 rounded-xl shadow-2xl py-2 z-[100] max-h-[80vh] overflow-y-auto">
                          {section.items.map((item) => {
                            // Check if this is a section header
                            const isHeader =
                              'isHeader' in item && item.isHeader;

                            if (isHeader) {
                              return (
                                <div
                                  key={item.href}
                                  className="px-4 py-2 text-xs font-black text-purple-600 uppercase tracking-wider mt-3 first:mt-0"
                                >
                                  {item.label}
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition group"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span className="font-medium">
                                  {item.label}
                                </span>
                                <svg
                                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={section.href || '/'}
                      className="font-bold text-zinc-800 hover:text-zinc-950 transition py-2"
                    >
                      {section.label}
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">Loading navigation...</div>
            )}
          </nav>

          {/* Desktop CTAs & Social */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-600 hover:text-gray-900 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 mr-2">
              <a
                href="https://www.facebook.com/profile.php?id=61571046346179"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/elevate-for-humanity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {user ? (
              <Link
                href={getDashboardUrl(user)}
                className="inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 font-bold hover:bg-gray-50 transition whitespace-nowrap"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/apply"
                  className="inline-flex rounded-md bg-orange-500 text-white px-6 py-2 font-bold hover:bg-orange-600 transition whitespace-nowrap"
                >
                  Apply Now
                </Link>
                <Link
                  href="/login"
                  className="inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 font-bold hover:bg-gray-50 transition whitespace-nowrap"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition touch-manipulation relative z-[10001]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-[9998]"
              style={{ top: 'var(--header-h)' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-menu"
              className="lg:hidden fixed left-0 right-0 bottom-0 bg-white z-[10000] overflow-y-auto pb-safe shadow-2xl"
              style={{ top: 'var(--header-h)', maxHeight: 'calc(100vh - var(--header-h))' }}
            >
              <nav
                className="px-4 py-6 space-y-2 min-h-full"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* All Navigation Sections */}
                {navigation?.map((section) => (
                  <div
                    key={section.label}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    {section.items && section.items.length > 0 ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileSection(
                              expandedMobileSection === section.label
                                ? null
                                : section.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition touch-manipulation active:bg-gray-100"
                          aria-expanded={
                            expandedMobileSection === section.label
                          }
                          aria-controls={`mobile-section-${section.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span>{section.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              expandedMobileSection === section.label
                                ? 'rotate-180'
                                : ''
                            }`}
                          />
                        </button>
                        {expandedMobileSection === section.label && (
                          <div
                            id={`mobile-section-${section.label.toLowerCase().replace(/\s+/g, '-')}`}
                            className="bg-gray-50 py-2"
                          >
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition active:bg-gray-200 touch-manipulation"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setExpandedMobileSection(null);
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : section.href ? (
                      <Link
                        href={section.href}
                        className="block px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition active:bg-gray-100 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {section.label}
                      </Link>
                    ) : null}
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="border-t pt-4 space-y-3">
                  {user ? (
                    <Link
                      href={getDashboardUrl(user)}
                      className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition active:bg-zinc-100 touch-manipulation"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/apply"
                        className="block text-center rounded-xl bg-brand-orange-600 text-white px-4 py-3 font-extrabold hover:bg-brand-orange-700 transition active:bg-brand-orange-800 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Apply Now
                      </Link>
                      <Link
                        href="/login"
                        className="block text-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-3 font-extrabold hover:bg-zinc-50 transition active:bg-zinc-100 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </>
  );
}
