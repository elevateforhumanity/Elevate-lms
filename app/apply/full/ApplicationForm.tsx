'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User, GraduationCap, Briefcase, FileText, CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  funding_types: string[];
  price_self_pay: number | null;
  duration_weeks: number;
}

interface FundingType {
  value: string;
  label: string;
}

interface Props {
  programs: Program[];
  fundingTypes: FundingType[];
  existingProfile: any;
  userId?: string;
}

// Map UI steps to server state machine states
const STEP_TO_STATE: Record<number, string> = {
  1: 'started',
  2: 'eligibility_complete',
  3: 'documents_complete',
  4: 'review_ready',
  5: 'review_ready', // Review step doesn't advance state, just validates
};

const steps = [
  { id: 1, name: 'Personal Info', icon: User, state: 'started' },
  { id: 2, name: 'Education', icon: GraduationCap, state: 'eligibility_complete' },
  { id: 3, name: 'Program', icon: Briefcase, state: 'documents_complete' },
  { id: 4, name: 'Documents', icon: FileText, state: 'review_ready' },
  { id: 5, name: 'Review', icon: CheckCircle, state: 'review_ready' },
];

const STORAGE_KEY = 'elevate_application_draft';
const SAVE_DEBOUNCE_MS = 1000;

interface SavedDraft {
  formData: typeof defaultFormData;
  currentStep: number;
  applicationId: string | null;
  savedAt: string;
}

const defaultFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: 'IN',
  zipCode: '',
  highSchool: '',
  graduationYear: '',
  gpa: '',
  college: '',
  major: '',
  programId: '',
  fundingType: '',
  employed: '',
  employer: '',
  yearsExperience: '',
  agreeTerms: false,
};

export default function ApplicationForm({ programs, fundingTypes, existingProfile, userId }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [serverState, setServerState] = useState<string>('started');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initRef = useRef(false);
  
  const [formData, setFormData] = useState(() => {
    return {
      ...defaultFormData,
      firstName: existingProfile?.first_name || '',
      lastName: existingProfile?.last_name || '',
      email: existingProfile?.email || '',
      phone: existingProfile?.phone || '',
    };
  });

  // Initialize application on mount via RPC
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initApplication = async () => {
      // Check for saved draft first
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const draft: SavedDraft = JSON.parse(saved);
          const savedDate = new Date(draft.savedAt);
          const hoursSinceSave = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceSave < 24 && draft.formData && draft.applicationId) {
            setShowRecoveryBanner(true);
            return; // Wait for user to decide
          }
        }
      } catch {
        // Ignore localStorage errors
      }

      // Start new application via RPC
      await startNewApplication();
    };

    initApplication();
  }, []);

  const startNewApplication = async () => {
    const supabase = createClient();
    
    const { data, error: rpcError } = await supabase.rpc('start_application', {
      p_user_id: userId || null,
      p_first_name: formData.firstName || null,
      p_last_name: formData.lastName || null,
      p_email: formData.email || null,
      p_phone: formData.phone || null,
    });

    if (rpcError) {
      console.error('Failed to start application:', rpcError);
      setError('Failed to initialize application. Please refresh and try again.');
      return;
    }

    if (data?.success) {
      setApplicationId(data.application_id);
      setServerState('started');
      if (data.resumed) {
        // Fetch existing application data
        await loadExistingApplication(data.application_id);
      }
    }
  };

  const loadExistingApplication = async (appId: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .from('career_applications')
      .select('*')
      .eq('id', appId)
      .single();

    if (data) {
      setFormData({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        email: data.email || '',
        phone: data.phone || '',
        dateOfBirth: data.date_of_birth || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || 'IN',
        zipCode: data.zip_code || '',
        highSchool: data.high_school || '',
        graduationYear: data.graduation_year || '',
        gpa: data.gpa || '',
        college: data.college || '',
        major: data.major || '',
        programId: data.program_id || '',
        fundingType: data.funding_type || '',
        employed: data.employment_status || '',
        employer: data.current_employer || '',
        yearsExperience: data.years_experience || '',
        agreeTerms: false,
      });
      setServerState(data.application_state || 'started');
      // Set step based on server state
      const stateToStep: Record<string, number> = {
        'started': 1,
        'eligibility_complete': 2,
        'documents_complete': 3,
        'review_ready': 4,
      };
      setCurrentStep(stateToStep[data.application_state] || 1);
    }
  };

  // Save draft to localStorage with debounce
  const saveDraft = useCallback((data: typeof formData, step: number, appId: string | null) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const draft: SavedDraft = {
          formData: data,
          currentStep: step,
          applicationId: appId,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      } catch {
        // Ignore localStorage errors
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const recoverDraft = useCallback(async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft: SavedDraft = JSON.parse(saved);
        if (draft.formData && draft.applicationId) {
          setApplicationId(draft.applicationId);
          await loadExistingApplication(draft.applicationId);
        }
      }
    } catch {
      // Ignore
    }
    setShowRecoveryBanner(false);
  }, []);

  const dismissRecovery = useCallback(async () => {
    clearDraft();
    setShowRecoveryBanner(false);
    await startNewApplication();
  }, [clearDraft]);

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated, currentStep, applicationId);
      return updated;
    });
  };

  // Save step changes
  useEffect(() => {
    if (applicationId) {
      saveDraft(formData, currentStep, applicationId);
    }
  }, [currentStep, formData, applicationId, saveDraft]);

  const selectedProgram = programs.find(p => p.id === formData.programId);

  // Advance to next step via RPC
  const handleNextStep = async () => {
    if (!applicationId) {
      setError('Application not initialized. Please refresh.');
      return;
    }

    if (!canProceed()) {
      setError('Please complete all required fields before continuing.');
      return;
    }

    setIsTransitioning(true);
    setError(null);

    const supabase = createClient();
    const nextState = STEP_TO_STATE[currentStep + 1];

    // Only advance state if moving to a new state
    if (nextState && nextState !== serverState) {
      const { data, error: rpcError } = await supabase.rpc('advance_application_state', {
        p_application_id: applicationId,
        p_next_state: nextState,
        p_data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          high_school: formData.highSchool,
          graduation_year: formData.graduationYear,
          gpa: formData.gpa,
          college: formData.college,
          major: formData.major,
          program_id: formData.programId || null,
          funding_type: formData.fundingType || null,
          employment_status: formData.employed,
          current_employer: formData.employer,
          years_experience: formData.yearsExperience,
        },
      });

      if (rpcError) {
        setError('Failed to save progress. Please try again.');
        setIsTransitioning(false);
        return;
      }

      if (!data?.success) {
        setError(data?.error || 'Invalid state transition');
        setIsTransitioning(false);
        return;
      }

      setServerState(nextState);
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
    setIsTransitioning(false);
  };

  // Submit application via RPC
  const handleSubmit = async () => {
    if (!applicationId) {
      setError('Application not initialized. Please refresh.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();

    // First ensure we're in review_ready state
    if (serverState !== 'review_ready') {
      const { data: advanceData, error: advanceError } = await supabase.rpc('advance_application_state', {
        p_application_id: applicationId,
        p_next_state: 'review_ready',
        p_data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          high_school: formData.highSchool,
          graduation_year: formData.graduationYear,
          gpa: formData.gpa,
          college: formData.college,
          major: formData.major,
          program_id: formData.programId || null,
          funding_type: formData.fundingType || null,
          employment_status: formData.employed,
          current_employer: formData.employer,
          years_experience: formData.yearsExperience,
        },
      });

      if (advanceError || !advanceData?.success) {
        setError('Please complete all steps before submitting.');
        setIsSubmitting(false);
        return;
      }
    }

    // Now submit
    const { data, error: submitError } = await supabase.rpc('submit_application', {
      p_application_id: applicationId,
      p_agree_terms: true,
    });

    if (submitError) {
      setError('Submission failed. Please try again.');
      setIsSubmitting(false);
      return;
    }

    if (!data?.success) {
      setError(data?.error || 'Submission failed. Please complete all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Clear draft on successful submission
    clearDraft();
    router.push('/apply/success?id=' + applicationId);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return true; // Education is optional
      case 3:
        return formData.programId;
      case 4:
        return true; // Documents optional for now
      case 5:
        return formData.agreeTerms;
      default:
        return true;
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

      {showRecoveryBanner && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <div className="text-blue-800">
            <span className="font-medium">Draft found!</span> You have an unsaved application. Would you like to continue where you left off?
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={recoverDraft}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Restore
            </button>
            <button
              onClick={dismissRecovery}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
            >
              Start Fresh
            </button>
          </div>
        </div>
      )}

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
            <h2 className="text-xl font-semibold mb-4">Education Background</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">High School</label>
                <input type="text" value={formData.highSchool} onChange={e => updateField('highSchool', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input type="text" value={formData.graduationYear} onChange={e => updateField('graduationYear', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                <input type="text" value={formData.gpa} onChange={e => updateField('gpa', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
                <input type="text" value={formData.college} onChange={e => updateField('college', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Major/Field of Study</label>
                <input type="text" value={formData.major} onChange={e => updateField('major', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                <select value={formData.employed} onChange={e => updateField('employed', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select...</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Program</h2>
            {programs.length === 0 ? (
              <p className="text-gray-500">No programs available at this time.</p>
            ) : (
              <div className="space-y-3">
                {programs.map(program => (
                  <label key={program.id} className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    formData.programId === program.id ? 'border-orange-500 bg-orange-50' : ''
                  }`}>
                    <input type="radio" name="program" value={program.id} checked={formData.programId === program.id}
                      onChange={e => updateField('programId', e.target.value)} className="mt-1 w-4 h-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium">{program.name}</p>
                      <p className="text-sm text-gray-500">{program.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {program.duration_weeks} weeks
                        {program.price_self_pay && ` • $${program.price_self_pay} self-pay`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Funding Source</label>
              <select value={formData.fundingType} onChange={e => updateField('fundingType', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                <option value="">Select funding source...</option>
                {fundingTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
            <p className="text-sm text-gray-500 mb-4">Optional: Upload supporting documents</p>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="font-medium">Resume/CV</p>
                <p className="text-sm text-gray-500 mb-2">PDF, DOC, or DOCX (max 5MB)</p>
                <input type="file" accept=".pdf,.doc,.docx" className="text-sm" />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="font-medium">Transcript (Optional)</p>
                <p className="text-sm text-gray-500 mb-2">PDF only (max 5MB)</p>
                <input type="file" accept=".pdf" className="text-sm" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Review Your Application</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">{formData.email}</p>
                {formData.phone && <p className="text-sm text-gray-600">{formData.phone}</p>}
                {formData.city && <p className="text-sm text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Education</h3>
                <p className="text-sm text-gray-600">{formData.highSchool || 'Not provided'} {formData.graduationYear && `(${formData.graduationYear})`}</p>
                {formData.college && <p className="text-sm text-gray-600">{formData.college} - {formData.major}</p>}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Program</h3>
                <p className="text-sm text-gray-600">{selectedProgram?.name || 'Not selected'}</p>
                <p className="text-sm text-gray-600">
                  Funding: {fundingTypes.find(f => f.value === formData.fundingType)?.label || 'Not specified'}
                </p>
              </div>
              <label className="flex items-start gap-2 mt-4">
                <input type="checkbox" checked={formData.agreeTerms} 
                  onChange={e => updateField('agreeTerms', e.target.checked)}
                  className="mt-1 rounded" />
                <span className="text-sm">
                  I certify that all information provided is accurate and complete. I agree to the{' '}
                  <Link href="/terms" className="text-orange-600 hover:underline">Terms of Service</Link> and{' '}
                  <Link href="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t">
          <button 
            onClick={() => setCurrentStep(s => Math.max(1, s - 1))} 
            disabled={currentStep === 1 || isTransitioning}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {currentStep < 5 ? (
            <button 
              onClick={handleNextStep} 
              disabled={!canProceed() || isTransitioning || !applicationId}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isTransitioning ? 'Saving...' : 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !formData.agreeTerms || !applicationId}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
