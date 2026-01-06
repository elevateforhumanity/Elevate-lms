import { headers } from 'next/headers';

export async function CanonicalTag() {
  const headersList = await headers();
  const host = headersList.get('host') || 'elevateforhumanity.institute';
  const pathname = headersList.get('x-pathname') || '/';

  const canonicalUrl = `https://${host}${pathname}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
