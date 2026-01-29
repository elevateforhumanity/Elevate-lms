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
          className="object-cover object-center"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/elizabeth-greene-founder.jpg"
                alt="Elizabeth Greene, Founder & CEO of Elevate for Humanity"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-blue-600 font-semibold mb-2">Meet Our Founder</p>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Elizabeth Greene</h2>
              <p className="text-sm text-slate-500 mb-6">Founder & Chief Executive Officer</p>
              
              <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
                <p>
                  Elizabeth Greene is a transformational leader, workforce development pioneer, and 
                  social entrepreneur who has dedicated her career to creating pathways out of poverty 
                  and into prosperity.
                </p>
                <p>
                  As Founder and CEO of <strong>Elevate for Humanity Technical & Career Institute</strong>, 
                  she has built one of Indiana's most innovative workforce development organizations—serving 
                  justice-involved individuals, low-income families, and barrier-facing populations with 
                  dignity, excellence, and measurable results.
                </p>
                <p>
                  Elizabeth recognized that career success requires more than skills training. It requires 
                  wraparound support, trauma-informed care, and genuine human connection. So she built an 
                  entire ecosystem to address the root causes of poverty and recidivism.
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

      {/* THE ECOSYSTEM - Elizabeth's Businesses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Elevate Ecosystem</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Elizabeth built interconnected businesses that address the three pillars essential 
              for sustainable economic mobility: <strong>training</strong>, <strong>employment</strong>, 
              and <strong>housing</strong>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Elevate for Humanity */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-hands-on-training.jpg"
                  alt="Elevate for Humanity Training"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-blue-600/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xl text-center px-4">Elevate for Humanity</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm">
                  Workforce development organization providing free career training through WIOA, 
                  JRI, and WRG funding. 20+ programs in healthcare, trades, technology, and more.
                </p>
              </div>
            </div>

            {/* Textures Institute */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-beauty-wellness.jpg"
                  alt="Textures Institute of Cosmetology"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-purple-600/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xl text-center px-4">Textures Institute of Cosmetology</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm">
                  Licensed cosmetology school providing state board-approved training in barbering, 
                  cosmetology, esthetics, and nail technology.
                </p>
              </div>
            </div>

            {/* Greene Staffing */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-career-services.jpg"
                  alt="Greene Staffing Solutions"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-green-600/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xl text-center px-4">Greene Staffing Solutions</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm">
                  Staffing agency connecting Elevate graduates with employment opportunities, 
                  creating a direct pipeline from training to career placement.
                </p>
              </div>
            </div>

            {/* Greene Property */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/hero/hero-community.jpg"
                  alt="Greene Property Management"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-orange-600/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xl text-center px-4">Greene Property Management</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm">
                  Transitional and supportive housing options for program participants, 
                  addressing one of the most significant barriers to workforce success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL CREDENTIALS */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Credentials & Approvals</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Fully approved and recognized by federal, state, and local workforce agencies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Federal */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image src="/images/partners/usdol.webp" alt="USDOL" fill className="object-contain" />
                </div>
                <div>
                  <div className="font-bold text-white">U.S. Department of Labor</div>
                  <div className="text-blue-400 text-sm">Registered Apprenticeship Sponsor</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">RAPIDS ID: 2025-IN-132301</p>
            </div>

            {/* DWD */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image src="/images/partners/dwd.webp" alt="Indiana DWD" fill className="object-contain" />
                </div>
                <div>
                  <div className="font-bold text-white">Indiana DWD</div>
                  <div className="text-green-400 text-sm">Approved INTraining Provider</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Location ID: 10004621</p>
            </div>

            {/* DOE */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex-shrink-0 bg-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DOE</span>
                </div>
                <div>
                  <div className="font-bold text-white">Indiana Dept. of Education</div>
                  <div className="text-purple-400 text-sm">Recognized Institution</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Educational institution status</p>
            </div>

            {/* State Board */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex-shrink-0 bg-pink-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ISBCE</span>
                </div>
                <div>
                  <div className="font-bold text-white">State Board of Cosmetology</div>
                  <div className="text-pink-400 text-sm">Licensed School Operator</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Barber & Cosmetology Examiners</p>
            </div>
          </div>

          {/* Funding Approvals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="relative h-12 mb-2">
                <Image src="/images/partners/workone.webp" alt="WorkOne" fill className="object-contain" />
              </div>
              <div className="font-semibold text-white text-sm">WorkOne Partner</div>
              <div className="text-slate-400 text-xs">Workforce System Integration</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="relative h-12 mb-2">
                <Image src="/images/partners/nextleveljobs.webp" alt="Next Level Jobs" fill className="object-contain" />
              </div>
              <div className="font-semibold text-white text-sm">WRG Approved</div>
              <div className="text-slate-400 text-xs">Workforce Ready Grant</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="bg-blue-600 rounded-lg h-12 mb-2 flex items-center justify-center">
                <span className="text-white font-bold">WIOA</span>
              </div>
              <div className="font-semibold text-white text-sm">WIOA Eligible</div>
              <div className="text-slate-400 text-xs">Training Provider</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="bg-red-600 rounded-lg h-12 mb-2 flex items-center justify-center">
                <span className="text-white font-bold">JRI</span>
              </div>
              <div className="font-semibold text-white text-sm">JRI Approved</div>
              <div className="text-slate-400 text-xs">Justice Reinvestment</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="bg-green-600 rounded-lg h-12 mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">EmployIndy</span>
              </div>
              <div className="font-semibold text-white text-sm">EmployIndy Partner</div>
              <div className="text-slate-400 text-xs">Workforce Collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Serve</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We specialize in helping people who face barriers to traditional education and employment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/funding/funding-jri-program-v2.jpg"
                  alt="Justice-Involved Individuals"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Justice-Involved</h3>
              <p className="text-slate-600 text-sm">Second chance training through JRI funding for reentry success</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/funding/funding-dol-program-v2.jpg"
                  alt="Low-Income Families"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Low-Income Families</h3>
              <p className="text-slate-600 text-sm">100% free training through WIOA and WRG funding</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/hero/hero-skilled-trades.jpg"
                  alt="Veterans"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Veterans</h3>
              <p className="text-slate-600 text-sm">Career transition support and skills training</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/hero/hero-tech-careers.jpg"
                  alt="Career Changers"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-slate-600 text-sm">New skills for new opportunities at any age</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS OVERVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Programs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              20+ career training programs across high-demand industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link href="/programs/healthcare" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-healthcare.jpg" alt="Healthcare" fill className="object-cover object-center group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900">Healthcare</h3>
                  <p className="text-slate-500 text-xs">CNA, MA, Phlebotomy</p>
                </div>
              </div>
            </Link>
            <Link href="/programs/skilled-trades" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-skilled-trades.jpg" alt="Skilled Trades" fill className="object-cover object-center group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900">Skilled Trades</h3>
                  <p className="text-slate-500 text-xs">HVAC, Electrical, Welding</p>
                </div>
              </div>
            </Link>
            <Link href="/programs/technology" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/hero/hero-tech-careers.jpg" alt="Technology" fill className="object-cover object-center group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900">Technology</h3>
                  <p className="text-slate-500 text-xs">IT Support, Cybersecurity</p>
                </div>
              </div>
            </Link>
            <Link href="/programs/cdl" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/cdl-vibrant.jpg" alt="CDL" fill className="object-cover object-center group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900">CDL</h3>
                  <p className="text-slate-500 text-xs">Commercial Driving</p>
                </div>
              </div>
            </Link>
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image src="/images/barber-vibrant.jpg" alt="Beauty" fill className="object-cover object-center group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900">Beauty</h3>
                  <p className="text-slate-500 text-xs">Barber, Cosmetology</p>
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

      {/* IMPACT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Impact</h2>
              <p className="text-lg text-slate-700 mb-4">
                Elizabeth's holistic approach recognizes that career success requires more than 
                skills training—it requires wraparound support, trauma-informed care, and genuine 
                human connection.
              </p>
              <p className="text-lg text-slate-700 mb-8">
                Our impact is measured not just in credentials earned or jobs secured, but in 
                <strong> lives transformed</strong>, <strong>families stabilized</strong>, and 
                <strong> communities strengthened</strong>.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-black text-blue-600">500+</div>
                  <div className="text-slate-700 font-medium">Graduates</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-black text-green-600">85%</div>
                  <div className="text-slate-700 font-medium">Job Placement</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-black text-purple-600">20+</div>
                  <div className="text-slate-700 font-medium">Programs</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <div className="text-5xl font-black text-orange-600">100%</div>
                  <div className="text-slate-700 font-medium">Free for Eligible</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pexels/success-team.jpg"
                alt="Success stories"
                fill
                className="object-cover object-center"
              />
            </div>
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
