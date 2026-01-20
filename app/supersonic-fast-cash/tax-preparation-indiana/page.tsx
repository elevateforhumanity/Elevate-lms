import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, FileCheck, Users, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Preparation Services in Indiana | Supersonic Fast Cash',
  description: 'Professional tax preparation services for Indiana residents. File your federal and state taxes with confidence. IRS-compliant, secure, and affordable.',
  keywords: ['tax preparation Indiana', 'file taxes Indiana', 'tax help Indiana', 'Indiana tax services', 'tax filing Indianapolis'],
  alternates: {
    canonical: 'https://supersonicfastmoney.com/tax-preparation-indiana',
  },
  openGraph: {
    title: 'Tax Preparation Services in Indiana | Supersonic Fast Cash',
    description: 'Professional tax preparation services for Indiana residents. File your federal and state taxes with confidence.',
    url: 'https://supersonicfastmoney.com/tax-preparation-indiana',
    type: 'website',
  },
};

export default function TaxPreparationIndianaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tax Preparation Services in Indiana
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            Whether you&apos;re in Indianapolis, Fort Wayne, or anywhere across the Hoosier State, 
            we provide professional tax preparation services designed for Indiana residents. 
            Federal and state returns filed accurately, securely, and on time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
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

      {/* Indiana-Specific Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Tax Filing for Indiana Residents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-black mb-4">
                Indiana has a flat state income tax rate, making calculations straightforward—but 
                county taxes add complexity. Each of Indiana&apos;s 92 counties has its own local 
                income tax rate, which means your total tax liability depends on where you live.
              </p>
              <p className="text-lg text-black mb-4">
                We handle both your federal return and Indiana Form IT-40, ensuring your county 
                tax is calculated correctly. Whether you&apos;re a W-2 employee, self-employed, 
                or have multiple income sources, we&apos;ve got you covered.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold text-black mb-4">Indiana Tax Facts</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Flat state income tax rate (one of the simplest in the nation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  County income taxes vary by location
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  State filing deadline aligns with federal (April 15)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  E-filing available for faster refunds
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
            Who We Serve in Indiana
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Individuals & Families</h3>
              <p className="text-black">
                W-2 employees, families with dependents, homeowners claiming deductions, 
                and anyone needing straightforward tax filing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Building className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Self-Employed & Gig Workers</h3>
              <p className="text-black">
                Freelancers, contractors, rideshare drivers, and small business owners 
                who need Schedule C and quarterly estimate guidance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <FileCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Complex Situations</h3>
              <p className="text-black">
                Multiple income sources, rental properties, investments, or prior-year 
                amendments. We handle what others won&apos;t.
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
              { step: '1', title: 'Upload Documents', desc: 'Securely upload your W-2s, 1099s, and other tax documents through our encrypted portal.' },
              { step: '2', title: 'We Prepare', desc: 'Our tax professionals review your documents and prepare your federal and Indiana state returns.' },
              { step: '3', title: 'You Review', desc: 'Review your completed return, ask questions, and approve before filing.' },
              { step: '4', title: 'E-File & Done', desc: 'We e-file directly with the IRS and Indiana DOR. Track your refund status online.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-black text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-black mt-8">
            Everything is done remotely—no office visit required. Serve clients across 
            Indianapolis, Fort Wayne, Evansville, South Bend, and all Indiana communities.
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
              <h3 className="text-xl font-bold text-black mb-4">Standard E-File Refunds</h3>
              <p className="text-black mb-4">
                When you e-file with direct deposit, most federal refunds arrive within 
                21 days. Indiana state refunds typically process within 2-3 weeks after 
                the federal return is accepted.
              </p>
              <p className="text-black">
                You can check your federal refund status at IRS.gov and your Indiana 
                refund at the Indiana Department of Revenue website.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Refund Advance Options</h3>
              <p className="text-black mb-4">
                Need your refund faster? We offer refund advance options for qualifying 
                clients. This is a loan against your expected refund—not your refund itself. 
                Terms and eligibility apply.
              </p>
              <p className="text-black">
                <Link href="/supersonic-fast-cash/how-it-works" className="text-blue-600 hover:underline">
                  Learn more about refund advance options →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Trust & Security
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">IRS-Compliant</h3>
                <p className="text-black text-sm">
                  All returns prepared following current IRS guidelines and Indiana DOR requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Secure Document Handling</h3>
                <p className="text-black text-sm">
                  Bank-level encryption protects your personal and financial information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Accuracy Guarantee</h3>
                <p className="text-black text-sm">
                  We stand behind our work. If we make an error, we&apos;ll fix it at no additional cost.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-200">
            <p className="text-black mb-4">
              Review our operational standards and compliance documentation:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/governance" className="text-blue-600 hover:underline">
                Governance & Compliance →
              </Link>
              <Link href="/security" className="text-blue-600 hover:underline">
                Security Practices →
              </Link>
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to File Your Indiana Taxes?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get started today. Upload your documents and let us handle the rest.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-colors"
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/supersonic-fast-cash/upload-documents"
              className="inline-flex items-center px-8 py-4 bg-orange-700 text-white rounded-lg font-bold hover:bg-orange-800 transition-colors border border-white/30"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
