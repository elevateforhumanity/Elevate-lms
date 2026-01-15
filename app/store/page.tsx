import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  Download,
  ArrowRight,
  CheckCircle,
  Building2
} from 'lucide-react';
import { 
  LICENSE_TIERS, 
  DIGITAL_PRODUCTS, 
  DISCLAIMERS,
  ROUTES,
  getFeaturedTier,
  getStartingPrice
} from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Mission-supporting products and platform licensing for workforce organizations.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

const productIcons: Record<string, typeof FileText> = {
  'tax-toolkit': FileText,
  'grant-guide': BookOpen,
  'fund-ready-course': Download,
};

export default function StorePage() {
  const featuredTier = getFeaturedTier();
  const startingPrice = getStartingPrice();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-lg font-bold text-slate-900 hover:text-orange-600 transition">
              Elevate for Humanity
            </Link>
            <div className="flex items-center gap-4">
              <Link href={ROUTES.license} className="text-slate-600 hover:text-orange-600 transition text-sm font-medium">
                Platform Licensing
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
              >
                <ArrowRight className="w-4 h-4" />
                Preview Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* SECTION A: HERO/HEADER */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Store
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Mission-supporting products and platform licensing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.schedule}
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Demo
              </Link>
              <Link
                href={ROUTES.license}
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold border border-slate-300 hover:bg-slate-50 transition"
              >
                View Licensing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION B: FEATURED OFFER (PLATFORM LICENSE) */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-5">
                {/* Left - Info (3 cols) */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm font-semibold mb-4">
                    <Building2 className="w-4 h-4" />
                    Platform Licensing
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                    White-label LMS + Workforce Platform
                  </h2>
                  
                  <p className="text-slate-600 mb-6">
                    License our complete workforce training platform for your organization. 
                    Built for training providers, workforce boards, and employer partners.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-1">Platform licenses from</p>
                    <p className="text-4xl font-bold text-slate-900">{startingPrice}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      School: {LICENSE_TIERS[1].price} | Enterprise: {LICENSE_TIERS[2].price}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {featuredTier.includes.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={ROUTES.schedule}
                      className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                      <Calendar className="w-5 h-5" />
                      Schedule a Demo
                    </Link>
                    <Link
                      href={ROUTES.licenseFeatures}
                      className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
                    >
                      See What's Included
                    </Link>
                  </div>
                </div>

                {/* Right - Visual (2 cols) */}
                <div className="lg:col-span-2 bg-slate-100 p-8 lg:p-10 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-20 h-20 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Built for Workforce
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Training providers, reentry programs, and employer partners.
                    </p>
                    <Link
                      href={ROUTES.demo}
                      className="text-orange-600 font-semibold text-sm hover:text-orange-700 inline-flex items-center gap-1"
                    >
                      Explore Demo Pages <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: DIGITAL PRODUCTS (MAX 3) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Digital Products</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {DIGITAL_PRODUCTS.map((product) => {
                const Icon = productIcons[product.id] || FileText;
                
                return (
                  <div key={product.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-orange-600 mb-3">{product.price}</p>
                    <p className="text-slate-600 text-sm mb-6">{product.benefit}</p>
                    
                    {product.checkoutReady ? (
                      <Link
                        href={`/store/checkout/${product.id}`}
                        className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
                      >
                        Purchase
                      </Link>
                    ) : (
                      <Link
                        href={ROUTES.schedule}
                        className="block w-full text-center bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
                      >
                        Request Access
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-6">
              Purchase available during onboarding. Schedule a demo to learn more.
            </p>
          </div>
        </section>

        {/* SECTION D: TRUST/MISSION STRIP (ONE LINE) */}
        <section className="py-8 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-600">
              Purchases support workforce training access and community programs.
            </p>
          </div>
        </section>

        {/* SECTION E: FINAL CTA STRIP */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to license the platform?
            </h2>
            <p className="text-slate-600 mb-8">
              Schedule a demo to see the platform and discuss licensing options for your organization.
            </p>
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition text-lg"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-400 text-sm hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 text-sm hover:text-white transition">
                Terms
              </Link>
              <Link href="/contact" className="text-slate-400 text-sm hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
