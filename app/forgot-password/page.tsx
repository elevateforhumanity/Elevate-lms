import { redirect } from 'next/navigation';

export default function ForgotPasswordRedirect() {
  redirect('/reset-password');
}
