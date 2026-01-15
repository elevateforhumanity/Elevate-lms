import Image from 'next/image';

interface CareerHeroProps {
  title: string;
  description: string;
  badge?: string;
}

export function CareerHero({ title, description, badge }: CareerHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/heroes/career-services.jpg"
          alt="Career Services"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {badge && (
          <div className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-4">
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
          {description}
        </p>
      </div>
    </section>
  );
}
