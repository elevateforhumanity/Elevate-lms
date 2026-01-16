import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schedule Appointment | VITA Free Tax Prep',
  description: 'Book your free tax preparation appointment with VITA.',
};

export const dynamic = 'force-dynamic';

export default async function VITASchedulePage() {
  const supabase = await createClient();

  // Get available locations
  const { data: locations } = await supabase
    .from('vita_locations')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // Get available time slots
  const { data: timeSlots } = await supabase
    .from('vita_availability')
    .select('*')
    .gte('date', new Date().toISOString())
    .eq('is_available', true)
    .order('date', { ascending: true })
    .limit(20);

  const defaultLocations = [
    { id: 1, name: 'Main Office', address: '123 Education Way, Indianapolis, IN 46204' },
    { id: 2, name: 'Community Center', address: '456 Community Blvd, Indianapolis, IN 46205' },
  ];

  const displayLocations = locations && locations.length > 0 ? locations : defaultLocations;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Schedule Your Free Appointment</h1>
          <p className="text-xl text-green-100">
            Book a time for your free tax preparation
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Before You Book */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Before You Book</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Check that you <Link href="/vita/eligibility" className="text-green-600 underline">qualify</Link> for free VITA services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Review <Link href="/vita/what-to-bring" className="text-green-600 underline">what to bring</Link> to your appointment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Plan for approximately 1-2 hours for your appointment</span>
            </li>
          </ul>
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Select a Location</h2>
          <div className="space-y-4">
            {displayLocations.map((location: any) => (
              <label key={location.id} className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="location" value={location.id} className="mt-1" />
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-600">{location.address}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Select a Time</h2>
          {timeSlots && timeSlots.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {timeSlots.map((slot: any) => (
                <button
                  key={slot.id}
                  className="p-4 border rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
                >
                  <div className="font-medium">{new Date(slot.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-600">{slot.time}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No available time slots online</p>
              <p className="text-gray-600">
                Please call <a href="tel:3173143757" className="text-green-600 font-medium">(317) 314-3757</a> to schedule
              </p>
            </div>
          )}
        </div>

        {/* Contact Info Form */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-6">Your Information</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" className="w-full px-4 py-2 border rounded-lg" required />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
