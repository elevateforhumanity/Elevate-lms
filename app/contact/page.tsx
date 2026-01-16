'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Send,
  ArrowRight,
  Clock,
  CheckCircle,
  Phone,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <Image
            src="/images/efh/hero/hero-support.jpg"
            alt="Contact Elevate for Humanity"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </div>
      </section>

      {/* Hero Content */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-full">
              24-Hour Response
            </span>
            <span className="px-3 py-2 bg-brand-blue-600 text-white text-sm font-medium rounded-full">
              Free Consultation
            </span>
            <span className="px-3 py-2 bg-brand-orange-600 text-white text-sm font-medium rounded-full">
              Real Advisors
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl text-black">
            Talk to a real person about your career goals
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-black leading-relaxed">
            Questions about programs, funding, or eligibility? Our advisors are here to help you understand your options and find the right path forward.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              How to Reach Us
            </h2>
            <p className="text-lg text-black">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="tel:+13173143757"
              className="group bg-white rounded-lg p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/images/icons/users.png" alt="Phone" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Call Us
              </h3>
              <p className="text-lg font-semibold text-blue-600 mb-2">
                (317) 314-3757
              </p>
              <p className="text-sm text-black">Mon-Fri, 8am-6pm EST</p>
            </a>

            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="group bg-white rounded-lg p-8 border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/images/icons/book.png" alt="Email" width={32} height={32} className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Email Us
              </h3>
              <p className="text-sm font-semibold text-green-600 mb-2">
                elevate4humanityedu@gmail.com
              </p>
              <p className="text-sm text-black">24-hour response time</p>
            </a>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Image src="/images/icons/shield.png" alt="Location" width={32} height={32} className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Visit Us
              </h3>
              <p className="text-sm text-black mb-2">
                8888 Keystone Xing, Suite 1300<br />
                Indianapolis, IN 46240
              </p>
              <p className="text-sm text-black">By appointment only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-black">
              We'll respond within 24 hours
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-8 border-2 border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
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
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
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
                  <label className="block text-sm font-bold text-black mb-2">
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
                  <label className="block text-sm font-bold text-black mb-2">
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
                <label className="block text-sm font-bold text-black mb-2">
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
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>

              <p className="text-center text-sm text-black mt-4">
                We'll respond within 24 hours
              </p>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-12 border-2 border-green-200 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">
                Message Sent!
              </h3>
              <p className="text-lg text-black mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Office Hours & Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Office Hours
              </h3>
              <div className="space-y-2 text-black">
                <p>
                  <strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM EST
                </p>
                <p>
                  <strong>Saturday:</strong> By appointment
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Who We Help
              </h3>
              <ul className="space-y-2 text-black">
                <li>• Students & Job Seekers</li>
                <li>• Employers & Partners</li>
                <li>• Workforce Boards</li>
                <li>• Community Organizations</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
              <ArrowRight className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/apply"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Apply Now →
                </Link>
                <Link
                  href="/programs"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Browse Programs →
                </Link>
                <Link
                  href="/wioa-eligibility"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  Check Eligibility →
                </Link>
                <Link
                  href="/how-it-works"
                  className="block text-blue-600 hover:underline font-semibold"
                >
                  How It Works →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Talk to an advisor about your career goals and funding options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-900 transition-colors border-2 border-white"
            >
              <Phone className="w-5 h-5" />
              <span>Call (317) 314-3757</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
