import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ai Course Builder | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

export default function AICourseBuilderPage() {
  // Redirect to existing API-based course builder
  redirect('/api/ai/course-builder');
}
