"use client";

import React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { headerNav } from '@/config/navigation';

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      // Force cleanup on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Force cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-[90]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Link" className="flex items-center">
            <span className="text-xl font-bold text-blue-900">
              Elevate for Humanity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center space-x-6">
            {headerNav.map((section) => (
              <div
                key={section.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(section.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {section.items && section.items.length > 0 ? (
                  <>
                    <button className="flex items-center text-black hover:text-blue-600 font-medium transition">
                      {section.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {openDropdown === section.label && (
                      <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-[100] border border-gray-200 max-h-[80vh] overflow-y-auto">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-blue-600 transition"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={section.href || '/'}
                    className="text-black hover:text-blue-600 font-medium transition"
                  >
                    {section.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Login */}
            <Link
              href="/login"
              className="text-black hover:text-blue-600 font-medium"
            >
              Login
            </Link>

            {/* CTA Button */}
            <Link
              href="/apply"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-4 space-y-2 px-2">
                {headerNav.map((section) => (
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
                          className="w-full flex items-center justify-between px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
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
                          <div className="bg-gray-50 py-2">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-6 py-2.5 text-sm text-black hover:bg-gray-50 hover:text-blue-600 transition"
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
                        className="block px-4 py-3 font-bold text-zinc-900 hover:bg-gray-50 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {section.label}
                      </Link>
                    ) : null}
                  </div>
                ))}

                <div className="pt-4 space-y-2 px-2">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-center border-2 border-gray-300 text-black hover:bg-gray-100 rounded-lg font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/apply"
                    className="block px-4 py-2 bg-orange-500 text-white text-center rounded-lg font-bold hover:bg-orange-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
