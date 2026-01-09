import Image from 'next/image';

export default function Assurance() {
  return (
    <section className="bg-gray-50 py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/clear-pathways-hero.jpg"
          alt="Clear Pathways Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/clear-path-main-image.jpg"
              alt="Clear Career Pathways"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              A Clear Path, Not a Guess
            </h2>
            <div className="text-base md:text-xl text-gray-700 leading-relaxed space-y-4">
              <p>
                Too many people are told to "go get a skill" without being shown how it works. 
                Here, programs are structured, requirements are visible, and the process is 
                designed to be navigated.
              </p>
              <p className="text-lg md:text-2xl font-semibold text-gray-900">
                No hype. No shortcuts. Just a legitimate pathway.
              </p>
              <p>
                This site is organized around approved pathways and credentialing frameworks 
                so you can make decisions with confidence. The goal is simple: fewer dead ends, 
                more forward motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
