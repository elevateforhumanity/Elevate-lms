'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, Users, Award, ArrowRight, 
  Clock, BarChart3, CheckCircle, Star,
  Menu, X, Lock, Play, ChevronRight,
  BookOpen, Trophy, Briefcase, Mail, Phone, MapPin
} from 'lucide-react';

// Unsplash images for different industries
const INDUSTRY_IMAGES: Record<string, { hero: string; programs: string[]; features: string[] }> = {
  default: {
    hero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    programs: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    ],
    features: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
    ],
  },
  technology: {
    hero: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80',
    programs: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    ],
    features: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    ],
  },
  healthcare: {
    hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80',
    programs: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80',
    ],
    features: [
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    ],
  },
  construction: {
    hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    programs: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80',
    ],
    features: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
      'https://images.unsplash.com/photo-1590644365607-1c5a0a1e0a1e?w=600&q=80',
    ],
  },
  manufacturing: {
    hero: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80',
    programs: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    features: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&q=80',
    ],
  },
};

function getIndustryImages(industry?: string): { hero: string; programs: string[]; features: string[] } {
  if (!industry) return INDUSTRY_IMAGES.default;
  const key = industry.toLowerCase();
  if (key.includes('tech') || key.includes('software') || key.includes('it')) return INDUSTRY_IMAGES.technology;
  if (key.includes('health') || key.includes('medical') || key.includes('nursing')) return INDUSTRY_IMAGES.healthcare;
  if (key.includes('construction') || key.includes('trade') || key.includes('hvac') || key.includes('electrical')) return INDUSTRY_IMAGES.construction;
  if (key.includes('manufacturing') || key.includes('industrial')) return INDUSTRY_IMAGES.manufacturing;
  return INDUSTRY_IMAGES.default;
}

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
  meta: { previewId: string; organizationName: string; industry?: string };
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

  // Get industry-specific images
  const images = getIndustryImages(config.meta?.industry);

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
        <section className="relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={images.hero}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}ee 0%, ${colors.secondary}dd 100%)`,
              }}
            />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
              style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.textOnPrimary }}
            >
              {homepage.heroTitle}
            </h1>
            <p 
              className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textOnPrimary }}
            >
              {homepage.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className={`px-8 py-4 font-bold text-lg transition-all hover:scale-105 hover:shadow-xl ${buttonRadius}`}
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                {homepage.heroCtaText}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              <button
                className={`px-8 py-4 font-bold text-lg border-2 transition-all hover:bg-white/20 ${buttonRadius}`}
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: colors.textOnPrimary, backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                Watch Video
                <Play className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats && (
          <section className="py-16" style={{ backgroundColor: colors.background }}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center p-6">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <Users className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-4xl font-black mb-1" style={{ color: colors.primary }}>{stats.students}+</p>
                  <p className="font-medium" style={{ color: colors.textMuted }}>Students Trained</p>
                </div>
                <div className="text-center p-6">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.accent}15` }}
                  >
                    <Trophy className="w-8 h-8" style={{ color: colors.accent }} />
                  </div>
                  <p className="text-4xl font-black mb-1" style={{ color: colors.primary }}>{stats.completionRate}</p>
                  <p className="font-medium" style={{ color: colors.textMuted }}>Completion Rate</p>
                </div>
                <div className="text-center p-6">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.secondary}15` }}
                  >
                    <Briefcase className="w-8 h-8" style={{ color: colors.secondary }} />
                  </div>
                  <p className="text-4xl font-black mb-1" style={{ color: colors.primary }}>{stats.employers}+</p>
                  <p className="font-medium" style={{ color: colors.textMuted }}>Partner Employers</p>
                </div>
                <div className="text-center p-6">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <Star className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-4xl font-black mb-1" style={{ color: colors.primary }}>{stats.rating}</p>
                  <p className="font-medium" style={{ color: colors.textMuted }}>Student Rating</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trusted By Section */}
        <section className="py-12 border-y" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-center text-sm font-medium mb-8 uppercase tracking-wider" style={{ color: colors.textMuted }}>
              Trusted by leading organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company, idx) => (
                <div 
                  key={`company-${idx}`}
                  className="text-2xl font-bold"
                  style={{ color: colors.textMuted }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-black text-center mb-4"
              style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
            >
              Why Choose Us
            </h2>
            <p className="text-center mb-16 max-w-2xl mx-auto text-lg" style={{ color: colors.textMuted }}>
              We provide everything you need to succeed in your career journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {homepage.features.map((feature, idx) => {
                const icons = [BookOpen, Trophy, Briefcase];
                const Icon = icons[idx % icons.length];
                return (
                  <div 
                    key={`feature-${idx}`} 
                    className={`group overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl ${radiusClass}`}
                    style={{ 
                      backgroundColor: colors.background,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {/* Feature Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={images.features[idx % images.features.length]}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${colors.background}, transparent)` }}
                      />
                      <div 
                        className={`absolute bottom-4 left-4 w-12 h-12 flex items-center justify-center ${radiusClass}`}
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Icon className="w-6 h-6" style={{ color: colors.textOnPrimary }} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                      >
                        {feature.title}
                      </h3>
                      <p style={{ color: colors.textMuted }}>{feature.description}</p>
                    </div>
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
                  className={`overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl ${radiusClass}`}
                  style={{ 
                    backgroundColor: colors.background,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Program Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={images.programs[idx % images.programs.length]}
                      alt={program.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${colors.primary}40, transparent)` }}
                    />
                    <span 
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold ${radiusClass}`}
                      style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                    >
                      {program.level}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: `${fonts.heading}, sans-serif`, color: colors.text }}
                    >
                      {program.name}
                    </h3>
                    <p className="mb-4 line-clamp-2" style={{ color: colors.textMuted }}>{program.description}</p>
                    <div className="flex items-center justify-between text-sm mb-4" style={{ color: colors.textMuted }}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Open Enrollment
                      </span>
                    </div>
                    <button
                      className={`w-full py-3 font-semibold transition-all hover:opacity-90 ${radiusClass}`}
                      style={{ backgroundColor: colors.primary, color: colors.textOnPrimary }}
                    >
                      Learn More
                      <ArrowRight className="inline-block ml-2 w-4 h-4" />
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
