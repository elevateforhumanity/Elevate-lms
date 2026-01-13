import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Programs | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';


type Params = Promise<{ code: string }>;

export default async function ProgramPage({ params }: { params: Params }) {
  const { code } = await params;

  // Redirect to dashboard (default view)
  redirect(`/admin/programs/${code}/dashboard`);
}
