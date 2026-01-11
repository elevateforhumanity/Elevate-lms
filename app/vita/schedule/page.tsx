'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle } from 'lucide-react';

export default function VITASchedulePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    income: '',
    dependents: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to database
    const response = await fetch('/api/vita/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
          <p className="text-black mb-6">
            We've sent a confirmation email to {formData.email}. You'll receive a reminder 24 hours before your appointment.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Schedule Free Appointment</h1>
          <p className="text-xl">Book your free tax preparation appointment</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
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
                  <Mail className="w-4 h-4 inline mr-2" />
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
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="">Select location</option>
                  <option value="downtown">Downtown Indianapolis</option>
                  <option value="eastside">Eastside Community Center</option>
                  <option value="westside">Westside Library</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time *
                </label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="9am">9:00 AM</option>
                  <option value="10am">10:00 AM</option>
                  <option value="11am">11:00 AM</option>
                  <option value="12pm">12:00 PM</option>
                  <option value="1pm">1:00 PM</option>
                  <option value="2pm">2:00 PM</option>
                  <option value="3pm">3:00 PM</option>
                  <option value="4pm">4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Annual Income
                </label>
                <input
                  type="text"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  placeholder="e.g., $45,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Number of Dependents
                </label>
                <input
                  type="number"
                  value={formData.dependents}
                  onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Book Free Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
