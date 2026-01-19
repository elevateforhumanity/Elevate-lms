import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  ArrowRight,
  Globe,
  Code,
  Palette,
  Server,
  Headphones,
  Clock,
  Award,
  Shield,
} from 'lucide-react';
import { STORE_PRODUCTS, CLONE_LICENSES } from '@/app/data/store-products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Platform Licenses | Elevate for Humanity Store',
  description:
    'License the complete Elevate for Humanity workforce training platform. White-label solutions for schools, training providers, and workforce agencies.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/licenses',
  },
};

export default async function LicensesPage() {
  // Filter to only show main license products (not community add-ons)
  const licenseProducts = STORE_PRODUCTS.filter(
    (p) => p.id.startsWith('efh-') && !p.id.includes('community')
  );

  return (
    <div className="bg-white">
      {/* Hero Section with Video - No Overlay */}
      <section className="relative bg-black">
        {/* Full Video */}
        <video
          autoPlay
          loop
          playsInline
          controls
          className="w-full h-auto max-h-[70vh] object-contain mx-auto"
        >
          <source src="/videos/training-providers-video-with-narration.mp4" type="video/mp4" />
        </video>

      </section>

      {/* Header Section */}
      <section className="bg-zinc-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              License Our Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Get the complete Elevate LMS with your branding. Full source code, lifetime updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#pricing"
                className="inline-flex items-center px-6 py-3 bg-white text-zinc-900 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                View Pricing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/store/demo"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Try Free Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-white">50+</div>
              <div className="text-zinc-400 text-sm">Active Deployments</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">10,000+</div>
              <div className="text-zinc-400 text-sm">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">99.9%</div>
              <div className="text-zinc-400 text-sm">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">24/7</div>
              <div className="text-zinc-400 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-zinc-900 mb-4">
              Choose Your License
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              One-time payment for lifetime access. No recurring fees. Full
              source code included.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {licenseProducts.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  product.licenseType === 'school'
                    ? 'border-green-600 shadow-2xl scale-105 z-10'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                } transition-all duration-300`}
              >
                {product.licenseType === 'school' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-sm font-bold rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.billingType === 'subscription' && (
                      <span className="text-gray-500 text-lg">/mo</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.billingType === 'one_time'
                      ? 'One-time payment'
                      : 'Billed monthly'}
                  </p>
                </div>

                <Link
                  href={`/store/licenses/checkout/${product.slug}`}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-bold transition-all duration-200 mb-6 ${
                    product.licenseType === 'school'
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  }`}
                >
                  {product.billingType === 'subscription'
                    ? 'Start Free Trial'
                    : 'Get License'}
                </Link>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900">
                    What&apos;s included:
                  </p>
                  {product.features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {product.features.length > 5 && (
                    <p className="text-sm text-green-600 font-medium">
                      + {product.features.length - 5} more features
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Ideal for:
                  </p>
                  <ul className="space-y-1">
                    {product.idealFor.slice(0, 3).map((use, idx) => (
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

      {/* Clone Licenses Section */}
      {CLONE_LICENSES && CLONE_LICENSES.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-4">
                <Code className="w-4 h-4" />
                For Developers
              </div>
              <h2 className="text-4xl font-black text-zinc-900 mb-4">
                Clone & Self-Host
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get the complete source code and deploy on your own
                infrastructure. 14-day free trial available.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {CLONE_LICENSES.map((license) => (
                <div
                  key={license.id}
                  className={`bg-gray-50 rounded-2xl p-8 border-2 hover:shadow-lg transition-all ${
                    license.slug === 'pro-license' 
                      ? 'border-purple-500 shadow-xl' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {license.slug === 'pro-license' && (
                    <div className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {license.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {license.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-black text-gray-900">
                      ${license.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Link
                      href={`/store/licenses/${license.slug}/trial`}
                      className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                      Start 14-Day Free Trial
                    </Link>
                    <Link
                      href={`/store/licenses/${license.slug}`}
                      className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>

                  <ul className="space-y-2">
                    {license.features.slice(0, 4).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-purple-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Every license includes the complete platform, documentation, and
              support to get you running fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Source Code</h3>
              <p className="text-zinc-400">
                Complete Next.js codebase with TypeScript. Modify anything,
                add features, make it yours.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">White-Label Ready</h3>
              <p className="text-zinc-400">
                Your logo, your colors, your domain. Complete branding
                customization included.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Deploy Anywhere</h3>
              <p className="text-zinc-400">
                Vercel, AWS, Azure, GCP, or self-hosted. One-click deployment
                templates included.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compliance Built-In</h3>
              <p className="text-zinc-400">
                WIOA reporting, FERPA compliance, ETPL tracking. Meet funding
                requirements out of the box.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-rose-500/20 rounded-xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Priority Support</h3>
              <p className="text-zinc-400">
                Direct access to our engineering team. Get help with setup,
                customization, and scaling.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Updates</h3>
              <p className="text-zinc-400">
                Get all future updates and new features. Your license never
                expires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-8">
            &ldquo;We launched our workforce training program in under a week. The
            platform had everything we needed - LMS, enrollment, payments,
            compliance reporting. It would have taken us months to build this
            ourselves.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="text-left">
              <div className="font-bold text-gray-900">Sarah Johnson</div>
              <div className="text-gray-600 text-sm">
                Director, Midwest Workforce Solutions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <Image
          src="/images/pexels/success-team.jpg"
          alt="Get started"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zinc-900/90" />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Ready to Launch Your Platform?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Join training providers across the country using our platform to
            deliver workforce training programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/licenses/checkout/school-license"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-zinc-900 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
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

          <p className="mt-8 text-sm text-zinc-400">
            Questions? Email{' '}
            <a
              href="mailto:licensing@elevateforhumanity.org"
              className="underline text-white font-medium hover:text-green-400"
            >
              licensing@elevateforhumanity.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
