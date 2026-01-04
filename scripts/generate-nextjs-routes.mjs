#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Route mappings from React Router to Next.js
const routes = [
  { path: '/about', page: 'About' },
  { path: '/programs', page: 'Programs' },
  { path: '/programs/barber', page: 'programs/BarberPage' },
  { path: '/programs/building-tech', page: 'programs/BuildingTechPage' },
  { path: '/programs/cna', page: 'programs/HealthcarePage' },
  { path: '/programs/hvac', page: 'programs/HVACPage' },
  { path: '/programs/digital-skills', page: 'programs/DigitalSkillsPage' },
  { path: '/programs/leadership', page: 'programs/LeadershipPage' },
  { path: '/programs/cpr', page: 'programs/CPRSPage' },
  { path: '/programs/drug-testing', page: 'programs/DrugTestingPage' },
  { path: '/contact', page: 'Contact' },
  { path: '/apply', page: 'ApplyPage' },
  { path: '/apply/success', page: 'ApplySuccessPage' },
  { path: '/login', page: 'auth/Login' },
  { path: '/signup', page: 'auth/Signup' },
  { path: '/forgot-password', page: 'auth/ForgotPassword' },
  { path: '/reset-password', page: 'ResetPassword' },
  { path: '/student-portal', page: 'StudentPortal' },
  { path: '/lms', page: 'LMS' },
  { path: '/lms/dashboard', page: 'lms/Dashboard' },
  { path: '/lms/courses', page: 'lms/CoursesIndex' },
  { path: '/courses', page: 'Courses' },
  { path: '/donate', page: 'Donate' },
  { path: '/donate/success', page: 'DonateSuccess' },
  { path: '/partners', page: 'PartnersPage' },
  { path: '/faq', page: 'FAQ' },
  { path: '/privacy-policy', page: 'PrivacyPage' },
  { path: '/terms-of-service', page: 'TermsPage' },
  { path: '/cookie-policy', page: 'CookiePolicy' },
  { path: '/blog', page: 'Blog' },
  { path: '/support', page: 'Support' },
  { path: '/get-started', page: 'GetStarted' },
  { path: '/services', page: 'Services' },
  { path: '/community', page: 'Community' },
  { path: '/certificates', page: 'MyCertificates' },
  { path: '/verify-certificate', page: 'VerifyCertificate' },
];

function createNextRoute(route) {
  const appPath =
    route.path === '/' ? 'page.tsx' : route.path.slice(1) + '/page.tsx';
  const fullPath = path.join(root, 'app', appPath);
  const dir = path.dirname(fullPath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Skip if already exists
  if (fs.existsSync(fullPath)) {
    return;
  }

  // Calculate relative path depth
  const depth = route.path.split('/').length - 1;
  const backPath = '../'.repeat(depth);

  const content = `'use client';

import dynamic from 'next/dynamic';

const Page = dynamic(() => import('${backPath}_pages/${route.page}'), { ssr: false });

export default function ${route.page.split('/').pop()}Page() {
  return <Page />;
}
`;

  fs.writeFileSync(fullPath, content);
  console.log(`✅ Created: ${appPath}`);
}

console.log('🚀 Generating Next.js routes...\n');

routes.forEach(createNextRoute);

console.log('\n✅ All routes generated!');
