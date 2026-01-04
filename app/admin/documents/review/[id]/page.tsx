import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DocumentReviewForm } from '@/components/admin/DocumentReviewForm';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Review Document | Admin',
  description: 'Review and approve document',
};

export default async function ReviewDocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (
    !profile ||
    (profile.role !== 'admin' && profile.role !== 'super_admin')
  ) {
    redirect('/unauthorized');
  }

  const { data: document } = await supabase
    .from('documents')
    .select(
      `
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role
      )
    `
    )
    .eq('id', params.id)
    .single();

  if (!document) {
    redirect('/admin/documents/review');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Review Document
          </h1>
          <p className="text-lg text-slate-600">
            Review and approve or reject this document
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <DocumentReviewForm document={document} adminId={user.id} />
      </div>
    </div>
  );
}
