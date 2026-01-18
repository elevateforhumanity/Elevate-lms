import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Video, ArrowRight, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events | Community | Elevate For Humanity',
  description: 'Join live workshops, webinars, networking events, and Q&A sessions with our community.',
};

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const upcomingEvents = [
    {
      title: 'Career Development Workshop',
      description: 'Learn strategies for advancing your career in healthcare, skilled trades, and more.',
      date: 'Every Wednesday',
      time: '6:00 PM EST',
      type: 'Workshop',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
      attendees: 45,
      isLive: false,
    },
    {
      title: 'Monthly Networking Mixer',
      description: 'Connect with fellow members, mentors, and industry professionals in a casual setting.',
      date: 'First Friday of Month',
      time: '7:00 PM EST',
      type: 'Networking',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      attendees: 120,
      isLive: false,
    },
    {
      title: 'Resume Review Session',
      description: 'Get personalized feedback on your resume from career coaches and HR professionals.',
      date: 'Every Tuesday',
      time: '5:00 PM EST',
      type: 'Workshop',
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
      attendees: 30,
      isLive: false,
    },
    {
      title: 'Industry Expert Q&A: Healthcare',
      description: 'Ask questions and get advice from experienced healthcare professionals.',
      date: 'Bi-Weekly Thursday',
      time: '7:00 PM EST',
      type: 'Q&A',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      attendees: 85,
      isLive: false,
    },
    {
      title: 'Job Search Strategies',
      description: 'Learn effective techniques for finding and landing your dream job.',
      date: 'Every Monday',
      time: '6:30 PM EST',
      type: 'Webinar',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      attendees: 60,
      isLive: false,
    },
    {
      title: 'Success Stories: Graduate Panel',
      description: 'Hear from program graduates about their journey and career success.',
      date: 'Last Saturday of Month',
      time: '2:00 PM EST',
      type: 'Panel',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      attendees: 150,
      isLive: false,
    },
  ];

  const eventTypes = ['All Events', 'Workshops', 'Webinars', 'Networking', 'Q&A Sessions', 'Panels'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-700 to-indigo-800 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Community events"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-purple-200" />
              <span className="text-purple-200 font-medium">Community Events</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Learn, Connect,<br />and Grow Together
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Join live workshops, webinars, networking events, and Q&A sessions with industry experts and fellow community members.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#upcoming"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-purple-50 transition-colors"
              >
                View Upcoming Events
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-500 transition-colors"
              >
                Back to Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {eventTypes.map((type, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    event.type === 'Workshop' ? 'bg-blue-500 text-white' :
                    event.type === 'Networking' ? 'bg-green-500 text-white' :
                    event.type === 'Q&A' ? 'bg-orange-500 text-white' :
                    event.type === 'Webinar' ? 'bg-purple-500 text-white' :
                    'bg-pink-500 text-white'
                  }`}>
                    {event.type}
                  </span>
                  {event.isLive && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE NOW
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Host an Event?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Share your expertise with the community by hosting a workshop, webinar, or Q&A session.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
