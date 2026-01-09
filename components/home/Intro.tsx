import Image from 'next/image';

export default function Intro() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          What We Do
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
            <div className="relative w-full h-48 md:h-56 flex-shrink-0">
              <Image
                src="/what-we-do-hero.jpg"
                alt="Free Workforce Training"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4 md:p-6 flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-3 md:mb-4">Free Workforce Training</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                We connect eligible students to 100% funded training programs through WIOA (Workforce Innovation and Opportunity Act), 
                WRG (Workforce Readiness Grant), and DOL (Department of Labor) initiatives.
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>No tuition. No debt. No barriers.</strong> If you qualify, your training is completely free.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
            <div className="relative w-full h-48 md:h-56 flex-shrink-0">
              <Image
                src="/industry-credentials-new.jpg"
                alt="Industry Credentials"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4 md:p-6 flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-green-900 mb-3 md:mb-4">Industry Credentials</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                Earn nationally recognized certifications from trusted partners like Certiport (Microsoft, Adobe), 
                HSI (OSHA Safety), CareerSafe, NRF (Retail), and Milady (Cosmetology).
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Real credentials employers recognize.</strong> Not just certificates - actual industry certifications.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who We Serve</h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Students seeking career training, displaced workers needing new skills, veterans transitioning to civilian careers, 
            and anyone eligible for workforce development funding. We help you access the training you qualify for and guide you 
            from enrollment through certification to employment.
          </p>
        </div>
      </div>
    </section>
  );
}
