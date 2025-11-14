import Link from 'next/link';
import { CheckCircle, XCircle, Award, Calendar, Clock, User, BookOpen } from 'lucide-react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Verify Certificate | Elevate for Humanity',
  description: 'Verify the authenticity of an Elevate for Humanity certificate',
};

interface Props {
  params: {
    code: string;
  };
}

export default async function VerifyCertificatePage({ params }: Props) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Fetch certificate by verification code
  const { data: certificate, error } = await supabase
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
    .eq('verification_code', params.code.toUpperCase())
    .single();

  const isValid = certificate && certificate.status === 'issued';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
          Back to Home
        </Link>
      </header>

      <main className="elevate-container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Verification Status */}
          <div className="text-center mb-8">
            {isValid ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isValid ? 'Certificate Verified' : 'Certificate Not Found'}
            </h1>
            <p className="text-gray-600">
              {isValid 
                ? 'This certificate is authentic and was issued by Elevate for Humanity'
                : 'We could not verify this certificate. Please check the verification code and try again.'}
            </p>
          </div>

          {isValid && certificate && (
            <>
              {/* Certificate Details Card */}
              <div className="elevate-card mb-6">
                <div className="elevate-card-header border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="elevate-card-title">Certificate of Completion</h2>
                      <p className="elevate-card-subtitle">Elevate for Humanity Career & Technical Institute</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6">
                  {/* Student Information */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Student Name</div>
                        <div className="font-semibold text-gray-900">{certificate.student_name}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Issue Date</div>
                        <div className="font-semibold text-gray-900">
                          {new Date(certificate.issued_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Program</div>
                        <div className="font-semibold text-gray-900">{certificate.program_name}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Hours Completed</div>
                        <div className="font-semibold text-gray-900">{certificate.hours_completed} hours</div>
                      </div>
                    </div>
                  </div>

                  {/* Course Title */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Course Completed</div>
                    <div className="text-lg font-bold text-gray-900">{certificate.course_title}</div>
                  </div>

                  {/* Certificate Number */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Certificate Number</div>
                    <div className="font-mono text-lg font-bold text-gray-900">{certificate.certificate_number}</div>
                  </div>

                  {/* Verification Code */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Verification Code</div>
                    <div className="font-mono text-sm text-gray-700">{certificate.verification_code}</div>
                  </div>
                </div>
              </div>

              {/* Verification Info */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Verified & Authentic</h3>
                    <p className="text-sm text-green-800">
                      This certificate was issued by Elevate for Humanity Career & Technical Institute 
                      and represents successful completion of the listed training program. The certificate 
                      holder has met all requirements including attendance, coursework, and assessments.
                    </p>
                  </div>
                </div>
              </div>

              {/* About Elevate */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">About Elevate for Humanity</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Elevate for Humanity is a workforce development organization providing career and 
                  technical training in partnership with WorkOne Indiana, the Indiana Department of 
                  Workforce Development, and EmployIndy. Our programs are designed to prepare individuals 
                  for high-demand careers through hands-on training and industry-recognized certifications.
                </p>
                <div className="flex gap-4 text-sm">
                  <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                    Visit Website
                  </Link>
                  <Link href="/programs" className="text-blue-600 hover:text-blue-700 font-medium">
                    View Programs
                  </Link>
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact Us
                  </Link>
                </div>
              </div>
            </>
          )}

          {!isValid && (
            <div className="elevate-card">
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  If you believe this is an error, please contact us with the certificate details.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="elevate-btn-primary">
                    Go to Homepage
                  </Link>
                  <Link href="/contact" className="elevate-btn-secondary">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
