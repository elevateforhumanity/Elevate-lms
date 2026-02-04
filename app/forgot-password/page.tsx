import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Forgot Password | Elevate for Humanity',
  description: 'Reset your Elevate for Humanity account password. Enter your email to receive password reset instructions.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/reset-password' },
};

export default function ForgotPasswordRedirect() {
  redirect('/reset-password');
}
