import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  FileText,
  Shield,
  Users,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Handbook | Elevate for Humanity',
  description:
    'Complete guide to policies, procedures, and student rights at Elevate for Humanity',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/student-handbook',
  },
};

export default function StudentHandbook() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 text-2xl md:text-3xl lg:text-4xl">
            Student Handbook
          </h1>
          <p className="text-lg text-slate-600">Academic Year 2025-2026</p>
          <div className="mt-4">
            <a
              href="/downloads/student-handbook-2025.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition"
              download
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Table of Contents
          </h2>
          <nav role="navigation" aria-label="Main navigation" className="space-y-2">
            <a
              href="#welcome"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              1. Welcome Message
            </a>
            <a
              href="#mission"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              2. Mission & Values
            </a>
            <a
              href="#academic"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              3. Academic Policies
            </a>
            <a
              href="#conduct"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              4. Code of Conduct
            </a>
            <a
              href="#rights"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              5. Student Rights (FERPA)
            </a>
            <a
              href="#services"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              6. Student Services
            </a>
            <a
              href="#financial"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              7. Financial Information
            </a>
            <a
              href="#refund"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              8. Refund Policy
            </a>
            <a
              href="#withdrawal"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              9. Withdrawal Policy
            </a>
            <a
              href="#safety"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              10. Campus Safety
            </a>
            <a
              href="#grievance"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              11. Complaint & Grievance Procedures
            </a>
            <a
              href="#graduation"
              className="block text-brand-blue-600 hover:text-brand-blue-700"
            >
              12. Graduation Requirements
            </a>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Welcome */}
          <section id="welcome" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Welcome to Elevate for Humanity
            </h2>
            <p className="text-slate-700 mb-4">
              Welcome! We are thrilled to have you join our community of
              learners. This handbook contains important information about your
              rights, responsibilities, and the resources available to support
              your success.
            </p>
            <p className="text-slate-700">
              Our mission is to provide accessible, high-quality workforce
              training that empowers you to achieve economic self-sufficiency
              and contribute to your community. We are committed to your
              success.
            </p>
          </section>

          {/* Mission */}
          <section id="mission" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Mission & Values
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Our Mission
                </h3>
                <p className="text-slate-700">
                  To provide accessible, high-quality workforce training and
                  career development programs that empower individuals to
                  achieve economic self-sufficiency and contribute to their
                  communities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Our Values
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>
                    <strong>Access:</strong> Remove barriers to education
                  </li>
                  <li>
                    <strong>Quality:</strong> Industry-recognized training
                  </li>
                  <li>
                    <strong>Support:</strong> Wraparound services for success
                  </li>
                  <li>
                    <strong>Integrity:</strong> Ethical and transparent
                    operations
                  </li>
                  <li>
                    <strong>Community:</strong> Building stronger communities
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Academic Policies */}
          <section id="academic" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Academic Policies
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Attendance Policy
                </h3>
                <p className="text-slate-700 mb-2">
                  Regular attendance is essential for success. Students must
                  maintain:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Minimum 80% attendance for all courses</li>
                  <li>
                    Notify instructor of absences in advance when possible
                  </li>
                  <li>Make up missed work within one week</li>
                  <li>Excessive absences may result in dismissal</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Grading Policy
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Grade
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Percentage
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2">A</td>
                        <td className="px-4 py-2">90-100%</td>
                        <td className="px-4 py-2">Excellent</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">B</td>
                        <td className="px-4 py-2">80-89%</td>
                        <td className="px-4 py-2">Good</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">C</td>
                        <td className="px-4 py-2">70-79%</td>
                        <td className="px-4 py-2">Satisfactory</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">D</td>
                        <td className="px-4 py-2">60-69%</td>
                        <td className="px-4 py-2">Below Standard</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">F</td>
                        <td className="px-4 py-2">Below 60%</td>
                        <td className="px-4 py-2">Failing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-700 mt-2">
                  Minimum passing grade: C (70%)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Academic Integrity
                </h3>
                <p className="text-slate-700 mb-2">
                  Academic honesty is expected. Violations include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Plagiarism or cheating</li>
                  <li>Unauthorized collaboration</li>
                  <li>Falsifying records</li>
                  <li>Using unauthorized materials during assessments</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Consequences:</strong> First offense - warning; Second
                  offense - course failure; Third offense - dismissal from
                  program.
                </p>
                <div className="mt-4">
                  <Link
                    href="/academic-integrity"
                    className="inline-flex items-center gap-2 text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
                  >
                    <span>View Complete Academic Integrity Policy</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Satisfactory Academic Progress (SAP)
                </h3>
                <p className="text-slate-700 mb-2">Students must maintain:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Minimum 2.0 GPA (C average)</li>
                  <li>Complete 67% of attempted coursework</li>
                  <li>
                    Progress toward completion within 150% of program length
                  </li>
                </ul>
                <p className="text-slate-700 mt-2">
                  SAP is reviewed at the end of each term. Students not meeting
                  SAP may be placed on academic probation or dismissed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Makeup Work Policy
                </h3>
                <p className="text-slate-700 mb-2">
                  Students who miss class due to excused absences may make up
                  missed work:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Request makeup work within 24 hours of return</li>
                  <li>Complete makeup work within one week of absence</li>
                  <li>Makeup exams must be scheduled with instructor</li>
                  <li>Late work may receive reduced credit (10% per day)</li>
                  <li>
                    Excused absences: illness, family emergency, court
                    appearance, military duty
                  </li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Unexcused absences:</strong> Makeup work may not be
                  accepted. Contact your instructor immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Attendance Tracking
                </h3>
                <p className="text-slate-700 mb-2">
                  Attendance is tracked daily for all students:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Sign in/out required for each class session</li>
                  <li>Tardiness (15+ minutes late) counts as 0.5 absence</li>
                  <li>
                    Early departure (15+ minutes early) counts as 0.5 absence
                  </li>
                  <li>3 tardies = 1 absence</li>
                  <li>
                    Attendance warnings issued at 10%, 15%, and 20% absence rate
                  </li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Excessive Absences:</strong> Students exceeding 20%
                  absence rate may be dismissed from the program.
                </p>
              </div>
            </div>
          </section>

          {/* Code of Conduct */}
          <section id="conduct" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Code of Conduct
            </h2>
            <p className="text-slate-700 mb-4">
              All students are expected to conduct themselves professionally and
              respectfully.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Expected Behavior
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Treat all individuals with respect and dignity</li>
                  <li>Arrive on time and prepared for class</li>
                  <li>Follow safety protocols and procedures</li>
                  <li>Use technology appropriately</li>
                  <li>Maintain professional appearance</li>
                  <li>Respect property and facilities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Prohibited Conduct
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Harassment, discrimination, or bullying</li>
                  <li>Violence or threats of violence</li>
                  <li>Possession of weapons or illegal substances</li>
                  <li>Theft or vandalism</li>
                  <li>Disruption of educational activities</li>
                  <li>Academic dishonesty</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Disciplinary Actions
                </h3>
                <p className="text-slate-700">
                  Violations may result in: verbal warning, written warning,
                  probation, suspension, or dismissal. Serious violations may
                  result in immediate dismissal and law enforcement
                  notification.
                </p>
              </div>
            </div>
          </section>

          {/* Student Rights - FERPA */}
          <section id="rights" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Student Rights (FERPA)
            </h2>
            <p className="text-slate-700 mb-4">
              The Family Educational Rights and Privacy Act (FERPA) protects
              your education records.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Your Rights Under FERPA
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>
                    <strong>Inspect and Review:</strong> You have the right to
                    inspect and review your education records within 45 days of
                    request.
                  </li>
                  <li>
                    <strong>Request Amendment:</strong> You may request
                    correction of records you believe are inaccurate or
                    misleading.
                  </li>
                  <li>
                    <strong>Consent to Disclosure:</strong> Your written consent
                    is required before we disclose your records (with certain
                    exceptions).
                  </li>
                  <li>
                    <strong>File Complaint:</strong> You may file a complaint
                    with the U.S. Department of Education if you believe your
                    rights have been violated.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  How to Access Your Records
                </h3>
                <p className="text-slate-700">
                  Submit a written request to the Registrar's Office. Records
                  will be available within 45 days. Contact:{' '}
                  <a
                    href="mailto:registrar@elevateforhumanity.institute"
                    className="text-brand-blue-600 hover:text-brand-blue-700"
                  >
                    registrar@elevateforhumanity.institute
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Directory Information
                </h3>
                <p className="text-slate-700 mb-2">
                  We may disclose "directory information" without consent unless
                  you opt out. Directory information includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Name, address, phone number, email</li>
                  <li>Program of study, enrollment status</li>
                  <li>Dates of attendance, degrees/certificates earned</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  To opt out, submit a written request to the Registrar's
                  Office.
                </p>
              </div>
            </div>
          </section>

          {/* Financial Information */}
          <section id="financial" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Financial Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Tuition and Fees
                </h3>
                <p className="text-slate-700 mb-2">
                  Tuition varies by program. All costs are disclosed in the
                  enrollment agreement before enrollment.
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Tuition includes all required materials and supplies</li>
                  <li>Registration fee: Non-refundable</li>
                  <li>Payment plans available</li>
                  <li>Financial aid accepted (WIOA, WRG, JRI)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Payment Options
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Full payment at enrollment (5% discount)</li>
                  <li>Monthly payment plans (no interest)</li>
                  <li>WIOA funding (100% covered)</li>
                  <li>Workforce Ready Grant</li>
                  <li>Justice Reinvestment Initiative</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section id="refund" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Refund Policy
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Cancellation Before Start Date
                </h3>
                <p className="text-slate-700">
                  Students who cancel enrollment before the program start date
                  receive a full refund of all tuition and fees paid, minus the
                  non-refundable registration fee ($100).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Withdrawal After Start Date
                </h3>
                <p className="text-slate-700 mb-2">
                  Refunds are calculated based on the percentage of program
                  completed:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Time in Program
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Tuition Charged
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900">
                          Refund
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2">0-10%</td>
                        <td className="px-4 py-2">10%</td>
                        <td className="px-4 py-2">90%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">11-25%</td>
                        <td className="px-4 py-2">25%</td>
                        <td className="px-4 py-2">75%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">26-50%</td>
                        <td className="px-4 py-2">50%</td>
                        <td className="px-4 py-2">50%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">51-75%</td>
                        <td className="px-4 py-2">75%</td>
                        <td className="px-4 py-2">25%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Over 75%</td>
                        <td className="px-4 py-2">100%</td>
                        <td className="px-4 py-2">0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Refund Processing
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Refunds processed within 30 days of withdrawal</li>
                  <li>Refunds issued to original payment method</li>
                  <li>Financial aid refunds returned to funding source</li>
                  <li>Registration fee is non-refundable</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Dismissal for Non-Payment
                </h3>
                <p className="text-slate-700">
                  Students dismissed for non-payment are not eligible for
                  refunds. Outstanding balances must be paid before transcripts
                  or certificates are released.
                </p>
              </div>
            </div>
          </section>

          {/* Withdrawal Policy */}
          <section
            id="withdrawal"
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Withdrawal Policy
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Voluntary Withdrawal
                </h3>
                <p className="text-slate-700 mb-2">
                  Students may withdraw from a program at any time by:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4">
                  <li>
                    Completing a withdrawal form (available at Student Services
                    or online)
                  </li>
                  <li>Meeting with an academic advisor to discuss options</li>
                  <li>
                    Returning all school property (books, equipment, ID card)
                  </li>
                  <li>Settling any outstanding financial obligations</li>
                </ol>
                <p className="text-slate-700 mt-2">
                  <strong>Effective Date:</strong> Withdrawal is effective on
                  the date the form is submitted or the last date of attendance,
                  whichever is later.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Administrative Withdrawal
                </h3>
                <p className="text-slate-700 mb-2">
                  The school may administratively withdraw students for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Excessive absences (over 20% of program hours)</li>
                  <li>Failure to maintain Satisfactory Academic Progress</li>
                  <li>Non-payment of tuition and fees</li>
                  <li>Violation of code of conduct</li>
                  <li>Failure to return from leave of absence</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  Students will receive written notice before administrative
                  withdrawal and have the right to appeal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Leave of Absence
                </h3>
                <p className="text-slate-700 mb-2">
                  Students may request a leave of absence for medical, family,
                  or military reasons:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Maximum 180 days per 12-month period</li>
                  <li>Written request required with documentation</li>
                  <li>Must be in good academic standing</li>
                  <li>Return date must be specified</li>
                  <li>Failure to return results in withdrawal</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Re-Entry After Withdrawal
                </h3>
                <p className="text-slate-700">
                  Students who withdraw may apply for re-entry within 12 months.
                  Re-entry is subject to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Space availability in the program</li>
                  <li>Resolution of previous academic or financial issues</li>
                  <li>Meeting with academic advisor</li>
                  <li>Updated enrollment agreement</li>
                  <li>Payment of any outstanding balances</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Campus Safety */}
          <section id="safety" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Campus Safety
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Emergency Procedures
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>
                    <strong>Fire:</strong> Evacuate immediately using nearest
                    exit. Assemble at designated area.
                  </li>
                  <li>
                    <strong>Medical Emergency:</strong> Call 911. Notify staff
                    immediately.
                  </li>
                  <li>
                    <strong>Severe Weather:</strong> Move to interior rooms away
                    from windows.
                  </li>
                  <li>
                    <strong>Active Threat:</strong> Run, Hide, Fight. Call 911
                    when safe.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Safety Protocols
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>Wear required safety equipment in labs/workshops</li>
                  <li>Report safety hazards immediately</li>
                  <li>Follow equipment operating procedures</li>
                  <li>Keep emergency exits clear</li>
                  <li>
                    Know location of fire extinguishers and first aid kits
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Security
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>ID badges must be worn at all times</li>
                  <li>Report suspicious activity to staff</li>
                  <li>Do not prop open security doors</li>
                  <li>Secure personal belongings</li>
                  <li>Visitors must check in at front desk</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Grievance Procedures */}
          <section id="grievance" className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Complaint & Grievance Procedures
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Informal Resolution
                </h3>
                <p className="text-slate-700">
                  Students are encouraged to first attempt informal resolution
                  by discussing concerns directly with the instructor or staff
                  member involved. Most issues can be resolved at this level.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Formal Complaint Process
                </h3>
                <p className="text-slate-700 mb-2">
                  If informal resolution is unsuccessful:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4">
                  <li>
                    <strong>Submit Written Complaint:</strong> Complete
                    grievance form (available at Student Services or online)
                    within 30 days of incident. Include date, description, and
                    desired resolution.
                  </li>
                  <li>
                    <strong>Investigation:</strong> Complaint will be
                    investigated within 5 business days. Both parties may be
                    interviewed.
                  </li>
                  <li>
                    <strong>Resolution Meeting:</strong> Meeting scheduled with
                    student, involved parties, and administrator to discuss
                    findings and resolution.
                  </li>
                  <li>
                    <strong>Written Decision:</strong> Decision issued in
                    writing within 10 business days of complaint submission.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Appeal Process
                </h3>
                <p className="text-slate-700">
                  Students may appeal the decision to the Executive Director
                  within 10 business days. The Executive Director's decision is
                  final.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  External Complaints
                </h3>
                <p className="text-slate-700 mb-2">
                  Students may also file complaints with external agencies:
                </p>
                <div className="space-y-2 text-slate-700 ml-4">
                  <div>
                    <p className="font-semibold">
                      Indiana Commission for Higher Education
                    </p>
                    <p>8888 Keystone Xing, Suite 1300, Indianapolis, IN 46240</p>
                    <p>Phone: (317) 314-3757</p>
                    <p>Website: www.in.gov/che</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold">
                      Council on Occupational Education
                    </p>
                    <p>
                      7840 Roswell Road, Building 300, Suite 325, Atlanta, GA
                      30350
                    </p>
                    <p>Phone: (770) 396-3898</p>
                    <p>Website: www.council.org</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Non-Retaliation
                </h3>
                <p className="text-slate-700">
                  The school prohibits retaliation against students who file
                  complaints in good faith. Any retaliation should be reported
                  immediately to the Executive Director.
                </p>
              </div>
            </div>
          </section>

          {/* Graduation Requirements */}
          <section
            id="graduation"
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Graduation Requirements
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Requirements for Graduation
                </h3>
                <p className="text-slate-700 mb-2">
                  To graduate, students must:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-4">
                  <li>
                    Complete all required coursework with minimum C grade (70%)
                  </li>
                  <li>Achieve minimum 2.0 cumulative GPA</li>
                  <li>Complete all required clock hours</li>
                  <li>Pass all required assessments and certifications</li>
                  <li>Maintain satisfactory attendance (80%+)</li>
                  <li>Fulfill all financial obligations</li>
                  <li>Return all school property</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Graduation Ceremony
                </h3>
                <p className="text-slate-700">
                  Graduation ceremonies are held quarterly. Graduates receive a
                  certificate of completion and are recognized for their
                  achievements. Family and friends are welcome to attend.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Transcripts
                </h3>
                <p className="text-slate-700">
                  Official transcripts are available upon request. The first
                  transcript is free; additional copies are $10 each.
                  Transcripts are not released if financial obligations are
                  outstanding.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Need Help?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  General Information
                </h3>
                <p className="text-slate-700">Phone: 317-314-3757</p>
                <p className="text-slate-700">
                  Email: info@elevateforhumanity.institute
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Student Services
                </h3>
                <p className="text-slate-700">Phone: 317-314-3757</p>
                <p className="text-slate-700">
                  Email: support@elevateforhumanity.institute
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
