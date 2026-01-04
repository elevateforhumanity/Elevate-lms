import { redirect } from 'next/navigation';

export default function AICourseBuilderPage() {
  // Redirect to existing API-based course builder
  redirect('/api/ai/course-builder');
}
