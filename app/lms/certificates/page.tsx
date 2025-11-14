import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Award, Download, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'My Certificates | Elevate LMS',
  description: 'View and download your certificates',
};

export default async function CertificatesPage() {
  await requireStudent();
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const supabase = await createServerSupabaseClient();

  // Fetch user's certificates
  const { data: certificates } = await supabase
    .from('certificates')
    .select(`
      id,
      certificate_number,
      verification_code,
      issued_date,
      student_name,
      course_title,
      program_name,
      hours_completed,
      status
    `)
    .eq('student_id', user.id)
    .order('issued_date', { ascending: false });

  // Fetch completed enrollments without certificates
  const { data: completedEnrollmentsRaw } = await supabase
    .from('enrollments')
    .select(`
      id,
      completed_at,
      courses!inner (
        id,
        title,
        programs!inner (
          name
        )
      )
    `)
    .eq('student_id', user.id)
    .eq('status', 'completed')
    .not('completed_at', 'is', null);

  // Map enrollments with type guards
  const completedEnrollments = completedEnrollmentsRaw?.map(e => ({
    ...e,
    course: Array.isArray(e.courses) ? e.courses[0] : e.courses
  }));

  // Filter out enrollments that already have certificates
  const certificateCourseIds = certificates?.map(c => c.course_title) || [];
  const pendingCertificates = completedEnrollments?.filter(
    e => {
      const courseTitle = e.course?.title;
      return courseTitle && !certificateCourseIds.includes(courseTitle);
    }
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/lms/dashboard" className="text-gray-700 hover:text-red-600 font-medium">Dashboard</Link>
          <Link href="/lms/courses" className="text-gray-700 hover:text-red-600 font-medium">Courses</Link>
          <Link href="/lms/attendance" className="text-gray-700 hover:text-red-600 font-medium">Attendance</Link>
          <Link href="/lms/certificates" className="text-red-600 font-semibold">Certificates</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Achievements</div>
          <h1 className="elevate-hero-title">My Certificates</h1>
          <p className="elevate-hero-subtitle">
            View, download, and share your earned certificates
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Certificates</div>
                <div className="text-2xl font-bold mt-1">{certificates?.length || 0}</div>
              </div>
              <Award className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Earned certificates</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Pending</div>
                <div className="text-2xl font-bold mt-1">{pendingCertificates.length}</div>
              </div>
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Awaiting certificate generation</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Hours</div>
                <div className="text-2xl font-bold mt-1">
                  {certificates?.reduce((sum, c) => sum + (c.hours_completed || 0), 0) || 0}
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Certified training hours</p>
          </div>
        </div>

        {/* Pending Certificates */}
        {pendingCertificates.length > 0 && (
          <div className="mb-8">
            <h2 className="elevate-page-title mb-4">Pending Certificates</h2>
            <div className="elevate-card">
              <div className="space-y-3">
                {pendingCertificates.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{enrollment.course?.title}</h3>
                        <p className="text-sm text-gray-500">
                          Completed {new Date(enrollment.completed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="elevate-pill elevate-pill--warning text-xs">
                      Processing
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Your certificates are being generated. This typically takes 1-2 business days. 
                  You'll receive an email when they're ready to download.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Earned Certificates */}
        <div>
          <h2 className="elevate-page-title mb-4">Earned Certificates</h2>
          {certificates && certificates.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="elevate-card hover:shadow-lg transition-shadow">
                  {/* Certificate Header */}
                  <div className="relative h-32 bg-gradient-to-br from-red-600 via-orange-500 to-blue-600 rounded-t-lg flex items-center justify-center mb-4">
                    <Award className="h-16 w-16 text-white opacity-90" />
                    <div className="absolute top-3 right-3">
                      <span className="elevate-pill elevate-pill--success text-xs">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{cert.course_title}</h3>
                      <p className="text-sm text-gray-600">{cert.program_name}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Issued {new Date(cert.issued_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Certificate Number</div>
                      <div className="font-mono text-sm font-semibold text-gray-900">
                        {cert.certificate_number}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3">
                      <Link
                        href={`/cert/verify/${cert.verification_code}`}
                        target="_blank"
                        className="elevate-btn-secondary text-xs flex-1 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Verify
                      </Link>
                      <button className="elevate-btn-primary text-xs flex-1 flex items-center justify-center gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="elevate-card">
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No Certificates Yet</h3>
                <p className="text-gray-600 mb-6">
                  Complete your courses to earn certificates that you can share with employers and on LinkedIn.
                </p>
                <Link href="/lms/courses" className="elevate-btn-primary">
                  Browse Courses
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">About Your Certificates</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All certificates are digitally verified and can be shared with employers</li>
            <li>• Each certificate includes a unique verification code for authenticity</li>
            <li>• Certificates are recognized by WorkOne Indiana and partner employers</li>
            <li>• You can download PDF copies and share verification links on LinkedIn</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
