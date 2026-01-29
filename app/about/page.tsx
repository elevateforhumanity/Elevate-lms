import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Users, Award, Heart, ArrowRight, Shield, Building, Target, CheckCircle, Briefcase, GraduationCap } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Our Story | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity - a nonprofit workforce development organization providing free career training to underserved communities in Indianapolis, Indiana.',
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
            How Elevate for Humanity is changing lives through free workforce training in Indiana.
          </p>
        </div>
      </section>

      {/* THE STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How It All Started</h2>
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <p>
              <strong>Elevate for Humanity</strong> was founded with a simple but powerful belief: 
              everyone deserves access to career training, regardless of their financial situation, 
              background, or past circumstances.
            </p>
            <p>
              Based in Indianapolis, Indiana, we saw too many people stuck in cycles of poverty—not 
              because they lacked ambition or ability, but because they couldn't afford training programs 
              or didn't know funding existed to help them.
            </p>
            <p>
              We built Elevate to bridge that gap. By connecting individuals with federal and state 
              workforce funding (WIOA, JRI, WRG), we make career training <strong>100% free</strong> for 
              eligible participants. No tuition. No fees. No debt.
            </p>
            <p>
              Today, we're proud to be a <strong>DOL Registered Apprenticeship Sponsor</strong> and 
              <strong> WIOA-approved training provider</strong>, helping hundreds of Indiana residents 
              launch new careers in healthcare, skilled trades, technology, and more.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Training</h3>
              <p className="text-slate-600">
                Industry-recognized certifications in healthcare, skilled trades, technology, 
                CDL, barbering, and more. Programs range from 4-16 weeks.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Support Services</h3>
              <p className="text-slate-600">
                We help with transportation, childcare, work supplies, and other barriers 
                that might prevent you from completing training.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Job Placement</h3>
              <p className="text-slate-600">
                Resume help, interview prep, and direct connections to employers actively 
                hiring in your field. We support you until you're employed.
              </p>
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
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Justice-Involved</h3>
              <p className="text-slate-600 text-sm">Second chance training through JRI funding</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Low-Income Families</h3>
              <p className="text-slate-600 text-sm">Free training through WIOA funding</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Veterans</h3>
              <p className="text-slate-600 text-sm">Career transition support and training</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 text-center">
              <Target className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-slate-600 text-sm">New skills for new opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Impact</h2>
              <p className="text-lg text-slate-700 mb-6">
                Since our founding, we've helped hundreds of Indiana residents gain the skills 
                and certifications they need to build sustainable careers and support their families.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-black text-blue-600">500+</div>
                  <div className="text-slate-600">Graduates</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-black text-green-600">85%</div>
                  <div className="text-slate-600">Job Placement</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-black text-purple-600">20+</div>
                  <div className="text-slate-600">Programs</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-black text-orange-600">100%</div>
                  <div className="text-slate-600">Free for Eligible</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pexels/training-team.jpg"
                alt="Training session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Credentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="font-bold text-white">DOL Registered</div>
              <div className="text-slate-400 text-sm">Apprenticeship Sponsor</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <div className="font-bold text-white">WIOA Approved</div>
              <div className="text-slate-400 text-sm">Training Provider</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <Building className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="font-bold text-white">State Certified</div>
              <div className="text-slate-400 text-sm">Indiana DWD & DOE</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <div className="font-bold text-white">JRI Approved</div>
              <div className="text-slate-400 text-sm">Justice Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Mission-Driven</h3>
              <p className="text-slate-600 text-sm">Every decision serves our mission to create pathways out of poverty.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Student-First</h3>
              <p className="text-slate-600 text-sm">Your success is our success. We provide support at every step.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Excellence</h3>
              <p className="text-slate-600 text-sm">Industry-recognized training that employers actually want.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Community</h3>
              <p className="text-slate-600 text-sm">We believe in second chances and the power of community.</p>
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
