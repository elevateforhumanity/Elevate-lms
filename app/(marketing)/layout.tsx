// Marketing layout - uses root layout's header/footer via ConditionalLayout
// This layout is for route grouping only, no additional wrapper needed

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
