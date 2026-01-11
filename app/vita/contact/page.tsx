'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function VITAContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
          <p className="text-black mb-6">
            We'll respond within 1 business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with VITA</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href="tel:317-555-0200" className="text-green-600 hover:underline">
                      (317) 555-0200
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:vita@elevateforhumanity.org" className="text-green-600 hover:underline">
                      vita@elevateforhumanity.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-black">
                      123 Main Street<br />
                      Indianapolis, IN 46204
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-black">
                      Monday-Friday: 9am-5pm<br />
                      Saturday: 10am-2pm<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
              <p className="text-black mb-4">
                Schedule a free appointment to speak with a VITA volunteer
              </p>
              <a
                href="/vita/schedule"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Book Appointment
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
