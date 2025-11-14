'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Building, Users, Phone, Mail } from 'lucide-react';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Home</Link>
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">Programs</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-red-600 font-medium">Pricing</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">About</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="elevate-btn-secondary">Sign In</Link>
          <Link href="/enroll" className="elevate-btn-primary">Get Started</Link>
        </div>
      </header>

      <div className="elevate-container py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See Elevate for Humanity in Action
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Schedule a personalized demo to learn how our WIOA-funded training programs can help your organization or workforce development initiative.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Personalized Walkthrough</h3>
                  <p className="text-gray-600">Get a customized demo tailored to your specific needs and use cases</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Meet Our Team</h3>
                  <p className="text-gray-600">Connect with our workforce development experts and ask questions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Implementation Support</h3>
                  <p className="text-gray-600">Learn about our onboarding process and ongoing support services</p>
                </div>
              </div>
            </div>

            <div className="elevate-card elevate-card-blue">
              <h3 className="font-bold text-gray-900 mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  How WIOA funding works for your participants
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Our 10+ career training programs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Job placement success rates and outcomes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Partnership opportunities and pricing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Platform features and reporting tools
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {submitted ? (
              <div className="elevate-card text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Received!</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your interest. Our team will contact you within 1 business day to schedule your personalized demo.
                </p>
                <Link href="/" className="elevate-btn-primary">
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="elevate-card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Demo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="elevate-label">First Name *</label>
                      <input
                        type="text"
                        required
                        className="elevate-input"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="elevate-label">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="elevate-input"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="elevate-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      className="elevate-input"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="elevate-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="elevate-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="elevate-label">Organization *</label>
                    <input
                      type="text"
                      required
                      className="elevate-input"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="elevate-label">Job Title</label>
                    <input
                      type="text"
                      className="elevate-input"
                      placeholder="HR Director"
                    />
                  </div>

                  <div>
                    <label className="elevate-label">Organization Type *</label>
                    <select required className="elevate-select">
                      <option value="">Select type...</option>
                      <option value="workforce-board">Workforce Development Board</option>
                      <option value="training-provider">Training Provider</option>
                      <option value="employer">Employer</option>
                      <option value="nonprofit">Nonprofit Organization</option>
                      <option value="government">Government Agency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="elevate-label">Number of Participants</label>
                    <select className="elevate-select">
                      <option value="">Select range...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-100">51-100</option>
                      <option value="101-500">101-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div>
                    <label className="elevate-label">Message</label>
                    <textarea
                      className="elevate-textarea"
                      rows={4}
                      placeholder="Tell us about your training needs..."
                    ></textarea>
                  </div>

                  <button type="submit" className="elevate-btn-primary w-full">
                    Request Demo
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
