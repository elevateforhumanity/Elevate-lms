import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar as CalendarIcon, Video, Users, Clock } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/calendar',
  },
  title: 'Calendar - Book Virtual Team Meeting | Elevate For Humanity',
  description:
    'Schedule a virtual team meeting with Elevate for Humanity. Book your consultation, program orientation, or career advising session.',
};

export default async function CalendarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <CalendarIcon className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Book a Virtual Team Meeting
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Schedule a consultation, program orientation, or career advising
              session with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black mb-6">
              What Can We Help You With?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Choose the type of meeting that best fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-600 transition-colors">
              <Video className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Program Consultation
              </h3>
              <p className="text-black mb-4">
                Learn about our programs, funding options, and enrollment
                process.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  30 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  One-on-one or group
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-600 transition-colors">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Career Advising
              </h3>
              <p className="text-black mb-4">
                Get personalized career guidance and explore your options.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  45 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  One-on-one
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-orange-600 transition-colors">
              <CalendarIcon className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Program Orientation
              </h3>
              <p className="text-black mb-4">
                Attend a group orientation to learn about getting started.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  60 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  Group session
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-black text-black mb-4 text-center">
              Schedule Your Meeting
            </h2>
            <p className="text-lg text-black mb-8 text-center">
              Choose a time that works for you. All meetings are conducted via
              Zoom.
            </p>

            <div className="rounded-2xl border-2 border-gray-200 overflow-hidden">
              <CalendlyEmbed />
            </div>

            <p className="mt-6 text-sm text-black text-center">
              If the calendar does not load, use this link:{' '}
              <a
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
                target="_blank"
                rel="noreferrer"
              >
                Open Calendly
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Prefer to Apply First?
          </h2>
          <p className="text-xl text-white mb-8">
            Start your application and we'll reach out to schedule a meeting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!url) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-red-700 font-semibold mb-2">
          Calendly is not configured.
        </p>
        <p className="text-sm text-black">
          Add{' '}
          <span className="font-mono bg-gray-100 px-2 py-2 rounded">
            NEXT_PUBLIC_CALENDLY_URL
          </span>{' '}
          in Vercel → Environment Variables.
        </p>
      </div>
    );
  }

  return (
    <iframe
      title="Calendly Scheduling"
      src={`${url}?hide_gdpr_banner=1`}
      className="w-full"
      style={{ height: 820 }}
      frameBorder="0"
      scrolling="no"
      allow="camera; microphone; fullscreen"
      loading="lazy"
    />
  );
}
