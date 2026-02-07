import Image from 'next/image';

interface SubpageHeroProps {
  title: string;
  description?: string;
  badge?: string;
}

export function SubpageHero({ title, description, badge }: SubpageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
      <Image
        src="/images/business/tax-prep.jpg"
        alt="Supersonic Fast Cash"
        fill
        className="object-cover"
        priority
      />
      {/* Clean image only - no text overlay */}
    </section>
  );
}
