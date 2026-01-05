import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle,
  Globe,
  Mail,
  Package,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'Platform Licensing | Choose Your License Type | Elevate for Humanity',
  description:
    'License our workforce training platform. 4 license types: Program Holder Network (MOU), Independent Platform, Apprenticeship, or À La Carte. Starting at $750/mo.',
  keywords: [
    'workforce platform licensing',
    'program holder network',
    'white label LMS',
    'WIOA software',
    'DOL RAPIDS integration',
    'ETPL approved platform',
  ],
  alternates: {
    canonical: 'https://elevateforhumanity.org/pricing/platform',
  },
};

export default function PlatformLicensingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-900    text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
              🏛️ 4 License Types. Maximum Flexibility.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Choose How You Want to License
            </h1>
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              Program Holder Network. Independent Platform. Apprenticeship Only.
              Or Build Your Own.
            </p>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
              <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold mb-1">MOU Network</div>
                  <div className="text-white/80">Use our credentials</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">Independent</div>
                  <div className="text-white/80">Platform only</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">Apprenticeship</div>
                  <div className="text-white/80">RAPIDS only</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">À La Carte</div>
                  <div className="text-white/80">Build custom</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#license-types"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Compare License Types
              </Link>
              <Link
                href="/demos"
                className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition"
              >
                See Live Demos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Government Credentials Included */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Government Credentials Included
            </h2>
            <p className="text-xl text-slate-600">
              Use our approvals. Skip years of applications. Start immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Federal */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🇺🇸</div>
              <h3 className="text-xl font-bold mb-4">Federal Approvals</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">DOL Registered Sponsor</div>
                    <div className="text-slate-600">RAPIDS: 2025-IN-132301</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">WIOA Eligible Provider</div>
                    <div className="text-slate-600">
                      Federal funding approved
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">Value</div>
                <div className="text-lg font-bold text-slate-900">
                  $150K-$300K
                </div>
                <div className="text-xs text-slate-500">+ 18-30 months</div>
              </div>
            </div>

            {/* State */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold mb-4">State Approvals</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">ETPL Listed</div>
                    <div className="text-slate-600">Provider ID: 10000949</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Indiana DWD Approved</div>
                    <div className="text-slate-600">INTraining: 10004621</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">WRG Approved</div>
                    <div className="text-slate-600">State funding eligible</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">Value</div>
                <div className="text-lg font-bold text-slate-900">
                  $100K-$200K
                </div>
                <div className="text-xs text-slate-500">+ 12-24 months</div>
              </div>
            </div>

            {/* Partnerships */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-4">Official Partnerships</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">JRI Partner</div>
                    <div className="text-slate-600">
                      Justice-involved approved
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">WorkOne Approved</div>
                    <div className="text-slate-600">WIOA referrals</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">SNAP E&T Partner</div>
                    <div className="text-slate-600">SNAP recipients</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">Value</div>
                <div className="text-lg font-bold text-slate-900">
                  $50K-$150K
                </div>
                <div className="text-xs text-slate-500">+ 9-18 months</div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900   rounded-2xl p-8 text-white text-center">
            <div className="text-5xl font-bold mb-2">$300K - $650K</div>
            <div className="text-xl mb-4">
              Total Credential Value + 4-8 Years Saved
            </div>
            <p className="text-white/90 max-w-2xl mx-auto">
              These credentials would take 4-8 years and $300K-$650K to obtain
              yourself. License our platform and use them immediately.
            </p>
          </div>
        </div>
      </section>

      {/* License Types */}
      <section id="license-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your License Type
            </h2>
            <p className="text-xl text-slate-600">
              Different needs, different models. Pick what works for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* License Type 1: Program Holder Network */}
            <div className="bg-zinc-900   rounded-2xl shadow-2xl p-8 text-white relative border-4 border-orange-400">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 mt-2">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Program Holder Network</h3>
                  <p className="text-white/80">Join our umbrella via MOU</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  $4,000<span className="text-xl text-white/80">/mo</span>
                </div>
                <div className="text-white/80">
                  Starting price (500 students)
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <div className="font-bold mb-2">Use OUR Credentials:</div>
                <div className="space-y-1 text-sm">
                  <div>
                    <CheckCircle className="w-5 h-5 inline-block" /> ETPL
                    Provider: 10000949
                  </div>
                  <div>
                    <CheckCircle className="w-5 h-5 inline-block" /> DOL RAPIDS:
                    2025-IN-132301
                  </div>
                  <div>
                    <CheckCircle className="w-5 h-5 inline-block" /> INTraining:
                    10004621
                  </div>
                  <div>
                    <CheckCircle className="w-5 h-5 inline-block" /> WIOA, WRG,
                    JRI, WorkOne, SNAP E&T
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Bring your programs under our umbrella</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Skip 4-8 years of approval waiting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>We handle compliance oversight</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Launch in 30 days (Indiana only for now)</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 text-sm">
                <div className="font-bold mb-1">
                  <AlertTriangle className="w-5 h-5 inline-block" />{' '}
                  Requirements:
                </div>
                <div className="text-white/90">
                  Application required. MOU agreement. Our approval needed.
                  Indiana only (expanding soon).
                </div>
              </div>

              <Link
                href="/pricing/program-holder"
                className="block w-full bg-white text-blue-600 hover:bg-slate-100 text-center px-6 py-4 rounded-lg font-bold transition text-lg"
              >
                Learn More & Apply →
              </Link>
            </div>

            {/* License Type 2: Independent Platform */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Independent Platform
                  </h3>
                  <p className="text-slate-600">
                    Platform only, your credentials
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $2,000<span className="text-xl text-slate-600">/mo</span>
                </div>
                <div className="text-slate-600">
                  Starting price (500 students)
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="font-bold text-slate-900 mb-2">You Handle:</div>
                <div className="space-y-1 text-sm text-slate-700">
                  <div>• Get your own ETPL/WIOA approvals</div>
                  <div>• Manage your own compliance</div>
                  <div>• Independent operation</div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>White-label platform</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full LMS & mobile app</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Student management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant access (no approval needed)</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-6 text-sm">
                <div className="font-bold text-green-900 mb-1">
                  <CheckCircle className="w-5 h-5 inline-block" /> Best For:
                </div>
                <div className="text-green-800">
                  Organizations with existing credentials or willing to get
                  their own.
                </div>
              </div>

              <Link
                href="/pricing/independent"
                className="block w-full bg-slate-900 hover:bg-slate-800 text-white text-center px-6 py-4 rounded-lg font-bold transition text-lg"
              >
                Get Started →
              </Link>
            </div>

            {/* License Type 3: Apprenticeship Only */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Apprenticeship Licensing
                  </h3>
                  <p className="text-slate-600">RAPIDS infrastructure only</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $750<span className="text-xl text-slate-600">/mo</span>
                </div>
                <div className="text-slate-600">
                  Starting price (5 employers, 25 apprentices)
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <div className="font-bold text-purple-900 mb-2">Includes:</div>
                <div className="space-y-1 text-sm text-purple-800">
                  <div>• RAPIDS lifecycle tracking</div>
                  <div>• Sponsor dashboard</div>
                  <div>• Employer onboarding</div>
                  <div>• DOL compliance reporting</div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Apprenticeship management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>OJT tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>MOU workflows</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant access</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm">
                <div className="font-bold text-blue-900 mb-1">
                  <CheckCircle className="w-5 h-5 inline-block" /> Best For:
                </div>
                <div className="text-blue-800">
                  Organizations focused only on apprenticeships.
                </div>
              </div>

              <Link
                href="/pricing/sponsor-licensing"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-4 rounded-lg font-bold transition text-lg"
              >
                View Details →
              </Link>
            </div>

            {/* License Type 4: À La Carte */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Build Your Own
                  </h3>
                  <p className="text-slate-600">À la carte modules</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  Custom<span className="text-xl text-slate-600"> pricing</span>
                </div>
                <div className="text-slate-600">Pay only for what you need</div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 mb-6">
                <div className="font-bold text-orange-900 mb-2">
                  Pick & Choose:
                </div>
                <div className="space-y-1 text-sm text-orange-800">
                  <div>• Core Platform: $2K/mo</div>
                  <div>• + WIOA Module: +$1.5K/mo</div>
                  <div>• + RAPIDS Module: +$1K/mo</div>
                  <div>• + Partnerships: +$1K/mo</div>
                  <div>• Or per-student: $5-$10/student</div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Maximum flexibility</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Scale as you grow</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Add modules anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Per-student option available</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm">
                <div className="font-bold text-slate-900 mb-1">
                  <CheckCircle className="w-5 h-5 inline-block" /> Best For:
                </div>
                <div className="text-slate-700">
                  Organizations with specific needs or smaller budgets.
                </div>
              </div>

              <Link
                href="/pricing/build"
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center px-6 py-4 rounded-lg font-bold transition text-lg"
              >
                Build Package →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Original Pricing Tiers Section (Keep for reference) */}
      <section id="tiers" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your License Tier
            </h2>
            <p className="text-xl text-slate-600">
              Build what you need. Pay for what you use. Scale as you grow.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Tier 1: Basic */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Basic</h3>
                  <p className="text-sm text-slate-600">Platform Only</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  $2,000<span className="text-lg text-slate-600">/mo</span>
                </div>
                <div className="text-sm text-slate-600">
                  Small (500 students)
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>White-label platform</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Student management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>LMS & mobile app</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Basic reporting</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-xs">
                <div className="font-semibold mb-1">No Credentials</div>
                <div className="text-slate-600">
                  For private training providers
                </div>
              </div>

              <Link
                href="/contact?tier=basic"
                className="block w-full bg-slate-900 hover:bg-slate-800 text-white text-center px-4 py-3 rounded-lg font-bold transition"
              >
                Get Started
              </Link>
            </div>

            {/* Tier 2: Government Approved - MOST POPULAR */}
            <div className="bg-zinc-900   rounded-2xl shadow-2xl border-4 border-orange-400 p-6 relative transform lg:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Government Approved
                  </h3>
                  <p className="text-sm text-white/80">WIOA/ETPL/WRG</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1">
                  $4,000<span className="text-lg text-white/80">/mo</span>
                </div>
                <div className="text-sm text-white/80">
                  Small (500 students)
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm text-white">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Everything in Basic</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>ETPL Provider ID: 10000949</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>WIOA compliance</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>State reporting</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4 text-xs text-white">
                <div className="font-semibold mb-1">$110K-$225K Value</div>
                <div className="text-white/80">
                  ETPL + WIOA + State approvals
                </div>
              </div>

              <Link
                href="/contact?tier=government"
                className="block w-full bg-white text-blue-600 hover:bg-slate-100 text-center px-4 py-3 rounded-lg font-bold transition"
              >
                Get Started
              </Link>
            </div>

            {/* Tier 3: Federal Contractor */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Federal Contractor
                  </h3>
                  <p className="text-sm text-slate-600">DOL/RAPIDS</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  $6,000<span className="text-lg text-slate-600">/mo</span>
                </div>
                <div className="text-sm text-slate-600">
                  Small (500 students)
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Everything in Gov Approved</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>DOL RAPIDS: 2025-IN-132301</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Apprenticeship management</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Multi-state operations</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-3 mb-4 text-xs">
                <div className="font-semibold mb-1">$285K-$575K Value</div>
                <div className="text-slate-600">
                  All Gov + DOL + Multi-State
                </div>
              </div>

              <Link
                href="/contact?tier=federal"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-3 rounded-lg font-bold transition"
              >
                Get Started
              </Link>
            </div>

            {/* Tier 4: Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Enterprise
                  </h3>
                  <p className="text-sm text-slate-600">Everything</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  $25,000<span className="text-lg text-slate-600">/mo</span>
                </div>
                <div className="text-sm text-slate-600">
                  Regional (5K students)
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Everything in Federal</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Multi-tenant architecture</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom development</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Dedicated success team</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-3 mb-4 text-xs">
                <div className="font-semibold mb-1">$705K-$1.1M Value</div>
                <div className="text-slate-600">
                  All credentials + custom dev
                </div>
              </div>

              <Link
                href="/contact?tier=enterprise"
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center px-4 py-3 rounded-lg font-bold transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Size Pricing Table */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Pricing by Size
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-right py-3 px-4">Basic</th>
                    <th className="text-right py-3 px-4">Gov Approved</th>
                    <th className="text-right py-3 px-4">Federal</th>
                    <th className="text-right py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 px-4">Small (500)</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $2,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $4,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $6,000/mo
                    </td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 px-4">Medium (2,500)</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $4,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $8,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $12,000/mo
                    </td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 px-4">Large (10,000)</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $8,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $16,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $24,000/mo
                    </td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 px-4">Enterprise (Unlimited)</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $15,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $30,000/mo
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $50,000/mo
                    </td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Regional (5K)</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $25,000/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Statewide (25K)</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $50,000/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Multi-State (100K)</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 text-slate-500">-</td>
                    <td className="text-right py-3 px-4 font-semibold">
                      $100,000/mo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Setup fees: $5K-$250K depending on tier. Contact for details.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-900   text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to License Our Platform?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a demo and see your tier in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demos"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              View Live Demos
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition"
            >
              Contact Sales
            </Link>
          </div>
          <p className="mt-6 text-white/80">
            <Phone className="inline w-4 h-4 mr-2" />
            (317) 314-3757
            <span className="mx-3">|</span>
            <Mail className="inline w-4 h-4 mr-2" />
            Elevate4humanityedu@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
}
