export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
