import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Apprenticeship',
  alternates: { canonical: 'https://www.elevateforhumanity.org/employer/apprenticeship' },
};

export default function Page() {
  redirect('/employer');
}
