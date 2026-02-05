'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Award, Clock, DollarSign, Briefcase, GraduationCap, Shield, Phone, Play } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Graduates Placed', icon: GraduationCap },
  { value: '$0', label: 'Tuition for Eligible', icon: DollarSign },
  { value: '8-16', label: 'Week Programs', icon: Clock },
  { value: '95%', label: 'Job Placement Rate', icon: Briefcase },
];

const programs = [
  { 
    title: 'Healthcare', 
    subtitle: 'CNA • Medical Assistant • Phlebotomy',
    image: '/images/artlist/variations/hero-training-1-bright.jpg',
    href: '/programs/healthcare',
    color: 'from-blue-600 to-cyan-500',
  },
  { 
    title: 'Skilled Trades', 
    subtitle: 'HVAC • Electrical • Welding',
    image: '/images/artlist/variations/hero-training-2-bright.jpg',
    href: '/programs/skilled-trades',
    color: 'from-orange-500 to-amber-400',
  },
  { 
    title: 'Technology', 
    subtitle: 'IT Support • Cybersecurity',
    image: '/images/artlist/variations/hero-training-3-bright.jpg',
    href: '/programs/technology',
    color: 'from-purple-600 to-pink-500',
  },
  { 
    title: 'CDL Training', 
    subtitle: 'Class A & B Licenses',
    image: '/images/artlist/variations/hero-training-4-bright.jpg',
    href: '/programs/cdl',
    color: 'from-green-600 to-emerald-500',
  },
];

const benefits = [
  { icon: DollarSign, title: 'Free Training Available', desc: 'Eligible participants pay $0 through WIOA funding' },
  { icon: Briefcase, title: 'Job Placement Support', desc: 'Resume help, interview prep, employer connections' },
  { icon: Clock, title: 'Fast-Track Programs', desc: 'Most programs complete in 8-16 weeks' },
  { icon: Shield, title: 'Industry Certifications', desc: 'Earn credentials employers actually want' },
];

const partners = [
  { name: 'US DOL', logo: '/images/partners/usdol.webp' },
  { name: 'WorkOne', logo: '/images/partners/workone.webp' },
  { name: 'Indiana DWD', logo: '/images/partners/dwd.webp' },
  { name: 'Next Level Jobs', logo: '/images/partners/nextleveljobs.webp' },
];

export default function HomePage() {
  const [activeProgram, setActiveProgram] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Full Width, Bright, Compelling */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/artlist/variations/hero-training-1-bright.jpg"
            alt="Career Training"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              Now Enrolling — Limited Spots Available
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Launch Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                New Career
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 mt-2">
                In Just 8-16 Weeks
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              <span className="text-yellow-400 font-bold">Free training</span> for eligible Indiana residents. 
              Get certified. Get hired. Get paid.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">WIOA Approved</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">Job Placement Included</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">Industry Certifications</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
              >
                Find Your Program
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/wioa-eligibility"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
              >
                Check If You Qualify Free
              </Link>
            </div>

            {/* Phone CTA */}
            <div className="mt-8 flex items-center gap-3 text-white/80">
              <Phone className="w-5 h-5" />
              <span>Questions? Call us: <a href="tel:3173143757" className="text-yellow-400 font-bold hover:underline">(317) 314-3757</a></span>
            </div>
          </div>
        </div>

        {/* Floating Stats Card */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-8 w-80">
          <div className="text-center mb-6">
            <div className="text-5xl font-black text-slate-900">$0</div>
            <div className="text-slate-600 font-medium">Tuition for Eligible Participants</div>
          </div>
          <div className="space-y-4">
            {[
              'Funded by WIOA & State Programs',
              'Books & Materials Included',
              'Job Placement Support',
              'Industry Certifications',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="mt-6 block w-full bg-slate-900 text-white text-center py-4 rounded-xl font-bold hover:bg-slate-800 transition"
          >
            Apply Now — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS - Interactive Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              CAREER TRAINING PROGRAMS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              High-demand careers with real job opportunities. Training that actually leads to employment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <Link
                key={i}
                href={program.href}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-black text-white mb-1">{program.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{program.subtitle}</p>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
                WHY ELEVATE?
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                We Don&apos;t Just Train You.
                <span className="block text-yellow-400">We Get You Hired.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Most training programs leave you with a certificate and a &quot;good luck.&quot; 
                We connect you directly with employers who are actively hiring.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{benefit.title}</h3>
                      <p className="text-slate-400 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/artlist/variations/hero-training-5-bright.jpg"
                  alt="Students in training"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating testimonial */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm mb-3">
                  &quot;I went from unemployed to making $22/hour in just 12 weeks. This program changed my life.&quot;
                </p>
                <div className="text-slate-900 font-bold text-sm">— Recent Graduate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              SIMPLE PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              From Application to Employment
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We guide you every step of the way. No confusion, no runaround.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Check Eligibility', desc: 'Quick 2-minute assessment to see if you qualify for free training', color: 'bg-blue-500' },
              { step: '02', title: 'Choose Program', desc: 'Pick from healthcare, trades, technology, or CDL training', color: 'bg-purple-500' },
              { step: '03', title: 'Complete Training', desc: 'Hands-on instruction with industry-certified instructors', color: 'bg-orange-500' },
              { step: '04', title: 'Get Hired', desc: 'We connect you with employers and support your job search', color: 'bg-green-500' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className={`${item.color} text-white text-4xl font-black rounded-2xl w-16 h-16 flex items-center justify-center mb-4`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-20 w-full h-0.5 bg-slate-200" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg shadow-green-500/30"
            >
              Check Your Eligibility Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS / TRUST */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-slate-500 font-medium">Approved & Funded By</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <span className="font-semibold text-slate-600">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Your New Career Starts Today
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-8">
            Don&apos;t wait. Classes fill up fast. Check your eligibility in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition shadow-2xl"
            >
              Apply Now — Free
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition border-2 border-white/30"
            >
              Browse Programs
            </Link>
          </div>
          <p className="mt-8 text-white/70">
            Or call us: <a href="tel:3173143757" className="text-white font-bold hover:underline">(317) 314-3757</a>
          </p>
        </div>
      </section>
    </div>
  );
}
