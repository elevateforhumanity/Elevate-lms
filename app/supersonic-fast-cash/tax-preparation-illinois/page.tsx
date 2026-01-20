import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Clock, FileCheck, Users, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Preparation Services in Illinois | Supersonic Fast Cash',
  description: 'Professional tax preparation for Illinois residents. Navigate state income tax and Chicago requirements. IRS-compliant, secure, expert filing.',
  keywords: ['tax preparation Illinois', 'file taxes Illinois', 'tax help Illinois', 'Illinois tax services', 'tax filing Chicago Springfield'],
  alternates: {
    canonical: 'https://supersonicfastmoney.com/tax-preparation-illinois',
  },
  openGraph: {
    title: 'Tax Preparation Services in Illinois | Supersonic Fast Cash',
    description: 'Professional tax preparation for Illinois residents. Expert state and federal filing.',
    url: 'https://supersonicfastmoney.com/tax-preparation-illinois',
    type: 'website',
  },
};

export default function TaxPreparationIllinoisPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tax Preparation Services in Illinois
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            From Chicago to Springfield, Rockford to Peoria—Illinois has a flat state 
            income tax that applies to all residents. We help Prairie State taxpayers 
            file accurately and claim every credit they deserve.
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

      {/* Illinois-Specific Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Tax Filing for Illinois Residents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-black mb-4">
                Illinois uses a flat income tax rate—the same percentage applies whether 
                you earn $30,000 or $300,000. This makes calculations straightforward, 
                but Illinois also offers several credits and exemptions that can reduce 
                your tax burden.
              </p>
              <p className="text-lg text-black mb-4">
                The state offers credits for property taxes paid, education expenses, 
                and earned income. We ensure you claim everything you&apos;re entitled to 
                on both your federal and Illinois IL-1040 returns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-bold text-black mb-4">Illinois Tax Facts</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Flat state income tax rate for all income levels
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Property tax credit available for homeowners
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Illinois Earned Income Credit (matches federal EITC percentage)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
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
            Who We Serve in Illinois
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Chicago Metro Workers</h3>
              <p className="text-black">
                Commuters, remote workers, and city residents navigating Illinois taxes 
                while potentially working for out-of-state employers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <Building className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Small Business Owners</h3>
              <p className="text-black">
                Self-employed individuals, freelancers, and small business owners 
                needing Schedule C and Illinois business income reporting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <FileCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Families & Homeowners</h3>
              <p className="text-black">
                Claim Illinois property tax credits, education credits, and family 
                exemptions to reduce your state tax liability.
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
              { step: '1', title: 'Gather Documents', desc: 'Collect W-2s, 1099s, property tax bills, and other relevant documents.' },
              { step: '2', title: 'Secure Upload', desc: 'Upload through our encrypted portal—no office visit required.' },
              { step: '3', title: 'Expert Preparation', desc: 'We prepare your federal and Illinois IL-1040 returns.' },
              { step: '4', title: 'E-File & Track', desc: 'Approve, e-file, and track your refunds through IRS and IDOR.' },
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
            Remote service available statewide—Chicago, Aurora, Naperville, Rockford, 
            Joliet, Springfield, and all Illinois communities.
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
                Illinois state refunds usually process within 2-4 weeks after the 
                return is accepted by the Illinois Department of Revenue.
              </p>
              <p className="text-black">
                Track your Illinois refund at tax.illinois.gov using your SSN and 
                expected refund amount.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Refund Advance Options</h3>
              <p className="text-black mb-4">
                Qualifying clients may access a portion of their expected refund early 
                through our refund advance program. Terms, conditions, and eligibility 
                requirements apply.
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
                <h3 className="font-bold text-black mb-1">IRS & IDOR Compliant</h3>
                <p className="text-black text-sm">
                  Returns prepared following all federal and Illinois state requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Encrypted Transmission</h3>
                <p className="text-black text-sm">
                  Your documents and data protected with bank-level security.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Accuracy Guarantee</h3>
                <p className="text-black text-sm">
                  We stand behind our work with a commitment to accuracy.
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
            Ready to File Your Illinois Taxes?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get expert help with your federal and Illinois state returns.
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
