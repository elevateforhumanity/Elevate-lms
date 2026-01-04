import { redirect } from 'next/navigation';

/**
 * Redirect to main programs page with business filter
 * TODO: Implement category filtering on programs page
 */
export default function BusinessProgramsPage() {
  redirect('/programs?category=business');
}
