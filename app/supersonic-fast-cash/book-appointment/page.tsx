'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Video, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  DollarSign
} from 'lucide-react';

export default function BookAppointment() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);
    
    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const openCalendly = (url: string) => {
    if (calendlyLoaded && typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url });
    }
  };

  const appointmentTypes = [
    {
      id: 'video',
      name: 'Video Call',
      icon: Video,
      description: 'Meet face-to-face via Zoom from anywhere',
      details: ['Secure video conference', 'Screen sharing for documents', 'Record for your records'],
      calendlyUrl: 'https://calendly.com/elevateforhumanity/video-tax-consultation',
      color: 'bg-blue-500',
    },
    {
      id: 'phone',
      name: 'Phone Call',
      icon: Phone,
      description: 'Speak with a tax professional by phone',
      details: ['Quick and convenient', 'Upload documents online', 'Call back option available'],
      calendlyUrl: 'https://calendly.com/elevateforhumanity/phone-tax-consultation',
      color: 'bg-green-500',
    },
    {
      id: 'in-person',
      name: 'In-Person',
      icon: MapPin,
      description: 'Visit our Indianapolis office',
      details: ['Face-to-face service', 'Bring your documents', 'Same-day filing available'],
      calendlyUrl: 'https://calendly.com/elevateforhumanity/in-person-tax-appointment',
      color: 'bg-purple-500',
    },
  ];

  const services = [
    { name: 'Basic Tax Filing (W-2 only)', price: 'From $75' },
    { name: 'Deluxe Filing (Multiple income)', price: 'From $150' },
    { name: 'Business Tax Filing', price: 'From $250' },
    { name: 'Tax Refund Advance', price: '$0 - Get up to $7,500 same day' },
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  const locations = [
    {
      id: 'keystone',
      name: '8888 Keystone Xing, Suite 1300, Indianapolis, IN 46240',
      available: appointmentData.appointmentType === 'in-person',
    },
    {
      id: '56th',
      name: '7009 E 56th St, Suite EE1, Indianapolis, IN 46226',
      available: appointmentData.appointmentType === 'in-person',
    },
  ];

  // Load Calendly widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: CALENDLY_LINK,
        prefill: {
          name: `${appointmentData.firstName} ${appointmentData.lastName}`,
          email: appointmentData.email,
          customAnswers: {
            a1: appointmentData.phone,
            a2: appointmentData.serviceType,
          }
        }
      });
    }
  };

  const handlePayment = async () => {
    try {
      const selectedService = serviceTypes.find(
        (s) => s.id === appointmentData.serviceType
      );

      const response = await fetch('/api/tax/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentData,
          servicePrice: selectedService?.price || 0,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) { /* Error handled silently */ 
      logger.error('Booking error:', error);
      alert('Booking failed. Please call 317-314-3757 for assistance.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800">
      {/* Header */}
      <div className="bg-green-950 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/supersonic-fast-cash" className="inline-flex items-center text-green-300 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Supersonic Fast Cash
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Tax Appointment</h1>
          <p className="text-green-200 text-lg">Choose how you&apos;d like to meet with our IRS-certified tax professionals</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Appointment Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {appointmentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                openCalendly(type.calendlyUrl);
              }}
              className={`bg-white rounded-2xl p-6 text-left hover:shadow-xl transition-all hover:-translate-y-1 ${
                selectedType === type.id ? 'ring-4 ring-green-400' : ''
              }`}
            >
              <div className={`w-14 h-14 ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                <type.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <ul className="space-y-2">
                {type.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t">
                <span className="inline-flex items-center text-green-600 font-semibold">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Now
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Services & Pricing */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" />
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div key={i} className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                <span className="text-white">{service.name}</span>
                <span className="text-green-300 font-bold">{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prefer to Call?</h2>
          <p className="text-gray-600 mb-6">Speak directly with our team to schedule your appointment</p>
          <a 
            href="tel:3173143757" 
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-green-700 transition"
          >
            <Phone className="w-6 h-6" />
            (317) 314-3757
          </a>
          <p className="text-gray-500 mt-4 text-sm">
            <Clock className="w-4 h-4 inline mr-1" />
            Mon-Fri 9am-6pm, Sat 10am-4pm
          </p>
        </div>

        {/* Office Location */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Keystone Crossing</h3>
                  <p className="text-gray-600">8888 Keystone Xing, Suite 1300</p>
                  <p className="text-gray-600">Indianapolis, IN 46240</p>
                  <a 
                    href="https://maps.google.com/?q=8888+Keystone+Xing+Indianapolis+IN" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">Available Dates</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() =>
                        setAppointmentData({
                          ...appointmentData,
                          date,
                          time: '',
                        })
                      }
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 font-semibold ${
                        appointmentData.date === date
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Available Times</h3>
                {!appointmentData.date && (
                  <p className="text-black italic">Select a date first</p>
                )}
                {appointmentData.date && (
                  <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          setAppointmentData({ ...appointmentData, time })
                        }
                        className={`px-4 py-3 rounded-lg border-2 font-semibold text-sm ${
                          appointmentData.time === time
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {appointmentData.date && appointmentData.time && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-bold text-green-900">
                  Selected:{' '}
                  {new Date(appointmentData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  at {appointmentData.time}
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 text-black py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!appointmentData.date || !appointmentData.time}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Info & Payment */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>

            <div className="space-y-4 mb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={appointmentData.firstName}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={appointmentData.lastName}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={appointmentData.email}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="your.email@gmail.com"
                />
                <p className="text-sm text-black mt-1">
                  We'll send appointment confirmation and{' '}
                  {appointmentData.appointmentType === 'video'
                    ? 'Zoom link'
                    : 'details'}{' '}
                  to this email
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={appointmentData.phone}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="(317) 314-3757"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Brief Description of Tax Situation
                </label>
                <textarea
                  value={appointmentData.taxSituation}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      taxSituation: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="e.g., W-2 employee, need help with deductions, etc."
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">
                  Income Sources (check all that apply)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={appointmentData.hasW2}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          hasW2: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span>W-2 (Employee wages)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={appointmentData.has1099}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          has1099: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span>1099 (Self-employed/Contractor)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={appointmentData.hasBusinessIncome}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          hasBusinessIncome: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span>Business Income</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={appointmentData.hasRentalIncome}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          hasRentalIncome: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span>Rental Property Income</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={appointmentData.needsRefundAdvance}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        needsRefundAdvance: e.target.checked,
                      })
                    }
                    className="w-5 h-5"
                  />
                  <span className="font-semibold">
                    I'm interested in a Tax Refund Advance ($250-$7,500)
                  </span>
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Appointment Summary</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Service:</strong>{' '}
                  {
                    serviceTypes.find(
                      (s) => s.id === appointmentData.serviceType
                    )?.name
                  }
                </p>
                <p>
                  <strong>Type:</strong>{' '}
                  {
                    appointmentTypes.find(
                      (t) => t.id === appointmentData.appointmentType
                    )?.name
                  }
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(appointmentData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p>
                  <strong>Time:</strong> {appointmentData.time}
                </p>
                {appointmentData.location && (
                  <p>
                    <strong>Location:</strong>{' '}
                    {
                      locations.find((l) => l.id === appointmentData.location)
                        ?.name
                    }
                  </p>
                )}
                <p className="text-2xl font-bold text-green-600 mt-4">
                  Total: $
                  {
                    serviceTypes.find(
                      (s) => s.id === appointmentData.serviceType
                    )?.price
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-300 text-black py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={
                  !appointmentData.firstName ||
                  !appointmentData.lastName ||
                  !appointmentData.email ||
                  !appointmentData.phone
                }
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay & Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
