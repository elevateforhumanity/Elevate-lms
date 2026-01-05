import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CertificatePreview } from '@/components/lms/CertificateTemplate';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/certificates',
  },
  title: 'Certificates | Elevate For Humanity',
  description:
    'Explore Certificates and discover opportunities for career growth and development.',
};

export default async function CertificatesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch certificates
  const { data: certificates } = await supabase
    .from('certificates')
    .select(
      `
      *,
      courses (
        id,
        title
      )
    `
    )
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
          <p className="text-slate-600">
            View and download your earned certificates
          </p>
        </div>

        {certificates && certificates.length > 0 ? (
          <div className="space-y-8">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">
                    {cert.courses?.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Issued: {new Date(cert.issued_at).toLocaleDateString()} •
                    Certificate #{cert.certificate_number}
                  </p>
                </div>
                <CertificatePreview
                  studentName={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
                  courseName={cert.courses?.title || 'Course'}
                  completionDate={cert.issued_at}
                  certificateNumber={cert.certificate_number}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-brand-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-lg font-bold mb-2">
              No Certificates Yet
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Complete a course to earn your first certificate. Certificates are
              automatically generated when you finish all course requirements.
            </p>
            <Link
              href="/lms/courses"
              className="inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              View My Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
