'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, DollarSign, Users, Home } from 'lucide-react';

export default function VITAEligibilityPage() {
  const [income, setIncome] = useState('');
  const [household, setHousehold] = useState('');
  const [result, setResult] = useState<'eligible' | 'not-eligible' | null>(null);

  const checkEligibility = () => {
    const incomeNum = parseInt(income);
    const householdNum = parseInt(household);
    
    // VITA income limit is $64,000
    if (incomeNum <= 64000) {
      setResult('eligible');
    } else {
      setResult('not-eligible');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative bg-green-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/images/vita/vita-hero.jpg" 
            alt="VITA Eligibility" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Check Your Eligibility</h1>
          <p className="text-xl md:text-2xl">See if you qualify for free VITA tax preparation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Eligibility Calculator</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Annual Household Income
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter your annual income"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Household Size
              </label>
              <input
                type="number"
                value={household}
                onChange={(e) => setHousehold(e.target.value)}
                placeholder="Number of people in household"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <button
              onClick={checkEligibility}
              disabled={!income || !household}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Check Eligibility
            </button>
          </div>

          {result && (
            <div className={`mt-6 p-6 rounded-lg ${result === 'eligible' ? 'bg-green-50 border-2 border-green-600' : 'bg-red-50 border-2 border-red-600'}`}>
              {result === 'eligible' ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-green-900">You Qualify!</h3>
                  </div>
                  <p className="text-green-800 mb-4">
                    Based on your income of ${parseInt(income).toLocaleString()}, you qualify for free VITA tax preparation services.
                  </p>
                  <a
                    href="/vita/schedule"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Schedule Free Appointment
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <h3 className="text-2xl font-bold text-red-900">Income Too High</h3>
                  </div>
                  <p className="text-red-800 mb-4">
                    Your income of ${parseInt(income).toLocaleString()} exceeds the VITA limit of $64,000. However, you may still qualify for other free or low-cost tax preparation services.
                  </p>
                  <a
                    href="/supersonic-fast-cash"
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    View Affordable Tax Services
                  </a>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Who Qualifies for VITA?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Income Under $64,000</h3>
                <p className="text-black">Individuals and families earning $64,000 or less per year</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Persons with Disabilities</h3>
                <p className="text-black">Regardless of income level</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Limited English Speakers</h3>
                <p className="text-black">Taxpayers who need language assistance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Seniors</h3>
                <p className="text-black">Older adults needing assistance with tax preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
