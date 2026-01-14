import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Federal Compliance Policy | Elevate for Humanity',
  description: 'Compliance with federal education regulations including FERPA, Title IX, ADA, and WIOA.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/policies/federal-compliance',
  },
};

export default function FederalCompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">Federal Compliance Policy</h1>
            <p className="text-sm text-gray-600">Last Updated: January 12, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Purpose</h2>
            <p className="text-black mb-6">
              Elevate for Humanity is committed to full compliance with all applicable federal laws and regulations 
              governing educational institutions. This policy outlines our compliance framework and responsibilities 
              under key federal statutes.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Key Federal Regulations</h2>
            
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">FERPA - Family Educational Rights and Privacy Act</h3>
              <p className="text-black mb-4">
                Protects student education records and privacy rights.
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Students have right to inspect and review records</li>
                <li>Written consent required for most disclosures</li>
                <li>Annual notification of FERPA rights</li>
                <li>Secure storage and limited access to records</li>
                <li>See our <a href="/policies/ferpa" className="text-blue-600 hover:underline">FERPA Policy</a> for details</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Title IX - Education Amendments of 1972</h3>
              <p className="text-black mb-4">
                Prohibits sex-based discrimination in education programs.
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Equal access to programs regardless of sex</li>
                <li>Protection from sexual harassment and assault</li>
                <li>Designated Title IX Coordinator</li>
                <li>Grievance procedures for complaints</li>
                <li>Training for staff and students</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">ADA - Americans with Disabilities Act</h3>
              <p className="text-black mb-4">
                Ensures accessibility and reasonable accommodations.
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Physical accessibility of facilities</li>
                <li>Digital accessibility (WCAG 2.1 standards)</li>
                <li>Reasonable accommodations for students</li>
                <li>Auxiliary aids and services</li>
                <li>Non-discrimination in admissions and programs</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">WIOA - Workforce Innovation and Opportunity Act</h3>
              <p className="text-black mb-4">
                Governs workforce development programs and funding.
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Eligibility verification and documentation</li>
                <li>Performance reporting and outcomes tracking</li>
                <li>Equal opportunity and non-discrimination</li>
                <li>Participant data collection and privacy</li>
                <li>See our <a href="/policies/wioa" className="text-blue-600 hover:underline">WIOA Policy</a> for details</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Additional Federal Requirements</h2>
            
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Civil Rights Laws</h3>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li><strong>Title VI:</strong> Prohibits race, color, national origin discrimination</li>
                <li><strong>Section 504:</strong> Prohibits disability discrimination</li>
                <li><strong>Age Discrimination Act:</strong> Prohibits age-based discrimination</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Clery Act</h3>
              <p className="text-black mb-4">
                Campus safety and security reporting requirements:
              </p>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Annual security report publication</li>
                <li>Crime statistics disclosure</li>
                <li>Timely warnings for threats</li>
                <li>Emergency notification procedures</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-black mb-4">Drug-Free Schools and Communities Act</h3>
              <ul className="list-disc pl-6 text-black space-y-2">
                <li>Drug and alcohol prevention programs</li>
                <li>Annual notification to students and employees</li>
                <li>Disciplinary sanctions for violations</li>
                <li>Biennial review of program effectiveness</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Compliance Structure</h2>
            
            <h3 className="text-xl font-bold text-black mt-6 mb-3">Compliance Officer</h3>
            <p className="text-black mb-6">
              Our Compliance Officer oversees all federal compliance matters, coordinates training, conducts 
              audits, and serves as primary contact for regulatory agencies.
            </p>

            <h3 className="text-xl font-bold text-black mt-6 mb-3">Designated Coordinators</h3>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li><strong>Title IX Coordinator:</strong> Handles sex discrimination and harassment complaints</li>
              <li><strong>ADA Coordinator:</strong> Manages disability accommodations and accessibility</li>
              <li><strong>FERPA Officer:</strong> Oversees student records and privacy</li>
              <li><strong>WIOA Coordinator:</strong> Ensures workforce program compliance</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Compliance Training</h2>
            
            <h3 className="text-xl font-bold text-black mt-6 mb-3">Required Training</h3>
            <p className="text-black mb-4">
              All employees must complete:
            </p>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li>Annual compliance training covering key regulations</li>
              <li>Title IX and sexual harassment prevention</li>
              <li>FERPA and student privacy</li>
              <li>ADA and disability awareness</li>
              <li>Role-specific compliance training</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Reporting Violations</h2>
            
            <h3 className="text-xl font-bold text-black mt-6 mb-3">How to Report</h3>
            <p className="text-black mb-4">
              Report compliance concerns through:
            </p>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li><strong>Compliance Officer:</strong> compliance@www.elevateforhumanity.org</li>
              <li><strong>Title IX Coordinator:</strong> titleix@www.elevateforhumanity.org</li>
              <li><strong>Anonymous Hotline:</strong> (317) 314-3757 ext. 999</li>
              <li><strong>Online Form:</strong> Available in student/employee portal</li>
            </ul>

            <h3 className="text-xl font-bold text-black mt-6 mb-3">Non-Retaliation</h3>
            <p className="text-black mb-6">
              We prohibit retaliation against anyone who reports compliance concerns in good faith. Retaliation 
              is a separate violation and will result in disciplinary action.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Audits and Monitoring</h2>
            
            <h3 className="text-xl font-bold text-black mt-6 mb-3">Internal Audits</h3>
            <p className="text-black mb-6">
              We conduct regular internal audits of compliance with federal regulations, including review of 
              policies, procedures, records, and practices.
            </p>

            <h3 className="text-xl font-bold text-black mt-6 mb-3">External Reviews</h3>
            <p className="text-black mb-6">
              We cooperate fully with external audits and reviews by federal agencies, accrediting bodies, 
              and funding sources.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Record Keeping</h2>
            <p className="text-black mb-4">
              We maintain records as required by federal regulations:
            </p>
            <ul className="list-disc pl-6 mb-6 text-black space-y-2">
              <li>Student records (per FERPA requirements)</li>
              <li>Compliance training records</li>
              <li>Complaint and investigation files</li>
              <li>Accommodation requests and approvals</li>
              <li>Safety and security reports</li>
              <li>Program performance data</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Contact Information</h2>
            <p className="text-black mb-4">
              For compliance questions or concerns:
            </p>
            <ul className="list-none mb-6 text-black space-y-2">
              <li><strong>Compliance Officer:</strong> compliance@www.elevateforhumanity.org</li>
              <li><strong>Title IX Coordinator:</strong> titleix@www.elevateforhumanity.org</li>
              <li><strong>ADA Coordinator:</strong> ada@www.elevateforhumanity.org</li>
              <li><strong>Phone:</strong> (317) 314-3757</li>
              <li><strong>Office Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM EST</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
              <p className="text-black mb-2">
                <strong>Related Policies:</strong>
              </p>
              <ul className="list-disc pl-6 text-black space-y-1">
                <li><a href="/policies/ferpa" className="text-blue-600 hover:underline">FERPA Policy</a></li>
                <li><a href="/policies/wioa" className="text-blue-600 hover:underline">WIOA Policy</a></li>
                <li><a href="/policies/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
                <li><a href="/policies/student-code" className="text-blue-600 hover:underline">Student Code of Conduct</a></li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
