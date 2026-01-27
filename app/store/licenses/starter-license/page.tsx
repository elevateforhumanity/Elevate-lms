import { redirect } from 'next/navigation';

// Legacy clone license - redirects to source-use enterprise info
export default function StarterLicenseRedirect() {
  redirect('/store/licenses/source-use');
}
