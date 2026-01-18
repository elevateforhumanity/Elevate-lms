import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Report',
  alternates: { canonical: 'https://www.elevateforhumanity.org/compliance/report' },
};

export default function Page() {
  redirect('/transparency');
}
