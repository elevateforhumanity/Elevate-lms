import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, FileCheck, Users, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Preparation Services in Texas | Supersonic Fast Cash',
  description: 'Professional tax preparation for Texas residents. No state income tax—maximize your federal refund. IRS-compliant, secure, expert filing.',
  keywords: ['tax preparation Texas', 'file taxes Texas', 'tax help Texas', 'Texas tax services', 'tax filing Houston Dallas Austin San Antonio'],
  alternates: {
    canonical: 'https://supersonicfastmoney.com/tax-preparation-texas',
  },
  openGraph: {
    title: 'Tax Preparation Services in Texas | Supersonic Fast Cash',
    description: 'Professional tax preparation for Texas residents. Maximize your federal refund with expert help.',
    url: 'https://supersonicfastmoney.com/tax-preparation-texas',
    type: 'website',
  },
};

export default function TaxPreparationTexasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 to-red-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tax Preparation Services in Texas
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mb-8">
            Texas has no state income tax—but your federal return is where the money is. 
            From Houston to Dallas, Austin to San Antonio, we help Lone Star State residents 
            maximize their federal refunds and claim every credit available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center px-6 py-3 bg-white text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/supersonic-fast-cash/how-it-works"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Texas-Specific Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Tax Filing for Texas Residents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-black mb-4">
                Texas is one of only seven states with no personal income tax. This means 
                you only file a federal return—but that federal return is critical. Your 
                refund depends on proper withholding, claiming all eligible credits, and 
                accurate deduction calculations.
              </p>
              <p className="text-lg text-black mb-4">
                For self-employed Texans, there&apos;s no state self-employment tax to worry 
                about, but federal self-employment tax still applies. We help you track 
                deductions and minimize your federal tax liability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold text-black mb-4">Texas Tax Facts</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  No state income tax on wages, salaries, or investments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Federal return determines your entire refund
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  No state filing deadline—only federal April 15
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Higher property and sales taxes offset no income tax
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Who We Serve in Texas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Working Families</h3>
              <p className="text-black">
                Maximize EITC, Child Tax Credit, and other federal credits. Texas 
                families often qualify for significant refunds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Building className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Oil & Gas Workers</h3>
              <p className="text-black">
                Texas energy sector workers with variable income, per diem, and 
                travel expenses need specialized tax handling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <FileCheck className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Self-Employed & Contractors</h3>
              <p className="text-black">
                Freelancers, gig workers, and independent contractors across Texas&apos;s 
                booming economy need proper Schedule C filing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            How Filing Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload Documents', desc: 'Securely upload your W-2s, 1099s, and any deduction documentation.' },
              { step: '2', title: 'We Prepare', desc: 'Our team prepares your federal return, maximizing every credit.' },
              { step: '3', title: 'Review & Approve', desc: 'Review your completed return and ask questions before filing.' },
              { step: '4', title: 'E-File & Track', desc: 'We e-file with the IRS. Track your refund status online.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-black text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-black mt-8">
            100% remote service—Houston, San Antonio, Dallas, Austin, Fort Worth, 
            El Paso, and all Texas communities served.
          </p>
        </div>
      </section>

      {/* Refund Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Refund Timing & Options
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Federal Refund Timeline</h3>
              <p className="text-black mb-4">
                With no state return to file, your entire refund comes from the IRS. 
                E-filed returns with direct deposit typically receive refunds within 
                21 days of acceptance.
              </p>
              <p className="text-black">
                Check your refund status at IRS.gov/refunds using your SSN, filing 
                status, and exact refund amount.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Refund Advance Options</h3>
              <p className="text-black mb-4">
                Need your refund faster? Qualifying clients may access a refund 
                advance—a loan against your expected refund. Terms, conditions, 
                and eligibility requirements apply.
              </p>
              <p className="text-black">
                <Link href="/supersonic-fast-cash/how-it-works" className="text-red-600 hover:underline">
                  Learn more about refund advance options →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Trust & Security
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">IRS-Compliant</h3>
                <p className="text-black text-sm">
                  All returns prepared following current IRS guidelines and regulations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Secure Document Handling</h3>
                <p className="text-black text-sm">
                  Bank-level encryption protects your personal information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileCheck className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Accuracy Guarantee</h3>
                <p className="text-black text-sm">
                  We stand behind our work with a commitment to accuracy.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-200">
            <p className="text-black mb-4">
              Review our operational standards and compliance documentation:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/governance" className="text-red-600 hover:underline">
                Governance & Compliance →
              </Link>
              <Link href="/security" className="text-red-600 hover:underline">
                Security Practices →
              </Link>
              <Link href="/privacy" className="text-red-600 hover:underline">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to File Your Federal Taxes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Texas residents—maximize your federal refund with expert preparation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/supersonic-fast-cash/upload-documents"
              className="inline-flex items-center px-8 py-4 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors border border-white/30"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
