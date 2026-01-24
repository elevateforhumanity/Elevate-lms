import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Advance | Get Up to $7,500 Same Day | Supersonic Fast Cash',
  description: 'Get your tax refund advance today. Up to $7,500 with 0% interest. No credit check required. Walk out with cash in 15 minutes.',
};

export default function RefundAdvancePage() {
  const benefits = [
    { title: 'Up to $7,500', description: 'Get a large advance on your expected refund' },
    { title: '0% Interest', description: 'No interest charges on your advance' },
    { title: 'No Credit Check', description: 'Approval based on your tax refund, not credit score' },
    { title: '15 Minute Approval', description: 'Fast approval process gets you cash quickly' },
    { title: 'Same Day Cash', description: 'Walk out with money in your pocket today' },
    { title: 'No Hidden Fees', description: 'Transparent pricing with no surprises' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Bring Your Documents',
      description: 'Bring your W-2s, ID, and Social Security card to any of our locations.',
      image: '/images/programs-hq/tax-preparation.jpg',
    },
    {
      step: 2,
      title: 'We Prepare Your Return',
      description: 'Our IRS-certified tax professionals prepare and file your return.',
      image: '/images/heroes-hq/tax-refund-hero.jpg',
    },
    {
      step: 3,
      title: 'Get Your Cash',
      description: 'Once approved, walk out with up to $7,500 in cash the same day.',
      image: '/images/programs-hq/career-success.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/heroes-hq/tax-refund-hero.jpg"
          alt="Refund Advance - Get Cash Today"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              0% INTEREST • NO CREDIT CHECK
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Get Up to <span className="text-green-400">$7,500</span> Today
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Don&apos;t wait weeks for your tax refund. Get a same-day advance with no interest 
              and no credit check. Walk out with cash in as little as 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/supersonic-fast-cash/apply"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/supersonic-fast-cash/calculator"
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors border border-green-500"
              >
                <DollarSign className="w-5 h-5" /> Estimate Your Refund
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Why Choose Our Refund Advance?
            </h2>
            <p className="text-xl text-gray-600">
              The fastest, easiest way to get your tax refund money
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your money in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-black text-xl">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">
                Who Qualifies?
              </h2>
              <p className="text-xl text-green-200 mb-8">
                Most taxpayers with a valid W-2 and expected refund qualify for our advance program.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Valid government-issued photo ID</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Social Security card for you and dependents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>W-2 or 1099 income documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span>Bank account for direct deposit (optional)</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors"
                >
                  Check Your Eligibility <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/programs-hq/business-training.jpg"
                alt="Tax preparation consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Ready to Get Your Money?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Visit any of our locations today or apply online. No appointment necessary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-700 transition-colors"
            >
              Apply Now <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/supersonic-fast-cash/locations"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-300 transition-colors"
            >
              Find a Location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
