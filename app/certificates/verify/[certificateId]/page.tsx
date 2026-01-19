import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ certificateId: string }>;
}

// Redirect to the main verify page at /verify/[certificateId]
export default async function CertificatesVerifyRedirectPage({ params }: Props) {
  const { certificateId } = await params;
  redirect(`/verify/${certificateId}`);
}
