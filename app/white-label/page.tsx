import { redirect } from 'next/navigation';

// White-label is not offered - redirect to licensing
export default function WhiteLabelRedirect() {
  redirect('/licenses');
}
