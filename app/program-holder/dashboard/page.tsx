import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getProgramHolderState } from '@/lib/orchestration/state-machine';
import { getProgramHolderOnboardingStatus } from '@/lib/program-holder/onboarding-status';
import {
  StateAwareDashboard,
  SectionCard,
} from '@/components/dashboards/StateAwareDashboard';
import {
  Users,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Book,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Holder Dashboard | Elevate For Humanity',
  description: 'Manage students, submit reports, track compliance',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/program-holder/dashboard',
  },
};

/**
 * PROGRAM HOLDER PORTAL - OBLIGATION ENGINE
 *
 * This is not a control panel. This is an operator.
 *
 * Rules:
 * - Obligations are unavoidable
 * - At-risk states are surfaced immediately
 * - Compliance is enforced, not suggested
 * - Platform protects you from doing something wrong
 */

export default async function ProgramHolderDashboardOrchestrated() {
  const supabase = await createClient();

  // Require authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/program-holder/dashboard');

  // Get program holder profile and verify role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'program_holder') {
    redirect('/unauthorized');
  }

  // CRITICAL: Check onboarding status and enforce gating
  const onboardingStatus = await getProgramHolderOnboardingStatus(user.id);

  if (!onboardingStatus.onboardingComplete) {
    // Redirect to next required step
    redirect(onboardingStatus.nextStepRoute || '/program-holder/onboarding');
  }

  // Get students
  const { data: students } = await supabase
    .from('enrollments')
    .select('*, profiles(*)')
    .eq('program_holder_id', user.id);

  const activeStudents = students?.filter((s) => s.status === 'active') || [];
  const atRiskStudents = students?.filter((s) => s.at_risk === true) || [];

  // Get pending verifications
  const { data: verifications } = await supabase
    .from('student_verifications')
    .select('*')
    .eq('program_holder_id', user.id)
    .eq('status', 'pending');

  // Get overdue reports
  const { data: reports } = await supabase
    .from('compliance_reports')
    .select('*')
    .eq('program_holder_id', user.id)
    .eq('status', 'overdue');

  // Calculate compliance score
  const { data: complianceData } = await supabase
    .from('compliance_scores')
    .select('score')
    .eq('program_holder_id', user.id)
    .single();

  const complianceScore = complianceData?.score || 100;

  // Calculate state
  const stateData = getProgramHolderState({
    isVerified: profile.verified || false,
    activeStudents: activeStudents.length,
    atRiskStudents: atRiskStudents.length,
    pendingVerifications: verifications?.length || 0,
    overdueReports: reports?.length || 0,
    complianceScore,
  });

  return (
    <StateAwareDashboard
      dominantAction={stateData.dominantAction}
      availableSections={stateData.availableSections}
      lockedSections={stateData.lockedSections}
      alerts={stateData.alerts}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics Dashboard */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-bold text-black">
                  {stateData.metrics.activeStudents}
                </span>
              </div>
              <div className="text-sm text-black">Active Students</div>
            </div>

            <div
              className={`rounded-lg shadow-sm border p-6 ${
                stateData.metrics.atRiskStudents > 0
                  ? 'bg-yellow-50 border-yellow-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle
                  className={`h-8 w-8 ${
                    stateData.metrics.atRiskStudents > 0
                      ? 'text-yellow-600'
                      : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-3xl font-bold ${
                    stateData.metrics.atRiskStudents > 0
                      ? 'text-yellow-900'
                      : 'text-black'
                  }`}
                >
                  {stateData.metrics.atRiskStudents}
                </span>
              </div>
              <div
                className={`text-sm ${
                  stateData.metrics.atRiskStudents > 0
                    ? 'text-yellow-900'
                    : 'text-black'
                }`}
              >
                At-Risk Students
              </div>
            </div>

            <div
              className={`rounded-lg shadow-sm border p-6 ${
                stateData.metrics.pendingVerifications > 5
                  ? 'bg-orange-50 border-orange-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <FileText
                  className={`h-8 w-8 ${
                    stateData.metrics.pendingVerifications > 5
                      ? 'text-orange-600'
                      : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-3xl font-bold ${
                    stateData.metrics.pendingVerifications > 5
                      ? 'text-orange-900'
                      : 'text-black'
                  }`}
                >
                  {stateData.metrics.pendingVerifications}
                </span>
              </div>
              <div
                className={`text-sm ${
                  stateData.metrics.pendingVerifications > 5
                    ? 'text-orange-900'
                    : 'text-black'
                }`}
              >
                Pending Verifications
              </div>
            </div>

            <div
              className={`rounded-lg shadow-sm border p-6 ${
                stateData.metrics.overdueReports > 0
                  ? 'bg-red-50 border-red-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle
                  className={`h-8 w-8 ${
                    stateData.metrics.overdueReports > 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                />
                <span
                  className={`text-3xl font-bold ${
                    stateData.metrics.overdueReports > 0
                      ? 'text-red-900'
                      : 'text-black'
                  }`}
                >
                  {stateData.metrics.overdueReports}
                </span>
              </div>
              <div
                className={`text-sm ${
                  stateData.metrics.overdueReports > 0
                    ? 'text-red-900'
                    : 'text-black'
                }`}
              >
                Overdue Reports
              </div>
            </div>
          </div>

          {/* Available Sections */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-6">
              Available Actions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stateData.availableSections.includes('verification') && (
                <SectionCard
                  title="Complete Verification"
                  description="Required before accepting students"
                  href="/program-holder/verification"
                  icon={<Shield className="h-6 w-6" />}
                  badge="Required"
                />
              )}

              {stateData.availableSections.includes('students') && (
                <SectionCard
                  title="Manage Students"
                  description={`${stateData.metrics.activeStudents} active student${stateData.metrics.activeStudents !== 1 ? 's' : ''}`}
                  href="/program-holder/students"
                  icon={<Users className="h-6 w-6" />}
                  badge={
                    stateData.metrics.atRiskStudents > 0
                      ? `${stateData.metrics.atRiskStudents} At Risk`
                      : undefined
                  }
                />
              )}

              {stateData.availableSections.includes('reports') && (
                <SectionCard
                  title="Submit Reports"
                  description="Compliance reporting and documentation"
                  href="/program-holder/reports"
                  icon={<FileText className="h-6 w-6" />}
                  badge={
                    stateData.metrics.overdueReports > 0
                      ? `${stateData.metrics.overdueReports} Overdue`
                      : undefined
                  }
                />
              )}

              {stateData.availableSections.includes('compliance') && (
                <SectionCard
                  title="Compliance Dashboard"
                  description={`Score: ${complianceScore}%`}
                  href="/program-holder/compliance"
                  icon={<Shield className="h-6 w-6" />}
                  badge={
                    complianceScore < 70
                      ? 'Action Required'
                      : complianceScore < 85
                        ? 'Review'
                        : 'Good'
                  }
                />
              )}

              {stateData.availableSections.includes('documentation') && (
                <SectionCard
                  title="Documentation"
                  description="Forms, templates, and resources"
                  href="/program-holder/documentation"
                  icon={<Book className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('training') && (
                <SectionCard
                  title="Training Resources"
                  description="Learn how to use the platform"
                  href="/program-holder/training"
                  icon={<Book className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('support') && (
                <SectionCard
                  title="Get Support"
                  description="Contact your compliance advisor"
                  href="/program-holder/support"
                  icon={<Users className="h-6 w-6" />}
                />
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {activeStudents.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-black mb-4">
                Recent Student Activity
              </h3>
              <div className="space-y-3">
                {activeStudents.slice(0, 5).map((student: any) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-black">
                        {student.profiles?.full_name || 'Student'}
                      </div>
                      <div className="text-sm text-black">
                        Status:{' '}
                        <span className="capitalize">{student.status}</span>
                      </div>
                    </div>
                    {student.at_risk && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                        At Risk
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Compliance Score */}
          <div
            className={`rounded-lg shadow-sm border-2 p-6 ${
              complianceScore >= 85
                ? 'bg-green-50 border-green-600'
                : complianceScore >= 70
                  ? 'bg-yellow-50 border-yellow-600'
                  : 'bg-red-50 border-red-600'
            }`}
          >
            <h3 className="text-lg font-bold mb-3">Compliance Score</h3>
            <div
              className={`text-5xl font-bold mb-2 ${
                complianceScore >= 85
                  ? 'text-green-600'
                  : complianceScore >= 70
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {complianceScore}%
            </div>
            <div
              className={`text-sm ${
                complianceScore >= 85
                  ? 'text-green-900'
                  : complianceScore >= 70
                    ? 'text-yellow-900'
                    : 'text-red-900'
              }`}
            >
              {complianceScore >= 85
                ? 'Excellent standing'
                : complianceScore >= 70
                  ? 'Review recommended'
                  : 'Immediate action required'}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-black mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a
                href="/program-holder/students/pending"
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Review Pending Students
              </a>
              <a
                href="/program-holder/reports/new"
                className="block w-full text-center px-4 py-3 bg-slate-200 text-black rounded-lg font-semibold hover:bg-slate-300 transition"
              >
                Submit New Report
              </a>
            </div>
          </div>

          {/* Legal Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-black mb-4">
              Legal Documents
            </h3>
            <div className="space-y-2">
              <a
                href="/legal/marketplace-terms"
                className="block px-4 py-2 text-sm text-black hover:bg-slate-50 rounded-lg transition"
              >
                📄 Marketplace Terms
              </a>
              <a
                href="/legal/creator-agreement"
                className="block px-4 py-2 text-sm text-black hover:bg-slate-50 rounded-lg transition"
              >
                📄 Creator Agreement
              </a>
              <a
                href="/legal/nda"
                className="block px-4 py-2 text-sm text-black hover:bg-slate-50 rounded-lg transition"
              >
                📄 Non-Disclosure Agreement
              </a>
              <a
                href="/legal/non-compete"
                className="block px-4 py-2 text-sm text-black hover:bg-slate-50 rounded-lg transition"
              >
                📄 Non-Compete Agreement
              </a>
              <a
                href="/legal/mou"
                className="block px-4 py-2 text-sm text-black hover:bg-slate-50 rounded-lg transition"
              >
                📄 Memorandum of Understanding
              </a>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-600 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Need Help?</h3>
            <p className="text-blue-800 mb-4 text-sm">
              Your compliance advisor is here to support you.
            </p>
            <a
              href="tel:+13173143757"
              className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </StateAwareDashboard>
  );
}
