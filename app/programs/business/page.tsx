import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Programs Business',
  description: 'Programs Business - Elevate for Humanity workforce training and career development programs in Indianapolis.',
  path: '/programs/business',
});

import { redirect } from 'next/navigation';

export default function BusinessProgramsPage() {
  redirect('/programs/business-financial');
}
