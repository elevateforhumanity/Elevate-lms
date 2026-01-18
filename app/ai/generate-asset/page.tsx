import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Generate Asset',
  alternates: { canonical: 'https://www.elevateforhumanity.org/ai/generate-asset' },
};

export default function Page() { redirect('/ai-chat'); }
