import Image from 'next/image';

export default function Intro() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          What We Do
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64">
              <Image
                src="/free-training-hero.jpg"
                alt="Free Workforce Training"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-900/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free Workforce Training</h3>
              </div>
            </div>
            <div className="bg-blue-50 p-6">
              <p className="text-base text-gray-700 leading-relaxed mb-3">
                We connect eligible students to 100% funded training programs through WIOA (Workforce Innovation and Opportunity Act), 
                WRG (Workforce Readiness Grant), and DOL (Department of Labor) initiatives.
              </p>
              <p className="text-sm text-gray-600">
                <strong>No tuition. No debt. No barriers.</strong> If you qualify, your training is completely free.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64">
              <Image
                src="/industry-credentials-hero.jpg"
                alt="Industry Credentials"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-green-900/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Industry Credentials</h3>
              </div>
            </div>
            <div className="bg-green-50 p-6">
              <p className="text-base text-gray-700 leading-relaxed mb-3">
                Earn nationally recognized certifications from trusted partners like Certiport (Microsoft, Adobe), 
                HSI (OSHA Safety), CareerSafe, NRF (Retail), and Milady (Cosmetology).
              </p>
              <p className="text-sm text-gray-600">
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
