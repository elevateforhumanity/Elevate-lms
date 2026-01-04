import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getMyPartnerContext } from '@/lib/partner/access';
import PartnerShell from '@/components/partner/PartnerShell';

export default async function PartnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const ctx = await getMyPartnerContext();
  if (!ctx?.user) redirect('/partners/login');

  return <PartnerShell ctx={ctx}>{children}</PartnerShell>;
}
