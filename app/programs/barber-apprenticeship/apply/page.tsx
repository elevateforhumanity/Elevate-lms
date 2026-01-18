'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';



export default function BarberApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: 'IN',
    zipCode: '',
    hasHostShop: '',
    hostShopName: '',
    hostShopAddress: '',
    hostShopContact: '',
    enrolledInBarberSchool: '',
    barberSchoolName: '',
    priorExperience: '',
    agreeToTerms: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/programs/barber-apprenticeship/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          program: 'Barber Apprenticeship',
          programType: 'apprenticeship',
          fundingSource: 'self-pay',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to checkout with application ID
        router.push(`/checkout/barber-apprenticeship?applicationId=${result.applicationId}`);
      } else {
        setError(result.error || 'Application failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please call 317-314-3757 for assistance.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-purple-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/programs/barber-apprenticeship" className="text-purple-200 hover:text-white text-sm mb-4 inline-block">
            ← Back to Program Details
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Barber Apprenticeship Application
          </h1>
          <p className="text-purple-100">
            DOL Registered Apprenticeship Program • $4,980 Program Fee
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-amber-50 border-b-2 border-amber-200 py-4">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900">
              This is a self-pay program. WIOA/WRG funding is not available for this apprenticeship. 
              Payment plans and financing options are available at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-700' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}>1</div>
            <span className="hidden sm:inline font-medium">Personal Info</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-full bg-purple-700 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-700' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}>2</div>
            <span className="hidden sm:inline font-medium">Host Shop</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className={`h-full bg-purple-700 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-700' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}>3</div>
            <span className="hidden sm:inline font-medium">Review</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-black mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">State *</label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="IN">Indiana</option>
                    <option value="IL">Illinois</option>
                    <option value="OH">Ohio</option>
                    <option value="KY">Kentucky</option>
                    <option value="MI">Michigan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">ZIP *</label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-colors"
                >
                  Continue to Host Shop Information
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Host Shop Information */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-black mb-4">Host Shop & Training Background</h2>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Do you have a host barbershop where you will complete your on-the-job training? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasHostShop"
                      value="yes"
                      checked={formData.hasHostShop === 'yes'}
                      onChange={(e) => updateField('hasHostShop', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hasHostShop"
                      value="no"
                      checked={formData.hasHostShop === 'no'}
                      onChange={(e) => updateField('hasHostShop', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>No, I need help finding one</span>
                  </label>
                </div>
              </div>

              {formData.hasHostShop === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Host Shop Name</label>
                    <input
                      type="text"
                      value={formData.hostShopName}
                      onChange={(e) => updateField('hostShopName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Host Shop Address</label>
                    <input
                      type="text"
                      value={formData.hostShopAddress}
                      onChange={(e) => updateField('hostShopAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Host Shop Contact (Owner/Manager Name & Phone)</label>
                    <input
                      type="text"
                      value={formData.hostShopContact}
                      onChange={(e) => updateField('hostShopContact', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-black mb-2">
                  Are you currently enrolled in or have completed a licensed barber school? *
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledInBarberSchool"
                      value="currently-enrolled"
                      checked={formData.enrolledInBarberSchool === 'currently-enrolled'}
                      onChange={(e) => updateField('enrolledInBarberSchool', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Currently enrolled</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledInBarberSchool"
                      value="completed"
                      checked={formData.enrolledInBarberSchool === 'completed'}
                      onChange={(e) => updateField('enrolledInBarberSchool', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Completed barber school</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledInBarberSchool"
                      value="planning"
                      checked={formData.enrolledInBarberSchool === 'planning'}
                      onChange={(e) => updateField('enrolledInBarberSchool', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Planning to enroll</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="enrolledInBarberSchool"
                      value="not-yet"
                      checked={formData.enrolledInBarberSchool === 'not-yet'}
                      onChange={(e) => updateField('enrolledInBarberSchool', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Not yet - need guidance</span>
                  </label>
                </div>
              </div>

              {(formData.enrolledInBarberSchool === 'currently-enrolled' || formData.enrolledInBarberSchool === 'completed') && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Barber School Name</label>
                  <input
                    type="text"
                    value={formData.barberSchoolName}
                    onChange={(e) => updateField('barberSchoolName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Do you have any prior barbering experience? (Optional)
                </label>
                <textarea
                  value={formData.priorExperience}
                  onChange={(e) => updateField('priorExperience', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe any relevant experience..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-colors"
                >
                  Review Application
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-black mb-4">Review Your Application</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-black">Personal Information</h3>
                <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
                <p><span className="text-gray-600">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-black">Host Shop</h3>
                <p><span className="text-gray-600">Has Host Shop:</span> {formData.hasHostShop === 'yes' ? 'Yes' : 'Needs assistance'}</p>
                {formData.hasHostShop === 'yes' && formData.hostShopName && (
                  <p><span className="text-gray-600">Shop:</span> {formData.hostShopName}</p>
                )}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 mb-2">Program Fee: $4,980</h3>
                <p className="text-sm text-purple-800">
                  After submitting, you'll be directed to checkout where you can choose to pay in full or select a payment plan.
                </p>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    I understand this is a DOL Registered Apprenticeship program that provides sponsorship, oversight, and related instruction. 
                    This program does not replace barber school and does not grant state licensure hours. 
                    I agree to the <Link href="/terms" className="text-purple-700 underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-700 underline">Privacy Policy</Link>.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.agreeToTerms}
                  className="flex-1 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit & Continue to Payment'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
