'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, Users, Award, ArrowRight, 
  Clock, BarChart3, CheckCircle, Star,
  Menu, X, Lock
} from 'lucide-react';

interface SiteConfig {
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
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
  navigation: Array<{ label: string; href: string }>;
  footer: { description: string; contactEmail: string };
  seo: { title: string; description: string; keywords: string[] };
  meta: { previewId: string; organizationName: string };
}

export default function PreviewPage() {
  const params = useParams();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load config from localStorage
    const stored = localStorage.getItem('sitePreviewConfig');
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
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
          <Link href="/generate" className="text-blue-600 hover:underline">
            Generate a new site →
          </Link>
        </div>
      </div>
    );
  }

  const { branding, homepage, programs, navigation, footer } = config;

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Preview Mode - Upgrade to launch your site</span>
          </div>
          <Link
            href={`/store?preview=${params.previewId}`}
            className="px-4 py-1.5 bg-white text-blue-600 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>

      {/* Generated Site Header */}
      <header 
        className="sticky top-0 z-40 shadow-sm"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-white" />
              <span className="font-bold text-xl text-white">{branding.logoText}</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                className="px-5 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: branding.accentColor }}
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 px-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-white/90"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section 
        className="py-20 px-4"
        style={{ 
          background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {homepage.heroTitle}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {homepage.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105"
              style={{ backgroundColor: branding.accentColor, color: 'white' }}
            >
              {homepage.heroCtaText}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black" style={{ color: branding.primaryColor }}>500+</p>
              <p className="text-slate-600">Students Trained</p>
            </div>
            <div>
              <p className="text-4xl font-black" style={{ color: branding.primaryColor }}>95%</p>
              <p className="text-slate-600">Completion Rate</p>
            </div>
            <div>
              <p className="text-4xl font-black" style={{ color: branding.primaryColor }}>50+</p>
              <p className="text-slate-600">Partner Employers</p>
            </div>
            <div>
              <p className="text-4xl font-black" style={{ color: branding.primaryColor }}>4.9</p>
              <p className="text-slate-600">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {homepage.features.map((feature, idx) => {
              const icons = [GraduationCap, Users, Award];
              const Icon = icons[idx % icons.length];
              return (
                <div key={feature.title} className="text-center p-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${branding.primaryColor}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: branding.primaryColor }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">Our Programs</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Industry-recognized training programs designed to launch your career.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.name} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-3"
                  style={{ backgroundColor: branding.primaryColor }}
                />
                <div className="p-6">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ 
                      backgroundColor: `${branding.accentColor}20`,
                      color: branding.accentColor 
                    }}
                  >
                    {program.level}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                  <p className="text-slate-600 mb-4">{program.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      {program.level}
                    </span>
                  </div>
                  <button
                    className="w-full mt-4 py-3 rounded-lg font-medium transition-colors"
                    style={{ 
                      backgroundColor: branding.primaryColor,
                      color: 'white'
                    }}
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-slate-700 mb-6">
            "This program changed my life. I went from unemployed to earning $50,000 
            in just 6 months. The instructors were amazing and the career support was invaluable."
          </blockquote>
          <p className="text-slate-500">— Sarah M., Program Graduate</p>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 px-4"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 mb-8">
            Join hundreds of successful graduates. Your new career starts here.
          </p>
          <button
            className="px-8 py-4 rounded-lg font-bold text-lg"
            style={{ backgroundColor: branding.accentColor, color: 'white' }}
          >
            Apply Now - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6" />
                <span className="font-bold">{branding.logoText}</span>
              </div>
              <p className="text-slate-400 text-sm">{footer.description}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {programs.map((p) => (
                  <li key={p.name}><a href="#" className="hover:text-white">{p.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm">{footer.contactEmail}</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} {branding.logoText}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Upgrade Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href={`/store?preview=${params.previewId}`}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          <Lock className="w-4 h-4" />
          Upgrade to Launch
        </Link>
      </div>
    </div>
  );
}
