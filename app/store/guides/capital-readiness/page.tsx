import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, 
  BookOpen, 
  FileText, 
  Award, 
  Building2, 
  Users, 
  TrendingUp,
  Download,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Capital Readiness Guide | Elevate Store',
  description: 'Build trust before you chase capital. A practical guide for licensed businesses, workforce-aligned employers, and nonprofits.',
};

export default function CapitalReadinessGuidePage() {
  const features = [
    { icon: BookOpen, text: 'Full ebook (PDF)' },
    { icon: FileText, text: 'Integrated workbook' },
    { icon: TrendingUp, text: 'Readiness scoring system' },
    { icon: Download, text: 'Lifetime updates' },
  ];

  const audiences = [
    'Workforce-funded organizations',
    'Licensed operators',
    'Employers',
    'Nonprofits',
    'Program administrators',
  ];

  const chapters = [
    "You're Not Broke. You're Untrusted (Yet)",
    'The First Gate: Separating Yourself from the Business',
    'Credit Is a Reputation System',
    'Banking Behavior Tells the Truth',
    'Taxes Are the Loudest Quiet Signal',
    'Public Funding Is Not Flexible Money',
    'Growth Reveals Cracks',
    'The Elevate Model',
    'Capital Readiness Levels',
    'Capital Follows Discipline',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-blue-600/20 text-blue-400 text-sm font-medium rounded-full mb-6">
                Digital Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Elevate Capital Readiness Guide
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                Build trust before you chase capital.
              </p>
              <p className="text-lg text-slate-400 mb-8">
                A practical, human guide for licensed businesses, workforce-aligned employers, 
                and nonprofits that want funding, credibility, and sustainable growth—without shortcuts.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/store/checkout?product=capital-readiness-guide"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Buy Now — $39
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#preview"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-800 transition"
                >
                  Preview Contents
                </Link>
              </div>

              <p className="text-sm text-slate-500">
                Free inside Elevate programs • Included with enterprise licenses
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-[3/4] bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Capital Readiness Guide</h3>
                    <p className="text-slate-600 text-sm">Elevate for Humanity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <p className="font-semibold text-slate-900">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who This Guide Is For</h2>
              <p className="text-lg text-slate-600 mb-8">
                This guide breaks down how institutions actually evaluate organizations. 
                Through real-world scenarios, readiness levels, and actionable checklists, 
                you'll learn how to build systems that survive audits, earn trust, and scale responsibly.
              </p>
              <ul className="space-y-4">
                {audiences.map((audience, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-lg text-slate-700">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Workforce-Funded Organizations</h3>
                    <p className="text-slate-600 text-sm">Navigate WIOA, reporting, and audit requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Licensed Operators</h3>
                    <p className="text-slate-600 text-sm">Build institutional trust and compliance systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Nonprofits & Employers</h3>
                    <p className="text-slate-600 text-sm">Access funding and scale sustainably</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="preview" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">What's Inside</h2>
          <p className="text-center text-slate-600 mb-12">10 chapters of practical, actionable guidance</p>
          
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {chapters.map((chapter, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-5 ${index !== chapters.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </span>
                <span className="text-slate-900">{chapter}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Elevate Model */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">The Elevate Model</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            A proven framework for building durable, fundable organizations
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 lg:gap-0">
            {['Education', 'Compliance', 'Capital', 'Sustainability'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold">
                  {step}
                </div>
                {index < 3 && (
                  <ArrowRight className="w-6 h-6 text-slate-400 mx-2 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness Levels */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Capital Readiness Levels</h2>
          <p className="text-center text-slate-400 mb-12">Where does your organization stand?</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Informal</h3>
              <p className="text-slate-400">Founder-led. Reactive. Memory-based.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Documented</h3>
              <p className="text-slate-400">Systems exist. Processes written. Time-dependent.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Institutional</h3>
              <p className="text-slate-400">Systems run without personalities. Trust compounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Get the Guide</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Start building institutional trust today. Includes the full ebook, integrated workbook, 
              and readiness scoring system.
            </p>
            
            <div className="text-5xl font-bold mb-2">$39</div>
            <p className="text-blue-200 mb-8">One-time purchase • Lifetime updates</p>
            
            <Link
              href="/store/checkout?product=capital-readiness-guide"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Buy Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-sm text-blue-200 mt-6">
              Free inside Elevate programs • Included with enterprise licenses
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Enterprise & Licensing</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Need this for your workforce program, employer training, or organizational onboarding? 
            We offer white-labeled versions with LMS integration, instructor guides, and custom pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-900 hover:text-white transition"
          >
            Contact for Enterprise Pricing
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500 text-center">
            This guide is educational only. It is not legal, tax, or financial advice. 
            Outcomes vary based on execution. References include IRS business compliance standards, 
            general underwriting practices, WIOA/workforce reporting norms, and state audit readiness expectations.
          </p>
        </div>
      </section>
    </div>
  );
}
