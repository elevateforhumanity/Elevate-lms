import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Course Studio Ai | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function CourseStudioAIPage() {
  redirect('/admin/course-generator');
}
