import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Workshops',
  description: 'Free workshops on career development, job readiness, and professional skills training.',
  path: '/nonprofit/workshops',
});

import Link from 'next/link';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

export default function WorkshopsPage() {
  const workshops = [
    {
      title: 'Mindfulness & Meditation',
      description:
        'Learn techniques to reduce stress and increase present-moment awareness',
      date: 'Every Tuesday',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual',
      spots: '15 spots available',
    },
    {
      title: 'Trauma Recovery Support Group',
      description: 'Safe space to share experiences and healing strategies',
      date: 'Every Thursday',
      time: '7:00 PM - 8:30 PM',
      location: 'Virtual',
      spots: '12 spots available',
    },
    {
      title: 'Holistic Wellness Workshop',
      description: 'Mind, body, and spirit integration practices',
      date: 'First Saturday of Month',
      time: '10:00 AM - 2:00 PM',
      location: 'In-Person & Virtual',
      spots: '20 spots available',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">
            Workshops
          </h1>
          <p className="text-xl text-black mb-8">
            Join our healing workshops and connect with a supportive community
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-black mb-4">
                  {workshop.title}
                </h3>
                <p className="text-black mb-6">{workshop.description}</p>
                <div className="space-y-3 text-sm text-black">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    {workshop.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    {workshop.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    {workshop.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    {workshop.spots}
                  </div>
                </div>
                <Link
                  href="/nonprofit/sign-up"
                  className="mt-6 block w-full text-center bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-lg text-black mb-8">
            Sign up for a workshop today and take the first step toward wellness
          </p>
          <Link
            href="/nonprofit/sign-up"
            className="inline-block bg-purple-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
