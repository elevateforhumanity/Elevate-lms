'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  DollarSign,
  Calculator,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Award,
  Zap,
  Star,
  Phone,
  Calendar,
  TrendingUp,
  FileText,
} from 'lucide-react';

export default function SupersonicFastCashPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
                🚀 Same-Day Refund Advance Available
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Get Your Tax Refund <span className="text-yellow-300">Fast</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Don't wait weeks for the IRS. Get your refund advance TODAY. Professional tax preparation with instant cash advance.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/supersonic-fast-cash/book-appointment"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>
                <Link
                  href="/supersonic-fast-cash/calculator"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition"
                >
                  <Calculator className="w-5 h-5" />
                  Estimate Refund
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">2,847</div>
                  <div className="text-sm text-white/80">Returns Filed</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">$5M+</div>
                  <div className="text-sm text-white/80">Refunds Processed</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">15+</div>
                  <div className="text-sm text-white/80">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/supersonic-fast-cash/hero-banner.jpg"
                  alt="Fast Tax Refunds - Professional Tax Preparation"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-semibold">IRS Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Walk-Ins Welcome</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Bilingual Staff</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Why Wait 21 Days? Get Your Money NOW
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes us different from H&R Block and TurboTax
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Fast Cash Advance</h3>
              <p className="text-gray-600 mb-4">
                Get your refund advance TODAY. No waiting for IRS. Simple process. Bad credit OK. Most approvals in 30 minutes.
              </p>
              <Link href="/supersonic-fast-cash/how-it-works" className="text-orange-600 font-semibold hover:text-orange-700 inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Maximum Refund</h3>
              <p className="text-gray-600 mb-4">
                We find EVERY deduction. EITC specialists. Business expense experts. We maximize your refund every time.
              </p>
              <Link href="/supersonic-fast-cash/services" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-2">
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Open 7 Days/Week</h3>
              <p className="text-gray-600 mb-4">
                Mon-Fri: 9am-8pm. Sat-Sun: 10am-6pm. Walk-ins welcome. Most returns done same day. No appointment needed.
              </p>
              <Link href="/supersonic-fast-cash/locations" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
                Find Location <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Audit Protection</h3>
              <p className="text-gray-600 mb-4">
                If IRS audits you, we handle it. Audit protection service included. We stand behind every return. 15+ years experience.
              </p>
              <Link href="/supersonic-fast-cash/services" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center gap-2">
                Protection Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">IRS-Certified Pros</h3>
              <p className="text-gray-600 mb-4">
                All preparers pass IRS exam. Average 12 years experience. Bilingual staff. We speak English, Spanish, and numbers.
              </p>
              <Link href="/supersonic-fast-cash/careers" className="text-indigo-600 font-semibold hover:text-indigo-700 inline-flex items-center gap-2">
                Join Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Trusted by Thousands</h3>
              <p className="text-gray-600 mb-4">
                2,847 returns filed last season. 4.9-star rating. Family-owned and operated. Serving Indianapolis for 15+ years.
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your refund in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Bring Your Documents</h3>
              <p className="text-gray-600 mb-4">
                W-2s, 1099s, receipts, and ID. Not sure what you need? We'll help you figure it out.
              </p>
              <Link href="/supersonic-fast-cash/tax-information" className="text-orange-600 font-semibold hover:text-orange-700">
                Document Checklist →
              </Link>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">We Prepare Your Return</h3>
              <p className="text-gray-600 mb-4">
                Our IRS-certified pros review your documents, find every deduction, and maximize your refund.
              </p>
              <Link href="/supersonic-fast-cash/services" className="text-orange-600 font-semibold hover:text-orange-700">
                Our Services →
              </Link>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Get Your Money Fast</h3>
              <p className="text-gray-600 mb-4">
                Choose refund advance for same-day cash, or e-file for fastest IRS processing.
              </p>
              <Link href="/supersonic-fast-cash/how-it-works" className="text-orange-600 font-semibold hover:text-orange-700">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our Services
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              More than just tax preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/supersonic-fast-cash/services/tax-preparation" className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition">
              <FileText className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tax Preparation</h3>
              <p className="text-white/80 text-sm">Individual, business, and complex returns</p>
            </Link>

            <Link href="/supersonic-fast-cash/services" className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Refund Advance</h3>
              <p className="text-white/80 text-sm">Get your money today, not in 21 days</p>
            </Link>

            <Link href="/supersonic-fast-cash/services/bookkeeping" className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition">
              <Calculator className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Bookkeeping</h3>
              <p className="text-white/80 text-sm">Monthly bookkeeping for small businesses</p>
            </Link>

            <Link href="/supersonic-fast-cash/services/payroll" className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Payroll Services</h3>
              <p className="text-white/80 text-sm">Full-service payroll processing</p>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/supersonic-fast-cash/services"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees. Know exactly what you'll pay before we start.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-2">Basic Return</h3>
              <div className="text-4xl font-black text-orange-600 mb-4">$89</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">W-2 income only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Standard deduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">E-file included</span>
                </li>
              </ul>
              <Link href="/supersonic-fast-cash/pricing" className="block text-center bg-gray-100 text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition">
                Learn More
              </Link>
            </div>

            <div className="bg-orange-600 text-white rounded-2xl p-8 shadow-xl border-4 border-orange-400 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard Return</h3>
              <div className="text-4xl font-black mb-4">$149</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Multiple income sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Itemized deductions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Refund advance eligible</span>
                </li>
              </ul>
              <Link href="/supersonic-fast-cash/book-appointment" className="block text-center bg-white text-orange-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition">
                Book Now
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-2">Business Return</h3>
              <div className="text-4xl font-black text-orange-600 mb-4">$299+</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Schedule C/LLC</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Business deductions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quarterly estimates</span>
                </li>
              </ul>
              <Link href="/supersonic-fast-cash/pricing" className="block text-center bg-gray-100 text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition">
                Learn More
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/supersonic-fast-cash/pricing" className="text-orange-600 font-bold text-lg hover:text-orange-700">
              View Complete Pricing →
            </Link>
          </div>
        </div>
      </section>
            color: "teal"
          },
          {
            icon: TrendingUp,
            title: "Maximum Refund Guarantee",
            description: "If you find a bigger refund elsewhere, we'll match it. We're that confident. Accuracy guaranteed.",
            color: "red"
          }
        ]}
        columns={3}
      />

      {/* Urgency CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <div className="text-sm font-bold uppercase tracking-wider mb-4">
            ⚡ BOOK YOUR APPOINTMENT
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            File Your Taxes Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Professional tax preparation with fast refund advance. 
            Limited appointments available this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Book Appointment Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="tel:317-555-0100"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Call Now: (317) 555-0100
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Our Services
            </h2>
            <p className="text-xl text-black">
              Comprehensive financial solutions for individuals and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tax Preparation */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-brand-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Tax Preparation
              </h3>
              <p className="text-black leading-relaxed mb-4">
                Personal and business tax returns prepared accurately and filed
                on time. Maximize your refund with expert guidance.
              </p>
              <Link
                href="/supersonic-fast-cash/services/tax-preparation"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Bookkeeping */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-10 h-10 text-brand-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Bookkeeping
              </h3>
              <p className="text-black leading-relaxed mb-4">
                Professional bookkeeping services to keep your finances
                organized and your business running smoothly.
              </p>
              <Link
                href="/supersonic-fast-cash/services/bookkeeping"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Payroll Services */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-brand-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Payroll Services
              </h3>
              <p className="text-black leading-relaxed mb-4">
                Efficient payroll processing with accurate tax calculations and
                timely payments to your employees.
              </p>
              <Link
                href="/supersonic-fast-cash/services/payroll"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>

            {/* Business Consulting */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Business Consulting
              </h3>
              <p className="text-black leading-relaxed mb-4">
                Strategic planning, entity selection, and financial advice to
                help your business grow and succeed.
              </p>
              <Link
                href="/supersonic-fast-cash/services/consulting"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-8">
                Why Choose Supersonic Fast Cash?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Trusted Expertise
                    </h3>
                    <p className="text-black leading-relaxed">
                      Years of experience helping individuals and businesses
                      navigate complex tax laws and financial regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-brand-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Personalized Service
                    </h3>
                    <p className="text-black leading-relaxed">
                      We take time to understand your unique situation and
                      provide tailored solutions that meet your specific needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Fast Turnaround
                    </h3>
                    <p className="text-black leading-relaxed">
                      Quick, efficient service without sacrificing accuracy. Get
                      your returns filed and refunds processed faster.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Maximum Refunds
                    </h3>
                    <p className="text-black leading-relaxed">
                      We find every deduction and credit you're entitled to,
                      ensuring you get the maximum refund possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Quick Facts</h3>

              <div className="space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <div className="text-slate-400 text-sm mb-2">
                    IRS Certified
                  </div>
                  <div className="text-4xl font-bold text-brand-green-500">✓</div>
                </div>

                <div className="border-b border-white/10 pb-6">
                  <div className="text-slate-400 text-sm mb-2">
                    Drake Software
                  </div>
                  <div className="text-4xl font-bold text-brand-green-500">✓</div>
                </div>

                <div className="border-b border-white/10 pb-6">
                  <div className="text-slate-400 text-sm mb-2">
                    E-File Available
                  </div>
                  <div className="text-4xl font-bold text-brand-green-500">✓</div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm mb-2">
                    Same Day Service
                  </div>
                  <div className="text-4xl font-bold text-brand-green-500">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              How It Works
            </h2>
            <p className="text-xl text-black">
              Simple, straightforward process to get your taxes done right
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Schedule
              </h3>
              <p className="text-black">
                Book your appointment online or call us to schedule a
                consultation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-brand-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Gather Documents
              </h3>
              <p className="text-black">
                Collect your W-2s, 1099s, receipts, and other tax documents.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-brand-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                We Prepare
              </h3>
              <p className="text-black">
                Our experts prepare your return, finding every deduction you
                deserve.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-brand-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                File & Refund
              </h3>
              <p className="text-black">
                We file electronically and you get your refund fast and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="w-5 h-5 text-brand-green-600"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "Best tax service I've ever used. They found deductions I didn't
                even know existed and got me a much bigger refund than I
                expected!"
              </p>
              <div className="font-bold text-black">Jennifer M.</div>
              <div className="text-sm text-black">Small Business Owner</div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="w-5 h-5 text-brand-green-600"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "Professional, fast, and affordable. They made tax season
                stress-free. I'll definitely be using them again next year."
              </p>
              <div className="font-bold text-black">Robert T.</div>
              <div className="text-sm text-black">Individual Filer</div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="w-5 h-5 text-brand-green-600"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "Their bookkeeping services have been a game-changer for my
                business. Everything is organized and I always know where I
                stand financially."
              </p>
              <div className="font-bold text-black">Maria S.</div>
              <div className="text-sm text-black">Restaurant Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/supersonic-fast-cash/cta-instant-cash.jpg"
            alt="Instant Cash Refund Advance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 to-orange-700/95"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block bg-yellow-400 text-orange-900 px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
                🚀 SAME-DAY APPROVAL
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Get Instant Cash Up to <span className="text-yellow-300">$6,000</span>
              </h2>
              <p className="text-2xl mb-8 text-white/90 leading-relaxed">
                Don't wait for the IRS. Walk out with cash TODAY. Most approvals in 30 minutes or less.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-900" />
                  </div>
                  <span className="text-lg">No credit check required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-900" />
                  </div>
                  <span className="text-lg">Same-day cash advance available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-900" />
                  </div>
                  <span className="text-lg">Simple application process</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-orange-900 px-10 py-5 rounded-xl text-xl font-black hover:bg-yellow-300 transition shadow-2xl"
                >
                  Apply Now
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <a
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white/20 transition border-2 border-white/30"
                >
                  <Phone className="w-6 h-6" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
                <div className="text-center mb-6">
                  <div className="text-7xl font-black text-yellow-300 mb-2">$6,000</div>
                  <div className="text-xl font-bold">Maximum Advance</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span>Processing Time:</span>
                    <span className="font-bold">30 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span>Credit Check:</span>
                    <span className="font-bold">Not Required</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/20">
                    <span>Availability:</span>
                    <span className="font-bold">Same Day</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Bad Credit:</span>
                    <span className="font-bold text-green-300">OK</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-xs text-white/70">
                    Advance amount based on expected refund. Terms and conditions apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-3">Location</h3>
              <p className="text-slate-300">
                123 Main Street
                <br />
                Indianapolis, IN 46204
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Contact</h3>
              <p className="text-slate-300">
                Phone: (317) 555-0100
                <br />
                Email: info@supersonicfastcash.com
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Hours</h3>
              <p className="text-slate-300">
                Mon-Fri: 9am - 6pm
                <br />
                Sat: 10am - 4pm
                <br />
                Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
