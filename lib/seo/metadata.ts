// lib/seo/metadata.ts
// Centralized SEO metadata generation

import { Metadata } from 'next';

const SITE_NAME = 'Elevate For Humanity';
const SITE_URL = 'https://elevateforhumanity.org';
const DEFAULT_IMAGE = '/media/hero-elevate-learners.jpg';

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  keywords = [],
  type = 'website',
}: PageMetadata): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'workforce training',
      'free career training',
      'WIOA',
      'Indianapolis',
      ...keywords,
    ].join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Program-specific metadata
export function generateProgramMetadata(programName: string, category: string): Metadata {
  return generateMetadata({
    title: `${programName} Training`,
    description: `100% free ${programName} training through WIOA funding. Get certified and start your career in ${category}. No tuition, no debt.`,
    path: `/programs/${programName.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [programName, category, 'certification', 'job training', 'career change'],
  });
}

// Structured data for programs
export function generateProgramStructuredData(program: {
  name: string;
  description: string;
  duration: string;
  salary: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name,
    description: program.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    educationalCredentialAwarded: 'Certificate',
    timeRequired: program.duration,
    occupationalCategory: program.category,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

// Organization structured data
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: '100% free workforce training programs funded through WIOA, WRG, and government partnerships.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8888 Keystone Crossing Suite 1300',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46240',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-317-314-3757',
      contactType: 'Admissions',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
    ],
  };
}
