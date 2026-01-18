import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Locations | VITA Free Tax Prep',
  description: 'Find a VITA free tax preparation site near you.',
};

export const dynamic = 'force-dynamic';

export default async function VITALocationsPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get all locations
  const { data: locations } = await supabase
    .from('vita_locations')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  const defaultLocations = [
    {
      id: 1,
      name: 'Elevate Main Office',
      address: '123 Education Way',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46204',
      phone: '(317) 314-3757',
      hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm',
      parking: 'Free parking available',
    },
    {
      id: 2,
      name: 'Community Center',
      address: '456 Community Blvd',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46205',
      phone: '(317) 555-0102',
      hours: 'Tue-Thu: 10am-6pm, Sat: 9am-1pm',
      parking: 'Street parking',
    },
    {
      id: 3,
      name: 'Library Branch',
      address: '789 Library Lane',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46206',
      phone: '(317) 555-0103',
      hours: 'Wed-Fri: 12pm-7pm',
      parking: 'Library parking lot',
    },
  ];

  const displayLocations = locations && locations.length > 0 ? locations : defaultLocations;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">VITA Locations</h1>
          <p className="text-xl text-green-100">
            Find a free tax preparation site near you
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayLocations.map((location: any) => (
            <div key={location.id} className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-bold text-lg mb-4">{location.name}</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p>{location.address}</p>
                    <p>{location.city}, {location.state} {location.zip}</p>
                  </div>
                </div>
                
                {location.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="text-green-600 hover:underline">
                      {location.phone}
                    </a>
                  </div>
                )}
                
                {location.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-600">{location.hours}</p>
                  </div>
                )}
                
                {location.parking && (
                  <p className="text-gray-500 text-xs mt-2">{location.parking}</p>
                )}
              </div>

              <Link
                href="/vita/schedule"
                className="mt-4 inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
              >
                <Calendar className="w-4 h-4" />
                Schedule at this location
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 text-center">
          <p className="text-gray-600">
            All locations require appointments. Walk-ins may be accommodated if time permits.
          </p>
          <Link
            href="/vita/schedule"
            className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Schedule Your Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
