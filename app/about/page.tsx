import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Users, Award, Heart, ArrowRight, Shield, Building, GraduationCap, Briefcase, MapPin, Target } from 'lucide-react';
import PageAvatar from '@/components/PageAvatar';
import { ImageHero } from '@/components/ImageHero';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity mission to transform lives through career-focused education and workforce development in Indiana.',
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

      {/* HERO - Image only */}
      <ImageHero src="/images/heroes-hq/about-hero.jpg" alt="About Elevate for Humanity" />

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/about-mission.mp4" 
        title="About Elevate" 
      />

      {/* WHO WE ARE */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
          <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
            <p>
              <strong>Elevate for Humanity</strong> is a nonprofit workforce development organization 
              based in Indianapolis, Indiana. We provide career training, industry certifications, 
              and support services to individuals facing barriers to employment—including 
              justice-involved individuals, low-income families, veterans, and anyone seeking 
              a pathway to economic stability.
            </p>
            <p>
              As a <strong>DOL Registered Apprenticeship Sponsor</strong> and <strong>WIOA-approved 
              training provider</strong>, we connect students with funding that makes training 
              100% free for eligible participants. Our programs lead to industry-recognized 
              certifications and direct employment opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pexels/training-team.jpg"
                alt="Training session"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                To create pathways out of poverty and into prosperity by providing accessible, 
                high-quality workforce training and support services to those who need it most.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li>Remove financial barriers to career training</li>
                <li>Provide industry-recognized certifications</li>
                <li>Connect graduates with employment</li>
                <li>Offer wraparound support for lasting success</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Who We Serve</h2>
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

      {/* OUR VALUES */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Mission-Driven</h3>
              <p className="text-slate-400 text-sm">Every decision serves our mission to create pathways out of poverty.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Student-First</h3>
              <p className="text-slate-400 text-sm">Your success is our success. We provide support at every step.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Excellence</h3>
              <p className="text-slate-400 text-sm">Industry-recognized training that employers actually want.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">Community</h3>
              <p className="text-slate-400 text-sm">We believe in second chances and the power of community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Credentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="font-bold text-slate-900">DOL Registered</div>
              <div className="text-slate-600 text-sm">Apprenticeship Sponsor</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Award className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <div className="font-bold text-slate-900">WIOA Approved</div>
              <div className="text-slate-600 text-sm">Training Provider</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Building className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <div className="font-bold text-slate-900">State Certified</div>
              <div className="text-slate-600 text-sm">Indiana DWD & DOE</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <div className="font-bold text-slate-900">JRI Approved</div>
              <div className="text-slate-600 text-sm">Justice Programs</div>
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
