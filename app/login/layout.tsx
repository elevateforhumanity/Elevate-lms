import React from 'react';
import { Metadata } from 'next';
// Image asset: /images/gallery/image10.jpg

export const metadata: Metadata = {
  title: "Login - Access Your Account",
  description: "Login to access your courses, track progress, view assignments, and manage your career training journey.",
  keywords: ["login", "sign in", "student portal", "access account", "LMS"],
  openGraph: {
    title: "Login - Access Your Account | Elevate for Humanity",
    description: "Login to access your courses and track your career training progress.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
