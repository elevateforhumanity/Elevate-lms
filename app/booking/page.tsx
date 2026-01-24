'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Video, Phone, Building, ArrowRight, CheckCircle } from 'lucide-react';

const appointmentTypes = [
  {
    id: 'enrollment',
    name: 'Enrollment Consultation',
    description: 'Learn about our programs, eligibility, and enrollment process',
    duration: 60,
    icon: User,
    color: 'blue',
  },
  {
    id: 'financial',
    name: 'Financial Aid & WIOA',
    description: 'Discuss funding options, WIOA eligibility, and payment plans',
    duration: 60,
    icon: Calendar,
    color: 'green',
  },
  {
    id: 'virtual',
    name: 'Virtual Meeting',
    description: 'Meet via Google Meet video call from anywhere',
    duration: 60,
    icon: Video,
    color: 'purple',
  },
  {
    id: 'phone',
    name: 'Phone Consultation',
    description: 'We\'ll call you at your preferred time',
    duration: 60,
    icon: Phone,
    color: 'orange',
  },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

function getNextTwoWeeks(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  return dates;
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableDates = getNextTwoWeeks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/booking/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          appointmentType: selectedType,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          duration: 60,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Scheduled!</h1>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <p className="text-gray-600">{selectedTime} (1 hour)</p>
            <p className="text-sm text-gray-500 mt-2">{appointmentTypes.find(t => t.id === selectedType)?.name}</p>
          </div>
          <p className="text-sm text-gray-600 mb-6">Confirmation sent to <strong>{formData.email}</strong></p>
          <Link href="/" className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-xl text-slate-300">Schedule a 1-hour consultation with our team</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Select Appointment Type</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setSelectedType(type.id); setStep(2); }}
                  className="bg-white p-6 rounded-xl border-2 hover:border-blue-500 hover:shadow-lg transition text-left"
                >
                  <type.icon className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-lg font-bold mb-2">{type.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" /> {type.duration} minutes
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date/Time */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Select Date & Time</h2>
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h3 className="font-semibold mb-4">Select a Date</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                {availableDates.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-center ${selectedDate?.toDateString() === date.toDateString() ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                  </button>
                ))}
              </div>
              {selectedDate && (
                <>
                  <h3 className="font-semibold mb-4">Select a Time (1 Hour Slots)</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg font-medium ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900">← Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Info */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Your Information</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg" placeholder="(317) 314-3757" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                  <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg" placeholder="What would you like to discuss?" />
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="text-gray-600">← Back</button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-400">
                  {isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
          <p className="text-gray-600 mb-4">Call us Monday-Friday, 9am-5pm EST</p>
          <a href="tel:3173143757" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            <Phone className="w-5 h-5 mr-2" /> (317) 314-3757
          </a>
        </div>

        {/* Location */}
        <div className="mt-8 bg-white rounded-xl border p-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Main Office</h3>
              <p className="text-gray-600">3737 N Meridian St, Suite 200<br />Indianapolis, IN 46208</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
