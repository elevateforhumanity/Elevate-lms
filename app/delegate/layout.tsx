export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function DelegateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
