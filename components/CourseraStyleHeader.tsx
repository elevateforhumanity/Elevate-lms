"use client";

import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function CourseraStyleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [learnersOpen, setLearnersOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Link" className="flex items-center gap-2">
              <Image
                src="/images/Elevate_for_Humanity_logo_81bf0fab.jpg"
                alt="Elevate for Humanity"
                width={180}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
              <div className="relative">
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Programs
                  <ChevronDown className="w-4 h-4" />
                </button>

                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <Link
                      href="/programs"
                      className="block px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 border-b border-gray-100"
                      onClick={() => setExploreOpen(false)}
                    >
                      View All Programs
                    </Link>
                    <Link
                      href="/programs/medical-assistant"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      Medical Assistant
                    </Link>
                    <Link
                      href="/programs/barber-apprenticeship"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      Barber Apprenticeship
                    </Link>
                    <Link
                      href="/programs/hvac-technician"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      HVAC Technician
                    </Link>
                    <Link
                      href="/programs/building-maintenance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      Building Maintenance
                    </Link>
                    <Link
                      href="/programs/truck-driving"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      CDL / Truck Driving
                    </Link>
                    <Link
                      href="/programs/workforce-readiness"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setExploreOpen(false)}
                    >
                      Workforce Readiness
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/employers"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                For Employers
              </Link>
              <Link
                href="/partners"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Partners
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Phone Number */}
            <a
              href="tel:3175550100"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(317) 314-3757</span>
            </a>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition border border-blue-600"
              >
                Talk to Advisor
              </Link>
              <Link
                href="/apply"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/programs"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/employers"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Employers
            </Link>
            <Link
              href="/partners"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partners
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm font-medium text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/apply"
                className="block px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
