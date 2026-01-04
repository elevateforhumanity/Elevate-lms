"use client";

import React from 'react';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const navigation = [
  {
    label: 'Programs',
    items: [
      { href: '/programs', label: 'All Programs' },
      {
        href: '/programs/barber-apprenticeship',
        label: 'Barber Apprenticeship',
      },
      { href: '/programs/cna', label: 'CNA Healthcare' },
      { href: '/programs/hvac-technician', label: 'HVAC Technician' },
      { href: '/programs/cdl', label: 'CDL Training' },
      { href: '/programs/tax-preparation', label: 'Tax Preparation' },
      { href: '/compare-programs', label: 'Compare Programs' },
    ],
  },
  {
    label: 'Students',
    items: [
      { href: '/students', label: 'For Students' },
      { href: '/apply', label: 'Apply Now' },
      { href: '/student-portal', label: 'Student Portal' },
      { href: '/career-services', label: 'Career Services' },
      { href: '/funding', label: 'Financial Aid' },
      { href: '/success-stories', label: 'Success Stories' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { href: '/platform', label: 'Platform Overview' },
      { href: '/platform/apps', label: 'Apps' },
      { href: '/platform/licensing', label: 'Licensing' },
      { href: '/platform/student-portal', label: 'Student Portal' },
      { href: '/platform/employer-portal', label: 'Employer Portal' },
      { href: '/platform/training-providers', label: 'Training Providers' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { href: '/employers', label: 'For Employers' },
      { href: '/training-providers', label: 'Training Providers' },
      { href: '/workforce-boards', label: 'Workforce Boards' },
      { href: '/apprenticeships', label: 'Apprenticeships' },
      { href: '/government', label: 'Government' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/blog', label: 'Blog' },
      { href: '/success-stories', label: 'Success Stories' },
      { href: '/career-fair', label: 'Career Fair' },
      { href: '/events', label: 'Events' },
      { href: '/faq', label: 'FAQ' },
      { href: '/help', label: 'Help Center' },
    ],
  },
];

export default function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-black text-slate-900 text-lg tracking-tight flex-shrink-0"
          >
            Elevate for Humanity
          </Link>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition">
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu - Coursera Style */}
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 animate-in fade-in slide-in- duration-200">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/about"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            {navigation.map((item) => (
              <div key={item.label} className="mb-4">
                <div className="font-bold text-slate-900 px-4 py-2 text-sm uppercase tracking-wider">
                  {item.label}
                </div>
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-slate-200 pt-4 px-4 space-y-2">
              <Link
                href="/about"
                className="block py-2 text-sm font-semibold text-slate-700"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm font-semibold text-slate-700"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="block py-2 text-sm font-semibold text-slate-700"
              >
                Login
              </Link>
              <Link
                href="/apply"
                className="block text-center bg-white text-white px-6 py-3 rounded-lg font-bold text-sm mt-4"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
