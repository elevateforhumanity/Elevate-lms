import { redirect } from 'next/navigation';

// Redirect to course builder
export default function CourseAuthoringPage() {
  redirect('/admin/course-builder');
}
