import { redirect } from 'next/navigation';

// Redirect /licenses to canonical /store/licenses
// Primary redirect handled by Netlify edge, this catches local dev
export default function LicensesRedirect() {
  redirect('/store/licenses');
}
