"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';

export interface HeaderProps {
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Programs',
      href: '/programs',
      dropdown: [
        { name: 'HVAC Technician', href: '/programs/hvac' },
        { name: 'Barber Apprenticeship', href: '/programs/barber' },
        { name: 'Certified Nursing Assistant (CNA)', href: '/programs/cna' },
        { name: 'Commercial Truck Driving (CDL)', href: '/programs/cdl' },
        { name: 'Building Maintenance', href: '/programs/building-maintenance' },
        { name: 'All Programs', href: '/programs' },
      ]
    },
    {
      name: 'Micro Classes',
      href: '/micro-classes'
    },
    {
      name: 'For Agencies',
      href: '/agencies',
      dropdown: [
        { name: 'WorkOne Partnership', href: '/agencies/workone' },
        { name: 'EmployIndy Referral Hub', href: '/agencies/employindy' },
        { name: 'ETPL & WRG Compliance', href: '/agencies/compliance' },
        { name: 'Employer OJT/WEX Portal', href: '/agencies/ojt-wex' },
        { name: 'Apprenticeship Logs', href: '/agencies/apprenticeships' },
      ]
    },
    {
      name: 'For Employers',
      href: '/employers',
      dropdown: [
        { name: 'Host Apprentices', href: '/employers/apprenticeships' },
        { name: 'OJT/WEX Programs', href: '/employers/ojt-wex' },
        { name: 'Talent Pipeline Services', href: '/employers/talent-pipeline' },
        { name: 'Employer Portal', href: '/employer/dashboard' },
      ]
    },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'Approvals & Certifications', href: '/about/approvals' },
        { name: 'Workforce Impact', href: '/about/impact' },
        { name: 'Leadership Team', href: '/about/team' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Link" className="flex items-center gap-2">
              <div className="h-10 w-10    rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-slate-900">
                  Elevate for Humanity
                </span>
                <span className="block text-xs text-slate-600">
                  Directory
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
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
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20">
                    <Link
                      href="/student/dashboard"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Student Portal
                    </Link>
                    <Link
                      href="/employer/dashboard"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Employer Portal
                    </Link>
                    <div className="border-t border-slate-200 my-1" />
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/apply"
                      className="block px-4 py-2 text-sm text-brand-orange-600 hover:bg-slate-50 font-medium"
                    >
                      Apply Now
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Apply Button - Desktop */}
            <Link
              href="/apply"
              className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium text-white    rounded-lg hover: hover: transition-all"
            >
              Apply Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <nav role="navigation" aria-label="Main navigation" className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-slate-200 my-2" />
              <Link
                href="/student/dashboard"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link
                href="/employer/dashboard"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employer Portal
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/apply"
                className="block px-3 py-2 text-base font-medium text-white    rounded-lg hover: hover: transition-all text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
