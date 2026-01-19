'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, Users, Award, ArrowRight, 
  Clock, BarChart3, CheckCircle, Star,
  Menu, X, Lock, Play, ChevronRight,
  BookOpen, Trophy, Briefcase
} from 'lucide-react';

interface SiteConfig {
  template?: {
    id: string;
    name: string;
    fonts: { heading: string; body: string; googleFontsUrl: string };
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      surfaceAlt: string;
      text: string;
      textMuted: string;
      textOnPrimary: string;
      border: string;
    };
    style: {
      borderRadius: string;
      heroStyle: string;
      cardStyle: string;
      buttonStyle: string;
    };
  };
  branding: {
    primaryColor: string;
    secondaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    logoText: string;
    tagline: string;
  };
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    features: Array<{ title: string; description: string }>;
  };
  programs: Array<{ name: string; description: string; duration: string; level: string }>;
  stats?: { students: number; completionRate: string; employers: number; rating: string };
  testimonial?: { quote: string; author: string };
  navigation: Array<{ label: string; href: string }>;
  footer: { description: string; contactEmail: string };
  meta: { previewId: string; organizationName: string };
}

// Default template colors
const defaultColors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  background: '#ffffff',
  surface: '#f8fafc',
  surfaceAlt: '#f1f5f9',
  text: '#0f172a',
  textMuted: '#64748b',
  textOnPrimary: '#ffffff',
  border: '#e2e8f0',
};

export default function PreviewPage() {
  const params = useParams();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sitePreviewConfig');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConfig(parsed);
      } catch {
        // Invalid config
      }
    }
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Preview Not Found</h1>
          <p className="text-slate-600 mb-4">This preview may have expired.</p>
          <Link href="/builder" className="text-blue-600 hover:underline">
            Generate a new site →
          </Link>
        </div>
      </div>
    );
  }

  // Get colors from template or branding
  const colors = config.template?.colors || {
    ...defaultColors,
    primary: config.branding.primaryColor,
    secondary: config.branding.secondaryColor || defaultColors.secondary,
    accent: config.branding.accentColor || defaultColors.accent,
  };

  const fonts = config.template?.fonts || {
    heading: 'Inter',
    body: 'Inter',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  };

  const style = config.template?.style || {
    borderRadius: 'lg',
    heroStyle: 'centered',
    cardStyle: 'elevated',
    buttonStyle: 'solid',
  };

  const { branding, homepage, programs, stats, testimonial, navigation, footer } = config;

  // Border radius mapping
  const radiusClass = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[style.borderRadius] || 'rounded-lg';

  const buttonRadius = style.buttonStyle === 'solid' ? radiusClass : 'rounded-full';

  return (
    <>
      {/* Google Fonts */}
      <link rel="stylesheet" href={fonts.googleFontsUrl} />
      
      <div 
        className="min-h-screen"
        style={{ 
          fontFamily: `${fonts.body}, sans-serif`,
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        {/* Preview Banner */}
        <div 
          className="py-3 px-4 text-center text-sm font-medium"
          style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`, color: colors.textOnPrimary }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
            <Lock className="w-4 h-4" />
            <span>Preview Mode - This is how your site will look</span>
            <Link
              href={`/store?preview=${params.previewId}`}
              className="px-4 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm font-bold transition-colors"
            >
              Upgrade to Launch →
            </Link>
          </div>
        </div>

        {/* Header */}
        <header 
          className="sticky top-0 z-40 border-b"
          style={{ 
            backgroundColor: colors.background,
            borderColor: colors.border,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <GraduationCap className="w-6 h-6" style={{ color: colors.textOnPrimary }} />
                </div>
                <span 
                  className="font-bold text-xl"
                  style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                >
                  {branding.logoText}
                </span>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navigation.map((item, idx) => (
                  <a
                    key={`nav-${idx}`}
                    href={item.href}
                    className="font-medium transition-colors hover:opacity-80"
                    style={{ color: colors.textMuted }}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  className={`px-5 py-2 font-semibold transition-all hover:opacity-90 ${buttonRadius}`}
                  style={{ backgroundColor: colors.primary, color: colors.textOnPrimary }}
                >
                  Get Started
                </button>
              </nav>

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: colors.text }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t px-4 py-4" style={{ borderColor: colors.border }}>
              {navigation.map((item, idx) => (
                <a
                  key={`mobile-nav-${idx}`}
                  href={item.href}
                  className="block py-2 font-medium"
                  style={{ color: colors.textMuted }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section 
          className="relative overflow-hidden"
          style={{ 
            background: style.heroStyle === 'centered' 
              ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
              : colors.background,
          }}
        >
          {style.heroStyle === 'centered' ? (
            // Centered Hero
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
                style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.textOnPrimary }}
              >
                {homepage.heroTitle}
              </h1>
              <p 
                className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto"
                style={{ color: colors.textOnPrimary }}
              >
                {homepage.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className={`px-8 py-4 font-bold text-lg transition-transform hover:scale-105 ${buttonRadius}`}
                  style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                >
                  {homepage.heroCtaText}
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
                <button
                  className={`px-8 py-4 font-bold text-lg border-2 transition-colors hover:bg-white/10 ${buttonRadius}`}
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: colors.textOnPrimary }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ) : (
            // Split Hero
            <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 
                  className="text-4xl md:text-5xl font-black mb-6"
                  style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                >
                  {homepage.heroTitle}
                </h1>
                <p className="text-xl mb-8" style={{ color: colors.textMuted }}>
                  {homepage.heroSubtitle}
                </p>
                <button
                  className={`px-8 py-4 font-bold text-lg transition-transform hover:scale-105 ${buttonRadius}`}
                  style={{ backgroundColor: colors.primary, color: colors.textOnPrimary }}
                >
                  {homepage.heroCtaText}
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
              </div>
              <div 
                className={`aspect-video flex items-center justify-center ${radiusClass}`}
                style={{ backgroundColor: colors.surface }}
              >
                <Play className="w-16 h-16" style={{ color: colors.primary }} />
              </div>
            </div>
          )}
        </section>

        {/* Stats Section */}
        {stats && (
          <section className="py-12 border-y" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl font-black" style={{ color: colors.primary }}>{stats.students}+</p>
                  <p style={{ color: colors.textMuted }}>Students Trained</p>
                </div>
                <div>
                  <p className="text-4xl font-black" style={{ color: colors.primary }}>{stats.completionRate}</p>
                  <p style={{ color: colors.textMuted }}>Completion Rate</p>
                </div>
                <div>
                  <p className="text-4xl font-black" style={{ color: colors.primary }}>{stats.employers}+</p>
                  <p style={{ color: colors.textMuted }}>Partner Employers</p>
                </div>
                <div>
                  <p className="text-4xl font-black" style={{ color: colors.primary }}>{stats.rating}</p>
                  <p style={{ color: colors.textMuted }}>Student Rating</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-black text-center mb-4"
              style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
            >
              Why Choose Us
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
              We provide everything you need to succeed in your career journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {homepage.features.map((feature, idx) => {
                const icons = [BookOpen, Trophy, Briefcase];
                const Icon = icons[idx % icons.length];
                return (
                  <div 
                    key={`feature-${idx}`} 
                    className={`p-8 text-center transition-transform hover:-translate-y-1 ${radiusClass}`}
                    style={{ 
                      backgroundColor: style.cardStyle === 'elevated' ? colors.background : colors.surface,
                      boxShadow: style.cardStyle === 'elevated' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                      border: style.cardStyle === 'bordered' ? `1px solid ${colors.border}` : 'none',
                    }}
                  >
                    <div 
                      className={`w-16 h-16 flex items-center justify-center mx-auto mb-4 ${radiusClass}`}
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: colors.primary }} />
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: colors.textMuted }}>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.surface }}>
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-black text-center mb-4"
              style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
            >
              Our Programs
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
              Industry-recognized training programs designed to launch your career.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, idx) => (
                <div 
                  key={`program-${idx}`}
                  className={`overflow-hidden transition-transform hover:-translate-y-1 ${radiusClass}`}
                  style={{ 
                    backgroundColor: colors.background,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="h-2" style={{ backgroundColor: colors.primary }} />
                  <div className="p-6">
                    <span 
                      className={`inline-block px-3 py-1 text-xs font-semibold mb-3 ${radiusClass}`}
                      style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
                    >
                      {program.level}
                    </span>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                    >
                      {program.name}
                    </h3>
                    <p className="mb-4" style={{ color: colors.textMuted }}>{program.description}</p>
                    <div className="flex items-center gap-4 text-sm" style={{ color: colors.textMuted }}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </span>
                    </div>
                    <button
                      className={`w-full mt-4 py-3 font-semibold transition-colors hover:opacity-90 ${radiusClass}`}
                      style={{ backgroundColor: colors.primary, color: colors.textOnPrimary }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {testimonial && (
          <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[1,2,3,4,5].map((i) => (
                  <Star key={`star-${i}`} className="w-6 h-6" style={{ fill: colors.accent, color: colors.accent }} />
                ))}
              </div>
              <blockquote 
                className="text-2xl md:text-3xl font-medium mb-6 italic"
                style={{ color: colors.text }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p style={{ color: colors.textMuted }}>— {testimonial.author}</p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section 
          className="py-20 px-4"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.textOnPrimary }}
            >
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90" style={{ color: colors.textOnPrimary }}>
              Join hundreds of successful graduates. Your new career starts here.
            </p>
            <button
              className={`px-8 py-4 font-bold text-lg transition-transform hover:scale-105 ${buttonRadius}`}
              style={{ backgroundColor: colors.accent, color: '#ffffff' }}
            >
              Apply Now - It&apos;s Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4" style={{ backgroundColor: colors.text }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6" style={{ color: colors.textOnPrimary }} />
                  <span 
                    className="font-bold"
                    style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.textOnPrimary }}
                  >
                    {branding.logoText}
                  </span>
                </div>
                <p className="text-sm opacity-70" style={{ color: colors.textOnPrimary }}>
                  {footer.description}
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: colors.textOnPrimary }}>Programs</h4>
                <ul className="space-y-2 text-sm opacity-70" style={{ color: colors.textOnPrimary }}>
                  {programs.map((p, idx) => (
                    <li key={`footer-program-${idx}`}>
                      <a href="#" className="hover:opacity-100">{p.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: colors.textOnPrimary }}>Company</h4>
                <ul className="space-y-2 text-sm opacity-70" style={{ color: colors.textOnPrimary }}>
                  <li><a href="#" className="hover:opacity-100">About Us</a></li>
                  <li><a href="#" className="hover:opacity-100">Careers</a></li>
                  <li><a href="#" className="hover:opacity-100">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: colors.textOnPrimary }}>Contact</h4>
                <p className="text-sm opacity-70" style={{ color: colors.textOnPrimary }}>
                  {footer.contactEmail}
                </p>
              </div>
            </div>
            <div 
              className="border-t pt-8 text-center text-sm opacity-50"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: colors.textOnPrimary }}
            >
              © {new Date().getFullYear()} {branding.logoText}. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Floating Upgrade Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href={`/store?preview=${params.previewId}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            style={{ 
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              color: colors.textOnPrimary,
            }}
          >
            <Lock className="w-4 h-4" />
            Upgrade to Launch
          </Link>
        </div>
      </div>
    </>
  );
}
