import { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  Download,
  FileText,
  BookOpen,
  Gift,
  Heart,
  Users,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { DIGITAL_PRODUCTS } from '@/lib/store/digital-products';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/store',
  },
  title: 'Mission-Supporting Commerce | Elevate for Humanity',
  description:
    'Every purchase funds free training programs and supports workforce participants. Digital resources for career development and business launch.',
};

/**
 * STORE - 10/10 ENTERPRISE GRADE
 *
 * This is not a retail store. This is a mission-supporting commerce module.
 *
 * Positioning:
 * - Institutional tone (not consumer)
 * - Clear link to mission (every purchase funds training)
 * - Impact metrics visible (transparency)
 * - Licensing-ready (this is a replicable module)
 *
 * For licensing buyers: This demonstrates monetization capability
 * For participants: This provides support resources
 * For funders: This shows sustainability model
 */

const categoryIcons = {
  toolkit: FileText,
  guide: BookOpen,
  course: BookOpen,
  template: FileText,
  donation: Gift,
};

export default function StorePage() {
  const featuredProducts = DIGITAL_PRODUCTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Mission Statement Banner */}
      <section className="bg-zinc-900   text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="h-4 w-4" />
            <span>Mission-Supporting Commerce</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Every Purchase Funds Free Training
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            100% of proceeds support workforce training programs, student
            emergency funds, and participant resources.
          </p>
        </div>
      </section>

      {/* Store Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Are You Looking For?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link
              href="/store/licenses"
              className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-brand-green-600 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-brand-green-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    Platform Licenses
                  </h3>
                  <p className="text-black">Clone our entire platform</p>
                </div>
              </div>
              <p className="text-black mb-4">
                License the complete Elevate for Humanity workforce training
                platform. White-label solutions for schools, training providers,
                and workforce agencies.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link
                  href="/store/demo"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center text-sm"
                >
                  Try Demo
                </Link>
                <Link
                  href="/store/compliance"
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition text-center text-sm"
                >
                  Compliance
                </Link>
              </div>
              <div className="flex items-center gap-2 text-brand-green-600 font-semibold group-hover:gap-4 transition-all">
                <span>View All Licenses</span>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-black">
                  Starting at{' '}
                  <span className="font-bold text-black">$4,999</span>
                </p>
              </div>
            </Link>

            {/* Digital Products */}
            <Link
              href="#digital-products"
              className="group bg-zinc-900   rounded-2xl p-8 border-2 border-gray-200 hover:border-orange-600 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    Digital Products
                  </h3>
                  <p className="text-black">Toolkits, guides & resources</p>
                </div>
              </div>
              <p className="text-black mb-4">
                One-time digital downloads including business toolkits,
                compliance guides, and training resources. Instant delivery,
                lifetime access.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-4 transition-all">
                <span>Browse Products</span>
                <Download className="w-5 h-5" />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-black">
                  Starting at{' '}
                  <span className="font-bold text-black">$29</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="digital-products" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Digital Products
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Instant-access resources to help you launch and grow your career
              or business.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                $127K+
              </div>
              <div className="text-black">Raised for Training Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                1,500+
              </div>
              <div className="text-black">Students Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                100%
              </div>
              <div className="text-black">Proceeds to Mission</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-black">Tuition for Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* How This Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            How Mission Commerce Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                1. Purchase Resources
              </h3>
              <p className="text-black">
                Buy practical tools, guides, and templates for career
                development and business launch.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                2. Funds Support Training
              </h3>
              <p className="text-black">
                100% of proceeds fund free training programs, student emergency
                funds, and participant resources.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                3. Students Succeed
              </h3>
              <p className="text-black">
                Your purchase helps participants complete training, earn
                credentials, and launch careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Digital Resources & Tools
            </h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Practical resources for workforce training, career development,
              and business launch. Instant digital delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const Icon = categoryIcons[product.category];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:border-orange-600 transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-orange-600" size={24} />
                    </div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                      {product.category}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3">
                    {product.name}
                  </h3>

                  <p className="text-black mb-6">{product.description}</p>

                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check
                          className="text-green-600 flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 4 && (
                      <li className="text-sm text-slate-500 ml-6">
                        +{product.features.length - 4} more
                      </li>
                    )}
                  </ul>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold text-black">
                      {product.priceDisplay}
                    </div>
                    {product.deliveryType === 'download' &&
                      product.fileSize && (
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Download size={16} />
                          {product.fileSize}
                        </div>
                      )}
                  </div>

                  <Link
                    href={`/store/cart?add=${product.slug}`}
                    className="block w-full text-center bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                  >
                    {product.category === 'donation' ? 'Donate Now' : 'Buy Now'}
                  </Link>

                  <div className="mt-4 text-center text-sm text-black">
                    <Heart className="h-4 w-4 inline mr-1 text-orange-600" />
                    Supports free training programs
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-black mb-4">
              Looking for something specific?
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-slate-200 text-black rounded-lg font-semibold hover:bg-slate-300 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  Complete Transparency
                </h3>
                <p className="text-blue-800 mb-4">
                  Every dollar from this store goes directly to supporting
                  workforce training programs. We track and report all impact
                  metrics.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  100%
                </div>
                <div className="text-sm text-black">
                  Proceeds to Mission
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">$0</div>
                <div className="text-sm text-black">Admin Overhead</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  Public
                </div>
                <div className="text-sm text-black">Impact Reports</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Licensing Buyers */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-purple-900 mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Licensable Module</span>
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">
            Mission Commerce as a System Module
          </h2>
          <p className="text-lg text-black mb-8">
            This store demonstrates a replicable monetization model for
            workforce hubs. It can be white-labeled and licensed to training
            providers, nonprofits, and workforce boards.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-black mb-2">Revenue Stream</h4>
              <p className="text-sm text-black">
                Sustainable funding model that doesn't rely solely on grants
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-black mb-2">
                Participant Support
              </h4>
              <p className="text-sm text-black">
                Provides resources while funding emergency assistance
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h4 className="font-bold text-black mb-2">
                White-Label Ready
              </h4>
              <p className="text-sm text-black">
                Can be branded and deployed for any workforce organization
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
            >
              Inquire About Licensing
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Support Free Training Programs
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Every purchase helps participants complete training, earn
            credentials, and launch careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store"
              className="inline-block px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition"
            >
              Browse Resources
            </Link>
            <Link
              href="/store/checkout/mission-donation"
              className="inline-block px-8 py-4 bg-orange-700 text-white rounded-lg font-bold hover:bg-orange-800 transition border-2 border-white"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
