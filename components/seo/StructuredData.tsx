import { injectSchema } from '@/lib/schema';

interface StructuredDataProps {
  data: unknown;
}

export default function StructuredData({ data }: StructuredDataProps) {
  {
    /* Safe: JSON-LD structured data for SEO */
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={injectSchema(data)}
    />
  );
}
