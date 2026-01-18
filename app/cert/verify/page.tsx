import { redirect } from 'next/navigation';

export default function CertVerifyRedirect({
  searchParams,
}: {
  searchParams: { id?: string; code?: string };
}) {
  const params = new URLSearchParams();
  if (searchParams.id) params.set('id', searchParams.id);
  if (searchParams.code) params.set('code', searchParams.code);
  
  const query = params.toString();
  redirect(query ? `/verify?${query}` : '/verify');
}
