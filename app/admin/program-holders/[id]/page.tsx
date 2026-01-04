import { redirect } from 'next/navigation';


type Params = Promise<{ id: string }>;

export default async function ProgramHolderPage({ params }: { params: Params }) {
  const { id } = await params;

  // Redirect to countersign-mou (default view)
  redirect(`/admin/program-holders/${id}/countersign-mou`);
}
