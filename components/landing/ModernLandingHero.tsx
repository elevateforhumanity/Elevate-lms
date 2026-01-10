import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ModernLandingHeroProps {
  badge?: string;
  headline: string;
  accentText?: string;
  subheadline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  features?: string[];
  imageOnRight?: boolean;
}

export default function ModernLandingHero({
  badge,
  headline,
  accentText,
  subheadline,
  description,
  imageSrc,
  imageAlt,
  primaryCTA,
  secondaryCTA,
  features = [],
  imageOnRight = true,
}: ModernLandingHeroProps) {
  const contentSection = (
    <div className="flex flex-col justify-center">
      {badge && (
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {badge}
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
        {headline}
        {accentText && (
          <span className="block text-blue-600">{accentText}</span>
        )}
      </h1>
      
      <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-6">
        {subheadline}
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {description}
      </p>

      {features.length > 0 && (
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={primaryCTA.href}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          {primaryCTA.text}
          <ArrowRight className="w-5 h-5" />
        </Link>
        
        {secondaryCTA && (
          <Link
            href={secondaryCTA.href}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors border-2 border-gray-200"
          >
            {secondaryCTA.text}
          </Link>
        )}
      </div>
    </div>
  );

  const webpSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  const imageSection = (
    <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </picture>
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {imageOnRight ? (
            <>
              {contentSection}
              {imageSection}
            </>
          ) : (
            <>
              {imageSection}
              {contentSection}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
