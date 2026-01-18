import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SubpageHero } from '../components/SubpageHero';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Refund Advance Options | Supersonic Fast Cash',
  description:
    'Optional refund advances through third-party banking partners. Get $250-$7,500 same day.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash/pricing',
  },
};

export default async function PricingPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  
  // Fetch pricing info
  const { data: pricing } = await supabase
    .from('tax_services')
    .select('*')
    .eq('type', 'refund_advance');
  return (
    <div className="min-h-screen bg-gray-50">
      <SubpageHero
        badge="💰 Transparent Pricing"
        title="Refund Advance Options"
        description="Get your refund faster with optional advances through our banking partners"
      />

      {/* Advance Options */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Advance Amounts & Costs
            </h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Supersonic Fast Cash offers optional refund advances through third-party banking partners. 
              Advance eligibility, amounts, and costs are determined by the bank and disclosed before funds are issued.
            </p>
          </div>

          {/* Advance Tiers */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Small Advances */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm mb-4">
                  SMALL ADVANCE
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  $250 – $1,000 Advance
                </h3>
                <div className="text-3xl font-black text-green-600 mb-2">
                  Bank Fees Apply
                </div>
                <p className="text-black">
                  Fees determined by banking partner. Subject to approval.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-black">Same-day funding available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-black">No hidden fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-black">Subject to bank approval</span>
                </li>
              </ul>
            </div>

            {/* Larger Advances */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-500">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm mb-4">
                  BANK-DETERMINED COST
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  $1,250 and Above
                </h3>
                <div className="text-5xl font-black text-blue-600 mb-2">
                  Varies
                </div>
                <p className="text-black">
                  Cost determined by lending partner and deducted from refund
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">✓</span>
                  <span className="text-black">Up to $7,500 available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">✓</span>
                  <span className="text-black">All terms disclosed before funding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">✓</span>
                  <span className="text-black">Cost depends on refund amount and time outstanding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Disclosures */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-black mb-6">Important Disclosures</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xl flex-shrink-0">•</span>
                <span className="text-black">
                  <strong>Refund advances are optional</strong> and not required to file a tax return
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xl flex-shrink-0">•</span>
                <span className="text-black">
                  <strong>Not all taxpayers qualify</strong> for an advance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xl flex-shrink-0">•</span>
                <span className="text-black">
                  <strong>Approval decisions are made by the bank</strong>, not the tax preparer
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xl flex-shrink-0">•</span>
                <span className="text-black">
                  <strong>Advance costs are separate</strong> from tax preparation fees
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xl flex-shrink-0">•</span>
                <span className="text-black">
                  <strong>Sub-offices do not receive</strong> any portion of advance fees or costs
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tax Prep Pricing CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Tax Preparation Pricing
          </h2>
          <p className="text-xl text-black mb-8">
            For tax preparation fees and service details, please call our office. 
            We'll provide a custom quote based on your specific tax situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3173143757"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            How Refund Advances Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-2">File Your Return</h3>
              <p className="text-black">
                Complete your tax return with our IRS-certified preparers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Apply for Advance</h3>
              <p className="text-black">
                Bank reviews your application and determines eligibility
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Get Funded</h3>
              <p className="text-black">
                Receive funds same day if approved, then get full refund from IRS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call us today to discuss your tax situation and advance options
          </p>
          <a
            href="tel:3173143757"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            (317) 314-3757
          </a>
        </div>
      </section>
    </div>
  );
}
