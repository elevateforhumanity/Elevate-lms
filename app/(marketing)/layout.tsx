// Marketing layout - uses root layout's header/footer via ConditionalLayout
// Applies larger text size for marketing pages

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg leading-relaxed text-text-primary">
      {children}
    </div>
  );
}
