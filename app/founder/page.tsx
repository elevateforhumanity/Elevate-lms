import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Eye, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/founder',
  },
  title: 'Founder & Leadership | Elevate For Humanity',
  description:
    'Founded with purpose. Built for impact. Learn about the leadership behind Elevate for Humanity.',
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Founder & Leadership"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Founded with purpose. Built for impact.
          </h1>
        </div>
      </section>

      {/* Founder Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Founder Photo */}
            <div className="relative h-[500px] rounded-lg overflow-hidden border-4 border-gray-200">
              <Image
                src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                alt="Elizabeth Greene - Founder & CEO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>

            {/* Founder Statement */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-black mb-6">
                Leadership Team
              </h2>
              <p className="text-xl text-brand-orange-600 font-semibold mb-6">
                Founder & Executive Leadership
              </p>

              <h3 className="text-2xl font-bold text-black mb-4">Our Story</h3>
              
              <p className="text-lg text-black leading-relaxed mb-6">
                Elevate for Humanity was founded after witnessing firsthand how disconnected workforce systems prevent motivated individuals from accessing the training, funding, and employment pathways they need to succeed.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                Working in workforce development, our founders saw talented people fall through the cracks—not because they lacked ability or drive, but because the system was fragmented. Training providers didn't talk to funding agencies. Funding agencies didn't coordinate with employers. And individuals were left navigating a maze of requirements, applications, and dead ends.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                In 2020, we decided to build something different: a coordination hub that would connect all the pieces. <strong>2EXCLUSIVE LLC-S</strong> (operating as <strong>Elevate for Humanity</strong>) was founded to serve as the bridge between individuals, training providers, funding sources, and employers.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                What started as a focused operation has grown into a workforce ecosystem serving 1,000+ individuals across Indiana with an 85% job placement rate. The organization holds active SAM.gov registration, positioning it for federal contracts and grants.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                Our team also established <strong>RISE Foundation</strong>, a 501(c)(3) tax-exempt nonprofit organization that provides philanthropic support for workforce development initiatives. The foundation received its IRS determination letter in July 2024.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                Additionally, we operate a Certiport Authorized Testing Center (CATC), offering industry-recognized certification exams including Microsoft Office Specialist, IC3 Digital Literacy, and Adobe Certified Professional credentials.
              </p>

              <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 my-8">
                <p className="text-lg font-semibold text-black">
                  "Elevate for Humanity exists to ensure opportunity is not theoretical — it's accessible, supported, and measurable."
                </p>
                <p className="text-sm text-black mt-2">— Elevate for Humanity Leadership</p>
              </div>

              <h3 className="text-2xl font-bold text-black mb-4 mt-8">Our Mission</h3>
              
              <p className="text-lg text-black leading-relaxed mb-6">
                Our mission is simple: make workforce systems work for people, not the other way around. Every decision at Elevate for Humanity starts with one question: "Does this help someone get trained, funded, and employed?"
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                We believe that opportunity should be accessible to everyone—regardless of their background, criminal record, income level, or education. That's why Elevate for Humanity works with WIOA, WRG, JRI, and apprenticeship programs to remove financial barriers and create pathways to sustainable careers.
              </p>

              <h3 className="text-2xl font-bold text-black mb-4 mt-8">
                Why This Matters
              </h3>
              
              <p className="text-lg text-black leading-relaxed mb-6">
                Every person who completes training and gets hired doesn't just change their own life—they change their family's trajectory. Children see a parent going to work with purpose. Neighborhoods become more stable. Communities grow stronger.
              </p>

              <p className="text-lg text-black leading-relaxed mb-6">
                Elevate for Humanity was built on the belief that workforce development isn't just about filling jobs—it's about building futures. And when systems work the way they should, everyone benefits.
              </p>

              <h3 className="text-2xl font-bold text-black mb-4 mt-8">
                Leadership Focus
              </h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Workforce development program design and delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Government contracting and compliance management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Strategic partnerships with employers and training providers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Community-centered systems design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations & Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Organizations & Credentials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">Elevate for Humanity</h3>
              <p className="text-sm text-black mb-4">Workforce Development</p>
              <div className="space-y-2 text-sm text-black">
                <p><strong>Services:</strong> Training coordination, funding navigation, employer partnerships</p>
                <p><strong>Status:</strong> Active federal registration (SAM.gov)</p>
                <p><strong>Reach:</strong> 1,000+ individuals served across Indiana</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">RISE Foundation</h3>
              <p className="text-sm text-black mb-4">Philanthropic Support</p>
              <div className="space-y-2 text-sm text-black">
                <p><strong>Type:</strong> 501(c)(3) tax-exempt nonprofit</p>
                <p><strong>Focus:</strong> Workforce development initiatives</p>
                <p><strong>Established:</strong> 2024</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">Testing Center</h3>
              <p className="text-sm text-black mb-4">Certiport Authorized</p>
              <div className="space-y-2 text-sm text-black">
                <p><strong>Status:</strong> Authorized Testing Center (CATC)</p>
                <p><strong>Certifications:</strong> Microsoft Office Specialist, IC3 Digital Literacy, Adobe Certified Professional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            Leadership Principles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Ethical Operations
              </h3>
              <p className="text-sm text-black">
                Transparent, honest, and compliant with all regulations
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Results-Driven
              </h3>
              <p className="text-sm text-black">
                85% job placement rate through measurable outcomes
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Full Transparency
              </h3>
              <p className="text-sm text-black">
                Clear communication about costs, requirements, and expectations
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Community Impact
              </h3>
              <p className="text-sm text-black">
                Long-term investment in people and neighborhoods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn How Elevate Works
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Discover our approach to workforce development and community impact.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            About Elevate
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
