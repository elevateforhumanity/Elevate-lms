import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Handshake,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react';

export const metadata = {
  title: 'Become a Partner | Elevate for Humanity',
  description:
    'Partner with Elevate for Humanity to provide workforce training, apprenticeships, and career pathways. Join our network of employers, training providers, and community organizations.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/partner',
  },
};

export default function PartnerPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-orange-600 text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Handshake className="w-5 h-5" />
              <span className="text-sm font-bold">
                Partnership Opportunities
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Partner With Us to
              <br />
              <span className="text-yellow-300">Transform Lives</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
              Join our network of employers, training providers, and community
              organizations building pathways to meaningful careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/partner-with-us"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              We work with multiple types of partners to create comprehensive
              career pathways for our students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Employer Partners */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Image src="/images/icons/users.png" alt="Employer Partners" width={32} height={32} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Employer Partners
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                Hire trained, job-ready graduates. Access our talent pipeline.
                Participate in apprenticeship programs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Pre-screened, trained candidates
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Apprenticeship program hosting
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Tax credits (WOTC) available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Ongoing support and coordination
                  </span>
                </li>
              </ul>
              <Link
                href="/partner-with-us"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Training Providers */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Image src="/images/icons/award.png" alt="Icon" width={32} height={32} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Training Providers
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                Deliver curriculum through our platform. Reach more students.
                Expand your impact.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Access to funded students
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Platform integration support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Marketing and enrollment support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Revenue sharing opportunities
                  </span>
                </li>
              </ul>
              <Link
                href="/partner-with-us"
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Community Organizations */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Image src="/images/icons/shield.png" alt="Icon" width={32} height={32} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Community Organizations
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                Refer participants. Provide wraparound services. Build stronger
                communities together.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Referral partnerships
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Coordinated support services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Shared impact measurement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Image src="/images/icons/check-circle.png" alt="Check" width={20} height={20} className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">
                    Joint funding opportunities
                  </span>
                </li>
              </ul>
              <Link
                href="/partner-with-us"
                className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Why Partner With Us
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              We make it easy to connect talent with opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Qualified Talent',
                description:
                  'Access pre-screened, trained candidates ready to work.',
              },
              {
                icon: Award,
                title: 'Proven Results',
                description:
                  'WIOA-compliant programs with measurable outcomes and transparent reporting.',
              },
              {
                icon: TrendingUp,
                title: 'Growth Support',
                description:
                  'We handle recruitment, training, and ongoing support.',
              },
              {
                icon: Handshake,
                title: 'True Partnership',
                description:
                  'Collaborative approach. Your success is our success.',
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-black">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                WIOA
              </div>
              <div className="text-lg text-black">Funded Programs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                DOL
              </div>
              <div className="text-lg text-black">
                Registered Apprenticeships
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                ETPL
              </div>
              <div className="text-lg text-black">Approved Provider</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partner-with-us"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-slate-100 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
            >
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
