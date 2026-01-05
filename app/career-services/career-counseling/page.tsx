import Link from 'next/link';
import { Metadata } from 'next';
import { Target, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Counseling | Elevate for Humanity',
  description:
    'Long-term career planning and guidance for your professional journey.',
  alternates: {
    canonical: 'https://elevateforhumanity.org/career-services/career-counseling',
  },
};

export default function CareerCounselingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-purple-600 to-brand-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Career Counseling</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Professional guidance for your long-term career success.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <Target className="w-12 h-12 text-brand-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-black mb-3">Goal Setting</h3>
            <p className="text-gray-700">
              Define clear career objectives and create actionable plans
            </p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <TrendingUp className="w-12 h-12 text-brand-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-black mb-3">
              Career Pathways
            </h3>
            <p className="text-gray-700">
              Explore advancement opportunities in your field
            </p>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <Users className="w-12 h-12 text-brand-green-600 mb-4" />
            <h3 className="text-xl font-bold text-black mb-3">
              Ongoing Support
            </h3>
            <p className="text-gray-700">
              Continuous guidance throughout your career journey
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Schedule a Session
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Meet with a career counselor to discuss your goals and create your
            success plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-purple-700 transition"
          >
            Book Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
