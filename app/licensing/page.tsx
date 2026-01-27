import { redirect } from 'next/navigation';

// Canonical licensing URL is /store/licenses/managed
export default function LicensingRedirect() {
  redirect('/store/licenses/managed');
}
