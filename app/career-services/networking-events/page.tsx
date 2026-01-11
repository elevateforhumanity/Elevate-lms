import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Users, Briefcase, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Networking Events | Career Services | Elevate for Humanity',
  description:
    'Connect with employers and industry professionals at our networking events.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/career-services/networking-events',
  },
};

export default function NetworkingEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-green-600 to-brand-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Networking Events</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Connect with employers, alumni, and industry professionals.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-brand-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">
              Monthly Events
            </h3>
            <p className="text-black">Regular networking opportunities</p>
          </div>
          <div className="text-center">
            <Users className="w-16 h-16 text-brand-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">
              Industry Professionals
            </h3>
            <p className="text-black">Meet hiring managers and recruiters</p>
          </div>
          <div className="text-center">
            <Briefcase className="w-16 h-16 text-brand-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">
              Job Opportunities
            </h3>
            <p className="text-black">Direct access to open positions</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            Upcoming Events
          </h2>
          <p className="text-black mb-6">
            Check back soon for our next networking event. Events are free for
            all students and alumni.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-green-700 transition"
          >
            Get Notified
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
