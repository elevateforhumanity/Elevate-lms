import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'License Information',
  description: 'Professional licensing information and requirements for career training programs.',
  path: '/license',
});

import { redirect } from 'next/navigation';

/**
 * Quick access redirect to licensing page
 * Makes /license easier to share than /pricing/sponsor-licensing
 */
export default function LicensePage() {
  redirect('/pricing/sponsor-licensing');
}
