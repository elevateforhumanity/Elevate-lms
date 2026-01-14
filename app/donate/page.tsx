import type { Metadata } from 'next';
import Link from 'next/link';
import DonationForm from '@/components/DonationForm';
import {
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  DollarSign,
  CreditCard,
  Building2,
  Gift,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donate & Give | Support Career Training | Elevate for Humanity',
  description:
    'Support free career training for underserved communities. Your donation helps provide job skills, certifications, and employment opportunities. 501(c)(3) tax-deductible.',
  keywords:
    'donate, give, support, charity, nonprofit, career training, job training, tax deductible, 501c3',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/donate',
  },
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-semibold">
                501(c)(3) Tax-Deductible
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Lives Through Career Training
            </h1>
            <p className="text-base md:text-lg text-teal-50 mb-8 leading-relaxed">
              Your donation provides 100% FREE career training, certifications,
              and job placement for individuals facing barriers to employment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate-now"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition shadow-xl hover:shadow-2xl"
              >
                <Heart className="w-6 h-6" />
                Donate Now
              </a>
              <a
                href="#impact"
                className="inline-flex items-center justify-center gap-2 bg-teal-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-500/40 transition border-2 border-white/30"
              >
                See Your Impact
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-black">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-brand-blue-600" />
              </div>
              <div className="text-4xl font-bold text-black mb-2">95%</div>
              <div className="text-black">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green-100 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-brand-green-600" />
              </div>
              <div className="text-4xl font-bold text-black mb-2">87%</div>
              <div className="text-black">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-black mb-2">$45K</div>
              <div className="text-black">Avg. Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Impact Section */}
      <section id="impact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Your Donation Makes a Real Difference
            </h2>
            <p className="text-base md:text-lg text-black max-w-3xl mx-auto">
              Every dollar directly supports career training, certifications,
              and job placement services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg md:text-lg font-bold text-black mb-2">
                $50
              </h3>
              <p className="text-black mb-4">
                Provides training materials and supplies for one student
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Textbooks and workbooks</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Safety equipment</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Digital learning resources</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border-2 border-teal-500">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                MOST POPULAR
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <GraduationCap className="w-6 h-6 text-brand-blue-600" />
              </div>
              <h3 className="text-lg md:text-lg font-bold text-black mb-2">
                $250
              </h3>
              <p className="text-black mb-4">
                Covers certification exam fees for one student
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Industry certification exam</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Study materials and prep courses</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Professional resume building</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green-100 rounded-lg mb-4">
                <Briefcase className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-lg md:text-lg font-bold text-black mb-2">
                $1,000
              </h3>
              <p className="text-black mb-4">
                Sponsors complete training program for one student
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full 8-12 week training program</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>All certifications and materials</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Job placement assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donate-now" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Make Your Donation Today
            </h2>
            <p className="text-lg text-black">
              Secure payment powered by Stripe. 100% tax-deductible.
            </p>
          </div>

          <DonationForm />

          <div className="hidden bg-slate-50 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            {/* Donation Amount Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-black mb-4">
                SELECT AMOUNT
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[50, 100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    className="px-6 py-4 border-2 border-slate-300 rounded-lg font-bold text-black hover:border-teal-500 hover:bg-teal-50 transition"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black font-semibold">$</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                />
              </div>
            </div>

            {/* Donation Type */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-black mb-4">
                DONATION TYPE
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="px-6 py-4 border-2 border-teal-500 bg-teal-50 rounded-lg font-bold text-teal-700 transition" aria-label="Action button">
                  One-Time Gift
                </button>
                <button className="px-6 py-4 border-2 border-slate-300 rounded-lg font-bold text-black hover:border-teal-500 hover:bg-teal-50 transition" aria-label="Action button">
                  Monthly Giving
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-black mb-4">
                PAYMENT METHOD
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-teal-500 bg-teal-50 rounded-lg font-bold text-teal-700 transition" aria-label="Action button">
                  <CreditCard className="w-5 h-5" />
                  Card
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-lg font-bold text-black hover:border-teal-500 hover:bg-teal-50 transition" aria-label="Action button">
                  <Building2 className="w-5 h-5" />
                  Bank
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-lg font-bold text-black hover:border-teal-500 hover:bg-teal-50 transition" aria-label="Action button">
                  <Gift className="w-5 h-5" />
                  Other
                </button>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 mb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                />
              </div>
            </div>

            {/* Dedication Option */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <span className="font-semibold text-black">
                  Make this donation in honor or memory of someone
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-white text-white px-8 py-5 rounded-lg font-bold text-lg hover: hover: transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3" aria-label="Action button">
              <Heart className="w-6 h-6" />
              Complete Donation
            </button>

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-black">
              <Shield className="w-5 h-5 text-brand-green-600" />
              <span>Secure payment processing • 501(c)(3) tax-deductible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Other Ways to Support
            </h2>
            <p className="text-lg text-black">
              Multiple options to make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Corporate Sponsorship
              </h3>
              <p className="text-black mb-4">
                Partner with us to sponsor training programs, provide
                internships, or support specific initiatives.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Gift className="w-6 h-6 text-brand-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Planned Giving
              </h3>
              <p className="text-black mb-4">
                Include Elevate for Humanity in your estate planning to create a
                lasting legacy of opportunity.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green-100 rounded-lg mb-4">
                <Award className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Matching Gifts
              </h3>
              <p className="text-black mb-4">
                Many employers match charitable donations. Check if your company
                participates to double your impact.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Information */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Tax-Deductible Donations
          </h2>
          <p className="text-black mb-6 leading-relaxed">
            Elevate for Humanity is a registered 501(c)(3) nonprofit
            organization. Your donation is tax-deductible to the fullest extent
            allowed by law. You will receive a receipt for your records
            immediately after your donation.
          </p>
          <p className="text-sm text-slate-500">
            EIN: [Tax ID Number] • All donations are secure and confidential
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About Giving?
          </h2>
          <p className="text-base md:text-lg text-teal-50 mb-8">
            Our team is here to help you make the most meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition shadow-xl"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-teal-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-500/40 transition border-2 border-white/30"
            >
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
