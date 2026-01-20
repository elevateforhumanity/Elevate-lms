'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, DollarSign, Clock, CheckCircle, Upload, AlertCircle } from 'lucide-react';

export default function SupersonicApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: '',
    filingStatus: '',
    dependents: '',
    hasW2: false,
    has1099: false,
    bankAccount: '',
    routingNumber: '',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/supersonic" className="hover:text-orange-600">Supersonic</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Fast Cash Application</span>
        </nav>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Get your refund in as little as 24 hours</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supersonic Fast Cash</h1>
          <p className="text-gray-600">Quick tax refund advance application</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-orange-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Income Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Annual Income</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="number" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg" placeholder="50000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
                  <select value={formData.filingStatus} onChange={e => setFormData({...formData, filingStatus: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg">
                    <option value="">Select status...</option>
                    <option value="single">Single</option>
                    <option value="married-joint">Married Filing Jointly</option>
                    <option value="married-separate">Married Filing Separately</option>
                    <option value="head">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                  <input type="number" value={formData.dependents} onChange={e => setFormData({...formData, dependents: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg" placeholder="0" min="0" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Income Documents</p>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.hasW2} onChange={e => setFormData({...formData, hasW2: e.target.checked})} />
                    <span>I have W-2 forms</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.has1099} onChange={e => setFormData({...formData, has1099: e.target.checked})} />
                    <span>I have 1099 forms</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Upload Documents</h2>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-medium mb-2">Drag and drop your tax documents</p>
                <p className="text-sm text-gray-500 mb-4">W-2s, 1099s, and other income documents</p>
                <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Browse Files</button>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Secure Upload</p>
                  <p className="text-blue-700">Your documents are encrypted and securely stored.</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Bank Information</h2>
              <p className="text-gray-600">Enter your bank details for direct deposit of your refund advance.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                  <input type="text" value={formData.bankAccount} onChange={e => setFormData({...formData, bankAccount: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg" placeholder="Enter account number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input type="text" value={formData.routingNumber} onChange={e => setFormData({...formData, routingNumber: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg" placeholder="Enter routing number" />
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-medium text-green-900 mb-2">Estimated Refund Advance</p>
                <p className="text-3xl font-bold text-green-600">$1,250</p>
                <p className="text-sm text-green-700 mt-1">Available within 24 hours of approval</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Continue
              </button>
            ) : (
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
