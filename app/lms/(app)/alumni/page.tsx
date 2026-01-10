'use client';

import { useState } from 'react';
import { Users, Briefcase, Calendar, MessageCircle, Award, MapPin } from 'lucide-react';

export default function AlumniPage() {
  const [filter, setFilter] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Sarah Johnson',
      program: 'Healthcare - CNA',
      graduated: '2024',
      currentRole: 'Certified Nursing Assistant',
      company: 'Community Hospital',
      location: 'Indianapolis, IN',
      image: '/images/team-new/team-1.jpg',
      available: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      program: 'Technology - Web Development',
      graduated: '2023',
      currentRole: 'Full Stack Developer',
      company: 'Tech Solutions Inc',
      location: 'Indianapolis, IN',
      image: '/images/team-new/team-2.jpg',
      available: true
    },
    {
      id: 3,
      name: 'Jessica Martinez',
      program: 'Skilled Trades - HVAC',
      graduated: '2024',
      currentRole: 'HVAC Technician',
      company: 'Climate Control Services',
      location: 'Carmel, IN',
      image: '/images/team-new/team-3.jpg',
      available: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Alumni Network</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Connect with Graduates</h2>
        <p className="text-slate-700">
          Network with over 2,000 Elevate for Humanity alumni. Get career advice, mentorship, and professional connections.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">2,045</div>
          <div className="text-slate-600">Alumni</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">87%</div>
          <div className="text-slate-600">Employed</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <div className="text-3xl font-bold mb-1">150+</div>
          <div className="text-slate-600">Companies</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Alumni
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Available for Mentorship
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni
            .filter(a => filter === 'all' || (filter === 'available' && a.available))
            .map((person) => (
              <div key={person.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-center mb-2">{person.name}</h3>
                <p className="text-sm text-blue-600 text-center mb-3">{person.program}</p>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{person.currentRole}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{person.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{person.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Graduated {person.graduated}</span>
                  </div>
                </div>

                {person.available && (
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold">Alumni Networking Mixer</h3>
              <p className="text-sm text-slate-600">March 15, 2026 • 6:00 PM</p>
              <p className="text-sm text-slate-500">Downtown Indianapolis</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold">Career Fair</h3>
              <p className="text-sm text-slate-600">April 20, 2026 • 10:00 AM</p>
              <p className="text-sm text-slate-500">Convention Center</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Mentorship Program</h2>
          <p className="text-slate-600 mb-4">
            Connect with experienced alumni for career guidance and professional development.
          </p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Request a Mentor
          </button>
        </div>
      </div>
    </div>
  );
}
