import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Download, FileText, Video, BookOpen, Check, ArrowRight, Zap, Shield, MessageCircle } from 'lucide-react';
import { DIGITAL_PRODUCTS } from '@/lib/store/digital-products';

export const metadata: Metadata = {
  title: 'Digital Resources | Elevate Store',
  description:
    'Toolkits, guides, templates, and courses to start and grow your training business. Instant download.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/digital',
  },
};

export default function StoreDigitalPage() {
  const downloadProducts = DIGITAL_PRODUCTS.filter((p) => p.deliveryType === 'download');
  const accessProducts = DIGITAL_PRODUCTS.filter((p) => p.deliveryType === 'access');
  const freeTools = DIGITAL_PRODUCTS.filter((p) => p.price === 0 && p.id !== 'donation');

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden bg-amber-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-amber-900/90 to-orange-800/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 border border-white/20">
              <Download className="w-4 h-4" />
              Instant Download
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Digital Resources
              <span className="block text-amber-300">For Training Providers</span>
            </h1>

            <p className="text-xl text-amber-100 mb-8">
              Toolkits, guides, templates, and mini-courses to help you start and grow 
              your workforce training business.
            </p>

            <div className="flex flex-wrap gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Templates included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-blue-300" />
            <h2 className="text-3xl font-black text-white">Free Tools</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* SAM.gov Assistant Card */}
            <Link
              href="/store/sam-gov-assistant"
              className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-3">
                    100% Free
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    SAM.gov Registration Assistant
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step AI-guided walkthrough to register your organization in SAM.gov for federal grants and contracts.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Interactive chat walkthrough
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      UEI & NAICS code guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      No login required
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold">
                    Start Now <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Grants.gov Navigator Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3">
                    $49
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Grants.gov Navigator
                  </h3>
                  <p className="text-blue-200 mb-4">
                    AI assistant to help you search, filter, and apply for federal grants. Includes application tips and deadline tracking.
                  </p>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      Grant search assistance
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      Eligibility checker
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      Budget templates
                    </li>
                  </ul>
                  <Link
                    href="/store/digital/grants-gov-navigator"
                    className="mt-4 inline-flex items-center gap-2 text-white font-semibold hover:text-amber-300 transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <FileText className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-black text-gray-900">Downloadable Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloadProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
              >
                {product.featured && (
                  <div className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded mb-3">
                    Featured
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-black text-gray-900">
                    ${product.price}
                  </span>
                  <Link
                    href={`/store/digital/${product.id}`}
                    className="text-amber-600 font-semibold hover:text-amber-700"
                  >
                    Buy Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Video className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-black text-gray-900">Courses & Subscriptions</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all group"
              >
                {product.featured && (
                  <div className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full mb-4">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {product.features?.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-2xl font-black text-gray-900">
                      ${product.price}
                    </span>
                    {product.billingType === 'subscription' && (
                      <span className="text-gray-500">/mo</span>
                    )}
                  </div>
                  <Link
                    href={`/store/digital/${product.id}`}
                    className="inline-flex items-center gap-1 bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Get Access
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">
            Looking for the Complete Platform?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Get the full Elevate LMS with all features included.
          </p>
          <Link
            href="/store/licenses"
            className="inline-flex items-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors"
          >
            View Platform Licenses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
