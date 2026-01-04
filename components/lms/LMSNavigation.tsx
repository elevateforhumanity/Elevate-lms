"use client";

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotificationBell } from './NotificationBell';
import {
  BookOpen,
  LayoutDashboard,
  Award,
  User,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { useState } from 'react';

interface LMSNavigationProps {
  user: any;
  profile: any;
}

export function LMSNavigation({ user, profile }: LMSNavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { href: '/lms/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/lms/courses', label: 'My Courses', icon: BookOpen },
    { href: '/lms/certificates', label: 'Certificates', icon: Award },
    { href: '/lms/profile', label: 'Profile', icon: User },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-gradient-to-r from-green-600 to-blue-600 border-b-4 border-green-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/lms/dashboard" aria-label="Link" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-black text-xl text-white hidden md:block uppercase tracking-tight">
              Learning Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                    isActive(item.href)
                      ? 'bg-white text-green-600 shadow-lg'
                      : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition text-white"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>

            {/* Notifications */}
            <NotificationBell />

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {profile?.first_name?.[0] || 'U'}
                {profile?.last_name?.[0] || ''}
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-slate-900">
                  {profile?.first_name || 'User'} {profile?.last_name || ''}
                </div>
                <div className="text-xs text-slate-500">Student</div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                Content="Search courses, lessons, certificates..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {profile?.first_name?.[0] || 'U'}
                  {profile?.last_name?.[0] || ''}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {profile?.first_name || 'User'} {profile?.last_name || ''}
                  </div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </div>
              </div>
              <Link
                href="/api/auth/signout"
                className="block px-4 py-2 mt-2 text-brand-orange-600 hover:bg-red-50 rounded-lg font-semibold"
              >
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
