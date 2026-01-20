'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User, GraduationCap, Briefcase, FileText, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  slug: string;
  funding_types: string[];
  price_self_pay: number | null;
}

interface FundingType {
  value: string;
  label: string;
}

interface Props {
  programs: Program[];
  fundingTypes: FundingType[];
  staffId: string;
}

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Program', icon: GraduationCap },
  { id: 3, name: 'Funding', icon: Briefcase },
  { id: 4, name: 'Case Manager', icon: FileText },
  { id: 5, name: 'Review', icon: CheckCircle },
];

export default function StudentAddForm({ programs, fundingTypes, staffId }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    county: '',
    programId: '',
    fundingType: '',
    caseManagerName: '',
    caseManagerEmail: '',
    caseManagerPhone: '',
    notes: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedProgram = programs.find(p => p.id === formData.programId);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      // Create the student profile
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          role: 'student',
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Create student record
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          id: newProfile.id,
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address || null,
          city: formData.city || null,
          state: formData.state || null,
          zip_code: formData.zipCode || null,
          county: formData.county || null,
          funding_type: formData.fundingType || null,
          case_manager_name: formData.caseManagerName || null,
          case_manager_email: formData.caseManagerEmail || null,
          case_manager_phone: formData.caseManagerPhone || null,
          notes: formData.notes || null,
        });

      if (studentError) throw studentError;

      // Create enrollment if program selected
      if (formData.programId) {
        const { error: enrollmentError } = await supabase
          .from('enrollments')
          .insert({
            student_id: newProfile.id,
            program_id: formData.programId,
            funding_type: formData.fundingType || 'self_pay',
            status: 'pending',
            enrolled_by: staffId,
          });

        if (enrollmentError) throw enrollmentError;
      }

      router.push('/staff-portal/students?success=enrolled');
    } catch (err: any) {
      setError(err.message || 'Failed to enroll student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep > step.id ? 'bg-green-500 text-white' :
              currentStep === step.id ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
            </div>
            <span className={`ml-2 text-sm hidden sm:block ${currentStep === step.id ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
              {step.name}
            </span>
            {idx < steps.length - 1 && <div className={`w-12 h-1 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input type="text" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input type="text" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" value={formData.dateOfBirth} onChange={e => updateField('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                <input type="text" value={formData.county} onChange={e => updateField('county', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={formData.address} onChange={e => updateField('address', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={formData.city} onChange={e => updateField('city', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" value={formData.state} onChange={e => updateField('state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input type="text" value={formData.zipCode} onChange={e => updateField('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Program</h2>
            {programs.length === 0 ? (
              <p className="text-gray-500">No active programs available.</p>
            ) : (
              <div className="space-y-3">
                {programs.map(program => (
                  <label key={program.id} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    formData.programId === program.id ? 'border-orange-500 bg-orange-50' : ''
                  }`}>
                    <input type="radio" name="program" value={program.id} checked={formData.programId === program.id}
                      onChange={e => updateField('programId', e.target.value)} className="w-4 h-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium">{program.name}</p>
                      <p className="text-sm text-gray-500">
                        {program.funding_types?.join(', ') || 'Self Pay'}
                        {program.price_self_pay && ` • $${program.price_self_pay}`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Funding Source</h2>
            <div className="space-y-3">
              {fundingTypes.map(type => (
                <label key={type.value} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  formData.fundingType === type.value ? 'border-orange-500 bg-orange-50' : ''
                }`}>
                  <input type="radio" name="funding" value={type.value} checked={formData.fundingType === type.value}
                    onChange={e => updateField('fundingType', e.target.value)} className="w-4 h-4 text-orange-500" />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Case Manager Information</h2>
            <p className="text-sm text-gray-500 mb-4">Optional: Enter case manager details if applicable</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Manager Name</label>
                <input type="text" value={formData.caseManagerName} onChange={e => updateField('caseManagerName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Manager Email</label>
                <input type="email" value={formData.caseManagerEmail} onChange={e => updateField('caseManagerEmail', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Manager Phone</label>
                <input type="tel" value={formData.caseManagerPhone} onChange={e => updateField('caseManagerPhone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea rows={3} value={formData.notes} onChange={e => updateField('notes', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Review Enrollment</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Student Information</h3>
                <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">{formData.email}</p>
                {formData.phone && <p className="text-sm text-gray-600">{formData.phone}</p>}
                {formData.city && formData.state && (
                  <p className="text-sm text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Program</h3>
                <p className="text-sm text-gray-600">{selectedProgram?.name || 'No program selected'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Funding</h3>
                <p className="text-sm text-gray-600">
                  {fundingTypes.find(f => f.value === formData.fundingType)?.label || 'Not specified'}
                </p>
              </div>
              {formData.caseManagerName && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Case Manager</h3>
                  <p className="text-sm text-gray-600">{formData.caseManagerName}</p>
                  {formData.caseManagerEmail && <p className="text-sm text-gray-600">{formData.caseManagerEmail}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t">
          <button onClick={() => setCurrentStep(s => Math.max(1, s - 1))} disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {currentStep < 5 ? (
            <button onClick={() => setCurrentStep(s => s + 1)}
              disabled={currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
              {isSubmitting ? 'Enrolling...' : 'Complete Enrollment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
