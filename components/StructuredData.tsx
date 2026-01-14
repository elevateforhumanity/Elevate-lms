export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness', 'Organization'],
    '@id': 'https://www.elevateforhumanity.org/#organization',
    name: 'Elevate for Humanity',
    legalName: '2EXCLUSIVE LLC-S',
    alternateName: 'Elevate 4 Humanity',
    url: 'https://www.elevateforhumanity.org',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.elevateforhumanity.org/assets/logo-efh.svg',
      width: 250,
      height: 60,
    },
    image: 'https://www.elevateforhumanity.org/images/heroes/hero-homepage.jpg',
    description:
      '100% FREE career training in Indianapolis. WIOA-funded programs in HVAC, healthcare, barbering, and trades. No tuition, no debt. Job placement assistance.',
    slogan: 'This Is Not Graduation. This Is Elevation.',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'UEI',
      value: 'VX2GK5S8SZH8',
    },
    founder: {
      '@type': 'Person',
      name: 'Elizabeth Lene Greene',
      jobTitle: 'Founder & CEO',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7009 East 56th Street, Suite EE1',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46226',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8386,
      longitude: -86.0586,
    },
    areaServed: {
      '@type': 'State',
      name: 'Indiana',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+1-317-314-3757',
        email: 'Elevate4humanityedu@gmail.com',
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Admissions',
        telephone: '+1-317-314-3757',
        email: 'Elevate4humanityedu@gmail.com',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61571046346179',
      'https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/',
      'https://www.instagram.com/elevateforhumanity',
      'https://www.youtube.com/@elevateforhumanity',
    ],
    priceRange: 'FREE',
    paymentAccepted: 'WIOA Funding, WRG Funding, JRI Funding',
    openingHours: 'Mo-Fr 09:00-17:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Career Training Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'HVAC Technician Training',
            description: 'Free HVAC training with job placement',
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
            name: 'Barber Apprenticeship',
            description: 'Registered apprenticeship program',
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
            name: 'Direct Support Professional',
            description: 'Healthcare career training',
            provider: {
              '@type': 'Organization',
              name: 'Elevate for Humanity',
            },
          },
        },
      ],
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.elevateforhumanity.org/#localbusiness',
    name: 'Elevate for Humanity',
    image: 'https://www.elevateforhumanity.org/images/heroes/hero-homepage.jpg',
    telephone: '+1-317-314-3757',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7009 East 56th Street, Suite EE1',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46226',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8386,
      longitude: -86.0586,
    },
    url: 'https://www.elevateforhumanity.org',
    priceRange: 'FREE',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.elevateforhumanity.org/#website',
    url: 'https://www.elevateforhumanity.org',
    name: 'Elevate for Humanity',
    description: 'Free career training in Indianapolis',
    publisher: {
      '@id': 'https://www.elevateforhumanity.org/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://www.elevateforhumanity.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.elevateforhumanity.org',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
