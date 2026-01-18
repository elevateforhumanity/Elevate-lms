import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Forgot Password',
  alternates: { canonical: 'https://www.elevateforhumanity.org/forgot-password' },
};

export default function ForgotPasswordRedirect() {
  redirect('/reset-password');
}
