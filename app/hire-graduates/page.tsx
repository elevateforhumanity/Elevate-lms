import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Users, Award, Briefcase, DollarSign, Clock, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hire Graduates | Elevate for Humanity',
  description: 'Access trained, certified candidates ready to work. No recruiting fees. Build your workforce with job-ready graduates.',
};

export default function HireGraduatesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <Image
          src="/images/business/team-1.jpg"
          alt="Hire trained and certified graduates"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Users className="w-4 h-4" />
              For Employers
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Hire Job-Ready Graduates
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Access a pipeline of trained, certified candidates who have completed hands-on 
              training programs and earned industry-recognized credentials. No recruiting fees. 
              No guesswork. Just qualified workers ready to contribute from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=employer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Request Candidates
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Training Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/employers" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              For Employers
            </Link>
            <Link href="/ojt-and-funding" className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              OJT & Funding
            </Link>
            <Link href="/workforce-partners" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              Workforce Partners
            </Link>
            <Link href="/partners" className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why Hire Our Graduates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Hire Our Graduates?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our graduates come to you trained, certified, and ready to work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/business/professional-1.jpg"
                  alt="Industry certified candidates"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Certified</h3>
                <p className="text-gray-600">
                  All graduates earn industry-recognized certifications before completing their programs. 
                  They&apos;ve passed competency exams and demonstrated their skills.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="Hands-on training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-On Training</h3>
                <p className="text-gray-600">
                  Our programs emphasize practical, hands-on experience. Graduates have worked 
                  with real equipment and scenarios, not just textbooks.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/business/success-1.jpg"
                  alt="Job ready candidates"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Job Ready</h3>
                <p className="text-gray-600">
                  Graduates receive career coaching, resume building, and interview preparation. 
                  They arrive ready to contribute from day one.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/heroes/hero-state-funding.jpg"
                  alt="No recruiting fees"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Recruiting Fees</h3>
                <p className="text-gray-600">
                  Access our talent pipeline at no cost. We connect you with qualified candidates 
                  without the typical recruiting agency fees.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/business/handshake-1.jpg"
                  alt="OJT funding available"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">OJT Funding Available</h3>
                <p className="text-gray-600">
                  Hire through On-the-Job Training programs and receive wage reimbursement 
                  while you train new employees. We handle the paperwork.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/business/team-2.jpg"
                  alt="Ongoing support"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ongoing Support</h3>
                <p className="text-gray-600">
                  We stay connected with our graduates and employers. If issues arise, 
                  we&apos;re here to help with retention and additional training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Talent Pools */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Available Talent Pools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We train candidates in high-demand fields. Find the skills you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/programs/healthcare" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/healthcare/program-cna-training.jpg"
                  alt="Healthcare graduates"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Healthcare
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Healthcare Professionals
                </h3>
                <p className="text-gray-600 mb-4">
                  CNAs, Medical Assistants, Phlebotomists, Direct Support Professionals
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/programs/skilled-trades" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/trades/hero-program-hvac.jpg"
                  alt="Skilled trades graduates"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Skilled Trades
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Skilled Tradespeople
                </h3>
                <p className="text-gray-600 mb-4">
                  HVAC Technicians, Welders, Electricians, Plumbers
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/programs/technology" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/technology/hero-programs-technology.jpg"
                  alt="Technology graduates"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Technology
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  IT Professionals
                </h3>
                <p className="text-gray-600 mb-4">
                  IT Support Specialists, Cybersecurity Analysts
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/programs/cdl" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/trades/hero-program-cdl.jpg"
                  alt="CDL graduates"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Transportation
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  CDL Drivers
                </h3>
                <p className="text-gray-600 mb-4">
                  Class A CDL holders ready for local and OTR positions
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/programs/barber-apprenticeship" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/barber-hero.jpg"
                  alt="Barber apprentices"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Cosmetology
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Barbers & Cosmetologists
                </h3>
                <p className="text-gray-600 mb-4">
                  Licensed barbers, cosmetologists, estheticians
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/programs/business-financial" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-40">
                <Image
                  src="/images/business/tax-prep-certification.jpg"
                  alt="Business graduates"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Business
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Business Professionals
                </h3>
                <p className="text-gray-600 mb-4">
                  Tax preparers, bookkeepers, office administrators
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Candidates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How to Hire Our Graduates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple process to connect with qualified candidates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/business/professional-2.jpg"
                  alt="Tell us your needs"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tell Us Your Needs</h3>
              <p className="text-gray-600">
                Contact us with your hiring requirements - positions, skills needed, 
                timeline, and any specific qualifications.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="We match candidates"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">We Match Candidates</h3>
              <p className="text-gray-600">
                We identify graduates whose skills and career goals align with your 
                positions and send you pre-screened candidates.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/images/business/handshake-1.jpg"
                  alt="Interview and hire"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interview & Hire</h3>
              <p className="text-gray-600">
                Interview candidates and make your hiring decision. We can help 
                facilitate OJT funding if you qualify.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Build Your Workforce?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your hiring needs and access our talent pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=employer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request Candidates
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
