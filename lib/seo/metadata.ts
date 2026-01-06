import { Metadata } from 'next';

interface SEOParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function generateMetadata(params: SEOParams): Metadata {
  const baseUrl = 'https://elevateforhumanity.org';
  const url = `${baseUrl}${params.path}`;
  const image = params.image || '/images/og-default.jpg';
  const fullTitle = params.title.includes('|') 
    ? params.title 
    : `${params.title} | Elevate for Humanity`;

  const metadata: Metadata = {
    title: fullTitle,
    description: params.description,
    alternates: {
      canonical: url,
    },
  };

  if (!params.noindex) {
    metadata.openGraph = {
      title: fullTitle,
      description: params.description,
      url: url,
      siteName: 'Elevate for Humanity',
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: params.title,
      }],
      type: params.type || 'website',
      locale: 'en_US',
    };

    metadata.twitter = {
      card: 'summary_large_image',
      title: fullTitle,
      description: params.description,
      images: [image],
      creator: '@ElevateForHuman',
      site: '@ElevateForHuman',
    };
  }

  if (params.noindex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export function generateInternalMetadata(params: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return generateMetadata({
    ...params,
    noindex: true,
  });
}
