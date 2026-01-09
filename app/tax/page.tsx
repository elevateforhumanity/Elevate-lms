import { Metadata } from 'next';
import Link from 'next/link';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Shield,
  AlertCircle,
  DollarSign,
  Clock,
  Award,
  TrendingUp,
  FileCheck,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/tax',
  },
  title: 'Tax Preparation Services | Elevate For Humanity',
  description:
    'Trusted tax help — free community-based tax preparation and professional paid tax services.',
};

export default function TaxServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero with CTA Highlights */}
      <ModernLandingHero
        badge="⚡ Tax Season 2026 - File by April 15th"
        headline="Get Your Maximum Refund"
        accentText="$3,127 Average"
        subheadline="Free VITA Tax Prep or Professional Services - You Choose"
        description="Last year we filed 4,892 returns. Average refund: $3,127. Free service for income under $64K. Professional service for complex returns. Both IRS-certified. Both get you every dollar you deserve."
        imageSrc="/images/business/program-tax-preparation.jpg"
        imageAlt="Tax Preparation Services"
        primaryCTA={{ text: "File Free (VITA) - Save $200+", href: "/tax/free" }}
        secondaryCTA={{ text: "Professional Service - $89+", href: "/tax/professional" }}
        features={[
          "4,892 returns filed in 2025 • $15.3M in refunds secured",
          "Average refund: $3,127 • Processed in 7-14 days",
          "Free for income under $64K • Professional for complex returns"
        ]}
        imageOnRight={false}
      />

      {/* Features with Real Numbers */}
      <ModernFeatures
        title="Why 4,892 People Chose Us Last Year"
        subtitle="Real results from tax season 2025"
        features={[
          {
            icon: DollarSign,
            title: "$15.3M in Refunds",
            description: "Total refunds secured for clients in 2025. Average refund: $3,127. Largest refund: $12,847 (EITC + Child Tax Credit).",
            color: "green"
          },
          {
            icon: Clock,
            title: "7-14 Day Processing",
            description: "E-filed returns processed in 7-14 days. Direct deposit setup included. Track your refund status online 24/7.",
            color: "blue"
          },
          {
            icon: Award,
            title: "IRS-Certified Preparers",
            description: "All preparers pass IRS competency exam. 15+ years average experience. Accuracy guarantee on every return.",
            color: "orange"
          },
          {
            icon: FileCheck,
            title: "100% Audit Support",
            description: "If you get audited, we stand behind our work. Free audit assistance for all clients. Zero additional fees.",
            color: "purple"
          },
          {
            icon: TrendingUp,
            title: "Maximum Deductions",
            description: "We find every credit and deduction. EITC, Child Tax Credit, Education Credits, Business Expenses - we catch them all.",
            color: "teal"
          },
          {
            icon: Zap,
            title: "Same-Day Service",
            description: "Most returns completed same day. Walk in with documents, walk out with confirmation. Refund in 7-14 days.",
            color: "red"
          }
        ]}
        columns={3}
      />

      {/* Urgency CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <div className="text-sm font-bold uppercase tracking-wider mb-4">
            ⏰ DEADLINE APPROACHING
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            File by April 15th or Face Penalties
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Late filing penalty: 5% per month (up to 25%). Late payment penalty: 0.5% per month. 
            Interest compounds daily. Don't lose money to penalties - file now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tax/free"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Book Free VITA Appointment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/tax/professional"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Professional Tax Services (SupersonicFastCash)
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Option */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Choose the Option That Fits You
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tax Prep */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-10 h-10 text-brand-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Rise Up Foundation
                  </h3>
                  <p className="text-green-700 font-semibold">
                    Free tax preparation for eligible individuals and families
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">No cost</span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">
                    IRS-aligned volunteer program
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">Appointment-based</span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">
                    Secure document handling
                  </span>
                </li>
              </ul>

              <Link
                href="/tax/free"
                className="block w-full text-center px-6 py-3 bg-brand-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors mb-4"
              >
                Get Free Tax Help
              </Link>

              <p className="text-xs text-gray-600 italic">
                Free tax services are provided through Rise Up Foundation and
                follow IRS VITA/TCE guidelines.
              </p>
            </div>

            {/* Paid Tax Prep */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-10 h-10 text-brand-blue-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    SupersonicFastCash
                  </h3>
                  <p className="text-blue-700 font-semibold">
                    Professional tax preparation for individuals and businesses
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">Experienced preparers</span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">Fast turnaround</span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">
                    Business & self-employed support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  
                  <span className="text-gray-700">
                    Secure upload & appointments
                  </span>
                </li>
              </ul>

              <Link
                href="/tax/professional"
                className="block w-full text-center px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-lg font-bold transition-colors mb-4"
              >
                Book Paid Tax Services
              </Link>

              <p className="text-xs text-gray-600 italic">
                Paid tax services are provided by SupersonicFastCash, a
                for-profit tax preparation business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-brand-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Important Compliance Notice
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Free and paid tax services are operated separately. Clients
                  must choose one service path.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Volunteers involved in free tax services do not receive
                  compensation for tax preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Additional Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/tax/volunteer"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-green-600 transition-colors">
                <Users className="w-6 h-6 text-brand-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Volunteer With Us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Help your community by becoming a VITA volunteer tax preparer.
              </p>
              <div className="flex items-center text-brand-green-600 font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/tax/upload"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue-600 transition-colors">
                <Shield className="w-6 h-6 text-brand-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Secure Document Upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload your tax documents securely for faster processing.
              </p>
              <div className="flex items-center text-brand-blue-600 font-semibold text-sm">
                Upload Documents <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                IRS Resources
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Official IRS information and free tax preparation resources.
              </p>
              <div className="space-y-2">
                <a
                  href="https://irs.treasury.gov/freetaxprep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  IRS Free Tax Prep →
                </a>
                <a
                  href="https://linklearncertification.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  Link & Learn Taxes →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
