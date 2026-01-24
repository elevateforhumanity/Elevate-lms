import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Clock, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Outcomes & Methodology | Elevate for Humanity',
  description: 'How we measure and report student outcomes, job placement rates, and program effectiveness.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/outcomes',
  },
};

export default function OutcomesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
            <BarChart3 className="w-5 h-5" />
            Transparency & Accountability
          </div>
          <h1 className="text-4xl font-bold mb-4">Outcomes & Methodology</h1>
          <p className="text-xl text-slate-300">
            How we measure, track, and report student outcomes
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Our Commitment to Transparency</h2>
            <p className="text-blue-800">
              Elevate for Humanity is committed to honest, verifiable reporting of student outcomes. 
              This page explains how we collect data, calculate metrics, and what our numbers actually mean. 
              We believe prospective students, funders, and partners deserve clear information to make informed decisions.
            </p>
          </div>
        </section>

        {/* What We Track */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            What We Track
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Enrollment & Completion</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Number of students enrolled per program
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Program completion rates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Time to completion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Credential/certification attainment
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Employment Outcomes</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Employment status at 30, 90, and 180 days post-completion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Employment in field of training
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Starting wage/salary (when reported)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Employer partner placements
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            How We Calculate Outcomes
          </h2>

          <div className="space-y-6">
            <div className="border rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Job Placement Rate
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-mono text-sm text-gray-700">
                  Placement Rate = (Graduates Employed within 90 days) ÷ (Total Graduates - Exclusions) × 100
                </p>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                <strong>Exclusions:</strong> Students who continue to further education, enter military service, 
                become incarcerated, or are otherwise unavailable for employment are excluded from the denominator 
                per WIOA reporting standards.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Verification:</strong> Employment is verified through employer confirmation, pay stubs, 
                or student self-report with follow-up verification when possible.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Time to Employment
              </h3>
              <p className="text-gray-700 text-sm">
                Measured from program completion date to first day of employment in a position related to training. 
                Only includes graduates who achieved employment; does not include those still seeking employment.
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Completion Rate
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-mono text-sm text-gray-700">
                  Completion Rate = (Students Completing Program) ÷ (Students Enrolled - Early Withdrawals within 14 days) × 100
                </p>
              </div>
              <p className="text-gray-700 text-sm">
                Students who withdraw within the first 14 days are excluded to account for those who determine 
                the program is not the right fit before substantive training begins.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            Data Sources
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Internal Tracking System</h4>
                <p className="text-gray-600 text-sm">
                  Our LMS tracks enrollment, attendance, progress, and completion automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Student Self-Report</h4>
                <p className="text-gray-600 text-sm">
                  Post-completion surveys at 30, 90, and 180 days collect employment status and wage data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Employer Partner Verification</h4>
                <p className="text-gray-600 text-sm">
                  For placements through our employer network, we receive direct confirmation of hire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">WIOA Reporting</h4>
                <p className="text-gray-600 text-sm">
                  For WIOA-funded students, outcomes are reported to and verified by workforce development boards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
            Limitations & Caveats
          </h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <h3 className="font-bold text-orange-900">Important Context</h3>
            </div>
            <ul className="space-y-3 text-orange-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Response rates vary.</strong> Not all graduates respond to follow-up surveys. Outcomes data represents those who responded and may not reflect all graduates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Self-reported data.</strong> Some employment information is self-reported and not independently verified.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Program variation.</strong> Outcomes vary significantly by program, cohort, and local labor market conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Historical data.</strong> Published statistics reflect historical performance and do not guarantee future results.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Coordination role.</strong> Elevate for Humanity coordinates training through partner providers. Outcomes reflect the combined efforts of students, instructors, and employer partners.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Reporting Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            Reporting Schedule
          </h2>
          
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
            <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-gray-700">
                Outcomes data is compiled quarterly and published annually. The most recent complete data 
                reflects the prior program year (July 1 – June 30). Current year data is preliminary 
                until the full cohort has reached the 180-day post-completion milestone.
              </p>
              <p className="text-gray-600 text-sm mt-3">
                <strong>Last Updated:</strong> January 2026 (reflecting PY 2024-2025 data)
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">
            Questions About Our Data
          </h2>
          
          <p className="text-gray-700 mb-4">
            If you have questions about our outcomes methodology, need program-specific data for funding applications, 
            or want to verify reported statistics, please contact us:
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:outcomes@elevateforhumanity.org" className="text-blue-600 hover:underline">
                outcomes@elevateforhumanity.org
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> (317) 314-3757
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 8888 Keystone Crossing, Suite 1300, Indianapolis, IN 46240
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-blue-100 mb-6">
            Our programs are designed to help you succeed. Apply today and work with an advisor to find the right path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              View Programs
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
