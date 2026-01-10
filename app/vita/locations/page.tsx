'use client';

import { useState } from 'react';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function VITALocationsPage() {
  const [zipCode, setZipCode] = useState('');

  const locations = [
    {
      id: 1,
      name: 'Downtown Indianapolis VITA Site',
      address: '123 Main St, Indianapolis, IN 46204',
      phone: '(317) 555-0201',
      hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm',
      services: ['Individual Returns', 'EITC', 'Child Tax Credit'],
      image: '/images/tax-office-2.jpg'
    },
    {
      id: 2,
      name: 'Eastside Community Center',
      address: '456 East St, Indianapolis, IN 46201',
      phone: '(317) 555-0202',
      hours: 'Tue-Thu: 10am-6pm, Sat: 9am-1pm',
      services: ['Individual Returns', 'Senior Assistance', 'Spanish Speaking'],
      image: '/images/business/team-1.jpg'
    },
    {
      id: 3,
      name: 'Westside Library',
      address: '789 West Ave, Indianapolis, IN 46222',
      phone: '(317) 555-0203',
      hours: 'Mon, Wed, Fri: 12pm-7pm',
      services: ['Individual Returns', 'Disability Assistance'],
      image: '/images/business/team-2.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Find a VITA Location</h1>
          <p className="text-xl">Free tax preparation sites near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Search by ZIP Code</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-semibold transition">
              Search
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{location.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{location.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{location.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, idx) => (
                      <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/vita/schedule?location=${location.id}`}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-lg font-semibold transition"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
