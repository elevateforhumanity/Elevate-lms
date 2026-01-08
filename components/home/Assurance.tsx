import Image from 'next/image';

export default function Assurance() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src="/images/homepage/employers.jpg"
              alt="Professional workplace"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              A clear path, not a guess
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Too many people are told to "go get a skill" without being shown how it works. 
                Here, programs are structured, requirements are visible, and the process is 
                designed to be navigated.
              </p>
              <p className="font-medium">
                No hype. No shortcuts. Just a legitimate pathway.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How this institute protects your effort
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
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
