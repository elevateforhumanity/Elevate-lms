import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Clock,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training | Elevate For Humanity',
  description:
    '100% free training programs. No student debt. Get certified and hired.',
};

export default function StudentsPage() {
  const benefits = [
    '100% Free Training',
    'No Student Debt',
    'Get Paid While You Learn',
    'Job Placement Assistance',
    'Industry Certifications',
    'Flexible Schedules',
  ];

  const programs = [
    {
      title: 'Barber Apprenticeship',
      duration: '15-17 months',
      pay: '$10/hr + tips',
      href: '/programs/barber-apprenticeship',
    },
    {
      title: 'HVAC Technician',
      duration: '6-12 months',
      pay: 'Varies',
      href: '/programs/hvac-technician',
    },
    {
      title: 'CNA Healthcare',
      duration: '4-6 weeks',
      pay: 'Varies',
      href: '/programs/cna',
    },
    {
      title: 'CDL Training',
      duration: '3-4 weeks',
      pay: 'Varies',
      href: '/programs/cdl',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Students in training"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">100% Free Training</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Start Your Career Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            No student debt. Get certified. Get hired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition text-lg"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition text-lg"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 bg-white p-6 rounded-lg border border-slate-200"
              >
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="font-semibold text-slate-900">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Popular Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program: any) => (
              <Link
                key={program.href}
                href={program.href}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600">
                  {program.title}
                </h3>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{program.pay}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All 20 Programs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                desc: 'Fill out a simple application',
              },
              {
                step: '2',
                title: 'Get Approved',
                desc: 'We help with funding approval',
              },
              {
                step: '3',
                title: 'Start Training',
                desc: 'Begin your program',
              },
              {
                step: '4',
                title: 'Get Hired',
                desc: 'Job placement assistance',
              },
            ].map((item: any) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-900   text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl mb-8">
            Apply now and start your career journey today.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-lg"
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
