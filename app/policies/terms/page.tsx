import { redirect } from 'next/navigation';

export default function PoliciesTermsRedirect() {
  redirect('/terms-of-service');
}
