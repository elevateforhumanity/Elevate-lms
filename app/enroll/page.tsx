import { redirect } from 'next/navigation';

// Redirect /enroll to /apply - the main intake form
// Direct program enrollment still works via /enroll/[programId]
export default function EnrollPage() {
  redirect('/apply');
}
