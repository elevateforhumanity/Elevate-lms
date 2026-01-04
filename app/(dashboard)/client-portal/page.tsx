// app/(dashboard)/client-portal/page.tsx - Elevate Client Portal (Drake Portals Alternative)
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Upload,
  Download,
  FileText,
  MessageSquare,
  CreditCard,
  CheckCircle,
  Clock,
  Shield,
  Smartphone,
  FolderOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Portal | Elevate for Humanity',
  description:
    'Secure client portal for document sharing, e-signatures, payments, and communication. Mobile-friendly and encrypted.',
};

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Elevate Client Portal
            </h1>
            <p className="text-xl mb-8">
              Secure, branded client portal for seamless document sharing,
              e-signatures, payments, and communication. Built for tax
              professionals and their clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/client-portal/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/client-portal/demo"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors border border-white/20"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Professional client portal with all the features of Drake Portals
              and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                At-rest encryption, secure file transfers, and access controls
                to protect client data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Document Upload</h3>
              <p className="text-gray-600">
                Clients can upload W-2s, 1099s, and other tax documents from any
                device with drag-and-drop.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">E-Signatures</h3>
              <p className="text-gray-600">
                Send fillable forms and request digital signatures on any
                device. Legally binding and IRS-compliant.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Messaging</h3>
              <p className="text-gray-600">
                In-app messaging for secure communication without leaving the
                portal. No more unsecure emails.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online Payments</h3>
              <p className="text-gray-600">
                Collect payments through the portal with integrated payment
                processing. Stripe and ACH supported.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile-Friendly</h3>
              <p className="text-gray-600">
                Clients can snap and send tax documents from their phone.
                Responsive design works on all devices.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prior-Year Summary</h3>
              <p className="text-gray-600">
                Show clients what they submitted last year to help them stay
                organized and complete.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drake Tax Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrates with Drake Tax software. Import client
                data directly into returns.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Branding</h3>
              <p className="text-gray-600">
                Showcase your firm's logo and personalized web address.
                White-label solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Better features, better price than Drake Portals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Trial */}
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
              <div className="text-4xl font-bold mb-4">
                $0<span className="text-lg text-gray-600">/14 days</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Full features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>5 GB storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited clients</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No credit card required</span>
                </li>
              </ul>
              <Link
                href="/client-portal/signup?plan=trial"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Monthly */}
            <div className="border-2 border-blue-600 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Monthly</h3>
              <div className="text-4xl font-bold mb-4">
                $19.95<span className="text-lg text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Save $10/month vs Drake Portals
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>5 GB storage included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited clients</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>E-signatures included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Drake Tax integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>+$9.95/month per 25 GB</span>
                </li>
              </ul>
              <Link
                href="/client-portal/signup?plan=monthly"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Yearly */}
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">Yearly</h3>
              <div className="text-4xl font-bold mb-4">
                $179.95<span className="text-lg text-gray-600">/year</span>
              </div>
              <p className="text-sm text-green-600 font-semibold mb-4">
                Save $60/year (25% off)
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Everything in Monthly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>+$99.95/year per 25 GB</span>
                </li>
              </ul>
              <Link
                href="/client-portal/signup?plan=yearly"
                className="block w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              All plans include SSL encryption, automatic backups, and 24/7
              support
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Elevate vs Drake Portals
            </h2>
            <p className="text-xl text-gray-600">
              Better features at a better price
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Elevate Portal
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Drake Portals
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">Monthly Price</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-600">
                    $19.95
                  </td>
                  <td className="px-6 py-4 text-center">$29.95</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Yearly Price</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-600">
                    $179.95
                  </td>
                  <td className="px-6 py-4 text-center">$229.95</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Storage Included</td>
                  <td className="px-6 py-4 text-center">5 GB</td>
                  <td className="px-6 py-4 text-center">5 GB</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">E-Signatures</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    Additional Fee
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Mobile App</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Drake Integration</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Online Payments</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    Drake Pay Required
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">API Access</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    Not Available
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Custom Branding</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-green-600">
              Save $120/year with Elevate Portal
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of tax professionals using Elevate Client Portal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/client-portal/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/client-portal/demo"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors border border-white/20"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/80">
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>
    </div>
  );
}
