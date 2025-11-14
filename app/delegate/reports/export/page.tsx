'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Download, FileText, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';

const REPORT_TYPES = [
  {
    id: 'attendance',
    name: 'Attendance & Contact Hours',
    description: 'Detailed attendance logs and weekly contact hours for all students',
    format: ['CSV', 'PDF'],
    icon: '📊',
  },
  {
    id: 'progress',
    name: 'Student Progress Report',
    description: 'Course progress, completion rates, and grades for each student',
    format: ['CSV', 'PDF'],
    icon: '📈',
  },
  {
    id: 'compliance',
    name: 'WRG/WIOA Compliance Report',
    description: 'Funding eligibility, enrollment status, and compliance metrics',
    format: ['PDF'],
    icon: '✅',
  },
  {
    id: 'summary',
    name: 'Caseload Summary',
    description: 'Overview of all students with key metrics and at-risk indicators',
    format: ['CSV', 'PDF'],
    icon: '📋',
  },
];

export default function ExportReportsPage() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get students assigned to this delegate
      const { data: students } = await supabase
        .from('students')
        .select(`
          id,
          wioa_eligible,
          funding_type,
          county,
          profiles (
            full_name,
            email,
            phone
          ),
          enrollments (
            id,
            status,
            progress,
            enrolled_at,
            completed_at,
            courses (
              title,
              duration_weeks
            )
          )
        `)
        .or(`case_manager_email.eq.${user.email},case_manager_name.ilike.%${user.user_metadata?.full_name || ''}%`);

      if (!students || students.length === 0) {
        throw new Error('No students found in your caseload');
      }

      const studentIds = students.map(s => s.id);

      // Fetch data based on report type
      let reportData: any = {};

      if (selectedReport === 'attendance') {
        const { data: attendance } = await supabase
          .from('attendance_log')
          .select('*')
          .in('student_id', studentIds)
          .gte('login_time', dateRange.startDate)
          .lte('login_time', dateRange.endDate)
          .order('login_time', { ascending: false });

        const { data: weeklyHours } = await supabase
          .from('contact_hours')
          .select('*')
          .in('student_id', studentIds)
          .gte('week_start', dateRange.startDate)
          .lte('week_start', dateRange.endDate);

        reportData = { students, attendance, weeklyHours };
      } else if (selectedReport === 'progress') {
        const { data: progress } = await supabase
          .from('lesson_progress')
          .select(`
            *,
            lessons (
              title,
              modules (
                title,
                courses (
                  title
                )
              )
            )
          `)
          .in('student_id', studentIds);

        const { data: grades } = await supabase
          .from('grades')
          .select('*')
          .in('student_id', studentIds);

        reportData = { students, progress, grades };
      } else if (selectedReport === 'compliance') {
        const { data: attendance } = await supabase
          .from('contact_hours')
          .select('*')
          .in('student_id', studentIds)
          .gte('week_start', dateRange.startDate);

        reportData = { students, attendance };
      } else if (selectedReport === 'summary') {
        const { data: lastLogins } = await supabase
          .from('attendance_log')
          .select('student_id, login_time')
          .in('student_id', studentIds)
          .order('login_time', { ascending: false });

        const { data: recentHours } = await supabase
          .from('contact_hours')
          .select('*')
          .in('student_id', studentIds)
          .gte('week_start', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

        reportData = { students, lastLogins, recentHours };
      }

      // Generate report based on format
      if (selectedFormat === 'CSV') {
        generateCSV(reportData, selectedReport);
      } else if (selectedFormat === 'PDF') {
        // TODO: Implement PDF generation
        alert('PDF generation coming soon! For now, please use CSV format.');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const generateCSV = (data: any, reportType: string) => {
    let csv = '';
    let filename = '';

    if (reportType === 'attendance') {
      filename = `attendance_report_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
      csv = 'Student Name,Email,Course,Login Time,Logout Time,Duration (minutes),Activity Type\n';
      
      data.attendance?.forEach((log: any) => {
        const student = data.students.find((s: any) => s.id === log.student_id);
        const enrollment = student?.enrollments?.[0];
        csv += `"${student?.profiles?.full_name || 'Unknown'}","${student?.profiles?.email || ''}","${enrollment?.courses?.title || 'N/A'}","${log.login_time}","${log.logout_time || 'In Progress'}","${log.duration_minutes || 0}","${log.activity_type || 'learning'}"\n`;
      });
    } else if (reportType === 'progress') {
      filename = `progress_report_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
      csv = 'Student Name,Email,Course,Progress %,Status,Enrolled Date,Completion Date\n';
      
      data.students?.forEach((student: any) => {
        student.enrollments?.forEach((enrollment: any) => {
          csv += `"${student.profiles?.full_name || 'Unknown'}","${student.profiles?.email || ''}","${enrollment.courses?.title || 'N/A'}","${enrollment.progress || 0}","${enrollment.status}","${enrollment.enrolled_at}","${enrollment.completed_at || 'N/A'}"\n`;
        });
      });
    } else if (reportType === 'summary') {
      filename = `caseload_summary_${new Date().toISOString().split('T')[0]}.csv`;
      csv = 'Student Name,Email,Phone,County,Funding Type,Course,Progress %,Status,Last Login,Recent Hours (30 days)\n';
      
      data.students?.forEach((student: any) => {
        const lastLogin = data.lastLogins?.find((l: any) => l.student_id === student.id);
        const recentHours = data.recentHours?.filter((h: any) => h.student_id === student.id)
          .reduce((sum: number, h: any) => sum + h.total_hours, 0) || 0;
        const enrollment = student.enrollments?.[0];
        
        csv += `"${student.profiles?.full_name || 'Unknown'}","${student.profiles?.email || ''}","${student.profiles?.phone || ''}","${student.county || ''}","${student.funding_type || ''}","${enrollment?.courses?.title || 'N/A'}","${enrollment?.progress || 0}","${enrollment?.status || 'not_enrolled'}","${lastLogin?.login_time || 'Never'}","${recentHours}"\n`;
      });
    }

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const selectedReportType = REPORT_TYPES.find(r => r.id === selectedReport);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/delegate/dashboard" className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Reports</h1>
            <p className="text-gray-600">
              Generate compliance reports for DWD, WorkOne, EmployIndy, or internal tracking
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">Report downloaded successfully!</p>
            </div>
          )}

          <form onSubmit={handleExport} className="space-y-6">
            {/* Report Type Selection */}
            <div className="elevate-card">
              <div className="elevate-card-header">
                <h2 className="elevate-card-title">Select Report Type</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {REPORT_TYPES.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => {
                      setSelectedReport(report.id);
                      setSelectedFormat('');
                    }}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      selectedReport === report.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{report.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                      {selectedReport === report.id && (
                        <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            {selectedReport && (
              <div className="elevate-card">
                <div className="elevate-card-header">
                  <h2 className="elevate-card-title">Select Format</h2>
                </div>
                <div className="flex gap-3">
                  {selectedReportType?.format.map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setSelectedFormat(format)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        selectedFormat === format
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span className="font-bold">{format}</span>
                        {selectedFormat === format && (
                          <CheckCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Date Range */}
            {selectedFormat && (
              <div className="elevate-card">
                <div className="elevate-card-header">
                  <h2 className="elevate-card-title">Date Range</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                      className="elevate-input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                      className="elevate-input w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            {selectedFormat && (
              <div className="flex justify-end gap-3">
                <Link href="/delegate/dashboard" className="elevate-btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="elevate-btn-primary flex items-center gap-2"
                  disabled={loading}
                >
                  <Download className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Generate & Download Report'}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
