import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata = {
  title: 'Pricing | Supersonic Fast Cash',
  description:
    'Transparent pricing for all tax services. No hidden fees. Free consultation.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            No hidden fees. No surprises. Just honest pricing.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Individual Returns */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Individual Tax Returns
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Includes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Basic 1040 (W-2 only)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $89
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      E-file, standard deduction, direct deposit
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      1040 with Itemized Deductions
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $149
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Schedule A, mortgage interest, charitable donations
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Self-Employment (Schedule C)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $199
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Business income/expenses, home office deduction
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Rental Property (Schedule E)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $149
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Per property, depreciation, rental income/expenses
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Investment Income
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $99
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Stocks, bonds, dividends, capital gains
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Returns */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Business Tax Returns
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Includes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      LLC (Form 1065)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $299
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Partnership return, K-1s for all partners
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      S-Corporation (Form 1120S)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $399
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Corporate return, K-1s, payroll reconciliation
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      C-Corporation (Form 1120)
                    </td>
                    <td className="px-6 py-4 text-2xl font-bold text-blue-600">
                      $499
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Corporate return, financial statements
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Additional Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  State Returns
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">$49</div>
                <p className="text-gray-600">
                  Per state, filed with federal return
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Amended Returns
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $149
                </div>
                <p className="text-gray-600">Form 1040-X, any tax year</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Prior Year Returns
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $149+
                </div>
                <p className="text-gray-600">Catch up on unfiled returns</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Audit Protection
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  $49/yr
                </div>
                <p className="text-gray-600">
                  IRS audit representation included
                </p>
              </div>
            </div>
          </div>

          {/* Refund Advance */}
          <div className="bg-green-600 rounded-lg p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tax Refund Advance</h2>
            <div className="text-5xl md:text-6xl font-bold mb-4">Up to $7,500</div>
            <p className="text-lg md:text-xl mb-8">
              Same-day funding • No credit check • Tax prep included
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/20 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">$500-$1,500</div>
                <div>$0 fee</div>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">$1,501-$4,000</div>
                <div>$50 fee</div>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">$4,001-$7,500</div>
                <div>$100 fee</div>
              </div>
            </div>
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-block px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors"
            >
              Apply for Advance
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pricing FAQs
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do you offer free consultations?
              </h3>
              <p className="text-gray-600">
                Yes! We offer free 15-minute consultations to discuss your tax
                situation and provide a quote.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No. The price we quote is the price you pay. No surprises.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I pay with my refund?
              </h3>
              <p className="text-gray-600">
                Yes! We offer refund transfer options where fees are deducted
                from your refund.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do you offer payment plans?
              </h3>
              <p className="text-gray-600">
                Yes, we offer flexible payment plans for business returns and
                complex situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Your Free Quote Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a consultation to discuss your tax needs
          </p>
          <Link
            href="/supersonic-fast-cash/book-appointment"
            className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
