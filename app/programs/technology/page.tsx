import { redirect } from 'next/navigation';

/**
 * Redirect to main programs page with technology filter
 * TODO: Implement category filtering on programs page
 */
export default function TechnologyProgramsPage() {
  redirect('/programs?category=technology');
}
