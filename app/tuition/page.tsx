import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CreditCard, Building2, Calendar, CheckCircle, 
  AlertCircle, ArrowRight, Shield, Clock, DollarSign,
  FileText, Phone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Pay for Tuition | Elevate for Humanity',
  description: 'Clear, simple tuition payment options. Third-party financing, employer sponsorship, or school payment plans. No hidden fees.',
};

export default function TuitionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            How to Pay for Tuition
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We offer clear, straightforward payment options. No hidden fees. No surprises.
            Choose the option that works best for your situation.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-blue-50 border-b border-blue-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Already eligible for funding?</p>
              <p className="text-blue-800 text-sm">
                If you qualify for WIOA, Workforce Ready Grant, or other workforce funding, 
                your tuition may be fully covered. <Link href="/funding" className="underline font-medium">Check your eligibility first →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Payment Options
          </h2>

          <div className="space-y-8">
            {/* Option 1: Third-Party Financing */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">RECOMMENDED</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Pay Over Time with Affirm or Klarna
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Get approved in minutes. Pay in fixed monthly installments over 6-24 months. 
                    Subject to approval by the financing provider.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-slate-500 mb-1">Example: $5,000 tuition</p>
                      <p className="text-2xl font-bold text-slate-900">~$278/month</p>
                      <p className="text-sm text-slate-500">for 18 months</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" /> Quick approval decision
                        </li>
                        <li className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" /> No large upfront payment
                        </li>
                        <li className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" /> Build credit history
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-4">
                    <strong>How it works:</strong> At checkout, select "Pay over time" and complete a quick application. 
                    If approved, you'll see your monthly payment amount before confirming. The financing provider 
                    pays us directly, and you make payments to them.
                  </p>

                  <Link 
                    href="/programs"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Browse Programs <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Option 2: Employer Sponsored */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Employer-Sponsored Tuition
                  </h3>
                  <p className="text-slate-600 mb-4">
                    If you have an employer willing to invest in your training, they can pay your tuition 
                    directly or through payroll deduction after you're hired.
                  </p>
                  
                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <p className="font-semibold text-purple-900 mb-2">This option requires:</p>
                    <ul className="space-y-1 text-sm text-purple-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Employer must be an approved partner
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Signed employer agreement before enrollment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Commitment to hire upon completion
                      </li>
                    </ul>
                  </div>

                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Ask About Employer Sponsorship <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Option 3: School Payment Plan */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-7 h-7 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    School Payment Plan
                  </h3>
                  <p className="text-slate-600 mb-4">
                    If third-party financing isn't available to you, we offer a structured payment plan 
                    with a deposit and monthly autopay. No credit check required.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-sm text-slate-500 mb-1">Example: $5,000 tuition</p>
                      <p className="text-lg font-bold text-slate-900">$1,000 deposit</p>
                      <p className="text-slate-600">+ $667/month for 6 months</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="font-semibold text-slate-900 mb-2">Requirements:</p>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Minimum 20% down payment</li>
                        <li>• Maximum 6 months</li>
                        <li>• Autopay required</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-semibold">Important:</p>
                        <p>Missed payments result in immediate academic pause. No certificates or credentials 
                        are released until your balance is paid in full.</p>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/schedule"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                  >
                    Discuss Payment Plan <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Option 4: Pay in Full */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Pay in Full
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Pay your full tuition at enrollment and start immediately. 
                    Accept credit card, debit card, or bank transfer.
                  </p>
                  
                  <ul className="space-y-2 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" /> No ongoing payments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" /> Immediate full access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" /> Simplest option
                    </li>
                  </ul>

                  <Link 
                    href="/programs"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
                  >
                    Enroll Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Policy Summary */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Refund Policy
          </h2>
          
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Before Program Starts</h3>
                <p className="text-slate-600 text-sm">
                  Full refund minus $150 registration fee. Processed within 7-10 business days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">After Program Starts</h3>
                <p className="text-slate-600 text-sm">
                  Prorated refund based on completion percentage. No refunds after 50% completion.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                <strong>Non-refundable:</strong> Registration fee ($150), materials already issued, 
                certification exam fees already paid.
              </p>
            </div>

            <div className="mt-4">
              <Link href="/policies/refund" className="text-orange-600 text-sm font-medium hover:text-orange-700">
                Read full refund policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Questions About Payment?
          </h2>
          <p className="text-slate-600 mb-8">
            Our enrollment team can help you understand your options and find the best path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold border-2 border-slate-200 hover:border-slate-300 transition"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
