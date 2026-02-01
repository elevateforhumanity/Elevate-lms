import { redirect } from 'next/navigation';

export default function EmployerLoginPage() {
  redirect('/login?role=employer');
}
