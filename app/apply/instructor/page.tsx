import { redirect } from 'next/navigation';

export default function ApplyInstructorPage() {
  redirect('/apply/staff?role=instructor');
}
