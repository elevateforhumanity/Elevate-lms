import { redirect } from 'next/navigation';

// Legacy clone license - redirects to source-use enterprise info
export default function EnterpriseLicenseRedirect() {
  redirect('/store/licenses/source-use');
}
