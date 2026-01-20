'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, Video, Phone, MapPin, ChevronLeft } from 'lucide-react';

const advisors = [
  { id: 1, name: 'Sarah Johnson', role: 'Academic Advisor', available: true, image: null },
  { id: 2, name: 'Michael Chen', role: 'Career Counselor', available: true, image: null },
  { id: 3, name: 'Emily Rodriguez', role: 'Financial Aid', available: false, image: null },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

export default function SchedulePage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('video');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/student-support" className="hover:text-orange-600">Student Support</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Schedule Appointment</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule an Appointment</h1>
        <p className="text-gray-600 mb-8">Book a meeting with an advisor or counselor</p>

        <div className="space-y-6">
          {/* Step 1: Select Advisor */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">1. Select an Advisor</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {advisors.map(advisor => (
                <button key={advisor.id} onClick={() => advisor.available && setSelectedAdvisor(advisor.id)}
                  disabled={!advisor.available}
                  className={`p-4 rounded-lg border text-left transition ${
                    selectedAdvisor === advisor.id ? 'border-orange-500 bg-orange-50' :
                    advisor.available ? 'hover:border-gray-300' : 'opacity-50 cursor-not-allowed'
                  }`}>
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="font-medium">{advisor.name}</p>
                  <p className="text-sm text-gray-500">{advisor.role}</p>
                  {!advisor.available && <p className="text-xs text-red-500 mt-1">Unavailable</p>}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Date & Time */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">2. Select Date & Time</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 text-sm rounded-lg border ${
                        selectedTime === time ? 'bg-orange-500 text-white border-orange-500' : 'hover:border-gray-300'
                      }`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Meeting Type */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">3. Meeting Type</h2>
            <div className="flex gap-4">
              {[
                { id: 'video', icon: Video, label: 'Video Call' },
                { id: 'phone', icon: Phone, label: 'Phone Call' },
                { id: 'inperson', icon: MapPin, label: 'In Person' },
              ].map(type => (
                <button key={type.id} onClick={() => setMeetingType(type.id)}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border ${
                    meetingType === type.id ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-300'
                  }`}>
                  <type.icon className="w-5 h-5" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary & Confirm */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Appointment Summary</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Advisor</p>
                  <p className="font-medium">{advisors.find(a => a.id === selectedAdvisor)?.name || 'Not selected'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <p className="font-medium">{selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : 'Not selected'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Meeting Type</p>
                  <p className="font-medium capitalize">{meetingType === 'inperson' ? 'In Person' : meetingType}</p>
                </div>
              </div>
            </div>
            <button disabled={!selectedAdvisor || !selectedDate || !selectedTime}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
