import { redirect } from 'next/navigation';

// Canonical licensing URL is /store/licenses/managed
export default function LicensesRedirect() {
  redirect('/store/licenses/managed');
}
