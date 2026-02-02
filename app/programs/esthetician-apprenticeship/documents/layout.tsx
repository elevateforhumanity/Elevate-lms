import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  if (!supabase) {
    redirect('/login?redirect=/programs/esthetician-apprenticeship/documents');
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/programs/esthetician-apprenticeship/documents');
  }

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id, status, orientation_completed_at, documents_submitted_at, programs(slug)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!enrollment) {
    redirect('/programs/esthetician-apprenticeship');
  }

  if (!enrollment.orientation_completed_at) {
    redirect('/programs/esthetician-apprenticeship/orientation');
  }

  if (enrollment.documents_submitted_at) {
    redirect('/apprentice');
  }

  return <>{children}</>;
}
