import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What to Bring | VITA Free Tax Prep',
  description: 'Documents and information needed for your VITA tax appointment.',
};

export const dynamic = 'force-dynamic';

export default async function WhatToBringPage() {
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

  // Get document checklist
  const { data: checklist } = await supabase
    .from('vita_checklist')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('order', { ascending: true });

  const requiredDocuments = [
    'Photo ID for you (and spouse if filing jointly)',
    'Social Security cards for everyone on the return',
    'Birth dates for everyone on the return',
    'All W-2 forms from employers',
    'All 1099 forms (interest, dividends, retirement, etc.)',
    'Last year\'s tax return (if available)',
    'Bank account and routing numbers for direct deposit',
  ];

  const ifApplicable = [
    'Form 1095-A (Health Insurance Marketplace)',
    'Childcare provider information (name, address, EIN)',
    'Education expenses (Form 1098-T)',
    'Student loan interest (Form 1098-E)',
    'Property tax statements',
    'Mortgage interest statement (Form 1098)',
    'Records of estimated tax payments',
    'IRS Identity Protection PIN (if issued)',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FileText className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">What to Bring</h1>
          <p className="text-xl text-green-100">
            Documents needed for your free tax appointment
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-800">Important</h3>
              <p className="text-yellow-700">
                Please bring ALL documents. Missing documents may require a second visit.
                If filing jointly, both spouses must be present.
              </p>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Required Documents
          </h2>
          <ul className="space-y-3">
            {requiredDocuments.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* If Applicable */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">If Applicable</h2>
          <ul className="space-y-3">
            {ifApplicable.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download Checklist */}
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <h3 className="font-bold text-lg mb-4">Download Printable Checklist</h3>
          <p className="text-gray-600 mb-4">
            Print this checklist to make sure you have everything ready
          </p>
          <a
            href="/downloads/vita-checklist.pdf"
            download
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            <FileText className="w-5 h-5" />
            Download PDF Checklist
          </a>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Ready with your documents?</p>
          <Link
            href="/vita/schedule"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Schedule Your Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
