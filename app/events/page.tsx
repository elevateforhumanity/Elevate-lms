import { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events | Elevate For Humanity',
  description: 'Discover upcoming workshops, seminars, and community events.',
};

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(12);

  const { data: pastEvents } = await supabase
    .from('events')
    .select('*')
    .lt('start_date', new Date().toISOString())
    .order('start_date', { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl text-rose-100 max-w-2xl">
            Join us for workshops, seminars, networking events, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {upcomingEvents && upcomingEvents.length > 0 ? upcomingEvents.map((event: any) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition">
              {event.image_url && (
                <div className="h-40 bg-gray-200 relative">
                  <Image src={event.image_url} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-rose-600 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  )}
                  {event.start_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.start_time}
                    </div>
                  )}
                </div>
                <Link href={`/events/${event.id}`} className="inline-flex items-center gap-1 text-rose-600 font-medium hover:underline">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600">Check back soon for new events!</p>
            </div>
          )}
        </div>

        {pastEvents && pastEvents.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event: any) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6 opacity-75">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                  <h3 className="font-semibold text-gray-700">{event.title}</h3>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
