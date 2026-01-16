'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Users, Calendar, ArrowRight, X, CheckCircle } from 'lucide-react';

interface CareerServicesHookProps {
  programName: string;
  programSlug: string;
}

export function CareerServicesHook({ programName, programSlug }: CareerServicesHookProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      id: 'resume',
      icon: FileText,
      title: 'Resume Review',
      description: 'Get expert feedback on your resume to stand out to employers',
      href: '/career-services/resume-building',
      color: 'blue',
    },
    {
      id: 'employer',
      icon: Users,
      title: 'Employer Info Session',
      description: 'Learn about hiring partners and job opportunities',
      href: '/career-services/networking-events',
      color: 'green',
    },
    {
      id: 'placement',
      icon: Calendar,
      title: 'Job Placement Support',
      description: 'Connect with employers actively hiring program graduates',
      href: '/career-services/job-placement',
      color: 'purple',
    },
  ];

  const handleRequestService = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setSelectedService(null);
    }, 2000);
  };

  return (
    <>
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Career Services</h3>
        <p className="text-gray-600 mb-6">
          Get support finding employment after completing {programName}
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleRequestService(service.id)}
                className={`text-left p-4 bg-white rounded-xl border-2 border-transparent hover:border-${service.color}-300 hover:shadow-md transition group`}
              >
                <div className={`w-10 h-10 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 text-${service.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                <p className="text-sm text-gray-500">{service.description}</p>
                <span className={`inline-flex items-center gap-1 text-sm text-${service.color}-600 mt-2 group-hover:gap-2 transition-all`}>
                  Request <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link
            href="/career-services"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
          >
            View All Career Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                <p className="text-gray-600">
                  Our career services team will contact you within 1-2 business days.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Request {services.find(s => s.id === selectedService)?.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill out this form and our career services team will reach out to schedule your session.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program
                    </label>
                    <input
                      type="text"
                      value={programName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any specific questions or needs?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
