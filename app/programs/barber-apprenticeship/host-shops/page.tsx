import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Shield, Users, Clock, Award, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Become a Host Barbershop | Barber Apprenticeship | Elevate for Humanity',
  description: 'Partner with Elevate for Humanity as a host barbershop for our USDOL Registered Barber Apprenticeship program. Train the next generation of barbers.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship/host-shops',
  },
};

export default function HostShopsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] max-h-[600px]">
        <Image
          src="/images/programs/barber-apprenticeship.jpg"
          alt="Professional barbershop interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-12 w-full">
            <div className="inline-block bg-amber-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Partner Opportunity
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Become a Host Barbershop
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-6">
              Train the next generation of barbers through our USDOL Registered Apprenticeship program.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/forms/host-shop-inquiry"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition hover:bg-gray-100"
              >
                General Inquiry
              </Link>
              <Link
                href="/portal/partner/enroll/host-shop"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
              >
                Enroll as a Host Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Users className="w-8 h-8" />}
              title="Trained Talent Pipeline"
              description="Access motivated apprentices ready to learn and contribute to your shop."
            />
            <BenefitCard
              icon={<Shield className="w-8 h-8" />}
              title="Program Support"
              description="We handle documentation, tracking, and compliance. You focus on training."
            />
            <BenefitCard
              icon={<Award className="w-8 h-8" />}
              title="Build Your Legacy"
              description="Shape the next generation of barbers and strengthen the profession."
            />
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Host Shop Qualifications</h2>
          <p className="text-gray-600 text-center mb-12">
            To participate as a host barbershop, your shop must meet these requirements:
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ul className="space-y-4">
              {[
                'Hold an active Indiana barbershop license in good standing',
                'Employ at least one licensed barber capable of supervising apprentices',
                'Maintain a safe, professional training environment',
                'Agree to verify apprentice attendance and progress',
                'Follow program guidelines and documentation requirements',
                'Carry appropriate business insurance',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Host Shop Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <h3 className="font-bold text-lg mb-4 text-amber-900">What You Provide</h3>
              <ul className="space-y-3 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  Supervised on-the-job training
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  Workspace and tools access
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  Attendance verification
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  Professional mentorship
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-lg mb-4 text-blue-900">What We Handle</h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Apprenticeship structure & framework
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Related instruction (Milady curriculum)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Documentation & compliance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Completion verification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approval Process */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Approval Process</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Submit Application', description: 'Complete the host shop enrollment form with your shop details and license information.' },
              { step: 2, title: 'License Verification', description: 'We verify your barbershop license and supervisor credentials.' },
              { step: 3, title: 'Agreement Review', description: 'Review and accept the Host Shop Agreement (MOU).' },
              { step: 4, title: 'Approval & Placement', description: 'Once approved, you can begin hosting apprentices based on availability.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-100 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-900 font-medium">
              Host shops must be approved before they can host apprentices. Enrollment includes intake and Host Shop Agreement acceptance.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-amber-400" />
          <h2 className="text-3xl font-bold mb-4">Ready to Train the Next Generation?</h2>
          <p className="text-slate-300 mb-8">
            Join our network of approved host barbershops and help shape future barbers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/forms/host-shop-inquiry"
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold transition hover:bg-gray-100"
            >
              General Inquiry
            </Link>
            <Link
              href="/portal/partner/enroll/host-shop"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold transition"
            >
              Enroll as a Host Shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
