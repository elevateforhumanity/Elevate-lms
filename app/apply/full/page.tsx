'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, User, GraduationCap, Briefcase, FileText, CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Education', icon: GraduationCap },
  { id: 3, name: 'Experience', icon: Briefcase },
  { id: 4, name: 'Documents', icon: FileText },
  { id: 5, name: 'Review', icon: CheckCircle },
];

export default function FullApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', address: '',
    highSchool: '', graduationYear: '', gpa: '', college: '', major: '',
    employed: '', employer: '', jobTitle: '', yearsExperience: '',
    resume: null as File | null, transcript: null as File | null,
  });

  const updateField = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/apply" className="hover:text-orange-600">Apply</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Full Application</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Application</h1>
        <p className="text-gray-600 mb-8">Complete all steps to submit your application</p>

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

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input type="date" value={formData.dob} onChange={e => updateField('dob', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" value={formData.address} onChange={e => updateField('address', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">High School *</label>
                  <input type="text" value={formData.highSchool} onChange={e => updateField('highSchool', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
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
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Are you currently employed?</label>
                  <select value={formData.employed} onChange={e => updateField('employed', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current/Most Recent Employer</label>
                  <input type="text" value={formData.employer} onChange={e => updateField('employer', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input type="text" value={formData.jobTitle} onChange={e => updateField('jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <select value={formData.yearsExperience} onChange={e => updateField('yearsExperience', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Resume/CV</p>
                  <p className="text-sm text-gray-500 mb-2">PDF, DOC, or DOCX (max 5MB)</p>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => updateField('resume', e.target.files?.[0] || null)}
                    className="text-sm" />
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Transcript (Optional)</p>
                  <p className="text-sm text-gray-500 mb-2">PDF only (max 5MB)</p>
                  <input type="file" accept=".pdf" onChange={e => updateField('transcript', e.target.files?.[0] || null)}
                    className="text-sm" />
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
                  <p className="text-sm text-gray-600">{formData.email} | {formData.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Education</h3>
                  <p className="text-sm text-gray-600">{formData.highSchool} ({formData.graduationYear})</p>
                  {formData.college && <p className="text-sm text-gray-600">{formData.college} - {formData.major}</p>}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
                  <p className="text-sm text-gray-600">{formData.employer || 'Not provided'} - {formData.jobTitle || 'N/A'}</p>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">I certify that all information provided is accurate and complete.</span>
                </label>
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
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Next <ChevronRight className="w-4 h-4" />
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
