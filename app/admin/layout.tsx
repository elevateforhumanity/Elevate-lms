import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';

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
    images: ['/images/efh/hero/hero-main-clean.jpg'],
    type: 'website',
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check - bypassed in demo/development mode via lib/auth.ts
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/admin/login?redirect=/admin');
  }

  return <>{children}</>;
}
