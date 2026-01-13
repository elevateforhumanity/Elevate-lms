import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vita What To Bring | Elevate For Humanity',
  description: 'Elevate For Humanity - Vita What To Bring page',
  alternates: { canonical: 'https://elevateforhumanity.institute/vita/what-to-bring' },
};

import { FileText, CreditCard, Users, Home, CheckCircle } from 'lucide-react';

export default function WhatToBringPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">What to Bring</h1>
          <p className="text-xl">Required documents for your free tax preparation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            Income Documents
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>W-2 forms from all employers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>1099 forms (INT, DIV, MISC, NEC, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Social Security benefits statement (SSA-1099)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Unemployment compensation (1099-G)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-green-600" />
            Identification
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Photo ID for you and your spouse</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Social Security cards for everyone on the return</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Birth dates for everyone on the return</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Dependent Information
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Social Security cards for all dependents</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Childcare provider information (name, address, tax ID)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Form 1098-T for education expenses</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Home className="w-8 h-8 text-green-600" />
            Other Documents
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Bank account and routing numbers for direct deposit</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Copy of last year's tax return (if available)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <span>Form 1095-A, B, or C (health insurance)</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Pro Tip</h3>
          <p className="text-black">
            Bring all documents even if you're not sure you need them. It's better to have too much information than not enough!
          </p>
        </div>
      </div>
    </div>
  );
}
