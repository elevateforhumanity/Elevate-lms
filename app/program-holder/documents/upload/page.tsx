import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DocumentUploadForm } from '@/components/documents/DocumentUploadForm';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Upload Document | Program Holder Portal',
  description: 'Upload a new document',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/program-holder/documents/upload',
  },
};

export default async function UploadDocumentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'program_holder') redirect('/');

  const { data: requirements } = await supabase
    .from('document_requirements')
    .select('*')
    .eq('role', 'program_holder');

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Upload Document
          </h1>
          <p className="text-lg text-slate-600">
            Upload a required document to complete your profile
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <DocumentUploadForm requirements={requirements || []} />
      </div>
    </div>
  );
}
