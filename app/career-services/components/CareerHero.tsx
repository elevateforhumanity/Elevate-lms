'use client';

interface CareerHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export function CareerHero({ title, description, badge }: CareerHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 text-white overflow-hidden min-h-[50vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/heroes-hq/career-services-hero.jpg"
          className="w-full h-full object-cover opacity-40"
        >
          <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/career-services-hero.mp4" type="video/mp4" />
        </video>
        
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {badge && (
          <div className="inline-block bg-white/20 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
            {badge}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-3xl">
          {description}
        </p>
      </div>
    </section>
  );
}
