import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interview Preparation | Career Services | Elevate for Humanity',
  description:
    'Professional interview coaching and preparation services to help you land your dream job.',
};

export default function InterviewPrepPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Interview Preparation</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Professional coaching to help you ace your interviews and land the
            job.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              What We Cover
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Common interview questions and how to answer them
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Body language and professional presentation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Mock interviews with feedback
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Industry-specific interview strategies
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Salary negotiation techniques
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Follow-up strategies</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              Schedule Your Session
            </h3>
            <p className="text-gray-700 mb-6">
              One-on-one interview coaching sessions available for all students
              and alumni.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue-700 transition"
            >
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            More Career Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-services/resume-building"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Resume Building
              </h3>
              <p className="text-gray-600">
                Professional resume writing and review
              </p>
            </Link>
            <Link
              href="/career-services/job-placement"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Job Placement
              </h3>
              <p className="text-gray-600">
                Direct connections to hiring employers
              </p>
            </Link>
            <Link
              href="/career-services/career-counseling"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Career Counseling
              </h3>
              <p className="text-gray-600">
                Long-term career planning and guidance
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
