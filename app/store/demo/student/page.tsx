import Link from 'next/link';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: 'Student',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/demo/student' },
};

export default function StudentDemo() {
  redirect('/lms');
}
