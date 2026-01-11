'use client';

import Link from 'next/link';
import {
  DollarSign,
  Users,
  FileText,
  Building2,
  Handshake,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export default function FundingPage() {
  const fundingResources = [
    {
      title: 'WIOA Eligibility',
      description:
        'Check if you qualify for Workforce Innovation and Opportunity Act funding. Most adults qualify for free training.',
      href: '/wioa-eligibility',
      icon: CheckCircle,
      color: 'green',
      category: 'Eligibility',
    },
    {
      title: 'Financial Aid Info',
      description:
        'Learn about federal workforce funding programs. We do not offer traditional financial aid or student loans.',
      href: '/financial-aid',
      icon: FileText,
      color: 'blue',
      category: 'Information',
    },
    {
      title: 'Grants',
      description:
        'Federal and state grant programs that cover 100% of training costs with no repayment required.',
      href: '/grants',
      icon: DollarSign,
      color: 'emerald',
      category: 'Funding',
    },
    {
      title: 'JRI Funding',
      description:
        'Justice Reinvestment Initiative funding for individuals with criminal justice involvement.',
      href: '/jri',
      icon: Shield,
      color: 'purple',
      category: 'Funding',
    },
    {
      title: 'SNAP E&T',
      description:
        'Supplemental Nutrition Assistance Program Employment & Training funding for SNAP recipients.',
      href: '/snap-et-partner',
      icon: Users,
      color: 'orange',
      category: 'Funding',
    },
    {
      title: 'FSSA Partnership',
      description:
        'Family and Social Services Administration partnership programs and funding opportunities.',
      href: '/fssa-partnership-request',
      icon: Handshake,
      color: 'pink',
      category: 'Partnerships',
    },
    {
      title: 'OJT & Funding',
      description:
        'On-the-Job Training programs with employer wage reimbursement and participant support.',
      href: '/ojt-and-funding',
      icon: Briefcase,
      color: 'indigo',
      category: 'Programs',
    },
    {
      title: 'Funding Impact',
      description:
        'See how federal funding transforms lives and communities through workforce development.',
      href: '/fundingimpact',
      icon: TrendingUp,
      color: 'cyan',
      category: 'Impact',
    },
    {
      title: 'Workforce Partners',
      description:
        'Our network of workforce development boards, agencies, and community partners.',
      href: '/workforce-partners',
      icon: Users,
      color: 'violet',
      category: 'Partnerships',
    },
    {
      title: 'WorkOne Partner Packet',
      description:
        'Information for WorkOne centers and workforce board partners.',
      href: '/workone-partner-packet',
      icon: FileText,
      color: 'rose',
      category: 'Resources',
    },
    {
      title: 'Partner Agencies',
      description:
        'Government agencies and community organizations we work with to serve students.',
      href: '/agencies',
      icon: Building2,
      color: 'amber',
      category: 'Partnerships',
    },
    {
      title: 'Government Programs',
      description:
        'Federal and state workforce programs that fund training at no cost to students.',
      href: '/government',
      icon: Shield,
      color: 'lime',
      category: 'Programs',
    },
    {
      title: 'Federal Compliance',
      description:
        'Our compliance with federal workforce development regulations and reporting requirements.',
      href: '/federal-compliance',
      icon: CheckCircle,
      color: 'teal',
      category: 'Compliance',
    },
    {
      title: 'Equal Opportunity',
      description:
        'Our commitment to equal opportunity and non-discrimination in all programs and services.',
      href: '/equal-opportunity',
      icon: Users,
      color: 'sky',
      category: 'Compliance',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Confirmation Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">
            100% Free Training
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl font-bold mb-8">
            No Tuition. No Student Debt. Ever.
          </p>

          {/* Description */}
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            All training is funded through federal workforce programs like WIOA,
            SNAP E&T, and JRI. You pay nothing. We handle all the paperwork.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">$0</div>
              <div className="text-sm text-green-100">Tuition Cost</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">100%</div>
              <div className="text-sm text-green-100">Funded</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-black mb-2">5,000+</div>
              <div className="text-sm text-green-100">Students Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Resources Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Explore Funding Resources
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Learn about federal funding programs, eligibility requirements,
              and partnership opportunities
            </p>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundingResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-green-500 hover:-translate-y-1 transform"
                >
                  {/* Category Badge */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
                    <span className="text-xs font-bold text-black uppercase tracking-wider">
                      {resource.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 bg-${resource.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-7 h-7 text-${resource.color}-600`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-green-600 transition-colors">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-black mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Apply CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-xl text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all uppercase"
            >
              <span>Apply for Free Training</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-black mt-4">
              Takes 5 minutes • No commitment required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-black mb-2">
            Questions about funding eligibility?
          </p>
          <p className="text-sm text-black">
            Contact us at{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="text-green-600 hover:underline font-semibold"
            >
              elevate4humanityedu@gmail.com
            </a>{' '}
            or call{' '}
            <a
              href="tel:+13173143757"
              className="text-green-600 hover:underline font-semibold"
            >
              (317) 314-3757
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
