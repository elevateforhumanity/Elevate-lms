import { injectSchema } from '@/lib/schema';

interface StructuredDataProps {
  data: any;
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
