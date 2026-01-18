import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructor',
  alternates: { canonical: 'https://www.elevateforhumanity.org/ai/instructor' },
};

export default function Page() { redirect('/ai-chat'); }
