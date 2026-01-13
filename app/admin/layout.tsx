import React from 'react';
import { Metadata } from 'next';
// Image asset: /images/success-new/success-8.jpg
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';
import AdminHeader from '@/components/AdminHeader';
import SiteFooter from '@/components/layout/SiteFooter';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Portal - Manage Programs & Operations',
  description:
    'Manage programs, students, certificates, compliance, and workforce development operations. Admin dashboard for Elevate for Humanity.',
  keywords: [
    'admin portal',
    'program management',
    'workforce administration',
    'compliance',
    'operations',
  ],
  manifest: '/manifest-admin.json',
  openGraph: {
    title: 'Admin Portal | Elevate for Humanity',
    description:
      'Manage programs, students, certificates, and workforce development operations.',
    images: ['/images/artlist/cropped/hero-training-1-wide.jpg'],
    type: 'website',
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require admin authentication
  try {
    await requireAdmin();
  } catch (error: any) {
    // Redirect to admin login with return URL
    redirect('/admin/login?redirect=/admin');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <AdminNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Sign Out */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
