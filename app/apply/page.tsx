'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, CheckCircle, Loader2, User, GraduationCap } from 'lucide-react';

const PROGRAMS = [
  { value: '', label: 'Select a program...' },
  { value: 'healthcare', label: 'Healthcare Programs' },
  { value: 'cna', label: '— CNA (Certified Nursing Assistant)' },
  { value: 'medical-assistant', label: '— Medical Assistant' },
  { value: 'phlebotomy', label: '— Phlebotomy' },
  { value: 'skilled-trades', label: 'Skilled Trades Programs' },
  { value: 'hvac', label: '— HVAC Technician' },
  { value: 'electrical', label: '— Electrical' },
  { value: 'welding', label: '— Welding' },
  { value: 'cdl', label: '— CDL Training' },
  { value: 'technology', label: 'Technology Programs' },
  { value: 'it-support', label: '— IT Support' },
  { value: 'cybersecurity', label: '— Cybersecurity' },
  { value: 'barber', label: 'Barber Apprenticeship ($4,980 - Self Pay)' },
  { value: 'other', label: 'Other / Not Sure Yet' },
];

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      program: formData.get('program') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please call us at (317) 314-3757.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Thank You!</h1>
          <p className="text-slate-600 mb-6">
            We received your inquiry. Our enrollment team will contact you within 1-2 business days.
          </p>
          <p className="text-slate-600 mb-8">
            Need immediate assistance? Call us at{' '}
            <a href="tel:+13173143757" className="text-blue-600 font-semibold">(317) 314-3757</a>
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section 
        className="relative py-20 px-4"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.9)), url(/images/heroes/apply-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your New Career
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Fill out this quick form and our enrollment team will help you get started.
          </p>
          <p className="text-blue-200">
            Most programs are 100% FREE through WIOA funding
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Enrollment Inquiry</h2>
                <p className="text-slate-600 text-sm">We will contact you within 1-2 business days</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(317) 555-1234"
                />
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-slate-700 mb-1">
                  Program of Interest *
                </label>
                <select
                  id="program"
                  name="program"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Questions or Comments (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your goals or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-center text-slate-600 mb-4">
                Prefer to talk to someone now?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200"
                >
                  <Phone className="w-5 h-5" />
                  (317) 314-3757
                </a>
                <a
                  href="mailto:enroll@elevateforhumanity.org"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">100% Free Training</h3>
              <p className="text-slate-600 text-sm">Most programs are fully funded through WIOA grants.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">8-16 Week Programs</h3>
              <p className="text-slate-600 text-sm">Get certified and job-ready in just weeks, not years.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Job Placement Help</h3>
              <p className="text-slate-600 text-sm">Career services and employer connections included.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
