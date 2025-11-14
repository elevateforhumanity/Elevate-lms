export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function LMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
