import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { requireDevToolsAccess } from '@/lib/admin/guards';

export const metadata: Metadata = {
  title: 'Dev Studio | Elevate for Humanity',
  description: 'Browser-based development environment with AI assistance.',
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
