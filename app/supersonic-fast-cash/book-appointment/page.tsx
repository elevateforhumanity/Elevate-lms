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
        </div>
      </div>
    </div>
  );
}
