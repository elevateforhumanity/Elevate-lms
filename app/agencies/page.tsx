import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  TrendingUp,
  FileCheck,
  Phone,
  CheckCircle,
  DollarSign,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Agencies | Government-Aligned Workforce Infrastructure',
  description:
    'DOL registered. ETPL approved. WIOA compliant. License our workforce development platform.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/agencies',
  },
};

export default function AgenciesPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/heroes/workforce-partner-1.jpg"
          alt="Workforce agencies and partners"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Government-Aligned
                <br />
                Workforce Infrastructure
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                DOL registered. ETPL approved. WIOA compliant. Ready to license.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE ALIGNMENT POINTS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Government Alignment
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                DOL Registered Apprenticeship Sponsor
              </h3>
              <p className="text-black mb-4">
                U.S. Department of Labor official registration
              </p>
              <div className="font-mono text-sm text-black">
                RAPIDS: 2025-IN-132301
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                ETPL Approved Provider
              </h3>
              <p className="text-black mb-4">
                Indiana Department of Workforce Development approved
              </p>
              <div className="font-mono text-sm text-black">
                Active since 2020
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                WIOA Compliant Programs
              </h3>
              <p className="text-black mb-4">
                All programs eligible for workforce funding
              </p>
              <div className="font-mono text-sm text-black">
                1,500+ participants tracked
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET (CAPABILITIES) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            What You Get
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Real-Time Compliance Dashboards
                </h3>
                <p className="text-black">
                  RAPIDS, ETPL, and WIOA reporting automated. No manual data
                  entry.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Automated Reporting
                </h3>
                <p className="text-black">
                  Generate compliance reports with one click. Audit-ready
                  documentation.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Multi-Tenant Architecture
                </h3>
                <p className="text-black">
                  White-label ready. Deploy for multiple regions or providers
                  simultaneously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                WorkOne Regions
              </h3>
              <p className="text-black mb-6">
                Track WIOA and WRG funded participants, monitor outcomes,
                generate compliance reports automatically.
              </p>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Automated RAPIDS reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Outcome tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Training Providers
              </h3>
              <p className="text-black mb-6">
                License our platform to deliver workforce-funded programs
                without building your own LMS and compliance systems.
              </p>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>White-label LMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Mobile app included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Certificate generation</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                State Agencies
              </h3>
              <p className="text-black mb-6">
                Monitor statewide workforce initiatives, track performance
                metrics, ensure compliance across multiple providers.
              </p>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Multi-provider oversight</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Custom reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Nonprofits
              </h3>
              <p className="text-black mb-6">
                Deliver accredited training programs with built-in funding
                navigation and employer connections.
              </p>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Grant-ready programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Employer partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Outcome tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF (METRICS) */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Proven Track Record
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="text-5xl font-bold text-green-600 mb-2">5</div>
              <div className="text-black text-lg">
                DOL Registered Programs
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="text-5xl font-bold text-green-600 mb-2">2020</div>
              <div className="text-black text-lg">ETPL Approved Since</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="text-5xl font-bold text-green-600 mb-2">
                1,500+
              </div>
              <div className="text-black text-lg">
                WIOA Participants Tracked
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Platform Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'RAPIDS integration',
              'ETPL reporting',
              'Multi-tenant SaaS',
              'Mobile app (iOS/Android)',
              'AI tutoring',
              'Gamification',
              'Push notifications',
              'Offline mode',
              'Certificate generation',
              'Employer dashboards',
              'Compliance automation',
              'Real-time analytics',
            ].map((capability) => (
              <div
                key={capability}
                className="bg-slate-50 rounded-lg p-4 flex items-center gap-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-black font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Schedule a Platform Demo
          </h2>
          <p className="text-xl text-green-100 mb-8">
            See how our workforce infrastructure can support your organization's
            goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-green-600 rounded-lg font-bold text-xl hover:bg-green-50 transition shadow-2xl"
            >
              <Phone className="h-6 w-6" />
              Call (317) 314-3757
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-700 text-white rounded-lg font-bold text-xl hover:bg-green-800 transition border-2 border-white"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-green-100">
            Or email{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="underline font-semibold hover:text-white"
            >
              elevate4humanityedu@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
