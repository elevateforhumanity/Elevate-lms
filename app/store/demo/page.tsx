'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Play, 
  BookOpen, 
  Users, 
  BarChart, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Monitor,
  Smartphone,
  GraduationCap,
  Building2,
  Briefcase,
  Zap
} from 'lucide-react';

interface DemoSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  pages: {
    name: string;
    path: string;
    description: string;
  }[];
}

const DEMO_SECTIONS: DemoSection[] = [
  {
    id: 'public',
    title: 'Public Website',
    description: 'What visitors see when they discover your training programs',
    icon: <Monitor className="w-6 h-6" />,
    pages: [
      { name: 'Homepage', path: '/', description: 'Main landing page with programs and CTAs' },
      { name: 'Programs', path: '/programs', description: 'Browse all training programs' },
      { name: 'Courses', path: '/courses', description: 'Course catalog with pricing' },
      { name: 'Apply', path: '/apply', description: 'Student application form' },
      { name: 'Career Services', path: '/career-services', description: 'Job placement and support' },
      { name: 'About', path: '/about', description: 'Organization information' },
    ],
  },
  {
    id: 'lms',
    title: 'Learning Management System',
    description: 'Student experience inside the LMS',
    icon: <GraduationCap className="w-6 h-6" />,
    pages: [
      { name: 'LMS Dashboard', path: '/lms/dashboard?demo=true', description: 'Student home with progress' },
      { name: 'My Courses', path: '/lms/courses?demo=true', description: 'Enrolled courses list' },
      { name: 'Course Player', path: '/lms/courses/demo-course?demo=true', description: 'Video lessons and content' },
      { name: 'Achievements', path: '/lms/achievements?demo=true', description: 'Badges and certificates' },
      { name: 'Resources', path: '/lms/resources?demo=true', description: 'Learning materials' },
      { name: 'Community', path: '/lms/community?demo=true', description: 'Discussion forums' },
    ],
  },
  {
    id: 'admin',
    title: 'Admin Dashboard',
    description: 'Program management and reporting tools',
    icon: <Settings className="w-6 h-6" />,
    pages: [
      { name: 'Admin Dashboard', path: '/admin/dashboard', description: 'Overview and metrics' },
      { name: 'Enrollments', path: '/admin/enrollments', description: 'Manage student enrollments' },
      { name: 'Applications', path: '/admin/applications', description: 'Review applications' },
      { name: 'Courses', path: '/admin/courses', description: 'Course management' },
      { name: 'Reports', path: '/admin/reports', description: 'Compliance and analytics' },
      { name: 'AI Studio', path: '/ai-studio', description: 'Generate videos and content' },
    ],
  },
  {
    id: 'employer',
    title: 'Employer Portal',
    description: 'Partner employers can post jobs and hire graduates',
    icon: <Briefcase className="w-6 h-6" />,
    pages: [
      { name: 'Employer Dashboard', path: '/employer/dashboard', description: 'Hiring overview' },
      { name: 'Post a Job', path: '/employers/post-job', description: 'Create job listings' },
      { name: 'Browse Graduates', path: '/employer/candidates', description: 'Find qualified candidates' },
      { name: 'Hire Graduates', path: '/hire-graduates', description: 'Partnership information' },
    ],
  },
  {
    id: 'program-holder',
    title: 'Program Holder Portal',
    description: 'Training providers manage their programs',
    icon: <Building2 className="w-6 h-6" />,
    pages: [
      { name: 'Program Dashboard', path: '/program-holder/dashboard', description: 'Program overview' },
      { name: 'Students', path: '/program-holder/students', description: 'Manage enrolled students' },
      { name: 'Compliance', path: '/program-holder/compliance', description: 'Compliance tracking' },
      { name: 'Reports', path: '/program-holder/reports', description: 'Program reports' },
    ],
  },
];

export default function InteractiveDemoPage() {
  const [activeSection, setActiveSection] = useState<string>('public');
  const [activePage, setActivePage] = useState<string>('/');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const currentSection = DEMO_SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
                <Play className="w-4 h-4" />
                <span>Interactive Demo - No Login Required</span>
              </div>
              <h1 className="text-3xl font-bold">Explore the Platform</h1>
              <p className="text-blue-100 mt-1">Click any page to see it live. This is the actual platform.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white text-blue-600' : 'text-white'}`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white text-blue-600' : 'text-white'}`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </div>
              <Link
                href="/store/licenses"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get License
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-slate-800 rounded-xl p-4 sticky top-24">
              <h2 className="text-white font-bold mb-4">Demo Sections</h2>
              <div className="space-y-2">
                {DEMO_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setActivePage(section.pages[0].path);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition text-left ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs opacity-75">{section.pages.length} pages</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pages in current section */}
              {currentSection && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-slate-400 text-sm font-medium mb-3">{currentSection.title} Pages</h3>
                  <div className="space-y-1">
                    {currentSection.pages.map((page) => (
                      <button
                        key={page.path}
                        onClick={() => setActivePage(page.path)}
                        className={`w-full flex items-center justify-between p-2 rounded text-sm transition ${
                          activePage === page.path
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                      >
                        <span>{page.name}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h3 className="text-slate-400 text-sm font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    href="/ai-studio"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
                  >
                    <Zap className="w-4 h-4" />
                    Try AI Studio
                  </Link>
                  <Link
                    href="/apply"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Apply as Student
                  </Link>
                  <Link
                    href="/store/licenses"
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm"
                  >
                    <Building2 className="w-4 h-4" />
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Live Preview */}
          <div className="flex-1">
            {/* Page Info */}
            <div className="bg-slate-800 rounded-t-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-medium">
                  {currentSection?.pages.find(p => p.path === activePage)?.name || 'Page'}
                </div>
                <div className="text-slate-400 text-sm">
                  {currentSection?.pages.find(p => p.path === activePage)?.description}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-700 px-3 py-1 rounded text-slate-300 text-sm font-mono">
                  {activePage}
                </div>
                <a
                  href={activePage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                >
                  Open in new tab
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* iframe Preview */}
            <div 
              className={`bg-white rounded-b-xl overflow-hidden shadow-2xl ${
                viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''
              }`}
              style={{ height: viewMode === 'mobile' ? '667px' : '700px' }}
            >
              <iframe
                src={activePage}
                className="w-full h-full border-0"
                title="Demo Preview"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => {
                  const pages = currentSection?.pages || [];
                  const currentIndex = pages.findIndex(p => p.path === activePage);
                  if (currentIndex > 0) {
                    setActivePage(pages[currentIndex - 1].path);
                  }
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Page
              </button>
              <div className="text-slate-500 text-sm">
                {currentSection?.pages.findIndex(p => p.path === activePage) !== undefined && (
                  <>
                    Page {(currentSection?.pages.findIndex(p => p.path === activePage) || 0) + 1} of {currentSection?.pages.length}
                  </>
                )}
              </div>
              <button
                onClick={() => {
                  const pages = currentSection?.pages || [];
                  const currentIndex = pages.findIndex(p => p.path === activePage);
                  if (currentIndex < pages.length - 1) {
                    setActivePage(pages[currentIndex + 1].path);
                  }
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                Next Page
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Training Platform?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the complete platform with all features you just explored. White-label it with your brand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/store/licenses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              View Pricing
            </Link>
            <Link
              href="/ai-studio"
              className="bg-purple-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-800 transition border border-white/20"
            >
              Try AI Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
