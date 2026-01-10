'use client';

import { useState } from 'react';
import { Heart, BookOpen, Users, Award, CheckCircle } from 'lucide-react';

export default function VITAVolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    interests: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/vita/volunteers', {
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
          <h2 className="text-2xl font-bold mb-4">Thank You for Volunteering!</h2>
          <p className="text-gray-600 mb-6">
            We'll contact you within 2 business days to discuss next steps and training opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Become a VITA Volunteer</h1>
          <p className="text-xl">Help your community with free tax preparation</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Heart className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Make a Difference</h2>
            <p className="text-gray-600 mb-4">
              Last year, VITA volunteers helped 2,045 families save over $408,000 in tax preparation fees and receive $5.8 million in refunds.
            </p>
            <p className="text-gray-600">
              Your time and skills can help families keep more of their hard-earned money.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <BookOpen className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Free Training Provided</h2>
            <p className="text-gray-600 mb-4">
              No tax experience required! We provide comprehensive IRS-certified training covering tax law, software, and ethics.
            </p>
            <p className="text-gray-600">
              Training is flexible and can be completed online or in-person.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Flexible Schedule</h2>
            <p className="text-gray-600 mb-4">
              Volunteer as little as 4 hours per week during tax season (January-April).
            </p>
            <p className="text-gray-600">
              Choose shifts that work with your schedule - weekdays, evenings, or weekends.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <Award className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Gain Valuable Skills</h2>
            <p className="text-gray-600 mb-4">
              Learn tax preparation, gain IRS certification, and develop professional skills.
            </p>
            <p className="text-gray-600">
              Great for students, retirees, and anyone interested in tax or accounting.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Volunteer Application</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="none">No experience</option>
                  <option value="personal">Personal tax filing only</option>
                  <option value="professional">Professional experience</option>
                  <option value="certified">CPA or EA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability
              </label>
              <textarea
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                placeholder="Tell us about your availability (days, times, hours per week)"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Submit Volunteer Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
