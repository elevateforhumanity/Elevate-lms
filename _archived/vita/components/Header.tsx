'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export function VITAHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/vita' },
    { label: 'Locations', href: '/vita/locations' },
    { label: 'Schedule', href: '/vita/schedule' },
    { label: 'Eligibility', href: '/vita/eligibility' },
    { label: 'What to Bring', href: '/vita/what-to-bring' },
    { label: 'FAQ', href: '/vita/faq' },
    { label: 'Volunteer', href: '/vita/volunteer' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/vita" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-black">Free Tax Preparation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-green-600 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/vita/schedule"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Book Free Appointment
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-green-600 py-2 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/vita/schedule"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-center transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Free Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
