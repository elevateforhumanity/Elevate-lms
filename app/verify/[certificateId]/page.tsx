import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: Promise<{ certificateId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certificateId } = await params;
  return {
    title: `Verify Certificate ${certificateId} | Elevate For Humanity`,
    description:
      'Verify the authenticity of a certificate issued by Elevate For Humanity',
  };
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { certificateId } = await params;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Find certificate in multiple tables
  let certificate = null;
  let studentName = '';
  let courseName = '';
  let completionDate = '';
  let certificateType = '';

  // Check program_completion_certificates
  const { data: programCert } = await supabase
    .from('program_completion_certificates')
    .select('*, users(full_name, email)')
    .eq('certificate_number', certificateId)
    .single();

  if (programCert) {
    certificate = programCert;
    studentName =
      programCert.users?.full_name || programCert.users?.email || 'Student';
    courseName = programCert.program_name || 'Program';
    completionDate = programCert.issued_at;
    certificateType = 'Program Completion';
  }

  // Check partner_certificates
  if (!certificate) {
    const { data: partnerCert } = await supabase
      .from('partner_certificates')
      .select('*, users(full_name, email), partner_courses(course_name)')
      .eq('certificate_number', certificateId)
      .single();

    if (partnerCert) {
      certificate = partnerCert;
      studentName =
        partnerCert.users?.full_name || partnerCert.users?.email || 'Student';
      courseName = partnerCert.partner_courses?.course_name || 'Course';
      completionDate = partnerCert.issued_at;
      certificateType = 'Partner Certification';
    }
  }

  // Check module_certificates
  if (!certificate) {
    const { data: moduleCert } = await supabase
      .from('module_certificates')
      .select('*, users(full_name, email)')
      .eq('certificate_number', certificateId)
      .single();

    if (moduleCert) {
      certificate = moduleCert;
      studentName =
        moduleCert.users?.full_name || moduleCert.users?.email || 'Student';
      courseName = moduleCert.module_name || 'Module';
      completionDate = moduleCert.issued_at;
      certificateType = 'Module Completion';
    }
  }

  if (!certificate) {
    notFound();
  }

  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const verificationTime = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevateforhumanity.com';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Certificate Verified
            </h1>
            <p className="text-lg text-green-100">
              This certificate is authentic and valid
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Verification Status */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Valid Certificate
              </h2>
              <p className="text-center text-gray-600 mb-6">
                This certificate has been verified and is authentic
              </p>

              {/* Certificate Information */}
              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Certificate Number</p>
                    <p className="font-semibold text-lg text-gray-900">
                      {certificateId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certificate Type</p>
                    <p className="font-semibold text-lg text-gray-900">{certificateType}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Recipient</p>
                    <p className="font-semibold text-lg text-gray-900">{studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course/Program</p>
                    <p className="font-semibold text-lg text-gray-900">{courseName}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Completion Date</p>
                    <p className="font-semibold text-lg text-gray-900">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issued By</p>
                    <p className="font-semibold text-lg text-gray-900">
                      Elevate For Humanity
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Scan to verify on mobile
                </p>
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      `${siteUrl}/verify/${certificateId}`
                    )}`}
                    alt="QR Code for certificate verification"
                    width={192}
                    height={192}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Issuer Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-900 mb-3">About the Issuer</h3>
              <div className="space-y-2 text-blue-800 text-sm">
                <p>
                  <strong>Organization:</strong> Elevate For Humanity
                </p>
                <p>
                  <strong>Type:</strong> Workforce Development & Training Provider
                </p>
                <p>
                  <strong>Accreditation:</strong> DOL/WIOA Approved Training Provider
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={siteUrl}
                    className="underline hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    elevateforhumanity.com
                  </a>
                </p>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600">
                This certificate was verified on{' '}
                <strong>{verificationTime}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Certificate verification is logged for security purposes
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/certificates/verify"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Verify Another Certificate
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
