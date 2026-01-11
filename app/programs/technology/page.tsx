import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';

export const metadata: Metadata = {
  title: 'Technology & IT Programs | Free CompTIA, Google IT Training',
  description:
    'CompTIA A+, Network+, Google IT Support, and Cybersecurity training programs. 100% funded through WIOA and state grants. Launch your tech career today.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/programs/technology',
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VideoHeroBanner
        videoSrc="/videos/tech-hero.mp4"
        headline="Technology & IT Programs"
        subheadline="Launch Your Tech Career - IT Support, Networking & Cybersecurity"
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'View All Programs', href: '/programs' }}
      />

      {/* At-a-Glance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">At-a-Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <Image src="/images/icons/clock.png" alt="Duration" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Duration</h3>
                <p className="text-gray-700">8-16 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/dollar.png" alt="Cost" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Cost</h3>
                <p className="text-gray-700">Free with funding when eligible</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/shield.png" alt="Format" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Format</h3>
                <p className="text-gray-700">Hybrid (online & hands-on labs)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/award.png" alt="Outcome" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Outcome</h3>
                <p className="text-gray-700">
                  CompTIA A+, Network+, Google IT certification
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
            <p className="text-gray-700 mb-4">
              Our Technology & IT Support pathway equips you with core IT support, networking, and cybersecurity skills. Learn hands-on in a lab setting and prepare for industry-recognized certifications that employers value.
            </p>
            <p className="text-gray-700">
              From troubleshooting networks to setting up systems and supporting users, you'll gain real-world experience that prepares you for entry-level IT positions with growth potential.
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
              <li className="text-gray-700">
                Career changers interested in technology
              </li>
              <li className="text-gray-700">
                No prior IT experience required
              </li>
              <li className="text-gray-700">
                Tech-curious individuals ready to learn
              </li>
              <li className="text-gray-700">
                Justice-impacted individuals welcome
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">
            Program Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-bold text-black mb-2">Real-World Skills</h3>
              <p className="text-gray-700 text-sm">
                Troubleshoot networks, set up systems, and support users in live lab environments
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-bold text-black mb-2">Industry Certifications</h3>
              <p className="text-gray-700 text-sm">
                Prepare for CompTIA A+, Network+, and Google IT Support credentials
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-black mb-2">Funded Training</h3>
              <p className="text-gray-700 text-sm">
                Training fully covered for eligible Indiana residents via WIOA grants
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-4xl mb-4">🎖</div>
              <h3 className="font-bold text-black mb-2">Veteran Eligible</h3>
              <p className="text-gray-700 text-sm">
                VA education benefits accepted for qualified veterans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Funding Options
          </h2>
          <p className="text-gray-700 mb-6">You may qualify for:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WIOA</h3>
              <p className="text-gray-700 text-sm">
                Workforce Innovation and Opportunity Act funding
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WRG</h3>
              <p className="text-gray-700 text-sm">Workforce Ready Grant</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">JRI</h3>
              <p className="text-gray-700 text-sm">
                Justice Reinvestment Initiative
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">
                Employer Sponsorship
              </h3>
              <p className="text-gray-700 text-sm">
                Some employers sponsor IT training
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
          <p className="text-gray-700 mb-6">We help coordinate:</p>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-gray-700">Case management</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-gray-700">
                  Career counseling and job placement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-gray-700">Transportation resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-gray-700">Equipment and tools assistance</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-gray-700">Documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Career Outcomes
          </h2>
          <p className="text-gray-700 mb-6">Students typically move into:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                Helpdesk Support Technician
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Network Administrator</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                IT Field Support
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Systems Technician</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                Cybersecurity Analyst (entry)
              </h3>
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
                <p className="text-slate-600 text-sm">
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
                <p className="text-slate-600 text-sm">
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
                <p className="text-slate-600 text-sm">
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
                <p className="text-slate-600 text-sm">
                  Start your training program
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
