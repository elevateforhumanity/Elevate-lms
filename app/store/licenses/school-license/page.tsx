'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  ArrowRight,
  Play,
  Monitor,
  Smartphone,
  Users,
  BookOpen,
  Settings,
  CreditCard,
  Shield,
  BarChart3,
  Building2,
  FileText,
  Briefcase,
} from 'lucide-react';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';

const LICENSE_DATA = {
  name: 'School / Training Provider License',
  price: 15000,
  description: 'Complete workforce platform for schools, nonprofits, and training providers.',
  longDescription:
    'The most popular license for workforce training organizations. Includes white-label branding, compliance tools, partner dashboards, case management, and everything you need to run professional training programs at scale.',
  features: [
    'Complete Next.js codebase',
    'White-label branding',
    'Up to 5 site deployments',
    '2 years of updates',
    'Priority email & chat support',
    'LMS with SCORM support',
    'Student enrollment & intake',
    'Admin dashboard with analytics',
    'Partner & employer dashboards',
    'Case management system',
    'WIOA compliance tools',
    'Grant reporting templates',
    'Mobile PWA',
    'API access',
  ],
  idealFor: [
    'Workforce training providers',
    'Community colleges',
    'Nonprofit organizations',
    'Apprenticeship sponsors',
    'Career centers',
  ],
  appsIncluded: [
    { name: 'Learning Management System', icon: BookOpen, description: 'Courses, SCORM, certifications, progress tracking' },
    { name: 'Enrollment & Intake', icon: Users, description: 'Applications, eligibility screening, cohort management' },
    { name: 'Admin Dashboard', icon: Settings, description: 'User management, analytics, system configuration' },
    { name: 'Partner Dashboard', icon: Building2, description: 'Employer and partner access with limited views' },
    { name: 'Case Management', icon: FileText, description: 'Track barriers, interventions, wraparound services' },
    { name: 'Compliance & Reporting', icon: Shield, description: 'WIOA, FERPA, grant reporting with automated data' },
    { name: 'Payments & Billing', icon: CreditCard, description: 'Stripe integration, invoices, funding sources' },
    { name: 'Mobile PWA', icon: Smartphone, description: 'iOS and Android progressive web app' },
  ],
  whatItReplaces: [
    'Admissions and intake staff',
    'Compliance tracking spreadsheets',
    'Manual reporting processes',
    'Separate LMS subscriptions',
    'Paper-based case management',
    'Multiple disconnected systems',
  ],
};

const DEMO_PAGES = [
  { name: 'Admin Dashboard', path: '/demo/admin', description: 'Full admin experience' },
  { name: 'Student Portal', path: '/demo/learner', description: 'Learner experience' },
  { name: 'Partner View', path: '/demo/employer', description: 'Employer/partner access' },
  { name: 'Programs', path: '/programs', description: 'Training programs catalog' },
  { name: 'Apply', path: '/apply', description: 'Student application flow' },
  { name: 'Compliance', path: '/compliance', description: 'Compliance dashboard' },
];

export default function SchoolLicensePage() {
  const [activeDemo, setActiveDemo] = useState('/demo/admin');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-orange-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-orange-600 rounded-full text-sm font-bold mb-4">
                Most Popular
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-4">
                {LICENSE_DATA.name}
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl mb-6">
                {LICENSE_DATA.longDescription}
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black">${LICENSE_DATA.price.toLocaleString()}</span>
                <span className="text-orange-200">one-time</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/store/licenses/checkout?license=school"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition"
                >
                  Purchase License
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/demo/admin"
                  className="inline-flex items-center gap-2 bg-orange-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-800 transition"
                >
                  <Play className="w-5 h-5" />
                  Try Live Demo
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video w-full max-w-lg bg-orange-700 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/store/platform-hero.jpg"
                  alt="School License Platform"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Avatar Guide */}
        <AvatarVideoOverlay
          videoSrc="/videos/avatars/store-assistant.mp4"
          position="bottom-right"
          title="License Guide"
          subtitle="Let me explain what's included"
        />
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">What's Included</h2>
          <p className="text-gray-600 mb-8">Complete platform with all the tools you need</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LICENSE_DATA.appsIncluded.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.name} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold mb-2">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">Interactive Demo</h2>
          <p className="text-gray-600 mb-8">Explore the platform before you buy</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Demo Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-500 mb-3">DEMO PAGES</p>
                <div className="space-y-2">
                  {DEMO_PAGES.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => setActiveDemo(page.path)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        activeDemo === page.path
                          ? 'bg-orange-100 text-orange-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{page.name}</span>
                      <span className="block text-xs text-gray-500">{page.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-500 mb-3">VIEW MODE</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      viewMode === 'desktop' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      viewMode === 'mobile' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Demo Frame */}
            <div className="flex-1">
              <div className={`bg-white rounded-xl shadow-lg overflow-hidden mx-auto ${
                viewMode === 'mobile' ? 'max-w-sm' : 'w-full'
              }`}>
                <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                    elevateforhumanity.org{activeDemo}
                  </div>
                </div>
                <div className={`relative ${viewMode === 'mobile' ? 'h-[600px]' : 'h-[500px]'}`}>
                  <iframe
                    src={activeDemo}
                    className="w-full h-full border-0"
                    title="Platform Demo"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                <Link href={activeDemo} target="_blank" className="text-orange-600 hover:underline">
                  Open in new tab →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Replaces */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-2">What This Replaces</h2>
          <p className="text-gray-600 mb-8">Consolidate your tech stack and reduce overhead</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {LICENSE_DATA.whatItReplaces.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-red-50 p-4 rounded-lg">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">✕</span>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8">All Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LICENSE_DATA.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-8">Ideal For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {LICENSE_DATA.idealFor.map((item, i) => (
              <div key={i} className="bg-orange-50 p-4 rounded-lg text-center">
                <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-orange-100 mb-8">
            One-time purchase. Lifetime ownership. 2 years of updates included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/licenses/checkout?license=school"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition"
            >
              Purchase for ${LICENSE_DATA.price.toLocaleString()}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=School%20License"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
