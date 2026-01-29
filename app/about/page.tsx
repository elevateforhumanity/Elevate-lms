import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Our Story | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity - a nonprofit workforce development organization providing free career training to underserved communities in Indianapolis, Indiana. Founded by Elizabeth Greene.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <Image
          src="/images/heroes-hq/about-hero.jpg"
          alt="Elevate for Humanity Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Building pathways out of poverty through free workforce training in Indiana.
          </p>
        </div>
      </section>

      {/* THE FOUNDER'S VISION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/team/elizabeth-greene.jpg"
                alt="Elizabeth Greene, Founder & CEO"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Founded on a Mission</h2>
              <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
                <p>
                  <strong>Elizabeth Greene</strong> founded Elevate for Humanity with a clear vision: 
                  create pathways out of poverty and into prosperity for those who need it most.
                </p>
                <p>
                  As a transformational leader and social entrepreneur, Elizabeth saw too many people 
                  in Indianapolis stuck in cycles of poverty—not because they lacked ambition, but 
                  because they couldn't access training or didn't know funding existed to help them.
                </p>
                <p>
                  She built Elevate to bridge that gap. Today, Elevate for Humanity is one of Indiana's 
                  most innovative workforce development organizations, serving justice-involved individuals, 
                  low-income families, veterans, and anyone facing barriers to employment.
                </p>
              </div>
              <Link 
                href="/about/team" 
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Meet Our Full Team <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE ECOSYSTEM */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">A Complete Ecosystem</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            We've built an integrated system that addresses the three pillars essential for 
            sustainable economic mobility: training, employment, and housing.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-hands-on-training.jpg"
                  alt="Career Training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Career Training</h3>
                <p className="text-slate-600">
                  Industry-recognized certifications in healthcare, skilled trades, technology, 
                  CDL, and beauty. Programs are 100% free for eligible participants through 
                  WIOA, JRI, and WRG funding.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-career-services.jpg"
                  alt="Job Placement"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Job Placement</h3>
                <p className="text-slate-600">
                  Greene Staffing Solutions connects graduates directly with employers. 
                  Resume help, interview prep, and ongoing career support until you're 
                  successfully employed.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-community.jpg"
                  alt="Support Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Support Services</h3>
                <p className="text-slate-600">
                  Wraparound support including transitional housing through Greene Property 
                  Management, mental health services, case management, and assistance with 
                  transportation and childcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Who We Serve</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            We specialize in helping people who face barriers to traditional education and employment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image
                  src="/images/funding/funding-jri-program-v2.jpg"
                  alt="Justice-Involved Individuals"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-blue-50 p-4 text-center">
                <h3 className="font-bold text-slate-900 mb-1">Justice-Involved</h3>
                <p className="text-slate-600 text-sm">Second chance training through JRI funding</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image
                  src="/images/funding/funding-dol-program-v2.jpg"
                  alt="Low-Income Families"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-green-50 p-4 text-center">
                <h3 className="font-bold text-slate-900 mb-1">Low-Income Families</h3>
                <p className="text-slate-600 text-sm">Free training through WIOA funding</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image
                  src="/images/hero/hero-skilled-trades.jpg"
                  alt="Veterans"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-purple-50 p-4 text-center">
                <h3 className="font-bold text-slate-900 mb-1">Veterans</h3>
                <p className="text-slate-600 text-sm">Career transition support and training</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image
                  src="/images/hero/hero-tech-careers.jpg"
                  alt="Career Changers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-orange-50 p-4 text-center">
                <h3 className="font-bold text-slate-900 mb-1">Career Changers</h3>
                <p className="text-slate-600 text-sm">New skills for new opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Our Credentials</h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Fully approved and recognized by federal, state, and local workforce agencies.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="relative h-16 mb-3">
                <Image
                  src="/images/partners/usdol.webp"
                  alt="U.S. Department of Labor"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-white text-sm">DOL Registered</div>
              <div className="text-slate-400 text-xs">Apprenticeship Sponsor</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="relative h-16 mb-3">
                <Image
                  src="/images/partners/dwd.webp"
                  alt="Indiana DWD"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-white text-sm">DWD Approved</div>
              <div className="text-slate-400 text-xs">INTraining Provider</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="relative h-16 mb-3">
                <Image
                  src="/images/partners/workone.webp"
                  alt="WorkOne"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-white text-sm">WorkOne Partner</div>
              <div className="text-slate-400 text-xs">Workforce System</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="relative h-16 mb-3">
                <Image
                  src="/images/partners/nextleveljobs.webp"
                  alt="Next Level Jobs"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-white text-sm">WRG Approved</div>
              <div className="text-slate-400 text-xs">Workforce Ready Grant</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="relative h-16 mb-3">
                <Image
                  src="/images/partners/osha.webp"
                  alt="OSHA"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-white text-sm">OSHA Authorized</div>
              <div className="text-slate-400 text-xs">Safety Training</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="bg-red-600 rounded-lg h-16 mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">JRI</span>
              </div>
              <div className="font-bold text-white text-sm">JRI Approved</div>
              <div className="text-slate-400 text-xs">Justice Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Impact</h2>
              <p className="text-lg text-slate-700 mb-6">
                Elizabeth's holistic approach recognizes that career success requires more than 
                skills training—it requires wraparound support, trauma-informed care, and genuine 
                human connection.
              </p>
              <p className="text-lg text-slate-700 mb-8">
                Our impact is measured not just in credentials earned or jobs secured, but in 
                lives transformed, families stabilized, and communities strengthened.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-blue-600">500+</div>
                  <div className="text-slate-600">Graduates</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-green-600">85%</div>
                  <div className="text-slate-600">Job Placement</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-purple-600">20+</div>
                  <div className="text-slate-600">Programs</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-black text-orange-600">100%</div>
                  <div className="text-slate-600">Free for Eligible</div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pexels/success-team.jpg"
                alt="Success stories"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Training is 100% free for eligible Indiana residents. Let us help you build a better future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition"
            >
              Explore Programs
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition"
            >
              Apply Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
