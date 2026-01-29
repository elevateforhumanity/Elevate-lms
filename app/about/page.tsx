import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Our Story | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity - a nonprofit workforce development organization providing free career training in Indianapolis, Indiana. Founded by Elizabeth Greene.',
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
          alt="Elevate for Humanity"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Our Story
          </h1>
        </div>
      </section>

      {/* THE FOUNDER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/elizabeth-greene-founder.jpg"
                alt="Elizabeth Greene, Founder & CEO"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-blue-600 font-semibold mb-2">Meet Our Founder</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Elizabeth Greene</h2>
              <p className="text-slate-500 mb-6">Founder & Chief Executive Officer</p>
              
              <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
                <p>
                  Elizabeth Greene founded Elevate for Humanity to create pathways out of poverty 
                  and into prosperity for those who need it most.
                </p>
                <p>
                  Based in Indianapolis, Indiana, Elevate for Humanity serves justice-involved 
                  individuals, low-income families, veterans, and anyone facing barriers to employment.
                </p>
              </div>
              
              <Link 
                href="/about/team" 
                className="inline-flex items-center gap-2 mt-8 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Meet Our Full Team <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What We Do</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-64">
                <Image
                  src="/images/hero/hero-hands-on-training.jpg"
                  alt="Elevate for Humanity Training"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-slate-900 text-xl mb-4">Career Training & Workforce Development</h3>
                <p className="text-slate-600">
                  Elevate for Humanity is a workforce development organization that helps connect 
                  eligible participants with career training through WIOA, JRI, and WRG funding programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Credentials</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src="/images/partners/usdol.webp" alt="USDOL" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900">U.S. Department of Labor</div>
                <div className="text-blue-600 text-sm">Registered Apprenticeship Sponsor</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src="/images/partners/dwd.webp" alt="Indiana DWD" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Indiana DWD</div>
                <div className="text-green-600 text-sm">Approved Training Provider</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src="/images/partners/workone.webp" alt="WorkOne" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900">WorkOne</div>
                <div className="text-purple-600 text-sm">Workforce Partner</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src="/images/partners/nextleveljobs.webp" alt="Next Level Jobs" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Next Level Jobs</div>
                <div className="text-orange-600 text-sm">Workforce Ready Grant Provider</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src="/images/partners/osha.webp" alt="OSHA" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-slate-900">OSHA</div>
                <div className="text-yellow-600 text-sm">Authorized Safety Training</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">WIOA</span>
              </div>
              <div>
                <div className="font-bold text-slate-900">WIOA</div>
                <div className="text-blue-600 text-sm">Eligible Training Provider</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold text-xl">JRI</span>
              </div>
              <div>
                <div className="font-bold text-slate-900">JRI</div>
                <div className="text-red-600 text-sm">Approved Provider</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">EmployIndy</span>
              </div>
              <div>
                <div className="font-bold text-slate-900">EmployIndy</div>
                <div className="text-green-600 text-sm">Workforce Partner</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">ISBCE</span>
              </div>
              <div>
                <div className="font-bold text-slate-900">Indiana State Board</div>
                <div className="text-purple-600 text-sm">Cosmetology & Barber Examiners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Who We Serve</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/funding/funding-jri-program-v2.jpg"
                  alt="Justice-Involved Individuals"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Justice-Involved</h3>
              <p className="text-slate-600 text-sm">Second chance training through JRI funding</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/funding/funding-dol-program-v2.jpg"
                  alt="Low-Income Families"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Low-Income Families</h3>
              <p className="text-slate-600 text-sm">Free training through WIOA funding</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero/hero-skilled-trades.jpg"
                  alt="Veterans"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Veterans</h3>
              <p className="text-slate-600 text-sm">Career transition support</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero/hero-tech-careers.jpg"
                  alt="Career Changers"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-slate-600 text-sm">New skills for new opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Programs</h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Link href="/programs/healthcare" className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-healthcare.jpg" alt="Healthcare" fill className="object-cover object-center" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="font-bold text-slate-900">Healthcare</h3>
                </div>
              </div>
            </Link>
            <Link href="/programs/skilled-trades" className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-skilled-trades.jpg" alt="Skilled Trades" fill className="object-cover object-center" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="font-bold text-slate-900">Skilled Trades</h3>
                </div>
              </div>
            </Link>
            <Link href="/programs/technology" className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-tech-careers.jpg" alt="Technology" fill className="object-cover object-center" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="font-bold text-slate-900">Technology</h3>
                </div>
              </div>
            </Link>
            <Link href="/programs/cdl" className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/cdl-vibrant.jpg" alt="CDL" fill className="object-cover object-center" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="font-bold text-slate-900">CDL</h3>
                </div>
              </div>
            </Link>
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/barber-vibrant.jpg" alt="Beauty" fill className="object-cover object-center" />
                </div>
                <div className="p-4 bg-white text-center">
                  <h3 className="font-bold text-slate-900">Beauty</h3>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/programs" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition"
            >
              View All Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Training may be free for eligible Indiana residents.
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
