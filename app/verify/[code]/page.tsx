import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, Award, Calendar, User, BookOpen, Building } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Verify Certificate ${code} | Elevate for Humanity`,
    description: 'Verify the authenticity of an Elevate for Humanity training certificate.',
  };
}

async function getCertificate(code: string) {
  const supabase = await createClient();
  
  const { data: certificate } = await supabase
    .from('certificates')
    .select(`
      *,
      profiles:user_id (full_name, email),
      programs:program_id (name, slug)
    `)
    .eq('verification_code', code)
    .single();

  return certificate;
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { code } = await params;
  const certificate = await getCertificate(code);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Certificate Not Found</h1>
          <p className="text-slate-600 mb-6">
            The verification code <code className="bg-slate-100 px-2 py-1 rounded">{code}</code> does not match any certificate in our system.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
            <h3 className="font-semibold text-amber-800 mb-2">Possible reasons:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• The code was entered incorrectly</li>
              <li>• The certificate has been revoked</li>
              <li>• This is not a valid Elevate certificate</li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact us for assistance →
          </Link>
        </div>
      </div>
    );
  }

  const isValid = certificate.status === 'active' || certificate.status === 'issued';
  const issueDate = new Date(certificate.issued_at || certificate.created_at);
  const expiryDate = certificate.expires_at ? new Date(certificate.expires_at) : null;
  const isExpired = expiryDate && expiryDate < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Verification Status */}
        <div className={`rounded-2xl shadow-xl overflow-hidden ${isValid && !isExpired ? 'bg-white' : 'bg-white'}`}>
          {/* Header */}
          <div className={`p-8 text-center ${isValid && !isExpired ? 'bg-green-600' : 'bg-red-600'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isValid && !isExpired ? 'bg-green-500' : 'bg-red-500'}`}>
              {isValid && !isExpired ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isValid && !isExpired ? 'Certificate Verified' : isExpired ? 'Certificate Expired' : 'Certificate Invalid'}
            </h1>
            <p className="text-white/90">
              {isValid && !isExpired 
                ? 'This is an authentic Elevate for Humanity certificate'
                : isExpired 
                  ? 'This certificate has passed its expiration date'
                  : 'This certificate is no longer valid'
              }
            </p>
          </div>

          {/* Certificate Details */}
          <div className="p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Certificate Details
            </h2>

            <div className="space-y-4">
              {/* Recipient */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Awarded To</p>
                  <p className="font-semibold text-slate-900">
                    {certificate.recipient_name || certificate.profiles?.full_name || 'Student'}
                  </p>
                </div>
              </div>

              {/* Program */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <BookOpen className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Program Completed</p>
                  <p className="font-semibold text-slate-900">
                    {certificate.program_name || certificate.programs?.name || certificate.title || 'Training Program'}
                  </p>
                </div>
              </div>

              {/* Issue Date */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Issue Date</p>
                  <p className="font-semibold text-slate-900">
                    {issueDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Expiry Date (if applicable) */}
              {expiryDate && (
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Expiration Date</p>
                    <p className={`font-semibold ${isExpired ? 'text-red-600' : 'text-slate-900'}`}>
                      {expiryDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      {isExpired && ' (Expired)'}
                    </p>
                  </div>
                </div>
              )}

              {/* Issuing Organization */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <Building className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Issued By</p>
                  <p className="font-semibold text-slate-900">Elevate for Humanity</p>
                  <p className="text-sm text-slate-600">Indianapolis, Indiana</p>
                </div>
              </div>

              {/* Verification Code */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-600">Verification Code</p>
                  <p className="font-mono font-semibold text-blue-900">{code}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500 text-center">
                This verification was performed on {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/programs"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Explore Our Programs
          </Link>
          <Link
            href="/contact"
            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
