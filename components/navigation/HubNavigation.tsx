'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export function HubNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = {
    businesses: [
      { name: 'Supersonic Fast Cash', href: '/supersonic-fast-cash', description: 'Tax preparation & financial services' },
      { name: 'Kingdom Konnect', href: '/kingdom-konnect', description: 'Faith-based community services' },
      { name: 'Serene Comfort Care', href: '/serene-comfort-care', description: 'Professional home care' },
      { name: 'Urban Build Crew', href: '/urban-build-crew', description: 'Construction & building services' },
      { name: 'Selfish Inc', href: '/selfish-inc', description: 'Business services' },
      { name: 'Rise Foundation', href: '/rise-foundation', description: 'Nonprofit foundation' },
    ],
    training: [
      { name: 'Programs', href: '/programs', description: '100+ career training programs' },
      { name: 'Courses', href: '/courses', description: 'Individual courses' },
      { name: 'Apprenticeships', href: '/apprenticeships', description: 'Earn while you learn' },
      { name: 'Pathways', href: '/pathways', description: 'Career pathways' },
      { name: 'Certificates', href: '/certificates', description: 'Earn credentials' },
    ],
    services: [
      { name: 'Career Services', href: '/career-services', description: 'Job placement & career support' },
      { name: 'Marketplace', href: '/marketplace', description: 'Service marketplace' },
      { name: 'Booking & Scheduling', href: '/booking', description: 'Book appointments & services' },
      { name: 'Advising', href: '/advising', description: 'Academic advising' },
      { name: 'Mentorship', href: '/mentorship', description: 'One-on-one mentoring' },
      { name: 'Tax Services (VITA)', href: '/tax', description: 'Free tax preparation' },
      { name: 'Support', href: '/support', description: 'Get help & support' },
    ],
    ai: [
      { name: 'AI Hub', href: '/ai', description: 'AI-powered tools & services' },
      { name: 'AI Chat', href: '/ai-chat', description: 'Chat with AI assistant' },
      { name: 'AI Studio', href: '/ai-studio', description: 'Create content with AI' },
      { name: 'AI Tutor', href: '/ai-tutor', description: 'Personal AI tutor' },
    ],
    marketplace: [
      { name: 'Marketplace', href: '/marketplace', description: 'Browse services' },
      { name: 'Shop', href: '/shop', description: 'Online shop' },
      { name: 'Store', href: '/store', description: 'Product store' },
      { name: 'Banking', href: '/banking', description: 'Banking services' },
    ],
    mobile: [
      { name: 'Mobile App', href: '/mobile-app', description: 'Download our mobile app' },
      { name: 'App Hub', href: '/app-hub', description: 'All apps in one place' },
    ],
    employers: [
      { name: 'Hire Graduates', href: '/hire-graduates', description: 'Recruit trained talent' },
      { name: 'OJT & Funding', href: '/ojt-and-funding', description: 'On-the-job training programs' },
      { name: 'Industries', href: '/industries', description: 'Industry partnerships' },
      { name: 'Workforce Partners', href: '/workforce-partners', description: 'Partner network' },
      { name: 'Employer Portal', href: '/employer', description: 'Employer dashboard' },
    ],
    partnerships: [
      { name: 'Partners', href: '/partners', description: 'Partner with us' },
      { name: 'SNAP-ET', href: '/snap-et-partner', description: 'SNAP Employment & Training' },
      { name: 'FSSA Partnership', href: '/fssa-partnership-request', description: 'Family & Social Services' },
      { name: 'WorkOne', href: '/workone-partner-packet', description: 'WorkOne partnership' },
      { name: 'JRI', href: '/jri', description: 'Justice Reinvestment Initiative' },
      { name: 'Franchise', href: '/franchise', description: 'Franchise opportunities' },
      { name: 'White Label', href: '/white-label', description: 'White-label licensing' },
    ],
    community: [
      { name: 'Success Stories', href: '/success-stories', description: 'Student success' },
      { name: 'Events', href: '/events', description: 'Upcoming events' },
    ],
    resources: [
      { name: 'Support Services', href: '/support', description: 'Barrier removal & assistance' },
      { name: 'Help Center', href: '/help', description: 'Get support' },
      { name: 'Documentation', href: '/docs', description: 'Platform documentation' },
      { name: 'Forms', href: '/forms', description: 'Access forms' },
      { name: 'Grants & Funding', href: '/grants', description: 'Financial assistance' },
      { name: 'Search', href: '/search', description: 'Search everything' },
      { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
      { name: 'About', href: '/about', description: 'Learn about us' },
    ],
    learning: [
      { name: 'Lessons', href: '/lessons', description: 'Browse lessons' },
      { name: 'Syllabi', href: '/syllabi', description: 'Course syllabi' },
      { name: 'Workbooks', href: '/workbooks', description: 'Digital workbooks' },
      { name: 'Orientation', href: '/orientation', description: 'New student orientation' },
      { name: 'Student Handbook', href: '/student-handbook', description: 'Student resources' },
    ],
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Elevate Hub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavDropdown title="Businesses" items={navigation.businesses} />
            <NavDropdown title="Training" items={navigation.training} />
            <NavDropdown title="Learning" items={navigation.learning} />
            <NavDropdown title="Services" items={navigation.services} />
            <NavDropdown title="Employers" items={navigation.employers} />
            <NavDropdown title="AI Tools" items={navigation.ai} />
            <NavDropdown title="Marketplace" items={navigation.marketplace} />
            <NavDropdown title="Mobile" items={navigation.mobile} />
            <NavDropdown title="Partnerships" items={navigation.partnerships} />
            <NavDropdown title="Community" items={navigation.community} />
            <NavDropdown title="Resources" items={navigation.resources} />

            <Link href="/apply" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <MobileSection title="Businesses" items={navigation.businesses} />
            <MobileSection title="Training" items={navigation.training} />
            <MobileSection title="Services" items={navigation.services} />
            <MobileSection title="Partnerships" items={navigation.partnerships} />
            <MobileSection title="Community" items={navigation.community} />
            <MobileSection title="Resources" items={navigation.resources} />

            <Link
              href="/apply"
              className="block w-full px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavDropdown({ title, items }: { title: string; items: any[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-black hover:text-blue-600">
        {title}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="font-medium text-black">{item.name}</div>
              <div className="text-sm text-black">{item.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSection({ title, items }: { title: string; items: any[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-medium text-black"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-2 space-y-2 pl-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-black hover:text-blue-600"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-black">{item.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
