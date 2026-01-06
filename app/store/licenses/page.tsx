import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Shield, Users, Globe } from 'lucide-react';
import { STORE_PRODUCTS } from '@/app/data/store-products';

export const metadata: Metadata = {
  title: 'Platform Licenses | Elevate for Humanity Store',
  description:
    'License the complete Elevate for Humanity workforce training platform. White-label solutions for schools, training providers, and workforce agencies.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/store/licenses',
  },
};

export default function LicensesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 bg-zinc-900  via-white ">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-bold mb-6">
            <Globe className="w-4 h-4" />
            Platform Licensing
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-zinc-900 tracking-tight">
            License Our Platform.
            <br />
            <span className="text-brand-green-600">
              Run Your Own Training Business.
            </span>
          </h1>

          <p className="mt-6 text-xl text-zinc-700 leading-relaxed max-w-3xl mx-auto">
            Get the complete Elevate for Humanity platform with your branding.
            Everything you need to launch and scale workforce training programs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STORE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  product.licenseType === 'school'
                    ? 'border-brand-green-600 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all`}
              >
                {product.licenseType === 'school' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-green-600 text-white text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-gray-900">
                      ${(product.price / 100).toLocaleString()}
                    </span>
                    {product.billingType === 'subscription' && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.billingType === 'one_time'
                      ? 'One-time payment'
                      : 'Monthly billing'}
                  </p>
                </div>

                <Link
                  href={`/store/licenses/checkout/${product.slug}`}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-bold transition-colors mb-6 ${
                    product.licenseType === 'school'
                      ? 'bg-brand-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {product.requiresApproval
                    ? 'Request License'
                    : 'Purchase Now'}
                </Link>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    What's included:
                  </p>
                  {product.features.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {product.features.length > 6 && (
                    <p className="text-sm text-gray-600 italic">
                      + {product.features.length - 6} more features
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-900 mb-2">
                    Ideal for:
                  </p>
                  <ul className="space-y-1">
                    {product.idealFor.map((use, idx) => (
                      <li key={idx} className="text-xs text-gray-600">
                        • {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-zinc-900 text-center mb-12">
            What's Included in Every License
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Complete Platform
              </h3>
              <p className="text-gray-600">
                Full LMS, enrollment system, admin dashboard, payment
                processing, and mobile app. Everything you need to run training
                programs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Compliance Built-In
              </h3>
              <p className="text-gray-600">
                WIOA reporting, FERPA compliance, ETPL tracking, and automated
                data collection for grant reporting.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support & Updates
              </h3>
              <p className="text-gray-600">
                Ongoing platform updates, technical support, and access to our
                community of training providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-20 bg-zinc-900   text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Ready to Launch Your Platform?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Join training providers across the country using our platform to
            deliver workforce training programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/licenses/checkout/school-license"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-green-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact?topic=enterprise-license"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>

          <p className="mt-8 text-sm opacity-75">
            Questions? Email{' '}
            <a
              href="mailto:licensing@elevateforhumanity.institute"
              className="underline font-bold"
            >
              licensing@elevateforhumanity.institute
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
