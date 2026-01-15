import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { STORE_PRODUCTS } from '@/app/data/store-products';

export const metadata: Metadata = {
  title: 'License Options | Elevate LMS',
  description: 'Choose the right license for your organization.',
};

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="px-4 py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Choose Your License</h1>
          <p className="text-sm md:text-base opacity-90 max-w-xl mx-auto">Full LMS platform with admin dashboard, student portal, and compliance tools.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Link href="/store/demo/student" className="text-xs bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">Student Demo</Link>
            <Link href="/store/demo/admin" className="text-xs bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30">Admin Demo</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_PRODUCTS.map((product) => (
            <div key={product.id} className={`bg-white rounded-xl p-4 border-2 ${product.licenseType === 'school' ? 'border-green-500 shadow-lg' : 'border-gray-200'}`}>
              {product.licenseType === 'school' && (
                <div className="text-xs font-bold text-green-600 mb-2">MOST POPULAR</div>
              )}
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="mb-3">
                <span className="text-2xl font-black">${(product.price / 100).toLocaleString()}</span>
                {product.billingType === 'subscription' && <span className="text-xs text-gray-500">/mo</span>}
              </div>
              <Link href={`/store/licenses/checkout/${product.slug}`} className={`block w-full text-center py-2 rounded-lg text-sm font-bold ${product.licenseType === 'school' ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}>
                {product.requiresApproval ? 'Request' : 'Purchase'}
              </Link>
              <div className="flex gap-1 mt-3">
                <Link href="/store/demo/student" className="flex-1 text-center py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100">Student</Link>
                <Link href="/store/demo/admin" className="flex-1 text-center py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded hover:bg-purple-100">Admin</Link>
              </div>
              <ul className="mt-3 space-y-1">
                {product.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">All Licenses Include</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg">Student Portal</div>
            <div className="p-3 bg-gray-50 rounded-lg">Admin Dashboard</div>
            <div className="p-3 bg-gray-50 rounded-lg">Course Builder</div>
            <div className="p-3 bg-gray-50 rounded-lg">Certificates</div>
            <div className="p-3 bg-gray-50 rounded-lg">Analytics</div>
            <div className="p-3 bg-gray-50 rounded-lg">Stripe Payments</div>
            <div className="p-3 bg-gray-50 rounded-lg">Mobile Ready</div>
            <div className="p-3 bg-gray-50 rounded-lg">Support</div>
          </div>
        </div>
      </section>
    </div>
  );
}
