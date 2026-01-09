import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';
import { Briefcase, FileText, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/career-services',
  },
  title: 'Career Services | Elevate For Humanity',
  description:
    'Resume building, interview preparation, job placement assistance, and ongoing career support. We help you succeed from training through employment.',
};

export default async function CareerServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="💼 753 Students Placed in Jobs Last Year"
        headline="Get Hired in"
        accentText="47 Days"
        subheadline="Resume → Interview → Job Offer → Career"
        description="Average time from graduation to first job: 47 days. We placed 753 graduates in 2025. Average starting wage: $18.50/hr. Resume writing, interview prep, job matching, and ongoing support included FREE with your training."
        imageSrc="/images/business/professional-2.jpg"
        imageAlt="Career Services"
        primaryCTA={{ text: "Get Career Help Now", href: "/apply" }}
        secondaryCTA={{ text: "See Success Stories", href: "/success" }}
        features={[
          "753 job placements in 2025 • 47 days average time to hire",
          "127 employer partners actively hiring our graduates",
          "Resume, interview prep, job matching - all FREE"
        ]}
        imageOnRight={false}
      />

      <ModernFeatures
        title="From Resume to Paycheck"
        subtitle="What we do to get you hired"
        features={[
          {
            icon: FileText,
            title: "Professional Resume",
            description: "We write your resume. ATS-optimized format. Highlights your new credentials. Employers actually read it. Done in 1 session.",
            color: "blue"
          },
          {
            icon: Users,
            title: "Interview Coaching",
            description: "Mock interviews. Common questions. What to wear. How to answer. Practice until you're confident. Most students do 2-3 sessions.",
            color: "green"
          },
          {
            icon: Briefcase,
            title: "Job Matching",
            description: "127 employers hiring our grads. We connect you directly. No Indeed. No LinkedIn. Direct introductions to hiring managers.",
            color: "orange"
          },
          {
            icon: TrendingUp,
            title: "Salary Negotiation",
            description: "Don't leave money on the table. We coach you on negotiating offers. Average increase: $1.50/hr. That's $3,120/year.",
            color: "purple"
          },
          {
            icon: Award,
            title: "90-Day Follow-Up",
            description: "We check in after you start. Problems? We help. Want to advance? We coach. You're not alone after graduation.",
            color: "teal"
          },
          {
            icon: CheckCircle,
            title: "Lifetime Access",
            description: "Need help 2 years later? Call us. Changing careers? We're here. Once a student, always supported. No expiration.",
            color: "red"
          }
        ]}
        columns={3}
      />

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">
              Our Career Services
            </h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              From training to employment, we support you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resume Building */}
            <Link
              href="/career-services/resume-building"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-blue-600 transition-all group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition-colors">
                <svg
                  className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-blue-600 transition-colors">
                Resume Building →
              </h3>
              <p className="text-black text-center">
                Professional resume writing and review services to showcase your
                skills
              </p>
            </Link>

            {/* Interview Prep */}
            <Link
              href="/career-services/interview-prep"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-green-600 transition-all group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-green-600 transition-colors">
                <svg
                  className="w-8 h-8 text-green-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-green-600 transition-colors">
                Interview Preparation →
              </h3>
              <p className="text-black text-center">
                Mock interviews and coaching to help you ace your job interviews
              </p>
            </Link>

            {/* Job Placement */}
            <Link
              href="/career-services/job-placement"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-orange-600 transition-all group"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-orange-600 transition-colors">
                <svg
                  className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors"
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
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-orange-600 transition-colors">
                Job Placement →
              </h3>
              <p className="text-black text-center">
                Direct connections to employers actively hiring our graduates
              </p>
            </Link>

            {/* Career Counseling */}
            <Link
              href="/career-services/career-counseling"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-purple-600 transition-all group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-600 transition-colors">
                <svg
                  className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-purple-600 transition-colors">
                Career Counseling →
              </h3>
              <p className="text-black text-center">
                One-on-one guidance to plan your career path and set goals
              </p>
            </Link>

            {/* Networking Events */}
            <Link
              href="/career-services/networking-events"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-indigo-600 transition-all group"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-600 transition-colors">
                <svg
                  className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-indigo-600 transition-colors">
                Networking Events →
              </h3>
              <p className="text-black text-center">
                Connect with employers, alumni, and industry professionals
              </p>
            </Link>

            {/* Ongoing Support */}
            <Link
              href="/career-services/ongoing-support"
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl hover:border-pink-600 transition-all group"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-pink-600 transition-colors">
                <svg
                  className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 text-center group-hover:text-pink-600 transition-colors">
                Ongoing Support →
              </h3>
              <p className="text-black text-center">
                Continued career support even after you're employed
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                95%
              </div>
              <div className="text-gray-700 font-semibold">
                Job Placement Rate
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                $45K+
              </div>
              <div className="text-gray-700 font-semibold">
                Average Starting Salary
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                500+
              </div>
              <div className="text-gray-700 font-semibold">
                Employer Partners
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-gray-700 font-semibold">Free Services</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">
              Explore More Resources
            </h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Discover all the features and services available to support your
              career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/features"
              className="bg-white border-2 border-blue-600 rounded-xl p-6 hover:bg-blue-50 transition-all group"
            >
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600">
                Platform Features →
              </h3>
              <p className="text-black">
                Explore all the tools and resources available on our platform
              </p>
            </Link>

            <Link
              href="/programs"
              className="bg-white border-2 border-purple-600 rounded-xl p-6 hover:bg-purple-50 transition-all group"
            >
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-purple-600">
                Training Programs →
              </h3>
              <p className="text-black">
                Browse 50+ free training programs in healthcare, trades, and
                more
              </p>
            </Link>

            <Link
              href="/schedule"
              className="bg-white border-2 border-orange-600 rounded-xl p-6 hover:bg-orange-50 transition-all group"
            >
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-orange-600">
                Schedule Meeting →
              </h3>
              <p className="text-black">
                Book a consultation with our career services team
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-white mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 text-lg"
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
