import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Hours',
  alternates: { canonical: 'https://www.elevateforhumanity.org/apprentice/hours' },
};

export default function Page() {
  redirect('/apprenticeships');
}
