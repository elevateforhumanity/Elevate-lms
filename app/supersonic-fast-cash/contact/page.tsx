'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Get in touch with Supersonic Fast Cash. We're here to help with your tax preparation needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-600 transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Phone</h3>
            <a href="tel:+13173143757" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
              (317) 314-3757
            </a>
            <p className="text-gray-600 mt-2 text-sm">Call us for immediate assistance</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-600 transition">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Email</h3>
            <a href="mailto:Supersonicfadtcashllc@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold break-all">
              Supersonicfadtcashllc@gmail.com
            </a>
            <p className="text-gray-600 mt-2 text-sm">Email us anytime</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-600 transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Location</h3>
            <p className="text-gray-700 font-semibold">Indianapolis, IN</p>
            <p className="text-gray-600 mt-2 text-sm">Multiple locations available</p>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-black">Business Hours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-black mb-3">Tax Season (January - April)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-black mb-3">Off-Season (May - December)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">By Appointment</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-black">Send Us a Message</h2>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-black mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-black mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="tax-prep">Tax Preparation</option>
                  <option value="refund-advance">Refund Advance</option>
                  <option value="appointment">Schedule Appointment</option>
                  <option value="pricing">Pricing Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8 text-center">Ready to Get Started?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
              <p className="text-white/90 text-sm">Schedule your tax preparation appointment</p>
            </Link>
            <Link
              href="/supersonic-fast-cash/calculator"
              className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-2">Estimate Refund</h3>
              <p className="text-white/90 text-sm">Calculate your potential tax refund</p>
            </Link>
            <Link
              href="/supersonic-fast-cash/locations"
              className="bg-white/10 backdrop-blur border-2 border-white/20 rounded-xl p-6 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-2">Find Location</h3>
              <p className="text-white/90 text-sm">Find a Supersonic Fast Cash near you</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
