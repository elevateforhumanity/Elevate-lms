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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/store/platform-hero.jpg"
            alt="Elevate LMS Platform"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-zinc-900/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold text-sm">White-Label LMS Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                License Our
                <span className="text-green-400"> Complete Platform</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get the complete Elevate LMS with your branding. Full source code, 
                lifetime updates, and dedicated support. Launch your workforce training 
                platform in weeks, not months.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#pricing"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/store/demo"
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Try Free Demo
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/training-providers-video-with-narration.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" data-tour="license-tiers">
            {licenseProducts.map((product, index) => {
              const cardImages = [
                '/images/store/ai-studio.jpg',
                '/images/store/platform-hero.jpg',
                '/images/store/community-hub.jpg',
                '/images/store/crm-hub.jpg',
              ];
              return (
                <div
                  key={product.id}
                  className={`relative bg-white rounded-2xl border-2 overflow-hidden flex flex-col ${
                    product.licenseType === 'school'
                      ? 'border-green-600 shadow-2xl lg:scale-105 z-10'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  } transition-all duration-300`}
                >
                  {/* Card Image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={cardImages[index % cardImages.length]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {product.licenseType === 'school' && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4">
                      <h3 className="text-lg font-bold text-white">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-gray-900">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.billingType === 'subscription' && (
                          <span className="text-gray-500 text-sm">/mo</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.billingType === 'one_time'
                          ? 'One-time payment'
                          : 'Billed monthly'}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6 flex-1" data-tour="license-features">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <p className="text-xs text-green-600 font-medium">
                          + {product.features.length - 4} more features
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/store/licenses/checkout/${product.slug}`}
                      className={`block w-full text-center px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                        product.licenseType === 'school'
                          ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {product.billingType === 'subscription'
                        ? 'Start Free Trial'
                        : 'Get License'}
                    </Link>
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
              Every license includes the complete platform and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/store/licenses/source-code" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-blue-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/programs-hq/technology-hero.jpg" alt="Source Code" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400">Full Source Code</h3>
              <p className="text-zinc-400">Complete Next.js codebase with TypeScript.</p>
            </Link>

            <Link href="/store/licenses/white-label" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-green-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/programs-hq/business-training.jpg" alt="White Label" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-400">White-Label Ready</h3>
              <p className="text-zinc-400">Your logo, colors, and domain.</p>
            </Link>

            <Link href="/store/licenses/deployment" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-purple-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/programs-hq/cybersecurity.jpg" alt="Deploy Anywhere" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400">Deploy Anywhere</h3>
              <p className="text-zinc-400">Vercel, AWS, Azure, or self-hosted.</p>
            </Link>

            <Link href="/store/licenses/compliance" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-amber-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/heroes-hq/funding-hero.jpg" alt="Compliance" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400">Compliance Built-In</h3>
              <p className="text-zinc-400">WIOA, FERPA, ETPL tracking included.</p>
            </Link>

            <Link href="/store/licenses/support" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-rose-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/team-hq/team-meeting.jpg" alt="Support" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-rose-400">Priority Support</h3>
              <p className="text-zinc-400">Direct access to our engineering team.</p>
            </Link>

            <Link href="/store/licenses/updates" className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700 hover:border-cyan-500 transition-colors group">
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-6">
                <Image src="/images/programs-hq/it-support.jpg" alt="Updates" width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400">Lifetime Updates</h3>
              <p className="text-zinc-400">All future updates and features included.</p>
            </Link>
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
              <div className="font-bold text-gray-900">Graduate</div>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-tour="license-cta">
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
