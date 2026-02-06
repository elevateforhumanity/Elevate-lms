import Image from 'next/image';

/**
 * Static server-rendered hero for optimal LCP
 * - Uses Next/Image with priority for instant loading
 * - No client-side JavaScript required
 * - Video loads lazily after hero image is painted
 */
export default function HeroStatic() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
      {/* LCP Image - Server rendered, priority loaded */}
      <Image
        src="/images/hero-poster.webp"
        alt="Career training programs"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
      
      {/* CTA Badge - Static, no JS needed */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10">
        <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
          Now Enrolling — Classes Start Soon
        </span>
      </div>
    </section>
  );
}
