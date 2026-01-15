import Script from 'next/script';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

export function OrganizationSchema({
  name = 'Elevate for Humanity',
  url = 'https://www.elevateforhumanity.org',
  logo = 'https://www.elevateforhumanity.org/images/logo.png',
  description = 'Workforce development connecting students to approved training, recognized credentials, and real career pathways.',
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
    logo,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-317-314-3757',
      contactType: 'customer service',
    },
    sameAs: [
      'https://facebook.com/elevateforhumanity',
      'https://twitter.com/elevate4humanity',
      'https://linkedin.com/company/elevateforhumanity',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url: string;
  image?: string;
  duration?: string;
  price?: number;
}

export function CourseSchema({
  name,
  description,
  provider = 'Elevate for Humanity',
  url,
  image,
  duration,
  price = 0,
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://www.elevateforhumanity.org',
    },
    url,
    image,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      duration,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Free with WIOA funding for eligible participants',
    },
  };

  return (
    <Script
      id={`course-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function BlogPostSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'Elevate Team',
}: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elevate for Humanity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.elevateforhumanity.org/images/logo.png',
      },
    },
  };

  return (
    <Script
      id={`blog-schema-${title.toLowerCase().replace(/\s+/g, '-').slice(0, 50)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  name?: string;
  telephone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

export function LocalBusinessSchema({
  name = 'Elevate for Humanity',
  telephone = '+1-317-314-3757',
  address = {
    city: 'Indianapolis',
    state: 'IN',
  },
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: 'US',
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    priceRange: 'Free (WIOA Funded)',
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
