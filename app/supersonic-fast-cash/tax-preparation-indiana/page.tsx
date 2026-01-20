import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Award,
  Shield,
  MapPin,
  Phone,
  FileCheck,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.supersonicfastermoney.com/tax-preparation-indiana',
  },
  title: 'Tax Preparation Indiana | SupersonicFasterMoney - Indianapolis Tax Services',
  description:
    'Professional tax preparation services in Indiana. IRS-certified preparers serving Indianapolis, Fort Wayne, Evansville, and statewide. Fast refunds, maximum deductions, audit support included.',
  openGraph: {
    title: 'Tax Preparation Indiana | SupersonicFasterMoney',
    description:
      'Professional tax preparation services across Indiana. Fast refunds, maximum deductions, IRS-certified preparers.',
    url: 'https://www.supersonicfastermoney.com/tax-preparation-indiana',
    siteName: 'SupersonicFasterMoney',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Indiana Tax Services' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Preparation Indiana | SupersonicFasterMoney',
    description: 'Professional tax preparation services across Indiana.',
    images: ['/og-default.jpg'],
  },
};

export default function TaxPreparationIndianaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Serving All of Indiana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Indiana Tax Preparation Services
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Professional tax preparation for Indiana residents and businesses. Our IRS-certified
            preparers understand Indiana state tax requirements, Hoosier-specific deductions, and
            local filing obligations. Serving Indianapolis, Fort Wayne, Evansville, South Bend, and
            communities statewide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tax/professional"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-bold transition-colors"
            >
              Book Indiana Tax Appointment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/tax/upload"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg text-lg font-bold transition-colors"
            >
              Upload Documents Securely
            </Link>
          </div>
        </div>
      </section>

      {/* Indiana-Specific Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Indiana Residents Choose SupersonicFasterMoney
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We specialize in Indiana tax situations - from state income tax to county tax
            obligations across all 92 Indiana counties.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Indiana Tax Expertise</h3>
              <p className="text-gray-600">
                We handle Indiana's flat 3.05% state income tax plus your county tax. We know which
                of Indiana's 92 counties you owe to and ensure accurate filing.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Indiana Refunds</h3>
              <p className="text-gray-600">
                E-filed Indiana returns typically process in 2-3 weeks. We set up direct deposit and
                track both federal and state refunds for you.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hoosier Deductions</h3>
              <p className="text-gray-600">
                Indiana offers unique deductions including the $1,000 renter's deduction, 529 plan
                contributions, and military pay exclusions. We find them all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Indiana */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Tax Services for Indiana Residents
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Tax Returns</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Federal Form 1040 + Indiana IT-40</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">County income tax calculation (all 92 counties)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Indiana renter's deduction ($3,000 max)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CollegeChoice 529 deduction (up to $5,000)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Earned Income Credit optimization</span>
                </li>
              </ul>
              <p className="text-2xl font-bold text-gray-900">
                Starting at <span className="text-green-600">$89</span>
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Tax Returns</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Indiana IT-20 (Corporate) / IT-65 (Partnership)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Self-employment and Schedule C</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Indiana sales tax compliance review</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quarterly estimated tax planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Multi-state filing for border businesses</span>
                </li>
              </ul>
              <p className="text-2xl font-bold text-gray-900">
                Starting at <span className="text-green-600">$199</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Trusted Tax Preparation with Full Compliance
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">IRS-Certified Preparers</h3>
                <p className="text-gray-600">
                  All our tax preparers are IRS-certified and complete annual training on federal
                  and Indiana state tax law changes.
                </p>
                <Link href="/governance/compliance" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  View our compliance standards →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Audit Protection Included</h3>
                <p className="text-gray-600">
                  Every return includes audit support. If the IRS or Indiana DOR contacts you, we
                  represent you at no additional cost.
                </p>
                <Link href="/governance/security" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn about our security practices →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local Indiana Support</h3>
                <p className="text-gray-600">
                  Questions about your Indiana return? Our team understands Hoosier tax situations
                  and provides personalized support.
                </p>
                <Link href="/tax/free" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Explore free tax options →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Maximum Refund Guarantee</h3>
                <p className="text-gray-600">
                  We guarantee the largest refund you're legally entitled to. If you find a bigger
                  refund elsewhere, we'll refund our fee.
                </p>
                <Link href="/tax/professional" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  See all professional services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indiana Locations */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Serving Indiana Communities</h2>
          <p className="text-blue-200 text-center mb-12 max-w-2xl mx-auto">
            We serve clients throughout Indiana with both in-person and virtual tax preparation
            options.
          </p>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="font-bold text-lg mb-2">Indianapolis Metro</h3>
              <p className="text-blue-200 text-sm">
                Marion County, Hamilton County, Hendricks County, Johnson County
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Northern Indiana</h3>
              <p className="text-blue-200 text-sm">
                Fort Wayne, South Bend, Elkhart, Gary, Hammond
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Southern Indiana</h3>
              <p className="text-blue-200 text-sm">
                Evansville, Bloomington, Columbus, New Albany
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Central Indiana</h3>
              <p className="text-blue-200 text-sm">
                Lafayette, Muncie, Anderson, Terre Haute, Kokomo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to File Your Indiana Taxes?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get your maximum refund with Indiana's trusted tax preparation service. Book your
            appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tax/professional"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Book Tax Appointment
            </Link>
            <Link
              href="/tax"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition-colors"
            >
              View All Tax Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
