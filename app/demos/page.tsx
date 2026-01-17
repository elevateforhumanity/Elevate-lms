import { Metadata } from 'next';
import Link from 'next/link';
import { Play, Monitor, Users, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Product Demos | Elevate For Humanity',
  description: 'See our training platform in action. Schedule a demo or watch recorded walkthroughs.',
};

const demos = [
  {
    title: 'LMS Platform Overview',
    description: 'See how students navigate courses, track progress, and earn certificates.',
    duration: '15 min',
    type: 'Video',
  },
  {
    title: 'Employer Portal Demo',
    description: 'Learn how employers track sponsored employees and access reports.',
    duration: '10 min',
    type: 'Video',
  },
  {
    title: 'Admin Dashboard Tour',
    description: 'Explore the administrative tools for managing programs and students.',
    duration: '20 min',
    type: 'Video',
  },
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              See Elevate in Action
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Watch demos of our training platform or schedule a personalized walkthrough with our team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demos */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Recorded Demos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {demos.map((demo) => (
              <div key={demo.title} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <Play className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{demo.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{demo.duration}</span>
                    <Link href="/login" className="text-blue-600 font-medium text-sm">
                      Watch Demo →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want a Personalized Demo?</h2>
          <p className="text-gray-600 mb-8">
            Schedule a live walkthrough with our team to see how Elevate can work for your organization.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
