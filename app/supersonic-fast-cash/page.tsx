import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  FileText,
  Search,
  CreditCard
} from 'lucide-react';

export const metadata = {
  title: 'Professional Tax Preparation | Supersonic Fast Cash LLC',
  description: 'File your taxes with confidence. Accurate preparation, secure filing, and optional refund advance access, all in one place.',
};

export default function SupersonicHomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
                Professional Tax Preparation, Made Simple
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                File your taxes with confidence. Accurate preparation, secure filing, 
                and optional refund advance access, all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/start"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Start Tax Preparation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/supersonic-fast-cash/pricing"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  See Pricing
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Tax Return</p>
                    <p className="text-sm text-gray-500">2024 Filing</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Personal info verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Income entered</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Deductions applied</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-5 h-5 border-2 border-blue-600 rounded-full" />
                    <span className="text-sm">Ready to file</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <FileCheck className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium text-gray-900">Accurate Filing</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium text-gray-900">Secure & Encrypted</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium text-gray-900">Privacy Protected</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium text-gray-900">Optional Refund Advance</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Refund advances are optional and eligibility-based.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              File your taxes in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Prepare Your Taxes</h3>
              <p className="text-gray-600">
                Answer guided questions or upload your documents. We handle W-2s, 
                self-employment, dependents, and more.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Review & File</h3>
              <p className="text-gray-600">
                Review your return before e-filing. Our process checks for common 
                errors and missed credits.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Track Your Refund</h3>
              <p className="text-gray-600">
                E-file your return and track your refund status. Eligible filers 
                may choose a refund-based cash advance.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/supersonic-fast-cash/start"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Start Filing Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Refund Advance Callout - Secondary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Optional Tax Refund Cash Advance
                </h3>
                <p className="text-gray-600 mb-4">
                  Need access to your refund sooner? Eligible filers may choose a refund-based 
                  cash advance after completing their tax return.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Advance availability, limits, and timing depend on eligibility and expected 
                  refund amount. This is not a loan and is repaid from your tax refund.
                </p>
                <Link
                  href="/supersonic-fast-cash/cash-advance"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                >
                  Learn About Refund Advances
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Why Choose Supersonic Fast Cash LLC
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              'Professional tax preparation experience',
              'Clear pricing with no surprises',
              'Secure handling of personal tax information',
              'Optional refund advance for eligible returns',
              'Support when you need it',
              'Guided filing for all situations',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium text-gray-900 mb-2">Is this a loan?</h3>
              <p className="text-gray-600">
                No. Any advance is based on your expected tax refund and is repaid 
                from the refund itself.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium text-gray-900 mb-2">Do I have to take the advance?</h3>
              <p className="text-gray-600">
                No. Tax preparation works with or without it. The advance is completely optional.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium text-gray-900 mb-2">Can I file myself?</h3>
              <p className="text-gray-600">
                Yes. Our platform supports self-filing with guided help through every step.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/supersonic-fast-cash/support"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              Visit Support Center
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to file with confidence?
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Start your tax preparation today.
          </p>
          <Link
            href="/supersonic-fast-cash/start"
            className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-lg"
          >
            Start Tax Preparation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
