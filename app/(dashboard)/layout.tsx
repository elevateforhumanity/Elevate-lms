"use client";

// Dashboard layout - applies base text size with proper contrast
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-base leading-relaxed text-text-primary">
      {children}
    </div>
  );
}
