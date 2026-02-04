import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { requireDevToolsAccess } from '@/lib/admin/guards';

export const metadata: Metadata = {
  title: 'Admin | Test emails | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/admin/test-emails',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { role } = await requireAdmin();
  requireDevToolsAccess(role);
  return <>{children}</>;
}
