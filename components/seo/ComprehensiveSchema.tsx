/**
import { sanitizeHtml } from '@/lib/sanitize';
 * Comprehensive Schema.org Structured Data
 * Includes Organization, LocalBusiness, EducationalOrganization, and Course schemas
 */

interface SchemaProps {
  type?: 'organization' | 'course' | 'program' | 'article';
  data?: any;
}

export default function ComprehensiveSchema({ type = 'organization', data }: SchemaProps) {
  const baseUrl = 'https://www.elevateforhumanity.org';

  // Organization Schema (Always included)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization', 'LocalBusiness'],
    '@id': `${baseUrl}/#organization`,
    name: 'Elevate for Humanity Career & Training Institute',
    alternateName: 'Elevate for Humanity',
    legalName: 'Elevate for Humanity Career & Training Institute',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 600,
      height: 60,
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    description: 'Workforce development and career training programs with WIOA funding, DOL registered apprenticeships, and job placement assistance.',

    // Contact Information
    telephone: '+1-317-314-3757',
    email: 'info@www.elevateforhumanity.org',

    // Address (LocalBusiness)
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3737 N Meridian St',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46208',
      addressCountry: 'US',
    },

    // Geographic coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8283,
      longitude: -86.1581,
    },

    // Service Area
    areaServed: [
      {
        '@type': 'State',
        name: 'Indiana',
      },
      {
        '@type': 'State',
        name: 'Illinois',
      },
      {
        '@type': 'State',
        name: 'Ohio',
      },
      {
        '@type': 'State',
        name: 'Kentucky',
      },
      {
        '@type': 'State',
        name: 'Michigan',
      },
    ],

    // Business Hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],

    // Social Media
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
      'https://www.instagram.com/elevateforhumanity',
    ],

    // Educational Organization specific
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Workforce Development Certification',
      },
    ],

    // Programs offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Career Training Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Barber Apprenticeship',
            description: 'DOL registered apprenticeship program',
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'CNA Healthcare Training',
            description: 'Certified Nursing Assistant certification',
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'HVAC Technician',
            description: 'Heating, ventilation, and air conditioning training',
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
            },
          },
        },
      ],
    },

    // Accreditation
    accreditedBy: {
      '@type': 'Organization',
      name: 'U.S. Department of Labor',
    },

    // Funding
    funder: [
      {
        '@type': 'Organization',
        name: 'Workforce Innovation and Opportunity Act (WIOA)',
      },
      {
        '@type': 'Organization',
        name: 'Justice Reinvestment Initiative (JRI)',
      },
    ],

    // Aggregate Rating (if available)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },

    // Price Range
    priceRange: '$$',

    // Payment Methods
    paymentAccepted: 'Cash, Credit Card, Debit Card, Affirm, Klarna, Afterpay, PayPal, Bank Transfer',

    // Currencies Accepted
    currenciesAccepted: 'USD',
  };

  // Course Schema (for program pages)
  const courseSchema = data ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${baseUrl}/programs/${data.slug}#course`,
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'Elevate for Humanity',
      sameAs: baseUrl,
    },
    image: data.image_url || `${baseUrl}/images/programs/${data.slug}.jpg`,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'online', 'blended'],
      courseWorkload: data.duration || 'PT12W',
      instructor: {
        '@type': 'Person',
        name: 'Certified Instructor',
      },
    },
    offers: {
      '@type': 'Offer',
      price: data.tuition || '4500',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/programs/${data.slug}/enroll`,
      validFrom: new Date().toISOString(),
    },
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certificate',
      name: `${data.name} Certificate`,
    },
    timeRequired: data.duration || 'P12W',
    inLanguage: 'en-US',
    availableLanguage: ['en'],
    teaches: data.skills || [],
    coursePrerequisites: data.prerequisites || 'High school diploma or equivalent',
    financialAidEligible: true,
    occupationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
    },
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Programs',
        item: `${baseUrl}/programs`,
      },
    ],
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Elevate for Humanity',
    description: 'Workforce development and career training programs',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // FAQ Schema (for common questions)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is WIOA funding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WIOA (Workforce Innovation and Opportunity Act) provides funding for eligible individuals to receive job training at no cost. We help you determine eligibility and apply for funding.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long are the programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Program lengths vary from 4 weeks (CNA) to 18 months (Barber Apprenticeship). Most programs are 8-12 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer payment plans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer 4-month payment plans, WIOA funding, scholarships, and multiple payment options including Affirm, Klarna, and Afterpay.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is job placement rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our job placement rate is 80% within 90 days of program completion. We provide job search assistance and employer connections.',
        },
      },
    ],
  };

  // Combine all schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
  ];

  if (courseSchema) {
    schemas.push(courseSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(JSON.stringify(schema)) }}
        />
      ))}
    </>
  );
}
