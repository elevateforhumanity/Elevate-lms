import { redirect } from 'next/navigation';

export default function BarberEligibilityRedirect() {
  redirect('/check-eligibility');
}
