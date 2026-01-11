import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  excerpt?: string;
  imageUrl?: string | null;
  imageAlt?: string;
}

export default function PageHeader({
  title,
  excerpt,
  imageUrl,
  imageAlt,
}: PageHeaderProps) {
  return (
    <header className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          {title}
        </h1>

        {excerpt && (
          <p className="text-xl text-black max-w-3xl mb-6">
            {excerpt}
          </p>
        )}

        {imageUrl && (
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mt-6">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </header>
  );
}
