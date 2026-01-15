import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Skilled Trades Programs | Free HVAC, Building Maintenance Training',
  description:
    'HVAC, Building Maintenance, and Building Technician training programs. 100% funded through WIOA and state grants. Build a career in the trades.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/skilled-trades',
  },
};

export default function SkilledTradesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Image */}
      <section className="relative bg-gradient-to-br from-orange-600 to-orange-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/trades/hero-program-hvac.jpg"
            alt="Skilled Trades Training"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            🔧 Hands-On Training
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            Skilled Trades Programs
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl">
            Build Your Future - HVAC, Building Maintenance & More
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* At-a-Glance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">At-a-Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <Image src="/images/icons/clock.png" alt="Duration" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Duration</h3>
                <p className="text-black">8-24 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/dollar.png" alt="Cost" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Cost</h3>
                <p className="text-black">Free with funding when eligible</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/shield.png" alt="Format" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Format</h3>
                <p className="text-black">In-person</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/award.png" alt="Outcome" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Outcome</h3>
                <p className="text-black">
                  HVAC certification, Building Tech credentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            About the Program
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-black mb-4">
              Our Skilled Trades pathway prepares you for in-demand careers in HVAC, building maintenance, and building technology. Learn hands-on skills from experienced instructors and earn industry-recognized certifications.
            </p>
            <p className="text-black">
              From installing and repairing HVAC systems to maintaining commercial buildings, you'll gain practical experience that prepares you for entry-level positions with strong earning potential and career growth opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Program Is For */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Who This Program Is For
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <ul className="space-y-4 list-disc list-inside">
              <li className="text-black">
                Individuals seeking career change or advancement
              </li>
              <li className="text-black">
                No prior experience required for most programs
              </li>
              <li className="text-black">
                Justice-impacted individuals welcome
              </li>
              <li className="text-black">
                Barriers support available
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            What You'll Learn
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3 list-disc list-inside">
              <li className="text-black">HVAC system installation and repair</li>
              <li className="text-black">Building maintenance fundamentals</li>
              <li className="text-black">Electrical systems basics</li>
              <li className="text-black">Plumbing fundamentals</li>
              <li className="text-black">Safety protocols and OSHA compliance</li>
              <li className="text-black">Troubleshooting and diagnostics</li>
              <li className="text-black">Customer service and professionalism</li>
              <li className="text-black">Tool usage and equipment operation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Funding Options
          </h2>
          <p className="text-black mb-6">You may qualify for:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WIOA</h3>
              <p className="text-black text-sm">
                Workforce Innovation and Opportunity Act funding
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WRG</h3>
              <p className="text-black text-sm">Workforce Ready Grant</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">JRI</h3>
              <p className="text-black text-sm">
                Justice Reinvestment Initiative
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">
                Employer Sponsorship
              </h3>
              <p className="text-black text-sm">
                Some employers sponsor training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Support Services
          </h2>
          <p className="text-black mb-6">We help coordinate:</p>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Case management</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">
                  Justice navigation for returning citizens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Transportation resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Childcare referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Career Outcomes
          </h2>
          <p className="text-black mb-6">Students typically move into:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">HVAC Technician</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                Building Maintenance Tech
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Building Technician</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Apply</h3>
                <p className="text-black text-sm">
                  Submit your application online
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Meet with advisor</h3>
                <p className="text-black text-sm">
                  Discuss your goals and eligibility
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Confirm eligibility</h3>
                <p className="text-black text-sm">
                  We help with funding paperwork
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1">Enroll</h3>
                <p className="text-black text-sm">
                  Start your training program
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-brand-orange-600 hover:bg-brand-orange-600 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
