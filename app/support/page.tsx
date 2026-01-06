import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Bus,
  Baby,
  Home,
  DollarSign,
  Users,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/support',
  },
  title: 'Support Bundle - Barrier Removal Services | Elevate For Humanity',
  description:
    'Transportation, childcare, housing assistance, and more. We remove barriers so you can focus on training and career success.',
};

export default async function SupportPage() {
  const services = [
    {
      icon: Bus,
      title: 'Transportation',
      description:
        'Bus passes, gas cards, and ride assistance to get you to class and work',
    },
    {
      icon: Baby,
      title: 'Childcare',
      description:
        'Childcare vouchers and assistance so you can focus on training',
    },
    {
      icon: Home,
      title: 'Housing Support',
      description: 'Emergency housing assistance and rental support',
    },
    {
      icon: DollarSign,
      title: 'Emergency Assistance',
      description:
        'Emergency funds for utilities, food, and other basic needs through partner agencies',
    },
    {
      icon: Users,
      title: 'Case Management',
      description: 'Dedicated support coordinator to help navigate resources',
    },
    {
      icon: CheckCircle,
      title: 'Work Essentials',
      description: 'Uniforms, tools, equipment, and supplies for your program',
    },
  ];

  return (
    <>
      {/* Hero Section - Full Bleed */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <Image
            src="/images/artlist/hero-training-1.jpg"
            alt="Support Services"
            fill
            className="object-cover"
            quality={100}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center pt-[72px]">
          <div className="mx-auto w-full max-w-6xl px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-600/90 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wide text-white">
                Barrier Removal Services
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Support Bundle
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              We Remove Barriers So You Can Succeed
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Transportation, childcare, housing assistance, and more. Focus on
              your training while we handle the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600 transition text-center text-lg shadow-xl"
              >
                Apply for Support
              </Link>
              <Link
                href="/contact"
                className="rounded-xl bg-white px-8 py-4 font-bold text-black hover:bg-gray-100 transition text-center text-lg shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              Support Services We Provide
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We remove barriers so you can focus on your training and career
              success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              How to Access Support
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Getting support is simple and confidential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Apply
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Complete your program application and indicate support needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Meet Your Coordinator
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                We'll assign you a support coordinator to assess your needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Get Support
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Receive assistance throughout your training program
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="mx-auto w-full max-w-4xl text-center px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            Apply today and let us know what support you need. We're here to
            help you succeed.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-black px-8 md:px-10 py-4 md:py-5 rounded-xl text-lg md:text-xl font-black shadow-2xl transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
