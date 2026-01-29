export const dynamic = 'force-dynamic';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Course Authoring | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

// Redirect to course builder
export default function CourseAuthoringPage() {
  redirect('/admin/course-builder');
}
