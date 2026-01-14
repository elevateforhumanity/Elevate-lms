'use client';

import { RAPIDS_CONFIG } from '@/lib/compliance/rapids-config';
import { CheckCircle, XCircle, Copy, Shield, FileText } from 'lucide-react';

export default function RapidsAdminPage() {
  const programs = Object.entries(RAPIDS_CONFIG.programs).map(([key, program]) => ({
    key,
    ...program,
  }));

  const procurementStatement = `Elevate for Humanity is the USDOL Registered Apprenticeship Sponsor of Record for the Barber program in Indiana. Registration documentation is available upon request for procurement, compliance, or partner onboarding purposes. This program is fee-based and not state-funded. Employment and wages, if applicable, are governed by host sites and applicable labor laws and are not administered through Elevate.`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              RAPIDS / USDOL Registration Status
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Internal view. Do not share screenshots publicly. Registration documentation is provided upon request.
          </p>
        </div>

        {/* Sponsor Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sponsor Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Sponsor of Record</p>
              <p className="font-semibold text-gray-900">{RAPIDS_CONFIG.sponsorOfRecord}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Legal Entity</p>
              <p className="font-semibold text-gray-900">{RAPIDS_CONFIG.sponsorLegalEntity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-semibold text-gray-900">{RAPIDS_CONFIG.state} ({RAPIDS_CONFIG.stateCode})</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Licensing Agency</p>
              <p className="font-semibold text-gray-900">{RAPIDS_CONFIG.licensingAgency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration ID</p>
              <p className="font-mono text-gray-900">{RAPIDS_CONFIG.registrationId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State Funded</p>
              <p className="font-semibold text-gray-900">
                {RAPIDS_CONFIG.isStateFunded ? 'Yes' : 'No (Fee-based)'}
              </p>
            </div>
          </div>
        </div>

        {/* Program Registration Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Registered Programs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupation Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funding Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documentation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{program.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{program.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        Yes
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                      {program.occupationCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.totalHours.toLocaleString()} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {program.fundingType === 'self_pay' ? 'Self-Pay' : program.fundingType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600">
                        <FileText className="w-4 h-4" />
                        On file
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Flags */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Flags</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">State Funded: No</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Wages Guaranteed: No</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Employment Guaranteed: No</span>
            </div>
          </div>
        </div>

        {/* Procurement Statement */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-900">Procurement Statement</h2>
            <button
              onClick={() => navigator.clipboard?.writeText(procurementStatement)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <p className="text-blue-900 leading-relaxed">
            {procurementStatement}
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            This page is for internal use only. Registration documentation can be provided to procurement,
            compliance officers, or partner organizations upon request.
          </p>
        </div>
      </div>
    </div>
  );
}
