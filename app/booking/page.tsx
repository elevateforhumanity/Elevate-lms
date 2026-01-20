import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, Mail, Video } from 'lucide-react';
import { CALENDLY_LINKS, APPOINTMENT_CONTACT } from '@/lib/appointments/calendly-integration';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Schedule an Appointment | Elevate For Humanity',
  description: 'Book a consultation, advising session, or program information meeting with our team.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/booking',
  },
};

const appointmentTypes = [
  {
    id: 'advising',
    name: 'General Advising',
    description: 'Learn about our programs, eligibility, and enrollment process',
    duration: '30 min',
    calendlyUrl: CALENDLY_LINKS.advising,
  },
  {
    id: 'financial',
    name: 'Financial Aid & Funding',
    description: 'Discuss WIOA eligibility, grants, and payment options',
    duration: '30 min',
    calendlyUrl: CALENDLY_LINKS.financialAid,
  },
  {
    id: 'case-management',
    name: 'Case Management',
    description: 'Support services for enrolled students',
    duration: '45 min',
    calendlyUrl: CALENDLY_LINKS.caseManagement,
  },
  {
    id: 'workforce',
    name: 'Workforce Intake',
    description: 'Initial assessment for workforce development services',
    duration: '45 min',
    calendlyUrl: CALENDLY_LINKS.workforceIntake,
  },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Calendly Widget Script */}
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule an Appointment</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Book a consultation with our team. Select an appointment type below to view available times.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Calendly Embed - Main Calendar */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-slate-50">
              <h2 className="text-2xl font-bold text-slate-900">Select a Time</h2>
              <p className="text-slate-600 mt-1">Choose an available slot that works for you</p>
            </div>
            <div 
              className="calendly-inline-widget" 
              data-url={`${CALENDLY_LINKS.advising}?hide_gdpr_banner=1&background_color=ffffff&text_color=1e293b&primary_color=2563eb`}
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </section>

        {/* Appointment Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Appointment Types</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {appointmentTypes.map((type) => (
              <a
                key={type.id}
                href={type.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md hover:border-blue-300 transition group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-slate-900 mb-2 group-hover:text-blue-600">
                      {type.name}
                    </h3>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{type.duration}</span>
                    </div>
                  </div>
                  <Calendar className="w-6 h-6 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">Office Location</h3>
                  <p className="text-slate-600 mt-1">
                    {APPOINTMENT_CONTACT.address}
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    {APPOINTMENT_CONTACT.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">Virtual Appointments</h3>
                  <p className="text-slate-600 mt-1">
                    Available via Zoom video call
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    Link provided after booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section>
          <div className="bg-slate-100 rounded-2xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-bold text-xl text-slate-900 mb-2">Need Immediate Assistance?</h3>
              <p className="text-slate-600 mb-6">
                Can&apos;t find a time that works? Contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${APPOINTMENT_CONTACT.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition"
                >
                  <Phone className="w-5 h-5" />
                  {APPOINTMENT_CONTACT.phone}
                </a>
                <a
                  href={`mailto:${APPOINTMENT_CONTACT.email}`}
                  className="inline-flex items-center justify-center gap-2 border border-slate-800 text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
