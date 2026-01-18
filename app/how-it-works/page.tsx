import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Phone,
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From application to career, we guide you through every step. 
            No confusing paperwork. No hidden requirements.
          </p>
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

      {/* Programs */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer training in high-demand fields with clear paths to employment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Barber Apprenticeship',
                duration: '1,500 hours',
                outcome: 'State Barber License',
                href: '/programs/barber-apprenticeship',
              },
              {
                name: 'CNA Training',
                duration: '4-6 weeks',
                outcome: 'CNA Certification',
                href: '/programs/cna',
              },
              {
                name: 'Phlebotomy',
                duration: '4-8 weeks',
                outcome: 'Phlebotomy Certification',
                href: '/programs/phlebotomy',
              },
            ].map((program) => (
              <Link
                key={program.name}
                href={program.href}
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600">
                  {program.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">Duration: {program.duration}</p>
                <p className="text-sm text-gray-500">Outcome: {program.outcome}</p>
                <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              View all programs <ArrowRight className="w-4 h-4" />
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
