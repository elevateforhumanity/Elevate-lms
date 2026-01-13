import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructor | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function InstructorPage() {
  redirect('/instructor/dashboard');
}
