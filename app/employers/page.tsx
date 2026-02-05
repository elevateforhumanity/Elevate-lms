import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  Users,
  Award,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Building2,
} from 'lucide-react';
import PageAvatar from '@/components/PageAvatar';

export const metadata: Metadata = {
  title: 'For Employers | Elevate for Humanity',
  description:
    'Hire trained, certified candidates ready to work. Build apprenticeships, access talent pipelines, and grow your workforce.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/employers',
  },
};

export default function EmployersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'For Employers' }]} />
        </div>
      </div>

      {/* Hero with Image */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <Image
          src="/images/business/handshake-1.jpg"
          alt="Partner with Elevate for Humanity"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Building2 className="w-4 h-4" />
              For Employers
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Hire Trained, Certified Candidates
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Access a pipeline of job-ready talent who have completed hands-on training 
              and earned industry credentials. No recruiting fees. No guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=employer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:317-314-3757"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/avatars/orientation-guide.mp4" 
        title="Why Smart Employers Partner With Us"
        highlights={[
          "Access pre-screened, trained candidates at zero cost",
          "Reduce hiring time from weeks to days",
          "Get workers with verified industry certifications",
          "Lower turnover with motivated, career-focused employees",
          "Tap into OJT funding to offset training costs",
          "Build your talent pipeline for future growth"
        ]}
      />

      {/* Quick Links */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/hire-graduates" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              Hire Graduates
            </Link>
            <Link href="/ojt-and-funding" className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              OJT & Funding
            </Link>
            <Link href="/workforce-partners" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              Workforce Partners
            </Link>
            <Link href="/programs" className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            The Hiring Problem You Face
          </h2>
          <p className="text-center text-slate-300 mb-12 max-w-3xl mx-auto text-lg">
            Finding qualified workers is harder than ever. High turnover, skills gaps, and lengthy 
            recruiting cycles cost you time and money.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '45%',
                label: 'of employers struggle to find qualified candidates',
              },
              {
                stat: '$4,700',
                label: 'average cost per hire in recruiting and onboarding',
              },
              {
                stat: '42 days',
                label: 'average time to fill an open position',
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-5xl font-black text-orange-400 mb-2">{item.stat}</div>
                <p className="text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Partner With Elevate for Humanity
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            We eliminate your hiring headaches by delivering trained, certified, job-ready 
            candidates directly to you—at no cost.
          </p>
          
          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <DollarSign className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Zero Recruiting Costs</h3>
              <p className="text-gray-700 mb-4">
                No placement fees. No recruiting agency costs. No job board subscriptions. 
                We connect you with qualified candidates completely free.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  No placement fees ever
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  No subscription costs
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  No hidden charges
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pre-Trained & Certified</h3>
              <p className="text-gray-700 mb-4">
                Every candidate has completed hands-on training and earned industry-recognized 
                credentials. They arrive ready to work, not ready to learn.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Industry certifications verified
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Hands-on training completed
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Soft skills development included
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Faster Time-to-Productivity</h3>
              <p className="text-gray-700 mb-4">
                Skip the weeks of basic training. Our candidates have already mastered 
                fundamentals and can contribute from day one.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Reduce onboarding time by 50%+
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Immediate productivity
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Lower training costs
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Motivated, Committed Workers</h3>
              <p className="text-gray-700 mb-4">
                Our candidates invested their time in training because they want careers, 
                not just jobs. They show up ready to prove themselves.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Higher retention rates
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Strong work ethic
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Career-focused mindset
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
            <div className="bg-gray-900 text-white p-6">
              <h3 className="text-xl font-bold text-center">Traditional Hiring vs. Elevate Partnership</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-900 font-semibold">Factor</th>
                    <th className="px-6 py-4 text-center text-gray-900 font-semibold">Traditional Hiring</th>
                    <th className="px-6 py-4 text-center text-orange-600 font-semibold">With Elevate</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Recruiting Cost</td>
                    <td className="px-6 py-4 text-center text-gray-500">$3,000 - $10,000+</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">$0</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Time to Fill Position</td>
                    <td className="px-6 py-4 text-center text-gray-500">30-60 days</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">1-2 weeks</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Training Required</td>
                    <td className="px-6 py-4 text-center text-gray-500">Extensive</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Minimal</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Skills Verified</td>
                    <td className="px-6 py-4 text-center text-gray-500">Resume only</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Certified & Tested</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Candidate Commitment</td>
                    <td className="px-6 py-4 text-center text-gray-500">Unknown</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Proven (completed training)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Tell Us Your Needs',
                description: 'Share your hiring requirements, timeline, and the skills you need.',
              },
              {
                step: 2,
                title: 'We Match Candidates',
                description: 'We connect you with trained candidates who fit your criteria.',
              },
              {
                step: 3,
                title: 'You Hire',
                description: 'Interview and hire candidates directly. No middleman fees.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apprenticeship Option */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Building2 className="w-12 h-12 text-orange-400 mb-4" />
                <h2 className="text-3xl font-bold mb-4">
                  Host an Apprentice
                </h2>
                <p className="text-gray-300 mb-6">
                  Become a host site for our barber apprenticeship program. Train the next 
                  generation while building your team. Apprentices complete 1,500 hours of 
                  supervised training at your shop.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Train talent to your standards',
                    'Build loyalty before they are licensed',
                    'Contribute to the profession',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?type=host-shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
                >
                  Become a Host Shop
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Apprenticeship Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span>1,500 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credential</span>
                      <span>State Barber License</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Your Role</span>
                      <span>Supervise & Train</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost to You</span>
                      <span>None</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our training programs prepare candidates for careers in these high-demand fields.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Barbering & Cosmetology',
              'Healthcare (CNA, Phlebotomy)',
              'Skilled Trades',
              'Professional Services',
            ].map((industry) => (
              <div key={industry} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="font-medium text-gray-900">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Your Team?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Contact us to discuss your hiring needs and access our talent pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=employer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Us
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
