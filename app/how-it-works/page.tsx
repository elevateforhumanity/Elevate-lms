import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Phone,
  DollarSign,
  Award,
  Heart,
  Wrench,
  Monitor,
  Truck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | Elevate for Humanity',
  description:
    'Learn how Elevate for Humanity helps you get trained, certified, and hired. Simple steps from application to career.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Image */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Career training in action"
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              From application to career, we guide you through every step. Our process is designed 
              to be simple, supportive, and focused on getting you into a rewarding career as quickly as possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/wioa-eligibility"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: FileText,
                title: 'Apply',
                description: 'Complete a simple online application or call us. We review your goals and eligibility.',
                time: '5 minutes',
              },
              {
                step: 2,
                icon: Users,
                title: 'Get Matched',
                description: 'We connect you with the right training program and discuss payment options that work for you.',
                time: '5-10 days',
              },
              {
                step: 3,
                icon: GraduationCap,
                title: 'Train',
                description: 'Complete your training with hands-on instruction. We track your progress and support you throughout.',
                time: 'Varies by program',
              },
              {
                step: 4,
                icon: Briefcase,
                title: 'Get Certified & Work',
                description: 'Earn your credential and connect with employers. We help with job placement and career support.',
                time: 'Ongoing',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-gray-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-sm text-gray-400">{item.time}</p>
                </div>
                {item.step < 4 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real Training',
                points: [
                  'Hands-on instruction from licensed professionals',
                  'Industry-recognized credentials',
                  'Practical skills you can use immediately',
                ],
              },
              {
                title: 'Clear Path',
                points: [
                  'No confusing requirements',
                  'Step-by-step guidance',
                  'Regular progress updates',
                ],
              },
              {
                title: 'Career Support',
                points: [
                  'Job placement assistance',
                  'Employer connections',
                  'Ongoing career guidance',
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links - Key Pages */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Explore Our Resources
          </h2>
          <p className="text-xl text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to know about getting started with free career training
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/wioa-eligibility"
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors">
                WIOA Eligibility
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Find out if you qualify for free training through the Workforce Innovation and Opportunity Act.
              </p>
              <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm">
                Check Now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/funding"
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                Funding Options
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Learn about WIOA, grants, OJT, and other ways to get your training paid for.
              </p>
              <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
                View Options <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/programs"
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-600 transition-colors">
                Training Programs
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Explore healthcare, skilled trades, technology, CDL, and more career paths.
              </p>
              <span className="inline-flex items-center gap-1 text-purple-600 font-semibold text-sm">
                Browse Programs <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/faq"
              className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">
                FAQ
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Get answers to common questions about enrollment, costs, and what to expect.
              </p>
              <span className="inline-flex items-center gap-1 text-orange-600 font-semibold text-sm">
                Read FAQ <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4">
            Career Training Programs
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer training in high-demand fields with clear paths to employment. 
            Most programs can be completed in weeks, not years.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/programs/healthcare"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/healthcare/program-cna-training.jpg"
                  alt="Healthcare training"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Heart className="w-4 h-4" /> Healthcare
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  Healthcare Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  CNA, Medical Assistant, Phlebotomy, Direct Support Professional, and more.
                </p>
                <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                  Explore Healthcare <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs/skilled-trades"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/trades/hero-program-hvac.jpg"
                  alt="Skilled trades training"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Wrench className="w-4 h-4" /> Trades
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Skilled Trades
                </h3>
                <p className="text-gray-600 mb-4">
                  HVAC, Welding, Electrical, Plumbing - hands-on careers that pay well.
                </p>
                <span className="inline-flex items-center gap-1 text-orange-600 font-semibold">
                  Explore Trades <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs/technology"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/technology/hero-programs-technology.jpg"
                  alt="Technology training"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Monitor className="w-4 h-4" /> Tech
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Technology
                </h3>
                <p className="text-gray-600 mb-4">
                  IT Support, Cybersecurity - enter the growing tech industry.
                </p>
                <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
                  Explore Tech <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs/cdl"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/trades/hero-program-cdl.jpg"
                  alt="CDL training"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Truck className="w-4 h-4" /> CDL
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  CDL & Transportation
                </h3>
                <p className="text-gray-600 mb-4">
                  Get your Commercial Driver&apos;s License in 3-6 weeks.
                </p>
                <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                  Explore CDL <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs/barber-apprenticeship"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/barber-hero.jpg"
                  alt="Barber apprenticeship"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Award className="w-4 h-4" /> Apprenticeship
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Apprenticeships
                </h3>
                <p className="text-gray-600 mb-4">
                  Barber, Cosmetology, Esthetician - earn while you learn.
                </p>
                <span className="inline-flex items-center gap-1 text-purple-600 font-semibold">
                  Explore Apprenticeships <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs"
              className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-colors group"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <ArrowRight className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                View All Programs
              </h3>
              <p className="text-gray-600">
                See our complete list of training programs and career paths.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How much does training cost?',
                a: 'Costs vary by program. Some programs have funding available, others are self-pay with payment plans. We discuss all options after you apply.',
              },
              {
                q: 'How long does the process take?',
                a: 'After you apply, we typically respond within 5-10 business days. Training duration depends on the program you choose.',
              },
              {
                q: 'Do I need experience?',
                a: 'Most programs are designed for beginners. We assess your readiness during the application process.',
              },
              {
                q: 'Will I get a job after training?',
                a: 'We provide job placement assistance and employer connections. While we cannot guarantee employment, our programs are designed to prepare you for in-demand careers.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply online or call us to discuss your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-700 text-white font-semibold rounded-full hover:bg-orange-800 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
