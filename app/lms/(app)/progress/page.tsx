// @ts-nocheck
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Clock, 
  BookOpen, 
  Briefcase, 
  Award, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Calendar,
  FileText,
} from 'lucide-react';
import { MiladyAccessCard } from '@/components/apprenticeship/MiladyAccessCard';

export const metadata: Metadata = {
  title: 'My Progress | Student Portal',
  description: 'Track your apprenticeship hours, coursework progress, and certification status.',
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get student enrollment
  const { data: enrollment } = await supabase
    .from('student_enrollments')
    .select('*')
    .eq('student_id', user.id)
    .single();

  // Get program info
  const { data: program } = enrollment?.program_id ? await supabase
    .from('programs')
    .select('*')
    .eq('id', enrollment.program_id)
    .single() : { data: null };

  // Get time entries for detailed breakdown
  const { data: timeEntries } = await supabase
    .from('time_entries')
    .select('*')
    .eq('student_id', user.id)
    .order('log_date', { ascending: false });

  // Calculate stats
  const totalRTI = timeEntries?.filter(e => e.hour_type === 'RTI').reduce((sum, e) => sum + (e.minutes || 0), 0) || 0;
  const totalOJT = timeEntries?.filter(e => e.hour_type === 'OJT').reduce((sum, e) => sum + (e.minutes || 0), 0) || 0;
  const approvedHours = timeEntries?.filter(e => e.status === 'APPROVED').reduce((sum, e) => sum + (e.minutes || 0), 0) || 0;
  const pendingHours = timeEntries?.filter(e => e.status === 'SUBMITTED' || e.status === 'DRAFT').reduce((sum, e) => sum + (e.minutes || 0), 0) || 0;

  const totalMinutes = totalRTI + totalOJT;
  const totalHours = totalMinutes / 60;
  const requiredHours = enrollment?.required_hours || 1500;
  const transferHours = enrollment?.transfer_hours || 0;
  const effectiveTotal = totalHours + transferHours;
  const progressPercentage = Math.min((effectiveTotal / requiredHours) * 100, 100);
  const hoursRemaining = Math.max(requiredHours - effectiveTotal, 0);

  // Get weekly breakdown
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  
  const weeklyEntries = timeEntries?.filter(e => new Date(e.log_date) >= weekStart) || [];
  const weeklyMinutes = weeklyEntries.reduce((sum, e) => sum + (e.minutes || 0), 0);
  const weeklyHours = weeklyMinutes / 60;

  // Determine program slug for Milady card
  const programSlug = program?.slug || enrollment?.program_slug || 'barber-apprenticeship';
  const isBeautyProgram = ['barber-apprenticeship', 'cosmetology-apprenticeship', 'esthetician-apprenticeship', 'nail-technician-apprenticeship'].includes(programSlug);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">My Progress</h1>
            <p className="text-slate-600">Track your apprenticeship hours and certification progress</p>
          </div>
          <Link
            href="/apprentice/hours"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Clock className="w-5 h-5" />
            Log Hours
          </Link>
        </div>

        {/* Milady Access Card - For beauty programs */}
        {isBeautyProgram && (
          <MiladyAccessCard
            studentId={user.id}
            programSlug={programSlug}
            miladyEnrolled={enrollment?.milady_enrolled}
            miladyCompleted={enrollment?.milady_completed}
          />
        )}

        {/* Main Progress Overview */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Apprenticeship Progress</h2>
                <p className="text-purple-100">{program?.name || 'Beauty Apprenticeship'}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black">{progressPercentage.toFixed(1)}%</div>
                <div className="text-purple-100">Complete</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Total Hours</span>
                <span className="text-lg font-bold text-purple-600">
                  {effectiveTotal.toFixed(1)} / {requiredHours} hrs
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${Math.max(progressPercentage, 5)}%` }}
                >
                  {progressPercentage > 10 && (
                    <span className="text-xs font-bold text-white">{progressPercentage.toFixed(0)}%</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
                <span>{hoursRemaining.toFixed(1)} hours remaining</span>
                <span>Indiana IPLA Requirement: {requiredHours} hours</span>
              </div>
            </div>

            {/* Hour Breakdown Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {/* RTI Hours */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">RTI (Theory)</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">{(totalRTI / 60).toFixed(1)}</div>
                <div className="text-xs text-blue-600">hours via Milady</div>
              </div>

              {/* OJT Hours */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">OJT (Hands-on)</span>
                </div>
                <div className="text-3xl font-bold text-green-600">{(totalOJT / 60).toFixed(1)}</div>
                <div className="text-xs text-green-600">hours at shop</div>
              </div>

              {/* Transfer Hours */}
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800">Transfer</span>
                </div>
                <div className="text-3xl font-bold text-amber-600">{transferHours.toFixed(1)}</div>
                <div className="text-xs text-amber-600">credited hours</div>
              </div>

              {/* This Week */}
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">This Week</span>
                </div>
                <div className="text-3xl font-bold text-purple-600">{weeklyHours.toFixed(1)}</div>
                <div className="text-xs text-purple-600">hours logged</div>
              </div>
            </div>

            {/* Status Row */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Approval Status */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Hour Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Approved</span>
                    </div>
                    <span className="font-semibold">{(approvedHours / 60).toFixed(1)}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">Pending</span>
                    </div>
                    <span className="font-semibold">{(pendingHours / 60).toFixed(1)}h</span>
                  </div>
                </div>
              </div>

              {/* RAPIDS Status */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">DOL RAPIDS</h4>
                <div className="flex items-center gap-2">
                  {enrollment?.rapids_status === 'registered' || enrollment?.rapids_status === 'active' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-semibold">Registered</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span className="text-amber-600 font-semibold">
                        {enrollment?.rapids_status?.toUpperCase() || 'Pending'}
                      </span>
                    </>
                  )}
                </div>
                {enrollment?.rapids_id && (
                  <div className="text-xs text-slate-500 mt-1">ID: {enrollment.rapids_id}</div>
                )}
              </div>

              {/* Milady Status */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Milady Theory</h4>
                <div className="flex items-center gap-2">
                  {enrollment?.milady_completed ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-semibold">Complete</span>
                    </>
                  ) : enrollment?.milady_enrolled ? (
                    <>
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 font-semibold">In Progress</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span className="text-amber-600 font-semibold">Not Started</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-black">Recent Hour Entries</h3>
            <Link
              href="/apprentice/hours"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {timeEntries && timeEntries.length > 0 ? (
              timeEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      entry.hour_type === 'RTI' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {entry.hour_type === 'RTI' ? (
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-black">
                        {entry.hour_type === 'RTI' ? 'Theory (RTI)' : 'Hands-on (OJT)'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {new Date(entry.log_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                        {entry.activity_note && ` • ${entry.activity_note}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-black">
                      {(entry.minutes / 60).toFixed(1)}h
                    </div>
                    <div className={`text-xs font-semibold ${
                      entry.status === 'APPROVED' ? 'text-green-600' :
                      entry.status === 'REJECTED' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>
                      {entry.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No hours logged yet</p>
                <Link
                  href="/apprentice/hours"
                  className="text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block"
                >
                  Log your first hours →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/apprentice/hours"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Clock className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-black mb-1">Log Hours</h3>
            <p className="text-sm text-slate-600">Record your RTI and OJT training hours</p>
          </Link>

          <Link
            href="/apprentice/transfer-hours"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <FileText className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-black mb-1">Transfer Hours</h3>
            <p className="text-sm text-slate-600">Request credit for prior training</p>
          </Link>

          <Link
            href="/lms/certificates"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <Award className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-black mb-1">Certificates</h3>
            <p className="text-sm text-slate-600">View your earned credentials</p>
          </Link>
        </div>

        {/* State Board Readiness */}
        {progressPercentage >= 100 && enrollment?.milady_completed && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready for State Board Exam!</h2>
            <p className="text-green-100 mb-6">
              You have completed all required hours and theory training. Schedule your Indiana IPLA exam.
            </p>
            <a
              href="https://www.in.gov/pla/professions/barber-board/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              Schedule IPLA Exam <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
