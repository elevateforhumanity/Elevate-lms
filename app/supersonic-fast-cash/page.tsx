

'use client';

import Link from 'next/link';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';
import {
  FileText,
  DollarSign,
  Calculator,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Award,
  Zap,
  CreditCard,
  HeadphonesIcon,
  Star,
  BadgeCheck,
} from 'lucide-react';

export default function SupersonicFastCashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* Modern Hero with Urgency */}
      <ModernLandingHero
        badge="🚀 Same-Day Refund Advance Available"
        headline="Your Refund"
        accentText="Fast"
        subheadline="Professional Tax Prep + Instant Refund Advance"
        description="Don't wait weeks for the IRS. Get your refund advance TODAY. We filed 2,847 returns last season. Walk in with documents, walk out with your advance."
        imageSrc="/images/business/tax-prep-certification.jpg"
        imageAlt="Fast Tax Refunds"
        primaryCTA={{ text: "Book Appointment", href: "/supersonic-fast-cash/book-appointment" }}
        secondaryCTA={{ text: "Learn More", href: "/supersonic-fast-cash/how-it-works" }}
        features={[
          "2,847 returns filed in 2025 • Millions in refunds processed",
          "Refund advance available • Get cash fast",
          "Open 7 days/week • Walk-ins welcome • Same-day service"
        ]}
        imageOnRight={true}
      />

      {/* Features with Excitement */}
      <ModernFeatures
        title="Why Wait 21 Days? Get Your Money NOW."
        subtitle="What makes us different from H&R Block and TurboTax"
        features={[
          {
            icon: Zap,
            title: "Fast Cash Advance",
            description: "Get your refund advance TODAY. No waiting for IRS. Simple process. Bad credit OK. Most approvals in 30 minutes.",
            color: "orange"
          },
          {
            icon: DollarSign,
            title: "Maximum Refund",
            description: "We find EVERY deduction. EITC specialists. Business expense experts. We maximize your refund every time.",
            color: "green"
          },
          {
            icon: Clock,
            title: "Open 7 Days/Week",
            description: "Mon-Fri: 9am-8pm. Sat-Sun: 10am-6pm. Walk-ins welcome. Most returns done same day. No appointment needed.",
            color: "blue"
          },
          {
            icon: Shield,
            title: "Audit Protection",
            description: "If IRS audits you, we handle it with our audit protection service. We stand behind every return. 15+ years experience.",
            color: "purple"
          },
          {
            icon: Award,
            title: "IRS-Certified Pros",
            description: "All preparers pass IRS exam. Average 12 years experience. Bilingual staff. We speak English, Spanish, and numbers.",
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-orange-600 to-brand-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Schedule your consultation today and discover how much you could
            save.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange-600 px-12 py-6 rounded-xl text-xl font-bold hover:bg-slate-100 transition shadow-2xl"
            >
              Book Appointment
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a
              href="tel:317-555-0100"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-xl text-xl font-bold hover:bg-white/20 transition border-2 border-white/30"
            >
              <Phone className="w-6 h-6" />
              Call Now
            </a>
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
