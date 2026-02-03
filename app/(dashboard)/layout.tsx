"use client";

// Dashboard layout - applies proper text contrast

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dashboard-content">{children}</div>;
}
