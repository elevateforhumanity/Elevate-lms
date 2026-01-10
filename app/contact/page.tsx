'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      detail: '(317) 314-3757',
      description: 'Mon-Fri, 8am-6pm EST',
      href: 'tel:+13173143757',
      color: 'green',
    },
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'elevate4humanityedu@gmail.com',
      description: 'We respond within 24 hours',
      href: 'mailto:elevate4humanityedu@gmail.com',
      color: 'blue',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Indianapolis, IN',
      description: 'Multiple locations across Indiana',
      href: '/locations',
      color: 'purple',
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      detail: 'Book a consultation',
      description: 'Free 15-minute career consultation',
      href: '/booking',
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30 mb-6">
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
            We're Here to Help
          </h1>

          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Questions about programs, funding, or enrollment? Our team is ready
            to guide you every step of the way.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10  rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">24hr</div>
              <div className="text-xs text-green-100">Response Time</div>
            </div>
            <div className="bg-white/10  rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">Free</div>
              <div className="text-xs text-green-100">Consultation</div>
            </div>
            <div className="bg-white/10  rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-black mb-1">5min</div>
              <div className="text-xs text-green-100">To Apply</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Choose How to Connect
            </h2>
            <p className="text-xl text-gray-600">
              Pick the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-green-500 hover:-translate-y-1 transform"
                >
                  <div
                    className={`w-14 h-14 bg-${method.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 text-${method.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm font-semibold text-green-600 mb-2">
                    {method.detail}
                  </p>
                  <p className="text-xs text-gray-600">{method.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border-2 border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:border-outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="(317) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    I'm Interested In *
                  </label>
                  <select
                    required
                    value={formData.inquiryType}
                    onChange={(e) =>
                      setFormData({ ...formData, inquiryType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="general">General Information</option>
                    <option value="programs">Programs & Training</option>
                    <option value="funding">Funding & Eligibility</option>
                    <option value="employers">Employer Partnerships</option>
                    <option value="support">Support Services</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                We'll respond within 24 hours
              </p>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-12 shadow-xl border-2 border-green-200 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                Message Sent!
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for reaching out. We'll get back to you within 24
                hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Office Hours & Info */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM
                </p>
                <p>
                  <strong>Saturday:</strong> 9:00 AM - 2:00 PM
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Who We Help
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Students & Job Seekers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Employers & Partners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Community Organizations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <MessageSquare className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/apply"
                  className="block text-purple-600 hover:underline font-semibold"
                >
                  Apply Now →
                </Link>
                <Link
                  href="/programs"
                  className="block text-purple-600 hover:underline font-semibold"
                >
                  Browse Programs →
                </Link>
                <Link
                  href="/faq"
                  className="block text-purple-600 hover:underline font-semibold"
                >
                  FAQs →
                </Link>
                <Link
                  href="/help"
                  className="block text-purple-600 hover:underline font-semibold"
                >
                  Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Don't wait—apply now and start your journey to a better career
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-green-100 mt-4">
            Takes 5 minutes • 100% free • No commitment
          </p>
        </div>
      </section>
    </div>
  );
}
