import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { CheckCircle, XCircle, DollarSign, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eligibility | VITA Free Tax Prep',
  description: 'Check if you qualify for free VITA tax preparation services.',
};

export const dynamic = 'force-dynamic';

export default async function VITAEligibilityPage() {
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

  // Get eligibility criteria
  const { data: criteria } = await supabase
    .from('vita_eligibility')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true });

  const qualifyingCriteria = [
    'Individual or household income under $64,000',
    'Persons with disabilities',
    'Limited English speaking taxpayers',
    'Elderly taxpayers (age 60+)',
    'Active military members',
  ];

  const notCovered = [
    'Self-employment income over $10,000',
    'Rental property income',
    'Complex investment income',
    'Business expenses',
    'Multiple state returns',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Do You Qualify?</h1>
          <p className="text-xl text-green-100">
            Check if you're eligible for free VITA tax preparation
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Income Limit */}
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Income Limit</h2>
          <div className="text-5xl font-bold text-green-600 mb-2">$64,000</div>
          <p className="text-green-700">
            If your household income is under $64,000, you likely qualify for free tax prep
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Who Qualifies */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Who Qualifies
            </h2>
            <ul className="space-y-3">
              {qualifyingCriteria.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's Not Covered */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              What's Not Covered
            </h2>
            <ul className="space-y-3">
              {notCovered.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              If your situation isn't covered, we can refer you to low-cost tax preparation services.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Think You Qualify?</h3>
          <p className="text-gray-600 mb-6">
            Schedule your free appointment today. Our volunteers will confirm your eligibility.
          </p>
          <Link
            href="/vita/schedule"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Schedule Free Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
