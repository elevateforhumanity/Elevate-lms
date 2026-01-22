import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Users, Award, Heart, ArrowRight, CheckCircle, Shield, Building, GraduationCap } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity mission to transform lives through career-focused education and workforce development in Indiana. DOL Registered Apprenticeship Sponsor, WIOA approved.',
  keywords: ['about elevate', 'mission', 'workforce training', 'career education', 'job placement', 'accredited', 'WIOA', 'DOL', 'apprenticeship'],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const credentials = [
  { title: 'DOL Registered', desc: 'Apprenticeship Sponsor', icon: Shield },
  { title: 'WIOA Approved', desc: 'Training Provider', icon: CheckCircle },
  { title: 'State Certified', desc: 'Indiana DWD & DOE', icon: Building },
  { title: 'JRI Approved', desc: 'Justice Programs', icon: Heart },
];

const stats = [
  { value: '500+', label: 'Graduates' },
  { value: '85%', label: 'Job Placement' },
  { value: '100%', label: 'Free for Eligible' },
  { value: '20+', label: 'Programs' },
];

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'Pathways out of poverty' },
  { icon: Users, title: 'Student-First', desc: 'Your success is our goal' },
  { icon: Award, title: 'Excellence', desc: 'Industry-recognized training' },
  { icon: Heart, title: 'Community', desc: 'Support at every step' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Full width image */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <Image
          src="/images/pexels/success-team.jpg"
          alt="Elevate for Humanity Team"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            About Elevate
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Workforce training that connects funding, employers, and credentials to change lives.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS - Visual badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((cred, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-4 text-center">
                <cred.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-slate-900 text-sm">{cred.title}</div>
                <div className="text-slate-600 text-xs">{cred.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION - Image + Short text */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pexels/classroom-training.jpg"
                alt="Training in action"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-700 mb-6">
                Creating pathways out of poverty and into prosperity. We serve justice-involved 
                individuals, low-income families, and barrier-facing populations with dignity 
                and measurable results.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Workforce Training</span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Apprenticeships</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Career Services</span>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Support Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Icon grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER - Image + Short bio */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/team/elizabeth-greene.jpg"
                  alt="Elizabeth Greene - Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold text-white mb-4">Our Founder</h2>
              <p className="text-lg text-slate-300 mb-6">
                Elizabeth Greene founded Elevate for Humanity with a vision to create Indiana&apos;s 
                most innovative workforce development organization—one that truly changes lives.
              </p>
              <Link 
                href="/team" 
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
              >
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Visual steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply</h3>
              <p className="text-slate-600">Quick online application. Check your eligibility for free training.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Train</h3>
              <p className="text-slate-600">Hands-on learning with industry certifications in 8-16 weeks.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600">Job placement assistance and career support included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Training is 100% free for eligible Indiana residents.
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
