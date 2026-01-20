import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, MapPin, FileCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.supersonicfastermoney.com/tax-preparation-texas' },
  title: 'Tax Preparation Texas | SupersonicFasterMoney - Statewide Tax Services',
  description:
    'Professional tax preparation services in Texas. Secure online filing for individuals, families, and independent contractors. Statewide availability.',
};

export default function TaxPreparationTexasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Serving All of Texas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Tax Preparation Services in Texas
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl">
            Texas residents file under a wide range of personal and business income situations. Our
            tax preparation services support accurate filing and clear understanding of the
            submission process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tax/professional" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-bold transition-colors">
              Start Tax Preparation <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Who This Service Is For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {['Individuals and families',
              'Independent contractors',
              'Multi-income households',
              'Filers seeking process clarity'].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Filing Process</h2>
          <p className="text-gray-600 mb-6">The process includes document collection, preparation, review, submission, and processing monitoring.</p>
          <div className="grid md:grid-cols-5 gap-4">
            {['Document collection', 'Preparation', 'Review', 'Submission', 'Monitoring'].map((step, i) => (
              <div key={step} className="bg-white p-4 rounded-lg text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">{i + 1}</div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Security</h2>
          <p className="text-gray-600 mb-8">Services follow governance and security standards.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/governance" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-900">Governance</span>
            </Link>
            <Link href="/governance/security" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <FileCheck className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-gray-900">Security</span>
            </Link>
            <Link href="/governance/compliance" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Clock className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-gray-900">Compliance</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tax Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/tax" className="p-4 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
              <span className="font-semibold text-gray-900">All Tax Services</span>
              <p className="text-sm text-gray-600 mt-1">Overview of tax preparation options</p>
            </Link>
            <Link href="/tax/free" className="p-4 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
              <span className="font-semibold text-gray-900">Free Tax Preparation</span>
              <p className="text-sm text-gray-600 mt-1">VITA program for eligible filers</p>
            </Link>
            <Link href="/tax/professional" className="p-4 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
              <span className="font-semibold text-gray-900">Professional Services</span>
              <p className="text-sm text-gray-600 mt-1">Paid tax preparation options</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to File Your Texas Taxes?</h2>
          <p className="text-xl text-white/90 mb-8">
            Texas residents can begin tax preparation through a guided online process.
          </p>
          <Link href="/tax/professional" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <p className="text-center text-gray-500 text-sm py-8">Last reviewed: January 2026 | Service scope: Statewide availability</p>
    </div>
  );
}
