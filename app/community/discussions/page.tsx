import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Discussions',
  alternates: { canonical: 'https://www.elevateforhumanity.org/community/discussions' },
};

export default function Page() {
  redirect('/community');
}
