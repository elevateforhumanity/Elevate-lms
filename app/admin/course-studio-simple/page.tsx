export const dynamic = 'force-dynamic';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Course Studio Simple | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function CourseStudioSimplePage() {
  redirect('/admin/course-builder');
}
