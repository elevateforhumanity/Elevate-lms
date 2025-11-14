'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const FUNDING_TYPES = [
  {
    id: 'wioa',
    name: 'WIOA (Workforce Innovation and Opportunity Act)',
    description: '100% funded workforce training for eligible individuals',
    eligibility: 'Must be referred by WorkOne Indiana or approved case manager',
    icon: '🎓',
    color: 'blue',
  },
  {
    id: 'wrg',
    name: 'WRG (Workforce Ready Grant)',
    description: 'State-funded training for high-demand careers',
    eligibility: 'Indiana residents pursuing approved career pathways',
    icon: '💼',
    color: 'green',
  },
  {
    id: 'jri',
    name: 'JRI (Justice Reinvestment Initiative)',
    description: 'Training for justice-involved individuals',
    eligibility: 'Referred by probation, parole, or reentry program',
    icon: '⚖️',
    color: 'purple',
  },
  {
    id: 'employer',
    name: 'Employer-Sponsored',
    description: 'Training paid by your employer',
    eligibility: 'Employer must have active partnership agreement',
    icon: '🏢',
    color: 'orange',
  },
  {
    id: 'self_pay',
    name: 'Self-Pay',
    description: 'Pay for training yourself',
    eligibility: 'Open to all learners',
    icon: '💳',
    color: 'gray',
  },
];

const PROGRAMS = [
  { id: 1, name: 'Barber Apprenticeship', duration: '12 weeks', cost: 2500 },
  { id: 2, name: 'CNA Certification Prep', duration: '8 weeks', cost: 1800 },
  { id: 3, name: 'HVAC Technician Training', duration: '16 weeks', cost: 3200 },
  { id: 4, name: 'Building Maintenance Tech', duration: '10 weeks', cost: 2200 },
  { id: 5, name: 'Life Coach Certification', duration: '6 weeks', cost: 1500 },
  { id: 6, name: 'Peer Recovery Specialist', duration: '8 weeks', cost: 1800 },
  { id: 7, name: 'Tax Preparation Professional', duration: '6 weeks', cost: 1200 },
  { id: 8, name: 'Medical Assistant', duration: '12 weeks', cost: 2800 },
  { id: 9, name: 'Commercial Truck Driving (CDL)', duration: '4 weeks', cost: 4500 },
  { id: 10, name: 'Workforce Readiness', duration: '2 weeks', cost: 500 },
];

export default function WorkforceEnrollmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form state
  const [selectedFunding, setSelectedFunding] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address
    address: '',
    city: '',
    state: 'IN',
    zipCode: '',
    county: '',
    
    // Funding-specific
    caseManagerName: '',
    caseManagerEmail: '',
    caseManagerPhone: '',
    referralSource: '',
    eligibilityDocuments: '',
    
    // Employer (if applicable)
    employerName: '',
    employerContact: '',
    
    // Additional
    educationLevel: '',
    employmentStatus: '',
    hasTransportation: '',
    hasChildcare: '',
    specialAccommodations: '',
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get the course ID for the selected program
      const { data: course } = await supabase
        .from('courses')
        .select('id')
        .eq('title', PROGRAMS.find(p => p.id.toString() === selectedProgram)?.name)
        .single();

      if (!course) throw new Error('Course not found');

      // Create enrollment
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: course.id,
          funding_type: selectedFunding,
          status: 'pending',
          enrollment_data: {
            ...formData,
            submittedAt: new Date().toISOString(),
          },
        });

      if (enrollError) throw enrollError;

      // Create student record if doesn't exist
      const { error: studentError } = await supabase
        .from('students')
        .upsert({
          id: user.id,
          wioa_eligible: ['wioa', 'wrg', 'jri'].includes(selectedFunding),
          funding_type: selectedFunding,
          case_manager_name: formData.caseManagerName || null,
          case_manager_email: formData.caseManagerEmail || null,
          county: formData.county || null,
        }, {
          onConflict: 'id',
        });

      if (studentError) throw studentError;

      setSuccess(true);
      setTimeout(() => {
        router.push('/lms/dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enrollment');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Enrollment Submitted!
          </h1>
          <p className="text-gray-600 mb-6">
            Your workforce training enrollment has been submitted for review. You'll receive an email confirmation shortly.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/lms/dashboard" className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 ${step > s ? 'bg-red-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-16 mt-3 text-sm">
              <span className={step >= 1 ? 'text-red-600 font-semibold' : 'text-gray-500'}>
                Funding Type
              </span>
              <span className={step >= 2 ? 'text-red-600 font-semibold' : 'text-gray-500'}>
                Program Selection
              </span>
              <span className={step >= 3 ? 'text-red-600 font-semibold' : 'text-gray-500'}>
                Application
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Funding Type */}
          {step === 1 && (
            <div className="elevate-card">
              <div className="elevate-card-header">
                <h2 className="elevate-card-title">Select Your Funding Type</h2>
                <p className="elevate-card-subtitle mt-1">
                  Choose how you'll pay for your workforce training
                </p>
              </div>
              <div className="space-y-3">
                {FUNDING_TYPES.map((funding) => (
                  <button
                    key={funding.id}
                    onClick={() => setSelectedFunding(funding.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedFunding === funding.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{funding.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{funding.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{funding.description}</p>
                        <p className="text-xs text-gray-500">
                          <strong>Eligibility:</strong> {funding.eligibility}
                        </p>
                      </div>
                      {selectedFunding === funding.id && (
                        <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedFunding}
                  className="elevate-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Program Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Program Selection */}
          {step === 2 && (
            <div className="elevate-card">
              <div className="elevate-card-header">
                <h2 className="elevate-card-title">Select Your Training Program</h2>
                <p className="elevate-card-subtitle mt-1">
                  Choose the career pathway that's right for you
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {PROGRAMS.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setSelectedProgram(program.id.toString())}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      selectedProgram === program.id.toString()
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{program.name}</h3>
                      {selectedProgram === program.id.toString() && (
                        <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{program.duration}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {['wioa', 'wrg', 'jri'].includes(selectedFunding) ? (
                        <span className="text-green-600">100% Funded</span>
                      ) : (
                        `$${program.cost.toLocaleString()}`
                      )}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="elevate-btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedProgram}
                  className="elevate-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Application
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Application Form */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="elevate-card">
              <div className="elevate-card-header">
                <h2 className="elevate-card-title">Complete Your Application</h2>
                <p className="elevate-card-subtitle mt-1">
                  Provide the information needed to process your enrollment
                </p>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Address</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="elevate-select w-full"
                          required
                        >
                          <option value="IN">Indiana</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">ZIP Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">County *</label>
                      <input
                        type="text"
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        className="elevate-input w-full"
                        placeholder="e.g., Marion, Hamilton, Lake"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Funding-Specific Fields */}
                {['wioa', 'wrg', 'jri'].includes(selectedFunding) && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Case Manager Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Case Manager Name *</label>
                        <input
                          type="text"
                          name="caseManagerName"
                          value={formData.caseManagerName}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Case Manager Email *</label>
                        <input
                          type="email"
                          name="caseManagerEmail"
                          value={formData.caseManagerEmail}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Case Manager Phone</label>
                        <input
                          type="tel"
                          name="caseManagerPhone"
                          value={formData.caseManagerPhone}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Referral Source *</label>
                        <select
                          name="referralSource"
                          value={formData.referralSource}
                          onChange={handleInputChange}
                          className="elevate-select w-full"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="workone">WorkOne Indiana</option>
                          <option value="dwd">DWD</option>
                          <option value="employindy">EmployIndy</option>
                          <option value="probation">Probation/Parole</option>
                          <option value="reentry">Reentry Program</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedFunding === 'employer' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Employer Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Employer Name *</label>
                        <input
                          type="text"
                          name="employerName"
                          value={formData.employerName}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Employer Contact *</label>
                        <input
                          type="text"
                          name="employerContact"
                          value={formData.employerContact}
                          onChange={handleInputChange}
                          className="elevate-input w-full"
                          placeholder="Name and email/phone"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Additional Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Highest Education Level *</label>
                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        className="elevate-select w-full"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="less_than_hs">Less than High School</option>
                        <option value="hs_diploma">High School Diploma/GED</option>
                        <option value="some_college">Some College</option>
                        <option value="associates">Associate's Degree</option>
                        <option value="bachelors">Bachelor's Degree</option>
                        <option value="graduate">Graduate Degree</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Employment Status *</label>
                      <select
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        className="elevate-select w-full"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="part_time">Part-Time</option>
                        <option value="full_time">Full-Time</option>
                        <option value="self_employed">Self-Employed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Do you have reliable transportation? *</label>
                      <select
                        name="hasTransportation"
                        value={formData.hasTransportation}
                        onChange={handleInputChange}
                        className="elevate-select w-full"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="need_assistance">Need Assistance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Do you need childcare support? *</label>
                      <select
                        name="hasChildcare"
                        value={formData.hasChildcare}
                        onChange={handleInputChange}
                        className="elevate-select w-full"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="need_assistance">Need Assistance</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Special Accommodations or Notes
                    </label>
                    <textarea
                      name="specialAccommodations"
                      value={formData.specialAccommodations}
                      onChange={handleInputChange}
                      className="elevate-textarea w-full"
                      rows={3}
                      placeholder="Any disabilities, learning needs, or other information we should know..."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="elevate-btn-secondary"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="elevate-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Enrollment Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
