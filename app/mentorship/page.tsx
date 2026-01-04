import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Lightbulb,
  Target,
  TrendingUp,
  MessageCircle,
  Award,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.org/mentorship',
  },
  title: 'Mentorship Program | Elevate For Humanity',
  description:
    'Connect with industry professionals for guidance, support, and career development. Our mentorship program pairs you with experienced mentors in your field.',
};

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Mentorship Program
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8">
              Connect with experienced industry professionals who will guide you
              through your career journey
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Join the Program
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Mentorship */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-black mb-6">
              What is Our Mentorship Program?
            </h2>
            <p className="text-xl text-black">
              Our mentorship program connects students and graduates with
              experienced professionals in their field. Mentors provide
              guidance, share industry insights, and help mentees navigate their
              career paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-indigo-600 rounded-xl p-8">
              <Lightbulb className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Career Guidance
              </h3>
              <p className="text-black">
                Get personalized advice on career decisions, job opportunities,
                and professional development.
              </p>
            </div>

            <div className="bg-white border-2 border-purple-600 rounded-xl p-8">
              <Target className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Goal Setting
              </h3>
              <p className="text-black">
                Work with your mentor to set realistic career goals and create
                actionable plans to achieve them.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-600 rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Skill Development
              </h3>
              <p className="text-black">
                Learn industry-specific skills and best practices from someone
                who's been there.
              </p>
            </div>

            <div className="bg-white border-2 border-green-600 rounded-xl p-8">
              <MessageCircle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Networking</h3>
              <p className="text-black">
                Expand your professional network through your mentor's
                connections and industry contacts.
              </p>
            </div>

            <div className="bg-white border-2 border-orange-600 rounded-xl p-8">
              <Award className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Industry Insights
              </h3>
              <p className="text-black">
                Gain insider knowledge about your industry, trends, and
                opportunities.
              </p>
            </div>

            <div className="bg-white border-2 border-teal-600 rounded-xl p-8">
              <Users className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Ongoing Support
              </h3>
              <p className="text-black">
                Build a lasting professional relationship that extends beyond
                your training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            How the Program Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Apply to the Program
                </h3>
                <p className="text-black">
                  Complete your application and tell us about your career goals
                  and interests.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Get Matched with a Mentor
                </h3>
                <p className="text-black">
                  We'll pair you with an experienced professional in your field
                  based on your goals and interests.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Meet Regularly
                </h3>
                <p className="text-black">
                  Schedule monthly meetings (virtual or in-person) to discuss
                  your progress and challenges.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Set and Achieve Goals
                </h3>
                <p className="text-black">
                  Work together to set career goals and create action plans to
                  achieve them.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Build Your Network
                </h3>
                <p className="text-black">
                  Leverage your mentor's connections and expand your
                  professional network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Profiles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-6 text-center">
            Our Mentors
          </h2>
          <p className="text-xl text-black text-center mb-12 max-w-3xl mx-auto">
            Industry professionals with years of experience who are passionate
            about helping others succeed
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-black mb-1">Healthcare</h3>
              <p className="text-sm text-black">25+ Mentors</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-black mb-1">Skilled Trades</h3>
              <p className="text-sm text-black">30+ Mentors</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-black mb-1">Technology</h3>
              <p className="text-sm text-black">20+ Mentors</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="font-bold text-black mb-1">Business</h3>
              <p className="text-sm text-black">15+ Mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Program Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-black mb-2">100% Free</h3>
              <p className="text-black">
                No cost to participate. All mentorship services are provided at
                no charge.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Flexible Schedule
              </h3>
              <p className="text-black">
                Meet with your mentor on a schedule that works for both of you.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Virtual or In-Person
              </h3>
              <p className="text-black">
                Choose to meet virtually via video call or in-person at our
                locations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Long-Term Relationships
              </h3>
              <p className="text-black">
                Build lasting professional relationships that extend beyond the
                program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Find Your Mentor?
          </h2>
          <p className="text-xl text-white mb-8">
            Apply today and get matched with an experienced professional in your
            field.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now - It's Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Mentorship
                </h2>
                <p className="text-gray-700 mb-6">
                  Explore Mentorship and discover opportunities for career
                  growth and development.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>100% free training programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Industry-standard certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-brand-green-600 mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Career support and job placement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/artlist/hero-training-2.jpg"
                  alt="Mentorship"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Learn</h3>
                <p className="text-gray-600">
                  Access quality training programs
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Certify</h3>
                <p className="text-gray-600">Earn industry certifications</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Work</h3>
                <p className="text-gray-600">Get hired in your field</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
