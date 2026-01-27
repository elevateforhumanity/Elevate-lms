import { redirect } from 'next/navigation';

export default function LegalTermsRedirect() {
  redirect('/terms-of-service');
}
