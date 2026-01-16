import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { ROUTES } from '@/lib/pricing';
import { GuidedDemoChat } from '@/components/store/GuidedDemoChat';

export const metadata: Metadata = {
  title: 'License the Elevate LMS | Elevate for Humanity',
  description: 'White-label LMS + Workforce Platform Licensing. Built for training providers, workforce boards, and employer partners.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license',
  },
};

const navLinks = [
  { href: ROUTES.license, label: 'Overview' },
  { href: ROUTES.licenseFeatures, label: 'Features' },
  { href: ROUTES.licenseIntegrations, label: 'Integrations' },
  { href: ROUTES.licensePricing, label: 'Pricing' },
  { href: ROUTES.licenseDemo, label: 'Demo' },
];

export default function LicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-lg font-bold text-slate-900 hover:text-orange-600 transition">
              Elevate for Humanity
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-4 h-4" />
              Schedule Demo
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden pb-3 flex gap-1 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            We host live demos via Google Meet so we can tailor the walkthrough to your use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </Link>
            <Link
              href={ROUTES.demo}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition"
            >
              Explore Demo Pages
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-400 text-sm hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-slate-400 text-sm hover:text-white transition">Terms</Link>
              <Link href="/contact" className="text-slate-400 text-sm hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Guided Demo Chat */}
      <GuidedDemoChat />
    </div>
  );
}
