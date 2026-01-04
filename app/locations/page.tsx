import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Locations | Elevate for Humanity',
  description:
    'Visit Elevate for Humanity at our Indianapolis location. Find directions, hours, and contact information.',
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Our Location
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Visit us in Indianapolis to learn more about our programs and
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Location Details */}
            <div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-black text-black mb-6">
                  Indianapolis Office
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-black mb-1">Address</h3>
                      <p className="text-black">
                        8888 Keystone Xing
                        <br />
                        Suite 1300
                        <br />
                        Indianapolis, IN 46240
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-black mb-1">Phone</h3>
                      <a
                        href="tel:+13173143757"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        (317) 314-3757
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-black mb-1">Email</h3>
                      <a
                        href="mailto:elevate4humanityedu@gmail.com"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        elevate4humanityedu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-black mb-1">Hours</h3>
                      <div className="text-black space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: By Appointment</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=8888+Keystone+Xing+Suite+1300+Indianapolis+IN+46240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                  >
                    <Navigation className="h-5 w-5" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/schedule"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold text-center transition-colors"
                >
                  Schedule Visit
                </Link>
                <Link
                  href="/apply"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold text-center transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Map */}
            <div>
              <div
                className="bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-200"
                style={{ height: '600px' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.0!2d-86.1!3d39.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU0JzAwLjAiTiA4NsKwMDYnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Elevate for Humanity Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parking & Accessibility */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-12 text-center">
            Visitor Information
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">Parking</h3>
              <p className="text-black">
                Free parking is available in the building garage. Visitor
                parking is on Level 1.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Accessibility
              </h3>
              <p className="text-black">
                Our office is fully wheelchair accessible with elevator access
                to Suite 1300.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                Public Transit
              </h3>
              <p className="text-black">
                IndyGo bus routes serve the Keystone Crossing area. Check
                IndyGo.net for schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
            Ready to Visit?
          </h2>
          <p className="text-xl text-black mb-8">
            Schedule an appointment or stop by during our office hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-colors"
            >
              Schedule Appointment
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-4 rounded-xl text-lg font-bold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
