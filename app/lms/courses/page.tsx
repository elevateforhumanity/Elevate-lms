import { redirect } from 'next/navigation';

/**
 * Redirect /lms/courses to the actual courses page in the (app) route group
 */
export default function LMSCoursesRedirect() {
  redirect('/lms/(app)/courses');
}
