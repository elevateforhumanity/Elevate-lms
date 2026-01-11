import { ComplianceBar } from '@/components/ComplianceBar';

export const revalidate = 3600; // 1 hour ISR cache

export default function MetricsPage() {
  return (
    <div className="bg-white">
      <ComplianceBar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Impact Metrics
        </h1>
        <p className="text-lg text-black mb-12">
          Real outcomes from our workforce development platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">1,200+</div>
            <div className="text-lg text-black">Enrolled Learners</div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">80%</div>
            <div className="text-lg text-black">Job Placement Rate</div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-lg text-black">Employer Partners</div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">14+</div>
            <div className="text-lg text-black">Training Programs</div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Workforce Funding
          </h2>
          <div className="space-y-4 text-black">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>WIOA Eligible:</strong> All programs qualify for
                Workforce Innovation and Opportunity Act funding
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>WRG Approved:</strong> Workforce Ready Grant eligible in
                Indiana
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <div>
                <strong>SNAP E&T:</strong> Supplemental Nutrition Assistance
                Program Employment & Training approved
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Platform Usage
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-black">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div>Partner LMS Integrations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div>AI Systems Deployed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div>Mobile App Completion</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div>AI Tutor Availability</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Compliance & Reporting
          </h2>
          <div className="space-y-3 text-black">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>RAPIDS apprenticeship tracking integrated</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>ETPL compliance reporting automated</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Workforce board dashboards available</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Real-time outcome tracking</span>
            </div>
          </div>
        </div>

        <p className="text-sm mt-8 text-black text-center">
          Metrics updated quarterly. Full documentation available upon request
          for workforce agencies and funding partners.
        </p>
      </div>
    </div>
  );
}
