

'use client';

import React from 'react';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
  rating: number;
  totalSessions: number;
  availability: TimeSlot[];
}

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  platform: 'zoom' | 'teams';
}

interface Booking {
  instructorId: string;
  slotId: string;
  platform: 'zoom' | 'teams';
  topic: string;
  notes: string;
}

export default async function BookingPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'zoom' | 'teams'>(
    'zoom'
  );
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      const response = await fetch('/api/instructors/available');
      if (response.ok) {
        const data = await response.json();
        setInstructors(data.instructors || []);
      }
    } catch (error: unknown) {
      setInstructors([]);
    }
  };

  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].forEach(
        (time) => {
          slots.push({
            id: `slot-${i}-${time}`,
            date: date.toISOString().split('T')[0],
            time,
            available: Math.random() > 0.3,
            platform: Math.random() > 0.5 ? 'zoom' : 'teams',
          });
        }
      );
    }

    return slots;
  }

  const handleBooking = async () => {
    if (!selectedInstructor || !selectedSlot) return;

    setLoading(true);

    const booking: Booking = {
      instructorId: selectedInstructor.id,
      slotId: selectedSlot.id,
      platform: selectedPlatform,
      topic,
      notes,
    };

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking confirmed! Check your email for meeting details.');
        // Reset form
        setStep(1);
        setSelectedInstructor(null);
        setSelectedSlot(null);
        setTopic('');
        setNotes('');
      }
    } catch (error: unknown) {
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupSlotsByDate = (slots: TimeSlot[]) => {
    const grouped: Record<string, TimeSlot[]> = {};
    slots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 text-2xl md:text-3xl lg:text-4xl">
            Book a Live Session
          </h1>
          <p className="text-lg text-slate-600">
            Schedule one-on-one time with expert instructors via Zoom or
            Microsoft Teams
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-brand-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-24 h-1 ${step > s ? 'bg-brand-blue-600' : 'bg-slate-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-32 mt-2 text-sm font-medium text-slate-600">
            <span>Select Instructor</span>
            <span>Choose Time</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Select Instructor */}
        {step === 1 && (
          <div className="grid md:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
                  selectedInstructor?.id === instructor.id
                    ? 'ring-4 ring-blue-500'
                    : 'hover:shadow-xl'
                }`}
                onClick={() => {
                  setSelectedInstructor(instructor);
                  setStep(2);
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      loading="lazy"
                      src={instructor.avatar}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-slate-600">{instructor.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(instructor.rating)
                            ? 'text-yellow-400'
                            : 'text-slate-300'
                        } fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">
                    {instructor.rating} ({instructor.totalSessions} sessions)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Choose Time Slot */}
        {step === 2 && selectedInstructor && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  ← Back
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedInstructor.name}
                  </h2>
                  <p className="text-slate-600">
                    Select an available time slot
                  </p>
                </div>
              </div>

              {/* Platform Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPlatform('zoom')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedPlatform === 'zoom'
                      ? 'bg-brand-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 8.5C2 7.12 3.12 6 4.5 6h6C11.88 6 13 7.12 13 8.5v7c0 1.38-1.12 2.5-2.5 2.5h-6C3.12 18 2 16.88 2 15.5v-7zm11 0V12l5.5-3.5v7L13 12v3.5c0 1.38-1.12 2.5-2.5 2.5" />
                    </svg>
                    Zoom
                  </span>
                </button>
                <button
                  onClick={() => setSelectedPlatform('teams')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedPlatform === 'teams'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.625 8.25h-7.5v7.5h7.5v-7.5zM11.625 8.25h-7.5v7.5h7.5v-7.5z" />
                    </svg>
                    Teams
                  </span>
                </button>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-6">
              {Object.entries(
                groupSlotsByDate(selectedInstructor.availability)
              ).map(([date, slots]) => (
                <div key={date}>
                  <h3 className="font-bold text-slate-900 mb-3">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <div className="grid grid-cols-7 gap-3">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => {
                          if (slot.available) {
                            setSelectedSlot(slot);
                            setStep(3);
                          }
                        }}
                        disabled={!slot.available}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          slot.available
                            ? selectedSlot?.id === slot.id
                              ? 'bg-brand-blue-600 text-white'
                              : 'bg-slate-100 text-slate-900 hover:bg-gray-100'
                            : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Confirm Booking */}
        {step === 3 && selectedInstructor && selectedSlot && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setStep(2)}
                className="text-slate-600 hover:text-slate-900"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-slate-900">
                Confirm Booking
              </h2>
            </div>

            {/* Booking Summary */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">Session Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Instructor:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedInstructor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(selectedSlot.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedSlot.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Platform:</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {selectedPlatform}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-semibold text-slate-900">
                    60 minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Session Topic *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., HVAC System Troubleshooting"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific questions or topics you'd like to cover..."
                />
              </div>
            </div>

            {/* Confirmation */}
            <div className="flex gap-4">
              <button
                onClick={handleBooking}
                disabled={loading || !topic}
                className="flex-1 px-8 py-4 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-brand-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">What happens next?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      You'll receive a confirmation email with meeting details
                    </li>
                    <li>A calendar invite will be sent to your email</li>
                    <li>
                      Meeting link will be available 15 minutes before start
                      time
                    </li>
                    <li>
                      You can reschedule up to 24 hours before the session
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
