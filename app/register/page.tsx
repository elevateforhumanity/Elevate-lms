import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Register | Create Account | Elevate for Humanity',
  description: 'Create your free Elevate for Humanity account to access career training programs, track your progress, and connect with career services.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/signup' },
};

export default function RegisterRedirect() {
  redirect('/signup');
}
