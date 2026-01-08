import Image from 'next/image';

export default function Pathways() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          What you can do here
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative h-64 rounded-lg overflow-hidden shadow">
            <Image
              src="/media/programs/efh-cna-hero.jpg"
              alt="Healthcare training"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow">
            <Image
              src="/media/programs/efh-building-tech-hero.jpg"
              alt="Skilled trades training"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow">
            <Image
              src="/media/programs/efh-barber-hero.jpg"
              alt="Barber training"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Explore training programs tied to real careers.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>See credential pathways employers recognize.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Review funding options that can reduce or eliminate cost.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Follow clear steps from interest to enrollment to completion.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Get guidance through requirements and next actions.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
