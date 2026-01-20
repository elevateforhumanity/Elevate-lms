import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, FileCheck, Users, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Preparation Services in Ohio | Supersonic Fast Cash',
  description: 'Professional tax preparation services for Ohio residents. Navigate state and local taxes with expert help. IRS-compliant, secure filing.',
  keywords: ['tax preparation Ohio', 'file taxes Ohio', 'tax help Ohio', 'Ohio tax services', 'tax filing Columbus Cleveland Cincinnati'],
  alternates: {
    canonical: 'https://supersonicfastmoney.com/tax-preparation-ohio',
  },
  openGraph: {
    title: 'Tax Preparation Services in Ohio | Supersonic Fast Cash',
    description: 'Professional tax preparation services for Ohio residents. Navigate state and local taxes with expert help.',
    url: 'https://supersonicfastmoney.com/tax-preparation-ohio',
    type: 'website',
  },
};

export default function TaxPreparationOhioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 to-red-700 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tax Preparation Services in Ohio
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mb-8">
            From Columbus to Cleveland, Cincinnati to Toledo—Ohio&apos;s tax system includes 
            state income tax plus municipal taxes in many cities. We help Buckeye State 
            residents file accurately and maximize their refunds.
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

      {/* Ohio-Specific Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Tax Filing for Ohio Residents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-black mb-4">
                Ohio uses a graduated income tax system with multiple brackets. But what 
                makes Ohio unique is its extensive municipal income tax system—over 600 
                cities and villages levy their own local income taxes, often at rates 
                between 1% and 3%.
              </p>
              <p className="text-lg text-black mb-4">
                If you live in one city and work in another, you may owe taxes to both 
                (with credits for taxes paid). We navigate this complexity so you don&apos;t 
                overpay or miss required filings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold text-black mb-4">Ohio Tax Facts</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Graduated state income tax with multiple brackets
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  600+ municipalities with local income taxes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  School district income taxes in some areas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  State deadline: April 15 (same as federal)
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
            Who We Serve in Ohio
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Commuters & Multi-City Workers</h3>
              <p className="text-black">
                Live in one Ohio city, work in another? We calculate your municipal tax 
                obligations and credits correctly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Building className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Small Business Owners</h3>
              <p className="text-black">
                Ohio&apos;s business income deduction can reduce your tax burden. We help 
                self-employed Ohioans take advantage of available deductions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <FileCheck className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Families & Homeowners</h3>
              <p className="text-black">
                Claim Ohio&apos;s credits for dependents, education expenses, and property 
                taxes. We ensure you don&apos;t leave money on the table.
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
              { step: '1', title: 'Gather Documents', desc: 'Collect your W-2s, 1099s, and any municipal tax forms from your employer.' },
              { step: '2', title: 'Secure Upload', desc: 'Upload everything through our encrypted portal—no office visit needed.' },
              { step: '3', title: 'Expert Review', desc: 'We prepare your federal, Ohio state, and applicable municipal returns.' },
              { step: '4', title: 'File & Track', desc: 'Approve and e-file. Track your refund through IRS and Ohio DOR portals.' },
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
            Remote service available statewide—Columbus, Cleveland, Cincinnati, Dayton, 
            Akron, Toledo, and every Ohio community.
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
                Federal refunds with direct deposit typically arrive within 21 days. 
                Ohio state refunds usually process within 15-20 business days after 
                acceptance. Municipal refunds vary by city.
              </p>
              <p className="text-black">
                Track your Ohio refund at tax.ohio.gov using your SSN and refund amount.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Refund Advance Options</h3>
              <p className="text-black mb-4">
                Qualifying clients may access a portion of their expected refund early 
                through our refund advance program. This is a loan product with terms 
                and eligibility requirements.
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
                <h3 className="font-bold text-black mb-1">IRS & Ohio DOR Compliant</h3>
                <p className="text-black text-sm">
                  Returns prepared following all federal and Ohio state requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Encrypted Transmission</h3>
                <p className="text-black text-sm">
                  Your documents and data protected with bank-level security.
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
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to File Your Ohio Taxes?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Let us handle Ohio&apos;s complex state and municipal tax requirements.
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
