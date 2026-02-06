// Force dynamic rendering - WebContainer requires client-side only execution
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dev Studio',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
