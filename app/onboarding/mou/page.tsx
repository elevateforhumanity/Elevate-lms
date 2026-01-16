import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, CheckCircle, Download, Pen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Memorandum of Understanding | Elevate For Humanity',
  description: 'Review and sign the MOU agreement.',
};

export const dynamic = 'force-dynamic';

export default async function MOUPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/mou');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: mou } = await supabase
    .from('documents')
    .select('*')
    .eq('type', 'mou')
    .eq('is_active', true)
    .single();

  const { data: signature } = await supabase
    .from('mou_signatures')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Memorandum of Understanding</h1>
          <p className="text-blue-100">Review and sign the partnership agreement.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {signature ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="font-semibold text-green-800">MOU Signed</h2>
                <p className="text-sm text-green-700">
                  Signed on {new Date(signature.signed_at).toLocaleDateString()} by {signature.signer_name}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="font-semibold text-lg">Partnership MOU</h2>
                <p className="text-sm text-gray-500">Elevate For Humanity Partnership Agreement</p>
              </div>
            </div>
            {mou?.file_url && (
              <a href={mou.file_url} className="flex items-center gap-2 text-blue-600 hover:underline">
                <Download className="w-4 h-4" /> Download PDF
              </a>
            )}
          </div>

          <div className="prose prose-sm max-w-none border-t pt-6">
            <h3>Agreement Terms</h3>
            <p>This Memorandum of Understanding establishes the partnership between the signing party and Elevate For Humanity for workforce development collaboration.</p>
            
            <h4>Partner Responsibilities:</h4>
            <ul>
              <li>Provide job opportunities for program graduates</li>
              <li>Participate in career fairs and networking events</li>
              <li>Offer feedback on curriculum and training needs</li>
              <li>Maintain communication with placement coordinators</li>
            </ul>

            <h4>Elevate For Humanity Responsibilities:</h4>
            <ul>
              <li>Provide pre-screened, trained candidates</li>
              <li>Coordinate interviews and placements</li>
              <li>Offer ongoing support for placed graduates</li>
              <li>Maintain confidentiality of partner information</li>
            </ul>

            <h4>Term:</h4>
            <p>This agreement is effective for one year from the date of signing and may be renewed by mutual consent.</p>
          </div>
        </div>

        {!signature && (
          <form action="/api/onboarding/sign-mou" method="POST">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Pen className="w-5 h-5" /> Sign Agreement
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="signerName"
                    required
                    defaultValue={profile?.full_name || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title/Position</label>
                  <input
                    type="text"
                    name="signerTitle"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="agree" required className="mt-1" />
                  <span className="text-sm text-gray-600">
                    I have read and agree to the terms of this Memorandum of Understanding. I am authorized to sign on behalf of my organization.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Sign MOU
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/onboarding/partner" className="text-blue-600 hover:underline">
            Back to Onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}
