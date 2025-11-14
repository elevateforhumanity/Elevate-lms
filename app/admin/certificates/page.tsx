import Link from 'next/link';
import { Award, Plus, ExternalLink, Search } from 'lucide-react';
import { requireAdmin } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Certificates | Admin',
  description: 'Manage student certificates',
};

export default async function AdminCertificatesPage() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  // Fetch all certificates
  const { data: certificatesRaw } = await supabase
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
      status,
      profiles!certificates_student_id_fkey!inner (
        email
      )
    `)
    .order('issued_date', { ascending: false });

  // Map certificates with type guards
  const certificates = certificatesRaw?.map(cert => ({
    ...cert,
    profile: Array.isArray(cert.profiles) ? cert.profiles[0] : cert.profiles
  }));

  // Get stats
  const totalCertificates = certificates?.length || 0;
  const issuedThisMonth = certificates?.filter(c => {
    const issueDate = new Date(c.issued_date);
    const now = new Date();
    return issueDate.getMonth() === now.getMonth() && issueDate.getFullYear() === now.getFullYear();
  }).length || 0;
  const totalHours = certificates?.reduce((sum, c) => sum + (c.hours_completed || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/admin/dashboard" className="text-gray-700 hover:text-red-600 font-medium">Dashboard</Link>
          <Link href="/admin/students" className="text-gray-700 hover:text-red-600 font-medium">Students</Link>
          <Link href="/admin/certificates" className="text-red-600 font-semibold">Certificates</Link>
          <Link href="/admin/reports" className="text-gray-700 hover:text-red-600 font-medium">Reports</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Admin Portal</div>
          <h1 className="elevate-hero-title">Certificate Management</h1>
          <p className="elevate-hero-subtitle">
            Issue, verify, and manage student certificates
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Certificates</div>
                <div className="text-2xl font-bold mt-1">{totalCertificates}</div>
              </div>
              <Award className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">All-time issued</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">This Month</div>
                <div className="text-2xl font-bold mt-1">{issuedThisMonth}</div>
              </div>
              <Award className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Certificates issued</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Hours</div>
                <div className="text-2xl font-bold mt-1">{Math.round(totalHours)}</div>
              </div>
              <Award className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Certified training hours</p>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="elevate-card">
          <div className="elevate-card-header">
            <h2 className="elevate-card-title">All Certificates</h2>
            <div className="flex gap-2">
              <button className="elevate-btn-secondary text-xs flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </button>
              <Link href="/admin/certificates/issue" className="elevate-btn-primary text-xs flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Issue Certificate
              </Link>
            </div>
          </div>

          <div className="elevate-table-container">
            <table className="elevate-table">
              <thead>
                <tr>
                  <th>Certificate #</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Program</th>
                  <th>Hours</th>
                  <th>Issued Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates && certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <tr key={cert.id}>
                      <td className="font-mono text-sm">{cert.certificate_number}</td>
                      <td>
                        <div>
                          <div className="font-medium text-gray-900">{cert.student_name}</div>
                          <div className="text-xs text-gray-500">{cert.profile?.email}</div>
                        </div>
                      </td>
                      <td className="font-medium">{cert.course_title}</td>
                      <td>{cert.program_name}</td>
                      <td className="font-semibold">{cert.hours_completed}h</td>
                      <td>
                        {new Date(cert.issued_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <span className={`elevate-pill text-xs ${
                          cert.status === 'issued' ? 'elevate-pill--success' :
                          cert.status === 'revoked' ? 'elevate-pill--danger' :
                          'elevate-pill--default'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/cert/verify/${cert.verification_code}`}
                          target="_blank"
                          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                        >
                          View
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-8">
                      No certificates issued yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/admin/certificates/issue" className="elevate-card hover:border-red-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Issue Certificate</h3>
              <p className="elevate-card-subtitle mt-1">
                Generate a new certificate for a completed course
              </p>
            </div>
          </Link>

          <Link href="/admin/certificates/bulk" className="elevate-card hover:border-orange-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Bulk Issue</h3>
              <p className="elevate-card-subtitle mt-1">
                Upload CSV to issue multiple certificates at once
              </p>
            </div>
          </Link>

          <Link href="/cert/verify" className="elevate-card hover:border-blue-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Verify Certificate</h3>
              <p className="elevate-card-subtitle mt-1">
                Check the authenticity of a certificate
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
